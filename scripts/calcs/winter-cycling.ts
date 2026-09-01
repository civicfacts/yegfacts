/**
 * Published figures for the winter-cycling story (spec §5.5: every number in
 * the story/claims traces here or directly to a source figure).
 *
 * Nothing is derived here. The story's evidence is a set of measurements on
 * incompatible denominators — all trips, journey-to-work, cyclists retained,
 * corridor counts — and the claim's own limitations say in as many words that
 * they cannot be aggregated or ranked against each other. So this module is a
 * transcription, not a calculation: its job is to be the single place the
 * figures live, so a chart and a `key_fact` cannot drift apart, and so a change
 * to one of them shows up as a failing test rather than as a quietly wrong bar.
 *
 * Source figures (verbatim from evidence; no silent conversions):
 */

/**
 * YF-EV-0029 — U.S. Census Bureau, "Modes Less Traveled", journey-to-work
 * bicycle commute share, 2008–2012 (per cent of workers). Annual commuting, not
 * winter trips.
 */
export const bicycleCommuteSharePct = {
  Minneapolis: 4.1,
  Phoenix: 0.7,
  Houston: 0.4,
  'San Antonio': 0.2,
  Dallas: 0.1,
} as const;

/**
 * YF-EV-0030 — peer-reviewed Québec study, winter cyclist retention for the
 * 2020–2021 season (per cent of cyclists who kept riding). Not a share of all
 * trips, and not comparable with the commute shares above.
 */
export const winterCyclistRetentionPct = {
  'Montréal': 13.6,
  Sherbrooke: 9.09,
  Gatineau: 6.96,
  Saguenay: 4.35,
} as const;

export const figures = {
  bicycleCommuteSharePct,
  winterCyclistRetentionPct,
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures }, null, 2));
}
