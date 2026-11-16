// Portfolio de Paul Messanga : menu mobile, en-tête, lien actif, apparitions.
// Le site reste entièrement lisible sans JavaScript.
(() => {
  document.documentElement.classList.add('js');

  // Année du pied de page
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // En-tête : bordure après défilement
  const header = document.querySelector('[data-header]');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile : ouverture, fermeture par Échap, clic sur un lien, focus piégé
  const btn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-menu]');
  const label = btn?.querySelector('.visually-hidden');

  const setMenu = (open) => {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    if (label) label.textContent = open ? 'Fermer le menu' : 'Ouvrir le menu';
    if (open) menu.querySelector('a')?.focus();
  };

  btn?.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (btn?.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { setMenu(false); btn.focus(); return; }
    if (event.key !== 'Tab') return;
    const focusables = [btn, ...menu.querySelectorAll('a')];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  // Journal de déploiement : écrit une seule fois
  const log = document.querySelector('[data-log]');
  if (log) requestAnimationFrame(() => log.classList.add('is-played'));

  // Lien de navigation actif
  const links = new Map(
    [...document.querySelectorAll('.nav-list a[href^="#"]:not(.btn)')]
      .map((a) => [a.getAttribute('href').slice(1), a])
  );
  if ('IntersectionObserver' in window && links.size) {
    const active = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const a of links.values()) a.removeAttribute('aria-current');
        links.get(entry.target.id)?.setAttribute('aria-current', 'true');
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    for (const id of links.keys()) {
      const section = document.getElementById(id);
      if (section) active.observe(section);
    }
  }

})();
