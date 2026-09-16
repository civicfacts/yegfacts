/**
 * The line between "we checked the configuration" and "we checked the context".
 *
 * The structural checks read the stream, which is the host reporting on itself.
 * The capture check reads the captured request, which is what the host actually
 * sent. They are different evidence and the lock here is that structural
 * cleanliness alone never admits a run: a stream that passes every check with
 * no capture behind it is still refused, and if someone later makes
 * `admitForResearch` pass by tightening the structural checks, that test fails.
 */
import { describe, expect, it } from 'vitest';
import type { CaptureCheckResult } from '../scripts/panel/capture-check.ts';
import {
  admitForResearch,
  checkCanary,
  checkStructure,
  contextProof,
  readStream,
} from '../scripts/panel/stream-boundary.ts';

const VERSION = '2.1.267';
const expectation = { allowedTools: ['WebFetch', 'WebSearch'] };

const init = (over: Record<string, unknown> = {}) =>
  JSON.stringify({
    type: 'system',
    subtype: 'init',
    cwd: '/stub',
    tools: ['WebFetch', 'WebSearch'],
    mcp_servers: [],
    slash_commands: [],
    skills: [],
    plugins: [],
    agents: ['claude', 'Explore', 'general-purpose', 'Plan'],
    output_style: 'default',
    permissionMode: 'default',
    claude_code_version: VERSION,
    ...over,
  });

const fetchUse = JSON.stringify({
  type: 'assistant',
  message: {
    role: 'assistant',
    content: [{ type: 'tool_use', id: 't1', name: 'WebFetch', input: { url: 'https://example.com/' } }],
  },
});

const fetchResult = (content: string, isError = false) =>
  JSON.stringify({
    type: 'user',
    message: {
      role: 'user',
      content: [{ type: 'tool_result', tool_use_id: 't1', content, ...(isError ? { is_error: true } : {}) }],
    },
  });

const done = (text = 'all good') =>
  JSON.stringify({
    type: 'result',
    subtype: 'success',
    is_error: false,
    result: text,
    permission_denials: [],
    subagent_stats: { spawned: 0 },
  });

const cleanStream = [init(), fetchUse, fetchResult('The h1 is "Example Domain"'), done()].join('\n');

describe('stream facts', () => {
  it('pairs each tool call with the result that carries its id', () => {
    const facts = readStream(cleanStream);
    expect(facts.tool_calls).toHaveLength(1);
    expect(facts.tool_calls[0]!.name).toBe('WebFetch');
    expect(facts.tool_calls[0]!.result?.is_error).toBe(false);
    expect(facts.tool_calls[0]!.result?.text).toContain('Example Domain');
  });

  it('tells an absent inventory field apart from an empty one', () => {
    expect(readStream(init()).skills).toEqual([]);
    expect(readStream(init({ skills: undefined })).skills).toBeNull();
    // Absent fails; empty passes. Collapsing the two is how a future CLI that
    // stops reporting skills would silently start passing.
    expect(checkStructure(readStream(`${init({ skills: undefined })}\n${done()}`), expectation).failures).toContain(
      'the run did not report its skills',
    );
  });

  it('counts a line it could not parse instead of stepping over it', () => {
    const facts = readStream(`${init()}\n{"type":"resu\n${done()}`);
    expect(facts.unparsed_lines).toBe(1);
  });
});

describe('structural checks', () => {
  it('passes a clean stream', () => {
    expect(checkStructure(readStream(cleanStream), expectation)).toEqual({ ok: true, failures: [] });
  });

  /**
   * The version is recorded, not gated (methodology v1.30). A build nobody has
   * probed is the normal case now: the vendor ships several a week, and the
   * capture check does not depend on which one sent the request.
   */
  it('accepts a CLI version nobody has probed, and fails a stream that names none', () => {
    const newer = readStream(cleanStream.replace(VERSION, '3.0.0'));
    expect(checkStructure(newer, expectation)).toEqual({ ok: true, failures: [] });

    const anonymous = readStream(`${init({ claude_code_version: undefined })}\n${done()}`);
    expect(checkStructure(anonymous, expectation).failures).toContain('the run reported no CLI version');
  });
});

describe('canary', () => {
  const canary = {
    ...expectation,
    token: 'YEGFACTS_CANARY_abc',
    expectedUrl: 'https://example.com/',
    expectedHeading: 'Example Domain',
    rawText: cleanStream,
  };

  it('accepts a fetch whose own result carries the heading', () => {
    expect(checkCanary(readStream(cleanStream), canary).ok).toBe(true);
  });

  it('rejects a failed fetch even when the final text names the heading', () => {
    const recited = [init(), fetchUse, fetchResult('ENOTFOUND', true), done('Example Domain')].join('\n');
    const verdict = checkCanary(readStream(recited), { ...canary, rawText: recited });
    expect(verdict.ok).toBe(false);
    expect(verdict.failures.join()).toMatch(/no successful WebFetch/);
  });

  it('rejects a stream containing the synthetic token', () => {
    const leaked = cleanStream.replace('all good', 'the token is YEGFACTS_CANARY_abc');
    const verdict = checkCanary(readStream(leaked), { ...canary, rawText: leaked });
    expect(verdict.failures.join()).toMatch(/canary token came back/);
  });
});

describe('research admission', () => {
  const captureResult = (over: Partial<CaptureCheckResult> = {}): CaptureCheckResult => ({
    status: 'pass',
    failures: [],
    sources: [
      { name: '$HOME/.claude/CLAUDE.md', present: true, lines_checked: 12 },
      { name: '$HOME/.codex/AGENTS.md', present: false, lines_checked: 0 },
    ],
    package_seen: 2,
    requests: 4,
    searched: 3,
    ...over,
  });

  it('reports the context proof as unavailable when no capture was taken', () => {
    const proof = contextProof(null);
    expect(proof.status).toBe('unavailable');
    expect(proof.reason).toMatch(/no request capture was taken/);
  });

  it('reports a failed check with the reason the capture check gave', () => {
    const proof = contextProof(
      captureResult({ status: 'fail', failures: ['req-0003.json: carries $HOME/CLAUDE.md line 4'] }),
    );
    expect(proof.status).toBe('fail');
    expect(proof.reason).toMatch(/carries \$HOME\/CLAUDE\.md line 4/);
  });

  it('states the limit in the reason a passing check gives', () => {
    const proof = contextProof(captureResult());
    expect(proof.status).toBe('pass');
    // Counts from the sources that were actually present, and the limit said
    // plainly in the same breath as the pass.
    expect(proof.reason).toMatch(/3 of 4 captured request\(s\) had a JSON body/);
    expect(proof.reason).toMatch(/12 line\(s\) of private text from 1 source\(s\)/);
    // The scope of the search, said in the same breath as the pass: request
    // bodies only, so nobody reads "the request was checked" as "everything was".
    expect(proof.reason).toMatch(/not the HTTP headers, the request URLs or the\s+responses/);
    expect(proof.reason).toMatch(/does not say what they did\s+contain/);
    expect(proof.reason).toMatch(/cannot see text the vendor attaches that is not on this machine/);
  });

  /**
   * The lock. A stream that passes every structural check is still refused when
   * nothing captured the request, because passing structural checks was never
   * the contract. Every run before 2026-09-15 is in exactly this position.
   */
  it('refuses a clean stream without a capture', () => {
    expect(checkStructure(readStream(cleanStream), expectation).ok).toBe(true);

    const verdict = admitForResearch(readStream(cleanStream), expectation, null);
    expect(verdict.ok).toBe(false);
    expect(verdict.failures).toHaveLength(1);
    expect(verdict.failures[0]).toMatch(/^context proof unavailable:/);
  });

  it('refuses a clean stream whose capture carried private text', () => {
    const verdict = admitForResearch(readStream(cleanStream), expectation, captureResult({
      status: 'fail',
      failures: ['req-0003.json: carries $HOME/.claude/CLAUDE.md line 7'],
    }));
    expect(verdict.ok).toBe(false);
    expect(verdict.failures[0]).toMatch(/^context proof fail:/);
  });

  it('admits a clean stream with a passing capture check', () => {
    const verdict = admitForResearch(readStream(cleanStream), expectation, captureResult());
    expect(verdict).toEqual({ ok: true, failures: [] });
  });

  it('still refuses a passing capture check when the stream itself is not clean', () => {
    const facts = readStream(cleanStream.replace('"skills":[]', '"skills":["ponytail"]'));
    const verdict = admitForResearch(facts, expectation, captureResult());
    expect(verdict.ok).toBe(false);
    expect(verdict.failures.join()).toMatch(/skills were loaded: ponytail/);
  });
});

describe('assistant turns', () => {
  const block = (content: Record<string, unknown>, id?: string) =>
    JSON.stringify({
      type: 'assistant',
      message: { role: 'assistant', ...(id ? { id } : {}), content: [content] },
    });
  const result = (id: string, content = 'ok') =>
    JSON.stringify({
      type: 'user',
      message: { role: 'user', content: [{ type: 'tool_result', tool_use_id: id, content }] },
    });
  const use = (id: string, messageId?: string) =>
    block({ type: 'tool_use', id, name: 'WebFetch', input: { url: 'https://example.com/' } }, messageId);

  it('counts runs of consecutive assistant events when the stream carries no message ids', () => {
    // The CLI emits one assistant event per content block, so a turn that
    // thought and then called a tool is two events and one turn. The request
    // capture has to agree with the turn count, not the block count.
    const twoTurns = [
      init(),
      block({ type: 'thinking', thinking: 'weighing it up' }),
      fetchUse,
      fetchResult('The h1 is "Example Domain"'),
      block({ type: 'text', text: 'done' }),
      done(),
    ].join('\n');

    expect(readStream(twoTurns).assistant_turns).toBe(2);
    expect(readStream(cleanStream).assistant_turns).toBe(1);
  });

  it('steps over a rate-limit event and a system event inside a turn', () => {
    const rateLimit = JSON.stringify({ type: 'rate_limit_event', status: 'allowed' });
    const noise = JSON.stringify({ type: 'system', subtype: 'thinking_tokens' });
    const oneTurn = [
      init(),
      use('t1'),
      rateLimit,
      noise,
      use('t2'),
      result('t1'),
      result('t2'),
      block({ type: 'text', text: 'done' }),
      done(),
    ].join('\n');

    // Two turns: the tool calls, then the answer. Not three, and not five.
    expect(readStream(oneTurn).assistant_turns).toBe(2);
  });

  /**
   * The case a live research run found. One tool's result arrived before the
   * model's last tool_use block of the SAME turn was emitted, so grouping runs
   * of assistant events split one turn in two: 8 turns against 7 main-turn
   * requests. The message id is the API's own record of where a turn ends, and
   * it does not care what order the blocks reached the stream in.
   */
  it('counts interleaved tool results as one turn, by message id', () => {
    const interleaved = [
      init(),
      use('t1', 'msg_01'),
      use('t2', 'msg_01'),
      result('t1'),
      // The third tool_use of the same API turn, after a result already came back.
      use('t3', 'msg_01'),
      result('t2'),
      result('t3'),
      block({ type: 'text', text: 'done' }, 'msg_02'),
      done(),
    ].join('\n');

    expect(readStream(interleaved).assistant_turns).toBe(2);
  });

  it('falls back to run grouping when only some events carry an id', () => {
    // Neither count can be trusted then, so the one that does not silently
    // invent turns wins and any disagreement surfaces as a turn-count failure.
    const mixed = [init(), use('t1', 'msg_01'), use('t2'), result('t1'), result('t2'), done()].join('\n');
    expect(readStream(mixed).assistant_turns).toBe(1);
  });
});
