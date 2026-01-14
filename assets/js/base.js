document.addEventListener('DOMContentLoaded', () => {
  const data = (typeof PROFILE !== 'undefined') ? PROFILE : null;
  if (!data) return;

  // Year (optional)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  bindText(data);
  hydrateEmailEverywhere(data.email);

  // Portfolio-only (safe if IDs not present)
  renderHeroBullets(data.heroBullets || []);
  renderSkills('skillsTechnical', data.skills?.technical || []);
  renderSkills('skillsProfessional', data.skills?.professional || []);
  renderCv(data.cv || []);
  setupCvFilters();
});

/** Bind text via [data-bind="path"] and attrs via [data-bind-attr="href:path"] */
function bindText(data) {
  document.querySelectorAll('[data-bind]').forEach(el => {
    const key = el.getAttribute('data-bind');
    const value = getDeep(data, key);
    if (typeof value === 'string') el.textContent = value;
  });

  document.querySelectorAll('[data-bind-attr]').forEach(el => {
    const expr = el.getAttribute('data-bind-attr');
    const [attr, path] = expr.split(':');
    const value = getDeep(data, path);
    if (value) el.setAttribute(attr, value);
  });
}

function getDeep(obj, path) {
  return path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), obj);
}

function getEmail(emailObj) {
  if (!emailObj) return null;
  return `${emailObj.user}@${emailObj.domain}.${emailObj.tld}`;
}

/** Hydrate mailto on common CTAs where IDs exist */
function hydrateEmailEverywhere(emailObj) {
  const email = getEmail(emailObj);
  if (!email) return;

  const targets = [
    { link: '#emailCtaTop', text: null },
    { link: '#emailCtaHero', text: null },
    { link: '#emailBtn', text: null },
    { link: '#emailLinkInline', text: '#emailTextInline' },
    { link: '#emailLinkFooter', text: '#emailTextFooter' }
  ];

  targets.forEach(t => {
    const linkEl = document.querySelector(t.link);
    if (!linkEl) return;
    linkEl.href = `mailto:${email}`;
    if (t.text) {
      const textEl = document.querySelector(t.text);
      if (textEl) textEl.textContent = email;
    }
  });
}

/* =========================
   Helpers
   ========================= */
function getQueryParam(name) {
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  } catch (e) { return null; }
}

function formatPeriod(start, end) {
  const s = start ? formatYm(start) : '';
  const e = end ? formatYm(end) : 'heute';
  return (s && e) ? `${s} – ${e}` : '';
}

function formatYm(ym) {
  const [yStr, mStr] = String(ym).split('-');
  const y = Number(yStr);
  const m = Number(mStr);
  const months = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  const label = months[(m - 1) || 0] || 'Jan';
  return `${label} ${y}`;
}

function formatDuration(start, end) {
  if (!start) return '';
  const s = parseYm(start);
  const e = end ? parseYm(end) : todayYm();

  const months = (e.y - s.y) * 12 + (e.m - s.m) + 1;
  if (months <= 0) return '';

  const years = Math.floor(months / 12);
  const rem = months % 12;

  const parts = [];
  if (years) parts.push(`${years} Jahr${years === 1 ? '' : 'e'}`);
  if (rem) parts.push(`${rem} Monat${rem === 1 ? '' : 'e'}`);
  return parts.join(' ');
}

function parseYm(ym) {
  const [y, m] = String(ym).split('-').map(Number);
  return { y, m };
}
function todayYm() {
  const d = new Date();
  return { y: d.getFullYear(), m: d.getMonth() + 1 };
}

function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
function escapeAttr(str) {
  return escapeHtml(str).replaceAll('`', '&#096;');
}

/* ===== Icons (inline SVG, no external assets) ===== */
function iconSvg(key) {
  const base = (paths) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${paths}
    </svg>`;

  switch (key) {
    case 'mail': return base(`<path d="M4 4h16v16H4z"/><path d="m4 7 8 6 8-6"/>`);
    case 'phone': return base(`<path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-1 1A17 17 0 013 6a1 1 0 011-1h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.21 1.11z"/>`);
    case 'linkedin': return base(`<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>`);
    case 'pulse': return base(`<path d="M2 12h4l3-8 4 16 3-12h4"/>`);
    case 'gaming': return base(`<path d="M6 12h.01"/><path d="M12 12h.01"/><path d="M18 12h.01"/><path d="M2 12a10 10 0 1020 0 10 10 0 00-20 0z"/><path d="M6 16c1.333-1.333 4-1.333 6 0s4 1.333 6 0"/>`);
    case 'money': return base(`<circle cx="12" cy="12" r="9"/><path d="M8 9h8a4 4 0 010 6H8a4 4 0 010-6z"/><path d="M12 6v12"/>`);
    case 'python': return base(`<path d="M8 7h8a3 3 0 0 1 3 3v4"/><path d="M16 17H8a3 3 0 0 1-3-3V10"/><circle cx="9" cy="8.5" r="1"/><circle cx="15" cy="15.5" r="1"/>`);
    case 'java': return base(`<path d="M10 3c2 2 2 4 0 6"/><path d="M14 3c2 2 2 4 0 6"/><path d="M8 13h8"/><path d="M7 17c2 2 8 2 10 0"/><path d="M9 21h6"/>`);
    case 'ts': return base(`<path d="M4 5h16v14H4z"/><path d="M8 9h4"/><path d="M10 9v8"/><path d="M14 17c0-2 3-2 3-4s-3-2-3-4"/>`);
    case 'react': return base(`<circle cx="12" cy="12" r="2"/><path d="M7.5 8.5c2-2 7-2 9 0"/><path d="M7.5 15.5c2 2 7 2 9 0"/><path d="M6.5 12c0-3 3-6 5.5-6"/><path d="M17.5 12c0 3-3 6-5.5 6"/>`);
    case 'web': return base(`<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3 3 15 0 18"/><path d="M12 3c-3 3-3 15 0 18"/>`);
    case 'api': return base(`<path d="M7 8l-3 4 3 4"/><path d="M17 8l3 4-3 4"/><path d="M14 6l-4 12"/>`);
    case 'db': return base(`<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>`);
    case 'lock': return base(`<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`);
    case 'pipeline': return base(`<path d="M6 7h12"/><path d="M6 17h12"/><path d="M9 7v10"/><path d="M15 7v10"/>`);
    case 'box': return base(`<path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z"/><path d="M12 22V12"/><path d="M3.3 7.3 12 12l8.7-4.7"/>`);
    case 'k8s': return base(`<path d="M12 2l7 4v8l-7 4-7-4V6z"/><path d="M12 6v12"/><path d="M7 9h10"/><path d="M7 15h10"/>`);
    case 'terraform': return base(`<path d="M4 7l6-3v6l-6 3z"/><path d="M10 10l6-3v6l-6 3z"/><path d="M10 4l6 3v6l-6-3z"/>`);
    case 'cloud': return base(`<path d="M20 17.5a4.5 4.5 0 0 0-2-8.4A6 6 0 0 0 6.2 9.7 4 4 0 0 0 7 17.5h13Z"/>`);
    case 'shield': return base(`<path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>`);
    case 'gear': return base(`<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a7.7 7.7 0 0 0 .1-2l2-1.1-2-3.4-2.3.6a7.3 7.3 0 0 0-1.7-1L15 2h-6l-.5 2.1a7.3 7.3 0 0 0-1.7 1l-2.3-.6-2 3.4L4.6 13a7.7 7.7 0 0 0 .1 2L2.7 16.1l2 3.4 2.3-.6a7.3 7.3 0 0 0 1.7 1L9 22h6l.5-2.1a7.3 7.3 0 0 0 1.7-1l2.3.6 2-3.4Z"/>`);
    case 'pulse': return base(`<path d="M3 12h4l2-5 4 10 2-5h6"/>`);
    case 'frontend': return base(`<path d="M4 5h16v14H4z"/><path d="M4 9h16"/>`);
    case 'backend': return base(`<path d="M7 7h10v10H7z"/><path d="M4 12h3"/><path d="M17 12h3"/>`);
    case 'log': return base(`<path d="M4 4h16v16H4z"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h7"/>`);
    case 'code': return base(`<path d="M8 9l-3 3 3 3"/><path d="M16 9l3 3-3 3"/><path d="M14 6l-4 12"/>`);
    default: return base(`<circle cx="12" cy="12" r="9"/>`);
  }
}

function cvTypeIcon(type) {
  const base = (paths) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${paths}
    </svg>`;

  switch (type) {
    case 'work': return base(`<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 12h18"/>`);
    case 'education': return base(`<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>`);
    case 'volunteer': return base(`<path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z"/>`);
    default: return base(`<circle cx="12" cy="12" r="9"/>`);
  }
}

window.Core = {
  bindText, hydrateEmailEverywhere, getDeep, escapeHtml, iconSvg, getQueryParam
};
