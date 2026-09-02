import { FINDING_GLOSS, PANEL_AGREEMENT_GLOSS } from './findings';

/**
 * Site glossary. Terms render through <Term>, which draws a dotted underline
 * and puts the definition in a popover; definitions stay in one place so the
 * wording is the same everywhere the word appears.
 *
 * Two kinds of entry live here. Subject vocabulary — Chapter 11, mode share —
 * is defined outright. Method vocabulary — the findings, panel agreement, the
 * dates in a story header — takes its wording from the modules the rest of the
 * site already renders it from, and carries an `href` to the section of the
 * methodology that sets it out in full. Every href is an anchor that exists.
 */
export interface GlossaryEntry {
  /** Two sentences at most. What the word means, not why it matters. */
  definition: string;
  /** A real anchor on /methodology or /methodology/changes. */
  href?: string;
}

const VOCABULARY = '/methodology#vocabulary';
const AGREEMENT = '/methodology#synthesis';

/** Every entry of a finding or agreement gloss map, pointed at the same anchor. */
function withHref(map: Record<string, string>, href: string): Record<string, GlossaryEntry> {
  return Object.fromEntries(
    Object.entries(map).map(([term, definition]) => [term, { definition, href }]),
  );
}
const STAGES = '/methodology#stages';
const STORIES = '/methodology#stories';

export const glossary: Record<string, GlossaryEntry> = {
  Proterra: {
    definition:
      'Proterra Inc. — the U.S. manufacturer that built Edmonton’s 60 battery-electric buses. It filed for bankruptcy in August 2023.',
  },
  'Chapter 11': {
    definition:
      'A U.S. bankruptcy process in which a company reorganizes under court supervision while continuing to operate.',
  },
  'proof of claim': {
    definition:
      'A formal document a creditor files in a bankruptcy stating how much it believes it is owed. It is an assertion, not a court ruling or an audited amount.',
  },
  'general unsecured': {
    definition:
      'A bankruptcy claim with no collateral behind it. General unsecured creditors are paid after secured creditors, often only partially.',
  },
  'battery blankets': {
    definition:
      'Insulating covers added to bus batteries to reduce cold-weather performance loss.',
  },
  'mean distance between failures': {
    definition:
      'A reliability measure: the average distance a vehicle travels before something breaks. Higher is better.',
  },
  'mode share': {
    definition:
      'The share of trips made by one mode of travel. It only means something once the denominator is stated — all trips, or journey-to-work trips, over what period. Shares measured on different denominators cannot be compared.',
  },
  'statutory plan': {
    definition:
      'A land-use plan a council adopts under Alberta’s Municipal Government Act. It guides decisions about rezoning, subdivision and development permits.',
  },
  'carbon budget': {
    definition:
      'A cap on emissions rather than money: the total greenhouse gas a city can emit over a period and still hit its target. Edmonton presents one to Council alongside its financial budgets, for information rather than approval.',
  },
  'community emissions': {
    definition:
      'Greenhouse gas emitted across the whole city — homes, industry, vehicles, businesses. Distinct from corporate emissions, which are only the City organization’s own operations and are about two per cent of the total.',
  },
  tCO2e: {
    definition:
      'Tonnes of carbon dioxide equivalent — every greenhouse gas converted to the amount of CO2 that would warm the planet as much, so one number covers them all.',
  },
  'office consolidation': {
    definition:
      'A convenience copy of a bylaw with all its later amendments merged into one document. The original bylaws on file with the City Clerk govern if the two ever differ.',
  },
  'webdocs consolidation': {
    definition:
      'The City’s own web copy of a bylaw section, served from its webdocs site with the amendments made up to that point merged in. It carries the section text only, so any map or appendix it points at has to be found elsewhere.',
  },

  // The five canonical findings. Wording is imported, never retyped, so the
  // popover and the methodology page cannot drift apart.
  ...withHref(FINDING_GLOSS, VOCABULARY),
  ...withHref(PANEL_AGREEMENT_GLOSS, AGREEMENT),

  'evidence basis': {
    definition:
      'What kind of record answered the question — an audited statement, a council report, a dataset. It is reported apart from the finding, because a claim can be Supported on a thin basis.',
    href: VOCABULARY,
  },
  'as of': {
    definition:
      'The date the accounting window closes. Anything that happened after it is outside this check, and the date is fixed in the brief before any model runs.',
    href: STAGES,
  },
  'last verified': {
    definition:
      'The date we last re-read the cited sources and confirmed the page still matches them. It is not a claim that the records themselves changed.',
    href: STORIES,
  },
  'next review by': {
    definition:
      'When this story is due for a fresh check of its sources. Past that date, treat it as unverified until it has been re-reviewed.',
    href: STORIES,
  },
  'methodology version': {
    definition:
      'The version of the published method that produced these findings. Every change to the prompts, the merge and synthesis rules, the vocabulary or the validation bumps it.',
    href: '/methodology/changes',
  },
  'three-model AI panel': {
    definition:
      'Three AI reviewers from different vendors research each claim independently, and blind to each other. Which models ran is recorded with every run and shown in the AI review section of every story.',
    href: STAGES,
  },
  'published rule': {
    definition:
      'A fixed synthesis rule, published in advance, turns the three verdicts into one finding word, so no person chooses the finding. The rule and every change to it are versioned in the methodology changelog.',
    href: AGREEMENT,
  },

  panel: {
    definition:
      'The three models that research each claim independently, blind to each other and to this repo. They never vote: the finding is computed from their locked first-round verdicts by a rule published in advance.',
    href: STAGES,
  },
  'cross-review': {
    definition:
      'A second round in which each model sees the combined evidence and the other two sets of findings, and is asked to find their errors and its own. Nothing said there can move the finding.',
    href: STAGES,
  },
};

export function define(term: string): GlossaryEntry | undefined {
  return glossary[term] ?? glossary[term.toLowerCase()];
}

/** A glossary entry, or a build failure: a term the site uses must be defined. */
export function requireTerm(term: string): GlossaryEntry {
  const entry = define(term);
  if (!entry) throw new Error(`Glossary is missing "${term}" (src/lib/glossary.ts)`);
  return entry;
}
