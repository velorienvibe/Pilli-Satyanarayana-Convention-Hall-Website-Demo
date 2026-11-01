// Pilli Convention demo interactions
// NOTE: No public business WhatsApp number was verifiable during research.
// Set the venue's confirmed 10-digit WhatsApp number here before production.
const WHATSAPP_NUMBER = '';
const DEFAULT_MESSAGE = 'Hello, I would like to enquire about hosting an event at Pilli Convention Hall, Kakinada.';

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Use a local designed fallback instead of leaving a broken image icon.
document.querySelectorAll('img[data-fallback]').forEach(img => {
  const fallback = img.dataset.fallback;
  img.addEventListener('error', () => {
    if (img.src.endsWith(fallback)) return;
    img.src = fallback;
    img.classList.add('image-fallback-active');
  }, { once: true });
  if (img.complete && img.naturalWidth === 0) img.src = fallback;
});

// Gallery lightbox
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const close = () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelectorAll('[data-lightbox]').forEach(item => item.addEventListener('click', () => {
    const image = item.querySelector('img');
    if (!image) return;
    lightboxImg.src = image.currentSrc || image.src;
    lightboxImg.alt = image.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }));
  lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function whatsappUrl(message) {
  const text = encodeURIComponent(message || DEFAULT_MESSAGE);
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  return number ? `https://wa.me/91${number}?text=${text}` : `https://wa.me/?text=${text}`;
}
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = whatsappUrl(link.dataset.message || DEFAULT_MESSAGE);
    window.open(href, '_blank', 'noopener,noreferrer');
  });
});
const form = document.getElementById('enquiry-form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const lines = [
    'Hello, I would like to enquire about an event at Pilli Convention Hall, Kakinada.',
    '',
    `Name: ${(data.get('name') || '').toString().trim()}`,
    `Phone: ${(data.get('phone') || '').toString().trim()}`,
    `Event: ${(data.get('event') || '').toString().trim()}`,
    `Preferred date: ${(data.get('date') || 'Not decided').toString().trim()}`,
    `Expected guests: ${(data.get('guests') || 'Not decided').toString().trim()}`,
    `Message: ${(data.get('message') || 'None').toString().trim()}`
  ];
  window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
});
