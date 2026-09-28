/**
 * The source-list disclosure for carried documents (methodology v1.41,
 * D-0046 rule 6). No published story carries a document yet, so a fixture
 * manifest drives it: the data path picks out carried rows only, and the
 * component renders the label, the City link, the method link, the
 * same-copy note and the byte hash.
 */
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import CarriedLabel from '../src/components/CarriedLabel.astro';
import {
  CARRIED_ITEMS_LABEL,
  CARRIED_ITEMS_UNPUBLISHABLE,
  CARRIED_LABEL,
  CARRIED_METHOD_HREF,
  SELECTION_RULE_HREF,
  carriedSources,
} from '../src/lib/carried';

const FIXTURE_ROOT = fileURLToPath(new URL('./fixtures/carried', import.meta.url));
const RUN = 'reviews/fixture-story/2026-01-01';

describe('carried-document label', () => {
  it('reads only carried rows from a run manifest, and nothing from a run without one', () => {
    const carried = carriedSources([RUN, 'reviews/no-such-run/2026-01-01'], FIXTURE_ROOT);
    expect([...carried.keys()]).toEqual(['YF-EV-9001', 'YF-EV-9003']);
    expect(carried.get('YF-EV-9001')!.kind).toBe('document');
    expect(carried.get('YF-EV-9003')!.kind).toBe('items');
    expect(carriedSources(['reviews/no-such-run/2026-01-01'], FIXTURE_ROOT).size).toBe(0);
  });

  it.each([
    ['a missing url', { url: undefined }],
    ['a url that is not https', { url: 'javascript:alert(1)' }],
    ['a missing archive hash', { archive: {} }],
    ['an archive hash that is not 64 hex', { archive: { sha256: 1234 } }],
    ['a minutes-items row with no rule version', { kind: 'minutes-items' }],
  ])('fails loudly on a carried row with %s', (_label, override) => {
    const dir = mkdtempSync(path.join(tmpdir(), 'yegfacts-carried-label-'));
    try {
      mkdirSync(path.join(dir, RUN, 'carried'), { recursive: true });
      const doc = {
        registry_id: 'YF-EV-9001',
        url: 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=1',
        status: 'carried',
        archive: { sha256: 'a'.repeat(64) },
        ...override,
      };
      writeFileSync(path.join(dir, RUN, 'carried', 'manifest.yaml'), JSON.stringify({ documents: [doc] }));
      expect(() => carriedSources([RUN], dir)).toThrow(/documents\[0\] is carried but has a missing or invalid/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('renders the label with the City link, the method link, the same-copy note and the hash', async () => {
    const source = carriedSources([RUN], FIXTURE_ROOT).get('YF-EV-9001')!;
    const container = await AstroContainer.create();
    const html = await container.renderToString(CarriedLabel, { props: { source } });
    expect(html).toContain(CARRIED_LABEL);
    expect(html).toContain('All reviewers read the same copy.');
    expect(html).toContain('href="https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=1"');
    expect(html).toContain(`href="${CARRIED_METHOD_HREF}"`);
    expect(html).toContain('1111111111111111111111111111111111111111111111111111111111111111');
  });

  it('renders the selected-items label with the City page, the rule, the item index and the publishing limit', async () => {
    const source = carriedSources([RUN], FIXTURE_ROOT).get('YF-EV-9003')!;
    const container = await AstroContainer.create();
    const html = await container.renderToString(CarriedLabel, { props: { source } });
    expect(html).toContain(CARRIED_ITEMS_LABEL);
    expect(html).toContain(CARRIED_ITEMS_UNPUBLISHABLE);
    expect(html).toContain('data-carried-kind="items"');
    expect(html).toContain('Meeting.aspx?Agenda=PostMinutes&amp;Id=00000000-0000-0000-0000-000000000000');
    expect(html).toContain(`href="${SELECTION_RULE_HREF}"`);
    expect(html).toContain('The rule (v1)');
    expect(html).toContain('href="https://github.com/civicfacts/yegfacts/blob/main/reviews/fixture-story/2026-01-01/carried/manifest.yaml"');
    expect(html).toContain(`href="${CARRIED_METHOD_HREF}"`);
    expect(html).not.toContain(CARRIED_LABEL);
  });
});
