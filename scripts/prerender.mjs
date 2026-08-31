import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderRoute, sitemapEntries } from '../dist-ssr/entry-server.js';
import { SITE } from '../dist-ssr/entry-server.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function headExtras(title, description, canonical, jsonLd) {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ];
  for (const schema of jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
  }
  return tags.join('\n    ');
}

function buildHtml(body, title, description, canonical, jsonLd) {
  const extras = headExtras(title, description, canonical, jsonLd);
  let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  html = html.replace(/\s*<title>.*<\/title>/, '');
  html = html.replace(/<meta\s+name="description"[^>]*\/>/, '');
  html = html.replace(/<meta (?:property|name)="(?:og|twitter):[^"]*"[^>]*\/?>\s*/g, '');
  html = html.replace('</head>', `${extras}\n  </head>`);
  return html;
}

function writeRoute(path, html) {
  const target = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html');
  mkdirSync(join(dist, path), { recursive: true });
  writeFileSync(target, html);
}

const entries = sitemapEntries();

for (const entry of entries) {
  const { body, meta, jsonLd } = renderRoute(entry.path);
  const html = buildHtml(body, meta.title, meta.description, meta.canonical, jsonLd);
  writeRoute(entry.path, html);
}

const notFound = renderRoute('/__missing__');
writeFileSync(
  join(dist, '404.html'),
  buildHtml(notFound.body, notFound.meta.title, notFound.meta.description, notFound.meta.canonical, notFound.jsonLd),
);

const priorities = {
  '/': { changefreq: 'daily', priority: '1.0' },
  '/crisis': { changefreq: 'always', priority: '0.9' },
  '/talk': { changefreq: 'weekly', priority: '0.8' },
  '/tools': { changefreq: 'weekly', priority: '0.8' },
  '/tools/mood-tracker': { changefreq: 'weekly', priority: '0.8' },
  '/tools/assessment': { changefreq: 'weekly', priority: '0.8' },
  '/tools/breathing': { changefreq: 'monthly', priority: '0.7' },
  '/tools/grounding': { changefreq: 'monthly', priority: '0.7' },
  '/explore': { changefreq: 'weekly', priority: '0.8' },
  '/journal': { changefreq: 'monthly', priority: '0.6' },
  '/programmes': { changefreq: 'monthly', priority: '0.7' },
  '/support-plan': { changefreq: 'monthly', priority: '0.6' },
  '/learn-more': { changefreq: 'monthly', priority: '0.6' },
  '/resources': { changefreq: 'monthly', priority: '0.6' },
  '/find-therapist': { changefreq: 'monthly', priority: '0.6' },
};

const lastmod = new Date().toISOString().slice(0, 10);

function sitemapFor(entry) {
  const config = priorities[entry.path] || { changefreq: 'weekly', priority: '0.7' };
  return [
    '  <url>',
    `    <loc>${entry.meta.canonical}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${config.changefreq}</changefreq>`,
    `    <priority>${config.priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  entries.map(sitemapFor).join('\n'),
  '</urlset>',
].join('\n');

writeFileSync(join(dist, 'sitemap.xml'), xml);
console.log(
  `Prerendered ${entries.length} routes + 404.html into ${dist}, sitemap.xml with ${entries.length} URLs (site: ${SITE.url}).`,
);