/**
 * The WITHHELD LEAK class in `scripts/exposure-audit.ts` guards text this
 * repository is not allowed to hold, which means the test for it cannot hold
 * that text either. So the matching behaviour is pinned against a made-up
 * sentence, and the live data is checked only for the structural property that
 * actually failed once: a claim declined on right-of-reply grounds with nothing
 * in the fingerprint file to check it against.
 *
 * The behaviour worth pinning is that a slug and a sentence made of the same
 * words fingerprint identically. The leak this class was written for was a
 * descriptive slug, not the prose it summarised, and a check that only caught
 * the prose would have missed it.
 */
import { describe, expect, it } from 'vitest';
import { repoPath, loadYaml } from '../scripts/lib/repo.ts';
import { fingerprintOf, findMatches, loadWithheld, tokenise } from '../scripts/lib/withheld.ts';

const SALT = 'test-salt';
const SECRET = 'The lighthouse keeper repainted the north stairwell';

describe('fingerprint matching', () => {
  const fingerprint = fingerprintOf(SALT, SECRET);

  it('finds the text verbatim inside a larger file', () => {
    const text = `line one\n${SECRET} in the spring.\nline three\n`;
    expect(findMatches(SALT, [fingerprint], text)).toHaveLength(1);
  });

  it('finds the same words written as a hyphenated slug', () => {
    const slug = tokenise(SECRET).join('-');
    expect(findMatches(SALT, [fingerprint], `  - id: ${slug}\n`)).toHaveLength(1);
  });

  it('ignores punctuation and case', () => {
    expect(findMatches(SALT, [fingerprint], '"The LIGHTHOUSE-keeper, repainted the North stairwell!"')).toHaveLength(1);
  });

  it('does not match a near miss', () => {
    expect(findMatches(SALT, [fingerprint], 'The lighthouse keeper repainted the south stairwell')).toHaveLength(0);
  });

  it('does not match a subset of the words', () => {
    expect(findMatches(SALT, [fingerprint], 'The lighthouse keeper repainted the')).toHaveLength(0);
  });

  it('reports the offset of every occurrence', () => {
    const text = `${SECRET}. Later: ${SECRET}.`;
    const matches = findMatches(SALT, [fingerprint], text);
    expect(matches).toHaveLength(2);
    expect(matches[0]!.offset).toBe(0);
    expect(matches[1]!.offset).toBeGreaterThan(0);
  });

  it('is salted, so the same text under another salt does not match', () => {
    expect(findMatches('other-salt', [fingerprint], SECRET)).toHaveLength(0);
  });
});

type RegisterClaim = { id?: string; ground?: string };

describe('the live fingerprint file', () => {
  const withheld = loadWithheld();

  it('covers every right-of-reply decline on the register', () => {
    const register = loadYaml<{ claims?: RegisterClaim[] }>(repoPath('intake', 'register.yaml'));
    const declined = (register.claims ?? [])
      .filter((claim) => claim.ground === 'right-of-reply')
      .map((claim) => claim.id);
    expect(declined.length).toBeGreaterThan(0);
    const covered = withheld.entries
      .filter((entry) => entry.fingerprints.length > 0)
      .map((entry) => entry.id);
    for (const id of declined) expect(covered).toContain(id);
  });

  it('gives every exemption a stated reason', () => {
    for (const entry of withheld.entries) {
      for (const exemption of entry.allow ?? []) {
        expect(exemption.path).toBeTruthy();
        expect(exemption.reason?.trim().length ?? 0).toBeGreaterThan(20);
      }
    }
  });
});
