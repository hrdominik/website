/* assets/js/linktree_renderer.js
   Renders linktree lists using PROFILE.linktree
*/
"use strict";

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PROFILE === 'undefined') return;
  Core.bindText(PROFILE);
  Core.hydrateEmailEverywhere(PROFILE.email);

  renderLinktree(PROFILE);
  const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});

function renderLinktree(data) {
  const biz = document.getElementById('linktreeBusiness');
  const priv = document.getElementById('linktreePrivate');
  if (!biz && !priv) return;

  const email = getEmailFromProfile(data);

  const renderList = (root, links) => {
    if (!root) return;
    root.innerHTML = (links || []).map(l => {
      const href = l.mailto ? `mailto:${email||''}` : (l.url || '#');
      const isInk = l.style === 'ink';
      const cls = isInk ? 'link-card link-card--ink' : 'link-card';
      return `
        <a class="${cls}" href="${Core.escapeHtml(href)}" ${String(href).startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          <div class="link-card__left">
            <span class="link-card__icon">${Core.iconSvg(l.icon || 'web')}</span>
            <div class="min-w-0">
              <div class="link-card__label">${Core.escapeHtml(l.label || 'Link')}</div>
              ${l.desc ? `<div class="link-card__desc">${Core.escapeHtml(l.desc)}</div>` : ''}
            </div>
          </div>
          <span class="link-card__arrow" aria-hidden="true">↗</span>
        </a>
      `;
    }).join('');
  };

  renderList(biz, data.linktree?.business || []);
  renderList(priv, data.linktree?.private || []);
}

function getEmailFromProfile(p) {
  if (!p || !p.email) return null;
  return `${p.email.user}@${p.email.domain}.${p.email.tld}`;
}
