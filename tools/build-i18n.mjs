// Builds index.html (FR), en/index.html (EN), 404.html and sitemap.xml
// from tools/src/page.mjs and tools/i18n/*.json. No dependencies.
// Usage: node tools/build-i18n.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, notFound, SITE } from './src/page.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (lang) => JSON.parse(readFileSync(join(root, 'tools/i18n', `${lang}.json`), 'utf8'));
const fr = load('fr');
const en = load('en');

// Both dictionaries must have the same shape (keys and array lengths).
const shape = (a, b, path = '') => {
  if (Array.isArray(a) !== Array.isArray(b)) throw new Error(`Type mismatch at ${path}`);
  if (Array.isArray(a)) {
    if (a.length !== b.length) throw new Error(`Length mismatch at ${path}: ${a.length} vs ${b.length}`);
    a.forEach((x, i) => shape(x, b[i], `${path}[${i}]`));
    return;
  }
  if (a && typeof a === 'object') {
    const ka = Object.keys(a).sort().join();
    const kb = Object.keys(b).sort().join();
    if (ka !== kb) throw new Error(`Key mismatch at ${path}: [${ka}] vs [${kb}]`);
    for (const k of Object.keys(a)) shape(a[k], b[k], `${path}.${k}`);
  }
};
shape(fr, en);

const out = (rel, content) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log(`${rel}  ${Buffer.byteLength(content)} bytes`);
};

out('index.html', page(fr, en));
out('en/index.html', page(en, fr));
out('404.html', notFound(fr, en));

const today = new Date().toISOString().slice(0, 10);
const alts = `<xhtml:link rel="alternate" hreflang="fr" href="${SITE}/"/><xhtml:link rel="alternate" hreflang="en" href="${SITE}/en/"/><xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>`;
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod>${alts}</url>
  <url><loc>${SITE}/en/</loc><lastmod>${today}</lastmod>${alts}</url>
</urlset>
`);
