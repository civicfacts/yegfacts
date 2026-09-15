/**
 * Judge a captured outgoing request against a pinned description of what a
 * clean one contains.
 *
 * `record-proxy.mjs` puts the bytes on disk. This decides whether those bytes
 * are the request the profile is supposed to produce: the vendor's own default
 * prompt and nothing else in the system blocks, exactly two client tools, a
 * first user message that is the account reminder and then the declared package
 * byte for byte, and one system-role message of host environment text matching
 * a fixed template. Everything the capture contains is classified; a request
 * shape nobody pinned is a failure, not a shrug.
 *
 * WHY THE TABLE IS KEYED BY CLI VERSION AND MODEL. Because the request shape
 * depends on both, which cost a live demonstration to learn. The feasibility
 * probes ran on Haiku and produced a 13,487-character vendor prompt and a first
 * user message of four reminder blocks. The same CLI build under the pinned
 * claude-opus-5 sends a 6,755-character prompt, different tool definitions, an
 * account reminder and the package in the user message, and the working
 * directory, platform, model identity and date in a separate system-role
 * message. The gate refused that request, correctly, because it was not the
 * shape anyone had pinned. A profile is (build, model), not build alone.
 *
 * WHAT A PASS MEANS. One attempt, under one CLI build and one model, sent these
 * bytes and no others to its configured base URL. That is a fact about that
 * attempt. It is not a vendor guarantee, it does not cover a different build or
 * a different model, and it says nothing about anything else on the machine.
 *
 * WHAT IS CHECKED AND WHAT IS ONLY RECORDED. Checked: the system blocks, the
 * tool definitions, the model, the reasoning effort, the messages, the
 * top-level body keys and the keys inside `metadata`. Everything in the body is
 * therefore either compared against a pin or named in an allowlist, so a field
 * nobody described is a failure rather than something read past.
 *
 * NOT checked: the HTTP headers. `record-proxy.mjs` captures them, with the
 * credential headers redacted, and they are retained with the attempt for a
 * person to read. Nothing here compares them, so "this request matched the
 * pinned profile" is a statement about the body and not about the headers.
 *
 * WHAT IS DISCLOSED RATHER THAN SUPPRESSED. The host blocks tell the model the
 * operator's account email address, the working directory, whether it is a Git
 * repository, the platform, the shell, the OS version, the model identity and
 * the date. None of it is in the declared package. None of it is an instruction
 * and none of it names project material, so the honest response is to publish
 * that it is there rather than to pretend the request was clean without it.
 * `disclosed` carries those blocks verbatim, with the address replaced by
 * `<account-email>`: the report is retained and quoted, and the founder's
 * address does not belong in it.
 *
 * The vendor default prompt is pinned BY HASH and its text is never written
 * here or into a report. It is the vendor's, and a hash settles the question a
 * copy would.
 *
 * WHY THE PINS LIVE IN ONE EXPORTED TABLE. A check whose expectations are
 * scattered through a launcher's flags can be loosened by editing a flag. These
 * are constants in a file with a test that asserts their values, so loosening
 * one is a visible diff.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PRODUCTION_UPSTREAM = 'https://api.anthropic.com';

const sha256 = (text: string): string => createHash('sha256').update(text, 'utf8').digest('hex');

/** Everything the check compares against, for one CLI build running one model. */
export type Pins = {
  cliVersion: string;
  model: string;
  /**
   * SHA-256 of the CLI executable itself. The request pins describe one build,
   * so the launcher has to be able to say which bytes it ran, not just which
   * version string they answered with.
   */
  binarySha256: string;
  /**
   * The reasoning effort the seat is pinned to, checked against the main turn's
   * `output_config.effort`. Until this capture the effort was a launcher flag
   * nobody could verify from the request; it is in the request, so it is pinned.
   */
  effort: string;
  /** `<n>` characters of vendor prompt, pinned by hash and never reproduced. */
  vendorPromptSha256: string;
  vendorPromptLength: number;
  agentLine: string;
  billingHeaderPattern: RegExp;
  /** Client tool name to the SHA-256 of `JSON.stringify(tool)` as captured. */
  clientTools: Record<string, string>;
  /** The first block of the main turn's first user message. */
  accountReminder: RegExp;
  /** The system-role message carrying environment, model identity and date. */
  environmentMessage: RegExp;
  sessionTitlePromptSha256: string;
  sessionTitleTrailer: { length: number; sha256: string };
  searchHelperLine: string;
  /**
   * The server tool the search helper carries. Its `type` and `name` are fixed;
   * the rest of its keys are the model's own WebSearch input passed through, so
   * they are permitted and recorded rather than pinned. A key outside this list,
   * or a second tool, fails.
   */
  searchHelperTool: { type: string; name: string; optionalKeys: string[] };
  searchHelperUserPrefix: string;
  fetchSummarizerPrefix: string;
  fetchSummarizerSuffix: { length: number; sha256: string };
  /**
   * The top-level body keys each POST shape may carry, as observed. Anything
   * else fails. Without this the check read the keys it knew about and ignored
   * the rest, so a body could carry an extra top-level field and pass.
   */
  topLevelKeys: Record<'main-turn' | 'session-title' | 'search-helper' | 'fetch-summarizer', string[]>;
  /** The keys inside the JSON string at `metadata.user_id`. Exactly these. */
  metadataIdentifiers: string[];
};

/**
 * The opening of a reminder block, matched without its closing bracket so that
 * a variant tag (`<system-reminder foo="bar">`) is caught too.
 */
export const REMINDER_MARKER = '<system-reminder';

/**
 * Claude Code 2.1.272 running claude-opus-5, from the live diagnostic capture
 * taken on 2026-09-15 against api.anthropic.com. Each value was recomputed from
 * that capture rather than copied from a note.
 *
 * There is one row, and that is the point. 2.1.266 and 2.1.267 were probed
 * before anything emitted a request, so there is nothing to pin for them. The
 * 2.1.272 + claude-haiku-4-5 shape from the feasibility probes is gone too: it
 * is a real shape that a real CLI sends, but it is not the seat, and keeping it
 * would have meant publishing a profile no research run uses.
 */
export const PINS: Record<string, Record<string, Pins>> = {
  '2.1.272': {
    'claude-opus-5': {
      cliVersion: '2.1.272',
      model: 'claude-opus-5',
      // ~/.local/share/claude/versions/2.1.272 as installed on 2026-09-15.
      binarySha256: '195e24e8e1f9bf46f1eaee72d434a33e18f9f5796f29a6348a00d16c5f8aee75',
      effort: 'high',
      vendorPromptSha256: 'ca13f066089ee100dd5ef17ee4dbf985eabce68c213998ce32657465a1985bd8',
      vendorPromptLength: 6755,
      agentLine: "You are a Claude agent, built on Anthropic's Claude Agent SDK.",
      // The three hex characters after the version change on every request.
      billingHeaderPattern:
        /^x-anthropic-billing-header: cc_version=2\.1\.272\.[0-9a-f]{3}; cc_entrypoint=sdk-cli;$/,
      clientTools: {
        WebFetch: 'e1fbaacd430da45894b8d8c29f32064d98c065ebd00702a346db561f801025af',
        WebSearch: '50202efd42bb858f1a86f63bc189c48ca85e531b3093c36b21227459b7ed193a',
      },
      // Note the trailing newline after the closing tag. Under Haiku there was
      // none; matching what the capture shows rather than what would be tidier
      // is the whole discipline here.
      accountReminder:
        /^<system-reminder>\nAs you answer the user's questions, you can use the following context:\n# userEmail\nThe user's email address is (?<email>\S+)\. Use it only to identify the user, such as for authorship, attribution, or filtering their own work\. Never send it to an unrelated service, such as in a request header, URL, or payload, unless the user explicitly asks\.\n\nIMPORTANT: this context may or may not be relevant to your tasks\. You should not respond to this context unless it is highly relevant to your task\.\n<\/system-reminder>\n$/,
      environmentMessage:
        /^# Environment\nYou have been invoked in the following environment: \n - Primary working directory: (?<cwd>[^\n]*)\n - Is a git repository: false\n - Platform: [^\n]+\n - Shell: [^\n]+\n - OS Version: [^\n]+\n\nYou are powered by the model named [^\n]+\. The exact model ID is (?<model>[^\n]+?)\. Assistant knowledge cutoff is [^\n]+\.\n\nToday's date is \d{4}-\d{2}-\d{2}\.$/,
      sessionTitlePromptSha256: '765b5ba2fa0a315a3c749c7e54bf5cef450084a745eb01e66371b8b6359d4752',
      sessionTitleTrailer: {
        length: 179,
        sha256: '80e8414c11b94f8e24c28ff4ea1b35ab1115b9d3985d078bcff4678a6104424d',
      },
      searchHelperLine: 'You are an assistant for performing a web search tool use',
      searchHelperTool: {
        type: 'web_search_20250305',
        name: 'web_search',
        // Observed in the live research run: the model's own WebSearch input
        // travels into the server tool definition, so one search carried
        // allowed_domains with two hosts and another with three.
        optionalKeys: ['max_uses', 'allowed_domains', 'blocked_domains'],
      },
      searchHelperUserPrefix: 'Perform a web search for the query: ',
      fetchSummarizerPrefix: '\nWeb page content:\n---\n',
      // The page text and the model's own question sit between the prefix and
      // this fixed tail, so the tail is pinned by length and hash from its end.
      fetchSummarizerSuffix: {
        length: 496,
        sha256: '8753a12e2e3d03a59739157cdd2a334591f7ed2fcc40340d1e46d2e93e48b488',
      },
      topLevelKeys: {
        'main-turn': [
          'context_management',
          'max_tokens',
          'messages',
          'metadata',
          'model',
          'output_config',
          'stream',
          'system',
          'thinking',
          'tools',
        ],
        'session-title': [
          'max_tokens',
          'messages',
          'metadata',
          'model',
          'output_config',
          'stream',
          'system',
          'thinking',
          'tools',
        ],
        // The only shape that pins the model's hand with `tool_choice`.
        'search-helper': [
          'max_tokens',
          'messages',
          'metadata',
          'model',
          'output_config',
          'stream',
          'system',
          'thinking',
          'tool_choice',
          'tools',
        ],
        'fetch-summarizer': [
          'max_tokens',
          'messages',
          'metadata',
          'model',
          'output_config',
          'stream',
          'system',
          'thinking',
          'tools',
        ],
      },
      metadataIdentifiers: ['account_uuid', 'device_id', 'session_id'],
    },
  },
};

/** Blunt on purpose: the report must not carry the address under any template. */
const EMAIL = /[^\s<>"'@]+@[^\s<>"'@]+\.[A-Za-z]{2,}/g;
export const redactEmail = (text: string): string => text.replace(EMAIL, '<account-email>');

export type CapturedRequest = {
  file: string;
  method: string;
  url: string;
  headers: Record<string, unknown>;
  body: unknown;
};

/** The two things only the stream can say about how many turns there were. */
export type StreamTurns = {
  /** Every `tool_use` id the CLI reported, in any turn. */
  toolUseIds: string[];
  /**
   * How many API turns the assistant took. `stream-boundary.ts` counts distinct
   * assistant `message.id` values, which is the API's own record of where a turn
   * ends, and falls back to grouping runs of consecutive assistant events only
   * when the stream carries no ids.
   */
  assistantTurns: number;
};

export type ProofInput = {
  requests: CapturedRequest[];
  upstream: string;
  /** The exact bytes of `package.md` for this attempt. */
  packageText: string;
  /** The resolved working directory the CLI was started in. */
  workDir: string;
  /** The pinned model for the seat. The canary runs under the same pin. */
  model: string;
  cliVersion: string;
  stream: StreamTurns;
  requestsManifestSha256?: string;
  pins?: Record<string, Record<string, Pins>>;
};

export type Shape =
  | 'connectivity'
  | 'session-title'
  | 'main-turn'
  | 'search-helper'
  | 'fetch-summarizer'
  | 'unknown';

/**
 * What each request carried beyond what is pinned. Reported, never required:
 * the side requests' model and sampling settings are the vendor's business and
 * pinning them would turn a vendor default into a failure. The main turn's
 * `thinking` is here for the same reason, while its `output_config.effort` IS
 * required, because that one is the seat's own setting.
 */
export type Observation = {
  file: string;
  shape: Shape;
  model: unknown;
  max_tokens: unknown;
  thinking: unknown;
  output_config: unknown;
  /**
   * The search helper's server tool, verbatim. Recorded only for that shape,
   * because its `allowed_domains` and `blocked_domains` say which hosts a
   * reviewer scoped a search to, which is worth having on the record and is not
   * something to pin. The main turn's two client tools are pinned by hash and
   * deliberately not reproduced here.
   */
  search_tool?: unknown;
};

export type ProofSummary = {
  upstream: string;
  production_upstream: boolean;
  cli_version: string;
  model: string;
  effort: string | null;
  vendor_prompt_sha256: string | null;
  tool_definitions_sha256: Record<string, string> | null;
  request_count: number;
  main_turn_count: number;
  side_request_counts: Record<string, number>;
  requests_manifest_sha256?: string;
};

export type ProofResult = {
  status: 'pass' | 'fail';
  requests: { file: string; shape: Shape }[];
  failures: string[];
  /** Per main turn, the host context blocks, verbatim, address removed. */
  disclosed: { file: string; blocks: { source: string; text: string }[] }[];
  observations: Observation[];
  summary: ProofSummary;
};

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;

const textOf = (block: unknown): string | null => {
  const record = asRecord(block);
  return record?.type === 'text' && typeof record.text === 'string' ? record.text : null;
};

/** The system blocks as plain strings, or null when the shape is not text blocks. */
function systemTexts(body: Record<string, unknown>): string[] | null {
  const system = body.system;
  if (!Array.isArray(system)) return null;
  const texts = system.map((block) => textOf(block));
  return texts.every((text): text is string => text !== null) ? texts : null;
}

const toolList = (body: Record<string, unknown>): unknown[] =>
  Array.isArray(body.tools) ? body.tools : [];

/**
 * A message's text when it is either one text block or a bare string.
 *
 * The system-role message arrives as a one-element block array on the first
 * turn and as a plain string on the second. Both are the same 433 characters,
 * so both are read rather than one being called malformed.
 */
function singleText(content: unknown): string | null {
  if (typeof content === 'string') return content;
  if (Array.isArray(content) && content.length === 1) return textOf(content[0]);
  return null;
}

/**
 * Which of the five pinned shapes this request is, decided on structure alone.
 * Deciding first and checking afterwards is what lets an unrecognised request
 * be reported as unknown rather than as a pile of mismatches against whichever
 * shape it least resembled.
 */
function classify(request: CapturedRequest, pins: Pins): Shape {
  if (request.method === 'HEAD') return 'connectivity';
  const body = asRecord(request.body);
  if (!body) return 'unknown';
  const system = systemTexts(body);
  if (!system) return 'unknown';
  if (system.length === 2) return 'fetch-summarizer';
  if (system.length !== 3) return 'unknown';
  if (sha256(system[2]!) === pins.vendorPromptSha256) return 'main-turn';
  if (sha256(system[2]!) === pins.sessionTitlePromptSha256) return 'session-title';
  if (system[2] === pins.searchHelperLine) return 'search-helper';
  return 'unknown';
}

/**
 * The request envelope: which top-level keys the body carries, and what is in
 * `metadata`.
 *
 * This is the check that was missing. Everything else reads named fields, so a
 * body could grow a top-level key nobody had described and pass without a
 * complaint. An allowlist per shape closes that: a key outside it fails, which
 * is the behaviour a reader of "fails closed on anything it does not
 * recognise" would already have assumed.
 *
 * `metadata` is exactly `{user_id: <JSON string>}`, and that string parses to
 * exactly a device id, an account uuid and a session id. Returns the identifier
 * names when it does, so a caller can record that they were there. The values
 * are never read into anything this returns, and never reach the report.
 */
function checkEnvelope(
  where: string,
  body: Record<string, unknown>,
  allowed: string[],
  pins: Pins,
  failures: string[],
): string[] | null {
  const permitted = new Set(allowed);
  const extra = Object.keys(body).filter((key) => !permitted.has(key));
  if (extra.length > 0) {
    failures.push(`${where}: the body carries top-level key(s) nobody pinned: ${extra.sort().join(', ')}`);
  }

  const metadata = asRecord(body.metadata);
  if (!metadata) {
    failures.push(`${where}: metadata is not an object`);
    return null;
  }
  const metadataKeys = Object.keys(metadata).sort();
  if (metadataKeys.length !== 1 || metadataKeys[0] !== 'user_id') {
    failures.push(`${where}: metadata keys are [${metadataKeys.join(', ')}], expected exactly [user_id]`);
    return null;
  }
  if (typeof metadata.user_id !== 'string') {
    failures.push(`${where}: metadata.user_id is not a string`);
    return null;
  }
  let identifiers: Record<string, unknown> | null = null;
  try {
    identifiers = asRecord(JSON.parse(metadata.user_id));
  } catch {
    identifiers = null;
  }
  if (!identifiers) {
    failures.push(`${where}: metadata.user_id is not a JSON object`);
    return null;
  }
  const names = Object.keys(identifiers).sort();
  const wanted = [...pins.metadataIdentifiers].sort();
  if (names.join(',') !== wanted.join(',')) {
    failures.push(
      `${where}: metadata.user_id carries [${names.join(', ')}], expected exactly [${wanted.join(', ')}]`,
    );
    return null;
  }
  return names;
}

/** The two blocks every shape opens with. */
function checkPreamble(system: string[], pins: Pins, where: string, failures: string[]): void {
  if (!pins.billingHeaderPattern.test(system[0] ?? '')) {
    failures.push(`${where}: system[0] is not the pinned billing header`);
  }
  if (system[1] !== pins.agentLine) {
    failures.push(`${where}: system[1] is not the pinned agent line`);
  }
}

function checkSessionTitle(
  request: CapturedRequest,
  body: Record<string, unknown>,
  input: ProofInput,
  pins: Pins,
  failures: string[],
): void {
  const where = request.file;
  checkEnvelope(where, body, pins.topLevelKeys['session-title'], pins, failures);
  checkPreamble(systemTexts(body) ?? [], pins, where, failures);
  if (toolList(body).length > 0) failures.push(`${where}: the session-title request carried tools`);

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length !== 1) {
    failures.push(`${where}: expected one message in the session-title request, saw ${messages.length}`);
    return;
  }
  const message = asRecord(messages[0]);
  const text = message?.role === 'user' ? singleText(message.content) : null;
  if (text === null) {
    failures.push(`${where}: the session-title request is not a single user text block`);
    return;
  }
  const head = `<session>\n${input.packageText}</session>\n`;
  if (!text.startsWith(head)) {
    failures.push(`${where}: the <session> body is not the package byte for byte`);
    return;
  }
  const trailer = text.slice(head.length);
  if (trailer.length !== pins.sessionTitleTrailer.length || sha256(trailer) !== pins.sessionTitleTrailer.sha256) {
    failures.push(`${where}: the session-title trailer is not the pinned text`);
  }
}

function checkSearchHelper(
  request: CapturedRequest,
  body: Record<string, unknown>,
  pins: Pins,
  failures: string[],
): void {
  const where = request.file;
  checkEnvelope(where, body, pins.topLevelKeys['search-helper'], pins, failures);
  checkPreamble(systemTexts(body) ?? [], pins, where, failures);

  // One server tool, of the pinned type and name. Its remaining keys are the
  // model's own search input passed through — allowed_domains on a domain-scoped
  // search, and blocked_domains by the same route — so they are permitted and
  // reported rather than pinned. Pinning the exact JSON refused a real research
  // run for doing something ordinary.
  const tools = toolList(body);
  if (tools.length !== 1) {
    failures.push(`${where}: the search helper carried ${tools.length} tools, not 1`);
  } else {
    const tool = asRecord(tools[0]) ?? {};
    if (tool.type !== pins.searchHelperTool.type || tool.name !== pins.searchHelperTool.name) {
      failures.push(
        `${where}: the search helper's tool is {type: ${JSON.stringify(tool.type)}, name: ${JSON.stringify(tool.name)}}, not the pinned server tool`,
      );
    }
    const allowed = new Set(['type', 'name', ...pins.searchHelperTool.optionalKeys]);
    const extra = Object.keys(tool).filter((key) => !allowed.has(key));
    if (extra.length > 0) {
      failures.push(`${where}: the search helper's tool carries unpinned key(s): ${extra.sort().join(', ')}`);
    }
  }
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const message = messages.length === 1 ? asRecord(messages[0]) : null;
  const text = message?.role === 'user' ? singleText(message.content) : null;
  if (text === null || !text.startsWith(pins.searchHelperUserPrefix)) {
    failures.push(`${where}: the search helper's message is not one "${pins.searchHelperUserPrefix}" text block`);
  }
}

function checkFetchSummarizer(
  request: CapturedRequest,
  body: Record<string, unknown>,
  pins: Pins,
  failures: string[],
): void {
  const where = request.file;
  checkEnvelope(where, body, pins.topLevelKeys['fetch-summarizer'], pins, failures);
  const system = systemTexts(body) ?? [];
  checkPreamble(system, pins, where, failures);
  if (system.length !== 2) failures.push(`${where}: the fetch summarizer carried ${system.length} system blocks, not 2`);
  if (toolList(body).length > 0) failures.push(`${where}: the fetch summarizer carried tools`);

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const message = messages.length === 1 ? asRecord(messages[0]) : null;
  const text = message?.role === 'user' ? singleText(message.content) : null;
  if (text === null) {
    failures.push(`${where}: the fetch summarizer's message is not a single user text block`);
    return;
  }
  if (!text.startsWith(pins.fetchSummarizerPrefix)) {
    failures.push(`${where}: the fetch summarizer does not open with the pinned page-content prefix`);
  }
  const suffix = text.slice(-pins.fetchSummarizerSuffix.length);
  if (sha256(suffix) !== pins.fetchSummarizerSuffix.sha256) {
    failures.push(`${where}: the fetch summarizer does not end with the pinned instruction suffix`);
  }
}

/**
 * What is wrong with one tool_result's payload, if anything.
 *
 * `content` is a bare string on some tools and an array of blocks on others.
 * Both are read. Every block must be text, because a shape this cannot read is
 * a shape it cannot scan, and every text is scanned for the reminder marker.
 */
function scanToolResult(content: unknown): string[] {
  const complaints: string[] = [];
  const texts: string[] = [];

  if (typeof content === 'string') {
    texts.push(content);
  } else if (Array.isArray(content)) {
    for (const raw of content) {
      const block = asRecord(raw);
      const type = typeof block?.type === 'string' ? block.type : '?';
      if (type !== 'text') {
        complaints.push(`carries a ${type} content block, which is not text`);
        continue;
      }
      if (typeof block?.text === 'string') texts.push(block.text);
    }
  } else if (content !== undefined && content !== null) {
    complaints.push(`content is a ${typeof content}, not a string or a list of blocks`);
  }

  if (texts.some((text) => text.includes(REMINDER_MARKER))) {
    complaints.push(`content carries a ${REMINDER_MARKER}`);
  }
  return complaints;
}

function checkMainTurn(
  request: CapturedRequest,
  body: Record<string, unknown>,
  input: ProofInput,
  pins: Pins,
  failures: string[],
): { file: string; blocks: { source: string; text: string }[] } | null {
  const where = request.file;
  const identifiers = checkEnvelope(where, body, pins.topLevelKeys['main-turn'], pins, failures);
  const system = systemTexts(body) ?? [];
  checkPreamble(system, pins, where, failures);
  if (system[2]!.length !== pins.vendorPromptLength) {
    failures.push(`${where}: the vendor prompt is ${system[2]!.length} characters, not ${pins.vendorPromptLength}`);
  }

  if (body.model !== input.model) {
    failures.push(`${where}: model is "${String(body.model)}", not the pinned "${input.model}"`);
  }

  // The effort pin, verifiable from the request for the first time. It used to
  // be a launcher flag nobody could check against what was actually sent.
  const effort = asRecord(body.output_config)?.effort;
  if (effort !== pins.effort) {
    failures.push(`${where}: output_config.effort is "${String(effort)}", not the pinned "${pins.effort}"`);
  }

  const tools = toolList(body);
  const seen: Record<string, string> = {};
  for (const tool of tools) {
    const name = asRecord(tool)?.name;
    seen[typeof name === 'string' ? name : JSON.stringify(tool)] = sha256(JSON.stringify(tool));
  }
  const wanted = Object.keys(pins.clientTools).sort().join(',');
  if (Object.keys(seen).sort().join(',') !== wanted) {
    failures.push(`${where}: tools were [${Object.keys(seen).sort().join(', ')}], expected exactly [${wanted}]`);
  } else {
    for (const [name, hash] of Object.entries(pins.clientTools)) {
      if (seen[name] !== hash) failures.push(`${where}: the ${name} tool definition is not the pinned one`);
    }
  }

  const disclosed: { source: string; text: string }[] = [];
  const messages = Array.isArray(body.messages) ? body.messages : [];

  // messages[0]: the account reminder, then the package and nothing else.
  const first = asRecord(messages[0]);
  const content = Array.isArray(first?.content) ? first!.content : [];
  if (first?.role !== 'user' || content.length !== 2) {
    failures.push(`${where}: messages[0] is not a user message of two text blocks`);
    return null;
  }
  const texts = content.map((block) => textOf(block));
  if (texts.some((text) => text === null)) {
    failures.push(`${where}: messages[0] carries a block that is not text`);
    return null;
  }
  if (!pins.accountReminder.test(texts[0] as string)) {
    failures.push(`${where}: messages[0][0] is not the pinned account reminder`);
  } else {
    disclosed.push({ source: 'messages[0][0] account', text: redactEmail(texts[0] as string) });
  }
  if (texts[1] !== input.packageText) {
    failures.push(`${where}: messages[0][1] is not the declared package byte for byte`);
  }

  // messages[1]: the host environment, model identity and date, as a
  // system-role message rather than as reminder blocks in the user turn.
  const second = asRecord(messages[1]);
  const environment = second?.role === 'system' ? singleText(second.content) : null;
  if (environment === null) {
    failures.push(`${where}: messages[1] is not a system-role message of one text`);
  } else {
    const match = pins.environmentMessage.exec(environment);
    if (!match) {
      failures.push(`${where}: messages[1] is not the pinned environment message`);
    } else {
      if (match.groups?.cwd !== input.workDir) {
        failures.push(
          `${where}: the environment message names "${match.groups?.cwd}" as the working directory, not "${input.workDir}"`,
        );
      }
      if (match.groups?.model !== input.model) {
        failures.push(`${where}: the environment message names "${match.groups?.model}", not the pinned "${input.model}"`);
      }
      disclosed.push({ source: 'messages[1] environment', text: redactEmail(environment) });
    }
  }

  // The third piece of host context, and the only one recorded by name rather
  // than by text. A device id, an account uuid and a session id travel in
  // `metadata.user_id`. That they are sent is worth publishing; what they are is
  // not, so the values are never read into the report.
  if (identifiers) {
    disclosed.push({
      source: 'metadata.user_id identifiers',
      text: `present, values not recorded: ${identifiers.join(', ')}`,
    });
  }

  // Everything after those two. A later user message carries tool results and
  // nothing else; a later assistant message carries the model's own blocks. A
  // text block appearing on a later user message would be context added between
  // turns, which is exactly what the capture exists to catch.
  //
  // A tool_result is checked twice over, because its payload is the one place
  // in a later turn where arbitrary text legitimately appears. Its blocks must
  // all be text, so nothing arrives in a shape this cannot read; and the text is
  // scanned for the reminder marker, because a tool_result carrying one would be
  // host instruction text re-entering the conversation through the only door
  // left open. An earlier version of this scanned a `text` field that a
  // tool_result does not have, so it checked nothing at all.
  const toolUseIds = new Set(input.stream.toolUseIds);
  for (let index = 2; index < messages.length; index += 1) {
    const message = asRecord(messages[index]);
    const blocks = Array.isArray(message?.content) ? message!.content : [];
    const role = String(message?.role);
    if (role !== 'user' && role !== 'assistant') {
      failures.push(`${where}: messages[${index}] has role "${role}", which only the first two messages may have`);
      continue;
    }
    const allowed = role === 'user' ? ['tool_result'] : ['thinking', 'redacted_thinking', 'text', 'tool_use'];
    for (const raw of blocks) {
      const block = asRecord(raw);
      const type = typeof block?.type === 'string' ? block.type : '?';
      if (!allowed.includes(type)) {
        failures.push(`${where}: messages[${index}] (${role}) carries a ${type} block`);
        continue;
      }
      if (type === 'tool_result') {
        const id = block?.tool_use_id;
        if (typeof id !== 'string' || !toolUseIds.has(id)) {
          failures.push(`${where}: messages[${index}] carries a tool_result for "${String(id)}", which the stream never reported`);
        }
        for (const complaint of scanToolResult(block?.content)) {
          failures.push(`${where}: messages[${index}] tool_result ${complaint}`);
        }
        continue;
      }
      const text = typeof block?.text === 'string' ? block.text : '';
      if (text.includes(REMINDER_MARKER)) {
        failures.push(`${where}: messages[${index}] carries a ${REMINDER_MARKER} after the first two messages`);
      }
    }
  }

  return { file: where, blocks: disclosed };
}

/**
 * The whole check, over one capture directory's contents. Pure: give it the
 * same requests, package bytes, stream facts and pins and it returns the same
 * verdict, with no filesystem and no launcher involved.
 */
export function proveRequests(input: ProofInput): ProofResult {
  const table = input.pins ?? PINS;
  const failures: string[] = [];
  const classified: { file: string; shape: Shape }[] = [];
  const disclosed: { file: string; blocks: { source: string; text: string }[] }[] = [];
  const observations: Observation[] = [];
  const counts: Record<string, number> = {
    connectivity: 0,
    'session-title': 0,
    'main-turn': 0,
    'search-helper': 0,
    'fetch-summarizer': 0,
    unknown: 0,
  };

  const productionUpstream = input.upstream === PRODUCTION_UPSTREAM;
  const pins = table[input.cliVersion]?.[input.model];
  if (!pins) {
    const known = Object.entries(table)
      .flatMap(([version, models]) => Object.keys(models).map((model) => `${version} + ${model}`))
      .join(', ');
    return {
      status: 'fail',
      requests: [],
      failures: [
        `CLI version ${input.cliVersion} running ${input.model} has no pinned request profile (pinned: ${known || 'none'})`,
      ],
      disclosed: [],
      observations: [],
      summary: {
        upstream: input.upstream,
        production_upstream: productionUpstream,
        cli_version: input.cliVersion,
        model: input.model,
        effort: null,
        vendor_prompt_sha256: null,
        tool_definitions_sha256: null,
        request_count: input.requests.length,
        main_turn_count: 0,
        side_request_counts: counts,
        ...(input.requestsManifestSha256 ? { requests_manifest_sha256: input.requestsManifestSha256 } : {}),
      },
    };
  }

  if (input.requests.length === 0) failures.push('the capture directory holds no requests');

  for (const request of input.requests) {
    const shape = classify(request, pins);
    classified.push({ file: request.file, shape });
    counts[shape] = (counts[shape] ?? 0) + 1;
    const body = asRecord(request.body);

    if (body) {
      observations.push({
        file: request.file,
        shape,
        model: body.model,
        max_tokens: body.max_tokens,
        thinking: body.thinking,
        output_config: body.output_config,
        ...(shape === 'search-helper' ? { search_tool: toolList(body)[0] } : {}),
      });
    }

    switch (shape) {
      case 'connectivity':
        if (request.url !== '/api/hello') {
          failures.push(`${request.file}: a HEAD request went to "${request.url}", not /api/hello`);
        }
        break;
      case 'session-title':
        checkSessionTitle(request, body!, input, pins, failures);
        break;
      case 'main-turn': {
        const row = checkMainTurn(request, body!, input, pins, failures);
        if (row) disclosed.push(row);
        break;
      }
      case 'search-helper':
        checkSearchHelper(request, body!, pins, failures);
        break;
      case 'fetch-summarizer':
        checkFetchSummarizer(request, body!, pins, failures);
        break;
      default:
        failures.push(`${request.file}: the request matches no pinned shape`);
    }
  }

  if (counts['session-title'] !== 1) {
    failures.push(`expected exactly one session-title request, saw ${counts['session-title']}`);
  }
  if (counts['main-turn'] === 0) {
    failures.push('the capture holds no main turn');
  } else if (counts['main-turn'] !== input.stream.assistantTurns) {
    failures.push(
      `the capture holds ${counts['main-turn']} main turn(s) and the stream reported ${input.stream.assistantTurns} assistant turn(s)`,
    );
  }

  return {
    status: failures.length === 0 ? 'pass' : 'fail',
    requests: classified,
    failures,
    disclosed,
    observations,
    summary: {
      upstream: input.upstream,
      production_upstream: productionUpstream,
      cli_version: input.cliVersion,
      model: input.model,
      effort: pins.effort,
      vendor_prompt_sha256: pins.vendorPromptSha256,
      tool_definitions_sha256: { ...pins.clientTools },
      request_count: input.requests.length,
      main_turn_count: counts['main-turn'] ?? 0,
      side_request_counts: counts,
      ...(input.requestsManifestSha256 ? { requests_manifest_sha256: input.requestsManifestSha256 } : {}),
    },
  };
}

/**
 * Read a pin table from a JSON file, with the three pattern fields as source
 * strings.
 *
 * This exists because the built-in table pins the vendor prompt and the two
 * tool definitions BY HASH, and this repository does not carry their text. A
 * test that wants a capture to pass end to end therefore has to supply the
 * hashes of the stand-ins its fixture actually contains. It is a real
 * loosening, so the launcher gates it twice: it is honoured only alongside a
 * loopback `YEGFACTS_REVIEW_UPSTREAM`, and a run that used it can never be
 * admitted for research. `pins_source` records which table was used, in the
 * attempt metadata and in the public manifest row.
 */
const PATTERN_FIELDS = ['billingHeaderPattern', 'accountReminder', 'environmentMessage'] as const;

export function loadPins(file: string): Record<string, Record<string, Pins>> {
  const raw = JSON.parse(readFileSync(file, 'utf8')) as Record<string, Record<string, Record<string, unknown>>>;
  const table: Record<string, Record<string, Pins>> = {};
  for (const [version, models] of Object.entries(raw)) {
    table[version] = {};
    for (const [model, row] of Object.entries(models)) {
      const built = { ...row } as Record<string, unknown>;
      for (const field of PATTERN_FIELDS) built[field] = new RegExp(String(row[field]));
      table[version]![model] = built as unknown as Pins;
    }
  }
  return table;
}

export type Capture = {
  requests: CapturedRequest[];
  upstream: string;
  requestsManifestSha256: string;
};

/**
 * Read a capture directory. The manifest hash covers the sorted list of
 * `<file> <hash>` lines over every `req-*`/`res-*` file, so a published row can
 * be checked against the retained bytes without republishing them, and a file
 * removed after the fact changes the hash.
 */
export function readCapture(dir: string): Capture {
  const entries = readdirSync(dir).sort();
  const requests: CapturedRequest[] = [];
  const manifest: string[] = [];

  for (const name of entries) {
    if (!/^(req|res)-\d+\.(json|txt)$/.test(name)) continue;
    const raw = readFileSync(path.join(dir, name));
    manifest.push(`${name} ${createHash('sha256').update(raw).digest('hex')}`);
    if (!name.startsWith('req-')) continue;
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(raw.toString('utf8')) as Record<string, unknown>;
    } catch {
      // A capture file the proxy could not finish writing. Kept in the manifest
      // and pushed through as an unclassifiable request rather than skipped.
    }
    requests.push({
      file: name,
      method: typeof parsed.method === 'string' ? parsed.method : '?',
      url: typeof parsed.url === 'string' ? parsed.url : '?',
      headers: (asRecord(parsed.headers) ?? {}) as Record<string, unknown>,
      body: parsed.body,
    });
  }

  const upstreamFile = path.join(dir, 'upstream.txt');
  let upstream = '';
  try {
    upstream = readFileSync(upstreamFile, 'utf8').trim();
  } catch {
    upstream = '';
  }

  return { requests, upstream, requestsManifestSha256: sha256(manifest.join('\n')) };
}

/**
 * A one-line CLI, for the launcher and nothing else: print one pinned scalar.
 *
 *   tsx request-proof.ts --field binarySha256 --cli-version 2.1.272 \
 *                        --model claude-opus-5 [--pins <file>]
 *
 * The launcher is a shell script and the pins live here. It asks rather than
 * keeping its own copy of a hash, because two copies of a pin is one copy too
 * many: the one in the shell would be the one nobody noticed going stale.
 * Exits 2 when the profile has no row or the field is empty, so a missing pin
 * stops the launcher instead of turning into an empty string.
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
  const flags: Record<string, string> = {};
  const argv = process.argv.slice(2);
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith('--') || value === undefined) {
      console.error(`bad arguments near "${flag ?? ''}"`);
      process.exit(2);
    }
    flags[flag.slice(2)] = value;
  }
  const table = flags.pins ? loadPins(flags.pins) : PINS;
  const row = table[flags['cli-version'] ?? '']?.[flags.model ?? ''] as Record<string, unknown> | undefined;
  const value = row?.[flags.field ?? ''];
  if (typeof value !== 'string' || value === '') {
    console.error(`no pinned ${flags.field} for CLI version ${flags['cli-version']} running ${flags.model}`);
    process.exit(2);
  }
  process.stdout.write(value);
}
