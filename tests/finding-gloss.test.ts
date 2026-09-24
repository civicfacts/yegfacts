import { describe, expect, it } from 'vitest';
import { FINDING_GLOSS, SPLIT_PARTIAL_TERM, findingGlossTerm } from '../src/lib/findings';
import { requireTerm } from '../src/lib/glossary';

describe('the finding badge gloss', () => {
  it('uses the split gloss only for a Partially supported reached from a Split panel', () => {
    expect(findingGlossTerm('Partially supported', 'Split')).toBe(SPLIT_PARTIAL_TERM);
    expect(findingGlossTerm('Partially supported', 'Unanimous')).toBe('Partially supported');
    expect(findingGlossTerm('Partially supported', 'Adjacent')).toBe('Partially supported');
    expect(findingGlossTerm('Not established', 'Split')).toBe('Not established');
  });

  it('resolves every term it can return to a glossary entry', () => {
    expect(requireTerm(SPLIT_PARTIAL_TERM).definition).toMatch(/reviewers split/);
    expect(requireTerm(SPLIT_PARTIAL_TERM).definition).not.toBe(FINDING_GLOSS['Partially supported']);
    expect(requireTerm('Partially supported').definition).toBe(FINDING_GLOSS['Partially supported']);
  });
});
