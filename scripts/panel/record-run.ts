/**
 * Append or update one reviewer's entry in a run's `run.yaml` manifest.
 *
 * The manifest is what makes a published verdict auditable (spec §5.2, §8): it
 * records which CLI at which version ran which model, in which seat, at which
 * reasoning effort, against which prompt hash under which methodology version,
 * and when. Bit-exact reproduction of a subscription-CLI model is impossible;
 * saying exactly what ran is not.
 *
 * `seat` and `reasoning_effort` are required for new entries (methodology
 * v1.6). Manifests written before they existed simply lack the fields, and
 * every reader must treat a missing value as "not recorded" rather than as a
 * default.
 *
 * Re-running the same provider and round REPLACES its entry rather than adding
 * a second one, so a retried reviewer leaves one row describing what finally
 * happened, with its attempt count.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { currentMethodologyVersion, relative } from '../lib/repo.ts';

type RunEntry = {
  provider: string;
  round: number;
  command: string;
  cli_version: string;
  model_id: string;
  /** Absent on runs recorded before methodology v1.6; never defaulted. */
  seat?: string;
  /** Absent on runs recorded before methodology v1.6; never defaulted. */
  reasoning_effort?: string;
  prompt_sha256: string;
  methodology_version: string;
  started_at: string;
  finished_at: string;
  attempts: number;
  status: 'ok' | 'failed' | 'blocked';
  package_files?: string[];
  /**
   * One row per attempt (methodology v1.28): opaque attempt id, the isolation
   * profile it ran under, the canary and boundary verdicts, the exact exit code
   * and content hashes. From v1.29 a row also carries the request-capture
   * fields — the context-proof status, whether the run was admitted for
   * research and why, the upstream the capture was taken against, the request
   * count and the capture manifest hash. From v1.30 it carries how many captured
   * requests held the declared package, and the names and line counts of the
   * private sources the capture was searched for. From v1.31 a row also carries
   * `record_kind`, which says whether the denylist ran over the outgoing request
   * or over the CLI's own local record, and `context_proof` may read
   * `record-only` for the Gemini seat, whose CLI exposes no capture route at
   * all. The v1.29 pin fields
   * (`pins_source`, the vendor-prompt and tool-definition hashes, the main-turn
   * and side-request counts) are no longer written, because the check that
   * produced them is gone. Each field is absent on every manifest written before
   * the release that added it, no old row is rewritten, and a missing value
   * means "not recorded" — never "passed".
   *
   * Deliberately no filesystem path and no CLI executable path. The raw bytes
   * live in a private archive outside every repository; the id is what an
   * auditor quotes to ask for them.
   */
  attempts_detail?: Record<string, unknown>[];
};

type Manifest = {
  story: string;
  date: string;
  methodology_version: string;
  runs: RunEntry[];
};

function parseArgs(argv: string[]): Record<string, string> {
  const values: Record<string, string> = {};
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith('--') || value === undefined) {
      throw new Error(`bad arguments near "${flag ?? ''}"`);
    }
    values[flag.slice(2)] = value;
  }
  return values;
}

function required(values: Record<string, string>, key: string): string {
  const value = values[key];
  if (value === undefined || value === '') throw new Error(`--${key} is required`);
  return value;
}

function parseStatus(value: string | undefined): RunEntry['status'] {
  if (value === 'ok' || value === 'failed' || value === 'blocked') return value;
  throw new Error(`--status must be ok, failed or blocked, got "${value ?? ''}"`);
}

/**
 * The per-attempt rows arrive as JSON on the command line, because the runner
 * that assembles them is a shell script. Malformed JSON throws rather than
 * being dropped: a manifest that silently loses the record of what ran is the
 * problem this field exists to fix.
 */
function attemptsDetail(value: string | undefined): { attempts_detail: Record<string, unknown>[] } | undefined {
  if (!value || value === '[]') return undefined;
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) throw new Error('--attempts-detail must be a JSON array');
  return { attempts_detail: parsed as Record<string, unknown>[] };
}

const values = parseArgs(process.argv.slice(2));
const manifestPath = path.resolve(required(values, 'manifest'));

const manifest: Manifest = existsSync(manifestPath)
  ? (YAML.parse(readFileSync(manifestPath, 'utf8')) as Manifest)
  : {
      story: required(values, 'story'),
      date: required(values, 'date'),
      methodology_version: currentMethodologyVersion(),
      runs: [],
    };

manifest.runs ??= [];

const entry: RunEntry = {
  provider: required(values, 'provider'),
  round: Number(required(values, 'round')),
  command: required(values, 'command'),
  cli_version: values.cli_version ?? 'unknown',
  model_id: required(values, 'model'),
  seat: required(values, 'seat'),
  reasoning_effort: required(values, 'effort'),
  prompt_sha256: required(values, 'prompt-sha256'),
  methodology_version: currentMethodologyVersion(),
  started_at: required(values, 'started-at'),
  finished_at: required(values, 'finished-at'),
  attempts: Number(values.attempts ?? '1'),
  status: parseStatus(values.status),
  ...(values['package-files'] ? { package_files: values['package-files'].split(',') } : {}),
  ...(attemptsDetail(values['attempts-detail']) ?? {}),
};

const existing = manifest.runs.findIndex(
  (run) => run.provider === entry.provider && run.round === entry.round,
);
if (existing === -1) manifest.runs.push(entry);
else manifest.runs[existing] = entry;

manifest.runs.sort((a, b) => a.round - b.round || a.provider.localeCompare(b.provider));

mkdirSync(path.dirname(manifestPath), { recursive: true });
writeFileSync(manifestPath, YAML.stringify(manifest, { lineWidth: 0 }));
console.log(`recorded ${entry.provider} round ${entry.round} (${entry.status}) in ${relative(manifestPath)}`);
