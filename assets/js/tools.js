"use strict";

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PROFILE === 'undefined') return;
  if (typeof Core !== 'undefined') {
    Core.bindText(PROFILE);
    Core.hydrateEmailEverywhere(PROFILE.email);
  }

  renderTools(PROFILE);
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});

function renderTools(data) {
  const root = document.getElementById('toolsList');
  if (!root) return;

  const escapeFn = (typeof Core !== 'undefined' && Core.escapeHtml) ? Core.escapeHtml : (s => s);
  const escapeAttrFn = (typeof Core !== 'undefined' && Core.escapeAttr) ? Core.escapeAttr : escapeFn;
  const getIconFn = (typeof Core !== 'undefined' && Core.iconSvg) ? Core.iconSvg : (typeof iconSvg === 'function' ? iconSvg : () => '');

  root.innerHTML = (data.tools || []).map(t => {
    const isExternal = String(t.url || '').startsWith('http');
    const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
    const tagHtml = t.tag ? `<span class="badge-category badge-category--technical">${escapeFn(t.tag)}</span>` : '<span></span>';
    const iconHtml = t.icon ? `<span class="tool-card__icon">${getIconFn(t.icon)}</span>` : '';

    return `
      <a class="post-card" href="${escapeAttrFn(t.url || '#')}" ${targetAttr}>
        <div class="flex items-center justify-between gap-3 mb-2">
          ${tagHtml}
          <div class="post-card__meta opacity-70 text-xs font-semibold flex items-center gap-1">
            <span>Öffnen</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
        <div class="post-card__title flex items-center gap-2.5">
          ${iconHtml}
          <span>${escapeFn(t.name || 'Tool')}</span>
        </div>
        <div class="post-card__excerpt">${escapeFn(t.desc || '')}</div>
      </a>
    `;
  }).join('');
}