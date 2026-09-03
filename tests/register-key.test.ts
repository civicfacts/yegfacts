/**
 * The key the register prints above its entries.
 *
 * The state words are the page's own vocabulary. "Going ahead" is a decision to
 * check a question, not a finding about it, and a reader meeting the word for
 * the first time has no way to know that. So the page defines every label it can
 * print, and these tests pin the property that makes the promise keepable: the
 * key is built from the register, so a state the register starts using cannot
 * appear in the state column with nothing to say what it means.
 *
 * Since D-0029 the key covers both state fields a reader filters by — the three
 * triage answers and the two publication states — because `/questions` badges
 * and filters by both.
 */
import { describe, expect, it } from 'vitest';
import {
  QUESTION_STATES,
  TRIAGE_ORDER,
  TRIAGE_SECTIONS,
  questionRegister,
  questionStateKey,
  statesOf,
  triageBadge,
  triageRank,
} from '../src/lib/intake.ts';

describe('questionStateKey', () => {
  it('defines every state the register actually puts a question in', () => {
    const used = new Set(questionRegister().flatMap(statesOf));
    const defined = new Set(questionStateKey().map((entry) => entry.id));
    expect([...used].filter((state) => !defined.has(state))).toEqual([]);
  });

  it('defines nothing the register does not use, so the key is not a wish list', () => {
    const used = new Set(questionRegister().flatMap(statesOf));
    expect(questionStateKey().every((entry) => used.has(entry.id))).toBe(true);
  });

  it('reads in the register order: answered, then the triage answers, then withdrawn', () => {
    const order = QUESTION_STATES.map((state) => state.id);
    const printed = questionStateKey().map((entry) => entry.id);
    expect(printed).toEqual(order.filter((id) => printed.includes(id)));
  });

  it('reads the triage answers in the order the entries under a source read in', () => {
    const ranks = questionStateKey()
      .filter((entry) => (TRIAGE_ORDER as readonly string[]).includes(entry.id))
      .map((entry) => triageRank(entry.id));
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });

  it('gives every state a definition, written as a sentence rather than the label again', () => {
    for (const entry of QUESTION_STATES) {
      expect(entry.definition).toMatch(/\.$/);
      expect(entry.definition).not.toBe(entry.label);
    }
  });

  it('never lets a definition read as a verdict on the claim', () => {
    for (const entry of QUESTION_STATES) {
      expect(entry.definition.toLowerCase()).not.toMatch(/\b(true|proven|confirmed|debunked)\b/);
    }
  });

  it('badges every triage answer it defines, so the key and the column use one word', () => {
    for (const entry of QUESTION_STATES) {
      if (!(TRIAGE_ORDER as readonly string[]).includes(entry.id)) continue;
      expect(triageBadge(entry.id)).toBe(entry.label);
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

  /**
   * `unpublished` and `corrected` are publication values with no key entry of
   * their own on purpose: unpublished is what the triage answer already says,
   * and a corrected finding is a published one that changed. Neither may leak
   * onto the page as a bare state word.
   */
  it('never prints a publication value the key does not define', () => {
    const defined = new Set(QUESTION_STATES.map((entry) => entry.id));
    for (const question of questionRegister()) {
      for (const state of statesOf(question)) expect(defined.has(state)).toBe(true);
    }
  });
});
