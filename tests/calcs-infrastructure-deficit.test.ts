import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  eligibilityBand,
  figures,
  results,
  roadsBand,
  shortfallBand,
} from '../scripts/calcs/infrastructure-deficit';
import { loadYaml, repoPath } from '../scripts/lib/repo.ts';

/**
 * Every figure on the infrastructure-deficit page is a City cell or a ratio of
 * two, so the tests check two things: that the derivations come out at the
 * numbers the prose prints, and that each figure falls in the band the brief's
 * cutoffs give it, under both cutoff sets.
 */
type Claim = { answer: string; key_facts: { text: string }[]; limitations: string[] };

const claimText = (id: string): string => {
  const c = loadYaml<Claim>(repoPath('src', 'content', 'claims', `${id}.yaml`));
  return [c.answer, ...c.key_facts.map((f) => f.text), ...c.limitations].join(' ');
};
const story = readFileSync(repoPath('src', 'content', 'stories', 'infrastructure-deficit.mdx'), 'utf8')
  .replace(/\s+/g, ' ');

describe('roads condition', () => {
  it('the nested rows add up to the class and rebuild its D and F share', () => {
    expect(results.roadsNestedValueMatchesClass).toBe(true);
    expect(results.roadsPoorDFFromNestedPct).toBe(figures.roads2025.poorDF);
  });

  it('11.2 per cent is in the partial band under both cutoff sets, 1.2 points above the line', () => {
    expect(results.roadsBandPrimary).toBe('Partially supported');
    expect(results.roadsBandAlternative).toBe('Partially supported');
    expect(results.roadsMarginOverPartialLinePts).toBe(1.2);
    expect(results.roadsPoorDFOfRatedPct).toBe(11.4);
    expect(roadsBand(figures.roads2025.nested.pavedRoads.poorDF, 'primary')).toBe('Partially supported');
    expect(results.roadsServiceAssetsBandPrimary).toBe('Partially supported');
  });

  it('the prose prints the figures the report gives', () => {
    const text = claimText('infra-roads-condition');
    for (const figure of ['$10,484,313,206', '70.8', '16.2', '11.2', '1.7', '12.5', '7.0', '11.4', '11.6', '1.2 points']) {
      expect(text).toContain(figure);
    }
    expect(story).toContain(`about $${results.roadsReplacementValueBillions} billion`);
  });
});

describe('where the $100 million came from', () => {
  it('every dollar is tax-supported debt, so E is 100 and U is 0', () => {
    expect(results.cm200330ApprovedTotalMillions).toBe(100);
    expect(results.eligible).toBe(100);
    expect(results.undetermined).toBe(0);
    expect(results.eligibilityBandPrimary).toBe('Supported');
    expect(results.eligibilityBandAlternative).toBe('Supported');
  });

  it('a reviewer who cannot see the sources has U of 100, which is Not established', () => {
    expect(results.eligibilityBandIfUnread).toBe('Not established');
    expect(eligibilityBand(49.9, 0, 'primary')).toBe('Partially supported');
    expect(eligibilityBand(0, 0, 'primary')).toBe('Contradicted');
  });

  it('the current approved amount clears both lines', () => {
    expect(results.cm200330CurrentApprovedMillions).toBe(99.57);
    expect(eligibilityBand(results.cm200330CurrentApprovedMillions, 0, 'primary')).toBe('Supported');
    expect(story).toContain('$99.57 million');
  });
});

describe('the money beside the shortfall', () => {
  it('gives 6.6 and 6.1 per cent, both partial under both cutoff sets', () => {
    expect(results.adoptedGapMillions).toBe(1629.911);
    expect(results.ratioLaterPct).toBe(6.6);
    expect(results.ratioAdoptedPct).toBe(6.1);
    expect(results.ratioLaterBandPrimary).toBe('Partially supported');
    expect(results.ratioLaterBandAlternative).toBe('Partially supported');
    expect(results.ratioAdoptedBandPrimary).toBe('Partially supported');
    expect(results.ratioAdoptedBandAlternative).toBe('Partially supported');
    expect(results.laterShortfallMultiple).toBe(15.2);
  });

  it('would change only below $400 million or above $2 billion', () => {
    expect(results.supportedIfShortfallAtMostMillions).toBe(400);
    expect(results.contradictedIfShortfallAboveMillions).toBe(2000);
    expect(shortfallBand(100 / 400, 'primary')).toBe('Supported');
    expect(shortfallBand(100 / 2001, 'primary')).toBe('Contradicted');
  });

  it('the prose prints the derived shares', () => {
    const text = claimText('infra-hundred-million-vs-shortfall');
    for (const figure of ['6.6 per cent', '6.1 per cent', '54.4 per cent', '1.39 per cent', '4.56 per cent', '2.1 per cent']) {
      expect(text).toContain(figure);
    }
    expect(results.adoptedRimsFundedPct).toBe(54.4);
    expect(results.programShareOfAdoptedBudgetPct).toBe(1.39);
    expect(results.programShareOfFundedRenewalPct).toBe(4.56);
    expect(results.ratioTenYearGapPct).toBe(2.1);
    expect(story).toContain('6.6 per cent');
    expect(story).toContain('1.39 per cent');
  });
});
