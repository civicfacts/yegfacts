import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { figures, motion2023, motion2024 } from '../scripts/calcs/council-pause-vote';
import { loadYaml, repoPath } from '../scripts/lib/repo.ts';

/**
 * The council-pause-vote figures are transcribed from private City archives and
 * recomputed here, so these tests pin the arithmetic and the vote counts to the
 * prose and fail if the page and the transcription drift apart.
 */
type Claim = { answer: string; key_facts: { text: string }[]; limitations: string[] };

const claimText = (id: string): string => {
  const c = loadYaml<Claim>(repoPath('src', 'content', 'claims', `${id}.yaml`));
  return [c.answer, ...c.key_facts.map((f) => f.text), ...c.limitations].join(' ');
};
const story = readFileSync(repoPath('src', 'content', 'stories', 'council-pause-vote.mdx'), 'utf8').replace(
  /\s+/g,
  ' ',
);

describe('the two reduction motions', () => {
  it('both were moved by Principe and seconded by Rice, and both lost', () => {
    for (const motion of [motion2023, motion2024]) {
      expect(motion.movedBy).toBe('K. Principe');
      expect(motion.secondedBy).toBe('J. Rice');
    }
    expect(figures.motions[2023].vote).toBe('4 to 8');
    expect(figures.motions[2024].vote).toBe('4 to 7');
    const text = claimText('cpv-motions-to-cut-to-50-million');
    expect(text).toContain('defeated 4 to 8');
    expect(text).toContain('defeated 4 to 7');
    expect(story).toContain('Council defeated it 4 to 8');
    expect(story).toContain('Council defeated it 4 to 7');
  });

  it('only the 2023 cut leaves an amount in the $45 to $55 million band', () => {
    expect(figures.approvedTotal).toBe(100_000_000);
    expect(figures.motions[2023]).toMatchObject({ cut: 50_000_000, left: 50_000_000, inBand: true, atLeastHalf: true });
    expect(figures.motions[2024]).toMatchObject({ cut: 67_300_000, left: 32_700_000, inBand: false, atLeastHalf: true });
    expect(figures.base2024WouldNeed).toEqual({ low: 112_300_000, high: 122_300_000 });
    const text = claimText('cpv-motions-to-cut-to-50-million');
    for (const figure of ['$100,000,000', '$50,000,000', '$67,300,000', '$32,700,000', '$112.3 million', '$122.3 million']) {
      expect(text).toContain(figure);
    }
    expect(story).toContain('$67.3 million');
    expect(story).toContain('$32.7 million');
  });

  it('the 2022 approval and the 2025 suspension motion carry the tallies printed', () => {
    expect(figures.approvalVote2022).toBe('9 to 4');
    expect(figures.suspensionVote2025).toBe('4 to 9');
    expect(story).toContain('by 9 votes to 4');
    expect(story).toContain('It lost 4 to 9');
  });
});

describe('the committee', () => {
  it('both substantive votes tied 2 to 2, with the mayor and one councillor not recorded', () => {
    expect(figures.committeeVotes.continueMotion).toBe('2 to 2');
    expect(figures.committeeVotes.amendment).toBe('2 to 2');
    expect(figures.committeeVotes.notRecordedOnContinue).toEqual(['A. Knack', 'A. Paquette']);
    expect(figures.committeeVotes.notRecordedOnAmendment).toEqual(['A. Knack', 'A. Paquette']);
    expect(story).toContain('Both were defeated 2 to 2');
  });
});

describe('the route lists', () => {
  it('13 continue, 14 are set apart, 18 stretches if split, and none of the 14 had started', () => {
    expect(figures.routes).toEqual({
      continuing: 13,
      listedApart: 14,
      listedApartSegments: 18,
      tenderedNotStarted: 3,
      notViableIn2026: 6,
      noDeliveryPlan: 5,
    });
    const text = claimText('cpv-administration-recommended-freeze');
    expect(text).toContain('same 13 projects');
    expect(text).toContain('gives 14');
    expect(text).toContain('gives 18');
    for (const words of ['Thirteen projects', 'Fourteen were set apart', 'Three had a contract', 'Six had been', 'Five had no']) {
      expect(story).toContain(words);
    }
  });
});

describe('the people', () => {
  it('six people, five on the first claim, one each on the others, the councillor on three', () => {
    expect(figures.people).toEqual({
      question: 6,
      distinct: 6,
      councilRejectedPause: 5,
      administrationRecommended: 1,
      motions: 1,
      sameSeven: 1,
      claimsWithTheCouncillor: 3,
    });
    expect(story).toContain('six people');
    expect(story).toContain('Five of them');
    expect(story).toContain('three of the four claims');
  });
});
