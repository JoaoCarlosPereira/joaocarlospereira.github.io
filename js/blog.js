/**
 * Blog module — parse Markdown articles, list published posts, render sanitized HTML.
 */
(function () {
  'use strict';

  const BLOG_BASE = 'content/blog/';
  const MANIFEST_URL = BLOG_BASE + 'articles.json';
  const SITE_ORIGIN = 'https://joaocarlospereira.github.io';
  const DEFAULT_OG_IMAGE = SITE_ORIGIN + '/assets/profile.png';

  /**
   * @typedef {Object} BlogArticle
   * @property {string} slug
   * @property {string} title
   * @property {string} date
   * @property {string} status
   * @property {string} language
   * @property {string|null} en_title
   * @property {string|null} en_body_path
   * @property {string|null} seo_title
   * @property {string|null} seo_description
   * @property {string[]} tags
   * @property {string} excerpt
   * @property {string} body
   * @property {string|null} bodyHtml
   * @property {string|null} enBodyHtml
   */

  function parseYamlValue(raw) {
    const trimmed = raw.trim();
    if (trimmed === 'null' || trimmed === '~') {
      return null;
    }
    if (trimmed === 'true') {
      return true;
    }
    if (trimmed === 'false') {
      return false;
    }
    if (trimmed === '[]') {
      return [];
    }
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      return Number(trimmed);
    }
    return trimmed;
  }

  function parseYamlFrontmatter(yaml) {
    const metadata = {};
    const lines = yaml.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (!match) {
        i += 1;
        continue;
      }

      const key = match[1];
      const rest = match[2].trim();

      if (rest === '[]') {
        metadata[key] = [];
        i += 1;
        continue;
      }

      if (rest.startsWith('[') && rest.endsWith(']')) {
        const inner = rest.slice(1, -1).trim();
        metadata[key] = inner
          ? inner.split(',').map(function (item) {
            return parseYamlValue(item.trim());
          })
          : [];
        i += 1;
        continue;
      }

      if (rest === '') {
        const listItems = [];
        i += 1;
        while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
          listItems.push(lines[i].replace(/^\s+-\s+/, '').trim());
          i += 1;
        }
        metadata[key] = listItems.map(parseYamlValue);
        continue;
      }

      metadata[key] = parseYamlValue(rest);
      i += 1;
    }

    return metadata;
  }

  /**
   * @param {string} content
   * @returns {{ metadata: Object, body: string }}
   */
  function parseArticle(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      throw new Error('Formato de artigo inválido: frontmatter YAML ausente.');
    }

    return {
      metadata: parseYamlFrontmatter(match[1]),
      body: match[2].trim()
    };
  }

  function stripMarkdown(text) {
    return text
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`[^`]*`/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/#{1,6}\s+/g, '')
      .replace(/[*_~>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function buildExcerpt(body, maxLength) {
    const plain = stripMarkdown(body);
    if (plain.length <= maxLength) {
      return plain;
    }
    return plain.slice(0, maxLength).trim() + '…';
  }

  /**
   * @param {string} markdown
   * @returns {string}
   */
  function renderMarkdown(markdown) {
    if (typeof marked === 'undefined') {
      throw new Error('marked.js não está carregado.');
    }
    if (typeof DOMPurify === 'undefined') {
      throw new Error('DOMPurify não está carregado.');
    }

    const rawHtml = marked.parse(markdown, { breaks: true, gfm: true });
    return DOMPurify.sanitize(rawHtml, { USE_PROFILES: { html: true } });
  }

  async function fetchText(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha ao carregar: ' + url);
    }
    return response.text();
  }

  async function fetchOptionalText(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      return response.text();
    } catch (error) {
      return null;
    }
  }

  /**
   * @param {Object} metadata
   * @param {string} body
   * @returns {BlogArticle}
   */
  function metadataToArticle(metadata, body) {
    const enBodyPath = metadata.en_body_path || null;
    const hasEnglish = Boolean(enBodyPath && String(enBodyPath).trim());

    return {
      slug: String(metadata.slug || ''),
      title: String(metadata.title || ''),
      date: String(metadata.date || ''),
      status: String(metadata.status || 'draft'),
      language: String(metadata.language || 'pt'),
      en_title: metadata.en_title || null,
      en_body_path: hasEnglish ? String(enBodyPath).trim() : null,
      seo_title: metadata.seo_title || null,
      seo_description: metadata.seo_description || null,
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      excerpt: buildExcerpt(body, 150),
      body: body,
      bodyHtml: null,
      enBodyHtml: null
    };
  }

  async function loadArticleBySlug(slug) {
    const content = await fetchText(BLOG_BASE + slug + '.md');
    const parsed = parseArticle(content);
    const article = metadataToArticle(parsed.metadata, parsed.body);
    article.bodyHtml = renderMarkdown(article.body);

    if (article.en_body_path) {
      const enContent = await fetchOptionalText(article.en_body_path);
      if (enContent) {
        const enParsed = parseArticle(enContent);
        article.enBodyHtml = renderMarkdown(enParsed.body);
      }
    }

    return article;
  }

  /**
   * @returns {Promise<BlogArticle[]>}
   */
  async function getPublishedArticles() {
    const manifestResponse = await fetch(MANIFEST_URL);
    if (!manifestResponse.ok) {
      throw new Error('Não foi possível carregar o manifesto de artigos.');
    }

    const slugs = await manifestResponse.json();
    if (!Array.isArray(slugs)) {
      throw new Error('Manifesto de artigos inválido.');
    }

    const articles = await Promise.all(
      slugs.map(function (slug) {
        return loadArticleBySlug(String(slug));
      })
    );

    return articles
      .filter(function (article) {
        return article.status === 'published';
      })
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
  }

  function formatDatePt(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    if (Number.isNaN(date.getTime())) {
      return dateStr;
    }
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  function languageLabel(article) {
    return article.en_body_path ? 'PT + EN' : 'PT';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function updateSocialMeta(article) {
    const title = article.seo_title || article.title;
    const description = article.seo_description || article.excerpt;
    const url = SITE_ORIGIN + '/blog.html#' + article.slug;

    document.title = title + ' | João Carlos Pereira';

    function setMeta(selector, value) {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', value);
      }
    }

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }

  function resetSocialMeta() {
    document.title = 'João Carlos - Blog';
    const defaults = {
      description: 'Artigos sobre tecnologia, sistemas, ERP e desenvolvimento de software por João Carlos Pereira.',
      ogTitle: 'João Carlos Pereira | Blog',
      ogDescription: 'Artigos sobre tecnologia, sistemas e desenvolvimento de software.',
      ogUrl: SITE_ORIGIN + '/blog.html'
    };

    function setMeta(selector, value) {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', value);
      }
    }

    setMeta('meta[name="description"]', defaults.description);
    setMeta('meta[property="og:title"]', defaults.ogTitle);
    setMeta('meta[property="og:description"]', defaults.ogDescription);
    setMeta('meta[property="og:url"]', defaults.ogUrl);
    setMeta('meta[name="twitter:title"]', defaults.ogTitle);
    setMeta('meta[name="twitter:description"]', defaults.ogDescription);
  }

  function renderArticleCards(container, articles, onOpen) {
    container.innerHTML = '';

    articles.forEach(function (article) {
      const col = document.createElement('div');
      col.className = 'col-12';

      const card = document.createElement('article');
      card.className = 'card blog-card overflow-hidden shadow rounded-4 border-0 mb-4';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Abrir artigo: ' + article.title);

      card.innerHTML =
        '<div class="blog-card-accent" aria-hidden="true"></div>' +
        '<div class="card-body p-4 p-md-5">' +
          '<div class="d-flex flex-wrap align-items-center gap-2 mb-2">' +
            '<span class="badge blog-lang-badge">' + escapeHtml(languageLabel(article)) + '</span>' +
            '<time class="blog-card-date small text-muted" datetime="' + escapeHtml(article.date) + '">' +
              escapeHtml(formatDatePt(article.date)) +
            '</time>' +
          '</div>' +
          '<h2 class="blog-card-title fw-bolder h4 mb-3">' + escapeHtml(article.title) + '</h2>' +
          '<p class="blog-card-excerpt text-muted mb-0">' + escapeHtml(article.excerpt) + '</p>' +
        '</div>';

      function openArticle() {
        onOpen(article);
      }

      card.addEventListener('click', openArticle);
      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openArticle();
        }
      });

      col.appendChild(card);
      container.appendChild(col);
    });
  }

  function openArticleModal(article, modalEl, modalBodyEl, enSectionEl, enToggleBtn) {
    const modalTitle = modalEl.querySelector('.modal-title');
    if (modalTitle) {
      modalTitle.textContent = article.title;
    }

    modalBodyEl.innerHTML =
      '<div class="blog-article-meta small text-muted mb-3">' +
        '<time datetime="' + escapeHtml(article.date) + '">' + escapeHtml(formatDatePt(article.date)) + '</time>' +
      '</div>' +
      '<div class="blog-article-body">' + article.bodyHtml + '</div>';

    if (article.enBodyHtml && enSectionEl && enToggleBtn) {
      enSectionEl.innerHTML = article.enBodyHtml;
      enSectionEl.hidden = true;
      enToggleBtn.hidden = false;
      enToggleBtn.setAttribute('aria-expanded', 'false');
      enToggleBtn.textContent = 'Ver versão em inglês';
    } else if (enToggleBtn && enSectionEl) {
      enToggleBtn.hidden = true;
      enSectionEl.hidden = true;
      enSectionEl.innerHTML = '';
    }

    updateSocialMeta(article);

    const instance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    instance.show();
  }

  async function initBlogPage() {
    const gridEl = document.getElementById('blog-articles-grid');
    const emptyEl = document.getElementById('blog-empty-state');
    const errorEl = document.getElementById('blog-error-state');
    const modalEl = document.getElementById('blogModal');
    const modalBodyEl = document.getElementById('blog-modal-body');
    const enSectionEl = document.getElementById('blog-en-body');
    const enToggleBtn = document.getElementById('blog-en-toggle');

    if (!gridEl || !modalEl || !modalBodyEl) {
      return;
    }

    if (enToggleBtn && enSectionEl) {
      enToggleBtn.addEventListener('click', function () {
        const expanded = enToggleBtn.getAttribute('aria-expanded') === 'true';
        enSectionEl.hidden = expanded;
        enToggleBtn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        enToggleBtn.textContent = expanded ? 'Ver versão em inglês' : 'Ocultar versão em inglês';
      });
    }

    modalEl.addEventListener('hidden.bs.modal', function () {
      resetSocialMeta();
      if (enSectionEl) {
        enSectionEl.hidden = true;
        enSectionEl.innerHTML = '';
      }
      if (enToggleBtn) {
        enToggleBtn.hidden = true;
        enToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    try {
      const articles = await getPublishedArticles();

      if (articles.length === 0) {
        if (emptyEl) {
          emptyEl.hidden = false;
        }
        gridEl.hidden = true;
        return;
      }

      if (emptyEl) {
        emptyEl.hidden = true;
      }
      gridEl.hidden = false;

      renderArticleCards(gridEl, articles, function (article) {
        openArticleModal(article, modalEl, modalBodyEl, enSectionEl, enToggleBtn);
      });
    } catch (error) {
      console.error(error);
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent = 'Não foi possível carregar os artigos. Tente novamente mais tarde.';
      }
      gridEl.hidden = true;
    }
  }

  window.Blog = {
    parseArticle: parseArticle,
    renderMarkdown: renderMarkdown,
    getPublishedArticles: getPublishedArticles,
    initBlogPage: initBlogPage
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (document.body.classList.contains('blog-page')) {
      initBlogPage();
    }
  });
})();
