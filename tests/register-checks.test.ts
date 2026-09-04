/**
 * The register is the site's public promise that nothing was cherry-picked, so
 * the rules that keep it honest are worth pinning: a claim's question resolves,
 * a question's source and run resolve, every declined disposition carries the
 * sentence the register publishes, and — the two that matter most — a wording
 * attributed to a real person is that person's words, and the person is a
 * pseudonym the capture actually uses.
 *
 * The state rules matter almost as much. State sits on the question, in three
 * fields from three vocabularies, and never on a claim. Opposite claims under
 * one question are deliberate and must validate; what must not is a claim ruled
 * on twice, or ruled on nowhere.
 */
import { describe, expect, it } from 'vitest';
import {
  normaliseQuote,
  readCapture,
  registerProblems,
  type Register,
  type RegisterWorld,
} from '../scripts/lib/register-checks.ts';

const CAPTURE = 'intake/captures/thread';

const COMMENTS = [
  {
    index: 1,
    commenter: 'Snowy Hare F.',
    text: 'The city is removing traffic lanes all throughout the city for bike lanes.',
  },
  {
    index: 2,
    commenter: 'Boreal Hare I.',
    text: 'They   signed an “agreement” to make\nEdmonton a 15 minute city.',
  },
]
  .map((row) => JSON.stringify(row))
  .join('\n');

/** A world where the one source's directories exist. */
function world(overrides: Partial<RegisterWorld> = {}): RegisterWorld {
  return {
    exists: () => true,
    isDirectory: (path) => path === CAPTURE || path === 'reviews/intake/thread',
    capture: (path: string) => (path === CAPTURE ? readCapture(COMMENTS) : undefined),
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

/** One question, with the triage call on it. What a claim is checked under. */
function question(overrides: Record<string, unknown> = {}) {
  return {
    id: 'lanes-and-congestion',
    recorded: '2026-09-02',
    source: 'thread',
    question: "Do Edmonton's bike lanes ease congestion or make it worse?",
    lifecycle: 'registered',
    triage: 'go',
    publication: 'unpublished',
    reason: 'Before-and-after traffic counts on the converted corridors can answer it.',
    accounts: { total: 2, against: 1, for: 1 },
    run: 'reviews/intake/thread',
    ...overrides,
  };
}

/** A claim inside that question: no state of its own, ever. */
function claim(overrides: Record<string, unknown> = {}) {
  return {
    id: 'lanes-removed',
    recorded: '2026-09-02',
    origin: 'captured',
    source: 'thread',
    question: 'lanes-and-congestion',
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

/** One question with two claims under it: the shape everything else varies. */
const grouped = (
  claims: unknown[],
  questions: unknown[] = [question()],
  w: RegisterWorld = world(),
) => check({ sources: [source], questions, claims }, w);

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

describe('readCapture', () => {
  it('reads a JSONL capture as its comments and its commenter labels', () => {
    const capture = readCapture(`${COMMENTS}\n\n`);
    expect(capture.comments).toHaveLength(2);
    expect(capture.comments[0]).toContain('removing traffic lanes');
    expect([...capture.commenters].sort()).toEqual(['Boreal Hare I.', 'Snowy Hare F.']);
  });
});

describe('registerProblems: the baseline', () => {
  it('accepts a question with a claim on each side of it', () => {
    expect(grouped([claim(), otherSide()])).toEqual([]);
  });
});

describe('registerProblems: ids', () => {
  it('rejects two claims sharing an id', () => {
    expect(grouped([claim(), claim()])).toContain('id "lanes-removed" appears more than once');
  });

  it('rejects two questions sharing an id', () => {
    expect(grouped([claim(), otherSide()], [question(), question()])).toContain(
      'question id "lanes-and-congestion" appears more than once',
    );
  });

  // Questions and claims are served from one URL namespace, so a shared id is
  // two pages fighting over one address.
  it('rejects an id that is both a question and a claim', () => {
    expect(grouped([claim({ id: 'lanes-and-congestion' }), otherSide()])).toContain(
      'id "lanes-and-congestion" is both a question and a claim',
    );
  });

  it('rejects two sources sharing an id', () => {
    expect(check({ sources: [source, source], questions: [question()], claims: [] })).toContain(
      'source id "thread" appears more than once',
    );
  });
});

describe('registerProblems: sources', () => {
  it('rejects a claim whose source is not in the sources list', () => {
    expect(grouped([claim({ source: 'nowhere' }), otherSide()])).toContain(
      'lanes-removed: source "nowhere" is not in the sources list',
    );
  });

  it('rejects a source whose capture directory does not exist', () => {
    expect(check({ sources: [{ ...source, capture: 'intake/captures/gone' }], claims: [] })).toEqual(
      ['source thread: capture directory "intake/captures/gone" does not exist'],
    );
  });

  it('rejects a source whose run directory does not exist', () => {
    expect(check({ sources: [{ ...source, run: 'reviews/intake/gone' }], claims: [] })).toEqual([
      'source thread: run directory "reviews/intake/gone" does not exist',
    ]);
  });

  it('rejects a source kind outside the vocabulary', () => {
    expect(check({ sources: [{ ...source, kind: 'tweet' }], claims: [] })).toContain(
      'source thread kind: "tweet" is not one of facebook-post, article, discussion, video',
    );
  });

  /**
   * The completeness promise is made about the source, so what the merge set
   * aside is published on it. A wording with no reason is a proposition
   * quietly dropped, which is the thing whole-source intake exists to prevent.
   */
  it('accepts a set-aside proposition with a wording and a reason', () => {
    expect(
      check({
        sources: [{ ...source, set_aside: [{ wording: 'Taxes will go up.', reason: 'not a claim — a prediction.' }] }],
        claims: [],
      }),
    ).toEqual([]);
  });

  it('rejects a set-aside proposition with no reason', () => {
    expect(
      check({ sources: [{ ...source, set_aside: [{ wording: 'Taxes will go up.' }] }], claims: [] }),
    ).toContain('source thread set_aside[0]: needs the reason it was set aside');
  });

  it('rejects a set-aside proposition carrying anything else', () => {
    expect(
      check({
        sources: [
          {
            ...source,
            set_aside: [{ wording: 'Taxes will go up.', reason: 'not a claim.', commenter: 'Snowy Hare F.' }],
          },
        ],
        claims: [],
      }),
    ).toContain(
      'source thread set_aside[0]: carries "commenter"; a set-aside proposition is a wording and a reason',
    );
  });
});

describe('registerProblems: a question carries all three state fields', () => {
  for (const field of ['lifecycle', 'triage', 'publication'] as const) {
    it(`rejects a question with no ${field}`, () => {
      expect(
        grouped([claim(), otherSide()], [question({ [field]: undefined })]).join('\n'),
      ).toContain(`question lanes-and-congestion: needs a ${field}`);
    });
  }

  it('rejects a lifecycle outside its vocabulary', () => {
    expect(grouped([claim(), otherSide()], [question({ lifecycle: 'done' })])).toContain(
      'question lanes-and-congestion lifecycle: "done" is not one of registered, briefed, panel-complete, gate-complete',
    );
  });

  // Triage has three answers and only three. `variation` was a claim relation
  // and `not-a-claim` belongs to the source record; both left the vocabulary.
  for (const triage of ['variation', 'not-a-claim', 'GO'] as const) {
    it(`rejects "${triage}" as a triage answer`, () => {
      expect(grouped([claim(), otherSide()], [question({ triage })])).toContain(
        `question lanes-and-congestion triage: "${triage}" is not one of go, park, no`,
      );
    });
  }

  it('rejects a publication state outside its vocabulary', () => {
    expect(grouped([claim(), otherSide()], [question({ publication: 'live' })])).toContain(
      'question lanes-and-congestion publication: "live" is not one of unpublished, published, corrected, withdrawn',
    );
  });

  it('accepts a question that has been through the gate and withdrawn', () => {
    expect(
      grouped(
        [claim(), otherSide()],
        [question({ lifecycle: 'gate-complete', publication: 'withdrawn' })],
      ),
    ).toEqual([]);
  });

  /**
   * A published question holding claims that carry no finding is correct, not a
   * defect: the site answered a question, and people have gone on making claims
   * about it that have not been checked. A claim either has a finding or it
   * does not, which is a fact about the data rather than a state to model, so
   * nothing here may demand one.
   *
   * This is the live shape of `winter-cycling` and `active-transportation`,
   * which are published and hold Yegscoop claims nobody has checked.
   */
  it('accepts a published question whose claims carry no finding', () => {
    expect(
      grouped(
        [claim(), otherSide()],
        [question({ lifecycle: 'gate-complete', publication: 'published' })],
      ),
    ).toEqual([]);
  });

  for (const triage of ['park', 'no'] as const) {
    it(`requires a public reason on ${triage}`, () => {
      expect(grouped([claim(), otherSide()], [question({ triage, reason: '  ' })])).toContain(
        `question lanes-and-congestion: triage ${triage} needs a public reason sentence`,
      );
    });
  }

  it('does not require one on go', () => {
    expect(grouped([claim(), otherSide()], [question({ reason: undefined })])).toEqual([]);
  });
});

describe('registerProblems: questions', () => {
  it('requires the question it asks', () => {
    expect(grouped([claim(), otherSide()], [question({ question: '' })])).toContain(
      'question lanes-and-congestion: needs the question it asks',
    );
  });

  it('rejects a source that is not in the sources list', () => {
    expect(grouped([claim(), otherSide()], [question({ source: 'nowhere' })])).toContain(
      'question lanes-and-congestion: source "nowhere" is not in the sources list',
    );
  });

  it('rejects a run directory that does not exist', () => {
    expect(grouped([claim(), otherSide()], [question({ run: 'reviews/intake/gone' })])).toContain(
      'question lanes-and-congestion: run directory "reviews/intake/gone" does not exist',
    );
  });

  /**
   * The seven questions registered one at a time, before whole-source intake,
   * name no source and no run. Half the pair is what is wrong: a question out
   * of a source whose working cannot be found.
   */
  it('accepts a question registered before there were sources', () => {
    expect(
      check({
        sources: [source],
        questions: [
          {
            id: 'earth-flat',
            recorded: '2026-09-02',
            question: 'Is the Earth flat?',
            lifecycle: 'registered',
            triage: 'no',
            publication: 'unpublished',
            registered_as: 'Earth is flat',
            reason: 'Neither a factual claim about Edmonton nor one shown circulating locally.',
          },
        ],
        claims: [],
      }),
    ).toEqual([]);
  });

  it('rejects a question that names a source but no run', () => {
    expect(grouped([claim(), otherSide()], [question({ run: undefined })])).toContain(
      'question lanes-and-congestion: a question out of a source names both its source and its run, or neither',
    );
  });

  it('rejects a triage report path that does not resolve', () => {
    expect(
      grouped([claim(), otherSide()], [question({ triage_report: 'nope.md' })], world({ exists: () => false })),
    ).toContain('question lanes-and-congestion: triage_report record "nope.md" does not exist');
  });

  it('rejects a question out of a source that no claim is checked under', () => {
    expect(grouped([])).toContain('question lanes-and-congestion: no claim is checked under it');
  });
});

describe('registerProblems: state sits on the question, not the claim', () => {
  it('rejects a claim that carries a triage of its own', () => {
    expect(grouped([claim({ triage: 'go' }), otherSide()]).join('\n')).toContain(
      'lanes-removed: triage ruled on its question, so it carries no triage of its own',
    );
  });

  for (const field of ['lifecycle', 'publication'] as const) {
    it(`rejects a claim that carries a ${field}`, () => {
      expect(grouped([claim({ [field]: 'registered' }), otherSide()])).toContain(
        `lanes-removed: ${field} is the question's, so a claim never carries one`,
      );
    });
  }

  // The one exception, and it is the charter's: an accusation against a named
  // person is declined even where the question around it is worth running.
  it('allows a claim declined on the right-of-reply ground', () => {
    expect(
      grouped([
        claim({
          triage: 'no',
          ground: 'right-of-reply',
          names_person: true,
          reason: 'The question around it is going ahead; this claim is not.',
          proposition: undefined,
          wording: undefined,
        }),
        otherSide(),
      ]),
    ).toEqual([]);
  });

  it('refuses a withheld claim that still carries the wording', () => {
    expect(
      grouped([
        claim({ triage: 'no', ground: 'right-of-reply', names_person: true, reason: 'A reason.' }),
        otherSide(),
      ]).join('\n'),
    ).toContain('must carry no proposition');
  });

  it('refuses a withheld claim that still carries its variations', () => {
    expect(
      grouped([
        claim({
          triage: 'no',
          ground: 'right-of-reply',
          names_person: true,
          reason: 'A reason.',
          proposition: undefined,
          wording: undefined,
          variations: [
            { wording: 'removing traffic lanes', source_id: 'thread', author_name: 'Snowy Hare F.' },
          ],
        }),
        otherSide(),
      ]).join('\n'),
    ).toContain('must carry no variations');
  });

  it('refuses a right-of-reply ground on anything but a decline', () => {
    expect(
      grouped([
        claim({ triage: 'park', ground: 'right-of-reply', names_person: true, reason: 'A reason.' }),
        otherSide(),
      ]).join('\n'),
    ).toContain('only ever accompanies a triage of no');
  });

  it('requires names_person on a right-of-reply decline', () => {
    expect(
      grouped([
        claim({
          triage: 'no',
          ground: 'right-of-reply',
          reason: 'A reason.',
          proposition: undefined,
          wording: undefined,
        }),
        otherSide(),
      ]),
    ).toContain(
      'lanes-removed: declined on the right-of-reply ground, so it must be marked names_person',
    );
  });

  // The second exception, and it is the run's: a claim the panel answered that
  // the record turned out to be unable to carry (methodology v1.24).
  it('allows a claim parked on the no-instrument ground, keeping its wording', () => {
    expect(
      grouped([
        claim({
          triage: 'park',
          ground: 'no-instrument',
          reason: 'The only instrument covers autumn weekdays; it reopens on a full-year survey.',
        }),
        otherSide(),
      ]),
    ).toEqual([]);
  });

  it('refuses a no-instrument ground on anything but a park', () => {
    expect(
      grouped([
        claim({ triage: 'go', ground: 'no-instrument', reason: 'A reason.' }),
        otherSide(),
      ]).join('\n'),
    ).toContain('only ever accompanies a triage of park');
  });

  it('requires a reason on a no-instrument park, which is what the reader is shown', () => {
    expect(
      grouped([claim({ triage: 'park', ground: 'no-instrument' }), otherSide()]).join('\n'),
    ).toContain('parked on the no-instrument ground, so it needs the reason a reader is shown');
  });

  it('requires a reason on a right-of-reply decline, which is all a reader gets', () => {
    expect(
      grouped([
        claim({
          triage: 'no',
          ground: 'right-of-reply',
          names_person: true,
          proposition: undefined,
          wording: undefined,
        }),
        otherSide(),
      ]),
    ).toContain('lanes-removed: withheld, so the reason is all a reader gets and it cannot be empty');
  });
});

describe('registerProblems: a claim belongs to a question', () => {
  it('rejects a claim with no question at all', () => {
    expect(grouped([claim({ question: undefined }), otherSide()])).toContain(
      'lanes-removed: needs the question it is checked under',
    );
  });

  it('rejects a question the questions list does not have', () => {
    expect(grouped([claim({ question: 'invented' }), otherSide()])).toContain(
      'lanes-removed: question "invented" is not in the questions list',
    );
  });

  it('requires the side and the account count', () => {
    expect(grouped([claim({ side: undefined, accounts: undefined }), otherSide()])).toEqual([
      "question lanes-and-congestion: accounts.total 2 is outside its claims' range 1 to 1",
      'lanes-removed: needs the side of the argument it serves',
      'lanes-removed: needs the number of people who argued it',
    ]);
  });

  it('rejects a side outside the vocabulary', () => {
    expect(grouped([claim({ side: 'both' }), otherSide()])).toContain(
      'lanes-removed side: "both" is not one of for, against, neither',
    );
  });

  it('rejects an account count that is not a whole number of people', () => {
    expect(grouped([claim({ accounts: 0 }), otherSide()])).toContain(
      'lanes-removed: accounts must be the number of people who argued the claim',
    );
  });

  it('rejects an origin outside the vocabulary', () => {
    expect(grouped([claim({ origin: 'invented' }), otherSide()])).toContain(
      'lanes-removed origin: "invented" is not one of captured, supplied, editor',
    );
  });
});

describe('registerProblems: a question’s accounts are derived from its claims', () => {
  it('accepts a total equal to the largest of its claims', () => {
    expect(
      grouped(
        [claim({ accounts: 2 }), otherSide({ accounts: 2 })],
        [question({ accounts: { total: 2, against: 1, for: 1 } })],
      ),
    ).toEqual([]);
  });

  it('accepts a total equal to the sum of its claims', () => {
    expect(
      grouped(
        [claim({ accounts: 2 }), otherSide({ accounts: 2 })],
        [question({ accounts: { total: 4, against: 2, for: 2 } })],
      ),
    ).toEqual([]);
  });

  it('rejects a total smaller than one of its claims', () => {
    expect(
      grouped(
        [claim({ accounts: 5 }), otherSide()],
        [question({ accounts: { total: 4, against: 3, for: 1 } })],
      ),
    ).toEqual([
      "question lanes-and-congestion: accounts.total 4 is outside its claims' range 5 to 6",
    ]);
  });

  it('rejects a total larger than every claim counted separately', () => {
    expect(
      grouped([claim(), otherSide()], [question({ accounts: { total: 3, against: 2, for: 1 } })]),
    ).toEqual([
      "question lanes-and-congestion: accounts.total 3 is outside its claims' range 1 to 2",
    ]);
  });

  it('rejects a missing total', () => {
    expect(
      grouped([claim(), otherSide()], [question({ accounts: { against: 1, for: 1 } })]),
    ).toEqual([
      'question lanes-and-congestion: accounts.total must be the number of distinct people arguing the question',
    ]);
  });

  it('rejects a side count that is not a whole number of people', () => {
    expect(
      grouped([claim(), otherSide()], [question({ accounts: { total: 2, against: 1.5, for: 1 } })]),
    ).toContain('question lanes-and-congestion: accounts.against must be a whole number of people');
  });
});

/**
 * The register says the split is the total broken down by side, so it has to
 * add up to it. Three questions published a split that overshot, each because
 * one person had argued on two sides and been counted on both, and the header
 * described a check that did not exist.
 */
describe('registerProblems: a question’s split adds up to its total', () => {
  it('accepts a split that adds up', () => {
    expect(
      grouped([claim(), otherSide()], [question({ accounts: { total: 2, against: 1, for: 1 } })]),
    ).toEqual([]);
  });

  it('counts a side that is not listed as nobody', () => {
    expect(
      grouped([claim(), otherSide()], [question({ accounts: { total: 2, against: 2 } })]),
    ).toEqual([]);
  });

  it('rejects a split that counts one person on two sides', () => {
    expect(
      grouped(
        [claim({ accounts: 2 }), otherSide({ accounts: 2 })],
        [question({ accounts: { total: 3, against: 2, for: 2 } })],
      ),
    ).toEqual([
      'question lanes-and-congestion: accounts.total 3 is not the 4 its for/against/neither split adds up to',
    ]);
  });

  it('rejects a split that leaves somebody out', () => {
    expect(
      grouped([claim(), otherSide()], [question({ accounts: { total: 2, against: 1 } })]),
    ).toEqual([
      'question lanes-and-congestion: accounts.total 2 is not the 1 its for/against/neither split adds up to',
    ]);
  });

  it('says nothing about the sum when a side is not a whole number', () => {
    expect(
      grouped([claim(), otherSide()], [question({ accounts: { total: 2, against: 1.5, for: 1 } })]),
    ).toEqual(['question lanes-and-congestion: accounts.against must be a whole number of people']);
  });
});

/**
 * The claim-level decision v1.16 superseded. Eleven propositions two readers
 * had independently refused became live claims under going-ahead questions with
 * no trace of the refusal, and the next brief author would have paid for a
 * panel run to find out what those two readers already knew. Recording it is not
 * giving a claim state back: the question still decides whether the work
 * happens.
 */
describe('registerProblems: a superseded claim-level decision', () => {
  const prior = (overrides: Record<string, unknown> = {}) => ({
    outcome: 'no',
    readers: ['gpt-5.6-sol', 'Gemini 3.1 Pro'],
    reason: 'Both readers took it for a truism neither side of the argument disputes.',
    ...overrides,
  });

  it('accepts an outcome, the readers who reached it and their reason', () => {
    expect(grouped([claim({ prior_triage: prior() }), otherSide()])).toEqual([]);
  });

  it('rejects an outcome outside the triage vocabulary', () => {
    expect(
      grouped([claim({ prior_triage: prior({ outcome: 'not-a-claim' }) }), otherSide()]),
    ).toEqual(['lanes-removed prior_triage outcome: "not-a-claim" is not one of go, park, no']);
  });

  it('rejects a decision with only one reader behind it', () => {
    expect(
      grouped([claim({ prior_triage: prior({ readers: ['gpt-5.6-sol'] }) }), otherSide()]),
    ).toEqual(['lanes-removed: prior_triage must name the two or more readers who reached it']);
  });

  it('rejects a reader with no name', () => {
    expect(
      grouped([claim({ prior_triage: prior({ readers: ['gpt-5.6-sol', ' '] }) }), otherSide()]),
    ).toEqual(['lanes-removed: prior_triage must name the two or more readers who reached it']);
  });

  it('rejects a decision that does not say why, which is the part that saves the run', () => {
    expect(grouped([claim({ prior_triage: prior({ reason: '  ' }) }), otherSide()])).toEqual([
      'lanes-removed: prior_triage needs the reason those readers gave',
    ]);
  });

  it('rejects a field beyond the three, so the record cannot grow a state', () => {
    expect(grouped([claim({ prior_triage: prior({ triage: 'no' }) }), otherSide()])).toEqual([
      'lanes-removed: prior_triage carries "triage"; it is an outcome, its readers and a reason',
    ]);
  });

  it('rejects anything that is not a mapping', () => {
    expect(grouped([claim({ prior_triage: 'no' }), otherSide()])).toEqual([
      'lanes-removed: prior_triage must be a mapping of outcome, readers and reason',
    ]);
  });

  // The one claim that carries a decline of its own carries a live one. A
  // superseded decline beside it would say it had been ruled on twice.
  it('refuses it on a claim withheld on the right-of-reply ground', () => {
    expect(
      grouped([
        claim({
          triage: 'no',
          ground: 'right-of-reply',
          names_person: true,
          reason: 'The question around it is going ahead; this claim is not.',
          proposition: undefined,
          wording: undefined,
          prior_triage: prior(),
        }),
        otherSide(),
      ]),
    ).toEqual([
      'lanes-removed: declined on the right-of-reply ground, so its decline is live, not prior',
    ]);
  });
});

/**
 * The rule the whole file exists for. A model that reworded a comment — dropped
 * a clause, fixed a typo, stitched two sentences — has put words in a real
 * person's mouth, and the register is published.
 */
describe('registerProblems: a variation is somebody’s own words', () => {
  const variation = (overrides: Record<string, unknown> = {}) => ({
    wording: 'removing traffic lanes all throughout the city',
    source_id: 'thread',
    author_name: 'Snowy Hare F.',
    ...overrides,
  });

  const withVariations = (...rows: unknown[]) =>
    grouped([claim({ variations: rows }), otherSide()]);

  it('accepts a wording that is an exact substring of a comment in the capture', () => {
    expect(withVariations(variation())).toEqual([]);
  });

  it('accepts curly quotes and collapsed whitespace', () => {
    expect(
      withVariations(
        variation({
          wording: 'They signed an "agreement" to make Edmonton a 15 minute city.',
          author_name: 'Boreal Hare I.',
        }),
      ),
    ).toEqual([]);
  });

  it('rejects a wording nobody in the capture wrote', () => {
    expect(withVariations(variation({ wording: 'removing traffic lanes citywide' }))).toEqual([
      'lanes-removed variations[0]: the wording is in no comment in thread\'s capture: "removing traffic lanes citywide"',
    ]);
  });

  it('rejects a single dropped word', () => {
    expect(
      withVariations(variation({ wording: 'removing traffic lanes throughout the city' })),
    ).toHaveLength(1);
  });

  /**
   * The wording has to be inside one comment, not spread across two. Joining
   * the capture into one string would let a phrase that straddles a boundary
   * pass, and that phrase is nobody's sentence.
   */
  it('rejects a wording stitched out of two different comments', () => {
    expect(
      withVariations(variation({ wording: 'for bike lanes. They signed an "agreement"' })),
    ).toHaveLength(1);
  });

  /**
   * The second rule, and the reason it exists: `author_name` invites a real
   * name, and the pseudonym scheme dies the first time one is written there.
   */
  it('rejects an author who is not a commenter in the capture', () => {
    expect(withVariations(variation({ author_name: 'Jane Doe' }))).toEqual([
      'lanes-removed variations[0]: author_name "Jane Doe" is not a commenter in thread\'s capture',
    ]);
  });

  it('rejects a variation whose source_id is not in the sources list', () => {
    expect(withVariations(variation({ source_id: 'nowhere' }))).toEqual([
      'lanes-removed variations[0]: source_id "nowhere" is not in the sources list',
    ]);
  });

  it('requires the wording and the pseudonym', () => {
    expect(withVariations(variation({ wording: '' }), variation({ author_name: '' }))).toEqual([
      'lanes-removed variations[0]: needs the wording',
      "lanes-removed variations[1]: needs the author's pseudonym",
    ]);
  });

  it('rejects variations that are not mappings', () => {
    expect(withVariations('a wording')).toEqual([
      'lanes-removed variations[0]: must be a mapping of wording, source_id and author_name',
    ]);
  });

  /**
   * A capture that cannot be read is reported by the directory rule; the
   * wording rules stay quiet rather than reporting the same defect again as
   * dozens of false quote failures.
   */
  it('stays quiet when the capture itself is unreadable', () => {
    expect(
      grouped([claim({ variations: [variation()] }), otherSide()], [question()], world({ capture: () => undefined })),
    ).toEqual([]);
  });
});
