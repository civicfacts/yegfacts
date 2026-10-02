/**
 * Carried documents on the page (methodology v1.41, D-0046 rule 6; v1.42,
 * D-0047 rule 7; v1.43, D-0048 rule 5).
 *
 * When a run's panel package carried a public document's archived text, the
 * source lists that show that document say so beside it. A whole document
 * (a report or attachment) gets one label; a meeting page carried as selected
 * items gets another, which says the site chose the items under a published
 * rule and the rest of the page was not shown; a long document carried as
 * selected sections gets a third, which says the same of its sections. Where a
 * document was carried because every reviewer's research tools failed to
 * retrieve it in two rounds, the label says the tools failed, never that the
 * document is unavailable. Which documents were carried, and on which ground,
 * is read from each run's committed `carried/manifest.yaml`, never assumed: a
 * run without the file carried nothing.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { repoFile } from './site';

const PORTAL_REASON = 'because the City’s portal blocked automated access';
const TOOLS_REASON = 'because the publisher’s site refused the AI reviewers’ web tools';
const TWO_ROUND_REASON = 'because their research tools failed to read it in two rounds in a row';
const DOCUMENT_WHAT = 'The AI reviewers read our archived copy';
const ITEMS_WHAT = 'The AI reviewers saw only the items on this City meeting page that our published rule picked, from our archived copy,';
const SECTIONS_WHAT = 'The AI reviewers saw only the sections of this document that our published rule picked, from our archived copy,';

export const CARRIED_LABEL = `${DOCUMENT_WHAT} ${PORTAL_REASON}`;
export const CARRIED_SAME_COPY = 'All the AI reviewers read the same copy.';
export const CARRIED_METHOD_HREF = '/methodology#carried-documents';
export const CARRIED_ITEMS_LABEL = `${ITEMS_WHAT} ${PORTAL_REASON}`;
export const CARRIED_ITEMS_UNPUBLISHABLE =
  'We have found no permission to republish our copy, so check the items against the City’s own page.';
/** The published selection rule, every version. */
export const SELECTION_RULE_HREF = repoFile('scripts/panel/minutes-selection-rules.yaml');
/** v1.43: the published section rule, every version. */
export const SECTION_RULE_HREF = repoFile('scripts/panel/section-selection-rules.yaml');
export const CARRIED_SECTIONS_REST = 'The rest of the document was not given to them.';
export const CARRIED_SECTIONS_UNPUBLISHABLE =
  'We have found no permission to republish our copy, so check the sections against the full document.';
export const CARRIED_TWO_ROUND_NOTE = 'That was their tools failing. It does not mean the document is unavailable to you.';
export const CARRIED_OPEN_UNCONFIRMED =
  'No one outside the site could confirm that the link opens this same version, so check it against our hash.';
export const CARRIED_NOT_INDEPENDENT =
  'All the AI reviewers read the same text we supplied, so their agreement on it is not independent retrieval.';

export type CarriedSource = {
  registryId: string;
  /** The City's own URL for the document, which a person can open in a browser. */
  cityUrl: string;
  /** SHA-256 of the archived bytes, to compare with a download of `cityUrl`. */
  archiveSha256: string;
  /** `items`: selected agenda items of a meeting page; `sections`: selected sections of a long document. */
  kind: 'document' | 'items' | 'sections';
  /** Why the reviewers could not read it: the portal's block, a publisher refusing their tools, or two failed rounds. */
  reason: 'portal' | 'tools' | 'two-round';
  /** The committed manifest with the full item index or section inventory, on GitHub. */
  itemIndexHref: string;
  /** The rule version the items or sections were chosen under, for `items` and `sections`. */
  ruleVersion?: number;
  /** v1.43: a person could not confirm that the publisher's link opens this same version. */
  openUnconfirmed?: boolean;
};

/** True for an address on the City's meeting portal; false for anything else, a malformed address included. */
function portalUrl(url: unknown): boolean {
  try {
    return typeof url === 'string' && /(^|\.)escribemeetings\.com$/i.test(new URL(url).hostname);
  } catch {
    return false;
  }
}

/** A manifest written under v1.43 or later: marked by its methodology_version, or by a rule naming v1.43. */
function isV143Manifest(manifest: { methodology_version?: unknown; rule?: unknown } | null): boolean {
  const version = /^(\d+)\.(\d+)$/.exec(String(manifest?.methodology_version ?? ''));
  if (version) return Number(version[1]) > 1 || (Number(version[1]) === 1 && Number(version[2]) >= 43);
  return typeof manifest?.rule === 'string' && /\bv1\.43\b/.test(manifest.rule);
}

const KINDS = new Set([undefined, 'pdf', 'html', 'minutes-items', 'pdf-sections']);
const GROUNDS = new Set([undefined, 'fetcher challenge', 'seat refusal', 'two-round seat failure']);

/**
 * The label's sentences for a carried source, answer-agnostic and in plain
 * words: what the reviewers saw, why, and what their agreement does not show.
 * A v1.41 or v1.42 source reads exactly as it did.
 */
export function carriedLabelText(source: Pick<CarriedSource, 'kind' | 'reason' | 'openUnconfirmed'>): string {
  const what = source.kind === 'items' ? ITEMS_WHAT : source.kind === 'sections' ? SECTIONS_WHAT : DOCUMENT_WHAT;
  const why = source.reason === 'two-round' ? TWO_ROUND_REASON : source.reason === 'tools' ? TOOLS_REASON : PORTAL_REASON;
  const v143 = source.kind === 'sections' || source.reason !== 'portal';
  return [
    `${what} ${why}.`,
    source.reason === 'two-round' ? CARRIED_TWO_ROUND_NOTE : '',
    source.kind === 'sections' ? CARRIED_SECTIONS_REST : '',
    v143 ? CARRIED_NOT_INDEPENDENT : CARRIED_SAME_COPY,
    source.kind === 'items' ? CARRIED_ITEMS_UNPUBLISHABLE : source.kind === 'sections' ? CARRIED_SECTIONS_UNPUBLISHABLE : '',
    source.openUnconfirmed ? CARRIED_OPEN_UNCONFIRMED : '',
  ]
    .filter(Boolean)
    .join(' ');
}

type ManifestDocument = {
  registry_id?: string;
  url?: string;
  status?: string;
  kind?: string;
  rule_version?: number;
  section_rule_version?: number;
  archive?: { sha256?: string };
  eligibility?: { ground?: string };
  public_open_check?: { result?: string };
};

/**
 * Every document carried in any of `runDirs` (repo-relative, e.g.
 * `reviews/<story>/<date>`), keyed by registry id. Only rows whose status is
 * `carried` count; excluded and failed rows were never in a package.
 *
 * @param root the repository root the run directories resolve against.
 * @throws when a manifest exists but cannot be parsed, or a `carried` row
 *   lacks a registry id, an https URL or a 64-hex archive SHA-256, or a
 *   minutes-items row lacks its rule version, or a pdf-sections row its
 *   section rule version, or a row has a kind other than pdf, html,
 *   minutes-items or pdf-sections, or an eligibility ground the method does
 *   not define, or no eligibility ground at all where one is required: in
 *   every row of a v1.43 manifest (one whose `methodology_version` is 1.43 or
 *   later, or whose `rule` names v1.43), and in any html, pdf-sections or
 *   non-portal row. Only a portal row of a legacy (v1.41 or v1.42) manifest may
 *   omit its ground. A broken row fails the build rather than silently
 *   dropping or misstating the label. An absent manifest means nothing was
 *   carried.
 */
export function carriedSources(runDirs: readonly string[], root: string = process.cwd()): Map<string, CarriedSource> {
  const carried = new Map<string, CarriedSource>();
  for (const run of new Set(runDirs)) {
    const file = path.join(root, run, 'carried', 'manifest.yaml');
    if (!existsSync(file)) continue;
    const manifest = YAML.parse(readFileSync(file, 'utf8')) as { documents?: ManifestDocument[]; methodology_version?: unknown; rule?: unknown };
    const v143Manifest = isV143Manifest(manifest);
    for (const [index, doc] of (manifest?.documents ?? []).entries()) {
      if (doc.status !== 'carried') continue;
      const portal = portalUrl(doc.url);
      const v143 = v143Manifest || doc.kind === 'html' || doc.kind === 'pdf-sections' || !portal;
      const problems = [
        typeof doc.registry_id === 'string' && doc.registry_id ? '' : 'registry_id',
        typeof doc.url === 'string' && /^https:\/\/\S+$/.test(doc.url) ? '' : 'url',
        typeof doc.archive?.sha256 === 'string' && /^[0-9a-f]{64}$/.test(doc.archive.sha256) ? '' : 'archive.sha256',
        // Absent is a v1.41 manifest, which carried only whole documents.
        KINDS.has(doc.kind) ? '' : `kind "${String(doc.kind)}"`,
        doc.kind !== 'minutes-items' || (Number.isInteger(doc.rule_version) && doc.rule_version! > 0) ? '' : 'rule_version',
        doc.kind !== 'pdf-sections' || (Number.isInteger(doc.section_rule_version) && doc.section_rule_version! > 0) ? '' : 'section_rule_version',
        GROUNDS.has(doc.eligibility?.ground) && !(v143 && doc.eligibility?.ground === undefined) ? '' : `eligibility ground "${String(doc.eligibility?.ground)}"`,
      ].filter(Boolean);
      if (problems.length > 0) {
        throw new Error(`${path.join(run, 'carried', 'manifest.yaml')}: documents[${index}] is carried but has a missing or invalid ${problems.join(', ')}`);
      }
      carried.set(doc.registry_id!, {
        registryId: doc.registry_id!,
        cityUrl: doc.url!,
        archiveSha256: doc.archive!.sha256!,
        kind: doc.kind === 'minutes-items' ? 'items' : doc.kind === 'pdf-sections' ? 'sections' : 'document',
        reason: doc.eligibility?.ground === 'two-round seat failure' ? 'two-round' : portal ? 'portal' : 'tools',
        itemIndexHref: repoFile(path.posix.join(run, 'carried', 'manifest.yaml')),
        ...(doc.kind === 'minutes-items' ? { ruleVersion: doc.rule_version } : {}),
        ...(doc.kind === 'pdf-sections' ? { ruleVersion: doc.section_rule_version } : {}),
        ...(doc.public_open_check?.result === 'unable' ? { openUnconfirmed: true } : {}),
      });
    }
  }
  return carried;
}

/**
 * Claims a run set aside at its vote gate (D-0047 rule 5): the `claim:<id>`
 * gates in each run's `carried/manifest.yaml` whose result is `parked`. Such a
 * claim was in the brief and was never answered on that run, which is a
 * different statement from a claim still waiting for its question's run.
 *
 * @param runDirs repo-relative run directories, e.g. `reviews/<story>/<date>`.
 * @param root the repository root the run directories resolve against.
 */
export function gateParkedClaims(runDirs: readonly string[], root: string = process.cwd()): Set<string> {
  const parked = new Set<string>();
  for (const run of new Set(runDirs)) {
    const file = path.join(root, run, 'carried', 'manifest.yaml');
    if (!existsSync(file)) continue;
    const manifest = YAML.parse(readFileSync(file, 'utf8')) as { gates?: Record<string, { result?: string }> };
    for (const [key, gate] of Object.entries(manifest?.gates ?? {})) {
      if (key.startsWith('claim:') && gate?.result === 'parked') parked.add(key.slice('claim:'.length));
    }
  }
  return parked;
}
