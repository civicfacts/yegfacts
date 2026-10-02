/**
 * Published figures for the council-hearing story (spec §5.5: every number in
 * the story or its claims traces here or directly to a source figure).
 *
 * The sources are the Infrastructure Committee's post-meeting minutes of
 * 2026-08-26 (YF-EV-0209) and the Council Procedures Bylaw (YF-EV-0251), both
 * private archives CI cannot read. What lives here is a transcription of the
 * lists and votes the page relies on, as entries per panel or per item, and the
 * arithmetic done on them: the three counts the brief fixed (N, N-all and
 * N-spoke), each against the two magnitude bands, and the special-resolution
 * threshold. Names of members of the public are withheld in the carried text,
 * so every count is a count of entries, never of distinct people.
 *
 * Run: reviews/council-hearing/2026-10-02. One claim is synthesised,
 * `speaking-time-cut-to-three-minutes`; the other two were parked at framing
 * and carry no figure here.
 */

/** Section 38(1) of Bylaw 18155, consolidated 2025-10-29: minutes per approved speaker. */
export const standingLimitMinutes = 5;

/** The item 1.4 motion moved by M. Janz: minutes per approved speaker at the meeting. */
export const meetingLimitMinutes = 3;

/** The item 1.4 time-limit motion, as recorded. */
export const timeLimitVote = {
  movedBy: 'M. Janz',
  inFavour: ['E. Rutherford', 'A. Salvador', 'R. Clarke', 'M. Janz', 'A. Knack', 'A. Paquette'],
  opposed: [] as string[],
};

/** Committee members listed as present in the minutes' header (YF-EV-0209). */
export const membersPresent = 6;

/**
 * Item 2.3 Requests to Speak, item 7.6: entries per panel, and the organization
 * each entry gave, as the minutes print it. Entries with no organization are
 * only counted.
 */
export const approvedPanels = [
  { panel: 1, entries: 15, groups: ['Edmonton Bike Coalition', 'YEG Bike Coalition'] },
  {
    panel: 2,
    entries: 15,
    groups: [
      'Bike Bus Alberta',
      'Holyrood Voice',
      'Holyrood Community 79 St Action Group',
      'YEG Bike Coalition',
      'Paths for People',
      'Ward Métis Bikes',
      'Ward Métis Bikes',
      'Ward Métis Bikes',
    ],
  },
  { panel: 3, entries: 15, groups: ["Let's Bike There YEG", 'Bike Edmonton', 'YEG Bike Coalition'] },
  { panel: 4, entries: 15, groups: ['Paths for People', 'YEG Bike Coalition'] },
  { panel: 5, entries: 4, groups: [] },
] as const;

/**
 * Approved entries on the other three items of the meeting: item 2.3 plus the
 * one additional speaker approved on item 7.4 by a later motion (4 to 0).
 */
export const approvedOtherItems = { '7.1': 5, '7.3': 1, '7.4': 8 + 1 } as const;

/** Item 7.6, public speakers recorded as presenting: entries per panel, and each organization given. */
export const presentedPanels = [
  {
    panel: 1,
    entries: 16,
    groups: ['YEG Bike Coalition', 'Holyrood Voice', 'Holyrood Community 79 St Action Group', 'Paths for People', 'YEG Bike Coalition'],
  },
  {
    panel: 2,
    entries: 16,
    groups: ['Bike Bus Alberta', 'Ward Métis Bikes', 'Ward Métis Bikes', "Let's Bike There YEG", 'Bike Edmonton', 'Paths for People'],
  },
  { panel: 3, entries: 18, groups: ['YEG Bike Coalition'] },
  { panel: 4, entries: 2, groups: [] },
] as const;

/**
 * The groups behind the call to register (YF-EV-0315): the coalition that made
 * it, the group it said would prepare speakers, and the group it calls its
 * local ambassadors.
 */
export const callGroups = ['YEG Bike Coalition', 'Paths for People', 'Ward Métis Bikes'] as const;

/** The brief's bands for "about seventy", fixed before the research. */
export const bands = {
  primary: { low: 60, high: 80 },
  alternative: { low: 50, high: 90 },
} as const;

const sum = (values: readonly number[]): number => values.reduce((total, value) => total + value, 0);
const inBand = (count: number, band: { low: number; high: number }): boolean => count >= band.low && count <= band.high;

function figuresFor(count: number) {
  return { count, inPrimary: inBand(count, bands.primary), inAlternative: inBand(count, bands.alternative) };
}

const n = sum(approvedPanels.map((p) => p.entries));
const named = (panels: readonly { groups: readonly string[] }[], among?: readonly string[]): number =>
  panels.flatMap((p) => p.groups).filter((g) => among === undefined || among.includes(g)).length;
const nAll = n + sum(Object.values(approvedOtherItems));
const nSpoke = sum(presentedPanels.map((p) => p.entries));

export const figures = {
  n: figuresFor(n),
  nAll: figuresFor(nAll),
  nSpoke: figuresFor(nSpoke),
  approvedWithOrganization: named(approvedPanels),
  presentedWithOrganization: named(presentedPanels),
  /** Approved entries giving one of the groups behind the call to register. */
  approvedUnderCallGroups: named(approvedPanels, callGroups),
  /** Of those, entries giving one of those groups among the people recorded as presenting. */
  presentedUnderCallGroups: named(presentedPanels, callGroups),
  vote: `${timeLimitVote.inFavour.length} to ${timeLimitVote.opposed.length}`,
  /** Section 2(2)(m): two-thirds of all members of the committee. */
  specialResolutionNeeds: Math.ceil((2 * membersPresent) / 3),
  specialResolutionMet: timeLimitVote.inFavour.length >= Math.ceil((2 * membersPresent) / 3),
  /** The row changes under N-spoke with the primary band, so the finding depends on the count used. */
  definitionSensitive: [n, nAll, nSpoke].some((c) => inBand(c, bands.primary) !== inBand(n, bands.primary)),
};

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(figures, null, 2));
}
