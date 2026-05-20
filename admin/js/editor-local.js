/**
 * Editor local — File System Access API + TinyMCE
 * Salva em content/blog/; lembra a pasta via IndexedDB.
 */
(function () {
  'use strict';

  const IDB_NAME = 'blog-editor-db';
  const IDB_VERSION = 1;
  const IDB_STORE = 'handles';
  const IDB_KEY = 'blog-dir';

  let dirHandle = null;
  let currentSlug = null;
  let currentFileHandle = null;
  let currentTags = [];
  let tinymceReady = false;
  let turndownService = null;

  function supportsFileSystemAccess() {
    return 'showDirectoryPicker' in window;
  }

  function openIndexedDB() {
    return new Promise(function (resolve, reject) {
      const request = indexedDB.open(IDB_NAME, IDB_VERSION);
      request.onerror = function () {
        reject(request.error);
      };
      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
    });
  }

  async function saveDirHandle(handle) {
    const db = await openIndexedDB();
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(handle, IDB_KEY);
      tx.oncomplete = function () {
        resolve();
      };
      tx.onerror = function () {
        reject(tx.error);
      };
    });
  }

  async function loadDirHandle() {
    const db = await openIndexedDB();
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(IDB_KEY);
      req.onsuccess = function () {
        resolve(req.result || null);
      };
      req.onerror = function () {
        reject(req.error);
      };
    });
  }

  async function clearDirHandle() {
    const db = await openIndexedDB();
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(IDB_KEY);
      tx.oncomplete = function () {
        resolve();
      };
      tx.onerror = function () {
        reject(tx.error);
      };
    });
  }

  async function verifyPermission(handle, write) {
    const opts = { mode: write ? 'readwrite' : 'read' };
    if ((await handle.queryPermission(opts)) === 'granted') {
      return true;
    }
    if ((await handle.requestPermission(opts)) === 'granted') {
      return true;
    }
    return false;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  function slugify(text) {
    return String(text)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
  }

  function showStatus(msg, type) {
    const el = document.getElementById('save-status');
    if (!el) {
      return;
    }
    if (type === 'success') {
      el.innerHTML = '<span class="status-msg status-success">' + escapeHtml(msg) + '</span>';
    } else if (type === 'error') {
      el.innerHTML = '<span class="status-msg status-error">' + escapeHtml(msg) + '</span>';
    } else if (type === 'loading') {
      el.innerHTML =
        '<span class="status-msg status-loading"><i class="bi bi-hourglass-split"></i> ' +
        escapeHtml(msg) +
        '</span>';
    }
    if (type === 'success' || type === 'error') {
      setTimeout(function () {
        el.innerHTML = '';
      }, 4000);
    }
  }

  function setDirLabel(name) {
    const label = document.getElementById('dir-label');
    const status = document.getElementById('dir-status');
    if (label) {
      label.textContent = name || 'Pasta conectada';
    }
    if (status) {
      status.style.background = name ? '#d4edda' : '#e7f1ff';
    }
  }

  async function resolveBlogDirectory(picked) {
    if (picked.name === 'blog') {
      return picked;
    }
    try {
      const contentDir = await picked.getDirectoryHandle('content');
      return await contentDir.getDirectoryHandle('blog');
    } catch (err) {
      return picked;
    }
  }

  async function connectDirectory(handle) {
    const ok = await verifyPermission(handle, true);
    if (!ok) {
      throw new Error('Permissão negada para ler e gravar na pasta.');
    }
    dirHandle = handle;
    await saveDirHandle(handle);
    setDirLabel(handle.name);
    document.getElementById('workspace').hidden = false;
    document.getElementById('btn-novo').hidden = false;
    document.getElementById('instructions').hidden = true;
    await listarArtigos();
  }

  async function abrirPasta() {
    if (!supportsFileSystemAccess()) {
      alert('Use Chrome ou Edge para abrir pastas locais.\n\nAbra o arquivo admin/editor.html diretamente no navegador.');
      return;
    }
    try {
      const picked = await window.showDirectoryPicker({ mode: 'readwrite' });
      const blogDir = await resolveBlogDirectory(picked);
      await connectDirectory(blogDir);
    } catch (err) {
      if (err.name !== 'AbortError') {
        alert('Erro ao abrir pasta: ' + err.message);
      }
    }
  }

  async function restaurarPasta() {
    if (!supportsFileSystemAccess()) {
      return;
    }
    try {
      const saved = await loadDirHandle();
      if (!saved) {
        return;
      }
      await connectDirectory(saved);
    } catch (err) {
      console.warn('Não foi possível restaurar a pasta:', err);
      await clearDirHandle();
    }
  }

  function parseArticle(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      return { metadata: {}, body: content };
    }
    const metadata = {};
    match[1].split(/\r?\n/).forEach(function (line) {
      const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (!m) {
        return;
      }
      let val = m[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      } else if (val === '[]') {
        val = [];
      } else if (val.startsWith('[') && val.endsWith(']')) {
        const inner = val.slice(1, -1).trim();
        val = inner
          ? inner.split(',').map(function (s) {
            return s.trim().replace(/^"|"$/g, '');
          })
          : [];
      }
      metadata[m[1]] = val;
    });
    return { metadata: metadata, body: match[2].trim() };
  }

  function escapeYamlString(str) {
    return String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  function escapeYamlValue(str) {
    if (/^[a-zA-Z0-9_/.-]+$/.test(str)) {
      return str;
    }
    return '"' + escapeYamlString(str) + '"';
  }

  function generateYamlFrontmatter() {
    const title = document.getElementById('field-title').value.trim();
    const slug = document.getElementById('field-slug').value.trim();
    const date = document.getElementById('field-date').value;
    const status = document.getElementById('field-status').value;
    const language = document.getElementById('field-language').value;
    const seoTitle = document.getElementById('field-seo-title').value.trim();
    const seoDesc = document.getElementById('field-seo-desc').value.trim();
    const enTitle = document.getElementById('field-en-title').value.trim();
    const enBody = document.getElementById('field-en-body').value.trim();

    let yaml = '---\n';
    yaml += 'title: "' + escapeYamlString(title) + '"\n';
    yaml += 'slug: ' + escapeYamlValue(slug) + '\n';
    yaml += 'date: ' + date + '\n';
    yaml += 'status: ' + status + '\n';
    yaml += 'language: ' + language + '\n';
    yaml += 'en_title: "' + escapeYamlString(enTitle) + '"\n';
    yaml += enBody ? 'en_body_path: ' + escapeYamlValue(enBody) + '\n' : 'en_body_path: ""\n';
    yaml += 'seo_title: "' + escapeYamlString(seoTitle) + '"\n';
    yaml += 'seo_description: "' + escapeYamlString(seoDesc) + '"\n';
    if (currentTags.length > 0) {
      yaml +=
        'tags: [' +
        currentTags.map(function (t) {
          return '"' + escapeYamlString(t) + '"';
        }).join(', ') +
        ']\n';
    } else {
      yaml += 'tags: []\n';
    }
    yaml += '---';
    return yaml;
  }

  function getEditor() {
    return tinymceReady ? tinymce.get('field-body') : null;
  }

  function getMarkdownFromEditor() {
    const editor = getEditor();
    if (!editor || !turndownService) {
      return '';
    }
    const html = editor.getContent();
    if (!html || html === '<p></p>' || html === '<p><br></p>') {
      return '';
    }
    return turndownService.turndown(html).trim();
  }

  function setEditorFromMarkdown(md) {
    const editor = getEditor();
    if (!editor) {
      return;
    }
    const html = md
      ? marked.parse(md, { breaks: true, gfm: true })
      : '<p></p>';
    editor.setContent(html);
  }

  function updatePreview() {
    const yaml = generateYamlFrontmatter();
    const body = getMarkdownFromEditor();
    const yamlEl = document.getElementById('yaml-preview');
    const previewEl = document.getElementById('preview-content');
    if (yamlEl) {
      yamlEl.textContent = yaml;
    }
    if (previewEl) {
      previewEl.innerHTML = body
        ? marked.parse(body, { breaks: true, gfm: true })
        : '<p class="text-muted"><em>Nada escrito ainda…</em></p>';
    }
    updateWordCount();
  }

  function updateWordCount() {
    const editor = getEditor();
    if (!editor) {
      return;
    }
    const text = editor.getContent({ format: 'text' }).trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const mins = Math.max(1, Math.ceil(words / 200));
    const wc = document.getElementById('word-count');
    const rt = document.getElementById('read-time');
    if (wc) {
      wc.textContent = String(words);
    }
    if (rt) {
      rt.textContent = String(mins);
    }
  }

  function renderTags() {
    const container = document.getElementById('tag-list');
    if (!container) {
      return;
    }
    if (currentTags.length === 0) {
      container.innerHTML = '';
      return;
    }
    container.innerHTML = currentTags
      .map(function (tag, i) {
        return (
          '<span class="tag-badge">' +
          escapeHtml(tag) +
          ' <span class="tag-remove" data-index="' +
          i +
          '">&times;</span></span>'
        );
      })
      .join(' ');

    container.querySelectorAll('.tag-remove').forEach(function (el) {
      el.addEventListener('click', function () {
        currentTags.splice(parseInt(el.getAttribute('data-index'), 10), 1);
        renderTags();
        updatePreview();
      });
    });
  }

  async function listarArtigos() {
    const listEl = document.getElementById('artigos-list');
    if (!dirHandle || !listEl) {
      return;
    }

    const files = [];
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'file' && entry.name.endsWith('.md')) {
        files.push(entry.name);
      }
    }
    files.sort();

    if (files.length === 0) {
      listEl.innerHTML =
        '<p class="text-muted text-center py-3 mb-0">Nenhum .md na pasta. Clique em Novo artigo.</p>';
      return;
    }

    listEl.innerHTML = files
      .map(function (filename) {
        const slug = filename.replace(/\.md$/, '');
        return (
          '<div class="artigo-item" data-slug="' +
          escapeHtml(slug) +
          '" data-file="' +
          escapeHtml(filename) +
          '">' +
          '<div class="title">' +
          escapeHtml(slug) +
          '</div>' +
          '<div class="meta">' +
          escapeHtml(filename) +
          '</div></div>'
        );
      })
      .join('');

    listEl.querySelectorAll('.artigo-item').forEach(function (item) {
      item.addEventListener('click', function () {
        carregarArtigo(item.getAttribute('data-slug'), item.getAttribute('data-file'));
      });
    });
  }

  async function carregarArtigo(slug, filename) {
    try {
      showStatus('Carregando…', 'loading');
      const fileHandle = await dirHandle.getFileHandle(filename);
      const file = await fileHandle.getFile();
      const content = await file.text();
      const parsed = parseArticle(content);

      currentSlug = slug;
      currentFileHandle = fileHandle;

      document.getElementById('field-title').value = parsed.metadata.title || '';
      document.getElementById('field-slug').value = parsed.metadata.slug || slug;
      document.getElementById('field-date').value = parsed.metadata.date || '';
      document.getElementById('field-status').value = parsed.metadata.status || 'published';
      document.getElementById('field-language').value = parsed.metadata.language || 'pt';
      document.getElementById('field-seo-title').value = parsed.metadata.seo_title || '';
      document.getElementById('field-seo-desc').value = parsed.metadata.seo_description || '';
      document.getElementById('field-en-title').value = parsed.metadata.en_title || '';
      document.getElementById('field-en-body').value = parsed.metadata.en_body_path || '';

      currentTags = Array.isArray(parsed.metadata.tags) ? parsed.metadata.tags.slice() : [];
      renderTags();
      setEditorFromMarkdown(parsed.body);
      updatePreview();

      document.getElementById('form-title').textContent = 'Editar: ' + slug;
      document.getElementById('btn-excluir').hidden = false;
      document.getElementById('btn-salvar').innerHTML = '<i class="bi bi-save"></i> Salvar arquivo';

      listElHighlight(slug);
      showStatus('Artigo carregado.', 'success');
    } catch (err) {
      showStatus('Erro: ' + err.message, 'error');
    }
  }

  function listElHighlight(slug) {
    document.querySelectorAll('.artigo-item').forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('data-slug') === slug);
    });
  }

  function limparForm() {
    currentSlug = null;
    currentFileHandle = null;
    currentTags = [];
    document.getElementById('article-form').reset();
    document.getElementById('field-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('form-title').textContent = 'Novo artigo';
    document.getElementById('btn-excluir').hidden = true;
    document.getElementById('btn-salvar').innerHTML = '<i class="bi bi-save"></i> Salvar arquivo';
    setEditorFromMarkdown('');
    renderTags();
    updatePreview();
    listElHighlight(null);
  }

  /** Reconstrói articles.json a partir de todos os .md publicados na pasta. */
  async function reconstruirManifesto() {
    const slugs = [];

    for await (const entry of dirHandle.values()) {
      if (entry.kind !== 'file' || !entry.name.endsWith('.md')) {
        continue;
      }
      try {
        const file = await entry.getFile();
        const content = await file.text();
        if (!content.trim()) {
          continue;
        }
        const parsed = parseArticle(content);
        const fileSlug = entry.name.replace(/\.md$/, '');
        const articleSlug = String(parsed.metadata.slug || fileSlug).trim();
        const status = String(parsed.metadata.status || 'draft');
        if (status === 'published' && articleSlug) {
          slugs.push(articleSlug);
        }
      } catch (err) {
        console.warn('Ignorado no manifesto:', entry.name, err);
      }
    }

    slugs.sort();
    const manifestHandle = await dirHandle.getFileHandle('articles.json', { create: true });
    const writable = await manifestHandle.createWritable();
    await writable.write(JSON.stringify(slugs, null, 2) + '\n');
    await writable.close();
  }

  async function salvarArquivo() {
    if (!dirHandle) {
      alert('Abra a pasta content/blog/ primeiro.');
      return;
    }

    const title = document.getElementById('field-title').value.trim();
    const slug = document.getElementById('field-slug').value.trim();
    const status = document.getElementById('field-status').value;
    const markdown = getMarkdownFromEditor();

    if (!title || !slug) {
      alert('Preencha título e slug.');
      return;
    }
    if (!markdown) {
      alert('Escreva o conteúdo do artigo.');
      return;
    }

    showStatus('Salvando…', 'loading');

    try {
      const filename = slug + '.md';
      const fullContent = generateYamlFrontmatter() + '\n\n' + markdown;

      let fileHandle;
      if (currentFileHandle && currentSlug === slug) {
        fileHandle = currentFileHandle;
      } else {
        fileHandle = await dirHandle.getFileHandle(filename, { create: true });
      }

      const writable = await fileHandle.createWritable();
      await writable.write(fullContent);
      await writable.close();

      if (slug !== currentSlug && currentSlug && currentFileHandle) {
        const oldName = currentSlug + '.md';
        if (oldName !== filename) {
          try {
            await dirHandle.removeEntry(oldName);
          } catch (e) {
            /* ignore */
          }
        }
      }

      await reconstruirManifesto();

      currentSlug = slug;
      currentFileHandle = fileHandle;

      await listarArtigos();
      listElHighlight(slug);
      showStatus('Salvo em ' + filename + ' — faça commit quando quiser.', 'success');
    } catch (err) {
      showStatus('Erro: ' + err.message, 'error');
    }
  }

  async function excluirArquivo() {
    if (!currentSlug || !currentFileHandle) {
      return;
    }
    if (!confirm('Excluir o arquivo "' + currentSlug + '.md"?')) {
      return;
    }

    showStatus('Excluindo…', 'loading');
    try {
      await dirHandle.removeEntry(currentSlug + '.md');
      await reconstruirManifesto();
      limparForm();
      await listarArtigos();
      showStatus('Arquivo excluído.', 'success');
    } catch (err) {
      showStatus('Erro: ' + err.message, 'error');
    }
  }

  function initTurndown() {
    if (typeof TurndownService !== 'undefined') {
      turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-'
      });
      turndownService.addRule('strikethrough', {
        filter: ['del', 's'],
        replacement: function (content) {
          return '~~' + content + '~~';
        }
      });
    }
  }

  function initTinyMCE() {
    tinymce.init({
      selector: '#field-body',
      height: 420,
      menubar: false,
      plugins: 'lists link image code table autoresize wordcount',
      toolbar:
        'undo redo | blocks | bold italic underline strikethrough | ' +
        'alignleft aligncenter alignright | bullist numlist | link image table | removeformat code',
      branding: false,
      promotion: false,
      statusbar: true,
      placeholder: 'Escreva seu artigo aqui…',
      content_style:
        'body { font-family: "Plus Jakarta Sans", sans-serif; font-size: 16px; line-height: 1.75; padding: 12px; }',
      setup: function (editor) {
        editor.on('init', function () {
          tinymceReady = true;
          updatePreview();
        });
        editor.on('change keyup undo redo', function () {
          updatePreview();
        });
      }
    });
  }

  function bindEvents() {
    document.getElementById('btn-abrir-pasta').addEventListener('click', abrirPasta);
    document.getElementById('btn-novo').addEventListener('click', limparForm);
    document.getElementById('btn-limpar').addEventListener('click', limparForm);
    document.getElementById('btn-excluir').addEventListener('click', excluirArquivo);
    document.getElementById('article-form').addEventListener('submit', function (e) {
      e.preventDefault();
      salvarArquivo();
    });

    document.getElementById('field-title').addEventListener('blur', function () {
      const slugEl = document.getElementById('field-slug');
      if (!slugEl.value.trim()) {
        slugEl.value = slugify(document.getElementById('field-title').value);
        updatePreview();
      }
    });

    ['field-title', 'field-slug', 'field-date', 'field-status', 'field-language',
      'field-seo-title', 'field-seo-desc', 'field-en-title', 'field-en-body'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', updatePreview);
    });

    document.getElementById('field-tag-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = this.value.trim();
        if (val && !currentTags.includes(val)) {
          currentTags.push(val);
          renderTags();
          updatePreview();
          this.value = '';
        }
      }
    });

    document.getElementById('btn-add-tag').addEventListener('click', function () {
      const input = document.getElementById('field-tag-input');
      const val = input.value.trim();
      if (val && !currentTags.includes(val)) {
        currentTags.push(val);
        renderTags();
        updatePreview();
        input.value = '';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!supportsFileSystemAccess()) {
      document.getElementById('fs-hint').textContent =
        'Seu navegador não suporta acesso a pastas. Use Chrome ou Edge.';
      document.getElementById('btn-abrir-pasta').disabled = true;
    }

    document.getElementById('field-date').value = new Date().toISOString().split('T')[0];
    initTurndown();
    initTinyMCE();
    bindEvents();
    restaurarPasta();
  });
})();
