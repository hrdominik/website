/* assets/js/blogs.js
   Renders blog index and loads individual markdown posts from /blog/<slug>.md
   Supports Category Badges (Technical vs Business & Thoughts) and Category Filtering
*/
"use strict";

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof PROFILE === 'undefined') return;
  if (typeof Core !== 'undefined') {
    Core.bindText(PROFILE);
    Core.hydrateEmailEverywhere(PROFILE.email);
  }

  renderBlogIndex(PROFILE);
  renderBlogPost(PROFILE);

  // set year
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
});

/* =========================
   Category Badge Helper
   ========================= */
function getCategoryBadgeHtml(category, categoryLabel) {
  const cat = String(category || '').toLowerCase();
  const escapeFn = (typeof Core !== 'undefined' && Core.escapeHtml) ? Core.escapeHtml : (s => s);

  if (cat === 'technical') {
    const label = categoryLabel || 'Technical';
    return `<span class="badge-category badge-category--technical">${escapeFn(label)}</span>`;
  } else if (cat === 'thoughts') {
    const label = categoryLabel || 'Business & Thoughts';
    return `<span class="badge-category badge-category--thoughts">${escapeFn(label)}</span>`;
  }
  const label = categoryLabel || 'Post';
  return `<span class="badge-category badge-category--default">${escapeFn(label)}</span>`;
}

/* =========================
   Blog index
   ========================= */
function renderBlogIndex(data) {
  const root = document.getElementById('blogList');
  if (!root) return;

  const posts = data.blog?.posts || [];
  if (!posts.length) {
    root.innerHTML = `<div class="card p-6 opacity-75">Noch keine Posts – bald mehr.</div>`;
    return;
  }

  const escapeFn = (typeof Core !== 'undefined' && Core.escapeHtml) ? Core.escapeHtml : (s => s);
  const escapeAttrFn = (typeof Core !== 'undefined' && Core.escapeAttr) ? Core.escapeAttr : escapeFn;

  // Render category filter bar if container exists
  const filterRoot = document.getElementById('categoryFilter');
  if (filterRoot) {
    const techCount = posts.filter(p => p.category === 'technical').length;
    const thoughtsCount = posts.filter(p => p.category === 'thoughts').length;

    filterRoot.innerHTML = `
      <button class="category-filter__btn active" data-filter="all">Alle (${posts.length})</button>
      <button class="category-filter__btn" data-filter="technical">Technical (${techCount})</button>
      <button class="category-filter__btn" data-filter="thoughts">Business & Thoughts (${thoughtsCount})</button>
    `;

    filterRoot.querySelectorAll('.category-filter__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterRoot.querySelectorAll('.category-filter__btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        filterBlogCards(filter);
      });
    });
  }

  root.innerHTML = posts.map(p => {
    const url = `./blog-post.html?slug=${encodeURIComponent(p.slug)}`;
    const tags = (p.tags || []).slice(0, 4).map(tag => `<span class="pill">${escapeFn(tag)}</span>`).join('');
    const badgeHtml = getCategoryBadgeHtml(p.category, p.categoryLabel);

    return `
      <a class="post-card" data-category="${escapeAttrFn(p.category || 'other')}" href="${escapeAttrFn(url)}">
        <div class="flex items-center justify-between gap-3 mb-2">
          ${badgeHtml}
          <div class="post-card__meta opacity-70 text-xs font-semibold">
            <span>${escapeFn(p.date || '')}</span>
            <span class="opacity-50">•</span>
            <span>${escapeFn(p.readTime || '')}</span>
          </div>
        </div>
        <div class="post-card__title">${escapeFn(p.title || 'Post')}</div>
        <div class="post-card__excerpt">${escapeFn(p.excerpt || '')}</div>
        <div class="post-card__tags">${tags}</div>
      </a>
    `;
  }).join('');
}

function filterBlogCards(filter) {
  const cards = document.querySelectorAll('#blogList .post-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    if (filter === 'all' || cat === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/* =========================
   Blog post (markdown)
   ========================= */
async function renderBlogPost(data) {
  const contentEl = document.getElementById('postContent');
  if (!contentEl) return;

  const titleEl = document.getElementById('postTitle');
  const metaEl = document.getElementById('postMeta');
  const tagsEl = document.getElementById('postTags');

  const getParam = (typeof Core !== 'undefined' && Core.getQueryParam) ? Core.getQueryParam : (key => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  });

  const slug = getParam('slug') || (data.blog?.posts?.[0]?.slug);
  const postMeta = (data.blog?.posts || []).find(p => p.slug === slug);

  if (!postMeta) {
    if (titleEl) titleEl.textContent = 'Post nicht gefunden';
    contentEl.innerHTML = `<div class="card p-6">Dieser Blogpost existiert nicht.</div>`;
    return;
  }

  const escapeFn = (typeof Core !== 'undefined' && Core.escapeHtml) ? Core.escapeHtml : (s => s);

  if (titleEl) titleEl.textContent = postMeta.title || 'Blogpost';
  if (metaEl) {
    const badgeHtml = getCategoryBadgeHtml(postMeta.category, postMeta.categoryLabel);
    metaEl.innerHTML = `<div class="flex items-center gap-3">${badgeHtml} <span>${escapeFn(postMeta.date || '')} • ${escapeFn(postMeta.readTime || '')}</span></div>`;
  }
  if (tagsEl) tagsEl.innerHTML = (postMeta.tags || []).map(t => `<span class="pill">${escapeFn(t)}</span>`).join('');

  // try fetching markdown file from /blog/<slug>.md
  const mdPath = `./${encodeURIComponent(slug)}.md`;
  const mdText = await fetchText(mdPath);

  if (!mdText) {
    contentEl.innerHTML = `<div class="card p-6">Fehler: Beitrag konnte nicht geladen werden (${escapeFn(mdPath)}).</div>`;
    return;
  }

  contentEl.innerHTML = markdownToHtml(mdText);
}

/* =========================
   Markdown parser (safe-ish, minimal)
   ========================= */
/* =========================
   Markdown parser (Enhanced)
   ========================= */
function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function markdownToHtml(mdRaw) {
  if (mdRaw == null) return '<p>(no content)</p>';
  let md = String(mdRaw).replace(/\r\n/g, '\n');

  const mdEscapeHtml = (value) => {
    if (typeof Core !== 'undefined' && typeof Core.escapeHtml === 'function') return Core.escapeHtml(value);
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const mdEscapeAttr = (value) => {
    if (typeof Core !== 'undefined' && typeof Core.escapeAttr === 'function') return Core.escapeAttr(value);
    return mdEscapeHtml(value);
  };

  // 1. Extract fenced code blocks first
  const codeBlocks = [];
  md = md.replace(/```([a-zA-Z0-9_+\-#]+)?[ \t]*\n([\s\S]*?)```/g, (_, lang, code) => {
    codeBlocks.push({ lang: lang || '', code: mdEscapeHtml(code) });
    return `\n\n@@CODE${codeBlocks.length - 1}@@\n\n`;
  });

  // 2. Extract markdown tables before escaping text
  const tableBlocks = [];
  const tableRegex = /(?:(?:^|\n)\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)+)/g;

  md = md.replace(tableRegex, (match) => {
    const rawLines = match.trim().split('\n');
    if (rawLines.length < 2) return match;

    const parseRow = (rowStr) => {
      const cells = rowStr.split('|');
      if (cells.length > 2) {
        return cells.slice(1, -1).map(c => c.trim());
      }
      return cells.map(c => c.trim()).filter(Boolean);
    };

    const headers = parseRow(rawLines[0]);
    // rawLines[1] is alignment / delimiter row (|---|---|)
    const bodyRows = rawLines.slice(2).map(parseRow);

    let tableHtml = '<div class="table-wrapper"><table class="md-table"><thead><tr>';
    headers.forEach(h => {
      tableHtml += `<th>${inlineMd(mdEscapeHtml(h))}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';

    bodyRows.forEach(row => {
      tableHtml += '<tr>';
      row.forEach(c => {
        tableHtml += `<td>${inlineMd(mdEscapeHtml(c))}</td>`;
      });
      tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table></div>';
    tableBlocks.push(tableHtml);
    return `\n\n@@TABLE${tableBlocks.length - 1}@@\n\n`;
  });

  // 3. Escape remaining text
  md = mdEscapeHtml(md);

  const lines = md.split('\n');
  let html = '';
  let inList = null; // null | 'ul' | 'ol'
  let para = [];
  let quote = [];

  const flushPara = () => {
    if (para.length) {
      html += `<p>${inlineMd(para.join(' '))}</p>`;
      para = [];
    }
  };
  const closeList = () => {
    if (inList === 'ul') html += `</ul>`;
    else if (inList === 'ol') html += `</ol>`;
    inList = null;
  };
  const flushQuote = () => {
    if (!quote.length) return;

    const firstLine = quote[0].trim();
    // Match GFM Callout: [!NOTE], [!WARNING], [!UPDATE], [!TIP], [!INFO], [!IMPORTANT], [!CAUTION]
    const gfmMatch = firstLine.match(/^\[!(NOTE|WARNING|UPDATE|TIP|INFO|IMPORTANT|CAUTION)\]\s*(.*)$/i);
    // Match bold header Callout: **Updated...**, **Note:**, **Warning:**, **Tip:**
    const boldMatch = firstLine.match(/^\*\*(Updated(?:\s*\([^)]+\))?|Note|Warning|Tip|Info|Achtung|Connection to database[^*]+)[:\s]*\*\*:?\s*(.*)$/i);

    if (gfmMatch) {
      const typeRaw = gfmMatch[1].toLowerCase();
      let type = typeRaw;
      if (typeRaw === 'important' || typeRaw === 'caution') type = 'warning';
      if (typeRaw === 'note') type = 'info';

      const customTitle = gfmMatch[2];
      const title = customTitle || (type === 'update' ? 'Update' : type === 'warning' ? 'Warning' : type === 'tip' ? 'Tip' : 'Note');

      const bodyText = quote.slice(1).join(' ');

      html += `<div class="callout callout--${type}">
        <div class="callout__header">${inlineMd(title)}</div>
        <div class="callout__body">${bodyText ? `<p>${inlineMd(bodyText)}</p>` : ''}</div>
      </div>`;
    } else if (boldMatch) {
      const matchLabel = boldMatch[1];
      let type = 'info';
      if (/updated/i.test(matchLabel)) type = 'update';
      else if (/warning|achtung|connection/i.test(matchLabel)) type = 'warning';
      else if (/tip/i.test(matchLabel)) type = 'tip';

      const inlineRest = boldMatch[2];
      const bodyLines = quote.slice(1);
      const fullBody = (inlineRest ? inlineRest + ' ' : '') + bodyLines.join(' ');

      html += `<div class="callout callout--${type}">
        <div class="callout__header">${inlineMd(matchLabel)}</div>
        <div class="callout__body"><p>${inlineMd(fullBody)}</p></div>
      </div>`;
    } else {
      html += `<blockquote><p>${inlineMd(quote.join(' '))}</p></blockquote>`;
    }

    quote = [];
  };

  for (const line of lines) {
    const t = line.trim();

    if (!t) {
      flushPara();
      closeList();
      flushQuote();
      continue;
    }

    if (t.startsWith('@@CODE') && t.endsWith('@@')) {
      flushPara();
      closeList();
      flushQuote();
      html += t;
      continue;
    }

    if (t.startsWith('@@TABLE') && t.endsWith('@@')) {
      flushPara();
      closeList();
      flushQuote();
      html += t;
      continue;
    }

    // Blockquote
    const bq = t.match(/^&gt;\s?(.*)$/);
    if (bq) {
      flushPara();
      closeList();
      quote.push(bq[1].trim());
      continue;
    } else {
      flushQuote();
    }

    // Headings (with auto ID slug)
    const h = t.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const level = h[1].length;
      const headingText = h[2];
      const headingId = slugify(headingText);
      html += `<h${level} id="${headingId}">${inlineMd(headingText)}</h${level}>`;
      continue;
    }

    // Unordered List
    const uli = t.match(/^[-*]\s+(.*)$/);
    if (uli) {
      flushPara();
      if (inList !== 'ul') {
        closeList();
        html += `<ul>`;
        inList = 'ul';
      }
      html += `<li>${inlineMd(uli[1])}</li>`;
      continue;
    }

    // Ordered List
    const oli = t.match(/^(\d+)\.\s+(.*)$/);
    if (oli) {
      flushPara();
      if (inList !== 'ol') {
        closeList();
        html += `<ol>`;
        inList = 'ol';
      }
      html += `<li>${inlineMd(oli[2])}</li>`;
      continue;
    }

    para.push(t);
  }

  flushPara();
  closeList();
  flushQuote();

  // Restore Code blocks
  html = html.replace(/@@CODE(\d+)@@/g, (_, idxStr) => {
    const idx = Number(idxStr);
    const block = codeBlocks[idx];
    if (!block) return '';
    const lang = block.lang ? mdEscapeAttr(block.lang) : '';
    const langCls = lang ? ` class="language-${lang}"` : '';
    const headerHtml = lang ? `<div class="code-block__header"><span>${lang}</span></div>` : '';
    return `<div class="code-block">${headerHtml}<pre><code${langCls}>${block.code}</code></pre></div>`;
  });

  // Restore Table blocks
  html = html.replace(/@@TABLE(\d+)@@/g, (_, idxStr) => {
    const idx = Number(idxStr);
    return tableBlocks[idx] || '';
  });

  return `<div class="md">${html}</div>`;
}

function inlineMd(s) {
  if (!s) return '';

  const escapeFn = (typeof Core !== 'undefined' && Core.escapeAttr) ? Core.escapeAttr : (v => v);

  // 1. Linked Images: [![alt](src)](href)
  s = s.replace(/\[\s*!\[([^\]]*)\]\(([^)]+)\)\s*\]\(([^)]+)\)/g, (_, alt, src, href) => {
    const rawSrc = String(src || '').trim();
    const rawHref = String(href || '').trim();
    const loweredHref = rawHref.replace(/[\u0000-\u0020]+/g, '').toLowerCase();
    const isExternal = loweredHref.startsWith('http://') || loweredHref.startsWith('https://');
    const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const caption = alt ? `<figcaption class="md-figcaption">${inlineMdTextOnly(alt)}</figcaption>` : '';

    return `<figure class="md-figure"><a href="${escapeFn(rawHref)}"${targetAttr} class="md-img-link"><img src="${escapeFn(rawSrc)}" alt="${escapeFn(alt)}" class="md-img" loading="lazy" /></a>${caption}</figure>`;
  });

  // 2. Standalone Images: ![alt](src)
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const rawSrc = String(src || '').trim();
    const caption = alt ? `<figcaption class="md-figcaption">${inlineMdTextOnly(alt)}</figcaption>` : '';
    return `<figure class="md-figure"><img src="${escapeFn(rawSrc)}" alt="${escapeFn(alt)}" class="md-img" loading="lazy" />${caption}</figure>`;
  });

  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*\*/g, '<em>$1</em>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
    const raw = String(href || '').trim();
    const lowered = raw.replace(/[\u0000-\u0020]+/g, '').toLowerCase();
    const isExternal = lowered.startsWith('http://') || lowered.startsWith('https://');
    const isSafe =
      isExternal ||
      lowered.startsWith('mailto:') ||
      lowered.startsWith('/') ||
      lowered.startsWith('./') ||
      lowered.startsWith('../') ||
      lowered.startsWith('#');

    const safeHref = isSafe ? raw : '#';
    const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${safeHref}"${targetAttr}>${text}</a>`;
  });
  return s;
}

function inlineMdTextOnly(s) {
  if (!s) return '';
  return s.replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/\*([^*]+)\*/g, '$1')
          .replace(/`([^`]+)`/g, '$1');
}

/* fetchText utility */
async function fetchText(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.text();
  } catch (e) {
    console.warn('fetchText failed', path, e);
    return null;
  }
}


