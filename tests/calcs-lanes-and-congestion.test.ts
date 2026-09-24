import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { figures } from '../scripts/calcs/lanes-and-congestion';
import { loadYaml, repoPath } from '../scripts/lib/repo.ts';

/**
 * The lanes-and-congestion figures are read out of the committed inventory
 * snapshot and the register, so these tests pin what the page prints to what
 * those files say, and fail if the prose and the record drift apart.
 */
type Claim = { key_facts: { text: string; sources: string[] }[] };

const claim = loadYaml<Claim>(repoPath('src', 'content', 'claims', 'lc-lanes-taken-citywide.yaml'));
const story = readFileSync(
  repoPath('src', 'content', 'stories', 'lanes-and-congestion.mdx'),
  'utf8',
).replace(/\s+/g, ' ');
const facts = (source: string) =>
  claim.key_facts
    .filter((fact) => fact.sources.includes(source))
    .map((fact) => fact.text)
    .join(' ');

describe('lanes-and-congestion figures', () => {
  it('the snapshot holds 3,175 segments and no field for prior use', () => {
    expect(figures.snapshotFeatureCount).toBe(3175);
    expect(figures.priorUseFields).toEqual([]);
    expect(facts('YF-EV-0166')).toContain('3,175 segments');
    expect(story).toContain('3,175 segments');
  });

  it('110 Street between 76 and 82 Avenue was built in 2022', () => {
    expect(figures.street110.protectedSegments).toBeGreaterThan(0);
    expect(figures.street110.constructionYears).toEqual([2022]);
    expect(facts('YF-EV-0166')).toContain('built in 2022');
  });

  it('three documented districts out of fifteen, below both thresholds', () => {
    expect(figures.verifiedDistricts).toEqual(['Central', 'Scona', 'North Central']);
    expect(figures.districtCount).toBe(15);
    expect(figures.verifiedDistricts.length).toBeLessThan(figures.districtThresholds.alternative);
    expect(facts('YF-EV-0167')).toContain('3 of the City');
    expect(story).toContain('3 of its 15 districts');
    expect(facts('YF-EV-0167')).toContain('15 districts');
  });

  it('the people counts in the opening match the register', () => {
    expect(figures.people).toEqual({
      distinctAcrossFourClaims: 22,
      question: 24,
      laneRemovalIncreasesCongestion: 13,
      bikeInfraReducesCongestion: 6,
      cityRemovedTrafficLanes: 4,
      lanesRemovedForTrafficCalming: 1,
    });
    expect(story).toContain('the four groups hold 22 different people');
    for (const word of ['Twenty-four people', 'Thirteen said', 'Six said', 'Four said', 'One said']) {
      expect(story).toContain(word);
    }
  });
});
