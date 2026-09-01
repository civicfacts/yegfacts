import { getCollection, type CollectionEntry } from 'astro:content';

export type Story = CollectionEntry<'stories'>;
export type Claim = CollectionEntry<'claims'>;
export type Commitment = CollectionEntry<'commitments'>;
export type Topic = CollectionEntry<'topics'>;
export type Evidence = CollectionEntry<'evidence'>;

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

/** Every story that may be shown to the public, newest verification first, ties by id. */
export async function publicStories(): Promise<Story[]> {
  const stories = await getCollection('stories', isPublic);
  return stories.sort(
    (a, b) => b.data.last_verified.localeCompare(a.data.last_verified) || a.id.localeCompare(b.id),
  );
}

/**
 * Stories that have been through the panel, newest verification first.
 *
 * Narrower than `publicStories()` on purpose: the home page is built out of
 * findings, and a `pending-review` story has none yet. Ties on `last_verified`
 * are broken by id so the order is explicit.
 */
export async function publishedStories(): Promise<Story[]> {
  const stories = await getCollection('stories', (story) => story.data.status === 'published');
  return stories.sort(
    (a, b) => b.data.last_verified.localeCompare(a.data.last_verified) || a.id.localeCompare(b.id),
  );
}

/** Claims belonging to stories the public can see, keyed by claim id. */
export async function publicClaims(): Promise<Claim[]> {
  const visible = new Set((await publicStories()).map((story) => story.id));
  const claims = await getCollection('claims');
  return claims.filter((claim) => visible.has(claim.data.story));
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
