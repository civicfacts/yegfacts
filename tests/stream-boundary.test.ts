/**
 * The line between "we checked the configuration" and "we proved the context".
 *
 * The structural checks read the stream, which is the host reporting on itself.
 * The context proof reads the captured request, which is what the host actually
 * sent. They are different evidence and the lock here is that structural
 * cleanliness alone never admits a run: a stream that passes every check with
 * no capture behind it is still refused, and if someone later makes
 * `admitForResearch` pass by tightening the structural checks, that test fails.
 */
import { describe, expect, it } from 'vitest';
import type { ProofResult } from '../scripts/panel/request-proof.ts';
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
  const proofResult = (over: Partial<ProofResult> = {}): ProofResult => ({
    status: 'pass',
    requests: [],
    failures: [],
    disclosed: [],
    summary: {
      upstream: 'https://api.anthropic.com',
      production_upstream: true,
      cli_version: PROBED,
      vendor_prompt_sha256: 'a'.repeat(64),
      tool_definitions_sha256: { WebFetch: 'b'.repeat(64), WebSearch: 'c'.repeat(64) },
      request_count: 3,
      main_turn_count: 1,
      side_request_counts: {},
    },
    ...over,
  });

  it('reports the context proof as unavailable when no capture was taken', () => {
    const proof = contextProof(null);
    expect(proof.status).toBe('unavailable');
    expect(proof.reason).toMatch(/no request capture was taken/);
  });

  it('reports a failed proof with the reason the request check gave', () => {
    const proof = contextProof(proofResult({ status: 'fail', failures: ['req-0003.json: a third tool'] }));
    expect(proof.status).toBe('fail');
    expect(proof.reason).toMatch(/a third tool/);
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

  it('refuses a clean stream whose capture did not match the pins', () => {
    const verdict = admitForResearch(readStream(cleanStream), expectation, proofResult({
      status: 'fail',
      failures: ['req-0003.json: messages[0][4] is not the declared package byte for byte'],
    }));
    expect(verdict.ok).toBe(false);
    expect(verdict.failures[0]).toMatch(/^context proof fail:/);
  });

  it('admits a clean stream with a passing proof', () => {
    const verdict = admitForResearch(readStream(cleanStream), expectation, proofResult());
    expect(verdict).toEqual({ ok: true, failures: [] });
  });

  it('still refuses a passing proof when the stream itself is not clean', () => {
    const facts = readStream(cleanStream.replace(PROBED, '3.0.0'));
    const verdict = admitForResearch(facts, expectation, proofResult());
    expect(verdict.ok).toBe(false);
    expect(verdict.failures.join()).toMatch(/has no probed profile/);
  });
});

describe('assistant turns', () => {
  it('counts runs of consecutive assistant events, not the events', () => {
    // The CLI emits one assistant event per content block, so a turn that
    // thought and then called two tools is three events and one turn. The
    // request capture has to agree with the turn count, not the block count.
    const thinking = JSON.stringify({
      type: 'assistant',
      message: { role: 'assistant', content: [{ type: 'thinking', thinking: 'weighing it up' }] },
    });
    const answer = JSON.stringify({
      type: 'assistant',
      message: { role: 'assistant', content: [{ type: 'text', text: 'done' }] },
    });
    const twoTurns = [init(), thinking, fetchUse, fetchResult('The h1 is "Example Domain"'), answer, done()].join('\n');

    expect(readStream(twoTurns).assistant_turns).toBe(2);
    expect(readStream(cleanStream).assistant_turns).toBe(1);
  });
});
