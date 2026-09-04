/**
 * The two rules that need a base commit.
 *
 * Both were written down and neither ran. The methodology changelog's own
 * header announced the second of them as a CI requirement while it sat as a
 * TODO in the validator, and a change under methodology/ shipped clean the same
 * night. So the tests here are mostly about the shapes that must FAIL: a rule
 * nobody has watched fail is indistinguishable from the rule that was never
 * written.
 *
 * The exemptions get tests too, because each is an argument that could be
 * quietly widened later. methodology/audits/ reports on the method; the
 * changelog is the record of the method. Neither is the method.
 */
import { describe, expect, it } from 'vitest';
import { diffRuleProblems, governsMethodologyVersion, type DiffWorld } from '../scripts/lib/diff-rules.ts';

const CHANGELOG = (versions: string[]) =>
  versions.map((version) => `- version: "${version}"\n  date: "2026-09-03"\n`).join('');

const STORY = (notes: string[]) =>
  `---\ntitle: A story\nchangelog:\n${notes
    .map((note) => `  - date: "2026-09-03"\n    type: updated\n    note: "${note}"\n`)
    .join('')}---\n\nbody\n`;

const CLAIM = (finding: string, agreement = 'Unanimous') =>
  `id: c1\nstory: s1\nfinding: ${finding}\npanel_agreement: ${agreement}\n`;

function world(
  changed: string[],
  base: Record<string, string>,
  head: Record<string, string>,
): DiffWorld {
  return {
    changed: changed.map((path) => ({ path, status: 'M' })),
    base: (path) => base[path],
    head: (path) => head[path],
  };
}

describe('governsMethodologyVersion', () => {
  it('covers the four paths the spec names', () => {
    expect(governsMethodologyVersion('prompts/intake-merge.md')).toBe(true);
    expect(governsMethodologyVersion('scripts/merge.ts')).toBe(true);
    expect(governsMethodologyVersion('scripts/merge-published-questions.ts')).toBe(true);
    expect(governsMethodologyVersion('scripts/synthesize.ts')).toBe(true);
    expect(governsMethodologyVersion('methodology/exposure-audit.md')).toBe(true);
  });

  it('exempts the records that report on the method rather than change it', () => {
    expect(governsMethodologyVersion('methodology/audits/exposure/2026-09-03.md')).toBe(false);
    expect(governsMethodologyVersion('methodology/changelog.yaml')).toBe(false);
  });

  it('does not widen past the spec’s wording', () => {
    expect(governsMethodologyVersion('scripts/validate.ts')).toBe(false);
    expect(governsMethodologyVersion('scripts/synthesis-matrix.ts')).toBe(false);
    expect(governsMethodologyVersion('src/pages/index.astro')).toBe(false);
  });
});

describe('the methodology version rule', () => {
  it('fails a method change that adds no version', () => {
    const problems = diffRuleProblems(
      world(
        ['prompts/intake-merge.md'],
        { 'methodology/changelog.yaml': CHANGELOG(['1.19']) },
        { 'methodology/changelog.yaml': CHANGELOG(['1.19']) },
      ),
    );
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('prompts/intake-merge.md');
    expect(problems[0]).toContain('no new version entry');
  });

  it('passes the same change once a version is added', () => {
    expect(
      diffRuleProblems(
        world(
          ['prompts/intake-merge.md', 'methodology/changelog.yaml'],
          { 'methodology/changelog.yaml': CHANGELOG(['1.19']) },
          { 'methodology/changelog.yaml': CHANGELOG(['1.19', '1.20']) },
        ),
      ),
    ).toEqual([]);
  });

  it('does not ask a version of an audit record or of the changelog itself', () => {
    expect(
      diffRuleProblems(
        world(
          ['methodology/audits/exposure/2026-09-03.md', 'methodology/changelog.yaml'],
          { 'methodology/changelog.yaml': CHANGELOG(['1.19']) },
          { 'methodology/changelog.yaml': CHANGELOG(['1.19']) },
        ),
      ),
    ).toEqual([]);
  });

  it('is not satisfied by re-wording an existing entry', () => {
    const problems = diffRuleProblems(
      world(
        ['scripts/merge.ts', 'methodology/changelog.yaml'],
        { 'methodology/changelog.yaml': '- version: "1.19"\n  date: "2026-09-03"\n  note: old\n' },
        { 'methodology/changelog.yaml': '- version: "1.19"\n  date: "2026-09-03"\n  note: new\n' },
      ),
    );
    expect(problems).toHaveLength(1);
  });
});

describe('the story changelog rule', () => {
  it('fails a finding that changed without the story saying so', () => {
    const problems = diffRuleProblems(
      world(
        ['src/content/claims/c1.yaml'],
        { 'src/content/claims/c1.yaml': CLAIM('Not established'), 'src/content/stories/s1.mdx': STORY(['a']) },
        { 'src/content/claims/c1.yaml': CLAIM('Contradicted'), 'src/content/stories/s1.mdx': STORY(['a']) },
      ),
    );
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('"Not established" → "Contradicted"');
  });

  it('fails a changed panel_agreement just as hard', () => {
    expect(
      diffRuleProblems(
        world(
          ['src/content/claims/c1.yaml'],
          { 'src/content/claims/c1.yaml': CLAIM('Contradicted'), 'src/content/stories/s1.mdx': STORY(['a']) },
          { 'src/content/claims/c1.yaml': CLAIM('Contradicted', 'Split'), 'src/content/stories/s1.mdx': STORY(['a']) },
        ),
      ),
    ).toHaveLength(1);
  });

  it('passes once the story gains an entry', () => {
    expect(
      diffRuleProblems(
        world(
          ['src/content/claims/c1.yaml', 'src/content/stories/s1.mdx'],
          { 'src/content/claims/c1.yaml': CLAIM('Not established'), 'src/content/stories/s1.mdx': STORY(['a']) },
          { 'src/content/claims/c1.yaml': CLAIM('Contradicted'), 'src/content/stories/s1.mdx': STORY(['a', 'b']) },
        ),
      ),
    ).toEqual([]);
  });

  it('ignores a claim edited anywhere but its finding and agreement', () => {
    expect(
      diffRuleProblems(
        world(
          ['src/content/claims/c1.yaml'],
          { 'src/content/claims/c1.yaml': `${CLAIM('Contradicted')}answer: old\n`, 'src/content/stories/s1.mdx': STORY(['a']) },
          { 'src/content/claims/c1.yaml': `${CLAIM('Contradicted')}answer: new\n`, 'src/content/stories/s1.mdx': STORY(['a']) },
        ),
      ),
    ).toEqual([]);
  });

  it('treats a claim added with a finding as a finding that changed', () => {
    expect(
      diffRuleProblems(
        world(
          ['src/content/claims/c1.yaml'],
          { 'src/content/stories/s1.mdx': STORY(['a']) },
          { 'src/content/claims/c1.yaml': CLAIM('Contradicted'), 'src/content/stories/s1.mdx': STORY(['a']) },
        ),
      ),
    ).toHaveLength(1);
  });

  it('says nothing about a deleted claim', () => {
    expect(
      diffRuleProblems(
        world(
          ['src/content/claims/c1.yaml'],
          { 'src/content/claims/c1.yaml': CLAIM('Contradicted'), 'src/content/stories/s1.mdx': STORY(['a']) },
          { 'src/content/stories/s1.mdx': STORY(['a']) },
        ),
      ),
    ).toEqual([]);
  });
});
