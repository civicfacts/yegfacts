/**
 * The sitemap against the site that was actually built.
 *
 * `src/pages/sitemap.xml.ts` is written by hand, which is the only way to keep
 * the alias redirects out of it and the `lastmod` dates honest — and the price
 * of writing it by hand is that a new page can be added and forgotten. This is
 * the net under that: after a build, every indexable page in `dist/` must be in
 * the sitemap, and every URL in the sitemap must be a page that exists.
 *
 *   npm run build && npm run audit:sitemap
 *
 * "Indexable" is decided by the page itself, not by a list kept here. A page
 * carrying `<meta name="robots" content="noindex...">` is excluded — which is
 * what the alias redirects carry, and what a preview build stamps on every
 * page. `/404` is excluded too: it is served by status code, never linked, and
 * nothing should crawl to it.
 */
import path from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { builtPages, builtPageUrl, repoPath } from './lib/repo.ts';

const DIST = repoPath('dist');
const SITEMAP = path.join(DIST, 'sitemap.xml');

if (!existsSync(SITEMAP)) {
  console.error('sitemap-audit: dist/sitemap.xml is missing — run `npm run build` first');
  process.exit(1);
}

const NOINDEX = /<meta\s+name=["']robots["']\s+content=["']noindex/i;

const built = new Set<string>();
for (const file of builtPages(DIST)) {
  const url = builtPageUrl(DIST, file);
  if (url === '/404') continue;
  if (NOINDEX.test(readFileSync(file, 'utf8'))) continue;
  built.add(url);
}

/** `<loc>` values, back to the paths the built pages are keyed by. */
const listed = new Set(
  [...readFileSync(SITEMAP, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const { pathname } = new URL(match[1]!.replace(/&amp;/g, '&'));
    return pathname.replace(/\/$/, '') || '/';
  }),
);

const missing = [...built].filter((url) => !listed.has(url)).sort();
const dangling = [...listed].filter((url) => !built.has(url)).sort();

for (const url of missing) console.error(`  not in the sitemap  ${url}`);
for (const url of dangling) console.error(`  no page built       ${url}`);

console.log(
  `\nsitemap-audit: ${listed.size} sitemap URLs, ${built.size} indexable pages in dist/`,
);

if (missing.length > 0 || dangling.length > 0) {
  console.error(
    `\nsitemap-audit: ${missing.length} page(s) missing from the sitemap, ${dangling.length} sitemap URL(s) with no page`,
  );
  process.exit(1);
}
console.log('sitemap-audit: OK — the sitemap and the built site agree');
