// Light 3D: cards tilt toward the pointer (fine pointers only, max 4 degrees).
const MAX = 4;

export function initTilt(motion) {
  if (!motion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  for (const card of document.querySelectorAll('[data-tilt]')) {
    const inner = card.firstElementChild;
    let frame = 0;
    card.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - 0.5;
        const y = (event.clientY - r.top) / r.height - 0.5;
        inner.style.setProperty('--ry', `${(x * MAX * 2).toFixed(2)}deg`);
        inner.style.setProperty('--rx', `${(-y * MAX * 2).toFixed(2)}deg`);
        card.classList.add('is-tilting');
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      inner.style.setProperty('--rx', '0deg');
      inner.style.setProperty('--ry', '0deg');
      card.classList.remove('is-tilting');
    });
  }
}
