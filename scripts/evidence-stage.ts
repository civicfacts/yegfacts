/**
 * Stage 3a: evidence staging (spec §5).
 *
 *   npx tsx scripts/evidence-stage.ts reviews/electric-buses/2026-08-31
 *   npx tsx scripts/evidence-stage.ts --url https://example.org/report.pdf
 *
 * Fetches every source the panel cited, hashes the bytes, and drops them in
 * `evidence/staging/`. This is the only script in the pipeline that touches the
 * network, which is why it is split from `merge.ts`: a fetch that fails or
 * returns different bytes tomorrow must not make the merge non-deterministic.
 *
 * A failed fetch is recorded in the manifest and is NOT fatal. Half the point of
 * staging is finding out which sources are already rotting; that belongs in the
 * record, not in an exit code.
 *
 * Nothing here writes to the registry. `evidence-ingest.ts` promotes a staged
 * file into `evidence/registry/` deliberately, one at a time.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { relative, repoPath, sha256 } from './lib/repo.ts';
import type { CombinedEvidence } from './merge.ts';

const TIMEOUT_MS = 10_000;
const STAGING_DIR = repoPath('evidence', 'staging');
const MANIFEST = path.join(STAGING_DIR, 'staging-manifest.json');

export type StagingEntry = {
  url: string;
  status: 'ok' | 'failed';
  fetched_at: string;
  attempts: number;
  sha256?: string;
  bytes?: number;
  content_type?: string;
  /** Repo-relative path of the staged file, present when status is `ok`. */
  path?: string;
  http_status?: number;
  error?: string;
  /** Set by `evidence-ingest.ts` when this staged file becomes a registry entry. */
  ingested_as?: string;
};

export type StagingManifest = {
  generated_at: string;
  entries: StagingEntry[];
};

/**
 * A filesystem-safe basename for a URL.
 *
 * Staged files are named `<sha256 prefix>-<basename>` so the name is unique
 * even when two sites both serve `report.pdf`, and so the hash is legible in a
 * directory listing.
 */
export function stagedBasename(url: string, digest: string): string {
  let name = '';
  try {
    const parsed = new URL(url);
    name = path.basename(parsed.pathname);
    if (!name || name === '/') name = parsed.hostname;
  } catch {
    name = 'source';
  }
  name = name.replace(/[^A-Za-z0-9._-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (name.length === 0) name = 'source';
  if (name.length > 80) name = name.slice(0, 80);
  return `${digest.slice(0, 12)}-${name}`;
}

async function fetchOnce(url: string): Promise<{ bytes: Uint8Array; contentType: string; status: number }> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    redirect: 'follow',
    headers: { 'user-agent': 'YEGFacts evidence archiver (+https://yegfacts.ca)' },
  });
  const buffer = new Uint8Array(await response.arrayBuffer());
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`);
    (error as Error & { httpStatus?: number }).httpStatus = response.status;
    throw error;
  }
  return {
    bytes: buffer,
    contentType: response.headers.get('content-type') ?? 'application/octet-stream',
    status: response.status,
  };
}

/** Fetch one URL with a single retry, and write its bytes to the staging area. */
export async function stageUrl(url: string): Promise<StagingEntry> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const { bytes, contentType, status } = await fetchOnce(url);
      const digest = sha256(bytes);
      const basename = stagedBasename(url, digest);
      mkdirSync(STAGING_DIR, { recursive: true });
      const destination = path.join(STAGING_DIR, basename);
      writeFileSync(destination, bytes);
      return {
        url,
        status: 'ok',
        fetched_at: new Date().toISOString(),
        attempts: attempt,
        sha256: digest,
        bytes: bytes.byteLength,
        content_type: contentType,
        path: relative(destination),
        http_status: status,
      };
    } catch (error) {
      lastError = error;
    }
  }
  const httpStatus = (lastError as Error & { httpStatus?: number })?.httpStatus;
  return {
    url,
    status: 'failed',
    fetched_at: new Date().toISOString(),
    attempts: 2,
    ...(httpStatus ? { http_status: httpStatus } : {}),
    error: (lastError as Error)?.message ?? 'unknown fetch failure',
  };
}

function urlsFromCombinedEvidence(runDir: string): string[] {
  const file = path.join(runDir, 'combined-evidence.json');
  if (!existsSync(file)) {
    throw new Error(`${relative(file)} not found — run scripts/merge.ts first`);
  }
  const combined = JSON.parse(readFileSync(file, 'utf8')) as CombinedEvidence;
  return combined.items.map((item) => item.urls[0] ?? item.normalized_url);
}

function readManifest(): StagingManifest {
  if (!existsSync(MANIFEST)) return { generated_at: new Date().toISOString(), entries: [] };
  return JSON.parse(readFileSync(MANIFEST, 'utf8')) as StagingManifest;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const urlArgs = args.filter((_, index) => args[index - 1] === '--url');
  const target = args.find((arg, index) => !arg.startsWith('--') && args[index - 1] !== '--url');

  let urls: string[];
  if (urlArgs.length > 0) {
    urls = urlArgs;
  } else if (target) {
    urls = urlsFromCombinedEvidence(path.resolve(repoPath(), target));
  } else {
    console.error(
      'usage: tsx scripts/evidence-stage.ts <reviews/<story>/<date>> | --url <url> [--url <url>]',
    );
    process.exit(2);
  }

  const manifest = readManifest();
  const byUrl = new Map(manifest.entries.map((entry) => [entry.url, entry]));

  for (const url of urls) {
    const entry = await stageUrl(url);
    byUrl.set(url, entry);
    const detail = entry.status === 'ok' ? `${entry.bytes} bytes → ${entry.path}` : entry.error;
    console.log(`${entry.status === 'ok' ? 'ok    ' : 'FAILED'} ${url}  ${detail}`);
  }

  mkdirSync(STAGING_DIR, { recursive: true });
  const entries = [...byUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
  writeFileSync(
    MANIFEST,
    `${JSON.stringify({ generated_at: new Date().toISOString(), entries }, null, 2)}\n`,
  );

  const failed = entries.filter((entry) => entry.status === 'failed').length;
  console.log(`\n${relative(MANIFEST)}: ${entries.length} entries, ${failed} failed`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error: unknown) => {
    console.error(`evidence-stage: ${(error as Error).message}`);
    process.exit(1);
  });
}
