/**
 * Run manifests and synthesis output are stamped with the current methodology
 * version. The changelog is written newest-first, and an earlier reading of
 * "last entry" stamped "1.0" on every run for weeks; the stamp must be the
 * highest version regardless of file order.
 */
import { describe, expect, it } from 'vitest';
import { currentMethodologyVersion, highestMethodologyVersion, loadMethodologyChangelog } from '../scripts/lib/repo.ts';

const entry = (version: string) => ({ version, date: '2026-09-01' });

describe('highestMethodologyVersion', () => {
  it('picks the highest version when the file is newest-first', () => {
    expect(highestMethodologyVersion([entry('1.6'), entry('1.5'), entry('1.0')])).toBe('1.6');
  });

  it('picks the highest version when the file is oldest-first', () => {
    expect(highestMethodologyVersion([entry('1.0'), entry('1.5'), entry('1.6')])).toBe('1.6');
  });

  it('compares numerically, not lexically', () => {
    expect(highestMethodologyVersion([entry('1.9'), entry('1.10')])).toBe('1.10');
  });

  it('rejects an empty changelog', () => {
    expect(() => highestMethodologyVersion([])).toThrow('no entries');
  });

  it('agrees with the real changelog head', () => {
    expect(currentMethodologyVersion()).toBe(String(loadMethodologyChangelog()[0].version));
  });
});
