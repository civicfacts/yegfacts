/**
 * Carried documents, v1.43 (D-0048): the two-round seat-failure ground,
 * documents outside the meeting portal, long documents carried by section,
 * the package budget and the labels.
 *
 * No network and no pdftotext: the builder gets a stub fetcher and a stub
 * extractor. The seat answers, the budget attachment and every name in them
 * are invented; the attachment follows the layout of the City's operating
 * budget attachments (running header, table of contents, service packages
 * with wrapped titles and "Total" rows) with none of its text.
 */
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import YAML from 'yaml';
import CarriedLabel from '../src/components/CarriedLabel.astro';
import { sha256 } from '../scripts/lib/repo.ts';
import {
  buildCarryManifest,
  packageRefusals,
  renderCarriedSection,
  type CarryManifest,
  type Extractor,
  type Fetcher,
} from '../scripts/panel/carry-manifest.ts';
import { carrySections, packageHeading, parseSections, tableOfContents, tilingProblems } from '../scripts/panel/pdf-sections.ts';
import { failureMarker, readSeatAnswer, sameDocumentUrl, twoRoundGround } from '../scripts/panel/two-round.ts';
import {
  CARRIED_LABEL,
  CARRIED_NOT_INDEPENDENT,
  CARRIED_OPEN_UNCONFIRMED,
  CARRIED_SAME_COPY,
  CARRIED_SECTIONS_REST,
  CARRIED_TWO_ROUND_NOTE,
  SECTION_RULE_HREF,
  carriedLabelText,
  carriedSources,
} from '../src/lib/carried';

const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'yegfacts-v143-')));
afterAll(() => rmSync(root, { recursive: true, force: true }));

const STORY = 'stub-story';
const RUN_DATE = '2031-01-01';
const RUN = `reviews/${STORY}/${RUN_DATE}`;
const NOW = new Date('2031-01-02T12:00:00Z');
const hoursBefore = (hours: number) => new Date(NOW.getTime() - hours * 3_600_000).toISOString().replace(/\.\d{3}Z$/, 'Z');

const git = (repo: string, ...args: string[]) =>
  execFileSync('git', ['-C', repo, '-c', 'user.name=test', '-c', 'user.email=test', ...args], { stdio: 'ignore' });

// ---------------------------------------------------------------------------
// Two-round seat-failure ground
// ---------------------------------------------------------------------------

const BYLAW_URL = 'https://www.example.ca/files/bylaws/C00042.pdf';
const BYLAW_PDF = Buffer.from('%PDF-1.7 invented procedures bylaw bytes\n');
const BYLAW_TEXT = 'PROCEDURES BYLAW 42\nSection 9: each speaker may speak for 4 minutes.\n\f';
const BRIEF = `# Brief\n\nThe procedures bylaw, Bylaw 42, at \`${BYLAW_URL}\`, is essential.\n`;
const SEATS = [
  { file: 'claude', model: 'claude-opus-5-5', provider: 'anthropic' },
  { file: 'gpt', model: 'gpt-6-sol', provider: 'openai' },
  { file: 'gpt-luna', model: 'gpt-6-luna', provider: 'openai' },
];

const answer = (limitations: string[], evidence: Array<Record<string, string>> = []) => ({
  reviewer: {},
  story: STORY,
  round: 1,
  claims: [{ id: 'claim-a', limitations, unknowns: [], supporting_evidence: evidence, challenging_evidence: [], missing_evidence: [] }],
});

const FAILED = {
  claude: answer([`The bylaw at ${BYLAW_URL} was fetched once. It could not decompress the text, and retries returned HTTP 502.`]),
  gpt: answer(['The meeting portal returned 403 Forbidden, and the bylaw PDF returned 502 Bad Gateway.']),
  'gpt-luna': answer([], [{ finding: 'Section 9 sets four minutes; direct opening of the PDF returned a fetch error.', source_url: BYLAW_URL }]),
};

/** A run directory holding committed rounds: `rounds` oldest first, each seat's answer by file name. */
function writeRounds(runDir: string, rounds: Array<{ dir: string; started: string; answers: Record<string, unknown> }>): void {
  for (const round of rounds) {
    const base = round.dir === '.' ? runDir : path.join(runDir, round.dir);
    mkdirSync(path.join(base, 'round1'), { recursive: true });
    const runs = SEATS.filter((seat) => round.answers[seat.file] !== undefined).map((seat) => ({
      provider: seat.provider,
      round: 1,
      model_id: seat.model,
      started_at: round.started,
      finished_at: round.started.replace('T08', 'T09'),
      status: 'ok',
    }));
    writeFileSync(path.join(base, 'run.yaml'), YAML.stringify({ story: STORY, date: RUN_DATE, runs }));
    for (const [seat, body] of Object.entries(round.answers)) writeFileSync(path.join(base, 'round1', `${seat}.json`), JSON.stringify(body));
  }
}

/** An empty run directory whose path names the story and date, as the reader checks. */
const runDirFor = () => {
  const dir = path.join(mkdtempSync(path.join(root, 'two-round-')), STORY, RUN_DATE);
  mkdirSync(dir, { recursive: true });
  return dir;
};

const twoFailedRounds = [
  { dir: 'superseded-2031-01-01', started: '2031-01-01T08:00:00Z', answers: FAILED },
  { dir: '.', started: '2031-01-01T10:00:00Z', answers: FAILED },
];

describe('the two-round seat-failure ground', () => {
  it('reads a status after the document is named, not one for another source in the same sentence', () => {
    expect(readSeatAnswer(FAILED.gpt, BYLAW_URL, ['bylaw'])).toMatchObject({ status: 'failed', http_status: 502 });
    expect(failureMarker('the file is about 413 KB')).toBeUndefined();
    expect(failureMarker('retries returned HTTP 502')).toEqual({ http_status: 502, error: null });
  });

  it('counts an evidence entry only when it cites this document, and names only when the run declares them', () => {
    const other = answer([], [{ finding: 'Bylaw 42 is amended; direct fetch returned HTTP 403.', source_url: 'https://www.example.ca/other.pdf' }]);
    expect(readSeatAnswer(other, BYLAW_URL, ['bylaw']).status).toBe('no record');
    expect(readSeatAnswer(FAILED.gpt, BYLAW_URL, []).status).toBe('no record');
  });

  it('is accepted when every seat recorded a failure in two consecutive committed rounds, superseded ones included', () => {
    const runDir = runDirFor();
    writeRounds(runDir, twoFailedRounds);
    const result = twoRoundGround(runDir, BYLAW_URL, ['bylaw'], BRIEF);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.ground.rounds.map((r) => r.round)).toEqual(['superseded-2031-01-01/round1', 'round1']);
    expect(result.ground.rounds[0]!.seats.map((s) => [s.seat, s.tool, s.http_status ?? s.error])).toEqual([
      ['claude', 'WebFetch', 502],
      ['gpt', 'web_search open_page', 502],
      ['gpt-luna', 'web_search open_page', 'fetch error'],
    ]);
    expect(result.ground.rounds[1]!.seats[0]).toMatchObject({
      file: 'round1/claude.json',
      where: 'claims[0].limitations[0]',
      words: 'It could not decompress the text, and retries returned HTTP 502.',
      antecedent: `The bylaw at ${BYLAW_URL} was fetched once.`,
      http_status: 502,
      started_at: '2031-01-01T10:00:00Z',
    });
  });

  it('is refused with only one failing round', () => {
    const runDir = runDirFor();
    writeRounds(runDir, [twoFailedRounds[1]!]);
    const result = twoRoundGround(runDir, BYLAW_URL, ['bylaw'], BRIEF);
    expect(result).toMatchObject({ ok: false });
    expect(!result.ok && result.reason).toMatch(/no two consecutive committed rounds/);
  });

  it('is refused when one seat recorded no failure in one of the rounds', () => {
    const runDir = runDirFor();
    writeRounds(runDir, [twoFailedRounds[0]!, { ...twoFailedRounds[1]!, answers: { ...FAILED, gpt: answer(['Nothing to report.']) } }]);
    expect(twoRoundGround(runDir, BYLAW_URL, ['bylaw'], BRIEF).ok).toBe(false);
  });

  it('is refused when any seat read it directly, even in a later round', () => {
    const runDir = runDirFor();
    writeRounds(runDir, [
      ...twoFailedRounds,
      { dir: 'round1-rerun', started: '2031-01-01T12:00:00Z', answers: { ...FAILED, gpt: answer([`I read it directly from ${BYLAW_URL}.`]) } },
    ]);
    const result = twoRoundGround(runDir, BYLAW_URL, ['bylaw'], BRIEF);
    expect(result).toMatchObject({ ok: false });
    expect(!result.ok && result.reason).toMatch(/a seat read .* directly \(gpt in round1-rerun\/round1\)/);
  });

  it('is refused when a declared name is not in the frozen brief', () => {
    const runDir = runDirFor();
    writeRounds(runDir, twoFailedRounds);
    expect(twoRoundGround(runDir, BYLAW_URL, ['ordinance'], BRIEF)).toMatchObject({ ok: false });
  });
});

// ---------------------------------------------------------------------------
// Documents outside the portal
// ---------------------------------------------------------------------------

/** A git repository with a registry entry, its archive, a brief and, optionally, committed rounds. */
function publisherRepo(options: { rounds?: boolean; archive?: Buffer; url?: string } = {}): string {
  const repo = mkdtempSync(path.join(root, 'repo-'));
  const url = options.url ?? BYLAW_URL;
  const archive = options.archive ?? BYLAW_PDF;
  mkdirSync(path.join(repo, 'evidence', 'registry'), { recursive: true });
  mkdirSync(path.join(repo, 'evidence', 'private'), { recursive: true });
  mkdirSync(path.join(repo, RUN), { recursive: true });
  writeFileSync(path.join(repo, RUN, 'brief.md'), BRIEF.replace(BYLAW_URL, url));
  writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0042-C00042.pdf'), archive);
  writeFileSync(
    path.join(repo, 'evidence', 'registry', 'YF-EV-0042.yaml'),
    YAML.stringify({ id: 'YF-EV-0042', title: 'Bylaw 42', url, retrieved_on: '2031-01-01', archive: { sha256: sha256(archive), path: 'evidence/private/YF-EV-0042-C00042.pdf' } }),
  );
  if (options.rounds !== false) writeRounds(path.join(repo, RUN), twoFailedRounds);
  git(repo, 'init', '-q');
  git(repo, 'add', '-A');
  git(repo, 'commit', '-q', '-m', 'fixture');
  return repo;
}

const publisherFetcher = (bytes: Buffer, status = 200): Fetcher => async (url) => {
  if (url !== BYLAW_URL && !url.startsWith('https://pub-edmonton')) throw new Error(`unexpected fetch ${url}`);
  return { status, contentType: 'application/pdf', headers: {}, body: bytes.toString('utf8'), bytes };
};

/** Archive text for the archive; for a fresh fetch, `fresh` (identical by default). */
const extractorFor = (fresh = BYLAW_TEXT): Extractor => (file) => ({
  version: 'pdftotext version 0.0.0-stub',
  text: file.includes('yegfacts-fresh-') ? fresh : BYLAW_TEXT,
});

const buildPublisher = (repo: string, fetcher: Fetcher, extractor = extractorFor()) =>
  buildCarryManifest({ repoRoot: repo, runDir: RUN, docs: [{ id: 'YF-EV-0042' }], names: { 'YF-EV-0042': ['bylaw'] }, fetcher, extractor, seatProbes: [], now: () => NOW });

/** Every human check filled in as passing. */
function complete(manifest: CarryManifest): CarryManifest {
  const copy = structuredClone(manifest);
  copy.editor_session = 'editor session 2031-01-02';
  for (const doc of copy.documents.filter((d) => d.status === 'carried')) {
    doc.download_provenance = { downloaded_by: 'the site fetcher', downloaded_on: '2031-01-01', via: doc.publisher_check ? 'site fetcher' : 'browser' };
    doc.public_open_check = { result: 'confirmed', checker: 'a resident volunteer', role: 'person (not the editor)', checked_on: hoursBefore(2), reason: null };
    doc.personal_information_screen = { result: 'clear', reviewer: 'a separate session' };
    doc.extraction_check = { result: 'pass', checker: 'a separate session', role: 'independent checker' };
    if (doc.second_download?.result === 'pending') doc.second_download = { result: 'match', sha256: doc.archive!.sha256, reason: null };
    if (doc.kind === 'pdf-sections') {
      doc.completeness_check = { result: 'pass', checker: 'a separate session', role: 'independent checker', missed_sections: [], context_check: { result: 'pass', findings: [] } };
      for (const s of doc.sections ?? []) s.checker_reason = s.carried ? 'a snow service package' : 'no bearing on the claim';
    }
  }
  return copy;
}

const refusalsFor = (repo: string, manifest: CarryManifest, extra: Partial<Parameters<typeof packageRefusals>[1]> = {}) =>
  packageRefusals(manifest, { repoRoot: repo, runDir: path.join(repo, RUN), manifestPath: path.join(repo, RUN, 'carried', 'manifest.yaml'), now: NOW, ...extra });

describe('a document outside the meeting portal', () => {
  it('is carried on the two-round ground when the site fetches identical bytes, with quick probes beside the failures', async () => {
    const repo = publisherRepo();
    const manifest = await buildPublisher(repo, publisherFetcher(BYLAW_PDF));
    const doc = manifest.documents[0]!;
    expect(doc.status, doc.reason).toBe('carried');
    expect(doc.kind).toBe('pdf');
    expect(doc.eligibility?.ground).toBe('two-round seat failure');
    expect(doc.eligibility?.quick_probes).toEqual([{ by: 'site fetcher', probed_at: '2031-01-02T12:00:00Z', http_status: 200, outcome: 'fetched' }]);
    expect(doc.publisher_check).toMatchObject({ identity: 'bytes', archive_sha256: sha256(BYLAW_PDF), fresh_fetch: { sha256: sha256(BYLAW_PDF), http_status: 200 } });
    expect(doc.meeting_page).toBeUndefined();
    expect(doc.second_download).toMatchObject({ result: 'match', sha256: sha256(BYLAW_PDF) });
    expect(refusalsFor(repo, complete(manifest))).toEqual([]);
    // Never says the source is unavailable; the seats are told how to say they read it.
    const section = renderCarriedSection(manifest, repo);
    expect(section).toContain('not a sign the documents are unavailable');
    expect(section).toContain(`read directly from ${BYLAW_URL}`);
    expect(section).toContain('### YF-EV-0042: C00042.pdf (published at www.example.ca)');
  });

  it('is excluded when the site fetches it and no ground holds', async () => {
    const repo = publisherRepo({ rounds: false });
    const doc = (await buildPublisher(repo, publisherFetcher(BYLAW_PDF))).documents[0]!;
    expect(doc.status).toBe('excluded');
    expect(doc.reason).toMatch(/no two consecutive committed rounds/);
  });

  it('falls back to identical extracted text when the bytes differ, and packages only with a note', async () => {
    const repo = publisherRepo();
    const fresh = Buffer.from('%PDF-1.7 the same bylaw, re-saved by the publisher\n');
    const manifest = await buildPublisher(repo, publisherFetcher(fresh));
    const doc = manifest.documents[0]!;
    expect(doc.status, doc.reason).toBe('carried');
    expect(doc.publisher_check).toMatchObject({ identity: 'text', note: null, text_identity: { archive_text_sha256: sha256(BYLAW_TEXT), fresh_text_sha256: sha256(BYLAW_TEXT) } });
    expect(doc.second_download?.result).toBe('not made');
    const completed = complete(manifest);
    expect(refusalsFor(repo, completed)).toEqual([expect.stringMatching(/identical text counts only with a note/)]);
    completed.documents[0]!.publisher_check!.note = 'the publisher stamps a fresh creation date on every download; the consolidation date and every page were compared';
    expect(refusalsFor(repo, completed)).toEqual([]);
  });

  it('fails when neither the bytes nor the text match', async () => {
    const repo = publisherRepo();
    const doc = (await buildPublisher(repo, publisherFetcher(Buffer.from('%PDF-1.7 amended\n')), extractorFor('AMENDED BYLAW\n'))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.publisher_check?.identity).toBe('mismatch');
    expect(doc.reason).toMatch(/different bytes and different text/);
  });

  it('fails when the site cannot fetch it afresh', async () => {
    const repo = publisherRepo();
    const doc = (await buildPublisher(repo, publisherFetcher(Buffer.from('Bad Gateway'), 502))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/identified by that fetch/);
  });

  it('refuses a portal file named without its meeting page', async () => {
    const portal = 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=1';
    const repo = publisherRepo({ url: portal });
    const doc = (await buildPublisher(repo, publisherFetcher(BYLAW_PDF))).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.reason).toMatch(/is on the meeting portal; name its meeting page/);
  });

  it('refuses a public-open check made by the editor', async () => {
    const repo = publisherRepo();
    const completed = complete(await buildPublisher(repo, publisherFetcher(BYLAW_PDF)));
    completed.documents[0]!.public_open_check = { result: 'confirmed', checker: 'Stew', role: 'person (not the editor)', checked_on: hoursBefore(1), reason: null };
    expect(refusalsFor(repo, completed)).toEqual([expect.stringMatching(/the public-open check was made by the editor \(Stew\)/)]);
  });

  it('refuses at package time when a round the ground rests on changed after the build', async () => {
    const repo = publisherRepo();
    const completed = complete(await buildPublisher(repo, publisherFetcher(BYLAW_PDF)));
    writeFileSync(path.join(repo, RUN, 'round1', 'gpt.json'), JSON.stringify(answer(['Nothing to report.'])));
    expect(refusalsFor(repo, completed)).toEqual([expect.stringMatching(/round1\/gpt.json has changes not committed to HEAD/)]);
    git(repo, 'commit', '-q', '-am', 'answer edited');
    expect(refusalsFor(repo, completed)).toEqual([expect.stringMatching(/the two-round ground no longer holds/)]);
  });

  it('carries an html page as its visible text', async () => {
    const html = Buffer.from('<!doctype html><html><body><h1>Bylaw 42</h1><p>Four minutes each.</p></body></html>');
    const repo = publisherRepo({ archive: html });
    const doc = (await buildPublisher(repo, publisherFetcher(html))).documents[0]!;
    expect(doc.status, doc.reason).toBe('carried');
    expect(doc.kind).toBe('html');
    expect(doc.extraction?.text_sha256).toBe(sha256('Bylaw 42\nFour minutes each.\n'));
  });
});

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

const HEADER = '        Town of Example          Spring 2031 Supplemental Budget Adjustment            Attachment 9\n\n';
const footer = (page: number) => `\n\n                                   ${page}                 March 1, 2031 - Town Council | XYZ00001\n`;
/** An invented budget attachment in the layout of the City's: eight pages, two packages, one wrapped across two pages. */
function budgetText(filler = ''): string {
  const pages = [
    'Cover of the invented attachment\n',
    'Table of Contents\n\nSummary Part                                   3\n  Things Overview                              3\nService Packages                               4\n  Detailed Unfunded Service Packages           4\nSchedules                                      8\n',
    'Things Overview\nAll proposals at a glance   12   40\n',
    '',
    'Standalone Service Package - Lantern Repair for\nEvening Walkways\nBranch - Lights                                   Council Directed\nDescription\nLanterns on gravel walkways are repaired.\n\n($000)             2030     2031\nNew Budget         -        12\nTotal              -        -        12\n',
    'Integrated Service Package - Pond Skating Rink Flooding and\nMaintenance Program\nLead Branch - Parks                        Council Directed\nDescription\nFlooding of pond rinks during the frost months.\n',
    `Integrated Service Package - Pond Skating Rink Flooding and Maintenance\nProgram\n\nTotal\nincremental        2030       2031\n($000)             Exp        Net\nNew Budget          -          $40\nTotal               -          $40\n${filler}`,
    'Fee Schedules\nBoat launch permit                                $5.00\n',
  ];
  return pages.map((body, index) => `${HEADER}${body}${footer(index + 1)}\f`).join('');
}
const RULE = { version: 1, reason: 'test', terms: ['skating', 'frost'] };

describe('sections of a long document', () => {
  it('splits at the contents entries and the service packages, every page in one section', () => {
    const sections = parseSections(budgetText());
    expect(sections.map((s) => [s.number, s.kind, s.title, s.first_page, s.last_page])).toEqual([
      [1, 'front matter', 'Front matter', 1, 2],
      [2, 'part', 'Summary Part / Things Overview', 3, 3],
      [3, 'part', 'Service Packages / Detailed Unfunded Service Packages', 4, 4],
      [4, 'service package', 'Standalone Service Package - Lantern Repair for Evening Walkways', 5, 5],
      [5, 'service package', 'Integrated Service Package - Pond Skating Rink Flooding and Maintenance Program', 6, 7],
      [6, 'part', 'Schedules', 8, 8],
    ]);
  });

  it('reads a title wrapped at another word on its continuation page as the same title', () => {
    expect(packageHeading(`${HEADER}Integrated Service Package - Pond Skating Rink Flooding and Maintenance\nProgram\n\nTotal\n`)).toBe(
      'Integrated Service Package - Pond Skating Rink Flooding and Maintenance Program',
    );
  });

  it('stops on a package with no Total row, or no contents page', () => {
    expect(() => parseSections(budgetText().replace(/Total {14}- {8}- {8}12/, 'Sum 12'))).toThrow(/Lantern Repair .* is not whole: its last cost table has no "Total" row/);
    expect(() => parseSections(budgetText().replace('Table of Contents', 'Contents'))).toThrow(/no "Table of Contents" page/);
  });

  it('carries every matched section whole, in order, and lists every section in the inventory', () => {
    const { sections, text, pages } = carrySections(budgetText(), RULE);
    expect(pages).toBe(8);
    expect(sections.map((s) => [s.number, s.pages, s.carried, s.matched_terms])).toEqual([
      [1, '1-2', false, []],
      [2, '3', false, []],
      [3, '4', false, []],
      [4, '5', false, []],
      [5, '6-7', true, ['skating', 'frost']],
      [6, '8', false, []],
    ]);
    expect(text).toMatch(/^SECTION 5 \(pages 6-7\): Integrated Service Package - Pond Skating Rink Flooding and Maintenance Program\n\[page 6\]\n/);
    expect(text).toContain('[page 7]');
    expect(text).toContain('New Budget          -          $40');
    expect(text).not.toContain('Lanterns on gravel walkways');
    expect(tilingProblems(sections, pages)).toEqual([]);
    expect(tilingProblems([sections[0]!, { ...sections[1]!, pages: '4' }, ...sections.slice(2)], pages)).toEqual([
      'section 2 covers pages 4, expected to start at page 3',
      'section 3 covers pages 4, expected to start at page 5',
    ]);
  });
});

const SECTIONS_URL = 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=900001';
const MEETING_URL = 'https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=stub&lang=English';
const SECTIONS_PDF = Buffer.from('%PDF-1.7 invented budget attachment\n');
const meetingHtml = `<html><body><a href="filestream.ashx?DocumentId=900001" data-original-title='Attachment 9 - Budget.pdf'>A</a></body></html>`;

function sectionsRepoFor(rules: unknown[] = [RULE]): { repo: string; rulesFile: string } {
  const repo = mkdtempSync(path.join(root, 'sections-'));
  mkdirSync(path.join(repo, 'evidence', 'registry'), { recursive: true });
  mkdirSync(path.join(repo, 'evidence', 'private'), { recursive: true });
  mkdirSync(path.join(repo, RUN), { recursive: true });
  writeFileSync(path.join(repo, RUN, 'brief.md'), `# Brief\n\nAttachment 9 at ${SECTIONS_URL}.\n`);
  writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0901.pdf'), SECTIONS_PDF);
  writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0902.html'), meetingHtml);
  writeFileSync(
    path.join(repo, 'evidence', 'registry', 'YF-EV-0901.yaml'),
    YAML.stringify({ id: 'YF-EV-0901', title: 'Attachment 9', url: SECTIONS_URL, archive: { sha256: sha256(SECTIONS_PDF), path: 'evidence/private/YF-EV-0901.pdf' } }),
  );
  writeFileSync(
    path.join(repo, 'evidence', 'registry', 'YF-EV-0902.yaml'),
    YAML.stringify({ id: 'YF-EV-0902', title: 'Meeting', url: MEETING_URL, archive: { sha256: sha256(meetingHtml), path: 'evidence/private/YF-EV-0902.html' } }),
  );
  const rulesFile = path.join(repo, 'section-rules.yaml');
  writeFileSync(rulesFile, YAML.stringify({ versions: rules }));
  return { repo, rulesFile };
}

const sectionsFetcher: Fetcher = async (url) =>
  url === SECTIONS_URL
    ? { status: 403, contentType: 'text/html', headers: { 'cf-mitigated': 'challenge' } as Record<string, string>, body: '' }
    : { status: 200, contentType: 'text/html', headers: {} as Record<string, string>, body: meetingHtml };

const buildSections = (repo: string, rulesFile: string, text = budgetText()) =>
  buildCarryManifest({
    repoRoot: repo,
    runDir: RUN,
    sections: [{ id: 'YF-EV-0901', meetingPage: 'YF-EV-0902' }],
    sectionRulesFile: rulesFile,
    fetcher: sectionsFetcher,
    extractor: () => ({ version: 'pdftotext version 0.0.0-stub', text }),
    seatProbes: [],
    now: () => NOW,
  });


describe('a pdf-sections document, built and packaged', () => {
  const sectionsRepo = sectionsRepoFor;
  const build = buildSections;

  const refusals = (repo: string, rulesFile: string, manifest: CarryManifest, text = budgetText()) =>
    refusalsFor(repo, manifest, { sectionRulesFile: rulesFile, extractor: () => ({ version: 'stub', text }) });

  it('records the full inventory and the rule, never the text, and packages once every check passes', async () => {
    const { repo, rulesFile } = sectionsRepo();
    const manifest = await build(repo, rulesFile);
    const doc = manifest.documents[0]!;
    expect(doc.status, doc.reason).toBe('carried');
    expect(doc.sections).toHaveLength(6);
    expect(doc.sections!.every((s) => s.checker_reason === null)).toBe(true);
    expect(doc.document_text).toEqual({ pages: 8, bytes: Buffer.byteLength(budgetText()), sha256: sha256(budgetText()) });
    expect(manifest.section_rule).toMatchObject({ version: 1, terms: ['skating', 'frost'] });
    expect(manifest.package_budget?.result).toBe('within');
    expect(doc.completeness_check).toEqual({ result: 'pending', checker: null, role: null, missed_sections: [], context_check: { result: 'pending', findings: [] } });
    const written = YAML.stringify(manifest);
    expect(written).toContain('Lantern Repair for Evening Walkways');
    expect(written).not.toContain('Flooding of pond rinks');
    expect(refusals(repo, rulesFile, complete(manifest))).toEqual([]);
    const section = renderCarriedSection(manifest, repo);
    expect(section).toContain('## Selected sections of long documents');
    expect(section).toContain('- [carried] Section 5, pages 6-7: Integrated Service Package - Pond Skating Rink Flooding and Maintenance Program');
    expect(section).toContain('- Section 4, pages 5: Standalone Service Package - Lantern Repair for Evening Walkways');
    expect(section).toContain('what Council approved is in Council\'s own record');
  });

  it('refuses while the completeness or context check is pending, or a section has no reason', async () => {
    const { repo, rulesFile } = sectionsRepo();
    const manifest = await build(repo, rulesFile);
    const pending = complete(manifest);
    pending.documents[0]!.completeness_check!.context_check = { result: 'pending', findings: [] };
    pending.documents[0]!.sections![1]!.checker_reason = null;
    expect(refusals(repo, rulesFile, pending)).toEqual([
      'YF-EV-0901: the context check of the sections not carried is not done',
      'YF-EV-0901: 1 section(s) have no checker_reason (2)',
    ]);
    const found = complete(manifest);
    found.documents[0]!.completeness_check!.context_check = { result: 'fail', findings: ['section 4 holds a qualification'] };
    expect(refusals(repo, rulesFile, found)).toEqual([expect.stringMatching(/context check found material .*section 4 holds a qualification.*new section rule version/)]);
  });

  it('refuses a hand-edited inventory and a split section', async () => {
    const { repo, rulesFile } = sectionsRepo();
    const edited = complete(await build(repo, rulesFile));
    edited.documents[0]!.sections![3]! = { ...edited.documents[0]!.sections![3]!, carried: true, matched: true, matched_terms: ['frost'] };
    expect(refusals(repo, rulesFile, edited)).toEqual([expect.stringMatching(/section inventory does not match .* edited, or a section was split or cut/)]);
    const split = complete(await build(repo, rulesFile));
    split.documents[0]!.sections![4]!.pages = '6';
    expect(refusals(repo, rulesFile, split)).toEqual([
      expect.stringMatching(/section 6 covers pages 8, expected to start at page 7; a section is split, cut or edited/),
      expect.stringMatching(/section inventory does not match/),
    ]);
  });

  it('stops over the seat budget, and trims nothing', async () => {
    const { repo, rulesFile } = sectionsRepo();
    const long = budgetText(`${'frost line '.repeat(50_000)}\n`);
    const manifest = await build(repo, rulesFile, long);
    expect(manifest.package_budget?.result).toBe('over');
    expect(manifest.package_budget?.limit).toBe(521_838);
    expect(manifest.documents[0]!.extraction!.text_bytes).toBeGreaterThan(521_838);
    expect(refusals(repo, rulesFile, complete(manifest), long)).toEqual([expect.stringMatching(/over the 521838-byte seat budget; the run stops, nothing is trimmed/)]);
  });

  it('refuses a rule version that is not published', async () => {
    const { repo, rulesFile } = sectionsRepo();
    const manifest = complete(await build(repo, rulesFile));
    manifest.section_rule = { ...manifest.section_rule!, terms: ['skating'] };
    expect(refusals(repo, rulesFile, manifest)[0]).toMatch(/section rule is not published version 1/);
  });
});

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

describe('v1.43 labels', () => {
  const RUN_LABELS = 'reviews/fixture-story/2026-01-02';

  function labelRoot(documents: unknown[]): string {
    const dir = mkdtempSync(path.join(root, 'labels-'));
    mkdirSync(path.join(dir, RUN_LABELS, 'carried'), { recursive: true });
    writeFileSync(path.join(dir, RUN_LABELS, 'carried', 'manifest.yaml'), YAML.stringify({ documents }));
    return dir;
  }
  const row = (extra: Record<string, unknown>) => ({ registry_id: 'YF-EV-9101', status: 'carried', url: BYLAW_URL, archive: { sha256: 'b'.repeat(64) }, ...extra });

  it('says plainly what the reviewers saw and why, without calling the source unavailable', () => {
    expect(carriedLabelText({ kind: 'document', reason: 'portal' })).toBe(`${CARRIED_LABEL}. ${CARRIED_SAME_COPY}`);
    const twoRound = carriedLabelText({ kind: 'document', reason: 'two-round' });
    expect(twoRound).toBe(
      `The AI reviewers read our archived copy because their research tools failed to read it in two rounds in a row. ${CARRIED_TWO_ROUND_NOTE} ${CARRIED_NOT_INDEPENDENT}`,
    );
    expect(twoRound).not.toMatch(/(?<!does not mean the document )is unavailable|not available/);
    const sections = carriedLabelText({ kind: 'sections', reason: 'portal' });
    expect(sections).toMatch(/^The AI reviewers saw only the sections of this document that our published rule picked/);
    expect(sections).toContain(CARRIED_SECTIONS_REST);
    expect(sections).toContain(CARRIED_NOT_INDEPENDENT);
  });

  it('reads a two-round document and a sectioned document from the manifest', () => {
    const dir = labelRoot([
      row({ kind: 'pdf', eligibility: { ground: 'two-round seat failure' } }),
      row({ registry_id: 'YF-EV-9102', kind: 'pdf-sections', section_rule_version: 2, eligibility: { ground: 'fetcher challenge' }, url: 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=9' }),
    ]);
    const carried = carriedSources([RUN_LABELS], dir);
    expect(carried.get('YF-EV-9101')).toMatchObject({ kind: 'document', reason: 'two-round' });
    expect(carried.get('YF-EV-9102')).toMatchObject({ kind: 'sections', reason: 'portal', ruleVersion: 2 });
  });

  it('counts the carried sections from the manifest and says so in the label', () => {
    const dir = labelRoot([
      row({
        kind: 'pdf-sections',
        section_rule_version: 2,
        eligibility: { ground: 'fetcher challenge' },
        url: 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=9',
        sections: [{ carried: true }, { carried: false }, { carried: true }, { carried: false }, { carried: false }],
      }),
    ]);
    const source = carriedSources([RUN_LABELS], dir).get('YF-EV-9101')!;
    expect(source.sectionCounts).toEqual({ carried: 2, total: 5 });
    const text = carriedLabelText(source);
    expect(text).toMatch(/^The AI reviewers saw only 2 of this document’s 5 sections, picked by our published rule/);
    expect(text).toContain(CARRIED_SECTIONS_REST);
  });

  it.each([
    ['a pdf-sections row with no section rule version', { kind: 'pdf-sections' }],
    ['an unknown eligibility ground', { eligibility: { ground: 'source unavailable' } }],
  ])('fails the build on %s', (_label, extra) => {
    const dir = labelRoot([row(extra)]);
    expect(() => carriedSources([RUN_LABELS], dir)).toThrow(/documents\[0\] is carried but has a missing or invalid/);
  });

  it('renders the sections label with the full document, the rule and the inventory, kept out of search', async () => {
    const dir = labelRoot([row({ kind: 'pdf-sections', section_rule_version: 1, eligibility: { ground: 'fetcher challenge' } })]);
    const source = carriedSources([RUN_LABELS], dir).get('YF-EV-9101')!;
    const container = await AstroContainer.create();
    const html = await container.renderToString(CarriedLabel, { props: { source } });
    expect(html).toContain('data-carried-kind="sections"');
    expect(html).toContain('data-pagefind-ignore');
    expect(html).toContain(`href="${BYLAW_URL}"`);
    expect(html).toContain(`href="${SECTION_RULE_HREF}"`);
    expect(html).toContain('The rule (v1)');
    expect(html).toContain('Section inventory');
    expect(html).toContain(CARRIED_SECTIONS_REST);
  });

  it('renders the two-round label beside a document outside the portal', async () => {
    const dir = labelRoot([row({ kind: 'pdf', eligibility: { ground: 'two-round seat failure' } })]);
    const source = carriedSources([RUN_LABELS], dir).get('YF-EV-9101')!;
    const container = await AstroContainer.create();
    const html = await container.renderToString(CarriedLabel, { props: { source } });
    expect(html).toContain('data-carried-reason="two-round"');
    expect(html).toContain('data-pagefind-ignore');
    expect(html).toContain('failed to read it in two rounds in a row');
    expect(html).toContain('That was their tools failing. It does not mean');
    expect(html).toContain('>Original<');
  });
});

// ---------------------------------------------------------------------------
// Review findings on PR #117
// ---------------------------------------------------------------------------

describe('review findings: the two-round reader', () => {
  it('1. a direct read overrides a failure in the same sentence and anywhere else in that answer', () => {
    const same = `I read it directly from ${BYLAW_URL} after the first request returned HTTP 502.`;
    expect(readSeatAnswer(answer([same]), BYLAW_URL, ['bylaw'])).toEqual({ status: 'read', where: 'claims[0].limitations[0]', words: same });
    expect(readSeatAnswer(answer(['The bylaw PDF returned HTTP 502.', `Later I read it directly from ${BYLAW_URL}.`]), BYLAW_URL, ['bylaw']).status).toBe('read');
    const runDir = runDirFor();
    const readBoth = answer(['The bylaw PDF returned HTTP 502.', `Later I read it directly from ${BYLAW_URL}.`]);
    writeRounds(runDir, [twoFailedRounds[0]!, { ...twoFailedRounds[1]!, answers: { ...FAILED, gpt: readBoth } }]);
    const result = twoRoundGround(runDir, BYLAW_URL, ['bylaw'], BRIEF);
    // No pair of rounds has every seat failing: in round1 the gpt seat's answer is a direct read.
    expect(!result.ok && result.reason).toMatch(/round1: claude failed, gpt read, gpt-luna failed/);
  });

  it('2. counts a failure only when the sentence ties it to this document', () => {
    for (const sentence of [
      'The bylaw relies on Attachment 4, which returned HTTP 502.',
      'HTTP 502 came back for Attachment 4 and the bylaw.',
      'Bylaw 20226 returned HTTP 403.',
      'The meeting portal returned 403 Forbidden for the bylaw page.',
    ]) {
      expect(readSeatAnswer(answer([sentence]), BYLAW_URL, ['bylaw']), sentence).toEqual({ status: 'no record' });
    }
    const exact = 'The meeting portal returned 403 Forbidden, and the bylaw PDF returned 502 Bad Gateway.';
    expect(readSeatAnswer(answer([exact]), BYLAW_URL, ['bylaw'])).toEqual({ status: 'failed', where: 'claims[0].limitations[0]', words: exact, http_status: 502, error: null });
    // A declared numbered name is this document, not another one.
    expect(readSeatAnswer(answer(['Bylaw 42 returned HTTP 502.']), BYLAW_URL, ['Bylaw 42']).status).toBe('failed');
  });

  it('3. flat --into answers count only for a single-round run.yaml', () => {
    const write = (rounds: number[]) => {
      const runDir = runDirFor();
      const dir = path.join(runDir, 'round1-rerun');
      mkdirSync(dir, { recursive: true });
      const runs = rounds.flatMap((round, i) =>
        SEATS.map((seat) => ({ provider: seat.provider, round, model_id: seat.model, started_at: `2031-01-01T0${8 + i}:00:00Z`, status: 'ok' })),
      );
      writeFileSync(path.join(dir, 'run.yaml'), YAML.stringify({ story: STORY, date: RUN_DATE, runs }));
      for (const seat of SEATS) writeFileSync(path.join(dir, `${seat.file}.json`), JSON.stringify(FAILED[seat.file as keyof typeof FAILED]));
      writeRounds(runDir, [{ dir: '.', started: '2031-01-01T10:00:00Z', answers: FAILED }]);
      return runDir;
    };
    // Two round numbers over one flat set of answers: not two rounds, so only the root round counts.
    expect(twoRoundGround(write([1, 2]), BYLAW_URL, ['bylaw'], BRIEF)).toMatchObject({ ok: false });
    expect(twoRoundGround(write([1]), BYLAW_URL, ['bylaw'], BRIEF).ok).toBe(true);
  });

  it('4. refuses a nested run.yaml from another run', () => {
    const runDir = runDirFor();
    writeRounds(runDir, twoFailedRounds);
    const nested = path.join(runDir, 'superseded-2031-01-01', 'run.yaml');
    const parsed = YAML.parse(readFileSync(nested, 'utf8'));
    writeFileSync(nested, YAML.stringify({ ...parsed, story: 'other-story' }));
    const result = twoRoundGround(runDir, BYLAW_URL, ['bylaw'], BRIEF);
    expect(!result.ok && result.reason).toMatch(/superseded-2031-01-01\/run.yaml describes story "other-story"/);
  });
});

describe('review findings: section boundaries and contents', () => {
  it('5. stops on a package that starts mid-page or is not whole, and a repeated heading continues', () => {
    expect(() => parseSections(budgetText().replace('Standalone Service Package - Lantern', 'A note set above the package\nStandalone Service Package - Lantern'))).toThrow(
      /page 5: service package "Standalone Service Package - Lantern Repair for Evening Walkways" starts mid-page/,
    );
    expect(() => parseSections(budgetText().replace('Description\nLanterns', 'Lanterns'))).toThrow(/Lantern Repair .* is not whole: no description/);
    expect(() => parseSections(budgetText().replace('Total               -          $40\n', 'Total               -          $40\nNew Budget          -          $5\n'))).toThrow(
      /Pond Skating .* is not whole: its last cost table does not end in its "Total" row/,
    );
    expect(parseSections(budgetText()).find((s) => s.title.includes('Pond'))).toMatchObject({ first_page: 6, last_page: 7 });
  });

  const page = (body: string) => `${HEADER}${body}`;

  it('6. reads contents continued onto the next page, wrapped entries, and stops on a line it cannot read', () => {
    const marked = [page('Cover'), page('Table of Contents\nPart A                 4\n'), page('Table of Contents (continued)\nPart B                 5\n'), page('A'), page('B')];
    expect(tableOfContents(marked)).toEqual([{ title: 'Part A', page: 4 }, { title: 'Part B', page: 5 }]);
    const unmarked = [page('Cover'), page('Table of Contents\nPart A                 4\n'), page('Part B                 5\n'), page('A'), page('B')];
    expect(tableOfContents(unmarked)).toEqual([{ title: 'Part A', page: 4 }, { title: 'Part B', page: 5 }]);
    const wrapped = [page('Table of Contents\nA very long part title that\n   wraps onto here           2\n'), page('A')];
    expect(tableOfContents(wrapped)).toEqual([{ title: 'A very long part title that wraps onto here', page: 2 }]);
    const odd = [page('Table of Contents\nPart A                 2\nSee the appendix for more\n\nPart B      x\n'), page('A')];
    expect(() => tableOfContents(odd)).toThrow(/contents page 1: cannot read the line "Part B      x"/);
  });
});

describe('review findings: who makes the human checks', () => {
  it('7. refuses without an editor_session, a check by the editor session, a check with another role, and a context check by the editor', async () => {
    const repo = publisherRepo();
    const ready = complete(await buildPublisher(repo, publisherFetcher(BYLAW_PDF)));
    expect(refusalsFor(repo, ready)).toEqual([]);
    expect(refusalsFor(repo, { ...ready, editor_session: null })).toEqual([expect.stringMatching(/names no editor_session/)]);
    const bySession = structuredClone(ready);
    bySession.documents[0]!.extraction_check = { result: 'pass', checker: 'Editor Session 2031-01-02', role: 'independent checker' };
    expect(refusalsFor(repo, bySession)).toEqual([expect.stringMatching(/the extraction check was made by the editor/)]);
    const role = structuredClone(ready);
    role.documents[0]!.public_open_check!.role = 'editor';
    expect(refusalsFor(repo, role)).toEqual([expect.stringMatching(/the public-open check role is "editor"/)]);

    const { repo: sRepo, rulesFile } = sectionsRepoFor();
    const sections = complete(await buildSections(sRepo, rulesFile));
    sections.documents[0]!.completeness_check!.checker = sections.editor_session!;
    expect(refusalsFor(sRepo, sections, { sectionRulesFile: rulesFile, extractor: () => ({ version: 'stub', text: budgetText() }) })).toEqual([
      expect.stringMatching(/the completeness and context check was made by the editor/),
    ]);
  });

  it('8. allows "unable" with a reason only beside a matched publisher fetch, and the label says so', async () => {
    const repo = publisherRepo();
    const ready = complete(await buildPublisher(repo, publisherFetcher(BYLAW_PDF)));
    ready.documents[0]!.public_open_check = { result: 'unable', checker: null, role: null, checked_on: null, reason: 'no one outside the site was available before the run' };
    expect(refusalsFor(repo, ready)).toEqual([]);
    ready.documents[0]!.public_open_check!.reason = null;
    expect(refusalsFor(repo, ready)).toEqual([expect.stringMatching(/could not be made needs its reason/)]);

    const { repo: sRepo, rulesFile } = sectionsRepoFor();
    const portal = complete(await buildSections(sRepo, rulesFile));
    portal.documents[0]!.public_open_check = { result: 'unable', checker: null, role: null, checked_on: null, reason: 'none available' };
    expect(refusalsFor(sRepo, portal, { sectionRulesFile: rulesFile, extractor: () => ({ version: 'stub', text: budgetText() }) })).toEqual([
      expect.stringMatching(/may be "unable" only for a document outside the portal/),
    ]);

    const dir = mkdtempSync(path.join(root, 'labels-'));
    mkdirSync(path.join(dir, 'reviews/fixture-story/2026-01-03/carried'), { recursive: true });
    writeFileSync(
      path.join(dir, 'reviews/fixture-story/2026-01-03/carried/manifest.yaml'),
      YAML.stringify({ documents: [{ registry_id: 'YF-EV-9201', status: 'carried', kind: 'pdf', url: BYLAW_URL, archive: { sha256: 'c'.repeat(64) }, eligibility: { ground: 'two-round seat failure' }, public_open_check: { result: 'unable' } }] }),
    );
    const source = carriedSources(['reviews/fixture-story/2026-01-03'], dir).get('YF-EV-9201')!;
    expect(source.openUnconfirmed).toBe(true);
    expect(carriedLabelText(source)).toContain(CARRIED_OPEN_UNCONFIRMED);
  });

  it('9. fails the build on a v1.43 row with no eligibility ground, and lets a legacy portal row omit it', () => {
    const write = (doc: Record<string, unknown>) => {
      const dir = mkdtempSync(path.join(root, 'labels-'));
      mkdirSync(path.join(dir, 'reviews/fixture-story/2026-01-04/carried'), { recursive: true });
      writeFileSync(path.join(dir, 'reviews/fixture-story/2026-01-04/carried/manifest.yaml'), YAML.stringify({ documents: [doc] }));
      return () => carriedSources(['reviews/fixture-story/2026-01-04'], dir);
    };
    const base = { registry_id: 'YF-EV-9301', status: 'carried', archive: { sha256: 'd'.repeat(64) } };
    expect(write({ ...base, kind: 'pdf', url: BYLAW_URL })).toThrow(/missing or invalid eligibility ground "undefined"/);
    expect(write({ ...base, kind: 'html', url: BYLAW_URL })).toThrow(/eligibility ground/);
    expect(write({ ...base, kind: 'pdf', url: 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=1' })().get('YF-EV-9301')).toMatchObject({ reason: 'portal' });
  });
});

// ---------------------------------------------------------------------------
// Second review on PR #117
// ---------------------------------------------------------------------------

describe('second review: which document a URL names', () => {
  const PORTAL = 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=';

  it('never counts failures recorded for DocumentId=222 toward DocumentId=111', () => {
    const other = answer([`${PORTAL}222 returned HTTP 403.`], [{ finding: 'Direct opening returned a fetch error.', source_url: `${PORTAL}222` }]);
    expect(readSeatAnswer(other, `${PORTAL}111`, [])).toEqual({ status: 'no record' });
    expect(readSeatAnswer(answer([`${PORTAL}1110 returned HTTP 403.`]), `${PORTAL}111`, [])).toEqual({ status: 'no record' });
    expect(readSeatAnswer(answer([`${PORTAL}111 returned HTTP 403.`]), `${PORTAL}111`, [])).toMatchObject({ status: 'failed', http_status: 403 });
    const runDir = runDirFor();
    const at222 = answer([`${PORTAL}222 returned HTTP 403.`]);
    writeRounds(runDir, [
      { dir: 'superseded-2031-01-01', started: '2031-01-01T08:00:00Z', answers: { claude: at222, gpt: at222, 'gpt-luna': at222 } },
      { dir: '.', started: '2031-01-01T10:00:00Z', answers: { claude: at222, gpt: at222, 'gpt-luna': at222 } },
    ]);
    expect(twoRoundGround(runDir, `${PORTAL}111`, [], '').ok).toBe(false);
    expect(twoRoundGround(runDir, `${PORTAL}222`, [], '').ok).toBe(true);
  });

  it('normalises only the scheme, host case, a trailing slash and %26, and keeps the query string', () => {
    expect(sameDocumentUrl('HTTPS://PUB-EDMONTON.escribemeetings.com/filestream.ashx?DocumentId=111', `${PORTAL}111`)).toBe(true);
    expect(sameDocumentUrl('https://www.example.ca/a/b/?x=1%26y=2', 'https://www.example.ca/a/b?x=1&y=2')).toBe(true);
    expect(sameDocumentUrl(`${BYLAW_URL}?cb=1`, BYLAW_URL)).toBe(false);
    expect(sameDocumentUrl('https://www.example.ca/A.pdf', 'https://www.example.ca/a.pdf')).toBe(false);
  });
});

describe('second review: v1.43 manifests and contents continuation', () => {
  it('requires a ground on a portal pdf row of a v1.43 manifest, and not of a legacy one', () => {
    const write = (manifest: Record<string, unknown>) => {
      const dir = mkdtempSync(path.join(root, 'labels-'));
      mkdirSync(path.join(dir, 'reviews/fixture-story/2026-01-05/carried'), { recursive: true });
      writeFileSync(path.join(dir, 'reviews/fixture-story/2026-01-05/carried/manifest.yaml'), YAML.stringify(manifest));
      return () => carriedSources(['reviews/fixture-story/2026-01-05'], dir);
    };
    const row = { registry_id: 'YF-EV-9401', status: 'carried', kind: 'pdf', url: 'https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=1', archive: { sha256: 'e'.repeat(64) } };
    expect(write({ methodology_version: '1.43', documents: [row] })).toThrow(/missing or invalid eligibility ground "undefined"/);
    expect(write({ rule: 'methodology v1.43 (D-0046, D-0047, D-0048): carried documents', documents: [row] })).toThrow(/eligibility ground/);
    expect(write({ methodology_version: '1.43', documents: [{ ...row, eligibility: { ground: 'fetcher challenge' } }] })().get('YF-EV-9401')).toMatchObject({ reason: 'portal' });
    expect(write({ rule: 'methodology v1.41 (D-0046): carried documents', documents: [row] })().get('YF-EV-9401')).toMatchObject({ reason: 'portal' });
  });

  it('stamps the methodology version on every manifest it builds', async () => {
    const repo = publisherRepo();
    expect((await buildPublisher(repo, publisherFetcher(BYLAW_PDF))).methodology_version).toMatch(/^1\.\d+$/);
  });

  it('throws on a page after the contents that looks like contents but has a line it cannot explain', () => {
    const page = (body: string) => `${HEADER}${body}`;
    const pages = [page('Table of Contents\nPart A                 3\n'), page('Part B                 4\nA wrapped half of an entry\n\nNot an entry either\n'), page('A'), page('B')];
    expect(() => tableOfContents(pages)).toThrow(/contents page 2: "A wrapped half of an entry" is not followed by the rest of its entry|contents page 2: cannot read the line/);
    // A page with no entry-shaped line ends the contents.
    expect(tableOfContents([page('Table of Contents\nPart A                 2\n'), page('Some prose, no page numbers.\n')])).toEqual([{ title: 'Part A', page: 2 }]);
  });
});
