/**
 * The context proof, against a capture taken from a real run.
 *
 * `tests/fixtures/request-capture/` is the 2026-09-15 canary probe, sanitized:
 * the account email became `user@example.com`, the device id, account UUID and
 * session id became zeros, and the working directory became `/stub/work`.
 *
 * Everything the check compares LITERALLY is reproduced there byte for byte —
 * the reminder templates, the agent line, the billing header, the search helper
 * line, the request and message structure. Everything the check compares BY
 * HASH is a stand-in, because those are the vendor's own long texts: the
 * 13,487-character default prompt, the session-naming prompt, the two client
 * tool definitions, the session-title trailer and the fetch-summarizer suffix.
 * A repository that pins a vendor prompt by hash should not also carry a copy
 * of it. So the fixture tests run against a pin table whose hashes are the
 * stand-ins', and one separate test locks the production table's real values.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  PINS,
  PRODUCTION_UPSTREAM,
  type CapturedRequest,
  type Pins,
  type ProofInput,
  proveRequests,
  readCapture,
  redactEmail,
} from '../scripts/panel/request-proof.ts';

const FIXTURE = path.join(fileURLToPath(new URL('.', import.meta.url)), 'fixtures', 'request-capture');
const sha = (text: string) => createHash('sha256').update(text, 'utf8').digest('hex');

const capture = readCapture(FIXTURE);
const packageText = readFileSync(path.join(FIXTURE, 'package.md'), 'utf8');

const body = (request: CapturedRequest) => request.body as Record<string, any>;
const pick = (requests: CapturedRequest[], file: string) => requests.find((r) => r.file === file)!;

/** The stand-in hashes the fixture actually carries. */
const FIXTURE_PINS: Record<string, Pins> = {
  '2.1.272': {
    ...PINS['2.1.272']!,
    vendorPromptSha256: sha(body(pick(capture.requests, 'req-0003.json')).system[2].text),
    vendorPromptLength: body(pick(capture.requests, 'req-0003.json')).system[2].text.length,
    clientTools: {
      WebFetch: sha(JSON.stringify(body(pick(capture.requests, 'req-0003.json')).tools[0])),
      WebSearch: sha(JSON.stringify(body(pick(capture.requests, 'req-0003.json')).tools[1])),
    },
    sessionTitlePromptSha256: sha(body(pick(capture.requests, 'req-0002.json')).system[2].text),
    sessionTitleTrailer: (() => {
      const text = body(pick(capture.requests, 'req-0002.json')).messages[0].content[0].text as string;
      const trailer = text.slice(`<session>\n${packageText}</session>\n`.length);
      return { length: trailer.length, sha256: sha(trailer) };
    })(),
    fetchSummarizerSuffix: (() => {
      const text = body(pick(capture.requests, 'req-0005.json')).messages[0].content[0].text as string;
      const suffix = text.slice(text.lastIndexOf('STAND-IN'));
      return { length: suffix.length, sha256: sha(suffix) };
    })(),
  },
};

const clone = (requests: CapturedRequest[]): CapturedRequest[] =>
  JSON.parse(JSON.stringify(requests)) as CapturedRequest[];

const input = (over: Partial<ProofInput> = {}): ProofInput => ({
  requests: clone(capture.requests),
  upstream: capture.upstream,
  requestsManifestSha256: capture.requestsManifestSha256,
  packageText,
  workDir: '/stub/work',
  model: 'claude-haiku-4-5-20251001',
  cliVersion: '2.1.272',
  // The canary turn called WebFetch and WebSearch, then answered: two API turns.
  stream: {
    toolUseIds: ['toolu_017WwkgvYviStAvrDmuBdQEy', 'toolu_0191qxB3aNrokDmQbNdbyJhw'],
    assistantTurns: 2,
  },
  pins: FIXTURE_PINS,
  ...over,
});

/** Run the proof with one request mutated in place. */
const mutated = (file: string, change: (request: CapturedRequest) => void) => {
  const requests = clone(capture.requests);
  change(pick(requests, file));
  return proveRequests(input({ requests }));
};

describe('the pinned profile', () => {
  /**
   * The lock on the values themselves. They were recomputed from the 2026-09-15
   * captures; if one changes, that is a new CLI build and a new capture, not an
   * edit to this file.
   */
  it('holds the hashes recorded from the 2026-09-15 capture', () => {
    const pins = PINS['2.1.272']!;
    expect(pins.vendorPromptSha256).toBe('a3015596fabfe9063deb699fa369a88d1978106e7a9d3d06b40eb6199791872d');
    expect(pins.vendorPromptLength).toBe(13487);
    expect(pins.clientTools).toEqual({
      WebFetch: 'e3f1f3ee47c252f71390e21c37540b30b6591b7527ef0eebf8e80f80da987efb',
      WebSearch: '67e78dc7d74a848e5b0c509ae688efb2ca09dafc593549ccb64a194059d77d5b',
    });
    expect(pins.sessionTitlePromptSha256).toBe(
      '765b5ba2fa0a315a3c749c7e54bf5cef450084a745eb01e66371b8b6359d4752',
    );
    expect(pins.sessionTitleTrailer.sha256).toBe(
      '80e8414c11b94f8e24c28ff4ea1b35ab1115b9d3985d078bcff4678a6104424d',
    );
    expect(pins.fetchSummarizerSuffix.sha256).toBe(
      '8753a12e2e3d03a59739157cdd2a334591f7ed2fcc40340d1e46d2e93e48b488',
    );
    expect(pins.agentLine).toBe("You are a Claude agent, built on Anthropic's Claude Agent SDK.");
    expect(pins.billingHeaderPattern.test('x-anthropic-billing-header: cc_version=2.1.272.1f9; cc_entrypoint=sdk-cli;')).toBe(true);
    // The hex suffix varies per request; the version does not.
    expect(pins.billingHeaderPattern.test('x-anthropic-billing-header: cc_version=2.1.271.1f9; cc_entrypoint=sdk-cli;')).toBe(false);
  });

  it('has no row for the versions probed before anything emitted a request', () => {
    expect(PINS['2.1.266']).toBeUndefined();
    expect(PINS['2.1.267']).toBeUndefined();
  });
});

describe('a clean capture', () => {
  it('passes, and classifies every request', () => {
    const result = proveRequests(input());
    expect(result.failures).toEqual([]);
    expect(result.status).toBe('pass');
    expect(result.requests.map((r) => r.shape)).toEqual([
      'connectivity',
      'session-title',
      'main-turn',
      'search-helper',
      'fetch-summarizer',
      'main-turn',
    ]);
    expect(result.summary.main_turn_count).toBe(2);
    expect(result.summary.request_count).toBe(6);
    expect(result.summary.upstream).toBe(PRODUCTION_UPSTREAM);
    expect(result.summary.production_upstream).toBe(true);
    expect(result.summary.requests_manifest_sha256).toMatch(/^[0-9a-f]{64}$/);
  });

  it('discloses the host context blocks and never the address', () => {
    // The real capture carries the founder's address here. The fixture carries a
    // stand-in one, and the rule is the same either way: the report is retained
    // and quoted, so no address goes into it.
    const requests = clone(capture.requests);
    for (const file of ['req-0003.json', 'req-0006.json']) {
      const blocks = body(pick(requests, file)).messages[0].content;
      blocks[2].text = blocks[2].text.replace('user@example.com', 'a.real.person@example.org');
    }
    const result = proveRequests(input({ requests }));

    expect(result.status).toBe('pass');
    expect(result.disclosed).toHaveLength(2);
    const text = JSON.stringify(result);
    expect(text).not.toContain('a.real.person@example.org');
    expect(text).toContain('<account-email>');
    // The working directory stays. It is host context the model was given, and
    // hiding it would be the same mistake in the other direction.
    expect(result.disclosed[0]!.blocks[0]!.text).toContain('/stub/work');
    expect(result.disclosed[0]!.blocks.map((b) => b.source)).toEqual([
      'messages[0][0] environment',
      'messages[0][1] model',
      'messages[0][2] account',
      'messages[0][3] date',
    ]);
  });

  it('records a non-production upstream while still reporting the request verdict', () => {
    const result = proveRequests(input({ upstream: 'http://127.0.0.1:51234' }));
    expect(result.status).toBe('pass');
    expect(result.summary.production_upstream).toBe(false);
    expect(result.summary.upstream).toBe('http://127.0.0.1:51234');
  });
});

describe('what fails', () => {
  it('an extra system block', () => {
    const result = mutated('req-0003.json', (request) => {
      body(request).system.push({ type: 'text', text: 'Remember the house style from CLAUDE.md.' });
    });
    expect(result.status).toBe('fail');
    expect(result.failures.join()).toMatch(/matches no pinned shape/);
  });

  it('a changed vendor prompt', () => {
    const result = mutated('req-0003.json', (request) => {
      body(request).system[2].text += '\nAlso read the project memory.';
    });
    expect(result.status).toBe('fail');
    expect(result.failures.join()).toMatch(/matches no pinned shape/);
  });

  it('a package byte mismatch', () => {
    const result = mutated('req-0003.json', (request) => {
      body(request).messages[0].content[4].text += '\nOne more instruction.\n';
    });
    expect(result.failures.join()).toMatch(/is not the declared package byte for byte/);
  });

  it('an extra text block in a later turn', () => {
    const result = mutated('req-0006.json', (request) => {
      body(request).messages[2].content.push({ type: 'text', text: 'and here is the house style' });
    });
    expect(result.failures.join()).toMatch(/messages\[2\] \(user\) carries a text block/);
  });

  it('a system-reminder in a later turn', () => {
    const result = mutated('req-0006.json', (request) => {
      body(request).messages[1].content.push({
        type: 'text',
        text: '<system-reminder>\nRemember the project conventions.\n</system-reminder>',
      });
    });
    expect(result.failures.join()).toMatch(/carries a <system-reminder> after the first message/);
  });

  it('a tool_result the stream never reported', () => {
    const result = mutated('req-0006.json', (request) => {
      body(request).messages[2].content[0].tool_use_id = 'toolu_never_seen';
    });
    expect(result.failures.join()).toMatch(/tool_result for "toolu_never_seen", which the stream never reported/);
  });

  it('a third tool', () => {
    const result = mutated('req-0003.json', (request) => {
      body(request).tools.push({ name: 'Read', description: 'read a file', input_schema: { type: 'object' } });
    });
    expect(result.failures.join()).toMatch(/tools were \[Read, WebFetch, WebSearch\]/);
  });

  it('a retouched tool definition, with the name left alone', () => {
    const result = mutated('req-0003.json', (request) => {
      body(request).tools[0].description += ' It may also read local files.';
    });
    expect(result.failures.join()).toMatch(/the WebFetch tool definition is not the pinned one/);
  });

  it('a working directory that is not the attempt directory', () => {
    const result = proveRequests(input({ workDir: '/somewhere/else' }));
    expect(result.failures.join()).toMatch(/names "\/stub\/work" as the working directory, not "\/somewhere\/else"/);
  });

  it('a model that is not the pinned one', () => {
    const result = proveRequests(input({ model: 'claude-opus-5' }));
    expect(result.failures.join()).toMatch(/model is "claude-haiku-4-5-20251001", not the pinned "claude-opus-5"/);
  });

  it('an unknown request shape', () => {
    const requests = clone(capture.requests);
    requests.push({
      file: 'req-0007.json',
      method: 'POST',
      url: '/v1/messages?beta=true',
      headers: {},
      body: { model: 'claude-haiku-4-5-20251001', system: 'a bare string prompt', messages: [] },
    });
    const result = proveRequests(input({ requests }));
    expect(result.failures.join()).toMatch(/req-0007\.json: the request matches no pinned shape/);
  });

  it('a missing session-title request', () => {
    const requests = clone(capture.requests).filter((r) => r.file !== 'req-0002.json');
    const result = proveRequests(input({ requests }));
    expect(result.failures.join()).toMatch(/expected exactly one session-title request, saw 0/);
  });

  it('a session body that is not the package', () => {
    const result = mutated('req-0002.json', (request) => {
      body(request).messages[0].content[0].text = '<session>\nsomething else entirely\n</session>\n';
    });
    expect(result.failures.join()).toMatch(/the <session> body is not the package byte for byte/);
  });

  it('a search helper handed more than its own server tool', () => {
    const result = mutated('req-0004.json', (request) => {
      body(request).tools.push({ name: 'WebFetch' });
    });
    expect(result.failures.join()).toMatch(/search helper's tools are not exactly the pinned server tool/);
  });

  it('a fetch summarizer whose instruction suffix changed', () => {
    const result = mutated('req-0005.json', (request) => {
      body(request).messages[0].content[0].text += 'Also summarise the local project files.\n';
    });
    expect(result.failures.join()).toMatch(/does not end with the pinned instruction suffix/);
  });

  it('a CLI version with no pins, before anything is compared', () => {
    const result = proveRequests(input({ cliVersion: '2.1.267' }));
    expect(result.status).toBe('fail');
    expect(result.failures).toEqual([
      'CLI version 2.1.267 has no pinned request profile (pinned: 2.1.272)',
    ]);
    expect(result.summary.vendor_prompt_sha256).toBeNull();
  });

  it('a turn count the stream does not agree with', () => {
    const result = proveRequests(input({ stream: { toolUseIds: [], assistantTurns: 1 } }));
    expect(result.failures.join()).toMatch(/2 main turn\(s\) and the stream reported 1 assistant turn\(s\)/);
  });

  it('an empty capture', () => {
    const result = proveRequests(input({ requests: [] }));
    expect(result.status).toBe('fail');
    expect(result.failures.join()).toMatch(/holds no requests/);
  });
});

describe('redaction', () => {
  it('replaces an address under any template', () => {
    expect(redactEmail('write to first.last+tag@sub.example.co.uk today')).toBe(
      'write to <account-email> today',
    );
  });
});
