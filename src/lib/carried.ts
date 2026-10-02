/**
 * Carried documents on the page (methodology v1.41, D-0046 rule 6; v1.42,
 * D-0047 rule 7).
 *
 * When a run's panel package carried a City document's archived text, the
 * source lists that show that document say so beside it. A whole document
 * (a report or attachment) gets one label; a meeting page carried as selected
 * items gets another, which says the site chose the items under a published
 * rule and the rest of the page was not shown. Which documents were carried is
 * read from each run's committed `carried/manifest.yaml`, never assumed: a run
 * without the file carried nothing.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { repoFile } from './site';

export const CARRIED_LABEL =
  'The AI reviewers read our archived copy because the City’s portal blocked automated access';
export const CARRIED_SAME_COPY = 'All the AI reviewers read the same copy.';
export const CARRIED_METHOD_HREF = '/methodology#carried-documents';
export const CARRIED_ITEMS_LABEL =
  'The AI reviewers saw only the items on this City meeting page that our published rule picked, from our archived copy, because the City’s portal blocked automated access';
export const CARRIED_ITEMS_UNPUBLISHABLE =
  'We do not have permission to republish our copy, so check the items against the City’s own page.';
/** The published selection rule, every version. */
export const SELECTION_RULE_HREF = repoFile('scripts/panel/minutes-selection-rules.yaml');

export type CarriedSource = {
  registryId: string;
  /** The City's own URL for the document, which a person can open in a browser. */
  cityUrl: string;
  /** SHA-256 of the archived bytes, to compare with a download of `cityUrl`. */
  archiveSha256: string;
  /** `items` when the package carried selected agenda items of a meeting page, not the whole document. */
  kind: 'document' | 'items';
  /** The committed manifest with the page's full item index, on GitHub. */
  itemIndexHref: string;
  /** The selection rule version the items were chosen under, for `items`. */
  ruleVersion?: number;
};

type ManifestDocument = {
  registry_id?: string;
  url?: string;
  status?: string;
  kind?: string;
  rule_version?: number;
  archive?: { sha256?: string };
};

/**
 * Every document carried in any of `runDirs` (repo-relative, e.g.
 * `reviews/<story>/<date>`), keyed by registry id. Only rows whose status is
 * `carried` count; excluded and failed rows were never in a package.
 *
 * @param root the repository root the run directories resolve against.
 * @throws when a manifest exists but cannot be parsed, or a `carried` row
 *   lacks a registry id, an https URL or a 64-hex archive SHA-256, or a
 *   minutes-items row lacks its rule version, or a row has a kind other than
 *   pdf or minutes-items, so a broken
 *   row fails the build rather than silently dropping the label. An absent
 *   manifest means nothing was carried.
 */
export function carriedSources(runDirs: readonly string[], root: string = process.cwd()): Map<string, CarriedSource> {
  const carried = new Map<string, CarriedSource>();
  for (const run of new Set(runDirs)) {
    const file = path.join(root, run, 'carried', 'manifest.yaml');
    if (!existsSync(file)) continue;
    const manifest = YAML.parse(readFileSync(file, 'utf8')) as { documents?: ManifestDocument[] };
    for (const [index, doc] of (manifest?.documents ?? []).entries()) {
      if (doc.status !== 'carried') continue;
      const problems = [
        typeof doc.registry_id === 'string' && doc.registry_id ? '' : 'registry_id',
        typeof doc.url === 'string' && /^https:\/\/\S+$/.test(doc.url) ? '' : 'url',
        typeof doc.archive?.sha256 === 'string' && /^[0-9a-f]{64}$/.test(doc.archive.sha256) ? '' : 'archive.sha256',
        // Absent is a v1.41 manifest, which carried only whole documents.
        doc.kind === undefined || doc.kind === 'pdf' || doc.kind === 'minutes-items' ? '' : `kind "${String(doc.kind)}"`,
        doc.kind !== 'minutes-items' || (Number.isInteger(doc.rule_version) && doc.rule_version! > 0) ? '' : 'rule_version',
      ].filter(Boolean);
      if (problems.length > 0) {
        throw new Error(`${path.join(run, 'carried', 'manifest.yaml')}: documents[${index}] is carried but has a missing or invalid ${problems.join(', ')}`);
      }
      carried.set(doc.registry_id!, {
        registryId: doc.registry_id!,
        cityUrl: doc.url!,
        archiveSha256: doc.archive!.sha256!,
        kind: doc.kind === 'minutes-items' ? 'items' : 'document',
        itemIndexHref: repoFile(path.posix.join(run, 'carried', 'manifest.yaml')),
        ...(doc.kind === 'minutes-items' ? { ruleVersion: doc.rule_version } : {}),
      });
    }
  }
  return carried;
}

/**
 * Claims a run set aside at its vote gate (D-0047 rule 5): the `claim:<id>`
 * gates in each run's `carried/manifest.yaml` whose result is `parked`. Such a
 * claim was in the brief and was never answered on that run, which is a
 * different statement from a claim still waiting for its question's run.
 *
 * @param runDirs repo-relative run directories, e.g. `reviews/<story>/<date>`.
 * @param root the repository root the run directories resolve against.
 */
export function gateParkedClaims(runDirs: readonly string[], root: string = process.cwd()): Set<string> {
  const parked = new Set<string>();
  for (const run of new Set(runDirs)) {
    const file = path.join(root, run, 'carried', 'manifest.yaml');
    if (!existsSync(file)) continue;
    const manifest = YAML.parse(readFileSync(file, 'utf8')) as { gates?: Record<string, { result?: string }> };
    for (const [key, gate] of Object.entries(manifest?.gates ?? {})) {
      if (key.startsWith('claim:') && gate?.result === 'parked') parked.add(key.slice('claim:'.length));
    }
  }
  return parked;
}
