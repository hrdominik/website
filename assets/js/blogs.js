/* assets/js/blog_renderer.js
   Renders blog index and loads individual markdown posts from /assets/blog/<slug>.md
   Load this on both blog.html and blog-post.html
*/
"use strict";

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof PROFILE === 'undefined') return;
  Core.bindText(PROFILE);
  Core.hydrateEmailEverywhere(PROFILE.email);

  renderBlogIndex(PROFILE);
  renderBlogPost(PROFILE);

  // set year
  const y = document.getElementById('year'); if (y) y.textContent = String(new Date().getFullYear());
});


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

  root.innerHTML = posts.map(p => {
    const url = `./blog-post.html?slug=${encodeURIComponent(p.slug)}`;
    const tags = (p.tags || []).slice(0, 4).map(tag => `<span class="pill">${escapeHtml(tag)}</span>`).join('');
    return `
      <a class="post-card" href="${escapeAttr(url)}">
        <div class="post-card__meta">
          <span class="opacity-70">${escapeHtml(p.date || '')}</span>
          <span class="opacity-50">•</span>
          <span class="opacity-70">${escapeHtml(p.readTime || '')}</span>
        </div>
        <div class="post-card__title">${escapeHtml(p.title || 'Post')}</div>
        <div class="post-card__excerpt">${escapeHtml(p.excerpt || '')}</div>
        <div class="post-card__tags">${tags}</div>
      </a>
    `;
  }).join('');
}

/* =========================
   Blog post (markdown)
   ========================= */
function renderBlogPost(data) {
  const contentEl = document.getElementById('postContent');
  if (!contentEl) return;

  const titleEl = document.getElementById('postTitle');
  const metaEl = document.getElementById('postMeta');
  const tagsEl = document.getElementById('postTags');

  const slug = getQueryParam('slug');
  const post = (data.blog?.posts || []).find(p => p.slug === slug) || (data.blog?.posts || [])[0];

  if (!post) {
    if (titleEl) titleEl.textContent = 'Post nicht gefunden';
    contentEl.innerHTML = `<div class="card p-6">Dieser Blogpost existiert nicht.</div>`;
    return;
  }

  if (titleEl) titleEl.textContent = post.title || 'Blogpost';
  if (metaEl) metaEl.textContent = `${post.date || ''} • ${post.readTime || ''}`;
  if (tagsEl) tagsEl.innerHTML = (post.tags || []).map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('');

  const md = String(post.markdown || '');
  contentEl.innerHTML = markdownToHtml(md);
}

/* =========================
   Markdown (safe-ish, minimal)
   ========================= */
function markdownToHtml(mdRaw) {
  if (mdRaw == null) return '<p>(no content)</p>';
  let md = String(mdRaw).replace(/\r\n/g, '\n');

  // Extract fenced code blocks first
  const codeBlocks = [];
  md = md.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    codeBlocks.push({ lang: lang || '', code: escapeHtml(code) });
    return `@@CODE${codeBlocks.length - 1}@@`;
  });

  // Escape remaining
  md = escapeHtml(md);

  const lines = md.split('\n');
  let html = '';
  let inList = false;
  let para = [];

  const flushPara = () => {
    if (para.length) {
      html += `<p>${inlineMd(para.join(' '))}</p>`;
      para = [];
    }
  };
  const closeList = () => {
    if (inList) {
      html += `</ul>`;
      inList = false;
    }
  };

  for (const line of lines) {
    const t = line.trim();

    // blank
    if (!t) {
      flushPara();
      closeList();
      continue;
    }

    // placeholders for code blocks
    if (t.startsWith('@@CODE') && t.endsWith('@@')) {
      flushPara();
      closeList();
      html += `<div>${t}</div>`;
      continue;
    }

    // headings
    const h = t.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const level = h[1].length;
      html += `<h${level}>${inlineMd(h[2])}</h${level}>`;
      continue;
    }

    // list
    const li = t.match(/^[-*]\s+(.*)$/);
    if (li) {
      flushPara();
      if (!inList) {
        html += `<ul>`;
        inList = true;
      }
      html += `<li>${inlineMd(li[1])}</li>`;
      continue;
    }

    // paragraph
    para.push(t);
  }

  flushPara();
  closeList();

  // replace code placeholders
  html = html.replace(/@@CODE(\d+)@@/g, (_, idxStr) => {
    const idx = Number(idxStr);
    const block = codeBlocks[idx];
    if (!block) return '';
    const langCls = block.lang ? ` class="language-${escapeAttr(block.lang)}"` : '';
    return `<pre><code${langCls}>${block.code}</code></pre>`;
  });

  // Wrap for styling
  return `<div class="md">${html}</div>`;
}

function inlineMd(s) {
  // inline code
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // bold
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // italic (simple)
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // links
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s;
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

/* BLOG INDEX: uses PROFILE.blog.posts metadata */
function renderBlogIndex(data) {
  const root = document.getElementById('blogList');
  if (!root) return;
  const posts = data.blog?.posts || [];
  if (!posts.length) {
    root.innerHTML = `<div class="card p-6 opacity-75">Noch keine Posts.</div>`;
    return;
  }
  root.innerHTML = posts.map(p => {
    const url = `./blog-post.html?slug=${encodeURIComponent(p.slug)}`;
    const tags = (p.tags||[]).slice(0,4).map(t => `<span class="pill">${Core.escapeHtml(t)}</span>`).join('');
    return `
      <a class="post-card" href="${Core.escapeHtml(url)}">
        <div class="post-card__meta">
          <span class="opacity-70">${Core.escapeHtml(p.date||'')}</span>
          <span class="opacity-50">•</span>
          <span class="opacity-70">${Core.escapeHtml(p.readTime||'')}</span>
        </div>
        <div class="post-card__title">${Core.escapeHtml(p.title||'Post')}</div>
        <div class="post-card__excerpt">${Core.escapeHtml(p.excerpt||'')}</div>
        <div class="post-card__tags">${tags}</div>
      </a>`;
  }).join('');
}

/* BLOG POST: fetch .md and render */
async function renderBlogPost(data) {
  const slug = Core.getQueryParam('slug') || (data.blog?.posts?.[0]?.slug);
  const target = document.getElementById('postContent');
  const titleEl = document.getElementById('postTitle');
  const metaEl = document.getElementById('postMeta');
  const tagsEl = document.getElementById('postTags');
  if (!slug || !target) {
    if (titleEl) titleEl.textContent = 'Post nicht gefunden';
    target.innerHTML = `<div class="card p-6">Dieser Blogpost existiert nicht.</div>`;
    return;
  }

  const postMeta = (data.blog?.posts || []).find(p => p.slug === slug);
  if (postMeta) {
    if (titleEl) titleEl.textContent = postMeta.title || 'Blogpost';
    if (metaEl) metaEl.textContent = `${postMeta.date || ''} • ${postMeta.readTime || ''}`;
    if (tagsEl) tagsEl.innerHTML = (postMeta.tags || []).map(t => `<span class="pill">${Core.escapeHtml(t)}</span>`).join('');
  }

  // try fetching markdown file from /assets/blog/<slug>.md
  const mdPath = `./${encodeURIComponent(slug)}.md`;
  const mdText = await fetchText(mdPath);

  if (!mdText) {
    target.innerHTML = `<div class="card p-6">Fehler: Beitrag konnte nicht geladen werden (${Core.escapeHtml(mdPath)}).</div>`;
    return;
  }

  // render markdown -> html
  target.innerHTML = markdownToHtml(mdText);
}
