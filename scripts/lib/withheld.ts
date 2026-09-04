/**
 * Fingerprints for text a right-of-reply decline withholds.
 *
 * When triage declines a claim because it accuses a named person and the site
 * has no right of reply to offer, the register keeps the row, the outcome and
 * the reason, and nothing else: no proposition, no wording, and a neutral id.
 * The words themselves live only in the private board record.
 *
 * The repository is public, so "not on the register" is not the same as "not
 * published". A run artifact written before the entry was cleaned can carry the
 * wording, or a descriptive slug that summarises it, and a slug is published as
 * surely as a paragraph is. `scripts/exposure-audit.ts` checks the tracked tree
 * for both — which it can only do if it knows what to look for, and it must
 * learn that without the strings being committed anywhere.
 *
 * So the check works on digests. This module normalises text to a token stream,
 * hashes a fixed-length window of it with a committed salt, and compares the
 * result against `intake/withheld-fingerprints.yaml`. Anyone holding the plain
 * text can confirm a fingerprint matches it; nobody reading the fingerprint file
 * can read the text back out of it. The salt is committed, so this is obfuscation
 * against a reader, not secrecy against an attacker who already has a candidate
 * string — which is the right threat, because the harm here is a passer-by
 * finding an accusation in a run file.
 */
import { createHash } from 'node:crypto';
import { repoPath, loadYaml } from './repo.ts';

export type Fingerprint = {
  /** Tokens in the normalised window, i.e. the window width to hash. */
  tokens: number;
  /** Characters in the normalised window. A cheap prefilter before hashing. */
  chars: number;
  sha256: string;
};

export type WithheldEntry = {
  /** The neutral register id this text was withheld under. */
  id: string;
  fingerprints: Fingerprint[];
  /** Tracked paths where a match is expected and allowed, with the reason why. */
  allow?: { path: string; reason: string }[];
};

export type WithheldFile = { salt: string; entries: WithheldEntry[] };

export const WITHHELD_FINGERPRINTS = 'intake/withheld-fingerprints.yaml';

export function loadWithheld(): WithheldFile {
  return loadYaml<WithheldFile>(repoPath('intake', 'withheld-fingerprints.yaml'));
}

/**
 * Lower-case words and digit runs, nothing else. Punctuation, case and hyphens
 * all collapse, so `a-descriptive-slug` and the same words written out in a
 * sentence normalise to the same token stream and fingerprint identically.
 */
export function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

export function digest(salt: string, tokens: string[]): string {
  return createHash('sha256').update(`${salt}:${tokens.join(' ')}`).digest('hex');
}

/** The fingerprint of a whole plain string — what the generator commits. */
export function fingerprintOf(salt: string, text: string): Fingerprint {
  const tokens = tokenise(text);
  return {
    tokens: tokens.length,
    chars: tokens.join(' ').length,
    sha256: digest(salt, tokens),
  };
}

export type Match = { fingerprint: Fingerprint; offset: number };

/**
 * Every window of `text` whose fingerprint is in `fingerprints`, with the
 * character offset in the original text where the window starts.
 *
 * Hashing every window of every tracked file at every width would be the whole
 * audit's runtime, so the character count filters first: a window is hashed only
 * when its normalised length already matches. That rejects almost everything for
 * the cost of two array lookups.
 */
export function findMatches(salt: string, fingerprints: Fingerprint[], text: string): Match[] {
  if (fingerprints.length === 0) return [];
  const tokens: string[] = [];
  const offsets: number[] = [];
  for (const hit of text.toLowerCase().matchAll(/[a-z0-9]+/g)) {
    tokens.push(hit[0]);
    offsets.push(hit.index);
  }
  // cumulative[i] is the total characters of tokens[0..i-1], so a window's
  // normalised length is the token characters plus the joining spaces.
  const cumulative = [0];
  for (const token of tokens) cumulative.push(cumulative[cumulative.length - 1]! + token.length);

  const matches: Match[] = [];
  const widths = [...new Set(fingerprints.map((f) => f.tokens))];
  for (const width of widths) {
    const wanted = fingerprints.filter((f) => f.tokens === width);
    for (let start = 0; start + width <= tokens.length; start += 1) {
      const chars = cumulative[start + width]! - cumulative[start]! + (width - 1);
      const candidates = wanted.filter((f) => f.chars === chars);
      if (candidates.length === 0) continue;
      const hash = digest(salt, tokens.slice(start, start + width));
      for (const fingerprint of candidates) {
        if (fingerprint.sha256 === hash) matches.push({ fingerprint, offset: offsets[start]! });
      }
    }
  }
  return matches;
}

export function lineOf(text: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < text.length; i += 1) if (text[i] === '\n') line += 1;
  return line;
}
