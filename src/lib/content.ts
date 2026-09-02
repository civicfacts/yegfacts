import { getCollection, type CollectionEntry } from 'astro:content';

export type Story = CollectionEntry<'stories'>;
export type Claim = CollectionEntry<'claims'>;
export type Commitment = CollectionEntry<'commitments'>;
export type Topic = CollectionEntry<'topics'>;
export type Evidence = CollectionEntry<'evidence'>;
export type JournalPost = CollectionEntry<'journal'>;

/**
 * The single visibility gate (build plan, Phase 1A item 3).
 *
 * `draft` stories are excluded from every public route, from the search index,
 * from the homepage and from topic hubs. Because `/facts/[slug]` builds its
 * paths from this function, a draft story has no page at all — which is what
 * keeps it out of Pagefind too, with no separate exclusion rule to forget.
 */
export function isPublic(story: Story): boolean {
  return story.data.status !== 'draft';
}

/**
 * The second gate (methodology v1.13): a story every one of whose claims came
 * back Not established because the public record cannot answer the question at
 * the level people ask it is no longer a finding.
 *
 * It keeps its page, its URL and its history — the check happened and the
 * record of it is the point — but it comes off every board. Hence the pairing
 * below: the plain helpers are the boards' view and exclude it, and the `all…`
 * siblings are the whole set, for route generation and for the pages whose job
 * is the audit trail rather than the findings.
 */
export function isWithdrawn(story: Story): boolean {
  return story.data.withdrawn !== undefined;
}

const byNewest = (stories: Story[]): Story[] =>
  stories.sort(
    (a, b) => b.data.last_verified.localeCompare(a.data.last_verified) || a.id.localeCompare(b.id),
  );

/** Every story with a page, withdrawn ones included, newest verification first. */
export async function allPublicStories(): Promise<Story[]> {
  return byNewest(await getCollection('stories', isPublic));
}

/** Every story that may be listed to the public, newest verification first, ties by id. */
export async function publicStories(): Promise<Story[]> {
  return (await allPublicStories()).filter((story) => !isWithdrawn(story));
}

/** Every story that has been through the panel, withdrawn ones included. */
export async function allPublishedStories(): Promise<Story[]> {
  return byNewest(await getCollection('stories', (story) => story.data.status === 'published'));
}

/**
 * Stories that have been through the panel and still stand as findings, newest
 * verification first.
 *
 * Narrower than `publicStories()` on purpose: the home page is built out of
 * findings, and a `pending-review` story has none yet. Ties on `last_verified`
 * are broken by id so the order is explicit.
 */
export async function publishedStories(): Promise<Story[]> {
  return (await allPublishedStories()).filter((story) => !isWithdrawn(story));
}

/**
 * The day the story first went up, for the feed and for the structured data.
 *
 * The changelog is the only record of it — `as_of` is the date the evidence
 * speaks to, not the date of publication — so the `published` entry is the
 * answer, and the earliest one at that, because a story republished after a
 * withdrawal would carry two. `as_of` is the fallback for a `pending-review`
 * story, which has been written but has no publication entry yet.
 */
export function firstPublished(story: Story): string {
  const dates = story.data.changelog
    .filter((entry) => entry.type === 'published')
    .map((entry) => entry.date)
    .sort();
  return dates[0] ?? story.data.as_of;
}

async function claimsOf(stories: Story[]): Promise<Claim[]> {
  const visible = new Set(stories.map((story) => story.id));
  const claims = await getCollection('claims');
  return claims.filter((claim) => visible.has(claim.data.story));
}

/** Claims belonging to every story with a page — the evidence trail's view. */
export async function allPublicClaims(): Promise<Claim[]> {
  return claimsOf(await allPublicStories());
}

/** The claims of one story, in the order the story lists them. */
export async function claimsForStory(story: Story): Promise<Claim[]> {
  if (story.data.claims.length === 0) return [];
  const claims = await getCollection('claims');
  const byId = new Map(claims.map((claim) => [claim.data.id, claim]));
  return story.data.claims
    .map((id) => byId.get(id))
    .filter((claim): claim is Claim => claim !== undefined);
}

export async function commitmentsForStory(story: Story): Promise<Commitment[]> {
  const commitments = await getCollection('commitments');
  const listed = new Set(story.data.commitments);
  return commitments.filter(
    (commitment) => listed.has(commitment.data.id) || commitment.data.story === story.id,
  );
}

/** Evidence objects a story rests on, gathered from its claims and commitments. */
export async function evidenceForStory(
  claims: Claim[],
  commitments: Commitment[],
): Promise<Evidence[]> {
  const ids = new Set<string>();
  for (const claim of claims) {
    for (const id of claim.data.evidence) ids.add(id);
    for (const fact of claim.data.key_facts) for (const id of fact.sources) ids.add(id);
  }
  for (const commitment of commitments) ids.add(commitment.data.source);
  const registry = await getCollection('evidence');
  return registry
    .filter((entry) => ids.has(entry.data.id))
    .sort((a, b) => a.data.id.localeCompare(b.data.id));
}

/** Topics in curated display order. */
export async function orderedTopics(): Promise<Topic[]> {
  const topics = await getCollection('topics');
  return topics.sort((a, b) => a.data.order - b.data.order);
}

/** A claim's topics, falling back to the parent story's (spec §3). */
export function claimTopics(claim: Claim, story: Story | undefined): readonly string[] {
  return claim.data.topics ?? story?.data.topics ?? [];
}

/** Stable in-page anchor for a claim, used by aliases and copy links. */
export function claimAnchor(claim: Claim): string {
  return claim.data.id;
}

/**
 * Every claim of every published story, paired with the story it belongs to.
 *
 * The order is the record's own order: newest verified story first, then the
 * claims in the order that story lists them. Pages that show claims rather than
 * stories — the home page's recent rows, the full claim index — read this one
 * function, so what "newest" means cannot drift between them.
 */
export async function publishedClaims(): Promise<Array<{ claim: Claim; story: Story }>> {
  const stories = await publishedStories();
  const rows: Array<{ claim: Claim; story: Story }> = [];
  for (const story of stories) {
    for (const claim of await claimsForStory(story)) rows.push({ claim, story });
  }
  return rows;
}

/**
 * The journal, newest first (D-0022). Its visibility gate is `draft`, not
 * `status`: a journal post has no review state to be in, so the only question
 * is whether Stew has finished writing it. `/journal/[slug]` builds its paths
 * from here, so a draft has no page and cannot reach Pagefind or the feed.
 * Ties on the date are broken by id, since several posts can share a day.
 */
export async function publicJournal(): Promise<JournalPost[]> {
  const posts = await getCollection('journal', (post) => !post.data.draft);
  return posts.sort((a, b) => b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id));
}
