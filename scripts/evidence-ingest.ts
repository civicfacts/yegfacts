/**
 * Promote one staged file into the evidence registry (spec §3, §5 stage 3).
 *
 *   npx tsx scripts/evidence-ingest.ts \
 *     --staging <sha256|staged filename|url> \
 *     --title "2024 audited financial statements" \
 *     --publisher "City of Edmonton" \
 *     --type analytical-report \
 *     --establishes "What the City reported as spent, as audited" \
 *     --rights allowed
 *
 * Deliberately one-at-a-time and non-interactive: ingest is the step where a
 * human decides a source is real, says what it can establish, and classifies its
 * redistribution rights. Nothing upstream may write here — the merge does not
 * auto-mutate the registry.
 *
 * IDs are allocated under a lock directory so two concurrent runs cannot both
 * claim YF-EV-0007 (spec §3: "allocated by a single serialized script, never
 * concurrently").
 *
 * Rights routing, failing closed: `allowed` files are committed under
 * `evidence/files/` and publicly mirrored; `restricted` AND `unclear` go to the
 * gitignored `evidence/private/`, with the public registry entry keeping the
 * hash, the URL and any permitted excerpts.
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { isIsoDate, listFiles, relative, repoPath, sha256File } from './lib/repo.ts';
import type { StagingEntry, StagingManifest } from './evidence-stage.ts';

const REGISTRY_DIR = repoPath('evidence', 'registry');
const PUBLIC_DIR = repoPath('evidence', 'files');
const PRIVATE_DIR = repoPath('evidence', 'private');
const STAGING_MANIFEST = repoPath('evidence', 'staging', 'staging-manifest.json');
const LOCK_DIR = repoPath('evidence', '.ingest.lock');

type Rights = 'allowed' | 'restricted' | 'unclear';

export type IngestArgs = {
  staging: string;
  title: string;
  publisher: string;
  type: string;
  establishes: string;
  rights: Rights;
  url?: string;
  publishedOn?: string;
  retrievedOn?: string;
  excerpts: string[];
  rightsNote?: string;
};

/** The next free YF-EV id, read from the registry itself so there is no counter to drift. */
export function nextEvidenceId(): string {
  let highest = 0;
  for (const file of listFiles(REGISTRY_DIR, ['.yaml', '.yml'])) {
    const match = /^YF-EV-(\d{4})\./.exec(path.basename(file));
    if (match) highest = Math.max(highest, Number(match[1]));
  }
  const next = highest + 1;
  if (next > 9999) throw new Error('evidence ID space exhausted (YF-EV-9999)');
  return `YF-EV-${String(next).padStart(4, '0')}`;
}

function withLock<T>(run: () => T): T {
  try {
    mkdirSync(LOCK_DIR);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
      throw new Error(
        `another ingest is running (${relative(LOCK_DIR)} exists). ` +
          'If that is stale, remove the directory and retry.',
      );
    }
    throw error;
  }
  try {
    return run();
  } finally {
    rmSync(LOCK_DIR, { recursive: true, force: true });
  }
}

function readStagingManifest(): StagingManifest {
  if (!existsSync(STAGING_MANIFEST)) {
    throw new Error(`${relative(STAGING_MANIFEST)} not found — run scripts/evidence-stage.ts first`);
  }
  return JSON.parse(readFileSync(STAGING_MANIFEST, 'utf8')) as StagingManifest;
}

/** Find the staged entry by sha256, staged filename, staged path, or original URL. */
export function findStagingEntry(manifest: StagingManifest, selector: string): StagingEntry {
  const candidates = manifest.entries.filter(
    (entry) =>
      entry.sha256 === selector ||
      entry.url === selector ||
      (entry.path !== undefined &&
        (entry.path === selector || path.basename(entry.path) === selector)),
  );
  if (candidates.length === 0) throw new Error(`no staging entry matches "${selector}"`);
  if (candidates.length > 1) throw new Error(`"${selector}" matches ${candidates.length} staging entries`);
  const entry = candidates[0]!;
  if (entry.status !== 'ok' || !entry.path || !entry.sha256) {
    throw new Error(`staging entry for ${entry.url} did not fetch successfully; nothing to ingest`);
  }
  return entry;
}

function moveInto(source: string, destinationDir: string, basename: string): string {
  mkdirSync(destinationDir, { recursive: true });
  const destination = path.join(destinationDir, basename);
  if (existsSync(destination)) throw new Error(`${relative(destination)} already exists`);
  try {
    renameSync(source, destination);
  } catch {
    copyFileSync(source, destination);
    unlinkSync(source);
  }
  return destination;
}

export function ingest(args: IngestArgs): { id: string; registryFile: string; archivePath: string } {
  const manifest = readStagingManifest();
  const entry = findStagingEntry(manifest, args.staging);
  const stagedPath = repoPath(entry.path!);
  if (!existsSync(stagedPath)) throw new Error(`staged file missing: ${entry.path}`);

  const actual = sha256File(stagedPath);
  if (actual !== entry.sha256) {
    throw new Error(
      `staged file changed since it was fetched: manifest says ${entry.sha256}, file hashes ${actual}`,
    );
  }

  const retrievedOn = args.retrievedOn ?? entry.fetched_at.slice(0, 10);
  if (!isIsoDate(retrievedOn)) throw new Error(`--retrieved-on must be YYYY-MM-DD, got "${retrievedOn}"`);
  if (args.publishedOn !== undefined && !isIsoDate(args.publishedOn)) {
    throw new Error(`--published-on must be YYYY-MM-DD, got "${args.publishedOn}"`);
  }

  return withLock(() => {
    const id = nextEvidenceId();
    // Unclear rights fail closed to private (spec §3).
    const visibility = args.rights === 'allowed' ? 'public' : 'private';
    const targetDir = visibility === 'public' ? PUBLIC_DIR : PRIVATE_DIR;
    const stagedName = path.basename(stagedPath).replace(/^[0-9a-f]{12}-/, '');
    const archive = moveInto(stagedPath, targetDir, `${id}-${stagedName}`);

    const record = {
      id,
      title: args.title,
      publisher: args.publisher,
      url: args.url ?? entry.url,
      ...(args.publishedOn ? { published_on: args.publishedOn } : {}),
      retrieved_on: retrievedOn,
      kind: args.type,
      establishes: args.establishes,
      archive: {
        required: true,
        sha256: entry.sha256,
        visibility,
        path: relative(archive),
      },
      rights: {
        redistribution: args.rights,
        ...(args.rightsNote ? { note: args.rightsNote } : {}),
      },
      excerpts: args.excerpts,
    };

    mkdirSync(REGISTRY_DIR, { recursive: true });
    const registryFile = path.join(REGISTRY_DIR, `${id}.yaml`);
    writeFileSync(registryFile, YAML.stringify(record, { lineWidth: 0 }));

    entry.ingested_as = id;
    writeFileSync(STAGING_MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

    return { id, registryFile, archivePath: archive };
  });
}

const USAGE = `usage: tsx scripts/evidence-ingest.ts \\
  --staging <sha256|staged filename|url> \\
  --title <title> --publisher <publisher> --type <kind> \\
  --establishes <what this source can establish> \\
  --rights allowed|restricted|unclear \\
  [--url <canonical url>] [--published-on YYYY-MM-DD] [--retrieved-on YYYY-MM-DD] \\
  [--rights-note <note>] [--excerpt <text>]...`;

function parseArgs(argv: string[]): IngestArgs {
  const values = new Map<string, string[]>();
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]!;
    if (!arg.startsWith('--')) throw new Error(`unexpected argument "${arg}"`);
    const value = argv[index + 1];
    if (value === undefined || value.startsWith('--')) throw new Error(`${arg} needs a value`);
    values.set(arg, [...(values.get(arg) ?? []), value]);
    index += 1;
  }
  const one = (flag: string): string | undefined => values.get(flag)?.at(-1);
  const required = (flag: string): string => {
    const value = one(flag);
    if (!value) throw new Error(`${flag} is required`);
    return value;
  };
  const rights = required('--rights');
  if (rights !== 'allowed' && rights !== 'restricted' && rights !== 'unclear') {
    throw new Error('--rights must be one of: allowed, restricted, unclear');
  }
  return {
    staging: required('--staging'),
    title: required('--title'),
    publisher: required('--publisher'),
    type: required('--type'),
    establishes: required('--establishes'),
    rights,
    url: one('--url'),
    publishedOn: one('--published-on'),
    retrievedOn: one('--retrieved-on'),
    rightsNote: one('--rights-note'),
    excerpts: values.get('--excerpt') ?? [],
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const result = ingest(parseArgs(process.argv.slice(2)));
    console.log(`ingested ${result.id}`);
    console.log(`  registry: ${relative(result.registryFile)}`);
    console.log(`  archive:  ${relative(result.archivePath)}`);
  } catch (error) {
    console.error(`evidence-ingest: ${(error as Error).message}\n\n${USAGE}`);
    process.exit(1);
  }
}
