/**
 * Read what a reviewer CLI actually did, from its own structured stream, and
 * say plainly which of two very different questions the answer settles.
 *
 * QUESTION ONE, which the stream answers: what was the run configured to do and
 * what did it do? `claude --output-format stream-json --verbose` opens with a
 * `system/init` event naming the tool inventory, MCP servers, skills, plugins,
 * slash commands, agents and CLI version, carries a `tool_use` for every tool
 * call and a matching `tool_result` for every outcome, and closes with a
 * `result` event holding the complete final text, the permission denials and
 * the subagent counters. That is the host reporting on itself, and it is
 * checkable.
 *
 * QUESTION TWO, which the stream does NOT answer: what context was actually
 * sent? Nothing in the stream carries the outgoing request, and until
 * 2026-09-15 nothing inspected in Claude Code did. What answers it is the
 * request itself: Claude Code 2.1.272 honours `ANTHROPIC_BASE_URL`, so
 * `record-proxy.mjs` retains every request the CLI addressed to the API and
 * `request-proof.ts` checks it against a pinned description of a clean one.
 *
 * So `contextProof()` stopped being a constant. It takes that proof and returns
 * `pass`, `fail`, or `unavailable` when no capture was taken, and
 * `admitForResearch` admits a structurally clean stream only when the proof
 * passed. The structural checks still all apply; they were never the contract
 * on their own and they still are not.
 *
 * WHAT A PASS DOES NOT COVER. The proxy sees what the CLI sends to its
 * configured base URL and nothing else on the machine. The vendor prompt is
 * pinned by hash, not read. The request carries the operator's account email
 * and working directory in the vendor's own reminder blocks; those are recorded
 * and published as host context, not treated as absent. Codex and Google have
 * no capture-backed profile, so their seats stay blocked.
 */
import { readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { type ProofResult, loadPins, proveRequests, readCapture } from './request-proof.ts';

type Json = Record<string, unknown>;

const asRecord = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null;

/**
 * Names out of a list the CLI may render as bare strings or as objects.
 * `tools` and `skills` are strings today; `mcp_servers` is `{name, status}`.
 * Both collapse to a name so a new wrapper object cannot quietly empty a list
 * a check requires to be empty. `null` means the field was absent, which is
 * never the same as empty: absent evidence fails, empty evidence passes.
 */
function names(value: unknown): string[] | null {
  if (value === undefined || value === null) return null;
  if (!Array.isArray(value)) return null;
  return value.map((item) => {
    if (typeof item === 'string') return item;
    const record = asRecord(item);
    const name = record?.name ?? record?.id;
    return typeof name === 'string' ? name : JSON.stringify(item);
  });
}

export type ToolCall = {
  id: string;
  name: string;
  input: Json | null;
  /** Absent when no `tool_result` carried this id. */
  result?: { text: string; is_error: boolean };
};

export type StreamFacts = {
  /** Event `type`/`subtype` pairs in order, for the ordering checks. */
  event_types: string[];
  init_count: number;
  result_count: number;
  /** Lines that were not JSON. Any at all is a malformed stream. */
  unparsed_lines: number;
  cli_version: string | null;
  cwd: string | null;
  permission_mode: string | null;
  output_style: string | null;
  tools: string[] | null;
  mcp_servers: string[] | null;
  slash_commands: string[] | null;
  skills: string[] | null;
  plugins: string[] | null;
  agents: string[] | null;
  tool_calls: ToolCall[];
  /**
   * Maximal runs of consecutive assistant events. The CLI emits one assistant
   * event per content block, so counting events counts blocks; a run between
   * two user events is one API turn, and that is the number the request capture
   * has to agree with.
   */
  assistant_turns: number;
  duplicate_tool_use_ids: string[];
  orphan_tool_result_ids: string[];
  permission_denials: string[] | null;
  subagents_spawned: number | null;
  result_subtype: string | null;
  is_error: boolean | null;
  /** `result.result` verbatim: the complete final message, footer included. */
  final_text: string | null;
};

/**
 * Built-in agent definitions the CLI lists at 2.1.266 even under `--safe-mode`.
 * They are inert here rather than trusted: with the tool inventory restricted
 * to WebFetch and WebSearch there is no Task tool to launch one, and
 * `checkStructure` proves both that separately and that `subagent_stats.spawned`
 * came back zero. An agent name outside this set means a custom agent loaded,
 * which is a customization leak whether or not it could run.
 */
const BUILT_IN_AGENTS = new Set(['claude', 'Explore', 'general-purpose', 'Plan']);

/** Any tool that can start another turn with a context we did not compose. */
const SPAWNING_TOOLS = new Set(['Task', 'Agent', 'ToolSearchTool']);

export function readStream(text: string): StreamFacts {
  const facts: StreamFacts = {
    event_types: [],
    init_count: 0,
    result_count: 0,
    unparsed_lines: 0,
    cli_version: null,
    cwd: null,
    permission_mode: null,
    output_style: null,
    tools: null,
    mcp_servers: null,
    slash_commands: null,
    skills: null,
    plugins: null,
    agents: null,
    tool_calls: [],
    assistant_turns: 0,
    duplicate_tool_use_ids: [],
    orphan_tool_result_ids: [],
    permission_denials: null,
    subagents_spawned: null,
    result_subtype: null,
    is_error: null,
    final_text: null,
  };

  const byId = new Map<string, ToolCall>();
  let lastRole: 'assistant' | 'user' | null = null;

  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    let event: Json | null = null;
    try {
      event = asRecord(JSON.parse(line));
    } catch {
      event = null;
    }
    if (!event) {
      // A banner, a crash message or a truncated line. Counted, never skipped
      // over quietly: a stream we could not fully read is not one we can vouch
      // for, and the raw bytes are retained for a person to look at.
      facts.unparsed_lines += 1;
      continue;
    }

    const type = typeof event.type === 'string' ? event.type : '?';
    const subtype = typeof event.subtype === 'string' ? event.subtype : '';
    facts.event_types.push(subtype ? `${type}/${subtype}` : type);

    if (type === 'system' && subtype === 'init') {
      facts.init_count += 1;
      facts.cli_version = typeof event.claude_code_version === 'string' ? event.claude_code_version : null;
      facts.cwd = typeof event.cwd === 'string' ? event.cwd : null;
      facts.permission_mode = typeof event.permissionMode === 'string' ? event.permissionMode : null;
      facts.output_style = typeof event.output_style === 'string' ? event.output_style : null;
      const tools = names(event.tools);
      facts.tools = tools === null ? null : [...tools].sort();
      facts.mcp_servers = names(event.mcp_servers);
      facts.slash_commands = names(event.slash_commands);
      facts.skills = names(event.skills);
      facts.plugins = names(event.plugins);
      facts.agents = names(event.agents);
      continue;
    }

    if (type === 'assistant' || type === 'user') {
      if (type === 'assistant' && lastRole !== 'assistant') facts.assistant_turns += 1;
      lastRole = type;
    }

    // A `tool_use` arrives on an assistant event and its outcome comes back on
    // the next user event as a `tool_result` carrying the same id. Pairing them
    // is the difference between "the model said it fetched a page" and "the
    // fetch returned this".
    const content = asRecord(event.message)?.content;
    if (Array.isArray(content)) {
      for (const raw of content) {
        const block = asRecord(raw);
        if (!block) continue;
        if (block.type === 'tool_use' && typeof block.id === 'string' && typeof block.name === 'string') {
          if (byId.has(block.id)) facts.duplicate_tool_use_ids.push(block.id);
          const call: ToolCall = { id: block.id, name: block.name, input: asRecord(block.input) };
          byId.set(block.id, call);
          facts.tool_calls.push(call);
        }
        if (block.type === 'tool_result' && typeof block.tool_use_id === 'string') {
          const call = byId.get(block.tool_use_id);
          if (!call) {
            facts.orphan_tool_result_ids.push(block.tool_use_id);
            continue;
          }
          call.result = {
            // `content` is a bare string on a WebFetch result and an array of
            // blocks elsewhere; stringify covers both without guessing.
            text: typeof block.content === 'string' ? block.content : JSON.stringify(block.content ?? null),
            is_error: block.is_error === true,
          };
        }
      }
    }

    if (type === 'result') {
      facts.result_count += 1;
      facts.result_subtype = subtype || null;
      facts.is_error = typeof event.is_error === 'boolean' ? event.is_error : null;
      facts.final_text = typeof event.result === 'string' ? event.result : null;
      facts.permission_denials = names(event.permission_denials);
      const stats = asRecord(event.subagent_stats);
      facts.subagents_spawned = typeof stats?.spawned === 'number' ? stats.spawned : null;
    }
  }

  return facts;
}

export type Verdict = { ok: boolean; failures: string[] };

export type StructureExpectation = {
  /** Exactly the tools the profile allows. Anything more or less fails. */
  allowedTools: string[];
  /** Versions actually probed. An unknown version fails closed. */
  supportedVersions: string[];
};

/**
 * Everything the stream can settle about how the run was configured and what it
 * did. Every missing piece of evidence is a failure, because "the field was not
 * there" and "the field was empty" have to mean different things or the check
 * is worthless against a future CLI that stops emitting it.
 *
 * Passing this does NOT mean the run was isolated. See `contextProof`.
 */
export function checkStructure(facts: StreamFacts, expected: StructureExpectation): Verdict {
  const failures: string[] = [];
  const first = facts.event_types[0];
  const last = facts.event_types[facts.event_types.length - 1];

  if (facts.unparsed_lines > 0) {
    failures.push(`${facts.unparsed_lines} line(s) of the stream were not JSON`);
  }
  if (facts.init_count !== 1) failures.push(`expected exactly one system/init event, saw ${facts.init_count}`);
  if (facts.result_count !== 1) failures.push(`expected exactly one result event, saw ${facts.result_count}`);
  if (facts.init_count > 0 && first !== 'system/init') failures.push(`the stream opened with "${first}", not system/init`);
  if (facts.result_count > 0 && last?.startsWith('result') !== true) {
    failures.push(`the stream ended with "${last}", not a result event`);
  }
  if (facts.duplicate_tool_use_ids.length > 0) {
    failures.push(`repeated tool_use ids: ${facts.duplicate_tool_use_ids.join(', ')}`);
  }
  if (facts.orphan_tool_result_ids.length > 0) {
    failures.push(`tool_result with no matching tool_use: ${facts.orphan_tool_result_ids.join(', ')}`);
  }

  if (facts.cli_version === null) {
    failures.push('the run reported no CLI version');
  } else if (!expected.supportedVersions.includes(facts.cli_version)) {
    failures.push(
      `CLI version ${facts.cli_version} has no probed profile (probed: ${expected.supportedVersions.join(', ')})`,
    );
  }

  const wanted = [...expected.allowedTools].sort();
  if (facts.tools === null) {
    failures.push('the run reported no tool inventory');
  } else if (facts.tools.length !== wanted.length || facts.tools.some((tool, index) => tool !== wanted[index])) {
    failures.push(`tool inventory was [${facts.tools.join(', ')}], expected exactly [${wanted.join(', ')}]`);
  }

  for (const [label, list] of [
    ['MCP servers', facts.mcp_servers],
    ['slash commands', facts.slash_commands],
    ['skills', facts.skills],
    ['plugins', facts.plugins],
  ] as const) {
    if (list === null) failures.push(`the run did not report its ${label}`);
    else if (list.length > 0) failures.push(`${label} were loaded: ${list.join(', ')}`);
  }

  if (facts.agents === null) {
    failures.push('the run did not report its agent definitions');
  } else {
    const custom = facts.agents.filter((agent) => !BUILT_IN_AGENTS.has(agent));
    if (custom.length > 0) failures.push(`custom agents were loaded: ${custom.join(', ')}`);
  }
  const spawning = (facts.tools ?? []).filter((tool) => SPAWNING_TOOLS.has(tool));
  if (spawning.length > 0) failures.push(`a context-spawning tool was available: ${spawning.join(', ')}`);

  if (facts.output_style !== 'default') {
    failures.push(`output style was "${facts.output_style ?? 'not reported'}", not "default"`);
  }

  // The tools the model was handed and the tools it actually reached for are
  // different facts. Checking only the first misses a tool that appeared after
  // init, which is exactly the surprise worth catching.
  const used = [...new Set(facts.tool_calls.map((call) => call.name))].filter(
    (name) => !expected.allowedTools.includes(name),
  );
  if (used.length > 0) failures.push(`the run called tools outside the profile: ${used.join(', ')}`);

  if (facts.permission_denials === null) failures.push('the run did not report its permission denials');
  else if (facts.permission_denials.length > 0) {
    failures.push(`the run was denied tools it asked for: ${facts.permission_denials.join(', ')}`);
  }

  if (facts.subagents_spawned === null) failures.push('the run did not report its subagent counters');
  else if (facts.subagents_spawned > 0) failures.push(`${facts.subagents_spawned} subagent(s) were spawned`);

  if (facts.is_error === null) failures.push('the run did not report whether the turn errored');
  else if (facts.is_error) failures.push('the CLI reported the turn as an error');

  if (facts.result_subtype === null) failures.push('the run did not report a result subtype');
  else if (facts.result_subtype !== 'success') failures.push(`result subtype was "${facts.result_subtype}"`);

  if (facts.final_text === null || facts.final_text.trim() === '') {
    failures.push('the run returned no final message');
  }

  return { ok: failures.length === 0, failures };
}

export type ContextProof = { status: 'pass' | 'fail' | 'unavailable'; reason: string };

/**
 * Whether the actual context sent to the model was captured and inspected.
 *
 * Three answers, and the difference between them matters. `unavailable` means
 * no capture was taken, which is where every run before 2026-09-15 sits and
 * where a run without a proxy still sits: nothing was shown, so nothing is
 * claimed. `fail` means a capture was taken and the request was not the one the
 * profile pins. `pass` means every request the CLI sent to its base URL matched
 * the pinned shapes, for that attempt, under that CLI version.
 *
 * A pass is not a vendor guarantee and not a statement about anything the CLI
 * sent elsewhere. `request-proof.ts` says exactly what it covers.
 */
export function contextProof(proof: ProofResult | null): ContextProof {
  if (!proof) {
    return {
      status: 'unavailable',
      reason:
        'no request capture was taken for this attempt, so nothing establishes what the outgoing request ' +
        'contained. The absence of plugins, skills and MCP servers from the init inventory is evidence ' +
        'about loading, not about what was sent.',
    };
  }
  if (proof.status === 'pass') {
    return {
      status: 'pass',
      reason:
        `every request the CLI sent to ${proof.summary.upstream} was captured and matched the pinned ` +
        `profile for ${proof.summary.cli_version}: ${proof.summary.request_count} request(s), ` +
        `${proof.summary.main_turn_count} main turn(s). The account email and working directory the ` +
        'vendor reminder blocks carry are recorded in the proof report as disclosed host context.',
    };
  }
  return {
    status: 'fail',
    reason: `the captured request did not match the pinned profile: ${proof.failures.join('; ')}`,
  };
}

export type CanaryExpectation = StructureExpectation & {
  /** Synthetic token sitting in a file outside the working directory. */
  token: string;
  /** The page the canary was told to fetch. */
  expectedUrl: string;
  /** Ground truth that must appear in that fetch's own tool_result. */
  expectedHeading: string;
  /** The canary's complete raw stdout, searched for the token. */
  rawText: string;
};

/**
 * Both halves of the canary, judged on observed tool outcomes rather than on
 * what the model said afterwards.
 *
 * Negative: a synthetic token sits in a file one directory up and must not come
 * back anywhere in the raw bytes.
 *
 * Positive: a live fetch of a known public page must have actually succeeded.
 * Matching the `tool_result` to its `tool_use` id and reading the heading out of
 * that result is the point — a failed fetch followed by the model reciting
 * "Example Domain" from memory would sail through a check on the final text,
 * and would mean research had silently stopped working.
 *
 * The honest limit: a WebFetch `tool_result` is itself a summary produced by the
 * fetch tool, not the raw HTML. It is the observed outcome of the call rather
 * than the main model's recollection, which is a real improvement, and it is
 * still not the page bytes.
 */
export function checkCanary(facts: StreamFacts, expected: CanaryExpectation): Verdict {
  const failures = [...checkStructure(facts, expected).failures];

  if (expected.token !== '' && expected.rawText.includes(expected.token)) {
    failures.push('the synthetic canary token came back in the output: the file boundary leaked');
  }

  const fetches = facts.tool_calls.filter((call) => call.name === 'WebFetch');
  if (fetches.length === 0) {
    const used = facts.tool_calls.map((call) => call.name).join(', ') || 'none';
    failures.push(`no WebFetch call in the stream (tools called: ${used})`);
  }

  const matched = fetches.find(
    (call) =>
      typeof call.input?.url === 'string' &&
      String(call.input.url).startsWith(expected.expectedUrl) &&
      call.result !== undefined &&
      !call.result.is_error &&
      call.result.text.includes(expected.expectedHeading),
  );
  if (fetches.length > 0 && !matched) {
    const detail = fetches
      .map((call) => {
        const url = typeof call.input?.url === 'string' ? call.input.url : 'no url';
        if (!call.result) return `${url}: no tool_result`;
        return `${url}: ${call.result.is_error ? 'error' : 'ok'}, ${call.result.text.length} bytes`;
      })
      .join('; ');
    failures.push(
      `no successful WebFetch of ${expected.expectedUrl} whose own result contains "${expected.expectedHeading}" (${detail})`,
    );
  }

  return { ok: failures.length === 0, failures };
}

/**
 * The admission gate for real research. It is not a wrapper around
 * `checkStructure`: it adds the requirement that the context boundary was
 * actually demonstrated for this attempt. A clean stream with no capture is
 * still refused, which is the case every run before 2026-09-15 was in.
 */
export function admitForResearch(
  facts: StreamFacts,
  expected: StructureExpectation,
  proofResult: ProofResult | null,
): Verdict {
  const structure = checkStructure(facts, expected);
  const proof = contextProof(proofResult);
  const failures = [...structure.failures];
  if (proof.status !== 'pass') failures.push(`context proof ${proof.status}: ${proof.reason}`);
  return { ok: failures.length === 0, failures };
}

/**
 * CLI: report the facts, judge them under the named check, and split the
 * complete final message out as its own bytes.
 *
 *   tsx stream-boundary.ts <stream.jsonl> --report <out.json> [--final <out.txt>]
 *                          [--check canary|research] [--tools A,B]
 *                          [--versions X,Y] [--token T]
 *                          [--expect-url U] [--expect-heading S]
 *                          [--requests <dir> --package <file>
 *                           --work-dir <dir> --model <id> [--pins <file>]]
 *
 * With `--requests`, the capture in that directory is proved against the pins
 * for the CLI version the stream reported, and the proof goes into the report
 * beside the stream facts. Without it the context proof is `unavailable` and
 * `--check research` cannot pass.
 *
 * Exit 0 means the named check passed. Exit 1 prints the failures and writes the
 * report and the final message anyway, because a failed attempt is the one most
 * worth keeping.
 */
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
  const argv = process.argv.slice(2);
  const streamFile = argv[0];
  if (!streamFile || streamFile.startsWith('--')) {
    console.error('usage: tsx scripts/panel/stream-boundary.ts <stream.jsonl> --report <out.json> [...]');
    process.exit(2);
  }
  const flags: Record<string, string> = {};
  for (let index = 1; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith('--') || value === undefined) {
      console.error(`bad arguments near "${flag ?? ''}"`);
      process.exit(2);
    }
    flags[flag.slice(2)] = value;
  }

  const raw = readFileSync(streamFile, 'utf8');
  const facts = readStream(raw);
  const list = (value: string | undefined) =>
    (value ?? '').split(',').map((item) => item.trim()).filter(Boolean);
  const expectation: StructureExpectation = {
    allowedTools: list(flags.tools),
    supportedVersions: list(flags.versions),
  };

  // The proof runs before the verdict and is reported whatever the verdict is.
  // A canary whose stream passed and whose request did not is the interesting
  // case, and it has to be visible rather than folded into one word.
  let proof: ProofResult | null = null;
  if (flags.requests) {
    const capture = readCapture(flags.requests);
    proof = proveRequests({
      requests: capture.requests,
      upstream: capture.upstream,
      requestsManifestSha256: capture.requestsManifestSha256,
      packageText: flags.package ? readFileSync(flags.package, 'utf8') : '',
      workDir: flags['work-dir'] ?? '',
      model: flags.model ?? '',
      cliVersion: facts.cli_version ?? 'unknown',
      // Built-in unless a table is named. See loadPins for why that is possible
      // at all and what the launcher makes it cost.
      ...(flags.pins ? { pins: loadPins(flags.pins) } : {}),
      stream: {
        toolUseIds: facts.tool_calls.map((call) => call.id),
        assistantTurns: facts.assistant_turns,
      },
    });
  }

  let verdict: Verdict;
  switch (flags.check) {
    case 'canary': {
      verdict = checkCanary(facts, {
        ...expectation,
        token: flags.token ?? '',
        expectedUrl: flags['expect-url'] ?? '',
        expectedHeading: flags['expect-heading'] ?? '',
        rawText: raw,
      });
      // The canary proves the profile, so its own request is proved too. Without
      // this a failing canary capture would be written down and ignored.
      if (proof && proof.status !== 'pass') {
        verdict = { ok: false, failures: [...verdict.failures, ...proof.failures.map((f) => `request proof: ${f}`)] };
      }
      break;
    }
    case 'research':
      verdict = admitForResearch(facts, expectation, proof);
      break;
    default:
      console.error('--check must be canary or research');
      process.exit(2);
  }

  // The final message is written before the verdict is acted on, so a run that
  // failed every check still leaves its complete answer on disk.
  if (flags.final) writeFileSync(flags.final, facts.final_text ?? '');
  if (flags.report) {
    writeFileSync(
      flags.report,
      `${JSON.stringify(
        {
          check: flags.check,
          ...verdict,
          context_proof: contextProof(proof),
          request_proof: proof,
          facts,
        },
        null,
        2,
      )}\n`,
    );
  }

  if (!verdict.ok) {
    for (const failure of verdict.failures) console.error(`- ${failure}`);
    process.exit(1);
  }
}
