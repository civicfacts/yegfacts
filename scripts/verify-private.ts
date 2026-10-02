/**
 * Founder-local integrity check for the private evidence archive
 * (design §3): public CI can only structurally validate `visibility:
 * private` registry entries because their bytes are gitignored. This
 * script, run locally, verifies that every private entry's archived file
 * exists and its bytes match the recorded sha256. An entry whose archive is
 * recorded as lost (a valid `archive.lost_on` date and an `archive.loss_record`
 * file that exists) is listed as not checkable rather than failed; a missing
 * file without both is a failure.
 *
 *   npx tsx scripts/verify-private.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { asDateString, isIsoDate } from './lib/repo.ts';

const root = path.resolve(import.meta.dirname, '..');
const registryDir = path.join(root, 'evidence', 'registry');

let checked = 0;
let problems = 0;
const lost: string[] = [];

for (const file of readdirSync(registryDir).filter((f) => f.endsWith('.yaml'))) {
  const entry = parse(readFileSync(path.join(registryDir, file), 'utf8')) as {
    id?: string;
    archive?: { sha256?: string; visibility?: string; path?: string; lost_on?: unknown; loss_record?: string };
  };
  const archive = entry.archive;
  if (!archive || archive.visibility !== 'private') continue;
  const rel = archive.path;
  if (!rel) {
    console.error(`✗ ${entry.id}: private entry has no archive.path`);
    problems += 1;
    continue;
  }
  const abs = path.join(root, rel);
  if (!existsSync(abs)) {
    const record = archive.loss_record;
    const recorded =
      isIsoDate(asDateString(archive.lost_on)) &&
      typeof record === 'string' &&
      existsSync(path.join(root, record)) &&
      statSync(path.join(root, record)).isFile();
    if (recorded) {
      lost.push(`${entry.id} (see ${record})`);
      continue;
    }
    console.error(`✗ ${entry.id}: missing archive file ${rel}, and no recorded loss (valid archive.lost_on and an existing archive.loss_record)`);
    problems += 1;
    continue;
  }
  checked += 1;
  const sha = createHash('sha256').update(readFileSync(abs)).digest('hex');
  if (sha !== archive.sha256) {
    console.error(`✗ ${entry.id}: sha256 mismatch for ${rel}`);
    console.error(`    recorded ${archive.sha256}`);
    console.error(`    actual   ${sha}`);
    problems += 1;
  }
}

if (lost.length > 0) {
  console.log(`not checkable (archive lost): ${lost.length}`);
  for (const line of lost) console.log(`  - ${line}`);
}
if (problems > 0) {
  console.error(`verify-private: ${problems} problem(s); ${checked} archive file(s) were hashed`);
  process.exit(1);
}
console.log(`verify-private: OK — ${checked} checked and matched their recorded hashes; ${lost.length} not checkable (archive lost)`);
