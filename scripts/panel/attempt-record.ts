/**
 * Turn one private attempt directory into the public record of that attempt.
 *
 *   tsx scripts/panel/attempt-record.ts <attempt-dir> --attempt 1 [--schema valid|invalid|not-reached]
 *
 * This is the only place that decides what crosses from the private archive
 * into a manifest anyone can read, and the rule is that a filesystem path never
 * does. What crosses is the opaque attempt id, the profile, the exact exit code,
 * the canary and structural verdicts, the context-proof status, and content
 * hashes. Someone auditing a published verdict can quote an id and ask for the
 * bytes; nobody needs to learn where on the founder's machine they live, and a
 * hash of a package is not the package.
 *
 * `context_proof` and `admitted_for_research` are carried deliberately, and
 * from methodology v1.29 so are `upstream`, `pins_source` and the request
 * counts. A reader of a manifest row should be able to see, without reading any
 * code, whether the outgoing request was captured and checked, what it was
 * checked against, and whether the run was admitted. A proved request and an
 * admitted run are different facts and the row shows both.
 *
 * A directory from a refusal has almost nothing in it, and that is the correct
 * record: an id, a blocked status, a reason, the package hash, and no output
 * hashes, because nothing ran.
 */
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256File } from '../lib/repo.ts';

export type AttemptRecord = {
  attempt: number;
  attempt_id: string;
  status: string;
  purpose?: string;
  /** Absent when the CLI was never started. Never defaulted to 0. */
  exit_code?: number;
  profile?: string;
  model_id?: string;
  reasoning_effort?: string;
  cli_version?: string;
  /**
   * What `claude --version` on PATH reported, or "absent". From v1.29 the
   * launcher runs the pinned build rather than the PATH command, so the two can
   * differ and a reader should be able to see that they did.
   */
  path_cli_version?: string;
  canary?: string;
  structure?: string;
  context_proof?: string;
  canary_context_proof?: string;
  admitted_for_research?: boolean;
  /** Why a run that passed every check was or was not admitted. */
  admission_reason?: string;
  /** "built-in" or "override": which pin table the request proof compared against. */
  pins_source?: string;
  /**
   * The base URL the capture was taken against. Carried because a proof taken
   * against a loopback stub reads exactly like one taken against the API unless
   * the row says which it was. Absent on manifests written before v1.29.
   */
  upstream?: string;
  canary_upstream?: string;
  vendor_prompt_sha256?: string;
  canary_vendor_prompt_sha256?: string;
  tool_definitions_sha256?: Record<string, string>;
  canary_tool_definitions_sha256?: Record<string, string>;
  request_count?: number;
  canary_request_count?: number;
  main_turn_count?: number;
  canary_main_turn_count?: number;
  side_request_counts?: Record<string, number>;
  canary_side_request_counts?: Record<string, number>;
  /** Hash over the sorted list of every capture file and its own hash. */
  requests_manifest_sha256?: string;
  canary_requests_manifest_sha256?: string;
  /** The report the context proof was read off. */
  proof_report_sha256?: string;
  /** Whether a retained final message passed `prompts/review-schema.json`. */
  schema?: string;
  reason?: string;
  package_sha256?: string;
  /**
   * The research stdout and final message. Absent on every attempt that never
   * sent a package: a refusal, or a diagnostic.
   */
  stdout_sha256?: string;
  final_message_sha256?: string;
  canary_stdout_sha256?: string;
  canary_stderr_sha256?: string;
  /** The complete diagnostic final message, footer included. */
  canary_final_message_sha256?: string;
  /** The boundary report the verdict was actually read off. */
  canary_report_sha256?: string;
  /**
   * The validator's complaints about a rejected response. Hashed here rather
   * than in the launcher because the schema check happens after the launcher
   * has exited and written its metadata.
   */
  validation_errors_sha256?: string;
};

const readMaybe = (file: string): string | undefined =>
  existsSync(file) ? readFileSync(file, 'utf8').trim() : undefined;

/** Hashes the launcher records as the literal string "absent" are not hashes. */
const realHash = (value: unknown): string | undefined =>
  typeof value === 'string' && value !== 'absent' && value !== '' ? value : undefined;

/**
 * Copy the named keys that are actually present. A key the launcher never wrote
 * stays out of the row entirely, so a reader can tell "not recorded" from a
 * value, which is the rule every optional manifest field here follows.
 */
const copy = (metadata: Record<string, unknown>, keys: string[]): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const key of keys) {
    const value = metadata[key];
    if (value === undefined || value === null || value === '' || value === 'absent') continue;
    out[key] = value;
  }
  return out;
};

function attemptRecord(dir: string, attempt: number, schema?: string): AttemptRecord {
  let metadata: Record<string, unknown> = {};
  const raw = readMaybe(path.join(dir, 'metadata.json'));
  if (raw) {
    try {
      metadata = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      // A truncated metadata file means the launcher was killed mid-write. The
      // attempt is still recorded, without the fields it never finished.
    }
  }

  const text = (key: string): string | undefined => {
    const value = metadata[key];
    return typeof value === 'string' && value !== '' ? value : undefined;
  };
  const exitCode = metadata.exit_code;
  // Written by the runner after the launcher's EXIT trap has already produced
  // metadata.json, so the launcher never sees it and this is the only place it
  // can be turned into a hash.
  const errorsFile = path.join(dir, 'validation-errors.txt');
  const validationErrors = existsSync(errorsFile)
    ? sha256File(errorsFile)
    : undefined;

  return {
    attempt,
    attempt_id: text('attempt_id') ?? readMaybe(path.join(dir, 'attempt-id.txt')) ?? 'unrecorded',
    // A directory with no readable metadata at all is a launcher that died
    // before writing any, which is a failure however it looked from outside.
    status: text('status') ?? readMaybe(path.join(dir, 'status.txt')) ?? 'incomplete',
    ...(text('purpose') ? { purpose: text('purpose') } : {}),
    ...(typeof exitCode === 'number' ? { exit_code: exitCode } : {}),
    ...(text('profile') ? { profile: text('profile') } : {}),
    ...(text('model_id') ? { model_id: text('model_id') } : {}),
    ...(text('reasoning_effort') ? { reasoning_effort: text('reasoning_effort') } : {}),
    ...(text('cli_version') ? { cli_version: text('cli_version') } : {}),
    ...(text('path_cli_version') ? { path_cli_version: text('path_cli_version') } : {}),
    ...(text('canary') ? { canary: text('canary') } : {}),
    ...(text('structure') ? { structure: text('structure') } : {}),
    // Defaulted, not optional: a row that omits these reads as if the question
    // was never asked, and it always is.
    context_proof: text('context_proof') ?? 'unavailable',
    admitted_for_research: metadata.admitted_for_research === true,
    ...(text('canary_context_proof') ? { canary_context_proof: text('canary_context_proof') } : {}),
    ...(text('admission_reason') ? { admission_reason: text('admission_reason') } : {}),
    ...(text('pins_source') ? { pins_source: text('pins_source') } : {}),
    ...(schema ? { schema } : {}),
    ...(text('reason') ? { reason: text('reason') } : {}),
    ...(realHash(metadata.package_sha256) ? { package_sha256: metadata.package_sha256 as string } : {}),
    ...(realHash(metadata.stdout_sha256) ? { stdout_sha256: metadata.stdout_sha256 as string } : {}),
    ...(realHash(metadata.final_message_sha256)
      ? { final_message_sha256: metadata.final_message_sha256 as string }
      : {}),
    ...(realHash(metadata.canary_stdout_sha256)
      ? { canary_stdout_sha256: metadata.canary_stdout_sha256 as string }
      : {}),
    ...(realHash(metadata.canary_stderr_sha256)
      ? { canary_stderr_sha256: metadata.canary_stderr_sha256 as string }
      : {}),
    ...(realHash(metadata.canary_final_message_sha256)
      ? { canary_final_message_sha256: metadata.canary_final_message_sha256 as string }
      : {}),
    ...(realHash(metadata.canary_report_sha256)
      ? { canary_report_sha256: metadata.canary_report_sha256 as string }
      : {}),
    ...(realHash(metadata.proof_report_sha256)
      ? { proof_report_sha256: metadata.proof_report_sha256 as string }
      : {}),
    // The request-capture fields (methodology v1.29). Every one is optional and
    // a missing one means the capture was not taken or not recorded, never that
    // it passed. `cli_executable`, `cli_executable_sha256` and `work_dir` are
    // deliberately not among them: they name paths on the founder's machine and
    // stay in the private archive. Which build ran is public as `cli_version`.
    ...copy(metadata, [
      'upstream',
      'canary_upstream',
      'vendor_prompt_sha256',
      'canary_vendor_prompt_sha256',
      'tool_definitions_sha256',
      'canary_tool_definitions_sha256',
      'request_count',
      'canary_request_count',
      'main_turn_count',
      'canary_main_turn_count',
      'side_request_counts',
      'canary_side_request_counts',
      'requests_manifest_sha256',
      'canary_requests_manifest_sha256',
    ]),
    ...(validationErrors === undefined ? {} : { validation_errors_sha256: validationErrors }),
  };
}

/**
 * True when this file is the script node was told to run.
 *
 * Comparing `import.meta.url` to `process.argv[1]` directly is the usual idiom
 * and it is wrong through a symlink: node reports the resolved path in
 * `import.meta.url` while argv keeps the link, the comparison quietly fails,
 * and the script exits 0 having done nothing. A caller reading its stdout then
 * gets an empty string and no error, which is how a manifest ended up with no
 * record of the attempt it had just made.
 */
function isEntryPoint(): boolean {
  const invoked = process.argv[1];
  if (!invoked) return false;
  try {
    return realpathSync(invoked) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  const [dir, ...rest] = process.argv.slice(2);
  if (!dir) {
    console.error('usage: tsx scripts/panel/attempt-record.ts <attempt-dir> --attempt <n> [--schema <verdict>]');
    process.exit(2);
  }
  const flags: Record<string, string> = {};
  for (let index = 0; index < rest.length; index += 2) {
    const flag = rest[index];
    const value = rest[index + 1];
    if (!flag?.startsWith('--') || value === undefined) {
      console.error(`bad arguments near "${flag ?? ''}"`);
      process.exit(2);
    }
    flags[flag.slice(2)] = value;
  }
  console.log(JSON.stringify(attemptRecord(dir, Number(flags.attempt ?? '1'), flags.schema)));
}
