/**
 * The merge bound, pinned by the claim that got past it.
 *
 * `property-taxes-rising-sharply` reached the public register asserting that
 * taxes rose $1,500 in three years for one person and $6,000 a year for
 * another. Two people, two remarks, one "and". The second person had stated a
 * tax bill, not a rise, so the register recorded them asserting something they
 * had not said.
 *
 * These tests fix the two directions that matter. The failing shape must fail,
 * and the near-miss that is genuinely one claim — one person saying both numbers
 * in one sentence — must pass, because a check that flags that is a check
 * somebody turns off.
 */
import { describe, expect, it } from 'vitest';
import { halves, numerals, unsplitClaims } from '../scripts/lib/claim-bound.ts';

describe('numerals', () => {
  it('normalises the ways money and quantities are written', () => {
    expect(numerals('$1,500 in three years')).toEqual(['1500']);
    expect(numerals('Glad I am paying $6,000 a year')).toEqual(['6000']);
    expect(numerals('my taxes have gone up $ 1500 in the last 3 years.')).toEqual(['1500', '3']);
    expect(numerals('2.3% of the population')).toEqual(['2.3']);
  });

  it('does not read numbers written as words', () => {
    expect(numerals('two motions and one councillor')).toEqual([]);
  });
});

describe('halves', () => {
  it('splits on the coordinators the merge prompt names', () => {
    expect(halves('taxes rose $1,500 for one resident and $6,000 a year for another')).toEqual([
      'taxes rose $1,500 for one resident',
      '$6,000 a year for another',
    ]);
    expect(halves('spending $100 million while claiming a deficit')).toHaveLength(2);
  });
});

describe('unsplitClaims', () => {
  const taxes = {
    id: 'property-taxes-rising-sharply',
    proposition:
      "Edmonton property taxes have risen sharply, by $1,500 in three years for one resident and $6,000 a year for another.",
    wordings: [
      'Glad I am paying $6,000 a year in property tax for this!',
      'my taxes have gone up $ 1500 in the last 3 years.',
    ],
  };

  it('flags two quantities that no one wording carries together', () => {
    const [flagged, ...rest] = unsplitClaims([taxes]);
    expect(rest).toEqual([]);
    expect(flagged?.id).toBe('property-taxes-rising-sharply');
    expect(flagged?.numerals).toEqual([['1500'], ['6000']]);
  });

  it('passes when one person asserted both quantities in one sentence', () => {
    expect(
      unsplitClaims([
        {
          id: 'one-percent-year-round-users',
          proposition:
            "Only 1 percent of Edmonton's population uses the bike lanes year-round and fewer than 15 percent use them the rest of the year.",
          wordings: ['only 1% of the pop use them year round and less than 15% the rest of the year.'],
        },
      ]),
    ).toEqual([]);
  });

  it('ignores an "and" that joins names rather than assertions', () => {
    expect(
      unsplitClaims([
        {
          id: 'two-councillors-two-motions',
          proposition:
            'Councillor A and Councillor B brought two motions to cut the bike lane budget to $50 million, and Council did not support them.',
          wordings: ['They brought motions to cut it to $50 million and lost.'],
        },
      ]),
    ).toEqual([]);
  });

  it('is silent on a compound proposition with no numerals, and that is the known gap', () => {
    expect(
      unsplitClaims([
        {
          id: 'congestion-compound',
          proposition:
            'Taking traffic lanes for bike lanes increases congestion, slows traffic and causes idling and emissions.',
          wordings: ['Taking a lane increases congestion.'],
        },
      ]),
    ).toEqual([]);
  });
});
