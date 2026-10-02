/**
 * Carried documents (methodology v1.41, D-0046): the carry manifest, the
 * runner's --carried flag and the run-record backstop.
 *
 * Nothing here touches the network or pdftotext. The manifest builder takes a
 * stub fetcher and a stub extractor; the runner tests run in a temporary copy
 * of the tree, mostly under --dry-run, which assembles the package and invokes
 * no CLI. The one test that needs a send replaces the launcher in that copy.
 */
import { spawnSync } from 'node:child_process';
import {
  chmodSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import YAML from 'yaml';
import {
  briefNaming,
  buildCarryManifest,
  challengeSignature,
  titlesForDocument,
  type CarryManifest,
  type Extractor,
  type Fetcher,
} from '../scripts/panel/carry-manifest.ts';
import { sha256 } from '../scripts/lib/repo.ts';

const REAL_REPO = fileURLToPath(new URL('..', import.meta.url));
const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'yegfacts-carry-')));
afterAll(() => rmSync(root, { recursive: true, force: true }));

const STORY = 'stub-story';
const RUN_DATE = '2026-09-09';
const RUN = `reviews/${STORY}/${RUN_DATE}`;
const DOC_URL = 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304024';
const MEETING_URL = 'https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=stub&lang=English';
const PDF = Buffer.from('%PDF-1.7 stub bytes\n');
const TEXT = 'REPORT IS03688\nRecommendation 1\n\f';
const TEXT2 = 'ATTACHMENT 5\nModified approach\n\f';
const CHALLENGE = { 'cf-mitigated': 'challenge', server: 'cloudflare' };

const meetingPage = (title: string | null) =>
  `<html><body>${
    title === null
      ? ''
      : `<a class='Link' href="filestream.ashx?DocumentId=304024" data-original-title='${title}'><span>${title}</span></a>`
  }</body></html>`;

/** A tree with a registry, archived bytes and a brief, as the builder reads them. */
function fixtureRepo(options: { registryHash?: string; meetingHash?: string; brief?: string } = {}): string {
  const repo = mkdtempSync(path.join(root, 'repo-'));
  mkdirSync(path.join(repo, 'evidence', 'registry'), { recursive: true });
  mkdirSync(path.join(repo, 'evidence', 'private'), { recursive: true });
  mkdirSync(path.join(repo, RUN), { recursive: true });
  writeFileSync(path.join(repo, RUN, 'brief.md'), options.brief ?? `# Brief\n\nReport IS03688, ${DOC_URL}.\n`);
  writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0001-filestream.ashx'), PDF);
  const meetingHtml = meetingPage('Report - IS03688.pdf');
  writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0002-Meeting.aspx'), meetingHtml);
  writeFileSync(
    path.join(repo, 'evidence', 'registry', 'YF-EV-0001.yaml'),
    YAML.stringify({
      id: 'YF-EV-0001',
      title: 'Report IS03688',
      url: DOC_URL,
      retrieved_on: '2026-09-02',
      archive: { sha256: options.registryHash ?? sha256(PDF), path: 'evidence/private/YF-EV-0001-filestream.ashx' },
      rights: { note: 'Downloaded in a browser.' },
    }),
  );
  writeFileSync(
    path.join(repo, 'evidence', 'registry', 'YF-EV-0002.yaml'),
    YAML.stringify({
      id: 'YF-EV-0002',
      title: 'Meeting page',
      url: MEETING_URL,
      archive: { sha256: options.meetingHash ?? sha256(meetingHtml), path: 'evidence/private/YF-EV-0002-Meeting.aspx' },
    }),
  );
  return repo;
}

type ProbeAnswer = { status: number; contentType?: string; headers?: Record<string, string>; body?: string };

function stubFetcher(document: ProbeAnswer, meetingHtml: string): Fetcher & { calls: string[] } {
  const calls: string[] = [];
  const fetcher = (async (url: string) => {
    calls.push(url);
    if (url === DOC_URL) {
      return {
        status: document.status,
        contentType: document.contentType ?? 'text/html',
        headers: document.headers ?? {},
        body: document.body ?? '',
      };
    }
    if (url === MEETING_URL) return { status: 200, contentType: 'text/html', headers: {}, body: meetingHtml };
    throw new Error(`unexpected fetch ${url}`);
  }) as Fetcher & { calls: string[] };
  fetcher.calls = calls;
  return fetcher;
}

const stubExtractor: Extractor = () => ({ version: 'pdftotext version 0.0.0-stub', text: TEXT });
const NOW = new Date('2026-09-28T12:00:00Z');
const challenged: ProbeAnswer = { status: 403, headers: CHALLENGE };

async function build(repo: string, fetcher: Fetcher): Promise<CarryManifest> {
  return buildCarryManifest({
    repoRoot: repo,
    runDir: RUN,
    docs: [{ id: 'YF-EV-0001', meetingPage: 'YF-EV-0002' }],
    exclusions: [{ label: 'Attachment 3', reason: 'no archive held' }],
    fetcher,
    extractor: stubExtractor,
    now: () => NOW,
  });
}

const privateTexts = (repo: string) => {
  try {
    return readdirSync(path.join(repo, 'evidence', 'private', 'carried', STORY, RUN_DATE));
  } catch {
    return [];
  }
};

describe('carry-manifest build', () => {
  it('carries a challenge-signed 403, writes its text privately and the manifest publicly', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo, stubFetcher(challenged, meetingPage('Report - IS03688.pdf')));
    const doc = manifest.documents[0]!;
    expect(doc.status).toBe('carried');
    expect(doc.probe).toMatchObject({
      http_status: 403,
      checked_at: '2026-09-28T12:00:00Z',
      fetcher_refused: true,
      signature: 'cf-mitigated: challenge header',
    });
    expect(doc.meeting_page?.result).toBe('pass');
    expect(doc.extraction).toMatchObject({ pages: 1, text_sha256: sha256(TEXT), version: 'pdftotext version 0.0.0-stub' });
    expect(doc.download_provenance).toEqual({ downloaded_by: null, downloaded_on: null, via: null });
    expect(doc.public_open_check).toEqual({ result: 'pending', checker: null, role: null, checked_on: null, reason: null });
    expect(doc.extraction_check).toEqual({ result: 'pending', checker: null, role: null });
    expect(doc.second_download?.result).toBe('pending');
    expect(manifest.exclusions).toEqual([{ label: 'Attachment 3', status: 'excluded', reason: 'no archive held' }]);
    expect(privateTexts(repo)).toEqual(['YF-EV-0001.txt']);
    const written = readFileSync(path.join(repo, RUN, 'carried', 'manifest.yaml'), 'utf8');
    expect(written).not.toContain('Recommendation 1');
  });

  it('refuses archived bytes whose hash does not match the registry, and extracts nothing', async () => {
    const repo = fixtureRepo({ registryHash: 'f'.repeat(64) });
    const fetcher = stubFetcher(challenged, meetingPage('Report - IS03688.pdf'));
    const doc = (await build(repo, fetcher)).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/the registry records f{64}; refusing/);
    expect(doc.extraction).toBeUndefined();
    expect(fetcher.calls).toEqual([]);
    expect(privateTexts(repo)).toEqual([]);
  });

  it('refuses to carry a document the fetcher can now retrieve', async () => {
    const repo = fixtureRepo();
    const doc = (await build(repo, stubFetcher({ status: 200, contentType: 'application/pdf' }, meetingPage('Report - IS03688.pdf'))))
      .documents[0]!;
    expect(doc.status).toBe('excluded');
    expect(doc.reason).toMatch(/seats can retrieve it themselves/);
    expect(doc.probe?.fetcher_refused).toBe(false);
    expect(privateTexts(repo)).toEqual([]);
  });

  it('still carries a pdf the fetcher opened on one request when the Claude seat\'s own tool was refused (v1.42)', async () => {
    const repo = fixtureRepo();
    const manifest = await buildCarryManifest({
      repoRoot: repo,
      runDir: RUN,
      docs: [{ id: 'YF-EV-0001', meetingPage: 'YF-EV-0002' }],
      fetcher: stubFetcher({ status: 200, contentType: 'application/pdf' }, meetingPage('Report - IS03688.pdf')),
      extractor: stubExtractor,
      seatProbes: [
        {
          url: DOC_URL,
          seat: 'claude',
          model: 'claude-opus-5-5',
          tool: 'WebFetch',
          cli_version: 'stub',
          probed_at: '2026-09-28T11:00:00Z',
          outcome: 'refused',
          http_status: 403,
          tool_url: DOC_URL,
          raw_error: 'The server returned HTTP 403 Forbidden.',
        },
      ],
      now: () => NOW,
    });
    const doc = manifest.documents[0]!;
    expect(doc.status, doc.reason).toBe('carried');
    expect(doc.probe).toMatchObject({ http_status: 200, fetcher_refused: false });
    expect(doc.eligibility).toMatchObject({ ground: 'seat refusal', seat: 'claude', http_status: 403 });
    expect(doc.reason).toMatch(/refused the claude seat's WebFetch/);
  });

  it.each([
    ['a bare 403', { status: 403 }],
    ['a 401', { status: 401, headers: CHALLENGE }],
    ['a 429', { status: 429, headers: CHALLENGE }],
    ['a 503', { status: 503, headers: CHALLENGE }],
    ['an HTML 200', { status: 200, contentType: 'text/html' }],
  ])('does not treat %s as a browser check', async (_label, answer) => {
    const repo = fixtureRepo();
    const doc = (await build(repo, stubFetcher(answer, meetingPage('Report - IS03688.pdf')))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/only a challenge-signed 403 qualifies/);
    expect(doc.probe?.fetcher_refused).toBe(false);
    expect(privateTexts(repo)).toEqual([]);
  });

  it('records which challenge signature a 403 carried', () => {
    expect(challengeSignature({ status: 403, headers: {}, body: '<script src="/cdn-cgi/challenge-platform/h/b"></script>' })).toBe(
      'Cloudflare challenge page body',
    );
    // A plain Cloudflare-served 403 names the server too; that alone is not a browser check.
    expect(challengeSignature({ status: 403, headers: { server: 'cloudflare' }, body: 'Forbidden' })).toBeUndefined();
    expect(challengeSignature({ status: 403, headers: { server: 'nginx' }, body: 'Forbidden' })).toBeUndefined();
  });

  it('fails a document the frozen brief names only by DocumentId, not by its URL', async () => {
    const repo = fixtureRepo({ brief: '# Brief\n\nAttachment 5 at DocumentId 304024.\n' });
    const doc = (await build(repo, stubFetcher(challenged, meetingPage('Report - IS03688.pdf')))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/does not name the URL/);
  });

  // The council-pause-vote brief's own wording (lines 165 and 402-403), with
  // this fixture's DocumentId in the list's continuation.
  const TEMPLATE_LINE =
    'served from `https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=<id>`,\nwhich answers scripts and AI tools with a browser check.\n';
  const NAMING =
    '**The instrument.** Report IS03688, Recommendation 1 and the "Next Step"\nparagraph, and Attachment 5 in its three versions, on the committee\'s\nagenda as DocumentId 304032 (original), 304024 (REPLACEMENT, Version 1)\nand 304030 (REPLACEMENT, Version 2); Attachment 3 at 304029.\n';

  it('accepts the URL template with the id in a DocumentId list, and records where', async () => {
    const repo = fixtureRepo({ brief: `# Brief\n\n${TEMPLATE_LINE}\n${NAMING}` });
    const doc = (await build(repo, stubFetcher(challenged, meetingPage('Report - IS03688.pdf')))).documents[0]!;
    expect(doc.status, doc.reason).toBe('carried');
    // The list continues onto line 8 of this brief, where 304024 sits.
    expect(doc.named_in_brief).toBe('template + DocumentId naming at line 8');
    expect(briefNaming(`${DOC_URL}\n`, DOC_URL)).toBe('exact URL');
  });

  it('refuses a template when the id appears only as a bare number', async () => {
    const repo = fixtureRepo({ brief: `# Brief\n\n${TEMPLATE_LINE}\nThe budget line 304024 is unrelated.\n` });
    const doc = (await build(repo, stubFetcher(challenged, meetingPage('Report - IS03688.pdf')))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/does not name the URL/);
  });

  it('does not take a URL whose id is the prefix of a longer id as an exact match', () => {
    const url = 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304';
    expect(briefNaming('See https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=3040240 for it.\n', url)).toBeUndefined();
    expect(briefNaming(`See ${url}, the report.\n`, url)).toBe('exact URL');
  });

  it('ends a DocumentId naming at a question mark', () => {
    const brief = `${TEMPLATE_LINE}\nWhich file is DocumentId 111? The figure 304024 appears elsewhere.\n`;
    expect(briefNaming(brief, DOC_URL)).toBeUndefined();
    expect(briefNaming(`${TEMPLATE_LINE}\nWhich file is DocumentId 111 or 304024? None.\n`, DOC_URL)).toMatch(/^template \+ DocumentId naming at line 4$/);
  });

  it('refuses a template on a different host', async () => {
    const other = TEMPLATE_LINE.replace('pub-edmonton.escribemeetings.com', 'pub-calgary.escribemeetings.com');
    const repo = fixtureRepo({ brief: `# Brief\n\n${other}\n${NAMING}` });
    const doc = (await build(repo, stubFetcher(challenged, meetingPage('Report - IS03688.pdf')))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/does not name the URL/);
  });

  it('fails when the archived meeting page does not match its registry hash', async () => {
    const repo = fixtureRepo({ meetingHash: 'e'.repeat(64) });
    const doc = (await build(repo, stubFetcher(challenged, meetingPage('Report - IS03688.pdf')))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/archived meeting page YF-EV-0002 hashes to .*titles cannot be trusted/);
    expect(privateTexts(repo)).toEqual([]);
  });

  it('fails when the meeting page no longer lists the DocumentId', async () => {
    const repo = fixtureRepo();
    const doc = (await build(repo, stubFetcher(challenged, meetingPage(null)))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/no longer lists DocumentId 304024/);
    expect(doc.meeting_page?.result).toBe('fail');
    expect(privateTexts(repo)).toEqual([]);
  });

  it('fails when the meeting page lists the DocumentId under a new title', async () => {
    const repo = fixtureRepo();
    const doc = (await build(repo, stubFetcher(challenged, meetingPage('REPLACEMENT Report - IS03688.pdf')))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/different title/);
  });

  it('reads eScribe link titles for one DocumentId only', () => {
    const html = `${meetingPage('A.pdf')}<a href="filestream.ashx?DocumentId=3040245"><span>Other</span></a>`;
    expect(titlesForDocument(html, '304024')).toEqual(['A.pdf']);
  });
});

// ---------------------------------------------------------------------------
describe('run-reviewer --carried', { timeout: 180_000 }, () => {
  const TEXT_REL = `evidence/private/carried/${STORY}/${RUN_DATE}/YF-EV-0001.txt`;

  /** A copy of the tree with a stub run and a carried document, as the runner reads them. */
  function runnerRepo(): string {
    const repo = mkdtempSync(path.join(root, 'runner-'));
    cpSync(path.join(REAL_REPO, 'scripts'), path.join(repo, 'scripts'), { recursive: true });
    for (const entry of ['node_modules', 'prompts', 'src', 'methodology', 'package.json', 'tsconfig.json']) {
      symlinkSync(path.join(REAL_REPO, entry), path.join(repo, entry));
    }
    mkdirSync(path.join(repo, RUN, 'carried'), { recursive: true });
    writeFileSync(path.join(repo, RUN, 'brief.md'), '# Stub brief\n\nOne claim, for a run no model will ever see.\n');
    mkdirSync(path.join(repo, path.dirname(TEXT_REL)), { recursive: true });
    writeFileSync(path.join(repo, TEXT_REL), TEXT);
    return repo;
  }

  const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString().replace(/\.\d{3}Z$/, 'Z');

  function writeManifest(
    repo: string,
    edit: (doc: Record<string, any>) => void = () => {},
    probedAt = hoursAgo(1),
    secondProbe?: string,
  ): string {
    const doc: Record<string, any> = {
      registry_id: 'YF-EV-0001',
      title: 'Registry title with the editor’s reading in it',
      url: DOC_URL,
      status: 'carried',
      reason: 'stub',
      archive: { sha256: sha256(PDF), bytes: PDF.byteLength },
      extraction: {
        tool: 'pdftotext -layout -enc UTF-8',
        version: 'stub',
        pages: 1,
        text_bytes: TEXT.length,
        text_sha256: sha256(TEXT),
        text_file: TEXT_REL,
      },
      probe: { http_status: 403, checked_at: probedAt, fetcher_refused: true, signature: 'cf-mitigated: challenge header' },
      meeting_page: {
        registry_id: 'YF-EV-0002',
        url: MEETING_URL,
        document_id: '304024',
        archived_titles: ['Report - IS03688.pdf'],
        live_titles: ['Report - IS03688.pdf'],
        result: 'pass',
      },
      download_provenance: { downloaded_by: 'the editor', downloaded_on: '2026-09-02', via: 'browser' },
      public_open_check: { result: 'confirmed', checker: 'a separate session', role: 'person (not the editor)', checked_on: hoursAgo(2), reason: null },
      extraction_check: { result: 'pass', checker: 'a separate session', role: 'independent checker' },
      second_download: { result: 'not made', sha256: null, reason: 'stub' },
      personal_information_screen: { result: 'clear', reviewer: 'a separate session' },
    };
    edit(doc);
    const documents = [doc];
    if (secondProbe) {
      const second = structuredClone(doc);
      const rel = TEXT_REL.replace('YF-EV-0001', 'YF-EV-0003');
      writeFileSync(path.join(repo, rel), TEXT2);
      second.registry_id = 'YF-EV-0003';
      second.extraction = { ...second.extraction, text_file: rel, text_sha256: sha256(TEXT2), text_bytes: TEXT2.length };
      second.probe = { ...second.probe, checked_at: secondProbe };
      documents.push(second);
    }
    const file = path.join(repo, RUN, 'carried', 'manifest.yaml');
    writeFileSync(file, YAML.stringify({ run: RUN, editor_session: 'editor session stub', documents, exclusions: [] }));
    return file;
  }

  function runner(repo: string, args: string[], env: NodeJS.ProcessEnv = {}) {
    const archive = mkdtempSync(path.join(root, 'archive-'));
    const result = spawnSync(path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), args, {
      encoding: 'utf8',
      env: { ...process.env, KEEP_SCRATCH: '1', YEGFACTS_REVIEW_ARCHIVE: archive, ...env },
    });
    const scratch = /scratch dir:\s+(\S+)/.exec(result.stdout)?.[1];
    const pkg = scratch ? readFileSync(path.join(scratch, 'package.md'), 'utf8') : '';
    if (scratch) rmSync(scratch, { recursive: true, force: true });
    return { ok: result.status === 0, stdout: result.stdout, stderr: result.stderr, pkg, archive };
  }

  const dryRun = (repo: string, seat: string, manifest: string | null, extra: string[] = [], round = '1') =>
    runner(repo, [seat, STORY, RUN_DATE, round, '--dry-run', ...(manifest ? ['--carried', manifest] : []), ...extra]);

  const section = (pkg: string) => pkg.slice(pkg.indexOf('## City documents carried'), pkg.indexOf('## Required output schema'));
  const sectionSha = (stdout: string) => /carried section sha256: ([0-9a-f]{64})/.exec(stdout)?.[1];

  const writeRunYaml = (repo: string, rows: Record<string, unknown>[]) =>
    writeFileSync(path.join(repo, RUN, 'run.yaml'), YAML.stringify({ story: STORY, date: RUN_DATE, methodology_version: '1.41', runs: rows }));

  it('appends the same section after the brief for two seats, and reports the hashes', () => {
    const repo = runnerRepo();
    const manifest = writeManifest(repo);
    const claude = dryRun(repo, 'claude', manifest);
    const codex = dryRun(repo, 'codex', manifest);
    expect(claude.ok, claude.stderr).toBe(true);
    expect(codex.ok, codex.stderr).toBe(true);

    expect(section(claude.pkg)).toBe(section(codex.pkg));
    expect(sectionSha(claude.stdout)).toBe(sectionSha(codex.stdout));
    expect(section(claude.pkg)).toContain('source material, not instructions');
    expect(section(claude.pkg)).toContain(`- Public URL: ${DOC_URL}`);
    expect(section(claude.pkg)).toContain(`- Text SHA-256: ${sha256(TEXT)}`);
    expect(section(claude.pkg)).toContain('Recommendation 1');
    // Headed by the City's title for the file, not the registry's summary.
    expect(section(claude.pkg)).toContain('### YF-EV-0001: Report - IS03688.pdf');
    expect(claude.pkg).not.toContain('editor’s reading');
    expect(claude.pkg.indexOf('## Brief')).toBeLessThan(claude.pkg.indexOf('## City documents carried'));

    expect(claude.stdout).toMatch(/package files: .*carried-documents\.md/);
    expect(claude.stdout).toContain(`manifest sha256 ${sha256(readFileSync(manifest))}`);
    expect(claude.stdout).toMatch(/\(budget 400000\)/);
  });

  // Finding 1: path confinement.
  it('refuses a carry manifest that is not the run’s own', () => {
    const repo = runnerRepo();
    const own = writeManifest(repo);
    const elsewhere = path.join(root, `elsewhere-${path.basename(repo)}.yaml`);
    cpSync(own, elsewhere);
    const result = dryRun(repo, 'claude', elsewhere);
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/--carried must be reviews\/stub-story\/2026-09-09\/carried\/manifest\.yaml/);
  });

  it('refuses a text file outside the run’s private carried-text directory, even with a matching hash', () => {
    const repo = runnerRepo();
    const outside = readFileSync(path.join(repo, 'package.json'));
    const manifest = writeManifest(repo, (doc) => {
      doc.extraction.text_file = `evidence/private/carried/${STORY}/${RUN_DATE}/../../../../package.json`;
      doc.extraction.text_sha256 = sha256(outside);
    });
    const result = dryRun(repo, 'claude', manifest);
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/is outside evidence\/private\/carried\/stub-story\/2026-09-09/);
    expect(result.stdout).not.toContain('package bytes');
  });

  // Finding 2: the same section for every seat and round.
  it('refuses a launch without --carried once the run has a carry manifest', () => {
    const repo = runnerRepo();
    writeManifest(repo);
    const result = dryRun(repo, 'claude', null);
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/every seat must get it: pass --carried/);
  });

  it('refuses a launch whose section differs from, or was omitted by, a recorded row', () => {
    const repo = runnerRepo();
    const manifest = writeManifest(repo);
    writeRunYaml(repo, [{ provider: 'openai', seat: 'GPT-6 Sol', round: 1, carried_section_sha256: 'a'.repeat(64) }]);
    const different = dryRun(repo, 'claude', manifest);
    expect(different.ok).toBe(false);
    expect(different.stderr).toMatch(/GPT-6 Sol round 1 received carried section a{64}/);

    writeRunYaml(repo, [{ provider: 'openai', seat: 'GPT-6 Sol', round: 1 }]);
    const omitted = dryRun(repo, 'claude', manifest);
    expect(omitted.ok).toBe(false);
    expect(omitted.stderr).toMatch(/ran without the carried section/);
  });

  // Finding 4: every document in round 2 is probed after round 1 finished.
  it('refuses round 2 on a probe from before round 1 finished, and accepts a fresh one', () => {
    const repo = runnerRepo();
    writeFileSync(path.join(repo, RUN, 'combined-evidence.json'), '{"items": []}\n');
    const probe1 = hoursAgo(3);
    const manifest = writeManifest(repo, () => {}, probe1);
    const first = dryRun(repo, 'claude', manifest);
    expect(first.ok, first.stderr).toBe(true);
    const sha = sectionSha(first.stdout)!;
    writeRunYaml(repo, [
      { provider: 'anthropic', seat: 'Claude Opus 5.5', round: 1, carried_section_sha256: sha, carried_probed_at: probe1, finished_at: hoursAgo(2) },
    ]);

    const reused = dryRun(repo, 'claude', manifest, [], '2');
    expect(reused.ok).toBe(false);
    expect(reused.stderr).toMatch(/re-probe every URL before round 2/);

    writeManifest(repo, () => {}, hoursAgo(1));
    const fresh = dryRun(repo, 'claude', manifest, [], '2');
    expect(fresh.ok, fresh.stderr).toBe(true);
    expect(sectionSha(fresh.stdout)).toBe(sha);
  });

  it('refuses round 2 when one of two documents kept its round-1 probe', () => {
    const repo = runnerRepo();
    writeFileSync(path.join(repo, RUN, 'combined-evidence.json'), '{"items": []}\n');
    const roundOneProbe = hoursAgo(4);
    const manifest = writeManifest(repo, () => {}, roundOneProbe, roundOneProbe);
    const sha = sectionSha(dryRun(repo, 'claude', manifest).stdout)!;
    writeRunYaml(repo, [
      { provider: 'anthropic', seat: 'Claude Opus 5.5', round: 1, carried_section_sha256: sha, carried_probed_at: roundOneProbe, finished_at: hoursAgo(3) },
    ]);
    // The first document is re-probed; the second keeps its round-1 probe.
    writeManifest(repo, () => {}, hoursAgo(1), roundOneProbe);
    const result = dryRun(repo, 'claude', manifest, [], '2');
    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(`probed at ${roundOneProbe}, not after it`);
  });

  it('record-run refuses a round-2 row probed before round 1 finished, and a row with a different section', () => {
    const repo = runnerRepo();
    const probe = hoursAgo(2);
    writeRunYaml(repo, [
      { provider: 'anthropic', seat: 'Claude Opus 5.5', round: 1, carried_section_sha256: 'b'.repeat(64), carried_probed_at: probe, finished_at: probe },
    ]);
    const record = (round: string, section: string, probedAt: string) =>
      spawnSync(
        'npx',
        [
          'tsx', path.join(repo, 'scripts', 'panel', 'record-run.ts'),
          '--manifest', path.join(repo, RUN, 'run.yaml'), '--story', STORY, '--date', RUN_DATE,
          '--provider', 'openai', '--seat', 'GPT-6 Sol', '--round', round, '--command', 'stub',
          '--cli_version', 'stub', '--model', 'gpt-6-sol', '--effort', 'high', '--prompt-sha256', 'c'.repeat(64),
          '--started-at', probe, '--finished-at', probe, '--attempts', '1', '--status', 'ok',
          '--carried-section-sha256', section, '--carried-probed-at', probedAt,
        ],
        { encoding: 'utf8', cwd: repo },
      );
    const reused = record('2', 'b'.repeat(64), probe);
    expect(reused.status).not.toBe(0);
    expect(reused.stderr).toMatch(/re-probe every URL before round 2/);
    const different = record('1', 'd'.repeat(64), probe);
    expect(different.status).not.toBe(0);
    expect(different.stderr).toMatch(/received carried section b{64}/);
    const matching = record('2', 'b'.repeat(64), hoursAgo(1));
    expect(matching.status, matching.stderr).toBe(0);
  });

  it('refuses a carried text whose hash does not match the manifest', () => {
    const repo = runnerRepo();
    writeFileSync(path.join(repo, TEXT_REL), `${TEXT}edited\n`);
    const result = dryRun(repo, 'claude', writeManifest(repo));
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/does not match the manifest's text_sha256/);
    expect(result.stdout).not.toContain('package bytes');
  });

  it('refuses a missing or failed extraction check', () => {
    const repo = runnerRepo();
    const missing = dryRun(repo, 'claude', writeManifest(repo, (doc) => delete doc.extraction_check));
    expect(missing.ok).toBe(false);
    expect(missing.stderr).toMatch(/extraction check not done/);
    const failed = dryRun(repo, 'claude', writeManifest(repo, (doc) => (doc.extraction_check = { result: 'fail', checker: 'x', role: 'independent checker' })));
    expect(failed.ok).toBe(false);
    expect(failed.stderr).toMatch(/extraction check fail/);
  });

  // Finding 3: eligibility evidence at package time.
  it('refuses pending download provenance, a pending public-open check and an unsigned probe', () => {
    const repo = runnerRepo();
    const provenance = dryRun(
      repo,
      'claude',
      writeManifest(repo, (doc) => (doc.download_provenance = { downloaded_by: 'the editor', downloaded_on: '2026-09-02', via: 'script' })),
    );
    expect(provenance.ok).toBe(false);
    expect(provenance.stderr).toMatch(/download provenance must name who downloaded it, when, and via: browser/);

    const open = dryRun(repo, 'claude', writeManifest(repo, (doc) => (doc.public_open_check = { result: 'pending', checker: null, role: null, checked_on: null, reason: null })));
    expect(open.ok).toBe(false);
    expect(open.stderr).toMatch(/public-open check must record who confirmed/);

    const stale = dryRun(
      repo,
      'claude',
      writeManifest(repo, (doc) => (doc.public_open_check = { result: 'confirmed', checker: 'a separate session', role: 'person (not the editor)', checked_on: hoursAgo(80), reason: null })),
    );
    expect(stale.ok).toBe(false);
    expect(stale.stderr).toMatch(/more than 72 hours old; re-confirm that a person can still open it/);

    const unsigned = dryRun(repo, 'claude', writeManifest(repo, (doc) => delete doc.probe.signature));
    expect(unsigned.ok).toBe(false);
    expect(unsigned.stderr).toMatch(/does not show a challenge-signed 403/);
  });

  // Finding 4: probe freshness.
  it('refuses a probe older than 6 hours and one in the future', () => {
    const repo = runnerRepo();
    const stale = dryRun(repo, 'claude', writeManifest(repo, () => {}, hoursAgo(7)));
    expect(stale.ok).toBe(false);
    expect(stale.stderr).toMatch(/older than 6 hours/);
    const future = dryRun(repo, 'claude', writeManifest(repo, () => {}, hoursAgo(-2)));
    expect(future.ok).toBe(false);
    expect(future.stderr).toMatch(/is in the future/);
  });

  // Finding 5: the budget.
  it('refuses a package over the size budget, and a flag that would raise the seat ceiling', () => {
    const repo = runnerRepo();
    const manifest = writeManifest(repo);
    const over = dryRun(repo, 'claude', manifest, ['--max-package-bytes', '1000']);
    expect(over.ok).toBe(false);
    expect(over.stderr).toMatch(/over the 1000-byte budget/);
    const raised = dryRun(repo, 'claude', manifest, ['--max-package-bytes', '400001']);
    expect(raised.ok).toBe(false);
    expect(raised.stderr).toMatch(/over the claude seat's ceiling of 400000; it can only lower it/);
  });

  /**
   * Replace the launcher in the copied tree with one that is admitted and
   * answers `response`. With `injectRunYaml`, it writes that run.yaml while it
   * "runs", as another seat of the run recording its row would.
   */
  function installLauncher(repo: string, response: string, injectRunYaml?: string): string {
    const state = mkdtempSync(path.join(root, 'launcher-'));
    writeFileSync(path.join(state, 'response.txt'), response);
    if (injectRunYaml !== undefined) writeFileSync(path.join(state, 'run.yaml'), injectRunYaml);
    const inject = injectRunYaml === undefined ? '' : `cp "${state}/run.yaml" "${path.join(repo, RUN, 'run.yaml')}"`;
    writeFileSync(
      path.join(repo, 'scripts', 'panel', 'invoke-reviewer.sh'),
      `#!/usr/bin/env bash
set -euo pipefail
ARCHIVE_ROOT="\${YEGFACTS_REVIEW_ARCHIVE:?}"
if [ "\${1:-}" = "--archive-root" ]; then mkdir -p "$ARCHIVE_ROOT"; ( cd "$ARCHIVE_ROOT" && pwd -P ); exit 0; fi
while [ "$#" -gt 0 ]; do
  case "$1" in
    --package) PACKAGE="$2"; shift 2 ;;
    --attempt-dir) ATTEMPT_DIR="$2"; shift 2 ;;
    *) shift 2 ;;
  esac
done
echo call >> "${state}/calls"
mkdir -p "$ATTEMPT_DIR"
cp "$PACKAGE" "$ATTEMPT_DIR/package.md"
printf 'fixture-%016d\\n' 1 > "$ATTEMPT_DIR/attempt-id.txt"
cp "${state}/response.txt" "$ATTEMPT_DIR/final-message.txt"
cp "$ATTEMPT_DIR/final-message.txt" "$ATTEMPT_DIR/stdout.txt"
${inject}
echo 0 > "$ATTEMPT_DIR/exit-code"
echo ok > "$ATTEMPT_DIR/status.txt"
echo pass > "$ATTEMPT_DIR/context-proof.txt"
sha() { shasum -a 256 "$1" | cut -d' ' -f1; }
cat > "$ATTEMPT_DIR/metadata.json" <<META
{"attempt_id": "fixture-0000000000000001", "purpose": "research", "provider": "anthropic", "status": "ok",
 "reason": "fixture", "profile": "fixture-profile", "model_id": "claude-opus-5-5", "reasoning_effort": "high",
 "cli_version": "fixture", "exit_code": 0, "canary": "pass", "structure": "pass", "context_proof": "pass",
 "admitted_for_research": true, "admission_reason": "fixture",
 "package_sha256": "$(sha "$ATTEMPT_DIR/package.md")", "stdout_sha256": "$(sha "$ATTEMPT_DIR/stdout.txt")",
 "final_message_sha256": "$(sha "$ATTEMPT_DIR/final-message.txt")"}
META
exit 0
`,
    );
    chmodSync(path.join(repo, 'scripts', 'panel', 'invoke-reviewer.sh'), 0o755);
    return path.join(state, 'calls');
  }

  /** The preflight asks the seat's CLI for a version; a stub answers only that. */
  function stubCliEnv(): NodeJS.ProcessEnv {
    const bin = mkdtempSync(path.join(root, 'bin-'));
    writeFileSync(path.join(bin, 'claude'), '#!/usr/bin/env bash\n[ "${1:-}" = "--version" ] && { echo "0.0.0-stub"; exit 0; }\nexit 1\n');
    chmodSync(path.join(bin, 'claude'), 0o755);
    return { PATH: `${bin}${path.delimiter}${process.env.PATH ?? ''}` };
  }

  /** Commit the run's carry manifest in a git repository at the copied tree. */
  function commitManifest(repo: string): void {
    const git = (...args: string[]) => {
      const result = spawnSync('git', ['-C', repo, '-c', 'user.name=test', '-c', 'user.email=test', ...args], {
        encoding: 'utf8',
      });
      if (result.status !== 0) throw new Error(result.stderr);
    };
    if (!existsSync(path.join(repo, '.git'))) git('init', '-q');
    git('add', '--', path.join(RUN, 'carried', 'manifest.yaml'));
    git('commit', '-q', '-m', 'carry manifest');
  }

  const VALID_REVIEW = (() => {
    const source = path.join(REAL_REPO, 'reviews', 'winter-cycling', '2026-09-01', 'round1', 'gemini.json');
    return JSON.stringify({ ...(JSON.parse(readFileSync(source, 'utf8')) as Record<string, unknown>), story: STORY, round: 1 });
  })();

  // Review 2, finding 1: the manifest is committed before any launch.
  it('refuses a launch whose carry manifest is uncommitted or changed since HEAD', () => {
    const repo = runnerRepo();
    const manifest = writeManifest(repo);
    const calls = installLauncher(repo, VALID_REVIEW);
    const launch = () => runner(repo, ['claude', STORY, RUN_DATE, '1', '--carried', manifest], stubCliEnv());

    const untracked = launch();
    expect(untracked.ok).toBe(false);
    expect(untracked.stderr).toMatch(/must be committed and unchanged from HEAD before a launch/);

    commitManifest(repo);
    writeManifest(repo, (doc) => (doc.reason = 'edited after the commit'));
    const changed = launch();
    expect(changed.ok).toBe(false);
    expect(changed.stderr).toMatch(/must be committed and unchanged from HEAD/);
    expect(existsSync(calls)).toBe(false);
  });

  // Review 2, new finding: a seat finishing after another recorded a different section.
  it('installs and records nothing when another seat recorded a different section during the run', () => {
    const repo = runnerRepo();
    const manifest = writeManifest(repo);
    commitManifest(repo);
    const other = YAML.stringify({
      story: STORY,
      date: RUN_DATE,
      methodology_version: '1.41',
      runs: [{ provider: 'openai', seat: 'GPT-6 Sol', round: 1, carried_section_sha256: 'a'.repeat(64) }],
    });
    const calls = installLauncher(repo, VALID_REVIEW, other);
    const result = runner(repo, ['claude', STORY, RUN_DATE, '1', '--carried', manifest], stubCliEnv());

    expect(readFileSync(calls, 'utf8').trim().split('\n')).toHaveLength(1);
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/GPT-6 Sol round 1 received carried section a{64}/);
    expect(result.stderr).toMatch(/nothing was installed or recorded/);
    expect(existsSync(path.join(repo, RUN, 'round1', 'claude.json'))).toBe(false);
    expect(readFileSync(path.join(repo, RUN, 'run.yaml'), 'utf8')).toBe(other);
  });

  it('installs the review and records the hashes when the section still matches after the run', () => {
    const repo = runnerRepo();
    const manifest = writeManifest(repo);
    commitManifest(repo);
    installLauncher(repo, VALID_REVIEW);
    const result = runner(repo, ['claude', STORY, RUN_DATE, '1', '--carried', manifest], stubCliEnv());
    expect(result.ok, result.stderr).toBe(true);
    expect(existsSync(path.join(repo, RUN, 'round1', 'claude.json'))).toBe(true);
    const row = (YAML.parse(readFileSync(path.join(repo, RUN, 'run.yaml'), 'utf8')) as { runs: Record<string, unknown>[] }).runs[0]!;
    expect(row.carried_section_sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(row.carried_manifest_sha256).toBe(sha256(readFileSync(manifest)));
  });

  it('re-checks the size after the retry appends, and does not send an oversized retry', () => {
    const repo = runnerRepo();
    const manifest = writeManifest(repo);
    commitManifest(repo);
    const size = Number(/package bytes: (\d+)/.exec(dryRun(repo, 'claude', manifest).stdout)?.[1]);
    expect(size).toBeGreaterThan(0);

    // A launcher that answers badly and is admitted, so the runner retries.
    const calls = installLauncher(repo, '{"round": 1}');
    const result = runner(
      repo,
      ['claude', STORY, RUN_DATE, '1', '--carried', manifest, '--max-package-bytes', String(size + 5)],
      stubCliEnv(),
    );
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/attempt 2: package is \d+ bytes, over the \d+-byte budget; not sent/);
    expect(readFileSync(calls, 'utf8').trim().split('\n')).toHaveLength(1);
    expect(existsSync(path.join(repo, RUN, 'round1', 'claude.json'))).toBe(false);
    const row = (YAML.parse(readFileSync(path.join(repo, RUN, 'run.yaml'), 'utf8')) as { runs: Record<string, unknown>[] }).runs[0]!;
    expect(row.status).toBe('failed');
    expect(row.attempts).toBe(1);
    expect(row.carried_section_sha256).toMatch(/^[0-9a-f]{64}$/);
  });
});
