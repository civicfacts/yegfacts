/**
 * Repetition audit over the built site.
 *
 * The founder's complaint was that pages say the same thing in the same words
 * several times over. That is a judgement call in prose but a mechanical one in
 * HTML, so this script makes it mechanical: it reads `dist/`, strips each page
 * down to its rendered words, and reports verbatim runs that repeat where they
 * should not.
 *
 *   npm run build && npm run audit:duplication
 *   npm run audit:duplication -- --strict   # cross-page warnings block too
 *
 * Three classes, because the three kinds of repetition are not equally wrong:
 *
 *   IN-PAGE      a run of >= 10 words repeated inside one page's <main>. Always
 *                a defect: an idea belongs in its best location, once.
 *   PAGE+FOOTER  a run of >= 8 words in both a page's <main> and the site footer
 *                that page already carries. Boilerplate belongs to the footer or
 *                to the page, never to both.
 *   CROSS-PAGE   a run of >= 12 words shared by two or more pages' <main>. Warn,
 *                not fail: some of it is deliberate — the finding and panel-
 *                agreement glosses are imported from one module precisely so
 *                every page states them identically — so each hit needs a
 *                judgement rather than an automatic verdict.
 *
 * Matching is on normalised words (lower case, punctuation dropped), so a curly
 * quote or a stray comma cannot hide a copy-paste. A run may not cross a block
 * boundary, because a match spanning two list items is an artifact of the list
 * rather than a sentence written twice; quoted source text and the regions
 * named by `EXCLUDED` are dropped entirely.
 *
 * Overlapping shingles are collapsed to the longest repeated run and identical
 * runs are reported once with an occurrence count, so one duplicated sentence
 * appears as one finding rather than a dozen sliding windows.
 */
import path from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { REPO_ROOT, builtPages, builtPageUrl, repoPath } from './lib/repo.ts';

const IN_PAGE_MIN = 10;
const PAGE_FOOTER_MIN = 8;
const CROSS_PAGE_MIN = 12;

type Severity = 'fail' | 'warn';
type ClassName = 'IN-PAGE' | 'PAGE+FOOTER' | 'CROSS-PAGE';

const SEVERITY: Record<ClassName, Severity> = {
  'IN-PAGE': 'fail',
  'PAGE+FOOTER': 'fail',
  'CROSS-PAGE': 'warn',
};

type Finding = { class: ClassName; where: string; words: number; times: number; text: string };

const findings: Finding[] = [];

// ---------------------------------------------------------------------------
// Reading the built pages
// ---------------------------------------------------------------------------

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  '#39': "'",
  '#8217': '’',
};

/** Block boundary marker. No shingle may contain it. */
const BREAK = '\u0001';

const BLOCK_TAG =
  /<\/?(?:p|div|section|article|aside|header|footer|main|nav|ul|ol|li|dl|dt|dd|table|thead|tbody|tr|td|th|h[1-6]|blockquote|figure|figcaption|details|summary|form|hr|br)\b[^>]*>/gi;

/**
 * Text the comparison never sees. The rule behind all three: our prose belongs
 * on the page once, but a source's words are the source's and a pointer has to
 * name what it points at.
 *
 * `data-record` is text rendered straight out of a stored record — a source's
 * permitted excerpt, or a registry entry's publisher and retrieval date. Two
 * records that share a publisher are the registry's business, not the page's.
 *
 * `data-crossref` is a link whose text names its destination, like the AI
 * review's link back to the claim it is reviewing. A back-link that does not
 * say where it goes is not a back-link.
 *
 * `data-pagefind-ignore` is chrome — navigation, the outline, the correction
 * box. It is already excluded from the search index on the grounds that it is
 * not the page's content, and the same reasoning applies here.
 */
const EXCLUDED =
  /<(\w+)\b[^>]*\bdata-(?:record|crossref|pagefind-ignore)\b[^>]*>[\s\S]*?<\/\1>/gi;

/**
 * Quoted source text, dropped for the same reason as `data-record`: a story
 * quoting a bylaw and the claim record quoting the same bylaw are not the site
 * saying something twice, they are the evidence trail working. The site's whole
 * method is to put the document in front of the reader, and it cannot both do
 * that and paraphrase the document differently in each place it appears.
 *
 * Two shapes, because the repo quotes both ways: double quotes in MDX prose,
 * single quotes inside YAML claim records. The single-quote form has to let an
 * apostrophe through — `aren't`, `individual's` — so a quote mark only closes
 * the span when a letter does not follow it, and both forms are length-capped
 * so an unmatched quote cannot swallow the rest of the page.
 */
const QUOTED = [
  /[“"][^“”"]{0,600}[”"]/g,
  /(?<=^|[\s(:—-])'(?:[^']|'(?=[a-z])){10,600}?'(?![a-z])/g,
];

/** Rendered text of an HTML fragment, with block boundaries preserved. */
function textOf(html: string): string {
  return html
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(EXCLUDED, ` ${BREAK} `)
    .replace(BLOCK_TAG, ` ${BREAK} `)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#?\w+);/g, (whole, name: string) => ENTITIES[name.toLowerCase()] ?? whole)
    .replace(QUOTED[0]!, ` ${BREAK} `)
    .replace(QUOTED[1]!, ` ${BREAK} `)
    .replace(/[\t\n\r ]+/g, ' ')
    .trim();
}

function section(html: string, tag: 'main' | 'footer'): string {
  const match = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'i').exec(html);
  return match ? textOf(match[1]!) : '';
}

/**
 * Words as the comparison sees them. Numbers and per-cent signs survive —
 * "38% below the cold-weather guarantee" repeated verbatim is exactly the kind
 * of hit worth catching; everything else punctuational is dropped.
 */
function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9%$'.\u0001-]+/g, ' ')
    .split(' ')
    .map((word) => (word.includes(BREAK) ? BREAK : word.replace(/^[.'-]+|[.'-]+$/g, '')))
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Repeated runs
// ---------------------------------------------------------------------------

type Run = { start: number; length: number };

function keyAt(tokens: string[], index: number, size: number): string | undefined {
  const window = tokens.slice(index, index + size);
  return window.includes(BREAK) ? undefined : window.join(' ');
}

/** Every shingle of `size` in `tokens` that does not cross a block boundary. */
function shingles(tokens: string[], size: number): Map<string, number[]> {
  const index = new Map<string, number[]>();
  for (let i = 0; i + size <= tokens.length; i += 1) {
    const key = keyAt(tokens, i, size);
    if (key === undefined) continue;
    const at = index.get(key);
    if (at) at.push(i);
    else index.set(key, [i]);
  }
  return index;
}

/**
 * Maximal repeated runs. Sliding windows overlap, so a duplicated 20-word
 * sentence yields eleven 10-word hits; overlapping hits are merged back into
 * the single run they came from.
 */
function repeatedRuns(tokens: string[], size: number, isRepeat: (key: string) => boolean): Run[] {
  const runs: Run[] = [];
  for (let index = 0; index + size <= tokens.length; index += 1) {
    const key = keyAt(tokens, index, size);
    if (key === undefined || !isRepeat(key)) continue;
    const last = runs.at(-1);
    if (last && index < last.start + last.length) last.length = index + size - last.start;
    else runs.push({ start: index, length: size });
  }
  return runs;
}

function excerpt(tokens: string[], run: Run, limit = 150): string {
  const text = tokens.slice(run.start, run.start + run.length).join(' ');
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

/** Identical runs collapse to one finding carrying how many times it appeared. */
function record(cls: ClassName, where: string, tokens: string[], runs: Run[]) {
  const counts = new Map<string, { words: number; times: number }>();
  for (const run of runs) {
    const text = excerpt(tokens, run);
    const seen = counts.get(text);
    if (seen) seen.times += 1;
    else counts.set(text, { words: run.length, times: 1 });
  }
  for (const [text, { words: length, times }] of counts) {
    findings.push({ class: cls, where, words: length, times, text });
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const DIST = repoPath('dist');
if (!existsSync(DIST)) {
  console.error('duplication-audit: dist/ is missing — run `npm run build` first');
  process.exit(1);
}

const strict = process.argv.includes('--strict');

/**
 * Pages whose body is prose somebody wrote, as opposed to a generated view of
 * shared records. Only these are compared against each other: a source title or
 * a claim question appearing on both the registry listing and the story that
 * cites it is a reference, not boilerplate, and flagging it would bury the
 * boilerplate that matters.
 */
const NARRATIVE = /^\/(facts\/|methodology|about|support)/;

const pages = builtPages(DIST).map((file) => {
  const html = readFileSync(file, 'utf8');
  const url = builtPageUrl(DIST, file);
  return { url, main: words(section(html, 'main')), footer: words(section(html, 'footer')) };
});

/** Every distinct cross-page shingle, mapped to the pages carrying it. */
const crossPage = new Map<string, Set<string>>();

for (const page of pages) {
  const inPage = shingles(page.main, IN_PAGE_MIN);
  record(
    'IN-PAGE',
    page.url,
    page.main,
    repeatedRuns(page.main, IN_PAGE_MIN, (key) => (inPage.get(key)?.length ?? 0) > 1),
  );

  const footer = new Set(shingles(page.footer, PAGE_FOOTER_MIN).keys());
  record(
    'PAGE+FOOTER',
    page.url,
    page.main,
    repeatedRuns(page.main, PAGE_FOOTER_MIN, (key) => footer.has(key)),
  );

  if (!NARRATIVE.test(page.url)) continue;
  for (const key of shingles(page.main, CROSS_PAGE_MIN).keys()) {
    const seen = crossPage.get(key);
    if (seen) seen.add(page.url);
    else crossPage.set(key, new Set([page.url]));
  }
}

for (const page of pages) {
  if (!NARRATIVE.test(page.url)) continue;
  const runs = repeatedRuns(page.main, CROSS_PAGE_MIN, (key) => (crossPage.get(key)?.size ?? 0) > 1);
  for (const run of runs) {
    const carriers = [...crossPage.get(keyAt(page.main, run.start, CROSS_PAGE_MIN)!)!].sort();
    // Reported once, from the alphabetically first page that carries it.
    if (carriers[0] !== page.url) continue;
    record('CROSS-PAGE', carriers.join(', '), page.main, [run]);
  }
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

const CLASSES = Object.keys(SEVERITY) as ClassName[];

for (const cls of CLASSES) {
  const hits = findings
    .filter((finding) => finding.class === cls)
    .sort((a, b) => b.words - a.words);
  if (hits.length === 0) continue;
  console.log(`\n${cls} (${SEVERITY[cls]}) — ${hits.length}`);
  for (const hit of hits) {
    console.log(`  ${hit.where}  ${hit.words} words${hit.times > 1 ? ` ×${hit.times}` : ''}`);
    console.log(`    ${hit.text}`);
  }
}

const failCount = findings.filter((finding) => SEVERITY[finding.class] === 'fail').length;
const warnCount = findings.length - failCount;

console.log(`\nduplication-audit: ${pages.length} built pages in ${path.relative(REPO_ROOT, DIST)}`);
for (const cls of CLASSES) {
  const count = findings.filter((finding) => finding.class === cls).length;
  console.log(`  ${SEVERITY[cls]}  ${cls.padEnd(12)} ${count}`);
}

if (failCount > 0) {
  console.error(`\nduplication-audit: ${failCount} finding(s) in fail classes`);
  process.exit(1);
}
if (strict && warnCount > 0) {
  console.error(`\nduplication-audit: --strict — ${warnCount} warning(s) need disposition`);
  process.exit(1);
}
console.log(
  warnCount > 0
    ? `\nduplication-audit: OK — no fail-class findings; ${warnCount} cross-page warning(s) need a judgement`
    : '\nduplication-audit: OK — clean',
);
