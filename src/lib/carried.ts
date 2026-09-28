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
  'Reviewers read our archived copy because the City’s portal blocked automated access';
export const CARRIED_SAME_COPY = 'All reviewers read the same copy.';
export const CARRIED_METHOD_HREF = '/methodology#carried-documents';
export const CARRIED_ITEMS_LABEL =
  'Reviewers read selected items from the City’s minutes, chosen by the site under a published rule; the rest of each page was not shown to them';
export const CARRIED_ITEMS_UNPUBLISHABLE =
  'Our archived copies of these pages cannot be published, so check the selection against the City’s own page.';
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
 *   minutes-items row lacks its rule version, so a broken
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
