/**
 * The key the register prints above its entries.
 *
 * The triage words are the page's own vocabulary. "Going ahead" is a decision
 * to check a question, not a finding about it, and a reader meeting the word
 * for the first time has no way to know that. So the page defines every label
 * it can print, and these tests pin the property that makes the promise
 * keepable: the key is built from the register, so a triage answer the register
 * starts using cannot appear in the outcome column with nothing to say what it
 * means.
 */
import { describe, expect, it } from 'vitest';
import {
  TRIAGE_ORDER,
  TRIAGE_SECTIONS,
  questionRegister,
  registerKey,
  triageBadge,
  triageRank,
} from '../src/lib/intake.ts';

describe('registerKey', () => {
  it('defines every triage answer the register actually uses', () => {
    const used = new Set(questionRegister().map((question) => question.triage));
    const defined = new Set<string>(registerKey().map((entry) => entry.triage));
    expect([...used].filter((triage) => !defined.has(triage))).toEqual([]);
  });

  it('defines nothing the register does not use, so the key is not a wish list', () => {
    const used = new Set(questionRegister().map((question) => question.triage));
    expect(registerKey().every((entry) => used.has(entry.triage))).toBe(true);
  });

  it('reads in the order the entries under a source read in', () => {
    const ranks = registerKey().map((entry) => triageRank(entry.triage));
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });

  it('gives every answer a definition, written as sentences rather than a label again', () => {
    for (const entry of TRIAGE_SECTIONS) {
      expect(entry.definition).toMatch(/\.$/);
      expect(entry.definition).not.toBe(entry.badge);
      expect(entry.definition).not.toBe(entry.heading);
    }
  });

  it('never lets a definition read as a verdict on the claim', () => {
    for (const entry of TRIAGE_SECTIONS) {
      expect(entry.definition.toLowerCase()).not.toMatch(/\b(true|proven|confirmed|debunked)\b/);
    }
  });

  it('badges every answer it defines, so the key and the column use one word', () => {
    for (const entry of registerKey()) {
      expect(triageBadge(entry.triage)).toBe(entry.badge);
    }
  });

  /**
   * Triage has three values and only three (D-0029). `variation` and
   * `not-a-claim` were dispositions the model no longer has, and a section list
   * that grew a fourth would put a word on the page the vocabulary does not
   * have.
   */
  it('covers the triage vocabulary exactly, with no section for a retired word', () => {
    expect(TRIAGE_SECTIONS.map((entry) => entry.triage).sort()).toEqual([...TRIAGE_ORDER].sort());
  });
});
