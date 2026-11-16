// Page template shared by the FR and EN pages. Every string comes from
// tools/i18n/<lang>.json and is HTML-escaped by `e`.
import { icon, sprite } from './icons.mjs';
import { brandIcon, brandSprite } from './brands.mjs';

export const SITE = 'https://paul-messanga.ndazoomessanga.workers.dev';
const PHONE = '+237698105092';
const EMAIL = 'ndazoomessanga@gmail.com';

export const e = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const ext = (href, label, t, cls = 'link') =>
  `<a class="${cls}" href="${e(href)}" rel="noopener" target="_blank">${e(label)}${icon('external', 'icon-xs')}<span class="visually-hidden"> (${e(t.ui.external)})</span></a>`;

// Inline head script: theme before paint, then the language choice.
const headScript = (t) => `<script>
(function(){try{var d=document.documentElement,s=localStorage.getItem('theme');
if(s==='light'||s==='dark')d.setAttribute('data-theme',s);
if(/bot|crawl|spider|lighthouse|headless|preview/i.test(navigator.userAgent))return;
var l=localStorage.getItem('lang'),here='${t.lang}',to=null;
if(l&&l!==here)to=l;
else if(!l&&here==='fr'&&location.pathname==='/'){var n=(navigator.languages||[navigator.language||''])
.map(function(x){return String(x).slice(0,2).toLowerCase()}).filter(function(x){return x==='fr'||x==='en'})[0];if(n==='en')to='en'}
if(to)location.replace((to==='en'?'/en/':'/')+location.hash)}catch(_){}})();
</script>`;

// Mini product screens, drawn in code (decorative: the facts are in the text).
const screen = (p) => {
  const u = p.ui;
  switch (p.kind) {
    case 'tv':
      return `<div class="scr scr-tv"><div class="tv"><p class="tv-row"><span>${e(u.row)}</span><span class="tv-live"><i></i>${e(u.live)}</span></p>
        <ul class="tv-tiles">${u.tiles.map((x, i) => `<li class="${i === 1 ? 'is-focus' : ''}" style="--n:${i}"><span>${e(x)}</span></li>`).join('')}</ul></div><span class="tv-stand"></span></div>`;
    case 'checkout':
      return `<div class="scr scr-pay"><div class="pay"><p class="pay-title">${e(u.title)}</p>
        <ul>${u.lines.map((x, i) => `<li style="--n:${i}"><span>${e(x)}</span>${icon('check', 'pay-ok')}</li>`).join('')}</ul>
        <p class="pay-status"><i></i>${e(u.status)}</p></div></div>`;
    case 'chat':
      return `<div class="scr scr-chat"><div class="phone"><p class="chat-head"><span class="avatar">N</span>${e(u.doctor)}</p>
        <p class="bub bub-in">${e(u.msgIn)}</p><p class="bub bub-out">${e(u.msgOut)}</p><p class="chat-cta">${e(u.action)}</p></div></div>`;
    case 'calendar':
      return `<div class="scr scr-cal"><div class="cal"><p class="cal-title">${e(u.title)}</p>
        <ol class="cal-days">${u.days.map((d, i) => `<li class="${i === 2 ? 'is-booked' : ''}" style="--n:${i}"><b>${e(d)}</b><span></span><span></span></li>`).join('')}</ol>
        <p class="cal-paid">${icon('check')}${e(u.booked)}</p></div></div>`;
    case 'order':
      return `<div class="scr scr-order"><div class="phone"><ol class="order">${u.steps.map((x, i) => `<li class="${i < 2 ? 'is-done' : i === 2 ? 'is-now' : ''}" style="--n:${i}"><i></i><span>${e(x)}</span></li>`).join('')}</ol></div></div>`;
    case 'scan':
      return `<div class="scr scr-scan"><div class="phone"><p class="scan-title">${e(u.title)}</p>
        <div class="face"><svg viewBox="0 0 120 120" class="face-svg"><path class="f-hair" d="M30 56 C28 30 46 16 62 16 C82 16 94 32 92 56 C88 44 80 38 70 36 C58 42 42 44 30 56 Z"/>
        <path class="f-neck" d="M50 84 L50 98 C50 102 70 102 70 98 L70 84 Z"/><path class="f-shoulders" d="M22 120 C24 104 38 96 60 96 C82 96 96 104 98 120 Z"/>
        <ellipse class="f-skin" cx="61" cy="60" rx="27" ry="31"/><path class="f-hair" d="M34 52 C36 36 50 28 64 28 C76 28 86 36 88 50 C80 44 70 40 60 42 C50 44 42 48 34 52 Z"/>
        <ellipse class="f-eye" cx="51" cy="60" rx="2.6" ry="3"/><ellipse class="f-eye" cx="71" cy="60" rx="2.6" ry="3"/><path class="f-line" d="M61 64 L59 72 L63 72"/><path class="f-line" d="M54 80 C58 83 64 83 68 80"/>
        <path class="f-mesh" d="M38 58 L61 50 L84 58 M61 50 L61 90 M40 72 L61 76 L82 72"/><g class="f-pts"><circle cx="38" cy="58" r="1.6"/><circle cx="61" cy="50" r="1.6"/><circle cx="84" cy="58" r="1.6"/><circle cx="40" cy="72" r="1.6"/><circle cx="82" cy="72" r="1.6"/><circle cx="61" cy="76" r="1.6"/><circle cx="61" cy="90" r="1.6"/></g>
        <path class="f-corner" d="M14 30 V14 H30 M90 14 H106 V30 M106 90 V106 H90 M30 106 H14 V90"/></svg></div>
        <ol class="scan-steps">${u.steps.map((x, i) => `<li class="${i < 2 ? 'is-done' : ''}">${e(x)}</li>`).join('')}</ol></div></div>`;
    default:
      return '';
  }
};

const project = (p, t, i) => `
<li class="work-card work-${p.id}" data-tilt data-reveal style="--i:${i % 3}">
  <article class="work-inner" aria-labelledby="w-${p.id}">
    <div class="work-screen" aria-hidden="true">${screen(p)}</div>
    <div class="work-body">
      <p class="work-meta">${e(p.meta)}</p>
      <h3 id="w-${p.id}">${e(p.name)}</h3>
      <p class="work-result">${e(p.result)}</p>
      <div class="work-foot">
        <ul class="tags" aria-label="Stack">${p.tags.map((x) => `<li>${brandIcon(x)}${e(x)}</li>`).join('')}</ul>
        ${p.link ? ext(p.link.href, p.link.label, t) : ''}
      </div>
    </div>
  </article>
</li>`;

export const page = (t, alt) => {
  const url = SITE + t.path;
  const altUrl = SITE + alt.path;
  const og = `${SITE}/assets/img/og-${t.lang}.png`;
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.emailSubject)}`;
  const wa = `https://wa.me/${PHONE.slice(1)}?text=${encodeURIComponent(t.contact.whatsappText)}`;

  return `<!doctype html>
<!-- GENERATED by tools/build-i18n.mjs, edit tools/ instead -->
<html lang="${t.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${e(t.meta.title)}</title>
  <meta name="description" content="${e(t.meta.description)}">
  <meta name="author" content="Paul Messanga">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="fr" href="${SITE}/">
  <link rel="alternate" hreflang="en" href="${SITE}/en/">
  <link rel="alternate" hreflang="x-default" href="${SITE}/">
  <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)">
  <meta name="color-scheme" content="light dark">
  <meta property="og:type" content="profile">
  <meta property="og:locale" content="${t.ogLocale}">
  <meta property="og:locale:alternate" content="${alt.ogLocale}">
  <meta property="og:site_name" content="Paul Messanga">
  <meta property="og:title" content="${e(t.meta.ogTitle)}">
  <meta property="og:description" content="${e(t.meta.ogDescription)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${e(t.meta.ogAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${e(t.meta.ogTitle)}">
  <meta name="twitter:description" content="${e(t.meta.ogDescription)}">
  <meta name="twitter:image" content="${og}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/site.webmanifest">
  ${headScript(t)}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <link rel="modulepreload" href="/assets/js/main.js">
  <script type="module" src="/assets/js/main.js"></script>
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': `${SITE}/#paul`, name: 'Paul Messanga', jobTitle: t.meta.jobTitle,
        url, image: `${SITE}/assets/img/paul.webp`, email: `mailto:${EMAIL}`, telephone: PHONE,
        address: { '@type': 'PostalAddress', addressLocality: 'Yaoundé', addressCountry: 'CM' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'EGEM' }, knowsLanguage: ['fr', 'en'],
        knowsAbout: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GitHub Actions', 'React', 'Next.js', 'React Native', 'Flutter', 'Push notifications', 'End-to-end testing'],
        sameAs: ['https://github.com/Messanga11', 'https://www.linkedin.com/in/paul-messanga-954a711b3']
      },
      { '@type': 'ProfilePage', '@id': `${url}#page`, url, name: t.meta.ogTitle, inLanguage: t.lang, mainEntity: { '@id': `${SITE}/#paul` } }
    ]
  })}</script>
</head>
<body data-menu-open="${e(t.ui.menuOpen)}" data-menu-close="${e(t.ui.menuClose)}" data-theme-light="${e(t.ui.themeLight)}" data-theme-dark="${e(t.ui.themeDark)}" data-theme-system="${e(t.ui.themeSystem)}">
  ${sprite()}
  ${brandSprite()}
  <a class="skip" href="#main">${e(t.ui.skip)}</a>

  <header class="site-header" data-header>
    <div class="wrap header-inner">
      <a class="brand" href="#top" aria-label="${e(t.ui.home)}"><span class="brand-mark" aria-hidden="true"></span><span>Paul Messanga</span></a>
      <nav class="nav" aria-label="${e(t.ui.navLabel)}">
        <ul class="nav-list" id="menu" data-menu>
          ${t.nav.map((n) => `<li><a href="${n.href}">${e(n.label)}</a></li>`).join('')}
        </ul>
      </nav>
      <div class="header-actions">
        <a class="icon-btn lang-link" href="${alt.path}" hreflang="${alt.lang}" lang="${alt.lang}" data-lang="${alt.lang}" aria-label="${e(t.ui.langLabel)}">${icon('globe')}<span>${e(t.ui.langShort)}</span></a>
        <button class="icon-btn theme-btn" type="button" data-theme-btn hidden>
          <span class="theme-icon" data-show="light">${icon('sun')}</span>
          <span class="theme-icon" data-show="dark">${icon('moon')}</span>
          <span class="theme-icon" data-show="system">${icon('monitor')}</span>
        </button>
        <a class="btn btn-small header-cta" href="#contact">${e(t.ui.contactCta)}</a>
        <button class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="${e(t.ui.menuOpen)}" data-menu-btn>
          <span class="menu-open">${icon('menu')}</span><span class="menu-close">${icon('x')}</span>
        </button>
      </div>
    </div>
    <div class="progress" aria-hidden="true"><span data-progress></span></div>
  </header>

  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="status"><span class="status-dot" aria-hidden="true"></span>${e(t.hero.status)}</p>
          <h1 id="hero-title">${e(t.hero.title)}</h1>
          <p class="lead">${e(t.hero.lead)}</p>
          <div class="actions">
            <a class="btn" href="#contact">${e(t.hero.primary)}${icon('arrow-right', 'btn-arrow')}</a>
            <a class="btn btn-ghost" href="#work">${e(t.hero.secondary)}${icon('arrow-down', 'btn-arrow')}</a>
          </div>
        </div>
        <figure class="hero-art" data-reveal>
          <div class="notif" aria-hidden="true">
            <span class="notif-icon">${icon('bell')}</span>
            <span class="notif-text"><span class="notif-meta">${e(t.hero.notif.app)} · ${e(t.hero.notif.time)}</span><strong>${e(t.hero.notif.title)}</strong><span>${e(t.hero.notif.body)}</span></span>
          </div>
          <img src="/assets/img/hero-app.svg" width="453" height="725" alt="" fetchpriority="high" decoding="async">
        </figure>
      </div>
      <div class="wrap">
        <dl class="figures">${t.hero.figures.map((f, i) => `<div data-reveal style="--i:${i}"><dt data-count>${e(f.n)}</dt><dd>${e(f.t)}</dd></div>`).join('')}</dl>
      </div>
    </section>

    <section class="section" id="services" aria-labelledby="services-title">
      <div class="wrap">
        <header class="section-head" data-reveal>
          <p class="eyebrow">${e(t.services.eyebrow)}</p>
          <h2 id="services-title">${e(t.services.title)}</h2>
        </header>
        <ol class="services">
          ${t.services.items.map((it, i) => `<li class="service" data-reveal style="--i:${i % 3}">
            <span class="service-icon">${icon(it.icon)}</span>
            <h3 class="service-title">${e(it.title)}</h3>
            <p class="service-pain">${e(it.pain)}</p>
            <p class="service-promise">${icon('check', 'service-check')}<span>${e(it.promise)}</span></p>
          </li>`).join('')}
        </ol>
        <p class="section-cta" data-reveal><a class="btn btn-ghost" href="#work">${e(t.services.cta)}${icon('arrow-down', 'btn-arrow')}</a></p>
      </div>
    </section>

    <section class="section section-alt" id="work" aria-labelledby="work-title">
      <div class="wrap">
        <header class="section-head" data-reveal>
          <p class="eyebrow">${e(t.work.eyebrow)}</p>
          <h2 id="work-title">${e(t.work.title)}</h2>
        </header>
        <ul class="work">${t.work.projects.map((p, i) => project(p, t, i)).join('')}</ul>
        <h3 class="more-title" data-reveal>${e(t.more.title)}</h3>
        <ul class="more">${t.more.items.map((m) => `<li data-reveal><span class="more-name">${e(m.name)}</span><span class="more-text">${e(m.text)}</span><span class="more-link">${m.href ? ext(m.href, m.label, t) : ''}</span></li>`).join('')}</ul>
        <p class="section-cta" data-reveal><a class="btn" href="#contact">${e(t.work.cta)}${icon('arrow-right', 'btn-arrow')}</a></p>
      </div>
    </section>

    <section class="section" id="method" aria-labelledby="method-title">
      <div class="wrap">
        <header class="section-head" data-reveal>
          <p class="eyebrow">${e(t.method.eyebrow)}</p>
          <h2 id="method-title">${e(t.method.title)}</h2>
        </header>
        <ol class="steps">${t.method.steps.map((st, i) => `<li class="step" data-reveal style="--i:${i % 3}">
          <div class="step-top"><span class="step-icon">${icon(st.icon)}</span><span class="step-n">${String(i + 1).padStart(2, '0')}</span></div>
          <h3 class="step-title">${e(st.t)}</h3>
          <p class="step-d">${e(st.d)}</p>
          <ul class="step-items">${st.items.map((x) => `<li>${icon('check', 'step-check')}<span>${e(x)}</span></li>`).join('')}</ul>
          <p class="step-out"><span>${e(t.method.outLabel)}</span>${e(st.out)}</p>
        </li>`).join('')}</ol>
      </div>
    </section>

    <section class="section section-alt" id="path" aria-labelledby="path-title">
      <div class="wrap path-grid">
        <header class="section-head" data-reveal>
          <p class="eyebrow">${e(t.path.eyebrow)}</p>
          <h2 id="path-title">${e(t.path.title)}</h2>
          <p class="intro">${e(t.path.intro)}</p>
          <p><a class="btn btn-ghost" href="/assets/cv-paul-messanga.pdf" download>${icon('download')}${e(t.ui.cvLabel)} <span class="btn-meta">${e(t.ui.cvMeta)}</span></a></p>
        </header>
        <div>
          <ol class="timeline">${t.path.items.map((it) => `<li data-reveal><span class="t-year">${e(it.y)}</span><div><h3 class="h5">${e(it.t)}</h3><p>${e(it.d)}</p></div></li>`).join('')}</ol>
          <h3 class="sub-title">${e(t.path.eduTitle)}</h3>
          <ul class="edu">${t.path.edu.map((ed) => `<li><strong>${e(ed.t)}</strong><span>${e(ed.d)}</span></li>`).join('')}</ul>
        </div>
      </div>
    </section>

    <section class="contact" id="contact" aria-labelledby="contact-title">
      <div class="wrap contact-grid">
        <div data-reveal>
          <p class="contact-who"><img class="avatar-photo" src="/assets/img/paul-avatar.webp" width="250" height="250" alt="${e(t.hero.photoAlt)}" loading="lazy" decoding="async"><span><strong>Paul Messanga</strong><span>${e(t.meta.jobTitle)}</span></span></p>
          <h2 id="contact-title">${e(t.contact.title)}</h2>
          <p class="lead">${e(t.contact.lead)}</p>
          <div class="actions">
            <a class="btn btn-invert" href="${mail}">${icon('mail')}${e(t.contact.email)}</a>
            <a class="btn btn-ghost-invert" href="${wa}" rel="noopener" target="_blank">${icon('message')}${e(t.contact.whatsapp)}<span class="visually-hidden"> (${e(t.ui.external)})</span></a>
          </div>
          <ul class="contact-list">
            <li>${icon('mail')}<span>${EMAIL}</span></li>
            <li><a href="tel:${PHONE}">${icon('phone')}<span>+237 698 10 50 92</span></a></li>
            <li><a href="/assets/cv-paul-messanga.pdf" download>${icon('download')}<span>${e(t.contact.cv)}</span></a></li>
            <li>${ext('https://www.linkedin.com/in/paul-messanga-954a711b3', 'LinkedIn', t, 'link-plain')}</li>
            <li>${ext('https://github.com/Messanga11', 'GitHub', t, 'link-plain')}</li>
          </ul>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-inner">
      <p>© <span data-year>2026</span> Paul Messanga</p>
      <p>${e(t.ui.footer)}</p>
    </div>
  </footer>

  <div class="cta-bar" data-cta-bar aria-hidden="true">
    <p class="cta-text">${e(t.ui.barText)}</p>
    <a class="btn btn-small" href="#contact" tabindex="-1">${e(t.ui.barTalk)}</a>
    <a class="icon-btn icon-btn-accent" href="${wa}" rel="noopener" target="_blank" aria-label="${e(t.ui.barWhatsApp)}" tabindex="-1">${icon('message')}</a>
  </div>
</body>
</html>
`;
};

export const notFound = (fr, en) => `<!doctype html>
<!-- GENERATED by tools/build-i18n.mjs, edit tools/ instead -->
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(fr.notFound.title)} — Paul Messanga</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script>try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark')document.documentElement.setAttribute('data-theme',s)}catch(_){}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <main class="section notfound">
    <div class="wrap">
      <p class="eyebrow">404</p>
      <h1>${e(fr.notFound.title)}</h1>
      <p class="lead">${e(fr.notFound.text)}</p>
      <p class="actions"><a class="btn" href="/">${e(fr.notFound.back)}</a></p>
      <hr>
      <h2 lang="en">${e(en.notFound.title)}</h2>
      <p class="lead" lang="en">${e(en.notFound.text)}</p>
      <p class="actions"><a class="btn btn-ghost" href="/en/" lang="en">${e(en.notFound.back)}</a></p>
    </div>
  </main>
</body>
</html>
`;
