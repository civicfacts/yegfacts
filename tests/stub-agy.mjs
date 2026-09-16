#!/usr/bin/env node
/**
 * A stand-in for `agy`, for the tests that drive the Gemini seat end to end.
 *
 * This seat has no capture to make real, so what has to be real instead is the
 * CLI's own local record: the stream on stdout, the transcript under the
 * per-attempt HOME, and the page contents the fetch tool saves. The launcher
 * copies all three out of the home before it takes the home down, and the
 * denylist runs over the first two. So this stub writes them where agy 1.1.28
 * writes them, in the shapes the 2026-09-16 probe recorded, and a leaking run
 * leaks for real: it reads the test machine's own CLAUDE.md or memory file off
 * disk and copies a line of it into the transcript.
 *
 * `YEGFACTS_STUB_DIR` configures it (`version`, `exit`, `mutate`) and
 * `YEGFACTS_STUB_HOME` names the machine's real private files, because the
 * launcher has replaced HOME with the per-attempt one by the time this runs —
 * which is itself the thing under test.
 */
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  readlinkSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const state = process.env.YEGFACTS_STUB_DIR ?? '';
const read = (name, fallback = '') =>
  existsSync(path.join(state, name)) ? readFileSync(path.join(state, name), 'utf8') : fallback;

if (argv[0] === '--version') {
  process.stdout.write(read('version', '1.1.28\n'));
  process.exit(0);
}

const flag = (name) => {
  const index = argv.indexOf(name);
  return index === -1 ? '' : argv[index + 1] ?? '';
};

const prompt = flag('--prompt');
const logFile = flag('--log-file');
const model = flag('--model');
const home = process.env.HOME ?? '';
const realHome = process.env.YEGFACTS_STUB_HOME ?? '';
const isCanary = prompt.includes('CANARY.md');
// The canary and the research run are broken independently, because the
// interesting case is a clean canary followed by a research run that leaked.
const mutate = read(isCanary ? 'mutate-canary' : 'mutate').trim();
if (!isCanary) writeFileSync(path.join(state, 'package-sent.txt'), prompt);

// What the per-attempt home looked like from inside the subprocess, recorded so
// a test can assert on it after the launcher has taken the home down.
{
  const cliDir = path.join(home, '.gemini', 'antigravity-cli');
  const token = path.join(cliDir, 'antigravity-oauth-token');
  const link = lstatSync(token, { throwIfNoEntry: false });
  const settings = path.join(cliDir, 'settings.json');
  writeFileSync(
    path.join(state, 'home-seen.json'),
    JSON.stringify({
      entries: existsSync(cliDir) ? readdirSync(cliDir).sort() : [],
      mode: existsSync(home) ? (statSync(home).mode & 0o777).toString(8) : '',
      settings: existsSync(settings) ? readFileSync(settings, 'utf8') : '',
      token_is_symlink: link ? link.isSymbolicLink() : false,
      token_target: link?.isSymbolicLink() ? readlinkSync(token) : '',
    }),
  );
}

/** The first line of a file long enough for the check to treat as a needle. */
function firstNeedle(file) {
  for (const raw of readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim();
    if (line.length >= 24 && !line.startsWith('```') && !/^#+$/.test(line) && !/^-{3,}$/.test(line)) return line;
  }
  throw new Error(`no line worth leaking in ${file}`);
}

function firstMemoryFile(root) {
  const projects = path.join(root, '.claude', 'projects');
  for (const project of readdirSync(projects).sort()) {
    const memory = path.join(projects, project, 'memory');
    for (const file of readdirSync(memory).sort()) {
      if (file.endsWith('.md')) return path.join(memory, file);
    }
  }
  throw new Error(`no memory file under ${projects}`);
}

let leaked = '';
if (mutate === 'leak-home') leaked = firstNeedle(path.join(realHome, '.claude', 'CLAUDE.md'));
if (mutate === 'leak-memory') leaked = firstNeedle(firstMemoryFile(realHome));

// The fixture the canary was told to open. The deny rules refuse it at the
// permission check, so this stub records the refusal rather than the contents —
// unless the test asked for the boundary to break.
const fixture = /(\/\S+CANARY\.md)/.exec(prompt)?.[1] ?? '';
let token = null;
if (mutate === 'token-leak' && fixture) {
  try {
    token = /token: (\S+)/.exec(readFileSync(fixture, 'utf8'))?.[1] ?? null;
  } catch {
    token = null;
  }
}

const conversation = 'e8afbe6a-4744-4b8d-9b4c-710043d03cca';
const brain = path.join(home, '.gemini', 'antigravity-cli', 'brain', conversation, '.system_generated');
mkdirSync(path.join(brain, 'logs'), { recursive: true });
mkdirSync(path.join(brain, 'steps', '2'), { recursive: true });

// What the fetch tool saves. The model cannot open it under this profile; the
// launcher retains it and the canary check reads the heading out of it.
writeFileSync(
  path.join(brain, 'steps', '2', 'content.md'),
  mutate === 'empty-fetch'
    ? 'Title: Cached Content\n\nSource: https://example.com/\n\n---\n\n<html><body></body></html>\n'
    : 'Title: Cached Content\n\nSource: https://example.com/\n\n---\n\n' +
      '<!doctype html><html><head><title>Example Domain</title></head><body><div><h1>Example Domain</h1>' +
      '<p>This domain is for use in documentation examples.</p></div></body></html>\n',
);

const packaged = mutate === 'no-package' ? 'a package this run never received\n' : prompt;
const answer = JSON.stringify({ web_h1: 'Example Domain', canary_token: token, tools: ['read_url_content', 'search_web'] });

const transcript = [
  {
    step_index: 0,
    source: 'USER_EXPLICIT',
    type: 'USER_INPUT',
    status: 'DONE',
    content: `<USER_REQUEST>\n${packaged}\n</USER_REQUEST>\n<ADDITIONAL_METADATA>\nThe current local time is: 2026-09-16T10:44:03-06:00.\n</ADDITIONAL_METADATA>`,
  },
  {
    step_index: 1,
    source: 'MODEL',
    type: 'PLANNER_RESPONSE',
    status: 'DONE',
    thinking: 'Fetch the page, then try the file.',
    ...(leaked ? { host_instruction: leaked } : {}),
    tool_calls: [{ name: 'read_url_content', args: { Url: 'https://example.com/' } }],
  },
  {
    step_index: 2,
    source: 'MODEL',
    type: 'GENERIC',
    status: 'DONE',
    content: `Title: Cached Content\n\nThe full content of the article at https://example.com/ has been saved to: ${path.join(brain, 'steps', '2', 'content.md')}`,
  },
  {
    step_index: 3,
    source: 'MODEL',
    type: 'GENERIC',
    status: mutate === 'file-tool-done' || mutate === 'token-leak' ? 'DONE' : 'ERROR',
    ...(mutate === 'file-tool-done' || mutate === 'token-leak'
      ? { content: `read ${fixture}` }
      : {
          error: `permission check failed for read_file "${fixture}": Permission denied for read_file(${fixture}). Matches user-configured deny rule.`,
        }),
  },
  { step_index: 4, source: 'MODEL', type: 'PLANNER_RESPONSE', status: 'DONE', content: answer },
];
writeFileSync(
  path.join(brain, 'logs', 'transcript_full.jsonl'),
  `${transcript.map((entry) => JSON.stringify(entry)).join('\n')}\n`,
);

if (logFile) writeFileSync(logFile, 'stub agy log: no request bodies are recorded here, which is the point.\n');

const step = (over) => JSON.stringify({ event: 'step_update', step_update: { conversation_id: conversation, ...over } });
const fileToolState = mutate === 'file-tool-done' || mutate === 'token-leak' ? 'DONE' : 'ERROR';
const stream = [
  JSON.stringify({
    event: 'init',
    conversation_id: conversation,
    init: {
      model,
      cwd: process.cwd(),
      tools: ['read_url_content', 'search_web', 'view_file', 'run_command', 'write_to_file', 'grep_search'],
    },
  }),
  step({ step_index: 0, state: 'DONE', step_type: 'user_input' }),
  step({ step_index: 1, state: 'DONE', step_type: 'agent_response', usage: { input_tokens: 14111, output_tokens: 1130 } }),
  step({
    step_index: 2,
    state: mutate === 'no-fetch' ? 'ERROR' : 'DONE',
    step_type: 'tool',
    tool_name: 'read_url_content',
    tool_info: {
      name: 'read_url_content',
      parameters: { Url: 'https://example.com/' },
      ...(mutate === 'no-fetch' ? { error: { type: 'TOOL_ERROR', message: 'network unreachable' } } : {}),
    },
  }),
  step({
    step_index: 3,
    state: fileToolState,
    step_type: 'tool',
    tool_name: 'view_file',
    tool_info: {
      name: 'view_file',
      parameters: { AbsolutePath: fixture },
      ...(fileToolState === 'ERROR'
        ? {
            error: {
              type: 'TOOL_ERROR',
              message: `permission check failed for read_file "${fixture}": Permission denied for read_file(${fixture}). Matches user-configured deny rule.`,
            },
          }
        : {}),
    },
  }),
  step({ step_index: 4, state: 'DONE', step_type: 'agent_response', text_delta: answer, usage: { input_tokens: 16345, output_tokens: 1319 } }),
  JSON.stringify({
    event: 'result',
    result: {
      conversation_id: conversation,
      status: mutate === 'failed-result' ? 'CANCELLED' : 'SUCCESS',
      response: isCanary ? answer : 'a report a reader could use',
      duration_seconds: 82.1,
      num_turns: 1,
      usage: { input_tokens: 46027, output_tokens: 2948 },
    },
  }),
  '',
].join('\n');

process.stdout.write(stream);
process.exit(Number(read('exit', '0').trim() || '0'));
