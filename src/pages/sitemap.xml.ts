import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import {
  allPublicStories,
  orderedTopics,
  publicJournal,
  publishedStories,
} from '../lib/content';
import { claimsWithPages, questionRegister } from '../lib/intake';
import { methodologyChanges } from '../lib/methodology';
import { SITE } from '../lib/site';

/**
 * The sitemap, assembled here rather than by `@astrojs/sitemap`.
 *
 * Two reasons, and both are about honesty rather than convenience. The
 * integration lists every built page, which would hand a crawler the root-level
 * alias pages — `noindex` meta-refresh redirects whose whole job is to bounce a
 * reader onto the real URL. And its `lastmod` is the build clock, so a deploy
 * that changed one story would claim every page changed with it; the dates
 * below come out of the record instead — a story's verification and changelog,
 * a post's date, a source's retrieval — and are simply left out where the repo
 * has no real date to give.
 *
 * `changefreq` and `priority` are absent for the same reason: neither is a
 * fact about the page, and search engines have said for years that they ignore
 * both.
 *
 * `scripts/sitemap-audit.ts` runs after the build and fails if an indexable
 * page is missing from this list, so a new route cannot be forgotten here.
 */

interface Entry {
  path: string;
  /** `YYYY-MM-DD`, omitted where no date in the record stands for the page. */
  lastmod?: string;
}

const newest = (dates: string[]): string | undefined =>
  dates.filter(Boolean).sort().at(-1);

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET(context: APIContext): Promise<Response> {
  const site = context.site ?? new URL(SITE.url);

  const [stories, posts, topics, evidence] = await Promise.all([
    allPublicStories(),
    publicJournal(),
    orderedTopics(),
    getCollection('evidence'),
  ]);

  /**
   * The boards — home, the story index, the search page — say what they say
   * because of the findings on them, so they are as old as the newest
   * verification behind a finding that still stands.
   */
  const boards = newest((await publishedStories()).map((story) => story.data.last_verified));

  const entries: Entry[] = [
    { path: '/', lastmod: boards },
    { path: '/stories', lastmod: boards },
    { path: '/search', lastmod: boards },

    // A withdrawn story keeps its page and its URL, so it keeps its place here.
    ...stories.map((story) => ({
      path: `/facts/${story.id}`,
      lastmod: newest([
        story.data.last_verified,
        ...story.data.changelog.map((entry) => entry.date),
      ]),
    })),

    // Every topic gets a hub, whether or not a story has landed under it yet,
    // which is what `/topics/[slug].astro` builds from.
    ...topics.map((topic) => ({ path: `/topics/${topic.data.slug}` })),

    { path: '/evidence' },
    // `retrieved_on` is the day the record was last checked against the source:
    // the registry entry's own date, and the closest thing the page has to one.
    ...evidence.map((entry) => ({
      path: `/evidence/${entry.data.id}`,
      lastmod: entry.data.retrieved_on,
    })),

    { path: '/commitments' },
    { path: '/considered' },
    // Both levels of the register have a page: the question with the decision
    // on it, and each claim checked under it.
    ...questionRegister().map((question) => ({ path: `/considered/${question.id}` })),
    ...claimsWithPages().map((claim) => ({ path: `/considered/${claim.id}` })),

    { path: '/about' },
    { path: '/support' },
    { path: '/methodology' },
    {
      path: '/methodology/changes',
      lastmod: newest(methodologyChanges().map((change) => change.date)),
    },

    { path: '/journal', lastmod: newest(posts.map((post) => post.data.date)) },
    ...posts.map((post) => ({ path: `/journal/${post.id}`, lastmod: post.data.date })),
  ];

  const urls = entries.map(({ path, lastmod }) => {
    // `new URL` rather than string concatenation so the home page's `<loc>`
    // is byte-for-byte the canonical link Base.astro writes into its head.
    const loc = `    <loc>${escapeXml(new URL(path, site).href)}</loc>`;
    const modified = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n${loc}${modified}\n  </url>`;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
