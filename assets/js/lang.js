// Language switch: the link works without JS. With JS, the explicit choice is
// remembered and the reader lands on the section they are actually reading
// (not on a stale #hash left by an earlier nav click).
const READING_LINE = 0.35;

function sectionInView() {
  const line = window.innerHeight * READING_LINE;
  const sections = [...document.querySelectorAll('main > section[id]')];
  const current = sections.find((s) => {
    const r = s.getBoundingClientRect();
    return r.top <= line && r.bottom > line;
  });
  // The first section is the hero: no anchor, the new page simply opens at the top.
  return current && current !== sections[0] ? current.id : '';
}

export function initLang() {
  const link = document.querySelector('[data-lang]');
  if (!link) return;
  const base = link.getAttribute('href').split('#')[0];
  link.addEventListener('click', () => {
    try { localStorage.setItem('lang', link.dataset.lang); } catch (_) { /* storage blocked: the link still works */ }
    const id = sectionInView();
    link.href = id ? `${base}#${id}` : base;
  });
}
