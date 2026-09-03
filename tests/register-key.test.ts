/**
 * The key `/considered` prints above the register.
 *
 * The outcome words are the page's own vocabulary. "Going ahead" is a decision
 * to check a claim, not a finding about it, and a reader meeting the word for
 * the first time has no way to know that. So the page defines every label it
 * can print, and these tests pin the property that makes the promise keepable:
 * the key is built from the register, so an outcome the register starts using
 * cannot appear in the outcome column with nothing to say what it means.
 */
import { describe, expect, it } from 'vitest';
import {
  REGISTER_SECTIONS,
  candidateRegister,
  outcomeBadge,
  outcomeRank,
  registerKey,
} from '../src/lib/intake.ts';

describe('registerKey', () => {
  it('defines every outcome the register actually uses', () => {
    const used = new Set(candidateRegister().map((candidate) => candidate.outcome));
    const defined = new Set<string>(registerKey().map((entry) => entry.outcome));
    expect([...used].filter((outcome) => !defined.has(outcome))).toEqual([]);
  });

  it('defines nothing the register does not use, so the key is not a wish list', () => {
    const used = new Set(candidateRegister().map((candidate) => candidate.outcome));
    expect(registerKey().every((entry) => used.has(entry.outcome))).toBe(true);
  });

  it('reads in the order the entries under a source read in', () => {
    const ranks = registerKey().map((entry) => outcomeRank(entry.outcome));
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });

  it('gives every outcome a definition, written as sentences rather than a label again', () => {
    for (const entry of REGISTER_SECTIONS) {
      expect(entry.definition).toMatch(/\.$/);
      expect(entry.definition).not.toBe(entry.badge);
      expect(entry.definition).not.toBe(entry.heading);
    }
  });

  it('never lets a definition read as a verdict on the claim', () => {
    for (const entry of REGISTER_SECTIONS) {
      expect(entry.definition.toLowerCase()).not.toMatch(/\b(true|proven|confirmed|debunked)\b/);
    }
  });

  it('badges every outcome it defines, so the key and the column use one word', () => {
    for (const entry of registerKey()) {
      expect(outcomeBadge(entry.outcome)).toBe(entry.badge);
    }
  });
});
