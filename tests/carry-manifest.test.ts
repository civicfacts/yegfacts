/**
 * Carried documents (methodology v1.41, D-0046): the carry manifest and the
 * runner's --carried flag.
 *
 * Nothing here touches the network or pdftotext. The manifest builder takes a
 * stub fetcher and a stub extractor; the runner tests run --dry-run in a
 * temporary copy of the tree, which assembles the package and invokes no CLI.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import YAML from 'yaml';
import {
  buildCarryManifest,
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

const meetingPage = (title: string | null) =>
  `<html><body>${
    title === null
      ? ''
      : `<a class='Link' href="filestream.ashx?DocumentId=304024" data-original-title='${title}'><span>${title}</span></a>`
  }</body></html>`;

/** A tree with a registry, archived bytes and a brief, as the builder reads them. */
function fixtureRepo(options: { registryHash?: string } = {}): string {
  const repo = mkdtempSync(path.join(root, 'repo-'));
  mkdirSync(path.join(repo, 'evidence', 'registry'), { recursive: true });
  mkdirSync(path.join(repo, 'evidence', 'private'), { recursive: true });
  mkdirSync(path.join(repo, RUN), { recursive: true });
  writeFileSync(path.join(repo, RUN, 'brief.md'), `# Brief\n\nReport IS03688, ${DOC_URL}.\n`);
  writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0001-filestream.ashx'), PDF);
  writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0002-Meeting.aspx'), meetingPage('Report - IS03688.pdf'));
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
      archive: { sha256: 'x', path: 'evidence/private/YF-EV-0002-Meeting.aspx' },
    }),
  );
  return repo;
}

function stubFetcher(document: { status: number; contentType?: string }, meetingHtml: string): Fetcher & { calls: string[] } {
  const calls: string[] = [];
  const fetcher = (async (url: string) => {
    calls.push(url);
    if (url === DOC_URL) return { status: document.status, contentType: document.contentType ?? 'text/html', body: '' };
    if (url === MEETING_URL) return { status: 200, contentType: 'text/html', body: meetingHtml };
    throw new Error(`unexpected fetch ${url}`);
  }) as Fetcher & { calls: string[] };
  fetcher.calls = calls;
  return fetcher;
}

const stubExtractor: Extractor = () => ({ version: 'pdftotext version 0.0.0-stub', text: TEXT });
const NOW = new Date('2026-09-28T12:00:00Z');

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
  it('carries a refused document, writes its text privately and the manifest publicly', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo, stubFetcher({ status: 403 }, meetingPage('Report - IS03688.pdf')));
    const doc = manifest.documents[0]!;
    expect(doc.status).toBe('carried');
    expect(doc.probe).toMatchObject({ http_status: 403, checked_at: '2026-09-28T12:00:00Z', fetcher_refused: true });
    expect(doc.meeting_page?.result).toBe('pass');
    expect(doc.extraction).toMatchObject({ pages: 1, text_sha256: sha256(TEXT), version: 'pdftotext version 0.0.0-stub' });
    expect(doc.extraction_check).toEqual({ result: 'pending', reviewer: null });
    expect(doc.second_download?.result).toBe('pending');
    expect(manifest.exclusions).toEqual([{ label: 'Attachment 3', status: 'excluded', reason: 'no archive held' }]);
    expect(privateTexts(repo)).toEqual(['YF-EV-0001.txt']);
    const written = readFileSync(path.join(repo, RUN, 'carried', 'manifest.yaml'), 'utf8');
    expect(written).not.toContain('Recommendation 1');
  });

  it('refuses archived bytes whose hash does not match the registry, and extracts nothing', async () => {
    const repo = fixtureRepo({ registryHash: 'f'.repeat(64) });
    const fetcher = stubFetcher({ status: 403 }, meetingPage('Report - IS03688.pdf'));
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

  it('fails when the meeting page no longer lists the DocumentId', async () => {
    const repo = fixtureRepo();
    const doc = (await build(repo, stubFetcher({ status: 403 }, meetingPage(null)))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/no longer lists DocumentId 304024/);
    expect(doc.meeting_page?.result).toBe('fail');
    expect(privateTexts(repo)).toEqual([]);
  });

  it('fails when the meeting page lists the DocumentId under a new title', async () => {
    const repo = fixtureRepo();
    const doc = (await build(repo, stubFetcher({ status: 403 }, meetingPage('REPLACEMENT Report - IS03688.pdf')))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/different title/);
  });

  it('reads eScribe link titles for one DocumentId only', () => {
    const html = `${meetingPage('A.pdf')}<a href="filestream.ashx?DocumentId=3040245"><span>Other</span></a>`;
    expect(titlesForDocument(html, '304024')).toEqual(['A.pdf']);
  });
});

// ---------------------------------------------------------------------------
describe('run-reviewer --carried', { timeout: 120_000 }, () => {
  /** A copy of the tree with a stub run and a carried document, as the runner reads them. */
  function runnerRepo(): string {
    const repo = mkdtempSync(path.join(root, 'runner-'));
    cpSync(path.join(REAL_REPO, 'scripts'), path.join(repo, 'scripts'), { recursive: true });
    for (const entry of ['node_modules', 'prompts', 'src', 'methodology', 'package.json', 'tsconfig.json']) {
      symlinkSync(path.join(REAL_REPO, entry), path.join(repo, entry));
    }
    mkdirSync(path.join(repo, RUN, 'carried'), { recursive: true });
    writeFileSync(path.join(repo, RUN, 'brief.md'), '# Stub brief\n\nOne claim, for a run no model will ever see.\n');
    const textDir = path.join(repo, 'evidence', 'private', 'carried', STORY, RUN_DATE);
    mkdirSync(textDir, { recursive: true });
    writeFileSync(path.join(textDir, 'YF-EV-0001.txt'), TEXT);
    return repo;
  }

  function writeManifest(repo: string, edit: (doc: Record<string, any>) => void = () => {}): string {
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
        text_file: `evidence/private/carried/${STORY}/${RUN_DATE}/YF-EV-0001.txt`,
      },
      probe: { http_status: 403, checked_at: new Date(Date.now() - 3_600_000).toISOString(), fetcher_refused: true },
      meeting_page: { registry_id: 'YF-EV-0002', url: MEETING_URL, document_id: '304024', archived_titles: ['Report - IS03688.pdf'], live_titles: ['Report - IS03688.pdf'], result: 'pass' },
      extraction_check: { result: 'pass', reviewer: 'a separate session' },
      second_download: { result: 'not made', sha256: null, reason: 'stub' },
      personal_information_screen: { result: 'clear', reviewer: 'a separate session' },
    };
    edit(doc);
    const file = path.join(repo, RUN, 'carried', 'manifest.yaml');
    writeFileSync(file, YAML.stringify({ run: RUN, documents: [doc], exclusions: [] }));
    return file;
  }

  function dryRun(repo: string, seat: string, manifest: string, extra: string[] = []) {
    const archive = mkdtempSync(path.join(root, 'archive-'));
    const result = spawnSync(
      path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'),
      [seat, STORY, RUN_DATE, '1', '--dry-run', '--carried', manifest, ...extra],
      { encoding: 'utf8', env: { ...process.env, KEEP_SCRATCH: '1', YEGFACTS_REVIEW_ARCHIVE: archive } },
    );
    const scratch = /scratch dir:\s+(\S+)/.exec(result.stdout)?.[1];
    const pkg = scratch ? readFileSync(path.join(scratch, 'package.md'), 'utf8') : '';
    if (scratch) rmSync(scratch, { recursive: true, force: true });
    return { ok: result.status === 0, stdout: result.stdout, stderr: result.stderr, pkg };
  }

  const section = (pkg: string) => pkg.slice(pkg.indexOf('## City documents carried'), pkg.indexOf('## Required output schema'));

  it('appends the same section after the brief for two seats, and records the manifest hash', () => {
    const repo = runnerRepo();
    const manifest = writeManifest(repo);
    const claude = dryRun(repo, 'claude', manifest);
    const codex = dryRun(repo, 'codex', manifest);
    expect(claude.ok, claude.stderr).toBe(true);
    expect(codex.ok, codex.stderr).toBe(true);

    expect(section(claude.pkg)).toBe(section(codex.pkg));
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

  it('refuses a carried text whose hash does not match the manifest', () => {
    const repo = runnerRepo();
    writeFileSync(path.join(repo, 'evidence', 'private', 'carried', STORY, RUN_DATE, 'YF-EV-0001.txt'), `${TEXT}edited\n`);
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
    const failed = dryRun(repo, 'claude', writeManifest(repo, (doc) => (doc.extraction_check = { result: 'fail', reviewer: 'x' })));
    expect(failed.ok).toBe(false);
    expect(failed.stderr).toMatch(/extraction check fail/);
  });

  it('refuses a probe older than 24 hours', () => {
    const repo = runnerRepo();
    const stale = new Date(Date.now() - 25 * 3_600_000).toISOString();
    const result = dryRun(repo, 'claude', writeManifest(repo, (doc) => (doc.probe.checked_at = stale)));
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/older than 24 hours/);
  });

  it('refuses a package over the size budget', () => {
    const repo = runnerRepo();
    const result = dryRun(repo, 'claude', writeManifest(repo), ['--max-package-bytes', '1000']);
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/over the 1000-byte budget/);
  });
});
