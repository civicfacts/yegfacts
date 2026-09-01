import { describe, expect, it } from 'vitest';
import {
  bicycleCommuteSharePct,
  winterCyclistRetentionPct,
} from '../scripts/calcs/winter-cycling';
import { loadYaml, repoPath } from '../scripts/lib/repo.ts';

/**
 * The winter-cycling figures are transcribed rather than derived, so the thing
 * worth testing is not arithmetic — it is that the transcription still matches
 * the published record. Every number this module hands to a chart has to appear
 * in the `key_fact` that cites the same source, because the chart's caption
 * points a reader at that source and promises the bar came from it.
 *
 * This is the test that fails if a figure is edited in one place and not the
 * other, which is the only way the chart and the claim can quietly disagree.
 */
type Claim = {
  key_facts: { text: string; sources: string[] }[];
};

const claim = loadYaml<Claim>(repoPath('src', 'content', 'claims', 'wc-too-cold.yaml'));

function factCiting(source: string): string {
  const facts = claim.key_facts.filter((fact) => fact.sources.includes(source));
  expect(facts.length, `no key_fact cites ${source}`).toBeGreaterThan(0);
  return facts.map((fact) => fact.text).join(' ');
}

describe('winter-cycling figures', () => {
  it('every bicycle commute share is in the key_fact citing YF-EV-0029', () => {
    const text = factCiting('YF-EV-0029');
    for (const [city, share] of Object.entries(bicycleCommuteSharePct)) {
      expect(text, `${city} share`).toContain(`${share}%`);
      expect(text, `${city} name`).toContain(city);
    }
  });

  it('every winter retention figure is in the key_fact citing YF-EV-0030', () => {
    const text = factCiting('YF-EV-0030');
    for (const [city, retention] of Object.entries(winterCyclistRetentionPct)) {
      expect(text, `${city} retention`).toContain(`${retention}%`);
      expect(text, `${city} name`).toContain(city);
    }
  });

  it('Minneapolis outranks every warm-winter comparator', () => {
    const { Minneapolis, ...warm } = bicycleCommuteSharePct;
    for (const share of Object.values(warm)) expect(Minneapolis).toBeGreaterThan(share);
  });
});
