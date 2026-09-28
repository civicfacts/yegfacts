/**
 * The source-list disclosure for carried documents (methodology v1.41,
 * D-0046 rule 6). No published story carries a document yet, so a fixture
 * manifest drives it: the data path picks out carried rows only, and the
 * component renders the label, the City link, the method link, the
 * same-copy note and the byte hash.
 */
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import CarriedLabel from '../src/components/CarriedLabel.astro';
import { CARRIED_LABEL, CARRIED_METHOD_HREF, carriedSources } from '../src/lib/carried';

const FIXTURE_ROOT = fileURLToPath(new URL('./fixtures/carried', import.meta.url));
const RUN = 'reviews/fixture-story/2026-01-01';

describe('carried-document label', () => {
  it('reads only carried rows from a run manifest, and nothing from a run without one', () => {
    const carried = carriedSources([RUN, 'reviews/no-such-run/2026-01-01'], FIXTURE_ROOT);
    expect([...carried.keys()]).toEqual(['YF-EV-9001']);
    expect(carriedSources(['reviews/no-such-run/2026-01-01'], FIXTURE_ROOT).size).toBe(0);
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
});
