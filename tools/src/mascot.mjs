// Chameleon mascot, inline SVG with "cute" proportions: big round head,
// big eye with two glints, rosy cheek, round body, soft spots, tiny round feet.
// Colours come from CSS custom properties, so it changes with the theme.
// Classed parts are animated by mascot.js and the CSS (blink, eye tracking).
const body = () => `
  <path class="ch-branch" d="M8 134 C70 126 140 127 214 134" />
  <path class="ch-leaf" d="M30 131 C26 117 38 108 50 111 C50 123 42 131 30 131 Z" />
  <path class="ch-leaf ch-leaf-2" d="M188 132 C194 119 208 117 213 124 C207 132 198 135 188 132 Z" />
  <path class="ch-tail" d="M76 104 C50 110 34 98 37 82 C40 68 57 65 63 75 C67 83 60 90 53 87" />
  <path class="ch-leg" d="M94 112 L91 127" /><circle class="ch-foot" cx="91" cy="128" r="5" />
  <path class="ch-leg" d="M136 112 L140 127" /><circle class="ch-foot" cx="140" cy="128" r="5" />
  <path class="ch-body" d="M70 101 C64 74 88 60 118 61 C142 62 157 74 157 92 C152 108 128 116 102 114 C84 113 72 109 70 101 Z" />
  <path class="ch-belly" d="M84 110 C104 115 130 112 150 101" />
  <circle class="ch-spot" cx="96" cy="78" r="6" /><circle class="ch-spot" cx="118" cy="72" r="5" />
  <circle class="ch-spot" cx="134" cy="84" r="4.5" /><circle class="ch-spot" cx="110" cy="94" r="4" />
  <path class="ch-crest" d="M146 52 C150 36 168 31 180 40" />
  <path class="ch-head" d="M142 76 C141 52 158 40 176 41 C197 42 208 59 205 77 C202 96 186 104 168 103 C152 102 143 91 142 76 Z" />
  <ellipse class="ch-cheek" cx="190" cy="88" rx="7" ry="4.2" />
  <path class="ch-smile" d="M176 92 C181 97 189 97 194 92" />
  <circle class="ch-turret" cx="174" cy="68" r="17" />
  <circle class="ch-eye" cx="174" cy="68" r="12.5" />
  <g class="ch-pupil"><circle cx="175" cy="69" r="6.6" /><circle class="ch-glint" cx="177.6" cy="66" r="2.4" /><circle class="ch-glint" cx="172.6" cy="72" r="1.1" /></g>
  <circle class="ch-lid" cx="174" cy="68" r="17" />
`;

// Full interactive copy (eyes follow the pointer in the hero).
export const chameleon = (cls = '') =>
  `<svg class="mascot${cls ? ` ${cls}` : ''}" viewBox="0 0 220 150" aria-hidden="true" focusable="false" data-mascot>${body()}</svg>`;

// Small copies are full inline copies too: CSS cannot style the inside of <use>
// clones, and gzip makes the repetition almost free.
export const chameleonSmall = (cls = '') =>
  `<svg class="mascot mascot-small${cls ? ` ${cls}` : ''}" viewBox="0 0 220 150" aria-hidden="true" focusable="false">${body()}</svg>`;

export const chameleonSymbol = () => '';
