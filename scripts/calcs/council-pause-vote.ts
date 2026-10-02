/**
 * Published figures for the council-pause-vote story (spec §5.5: every number
 * in the story or its claims traces here or directly to a source figure).
 *
 * The sources are City minutes and report files held as private archives, so CI
 * cannot read them. What lives here is a transcription of the cells the page
 * relies on, each with the registry id it comes from, and the arithmetic done on
 * them: the two reduction motions against the approved budget, the vote tallies
 * recounted from the named lists, and the route lists counted from Attachment 5.
 * People counts are read from the committed register.
 *
 * Run: reviews/council-pause-vote/2026-09-25. Claims 1 to 3 are synthesised;
 * claim 4, `same-seven-councillors-vote-together`, was parked for the run by its
 * vote gate and carries no figure here.
 */
import { loadYaml, repoPath } from '../lib/repo.ts';

// ---------------------------------------------------------------------------
// The approved budget (YF-EV-0204, item 12.9)
// ---------------------------------------------------------------------------

/**
 * Capital Budget Amendment 7 as re-stated and carried 9 to 4 in December 2022:
 * CM-20-0330 approved for $100,000,000 by year, funded by tax-supported debt.
 * No reviewer had the capital profile as it stood at either later motion, so
 * this is the base both motions are measured against; report IS03688
 * (YF-EV-0118) still gives $100 million in August 2026.
 */
export const approvedByYear = { 2023: 5_950_000, 2024: 26_750_000, 2025: 33_650_000, 2026: 33_650_000 } as const;
export const approvedTotal = Object.values(approvedByYear).reduce((sum, value) => sum + value, 0);

// ---------------------------------------------------------------------------
// The two reduction motions
// ---------------------------------------------------------------------------

/** The brief's band for "about $50 million", fixed before research. */
export const amountBand = { low: 45_000_000, high: 55_000_000 } as const;

type Motion = {
  /** Registry id of the minutes. */
  source: string;
  meeting: string;
  movedBy: string;
  secondedBy: string;
  /** The cut, by year, in the words of the motion as put to the vote. */
  cutByYear: Record<number, number>;
  /** Where the motion's text says the money goes, in its words. */
  destinationText: string;
  inFavour: string[];
  opposed: string[];
};

/**
 * Fall 2023 Supplemental Capital Budget Adjustment, Capital Budget Amendment 2,
 * as re-stated and put (YF-EV-0211, items 5.1.1 and 5.1.2). As first moved it
 * read "decreased by $50,000,000 to go towards the tax levy".
 */
export const motion2023: Motion = {
  source: 'YF-EV-0211',
  meeting: 'City Council budget meeting, November 2023',
  movedBy: 'K. Principe',
  secondedBy: 'J. Rice',
  cutByYear: { 2024: 16_350_000, 2025: 16_825_000, 2026: 16_825_000 },
  destinationText: 'with a funding reduction from tax-supported debt',
  inFavour: ['S. Hamilton', 'T. Cartmell', 'J. Rice', 'K. Principe'],
  opposed: ['A. Knack', 'A. Paquette', 'A. Sohi', 'A. Salvador', 'K. Tang', 'E. Rutherford', 'A. Stevenson', 'J. Wright'],
};

/**
 * Fall 2024 Supplemental Capital Budget Adjustment, Capital Budget Amendment 2
 * (YF-EV-0212, items 5.1.1 and 5.1.2). The minutes record K. Principe as mover
 * and J. Rice as seconder both when it was moved and when it was put; J. Rice
 * moved the adjustment motion it amended, not this amendment.
 */
export const motion2024: Motion = {
  source: 'YF-EV-0212',
  meeting: 'City Council budget meeting, December 2024',
  movedBy: 'K. Principe',
  secondedBy: 'J. Rice',
  cutByYear: { 2025: 33_650_000, 2026: 33_650_000 },
  destinationText: 'with funding from tax-supported debt, to defund planning, design and delivery',
  inFavour: ['T. Cartmell', 'J. Rice', 'E. Rutherford', 'K. Principe'],
  opposed: ['A. Knack', 'A. Sohi', 'A. Salvador', 'M. Janz', 'K. Tang', 'A. Stevenson', 'J. Wright'],
};

function assess(motion: Motion) {
  const cut = Object.values(motion.cutByYear).reduce((sum, value) => sum + value, 0);
  const left = approvedTotal - cut;
  return {
    cut,
    left,
    cutSharePct: Math.round((cut / approvedTotal) * 1000) / 10,
    inBand: left >= amountBand.low && left <= amountBand.high,
    atLeastHalf: cut * 2 >= approvedTotal,
    vote: `${motion.inFavour.length} to ${motion.opposed.length}`,
    jointlyBrought: [motion.movedBy, motion.secondedBy].sort().join(' and ') === 'J. Rice and K. Principe',
  };
}

export const motions = { 2023: assess(motion2023), 2024: assess(motion2024) } as const;

/** The base at which the 2024 cut would have left $45 to $55 million. */
export const base2024WouldNeed = {
  low: motions[2024].cut + amountBand.low,
  high: motions[2024].cut + amountBand.high,
} as const;

// ---------------------------------------------------------------------------
// Other recorded votes the page reports
// ---------------------------------------------------------------------------

/** YF-EV-0204 item 12.9: the $100 million approval. */
export const approvalVote2022 = {
  inFavour: ['A. Knack', 'A. Paquette', 'A. Sohi', 'A. Salvador', 'M. Janz', 'K. Tang', 'E. Rutherford', 'A. Stevenson', 'J. Wright'],
  opposed: ['S. Hamilton', 'T. Cartmell', 'J. Rice', 'K. Principe'],
} as const;

/** YF-EV-0213 item 10.13: the motion to stop construction not yet started, pending a review. */
export const suspensionVote2025 = {
  movedBy: 'T. Cartmell',
  secondedBy: 'K. Principe',
  inFavour: ['S. Hamilton', 'T. Cartmell', 'J. Rice', 'K. Principe'],
  opposed: ['A. Knack', 'A. Paquette', 'A. Sohi', 'A. Salvador', 'M. Janz', 'K. Tang', 'E. Rutherford', 'A. Stevenson', 'J. Wright'],
} as const;

/**
 * YF-EV-0209, item 7.6. The committee's six members, the mayor included under
 * the Council Committees Bylaw, and its two votes on substance. A. Knack and
 * A. Paquette are recorded on neither.
 */
export const committee = {
  members: ['E. Rutherford', 'A. Salvador', 'R. Clarke', 'M. Janz', 'A. Knack', 'A. Paquette'],
  continueMotion: { movedBy: 'A. Salvador', inFavour: ['A. Salvador', 'M. Janz'], opposed: ['E. Rutherford', 'R. Clarke'] },
  amendment: { movedBy: 'E. Rutherford', inFavour: ['E. Rutherford', 'R. Clarke'], opposed: ['A. Salvador', 'M. Janz'] },
} as const;

const notRecorded = (vote: { inFavour: readonly string[]; opposed: readonly string[] }) =>
  committee.members.filter((m) => !vote.inFavour.includes(m) && !vote.opposed.includes(m));

export const committeeVotes = {
  continueMotion: `${committee.continueMotion.inFavour.length} to ${committee.continueMotion.opposed.length}`,
  amendment: `${committee.amendment.inFavour.length} to ${committee.amendment.opposed.length}`,
  notRecordedOnContinue: notRecorded(committee.continueMotion),
  notRecordedOnAmendment: notRecorded(committee.amendment),
} as const;

// ---------------------------------------------------------------------------
// The route lists (YF-EV-0222, YF-EV-0223, YF-EV-0140) and their status (YF-EV-0226)
// ---------------------------------------------------------------------------

/** "Will continue as planned", identical in all three versions of Attachment 5. */
export const continuing = [
  '50 Street (109A Avenue to Goldbar Park Road)',
  '84 Avenue (Mill Creek Ravine to 91 Street)',
  '100 Street (76 Avenue to 80 Avenue)',
  '107 Avenue (East of Groat Road to 163 Street)',
  '110 Avenue/90 Street (92 Street to 112 Avenue) and 112 Avenue (90 Street to 76 Street)',
  '111 Avenue (120 Street to 121 Street)',
  '114 Avenue (81 Street to 89 Street)',
  '127 Avenue (97 Street to 102A Street)',
  '163 Street from 87 Avenue to 95 Avenue',
  '163 Street (Stony Plain Road to 107 Avenue)',
  '167 Street/169 Street (Whitemud Drive to 87 Avenue)',
  'Kingsway (113 Street to 122 Street)',
  'Victoria Park Road (116 Street to River Valley Road)',
] as const;

/**
 * The routes listed apart, identical in all three versions, with the status
 * the replacement Attachment 3 gives each as of August 10, 2026, and how many
 * street segments the entry joins.
 */
export const listedApart = [
  { route: '50 Street (101 Avenue to 109A Avenue)', status: 'no delivery plan', segments: 1 },
  { route: '64 Street (119 Avenue to Yellowhead Trail)', status: 'not viable in 2026', segments: 1 },
  { route: '79 Street (76 Avenue to 101 Avenue)', status: 'not viable in 2026', segments: 1 },
  { route: '84 Avenue (79 Street to 83 Street)', status: 'tendered, not started', segments: 1 },
  { route: '85 Street (93 Avenue to 98 Avenue)', status: 'not viable in 2026', segments: 1 },
  { route: '88 Avenue/93 Street/87 Avenue (85 Street to 96 Street)', status: 'not viable in 2026', segments: 1 },
  { route: '89 Street (76 Avenue to Connors Road)', status: 'not viable in 2026', segments: 1 },
  { route: '92A Avenue/86 Street/alley (Connors Road to 85 Street)', status: 'tendered, not started', segments: 1 },
  { route: '93 Street (82 Avenue to 84 Avenue) and 84 Avenue (91 Street to 89 Street)', status: 'tendered, not started', segments: 2 },
  {
    route: '93 Avenue/82 Street/94 Avenue (85 Street to 75 Street) and 75 Street (94 Avenue to 94B Avenue)',
    status: 'not viable in 2026',
    segments: 2,
  },
  { route: '95 Avenue (142 Street to 163 Street)', status: 'no delivery plan', segments: 1 },
  { route: '101 Avenue (50 Street to west of 84 Street)', status: 'no delivery plan', segments: 1 },
  { route: '106 Avenue (50 Street to west of 84 Street)', status: 'no delivery plan', segments: 1 },
  { route: 'Grovenor: 148 Street, 104 Avenue and 144 Street', status: 'no delivery plan', segments: 3 },
] as const;

const countStatus = (status: string) => listedApart.filter((r) => r.status === status).length;

export const routes = {
  continuing: continuing.length,
  listedApart: listedApart.length,
  listedApartSegments: listedApart.reduce((sum, r) => sum + r.segments, 0),
  tenderedNotStarted: countStatus('tendered, not started'),
  notViableIn2026: countStatus('not viable in 2026'),
  noDeliveryPlan: countStatus('no delivery plan'),
} as const;

// ---------------------------------------------------------------------------
// How many people made each claim (intake/register.yaml)
// ---------------------------------------------------------------------------

type RegisterClaim = { id: string; question: string; accounts?: number; variations?: { author_name?: string }[] };
type RegisterQuestion = { id: string; accounts?: { total: number } };
const register = loadYaml<{ claims: RegisterClaim[]; questions: RegisterQuestion[] }>(
  repoPath('intake', 'register.yaml'),
);
const underQuestion = register.claims.filter((claim) => claim.question === 'council-pause-vote');
const authors = (id: string) => new Set((underQuestion.find((c) => c.id === id)?.variations ?? []).map((v) => v.author_name));

export const people = {
  question: register.questions.find((q) => q.id === 'council-pause-vote')?.accounts?.total ?? 0,
  distinct: new Set(underQuestion.flatMap((claim) => (claim.variations ?? []).map((v) => v.author_name))).size,
  councilRejectedPause: authors('council-rejected-pause').size,
  administrationRecommended: authors('administration-recommended-freezing-14-routes').size,
  motions: authors('motions-to-cut-budget-to-50-million-failed').size,
  sameSeven: authors('same-seven-councillors-vote-together').size,
  /** Claims under the question whose wordings include Councillor Jennifer Rice's. */
  claimsWithTheCouncillor: underQuestion.filter((c) =>
    (c.variations ?? []).some((v) => v.author_name === 'Councillor Jennifer Rice'),
  ).length,
} as const;

export const figures = {
  approvedTotal,
  motions,
  base2024WouldNeed,
  committeeVotes,
  approvalVote2022: `${approvalVote2022.inFavour.length} to ${approvalVote2022.opposed.length}`,
  suspensionVote2025: `${suspensionVote2025.inFavour.length} to ${suspensionVote2025.opposed.length}`,
  routes,
  people,
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures }, null, 2));
}
