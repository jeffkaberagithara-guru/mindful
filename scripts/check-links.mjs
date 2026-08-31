import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(fileURLToPath(new URL('..', import.meta.url)), 'dist');

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = walk(dist);
const refPattern = /(?:href|src)="([^"]+)"/g;
let checked = 0;
const broken = [];

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const pageUrl = `/${file.slice(dist.length + 1).replaceAll('\\', '/').replace(/index\.html$/, '')}`;
  const pageDir = pageUrl.endsWith('/') ? pageUrl : pageUrl.slice(0, pageUrl.lastIndexOf('/') + 1);

  for (const match of html.matchAll(refPattern)) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|blob:)/.test(raw) || raw.startsWith('#')) continue;
    if (raw === '#' || raw === '') {
      broken.push(`${pageUrl} has placeholder href "${raw}"`);
      continue;
    }
    const stripped = raw.split(/[?#]/)[0];
    const target = stripped.startsWith('/')
      ? stripped
      : normalize(`${pageDir}${stripped}`).replaceAll('\\', '/');
    const candidates = [join(dist, target), join(dist, target, 'index.html'), join(dist, `${target}.html`)];
    checked += 1;
    if (!candidates.some(existsSync)) {
      broken.push(`${pageUrl} -> "${raw}" (resolves to ${target})`);
    }
  }
}

if (broken.length) {
  console.error(
    `Broken links: ${broken.length} across ${pages.length} pages:\n${broken.map((b) => `  - ${b}`).join('\n')}`,
  );
  process.exitCode = 1;
} else {
  console.log(`OK: ${checked} internal links across ${pages.length} prerendered pages resolve.`);
}