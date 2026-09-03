import { parse } from 'yaml';
import { claimRegister, questionRegister } from './intake';

/**
 * Every address the site has published that has moved, and where it goes now.
 *
 * Two halves. The listed half is `redirects.yaml`, which is where a decision
 * about one address is written down and defended. The derived half is every
 * `/considered/<id>` in the register — one per question and one per claim —
 * which nobody should have to keep in a file by hand, because a question
 * registered tomorrow needs its old-style address the day it lands.
 *
 * Fragments are not this file's business and do not need to be. A fragment
 * never reaches the server, and the browser re-applies it to the redirect
 * target when the target carries none: verified in Chromium against a local 301
 * on 2026-09-03, where the server saw `/facts/at` and the browser finished at
 * `/questions/at#claim-anchor-1`. So an old `/facts/<slug>#<claim-id>` link
 * lands on the question page with the claim's anchor intact, and that page
 * carries an anchor per claim.
 */
export interface Redirect {
  /** The path as it was published, with no trailing slash. */
  from: string;
  /** Where it goes now. */
  to: string;
  /** One sentence saying why it moved. */
  why: string;
  /** True while the target route does not exist yet. */
  pending?: boolean;
}

const files = import.meta.glob<string>('../../redirects.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const text = (value: unknown): string => String(value ?? '').trim();

/** The listed redirects, in the file's order. Exported for the validator. */
export function parseRedirects(raw: string): Redirect[] {
  const rows = (parse(raw) as { redirects?: unknown } | null)?.redirects;
  return (Array.isArray(rows) ? rows : [])
    .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
    .map((row) => ({
      from: text(row.from),
      to: text(row.to),
      why: text(row.why),
      pending: row.pending === true ? true : undefined,
    }))
    .filter((redirect) => redirect.from !== '');
}

/**
 * The `/considered/<id>` redirects, one per register row.
 *
 * Derived rather than listed because the register grows: `/considered/<id>` was
 * the address of every question and every claim, and both id spaces are now
 * served from namespaces that say what the thing is.
 */
export function derivedRedirects(): Redirect[] {
  return [
    ...questionRegister().map((question) => ({
      from: `/considered/${question.id}`,
      to: `/questions/${question.id}`,
      why: 'A question keeps its id; only the namespace changed.',
    })),
    ...claimRegister().map((claim) => ({
      from: `/considered/${claim.id}`,
      to: `/claims/${claim.id}`,
      why: 'A claim keeps its id and gets a page of its own.',
    })),
  ];
}

/**
 * Every redirect the site serves: the listed ones first, so a hand-written
 * decision about one address wins over the derived rule for it.
 */
export function redirects(): Redirect[] {
  const listed = Object.values(files).flatMap(parseRedirects);
  const claimed = new Set(listed.map((redirect) => redirect.from));
  return [...listed, ...derivedRedirects().filter((redirect) => !claimed.has(redirect.from))];
}
