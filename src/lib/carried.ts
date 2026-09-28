/**
 * Carried documents on the page (methodology v1.41, D-0046 rule 6).
 *
 * When a run's panel package carried a City document's archived text, the
 * source lists that show that document say so beside it. Which documents were
 * carried is read from each run's committed `carried/manifest.yaml`, never
 * assumed: a run without the file carried nothing.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export const CARRIED_LABEL =
  'Reviewers read our archived copy because the City’s portal blocked automated access';
export const CARRIED_SAME_COPY = 'All reviewers read the same copy.';
export const CARRIED_METHOD_HREF = '/methodology#carried-documents';

export type CarriedSource = {
  registryId: string;
  /** The City's own URL for the document, which a person can open in a browser. */
  cityUrl: string;
  /** SHA-256 of the archived bytes, to compare with a download of `cityUrl`. */
  archiveSha256: string;
};

type ManifestDocument = {
  registry_id?: string;
  url?: string;
  status?: string;
  archive?: { sha256?: string };
};

/**
 * Every document carried in any of `runDirs` (repo-relative, e.g.
 * `reviews/<story>/<date>`), keyed by registry id. Only rows whose status is
 * `carried` count; excluded and failed rows were never in a package.
 *
 * @param root the repository root the run directories resolve against.
 * @throws when a manifest exists but cannot be parsed, or a `carried` row
 *   lacks a registry id, an https URL or a 64-hex archive SHA-256, so a broken
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
      ].filter(Boolean);
      if (problems.length > 0) {
        throw new Error(`${path.join(run, 'carried', 'manifest.yaml')}: documents[${index}] is carried but has a missing or invalid ${problems.join(', ')}`);
      }
      carried.set(doc.registry_id!, {
        registryId: doc.registry_id!,
        cityUrl: doc.url!,
        archiveSha256: doc.archive!.sha256!,
      });
    }
  }
  return carried;
}
