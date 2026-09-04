/**
 * Parking a claim out of a run (methodology v1.24).
 *
 * The rules worth pinning are the ones that keep parking from being quiet: a
 * claim can only leave a run by being named in the manifest with a reason, a
 * framing concern against a claim that is still being published still halts,
 * and a concern against the parked claim is copied into the artifact rather
 * than dropped with it.
 */
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { stringify } from 'yaml';
import { afterEach, describe, expect, it } from 'vitest';
import { synthesizeRun } from '../scripts/synthesize.ts';
import type { Review } from '../scripts/lib/review-schema.ts';

const providers = { claude: 'anthropic', gemini: 'google', gpt: 'openai' } as const;
type Seat = keyof typeof providers;

/** A verdict, optionally carrying the reviewer's interpretation notes. */
type Answer = Review['claims'][number]['verdict'] | [Review['claims'][number]['verdict'], string];

function review(seat: Seat, answers: Record<string, Answer>): Review {
  return {
    reviewer: { provider: providers[seat], model_self_reported: seat },
    story: 'cycling-volumes',
    round: 1,
    claims: Object.entries(answers).map(([id, answer]) => {
      const [verdict, notes] = Array.isArray(answer) ? answer : [answer, undefined];
      return {
        id,
        proposition_evaluated: id,
        verdict,
        confidence: 'High',
        evidence_basis: 'direct-edmonton',
        ...(notes ? { interpretation_notes: notes } : {}),
        supporting_evidence: [],
        challenging_evidence: [],
        limitations: [],
        unknowns: [],
        what_would_change_my_verdict: [],
        suggested_one_line: id,
      };
    }),
  } as Review;
}

let runDir: string | undefined;

function makeRun(
  round1: Record<Seat, Record<string, Answer>>,
  scope?: Record<string, unknown>,
): string {
  runDir = mkdtempSync(path.join(tmpdir(), 'yegfacts-parked-'));
  mkdirSync(path.join(runDir, 'round1'), { recursive: true });
  for (const [seat, answers] of Object.entries(round1)) {
    writeFileSync(
      path.join(runDir, 'round1', `${seat}.json`),
      JSON.stringify(review(seat as Seat, answers), null, 2),
    );
  }
  if (scope) {
    writeFileSync(
      path.join(runDir, 'run.yaml'),
      stringify({
        story: 'cycling-volumes',
        date: '2026-09-03',
        methodology_version: '1.24',
        synthesis_scope: scope,
        runs: [],
      }),
    );
  }
  return runDir;
}

afterEach(() => {
  if (runDir) rmSync(runDir, { recursive: true, force: true });
  runDir = undefined;
});

const concern = 'MATERIAL FRAMING CONCERN: the instrument cannot carry the proposition.';

const flagged = {
  claude: { one: 'Supported', two: ['Contradicted', concern] },
  gemini: { one: 'Supported', two: 'Not established' },
  gpt: { one: 'Supported', two: 'Contradicted' },
} as Record<Seat, Record<string, Answer>>;

const parkedTwo = {
  claims: ['one'],
  parked: [{ claim: 'two', reason: 'No instrument covers the proposition as posed.' }],
};

describe('synthesizeRun with a parked claim', () => {
  it('synthesises the claims in scope and leaves the parked one out', () => {
    const synthesis = synthesizeRun(makeRun(flagged, parkedTwo));
    expect(synthesis.claims.map((claim) => claim.id)).toEqual(['one']);
    expect(synthesis.parked_claims).toEqual([
      {
        id: 'two',
        reason: 'No instrument covers the proposition as posed.',
        framing_concerns: ['round 1 · claude · claim "two"'],
      },
    ]);
  });

  it('still halts on a framing concern against a claim it is publishing', () => {
    const dir = makeRun(flagged, {
      claims: ['two'],
      parked: [{ claim: 'one', reason: 'Parked for an unrelated reason.' }],
    });
    expect(() => synthesizeRun(dir)).toThrow(/MATERIAL FRAMING CONCERN/);
  });

  it('halts as before when the manifest says nothing about scope', () => {
    expect(() => synthesizeRun(makeRun(flagged))).toThrow(/MATERIAL FRAMING CONCERN/);
  });

  it('refuses a scope that leaves a claim unmentioned', () => {
    const dir = makeRun(flagged, { claims: ['one'] });
    expect(() => synthesizeRun(dir)).toThrow(/neither synthesises nor parks "two"/);
  });

  it('refuses a parked claim with no reason', () => {
    const dir = makeRun(flagged, { claims: ['one'], parked: [{ claim: 'two', reason: '  ' }] });
    expect(() => synthesizeRun(dir)).toThrow(/carries the reason it was parked/);
  });

  it('refuses a claim that is both synthesised and parked', () => {
    const dir = makeRun(flagged, {
      claims: ['one', 'two'],
      parked: [{ claim: 'two', reason: 'Both at once.' }],
    });
    expect(() => synthesizeRun(dir)).toThrow(/twice/);
  });

  it('refuses a scope naming a claim round 1 never asked', () => {
    const dir = makeRun(flagged, {
      claims: ['one', 'two'],
      parked: [{ claim: 'three', reason: 'Never asked.' }],
    });
    expect(() => synthesizeRun(dir)).toThrow(/round 1 never asked/);
  });
});
