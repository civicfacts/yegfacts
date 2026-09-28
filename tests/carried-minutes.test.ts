/**
 * Carried minutes items (methodology v1.42, D-0047): reading an eScribe
 * meeting page into items, withholding members of the public, the published
 * selection rule, the item index, the completeness check, the claim gates,
 * package-time regeneration and seat-refusal eligibility.
 *
 * No network: the builder gets a stub fetcher and stub seat probes. The page
 * fixtures under tests/fixtures/minutes/ follow the markup of the City's agenda
 * and minutes pages with wholly invented content.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import YAML from 'yaml';
import { sha256 } from '../scripts/lib/repo.ts';
import {
  briefNaming,
  buildCarryManifest,
  gateCoverage,
  packageRefusals,
  renderCarriedSection,
  seatRefusalFor,
  type CarryManifest,
  type Fetcher,
} from '../scripts/panel/carry-manifest.ts';
import { REDACTION_RULE, WITHHELD, carriedPageText, matchedTerms, parseMeetingPage, selectionRules } from '../scripts/panel/minutes-items.ts';
import { RAW_LIMIT, classifyClaudeStream, classifyCodexStream, type SeatProbe } from '../scripts/panel/seat-probe.ts';

const FIXTURES = fileURLToPath(new URL('./fixtures/minutes', import.meta.url));
const MINUTES = readFileSync(path.join(FIXTURES, 'postminutes.html'), 'utf8');
const AGENDA = readFileSync(path.join(FIXTURES, 'agenda.html'), 'utf8');
const RULE = selectionRules().at(-1)!;

const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'yegfacts-minutes-')));
afterAll(() => rmSync(root, { recursive: true, force: true }));

const STORY = 'stub-story';
const RUN_DATE = '2026-09-09';
const RUN = `reviews/${STORY}/${RUN_DATE}`;
const CLAIM = 'every-vote-claim';
const MEETING_ID = '0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d';
const PAGE_URL = `https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=${MEETING_ID}&lang=English`;
const BRIEF = [
  '# Brief',
  '',
  'Minutes load at',
  '`https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=<meeting id>&lang=English`.',
  '',
  `Mobility Committee, 2031-03-04, meeting id \`${MEETING_ID}\`.`,
  '',
].join('\n');
const NOW = new Date('2026-09-28T12:00:00Z');
const hoursBefore = (hours: number) => new Date(NOW.getTime() - hours * 3_600_000).toISOString().replace(/\.\d{3}Z$/, 'Z');

describe('reading an eScribe meeting page', () => {
  it('reads the minutes header and every item, each with only its own text', () => {
    const page = parseMeetingPage(MINUTES);
    expect(page.layout).toBe('minutes');
    expect(page.header).toContain('Mobility Committee - Minutes');
    expect(page.header).toContain('March 4, 2031');
    expect(page.header).toMatch(/Present:\n- Q\. Okonkwo,\n- L\. Brandt,\n- and T\. Villeneuve/);
    // The decoy inside <script> is not an item.
    expect(page.items.map((item) => item.number)).toEqual(['1.', '1.2', '1.4', '1.5', '3.', '3.4', '3.5', '4.', '4.1', '4.2']);
    const item = page.items.find((i) => i.number === '3.4')!;
    expect(item.depth).toBe(2);
    expect(item.text).toContain('Report - MC00001.pdf');
    expect(item.text).toContain('Moved by: Q. Okonkwo');
    expect(item.text).toContain('In Favour (2) | Q. Okonkwo and L. Brandt');
    expect(item.text).toContain('Opposed (1) | T. Villeneuve');
    expect(item.text).toContain('Carried (2 to 1)');
    expect(item.text).not.toContain('Library Hours');
  });

  it('reads the agenda layout, whose items carry descriptions and no votes', () => {
    const page = parseMeetingPage(AGENDA);
    expect(page.layout).toBe('agenda');
    expect(page.items.map((item) => `${item.number} ${item.title}`)).toEqual([
      '3. Reports',
      '3.4 Active Transportation Implementation Acceleration Review',
      '3.5 Library Hours Survey',
    ]);
    expect(page.items[1]!.text).toContain('Recommendation: That the review be accepted.');
  });

  it('refuses a page that is not an eScribe meeting page', () => {
    expect(() => parseMeetingPage('<html><body><p>Hello</p></body></html>')).toThrow(/no AgendaHeader/);
  });
});

describe('withholding members of the public', () => {
  it('replaces listed public speakers and outside delegations, and the names in speaker-panel attachments', () => {
    const item = parseMeetingPage(MINUTES).items.find((i) => i.number === '3.4')!;
    expect(item.withheld).toBe(4);
    expect(item.text).toContain(`The following public speakers made presentations:\n- ${WITHHELD}\n- ${WITHHELD}, Riverside Walkers`);
    expect(item.text).toContain(`- ${WITHHELD}, Valley Transit Authority`);
    expect(item.text).toContain(`3.4 - Panel 1 ${WITHHELD}`);
    for (const name of ['R. Moss', 'P. Lindqvist', 'S. Haddad', 'MOSS']) expect(item.text).not.toContain(name);
  });

  it('never touches office-holders, Administration\'s delegation, motions or votes', () => {
    const page = parseMeetingPage(MINUTES);
    const item = page.items.find((i) => i.number === '3.4')!;
    // L. Brandt is an office-holder on the attendance list, so it stays even in a speaker list.
    expect(item.text).toMatch(/Riverside Walkers\n- L\. Brandt\n/);
    expect(item.text).toContain('- D. Achebe, Branch Manager');
    expect(item.text).toContain('Moved by: Q. Okonkwo');
    const motion = page.items.find((i) => i.number === '1.4')!;
    // Outside a Requests to Speak item, a name inside motion text is never changed.
    expect(motion.withheld).toBe(0);
    expect(motion.text).toContain('- R. Moss');
  });

  it('withholds the people listed in a Requests to Speak motion and keeps its operative words, items, mover and vote', () => {
    const item = parseMeetingPage(MINUTES).items.find((i) => i.number === '1.5')!;
    expect(item.withheld).toBe(2);
    expect(item.text).toContain('That Mobility Committee hear from the following speakers, in panels when appropriate:');
    expect(item.text).toContain('- 3.5 Library Hours Survey');
    expect(item.text).toContain(`${WITHHELD}, Harbour Readers Society`);
    expect(item.text).not.toContain('K. Farouk');
    expect(item.text).not.toContain('J. Oyelaran');
    // An office-holder in the list keeps the name, and the vote is untouched.
    expect(item.text).toContain('- T. Villeneuve');
    expect(item.text).toContain('Moved by: T. Villeneuve');
    expect(item.text).toContain('In Favour (3) | Q. Okonkwo, L. Brandt, and T. Villeneuve');
    expect(item.text).toContain('Carried (3 to 0)');
  });

  it('keeps every name when asked for the page as published', () => {
    const item = parseMeetingPage(MINUTES, { withhold: false }).items.find((i) => i.number === '3.4')!;
    expect(item.withheld).toBe(0);
    expect(item.text).toContain('- R. Moss');
    expect(item.text).toContain('3.4 - Panel 1 - R. MOSS.pdf');
  });
});

describe('the selection rule', () => {
  it('matches case-insensitively on number, title and text, with digit boundaries for numeric terms', () => {
    const page = parseMeetingPage(MINUTES);
    const matched = Object.fromEntries(page.items.map((item) => [item.number, matchedTerms(item, RULE)]));
    expect(matched['1.4']).toEqual(['Active Transportation Implementation Acceleration']);
    expect(matched['3.4']).toEqual(['Active Transportation Implementation Acceleration', 'Active Transportation Network Expansion']);
    expect(matched['4.1']).toEqual(['bike']);
    // "Bylaw 203945" does not contain the term 20394.
    expect(matched['4.2']).toEqual([]);
    expect(matched['3.5']).toEqual([]);
  });

  it('carries the header, the roll call and every matched item whole, and nothing else', () => {
    const text = carriedPageText(parseMeetingPage(MINUTES), RULE);
    expect(text.startsWith('MEETING HEADER\nMobility Committee - Minutes')).toBe(true);
    expect(text).toContain('ATTENDANCE (item 1.2)');
    expect(text).toContain('Councillor T. Villeneuve left the meeting at noon.');
    expect([...text.matchAll(/^ITEM (\S+)$/gm)].map((m) => m[1])).toEqual(['1.4', '3.4', '4.1']);
    expect(text).toContain('Lost (1 to 2)');
    expect(text).not.toContain('Library Hours');
    expect(text).not.toContain('Storm Sewer');
  });

  it('publishes version 1 with the D-0047 terms', () => {
    const [first] = selectionRules();
    expect(first!.version).toBe(1);
    expect(first!.terms).toEqual([
      'CM-20-0330',
      'IS03688',
      'Active Transportation Implementation Acceleration',
      'Active Transportation Network Expansion',
      '20394',
      '21265',
      'bike',
      'cycling',
    ]);
  });
});

describe('carrying a meeting page as items', { timeout: 60_000 }, () => {
  const git = (repo: string, ...args: string[]) =>
    execFileSync('git', ['-C', repo, '-c', 'user.name=test', '-c', 'user.email=test', ...args], { stdio: 'ignore' });

  function fixtureRepo(options: { gates?: string[] } = { gates: [CLAIM] }): string {
    const repo = mkdtempSync(path.join(root, 'repo-'));
    mkdirSync(path.join(repo, 'evidence', 'registry'), { recursive: true });
    mkdirSync(path.join(repo, 'evidence', 'private'), { recursive: true });
    mkdirSync(path.join(repo, RUN, 'carried'), { recursive: true });
    writeFileSync(path.join(repo, RUN, 'brief.md'), BRIEF);
    if (options.gates) writeFileSync(path.join(repo, RUN, 'carried', 'gates.yaml'), YAML.stringify({ claims: options.gates }));
    writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0001-Meeting.aspx'), MINUTES);
    writeFileSync(
      path.join(repo, 'evidence', 'registry', 'YF-EV-0001.yaml'),
      YAML.stringify({
        id: 'YF-EV-0001',
        title: 'Mobility Committee minutes',
        url: PAGE_URL,
        retrieved_on: '2026-09-25',
        archive: { sha256: sha256(MINUTES), path: 'evidence/private/YF-EV-0001-Meeting.aspx' },
      }),
    );
    git(repo, 'init', '-q');
    return repo;
  }

  /** The site's fetcher reads meeting pages (HTTP 200); the seats' tools do not. */
  const fetcher = (body = MINUTES): Fetcher => async () => ({ status: 200, contentType: 'text/html', headers: {}, body });

  const seatProbe = (over: Partial<SeatProbe> = {}): SeatProbe => ({
    url: PAGE_URL,
    seat: 'claude',
    model: 'claude-opus-5-5',
    tool: 'WebFetch',
    cli_version: 'stub',
    probed_at: hoursBefore(1),
    outcome: 'refused',
    http_status: 403,
    tool_url: PAGE_URL,
    raw_error: 'The server returned HTTP 403 Forbidden.',
    ...over,
  });

  const build = (repo: string, options: Partial<Parameters<typeof buildCarryManifest>[0]> = {}) =>
    buildCarryManifest({
      repoRoot: repo,
      runDir: RUN,
      minutes: ['YF-EV-0001'],
      fetcher: fetcher(),
      seatProbes: [seatProbe()],
      now: () => NOW,
      ...options,
    });

  const manifestFile = (repo: string) => path.join(repo, RUN, 'carried', 'manifest.yaml');

  /** Every human check filled in as passing, so one missing piece at a time can be tested. */
  function completeChecks(manifest: CarryManifest, gate: 'parked' | 'pending' = 'parked'): CarryManifest {
    const copy = structuredClone(manifest);
    for (const doc of copy.documents.filter((d) => d.status === 'carried')) {
      doc.download_provenance = { downloaded_by: 'the site fetcher', downloaded_on: '2026-09-25', via: 'site fetcher' };
      doc.public_open_check = { checked_by: 'a separate session', checked_on: hoursBefore(2) };
      doc.personal_information_screen = { result: 'clear', reviewer: 'a separate session' };
      doc.completeness_check = { result: 'pass', reviewer: 'a separate session', missed_items: [] };
      for (const item of doc.items ?? []) item.checker_reason = item.carried ? 'a vote on the program' : 'not about the program';
    }
    copy.gates![`claim:${CLAIM}`] = { result: gate, reviewer: gate === 'pending' ? null : 'a separate session', reconciliation_file: null };
    return copy;
  }

  const refusals = (repo: string, manifest: CarryManifest) =>
    packageRefusals(manifest, { repoRoot: repo, runDir: path.join(repo, RUN), manifestPath: manifestFile(repo), now: NOW });

  /** A committed reconciliation file and a gate passed on it, as `pass-gate` writes one. */
  function passGate(repo: string, manifest: CarryManifest, votes: unknown = [
    { meeting: 'Mobility Committee 2031-03-04', item: '3.4', motion: 'routes proceed', result: 'Carried', votes: { 'Q. Okonkwo': 'yes', 'T. Villeneuve': 'no' } },
  ]): CarryManifest {
    const rel = path.join(RUN, 'carried', 'votes.yaml');
    writeFileSync(path.join(repo, rel), YAML.stringify(votes));
    git(repo, 'add', rel);
    git(repo, 'commit', '-q', '-m', 'votes');
    const copy = completeChecks(manifest);
    copy.gates![`claim:${CLAIM}`] = {
      result: 'pass',
      reviewer: 'a separate session',
      reconciliation_file: rel,
      reconciliation_sha256: sha256(readFileSync(path.join(repo, rel))),
      covered: gateCoverage(copy.documents, copy.selection_rule!.version),
    };
    return copy;
  }

  it('names a meeting page by the brief\'s URL template and meeting id', () => {
    expect(briefNaming(BRIEF, PAGE_URL)).toBe('template + meeting id at line 6');
    expect(briefNaming(BRIEF.replace(MEETING_ID, 'another'), PAGE_URL)).toBeUndefined();
    expect(briefNaming(BRIEF.replace('Agenda=PostMinutes&Id=<meeting id>', 'Agenda=Agenda&Id=<meeting id>'), PAGE_URL)).toBeUndefined();
  });

  it('carries a page a seat was refused at, with the full item index, the rules, the withheld counts and the gate from gates.yaml', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo);
    const doc = manifest.documents[0]!;
    expect(doc.status, doc.reason).toBe('carried');
    expect(doc.kind).toBe('minutes-items');
    expect(doc.eligibility).toMatchObject({ ground: 'seat refusal', seat: 'claude', tool: 'WebFetch', http_status: 403 });
    expect(doc.page_check?.result).toBe('pass');
    expect(doc.rule_version).toBe(1);
    expect(doc.redaction_version).toBe(REDACTION_RULE.version);
    expect(doc.items!.map((i) => [i.number, i.carried, i.withheld, i.checker_reason])).toEqual([
      ['1.', false, 0, null],
      ['1.2', false, 0, null],
      ['1.4', true, 0, null],
      ['1.5', false, 2, null],
      ['3.', false, 0, null],
      ['3.4', true, 4, null],
      ['3.5', false, 0, null],
      ['4.', false, 0, null],
      ['4.1', true, 0, null],
      ['4.2', false, 0, null],
    ]);
    expect(manifest.selection_rule).toMatchObject({ version: 1, terms: RULE.terms });
    expect(manifest.redaction_rule).toEqual({ version: REDACTION_RULE.version, rule: REDACTION_RULE.rule });
    expect(manifest.gates).toEqual({ [`claim:${CLAIM}`]: { result: 'pending', reviewer: null, reconciliation_file: null } });
    const text = readFileSync(path.join(repo, doc.extraction!.text_file), 'utf8');
    expect(sha256(text)).toBe(doc.extraction!.text_sha256);
    expect(text).not.toContain('P. Lindqvist');
    const written = readFileSync(manifestFile(repo), 'utf8');
    expect(written).toContain('there is no way to add one by hand');
    expect(written).not.toContain('Lost (1 to 2)');
  });

  it('excludes a page the fetcher reads when no seat refusal is on the record', async () => {
    const repo = fixtureRepo();
    const doc = (await build(repo, { seatProbes: [] })).documents[0]!;
    expect(doc.status).toBe('excluded');
    expect(doc.reason).toMatch(/records no seat refusal there in the last 6 hours/);
  });

  it('fails a page whose live copy changed a vote under the same title', async () => {
    const repo = fixtureRepo();
    const changed = MINUTES.replace('Carried (2 to 1)', 'Lost (1 to 2)');
    const doc = (await build(repo, { fetcher: fetcher(changed) })).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.page_check?.result).toBe('fail');
    expect(doc.reason).toMatch(/has changed since it was archived \(item 3\.4\); archive it again/);
  });

  it('refuses to package while the completeness check is missing, and passes once every check is in', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo);
    expect(refusals(repo, manifest)).toEqual(
      expect.arrayContaining([
        'YF-EV-0001: completeness check not done',
        expect.stringMatching(/^YF-EV-0001: 10 item\(s\) have no checker_reason/),
        `gate claim:${CLAIM} is pending`,
      ]),
    );
    const ready = completeChecks(manifest);
    expect(refusals(repo, ready)).toEqual([]);
    const noCheck = structuredClone(ready);
    delete noCheck.documents[0]!.completeness_check;
    expect(refusals(repo, noCheck)).toContain('YF-EV-0001: completeness check not done');
  });

  it('refuses an item with no checker reason, a missed item, and an item carried against the rule', async () => {
    const repo = fixtureRepo();
    const ready = completeChecks(await build(repo));

    const unexplained = structuredClone(ready);
    unexplained.documents[0]!.items!.find((i) => i.number === '3.4')!.checker_reason = null;
    expect(refusals(repo, unexplained)).toEqual([expect.stringMatching(/1 item\(s\) have no checker_reason \(3\.4\)/)]);

    const missed = structuredClone(ready);
    missed.documents[0]!.completeness_check = { result: 'pass', reviewer: 'a separate session', missed_items: ['3.5'] };
    expect(refusals(repo, missed)).toEqual([expect.stringMatching(/lists missed items \(3\.5\); publish a new rule version and rebuild/)]);

    const byHand = structuredClone(ready);
    byHand.documents[0]!.items!.find((i) => i.number === '3.5')!.carried = true;
    expect(refusals(repo, byHand)).toEqual(
      expect.arrayContaining([expect.stringMatching(/items 3\.5 are carried differently from the rule/)]),
    );
  });

  it('regenerates the page at package time and refuses a trimmed text or an index edited on both sides', async () => {
    const repo = fixtureRepo();
    const ready = completeChecks(await build(repo));
    const doc = ready.documents[0]!;
    const textFile = path.join(repo, doc.extraction!.text_file);
    const original = readFileSync(textFile, 'utf8');

    // A vote trimmed from the text, with the manifest's hash updated to match.
    const trimmed = original.replace('Opposed (1) | T. Villeneuve\n', '');
    writeFileSync(textFile, trimmed);
    const rehashed = structuredClone(ready);
    rehashed.documents[0]!.extraction!.text_sha256 = sha256(trimmed);
    expect(refusals(repo, rehashed)).toEqual([
      "YF-EV-0001: the regenerated carried text does not match the manifest's text_sha256",
      'YF-EV-0001: the carried text file is not the text the rule selects from the archived page',
    ]);
    writeFileSync(textFile, original);

    // An item marked matched and carried, on both sides, to slip past the rule.
    const both = structuredClone(ready);
    const item = both.documents[0]!.items!.find((i) => i.number === '3.5')!;
    item.matched = true;
    item.carried = true;
    expect(refusals(repo, both)).toEqual(['YF-EV-0001: the item index does not match the one the rule gives for the archived page']);
    expect(refusals(repo, ready)).toEqual([]);
  });

  it('refuses a missing required gate and a pending one, and passes a parked one while telling the seats', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo);
    const missing = completeChecks(manifest);
    delete missing.gates![`claim:${CLAIM}`];
    expect(refusals(repo, missing)).toEqual([`gate claim:${CLAIM} is required by gates.yaml and missing from the manifest`]);
    expect(refusals(repo, completeChecks(manifest, 'pending'))).toEqual([`gate claim:${CLAIM} is pending`]);
    const parked = completeChecks(manifest, 'parked');
    expect(refusals(repo, parked)).toEqual([]);
    const section = renderCarriedSection(parked, repo);
    expect(section).toContain(`**Claim \`${CLAIM}\` is parked for this run.**`);
    expect(section).toContain('leave it out of your `claims` array');
  });

  it('builds no gate without gates.yaml, whatever the claim', async () => {
    const repo = fixtureRepo({});
    const manifest = await build(repo);
    expect(manifest.gates).toBeUndefined();
    expect(refusals(repo, completeChecks({ ...manifest, gates: {} }))).toEqual([]);
  });

  it('passes a gate only on a tracked, well-formed reconciliation file under the run, bound to its hash', async () => {
    const repo = fixtureRepo();
    const passed = passGate(repo, await build(repo));
    expect(refusals(repo, passed)).toEqual([]);

    const changedFile = structuredClone(passed);
    changedFile.gates![`claim:${CLAIM}`]!.reconciliation_sha256 = 'f'.repeat(64);
    expect(refusals(repo, changedFile)).toEqual([`gate claim:${CLAIM}: the reconciliation file has changed since the gate passed`]);

    const outside = structuredClone(passed);
    outside.gates![`claim:${CLAIM}`]!.reconciliation_file = 'evidence/registry/YF-EV-0001.yaml';
    expect(refusals(repo, outside)[0]).toMatch(/is not inside reviews\/stub-story\/2026-09-09\/carried/);

    const untrackedRel = path.join(RUN, 'carried', 'untracked.yaml');
    writeFileSync(path.join(repo, untrackedRel), readFileSync(path.join(repo, RUN, 'carried', 'votes.yaml')));
    const untracked = structuredClone(passed);
    untracked.gates![`claim:${CLAIM}`]!.reconciliation_file = untrackedRel;
    expect(refusals(repo, untracked)).toEqual([`gate claim:${CLAIM}: ${untrackedRel} is not tracked by git`]);
  });

  it('refuses an empty reconciliation list and a vote with no per-member map', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo);
    expect(refusals(repo, passGate(repo, manifest, []))).toEqual([
      `gate claim:${CLAIM}: ${path.join(RUN, 'carried', 'votes.yaml')} must be a non-empty list of votes`,
    ]);
    const noVotes = [{ meeting: 'm', item: '3.4', motion: 'x', result: 'Carried' }];
    expect(refusals(repo, passGate(repo, manifest, noVotes))).toEqual([
      `gate claim:${CLAIM}: ${path.join(RUN, 'carried', 'votes.yaml')}: vote 1 needs a per-member votes map`,
    ]);
  });

  it('puts a passed gate back to pending when a new rule version changes the carried evidence', async () => {
    const repo = fixtureRepo();
    const passed = passGate(repo, await build(repo));
    writeFileSync(manifestFile(repo), YAML.stringify(passed));

    const unchanged = await build(repo);
    expect(unchanged.gates![`claim:${CLAIM}`]!.result).toBe('pass');
    expect(unchanged.documents[0]!.completeness_check?.result).toBe('pass');

    const rulesFile = path.join(repo, 'rules.yaml');
    writeFileSync(
      rulesFile,
      YAML.stringify({ versions: [...selectionRules(), { version: 2, reason: 'the checker found 3.5', terms: [...RULE.terms, 'Library Hours'] }] }),
    );
    const revised = await build(repo, { rulesFile, ruleVersion: 2 });
    expect(revised.gates![`claim:${CLAIM}`]).toMatchObject({ result: 'pending', note: 'reset: the carried evidence changed since the gate passed' });
    const doc = revised.documents[0]!;
    expect(doc.items!.filter((i) => i.carried).map((i) => i.number)).toEqual(['1.4', '1.5', '3.4', '3.5', '4.1']);
    expect(doc.completeness_check?.result).toBe('pending');
    expect(revised.rule_revisions!.map((r) => r.version)).toEqual([1, 2]);

    // A stale pass carried into the new manifest by hand is refused at package time.
    const stale = completeChecks(revised);
    stale.gates![`claim:${CLAIM}`] = passed.gates![`claim:${CLAIM}`]!;
    expect(
      packageRefusals(stale, { repoRoot: repo, runDir: path.join(repo, RUN), manifestPath: manifestFile(repo), now: NOW, rulesFile }),
    ).toContain(`gate claim:${CLAIM}: the carried evidence has changed since the gate passed; rebuild and pass it again`);
  });

  it('tells the seats the items were selected under the printed rule, the rest was not carried, and names were withheld', async () => {
    const repo = fixtureRepo();
    const section = renderCarriedSection(completeChecks(await build(repo)), repo);
    expect(section).toContain('## Selected items from City meeting pages');
    expect(section).toContain('The rest of each page was not carried.');
    expect(section).toContain('Selection rule, version 1:');
    expect(section).toContain(`Names of members of the public in these items were withheld and replaced with "${WITHHELD}" (redaction rule version 2)`);
    expect(section).toContain('Agendas show what was scheduled; minutes are the record of decisions and votes.');
    expect(section).toContain('- Items carried: 1.4, 3.4, 4.1 (3 of 10)');
    expect(section).toContain(`- Page SHA-256: ${sha256(MINUTES)}`);
    expect(section).not.toContain('Mobility Committee minutes');
  });
});

describe('seat refusal evidence', () => {
  const probe = (over: Partial<SeatProbe> = {}): SeatProbe => ({
    url: PAGE_URL,
    seat: 'claude',
    model: 'claude-opus-5-5',
    tool: 'WebFetch',
    cli_version: 'stub',
    probed_at: hoursBefore(1),
    outcome: 'refused',
    http_status: 403,
    tool_url: PAGE_URL,
    raw_error: 'The server returned HTTP 403 Forbidden.',
    ...over,
  });

  it('accepts a fresh refusal, and refuses a stale one or one dated in the future', () => {
    expect(seatRefusalFor([probe()], PAGE_URL, NOW)?.seat).toBe('claude');
    expect(seatRefusalFor([probe({ probed_at: hoursBefore(7) })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ probed_at: hoursBefore(-1) })], PAGE_URL, NOW)).toBeUndefined();
  });

  it('matches the tool\'s own request URL, allowing only %26 for &', () => {
    expect(seatRefusalFor([probe({ tool_url: PAGE_URL.replace(/&/g, '%26') })], PAGE_URL, NOW)).toBeDefined();
    expect(seatRefusalFor([probe({ tool_url: 'https://pub-edmonton.escribemeetings.com/' })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ tool_url: null })], PAGE_URL, NOW)).toBeUndefined();
  });

  it('requires the pinned seat, model and tool', () => {
    expect(seatRefusalFor([probe({ model: 'claude-other' })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ tool: 'WebSearch' })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ seat: 'gpt' })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ seat: 'gpt', model: 'gpt-6-sol', tool: 'web_search open_page' })], PAGE_URL, NOW)).toBeDefined();
  });

  it('does not count a refusal with neither a status nor an error message, or an unclear outcome', () => {
    expect(seatRefusalFor([probe({ http_status: null, raw_error: null })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ outcome: 'unclear' })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ outcome: 'fetched', raw_error: null })], PAGE_URL, NOW)).toBeUndefined();
  });

  it('reads the status Claude\'s WebFetch reports, keeps at most 300 characters of its message, and never keeps page text', () => {
    const stream = (code: number, result: string) =>
      [
        JSON.stringify({ type: 'assistant', message: { content: [{ type: 'tool_use', id: 't1', name: 'WebFetch', input: { url: PAGE_URL } }] } }),
        JSON.stringify({ type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: 't1', content: result }] }, tool_use_result: { code, result } }),
        JSON.stringify({ type: 'result', result: 'It worked fine.' }),
      ].join('\n');
    const refused = classifyClaudeStream(stream(403, `The server returned HTTP 403 Forbidden. ${'x'.repeat(500)}`));
    expect(refused).toMatchObject({ outcome: 'refused', http_status: 403, tool_url: PAGE_URL });
    expect(refused.raw_error!.length).toBe(RAW_LIMIT);
    expect(classifyClaudeStream(stream(200, 'Page text about an error 403 elsewhere'))).toEqual({
      outcome: 'fetched',
      http_status: 200,
      tool_url: PAGE_URL,
      raw_error: null,
    });
    expect(classifyClaudeStream(JSON.stringify({ type: 'result', result: 'HTTP 403' })).outcome).toBe('no-tool-call');
  });

  it('classifies a Codex open_page from its own failure fields only, never from result titles or snippets', () => {
    const event = (extra: Record<string, unknown>) =>
      JSON.stringify({
        type: 'item.completed',
        item: {
          type: 'web_search',
          action: { type: 'open_page', url: PAGE_URL },
          results: [{ type: 'text_result', title: 'Internal Error: access denied, blocked', snippet: 'HTTP 403 Forbidden' }],
          ...extra,
        },
      });
    expect(classifyCodexStream(event({}))).toEqual({ outcome: 'unclear', http_status: null, tool_url: PAGE_URL, raw_error: null });
    expect(classifyCodexStream(event({ status: 403 }))).toEqual({ outcome: 'refused', http_status: 403, tool_url: PAGE_URL, raw_error: null });
    const errored = classifyCodexStream(event({ error: `fetch failed ${'y'.repeat(400)}` }));
    expect(errored.outcome).toBe('refused');
    expect(errored.raw_error!.length).toBe(RAW_LIMIT);
    expect(JSON.stringify(errored)).not.toContain('Internal Error');
    expect(classifyCodexStream(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: 'HTTP 403' } })).outcome).toBe('no-tool-call');
  });
});
