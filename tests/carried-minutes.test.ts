/**
 * Carried minutes items (methodology v1.42, D-0047): reading an eScribe
 * meeting page into items, the published selection rule, the item index, the
 * completeness check, the claim gate and seat-refusal eligibility.
 *
 * No network: the builder gets a stub fetcher and stub seat probes. The page
 * fixtures under tests/fixtures/minutes/ keep the real markup of the City's
 * agenda and minutes pages, trimmed to a few items.
 */
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
  packageRefusals,
  renderCarriedSection,
  seatRefusalFor,
  type CarryManifest,
  type Fetcher,
} from '../scripts/panel/carry-manifest.ts';
import { carriedPageText, matchedTerms, parseMeetingPage, selectionRules } from '../scripts/panel/minutes-items.ts';
import { classifyClaudeStream, classifyCodexStream, type SeatProbe } from '../scripts/panel/seat-probe.ts';

const FIXTURES = fileURLToPath(new URL('./fixtures/minutes', import.meta.url));
const MINUTES = readFileSync(path.join(FIXTURES, 'postminutes.html'), 'utf8');
const AGENDA = readFileSync(path.join(FIXTURES, 'agenda.html'), 'utf8');
const RULE = selectionRules().at(-1)!;

const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'yegfacts-minutes-')));
afterAll(() => rmSync(root, { recursive: true, force: true }));

const STORY = 'stub-story';
const RUN_DATE = '2026-09-09';
const RUN = `reviews/${STORY}/${RUN_DATE}`;
const MEETING_ID = '55300824-2d70-4b6a-a504-df43ace1c6b4';
const PAGE_URL = `https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=${MEETING_ID}&lang=English`;
const BRIEF = [
  '# Brief',
  '',
  'Minutes load at',
  '`https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=<meeting id>&lang=English`.',
  '',
  `Infrastructure Committee, 2026-08-26, meeting id \`${MEETING_ID}\`.`,
  '',
].join('\n');
const NOW = new Date('2026-09-28T12:00:00Z');
const hoursBefore = (hours: number) => new Date(NOW.getTime() - hours * 3_600_000).toISOString().replace(/\.\d{3}Z$/, 'Z');

describe('reading an eScribe meeting page', () => {
  it('reads the minutes header and every item, each with only its own text', () => {
    const page = parseMeetingPage(MINUTES);
    expect(page.layout).toBe('minutes');
    expect(page.header).toContain('Infrastructure Committee - Minutes');
    expect(page.header).toContain('August 26, 2026');
    expect(page.header).toMatch(/Present:\n- E\. Rutherford,\n- A\. Salvador,\n- and A\. Paquette/);
    expect(page.header).not.toContain('Edmonton Logo');
    // The decoy inside <script> is not an item.
    expect(page.items.map((item) => item.number)).toEqual(['1.', '1.2', '1.4', '7.', '7.6', '7.7', '8.', '8.1', '8.2']);
    const item = page.items.find((i) => i.number === '7.6')!;
    expect(item.title).toBe('Active Transportation Implementation Acceleration Program Update');
    expect(item.depth).toBe(2);
    expect(item.text).toContain('Report - IS03688.pdf');
    expect(item.text).toContain('Moved by: A. Salvador');
    expect(item.text).toContain('In Favour (2) | E. Rutherford and A. Salvador');
    expect(item.text).toContain('Opposed (1) | A. Paquette');
    expect(item.text).toContain('Carried (2 to 1)');
    expect(item.text).not.toContain('Snow Clearing');
  });

  it('reads the agenda layout, whose items carry descriptions and no votes', () => {
    const page = parseMeetingPage(AGENDA);
    expect(page.layout).toBe('agenda');
    expect(page.items.map((item) => `${item.number} ${item.title}`)).toEqual([
      '7. Reports',
      '7.6 Active Transportation Implementation Acceleration Program Update',
      '7.7 Snow Clearing Update',
    ]);
    expect(page.items[1]!.text).toContain('Recommendation: That the updated approach, as outlined in Attachment 5, be approved.');
  });

  it('refuses a page that is not an eScribe meeting page', () => {
    expect(() => parseMeetingPage('<html><body><p>Hello</p></body></html>')).toThrow(/no AgendaHeader/);
  });
});

describe('the selection rule', () => {
  it('matches case-insensitively on number, title and text, with digit boundaries for numeric terms', () => {
    const page = parseMeetingPage(MINUTES);
    const matched = Object.fromEntries(page.items.map((item) => [item.number, matchedTerms(item, RULE)]));
    expect(matched['1.4']).toEqual(['Active Transportation Implementation Acceleration']);
    expect(matched['7.6']).toEqual(['IS03688', 'Active Transportation Implementation Acceleration', 'Active Transportation Network Expansion']);
    expect(matched['8.1']).toEqual(['bike']);
    // "Bylaw 203945" does not contain the term 20394.
    expect(matched['8.2']).toEqual([]);
    expect(matched['7.7']).toEqual([]);
  });

  it('carries the header, the roll call and every matched item whole, and nothing else', () => {
    const text = carriedPageText(parseMeetingPage(MINUTES), RULE);
    expect(text.startsWith('MEETING HEADER\nInfrastructure Committee - Minutes')).toBe(true);
    expect(text).toContain('ATTENDANCE (item 1.2)');
    expect(text).toContain('Councillor A. Paquette was absent with notice');
    expect([...text.matchAll(/^ITEM (\S+)$/gm)].map((m) => m[1])).toEqual(['1.4', '7.6', '8.1']);
    expect(text).toContain('Lost (1 to 2)');
    expect(text).not.toContain('Snow Clearing');
    expect(text).not.toContain('Drainage Borrowing');
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
  function fixtureRepo(): string {
    const repo = mkdtempSync(path.join(root, 'repo-'));
    mkdirSync(path.join(repo, 'evidence', 'registry'), { recursive: true });
    mkdirSync(path.join(repo, 'evidence', 'private'), { recursive: true });
    mkdirSync(path.join(repo, RUN), { recursive: true });
    writeFileSync(path.join(repo, RUN, 'brief.md'), BRIEF);
    writeFileSync(path.join(repo, 'evidence', 'private', 'YF-EV-0001-Meeting.aspx'), MINUTES);
    writeFileSync(
      path.join(repo, 'evidence', 'registry', 'YF-EV-0001.yaml'),
      YAML.stringify({
        id: 'YF-EV-0001',
        title: 'Infrastructure Committee minutes',
        url: PAGE_URL,
        retrieved_on: '2026-09-25',
        archive: { sha256: sha256(MINUTES), path: 'evidence/private/YF-EV-0001-Meeting.aspx' },
      }),
    );
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
      gates: ['same-seven-councillors-vote-together'],
      fetcher: fetcher(),
      seatProbes: [seatProbe()],
      now: () => NOW,
      ...options,
    });

  /** Every human check filled in as passing, so one missing piece at a time can be tested. */
  function completeChecks(manifest: CarryManifest, gate: 'pass' | 'parked' | 'pending' = 'parked'): CarryManifest {
    const copy = structuredClone(manifest);
    for (const doc of copy.documents.filter((d) => d.status === 'carried')) {
      doc.download_provenance = { downloaded_by: 'the site fetcher', downloaded_on: '2026-09-25', via: 'site fetcher' };
      doc.public_open_check = { checked_by: 'a separate session', checked_on: hoursBefore(2) };
      doc.personal_information_screen = { result: 'clear', reviewer: 'a separate session' };
      doc.completeness_check = { result: 'pass', reviewer: 'a separate session', missed_items: [] };
      for (const item of doc.items ?? []) item.checker_reason = item.carried ? 'a vote on the program' : 'not about the program';
    }
    copy.gates!['claim:same-seven-councillors-vote-together'] = { result: gate, reviewer: gate === 'pending' ? null : 'a separate session', reconciliation_file: null };
    return copy;
  }

  const refusals = (repo: string, manifest: CarryManifest) =>
    packageRefusals(manifest, {
      repoRoot: repo,
      runDir: path.join(repo, RUN),
      manifestPath: path.join(repo, RUN, 'carried', 'manifest.yaml'),
      now: NOW,
    });

  it('names a meeting page by the brief\'s URL template and meeting id', () => {
    expect(briefNaming(BRIEF, PAGE_URL)).toBe('template + meeting id at line 6');
    expect(briefNaming(BRIEF.replace(MEETING_ID, 'another'), PAGE_URL)).toBeUndefined();
    expect(briefNaming(BRIEF.replace('Agenda=PostMinutes&Id=<meeting id>', 'Agenda=Agenda&Id=<meeting id>'), PAGE_URL)).toBeUndefined();
  });

  it('carries a page a seat was refused at, with the full item index, the rule and the page hash', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo);
    const doc = manifest.documents[0]!;
    expect(doc.status, doc.reason).toBe('carried');
    expect(doc.kind).toBe('minutes-items');
    expect(doc.eligibility).toMatchObject({ ground: 'seat refusal', seat: 'claude', tool: 'WebFetch', http_status: 403 });
    expect(doc.probe?.http_status).toBe(200);
    expect(doc.page_check?.result).toBe('pass');
    expect(doc.archive?.sha256).toBe(sha256(MINUTES));
    expect(doc.layout).toBe('minutes');
    expect(doc.rule_version).toBe(1);
    expect(doc.items!.map((i) => [i.number, i.carried, i.checker_reason])).toEqual([
      ['1.', false, null],
      ['1.2', false, null],
      ['1.4', true, null],
      ['7.', false, null],
      ['7.6', true, null],
      ['7.7', false, null],
      ['8.', false, null],
      ['8.1', true, null],
      ['8.2', false, null],
    ]);
    expect(doc.items!.find((i) => i.number === '8.1')!.matched_terms).toEqual(['bike']);
    expect(doc.completeness_check).toEqual({ result: 'pending', reviewer: null, missed_items: [] });
    expect(manifest.selection_rule).toMatchObject({ version: 1, terms: RULE.terms });
    expect(manifest.rule_revisions!.map((r) => r.version)).toEqual([1]);
    expect(manifest.gates).toEqual({ 'claim:same-seven-councillors-vote-together': { result: 'pending', reviewer: null, reconciliation_file: null } });
    const text = readFileSync(path.join(repo, doc.extraction!.text_file), 'utf8');
    expect(sha256(text)).toBe(doc.extraction!.text_sha256);
    const written = readFileSync(path.join(repo, RUN, 'carried', 'manifest.yaml'), 'utf8');
    expect(written).toContain('there is no way to add one by hand');
    expect(written).not.toContain('Lost (1 to 2)');
  });

  it('excludes a page the fetcher reads when no seat refusal is on the record', async () => {
    const repo = fixtureRepo();
    const doc = (await build(repo, { seatProbes: [] })).documents[0]!;
    expect(doc.status).toBe('excluded');
    expect(doc.reason).toMatch(/records no seat refusal there in the last 6 hours/);
  });

  it('fails a page whose live item index differs from the archived copy', async () => {
    const repo = fixtureRepo();
    const revised = MINUTES.replace('Snow Clearing Update', 'Snow Clearing Update (revised)');
    const doc = (await build(repo, { fetcher: fetcher(revised) })).documents[0]!;
    expect(doc.status).toBe('failed');
    expect(doc.page_check?.result).toBe('fail');
    expect(doc.reason).toMatch(/revised since it was archived/);
  });

  it('refuses to package while the completeness check is missing, and passes once every check is in', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo);
    expect(refusals(repo, manifest)).toEqual(
      expect.arrayContaining([
        'YF-EV-0001: completeness check not done',
        expect.stringMatching(/^YF-EV-0001: 9 item\(s\) have no checker_reason/),
        'gate claim:same-seven-councillors-vote-together is pending',
      ]),
    );
    const ready = completeChecks(manifest);
    expect(refusals(repo, ready)).toEqual([]);

    const noCheck = structuredClone(ready);
    delete noCheck.documents[0]!.completeness_check;
    expect(refusals(repo, noCheck)).toContain('YF-EV-0001: completeness check not done');
  });

  it('refuses a carried item with no checker reason, a missed item, and an item carried against the rule', async () => {
    const repo = fixtureRepo();
    const ready = completeChecks(await build(repo));

    const unexplained = structuredClone(ready);
    unexplained.documents[0]!.items!.find((i) => i.number === '7.6')!.checker_reason = null;
    expect(refusals(repo, unexplained)).toEqual([expect.stringMatching(/1 item\(s\) have no checker_reason \(7\.6\)/)]);

    const missed = structuredClone(ready);
    missed.documents[0]!.completeness_check = { result: 'pass', reviewer: 'a separate session', missed_items: ['7.7'] };
    expect(refusals(repo, missed)).toEqual([expect.stringMatching(/lists missed items \(7\.7\); publish a new rule version and rebuild/)]);

    const byHand = structuredClone(ready);
    byHand.documents[0]!.items!.find((i) => i.number === '7.7')!.carried = true;
    expect(refusals(repo, byHand)).toEqual([expect.stringMatching(/items 7\.7 are carried differently from the rule/)]);
  });

  it('refuses a pending gate, and passes a parked one while telling the seats it is parked', async () => {
    const repo = fixtureRepo();
    const manifest = await build(repo);
    expect(refusals(repo, completeChecks(manifest, 'pending'))).toEqual(['gate claim:same-seven-councillors-vote-together is pending']);
    const parked = completeChecks(manifest, 'parked');
    expect(refusals(repo, parked)).toEqual([]);
    const section = renderCarriedSection(parked, repo);
    expect(section).toContain('**Claim `same-seven-councillors-vote-together` is parked for this run.**');
    expect(section).toContain('leave it out of your `claims` array');
    const passedWithoutFile = completeChecks(manifest, 'pass');
    expect(refusals(repo, passedWithoutFile)).toEqual([
      'gate claim:same-seven-councillors-vote-together passed without its reconciliation file in the repository',
    ]);
  });

  it('tells the seats the items were selected under the printed rule and the rest was not carried', async () => {
    const repo = fixtureRepo();
    const section = renderCarriedSection(completeChecks(await build(repo)), repo);
    expect(section).toContain('## Selected items from City meeting pages');
    expect(section).toContain('The rest of each page was not carried.');
    expect(section).toContain('Selection rule, version 1:');
    expect(section).toContain('"CM-20-0330", "IS03688"');
    expect(section).toContain('If you think a relevant item is missing from a page, name the meeting and the item');
    expect(section).toContain('Agendas show what was scheduled; minutes are the record of decisions and votes.');
    expect(section).toContain('### YF-EV-0001: minutes (the record of decisions and votes)');
    expect(section).toContain('- Items carried: 1.4, 7.6, 8.1 (3 of 9)');
    expect(section).toContain(`- Page SHA-256: ${sha256(MINUTES)}`);
    expect(section).not.toContain('Infrastructure Committee minutes');
  });

  it('reruns a new rule version over the page and restarts its checks; an unchanged rebuild keeps them', async () => {
    const repo = fixtureRepo();
    const ready = completeChecks(await build(repo));
    writeFileSync(path.join(repo, RUN, 'carried', 'manifest.yaml'), YAML.stringify(ready));

    const kept = (await build(repo)).documents[0]!;
    expect(kept.completeness_check?.result).toBe('pass');
    expect(kept.items!.every((i) => i.checker_reason)).toBe(true);

    const rulesFile = path.join(repo, 'rules.yaml');
    writeFileSync(
      rulesFile,
      YAML.stringify({ versions: [...selectionRules(), { version: 2, reason: 'the checker found 7.7', terms: [...RULE.terms, 'Snow Clearing'] }] }),
    );
    const revised = await build(repo, { rulesFile, ruleVersion: 2 });
    const doc = revised.documents[0]!;
    expect(doc.items!.filter((i) => i.carried).map((i) => i.number)).toEqual(['1.4', '7.6', '7.7', '8.1']);
    expect(doc.completeness_check?.result).toBe('pending');
    expect(doc.items!.every((i) => i.checker_reason === null)).toBe(true);
    expect(revised.rule_revisions!.map((r) => r.version)).toEqual([1, 2]);

    const stillV1 = await build(repo, { rulesFile, ruleVersion: 1 });
    expect(stillV1.documents[0]!.items!.filter((i) => i.carried).map((i) => i.number)).toEqual(['1.4', '7.6', '8.1']);
  });
});

describe('seat refusal evidence', () => {
  const probe = (over: Partial<SeatProbe> = {}): SeatProbe => ({
    url: PAGE_URL,
    seat: 'gpt',
    model: 'gpt-6-sol',
    tool: 'web_search open_page',
    cli_version: 'stub',
    probed_at: hoursBefore(1),
    outcome: 'refused',
    http_status: null,
    tool_url: PAGE_URL,
    raw_error: '[{"title":"Internal Error","snippet":"Total lines: 1","domain":null}]',
    ...over,
  });

  it('accepts a fresh refusal with raw error text, and refuses a stale one', () => {
    expect(seatRefusalFor([probe()], PAGE_URL, NOW)?.seat).toBe('gpt');
    expect(seatRefusalFor([probe({ probed_at: hoursBefore(7) })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ probed_at: hoursBefore(-1) })], PAGE_URL, NOW)).toBeUndefined();
  });

  it('does not count a refusal with neither a status nor raw error text, a fetch, or another URL', () => {
    expect(seatRefusalFor([probe({ raw_error: null })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ outcome: 'unclear' })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ outcome: 'fetched', raw_error: null })], PAGE_URL, NOW)).toBeUndefined();
    expect(seatRefusalFor([probe({ url: `${PAGE_URL}&x=1` })], PAGE_URL, NOW)).toBeUndefined();
  });

  it('reads the HTTP status Claude\'s WebFetch reports, not the model\'s words', () => {
    const stream = [
      JSON.stringify({ type: 'assistant', message: { content: [{ type: 'tool_use', id: 't1', name: 'WebFetch', input: { url: PAGE_URL } }] } }),
      JSON.stringify({
        type: 'user',
        message: { content: [{ type: 'tool_result', tool_use_id: 't1', content: 'The server returned HTTP 403 Forbidden.' }] },
        tool_use_result: { bytes: 0, code: 403, codeText: 'Forbidden', result: 'The server returned HTTP 403 Forbidden.' },
      }),
      JSON.stringify({ type: 'result', result: 'It worked fine, HTTP 200.' }),
    ].join('\n');
    expect(classifyClaudeStream(stream)).toEqual({
      outcome: 'refused',
      http_status: 403,
      tool_url: PAGE_URL,
      raw_error: 'The server returned HTTP 403 Forbidden.',
    });
    expect(classifyClaudeStream(JSON.stringify({ type: 'result', result: 'HTTP 403' })).outcome).toBe('no-tool-call');
  });

  it('records Codex\'s open_page result entries verbatim, and classifies an error page as a refusal with no status', () => {
    const event = (title: string) =>
      JSON.stringify({
        type: 'item.completed',
        item: { type: 'web_search', action: { type: 'open_page', url: PAGE_URL }, results: [{ type: 'text_result', title, snippet: 'Total lines: 1' }] },
      });
    const refused = classifyCodexStream(event('Internal Error'));
    expect(refused).toMatchObject({ outcome: 'refused', http_status: null, tool_url: PAGE_URL });
    expect(refused.raw_error).toBe('[{"title":"Internal Error","snippet":"Total lines: 1","domain":null}]');
    expect(classifyCodexStream(event('Infrastructure Committee - Minutes')).outcome).toBe('fetched');
    expect(classifyCodexStream(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: 'HTTP 403' } })).outcome).toBe('no-tool-call');
  });
});
