"use strict";

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PROFILE === 'undefined') return;
  Core.bindText(PROFILE);
  Core.hydrateEmailEverywhere(PROFILE.email);

  renderTools(PROFILE);
  const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});

function renderTools(data) {
  const root = document.getElementById('toolsList');
  if (!root) return;

  root.innerHTML = (data.tools || []).map(t => `
    <article class="tool-card">
      <div class="tool-card__top">
        <div class="tool-card__title">
          <span class="tool-card__icon">${iconSvg(t.icon || 'gear')}</span>
          <span>${escapeHtml(t.name || 'Tool')}</span>
        </div>
        ${t.tag ? `<span class="pill">${escapeHtml(t.tag)}</span>` : ''}
      </div>
      <p class="tool-card__desc">${escapeHtml(t.desc || '')}</p>
      <div class="tool-card__actions">
        <a class="btn-ink" href="${escapeAttr(t.url || '#')}" ${String(t.url || '').startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          Öffnen <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  `).join('');
}