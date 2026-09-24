/**
 * Published figures for the lanes-and-congestion story (spec §5.5: every number
 * in the story or its claim traces here or directly to a source figure).
 *
 * Two kinds of thing live here. Figures read out of committed files, which this
 * module recomputes every time it runs: the City's on-street bike route layer
 * as exported on 2026-09-23 (YF-EV-0166, committed unchanged beside the review
 * run, so CI can read the same bytes the registry hashes) and the intake
 * register. And a short transcription of what the page counts: the corridors it
 * reports as verified, with the district each lies in (YF-EV-0167, a private
 * archive) and which round-1 seats counted it.
 *
 * Run: reviews/lanes-and-congestion/2026-09-16. One claim is synthesised,
 * `city-removed-traffic-lanes`; three were parked at framing and carry no
 * figures beyond how many people made them.
 */
import { readFileSync } from 'node:fs';
import { loadYaml, repoPath, sha256File } from '../lib/repo.ts';

// ---------------------------------------------------------------------------
// The inventory snapshot (YF-EV-0166)
// ---------------------------------------------------------------------------

const SNAPSHOT = repoPath(
  'reviews',
  'lanes-and-congestion',
  '2026-09-16',
  'snapshot',
  'bike-routes-on-street.geojson',
);

/** The hash the frozen brief and the registry entry both record. */
export const snapshotSha256 = '51f5e628b42c5c4b9ba17664810b5da0b5544c05d95863abf0ee6821a32ece6f';

type Feature = {
  properties: Record<string, unknown>;
  geometry: { coordinates: unknown };
};

const actualSha256 = sha256File(SNAPSHOT);
if (actualSha256 !== snapshotSha256) {
  throw new Error(`snapshot hash ${actualSha256} is not the frozen ${snapshotSha256}`);
}
const features = (JSON.parse(readFileSync(SNAPSHOT, 'utf8')) as { features: Feature[] }).features;

export const snapshotFeatureCount = features.length;

/** Every attribute the layer carries, in the order the export lists them. */
export const snapshotFields = Object.keys(features[0]?.properties ?? {});

/**
 * Attributes whose name could record what a segment was used for before the
 * bike lane. The page says the layer has none; this is the check.
 */
export const priorUseFields = snapshotFields.filter((field) =>
  /prior|previous|former|before|existing|original|lane_use/i.test(field),
);

function latitudes(feature: Feature): number[] {
  const flat = (feature.geometry.coordinates as unknown[]).flat(3) as number[];
  return flat.filter((_, index) => index % 2 === 1);
}

function onStreet(name: string): Feature[] {
  return features.filter((feature) => feature.properties.STREET_NAME_FULL === name);
}

/**
 * 110 Street between 76 and 82 Avenue. The band is read off the layer itself:
 * its southern edge is the 76 Avenue route, and 82 Avenue, which carries no
 * route in the layer, is taken as halfway between the 81 and 83 Avenue routes.
 */
const avenueLatitude = (name: string) => Math.min(...onStreet(name).flatMap(latitudes));
const band110 = {
  south: avenueLatitude('76 AVENUE NW') - 0.0002,
  north: (avenueLatitude('81 AVENUE NW') + avenueLatitude('83 AVENUE NW')) / 2 + 0.0002,
};
const garneau110 = onStreet('110 STREET NW').filter((feature) => {
  const lats = latitudes(feature);
  return (
    String(feature.properties.classification).startsWith('Protected Bike Lanes') &&
    Math.min(...lats) >= band110.south &&
    Math.max(...lats) <= band110.north
  );
});

export const street110 = {
  protectedSegments: garneau110.length,
  constructionYears: [...new Set(garneau110.map((f) => f.properties.construction_year))].sort(),
} as const;

// ---------------------------------------------------------------------------
// What the page counts
// ---------------------------------------------------------------------------

/**
 * YF-EV-0167 — the City's district plans. The fifteen districts the page lists,
 * fourteen with a plan in effect and Rabbit Hill with its plan in draft, and
 * the neighbourhood assignments the page relies on (Oliver in Central, Garneau
 * and Strathcona in Scona, Delton in North Central).
 */
export const districts = [
  'Central',
  'Ellerslie',
  'Horse Hill',
  'Jasper Place',
  'Mill Woods and Meadows',
  'North Central',
  'Northeast',
  'Northwest',
  'Rabbit Hill',
  'Scona',
  'Southeast',
  'Southwest',
  'West Edmonton',
  'West Henday',
  'Whitemud',
] as const;

/**
 * The corridors the page reports as verified: each has a City record that a
 * driving lane or direction of traffic gave way to make room for the bike lane
 * (YF-EV-0163, YF-EV-0165, YF-EV-0170) and a City record that the bike lane was
 * built (YF-EV-0164, YF-EV-0166, YF-EV-0170). `round1Seats` is which seats
 * counted it as verified in round 1, the canonical basis; the page's own check
 * of the City record, not a seat's count, is what puts a corridor here.
 *
 * `record` says what kind of City record shows the lane went. For 110 Street
 * it is the final design, with the inventory showing the protected lane built;
 * no as-built drawing is in hand.
 *
 * Left out: 83 Avenue at 104 to 105 Street (GPT-6 Sol only; the April 2015 City
 * plan it cited returned page-not-found on 2026-09-24 and the 2017 project
 * sheet does not describe the lane change), and 132 Avenue, whose City records
 * describe fewer driving lanes and new bike facilities without saying which
 * former driving-lane space the bike facilities took.
 */
export const verifiedCorridors = [
  {
    street: '102 Avenue',
    segment: '121 Street to 111 Street',
    neighbourhood: 'Oliver',
    district: 'Central',
    laneRemoved: 'westbound travel lane',
    record: 'plan and post-construction guide',
    built: 2017,
    round1Seats: ['Claude Opus 5.5', 'GPT-6 Sol', 'GPT-6 Luna'],
  },
  {
    street: '110 Street',
    segment: '76 Avenue to 82 Avenue',
    neighbourhood: 'Garneau',
    district: 'Scona',
    laneRemoved: 'southbound travel lane',
    record: 'final design, with the protected lane built per the inventory',
    built: 2022,
    round1Seats: ['GPT-6 Sol'],
  },
  {
    street: '100 Street',
    segment: '80 Avenue to 83 Avenue',
    neighbourhood: 'Strathcona, Ritchie',
    district: 'Scona',
    laneRemoved: 'southbound traffic, street made one-way northbound',
    record: 'route table',
    built: 2025,
    round1Seats: ['Claude Opus 5.5'],
  },
  {
    street: '96 Street',
    segment: '119 Avenue to 124 Avenue',
    neighbourhood: 'Delton, Alberta Avenue',
    district: 'North Central',
    laneRemoved: 'northbound traffic, street made one-way southbound',
    record: 'route table',
    built: 2025,
    round1Seats: [],
  },
] as const;

export const verifiedDistricts = [...new Set(verifiedCorridors.map((c) => c.district))];

/** The brief's two judgement thresholds for "all throughout the city". */
export const districtThresholds = { primary: 8, alternative: 5 } as const;

// ---------------------------------------------------------------------------
// How many people made each claim (intake/register.yaml)
// ---------------------------------------------------------------------------

type RegisterClaim = { id: string; question: string; accounts?: number };
type RegisterQuestion = { id: string; accounts?: { total: number } };
const register = loadYaml<{ claims: RegisterClaim[]; questions: RegisterQuestion[] }>(
  repoPath('intake', 'register.yaml'),
);
const accountsFor = (id: string) => register.claims.find((claim) => claim.id === id)?.accounts ?? 0;

export const people = {
  question: register.questions.find((q) => q.id === 'lanes-and-congestion')?.accounts?.total ?? 0,
  laneRemovalIncreasesCongestion: accountsFor('lane-removal-increases-congestion'),
  bikeInfraReducesCongestion: accountsFor('bike-infra-reduces-congestion'),
  cityRemovedTrafficLanes: accountsFor('city-removed-traffic-lanes'),
  lanesRemovedForTrafficCalming: accountsFor('lanes-removed-for-traffic-calming'),
} as const;

export const figures = {
  snapshotFeatureCount,
  priorUseFields,
  street110,
  districtCount: districts.length,
  verifiedCorridors: verifiedCorridors.length,
  verifiedDistricts,
  districtThresholds,
  people,
} as const;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ figures }, null, 2));
}
