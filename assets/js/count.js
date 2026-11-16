// Counts each hero figure up from 0 once it scrolls into view.
const DURATION = 1400;
const NUMBER = /\d+(?:[\s  ]\d{3})*/;

function animate(el) {
  const text = el.textContent;
  const match = text.match(NUMBER);
  if (!match) return;
  const target = Number.parseInt(match[0].replace(/\D/g, ''), 10);
  const [before, after] = [text.slice(0, match.index), text.slice(match.index + match[0].length)];
  const format = new Intl.NumberFormat(document.documentElement.lang);
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / DURATION, 1);
    const eased = 1 - (1 - p) ** 3;
    el.textContent = `${before}${format.format(Math.round(target * eased))}${after}`;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = text;
  };
  requestAnimationFrame(tick);
}

export function initCount(motion) {
  if (!motion || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      animate(entry.target);
    }
  }, { threshold: 0.6 });
  for (const el of document.querySelectorAll('[data-count]')) observer.observe(el);
}
