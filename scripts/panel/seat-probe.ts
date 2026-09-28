/**
 * Seat refusal probes (methodology v1.42, D-0047 rule 1).
 *
 * A page qualifies to be carried when a panel seat's own web tool is refused
 * there, even if the site's fetcher is not. The evidence has to be the seat's
 * tool, the URL and the time, so this script asks each seat's CLI, under the
 * model run-reviewer.sh pins for it, to fetch each URL once with its own web
 * tool, and records what the tool itself returned:
 *
 *   npx tsx scripts/panel/seat-probe.ts reviews/<story>/<date> \
 *     --url <url> [--url <url> ...] [--seats claude,gpt,gpt-luna]
 *
 * Each result is appended to <run>/carried/seat-probes.yaml, which is
 * committed: URL, seat, model, tool, CLI version, UTC time, the outcome, the
 * HTTP status when the tool reports one, and the tool's raw error text.
 *
 * What counts as a refusal, and why. Only failure metadata the tool itself
 * emits is read: a status code or an error field. Page titles, snippets and
 * the model's own words are never read, because a page that opened can talk
 * about errors too.
 *   - Claude's WebFetch reports the HTTP status of its request (`code` on the
 *     tool result). A status of 400 or above is a refusal; so is a tool result
 *     the CLI marks `is_error`. The tool's failure message is kept, cut to
 *     300 characters.
 *   - Codex's `open_page` action carries no status or error field in the
 *     current CLI. A refusal needs one (`status`, `status_code`, `http_status`
 *     or `error` on the item); without it the outcome is `unclear`, which
 *     never qualifies. In practice only the Claude seat can show a refusal.
 *   - A seat that never called its web tool for the URL is `no-tool-call`.
 * Only `refused` counts toward eligibility, and only with either an HTTP
 * status or the tool's failure message (carry-manifest.ts, seatRefusalFor),
 * and only when the tool's own request URL is the page's URL.
 *
 * The probe sends only the URL and a one-line instruction, so it runs without
 * the capture proxy that research runs need. It keeps the CLIs away from local
 * instructions the same way the research profiles do: Claude in safe mode with
 * no setting sources and only WebFetch allowed; Codex with a temporary
 * CODEX_HOME holding only the credential link, rules and project docs off.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';
import YAML from 'yaml';

export type SeatName = 'claude' | 'gpt' | 'gpt-luna';

/** The pinned models, as scripts/panel/run-reviewer.sh sets them. */
export const SEAT_MODELS: Record<SeatName, { cli: 'claude' | 'codex'; model: string; tool: string }> = {
  claude: { cli: 'claude', model: 'claude-opus-5-5', tool: 'WebFetch' },
  gpt: { cli: 'codex', model: 'gpt-6-sol', tool: 'web_search open_page' },
  'gpt-luna': { cli: 'codex', model: 'gpt-6-luna', tool: 'web_search open_page' },
};

export type Outcome = 'refused' | 'fetched' | 'unclear' | 'no-tool-call' | 'cli-failed';

export type SeatProbe = {
  url: string;
  seat: SeatName;
  model: string;
  tool: string;
  cli_version: string;
  probed_at: string;
  outcome: Outcome;
  http_status: number | null;
  /** The URL the tool itself requested, which can differ in its encoding. */
  tool_url: string | null;
  raw_error: string | null;
};

type Classified = Pick<SeatProbe, 'outcome' | 'http_status' | 'tool_url' | 'raw_error'>;

/** A committed probe keeps at most this much of a tool's failure message, and never page text. */
export const RAW_LIMIT = 300;

const jsonLines = (stdout: string): Record<string, any>[] =>
  stdout.split('\n').flatMap((line) => {
    try {
      const parsed = JSON.parse(line) as unknown;
      return parsed && typeof parsed === 'object' ? [parsed as Record<string, any>] : [];
    } catch {
      return [];
    }
  });

/** Claude Code stream-json: the WebFetch tool_use and the status its tool_result reports. */
export function classifyClaudeStream(stdout: string): Classified {
  const events = jsonLines(stdout);
  const calls = new Map<string, string>();
  for (const event of events) {
    for (const block of event.message?.content ?? []) {
      if (block?.type === 'tool_use' && block.name === 'WebFetch') calls.set(block.id, String(block.input?.url ?? ''));
    }
  }
  if (calls.size === 0) return { outcome: 'no-tool-call', http_status: null, tool_url: null, raw_error: null };
  for (const event of events) {
    for (const block of event.message?.content ?? []) {
      if (block?.type !== 'tool_result' || !calls.has(block.tool_use_id)) continue;
      const meta = event.tool_use_result ?? {};
      const content = typeof block.content === 'string' ? block.content : '';
      const status = typeof meta.code === 'number' ? meta.code : null;
      const toolUrl = calls.get(block.tool_use_id) ?? null;
      // On a failure the tool's result is its own error message; on success it is page text and is not kept.
      if (status !== null && status >= 400) {
        return { outcome: 'refused', http_status: status, tool_url: toolUrl, raw_error: String(meta.result ?? content).slice(0, RAW_LIMIT) };
      }
      if (status !== null) return { outcome: 'fetched', http_status: status, tool_url: toolUrl, raw_error: null };
      if (block.is_error === true) return { outcome: 'refused', http_status: null, tool_url: toolUrl, raw_error: content.slice(0, RAW_LIMIT) };
      return { outcome: 'unclear', http_status: null, tool_url: toolUrl, raw_error: null };
    }
  }
  return { outcome: 'unclear', http_status: null, tool_url: [...calls.values()][0] ?? null, raw_error: null };
}

/** Codex --json: the web tool's open_page action and the result entries it returned. */
export function classifyCodexStream(stdout: string): Classified {
  const opens = jsonLines(stdout)
    .map((event) => event.item)
    .filter((item) => item?.type === 'web_search' && item.action?.type === 'open_page');
  if (opens.length === 0) return { outcome: 'no-tool-call', http_status: null, tool_url: null, raw_error: null };
  const item = opens.at(-1)!;
  const toolUrl = String(item.action.url ?? '');
  const statusField = [item.status, item.status_code, item.http_status, item.action?.status].find((v) => typeof v === 'number');
  const errorField = [item.error, item.action?.error].find((v) => typeof v === 'string' && v.trim());
  if (typeof statusField === 'number' && statusField >= 400) {
    return { outcome: 'refused', http_status: statusField, tool_url: toolUrl, raw_error: typeof errorField === 'string' ? errorField.slice(0, RAW_LIMIT) : null };
  }
  if (typeof errorField === 'string') return { outcome: 'refused', http_status: null, tool_url: toolUrl, raw_error: errorField.slice(0, RAW_LIMIT) };
  if (typeof statusField === 'number') return { outcome: 'fetched', http_status: statusField, tool_url: toolUrl, raw_error: null };
  // No failure metadata from the tool: whatever the result entries say, the outcome is unclear.
  return { outcome: 'unclear', http_status: null, tool_url: toolUrl, raw_error: null };
}

const PROMPT = (url: string) =>
  `Use your web tool exactly once to open this exact URL: ${url}\nDo not search, do not open any other page and do not use any other tool. Then reply with one short line saying what the tool returned.`;

function cliVersion(cli: string): string {
  const result = spawnSync(cli, ['--version'], { encoding: 'utf8' });
  return (result.stdout ?? '').split('\n')[0]?.trim() || 'unknown';
}

/** Run one seat's CLI against one URL and classify what its web tool returned. */
export function probeSeat(seat: SeatName, url: string, now = () => new Date()): SeatProbe {
  const { cli, model, tool } = SEAT_MODELS[seat];
  const probedAt = now().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const base = { url, seat, model, tool, cli_version: cliVersion(cli), probed_at: probedAt };
  const work = mkdtempSync(path.join(tmpdir(), `yegfacts-seat-probe-${seat}-`));
  try {
    let result;
    if (cli === 'claude') {
      result = spawnSync(
        'claude',
        [
          '-p', '--model', model, '--effort', 'high', '--safe-mode', '--setting-sources', '', '--strict-mcp-config',
          '--disable-slash-commands', '--no-session-persistence', '--permission-prompts', 'none',
          '--tools', 'WebFetch', '--allowedTools', 'WebFetch', '--output-format', 'stream-json', '--verbose',
        ],
        { input: PROMPT(url), encoding: 'utf8', cwd: work, timeout: 600_000, maxBuffer: 64 * 1024 * 1024 },
      );
    } else {
      const auth = path.join(homedir(), '.codex', 'auth.json');
      if (!existsSync(auth)) throw new Error(`no codex credential at ${auth}`);
      const home = path.join(work, 'codex-home');
      mkdirSync(home);
      symlinkSync(auth, path.join(home, 'auth.json'));
      result = spawnSync(
        'codex',
        [
          '--search', 'exec', '-m', model, '-C', work, '--skip-git-repo-check', '-s', 'read-only', '--strict-config',
          '--ignore-rules', '--json', '-c', 'skills.include_instructions=false', '-c', 'project_doc_max_bytes=0',
          '--disable', 'plugins', '--disable', 'apps', '--disable', 'hooks', '--disable', 'memories',
        ],
        {
          input: PROMPT(url),
          encoding: 'utf8',
          cwd: work,
          timeout: 600_000,
          maxBuffer: 64 * 1024 * 1024,
          env: { ...process.env, CODEX_HOME: home, CMUX_CODEX_HOOKS_DISABLED: '1' },
        },
      );
    }
    if (result.error || (result.status !== 0 && !result.stdout)) {
      return {
        ...base,
        outcome: 'cli-failed',
        http_status: null,
        tool_url: null,
        raw_error: String(result.error?.message ?? 'the CLI exited without output').slice(0, RAW_LIMIT),
      };
    }
    return { ...base, ...(cli === 'claude' ? classifyClaudeStream(result.stdout) : classifyCodexStream(result.stdout)) };
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

export type SeatProbeFile = { probes: SeatProbe[] };

export function seatProbesPath(runDir: string): string {
  return path.join(runDir, 'carried', 'seat-probes.yaml');
}

export function loadSeatProbes(file: string): SeatProbe[] {
  if (!existsSync(file)) return [];
  return (YAML.parse(readFileSync(file, 'utf8')) as SeatProbeFile | null)?.probes ?? [];
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const runDir = args[0];
  const urls = args.filter((_, index) => args[index - 1] === '--url');
  const seatsArg = args.find((_, index) => args[index - 1] === '--seats') ?? 'claude,gpt,gpt-luna';
  const seats = seatsArg.split(',') as SeatName[];
  if (!runDir || runDir.startsWith('--') || urls.length === 0 || seats.some((s) => !(s in SEAT_MODELS))) {
    console.error('usage: seat-probe.ts <run dir> --url <url> [--url ...] [--seats claude,gpt,gpt-luna]');
    process.exit(2);
  }
  const file = seatProbesPath(path.resolve(runDir));
  const probes = loadSeatProbes(file);
  for (const url of urls) {
    for (const seat of seats) {
      const probe = probeSeat(seat, url);
      probes.push(probe);
      console.error(`${probe.outcome.padEnd(12)} ${seat.padEnd(9)} ${probe.http_status ?? '-'}  ${url}`);
    }
  }
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(
    file,
    `# Seat refusal probes (methodology v1.42). Committed. Each row is one seat's own web tool on one URL.\n${YAML.stringify({ probes }, { lineWidth: 0 })}`,
  );
  console.error(`wrote ${path.relative(process.cwd(), file)}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error: unknown) => {
    console.error(`seat-probe: ${(error as Error).message}`);
    process.exit(1);
  });
}
