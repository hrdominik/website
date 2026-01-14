/* assets/js/profile_renderer.js
   Renders the portfolio-specific pieces (hero bullets, skills, cv).
   Load this only on index.html (portfolio).
*/
"use strict";

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PROFILE === 'undefined') return;
  const data = PROFILE;
  if (!data) return;

  // bind basic fields and hydrate mail
  Core.bindText(data);
  Core.hydrateEmailEverywhere(data.email);

  // render hero bullets (checks)
  renderHeroBullets(data.heroBullets || []);

  // skills/cv
  renderSkills('skillsTechnical', data.skills?.technical || []);
  renderSkills('skillsProfessional', data.skills?.professional || []);
  renderCv(data.cv || []);
  setupCvFilters();

  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});

/* HERO bullets with check icon */
function renderHeroBullets(items) {
  const ul = document.getElementById('heroBullets');
  if (!ul) return;
  const checkSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>`;
  ul.innerHTML = (items || []).map(t => `
    <li class="flex gap-3">
      <span class="hero-check mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
        ${checkSvg}
      </span>
      <span class="opacity-90">${Core.escapeHtml(t)}</span>
    </li>
  `).join('');
}

/* Skills renderer reused from previous base.js */
function renderSkills(containerId, groups) {
  const root = document.getElementById(containerId);
  if (!root) return;
  root.innerHTML = (groups || []).map(g => {
    const chips = (g.items || []).map(s => {
      const cls = s.accent ? 'chip chip--ink' : 'chip';
      return `
        <span class="${cls}">
          ${Core.iconSvg(s.icon || 'code')}
          <span>${Core.escapeHtml(s.name)}</span>
        </span>
      `;
    }).join('');
    return `
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] opacity-70 flex items-center gap-2">
          <span class="inline-flex">${Core.iconSvg(g.icon || 'code')}</span>
          <span>${Core.escapeHtml(g.group)}</span>
        </p>
        <div class="mt-2 flex flex-wrap gap-2">${chips}</div>
      </div>
    `;
  }).join('');
}

/* CV renderer (same as prior, uses Core functions) */
function renderCv(items) {
  const list = document.getElementById('cvList');
  if (!list) return;
  list.innerHTML = (items || []).map((it, idx) => {
    const num = idx + 1;
    const dur = formatDuration(it.start, it.end);
    const period = formatPeriod(it.start, it.end);
    const hasDetails = (it.highlights && it.highlights.length) || it.summary;
    const detailsId = `cv-details-${idx}`;
    const detailsHtml = hasDetails ? `
      <div id="${detailsId}" class="cv-details hidden">
        ${it.summary ? `<p class="text-sm opacity-80">${Core.escapeHtml(it.summary)}</p>` : ''}
        ${(it.highlights && it.highlights.length) ? `<ul>${it.highlights.map(h=>`<li>${Core.escapeHtml(h)}</li>`).join('')}</ul>` : ''}
      </div>` : '';
    const toggleBtn = hasDetails ? `
      <button type="button" class="ml-2 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-xs font-extrabold"
              data-cv-toggle="${detailsId}" aria-expanded="false">Details <span aria-hidden="true">▾</span></button>` : '';
    const type = (it.type || 'work');
    const typeClass = type === 'work' ? 'cv-type-icon cv-type-icon--work' : 'cv-type-icon';
    return `
      <li class="cv-row" data-cv-item data-type="${Core.escapeHtml(type)}">
        <div class="cv-num">${num}<span class="${typeClass}">${cvTypeIcon(type)}</span></div>
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <p class="font-semibold">${Core.escapeHtml(it.role || '')}</p>
            ${toggleBtn}
          </div>
          <p class="text-sm opacity-70">${Core.escapeHtml(it.org || '')}${it.location ? ` • ${Core.escapeHtml(it.location)}` : ''}</p>
          ${detailsHtml}
        </div>
        <div class="text-right"><p class="text-sm font-semibold">${Core.escapeHtml(period)}</p><p class="text-xs opacity-60">${Core.escapeHtml(dur)}</p></div>
      </li>
    `;
  }).join('');

  // toggles
  document.querySelectorAll('[data-cv-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-cv-toggle');
      const el = document.getElementById(id);
      if (!el) return;
      const isOpen = !el.classList.contains('hidden');
      el.classList.toggle('hidden', isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      const icon = btn.querySelector('span[aria-hidden="true"]');
      if (icon) icon.textContent = isOpen ? '▾' : '▴';
    });
  });
}

function setupCvFilters() {
  const filterBtns = Array.from(document.querySelectorAll('#cvFilters [data-filter]'));
  const cvItems = Array.from(document.querySelectorAll('[data-cv-item]'));
  if (!filterBtns.length) return;
  function setFilter(active) {
    filterBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === active)));
    cvItems.forEach(item => { const type = item.dataset.type; item.hidden = !((active==='all')||(type===active)); });
  }
  filterBtns.forEach(btn => btn.addEventListener('click', ()=> setFilter(btn.dataset.filter)));
  setFilter('all');
}

/* small helpers re-used here */
function formatPeriod(start, end) {
  const s = start ? formatYm(start) : '';
  const e = end ? formatYm(end) : 'heute';
  return (s && e) ? `${s} – ${e}` : '';
}
function formatYm(ym) {
  const [yStr, mStr] = String(ym || '').split('-'); const y = Number(yStr); const m = Number(mStr);
  const months = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  const label = months[(m - 1) || 0] || String(y || '');
  return `${label} ${y}`;
}
function formatDuration(start, end) {
  if (!start) return '';
  const s = parseYm(start); const e = end ? parseYm(end) : todayYm();
  const months = (e.y - s.y) * 12 + (e.m - s.m) + 1;
  if (months <= 0) return '';
  const years = Math.floor(months / 12); const rem = months % 12;
  const parts = []; if (years) parts.push(`${years} Jahr${years===1?'':'e'}`); if (rem) parts.push(`${rem} Monat${rem===1?'':'e'}`);
  return parts.join(' ');
}
function parseYm(ym) { const [y,m]=String(ym||'').split('-').map(Number); return {y,m}; }
function todayYm(){ const d=new Date(); return { y:d.getFullYear(), m:d.getMonth()+1 }; }
function cvTypeIcon(type) { return Core.iconSvg(type==='education'?'code':'code'); }
