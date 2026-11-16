// Enter animations: elements are hidden only once this runs, so a failed or
// slow script never leaves content invisible.
export function initReveal(motion) {
  if (!motion || !('IntersectionObserver' in window)) return;
  const items = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  document.documentElement.classList.add('reveal-ready');
  // Observe on the next frame so elements already on screen animate in too.
  requestAnimationFrame(() => {
    for (const el of items) observer.observe(el);
  });

  // Touch screens have no hover: play each simulated app once when it is in view.
  if (window.matchMedia('(hover: hover)').matches) return;
  const play = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('play');
      play.unobserve(entry.target);
    }
  }, { threshold: 0.5 });
  document.querySelectorAll('.work-card').forEach((card) => play.observe(card));
}
