// Entry point. Each module does one thing and degrades gracefully.
import { initTheme } from './theme.js';
import { initLang } from './lang.js';
import { initNav } from './nav.js';
import { initReveal } from './reveal.js';
import { initTilt } from './tilt.js';
import { initCta } from './cta.js';
import { initCount } from './count.js';

const root = document.documentElement;
const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (motion) root.classList.add('motion-ok');

initTheme();
initLang();
initNav();
initReveal(motion);
initTilt(motion);
initCta();
initCount(motion);
