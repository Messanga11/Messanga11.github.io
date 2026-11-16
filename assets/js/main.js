// Entry point. Each module does one thing and degrades gracefully.
import { initTheme } from './theme.js';
import { initLang } from './lang.js';
import { initNav } from './nav.js';
import { initReveal } from './reveal.js';
import { initTilt } from './tilt.js';
import { initMascot } from './mascot.js';
import { initCta } from './cta.js';

const root = document.documentElement;
const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (motion) root.classList.add('motion-ok');

initTheme();
initLang();
initNav();
initReveal(motion);
initTilt(motion);
initMascot(motion);
initCta();

// The shader is optional and loads last, only when it will not cost the visitor.
const conn = navigator.connection;
const cheap = !conn || (!conn.saveData && !/(^|-)2g$/.test(conn.effectiveType || ''));
if (motion && cheap) {
  const load = () => import('./shader.js').then((m) => m.initShader()).catch(() => {});
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 600));
  if (document.readyState === 'complete') idle(load);
  else window.addEventListener('load', () => idle(load), { once: true });
}
