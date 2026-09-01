/**
 * Founder-local integrity check for the private evidence archive
 * (design §3): public CI can only structurally validate `visibility:
 * private` registry entries because their bytes are gitignored. This
 * script, run locally, verifies that every private entry's archived file
 * exists and its bytes match the recorded sha256.
 *
 *   npx tsx scripts/verify-private.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = path.resolve(import.meta.dirname, '..');
const registryDir = path.join(root, 'evidence', 'registry');

let checked = 0;
let problems = 0;

for (const file of readdirSync(registryDir).filter((f) => f.endsWith('.yaml'))) {
  const entry = parse(readFileSync(path.join(registryDir, file), 'utf8')) as {
    id?: string;
    archive?: { sha256?: string; visibility?: string; path?: string };
  };
  const archive = entry.archive;
  if (!archive || archive.visibility !== 'private') continue;
  checked += 1;
  const rel = archive.path;
  if (!rel) {
    console.error(`✗ ${entry.id}: private entry has no archive.path`);
    problems += 1;
    continue;
  }
  const abs = path.join(root, rel);
  if (!existsSync(abs)) {
    console.error(`✗ ${entry.id}: missing archive file ${rel}`);
    problems += 1;
    continue;
  }
  const sha = createHash('sha256').update(readFileSync(abs)).digest('hex');
  if (sha !== archive.sha256) {
    console.error(`✗ ${entry.id}: sha256 mismatch for ${rel}`);
    console.error(`    recorded ${archive.sha256}`);
    console.error(`    actual   ${sha}`);
    problems += 1;
  }
}

if (problems > 0) {
  console.error(`verify-private: ${problems} problem(s) across ${checked} private entries`);
  process.exit(1);
}
console.log(`verify-private: OK — ${checked} private entries match their recorded hashes`);
