// Chameleon: random blink timing, and the hero chameleon's eye follows the pointer.
export function initMascot(motion) {
  document.querySelectorAll('.mascot').forEach((m) => {
    m.style.setProperty('--blink-delay', `${(Math.random() * 4).toFixed(2)}s`);
  });
  if (!motion) return;
  const hero = document.querySelector('[data-mascot]');
  if (!hero) return;
  const eye = hero.querySelector('.ch-eye');
  let visible = true;
  let frame = 0;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(hero);
  }
  const look = (x, y) => {
    if (!visible) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = eye.getBoundingClientRect();
      const dx = x - (r.left + r.width / 2);
      const dy = y - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 200) * 3.2;
      hero.style.setProperty('--ex', `${((dx / d) * k).toFixed(2)}px`);
      hero.style.setProperty('--ey', `${((dy / d) * k).toFixed(2)}px`);
    });
  };
  window.addEventListener('pointermove', (e) => look(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointerdown', (e) => look(e.clientX, e.clientY), { passive: true });
}
