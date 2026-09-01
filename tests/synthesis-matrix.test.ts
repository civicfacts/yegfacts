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
  minConfidence,
  multisetKey,
  synthesize,
} from '../scripts/synthesis-matrix.ts';
import { validateReview } from '../scripts/lib/review-schema.ts';
import { CANONICAL_FINDINGS, REVIEWER_VERDICTS } from '../src/lib/vocabulary.ts';
import type { Confidence, ReviewerVerdict } from '../src/lib/vocabulary.ts';

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
      const expected = synthesize(sorted as ReviewerVerdict[], ['High', 'High', 'High']);
      const actual = synthesize(triple, ['High', 'High', 'High']);
      expect(actual, `order ${triple.join(' , ')} diverged from its multiset`).toEqual(expected);
    }
  });

  it('is invariant to which model held which position, confidences included', () => {
    const verdicts: ReviewerVerdict[] = [S, P, N];
    const confidences: Confidence[] = ['High', 'Low', 'Moderate'];
    const forward = synthesize(verdicts, confidences);
    const reversed = synthesize([...verdicts].reverse(), [...confidences].reverse());
    expect(reversed).toEqual(forward);
  });

  it('refuses a panel that is not exactly three reviewers', () => {
    expect(() => synthesize([S, P], ['High', 'High'])).toThrow(/exactly 3/);
    expect(() => synthesize([S, P, N, N], ['High', 'High', 'High', 'High'])).toThrow(/exactly 3/);
  });
});

describe('unanimous rows take the most cautious confidence (spec §5.5)', () => {
  it('SSS at High/Moderate/Low is Supported at Low', () => {
    expect(synthesize([S, S, S], ['High', 'Moderate', 'Low'])).toMatchObject({
      finding: 'Supported',
      confidence: 'Low',
      agreement: 'unanimous',
    });
  });

  it('CCC at High/High/Moderate is Contradicted at Moderate', () => {
    expect(synthesize([C, C, C], ['High', 'High', 'Moderate'])).toMatchObject({
      finding: 'Contradicted',
      confidence: 'Moderate',
    });
  });

  it('NNN at High/High/High keeps High', () => {
    expect(synthesize([N, N, N], ['High', 'High', 'High']).confidence).toBe('High');
  });

  it('minConfidence picks the lowest regardless of order', () => {
    expect(minConfidence(['High', 'Low', 'Moderate'])).toBe('Low');
    expect(minConfidence(['Moderate', 'High'])).toBe('Moderate');
  });

  it('non-unanimous rows ignore the reviewers’ confidences and use the row’s', () => {
    const high = synthesize([S, S, P], ['High', 'High', 'High']);
    const low = synthesize([S, S, P], ['Low', 'Low', 'Low']);
    expect(high.confidence).toBe('Moderate');
    expect(low.confidence).toBe('Moderate');
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

  it('marks agreement unanimous / adjacent / split consistently', () => {
    expect(matrixRow([P, P, P])?.agreement).toBe('unanimous');
    expect(matrixRow([S, S, P])?.agreement).toBe('adjacent');
    expect(matrixRow([S, S, N])?.agreement).toBe('split');
    expect(matrixRow([S, P, C])?.agreement).toBe('split');
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
    expect(() => synthesize(['Mixed' as ReviewerVerdict, S, S], ['High', 'High', 'High'])).toThrow(
      /no matrix row/,
    );
  });
});
