/**
 * The merge is the deterministic step between two non-deterministic ones, so
 * the parts worth pinning are the ones that decide whether two reviewers cited
 * the same thing.
 */
import { describe, expect, it } from 'vitest';
import { combineEvidence, findDisagreements, normalizeUrl } from '../scripts/merge.ts';
import type { Review } from '../scripts/lib/review-schema.ts';

describe('normalizeUrl', () => {
  it('collapses case, www, trailing slash and fragment', () => {
    const canonical = normalizeUrl('https://edmonton.ca/reports/ebus');
    expect(normalizeUrl('HTTPS://WWW.Edmonton.ca/reports/ebus/')).toBe(canonical);
    expect(normalizeUrl('https://edmonton.ca/reports/ebus#page=4')).toBe(canonical);
  });

  it('drops campaign parameters but keeps meaningful ones', () => {
    expect(normalizeUrl('https://edmonton.ca/r?utm_source=x&fbclid=y')).toBe(
      normalizeUrl('https://edmonton.ca/r'),
    );
    expect(normalizeUrl('https://edmonton.ca/r?id=42&b=1')).toBe(
      normalizeUrl('https://edmonton.ca/r?b=1&id=42'),
    );
    expect(normalizeUrl('https://edmonton.ca/r?id=42')).not.toBe(normalizeUrl('https://edmonton.ca/r'));
  });

  it('returns an unparseable citation rather than dropping it', () => {
    expect(normalizeUrl('  not a url  ')).toBe('not a url');
  });
});

function review(reviewer: Review['reviewer']['provider'], verdict: Review['claims'][number]['verdict'], url: string): Review {
  return {
    reviewer: { provider: reviewer, model_self_reported: reviewer },
    story: 'electric-buses',
    round: 1,
    claims: [
      {
        id: 'ebus-82m-loss',
        proposition_evaluated: 'The procurement cost the public about $82M net.',
        verdict,
        confidence: 'Moderate',
        evidence_basis: 'direct-edmonton',
        supporting_evidence: [
          {
            finding: 'Proof of claim filed for USD 82M',
            source_title: 'Proterra Chapter 11 docket',
            source_url: url,
            source_type: 'legal-audited',
            establishes: 'What the City alleged, not what it lost',
          },
        ],
        challenging_evidence: [],
        limitations: [],
        unknowns: [],
        what_would_change_my_verdict: [],
        suggested_one_line: 'x',
      },
    ],
  };
}

describe('combineEvidence', () => {
  const loaded = [
    { reviewer: 'claude', review: review('anthropic', 'Not established', 'https://example.org/docket') },
    { reviewer: 'gpt', review: review('openai', 'Not established', 'https://www.example.org/docket/') },
    { reviewer: 'gemini', review: review('google', 'Partially supported', 'https://example.org/other') },
  ];

  it('dedupes by normalized URL and records who cited each source', () => {
    const combined = combineEvidence(loaded, '/tmp/2026-08-31', 1);
    expect(combined.items).toHaveLength(2);
    const shared = combined.items[0]!;
    expect(shared.cited_by).toEqual(['claude', 'gpt']);
    expect(shared.urls).toEqual(['https://example.org/docket', 'https://www.example.org/docket/']);
    expect(shared.citations).toHaveLength(2);
    expect(shared.evidence_id).toBeNull();
  });

  it('sorts the most-corroborated sources first', () => {
    const combined = combineEvidence(loaded, '/tmp/2026-08-31', 1);
    expect(combined.items[0]!.cited_by.length).toBeGreaterThanOrEqual(
      combined.items[1]!.cited_by.length,
    );
  });
});

describe('findDisagreements', () => {
  it('reports only the claims whose verdicts differ', () => {
    const agreeing = [
      { reviewer: 'claude', review: review('anthropic', 'Not established', 'https://a') },
      { reviewer: 'gpt', review: review('openai', 'Not established', 'https://a') },
    ];
    expect(findDisagreements(agreeing)).toEqual([]);

    const split = [
      ...agreeing,
      { reviewer: 'gemini', review: review('google', 'Contradicted', 'https://a') },
    ];
    const found = findDisagreements(split);
    expect(found).toHaveLength(1);
    expect(found[0]!.claim).toBe('ebus-82m-loss');
    expect(found[0]!.distinct_verdicts).toEqual(['Not established', 'Contradicted']);
  });
});
