/**
 * Stamp fetch status and registry identity onto a run's combined evidence
 * (methodology v1.2).
 *
 *   npx tsx scripts/annotate-evidence.ts reviews/electric-buses/2026-08-31
 *   npx tsx scripts/annotate-evidence.ts --all
 *
 * The reviewer prompt calls a fabricated citation "the worst possible failure",
 * but `combined-evidence.json` shipped every item looking identical whether its
 * URL had been fetched and hashed, had 404'd, or had never been tried — and with
 * `evidence_id: null` on all of them. Round-2 reviewers and outside auditors
 * therefore could not tell a verified source from one nobody could retrieve.
 * This script closes that gap by annotating the artifact rather than editing it:
 *
 *   fetch_status  ok | failed | content-mismatch | not-attempted
 *                 read from `evidence/staging/staging-manifest.json`, matched by
 *                 normalised URL. An item no staging run ever touched is
 *                 `not-attempted` — the honest answer, and distinct from failure.
 *   evidence_id   the `YF-EV-NNNN` whose registry URL normalises to the same
 *                 document, or the literal string "unregistered".
 *
 * Nothing else in the file is touched: no citation, no finding, no wording. The
 * record is annotated, never rewritten.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { listDirectories, listFiles, loadYaml, relative, repoPath } from './lib/repo.ts';
import { normalizeUrl } from './merge.ts';

export type FetchStatus = 'ok' | 'failed' | 'content-mismatch' | 'not-attempted';

const FETCH_STATUSES: readonly FetchStatus[] = ['ok', 'failed', 'content-mismatch', 'not-attempted'];

const UNREGISTERED = 'unregistered';

type StagingEntry = { url?: unknown; status?: unknown };
type StagingManifest = { entries?: StagingEntry[] };

type CombinedItem = {
  normalized_url?: string;
  urls?: string[];
  evidence_id?: string | null;
  fetch_status?: string;
  [key: string]: unknown;
};

type Combined = { items?: CombinedItem[]; [key: string]: unknown };

/** Normalised URL → staging status, from the one staging manifest. */
export function stagingStatuses(): Map<string, FetchStatus> {
  const file = repoPath('evidence', 'staging', 'staging-manifest.json');
  const byUrl = new Map<string, FetchStatus>();
  if (!existsSync(file)) return byUrl;
  const manifest = JSON.parse(readFileSync(file, 'utf8')) as StagingManifest;
  for (const entry of manifest.entries ?? []) {
    if (typeof entry.url !== 'string') continue;
    const status = FETCH_STATUSES.includes(entry.status as FetchStatus)
      ? (entry.status as FetchStatus)
      : 'failed';
    const key = normalizeUrl(entry.url);
    // A URL staged more than once keeps its best outcome: a later successful
    // refetch is what the archive actually holds.
    if (byUrl.get(key) === 'ok') continue;
    byUrl.set(key, status);
  }
  return byUrl;
}

/** Normalised URL → registry id, from `evidence/registry/`. */
export function registryByUrl(): Map<string, string> {
  const byUrl = new Map<string, string>();
  for (const file of listFiles(repoPath('evidence', 'registry'), ['.yaml', '.yml'])) {
    const data = loadYaml<{ id?: unknown; url?: unknown }>(file);
    if (typeof data?.id === 'string' && typeof data?.url === 'string') {
      byUrl.set(normalizeUrl(data.url), data.id);
    }
  }
  return byUrl;
}

/** Every spelling of an item's URL, normalised, longest-known first. */
function itemUrls(item: CombinedItem): string[] {
  const raw = [item.normalized_url, ...(item.urls ?? [])].filter(
    (url): url is string => typeof url === 'string',
  );
  return [...new Set(raw.map(normalizeUrl))];
}

export function annotateItem(
  item: CombinedItem,
  staging: Map<string, FetchStatus>,
  registry: Map<string, string>,
): CombinedItem {
  const urls = itemUrls(item);
  const status = urls.map((url) => staging.get(url)).find((value) => value !== undefined);
  const id = urls.map((url) => registry.get(url)).find((value) => value !== undefined);
  return {
    ...item,
    evidence_id: id ?? UNREGISTERED,
    fetch_status: status ?? 'not-attempted',
  };
}

export function annotateRun(runDir: string): { file: string; counts: Record<string, number> } {
  const file = path.join(runDir, 'combined-evidence.json');
  if (!existsSync(file)) throw new Error(`no combined-evidence.json under ${relative(runDir)}`);

  const staging = stagingStatuses();
  const registry = registryByUrl();
  const combined = JSON.parse(readFileSync(file, 'utf8')) as Combined;
  const items = (combined.items ?? []).map((item) => annotateItem(item, staging, registry));

  const counts: Record<string, number> = { unregistered: 0 };
  for (const status of FETCH_STATUSES) counts[status] = 0;
  for (const item of items) {
    counts[String(item.fetch_status)] = (counts[String(item.fetch_status)] ?? 0) + 1;
    if (item.evidence_id === UNREGISTERED) counts.unregistered! += 1;
  }

  writeFileSync(file, `${JSON.stringify({ ...combined, items }, null, 2)}\n`);
  return { file, counts };
}

/** Every run directory that has a combined-evidence.json. */
function allRunDirs(): string[] {
  const dirs: string[] = [];
  for (const storyDir of listDirectories(repoPath('reviews'))) {
    for (const runDir of listDirectories(storyDir)) {
      if (existsSync(path.join(runDir, 'combined-evidence.json'))) dirs.push(runDir);
    }
  }
  return dirs;
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error(
      'usage: tsx scripts/annotate-evidence.ts <reviews/<story>/<date>>... | --all',
    );
    process.exit(2);
  }

  const targets =
    args[0] === '--all' ? allRunDirs() : args.map((arg) => path.resolve(repoPath(), arg));

  for (const runDir of targets) {
    const { file, counts } = annotateRun(runDir);
    const summary = FETCH_STATUSES.map((status) => `${status} ${counts[status]}`).join(', ');
    console.log(`${relative(file)}: ${summary}; unregistered ${counts.unregistered}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (error) {
    console.error(`annotate-evidence: ${(error as Error).message}`);
    process.exit(1);
  }
}
