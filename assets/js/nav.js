// Header state (smart hide on scroll down, show on scroll up), mobile menu (focus trap, Escape), active link, progress line, year.
export function initNav() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector('[data-header]');
  const bar = document.querySelector('[data-progress]');
  let ticking = false;
  let lastY = window.scrollY;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header?.classList.toggle('is-scrolled', window.scrollY > 8);
      lastY = updateSmartHeader(header, lastY);
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      }
      ticking = false;
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  // Keyboard users tabbing into a hidden header must see it (pointer clicks do not pin it).
  header?.addEventListener('focusin', () => { if (hasKeyboardFocus(header)) header.classList.remove('is-hidden'); });
  // An in-page link jumps down: keep the header for that jump so the section lands under it as designed.
  document.addEventListener('click', (event) => { if (event.target.closest('a[href^="#"]')) holdUntil = performance.now() + ANCHOR_HOLD_MS; });

  const btn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('.nav');
  const labels = document.body.dataset;
  const setMenu = (open) => {
    if (!btn || !nav) return;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? labels.menuClose : labels.menuOpen);
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) nav.querySelector('a')?.focus();
  };
  btn?.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (btn?.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { setMenu(false); btn.focus(); return; }
    if (event.key !== 'Tab') return;
    const items = [...nav.querySelectorAll('a'), btn];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  const links = new Map([...document.querySelectorAll('.nav-list a[href^="#"]')].map((a) => [a.hash.slice(1), a]));
  if (!('IntersectionObserver' in window) || !links.size) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = entry.target.id;
      for (const a of links.values()) a.removeAttribute('aria-current');
      links.get(id)?.setAttribute('aria-current', 'true');
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main > section[id]').forEach((s) => observer.observe(s));
}

// Smart header: hides while reading down the page, comes back on any scroll up,
// and stays put near the top, while the menu is open, during an in-page jump,
// or while it holds keyboard focus.
const TOP_ZONE = 96;
const MIN_DELTA = 8;
const ANCHOR_HOLD_MS = 1200;
let holdUntil = 0;

function hasKeyboardFocus(header) {
  try { return header.querySelector(':focus-visible') !== null; }
  catch { return header.contains(document.activeElement); }
}

function updateSmartHeader(header, lastY) {
  if (!header) return lastY;
  // Clamp both ends: iOS rubber-band reports scrollY below 0 and past the bottom.
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const y = Math.min(Math.max(0, window.scrollY), max);
  const pinned = y <= TOP_ZONE
    || document.body.classList.contains('menu-open')
    || performance.now() < holdUntil
    || hasKeyboardFocus(header);
  if (pinned) {
    header.classList.remove('is-hidden');
    return y;
  }
  const delta = y - lastY;
  if (Math.abs(delta) < MIN_DELTA) return lastY;
  header.classList.toggle('is-hidden', delta > 0);
  return y;
}
