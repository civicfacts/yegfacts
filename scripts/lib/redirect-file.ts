/**
 * `public/_redirects`, as a pure function of `redirects.yaml` and the register.
 *
 * Cloudflare Pages serves `_redirects` before static files, so this file is the
 * one thing standing between a published address and a 404. It is generated
 * rather than hand-kept: every question id and every claim id was once a
 * `/considered/<id>` address, and nobody should have to remember to add a line
 * for a question registered tomorrow.
 *
 * Generated and committed rather than emitted at build time, because a routing
 * table nobody can read in a diff is a routing table nobody reviews.
 * `scripts/build-redirects.ts` writes it and `scripts/validate.ts` fails the
 * build if the committed file is not what this function produces, so it cannot
 * go stale.
 *
 * One rule the shape has to keep: no wildcard may cover `/questions/*` or
 * `/claims/*`, or it swallows the real pages. Nothing here emits a wildcard.
 */
import type { RedirectRow } from './redirect-checks.ts';

export type { RedirectRow };

/** The `redirects` list in `redirects.yaml`, normalised. Order is the file's. */
export function parseRedirects(parsed: unknown): RedirectRow[] {
  const rows = (parsed as { redirects?: unknown } | null)?.redirects;
  return (Array.isArray(rows) ? rows : [])
    .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
    .map((row) => ({
      from: String(row.from ?? '').trim(),
      to: String(row.to ?? '').trim(),
      why: String(row.why ?? '').trim(),
      pending: row.pending === true ? true : undefined,
    }))
    .filter((redirect) => redirect.from !== '');
}

/**
 * The `/considered/<id>` rules, one per register row.
 *
 * Derived rather than listed because the register grows: `/considered/<id>` was
 * the address of every question and every claim alike, and both id spaces are
 * now served from namespaces that say what the thing is.
 */
export function derivedRedirects(
  questionIds: readonly string[],
  claimIds: readonly string[],
): RedirectRow[] {
  return [
    ...questionIds.map((id) => ({
      from: `/considered/${id}`,
      to: `/questions/${id}`,
      why: 'A question keeps its id; only the namespace changed.',
    })),
    ...claimIds.map((id) => ({
      from: `/considered/${id}`,
      to: `/claims/${id}`,
      why: 'A claim keeps its id and gets a page of its own.',
    })),
  ];
}

/**
 * Every redirect the site serves: the listed ones first, so a hand-written
 * decision about one address wins over the derived rule for it.
 */
export function allRedirects(
  listed: RedirectRow[],
  questionIds: readonly string[],
  claimIds: readonly string[],
): RedirectRow[] {
  const claimed = new Set(listed.map((redirect) => redirect.from));
  return [
    ...listed,
    ...derivedRedirects(questionIds, claimIds).filter((row) => !claimed.has(row.from)),
  ];
}

const HEADER = `# Cloudflare Pages redirects. GENERATED — do not edit by hand.
#
# Source of truth: redirects.yaml, plus one rule per register id derived from
# intake/register.yaml. Regenerate with \`npm run redirects\`; \`npm run validate\`
# fails if this file and those two disagree.
#
# Served before static files, so no rule here may cover /questions/* or
# /claims/* as a wildcard: it would swallow the real pages. Every rule below
# matches one exact path.
#
# A fragment never reaches the server — a request for /facts/x#claim-1 arrives
# as /facts/x — and the browser re-applies it to the target when the target
# carries none of its own. So an old /facts/<slug>#<claim-id> link lands on
# /questions/<slug> with the claim's anchor intact, and that page carries an
# anchor per claim.
`;

/** The file's exact bytes, header included, ending in one newline. */
export function redirectFileText(rows: RedirectRow[]): string {
  const lines = rows.map((row) => `${row.from} ${row.to} 301`);
  return `${HEADER}\n${lines.join('\n')}\n`;
}
