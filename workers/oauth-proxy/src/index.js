/**
 * Cloudflare Worker OAuth proxy for Sveltia CMS (GitHub).
 * Compatible with Sveltia CMS Authenticator postMessage flow.
 *
 * Endpoints:
 *   GET /login, GET /auth/github  — start GitHub OAuth
 *   GET /auth, GET /oauth/authorize — same (provider query param)
 *   GET /callback, GET /oauth/redirect — OAuth callback
 *
 * Secrets (never commit): GITHUB_CLIENT_SECRET, optional GITHUB_PAT, SESSION_SECRET
 */

const SUPPORTED_PROVIDERS = ['github'];

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const jsonResponse = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

/**
 * HTML page that passes the OAuth result to the CMS opener via postMessage.
 * @param {object} args
 * @param {string} [args.provider]
 * @param {string} [args.token]
 * @param {string} [args.error]
 * @param {string} [args.errorCode]
 */
const outputHTML = ({ provider = 'unknown', token, error, errorCode }) => {
  const state = error ? 'error' : 'success';
  const content = error ? { provider, error, errorCode } : { provider, token };

  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Authorizing…</title></head>
<body>
<script>
(() => {
  const payload = ${JSON.stringify(content)};
  const state = ${JSON.stringify(state)};
  const provider = ${JSON.stringify(provider)};
  window.addEventListener('message', ({ data, origin }) => {
    if (data === 'authorizing:' + provider) {
      window.opener?.postMessage(
        'authorization:' + provider + ':' + state + ':' + JSON.stringify(payload),
        origin
      );
    }
  });
  window.opener?.postMessage('authorizing:' + provider, '*');
})();
</script>
<p>Authorizing… You can close this window if it does not close automatically.</p>
</body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Set-Cookie': 'csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure',
      },
    },
  );
};

const accessDeniedHTML = () =>
  new Response(
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Access denied</title></head>
<body>
<p>Access denied. You are not authorized to use this CMS.</p>
</body>
</html>`,
    { status: 403, headers: { 'Content-Type': 'text/html;charset=UTF-8' } },
  );

/**
 * @param {string} allowedDomains
 * @param {string|undefined} domain
 */
const isDomainAllowed = (allowedDomains, domain) => {
  if (!allowedDomains || !domain) return true;
  return allowedDomains.split(',').some((raw) => {
    const pattern = escapeRegExp(raw.trim()).replace('\\*', '.+');
    return domain.match(new RegExp(`^${pattern}$`));
  });
};

/**
 * @param {Request} request
 * @param {Record<string, string>} env
 */
const handleAuth = async (request, env) => {
  const { searchParams } = new URL(request.url);
  const provider =
    searchParams.get('provider') ||
    (new URL(request.url).pathname.endsWith('/github') ? 'github' : null);
  const domain = searchParams.get('site_id');

  if (!provider || !SUPPORTED_PROVIDERS.includes(provider)) {
    return outputHTML({
      error: 'Your Git backend is not supported by the authenticator.',
      errorCode: 'UNSUPPORTED_BACKEND',
    });
  }

  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_HOSTNAME = 'github.com',
    ALLOWED_DOMAINS,
  } = env;

  if (!isDomainAllowed(ALLOWED_DOMAINS, domain)) {
    return outputHTML({
      provider,
      error: 'Your domain is not allowed to use the authenticator.',
      errorCode: 'UNSUPPORTED_DOMAIN',
    });
  }

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return outputHTML({
      provider,
      error: 'OAuth app client ID or secret is not configured.',
      errorCode: 'MISCONFIGURED_CLIENT',
    });
  }

  const csrfToken = crypto.randomUUID().replaceAll('-', '');
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    scope: 'repo,user',
    state: csrfToken,
  });

  const authURL = `https://${GITHUB_HOSTNAME}/login/oauth/authorize?${params.toString()}`;

  return new Response('', {
    status: 302,
    headers: {
      Location: authURL,
      'Set-Cookie': `csrf-token=${provider}_${csrfToken}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
    },
  });
};

/**
 * Verify the authenticated GitHub user matches ALLOWED_GITHUB_USER.
 * @param {string} token
 * @param {string} allowedUser
 */
const verifyGitHubUser = async (token, allowedUser) => {
  if (!allowedUser) return true;

  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'joaocarlospereira-oauth-proxy',
    },
  });

  if (!response.ok) return false;

  const user = await response.json();
  return (user.login || '').toLowerCase() === allowedUser.toLowerCase();
};

/**
 * @param {Request} request
 * @param {Record<string, string>} env
 */
const handleCallback = async (request, env) => {
  const { url, headers } = request;
  const { searchParams } = new URL(url);
  const { code, state } = Object.fromEntries(searchParams);

  const [, provider, csrfToken] =
    headers.get('Cookie')?.match(/\bcsrf-token=([a-z-]+?)_([0-9a-f]{32})\b/) ?? [];

  if (!provider || !SUPPORTED_PROVIDERS.includes(provider)) {
    return outputHTML({
      error: 'Your Git backend is not supported by the authenticator.',
      errorCode: 'UNSUPPORTED_BACKEND',
    });
  }

  if (!code || !state) {
    return outputHTML({
      provider,
      error: 'Failed to receive an authorization code. Please try again later.',
      errorCode: 'AUTH_CODE_REQUEST_FAILED',
    });
  }

  if (!csrfToken || state !== csrfToken) {
    return outputHTML({
      provider,
      error: 'Potential CSRF attack detected. Authentication flow aborted.',
      errorCode: 'CSRF_DETECTED',
    });
  }

  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_HOSTNAME = 'github.com',
    ALLOWED_GITHUB_USER,
    SESSION_SECRET,
  } = env;

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return outputHTML({
      provider,
      error: 'OAuth app client ID or secret is not configured.',
      errorCode: 'MISCONFIGURED_CLIENT',
    });
  }

  let response;
  try {
    response = await fetch(`https://${GITHUB_HOSTNAME}/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
      }),
    });
  } catch {
    return outputHTML({
      provider,
      error: 'Failed to request an access token. Please try again later.',
      errorCode: 'TOKEN_REQUEST_FAILED',
    });
  }

  if (!response.ok) {
    return outputHTML({
      provider,
      error: 'Failed to request an access token. Please try again later.',
      errorCode: 'TOKEN_REQUEST_FAILED',
    });
  }

  let token = '';
  let error = '';

  try {
    ({ access_token: token, error } = await response.json());
  } catch {
    return outputHTML({
      provider,
      error: 'Server responded with malformed data. Please try again later.',
      errorCode: 'MALFORMED_RESPONSE',
    });
  }

  if (error || !token) {
    return outputHTML({
      provider,
      error: 'Authentication failed. Please try again later.',
      errorCode: 'AUTH_FAILED',
    });
  }

  const allowed = await verifyGitHubUser(token, ALLOWED_GITHUB_USER);
  if (!allowed) {
    return accessDeniedHTML();
  }

  const htmlResponse = outputHTML({ provider, token });
  const responseHeaders = new Headers(htmlResponse.headers);

  if (SESSION_SECRET) {
    // Opaque session marker; token is still delivered to CMS via postMessage.
    const sessionValue = btoa(`${provider}:${Date.now()}`).replace(/=/g, '');
    responseHeaders.append(
      'Set-Cookie',
      `cms-session=${sessionValue}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; Secure`,
    );
  }

  return new Response(htmlResponse.body, { headers: responseHeaders });
};

/** Convenience redirect for manual /login visits */
const handleLogin = (request, env) => {
  const { origin } = new URL(request.url);
  const siteId = new URL(request.url).searchParams.get('site_id') || 'joaocarlospereira.github.io';
  const target = new URL('/auth/github', origin);
  target.searchParams.set('site_id', siteId);
  return Response.redirect(target.toString(), 302);
};

export default {
  /**
   * @param {Request} request
   * @param {Record<string, string>} env
   */
  async fetch(request, env) {
    const { method } = request;
    const { pathname } = new URL(request.url);

    if (method !== 'GET') {
      return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    if (pathname === '/login') {
      return handleLogin(request, env);
    }

    if (['/auth', '/oauth/authorize', '/auth/github'].includes(pathname)) {
      return handleAuth(request, env);
    }

    if (['/callback', '/oauth/redirect'].includes(pathname)) {
      return handleCallback(request, env);
    }

    if (pathname === '/' || pathname === '/health') {
      return jsonResponse({ status: 'ok', service: 'oauth-proxy' });
    }

    return jsonResponse({ error: 'Not found' }, 404);
  },
};
