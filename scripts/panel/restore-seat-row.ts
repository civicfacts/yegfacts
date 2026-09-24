/**
 * Rebuild one lost GPT-6 Luna row in a run manifest from its retained attempts.
 *
 *   tsx scripts/panel/restore-seat-row.ts <run.yaml> --round <1|2> --attempts <archive dir>
 *
 * `<archive dir>` is the private `<slot>/<timestamp>` directory that
 * run-reviewer.sh created for the run, holding `attempt-N/`. The row is built
 * the way run-reviewer.sh and record-run.ts build it: the same fields, the
 * per-attempt rows from attempt-record.ts (so no private path crosses), the
 * package hash of the last attempt as `prompt_sha256`, `started_at` from the
 * archive timestamp that run-reviewer.sh stamps a second before its own start
 * time, and `finished_at` from the last attempt's launcher finish time (the
 * runner's own finish stamp was never kept and is up to a second later).
 *
 * Refuses, writing nothing, unless the attempts belong to this manifest:
 * - every retained `package.md` hashes to what its metadata recorded;
 * - in round 1, the package hash equals every other round-1 row's
 *   `prompt_sha256`, because every seat gets the identical blind package;
 * - in round 2, the package embeds this run's combined evidence and the other
 *   seats' round-1 reviews byte for byte;
 * - the last attempt's final message, extracted and stamped as run-reviewer.sh
 *   does, reproduces the review file in `round<N>/` byte for byte;
 * - the manifest has no row for this seat in this round already.
 *
 * Only the Luna seat is supported: it is the only one the provider-keyed
 * manifest ever lost (methodology v1.37 put two OpenAI seats on one panel).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { sha256File } from '../lib/repo.ts';

const SEAT = {
  slot: 'gpt-luna',
  provider: 'openai',
  model: 'gpt-6-luna',
  seat: 'GPT-6 Luna',
  effort: 'high',
  cliName: 'codex-cli',
};

type Row = Record<string, unknown> & { provider: string; round: number; seat?: string; model_id?: string };

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TSX = path.join(HERE, '../../node_modules/.bin/tsx');

function fail(message: string): never {
  console.error(`restore-seat-row: ${message}`);
  process.exit(1);
}

const [manifestArg, ...rest] = process.argv.slice(2);
const flags: Record<string, string> = {};
for (let index = 0; index < rest.length; index += 2) flags[rest[index]!.replace(/^--/, '')] = rest[index + 1]!;
if (!manifestArg || !flags.round || !flags.attempts) {
  fail('usage: restore-seat-row.ts <run.yaml> --round <1|2> --attempts <archive dir>');
}
const manifestPath = path.resolve(manifestArg);
const runDir = path.dirname(manifestPath);
const round = Number(flags.round);
const base = path.resolve(flags.attempts);

const manifest = YAML.parse(readFileSync(manifestPath, 'utf8')) as { runs: Row[] };
const seatKey = (run: Row): string => run.seat ?? run.model_id ?? '';
if (manifest.runs.some((run) => run.round === round && run.provider === SEAT.provider && seatKey(run) === SEAT.seat)) {
  fail(`${manifestArg} already has a ${SEAT.seat} row for round ${round}`);
}
const siblings = manifest.runs.filter((run) => run.round === round);
if (siblings.length === 0) fail(`${manifestArg} has no round-${round} rows to match against`);

const attemptDirs = readdirSync(base)
  .filter((name) => /^attempt-\d+$/.test(name))
  .sort((a, b) => Number(a.slice(8)) - Number(b.slice(8)))
  .map((name) => path.join(base, name));
if (attemptDirs.length === 0) fail(`no attempt-N directories under the archive dir`);

const metadata = attemptDirs.map((dir) => JSON.parse(readFileSync(path.join(dir, 'metadata.json'), 'utf8')) as Record<string, unknown>);
for (const [index, dir] of attemptDirs.entries()) {
  const meta = metadata[index]!;
  if (meta.model_id !== SEAT.model) fail(`attempt ${index + 1} ran ${String(meta.model_id)}, not ${SEAT.model}`);
  if (sha256File(path.join(dir, 'package.md')) !== meta.package_sha256) {
    fail(`attempt ${index + 1}: package.md does not hash to the recorded package_sha256`);
  }
}
const lastDir = attemptDirs.at(-1)!;
const last = metadata.at(-1)!;
if (last.status !== 'ok' || last.admitted_for_research !== true) fail('the last attempt was not an admitted, passing run');
const packageSha = last.package_sha256 as string;
const packageText = readFileSync(path.join(lastDir, 'package.md'), 'utf8');

let packageFiles: string[];
if (round === 1) {
  for (const run of siblings) {
    if (run.prompt_sha256 !== packageSha) {
      fail(`round-1 package ${packageSha} differs from ${seatKey(run)}'s ${String(run.prompt_sha256)}`);
    }
  }
  packageFiles = ['brief.md', 'reviewer.md', 'review-schema.json'];
} else {
  const embedded = [path.join(runDir, 'combined-evidence.json')];
  const others = readdirSync(path.join(runDir, 'round1'))
    .filter((name) => name.endsWith('.json') && name !== `${SEAT.slot}.json`)
    .sort();
  for (const name of others) embedded.push(path.join(runDir, 'round1', name));
  for (const file of embedded) {
    if (!packageText.includes(readFileSync(file, 'utf8'))) {
      fail(`round-2 package does not embed ${path.relative(runDir, file)} byte for byte`);
    }
  }
  packageFiles = [
    'brief.md',
    'cross-review.md',
    'review-schema.json',
    'combined-evidence.json',
    ...others.map((name) => `other-review-${name}`),
  ];
}

// The review this attempt produced, rebuilt exactly as run-reviewer.sh builds it.
const scratch = mkdtempSync(path.join(tmpdir(), 'restore-seat-row-'));
try {
  const staged = path.join(scratch, 'review.json');
  execFileSync(TSX, [path.join(HERE, 'extract-review.ts'), path.join(lastDir, 'final-message.txt'), staged], {
    stdio: 'pipe',
  });
  const review = JSON.parse(readFileSync(staged, 'utf8')) as { reviewer?: Record<string, unknown> };
  review.reviewer = {
    ...review.reviewer,
    provider: SEAT.provider,
    runner_model: SEAT.model,
    runner_seat: SEAT.seat,
    runner_effort: SEAT.effort,
  };
  const installed = path.join(runDir, `round${round}`, `${SEAT.slot}.json`);
  if (!existsSync(installed) || readFileSync(installed, 'utf8') !== JSON.stringify(review, null, 2) + '\n') {
    fail(`the last attempt's final message does not reproduce round${round}/${SEAT.slot}.json`);
  }
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

const attemptsDetail = attemptDirs.map((dir, index) => {
  const schema = index === attemptDirs.length - 1 ? 'valid' : 'invalid';
  const out = execFileSync(
    TSX,
    [path.join(HERE, 'attempt-record.ts'), dir, '--attempt', String(index + 1), '--schema', schema],
    { encoding: 'utf8' },
  );
  return JSON.parse(out) as Record<string, unknown>;
});

const stamp = path.basename(base).match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
if (!stamp) fail(`archive dir name is not a run timestamp`);
const methodology = [...new Set(siblings.map((run) => run.methodology_version))];
if (methodology.length !== 1) fail(`round-${round} rows disagree on methodology_version`);

const row: Row = {
  provider: SEAT.provider,
  round,
  command: `scripts/panel/invoke-reviewer.sh --provider ${SEAT.provider} --model ${SEAT.model} --effort ${SEAT.effort} --package package.md`,
  cli_version: `${SEAT.cliName} ${String(last.cli_version)}`,
  model_id: SEAT.model,
  seat: SEAT.seat,
  reasoning_effort: SEAT.effort,
  prompt_sha256: packageSha,
  methodology_version: methodology[0],
  started_at: `${stamp[1]}-${stamp[2]}-${stamp[3]}T${stamp[4]}:${stamp[5]}:${stamp[6]}Z`,
  finished_at: last.finished_at,
  attempts: attemptDirs.length,
  status: 'ok',
  package_files: packageFiles,
  attempts_detail: attemptsDetail,
};

manifest.runs.push(row);
manifest.runs.sort(
  (a, b) => a.round - b.round || a.provider.localeCompare(b.provider) || seatKey(a).localeCompare(seatKey(b)),
);
writeFileSync(manifestPath, YAML.stringify(manifest, { lineWidth: 0 }));
console.log(
  `restored ${SEAT.seat} round ${round}: attempt ${attemptsDetail.map((detail) => detail.attempt_id).join(', ')}, package ${packageSha}`,
);
