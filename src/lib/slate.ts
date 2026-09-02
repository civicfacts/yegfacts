import { allPublishedStories, type Story } from './content';

/**
 * The nine-story launch slate, pre-registered in `docs/DESIGN.md` §7 before any
 * panel ran.
 *
 * Expected findings are deliberately not recorded here or anywhere on the
 * public site: naming a hypothesis beside a claim prejudges it. What the list
 * fixes is the set of stories and the claims inside them, so the slate cannot
 * be trimmed to the answers it produced.
 *
 * One list, read by both the home page and `/methodology#launch-slate`, so the
 * two cannot drift on what was promised.
 */
export interface SlateEntry {
  /**
   * The story id. For a story that has run, this is the real content id. For
   * one still to come, it is the id that story must be given when it is
   * published, so the entry resolves against the stories collection.
   */
  slug: string;
  /** Display name, used before a story exists to supply a title. */
  story: string;
  /** The claims as pre-registered, in the wording fixed before the panel ran. */
  claims: string;
}

export const LAUNCH_SLATE: readonly SlateEntry[] = [
  {
    slug: 'electric-buses',
    story: 'Electric buses',
    claims:
      'Procurement failed as contracted; Edmonton lost $82M; the failure proves e-buses do not work in cold cities.',
  },
  {
    slug: 'climate-targets',
    story: 'Climate targets',
    claims: 'The City is on track for its climate targets.',
  },
  {
    slug: 'fifteen-minute-districts',
    story: '15-minute districts',
    claims: 'District plans restrict where residents can travel.',
  },
  {
    slug: 'active-transportation',
    story: 'Active transportation investment',
    claims:
      'Edmonton spends $100 million a year on bike lanes; the active-transportation network has reduced congestion.',
  },
  {
    slug: 'parking-reform',
    story: 'Parking reform',
    claims:
      'Edmonton banned parking and new buildings provide none; removing parking minimums made housing more affordable.',
  },
  {
    slug: 'winter-cycling',
    story: 'Winter cycling',
    claims: 'Edmonton is too cold for cycling to work as transportation.',
  },
  {
    slug: 'infill-zoning',
    story: 'Infill and zoning',
    claims:
      '8-plexes can be built on every lot; sewer capacity is not checked before infill is approved.',
  },
  {
    slug: 'vision-zero',
    story: 'Vision Zero',
    claims: 'Edmonton is making steady progress toward Vision Zero.',
  },
  {
    slug: 'downtown',
    story: 'Downtown',
    claims: 'Downtown is dead and nobody goes there any more.',
  },
];

export interface SlateRow extends SlateEntry {
  /** The published story, when the slate entry has run. */
  published?: Story;
}

/**
 * The slate joined to the stories that have actually published, in slate
 * order. Both pages that show the slate go through this one join, so they
 * cannot disagree about what is still to come.
 */
export async function launchSlate(): Promise<SlateRow[]> {
  const byId = new Map((await allPublishedStories()).map((story) => [story.id, story]));
  return LAUNCH_SLATE.map((entry) => ({ ...entry, published: byId.get(entry.slug) }));
}
