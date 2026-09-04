/**
 * A seat's account of its own earlier verdict is not evidence about that
 * verdict.
 *
 * `synthesize.ts` used to prefer the `from` a seat wrote in its round-2
 * `verdict_changes` over the verdict its committed round-1 file records. On
 * `cycling-volumes` one seat described the halted round on the superseded
 * brief rather than the round it had actually answered, and the synthesis
 * recorded a cross-review movement nobody made. These pin the rule that
 * replaced it: the committed file decides the movement, and a self-report that
 * contradicts it is written out as `disputed_self_report` rather than dropped.
 */
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { synthesizeRun } from '../scripts/synthesize.ts';
import type { Review } from '../scripts/lib/review-schema.ts';

const providers = { claude: 'anthropic', gemini: 'google', gpt: 'openai' } as const;
type Seat = keyof typeof providers;

type VerdictChange = NonNullable<NonNullable<Review['round2_notes']>['verdict_changes']>[number];

function review(
  seat: Seat,
  round: 1 | 2,
  verdicts: Record<string, Review['claims'][number]['verdict']>,
  changes?: VerdictChange[],
): Review {
  return {
    reviewer: { provider: providers[seat], model_self_reported: seat },
    story: 'cycling-volumes',
    round,
    ...(changes ? { round2_notes: { verdict_changes: changes } } : {}),
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

function makeRun(dirs: Record<string, Record<string, Review>>): string {
  runDir = mkdtempSync(path.join(tmpdir(), 'yegfacts-selfreport-'));
  for (const [dir, bySeat] of Object.entries(dirs)) {
    mkdirSync(path.join(runDir, dir), { recursive: true });
    for (const [seat, body] of Object.entries(bySeat)) {
      writeFileSync(path.join(runDir, dir, `${seat}.json`), JSON.stringify(body, null, 2));
    }
  }
  return runDir;
}

afterEach(() => {
  if (runDir) rmSync(runDir, { recursive: true, force: true });
  runDir = undefined;
});

/** All three seats at Contradicted in round 1, which is the record under test. */
const round1 = {
  claude: review('claude', 1, { lanes: 'Contradicted' }),
  gemini: review('gemini', 1, { lanes: 'Contradicted' }),
  gpt: review('gpt', 1, { lanes: 'Contradicted' }),
};

function positionFor(dir: string, seat: Seat) {
  const claim = synthesizeRun(dir).claims[0]!;
  return claim.round2_positions.find((position) => position.provider === seat)!;
}

describe('a seat whose round-2 self-report contradicts its committed round 1', () => {
  it('records no movement, because the committed file is the authority', () => {
    const dir = makeRun({
      round1,
      round2: {
        ...round1,
        gemini: review('gemini', 2, { lanes: 'Contradicted' }, [
          {
            claim: 'lanes',
            from: 'Not established',
            to: 'Contradicted',
            why: 'the brief was revised',
          },
        ]),
      },
    });
    const gemini = positionFor(dir, 'gemini');

    expect(gemini.verdict).toBe('Contradicted');
    expect(gemini.changed_from).toBeUndefined();
    expect(gemini.changed_why).toBeUndefined();
  });

  it('writes the contradicted self-report out rather than dropping it', () => {
    const dir = makeRun({
      round1,
      round2: {
        ...round1,
        gemini: review('gemini', 2, { lanes: 'Contradicted' }, [
          {
            claim: 'lanes',
            from: 'Not established',
            to: 'Contradicted',
            why: 'the brief was revised',
          },
        ]),
      },
    });

    expect(positionFor(dir, 'gemini').disputed_self_report).toEqual({
      claimed_from: 'Not established',
      committed: 'Contradicted',
      why: 'the brief was revised',
    });
  });

  it('still records a movement the committed files show, and its stated reason', () => {
    const dir = makeRun({
      round1,
      round2: {
        ...round1,
        gpt: review('gpt', 2, { lanes: 'Supported' }, [
          { claim: 'lanes', from: 'Contradicted', to: 'Supported', why: 'the other seats ran the join' },
        ]),
      },
    });
    const gpt = positionFor(dir, 'gpt');

    expect(gpt.changed_from).toBe('Contradicted');
    expect(gpt.changed_why).toBe('the other seats ran the join');
    expect(gpt.disputed_self_report).toBeUndefined();
  });

  it('reads a movement off the files even when the seat reported none', () => {
    const dir = makeRun({
      round1,
      round2: { ...round1, gpt: review('gpt', 2, { lanes: 'Supported' }) },
    });
    const gpt = positionFor(dir, 'gpt');

    expect(gpt.changed_from).toBe('Contradicted');
    expect(gpt.disputed_self_report).toBeUndefined();
  });
});
