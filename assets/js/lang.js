// Language switch: the link works without JS. With JS, the explicit choice is
// remembered and the current section is kept.
export function initLang() {
  const link = document.querySelector('[data-lang]');
  if (!link) return;
  link.addEventListener('click', () => {
    try { localStorage.setItem('lang', link.dataset.lang); } catch (_) { /* storage blocked: the link still works */ }
    if (location.hash) link.href = link.getAttribute('href').split('#')[0] + location.hash;
  });
}
