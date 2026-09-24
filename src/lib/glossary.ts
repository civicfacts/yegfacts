import { existsSync } from 'node:fs';
import path from 'node:path';
import { loadRunManifest } from '../../scripts/lib/review-schema';
import type { Claim } from './content';
import { FINDING_GLOSS, PANEL_AGREEMENT_GLOSS, SPLIT_PARTIAL_GLOSS, SPLIT_PARTIAL_TERM } from './findings';

/**
 * Site glossary. Terms render through <Term>, which draws a dotted underline
 * and puts the definition in a popover; definitions stay in one place so the
 * wording is the same everywhere the word appears.
 *
 * Two kinds of entry live here. Subject vocabulary — Chapter 11, mode share —
 * is defined outright. Method vocabulary — the findings, panel agreement, the
 * dates in a finding's header — takes its wording from the modules the rest of the
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
const QUESTIONS = '/methodology#questions';

export const glossary: Record<string, GlossaryEntry> = {
  'frozen brief': {
    definition:
      'The written question each panel answers: the exact claims, definitions, dates and cutoffs, fixed and published before any reviewer runs, so the framing cannot move after the answers arrive.',
    href: STAGES,
  },
  'capital profile': {
    definition:
      'The City of Edmonton\u2019s unit of capital budgeting: one numbered project or program with an approved amount by year. Approval is permission to spend, not spending.',
  },
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
  [SPLIT_PARTIAL_TERM]: { definition: SPLIT_PARTIAL_GLOSS, href: AGREEMENT },
  ...withHref(PANEL_AGREEMENT_GLOSS, AGREEMENT),
  Unanimous: {
    definition:
      'All three seats reached the same verdict. Panel agreement describes seats, not vendors; two OpenAI seats agreeing are not two independent vendor confirmations.',
    href: AGREEMENT,
  },

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
    href: QUESTIONS,
  },
  'next review by': {
    definition:
      'When this is due for a fresh check of its sources. Past that date, treat it as unverified until it has been re-reviewed.',
    href: QUESTIONS,
  },
  'methodology version': {
    definition:
      'The version of the published method that produced these findings. Every change to the prompts, the merge and synthesis rules, the vocabulary or the validation bumps it.',
    href: '/methodology/changes',
  },
  'three-model AI panel': {
    definition:
      'Three AI models from three vendors (Claude, GPT, Gemini) researched this claim in a blind first round, then read one another\u2019s findings in a second round that documented errors. This label describes a run frozen before September 23, 2026.',
    href: STAGES,
  },
  'AI panel': {
    definition:
      'The seats that produced this finding are listed in its run manifest. This page could not read that manifest, so it names no vendors here.',
    href: STAGES,
  },
  'three-seat AI panel, two vendors': {
    definition:
      'Three AI model seats from two vendors: one Anthropic model and two OpenAI models. The two OpenAI seats are not independent of each other, so three agreeing verdicts are not three independent confirmations.',
    href: STAGES,
  },
  'published rule': {
    definition:
      'A fixed synthesis rule, published in advance, turns the three verdicts into one finding word, so no person chooses the finding. The rule and every change to it are versioned in the methodology changelog.',
    href: AGREEMENT,
  },

  panel: {
    definition:
      'The three model seats that research each claim blind to each other. Current runs use three AI model seats from two vendors: one Anthropic model and two OpenAI models. The two OpenAI seats are not independent of each other. A published rule computes the finding from their locked first-round verdicts.',
    href: STAGES,
  },
  'cross-review': {
    definition:
      'A second round in which each model sees the combined evidence and the other two sets of findings, and is asked to find their errors and its own. Nothing said there can move the finding.',
    href: STAGES,
  },
};

const missingPanels = new Set<string>();

/** The panel that produced a claim, or the historical label with one warning if its manifest cannot be read. */
export function panelForClaim(claim: Claim): { term: string; label: string } {
  const historical = {
    term: 'three-model AI panel',
    label: 'three-model AI panel (Claude, GPT, Gemini)',
  };
  const unreadable = {
    term: 'AI panel',
    label: 'AI panel (seats in the run record)',
  };
  try {
    const file = path.join(process.cwd(), claim.data.review_run, 'run.yaml');
    if (!existsSync(file)) throw new Error('run.yaml is missing');
    // Only the seats that answered. A refused or failed attempt keeps its
    // manifest row (that is the retention rule) and is not a seat on the panel.
    // Manifests written before methodology v1.28 carry no status field; every
    // row in them is an answered seat.
    const seats = loadRunManifest(file).runs
      .filter((run) => run.round === 1 && (run.status === undefined || run.status === 'ok'))
      .map((run) => ({ provider: run.provider.toLowerCase(), name: run.seat ?? run.model_id }));
    if (seats.length !== 3 || seats.some((seat) => !seat.name)) {
      throw new Error('round-one seats are incomplete');
    }
    const providers = new Set(seats.map((seat) => seat.provider));
    const historicalVendors = ['anthropic', 'openai', 'google'];
    if (providers.size === 3 && historicalVendors.every((vendor) => providers.has(vendor))) return historical;
    if (
      providers.size === 2 &&
      seats.filter((seat) => seat.provider === 'anthropic').length === 1 &&
      seats.filter((seat) => seat.provider === 'openai').length === 2
    ) {
      return {
        term: 'three-seat AI panel, two vendors',
        label: 'three-seat AI panel, two vendors (Claude; GPT × 2)',
      };
    }
    throw new Error('round-one providers do not match a published panel');
  } catch (error) {
    // Never the historical label by default: a manifest this page cannot read
    // is not evidence of three vendors. The page says the seats are in the
    // run record, and the build says which claim, once.
    if (!missingPanels.has(claim.data.id)) {
      console.warn(`Panel label for claim ${claim.data.id}: ${String(error)}; the page names no vendors`);
      missingPanels.add(claim.data.id);
    }
    return unreadable;
  }
}

export function define(term: string): GlossaryEntry | undefined {
  return glossary[term] ?? glossary[term.toLowerCase()];
}

/** A glossary entry, or a build failure: a term the site uses must be defined. */
export function requireTerm(term: string): GlossaryEntry {
  const entry = define(term);
  if (!entry) throw new Error(`Glossary is missing "${term}" (src/lib/glossary.ts)`);
  return entry;
}
