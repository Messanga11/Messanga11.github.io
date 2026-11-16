// Chameleon mascot, inline SVG. Colours come from CSS custom properties,
// so it changes with the theme. Parts with classes are animated by mascot.js.


const body = () => `
  <path class="ch-branch" d="M6 132 C60 122 120 124 214 134" />
  <path class="ch-leaf" d="M178 128 C186 112 204 110 210 118 C204 128 192 132 178 128 Z" />
  <path class="ch-tail" d="M66 96 C40 102 22 90 24 72 C26 56 44 50 54 60 C62 68 56 80 46 78 C40 77 39 69 45 67" />
  <path class="ch-leg" d="M82 104 L74 128" />
  <path class="ch-leg" d="M150 100 L160 128" />
  <path class="ch-body" d="M60 96 C58 66 88 50 124 52 C150 54 166 66 168 86 C156 102 126 110 96 108 C74 107 61 104 60 96 Z" />
  <path class="ch-belly" d="M74 101 C100 107 132 105 160 92" />
  <path class="ch-stripe" d="M92 62 C96 72 96 84 92 96" />
  <path class="ch-stripe" d="M112 56 C117 68 117 84 112 100" />
  <path class="ch-stripe" d="M132 58 C137 70 137 84 132 98" />
  <path class="ch-head" d="M146 60 C158 44 186 44 198 62 C204 72 198 88 180 90 C166 92 152 84 146 74 Z" />
  <path class="ch-crest" d="M150 58 C154 40 168 34 180 44" />
  <path class="ch-mouth" d="M182 82 C188 84 194 82 198 76" />
  <circle class="ch-turret" cx="176" cy="66" r="12" />
  <circle class="ch-eye" cx="176" cy="66" r="7.5" />
  <g class="ch-pupil"><circle cx="176" cy="66" r="3.4" /><circle class="ch-glint" cx="177.4" cy="64.6" r="1" /></g>
  <path class="ch-lid" d="M164 66 A12 12 0 0 1 188 66 Z" />
`;

// Full interactive copy for the hero (eyes follow the cursor).
export const chameleon = (cls = '') =>
  `<svg class="mascot${cls ? ` ${cls}` : ''}" viewBox="0 0 220 150" aria-hidden="true" focusable="false" data-mascot>${body()}</svg>`;

// Small copies are full inline copies too: CSS cannot style the inside of <use>
// clones, and gzip makes the repetition almost free.
export const chameleonSmall = (cls = '') =>
  `<svg class="mascot mascot-small${cls ? ` ${cls}` : ''}" viewBox="0 0 220 150" aria-hidden="true" focusable="false">${body()}</svg>`;

export const chameleonSymbol = () => '';
