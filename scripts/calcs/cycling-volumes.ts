/**
 * Published arithmetic for the cycling-volumes story (spec §5.5: every number
 * in the story or its claims traces here or directly to a source figure).
 *
 * Almost every figure on this page is read out of an open dataset rather than
 * off a printed page, so this module carries two kinds of thing: the source
 * cells as the archived bytes give them, and the small number of derivations
 * the page states. Nothing here fetches anything. The archived bytes sit under
 * `evidence/private/`, which is gitignored, so the transcription is the
 * repository's copy of what the panel and the publication gate both read.
 *
 * Run: reviews/cycling-volumes/2026-09-03. Seven claims publish; the eighth,
 * `riders-are-recreational-not-commuters`, is parked and has no figures here.
 *
 * Reproduced against the archived bytes by the publication gate on 2026-09-04
 * (`reviews/cycling-volumes/2026-09-03/gate/source-verification.md`), which
 * states the file and the command behind each block below.
 */

// ---------------------------------------------------------------------------
// Source figures (verbatim; no silent conversions)
// ---------------------------------------------------------------------------

/**
 * YF-EV-0141 — dataset tq23-qn4m aggregated to whole months: the sum of
 * `total_cyclist_count` across every counter the City publishes. Passages past
 * a fixed point, not people and not journeys.
 */
export const networkMonthlyBicycleCounts: Readonly<Record<string, number>> = {
  '2024-01': 64_428,
  '2024-02': 77_793,
  '2024-03': 87_767,
  '2024-04': 227_206,
  '2024-05': 292_507,
  '2024-06': 369_841,
  '2024-07': 427_990,
  '2024-08': 425_233,
  '2024-09': 387_675,
  '2024-10': 248_227,
  '2024-11': 110_844,
  '2024-12': 52_772,
  '2025-01': 60_847,
  '2025-02': 43_241,
  '2025-03': 83_306,
  '2025-04': 221_195,
  '2025-05': 384_796,
  '2025-06': 381_501,
  '2025-07': 436_863,
  '2025-08': 419_209,
  '2025-09': 419_076,
  '2025-10': 249_824,
  '2025-11': 121_616,
  '2025-12': 35_157,
  '2026-01': 45_386,
  '2026-02': 47_289,
  '2026-03': 77_585,
  '2026-04': 115_435,
  '2026-05': 340_064,
  '2026-06': 282_395,
  '2026-07': 383_560,
  '2026-08': 388_792,
} as const;

/** The figure the thread was arguing over, as the commenter and CBC gave it. */
export const claimedCounterTotal2026 = 1_300_000;

/**
 * YF-EV-0142 and YF-EV-0143 — the verdict set for claim 2: the counters the
 * brief's five membership tests leave standing. July 2025 median daily bicycle
 * count for each, and the January 2025 median where the counter published that
 * month. `januaryDays` is how many of January's 31 days it published, and is
 * here because one counter's January median rests on 21 of them.
 */
export const verdictSetJuly2025 = [
  { counter: '96 Street S of Jasper Ave', july: 46, january: 9, januaryDays: 31 },
  { counter: '132 Ave E of 108 St N', july: 71, january: null, januaryDays: 0 },
  { counter: '106 Street S of 104 Avenue', july: 79, january: 22, januaryDays: 31 },
  { counter: '132 Ave E of 108 St S', july: 79, january: null, januaryDays: 0 },
  { counter: '76 Avenue W of 106 Street EB', july: 111, january: 9, januaryDays: 31 },
  { counter: '76 Avenue W of 106 Street WB', july: 111, january: 14, januaryDays: 31 },
  { counter: '103A Avenue W of 96 Street', july: 136, january: 34, januaryDays: 31 },
  { counter: '119 Ave E 91 Street evo', july: 152, january: 6, januaryDays: 21 },
  { counter: '103 Street N of 102 Avenue', july: 170, january: null, januaryDays: 0 },
  { counter: '103 Street N of 100 Avenue', july: 193, january: 29, januaryDays: 31 },
  { counter: '106 Street N of 76 Avenue NB', july: 252, january: 27, januaryDays: 31 },
  { counter: '106 Street N of 76 Avenue SB', july: 257, january: 25, januaryDays: 31 },
  { counter: '127 Street N of 107 Avenue', july: 267, january: 19, januaryDays: 31 },
  { counter: '102A Avenue W of 96 Street', july: 281, january: 69, januaryDays: 31 },
  { counter: '100 Avenue E of 107 Street', july: 486, january: 79, januaryDays: 31 },
  { counter: '102 Avenue E of 105 Street', july: 728, january: 184, januaryDays: 31 },
  { counter: '83 Avenue W 106 Street', july: 787, january: 170, januaryDays: 31 },
  { counter: '110 Street N of 86 Avenue', july: 845, january: 197, januaryDays: 31 },
  { counter: '102 Avenue E of 121 Street', july: 957, january: 212, januaryDays: 31 },
  { counter: '83 Avenue W of 99 Street', july: 979, january: 177, januaryDays: 31 },
] as const;

/**
 * The brief's five membership tests, as the counts they returned. Test 1 runs
 * over distinct `counter_location_description` values, and one description
 * carries two `counter_configuration` rows, so the universe is a set of
 * descriptions rather than of rows.
 */
export const membershipChain = {
  cyclistNamingCounters: 51,
  inServiceOn20250701: 42,
  onStreet: 21,
  offStreet: 21,
  unclassifiable: 0,
  outOfService: 1,
  underReported: 0,
  verdictSet: 20,
  corridors: 13,
} as const;

/**
 * YF-EV-0143 and YF-EV-0142 — the counter test 4 removed, with the date of its
 * last record and its last stable level, which the brief requires be named.
 */
export const outOfServiceCounter = {
  counter: '106 Street N of Jasper Avenue',
  counterAsWritten: '106 Street north of Jasper Avenue',
  lastRecord: '2025-07-16',
  lastFullMonth: 'June 2025',
  lastFullMonthMedian: 177.5,
} as const;

/**
 * YF-EV-0142 — the Hermitage counter, reported because residents named the
 * corridor and its only cyclist-configured counter is off-street.
 */
export const hermitageNorthJuly2025Median = 148;

/** The two cutoffs the brief fixed for "little or no", both required. */
export const littleOrNoCutoffs = { primary: 25, alternative: 50 } as const;

/**
 * YF-EV-0155 — Statistics Canada table 98-10-0479-01, City of Edmonton census
 * subdivision, 2021, main mode of commuting, total place of work status. The
 * four top-level rows sum to the published total; the sub-rows do not, because
 * census counts are randomly rounded before release.
 */
export const commuting2021City = {
  total: 380_315,
  carTruckVan: 323_705,
  carAsDriver: 298_320,
  carAsPassenger: 25_380,
  sustainableTransportation: 47_640,
  publicTransit: 30_860,
  activeTransportation: 16_785,
  walked: 13_430,
  bicycle: 3_355,
  motorcycleScooterMoped: 335,
  otherMethod: 8_635,
} as const;

/** YF-EV-0156 — the same table for the Edmonton census metropolitan area. */
export const commuting2021Cma = {
  total: 537_645,
  carTruckVan: 469_900,
  bicycle: 3_905,
} as const;

/**
 * YF-EV-0157 — table 98-10-0467-01, place of work status for the employed
 * labour force, City of Edmonton, 2021. The commuting universe above is the
 * no-fixed-workplace and usual-place-of-work rows together.
 */
export const placeOfWork2021City = {
  total: 483_855,
  workedAtHome: 102_210,
  workedOutsideCanada: 1_335,
  noFixedWorkplace: 73_790,
  usualPlaceOfWork: 306_525,
} as const;

/** YF-EV-0158 — 2016 Census Profile, Edmonton city, the same two variables. */
export const census2016City = {
  commutingTotal: 466_230,
  carAsDriver: 342_145,
  carAsPassenger: 25_080,
  publicTransit: 67_990,
  walked: 19_025,
  bicycle: 5_575,
  otherMethod: 6_405,
  employedTotal: 490_665,
  workedAtHome: 23_160,
} as const;

/**
 * YF-EV-0152 — 2015 Edmonton and Region Household Travel Survey Summary Report
 * (April 2018). Daily weekday trips by mode, and the mode shares the report
 * prints at one decimal place.
 */
export const householdTravelSurvey2015 = {
  fieldworkFrom: '2015-09-14',
  fieldworkTo: '2015-12-11',
  households: 21_000,
  cityHouseholds: 15_300,
  regionHouseholds: 5_700,
  cityTotalTrips: 3_139_100,
  cityBicycleTrips: 54_800,
  regionTotalTrips: 1_331_800,
  regionBicycleTrips: 10_600,
  publishedCityBicycleSharePct: 1.7,
  publishedRegionBicycleSharePct: 0.8,
} as const;

/**
 * YF-EV-0149 — Bike Ridership, Edmonton Insight Community, August 2014. An
 * opt-in panel: it is reported under its own name and carries no finding.
 */
export const insightCommunity2014 = {
  invitations: 1_029,
  panelCompletions: 646,
  anonymousLinkCompletions: 170,
  respondents: 816,
  springSummerFall: {
    'Never ride a bike': 327,
    'Once a month': 131,
    '2 to 3 times a week': 113,
    'Once a week': 103,
    '4 or more times a week': 81,
    Daily: 61,
  },
  winter: {
    'Never ride a bike': 715,
    'Once a month': 43,
    'Once a week': 23,
    '2 to 3 times a week': 14,
    '4 or more times a week': 13,
    Daily: 8,
  },
} as const;

/**
 * YF-EV-0159 — City of Edmonton 2012 municipal census, population by mode of
 * transportation, summed over all 375 neighbourhood rows.
 */
export const municipalCensus2012 = {
  carAsDriver: 289_748,
  carAsPassenger: 14_821,
  transit: 52_812,
  walk: 13_493,
  bicycle: 2_568,
  other: 7_198,
  noResponse: 3_134,
} as const;

/** YF-EV-0150 — the complete list of Statistics Canada's released data tables. */
export const statCanReleasedTables = 8_269;

// ---------------------------------------------------------------------------
// Derived figures (every one of these appears on the page)
// ---------------------------------------------------------------------------

const monthsIn = (year: number, from: number, to: number): number[] =>
  Object.entries(networkMonthlyBicycleCounts)
    .filter(([month]) => {
      const [y, m] = month.split('-').map(Number);
      return y === year && m >= from && m <= to;
    })
    .map(([, count]) => count);

const sum = (xs: readonly number[]): number => xs.reduce((a, b) => a + b, 0);

/** January to July, the window the claim fixes, for 2026 and the two years before it. */
export const januaryToJulyTotals = {
  2024: sum(monthsIn(2024, 1, 7)),
  2025: sum(monthsIn(2025, 1, 7)),
  2026: sum(monthsIn(2026, 1, 7)),
} as const;

/** How far the recorded total sits below the figure in circulation, in per cent. */
export const counterTotalShortfallPct =
  ((claimedCounterTotal2026 - januaryToJulyTotals[2026]) / claimedCounterTotal2026) * 100;

/** The 2026 window against the same window in 2025, in per cent. */
export const counterTotalFallFrom2025Pct =
  ((januaryToJulyTotals[2025] - januaryToJulyTotals[2026]) / januaryToJulyTotals[2025]) * 100;

/** Calendar 2025, and the share of it recorded in December, January and February. */
export const calendarYear2025Total = sum(monthsIn(2025, 1, 12));
export const winter2025Total =
  networkMonthlyBicycleCounts['2025-12'] +
  networkMonthlyBicycleCounts['2025-01'] +
  networkMonthlyBicycleCounts['2025-02'];
export const winter2025SharePct = (winter2025Total / calendarYear2025Total) * 100;

/** The July 2025 range across the verdict set, and how it meets the two cutoffs. */
export const july2025MedianRange = {
  lowest: Math.min(...verdictSetJuly2025.map((c) => c.july)),
  highest: Math.max(...verdictSetJuly2025.map((c) => c.july)),
} as const;
export const belowPrimaryCutoff = verdictSetJuly2025.filter(
  (c) => c.july < littleOrNoCutoffs.primary,
).length;
export const belowAlternativeCutoff = verdictSetJuly2025.filter(
  (c) => c.july < littleOrNoCutoffs.alternative,
).length;

/** The counters with a January 2025 median, and the range across them. */
const withJanuary = verdictSetJuly2025.filter(
  (c): c is (typeof verdictSetJuly2025)[number] & { january: number } => c.january !== null,
);
export const januaryReporting = {
  counters: withJanuary.length,
  lowest: Math.min(...withJanuary.map((c) => c.january)),
  highest: Math.max(...withJanuary.map((c) => c.january)),
} as const;

const pct = (numerator: number, denominator: number): number => (numerator / denominator) * 100;

/** The commuting shares, city and region, 2021 and 2016. */
export const commutingShares = {
  bicycle2021CityPct: pct(commuting2021City.bicycle, commuting2021City.total),
  bicycle2021CmaPct: pct(commuting2021Cma.bicycle, commuting2021Cma.total),
  bicycle2016CityPct: pct(census2016City.bicycle, census2016City.commutingTotal),
  car2021CityPct: pct(commuting2021City.carTruckVan, commuting2021City.total),
  car2021CmaPct: pct(commuting2021Cma.carTruckVan, commuting2021Cma.total),
  car2016CityPct: pct(
    census2016City.carAsDriver + census2016City.carAsPassenger,
    census2016City.commutingTotal,
  ),
  driverOnly2021CityPct: pct(commuting2021City.carAsDriver, commuting2021City.total),
  transit2021CityPct: pct(commuting2021City.publicTransit, commuting2021City.total),
  transit2016CityPct: pct(census2016City.publicTransit, census2016City.commutingTotal),
} as const;

/**
 * The same two shares over the wider denominator that puts the people who
 * worked at home back in. The brief requires both, and neither moves a finding.
 */
export const employedDenominatorShares = {
  workedAtHome2021Pct: pct(placeOfWork2021City.workedAtHome, placeOfWork2021City.total),
  workedAtHome2016Pct: pct(census2016City.workedAtHome, census2016City.employedTotal),
  car2021Pct: pct(commuting2021City.carTruckVan, placeOfWork2021City.total),
  bicycle2021Pct: pct(commuting2021City.bicycle, placeOfWork2021City.total),
} as const;

/**
 * The mode rows the page lists, added to the car row. They come to five more
 * than the published total, because each row is rounded on its own.
 */
export const commuting2021RowSum =
  commuting2021City.carTruckVan +
  commuting2021City.publicTransit +
  commuting2021City.walked +
  commuting2021City.bicycle +
  commuting2021City.motorcycleScooterMoped +
  commuting2021City.otherMethod;

/** The 2015 trip shares, at more precision than the report prints them. */
export const tripShares2015 = {
  cityBicyclePct: pct(
    householdTravelSurvey2015.cityBicycleTrips,
    householdTravelSurvey2015.cityTotalTrips,
  ),
  regionBicyclePct: pct(
    householdTravelSurvey2015.regionBicycleTrips,
    householdTravelSurvey2015.regionTotalTrips,
  ),
} as const;

/** The 2014 panel's answers. Reported under its own name; it carries no finding. */
const panelTotal = insightCommunity2014.respondents;
export const insightCommunity2014Shares = {
  rodeAtSomeFrequency: panelTotal - insightCommunity2014.springSummerFall['Never ride a bike'],
  rodeAtSomeFrequencyPct: pct(
    panelTotal - insightCommunity2014.springSummerFall['Never ride a bike'],
    panelTotal,
  ),
  winterAtSomeFrequency: panelTotal - insightCommunity2014.winter['Never ride a bike'],
  winterAtSomeFrequencyPct: pct(
    panelTotal - insightCommunity2014.winter['Never ride a bike'],
    panelTotal,
  ),
  winterStrictReading:
    insightCommunity2014.winter.Daily + insightCommunity2014.winter['4 or more times a week'],
  neverRidesInWinterPct: pct(insightCommunity2014.winter['Never ride a bike'], panelTotal),
} as const;

/** The 2012 municipal census bicycle share, over everyone who gave a mode. */
export const municipalCensus2012Answered =
  municipalCensus2012.carAsDriver +
  municipalCensus2012.carAsPassenger +
  municipalCensus2012.transit +
  municipalCensus2012.walk +
  municipalCensus2012.bicycle +
  municipalCensus2012.other;
export const municipalCensus2012BicyclePct = pct(
  municipalCensus2012.bicycle,
  municipalCensus2012Answered,
);

export const figures = {
  networkMonthlyBicycleCounts,
  januaryToJulyTotals,
  counterTotalShortfallPct,
  counterTotalFallFrom2025Pct,
  calendarYear2025Total,
  winter2025Total,
  winter2025SharePct,
  verdictSetJuly2025,
  membershipChain,
  outOfServiceCounter,
  hermitageNorthJuly2025Median,
  july2025MedianRange,
  belowPrimaryCutoff,
  belowAlternativeCutoff,
  januaryReporting,
  commutingShares,
  employedDenominatorShares,
  commuting2021RowSum,
  tripShares2015,
  insightCommunity2014Shares,
  municipalCensus2012BicyclePct,
  statCanReleasedTables,
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures }, null, 2));
}
