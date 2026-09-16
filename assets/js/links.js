/* assets/js/linktree_renderer.js
   Renders linktree lists using PROFILE.linktree
*/
"use strict";

document.addEventListener('DOMContentLoaded', () => {
  initQrShare();

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

function initQrShare() {
  const qrDetails = document.getElementById('qrShareDetails');
  const qrContainer = document.getElementById('qrCodeContainer');
  let qrGenerated = false;

  function getShareUrl() {
    return (window.location.protocol.startsWith('http'))
      ? window.location.href.split('#')[0]
      : 'https://dominik.hoehr.net/links';
  }

  function generateQR() {
    if (qrGenerated || !qrContainer) return;
    if (typeof QRCode === 'undefined') {
      // Retry once QRCode is loaded
      setTimeout(generateQR, 80);
      return;
    }
    qrGenerated = true;
    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
      text: getShareUrl(),
      width: 170,
      height: 170,
      colorDark: '#0B0B0C',
      colorLight: '#ffffff',
      correctLevel: (typeof QRCode.CorrectLevel !== 'undefined') ? QRCode.CorrectLevel.M : 0
    });
  }

  if (qrDetails) {
    qrDetails.addEventListener('toggle', () => {
      if (qrDetails.open) {
        generateQR();
      }
    });
    if (qrDetails.open) {
      generateQR();
    }
  }

  // Web Share API (native share on mobile)
  const shareBtn = document.getElementById('btnShareLink');
  if (shareBtn) {
    if (navigator.share) {
      shareBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await navigator.share({
            title: document.title || 'Dominik Höhr - Links',
            text: 'Hier findest du meine wichtigsten Links und Profile:',
            url: getShareUrl()
          });
        } catch (err) {
          // Share dismissed by user
        }
      });
    } else {
      shareBtn.style.display = 'none';
    }
  }

  // Copy Link button
  const copyBtn = document.getElementById('btnCopyLink');
  const copyText = document.getElementById('copyLinkText');
  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = getShareUrl();
      try {
        await navigator.clipboard.writeText(url);
        const orig = copyText.textContent;
        copyText.textContent = 'Kopiert! ✓';
        setTimeout(() => { copyText.textContent = orig; }, 2000);
      } catch (err) {
        prompt('Link zum Kopieren:', url);
      }
    });
  }
}


