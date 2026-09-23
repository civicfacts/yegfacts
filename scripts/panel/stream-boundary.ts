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
 * sent? Nothing in the stream carries the outgoing request. What answers it is
 * the request itself: Claude Code honours `ANTHROPIC_BASE_URL`, so
 * `record-proxy.mjs` retains every request the CLI addressed to the API and
 * `capture-check.ts` searches those bytes for the private text that exists on
 * this machine.
 *
 * So `contextProof()` is not a constant. It takes the capture check's result and
 * returns `pass`, `fail`, `record-only`, or `unavailable` when nothing was
 * checked at all, and `admitForResearch` admits a structurally clean stream only
 * when the proof is one the seat accepts. The structural checks still all apply;
 * they were never the contract on their own and they still are not.
 *
 * WHAT A PASS DOES NOT COVER. From methodology v1.30 the capture check is a
 * denylist, not a description. It catches known private text from this machine.
 * It cannot catch text the vendor attaches that is not on this machine, and it
 * does not say what the request contains, only what it does not contain. The
 * proxy sees what the CLI sends to its configured base URL and nothing else on
 * the machine.
 *
 * THREE SEATS, THREE STREAMS, from methodology v1.31. Each CLI reports on itself
 * in its own shape and each gets its own reader and its own structural check:
 *
 *   claude  `--output-format stream-json --verbose`: a `system/init` inventory,
 *           paired `tool_use`/`tool_result` blocks, one `result` event. Checked
 *           against a captured request.
 *   codex   `--json`: `thread.started`, `item.completed` per item, one
 *           `turn.completed`. Checked against a captured request, because codex
 *           honours `openai_base_url` and the proxy sees the whole body.
 *   agy     `--output-format stream-json`: an `init` event naming the tools, one
 *           `step_update` per state change, one `result`. There is NO capture:
 *           agy ignores every base-URL variable this project can set. Its check
 *           runs over the CLI's own local record instead, and says so, as
 *           `record-only` rather than `pass`.
 */
import { readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  type Capture,
  type CaptureCheckResult,
  type CapturedRequest,
  checkCapture,
  privateSources,
  readCapture,
  readLocalRecord,
} from './capture-check.ts';

type Json = Record<string, unknown>;

const asRecord = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null;

/**
 * Every JSON object on its own line, and a count of the lines that were not one.
 *
 * All three CLIs print one JSON object per line, and all three can print
 * something else by accident: a banner, a crash message, a line cut off when a
 * process died. Splitting, skipping blanks, parsing, and COUNTING what did not
 * parse is the same job in all three readers, so it lives here once. A stream
 * this could not fully read is not one we can vouch for, which is why the count
 * is kept and checked rather than shrugged off. What differs per CLI is only
 * which fields are pulled out of each event, and that stays in the readers.
 */
function readEvents(text: string): { events: Json[]; unparsed: number } {
  const events: Json[] = [];
  let unparsed = 0;
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    let event: Json | null = null;
    try {
      event = asRecord(JSON.parse(line));
    } catch {
      event = null;
    }
    if (event) events.push(event);
    else unparsed += 1;
  }
  return { events, unparsed };
}

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

/** A plugin entry the CLI itself shipped, as against one this machine installed. */
function isBuiltinPlugin(item: unknown): boolean {
  const record = asRecord(item);
  if (!record) return false;
  return record.path === 'builtin' || (typeof record.source === 'string' && record.source.endsWith('@builtin'));
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
  /**
   * Plugins the init inventory marks as the CLI's own (`path: "builtin"` or a
   * source ending in `@builtin`). Claude Code 2.1.280 began listing two of them,
   * agents-md and telemetry, and no flag in the profile removes them. They are
   * part of the build, not a customization of this machine, so they are
   * recorded here and do not count as loaded plugins; the capture check is what
   * excludes their text from the request.
   */
  builtin_plugins: string[];
  agents: string[] | null;
  tool_calls: ToolCall[];
  /**
   * How many API turns the assistant took, which is the number the request
   * capture has to agree with.
   *
   * Counted by distinct `message.id`, because that is the API's own record of
   * where one turn ends: the CLI emits one assistant event per content block
   * and every block of a turn carries that turn's message id.
   *
   * The obvious alternative, grouping maximal runs of consecutive assistant
   * events, is wrong and a live research run proved it. That run's stream has
   * `user[tool_result]`, `assistant[tool_use]`, `user[tool_result]`,
   * `user[tool_result]`: one tool's result arrived before the model's last
   * tool_use block of the same turn was emitted. Run-grouping split that turn
   * in two and reported 8 turns against 7 main-turn requests, whether or not
   * the interleaved `rate_limit_event` and `system/*` events were ignored.
   *
   * Run-grouping survives as the fallback for a stream whose assistant events
   * carry no message id, and there it ignores every non-message event so that
   * only a user event ends a turn.
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
    builtin_plugins: [],
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
  // Both counts are kept; which one is reported is decided at the end.
  const assistantMessageIds = new Set<string>();
  let assistantEventsWithoutId = 0;
  let assistantRuns = 0;
  let lastRole: 'assistant' | 'user' | null = null;

  const { events, unparsed } = readEvents(text);
  facts.unparsed_lines = unparsed;

  for (const event of events) {
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
      const plugins = Array.isArray(event.plugins) ? (event.plugins as unknown[]) : null;
      facts.plugins = plugins === null ? names(event.plugins) : names(plugins.filter((item) => !isBuiltinPlugin(item)));
      facts.builtin_plugins = plugins === null ? [] : (names(plugins.filter(isBuiltinPlugin)) ?? []);
      facts.agents = names(event.agents);
      continue;
    }

    // Only a message event can end an assistant turn. Everything else in the
    // stream — system/*, rate_limit_event, anything a future CLI adds — is
    // stepped over rather than treated as a break.
    if (type === 'assistant' || type === 'user') {
      if (type === 'assistant') {
        if (lastRole !== 'assistant') assistantRuns += 1;
        const id = asRecord(event.message)?.id;
        if (typeof id === 'string' && id !== '') assistantMessageIds.add(id);
        else assistantEventsWithoutId += 1;
      }
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

  // The message ids when every assistant event carried one, and the run count
  // otherwise. A stream that carries ids for some events and not others is the
  // one case where neither number can be trusted, so the run count is used and
  // the mismatch shows up as a turn-count failure rather than as a silent guess.
  facts.assistant_turns =
    assistantEventsWithoutId === 0 && assistantMessageIds.size > 0 ? assistantMessageIds.size : assistantRuns;

  return facts;
}

export type Verdict = { ok: boolean; failures: string[] };

export type StructureExpectation = {
  /** Exactly the tools the profile allows. Anything more or less fails. */
  allowedTools: string[];
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

  // The version is recorded, not gated. Methodology v1.30 removed the
  // allowlist: the vendor ships builds several times a week, and a check that
  // refuses every build nobody has probed yet refuses almost every day. What is
  // still required is that the run said which build it was, because a run that
  // will not name itself cannot be written down honestly.
  if (facts.cli_version === null) {
    failures.push('the run reported no CLI version');
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

export type ProofStatus = 'pass' | 'fail' | 'record-only' | 'unavailable';
export type ContextProof = { status: ProofStatus; reason: string };

/**
 * What the denylist ran over: the outgoing request itself, or the CLI's own
 * local record of the run. The difference is the whole distance between `pass`
 * and `record-only`, so it is named rather than inferred.
 */
export type RecordKind = 'request' | 'local-record';

/**
 * Whether the context the model was given was checked, and against what.
 *
 * Four answers, and the differences matter. `unavailable` means nothing was
 * checked: nothing was shown, so nothing is claimed. `fail` means the check ran
 * and found private text from this machine, or the declared package was not
 * there at all. `pass` means the check ran over the OUTGOING REQUEST and none of
 * this machine's private text appeared in it, and the package did.
 *
 * `record-only` (methodology v1.31) means the same search, over the CLI's own
 * local record rather than over a request, because that CLI has no capture route
 * at all. It is weaker than `pass` in a specific way: it sees what the model
 * produced and what its tools returned, and it cannot see the system prompt or
 * anything else the CLI attached on the way out. It is a separate word rather
 * than a footnote on `pass` so that no reader of a run row has to know which
 * seat had a proxy in front of it.
 *
 * A pass is a statement about what the request did NOT contain. It is not a
 * description of what it did contain, it does not cover text the vendor attaches
 * that is not on this machine, and it is not a vendor guarantee.
 * `capture-check.ts` says exactly what it covers.
 */
export function contextProof(check: CaptureCheckResult | null, kind: RecordKind = 'request'): ContextProof {
  if (!check) {
    return {
      status: 'unavailable',
      reason:
        'no request capture was taken for this attempt, so nothing establishes what the outgoing request ' +
        'contained. The absence of plugins, skills and MCP servers from the init inventory is evidence ' +
        'about loading, not about what was sent.',
    };
  }
  if (check.status === 'pass') {
    const read = check.sources.filter((source) => source.present);
    const lines = read.reduce((total, source) => total + source.lines_checked, 0);
    const searched =
      `${check.searched} of ${check.requests} ` +
      (kind === 'request' ? 'captured request(s) had a JSON body and were searched' : 'record entr(ies) were searched') +
      ` for ${lines} line(s) of private text from ${read.length} source(s) on this machine, and none of it ` +
      `appeared. ${check.package_seen} ` +
      (kind === 'request' ? 'request(s)' : 'record entr(ies)') +
      ' carried the declared package byte for byte.';
    if (kind === 'request') {
      return {
        status: 'pass',
        reason:
          `${searched} Only the string values of those bodies were searched, not the HTTP headers, the ` +
          'request URLs or the responses. This says what the request bodies did not contain; it does not ' +
          'say what they did contain, and it cannot see text the vendor attaches that is not on this ' +
          'machine.',
      };
    }
    return {
      status: 'record-only',
      reason:
        `${searched} This CLI exposes no way to record its outgoing request, so the search ran over its own ` +
        'local record of the run: the event stream it printed, the transcript it kept, the page contents its ' +
        'fetch tool saved and the final response. That record holds what the model produced and what its ' +
        'tools returned. It does not hold the system prompt or anything else the CLI attached on the way ' +
        'out, so this is weaker than a check over a request and is not reported as one.',
    };
  }
  return {
    status: 'fail',
    reason:
      `the ${kind === 'request' ? 'captured request' : "CLI's own record"} did not pass the private-text ` +
      `check: ${check.failures.join('; ')}`,
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
 * The admission gate for real research, and the one all three seats go through.
 *
 * It is not a wrapper around a structural check: it adds the requirement that
 * the context boundary was actually demonstrated for this attempt. A clean
 * stream with no capture is still refused, which is the case every run before
 * 2026-09-15 was in.
 *
 * The structural verdict arrives already computed, because the three CLIs report
 * on themselves in three different shapes and only the caller knows which reader
 * produced this one. What is the same for all three, and therefore lives here,
 * is that structure alone never admits anything and that the accepted proof
 * words are named by the caller rather than assumed.
 */
export function admitForResearch(
  structure: Verdict,
  proof: ContextProof,
  accepted: ProofStatus[] = ['pass'],
): Verdict {
  const admitted = admitProof(proof, accepted);
  return { ok: structure.ok && admitted.ok, failures: [...structure.failures, ...admitted.failures] };
}

/**
 * Whether a context proof is one this seat may be admitted on.
 *
 * The accepted set is passed in rather than assumed, and it is `['pass']`
 * everywhere except the Gemini seat, which also accepts `record-only` because
 * its CLI has no capture route at all (methodology v1.31). Leaving the set to a
 * caller is what keeps `record-only` from quietly becoming an acceptable answer
 * for a seat that does have a proxy in front of it and simply failed to use it.
 */
export function admitProof(proof: ContextProof, accepted: ProofStatus[]): Verdict {
  if (accepted.includes(proof.status)) return { ok: true, failures: [] };
  return { ok: false, failures: [`context proof ${proof.status}: ${proof.reason}`] };
}

// ---------------------------------------------------------------------------
// The Codex seat (openai), methodology v1.31.
//
// `codex exec --json` prints one JSON object per line: `thread.started`,
// `turn.started`, an `item.started`/`item.completed` pair per item the model
// produced, and one `turn.completed` carrying the token usage. There is no
// inventory event: codex does not tell the stream which tools it was given, so
// the tool-inventory check the Claude seat gets has no counterpart here and this
// file does not pretend otherwise. What settles the codex seat is the captured
// request, which carries the tool schemas, the base prompt and the whole
// conversation.
// ---------------------------------------------------------------------------
export type CodexItem = {
  id: string;
  type: string;
  /** `agent_message` text, `web_search` query, `command_execution` command. */
  detail: string;
  /** The aggregated output of a command, or an error message. */
  output: string;
  exit_code: number | null;
};

export type CodexFacts = {
  event_types: string[];
  unparsed_lines: number;
  thread_started: number;
  turn_completed: number;
  items: CodexItem[];
  /**
   * Transport errors the CLI reported. Recorded, NOT gated. Build 0.154.0 opens
   * a WebSocket, fails, and falls back to HTTPS about a minute later, printing
   * five reconnect errors on the way. That is the normal path on this machine,
   * and a check that failed on it would fail every run.
   */
  transport_errors: string[];
  /** The last `agent_message`, which is the answer. */
  final_text: string | null;
  usage: Json | null;
};

export function readCodexStream(text: string): CodexFacts {
  const facts: CodexFacts = {
    event_types: [],
    unparsed_lines: 0,
    thread_started: 0,
    turn_completed: 0,
    items: [],
    transport_errors: [],
    final_text: null,
    usage: null,
  };

  const { events, unparsed } = readEvents(text);
  facts.unparsed_lines = unparsed;

  for (const event of events) {
    const type = typeof event.type === 'string' ? event.type : '?';
    facts.event_types.push(type);

    if (type === 'thread.started') facts.thread_started += 1;
    if (type === 'turn.completed') {
      facts.turn_completed += 1;
      facts.usage = asRecord(event.usage);
    }
    if (type === 'error' && typeof event.message === 'string') facts.transport_errors.push(event.message);
    if (type !== 'item.completed') continue;

    const item = asRecord(event.item);
    if (!item) continue;
    const itemType = typeof item.type === 'string' ? item.type : '?';
    const str = (value: unknown): string => (typeof value === 'string' ? value : '');
    const record: CodexItem = {
      id: str(item.id),
      type: itemType,
      detail: str(item.text) || str(item.query) || str(item.command) || str(item.message),
      output: str(item.aggregated_output) || str(item.message),
      exit_code: typeof item.exit_code === 'number' ? item.exit_code : null,
    };
    facts.items.push(record);
    if (itemType === 'agent_message' && record.detail !== '') facts.final_text = record.detail;
    if (itemType === 'error' && record.detail !== '') facts.transport_errors.push(record.detail);
  }

  return facts;
}

/**
 * What the codex stream can settle on its own, which is less than the Claude
 * stream can. There is no tool inventory to check and no permission-denial list,
 * so this checks that the run happened, completed, and answered; the request
 * capture is what carries the rest.
 */
export function checkCodexStructure(facts: CodexFacts): Verdict {
  const failures: string[] = [];
  if (facts.unparsed_lines > 0) failures.push(`${facts.unparsed_lines} line(s) of the stream were not JSON`);
  if (facts.thread_started !== 1) {
    failures.push(`expected exactly one thread.started event, saw ${facts.thread_started}`);
  }
  if (facts.turn_completed !== 1) {
    failures.push(`expected exactly one turn.completed event, saw ${facts.turn_completed}`);
  }
  const last = facts.event_types[facts.event_types.length - 1];
  if (facts.turn_completed > 0 && last !== 'turn.completed') {
    failures.push(`the stream ended with "${last}", not turn.completed`);
  }
  if (facts.final_text === null || facts.final_text.trim() === '') {
    failures.push('the run returned no final message');
  }
  return { ok: failures.length === 0, failures };
}

/** Captured requests to the model endpoint, which is where the effort travels. */
const codexModelRequests = (requests: CapturedRequest[]): CapturedRequest[] =>
  requests.filter((request) => request.method === 'POST' && request.url.includes('/codex/responses'));

/**
 * The pinned reasoning effort, read out of the request rather than trusted
 * because it was on the command line.
 *
 * The plan named this `model_reasoning_effort`, which is the CONFIG key. The
 * request carries it as `reasoning.effort`, which is what is checked, because
 * the request is the thing that decides what the model did.
 */
export function checkCodexEffort(requests: CapturedRequest[], effort: string): Verdict {
  const failures: string[] = [];
  const model = codexModelRequests(requests);
  if (model.length === 0) {
    failures.push('no captured request reached the model endpoint, so the reasoning effort could not be read');
  }
  for (const request of model) {
    const reasoning = asRecord(asRecord(request.body)?.reasoning);
    const seen = typeof reasoning?.effort === 'string' ? reasoning.effort : null;
    if (seen !== effort) {
      failures.push(`${request.file}: reasoning effort in the request was ${seen ?? 'absent'}, expected "${effort}"`);
    }
  }
  return { ok: failures.length === 0, failures };
}

/** Successful calls to the web-search endpoint, on the same host as the model. */
export const codexSearchRequests = (requests: CapturedRequest[]): CapturedRequest[] =>
  requests.filter(
    (request) =>
      request.method === 'POST' &&
      request.url.includes('/alpha/search') &&
      request.status !== undefined &&
      request.status >= 200 &&
      request.status < 300,
  );

export type CodexCanaryExpectation = {
  /** The attempt's synthetic token, which the model was asked to go and read. */
  token: string;
  /** The canary's complete raw stdout, searched for the token. */
  rawText: string;
  /** Every captured request of the canary run. */
  requests: CapturedRequest[];
  effort: string;
};

/**
 * The codex canary, and the one place in this file where reading a local file is
 * recorded rather than failed.
 *
 * Under this profile `-s read-only` grants read access to the WHOLE filesystem
 * and shell and web run through the same host, so the two cannot be separated:
 * turning the host off takes web access with it, and the 2026-09-09 probe showed
 * the model then fabricating a fetch and exiting zero. So the file read is
 * expected to succeed, it is recorded as `file_read: allowed`, and the public
 * record says so. What refuses a run that read something private is the denylist
 * over the captured requests: a tool's output comes back in the next turn's
 * request body, so private text a reviewer read is private text the check sees.
 *
 * The positive half is the search endpoint in the CAPTURE, not a sentence in the
 * answer. A model that says it searched and did not is exactly the failure the
 * September 9 run produced.
 */
export function checkCodexCanary(facts: CodexFacts, expected: CodexCanaryExpectation): Verdict {
  const failures = [...checkCodexStructure(facts).failures];

  const searches = codexSearchRequests(expected.requests);
  if (searches.length === 0) {
    const attempted = expected.requests.filter((request) => request.url.includes('/alpha/search')).length;
    failures.push(
      `no successful web-search request in the capture (${attempted} search request(s) captured, none with a ` +
        '2xx response); the model saying it searched is not evidence that it did',
    );
  }

  failures.push(...checkCodexEffort(expected.requests, expected.effort).failures);
  return { ok: failures.length === 0, failures };
}

/** Whether the canary's synthetic token came back, which this seat expects. */
export const fileReadOutcome = (rawText: string, token: string): 'allowed' | 'refused' =>
  token !== '' && rawText.includes(token) ? 'allowed' : 'refused';

// ---------------------------------------------------------------------------
// The Gemini seat (google), methodology v1.31.
//
// `agy --output-format stream-json` prints an `init` event naming the model, the
// working directory and every tool the model is offered, one `step_update` per
// state change, and one `result` carrying the status, the final response and the
// usage. The tools are still OFFERED to the model under this profile; what the
// launcher's settings file does is refuse them at the permission check, so a
// denied tool shows up as a step in `ERROR` state rather than as a tool that was
// never there. That is why the rule below is about which tools reached `DONE`.
// ---------------------------------------------------------------------------
export type GeminiStep = {
  index: number;
  state: string;
  type: string;
  tool: string | null;
  url: string | null;
  error: string | null;
};

export type GeminiFacts = {
  event_types: string[];
  unparsed_lines: number;
  init_count: number;
  result_count: number;
  model: string | null;
  cwd: string | null;
  /** Every tool the CLI offered the model. Offered is not the same as allowed. */
  tools_offered: string[] | null;
  steps: GeminiStep[];
  /** Tools that actually ran to completion. This is the list the profile gates. */
  tools_completed: string[];
  /** Tools the permission check refused, with the reason it gave. */
  tools_refused: { tool: string; error: string }[];
  result_status: string | null;
  final_text: string | null;
  usage: Json | null;
};

/** The only tools a reviewer may actually run under this seat's profile. */
export const GEMINI_ALLOWED_TOOLS = new Set(['read_url_content', 'search_web']);

export function readGeminiStream(text: string): GeminiFacts {
  const facts: GeminiFacts = {
    event_types: [],
    unparsed_lines: 0,
    init_count: 0,
    result_count: 0,
    model: null,
    cwd: null,
    tools_offered: null,
    steps: [],
    tools_completed: [],
    tools_refused: [],
    result_status: null,
    final_text: null,
    usage: null,
  };

  // One step reports many times as it runs; only its last state is its outcome.
  const lastState = new Map<number, GeminiStep>();

  const { events, unparsed } = readEvents(text);
  facts.unparsed_lines = unparsed;

  for (const event of events) {
    const type = typeof event.event === 'string' ? event.event : '?';
    facts.event_types.push(type);

    if (type === 'init') {
      facts.init_count += 1;
      const init = asRecord(event.init);
      facts.model = typeof init?.model === 'string' ? init.model : null;
      facts.cwd = typeof init?.cwd === 'string' ? init.cwd : null;
      facts.tools_offered = names(init?.tools);
      continue;
    }

    if (type === 'step_update') {
      const step = asRecord(event.step_update);
      if (!step) continue;
      const index = typeof step.step_index === 'number' ? step.step_index : -1;
      const info = asRecord(step.tool_info);
      const parameters = asRecord(info?.parameters);
      const url = parameters?.Url ?? parameters?.url;
      const error = asRecord(info?.error);
      lastState.set(index, {
        index,
        state: typeof step.state === 'string' ? step.state : '?',
        type: typeof step.step_type === 'string' ? step.step_type : '?',
        tool: typeof step.tool_name === 'string' ? step.tool_name : null,
        url: typeof url === 'string' ? url : null,
        error: typeof error?.message === 'string' ? error.message : null,
      });
      continue;
    }

    if (type === 'result') {
      facts.result_count += 1;
      const result = asRecord(event.result);
      facts.result_status = typeof result?.status === 'string' ? result.status : null;
      facts.final_text = typeof result?.response === 'string' ? result.response : null;
      facts.usage = asRecord(result?.usage);
    }
  }

  facts.steps = [...lastState.values()].sort((a, b) => a.index - b.index);
  for (const step of facts.steps) {
    if (step.tool === null) continue;
    if (step.state === 'DONE') facts.tools_completed.push(step.tool);
    if (step.state === 'ERROR') facts.tools_refused.push({ tool: step.tool, error: step.error ?? 'no reason given' });
  }

  return facts;
}

/**
 * Everything the agy stream can settle: that the run started once, finished
 * once, answered, failed only where the profile meant it to, and ran no tool
 * outside the profile.
 *
 * "Ran" is the operative word. A file tool the permission check refused is the
 * profile working and is recorded as a refusal; a file tool that reached `DONE`
 * is a file that was actually read, and that fails whatever the model did with
 * it afterwards.
 */
export function checkGeminiStructure(facts: GeminiFacts): Verdict {
  const failures: string[] = [];
  if (facts.unparsed_lines > 0) failures.push(`${facts.unparsed_lines} line(s) of the stream were not JSON`);
  if (facts.init_count !== 1) failures.push(`expected exactly one init event, saw ${facts.init_count}`);
  if (facts.result_count !== 1) failures.push(`expected exactly one result event, saw ${facts.result_count}`);
  if (facts.init_count > 0 && facts.event_types[0] !== 'init') {
    failures.push(`the stream opened with "${facts.event_types[0]}", not init`);
  }
  if (facts.result_count > 0 && facts.event_types[facts.event_types.length - 1] !== 'result') {
    failures.push(`the stream ended with "${facts.event_types[facts.event_types.length - 1]}", not a result event`);
  }
  if (facts.tools_offered === null) failures.push('the run did not report which tools it was offered');
  if (facts.final_text === null || facts.final_text.trim() === '') {
    failures.push('the run returned no final message');
  }

  // WHAT `status` ACTUALLY REPORTS, learned from the first live canary. It is
  // not "did this turn answer": it is "did any step fail", and under this
  // profile steps fail all the time on purpose, because the deny rules refuse
  // every file, write and command tool at the permission check. That canary
  // answered correctly, refused three tools exactly as designed, and came back
  // `ERROR`. A check that required `SUCCESS` would refuse every run in which
  // the profile did its job.
  //
  // So `ERROR` is accepted only when every failed step failed at the permission
  // check. A step that failed for any other reason — a tool that broke, a model
  // error — is named and fails, which is what `SUCCESS` was standing in for.
  const refusal = /permission/i;
  const other = facts.steps.filter((step) => step.state === 'ERROR' && !refusal.test(step.error ?? ''));
  if (facts.result_status === null) failures.push('the run did not report a result status');
  else if (facts.result_status !== 'SUCCESS' && facts.result_status !== 'ERROR') {
    failures.push(`result status was "${facts.result_status}"`);
  } else if (facts.result_status === 'ERROR' && other.length === 0 && facts.tools_refused.length === 0) {
    // ERROR with nothing to attribute it to. Something went wrong that this
    // stream does not explain, and an unexplained error is not a pass.
    failures.push('result status was "ERROR" and no step says why');
  }
  for (const step of other) {
    failures.push(
      `step ${step.index} (${step.tool ?? step.type}) failed for a reason other than the permission check: ` +
        `${step.error ?? 'no reason given'}`,
    );
  }

  const ran = [...new Set(facts.tools_completed)].filter((tool) => !GEMINI_ALLOWED_TOOLS.has(tool));
  if (ran.length > 0) failures.push(`the run ran tools outside the profile: ${ran.join(', ')}`);

  return { ok: failures.length === 0, failures };
}

export type GeminiCanaryExpectation = {
  token: string;
  /** Stdout, the transcript and the final response, concatenated. */
  rawText: string;
  expectedUrl: string;
  expectedHeading: string;
  /**
   * The page contents agy's own fetch tool saved to disk, retained by the
   * launcher before the per-attempt home was removed. Under this profile the
   * MODEL cannot read that file — `read_file` is denied — so the heading can
   * only be checked here. That is the point: the fetch demonstrably returned the
   * real page, and the model demonstrably could not open a local file.
   */
  fetchedText: string;
};

/**
 * Both halves of the Gemini canary.
 *
 * Negative: the synthetic token must not appear anywhere in the record, and at
 * least one file tool must have been refused by the permission check. A run in
 * which nothing was refused did not demonstrate that anything would be.
 *
 * Positive: the fetch of a known public page must have completed, and the page
 * contents its tool saved must carry the known heading. Reading the heading out
 * of the saved bytes rather than out of the answer is the same rule the Claude
 * canary follows: a model reciting "Example Domain" from memory after a failed
 * fetch would otherwise sail through.
 */
export function checkGeminiCanary(facts: GeminiFacts, expected: GeminiCanaryExpectation): Verdict {
  const failures = [...checkGeminiStructure(facts).failures];

  if (expected.token !== '' && expected.rawText.includes(expected.token)) {
    failures.push('the synthetic canary token came back in the record: the file boundary leaked');
  }

  const fileTools = facts.tools_refused.filter((refusal) => /permission/i.test(refusal.error));
  if (fileTools.length === 0) {
    failures.push(
      'no tool was refused by the permission check, so this run demonstrated no file boundary ' +
        `(tools that ran: ${[...new Set(facts.tools_completed)].join(', ') || 'none'})`,
    );
  }

  const fetched = facts.steps.filter(
    (step) => step.tool === 'read_url_content' && step.state === 'DONE' && (step.url ?? '').startsWith(expected.expectedUrl),
  );
  if (fetched.length === 0) {
    const detail = facts.steps
      .filter((step) => step.tool === 'read_url_content')
      .map((step) => `${step.url ?? 'no url'}: ${step.state}`)
      .join('; ');
    failures.push(`no completed fetch of ${expected.expectedUrl} in the step stream (${detail || 'no fetch attempted'})`);
  } else if (!expected.fetchedText.includes(expected.expectedHeading)) {
    failures.push(
      `the page the fetch tool saved does not contain "${expected.expectedHeading}" ` +
        `(${expected.fetchedText.length} bytes retained)`,
    );
  }

  return { ok: failures.length === 0, failures };
}

/**
 * CLI: report the facts, judge them under the named check, and split the
 * complete final message out as its own bytes.
 *
 *   tsx stream-boundary.ts <stream.jsonl> --report <out.json> [--final <out.txt>]
 *                          [--format claude|codex|gemini]
 *                          [--check canary|research] [--tools A,B] [--token T]
 *                          [--expect-url U] [--expect-heading S]
 *                          [--expect-file-read allowed|refused] [--effort high]
 *                          [--accept-proof pass,record-only]
 *                          [--requests <dir> | --record <dir>] [--fetched <dir>]
 *                          [--package <file>]
 *
 * With `--requests`, the capture in that directory is searched for the private
 * text on this machine, and the result goes into the report beside the stream
 * facts. With `--record` instead, the same search runs over the files in that
 * directory, which are the CLI's own local record of the run, and the proof is
 * reported as `record-only` rather than `pass`. With neither, the context proof
 * is `unavailable` and `--check research` cannot pass.
 *
 * `--token` is the canary token the stream must not echo. It is ALSO one of the
 * strings the denylist carries, unless `--expect-file-read allowed` says this
 * seat's profile cannot stop a local file being read: under that profile the
 * canary's own planted token is expected back, it is recorded as
 * `file_read: allowed` and disclosed, and putting it on the denylist would only
 * refuse every canary the seat can run. Private text that is not the attempt's
 * own plant is still on the denylist and still refuses the run.
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
  const list = (value: string | undefined) =>
    (value ?? '').split(',').map((item) => item.trim()).filter(Boolean);

  const format = flags.format ?? 'claude';
  if (!['claude', 'codex', 'gemini'].includes(format)) {
    console.error('--format must be claude, codex or gemini');
    process.exit(2);
  }
  if (flags.requests && flags.record) {
    console.error('--requests and --record are two different kinds of evidence; pass one');
    process.exit(2);
  }

  /** Every file in a directory the launcher filled, in a stable order. */
  const filesIn = (dir: string | undefined): { name: string; file: string }[] => {
    if (!dir) return [];
    try {
      return readdirSync(dir)
        .sort()
        .map((name) => ({ name, file: path.join(dir, name) }));
    } catch {
      return [];
    }
  };

  const expectFileRead = flags['expect-file-read'] === 'allowed' ? 'allowed' : 'refused';
  const token = flags.token ?? '';
  // The attempt's own planted token is on the denylist only where the profile is
  // supposed to keep it unreadable. See the header.
  const denylistToken = expectFileRead === 'allowed' ? '' : token;

  // The check runs before the verdict and is reported whatever the verdict is. A
  // canary whose stream passed and whose request did not is the interesting
  // case, and it has to be visible rather than folded into one word.
  //
  // The private sources are resolved HERE, against this machine, at this moment.
  // $HOME is the operator's real home unless a test points it somewhere else,
  // and the repository root is this script's own, two directories up.
  let check: CaptureCheckResult | null = null;
  let captureFacts: { upstream?: string; requests_manifest_sha256: string } | null = null;
  let captured: CapturedRequest[] = [];
  // The text of a local record, handed back by the reader that already read it.
  // The Gemini canary is judged on these same bytes, and reading the directory a
  // second time would be two different answers to one question.
  let recordText = '';
  const recordKind: RecordKind = flags.record ? 'local-record' : 'request';
  if (flags.requests || flags.record) {
    let capture: Capture;
    if (flags.record) {
      const record = readLocalRecord(filesIn(flags.record));
      recordText = record.text;
      capture = record;
    } else {
      capture = readCapture(flags.requests!);
    }
    captured = capture.requests;
    check = checkCapture({
      requests: capture.requests,
      packageText: flags.package ? readFileSync(flags.package, 'utf8') : '',
      token: denylistToken,
      sources: privateSources({
        home: process.env.HOME ?? '',
        repoRoot: fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, ''),
        token: denylistToken,
      }),
    });
    captureFacts = {
      // A local record has no upstream, so the report says nothing rather than
      // an empty string a reader could take for a missing value.
      ...(recordKind === 'request' ? { upstream: capture.upstream } : {}),
      requests_manifest_sha256: capture.requestsManifestSha256,
    };
  }

  /** A failing check is a failing canary, whichever seat ran it. */
  const withCaptureFailures = (verdict: Verdict): Verdict =>
    check && check.status !== 'pass'
      ? { ok: false, failures: [...verdict.failures, ...check.failures.map((f) => `capture check: ${f}`)] }
      : verdict;

  const accepted = (list(flags['accept-proof']).length > 0
    ? list(flags['accept-proof'])
    : ['pass']) as ProofStatus[];

  // Computed once and used twice, for the gate and for the report. Two calls
  // could not disagree today, and a proof word that was judged on one reading
  // and published from another is the kind of thing nobody notices until it
  // does.
  const proof = contextProof(check, recordKind);

  let verdict: Verdict;
  let facts: unknown;
  let finalText: string | null;
  let builtinPlugins: string[] = [];

  if (format === 'codex') {
    const codex = readCodexStream(raw);
    facts = { ...codex, file_read: fileReadOutcome(raw, token) };
    finalText = codex.final_text;
    if (flags.check === 'canary') {
      verdict = withCaptureFailures(
        checkCodexCanary(codex, {
          token,
          rawText: raw,
          requests: captured,
          effort: flags.effort ?? 'high',
        }),
      );
    } else if (flags.check === 'research') {
      // The effort is part of this seat's structural evidence: it is read out of
      // the captured request rather than trusted because it was on the command
      // line, so it joins the structural verdict before the gate sees it.
      const structure = checkCodexStructure(codex);
      const effort = checkCodexEffort(captured, flags.effort ?? 'high');
      verdict = admitForResearch(
        { ok: structure.ok && effort.ok, failures: [...structure.failures, ...effort.failures] },
        proof,
        accepted,
      );
    } else {
      console.error('--check must be canary or research');
      process.exit(2);
    }
  } else if (format === 'gemini') {
    const gemini = readGeminiStream(raw);
    // The record the denylist read is also what the canary is judged on: the
    // stream alone does not carry the tool results. `recordText` is what the
    // reader above already read.
    const fetchedText = filesIn(flags.fetched)
      .map(({ file }) => {
        try {
          return readFileSync(file, 'utf8');
        } catch {
          return '';
        }
      })
      .join('\n');
    facts = { ...gemini, file_read: fileReadOutcome(`${raw}\n${recordText}`, token) };
    finalText = gemini.final_text;
    if (flags.check === 'canary') {
      verdict = withCaptureFailures(
        checkGeminiCanary(gemini, {
          token,
          rawText: `${raw}\n${recordText}`,
          expectedUrl: flags['expect-url'] ?? '',
          expectedHeading: flags['expect-heading'] ?? '',
          fetchedText,
        }),
      );
    } else if (flags.check === 'research') {
      verdict = admitForResearch(checkGeminiStructure(gemini), proof, accepted);
    } else {
      console.error('--check must be canary or research');
      process.exit(2);
    }
  } else {
    const claude = readStream(raw);
    facts = claude;
    finalText = claude.final_text;
    builtinPlugins = claude.builtin_plugins;
    const expectation: StructureExpectation = { allowedTools: list(flags.tools) };
    if (flags.check === 'canary') {
      verdict = withCaptureFailures(
        checkCanary(claude, {
          ...expectation,
          token,
          expectedUrl: flags['expect-url'] ?? '',
          expectedHeading: flags['expect-heading'] ?? '',
          rawText: raw,
        }),
      );
    } else if (flags.check === 'research') {
      verdict = admitForResearch(checkStructure(claude, expectation), proof, accepted);
    } else {
      console.error('--check must be canary or research');
      process.exit(2);
    }
  }

  // The final message is written before the verdict is acted on, so a run that
  // failed every check still leaves its complete answer on disk.
  if (flags.final) writeFileSync(flags.final, finalText ?? '');
  if (flags.report) {
    writeFileSync(
      flags.report,
      `${JSON.stringify(
        {
          check: flags.check,
          format,
          ...verdict,
          context_proof: proof,
          // Recorded, not gated: the plugins the CLI build itself ships.
          builtin_plugins: builtinPlugins,
          // What the denylist ran over. A reader of a run row should not have to
          // know which seat had a proxy in front of it to read the proof word.
          record_kind: check ? recordKind : null,
          // The upstream and the manifest hash are facts about the capture
          // directory rather than about the denylist, so they are added here
          // rather than smuggled into a pure function's result.
          capture_check: check ? { ...check, ...captureFacts, record_kind: recordKind } : null,
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
