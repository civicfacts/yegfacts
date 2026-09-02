/**
 * Published arithmetic for the infill-prices story (spec §5.5: every number in
 * the story/claims traces here or directly to a source figure).
 *
 * A note on what this file is and is not. The two propositions in this story
 * came back Not established, so there is no verified population share to
 * compute. What there is instead is one seat's own reconstruction, built from
 * the City's open assessment rolls because no published series matches a
 * demolished dwelling to what replaced it. Its counts are transcribed here so
 * that the story, the claims and any chart cannot drift apart, and so that the
 * shares quoted on the page are recomputed from the counts rather than retyped.
 *
 * The counts themselves are panel output, not archived source figures. The
 * evidence registry entries behind the rolls (YF-EV-0098, YF-EV-0099) archive
 * the open data portal pages and carry none of these shares, and no row-level
 * working file was published with the run. Anything sourced here to the run
 * path is traceable to the run and to nothing stronger.
 *
 * Run: reviews/infill-prices/2026-09-01-rerun2 (round 1, seat Claude Fable 5.1).
 */

// ---------------------------------------------------------------------------
// Source figures (verbatim; no silent conversions)
// ---------------------------------------------------------------------------

export const figures = {
  /** YF-EV-0101 — 2024 Redeveloping Area Infill Report: new single-detached houses built. */
  singleDetachedBuilt2024: 286,
  /** YF-EV-0101 — 2024 Redeveloping Area Infill Report: single-detached houses demolished. */
  singleDetachedDemolished2024: 387,
  /** YF-EV-0103 — Zoning Bylaw 20001 one-year review: dwelling units approved in 2024. */
  dwellingUnitsApproved2024: 16_511,

  /**
   * YF-EV-0107 — StatCan table 11-10-0222-01, Alberta, water, fuel and
   * electricity for the principal accommodation, 2023 reference year (CAD/year).
   * A provincial average, not any dwelling's bill.
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

  /** Run output — replacement dwelling units assessed above the demolished dwelling. */
  unitsHigher: 4_091,
  /** Run output — classified replacement dwelling units (the verdict numerator's base). */
  unitsClassified: 6_603,
  /**
   * Run output — replacement dwelling units that could not be verified as
   * complete. Reported fractionally by the run, which is itself one of the
   * documented departures: a self-contained dwelling unit cannot be fractional.
   */
  unitsUnclassified: 2_995.6,
  /** Run output — median replacement-to-demolished assessed-value ratio, constant July-2025 dollars. */
  medianValueRatio: 1.222,
  /** Run output — replacement dwelling units inside single-title multi-unit buildings. */
  unitsSingleTitle: 3_244,

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

/** YF-EV-0101 — net change in single-detached houses in the redeveloping area, 2024. */
export const netSingleDetachedChange2024 =
  figures.singleDetachedBuilt2024 - figures.singleDetachedDemolished2024;

/** The fixed monthly utility allowance: the Alberta annual average over twelve. */
export const utilityAllowanceMonthlyCAD =
  Math.round((figures.utilitiesAlbertaAnnualCAD / 12) * 100) / 100;

/** The 30 percent line for the declared household, per month. */
export const shelterCostLimitMonthlyCAD =
  (figures.declaredMedianHouseholdIncomeCAD / 12) * figures.shelterCostThreshold;

/** Claim 1, classified share: 4,091 of 6,603 replacement dwelling units. */
export const priceGapClassifiedSharePct = pct1(figures.unitsHigher / figures.unitsClassified);

/** Claim 1, complete verdict denominator: classified units plus unclassified. */
export const priceGapDenominator = figures.unitsClassified + figures.unitsUnclassified;

/** Claim 1 lower bound: every unclassified unit treated as not exceeding. */
export const priceGapLowerBoundPct = pct1(figures.unitsHigher / priceGapDenominator);

/** Claim 1 upper bound: every unclassified unit treated as exceeding. */
export const priceGapUpperBoundPct = pct1(
  (figures.unitsHigher + figures.unitsUnclassified) / priceGapDenominator,
);

/** Share of classified replacement units held inside single-title buildings. */
export const singleTitleShareOfUnitsPct = pct1(figures.unitsSingleTitle / figures.unitsClassified);

/** Claim 2, classified share: 2,968 of 3,359 separately titled dwellings. */
export const affordabilityClassifiedSharePct = pct1(
  figures.dwellingsOverThreshold / figures.dwellingsClassified,
);

/** Claim 2, complete verdict denominator: classified dwellings plus unclassified. */
export const affordabilityDenominator = figures.dwellingsClassified + figures.dwellingsUnclassified;

/** Claim 2 lower bound: every unclassified dwelling treated as meeting the threshold. */
export const affordabilityLowerBoundPct = pct1(
  figures.dwellingsOverThreshold / affordabilityDenominator,
);

/** Claim 2 upper bound: every unclassified dwelling treated as failing it. */
export const affordabilityUpperBoundPct = pct1(
  (figures.dwellingsOverThreshold + figures.dwellingsUnclassified) / affordabilityDenominator,
);

/**
 * Why the reported median shelter cost is not the sum of the reported medians.
 * Each component median is taken over its own distribution, so they do not add
 * to the median of the total. The gap is reported, never reconciled away.
 */
export const medianComponentSumCAD =
  figures.medianPrincipalInterestCAD + figures.medianPropertyTaxCAD + utilityAllowanceMonthlyCAD;

export const calculations = {
  netSingleDetachedChange2024,
  utilityAllowanceMonthlyCAD,
  shelterCostLimitMonthlyCAD,
  priceGapClassifiedSharePct,
  priceGapDenominator,
  priceGapLowerBoundPct,
  priceGapUpperBoundPct,
  singleTitleShareOfUnitsPct,
  affordabilityClassifiedSharePct,
  affordabilityDenominator,
  affordabilityLowerBoundPct,
  affordabilityUpperBoundPct,
  medianComponentSumCAD,
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures, calculations }, null, 2));
}
