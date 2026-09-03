/**
 * `redirects.yaml` is the promise that no address the site has published stops
 * resolving. A redirect file nobody checks is exactly where that promise is
 * broken quietly, so the rules are pinned here and the live file is run through
 * them.
 *
 * The one worth reading twice is `pending`. It exists because the six
 * `/facts/<slug>` rules point at questions that are not registered yet, and a
 * flag that only ever means "skip the check" rots. So it is checked both ways:
 * a live target must resolve, and a pending one must not.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { REPO_ROOT } from '../scripts/lib/repo.ts';
import {
  redirectProblems,
  type RedirectRow,
  type RedirectWorld,
} from '../scripts/lib/redirect-checks.ts';

const world: RedirectWorld = {
  questionIds: new Set(['cycling-volumes']),
  claimIds: new Set(['bike-lanes-look-empty']),
};

const row = (overrides: Partial<RedirectRow> = {}): RedirectRow => ({
  from: '/considered/bike-lanes-nobody-rides',
  to: '/questions/cycling-volumes',
  why: 'Six claims about how much the lanes are used, grouped from the source.',
  ...overrides,
});

describe('redirectProblems', () => {
  it('accepts a rule with a path, a target that resolves and a reason', () => {
    expect(redirectProblems([row()], world)).toEqual([]);
  });

  it('accepts a claim target that resolves', () => {
    expect(
      redirectProblems([row({ to: '/claims/bike-lanes-look-empty' })], world),
    ).toEqual([]);
  });

  it('rejects a target that is in neither list', () => {
    expect(redirectProblems([row({ to: '/questions/invented' })], world)).toEqual([
      '/considered/bike-lanes-nobody-rides: "/questions/invented" is not a question in the register',
    ]);
  });

  it('leaves a target outside the two namespaces alone, since nothing here can check it', () => {
    expect(redirectProblems([row({ to: '/search' })], world)).toEqual([]);
  });

  for (const field of ['from', 'to'] as const) {
    it(`rejects a ${field} that is not a site path`, () => {
      expect(
        redirectProblems([row({ [field]: 'https://example.com/x' })], world).join('\n'),
      ).toContain(`must be a site path starting with /`);
    });

    it(`rejects a ${field} with a trailing slash, which this site never serves`, () => {
      expect(redirectProblems([row({ [field]: '/considered/' })], world).join('\n')).toContain(
        'must not end in a slash',
      );
    });
  }

  // The file is published reasoning, not a routing table: a rule with no
  // sentence behind it is one nobody can safely delete later.
  it('requires a sentence saying why the address moved', () => {
    expect(redirectProblems([row({ why: '' })], world)).toContain(
      '/considered/bike-lanes-nobody-rides: needs a sentence saying why it moved',
    );
  });

  it('rejects two rules over one address', () => {
    expect(redirectProblems([row(), row({ to: '/search' })], world)).toContain(
      '/considered/bike-lanes-nobody-rides: two rules redirect it',
    );
  });

  it('rejects a rule that points at itself', () => {
    expect(redirectProblems([row({ to: row().from })], world)).toContain(
      '/considered/bike-lanes-nobody-rides: redirects to itself',
    );
  });

  /**
   * Redirects are served before static files, so a rule under either new
   * namespace makes a real page unreachable with no error anywhere.
   */
  for (const from of ['/questions/cycling-volumes', '/claims/bike-lanes-look-empty']) {
    it(`refuses to redirect ${from}, which would hide the page`, () => {
      expect(redirectProblems([row({ from, to: '/search' })], world)).toContain(
        `${from}: redirects a page inside its own namespace, which would hide it`,
      );
    });
  }

  it('allows the bare namespace paths, which are index routes and a decision', () => {
    expect(redirectProblems([row({ from: '/claims', to: '/questions' })], world)).toEqual([]);
  });

  // A chain works in a browser and costs a round trip, but it also means a
  // later edit to the middle rule silently moves the first one.
  it('rejects a chain of two hops', () => {
    expect(
      redirectProblems(
        [row({ from: '/stories', to: '/considered' }), row({ from: '/considered', to: '/questions' })],
        world,
      ),
    ).toContain('/stories: redirects to "/considered", which is itself redirected — collapse the chain');
  });

  describe('pending', () => {
    it('lets a target through while the route does not exist yet', () => {
      expect(
        redirectProblems([row({ to: '/questions/active-transportation', pending: true })], world),
      ).toEqual([]);
    });

    it('fails once the route lands, so the flag cannot be left behind', () => {
      expect(redirectProblems([row({ pending: true })], world)).toEqual([
        '/considered/bike-lanes-nobody-rides: marked pending, but "/questions/cycling-volumes" is in the register now — drop the flag',
      ]);
    });
  });
});

describe('the file the site ships', () => {
  const rows = (
    parse(readFileSync(path.join(REPO_ROOT, 'redirects.yaml'), 'utf8')) as {
      redirects: RedirectRow[];
    }
  ).redirects;

  it('lists the addresses D-0029 moved', () => {
    const froms = new Set(rows.map((redirect) => redirect.from));
    for (const from of ['/considered', '/stories', '/facts/active-transportation']) {
      expect(froms.has(from)).toBe(true);
    }
  });

  /**
   * `/considered/<id>` is derived from the register rather than listed, so a
   * question registered tomorrow keeps its old-style address with no edit here.
   * Listing one by hand would be the start of the two drifting apart.
   */
  it('lists only the superseded register rows by hand, not every register id', () => {
    const listed = rows
      .filter((redirect) => redirect.from.startsWith('/considered/'))
      .map((redirect) => redirect.from.slice('/considered/'.length));
    expect(listed).toEqual([
      'bike-lanes-nobody-rides',
      'at-congestion-reduced',
      'at-100m-a-year',
      'bike-100m-one-percent-of-roads',
      'fifty-street-181m-600m',
      'rice-50m-motions-and-review',
      'lanes-removed-citywide',
      'fifteen-minute-city-agreement',
    ]);
  });
});
