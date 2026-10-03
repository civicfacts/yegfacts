/**
 * Published figures for the snow-clearing story (spec §5.5: every number in
 * the story or its claims traces here or directly to a source figure).
 *
 * The sources are City of Edmonton reports, attachments, agendas and minutes
 * (YF-EV-0287 to 0309), all private archives CI cannot read. What lives here is
 * a transcription of the three service packages the panel counted in its final
 * round, the dates each was first on a published agenda and first dealt with by
 * a body, the figures each package's own text states, and the arithmetic done
 * on them: the count under each reading the brief fixed, and the rung that
 * count gives. Nothing here is a City total unless its comment says so.
 *
 * Run: reviews/snow-clearing/2026-10-02. One claim is synthesised,
 * `two-snow-removal-proposals-need-more-money`; the other four were parked at
 * framing and carry no figure here.
 */

/** The day the claim was written; "already" is read from it. */
export const commentDate = '2026-08-27';

type Body = 'council' | 'committee';

type SnowPackage = {
  title: string;
  /** Where the package's text is, by DocumentId, and the registry entry. */
  documentId: number;
  evidence: string;
  /** The meeting and item whose published agenda first listed it. */
  firstListed: { body: Body; meeting: string; item: string };
  /**
   * The latest date the listing can have been published. For the Council
   * agenda of 2025-11-24 no record fixes the day, so the meeting date is used,
   * as the brief allows. For the committee agenda of 2026-08-31 it is the
   * Internet Archive capture of 2026-08-22 (YF-EV-0288).
   */
  onAgendaBy: string;
  /** The first meeting whose minutes record the item dealt with. */
  firstDealtWith: string;
  /**
   * Counted by every seat in round 2. Only the parking-ban package was a
   * judgement: one seat left it out in round 1, and another called it
   * borderline.
   */
  contested: boolean;
};

export const packages: readonly SnowPackage[] = [
  {
    title: 'Improved Accessibility - Active Pathway Snow Removal and Sidewalk Repair',
    documentId: 278877,
    evidence: 'YF-EV-0304',
    firstListed: { body: 'council', meeting: 'City Council 2025-11-24', item: '7.2' },
    onAgendaBy: '2025-11-24',
    firstDealtWith: '2025-11-25',
    contested: false,
  },
  {
    title: 'Parking Ban Enforcement Strategies and Resource Allocation',
    documentId: 278877,
    evidence: 'YF-EV-0304',
    firstListed: { body: 'council', meeting: 'City Council 2025-11-24', item: '7.2' },
    onAgendaBy: '2025-11-24',
    firstDealtWith: '2025-11-25',
    contested: true,
  },
  {
    title: 'Well Maintained City',
    documentId: 304812,
    evidence: 'YF-EV-0295',
    firstListed: { body: 'committee', meeting: 'Community and Public Services Committee 2026-08-31', item: '7.1' },
    onAgendaBy: '2026-08-22',
    firstDealtWith: '2026-08-31',
    contested: false,
  },
];

/**
 * The figures each package's own text states, in millions of dollars. The
 * active-pathway package gives its operating cost twice: as three components
 * in its description and as a 2026 total in its table. They are transcribed
 * as printed, not reconciled.
 */
export const statedCosts = {
  activePathway: {
    oneTimeCapital: 2.11,
    ongoing: { snowClearing: 1.6, enforcement: 1.64, sidewalkRepair: 4.59 },
    describedOngoingTotal: 7.83,
    table2026Total: 9.938,
    table2026Ftes: 35.2,
  },
  parkingBan: { ongoing: 0.1 },
  wellMaintainedCity: { ongoing: 23.6, oneTimeCapital: 11.5 },
  /** Attachment 10 to CO03513: 24 optional enhancements, each with its own estimate. */
  optionalEnhancements: 24,
  calciumChlorideUpgrade: { ongoing: 2.5, oneTime: 4.4 },
} as const;

/** CO03079 (August 2025, before the reference period): "The total budget for SNIC is $67 million/year". */
export const lastStatedSnowBudget = 67;

/** The Fall 2025 operating budget adjustment, approved at item 5.2.3 of the Council budget meeting of 2025-12-01. */
export const fallAdjustmentVote = { inFavour: 11, opposed: 2 };

type Rung = 'Supported' | 'Partially supported' | 'Contradicted';

/** The brief's ladder, read from C. U is zero under every reading. */
function rung(c: number, exactlyTwo = false): Rung {
  if (c === 0) return 'Contradicted';
  if (exactlyTwo) return c === 2 ? 'Supported' : 'Partially supported';
  return c >= 2 ? 'Supported' : 'Partially supported';
}

type Reading = { onlyCouncil?: boolean; considered?: boolean; withoutContested?: boolean };

function count({ onlyCouncil = false, considered = false, withoutContested = false }: Reading): number {
  return packages.filter(
    (p) =>
      (!onlyCouncil || p.firstListed.body === 'council') &&
      (!withoutContested || !p.contested) &&
      (considered ? p.firstDealtWith : p.onAgendaBy) <= commentDate,
  ).length;
}

function reading(r: Reading, exactlyTwo = false) {
  const c = count(r);
  return { count: c, rung: rung(c, exactlyTwo) };
}

export const figures = {
  /** Primary: on a published agenda of Council or a committee by the comment date. */
  primary: reading({}),
  primaryWithoutParkingBan: reading({ withoutContested: true }),
  /** Required alternative timing rule: dealt with by a body by the comment date. */
  considered: reading({ considered: true }),
  consideredWithoutParkingBan: reading({ considered: true, withoutContested: true }),
  /** Required alternative body: City Council alone. */
  councilOnly: reading({ onlyCouncil: true }),
  councilOnlyWithoutParkingBan: reading({ onlyCouncil: true, withoutContested: true }),
  /** Required alternative count rule: exactly two. */
  exactlyTwo: reading({}, true),
  /** Required alternative cost reading: no counted text states an approved budget and the increase against it. */
  strictCost: { count: 0, rung: rung(0) },
  /** Reviewer's calculation, as every seat flagged it: the described components against the table. */
  activePathwayDescribedSum: Number(
    Object.values(statedCosts.activePathway.ongoing)
      .reduce((total, value) => total + value, 0)
      .toFixed(2),
  ),
};

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(figures, null, 2));
}
