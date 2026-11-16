// Counts each hero figure up from 0, starting the moment the figure is revealed.
const DURATION = 1400;
// Grouped numbers in any locale (5 000, 5 000 with no-break spaces, 5,000, 5.000) or plain digits.
const NUMBER = /\d{1,3}(?:[\s,.  ]\d{3})+|\d+/;

function parse(el) {
  const text = el.textContent;
  const match = text.match(NUMBER);
  if (!match) return null;
  return {
    text,
    before: text.slice(0, match.index),
    after: text.slice(match.index + match[0].length),
    target: Number.parseInt(match[0].replace(/\D/g, ''), 10),
  };
}

function animate(el, figure, format) {
  const start = performance.now();
  const tick = (now) => {
    // The frame timestamp can precede `start` by a few ms: clamp so the first frame is never negative.
    const p = Math.min(Math.max((now - start) / DURATION, 0), 1);
    const eased = 1 - (1 - p) ** 3;
    el.textContent = `${figure.before}${format.format(Math.round(figure.target * eased))}${figure.after}`;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = figure.text;
  };
  requestAnimationFrame(tick);
}

// Waits for the reveal (class "in"), then for its stagger delay, so counting and fading start together.
function onReveal(target, callback) {
  const fire = () => {
    const delay = Number.parseFloat(getComputedStyle(target).transitionDelay) * 1000 || 0;
    setTimeout(callback, delay);
  };
  if (target.classList.contains('in')) return fire();
  const watcher = new MutationObserver(() => {
    if (!target.classList.contains('in')) return;
    watcher.disconnect();
    fire();
  });
  watcher.observe(target, { attributes: true, attributeFilter: ['class'] });
}

function onVisible(target, callback) {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    callback();
  }, { threshold: 0.6 });
  observer.observe(target);
}

export function initCount(motion) {
  if (!motion || !('IntersectionObserver' in window)) return;
  const format = new Intl.NumberFormat(document.documentElement.lang);
  const revealOn = document.documentElement.classList.contains('reveal-ready');
  for (const el of document.querySelectorAll('[data-count]')) {
    const figure = parse(el);
    if (!figure) continue;
    // Screen readers and find-in-page keep the real value; only the visual copy animates.
    const real = document.createElement('span');
    real.className = 'visually-hidden';
    real.textContent = figure.text;
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    visual.textContent = `${figure.before}${format.format(0)}${figure.after}`;
    el.replaceChildren(real, visual);
    const revealer = revealOn ? el.closest('[data-reveal]') : null;
    const start = () => animate(visual, figure, format);
    if (revealer) onReveal(revealer, start);
    else onVisible(el, start);
  }
}
