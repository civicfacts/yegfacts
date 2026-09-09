/**
 * The line between "we checked the configuration" and "we proved the context".
 *
 * The structural checks are worth having and they can pass. The context proof
 * cannot, because nothing in the installed CLIs emits the outgoing request. The
 * test that matters most here is the one asserting that a completely clean
 * stream is STILL refused for research: if someone later makes
 * `admitForResearch` pass by tightening the structural checks, that test fails,
 * which is the point of writing it down.
 */
import { describe, expect, it } from 'vitest';
import {
  admitForResearch,
  checkCanary,
  checkStructure,
  contextProof,
  readStream,
} from '../scripts/panel/stream-boundary.ts';

const PROBED = '2.1.267';
const expectation = { allowedTools: ['WebFetch', 'WebSearch'], supportedVersions: [PROBED] };

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
    claude_code_version: PROBED,
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

  it('fails an unprobed CLI version', () => {
    const facts = readStream(cleanStream.replace(PROBED, '3.0.0'));
    expect(checkStructure(facts, expectation).failures.join()).toMatch(/has no probed profile/);
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
  it('reports the context proof as unavailable, with a reason', () => {
    const proof = contextProof();
    expect(proof.status).toBe('unavailable');
    expect(proof.reason).toMatch(/never a request body/);
  });

  /**
   * The lock. A stream that passes every structural check is still refused,
   * because passing structural checks was never the contract. If this test ever
   * needs changing, something actually emits the request and the change should
   * come with that evidence attached.
   */
  it('refuses a perfectly clean stream anyway', () => {
    expect(checkStructure(readStream(cleanStream), expectation).ok).toBe(true);

    const verdict = admitForResearch(readStream(cleanStream), expectation);
    expect(verdict.ok).toBe(false);
    expect(verdict.failures).toHaveLength(1);
    expect(verdict.failures[0]).toMatch(/^context proof unavailable:/);
  });
});
