/**
 * Published arithmetic for the climate-targets story (spec §5.5: every number
 * in the story/claims traces here or directly to a source figure).
 *
 * The City publishes both the inputs and several of the results, so most of
 * what follows is a cross-check: the derived values are compared against the
 * City's own stated percentages in the tests. Only the gap in megatonnes and
 * the percentage over trajectory are numbers this site introduces.
 *
 * Source figures (verbatim from evidence; no silent conversions):
 */
export const figures = {
  /** YF-EV-0020 / YF-EV-0022 / YF-EV-0024 — 2024 community inventory (million tCO2e). */
  inventory2024Mt: 15.2,
  /** YF-EV-0020 / YF-EV-0022 — 2024 target-trajectory value, "or less" (million tCO2e). */
  trajectory2024Mt: 12.2,
  /** YF-EV-0020 — 2025 target value (million tCO2e). */
  target2025Mt: 10.8,
  /** YF-EV-0024 — recalculated 2005 community baseline (million tCO2e). */
  baseline2005Mt: 16.7,
  /** YF-EV-0021 — adopted 2025 milestone: per cent below 2005. */
  target2025ReductionPct: 35,
  /** YF-EV-0020 / YF-EV-0024 — City-reported reduction since 2005, 2024 inventory (per cent). */
  cityReportedReductionSince2005Pct: 9,
  /** YF-EV-0020 — City-reported one-year cut needed for the 2025 target (per cent). */
  cityReportedRequired2025CutPct: 29,
  /** YF-EV-0020 — corporate emissions quantified for 2023-2026 (tonnes CO2e). */
  corporateEmissions2023to2026T: 884_000,
  /** YF-EV-0020 — preliminary corporate target for 2023-2026 (tonnes CO2e). */
  corporateTarget2023to2026T: 816_000,
  /** YF-EV-0020 — City-stated corporate carbon deficit (tonnes CO2e). */
  cityReportedCorporateDeficitT: 68_000,
  /** YF-EV-0021 — community carbon budget, 2022-2050 (million tonnes CO2e). */
  communityCarbonBudgetMt: 176,
  /** YF-EV-0020 / YF-EV-0024 — forecast depletion year for that budget. */
  communityCarbonBudgetDepletionYear: 2036,
} as const;

const round1 = (x: number) => Math.round(x * 10) / 10;
const pct = (x: number) => Math.round(x * 100);

/** How far 2024 emissions ran over the trajectory: 15.2 − 12.2 (million tCO2e). */
export const gapAboveTrajectory2024Mt = round1(
  figures.inventory2024Mt - figures.trajectory2024Mt,
);

/** That gap as a share of the trajectory value: 3.0 / 12.2. */
export const pctAboveTrajectory2024 = pct(gapAboveTrajectory2024Mt / figures.trajectory2024Mt);

/** Reduction achieved 2005 → 2024: 1 − 15.2/16.7. Cross-checks the City's "9 per cent". */
export const reductionSince2005Pct = pct(1 - figures.inventory2024Mt / figures.baseline2005Mt);

/** One-year cut the 2025 target needs: 1 − 10.8/15.2. Cross-checks the City's "29 per cent". */
export const required2025CutFrom2024Pct = pct(1 - figures.target2025Mt / figures.inventory2024Mt);

/** 2025 target as a reduction from 2005: 1 − 10.8/16.7. Cross-checks the adopted 35 per cent. */
export const target2025ReductionFromBaselinePct = pct(
  1 - figures.target2025Mt / figures.baseline2005Mt,
);

/** Distance to the 2025 milestone, in percentage points: 35 − 9. */
export const reductionShortfallPoints =
  figures.target2025ReductionPct - reductionSince2005Pct;

/** Corporate overshoot 2023-2026: 884,000 − 816,000. Cross-checks the City's "68,000 tonnes". */
export const corporateDeficitT =
  figures.corporateEmissions2023to2026T - figures.corporateTarget2023to2026T;

export const results = {
  gapAboveTrajectory2024Mt,
  pctAboveTrajectory2024,
  reductionSince2005Pct,
  required2025CutFrom2024Pct,
  target2025ReductionFromBaselinePct,
  reductionShortfallPoints,
  corporateDeficitT,
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures, results }, null, 2));
}
