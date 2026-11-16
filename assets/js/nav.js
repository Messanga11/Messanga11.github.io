// Header state, mobile menu (focus trap, Escape), active link, progress line, year.
export function initNav() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector('[data-header]');
  const bar = document.querySelector('[data-progress]');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header?.classList.toggle('is-scrolled', window.scrollY > 8);
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      }
      ticking = false;
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

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
  const groups = { scratch: 'scratch', broken: 'scratch', legacy: 'scratch', slow: 'scratch', push: 'scratch' };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = groups[entry.target.id] || entry.target.id;
      for (const a of links.values()) a.removeAttribute('aria-current');
      links.get(id)?.setAttribute('aria-current', 'true');
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main > section[id]').forEach((s) => observer.observe(s));
}
