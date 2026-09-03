/**
 * Write `public/_redirects` from `redirects.yaml` and the register.
 *
 *   npm run redirects
 *
 * The generated file is committed, so the routing table can be read in a diff.
 * `npm run validate` regenerates it in memory and fails if the committed bytes
 * differ, which is what keeps "generated" from meaning "stale".
 */
import { writeFileSync } from 'node:fs';
import { loadYaml, readText, relative, repoPath } from './lib/repo.ts';
import { allRedirects, parseRedirects, redirectFileText } from './lib/redirect-file.ts';

type Row = Record<string, unknown>;

const ids = (register: Record<string, unknown>, key: 'questions' | 'claims'): string[] =>
  (Array.isArray(register[key]) ? (register[key] as Row[]) : [])
    .map((row) => row.id)
    .filter((id): id is string => typeof id === 'string');

const register = loadYaml<Record<string, unknown>>(repoPath('intake', 'register.yaml'));
const listed = parseRedirects(loadYaml(repoPath('redirects.yaml')));
const text = redirectFileText(
  allRedirects(listed, ids(register, 'questions'), ids(register, 'claims')),
);

const file = repoPath('public', '_redirects');
const before = (() => {
  try {
    return readText(file);
  } catch {
    return '';
  }
})();

if (before === text) {
  console.log(`redirects: ${relative(file)} is already current`);
} else {
  writeFileSync(file, text, 'utf8');
  console.log(`redirects: wrote ${relative(file)}`);
}
