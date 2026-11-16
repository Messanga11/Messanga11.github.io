// Mobile CTA bar: appears after the hero, always shows the next problem to read,
// hides on the contact section and while the menu is open.
export function initCta() {
  const bar = document.querySelector('[data-cta-bar]');
  if (!bar || !('IntersectionObserver' in window)) return;
  const nextLink = bar.querySelector('[data-cta-next]');
  const stepEl = bar.querySelector('[data-cta-step]');
  const labelEl = bar.querySelector('[data-cta-label]');
  const steps = [...document.querySelectorAll('[data-step]')];
  const total = steps.length;
  const focusables = bar.querySelectorAll('a');
  let afterHero = false;
  let atContact = false;
  let current = 0;

  const render = () => {
    const show = afterHero && !atContact && !document.body.classList.contains('menu-open');
    bar.classList.toggle('is-visible', show);
    bar.setAttribute('aria-hidden', String(!show));
    focusables.forEach((a) => (show ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1')));
    const target = steps[current] || null;
    if (target) {
      nextLink.hidden = false;
      nextLink.href = `#${target.id}`;
      stepEl.textContent = `${current + 1}/${total}`;
      labelEl.textContent = target.dataset.stepLabel;
    } else {
      nextLink.hidden = true;
    }
  };

  const hero = document.getElementById('top');
  const contact = document.getElementById('contact');
  new IntersectionObserver(([e]) => { afterHero = !e.isIntersecting; render(); }).observe(hero);
  new IntersectionObserver(([e]) => { atContact = e.isIntersecting; render(); }, { threshold: 0.15 }).observe(contact);

  // The "next" problem is the first one whose top is still below the middle of the screen.
  const update = () => {
    const mid = window.innerHeight * 0.5;
    const idx = steps.findIndex((s) => s.getBoundingClientRect().top > mid);
    const value = idx === -1 ? total : idx;
    if (value !== current) { current = value; render(); }
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  new MutationObserver(render).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  update();
  render();
}
