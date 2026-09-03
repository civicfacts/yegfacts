/**
 * The step between a run and the public register. A hundred-odd propositions is
 * where hand-copying starts producing a register that disagrees with the run it
 * came from, so what the conversion does with each field is pinned here.
 *
 * The account counts get the most attention because they are the only numbers
 * here that are derived rather than copied, and a derived number that is wrong
 * misstates how many people are arguing a question.
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
  propositions: [
    {
      id: 'lanes-removed',
      proposition: 'Edmonton is removing traffic lanes across the city to build bike lanes.',
      side: 'against',
      relation: 'new',
      from: { haiku: ['e-001'], luna: ['e-004', 'e-005'] },
      forms: [
        { index: 3, commenter: 'Snowy Hare F.', quote: 'removing traffic lanes', seats: ['haiku'] },
        { index: 9, commenter: 'Quiet Goose B.', quote: 'a lane gone on every street' },
      ],
    },
    {
      id: 'lanes-removed-everywhere',
      proposition: 'Traffic lanes have been taken out on streets all over Edmonton.',
      side: 'against',
      relation: 'new',
      from: { flash: ['e-011'] },
      // The first repeats a form of `lanes-removed` exactly; the third quotes
      // the same words out of a different comment.
      forms: [
        { index: 3, commenter: 'Snowy Hare F.', quote: 'removing traffic lanes' },
        { index: 12, commenter: 'Bright Goose S.', quote: 'they took a lane off my street' },
        { index: 15, commenter: 'Snowy Hare F.', quote: 'removing traffic lanes' },
      ],
    },
    {
      id: 'congestion-eased',
      proposition: 'Edmonton bike lanes reduce traffic congestion.',
      side: 'for',
      relation: { 'variation-of': 'at-congestion-reduced' },
      from: { flash: ['e-002'] },
      // The same account that argued the other way above.
      forms: [{ index: 7, commenter: 'Quiet Goose B.', quote: 'bikes cut congestion' }],
    },
    {
      id: 'lanes-gone-again',
      proposition: 'Another Edmonton street lost a traffic lane.',
      side: 'against',
      relation: { 'variation-of': 'lanes-removed' },
      from: { luna: ['e-020'] },
      forms: [{ index: 20, commenter: 'Snowy Hare F.', quote: 'gone again' }],
    },
    {
      id: 'councillor-allegation',
      proposition: 'A named councillor did something wrong.',
      side: 'neither',
      relation: 'new',
      names_person: true,
      from: { haiku: ['e-009'] },
      forms: [{ index: 40, commenter: 'Granite Hare D.', quote: 'he did it' }],
    },
  ],
  dropped: [{ seat: 'haiku', id: 'e-100', reason: 'not a claim' }],
};

const groups: Groups = {
  stories: [
    {
      id: 'road-space',
      question: 'What happened to the traffic lanes?',
      note: 'The City’s own conversion record answers all of it at once.',
      claims: [
        {
          id: 'lanes-removed',
          proposition: merged.propositions[0]!.proposition,
          variations: ['lanes-removed', 'lanes-removed-everywhere'],
        },
        {
          id: 'congestion-eased',
          proposition: merged.propositions[2]!.proposition,
          variations: ['congestion-eased'],
        },
        {
          id: 'lanes-gone-again',
          proposition: merged.propositions[3]!.proposition,
          variations: ['lanes-gone-again'],
        },
      ],
    },
    {
      id: 'who-sits-on-council',
      question: 'What have councillors disclosed?',
      claims: [
        {
          id: 'councillor-allegation',
          proposition: merged.propositions[4]!.proposition,
          variations: ['councillor-allegation'],
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

describe('investigation entries', () => {
  it('is one entry per story, in groups.json’s order', () => {
    expect(run(triage).investigations.map((entry) => entry.id)).toEqual([
      'road-space',
      'who-sits-on-council',
    ]);
  });

  it('carries the triage outcome, its reason and the grouping note', () => {
    expect(run(triage).investigations[0]).toEqual({
      id: 'road-space',
      recorded: '2026-09-03',
      source: 'thread',
      question: 'What happened to the traffic lanes?',
      outcome: 'GO',
      reason: 'City route records can answer a defined version.',
      grouping_note: 'The City’s own conversion record answers all of it at once.',
      accounts: { total: 3, for: 1, against: 3 },
      run: 'reviews/intake/thread',
    });
  });

  it('omits the grouping note when the story has none', () => {
    expect('grouping_note' in run(triage).investigations[1]!).toBe(false);
  });

  it('counts an account that argued both ways on both sides, so the sides can outsum the total', () => {
    const { accounts } = run(triage).investigations[0]!;
    // Snowy Hare F., Quiet Goose B. and Bright Goose S. argued the question;
    // Quiet Goose B. argued it both ways.
    expect(accounts.total).toBe(3);
    expect(accounts.for! + accounts.against!).toBeGreaterThan(accounts.total);
  });

  it('omits a side nobody argued', () => {
    expect(run(triage).investigations[0]!.accounts.neither).toBeUndefined();
    expect(run(triage).investigations[1]!.accounts).toEqual({ total: 1, neither: 1 });
  });
});

describe('claim entries', () => {
  it('is one entry per claim, in story order', () => {
    expect(run(triage).claims.map((entry) => entry.id)).toEqual([
      'lanes-removed',
      'congestion-eased',
      'lanes-gone-again',
      'councillor-allegation',
    ]);
  });

  it('says which investigation rules on it and never carries an outcome of its own', () => {
    for (const entry of run(triage).claims) {
      expect(entry.investigation).toBeTruthy();
      expect('outcome' in entry).toBe(false);
      expect('reason' in entry).toBe(false);
    }
  });

  it('shows the canonical plain sentence as the proposition and the first captured quote as the wording', () => {
    expect(claim('lanes-removed')).toMatchObject({
      recorded: '2026-09-03',
      origin: 'captured',
      source: 'thread',
      investigation: 'road-space',
      proposition: merged.propositions[0]!.proposition,
      wording: 'removing traffic lanes',
      side: 'against',
      accounts: 3,
      seats: ['flash', 'haiku', 'luna'],
    });
  });

  it('lists the other wordings when the claim folds in more than one proposition', () => {
    expect(claim('lanes-removed').variations).toEqual([
      'Traffic lanes have been taken out on streets all over Edmonton.',
    ]);
  });

  it('omits variations when the claim is a single proposition', () => {
    expect('variations' in claim('congestion-eased')).toBe(false);
  });

  it('de-duplicates forms on the comment and the quote, and keeps the same words said twice', () => {
    expect(claim('lanes-removed').forms).toEqual([
      { commenter: 'Snowy Hare F.', quote: 'removing traffic lanes', comment: 3 },
      { commenter: 'Quiet Goose B.', quote: 'a lane gone on every street', comment: 9 },
      { commenter: 'Bright Goose S.', quote: 'they took a lane off my street', comment: 12 },
      { commenter: 'Snowy Hare F.', quote: 'removing traffic lanes', comment: 15 },
    ]);
  });

  it('carries a variation_of that points at something already registered', () => {
    expect(claim('congestion-eased').variation_of).toBe('at-congestion-reduced');
  });

  it('drops a variation_of that points inside the run, which the grouping has already settled', () => {
    expect('variation_of' in claim('lanes-gone-again')).toBe(false);
  });

  it('passes names_person through, so the site can withhold the entry', () => {
    expect(claim('councillor-allegation').names_person).toBe(true);
    expect('names_person' in claim('lanes-removed')).toBe(false);
  });

  it('throws on a claim citing a proposition the merge does not have', () => {
    const invented: Groups = {
      stories: [
        {
          id: 'road-space',
          question: 'What happened to the traffic lanes?',
          claims: [{ id: 'nowhere', proposition: 'Nothing.', variations: ['not-in-merged'] }],
        },
      ],
    };
    expect(() => registerEntries(merged, invented, triage, source, '2026-09-03')).toThrow(
      /not-in-merged/,
    );
  });
});

describe('registerEntries without a triage', () => {
  it('records every investigation as not-triaged, with no reason', () => {
    const { investigations } = run(undefined);
    expect(investigations.map((entry) => entry.outcome)).toEqual(['not-triaged', 'not-triaged']);
    expect(investigations.every((entry) => !('reason' in entry))).toBe(true);
  });

  it('reports nothing as untriaged, because nothing was triaged', () => {
    expect(run(undefined).untriaged).toEqual([]);
  });

  it('still derives the claims and their counts', () => {
    expect(run(undefined).claims).toEqual(run(triage).claims);
  });
});

describe('registerEntries with a triage that missed a story', () => {
  it('names it on the way to not-triaged', () => {
    const { investigations, untriaged } = registerEntries(
      merged,
      groups,
      { decisions: triage.decisions.filter((decision) => decision.id !== 'road-space') },
      source,
      '2026-09-03',
    );
    expect(untriaged).toEqual(['road-space']);
    expect(investigations[0]!.outcome).toBe('not-triaged');
  });
});

describe('toYamlBlock', () => {
  it('indents to sit under a top-level key and parses back to the entries', () => {
    const block = toYamlBlock(run(triage).claims);
    expect(block.startsWith('  - id: lanes-removed')).toBe(true);
    expect(parse(`candidates:\n${block}`).candidates).toEqual(run(triage).claims);
  });

  it('quotes the prose and the dates and leaves ids, sides and seats plain', () => {
    const block = toYamlBlock(run(triage).claims);
    expect(block).toContain('    recorded: "2026-09-03"');
    expect(block).toContain('    wording: "removing traffic lanes"');
    expect(block).toContain('    side: against');
    expect(block).toContain('      - flash');
  });

  it('parses an investigations block back to the entries too', () => {
    const block = toYamlBlock(run(triage).investigations);
    expect(parse(`investigations:\n${block}`).investigations).toEqual(run(triage).investigations);
  });
});
