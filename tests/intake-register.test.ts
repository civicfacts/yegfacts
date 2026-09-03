/**
 * The step between a run and the public register. Sixty-odd propositions is
 * where hand-copying starts producing a register that disagrees with the run it
 * came from, so what the conversion does with each field is pinned here.
 */
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { registerEntries, toYamlBlock } from '../scripts/intake-register.ts';

const source = { id: 'thread', run: 'reviews/intake/thread' };

const merged = {
  propositions: [
    {
      id: 'lanes-removed',
      proposition: 'Edmonton is removing traffic lanes across the city to build bike lanes.',
      side: 'against',
      relation: 'new' as const,
      commenters: 12,
      from: { haiku: ['e-001'], luna: ['e-004', 'e-005'] },
      forms: [
        { index: 3, commenter: 'Snowy Hare F.', quote: 'removing traffic lanes', seats: ['haiku'] },
        { index: 9, commenter: 'Quiet Goose B.', quote: 'a lane gone on every street, all over town', seats: ['luna'] },
      ],
    },
    {
      id: 'congestion',
      proposition: 'Edmonton bike lanes reduce traffic congestion.',
      side: 'for',
      relation: { 'variation-of': 'at-congestion-reduced' },
      commenters: 17,
      from: { flash: ['e-002'] },
      forms: [{ index: 7, commenter: 'Bright Goose S.', quote: 'bikes cut congestion' }],
    },
    {
      id: 'councillor-allegation',
      proposition: 'A named councillor did something wrong.',
      side: 'neither',
      relation: 'new' as const,
      commenters: 3,
      names_person: true,
      from: { haiku: ['e-009'] },
      forms: [{ index: 40, commenter: 'Granite Hare D.', quote: 'he did it' }],
    },
  ],
  dropped: [{ seat: 'haiku', id: 'e-100', reason: 'not a claim' }],
};

const triage = {
  decisions: [
    { id: 'lanes-removed', outcome: 'GO', reason: 'City route records can answer a defined version.' },
    { id: 'congestion', outcome: 'GO', reason: 'Triage would have taken it.' },
    { id: 'councillor-allegation', outcome: 'PARK', reason: 'An allegation about an individual, with no right of reply.' },
  ],
};

/** A default parameter would swallow an explicit `undefined`, which is the case
 *  that matters most here, so the argument is always passed. */
const run = (t: typeof triage | undefined) => registerEntries(merged, t, source, '2026-09-03');

describe('registerEntries', () => {
  it('keeps merged.json’s order', () => {
    expect(run(triage).entries.map((entry) => entry.id)).toEqual([
      'lanes-removed',
      'congestion',
      'councillor-allegation',
    ]);
  });

  it('carries the triage outcome and its reason', () => {
    const [entry] = run(triage).entries;
    expect(entry).toMatchObject({
      outcome: 'GO',
      reason: 'City route records can answer a defined version.',
      origin: 'captured',
      source: 'thread',
      recorded: '2026-09-03',
      side: 'against',
      commenters: 12,
      seats: ['haiku', 'luna'],
    });
  });

  it('shows the merge’s plain sentence as the proposition and the first captured quote as the wording', () => {
    const [entry] = run(triage).entries;
    expect(entry.proposition).toBe(merged.propositions[0].proposition);
    expect(entry.wording).toBe('removing traffic lanes');
  });

  it('renames the merge’s comment index to the register’s `comment`', () => {
    expect(run(triage).entries[0].forms).toEqual([
      { commenter: 'Snowy Hare F.', quote: 'removing traffic lanes', comment: 3 },
      { commenter: 'Quiet Goose B.', quote: 'a lane gone on every street, all over town', comment: 9 },
    ]);
  });

  it('makes a variation a variation whatever triage said about it', () => {
    const entry = run(triage).entries[1];
    expect(entry.outcome).toBe('variation');
    expect(entry.variation_of).toBe('at-congestion-reduced');
    expect(entry.reason).toContain('at-congestion-reduced');
  });

  it('passes names_person through, so the site can withhold the entry', () => {
    expect(run(triage).entries[2].names_person).toBe(true);
    expect(run(triage).entries[0].names_person).toBeUndefined();
  });

  it('omits an absent field rather than writing it null', () => {
    const entry = run(triage).entries[0];
    expect('variation_of' in entry).toBe(false);
    expect('names_person' in entry).toBe(false);
  });
});

describe('registerEntries without a triage', () => {
  it('records every unmerged proposition as pre-triage', () => {
    const { entries } = run(undefined);
    expect(entries.map((entry) => entry.outcome)).toEqual([
      'pre-triage',
      'variation',
      'pre-triage',
    ]);
  });

  it('reports nothing as untriaged, because nothing was triaged', () => {
    expect(run(undefined).untriaged).toEqual([]);
  });
});

describe('registerEntries with a triage that missed a proposition', () => {
  it('names it on the way to pre-triage', () => {
    const { entries, untriaged } = run({
      decisions: triage.decisions.filter((decision) => decision.id !== 'lanes-removed'),
    });
    expect(untriaged).toEqual(['lanes-removed']);
    expect(entries[0].outcome).toBe('pre-triage');
  });

  it('does not count a variation as missing, since triage is not asked about one', () => {
    expect(run({ decisions: [] }).untriaged).toEqual([
      'lanes-removed',
      'councillor-allegation',
    ]);
  });
});

describe('toYamlBlock', () => {
  it('indents to sit under `candidates:` and parses back to the entries', () => {
    const block = toYamlBlock(run(triage).entries);
    expect(block.startsWith('  - id: lanes-removed')).toBe(true);
    expect(parse(`candidates:\n${block}`).candidates).toEqual(run(triage).entries);
  });
});
