/**
 * Published arithmetic for the infill-prices story (spec §5.5: every number in
 * the story/claims traces here or directly to a source figure).
 *
 * A note on what this file is and is not. Both propositions in this story came
 * back Not established, so there is no verified population share to compute.
 * The price-gap claim, re-briefed as a magnitude proposition and re-run on
 * 2026-09-02, produced no population series at all: one seat ran a 40-permit
 * feasibility probe and reported its lots as cases. Those counts are
 * transcribed here so that the story and the claim cannot drift apart, and so
 * that the few figures the page derives are recomputed rather than retyped.
 *
 * Panel output is labelled as such. It is not an archived source figure: the
 * registry entries behind the rolls and the permits archive dataset pages and
 * carry none of these counts, and no row-level working file was published with
 * either run. Anything sourced here to a run is traceable to that run and to
 * nothing stronger.
 *
 * Runs: reviews/infill-prices/2026-09-02-magnitude (price gap, round 1, seat
 * Claude Fable 5.1) and reviews/infill-prices/2026-09-01-rerun2
 * (affordability, round 1, same seat).
 */

// ---------------------------------------------------------------------------
// Source figures (verbatim; no silent conversions)
// ---------------------------------------------------------------------------

export const figures = {
  /**
   * YF-EV-0101 - 2024 Redeveloping Area Infill Report: the net change in
   * single-detached houses in the redeveloping area, a net loss of 294. The
   * built and demolished counts are not carried by the archived report, and
   * the 286/387/101 figures the registry previously recorded for it were a
   * wrong-year attribution corrected at drafting (see the run's errata.md).
   */
  netSingleDetachedChange2024: -294,
  /** YF-EV-0101 — net new dwelling units in the redeveloping area in 2024. */
  netNewUnitsRedevelopingArea2024: 3_535,
  /** YF-EV-0101 — net new semi-detached units in the redeveloping area in 2024. */
  netNewSemiDetachedUnits2024: 221,

  /**
   * YF-EV-0048 — 2023 Redeveloping Area Infill Annual Report (reporting on
   * 2023, published 2024): demolitions by dwelling type, and the net new unit
   * count they sit against. The report gives the four counts; their total is
   * derived below rather than read off the page.
   */
  demolishedSingleDetached2023: 387,
  demolishedSemiDetachedUnits2023: 3,
  demolishedRowUnits2023: 3,
  demolishedApartmentDwellings2023: 131,
  netNewUnitsRedevelopingArea2023: 2_931,

  /**
   * Run output: the affordability run's own read of StatCan table
   * 11-10-0222-01, Alberta, water, fuel and electricity for the principal
   * accommodation, 2023 reference year (CAD/year), from
   * reviews/infill-prices/2026-09-01-rerun2/round1/claude.json. NOT carried by
   * YF-EV-0107: the archived table view holds the Canada geography only, so the
   * Alberta average is the seat's read of the table rather than a figure in the
   * archived bytes. A provincial average, not any dwelling's bill.
   */
  utilitiesAlbertaAnnualCAD: 4_532,
  /**
   * The declared City median total before-tax household income (CAD/year) used
   * as the affordability model's primary input. NOT REGISTERED: both Census
   * Profile URLs cited for it returned a "File not found" body under an HTTP
   * 200, so it was not ingested. See the run's fetch-report.md.
   */
  declaredMedianHouseholdIncomeCAD: 90_000,
  /** YF-EV-0106 / YF-EV-0110 — StatCan shelter-cost-to-income threshold. */
  shelterCostThreshold: 0.3,

  /**
   * The magnitude run's feasibility probe (2026-09-02, seat Claude Fable 5.1).
   * Forty January 2019 house demolition permits, not the ten-year frame, so
   * these are case counts and can produce no median and no share. The
   * replacement values behind the ratios come off the 2025 roll rather than
   * each replacement's first full roll after completion, which is a departure
   * the seat reported and another seat documented.
   */
  probePermits: 40,
  probeMatchedOn2018Roll: 35,
  probeMatchedOn2025Roll: 17,
  probeLots: 8,
  probeReplacementDwellings: 11,
  /** Approximate constant-dollar ratio range across all eleven probe dwellings. */
  probeRatioMin: 1.37,
  probeRatioMax: 3.94,
  /** The same range restricted to the five lots where one house replaced one house. */
  probeSingleReplacementRatioMin: 1.71,
  probeSingleReplacementRatioMax: 3.94,

  /**
   * YF-EV-0055 — independent August 2026 analysis of 2024 small-scale
   * residential permits joined to the 2024 and 2026 rolls. Its measure is net
   * assessed-value uplift, not this claim's ratio.
   */
  dawangPermits: 1_492,
  dawangLots: 1_242,
  dawangLotsWithBothValues: 1_182,

  /**
   * Run output (2026-09-02, seat Claude Fable 5.1): one seat's candidate
   * demolition frame, read out of the general building permit dataset's
   * job-description text. These are the seat's query results: neither count is
   * carried by YF-EV-0044 or its archived bytes. Candidate records, not the
   * brief's validated frame.
   */
  candidateDemolitionPermits: 5_672,
  candidateDemolitionPermitsWithLegal: 5_668,

  /** Run output — separately titled replacement dwellings at or above the threshold. */
  dwellingsOverThreshold: 2_968,
  /** Run output — separately titled replacement dwellings with a verified first full roll. */
  dwellingsClassified: 3_359,
  /** Run output — separately titled replacement dwellings without one. */
  dwellingsUnclassified: 225,
  /** Run output — median modelled monthly shelter cost, separately titled dwellings (CAD). */
  medianShelterCostCAD: 3_948,
  /** Run output — median of the mortgage principal-and-interest component (CAD/month). */
  medianPrincipalInterestCAD: 3_070,
  /** Run output — median of the property-tax component (CAD/month). */
  medianPropertyTaxCAD: 494,
} as const;

// ---------------------------------------------------------------------------
// Derived
// ---------------------------------------------------------------------------

const pct1 = (x: number) => Math.round(x * 1000) / 10;

/** The fixed monthly utility allowance: the Alberta annual average over twelve. */
export const utilityAllowanceMonthlyCAD =
  Math.round((figures.utilitiesAlbertaAnnualCAD / 12) * 100) / 100;

/** The 30 percent line for the declared household, per month. */
export const shelterCostLimitMonthlyCAD =
  (figures.declaredMedianHouseholdIncomeCAD / 12) * figures.shelterCostThreshold;

/**
 * Probe lots found on the 2018 roll that failed an exact legal-description
 * match on the 2025 roll. Three of them were recovered by address as
 * subdivided pairs; the rest were not run down, so this is a linkage risk and
 * not a measured bias.
 */
export const probeUnmatchedOn2025Roll =
  figures.probeMatchedOn2018Roll - figures.probeMatchedOn2025Roll;

/**
 * Total dwellings demolished in the redeveloping area in 2023: the four
 * type counts the report publishes, added up here rather than on the page.
 */
export const demolishedDwellings2023 =
  figures.demolishedSingleDetached2023 +
  figures.demolishedSemiDetachedUnits2023 +
  figures.demolishedRowUnits2023 +
  figures.demolishedApartmentDwellings2023;

/** Claim 2, classified share: 2,968 of 3,359 separately titled dwellings. */
export const affordabilityClassifiedSharePct = pct1(
  figures.dwellingsOverThreshold / figures.dwellingsClassified,
);

/** Claim 2, complete verdict denominator: classified dwellings plus unclassified. */
export const affordabilityDenominator = figures.dwellingsClassified + figures.dwellingsUnclassified;

/**
 * Claim 2 lower bound: every unclassified dwelling treated as below the 30
 * percent line. The numerator excludes all 225 of them. The run labels this
 * bound "225 unclassified treated as meeting the threshold"; the arithmetic is
 * the lower bound and the label is reversed, which one seat documented.
 */
export const affordabilityLowerBoundPct = pct1(
  figures.dwellingsOverThreshold / affordabilityDenominator,
);

/** Claim 2 upper bound: every unclassified dwelling treated as at or above the line. */
export const affordabilityUpperBoundPct = pct1(
  (figures.dwellingsOverThreshold + figures.dwellingsUnclassified) / affordabilityDenominator,
);

/**
 * Why the reported median shelter cost is not the sum of the reported medians.
 * Each component median is taken over its own distribution, so they do not add
 * to the median of the total: the components sum to $3,941.67 against a
 * reported median total of $3,948. The gap is reported, never reconciled away.
 */
export const medianComponentSumCAD =
  figures.medianPrincipalInterestCAD + figures.medianPropertyTaxCAD + utilityAllowanceMonthlyCAD;

export const calculations = {
  utilityAllowanceMonthlyCAD,
  shelterCostLimitMonthlyCAD,
  probeUnmatchedOn2025Roll,
  demolishedDwellings2023,
  affordabilityClassifiedSharePct,
  affordabilityDenominator,
  affordabilityLowerBoundPct,
  affordabilityUpperBoundPct,
  medianComponentSumCAD,
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures, calculations }, null, 2));
}
