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
  admitProof,
  checkCanary,
  checkCodexCanary,
  checkCodexEffort,
  checkCodexStructure,
  checkGeminiCanary,
  checkGeminiStructure,
  checkStructure,
  codexSearchRequests,
  contextProof,
  fileReadOutcome,
  readCodexStream,
  readGeminiStream,
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

/**
 * The fourth proof word, and the rule that keeps it from spreading.
 *
 * `record-only` says the same search ran over the CLI's own local record rather
 * than over a request. The Gemini seat is admitted on it because its CLI has no
 * capture route at all; every other seat has a proxy in front of it, so a
 * `record-only` result there would mean the proxy was bypassed, and the
 * accepted set is passed in rather than assumed so that stays true.
 */
describe('record-only proof', () => {
  const passing = (): CaptureCheckResult => ({
    status: 'pass',
    failures: [],
    sources: [{ name: '$HOME/.claude/CLAUDE.md', present: true, lines_checked: 12 }],
    package_seen: 1,
    requests: 9,
    searched: 9,
  });

  it('says what it ran over and what that record cannot hold', () => {
    const proof = contextProof(passing(), 'local-record');
    expect(proof.status).toBe('record-only');
    expect(proof.reason).toMatch(/9 of 9 record entr\(ies\) were searched/);
    expect(proof.reason).toMatch(/exposes no way to record its outgoing request/);
    expect(proof.reason).toMatch(/does not hold the system prompt/);
    expect(proof.reason).toMatch(/weaker than a check over a request/);
  });

  it('names the record rather than a request when it fails', () => {
    const proof = contextProof(
      { ...passing(), status: 'fail', failures: ['transcript-1.jsonl line 3: carries $HOME/CLAUDE.md line 4'] },
      'local-record',
    );
    expect(proof.status).toBe('fail');
    expect(proof.reason).toMatch(/the CLI's own record did not pass/);
  });

  it('admits record-only only where the seat accepts it', () => {
    const proof = contextProof(passing(), 'local-record');
    expect(admitProof(proof, ['pass', 'record-only']).ok).toBe(true);
    const refused = admitProof(proof, ['pass']);
    expect(refused.ok).toBe(false);
    expect(refused.failures[0]).toMatch(/^context proof record-only:/);
  });

  it('never accepts unavailable or fail, whatever the seat asks for', () => {
    for (const status of ['unavailable', 'fail'] as const) {
      const proof = status === 'unavailable' ? contextProof(null) : contextProof({ ...passing(), status: 'fail' });
      expect(admitProof(proof, ['pass', 'record-only']).ok).toBe(false);
    }
  });
});

/**
 * The Codex stream, which settles less than the Claude one and says so. There is
 * no tool inventory in it, so the checks here are that the run started once,
 * finished once and answered, plus the two things the CAPTURE settles: the
 * pinned reasoning effort, and a search that actually reached the endpoint.
 */
describe('the codex stream', () => {
  const codexStream = (over: string[] = []) =>
    [
      JSON.stringify({ type: 'thread.started', thread_id: 't' }),
      JSON.stringify({ type: 'turn.started' }),
      // The normal path on this machine: a WebSocket attempt that times out and
      // falls back to HTTPS about a minute later. Recorded, never gated.
      JSON.stringify({ type: 'error', message: 'Reconnecting... 2/5 (request timed out)' }),
      JSON.stringify({ type: 'item.completed', item: { id: 'i1', type: 'web_search', query: 'open data' } }),
      ...over,
      JSON.stringify({ type: 'item.completed', item: { id: 'i2', type: 'agent_message', text: 'the answer' } }),
      JSON.stringify({ type: 'turn.completed', usage: { input_tokens: 10 } }),
    ].join('\n');

  const request = (over: Record<string, unknown> = {}) => ({
    file: 'req-0011.json',
    method: 'POST',
    url: '/backend-api/codex/responses',
    headers: {},
    body: { reasoning: { effort: 'high' } },
    ...over,
  });

  it('reads the items, the final message and the transport errors', () => {
    const facts = readCodexStream(codexStream());
    expect(facts.thread_started).toBe(1);
    expect(facts.turn_completed).toBe(1);
    expect(facts.final_text).toBe('the answer');
    expect(facts.transport_errors).toEqual(['Reconnecting... 2/5 (request timed out)']);
    expect(checkCodexStructure(facts).ok).toBe(true);
  });

  it('fails a turn that never completed or never answered', () => {
    const noAnswer = readCodexStream(
      [JSON.stringify({ type: 'thread.started', thread_id: 't' }), JSON.stringify({ type: 'turn.completed' })].join('\n'),
    );
    expect(checkCodexStructure(noAnswer).failures.join()).toMatch(/returned no final message/);
  });

  it('reads the reasoning effort out of the request rather than trusting the flag', () => {
    expect(checkCodexEffort([request()], 'high').ok).toBe(true);
    expect(checkCodexEffort([request({ body: { reasoning: { effort: 'low' } } })], 'high').failures.join()).toMatch(
      /reasoning effort in the request was low/,
    );
    expect(checkCodexEffort([], 'high').failures.join()).toMatch(/no captured request reached the model endpoint/);
  });

  it('counts only a search request the endpoint actually answered', () => {
    const search = { file: 'req-0012.json', method: 'POST', url: '/backend-api/codex/alpha/search', headers: {}, body: {} };
    expect(codexSearchRequests([{ ...search, status: 200 }])).toHaveLength(1);
    expect(codexSearchRequests([{ ...search, status: 500 }])).toHaveLength(0);
    expect(codexSearchRequests([search])).toHaveLength(0);
  });

  it('refuses a canary whose search is only a claim in the answer', () => {
    const verdict = checkCodexCanary(readCodexStream(codexStream()), {
      token: 'YEGFACTS_CANARY_x',
      rawText: codexStream(),
      requests: [request()],
      effort: 'high',
    });
    expect(verdict.ok).toBe(false);
    expect(verdict.failures.join()).toMatch(/no successful web-search request in the capture/);
  });

  it('records a file read this profile cannot stop rather than failing it', () => {
    expect(fileReadOutcome('the token: YEGFACTS_CANARY_x came back', 'YEGFACTS_CANARY_x')).toBe('allowed');
    expect(fileReadOutcome('nothing came back', 'YEGFACTS_CANARY_x')).toBe('refused');
  });
});

/**
 * The Gemini stream. The tools stay in the model's inventory under this profile
 * and are refused at the permission check, so the rule is about which tools
 * reached DONE: a refused file tool is the profile working, and a file tool that
 * completed is a file that was read.
 */
describe('the gemini stream', () => {
  const step = (over: Record<string, unknown>) =>
    JSON.stringify({ event: 'step_update', step_update: { conversation_id: 'c', ...over } });

  const geminiStream = (over: { fileState?: string; status?: string } = {}) =>
    [
      JSON.stringify({
        event: 'init',
        conversation_id: 'c',
        init: { model: 'gemini-3.8-flash-high', cwd: '/stub', tools: ['read_url_content', 'view_file'] },
      }),
      step({ step_index: 1, state: 'ACTIVE', step_type: 'tool', tool_name: 'read_url_content', tool_info: { parameters: { Url: 'https://example.com/' } } }),
      step({ step_index: 1, state: 'DONE', step_type: 'tool', tool_name: 'read_url_content', tool_info: { parameters: { Url: 'https://example.com/' } } }),
      step({
        step_index: 2,
        state: over.fileState ?? 'ERROR',
        step_type: 'tool',
        tool_name: 'view_file',
        tool_info: {
          parameters: { AbsolutePath: '/tmp/CANARY.md' },
          ...(over.fileState === 'DONE'
            ? {}
            : { error: { message: 'permission check failed for read_file "/tmp/CANARY.md": Matches user-configured deny rule.' } }),
        },
      }),
      JSON.stringify({
        event: 'result',
        result: { conversation_id: 'c', status: over.status ?? 'SUCCESS', response: '{"web_h1": "Example Domain"}' },
      }),
    ].join('\n');

  const canary = (stream: string, over: Record<string, unknown> = {}) =>
    checkGeminiCanary(readGeminiStream(stream), {
      token: 'YEGFACTS_CANARY_x',
      rawText: stream,
      expectedUrl: 'https://example.com/',
      expectedHeading: 'Example Domain',
      fetchedText: '<h1>Example Domain</h1>',
      ...over,
    });

  it('keeps only the last state of each step', () => {
    const facts = readGeminiStream(geminiStream());
    expect(facts.steps.map((one) => one.state)).toEqual(['DONE', 'ERROR']);
    expect(facts.tools_completed).toEqual(['read_url_content']);
    expect(facts.tools_refused.map((one) => one.tool)).toEqual(['view_file']);
    expect(checkGeminiStructure(facts).ok).toBe(true);
  });

  it('fails a file tool that reached DONE instead of being refused', () => {
    const facts = readGeminiStream(geminiStream({ fileState: 'DONE' }));
    expect(checkGeminiStructure(facts).failures.join()).toMatch(/ran tools outside the profile: view_file/);
  });

  /**
   * `status` reports whether any step failed, not whether the turn answered.
   * Under this profile steps fail on purpose: the deny rules refuse every file,
   * write and command tool at the permission check, and the first live canary
   * answered correctly, refused three tools and came back ERROR. So ERROR is
   * read against the steps rather than taken at face value.
   */
  it('accepts an ERROR whose only failed steps were refused at the permission check', () => {
    expect(checkGeminiStructure(readGeminiStream(geminiStream({ status: 'ERROR' }))).ok).toBe(true);
  });

  it('fails a status it has no reading for', () => {
    expect(checkGeminiStructure(readGeminiStream(geminiStream({ status: 'CANCELLED' }))).failures.join()).toMatch(
      /result status was "CANCELLED"/,
    );
  });

  it('fails a step that failed for any other reason', () => {
    // The message must not mention a permission check, because that is the one
    // failure this profile is supposed to produce.
    const broken = geminiStream({ status: 'ERROR' }).replace(
      'permission check failed for read_file',
      'the tool crashed while reading',
    );
    expect(checkGeminiStructure(readGeminiStream(broken)).failures.join()).toMatch(
      /step 2 \(view_file\) failed for a reason other than the permission check: the tool crashed/,
    );
  });

  it('fails an ERROR that no step accounts for', () => {
    const clean = [
      JSON.stringify({ event: 'init', conversation_id: 'c', init: { model: 'm', cwd: '/stub', tools: [] } }),
      JSON.stringify({ event: 'result', result: { conversation_id: 'c', status: 'ERROR', response: 'an answer' } }),
    ].join('\n');
    expect(checkGeminiStructure(readGeminiStream(clean)).failures.join()).toMatch(/no step says why/);
  });

  it('passes a canary whose fetch tool saved the real page', () => {
    expect(canary(geminiStream())).toEqual({ ok: true, failures: [] });
  });

  it('rejects a canary whose saved page does not carry the heading', () => {
    // The answer says "Example Domain" in both runs. Only one of them fetched it.
    expect(canary(geminiStream(), { fetchedText: '<html></html>' }).failures.join()).toMatch(
      /does not contain "Example Domain"/,
    );
  });

  it('rejects a canary in which nothing was refused', () => {
    const stream = geminiStream({ fileState: 'DONE' });
    expect(canary(stream).failures.join()).toMatch(/no tool was refused by the permission check/);
  });

  it('rejects a canary whose record carries the synthetic token', () => {
    const stream = geminiStream();
    expect(canary(stream, { rawText: `${stream}\ntoken YEGFACTS_CANARY_x` }).failures.join()).toMatch(
      /the file boundary leaked/,
    );
  });
});
