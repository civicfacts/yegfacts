/**
 * The synthesis matrix is the part of YEGFacts that turns three opinions into
 * one published verdict, so it is the part that must not be able to drift
 * quietly. Spec §5 and §8 name these tests specifically, and §5 requires them
 * to exist BEFORE the e-bus gate run.
 */
import { describe, expect, it } from 'vitest';
import {
  SYNTHESIS_MATRIX,
  allMultisets,
  allOrderedTriples,
  matrixRow,
  multisetKey,
  synthesize,
} from '../scripts/synthesis-matrix.ts';
import { validateReview } from '../scripts/lib/review-schema.ts';
import {
  CANONICAL_FINDINGS,
  PANEL_AGREEMENT_LEVELS,
  REVIEWER_VERDICTS,
} from '../src/lib/vocabulary.ts';
import type { ReviewerVerdict } from '../src/lib/vocabulary.ts';

const S: ReviewerVerdict = 'Supported';
const P: ReviewerVerdict = 'Partially supported';
const N: ReviewerVerdict = 'Not established';
const C: ReviewerVerdict = 'Contradicted';

describe('exhaustiveness', () => {
  it('enumerates exactly 20 multisets of three reviewer verdicts', () => {
    expect(allMultisets()).toHaveLength(20);
  });

  it('has a row for every multiset', () => {
    for (const multiset of allMultisets()) {
      expect(matrixRow(multiset), `missing row for ${multiset.join(' + ')}`).toBeDefined();
    }
  });

  it('has exactly 20 rows and no duplicates', () => {
    expect(SYNTHESIS_MATRIX).toHaveLength(20);
    const keys = SYNTHESIS_MATRIX.map((row) => multisetKey(row.verdicts));
    expect(new Set(keys).size).toBe(20);
  });

  it('produces only canonical findings', () => {
    for (const row of SYNTHESIS_MATRIX) {
      expect(CANONICAL_FINDINGS).toContain(row.finding);
    }
  });

  it('produces only panel-agreement values, on every row', () => {
    for (const row of SYNTHESIS_MATRIX) {
      expect(PANEL_AGREEMENT_LEVELS, row.verdicts.join(' + ')).toContain(row.agreement);
    }
  });

  it('emits no canonical confidence — that dimension was removed in v1.3', () => {
    for (const row of SYNTHESIS_MATRIX) {
      expect(row, row.verdicts.join(' + ')).not.toHaveProperty('confidence');
    }
    expect(synthesize([S, S, S])).not.toHaveProperty('confidence');
  });

  it('never produces Mixed from a unanimous panel', () => {
    for (const verdict of REVIEWER_VERDICTS) {
      expect(matrixRow([verdict, verdict, verdict])?.finding).toBe(verdict);
    }
  });
});

describe('permutation invariance', () => {
  it('gives the identical result for all 64 ordered triples of verdicts', () => {
    const triples = allOrderedTriples();
    expect(triples).toHaveLength(64);
    for (const triple of triples) {
      const sorted = [...triple].sort();
      const expected = synthesize(sorted as ReviewerVerdict[]);
      const actual = synthesize(triple);
      expect(actual, `order ${triple.join(' , ')} diverged from its multiset`).toEqual(expected);
    }
  });

  it('is invariant to which model held which position', () => {
    const verdicts: ReviewerVerdict[] = [S, P, N];
    const forward = synthesize(verdicts);
    const reversed = synthesize([...verdicts].reverse());
    expect(reversed).toEqual(forward);
  });

  it('refuses a panel that is not exactly three reviewers', () => {
    expect(() => synthesize([S, P])).toThrow(/exactly 3/);
    expect(() => synthesize([S, P, N, N])).toThrow(/exactly 3/);
  });
});

// Methodology v1.3 replaced the canonical confidence with panel agreement over
// the round-1 multiset. The values are computed from the multiset alone, so a
// reviewer's own confidence can no longer move anything the site publishes as
// canonical.
describe('panel agreement is a property of the multiset', () => {
  it('is Unanimous exactly when the panel returned one distinct verdict', () => {
    for (const multiset of allMultisets()) {
      const distinct = new Set(multiset).size;
      const expected = distinct === 1 ? 'Unanimous' : undefined;
      if (expected) expect(matrixRow(multiset)?.agreement, multiset.join(' + ')).toBe(expected);
      else expect(matrixRow(multiset)?.agreement, multiset.join(' + ')).not.toBe('Unanimous');
    }
  });

  it('is Adjacent exactly on two distinct verdicts one step apart on the axis', () => {
    const axis: ReviewerVerdict[] = [S, P, N, C];
    for (const multiset of allMultisets()) {
      const distinct = [...new Set(multiset)];
      const oneStepApart =
        distinct.length === 2 &&
        Math.abs(axis.indexOf(distinct[0]!) - axis.indexOf(distinct[1]!)) === 1;
      expect(matrixRow(multiset)?.agreement === 'Adjacent', multiset.join(' + ')).toBe(
        oneStepApart,
      );
    }
  });

  it('is Split for everything else', () => {
    expect(matrixRow([S, S, N])?.agreement).toBe('Split');
    expect(matrixRow([S, P, N])?.agreement).toBe('Split');
    expect(matrixRow([S, P, C])?.agreement).toBe('Split');
    expect(matrixRow([P, C, C])?.agreement).toBe('Split');
  });

  it('never resolves below the most cautious verdict the panel actually cast', () => {
    const axis: ReviewerVerdict[] = [S, P, N, C];
    for (const multiset of allMultisets()) {
      const row = matrixRow(multiset)!;
      if (row.finding === 'Mixed') continue;
      const mostCautious = Math.max(...multiset.map((verdict) => axis.indexOf(verdict)));
      expect(
        axis.indexOf(row.finding as ReviewerVerdict),
        `${multiset.join(' + ')} resolved past the panel`,
      ).toBeLessThanOrEqual(mostCautious);
    }
  });
});

describe('the rules the rows encode', () => {
  it('is Mixed whenever Supported and Contradicted both appear', () => {
    for (const multiset of allMultisets()) {
      if (multiset.includes(S) && multiset.includes(C)) {
        expect(matrixRow(multiset)?.finding, multiset.join(' + ')).toBe('Mixed');
      }
    }
  });

  it('leans cautious on adjacent 2+1 splits', () => {
    expect(matrixRow([S, S, P])?.finding).toBe('Partially supported');
    expect(matrixRow([S, P, P])?.finding).toBe('Partially supported');
    expect(matrixRow([P, P, N])?.finding).toBe('Partially supported');
    expect(matrixRow([P, N, N])?.finding).toBe('Not established');
    expect(matrixRow([N, N, C])?.finding).toBe('Not established');
    expect(matrixRow([N, C, C])?.finding).toBe('Contradicted');
  });

  it('marks agreement Unanimous / Adjacent / Split consistently', () => {
    expect(matrixRow([P, P, P])?.agreement).toBe('Unanimous');
    expect(matrixRow([S, S, P])?.agreement).toBe('Adjacent');
    expect(matrixRow([S, S, N])?.agreement).toBe('Split');
    expect(matrixRow([S, P, C])?.agreement).toBe('Split');
  });
});

// A reviewer that emits "Mixed" has broken the one vocabulary rule the panel
// has (spec §3): Mixed is a synthesis outcome, never a reviewer verdict.
describe('reviewer JSON containing "Mixed" is rejected', () => {
  const review = (verdict: string): unknown => ({
    reviewer: { provider: 'anthropic', model_self_reported: 'claude-fable-5' },
    story: 'electric-buses',
    round: 1,
    claims: [
      {
        id: 'ebus-82m-loss',
        proposition_evaluated: 'The procurement cost the public about $82M net.',
        verdict,
        confidence: 'Moderate',
        evidence_basis: 'direct-edmonton',
        supporting_evidence: [],
        challenging_evidence: [],
        limitations: [],
        unknowns: [],
        what_would_change_my_verdict: [],
        suggested_one_line: 'The public record does not establish a net loss of that size.',
      },
    ],
  });

  it('accepts the four reviewer verdicts', () => {
    for (const verdict of REVIEWER_VERDICTS) {
      expect(validateReview(review(verdict)).ok, verdict).toBe(true);
    }
  });

  it('rejects "Mixed"', () => {
    const result = validateReview(review('Mixed'));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(' ')).toMatch(/verdict/);
    }
  });

  it('rejects an invented fifth value', () => {
    expect(validateReview(review('Mostly true')).ok).toBe(false);
  });

  it('synthesize() cannot be handed a Mixed verdict', () => {
    expect(() => synthesize(['Mixed' as ReviewerVerdict, S, S])).toThrow(/no matrix row/);
  });
});
