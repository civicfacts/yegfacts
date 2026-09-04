/**
 * Claim-scoped blind re-runs (methodology v1.22).
 *
 * This is the only place a claim's canonical basis can be replaced after a
 * round 1 has been locked, so the parts worth pinning are the ones that decide
 * whether a re-run is allowed to replace anything: that it covers all three
 * seats, that the seats answered the same claims, and that it touches no claim
 * it did not answer.
 */
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { synthesizeRun } from '../scripts/synthesize.ts';
import type { Review } from '../scripts/lib/review-schema.ts';

const seats = ['claude', 'gemini', 'gpt'] as const;
const providers = { claude: 'anthropic', gemini: 'google', gpt: 'openai' } as const;

function review(
  seat: (typeof seats)[number],
  verdicts: Record<string, Review['claims'][number]['verdict']>,
): Review {
  return {
    reviewer: { provider: providers[seat], model_self_reported: seat },
    story: 'cycling-volumes',
    round: 1,
    claims: Object.entries(verdicts).map(([id, verdict]) => ({
      id,
      proposition_evaluated: id,
      verdict,
      confidence: 'High',
      evidence_basis: 'direct-edmonton',
      supporting_evidence: [],
      challenging_evidence: [],
      limitations: [],
      unknowns: [],
      what_would_change_my_verdict: [],
      suggested_one_line: id,
    })),
  } as Review;
}

let runDir: string | undefined;

function makeRun(dirs: Record<string, Record<string, Record<string, string>>>): string {
  runDir = mkdtempSync(path.join(tmpdir(), 'yegfacts-synth-'));
  for (const [dir, bySeat] of Object.entries(dirs)) {
    mkdirSync(path.join(runDir, dir), { recursive: true });
    for (const [seat, verdicts] of Object.entries(bySeat)) {
      writeFileSync(
        path.join(runDir, dir, `${seat}.json`),
        JSON.stringify(review(seat as (typeof seats)[number], verdicts as never), null, 2),
      );
    }
  }
  return runDir;
}

afterEach(() => {
  if (runDir) rmSync(runDir, { recursive: true, force: true });
  runDir = undefined;
});

const split = {
  claude: { one: 'Supported', two: 'Supported' },
  gemini: { one: 'Supported', two: 'Supported' },
  gpt: { one: 'Not established', two: 'Supported' },
};

describe('synthesizeRun with a claim re-run', () => {
  it('reads only the re-run claim from the re-run, and leaves the rest on round 1', () => {
    const dir = makeRun({
      round1: split,
      'round1-rerun-1': {
        claude: { one: 'Supported' },
        gemini: { one: 'Supported' },
        gpt: { one: 'Supported' },
      },
    });
    const synthesis = synthesizeRun(dir);
    const [one, two] = synthesis.claims;

    expect(synthesis.claim_reruns).toEqual(['round1-rerun-1']);
    expect(one).toMatchObject({ id: 'one', basis: 'round1-rerun-1', panel_agreement: 'Unanimous' });
    expect(one!.reviewers.map((r) => r.verdict)).toEqual(['Supported', 'Supported', 'Supported']);
    expect(two).toMatchObject({ id: 'two', basis: 'round1' });
  });

  it('leaves every claim on round 1 when there is no re-run', () => {
    const synthesis = synthesizeRun(makeRun({ round1: split }));
    expect(synthesis.claim_reruns).toEqual([]);
    expect(synthesis.claims.map((claim) => claim.basis)).toEqual(['round1', 'round1']);
    expect(synthesis.claims[0]).toMatchObject({ panel_agreement: 'Split' });
  });

  it('refuses a re-run that is missing a seat', () => {
    const dir = makeRun({
      round1: split,
      'round1-rerun-1': { claude: { one: 'Supported' }, gpt: { one: 'Supported' } },
    });
    expect(() => synthesizeRun(dir)).toThrow(/needs all 3 seats/);
  });

  it('refuses a re-run whose seats answered different claims', () => {
    const dir = makeRun({
      round1: split,
      'round1-rerun-1': {
        claude: { one: 'Supported' },
        gemini: { one: 'Supported' },
        gpt: { one: 'Supported', two: 'Supported' },
      },
    });
    expect(() => synthesizeRun(dir)).toThrow(/not the re-run's/);
  });

  it('refuses a re-run of a claim round 1 never asked', () => {
    const dir = makeRun({
      round1: split,
      'round1-rerun-1': {
        claude: { three: 'Supported' },
        gemini: { three: 'Supported' },
        gpt: { three: 'Supported' },
      },
    });
    expect(() => synthesizeRun(dir)).toThrow(/round 1 never asked/);
  });

  it('refuses two re-runs of the same claim', () => {
    const one = { claude: { one: 'Supported' }, gemini: { one: 'Supported' }, gpt: { one: 'Supported' } };
    const dir = makeRun({ round1: split, 'round1-rerun-1': one, 'round1-rerun-2': one });
    expect(() => synthesizeRun(dir)).toThrow(/re-run in both/);
  });
});
