/**
 * Published arithmetic for the electric-buses story (spec §5.5: every number
 * in the story/claims traces here or directly to a source figure).
 *
 * Source figures (verbatim from evidence; no silent conversions):
 */
export const figures = {
  /** YF-EV-0001 — City's Oct 2023 court filing: amount paid under the 60-bus contract. */
  purchasePriceUSD: 58_761_600,
  /** YF-EV-0002 / YF-EV-0003 — Feb 2024 proof of claim: "more than $82 million" (CAD). */
  claimAmountCADAtLeast: 82_000_000,
  /** YF-EV-0003 — contracted range, normal conditions (km). */
  contractRangeNormalKm: 328,
  /** YF-EV-0003 — contracted range, extreme cold (km). */
  contractRangeColdKm: 268,
  /** YF-EV-0003 — City-reported average winter range (km). */
  observedWinterAvgKm: 165,
  /** YF-EV-0003 — City-reported best warm-weather range (km). */
  observedWarmBestKm: 250,
  /** YF-EV-0012 — publicly announced range at 2020 launch (km). */
  announcedRangeKm: 350,
  /** YF-EV-0001 — itemized actual costs claimed as of Oct 2023 (CAD). */
  itemizedCostsCAD: 1_352_655.58,
  /** YF-EV-0010 — 2018 announced joint funding for the original project (CAD, "more than"). */
  announcedFundingCADAtLeast: 43_000_000,
  /** YF-EV-0006 — TTC-measured Proterra fleet availability, April 2022 (percent). */
  ttcProterraAvailabilityPct: 95,
  fleetSize: 60,
} as const;

const pct = (x: number) => Math.round(x * 100);

/** Winter shortfall vs the extreme-cold contractual guarantee: 1 − 165/268. */
export const winterShortfallVsColdGuaranteePct = pct(
  1 - figures.observedWinterAvgKm / figures.contractRangeColdKm,
);

/** Winter shortfall vs the normal-conditions contract range: 1 − 165/328. */
export const winterShortfallVsNormalContractPct = pct(
  1 - figures.observedWinterAvgKm / figures.contractRangeNormalKm,
);

/** Best warm-weather shortfall vs the publicly announced 350 km: 1 − 250/350. */
export const warmShortfallVsAnnouncedPct = pct(
  1 - figures.observedWarmBestKm / figures.announcedRangeKm,
);

/** Winter range as a share of the extreme-cold guarantee: 165/268. */
export const winterRangeVsColdGuaranteePct = pct(
  figures.observedWinterAvgKm / figures.contractRangeColdKm,
);

export const results = {
  winterShortfallVsColdGuaranteePct,
  winterShortfallVsNormalContractPct,
  warmShortfallVsAnnouncedPct,
  winterRangeVsColdGuaranteePct,
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures, results }, null, 2));
}
