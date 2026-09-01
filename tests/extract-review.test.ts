/**
 * A reviewer's research run is expensive and unrepeatable, so the extractor has
 * to survive the ways a CLI packages an answer — and has to refuse anything
 * that is not a schema-conforming review, however well-packaged.
 */
import { describe, expect, it } from 'vitest';
import { extractReview, jsonCandidates } from '../scripts/panel/extract-review.ts';

const REVIEW = {
  reviewer: { provider: 'anthropic', model_self_reported: 'claude-fable-5' },
  story: 'electric-buses',
  round: 1,
  claims: [
    {
      id: 'ebus-82m-loss',
      proposition_evaluated: 'The procurement cost the public about $82M net.',
      verdict: 'Not established',
      confidence: 'Moderate',
      evidence_basis: 'direct-edmonton',
      supporting_evidence: [],
      challenging_evidence: [],
      limitations: [],
      unknowns: [],
      what_would_change_my_verdict: [],
      suggested_one_line: 'The record does not establish a net loss of that size.',
    },
  ],
};

const json = JSON.stringify(REVIEW, null, 2);

describe('extractReview', () => {
  it('accepts a bare JSON document', () => {
    expect(extractReview(json).ok).toBe(true);
  });

  it('accepts a fenced document with preamble and trailing chatter', () => {
    const raw = `Here is my review.\n\n\`\`\`json\n${json}\n\`\`\`\n\nLet me know if you need more.`;
    const result = extractReview(raw);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.json).toEqual(REVIEW);
  });

  it('is not confused by braces inside quoted strings', () => {
    const withBraces = JSON.parse(json) as typeof REVIEW;
    withBraces.claims[0]!.suggested_one_line = 'A title with { and } in it';
    const result = extractReview(`noise\n${JSON.stringify(withBraces)}\nmore noise`);
    expect(result.ok).toBe(true);
  });

  it('reports the outermost object’s schema errors, not a nested fragment’s', () => {
    const invalid = JSON.parse(json) as { claims: { verdict: string }[] };
    invalid.claims[0]!.verdict = 'Mixed';
    const result = extractReview(`preamble\n${JSON.stringify(invalid)}`);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('/claims/0/verdict');
    }
  });

  it('refuses output with no JSON at all', () => {
    const result = extractReview('I was unable to complete this research.');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors[0]).toMatch(/no JSON object/);
  });
});

describe('jsonCandidates', () => {
  it('returns candidates longest first', () => {
    const found = jsonCandidates('{"a":{"b":1}}');
    expect(found[0]).toBe('{"a":{"b":1}}');
    expect(found).toContain('{"b":1}');
  });
});
