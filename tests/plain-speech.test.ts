import { describe, expect, it } from 'vitest';
import {
  hasSecondIdeaPunctuation,
  methodVocabularyIn,
  opensWithFindingWord,
  opensWithStance,
} from '../src/lib/plain-speech.ts';

/**
 * The shape half of docs/DESIGN.md §12.
 *
 * The hyphen cases are the point of the punctuation tests. The rule this
 * replaced banned dashes outright, so "bike-lane" and "like-for-like" failed a
 * rule that was aimed at the colon; a false failure there sends the writer to
 * delete a true compound, which is the exact behaviour §12 exists to stop.
 */
describe('the one-idea punctuation rule', () => {
  it('rejects the punctuation that lets a second idea in', () => {
    expect(hasSecondIdeaPunctuation('No. The City missed it: emissions rose.')).toBe(true);
    expect(hasSecondIdeaPunctuation('No. The City missed it; emissions rose.')).toBe(true);
    expect(hasSecondIdeaPunctuation('No. The City missed it — emissions rose.')).toBe(true);
    expect(hasSecondIdeaPunctuation('No. The City missed it – emissions rose.')).toBe(true);
  });

  it('leaves hyphens alone, in compounds and in ranges', () => {
    expect(hasSecondIdeaPunctuation('Yes. The bike-lane budget covers 2023-2026.')).toBe(false);
    expect(hasSecondIdeaPunctuation('Partly. It is a like-for-like comparison.')).toBe(false);
    expect(hasSecondIdeaPunctuation('No. Council adopted a two-thirds threshold.')).toBe(false);
  });

  it('passes the ten published answers', () => {
    const published = [
      "Yes, roughly. Edmonton's capital budget for 2023 to 2026 put about $1.9 billion into roads, around 19 times the $100 million it approved for bike lanes.",
      'Partly. The City approved $100 million for bike lanes over four years, about one and a half times its printed snow budget for 2022 rather than almost double.',
      'No. The City says Edmonton is not on track to meet the climate targets Council adopted.',
      "No. Council voted 12 to 0 to state that Edmonton's district plans must not restrict freedom of movement.",
      "Nobody can tell yet. Edmonton filed an $82 million claim in Proterra's bankruptcy, but that does not show whether the city lost $82 million on its electric buses.",
    ];
    for (const answer of published) {
      expect(hasSecondIdeaPunctuation(answer)).toBe(false);
      expect(opensWithStance(answer)).toBe(true);
      expect(opensWithFindingWord(answer)).toBe(false);
    }
  });
});

describe('the stance opener', () => {
  it('accepts the four openers, bare or qualified', () => {
    expect(opensWithStance('Yes. Council voted for it.')).toBe(true);
    expect(opensWithStance('Yes, roughly. Council voted for it.')).toBe(true);
    expect(opensWithStance('No. Council voted against it.')).toBe(true);
    expect(opensWithStance('Partly. Council voted for half of it.')).toBe(true);
    expect(opensWithStance('Nobody can tell. The City keeps no such record.')).toBe(true);
    expect(opensWithStance('Nobody can tell yet. The City keeps no such record.')).toBe(true);
    expect(opensWithStance('Nobody can tell from the record. The City keeps none.')).toBe(true);
  });

  it('rejects a sentence that merely starts with the same word', () => {
    expect(
      opensWithStance('No conforming Edmonton series matches demolished houses to what replaced them.'),
    ).toBe(false);
    expect(opensWithStance('Yes and no, depending on which snow budget you divide by.')).toBe(false);
  });

  it('rejects the finding words, which are the badge’s job', () => {
    for (const finding of ['Supported', 'Partially supported', 'Not established', 'Contradicted', 'Mixed']) {
      const answer = `${finding}. The City keeps no such record.`;
      expect(opensWithFindingWord(answer)).toBe(true);
      expect(opensWithStance(answer)).toBe(false);
    }
  });
});

describe('the method-vocabulary warning list', () => {
  it('finds method words wherever they sit in the sentence', () => {
    expect(methodVocabularyIn('No. The proposition is not established on this record.')).toEqual([
      'proposition',
      'not established',
    ]);
    expect(methodVocabularyIn('Yes. The as-of date was December.')).toEqual(['as-of']);
  });

  it('stays quiet on the ten published answers', () => {
    expect(
      methodVocabularyIn(
        'No. The City says Edmonton is not on track to meet the climate targets Council adopted.',
      ),
    ).toEqual([]);
  });
});
