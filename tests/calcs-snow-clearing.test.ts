import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { commentDate, fallAdjustmentVote, figures, lastStatedSnowBudget, packages, statedCosts } from '../scripts/calcs/snow-clearing';
import { loadYaml, repoPath } from '../scripts/lib/repo.ts';

/**
 * The snow-clearing counts are transcribed from private City reports and
 * minutes and recomputed here, so these tests pin the arithmetic to the prose
 * and fail if the page and the transcription drift apart.
 */
type Claim = { answer: string; key_facts: { text: string }[]; limitations: string[] };

const claim = loadYaml<Claim>(repoPath('src', 'content', 'claims', 'sc-two-costed-snow-proposals.yaml'));
const claimText = [claim.answer, ...claim.key_facts.map((f) => f.text), ...claim.limitations].join(' ').replace(/\s+/g, ' ');
const story = readFileSync(repoPath('src', 'content', 'stories', 'snow-clearing.mdx'), 'utf8').replace(/\s+/g, ' ');

describe('the count under the reading fixed before the research', () => {
  it('three packages on a published agenda by the comment date, two without the towing package', () => {
    expect(commentDate).toBe('2026-08-27');
    expect(packages).toHaveLength(3);
    expect(figures.primary).toEqual({ count: 3, rung: 'Supported' });
    expect(figures.primaryWithoutParkingBan).toEqual({ count: 2, rung: 'Supported' });
    expect(claim.answer).toContain('at least two costed snow proposals on published council and committee agendas by August 27, 2026');
    expect(story).toContain('The reviewers found three such proposals on published agendas by August 27, 2026');
    expect(story).toContain('all three counted three');
    expect(story).toContain('Without it, two proposals remain');
  });
});

describe('the readings that change the answer', () => {
  it('heard by a body by August 27: two with the towing package, one without', () => {
    expect(figures.considered).toEqual({ count: 2, rung: 'Supported' });
    expect(figures.consideredWithoutParkingBan).toEqual({ count: 1, rung: 'Partially supported' });
    expect(story).toContain('so two still count on that rule, but only with the towing package');
    expect(claimText).toContain('Two proposals still count then, but only if the parking-ban towing package counts');
  });

  it('City Council alone gives the same two', () => {
    expect(figures.councilOnly).toEqual({ count: 2, rung: 'Supported' });
    expect(figures.councilOnlyWithoutParkingBan).toEqual({ count: 1, rung: 'Partially supported' });
    expect(story).toContain('Counting City Council alone, and not its committees, gives the same two');
  });

  it('exactly two is only partly right, and the stricter cost reading counts none', () => {
    expect(figures.exactlyTwo).toEqual({ count: 3, rung: 'Partially supported' });
    expect(figures.strictCost).toEqual({ count: 0, rung: 'Contradicted' });
    expect(story).toContain('if the comment meant exactly two, it is only partly right');
    expect(story).toContain('none would count, and the claim would be wrong');
  });
});

describe('the figures each package states', () => {
  it('active-pathway package: three components that add to $7.83 million, a $9.938 million table', () => {
    expect(figures.activePathwayDescribedSum).toBe(statedCosts.activePathway.describedOngoingTotal);
    expect(story).toContain('$2.11 million one-time capital investment');
    expect(story).toContain('$1.60 million a year');
    expect(story).toContain('$1.64 million for enforcement and $4.59 million for sidewalk repair');
    expect(story).toContain('2026 total at $9.938 million');
    expect(claimText).toContain('add to $7.83 million');
  });

  it('towing $100,000 a year, Well Maintained City $23.6 million a year and $11.5 million one-time', () => {
    expect(statedCosts.parkingBan.ongoing).toBe(0.1);
    expect(story).toContain('$100,000 a year to hire tow trucks');
    expect(statedCosts.wellMaintainedCity).toEqual({ ongoing: 23.6, oneTimeCapital: 11.5 });
    expect(story).toContain('$23.6 million a year plus $11.5 million one-time');
    expect(statedCosts.optionalEnhancements).toBe(24);
    expect(story).toContain('24 optional extras');
    expect(statedCosts.calciumChlorideUpgrade).toEqual({ ongoing: 2.5, oneTime: 4.4 });
    expect(story).toContain('$2.5 million a year and $4.4 million one-time');
    expect(lastStatedSnowBudget).toBe(67);
    expect(story).toContain('$67 million/year');
  });

  it('Council approved the fall operating changes 11 to 2', () => {
    expect(`${fallAdjustmentVote.inFavour} to ${fallAdjustmentVote.opposed}`).toBe('11 to 2');
    expect(story).toContain('changes to the 2026 operating budget, 11 to 2');
  });
});
