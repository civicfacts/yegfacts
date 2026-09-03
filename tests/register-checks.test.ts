/**
 * The register is the site's public promise that nothing was cherry-picked, so
 * the rules that keep it honest are worth pinning: a claim's source resolves, a
 * merged claim says what it merged into, every declined disposition carries the
 * sentence `/considered` prints, and — the one that matters most — a quote
 * attributed to a real person is that person's words, not a model's tidy-up.
 *
 * Since grouping, two more: the outcome sits on the investigation and only
 * there, and an investigation's account counts are inside the range its own
 * claims allow. Opposite claims under one question are deliberate and must
 * validate; what must not is a claim ruled on twice, or ruled on nowhere.
 */
import { describe, expect, it } from 'vitest';
import {
  normaliseQuote,
  readComments,
  registerProblems,
  type Register,
  type RegisterWorld,
} from '../scripts/lib/register-checks.ts';

const CAPTURE = 'intake/captures/thread';

const COMMENTS = [
  { index: 1, text: 'The city is removing traffic lanes all throughout the city for bike lanes.' },
  { index: 2, text: 'They   signed an “agreement” to make\nEdmonton a 15 minute city.' },
].map((row) => JSON.stringify(row)).join('\n');

/** A world where the one source's directories exist and `wc-too-cold` is published. */
function world(overrides: Partial<RegisterWorld> = {}): RegisterWorld {
  return {
    exists: () => true,
    isDirectory: (path) => path === CAPTURE || path === 'reviews/intake/thread',
    comments: (capture) => (capture === CAPTURE ? readComments(COMMENTS) : undefined),
    claimIds: new Set(['wc-too-cold']),
    ...overrides,
  };
}

const source = {
  id: 'thread',
  kind: 'facebook-post',
  url: 'https://example.com/post',
  title: 'A thread',
  captured: '2026-09-02',
  captured_by: 'founder',
  capture: CAPTURE,
  run: 'reviews/intake/thread',
};

/** A candidate that validates, so each test can break exactly one thing. */
function candidate(overrides: Record<string, unknown> = {}) {
  return {
    id: 'lanes-removed',
    recorded: '2026-09-02',
    origin: 'captured',
    wording: 'The city is removing traffic lanes all throughout the city for bike lanes.',
    outcome: 'GO',
    source: 'thread',
    proposition: 'Edmonton is removing traffic lanes across the city to build bike lanes.',
    ...overrides,
  };
}

/** One question, with the triage call on it. What a claim is checked under. */
function investigation(overrides: Record<string, unknown> = {}) {
  return {
    id: 'lanes-and-congestion',
    recorded: '2026-09-02',
    source: 'thread',
    question: "Do Edmonton's bike lanes ease congestion or make it worse?",
    outcome: 'GO',
    reason: 'Before-and-after traffic counts on the converted corridors can answer it.',
    accounts: { total: 2, against: 1, for: 1 },
    run: 'reviews/intake/thread',
    ...overrides,
  };
}

/** A claim inside that investigation: no outcome of its own, ever. */
function claim(overrides: Record<string, unknown> = {}) {
  return {
    id: 'lanes-removed',
    recorded: '2026-09-02',
    origin: 'captured',
    source: 'thread',
    investigation: 'lanes-and-congestion',
    proposition: 'Edmonton is removing traffic lanes across the city to build bike lanes.',
    wording: 'The city is removing traffic lanes all throughout the city for bike lanes.',
    side: 'against',
    accounts: 1,
    ...overrides,
  };
}

/** The other side of the same question, so the pair fills the fixture's total of 2. */
const otherSide = (overrides: Record<string, unknown> = {}) =>
  claim({ id: 'lanes-help', side: 'for', ...overrides });

const check = (register: Register, w: RegisterWorld = world()) => registerProblems(register, w);

const problems = (candidates: unknown[], w: RegisterWorld = world()) =>
  check({ sources: [source], candidates }, w);

const grouped = (
  candidates: unknown[],
  investigations: unknown[] = [investigation()],
  w: RegisterWorld = world(),
) => check({ sources: [source], investigations, candidates }, w);

describe('normaliseQuote', () => {
  it('folds curly quotes and runs of whitespace, and nothing else', () => {
    expect(normaliseQuote('  they  “signed”\nan ‘agreement’ ')).toBe(
      'they "signed" an \'agreement\'',
    );
  });

  it('leaves case and punctuation alone, so a reworded quote still differs', () => {
    expect(normaliseQuote('The City removed lanes.')).not.toBe('the city removed lanes');
  });
});

describe('readComments', () => {
  it('indexes a JSONL capture by comment index and skips blank lines', () => {
    const comments = readComments(`${COMMENTS}\n\n`);
    expect(comments.size).toBe(2);
    expect(comments.get(1)).toContain('removing traffic lanes');
  });
});

describe('registerProblems: the baseline', () => {
  it('accepts a well-formed register', () => {
    expect(problems([candidate()])).toEqual([]);
  });
});

describe('registerProblems: ids', () => {
  it('rejects two candidates sharing an id', () => {
    expect(problems([candidate(), candidate()])).toEqual([
      'id "lanes-removed" appears more than once',
    ]);
  });

  it('rejects two sources sharing an id', () => {
    expect(check({ sources: [source, source], candidates: [candidate()] })).toContain(
      'source id "thread" appears more than once',
    );
  });
});

describe('registerProblems: sources', () => {
  it('rejects a candidate whose source is not in the sources list', () => {
    expect(problems([candidate({ source: 'nowhere' })])).toEqual([
      'lanes-removed: source "nowhere" is not in the sources list',
    ]);
  });

  it("rejects a source whose capture directory does not exist", () => {
    expect(check({ sources: [{ ...source, capture: 'intake/captures/gone' }], candidates: [] })).toEqual([
      'source thread: capture directory "intake/captures/gone" does not exist',
    ]);
  });

  it('rejects a source whose run directory does not exist', () => {
    expect(check({ sources: [{ ...source, run: 'reviews/intake/gone' }], candidates: [] })).toEqual([
      'source thread: run directory "reviews/intake/gone" does not exist',
    ]);
  });

  it('rejects a source kind outside the vocabulary', () => {
    expect(check({ sources: [{ ...source, kind: 'tweet' }], candidates: [] })).toContain(
      'source thread kind: "tweet" is not one of facebook-post, article, discussion, video',
    );
  });
});

describe('registerProblems: investigations', () => {
  it('accepts a question with a claim on each side of it', () => {
    expect(grouped([claim(), otherSide()])).toEqual([]);
  });

  it('rejects two investigations sharing an id', () => {
    expect(grouped([claim(), otherSide()], [investigation(), investigation()])).toContain(
      'investigation id "lanes-and-congestion" appears more than once',
    );
  });

  it('rejects an id that is both an investigation and a claim', () => {
    expect(grouped([claim({ id: 'lanes-and-congestion' })])).toContain(
      'id "lanes-and-congestion" is both an investigation and a claim',
    );
  });

  it('rejects an outcome triage cannot give a question', () => {
    expect(
      grouped([claim(), otherSide()], [investigation({ outcome: 'not-a-claim' })]),
    ).toContain(
      'investigation lanes-and-congestion outcome: "not-a-claim" is not one of GO, PARK, NO',
    );
  });

  for (const outcome of ['PARK', 'NO'] as const) {
    it(`requires a public reason on ${outcome}`, () => {
      expect(
        grouped([claim(), otherSide()], [investigation({ outcome, reason: '  ' })]),
      ).toContain(
        `investigation lanes-and-congestion: outcome ${outcome} needs a public reason sentence`,
      );
    });
  }

  it('requires the question it asks', () => {
    expect(grouped([claim(), otherSide()], [investigation({ question: '' })])).toContain(
      'investigation lanes-and-congestion: needs the question it asks',
    );
  });

  it('rejects a source that is not in the sources list', () => {
    expect(grouped([claim(), otherSide()], [investigation({ source: 'nowhere' })])).toContain(
      'investigation lanes-and-congestion: source "nowhere" is not in the sources list',
    );
  });

  it('rejects a run directory that does not exist', () => {
    expect(
      grouped([claim(), otherSide()], [investigation({ run: 'reviews/intake/gone' })]),
    ).toContain(
      'investigation lanes-and-congestion: run directory "reviews/intake/gone" does not exist',
    );
  });

  it('rejects a question no claim is checked under', () => {
    expect(grouped([])).toContain(
      'investigation lanes-and-congestion: no claim is checked under it',
    );
  });
});

describe('registerProblems: the outcome sits on the investigation', () => {
  it('rejects a claim that carries an outcome as well', () => {
    expect(grouped([claim({ outcome: 'GO' }), otherSide()])).toContain(
      'lanes-removed: triage ruled on its investigation, so it carries no outcome of its own',
    );
  });

  it('rejects a claim with neither an outcome nor an investigation', () => {
    expect(problems([candidate({ outcome: undefined })])).toContain(
      'lanes-removed: needs an investigation to be checked under, or an outcome of its own',
    );
  });

  it('rejects an investigation the investigations list does not have', () => {
    expect(grouped([claim({ investigation: 'invented' }), otherSide()])).toContain(
      'lanes-removed: investigation "invented" is not in the investigations list',
    );
  });

  it('requires the side and the account count on a grouped claim', () => {
    expect(grouped([claim({ side: undefined, accounts: undefined }), otherSide()])).toEqual([
      'investigation lanes-and-congestion: accounts.total 2 is outside its claims\' range 1 to 1',
      'lanes-removed: needs the side of the argument it serves',
      'lanes-removed: needs the number of accounts that argued it',
    ]);
  });

  it('rejects a side outside the vocabulary', () => {
    expect(grouped([claim({ side: 'both' }), otherSide()])).toContain(
      'lanes-removed side: "both" is not one of for, against, neither',
    );
  });

  it('rejects an account count that is not a whole number of accounts', () => {
    expect(grouped([claim({ accounts: 0 }), otherSide()])).toContain(
      'lanes-removed: accounts must be the number of accounts that argued the claim',
    );
  });

  it('rejects variations that are not wordings', () => {
    expect(grouped([claim({ variations: ['a wording', ''] }), otherSide()])).toContain(
      'lanes-removed: variations must be a list of alternative wordings',
    );
  });
});

describe('registerProblems: an investigation’s accounts are derived from its claims', () => {
  it('accepts a total equal to the largest of its claims', () => {
    expect(
      grouped(
        [claim({ accounts: 2 }), otherSide({ accounts: 2 })],
        [investigation({ accounts: { total: 2, against: 2, for: 2 } })],
      ),
    ).toEqual([]);
  });

  it('accepts a total equal to the sum of its claims', () => {
    expect(
      grouped(
        [claim({ accounts: 2 }), otherSide({ accounts: 2 })],
        [investigation({ accounts: { total: 4, against: 2, for: 2 } })],
      ),
    ).toEqual([]);
  });

  it('rejects a total smaller than one of its claims', () => {
    expect(
      grouped(
        [claim({ accounts: 5 }), otherSide()],
        [investigation({ accounts: { total: 4, against: 5, for: 1 } })],
      ),
    ).toEqual([
      "investigation lanes-and-congestion: accounts.total 4 is outside its claims' range 5 to 6",
    ]);
  });

  it('rejects a total larger than every claim counted separately', () => {
    expect(
      grouped([claim(), otherSide()], [investigation({ accounts: { total: 3, against: 2 } })]),
    ).toEqual([
      "investigation lanes-and-congestion: accounts.total 3 is outside its claims' range 1 to 2",
    ]);
  });

  it('rejects a missing total', () => {
    expect(
      grouped([claim(), otherSide()], [investigation({ accounts: { against: 1, for: 1 } })]),
    ).toEqual([
      'investigation lanes-and-congestion: accounts.total must be the number of distinct accounts arguing the question',
    ]);
  });

  it('rejects a side count that is not a whole number of accounts', () => {
    expect(
      grouped([claim(), otherSide()], [investigation({ accounts: { total: 2, against: 1.5 } })]),
    ).toContain('investigation lanes-and-congestion: accounts.against must be a whole number of accounts');
  });
});

describe('registerProblems: variation', () => {
  it('requires variation_of on a variation outcome', () => {
    expect(
      problems([candidate({ outcome: 'variation', reason: 'The same claim, checked there.' })]),
    ).toEqual(['lanes-removed: outcome variation must name the entry it merged into (variation_of)']);
  });

  it('accepts variation_of pointing at another register entry', () => {
    expect(
      problems([
        candidate({
          outcome: 'variation',
          reason: 'The same claim, checked there.',
          variation_of: 'other',
        }),
        candidate({ id: 'other', forms: undefined }),
      ]),
    ).toEqual([]);
  });

  it('accepts variation_of pointing at a published claim', () => {
    expect(
      problems([
        candidate({
          outcome: 'variation',
          reason: 'The same claim, checked there.',
          variation_of: 'wc-too-cold',
        }),
      ]),
    ).toEqual([]);
  });

  it('rejects variation_of that resolves to nothing', () => {
    expect(
      problems([
        candidate({
          outcome: 'variation',
          reason: 'The same claim, checked there.',
          variation_of: 'invented',
        }),
      ]),
    ).toEqual([
      'lanes-removed: variation_of "invented" is neither a register id nor a published claim id',
    ]);
  });
});

describe('registerProblems: reasons', () => {
  for (const outcome of ['PARK', 'NO', 'variation', 'not-a-claim'] as const) {
    it(`requires a reason on ${outcome}`, () => {
      const found = problems([candidate({ outcome, variation_of: 'wc-too-cold' })]);
      expect(found).toContain(`lanes-removed: outcome ${outcome} needs a public reason sentence`);
    });
  }

  it('does not require one on GO', () => {
    expect(problems([candidate()])).toEqual([]);
  });

  it('treats a blank reason as no reason', () => {
    expect(problems([candidate({ outcome: 'NO', reason: '   ' })])).toEqual([
      'lanes-removed: outcome NO needs a public reason sentence',
    ]);
  });
});

describe('registerProblems: captured forms are the commenter’s own words', () => {
  const form = (overrides: Record<string, unknown> = {}) => ({
    commenter: 'Snowy Hare F.',
    quote: 'removing traffic lanes all throughout the city',
    comment: 1,
    ...overrides,
  });

  it('accepts a quote that is an exact substring of the comment it cites', () => {
    expect(problems([candidate({ forms: [form()] })])).toEqual([]);
  });

  it('accepts curly quotes and collapsed whitespace', () => {
    expect(
      problems([
        candidate({
          forms: [form({ quote: 'They signed an "agreement" to make Edmonton a 15 minute city.', comment: 2 })],
        }),
      ]),
    ).toEqual([]);
  });

  it('rejects a quote the commenter did not write', () => {
    expect(problems([candidate({ forms: [form({ quote: 'removing traffic lanes citywide' })] })])).toEqual([
      'lanes-removed forms[0]: the quote is not in comment 1: "removing traffic lanes citywide"',
    ]);
  });

  it('rejects a single dropped word', () => {
    expect(
      problems([candidate({ forms: [form({ quote: 'removing traffic lanes throughout the city' })] })]),
    ).toHaveLength(1);
  });

  it('rejects a quote that is in the capture but not in the comment cited', () => {
    expect(problems([candidate({ forms: [form({ comment: 2 })] })])).toEqual([
      'lanes-removed forms[0]: the quote is not in comment 2: "removing traffic lanes all throughout the city"',
    ]);
  });

  it('rejects a comment index the capture does not have', () => {
    expect(problems([candidate({ forms: [form({ comment: 99 })] })])).toEqual([
      'lanes-removed forms[0]: comment 99 is not in the capture',
    ]);
  });

  it('rejects forms on an entry with no source to check them against', () => {
    expect(problems([candidate({ source: undefined, forms: [form()] })])).toEqual([
      'lanes-removed: forms are quotes out of a capture, so the entry needs a source',
    ]);
  });

  it('requires a pseudonym and an integer comment index', () => {
    const found = problems([
      candidate({ forms: [form({ commenter: '' }), form({ comment: 'one' })] }),
    ]);
    expect(found).toEqual([
      "lanes-removed forms[0]: needs the commenter's pseudonym",
      'lanes-removed forms[1]: comment must be the integer index of the comment in the capture',
    ]);
  });
});

describe('registerProblems: the entries that were already there', () => {
  it('still accepts a hand-registered candidate with no source', () => {
    expect(
      problems([
        {
          id: 'earth-flat',
          recorded: '2026-09-02',
          origin: 'supplied',
          wording: 'Earth is flat',
          outcome: 'NO',
          reason: 'Not a claim about Edmonton, and not shown circulating locally.',
        },
      ]),
    ).toEqual([]);
  });
});
