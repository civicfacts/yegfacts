/**
 * Stage 3b: deterministic merge (spec §5).
 *
 *   npx tsx scripts/merge.ts reviews/electric-buses/2026-08-31 [--round 1]
 *
 * No LLM and no network — network work belongs to `evidence-stage.ts`, which is
 * split off precisely because fetching is not deterministic. This step reads the
 * round JSON, validates each file against the published schema, collapses the
 * three reviewers' citations into one list keyed by normalised URL, and writes
 * down where they disagree.
 *
 * Merging does NOT touch the evidence registry. Accepted sources are ingested
 * deliberately through `evidence-ingest.ts`; nothing here mutates published
 * content.
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { listFiles, relative, repoPath } from './lib/repo.ts';
import {
  validateReviewFile,
  type Review,
  type ReviewEvidenceItem,
} from './lib/review-schema.ts';
import type { Confidence, ReviewerVerdict } from '../src/lib/vocabulary.ts';

/** Query parameters that identify a campaign, not a document. */
const TRACKING_PARAMS = /^(utm_|fbclid$|gclid$|msclkid$|mc_cid$|mc_eid$|igshid$|ref$|ref_src$)/i;

/**
 * Reduce a URL to the document it points at, so the same source cited three
 * different ways collapses to one evidence item.
 *
 * Deliberately conservative: case and default ports are noise, tracking
 * parameters are noise, a fragment is a position within the same document. A
 * meaningful query string (`?id=1234`) is kept, and remaining parameters are
 * sorted so two orderings of the same query normalise together. An
 * unparseable string is returned trimmed rather than dropped — a reviewer's
 * malformed citation should surface in review, not vanish in a merge.
 */
export function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return trimmed;
  }
  url.hash = '';
  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
  if ((url.protocol === 'https:' && url.port === '443') || (url.protocol === 'http:' && url.port === '80')) {
    url.port = '';
  }
  const params = [...url.searchParams.entries()].filter(([key]) => !TRACKING_PARAMS.test(key));
  params.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  url.search = '';
  for (const [key, value] of params) url.searchParams.append(key, value);
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }
  return url.toString();
}

export type Citation = {
  reviewer: string;
  claim: string;
  role: 'supporting' | 'challenging';
  finding: string;
  establishes: string;
  strength?: string;
  quote?: string;
};

export type CombinedEvidenceItem = {
  normalized_url: string;
  /** Every spelling of the URL the panel used, so a human can see what collapsed. */
  urls: string[];
  title: string;
  publisher?: string;
  source_type: string;
  source_date?: string;
  /** Reviewer providers that cited this source at least once. */
  cited_by: string[];
  citations: Citation[];
  /** Set by `evidence-ingest.ts` once this source is in the registry. */
  evidence_id: null;
};

export type CombinedEvidence = {
  story: string;
  run: string;
  round: number;
  generated_at: string;
  reviewers: string[];
  items: CombinedEvidenceItem[];
};

export type Disagreement = {
  claim: string;
  verdicts: { reviewer: string; verdict: ReviewerVerdict; confidence: Confidence }[];
  distinct_verdicts: ReviewerVerdict[];
};

type LoadedReview = { reviewer: string; review: Review };

function loadRound(runDir: string, round: number): LoadedReview[] {
  const dir = path.join(runDir, `round${round}`);
  const files = listFiles(dir, ['.json']);
  if (files.length === 0) throw new Error(`no review JSON under ${relative(dir)}`);
  const errors: string[] = [];
  const loaded: LoadedReview[] = [];
  for (const file of files) {
    const result = validateReviewFile(file);
    if (result.ok) {
      loaded.push({ reviewer: path.basename(file, '.json'), review: result.review });
    } else {
      errors.push(`${relative(file)}:\n  - ${result.errors.join('\n  - ')}`);
    }
  }
  if (errors.length > 0) {
    throw new Error(`review JSON failed schema validation:\n${errors.join('\n')}`);
  }
  return loaded;
}

export function combineEvidence(loaded: LoadedReview[], runDir: string, round: number): CombinedEvidence {
  const byUrl = new Map<string, CombinedEvidenceItem>();

  const record = (
    reviewer: string,
    claim: string,
    role: Citation['role'],
    item: ReviewEvidenceItem,
  ): void => {
    const key = normalizeUrl(item.source_url);
    let entry = byUrl.get(key);
    if (!entry) {
      entry = {
        normalized_url: key,
        urls: [],
        title: item.source_title,
        ...(item.source_publisher ? { publisher: item.source_publisher } : {}),
        source_type: item.source_type,
        ...(item.source_date ? { source_date: item.source_date } : {}),
        cited_by: [],
        citations: [],
        evidence_id: null,
      };
      byUrl.set(key, entry);
    }
    if (!entry.urls.includes(item.source_url)) entry.urls.push(item.source_url);
    if (!entry.cited_by.includes(reviewer)) entry.cited_by.push(reviewer);
    entry.citations.push({
      reviewer,
      claim,
      role,
      finding: item.finding,
      establishes: item.establishes,
      ...(item.strength ? { strength: item.strength } : {}),
      ...(item.quote ? { quote: item.quote } : {}),
    });
  };

  for (const { reviewer, review } of loaded) {
    for (const claim of review.claims) {
      for (const item of claim.supporting_evidence) record(reviewer, claim.id, 'supporting', item);
      for (const item of claim.challenging_evidence) record(reviewer, claim.id, 'challenging', item);
    }
  }

  const items = [...byUrl.values()].sort((a, b) => {
    // Sources the whole panel found come first; then a stable URL sort.
    if (a.cited_by.length !== b.cited_by.length) return b.cited_by.length - a.cited_by.length;
    return a.normalized_url.localeCompare(b.normalized_url);
  });

  return {
    story: loaded[0]!.review.story,
    run: path.basename(runDir),
    round,
    generated_at: new Date().toISOString(),
    reviewers: loaded.map((entry) => entry.reviewer),
    items,
  };
}

export function findDisagreements(loaded: LoadedReview[]): Disagreement[] {
  const ids: string[] = [];
  for (const { review } of loaded) {
    for (const claim of review.claims) if (!ids.includes(claim.id)) ids.push(claim.id);
  }
  const out: Disagreement[] = [];
  for (const id of ids) {
    const verdicts = loaded
      .map(({ reviewer, review }) => {
        const claim = review.claims.find((entry) => entry.id === id);
        return claim ? { reviewer, verdict: claim.verdict, confidence: claim.confidence } : undefined;
      })
      .filter((entry): entry is Disagreement['verdicts'][number] => entry !== undefined);
    const distinct = [...new Set(verdicts.map((entry) => entry.verdict))];
    if (distinct.length > 1) out.push({ claim: id, verdicts, distinct_verdicts: distinct });
  }
  return out;
}

function main(): void {
  const args = process.argv.slice(2);
  const target = args.find((arg) => !arg.startsWith('--'));
  const roundIndex = args.indexOf('--round');
  const round = roundIndex === -1 ? 1 : Number(args[roundIndex + 1]);
  if (!target || !Number.isInteger(round)) {
    console.error('usage: tsx scripts/merge.ts <reviews/<story>/<date>> [--round 1]');
    process.exit(2);
  }
  const runDir = path.resolve(repoPath(), target);
  const loaded = loadRound(runDir, round);

  const combined = combineEvidence(loaded, runDir, round);
  const disagreements = findDisagreements(loaded);

  const combinedPath = path.join(runDir, 'combined-evidence.json');
  const disagreementsPath = path.join(runDir, 'disagreements.json');
  writeFileSync(combinedPath, `${JSON.stringify(combined, null, 2)}\n`);
  writeFileSync(
    disagreementsPath,
    `${JSON.stringify({ story: combined.story, round, disagreements }, null, 2)}\n`,
  );

  console.log(
    `merged round ${round} from ${loaded.length} reviewers: ` +
      `${combined.items.length} distinct sources, ${disagreements.length} contested claims`,
  );
  console.log(`  ${relative(combinedPath)}`);
  console.log(`  ${relative(disagreementsPath)}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (error) {
    console.error(`merge: ${(error as Error).message}`);
    process.exit(1);
  }
}
