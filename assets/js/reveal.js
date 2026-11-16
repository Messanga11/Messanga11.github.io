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
  for (const el of items) {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.92) el.classList.add('in');
    observer.observe(el);
  }
  document.documentElement.classList.add('reveal-ready');
}
