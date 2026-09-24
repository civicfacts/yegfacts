/**
 * Published arithmetic for the infrastructure-deficit story (spec §5.5: every
 * number in the story or its claims traces here or directly to a source
 * figure).
 *
 * Three claims, each read off City documents: a condition share printed in a
 * report, a funding source printed on a capital profile, and a shortfall
 * printed in two budget documents. Source cells are recorded verbatim in the
 * units their document uses and converted in one place. The brief's two sets
 * of cutoffs are applied here as functions, so the band each figure falls in
 * is computed rather than asserted in prose.
 *
 * Run: reviews/infrastructure-deficit/2026-09-03, synthesized on the round-1
 * basis on 2026-09-24. The CM-20-0330 amounts and the adopted budget total
 * are the cells `active-transportation.ts` already transcribes from the same
 * archived document, imported rather than retyped.
 */
import { figures as activeTransportation } from './active-transportation';

// ---------------------------------------------------------------------------
// Source figures (verbatim; no silent conversions)
// ---------------------------------------------------------------------------

export const figures = {
  /**
   * YF-EV-0200 — 2025 Infrastructure State and Condition Report, Appendix B
   * (page 37), the Roads class under Goods and People Movement. Asset data as
   * of December 31, 2024. Shares are of replacement value, in per cent, in the
   * report's four printed bands (A and B together, C, D and F together, not
   * rated). The nested rows are the three the report prints under Roads.
   */
  roads2025: {
    replacementValueDollars: 10_484_313_206,
    goodAB: 70.8,
    fairC: 16.2,
    poorDF: 11.2,
    notRated: 1.7,
    nested: {
      pavedRoads: { replacementValueDollars: 8_204_164_788, poorDF: 12.5, notRated: 0 },
      unpavedRoads: { replacementValueDollars: 182_805_696, poorDF: 0, notRated: 100 },
      curbs: { replacementValueDollars: 2_097_342_722, poorDF: 7.0, notRated: 0 },
    },
  },

  /** YF-EV-0200 — the same Appendix B row as the 2023 report printed it, with no Curbs row. */
  roads2023ReportPoorDF: 11.4,

  /**
   * YF-EV-0200 — the report's service view (page 21): "Roads Service Assets",
   * a wider grouping than the Appendix B class, with its poor (D and F) share.
   */
  roadsServiceAssets2025: { replacementValueDollars: 15_697_712_522, poorDF: 11.6 },

  /**
   * YF-EV-0202 — Council's arterial target as the 2019-2022 capital budget
   * states it: fewer than 10 per cent of arterial roads in D or F condition.
   */
  arterialTargetPoorDFBelowPct: 10,

  /**
   * YF-EV-0114 — adopted 2023-2026 Capital Budget, CM-20-0330 profile sheet
   * (page 541), "Approved Funding Sources" ($000s). One row only.
   */
  cm200330FundingSourcesThousands: {
    'Tax-Supported Debt': 100_000,
  } as Record<string, number>,

  /**
   * YF-EV-0114 — Table 6 (page 49), 2023 to 2026 ($000s): RIMS Ideal
   * Investment and Funded RIMS Ideal Investment. The page names their
   * difference the "renewal funding gap of $1.63 billion for 2023-2026".
   */
  rimsIdealInvestmentThousands: 3_575_584,
  fundedRimsIdealInvestmentThousands: 1_945_673,
  /** YF-EV-0114 — Table 5 (page 48): Total Renewal Investment Funded, 2023 to 2026 ($000s). */
  totalRenewalInvestmentFundedThousands: 2_194_927,

  /**
   * YF-EV-0201 — 2024 Financial Annual Report (page 53): "the renewal
   * investment shortfall in 2023-2026 is approximately $1.52 billion", and the
   * ten-year gap the June 2022 outlook identified for 2023-2032 ($ millions).
   */
  shortfall2023to2026LaterMillions: 1_520,
  tenYearGap2023to2032Millions: 4_800,

  /** The approved amount both claims 2 and 3 are about, in $ millions. */
  programMillions: 100,
} as const;

// ---------------------------------------------------------------------------
// The brief's cutoffs, applied
// ---------------------------------------------------------------------------

export type Band = 'Supported' | 'Partially supported' | 'Contradicted' | 'Not established';

/** Claim 1: p is the D and F share, in per cent. */
export function roadsBand(p: number, cut: 'primary' | 'alternative'): Band {
  const [supported, partial] = cut === 'primary' ? [25, 10] : [20, 7.5];
  if (p >= supported) return 'Supported';
  if (p >= partial) return 'Partially supported';
  return 'Contradicted';
}

/** Claim 2: E, X and U in $ millions, tested in the brief's order. */
export function eligibilityBand(e: number, u: number, cut: 'primary' | 'alternative'): Band {
  const line = cut === 'primary' ? 50 : 25;
  if (e >= line) return 'Supported';
  if (e > 0 && e + u < line) return 'Partially supported';
  if (e === 0 && u === 0) return 'Contradicted';
  return 'Not established';
}

/** Claim 3: r is the program over the shortfall. */
export function shortfallBand(r: number, cut: 'primary' | 'alternative'): Band {
  const [supported, partial] = cut === 'primary' ? [0.25, 0.05] : [0.15, 0.03];
  if (r >= supported) return 'Supported';
  if (r >= partial) return 'Partially supported';
  return 'Contradicted';
}

// ---------------------------------------------------------------------------
// Derived figures
// ---------------------------------------------------------------------------

const round = (value: number, places: number): number => {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
};

const roads = figures.roads2025;
const nested = Object.values(roads.nested);
const nestedValue = nested.reduce((sum, row) => sum + row.replacementValueDollars, 0);

const eligibleMillions =
  (figures.cm200330FundingSourcesThousands['Tax-Supported Debt'] ?? 0) / 1_000;
const fundingTotalMillions =
  Object.values(figures.cm200330FundingSourcesThousands).reduce((a, b) => a + b, 0) / 1_000;

const adoptedGapThousands =
  figures.rimsIdealInvestmentThousands - figures.fundedRimsIdealInvestmentThousands;
const adoptedGapMillions = adoptedGapThousands / 1_000;
const byYear = activeTransportation.cm200330ApprovedByYearThousands;

export const results = {
  // Claim 1 -----------------------------------------------------------------
  /** The three nested rows add up to the class's replacement value. */
  roadsNestedValueMatchesClass: nestedValue === roads.replacementValueDollars,
  /** The class's D and F share rebuilt from its nested rows, in per cent. */
  roadsPoorDFFromNestedPct: round(
    nested.reduce((sum, row) => sum + row.replacementValueDollars * row.poorDF, 0) / nestedValue,
    1,
  ),
  roadsBandPrimary: roadsBand(roads.poorDF, 'primary'),
  roadsBandAlternative: roadsBand(roads.poorDF, 'alternative'),
  /** How far p sits above the 10 per cent line, in percentage points. */
  roadsMarginOverPartialLinePts: round(roads.poorDF - 10, 1),
  /** p with the unrated share left out of the denominator, in per cent. */
  roadsPoorDFOfRatedPct: round((roads.poorDF / (100 - roads.notRated)) * 100, 1),
  /** Replacement value of the Roads class, $ billions. */
  roadsReplacementValueBillions: round(roads.replacementValueDollars / 1e9, 1),
  /** The service view's share lands in the same band. */
  roadsServiceAssetsBandPrimary: roadsBand(figures.roadsServiceAssets2025.poorDF, 'primary'),

  // Claim 2 -----------------------------------------------------------------
  cm200330ApprovedTotalMillions: (byYear[2023] + byYear[2024] + byYear[2025] + byYear[2026]) / 1_000,
  /** E, X, U in $ millions: every dollar's source is identified and general. */
  eligible: eligibleMillions,
  ineligible: 0,
  undetermined: round(figures.programMillions - fundingTotalMillions, 3),
  eligibilityBandPrimary: eligibilityBand(eligibleMillions, figures.programMillions - fundingTotalMillions, 'primary'),
  eligibilityBandAlternative: eligibilityBand(eligibleMillions, figures.programMillions - fundingTotalMillions, 'alternative'),
  /** The one seat that could not read the profile sheet had E = 0, U = 100. */
  eligibilityBandIfUnread: eligibilityBand(0, figures.programMillions, 'primary'),
  /** Current approved amount after the $430,000 moved out in June 2025, $ millions. */
  cm200330CurrentApprovedMillions: activeTransportation.cm200330CurrentApprovedThousands / 1_000,

  // Claim 3 -----------------------------------------------------------------
  /** The adopted budget's gap, rebuilt from Table 6, $ millions. */
  adoptedGapMillions,
  /** $100 million over the later $1.52 billion (the verdict-bearing S), and its band. */
  ratioLater: round(figures.programMillions / figures.shortfall2023to2026LaterMillions, 4),
  ratioLaterPct: round((figures.programMillions / figures.shortfall2023to2026LaterMillions) * 100, 1),
  ratioLaterBandPrimary: shortfallBand(figures.programMillions / figures.shortfall2023to2026LaterMillions, 'primary'),
  ratioLaterBandAlternative: shortfallBand(figures.programMillions / figures.shortfall2023to2026LaterMillions, 'alternative'),
  /** The same against the adopted budget's gap. */
  ratioAdopted: round(figures.programMillions / adoptedGapMillions, 4),
  ratioAdoptedPct: round((figures.programMillions / adoptedGapMillions) * 100, 1),
  ratioAdoptedBandPrimary: shortfallBand(figures.programMillions / adoptedGapMillions, 'primary'),
  ratioAdoptedBandAlternative: shortfallBand(figures.programMillions / adoptedGapMillions, 'alternative'),
  /** How many times the program goes into each shortfall. */
  laterShortfallMultiple: round(figures.shortfall2023to2026LaterMillions / figures.programMillions, 1),
  adoptedShortfallMultiple: round(adoptedGapMillions / figures.programMillions, 1),
  /** The shortfalls at which the primary finding would change, $ millions. */
  supportedIfShortfallAtMostMillions: figures.programMillions / 0.25,
  contradictedIfShortfallAboveMillions: figures.programMillions / 0.05,
  /** Share of the adopted budget's renewal requirement it funded, per cent. */
  adoptedRimsFundedPct: round(
    (figures.fundedRimsIdealInvestmentThousands / figures.rimsIdealInvestmentThousands) * 100,
    1,
  ),
  /** Unclassified: a ten-year gap is not the same four years. Per cent. */
  ratioTenYearGapPct: round((figures.programMillions / figures.tenYearGap2023to2032Millions) * 100, 1),
  /** The program's share of the adopted capital budget and of its funded renewal, per cent. */
  programShareOfAdoptedBudgetPct: round(
    (figures.programMillions / activeTransportation.adoptedCapitalBudget2023to2026Millions) * 100,
    2,
  ),
  programShareOfFundedRenewalPct: round(
    (figures.programMillions / (figures.totalRenewalInvestmentFundedThousands / 1_000)) * 100,
    2,
  ),
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures, results }, null, 2));
}
