/**
 * The register is the site's public promise that nothing was cherry-picked, so
 * the rules that keep it honest are worth pinning: a claim's source resolves, a
 * merged claim says what it merged into, every declined disposition carries the
 * sentence `/considered` prints, and — the one that matters most — a quote
 * attributed to a real person is that person's words, not a model's tidy-up.
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

const check = (register: Register, w: RegisterWorld = world()) => registerProblems(register, w);

const problems = (candidates: unknown[], w: RegisterWorld = world()) =>
  check({ sources: [source], candidates }, w);

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
