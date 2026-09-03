import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { firstPublished, publishedClaims, standfirst } from '../lib/content';
import { SITE } from '../lib/site';

/**
 * The findings feed: the questions the panel has answered, newest first.
 *
 * An item carries the question's standfirst and nothing else, because that
 * sentence is the answer and everything that makes it trustworthy — the
 * evidence, the panel, the limitations, the corrections history — is on the
 * page. A feed reader showing the whole article would show the answer stripped
 * of its working.
 *
 * `pubDate` is the day it was published, not the day it was last verified: a
 * re-verification is not a new item, and dating it as one would put an
 * unchanged finding back at the top of every reader's list.
 *
 * The items come off the claims rather than off the story list, because since
 * methodology v1.19 a question can be published and hold no claim that still
 * stands as a finding. A feed of findings does not carry it.
 */
export async function GET(context: APIContext) {
  const rows = await publishedClaims();
  const stories = [...new Map(rows.map((row) => [row.story.id, row.story])).values()];
  return rss({
    title: 'YEGFacts findings',
    description: 'Edmonton civic claims checked against the public record.',
    site: context.site ?? SITE.url,
    // The site is `trailingSlash: 'never'`; the feed's links must match it.
    trailingSlash: false,
    items: await Promise.all(
      stories.map(async (story) => ({
        title: story.data.title,
        pubDate: new Date(`${firstPublished(story)}T00:00:00Z`),
        description: await standfirst(story),
        link: `/questions/${story.id}`,
      })),
    ),
  });
}
