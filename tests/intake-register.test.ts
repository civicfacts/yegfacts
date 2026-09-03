/**
 * The step between a run and the public register. A hundred-odd claims is where
 * hand-copying starts producing a register that disagrees with the run it came
 * from, so what the conversion does with each field is pinned here.
 *
 * The account counts get the most attention because they are the only numbers
 * here that are derived rather than copied, and a derived number that is wrong
 * misstates how many people are arguing a question.
 *
 * The run's own JSON is read in either spelling — `propositions`/`stories`
 * before D-0029, `claims`/`questions` after it — because dropping the old names
 * would make every archived run unreproducible. Both are exercised below.
 */
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import {
  registerEntries,
  toYamlBlock,
  type Groups,
  type Merged,
  type Triage,
} from '../scripts/intake-register.ts';

const source = { id: 'thread', run: 'reviews/intake/thread' };

const merged: Merged = {
  claims: [
    {
      id: 'lanes-removed',
      claim: 'Edmonton is removing traffic lanes across the city to build bike lanes.',
      side: 'against',
      from: { haiku: ['e-001'], luna: ['e-004', 'e-005'] },
      forms: [
        { index: 3, commenter: 'Snowy Hare F.', quote: 'removing traffic lanes', seats: ['haiku'] },
        { index: 9, commenter: 'Quiet Goose B.', quote: 'a lane gone on every street' },
      ],
    },
    {
      id: 'lanes-removed-everywhere',
      claim: 'Traffic lanes have been taken out on streets all over Edmonton.',
      side: 'against',
      from: { flash: ['e-011'] },
      // The first repeats a form of `lanes-removed` exactly; the third is the
      // same person saying the same words in a different comment, which the
      // register cannot tell apart once the comment index is gone.
      forms: [
        { index: 3, commenter: 'Snowy Hare F.', quote: 'removing traffic lanes' },
        { index: 12, commenter: 'Bright Goose S.', quote: 'they took a lane off my street' },
        { index: 15, commenter: 'Snowy Hare F.', quote: 'removing traffic lanes' },
      ],
    },
    {
      id: 'congestion-eased',
      claim: 'Edmonton bike lanes reduce traffic congestion.',
      side: 'for',
      from: { flash: ['e-002'] },
      // The same person who argued the other way above.
      forms: [{ index: 7, commenter: 'Quiet Goose B.', quote: 'bikes cut congestion' }],
    },
    {
      id: 'councillor-allegation',
      claim: 'A named councillor did something wrong.',
      side: 'neither',
      names_person: true,
      from: { haiku: ['e-009'] },
      forms: [{ index: 40, commenter: 'Granite Hare D.', quote: 'he did it' }],
    },
  ],
  dropped: [{ seat: 'haiku', id: 'e-100', reason: 'not a claim' }],
};

const groups: Groups = {
  questions: [
    {
      id: 'road-space',
      question: 'What happened to the traffic lanes?',
      note: 'The City’s own conversion record answers all of it at once.',
      claims: [
        {
          id: 'lanes-removed',
          claim: merged.claims![0]!.claim,
          merged_from: ['lanes-removed', 'lanes-removed-everywhere'],
        },
        {
          id: 'congestion-eased',
          claim: merged.claims![2]!.claim,
          merged_from: ['congestion-eased'],
        },
      ],
    },
    {
      id: 'who-sits-on-council',
      question: 'What have councillors disclosed?',
      claims: [
        {
          id: 'councillor-allegation',
          claim: merged.claims![3]!.claim,
          merged_from: ['councillor-allegation'],
        },
      ],
    },
  ],
};

const triage: Triage = {
  decisions: [
    { id: 'road-space', outcome: 'GO', reason: 'City route records can answer a defined version.' },
    {
      id: 'who-sits-on-council',
      outcome: 'PARK',
      reason: 'An allegation about an individual, with no right of reply.',
    },
  ],
};

/** A default parameter would swallow an explicit `undefined`, which is the case
 *  that matters most here, so the argument is always passed. */
const run = (t: Triage | undefined) => registerEntries(merged, groups, t, source, '2026-09-03');

const claim = (id: string) => run(triage).claims.find((entry) => entry.id === id)!;

describe('question entries', () => {
  it('is one entry per question, in groups.json’s order', () => {
    expect(run(triage).questions.map((entry) => entry.id)).toEqual([
      'road-space',
      'who-sits-on-council',
    ]);
  });

  /**
   * Three state fields, never one. A freshly registered question is registered,
   * triaged and unpublished, and the generator says so rather than leaving a
   * later reader to infer two of the three from the third.
   */
  it('carries the three state fields, the reason and the grouping note', () => {
    expect(run(triage).questions[0]).toEqual({
      id: 'road-space',
      recorded: '2026-09-03',
      source: 'thread',
      question: 'What happened to the traffic lanes?',
      lifecycle: 'registered',
      triage: 'go',
      publication: 'unpublished',
      reason: 'City route records can answer a defined version.',
      grouping_note: 'The City’s own conversion record answers all of it at once.',
      accounts: { total: 3, for: 1, against: 3 },
      run: 'reviews/intake/thread',
    });
  });

  it('maps the triage reader’s PARK onto the register’s vocabulary', () => {
    expect(run(triage).questions[1]!.triage).toBe('park');
  });

  it('omits the grouping note when the question has none', () => {
    expect('grouping_note' in run(triage).questions[1]!).toBe(false);
  });

  it('counts somebody who argued both ways on both sides, so the sides can outsum the total', () => {
    const { accounts } = run(triage).questions[0]!;
    // Snowy Hare F., Quiet Goose B. and Bright Goose S. argued the question;
    // Quiet Goose B. argued it both ways.
    expect(accounts.total).toBe(3);
    expect(accounts.for! + accounts.against!).toBeGreaterThan(accounts.total);
  });

  it('omits a side nobody argued', () => {
    expect(run(triage).questions[0]!.accounts.neither).toBeUndefined();
    expect(run(triage).questions[1]!.accounts).toEqual({ total: 1, neither: 1 });
  });
});

describe('claim entries', () => {
  it('is one entry per claim, in question order', () => {
    expect(run(triage).claims.map((entry) => entry.id)).toEqual([
      'lanes-removed',
      'congestion-eased',
      'councillor-allegation',
    ]);
  });

  it('says which question rules on it and never carries state of its own', () => {
    for (const entry of run(triage).claims) {
      expect(entry.question).toBeTruthy();
      for (const field of ['triage', 'lifecycle', 'publication', 'reason']) {
        expect(field in entry).toBe(false);
      }
    }
  });

  it('shows the canonical plain sentence as the proposition and the first wording as the wording', () => {
    expect(claim('lanes-removed')).toMatchObject({
      recorded: '2026-09-03',
      origin: 'captured',
      source: 'thread',
      question: 'road-space',
      proposition: merged.claims![0]!.claim,
      wording: 'removing traffic lanes',
      side: 'against',
      accounts: 3,
      seats: ['flash', 'haiku', 'luna'],
    });
  });

  /**
   * The register keeps no comment index, so the same words from the same person
   * are one wording however many comments they appear in — printing them six
   * times under one pseudonym would misrepresent the thread. The same words
   * from two people stay two.
   */
  it('collapses a wording repeated by one person and keeps two people saying the same thing', () => {
    expect(claim('lanes-removed').variations).toEqual([
      { wording: 'removing traffic lanes', source_id: 'thread', author_name: 'Snowy Hare F.' },
      { wording: 'a lane gone on every street', source_id: 'thread', author_name: 'Quiet Goose B.' },
      {
        wording: 'they took a lane off my street',
        source_id: 'thread',
        author_name: 'Bright Goose S.',
      },
    ]);
  });

  it('names the source on every wording, since a claim may hold wordings from several', () => {
    for (const variation of claim('lanes-removed').variations ?? []) {
      expect(variation.source_id).toBe('thread');
    }
  });

  it('passes names_person through, so the site can withhold the entry', () => {
    expect(claim('councillor-allegation').names_person).toBe(true);
    expect('names_person' in claim('lanes-removed')).toBe(false);
  });

  it('throws on a claim citing a merged claim the merge does not have', () => {
    const invented: Groups = {
      questions: [
        {
          id: 'road-space',
          question: 'What happened to the traffic lanes?',
          claims: [{ id: 'nowhere', claim: 'Nothing.', merged_from: ['not-in-merged'] }],
        },
      ],
    };
    expect(() => registerEntries(merged, invented, triage, source, '2026-09-03')).toThrow(
      /not-in-merged/,
    );
  });
});

/**
 * A run merged and grouped before D-0029 says `propositions`, `proposition`,
 * `stories` and `variations`. It has to produce exactly what the new spelling
 * produces, or the archived runs stop reproducing the register they built.
 */
describe('a run written in the old vocabulary', () => {
  const oldMerged: Merged = {
    propositions: merged.claims!.map(({ claim: text, ...rest }) => ({
      ...rest,
      proposition: text,
    })),
  };
  const oldGroups: Groups = {
    stories: groups.questions!.map((question) => ({
      ...question,
      claims: question.claims.map(({ claim: text, merged_from, ...rest }) => ({
        ...rest,
        proposition: text,
        variations: merged_from,
      })),
    })),
  };

  it('produces the same questions and claims as the new spelling', () => {
    expect(registerEntries(oldMerged, oldGroups, triage, source, '2026-09-03')).toEqual(
      run(triage),
    );
  });
});

describe('registerEntries without a triage', () => {
  /**
   * An untriaged run is working, not a record. The generator prints the
   * question with no triage answer at all, which the register's validator
   * rejects — the failure is the point.
   */
  it('leaves every question with no triage answer and no reason', () => {
    const { questions } = run(undefined);
    expect(questions.every((entry) => !('triage' in entry))).toBe(true);
    expect(questions.every((entry) => !('reason' in entry))).toBe(true);
  });

  it('still records the lifecycle and the publication state', () => {
    for (const entry of run(undefined).questions) {
      expect(entry.lifecycle).toBe('registered');
      expect(entry.publication).toBe('unpublished');
    }
  });

  it('reports nothing as untriaged, because nothing was triaged', () => {
    expect(run(undefined).untriaged).toEqual([]);
  });

  it('still derives the claims and their counts', () => {
    expect(run(undefined).claims).toEqual(run(triage).claims);
  });
});

describe('registerEntries with a triage that missed a question', () => {
  it('names it, and leaves it with no triage answer', () => {
    const { questions, untriaged } = registerEntries(
      merged,
      groups,
      { decisions: triage.decisions.filter((decision) => decision.id !== 'road-space') },
      source,
      '2026-09-03',
    );
    expect(untriaged).toEqual(['road-space']);
    expect('triage' in questions[0]!).toBe(false);
  });
});

describe('toYamlBlock', () => {
  it('indents to sit under a top-level key and parses back to the entries', () => {
    const block = toYamlBlock(run(triage).claims);
    expect(block.startsWith('  - id: lanes-removed')).toBe(true);
    expect(parse(`claims:\n${block}`).claims).toEqual(run(triage).claims);
  });

  it('quotes the prose and the dates and leaves ids, sides and seats plain', () => {
    const block = toYamlBlock(run(triage).claims);
    expect(block).toContain('    recorded: "2026-09-03"');
    expect(block).toContain('    wording: "removing traffic lanes"');
    expect(block).toContain('    side: against');
    expect(block).toContain('      - flash');
  });

  /**
   * `question` is prose on a question and a slug on a claim, so the questions
   * block asks for it to be quoted and the claims block does not. Quoting a
   * claim's question would make every regenerated block differ from the
   * register in style rather than content.
   */
  it('quotes a question’s prose and leaves a claim’s question id plain', () => {
    expect(toYamlBlock(run(triage).questions, 'question')).toContain(
      '    question: "What happened to the traffic lanes?"',
    );
    expect(toYamlBlock(run(triage).claims)).toContain('    question: road-space');
  });

  it('parses a questions block back to the entries too', () => {
    const block = toYamlBlock(run(triage).questions, 'question');
    expect(parse(`questions:\n${block}`).questions).toEqual(run(triage).questions);
  });
});
