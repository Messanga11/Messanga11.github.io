// Mobile contact bar: appears once the hero is passed, hides on the contact
// section and while the menu is open.
export function initCta() {
  const bar = document.querySelector('[data-cta-bar]');
  const hero = document.getElementById('top');
  const contact = document.getElementById('contact');
  if (!bar || !hero || !contact || !('IntersectionObserver' in window)) return;
  const links = bar.querySelectorAll('a');
  let afterHero = false;
  let atContact = false;

  const render = () => {
    const show = afterHero && !atContact && !document.body.classList.contains('menu-open');
    bar.classList.toggle('is-visible', show);
    bar.setAttribute('aria-hidden', String(!show));
    links.forEach((a) => (show ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1')));
  };

  new IntersectionObserver(([e]) => { afterHero = !e.isIntersecting; render(); }).observe(hero);
  new IntersectionObserver(([e]) => { atContact = e.isIntersecting; render(); }, { threshold: 0.15 }).observe(contact);
  new MutationObserver(render).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  render();
}
