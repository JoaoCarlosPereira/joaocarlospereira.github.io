/**
 * Portfolio — GitHub API fetch, filter, cache, and page rendering.
 */
(function () {
  'use strict';

  const GITHUB_REPOS_URL =
    'https://api.github.com/users/JoaoCarlosPereira/repos?per_page=100&sort=updated';
  const CACHE_KEY = 'portfolio_cache';
  const CACHE_TTL_MS = 3600000;
  const REPO_MAX_AGE_YEARS = 0;
  const GITHUB_PROFILE_URL = 'https://github.com/JoaoCarlosPereira';
  const SKELETON_CARD_COUNT = 6;

  let lastFetchHadError = false;
  let cachedReposForModal = [];

  /**
   * @typedef {Object} PortfolioRepo
   * @property {string} name
   * @property {string} description
   * @property {string} html_url
   * @property {string|null} homepage_url
   * @property {string} language
   * @property {number} stargazers_count
   * @property {number} forks_count
   * @property {string} updated_at
   * @property {string[]} topics
   */

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.data) || typeof parsed.timestamp !== 'number') {
        return null;
      }
      if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
        return null;
      }
      return parsed.data;
    } catch (err) {
      return null;
    }
  }

  function writeCache(repos) {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: repos,
          timestamp: Date.now()
        })
      );
    } catch (err) {
      /* ignore quota / private mode */
    }
  }

  function isRepoTooOld(updatedAt) {
    if (!REPO_MAX_AGE_YEARS || REPO_MAX_AGE_YEARS <= 0) {
      return false;
    }
    const updated = new Date(updatedAt);
    if (Number.isNaN(updated.getTime())) {
      return false;
    }
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - REPO_MAX_AGE_YEARS);
    return updated < cutoff;
  }

  /**
   * @param {object} raw
   * @returns {PortfolioRepo}
   */
  function mapRepo(raw) {
    const homepage = raw.homepage && String(raw.homepage).trim();
    return {
      name: raw.name || '',
      description: raw.description || '',
      html_url: raw.html_url || '',
      homepage_url: homepage ? homepage : null,
      language: raw.language || '—',
      stargazers_count: raw.stargazers_count || 0,
      forks_count: raw.forks_count || 0,
      updated_at: raw.pushed_at || raw.updated_at || '',
      topics: Array.isArray(raw.topics) ? raw.topics : []
    };
  }

  /**
   * @param {object[]} rawRepos
   * @returns {PortfolioRepo[]}
   */
  function filterAndSort(rawRepos) {
    return rawRepos
      .filter(function (repo) {
        if (repo.fork === true) {
          return false;
        }
        if (repo.archived === true) {
          return false;
        }
        if ((repo.stargazers_count || 0) === 0) {
          return false;
        }
        const updatedAt = repo.pushed_at || repo.updated_at;
        if (isRepoTooOld(updatedAt)) {
          return false;
        }
        return true;
      })
      .map(mapRepo)
      .sort(function (a, b) {
        return b.stargazers_count - a.stargazers_count;
      });
  }

  async function fetchRawFromApi() {
    const response = await fetch(GITHUB_REPOS_URL, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) {
      throw new Error('GitHub API error: ' + response.status);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected GitHub API response');
    }
    return data;
  }

  /**
   * Fetches and filters GitHub repositories (with localStorage cache).
   * @returns {Promise<PortfolioRepo[]>}
   */
  async function fetchPortfolioRepos() {
    lastFetchHadError = false;

    const cached = readCache();
    if (cached) {
      return cached;
    }

    try {
      const rawRepos = await fetchRawFromApi();
      const repos = filterAndSort(rawRepos);
      writeCache(repos);
      return repos;
    } catch (err) {
      lastFetchHadError = true;
      return [];
    }
  }

  function portfolioFetchFailed() {
    return lastFetchHadError;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  function formatDate(iso) {
    if (!iso) {
      return '—';
    }
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return '—';
    }
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getGridContainer() {
    return document.getElementById('portfolio-grid');
  }

  function renderSkeleton() {
    const grid = getGridContainer();
    if (!grid) {
      return;
    }
    grid.setAttribute('aria-busy', 'true');
    grid.className = 'row gx-4 gy-4 portfolio-grid portfolio-grid--loading';
    let html = '';
    for (let i = 0; i < SKELETON_CARD_COUNT; i += 1) {
      html +=
        '<div class="col-md-6">' +
        '<article class="portfolio-card portfolio-card--skeleton" aria-hidden="true">' +
        '<div class="portfolio-skeleton-line portfolio-skeleton-line--title"></div>' +
        '<div class="portfolio-skeleton-line portfolio-skeleton-line--text"></div>' +
        '<div class="portfolio-skeleton-line portfolio-skeleton-line--text portfolio-skeleton-line--short"></div>' +
        '<div class="portfolio-skeleton-meta"></div>' +
        '</article></div>';
    }
    grid.innerHTML = html;
  }

  function buildCardHtml(repo, index) {
    const description = repo.description
      ? escapeHtml(repo.description)
      : '<span class="text-muted">Sem descrição</span>';
    const language = escapeHtml(repo.language);
    return (
      '<div class="col-md-6">' +
      '<article class="portfolio-card card overflow-hidden shadow rounded-4 border-0 h-100" ' +
      'tabindex="0" role="button" data-portfolio-index="' +
      index +
      '" aria-label="Abrir detalhes de ' +
      escapeHtml(repo.name) +
      '">' +
      '<div class="portfolio-card-accent"></div>' +
      '<div class="card-body p-4">' +
      '<h2 class="h5 fw-bolder mb-2 portfolio-card-title">' +
      escapeHtml(repo.name) +
      '</h2>' +
      '<p class="portfolio-card-description mb-3">' +
      description +
      '</p>' +
      '<div class="d-flex flex-wrap align-items-center gap-2 portfolio-card-meta">' +
      '<span class="portfolio-lang-badge">' +
      language +
      '</span>' +
      '<span class="portfolio-stars" title="Estrelas">' +
      '<i class="bi bi-star-fill" aria-hidden="true"></i> ' +
      repo.stargazers_count +
      '</span>' +
      '<span class="portfolio-updated text-muted small ms-auto">' +
      escapeHtml(formatDate(repo.updated_at)) +
      '</span>' +
      '</div>' +
      '</div>' +
      '</article></div>'
    );
  }

  function renderCards(repos) {
    const grid = getGridContainer();
    if (!grid) {
      return;
    }
    cachedReposForModal = repos;
    grid.removeAttribute('aria-busy');
    grid.className = 'row gx-4 gy-4 portfolio-grid';
    grid.innerHTML = repos.map(buildCardHtml).join('');

    grid.querySelectorAll('[data-portfolio-index]').forEach(function (card) {
      card.addEventListener('click', function () {
        openRepoModal(Number(card.getAttribute('data-portfolio-index')));
      });
      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openRepoModal(Number(card.getAttribute('data-portfolio-index')));
        }
      });
    });
  }

  function renderMessagePanel(type) {
    const grid = getGridContainer();
    if (!grid) {
      return;
    }
    grid.removeAttribute('aria-busy');
    grid.className = 'portfolio-message-wrap';

    if (type === 'empty') {
      grid.innerHTML =
        '<div class="portfolio-message portfolio-message--empty" role="status">' +
        '<p class="mb-0">No repositories found matching the criteria.</p>' +
        '</div>';
      return;
    }

    grid.innerHTML =
      '<div class="portfolio-message portfolio-message--error" role="alert">' +
      '<p class="mb-3">Não foi possível carregar os repositórios do GitHub agora. Tente novamente mais tarde.</p>' +
      '<a class="btn btn-primary btn-lg portfolio-cta-btn" href="' +
      GITHUB_PROFILE_URL +
      '" target="_blank" rel="noopener noreferrer">Ver perfil no GitHub</a>' +
      '</div>';
  }

  function buildTopicsHtml(topics) {
    if (!topics.length) {
      return '<p class="text-muted small mb-0">Nenhuma tag de tópico</p>';
    }
    return (
      '<div class="portfolio-modal-topics">' +
      topics
        .map(function (topic) {
          return '<span class="portfolio-topic-badge">' + escapeHtml(topic) + '</span>';
        })
        .join('') +
      '</div>'
    );
  }

  function openRepoModal(index) {
    const repo = cachedReposForModal[index];
    if (!repo) {
      return;
    }

    const modalEl = document.getElementById('portfolioRepoModal');
    if (!modalEl) {
      return;
    }

    const titleEl = document.getElementById('portfolio-modal-title');
    const bodyEl = document.getElementById('portfolio-modal-body');
    const githubBtn = document.getElementById('portfolio-modal-github-btn');
    const homepageLink = document.getElementById('portfolio-modal-homepage-link');

    if (titleEl) {
      titleEl.textContent = repo.name;
    }

    if (bodyEl) {
      const description = repo.description
        ? '<p class="portfolio-modal-description">' + escapeHtml(repo.description) + '</p>'
        : '<p class="portfolio-modal-description text-muted">Sem descrição</p>';

      bodyEl.innerHTML =
        description +
        buildTopicsHtml(repo.topics) +
        '<dl class="portfolio-modal-stats row gx-3 gy-2 mt-3 mb-0">' +
        '<dt class="col-sm-4">Estrelas</dt><dd class="col-sm-8">' +
        repo.stargazers_count +
        '</dd>' +
        '<dt class="col-sm-4">Forks</dt><dd class="col-sm-8">' +
        repo.forks_count +
        '</dd>' +
        '<dt class="col-sm-4">Linguagem</dt><dd class="col-sm-8">' +
        escapeHtml(repo.language) +
        '</dd>' +
        '<dt class="col-sm-4">Atualizado</dt><dd class="col-sm-8">' +
        escapeHtml(formatDate(repo.updated_at)) +
        '</dd>' +
        '</dl>';
    }

    if (githubBtn) {
      githubBtn.href = repo.html_url;
    }

    if (homepageLink) {
      if (repo.homepage_url) {
        homepageLink.href = repo.homepage_url;
        homepageLink.classList.remove('d-none');
      } else {
        homepageLink.classList.add('d-none');
      }
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }

  async function initPortfolioPage() {
    if (!getGridContainer()) {
      return;
    }

    renderSkeleton();
    const repos = await fetchPortfolioRepos();

    if (portfolioFetchFailed()) {
      renderMessagePanel('error');
      return;
    }

    if (!repos.length) {
      renderMessagePanel('empty');
      return;
    }

    renderCards(repos);
  }

  window.fetchPortfolioRepos = fetchPortfolioRepos;
  window.portfolioFetchFailed = portfolioFetchFailed;

  document.addEventListener('DOMContentLoaded', initPortfolioPage);
})();
