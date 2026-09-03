import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import {
  allPublicClaims,
  allPublicStories,
  orderedTopics,
  publicJournal,
  publishedStories,
} from '../lib/content';
import { claimsWithPages, questionRegister, sourceRegister } from '../lib/intake';
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

  /** The article behind a question, keyed by the question's id, for `lastmod`. */
  const articles = new Map(stories.map((story) => [story.id, story]));

  /** Every claim that carries a finding, dated by the article it was published in. */
  const findingPages = (await allPublicClaims()).flatMap((claim) => {
    const article = articles.get(claim.data.story);
    return article
      ? [{ path: `/claims/${claim.data.id}`, lastmod: article.data.last_verified }]
      : [];
  });

  /**
   * The boards — home, the register, the search page — say what they say
   * because of the findings on them, so they are as old as the newest
   * verification behind a finding that still stands.
   */
  const boards = newest((await publishedStories()).map((story) => story.data.last_verified));

  const entries: Entry[] = [
    { path: '/', lastmod: boards },
    { path: '/search', lastmod: boards },

    // The register, and one page per question whatever its state: an address a
    // question has from the day it is registered is one the sitemap carries
    // from that day too. A question that has been written up is as new as its
    // article; one that has not has no date in the record to give.
    { path: '/questions', lastmod: boards },
    ...questionRegister().map((question) => {
      const article = question.story ? articles.get(question.story) : undefined;
      return {
        path: `/questions/${question.id}`,
        lastmod: article
          ? newest([
              article.data.last_verified,
              ...article.data.changelog.map((entry) => entry.date),
            ])
          : undefined,
      };
    }),

    // Both kinds of claim page: the ones that came back with a finding, and the
    // register entries that have not been checked.
    ...findingPages,
    ...claimsWithPages().map((claim) => ({ path: `/claims/${claim.id}` })),

    // One page per capture: the completeness record for what came out of it.
    ...sourceRegister().map((source) => ({
      path: `/sources/${source.id}`,
      lastmod: source.captured,
    })),

    // Every topic gets a hub, whether or not a question has landed under it yet,
    // which is what `/topics/[slug].astro` builds from.
    { path: '/topics' },
    ...topics.map((topic) => ({ path: `/topics/${topic.data.slug}` })),

    { path: '/evidence' },
    // `retrieved_on` is the day the record was last checked against the source:
    // the registry entry's own date, and the closest thing the page has to one.
    ...evidence.map((entry) => ({
      path: `/evidence/${entry.data.id}`,
      lastmod: entry.data.retrieved_on,
    })),

    { path: '/commitments' },

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
