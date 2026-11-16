// Theme: light, dark or system. The choice is applied before paint by the
// inline head script; this module only handles the button.
const ORDER = ['light', 'dark', 'system'];

export function initTheme() {
  const btn = document.querySelector('[data-theme-btn]');
  if (!btn) return;
  const root = document.documentElement;
  const labels = document.body.dataset;
  const current = () => root.getAttribute('data-theme') || 'system';

  const apply = (mode) => {
    if (mode === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', mode);
    try { localStorage.setItem('theme', mode); } catch (_) { /* storage blocked: choice lasts for this page only */ }
    btn.setAttribute('aria-label', labels[`theme${mode[0].toUpperCase()}${mode.slice(1)}`] || mode);
    window.dispatchEvent(new CustomEvent('themechange'));
  };

  btn.hidden = false;
  btn.setAttribute('aria-label', labels[`theme${current()[0].toUpperCase()}${current().slice(1)}`]);
  btn.addEventListener('click', () => apply(ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length]));
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (current() === 'system') window.dispatchEvent(new CustomEvent('themechange'));
  });
}
