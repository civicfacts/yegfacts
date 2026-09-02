import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { firstPublished, publishedStories } from '../lib/content';
import { SITE } from '../lib/site';

/**
 * The findings feed: what the panel has checked, newest first.
 *
 * It carries `one_line` and nothing else, because the one-sentence answer is
 * the finding and everything that makes it trustworthy — the evidence, the
 * panel, the limitations, the corrections history — is on the page. A feed
 * reader showing the whole story would show the answer stripped of its working.
 *
 * `pubDate` is the day the story was published, not the day it was last
 * verified: a re-verification is not a new item, and dating it as one would put
 * an unchanged finding back at the top of every reader's list.
 */
export async function GET(context: APIContext) {
  const stories = await publishedStories();
  return rss({
    title: 'YEGFacts findings',
    description: 'Edmonton civic claims checked against the public record.',
    site: context.site ?? SITE.url,
    // The site is `trailingSlash: 'never'`; the feed's links must match it.
    trailingSlash: false,
    items: stories.map((story) => ({
      title: story.data.title,
      pubDate: new Date(`${firstPublished(story)}T00:00:00Z`),
      description: story.data.one_line,
      link: `/facts/${story.id}`,
    })),
  });
}
