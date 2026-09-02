/**
 * Published arithmetic for the active-transportation story (spec §5.5: every
 * number in the story or its claims traces here or directly to a source
 * figure).
 *
 * Both claims are ratios of budget cells the City printed, so this module is
 * mostly transcription plus division. Source cells are recorded verbatim in
 * the units their document uses ($000s for Appendix A and the operating
 * program summaries, $ millions for Table 8) and converted in one place, so a
 * ratio on the page can never come from a retyped figure.
 *
 * Run: reviews/active-transportation/2026-09-02-rerun (round 1, all three
 * seats agreed on every cell below; the first run, 2026-09-02, halted on a
 * framing concern about which snow cell to use and is kept as the record).
 */

// ---------------------------------------------------------------------------
// Source figures (verbatim; no silent conversions)
// ---------------------------------------------------------------------------

export const figures = {
  /**
   * YF-EV-0114 — 2023-2026 Capital Budget, Appendix A ($000s): capital profile
   * CM-20-0330, Active Transportation Implementation Acceleration - Approach 3,
   * approved by year. Also on the profile sheet, YF-EV-0117.
   */
  cm200330ApprovedByYearThousands: {
    2023: 5_950,
    2024: 26_750,
    2025: 33_650,
    2026: 33_650,
  },

  /**
   * YF-EV-0115 — Approved 2019-2022 Operating Budget, Parks & Roads Services,
   * Program Summary, Snow and Ice Control, column "2022 Budget" ($000s). The
   * "Expenditure & Transfers" cell is the primary denominator the frozen brief
   * names; the net figure is context.
   */
  snow2022ExpenditureAndTransfersThousands: 64_466,
  snow2022NetOperatingRequirementThousands: 63_653,

  /**
   * Council's in-year additions to the 2022 Snow and Ice Control budget, all
   * one-time ($000s), as the panel found them in the minutes and adjustment
   * reports: 2022-03-14, a carry-forward of 2021 program surplus; 2022-04-19,
   * the Spring supplemental operating budget adjustment for the enhanced
   * snow-clearing pilot; 2022-07-04 (item 6.6, CO01277), an increase from the
   * Financial Stabilization Reserve. The frozen brief's Alternative A adds
   * every amendment in force on 2022-12-12 to the printed cell.
   */
  snow2022CouncilAdditionsThousands: {
    '2022-03-14': 2_300,
    '2022-04-19': 14_300,
    '2022-07-04': 4_700,
  },

  /**
   * The City's own year-end figures for the Snow and Ice Control program
   * ($000s): the adjusted expense budget and actual expense by year, from the
   * December 31 operating financial updates for 2022 (FCS01656 attachment),
   * 2023, 2024 and 2025. The 2022 adjusted budget does not equal the printed
   * cell plus the three additions above; the panel reported the gap and did
   * not resolve it. Actuals are context: the frozen brief compares budgets.
   */
  snowYearEndThousands: {
    2022: { adjustedBudget: 79_474, actual: 97_571 },
    2023: { adjustedBudget: 63_574, actual: 54_917 },
    2024: { adjustedBudget: 67_090, actual: 72_086 },
    2025: { adjustedBudget: 67_554, actual: 76_648 },
  },

  /**
   * YF-EV-0114 — 2023-2026 Capital Budget, Table 8, "Active Pathways and Roads
   * Service", 2023-2026 ($ millions): growth, renewal, total. The combined
   * service line the frozen brief requires as the alternative roads reading.
   */
  activePathwaysAndRoadsService2023to2026Millions: {
    growth: 622.8,
    renewal: 1_171.2,
    total: 1_794.0,
  },

  /**
   * YF-EV-0114 — Appendix A sums under the frozen brief's roads-only boundary
   * ($000s), as computed by all three seats from the profile sheets' Service
   * Category labels: the "Roads" profiles less the two pedestrian and parking
   * exclusions, the "Neighbourhood Renewal" profiles, and the three
   * vehicle-carrying bridge profiles whose sheets carry no label.
   */
  roadsLabelledProfilesThousands: 1_116_532,
  neighbourhoodRenewalProfilesThousands: 722_289,
  unlabelledVehicleBridgeProfilesThousands: 106_882,
  /** The six streetscape and pedestrian-realm profiles the widest reading adds. */
  widestReadingAdditionsThousands: 80_145,

  /**
   * YF-EV-0114 — Table 7 / Table 8 totals ($ millions): the whole adopted
   * 2023-2026 capital budget as summed in Appendix A, and the "Movement of
   * People and Goods" service group.
   */
  adoptedCapitalBudget2023to2026Millions: 7_192.54,
  movementOfPeopleAndGoods2023to2026Millions: 2_256.0,

  /**
   * Cumulative to-date actual expenditure on CM-20-0330 ($000s) as reported in
   * the City's capital financial updates: YF-EV-0119 (December 31, 2023),
   * YF-EV-0120 (December 31, 2024), FCS03234 attachment 2 (September 30, 2025)
   * and FCS03313 attachment 2 (December 31, 2025). The City reports
   * cumulatively; yearly spending is differenced below.
   */
  cm200330CumulativeActualsThousands: {
    '2023-12-31': 807,
    '2024-12-31': 10_496,
    '2025-09-30': 25_093,
    '2025-12-31': 39_984,
  },

  /**
   * Spring 2025 supplemental capital budget adjustment (council 2025-06-10):
   * $430,000 moved from CM-20-0330 to a neighbourhood renewal profile, leaving
   * the profile's current approved budget at 99,570 ($000s).
   */
  cm200330CurrentApprovedThousands: 99_570,

  /**
   * YF-EV-0133 — the City's 2023-2026 budget engagement fact sheet: "$60.9
   * million for snow clearing", printed without a year; the panel reconciled
   * it in cross-review to the 2023 approved total (a $56.9 million base plus
   * the December 2022 amendment).
   */
  snow2023FactSheetMillions: 60.9,

  /** The figure in both captured claims: the program total, in $ millions. */
  claimedProgramMillions: 100,
  /** The councillor's stated roads figure, in $ millions. */
  claimedRoadsMillions: 1_800,
} as const;

// ---------------------------------------------------------------------------
// Derived figures
// ---------------------------------------------------------------------------

const round = (value: number, places: number): number => {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
};

const thousandsToMillions = (thousands: number): number => thousands / 1_000;

const byYear = figures.cm200330ApprovedByYearThousands;
const approvedTotalThousands = byYear[2023] + byYear[2024] + byYear[2025] + byYear[2026];

const snowPrimaryMillions = thousandsToMillions(figures.snow2022ExpenditureAndTransfersThousands);
const additions = figures.snow2022CouncilAdditionsThousands;
const snowAmendedThousands =
  figures.snow2022ExpenditureAndTransfersThousands +
  additions['2022-03-14'] +
  additions['2022-04-19'] +
  additions['2022-07-04'];
const snowAmendedMillions = thousandsToMillions(snowAmendedThousands);
const snowJulyOnlyMillions = thousandsToMillions(
  figures.snow2022ExpenditureAndTransfersThousands + additions['2022-07-04'],
);
const snowYearEndAdjustedMillions = thousandsToMillions(figures.snowYearEndThousands[2022].adjustedBudget);
const snowNetMillions = thousandsToMillions(figures.snow2022NetOperatingRequirementThousands);

const roadsPrimaryThousands =
  figures.roadsLabelledProfilesThousands +
  figures.neighbourhoodRenewalProfilesThousands +
  figures.unlabelledVehicleBridgeProfilesThousands;

const cumulative = figures.cm200330CumulativeActualsThousands;

export const results = {
  /** The four approved years sum to the claimed $100 million exactly. */
  cm200330ApprovedTotalMillions: thousandsToMillions(approvedTotalThousands),

  /** Claim A, primary: $100M over the printed 2022 gross cell. */
  snowRatioPrimary: round(figures.claimedProgramMillions / snowPrimaryMillions, 3),
  /** Claim A, Alternative A: the cell plus every 2022 council addition in force on 2022-12-12. */
  snowAmended2022Millions: round(snowAmendedMillions, 3),
  snowRatioAmended2022: round(figures.claimedProgramMillions / snowAmendedMillions, 3),
  /** The same alternative counting only the July addition, as two seats first computed it. */
  snowRatioJulyAdditionOnly: round(figures.claimedProgramMillions / snowJulyOnlyMillions, 3),
  /** The City's own year-end adjusted 2022 expense budget as the denominator. */
  snowRatioYearEndAdjusted2022: round(figures.claimedProgramMillions / snowYearEndAdjustedMillions, 3),
  /** Context only: the net operating requirement instead of the gross cell. */
  snowRatioNet2022: round(figures.claimedProgramMillions / snowNetMillions, 3),
  /** Same year against same year: the program's 2023 allocation over the 2023 snow figure, in per cent. */
  snowLikeForLike2023Pct: round(
    (thousandsToMillions(byYear[2023]) / figures.snow2023FactSheetMillions) * 100,
    1,
  ),
  /** The program's 2023 to 2025 allocations over the adjusted snow budgets for the same years, in per cent. */
  snowLikeForLike2023to2025Pct: round(
    ((byYear[2023] + byYear[2024] + byYear[2025]) /
      (figures.snowYearEndThousands[2023].adjustedBudget +
        figures.snowYearEndThousands[2024].adjustedBudget +
        figures.snowYearEndThousands[2025].adjustedBudget)) *
      100,
    1,
  ),
  /** Allocated to 2023 to 2025 ($ millions), the figure spending is compared against. */
  cm200330Allocated2023to2025Millions: thousandsToMillions(byYear[2023] + byYear[2024] + byYear[2025]),

  /** Claim B, primary: the roads-only profile set, in $ millions, and its ratio. */
  roadsPrimaryMillions: round(thousandsToMillions(roadsPrimaryThousands), 3),
  roadsRatioPrimary: round(thousandsToMillions(roadsPrimaryThousands) / figures.claimedProgramMillions, 2),
  /** Claim B, required alternative: the combined service line and its ratio. */
  roadsRatioServiceLine: round(
    figures.activePathwaysAndRoadsService2023to2026Millions.total / figures.claimedProgramMillions,
    2,
  ),
  /** Narrowest reading: "Roads"-labelled profiles only. */
  roadsRatioNarrowest: round(
    thousandsToMillions(figures.roadsLabelledProfilesThousands) / figures.claimedProgramMillions,
    2,
  ),
  /** Widest reading: the primary set plus the streetscape and pedestrian-realm profiles. */
  roadsRatioWidest: round(
    thousandsToMillions(roadsPrimaryThousands + figures.widestReadingAdditionsThousands) /
      figures.claimedProgramMillions,
    2,
  ),
  /** The ratio the councillor's own two figures imply. */
  claimedRoadsRatio: figures.claimedRoadsMillions / figures.claimedProgramMillions,

  /** The program's share of the adopted capital budget and of its service group, in per cent. */
  programShareOfCapitalBudgetPct: round(
    (figures.claimedProgramMillions / figures.adoptedCapitalBudget2023to2026Millions) * 100,
    2,
  ),
  programShareOfMovementOfPeopleAndGoodsPct: round(
    (figures.claimedProgramMillions / figures.movementOfPeopleAndGoods2023to2026Millions) * 100,
    2,
  ),

  /** Yearly CM-20-0330 spending, differenced from the cumulative reports ($ millions). */
  cm200330ActualByYearMillions: {
    2023: thousandsToMillions(cumulative['2023-12-31']),
    2024: thousandsToMillions(cumulative['2024-12-31'] - cumulative['2023-12-31']),
    2025: thousandsToMillions(cumulative['2025-12-31'] - cumulative['2024-12-31']),
  },
  /** Spent to December 31, 2025, as a share of the current approved budget, in per cent. */
  cm200330SpentShareOfCurrentApprovedPct: round(
    (cumulative['2025-12-31'] / figures.cm200330CurrentApprovedThousands) * 100,
    1,
  ),
  /** The average of the three completed years' actual spending ($ millions). */
  cm200330AverageActualYearMillions: round(thousandsToMillions(cumulative['2025-12-31'] / 3), 2),
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures, results }, null, 2));
}
