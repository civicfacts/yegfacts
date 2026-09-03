/**
 * The rules `redirects.yaml` has to satisfy, as a pure function.
 *
 * A redirect file nobody checks is where a published address quietly stops
 * resolving. The rules here are the ones that catch that: a `from` that is not
 * a path, two rules fighting over one address, a chain that has to be followed
 * twice, and above all a target that does not exist.
 *
 * `pending` is the interesting one. The six `/facts/<slug>` redirects point at
 * questions that are not in the register yet, so their targets cannot be
 * checked — but a flag that only ever means "skip the check" rots. So the rule
 * runs both ways: a non-pending target must resolve, and a pending one must
 * NOT, which makes the flag fail the build the moment its route lands and
 * nobody removed it.
 */
export interface RedirectRow {
  from: string;
  to: string;
  why: string;
  pending?: boolean;
}

/** What the checks need to know about the world outside the file. */
export interface RedirectWorld {
  /** Ids in the register's `questions` list. */
  questionIds: ReadonlySet<string>;
  /** Ids in the register's `claims` list. */
  claimIds: ReadonlySet<string>;
}

/** `/questions/<id>` and `/claims/<id>` are the two checkable target shapes. */
const TARGET = /^\/(questions|claims)\/([^/#?]+)$/;

/**
 * Every problem with the redirect file, as sentences. Empty means it validates.
 * Order is the file's own, so a diff of the output reads down the file.
 */
export function redirectProblems(rows: RedirectRow[], world: RedirectWorld): string[] {
  const problems: string[] = [];
  const fail = (message: string) => problems.push(message);

  const froms = new Set<string>();
  for (const [index, row] of rows.entries()) {
    const where = row.from === '' ? `redirect ${index + 1}` : row.from;

    for (const field of ['from', 'to'] as const) {
      const value = row[field];
      if (value === '') {
        fail(`${where}: needs a ${field}`);
      } else if (!value.startsWith('/')) {
        fail(`${where}: ${field} "${value}" must be a site path starting with /`);
      } else if (value.length > 1 && value.endsWith('/')) {
        fail(`${where}: ${field} "${value}" must not end in a slash; the site has none`);
      }
    }
    // The file is published reasoning, not a routing table. A rule with no
    // sentence behind it is one nobody can safely delete later.
    if (row.why === '') fail(`${where}: needs a sentence saying why it moved`);

    if (froms.has(row.from)) fail(`${where}: two rules redirect it`);
    froms.add(row.from);

    if (row.from === row.to) fail(`${where}: redirects to itself`);

    // Redirects are served before static files, so a rule under either new
    // namespace makes a real page unreachable with no error anywhere. The bare
    // `/questions` and `/claims` are allowed: those are index routes, and
    // whether either exists is a decision, not an accident.
    if (/^\/(questions|claims)\//.test(row.from)) {
      fail(`${where}: redirects a page inside its own namespace, which would hide it`);
    }
  }

  // One hop, always. A chain works in a browser and costs a round trip, but it
  // also means a later edit to the middle rule silently moves the first one.
  for (const row of rows) {
    if (froms.has(row.to)) {
      fail(`${row.from}: redirects to "${row.to}", which is itself redirected — collapse the chain`);
    }
  }

  for (const row of rows) {
    const match = TARGET.exec(row.to);
    if (match === null) continue;
    const [, namespace, id] = match;
    const known = namespace === 'questions' ? world.questionIds : world.claimIds;
    const resolves = known.has(id!);
    if (row.pending === true && resolves) {
      fail(
        `${row.from}: marked pending, but "${row.to}" is in the register now — drop the flag`,
      );
    } else if (row.pending !== true && !resolves) {
      fail(`${row.from}: "${row.to}" is not a ${namespace!.slice(0, -1)} in the register`);
    }
  }

  return problems;
}
