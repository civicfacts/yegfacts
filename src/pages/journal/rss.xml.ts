import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publicJournal } from '../../lib/content';
import { SITE } from '../../lib/site';

/**
 * The journal feed (D-0022). It carries the summary, not the rendered body: the
 * summary is the whole post in a sentence, and a reader who wants the rest
 * should land on the page that says who wrote it and that it is not a finding.
 */
export async function GET(context: APIContext) {
  const posts = await publicJournal();
  return rss({
    title: 'YEGFacts journal',
    description: 'Dated posts by Stew on building YEGFacts. Writing, not findings.',
    site: context.site ?? SITE.url,
    // The site is `trailingSlash: 'never'`; the feed's links must match it.
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(`${post.data.date}T00:00:00Z`),
      description: post.data.summary,
      link: `/journal/${post.id}`,
    })),
  });
}
