/**
 * Stage 5: deterministic synthesis (spec §5).
 *
 * Reads the panel's final positions for a run and applies `synthesis-matrix.ts`
 * to each claim. No LLM, no network, no judgement — given the same round files
 * this produces the same `synthesis.json` byte for byte, which is what lets a
 * reader re-run the published method and get the published answer.
 *
 *   npx tsx scripts/synthesize.ts reviews/electric-buses/2026-08-31
 *
 * The canonical basis is ROUND 1 (methodology v1.3). Round 1 is the only round
 * in which the three reviewers are genuinely independent: in round 2 each one
 * has read the other two, so a round-2 multiset can no longer be treated as
 * three independent readings of the record. Synthesising from it quietly turned
 * a deliberative round into the vote.
 *
 * Round 2 keeps its job, which is error documentation, not verdict production.
 * Its files are still read here — every reviewer's final position is carried
 * into `round2_positions` so dissent and movement stay on the page — and both
 * rounds are still scanned for the framing halt. A material error caught in
 * round 2 (a fabricated citation, wrong evidence) is not silently averaged in:
 * it triggers a fresh blind re-run of the affected claim. Since methodology
 * v1.22 that re-run has somewhere to land — a `round1-rerun-<n>/` directory
 * whose three seats replace `round1/` for the claims they answered, and only
 * those. See `loadClaimReruns`.
 *
 * Adopting this changed no published finding. Verified on all six published
 * claims before the switch: the round-1 and round-2 multisets resolve to the
 * same canonical finding on every one.
 *
 * A run halts here, nonzero and unsynthesised, when any reviewer flagged
 * `MATERIAL FRAMING CONCERN` against the brief (methodology v1.2). See
 * `framingConcerns` below.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { listFiles, relative, repoPath, currentMethodologyVersion } from './lib/repo.ts';
import { validateReviewFile, type Review, type ReviewClaim } from './lib/review-schema.ts';
import { synthesize } from './synthesis-matrix.ts';
import type {
  CanonicalFinding,
  Confidence,
  PanelAgreement,
  ReviewerVerdict,
} from '../src/lib/vocabulary.ts';

type ReviewerPosition = {
  provider: string;
  model_self_reported: string;
  verdict: ReviewerVerdict;
  confidence: Confidence;
  evidence_basis: string;
  /** Present only when this reviewer moved between rounds. */
  changed_from?: ReviewerVerdict;
  changed_why?: string;
  interpretation_notes?: string;
};

type ClaimSynthesis = {
  id: string;
  finding: CanonicalFinding;
  panel_agreement: PanelAgreement;
  rationale: string;
  /**
   * Which blind round this claim's three positions were read from: `round1`,
   * or the `round1-rerun-*` directory that superseded it for this claim alone
   * (methodology v1.22). Named per claim because a re-run covers some claims
   * and not others, and a reader should not have to work out which.
   */
  basis: string;
  /** The canonical basis: the three locked blind positions named by `basis`. */
  reviewers: ReviewerPosition[];
  /**
   * Each reviewer's final round-2 position, when a round 2 ran. Not an input to
   * the finding — it is the documented record of what cross-review changed, so
   * a reader can see dissent and movement rather than infer it.
   */
  round2_positions: ReviewerPosition[];
  disagreement_notes: string[];
};

type Synthesis = {
  story: string;
  run: string;
  methodology_version: string;
  /**
   * Always `round1` since methodology v1.3; kept explicit in the artifact. A
   * claim answered by a blind re-run says so on its own entry's `basis`, which
   * names the re-run directory (methodology v1.22).
   */
  basis: 'round1';
  /** The `round1-rerun-*` directories read, in name order. Empty when none. */
  claim_reruns: string[];
  /** Whether a cross-review round ran and is reflected in `round2_positions`. */
  round2_documented: boolean;
  generated_at: string;
  claims: ClaimSynthesis[];
};

type LoadedRound = { provider: string; review: Review };

/**
 * A claim-scoped blind re-run: one `round1-rerun-*` directory, the claim ids
 * its seats answered, and the three seats' reviews.
 */
type ClaimRerun = { name: string; claims: Set<string>; round: LoadedRound[] };

function loadReviews(dir: string): LoadedRound[] {
  if (!existsSync(dir)) return [];
  const loaded: LoadedRound[] = [];
  for (const file of listFiles(dir, ['.json'])) {
    const result = validateReviewFile(file);
    if (!result.ok) {
      throw new Error(
        `${relative(file)} does not conform to review-schema.json:\n  - ${result.errors.join('\n  - ')}`,
      );
    }
    loaded.push({ provider: path.basename(file, '.json'), review: result.review });
  }
  return loaded;
}

function loadRound(runDir: string, round: 1 | 2): LoadedRound[] {
  return loadReviews(path.join(runDir, `round${round}`));
}

/**
 * Claim-scoped blind re-runs (methodology v1.22).
 *
 * Stage 4 has always said that a material catch in cross-review triggers a
 * fresh blind re-run of the affected claim rather than a correction inside the
 * run (§4, and the v1.3 entry). This is where such a re-run reaches the
 * finding. Its three seats answer the frozen brief again, scoped to the claim
 * and blind to everything the run has since learned, and they write into their
 * own `round1-rerun-<n>/` directory with their own manifest. `round1/` is never
 * rewritten: it stays the seats' answers to the package its hash records, and
 * for a re-run claim it is the superseded record.
 *
 * The rules are deliberately strict, because this is the one place a claim's
 * canonical basis can be replaced. A re-run must carry all three seats, all
 * three must answer the same claims, and every claim it answers must already
 * exist in `round1/`. Two re-runs may not both cover one claim. Anything else
 * throws rather than quietly picking a winner.
 */
function loadClaimReruns(runDir: string, round1: LoadedRound[]): ClaimRerun[] {
  const dirs = existsSync(runDir)
    ? readdirSync(runDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && /^round1-rerun-/.test(entry.name))
        .map((entry) => entry.name)
        .sort()
    : [];

  const knownClaims = new Set(round1.flatMap(({ review }) => review.claims.map((claim) => claim.id)));
  const providers = new Set(round1.map((entry) => entry.provider));
  const covered = new Map<string, string>();
  const reruns: ClaimRerun[] = [];

  for (const name of dirs) {
    const round = loadReviews(path.join(runDir, name));
    if (round.length !== 3) {
      throw new Error(
        `${name}/ holds ${round.length} review(s); a claim re-run is a blind round and needs all 3 seats`,
      );
    }
    for (const { provider } of round) {
      if (!providers.has(provider)) {
        throw new Error(`${name}/${provider}.json is not one of round 1's seats (${[...providers].join(', ')})`);
      }
    }
    const claims = new Set(round[0]!.review.claims.map((claim) => claim.id));
    for (const { provider, review } of round) {
      const seatClaims = review.claims.map((claim) => claim.id);
      if (seatClaims.length !== claims.size || seatClaims.some((id) => !claims.has(id))) {
        throw new Error(
          `${name}/${provider}.json answers [${seatClaims.join(', ')}], not the re-run's [${[...claims].join(', ')}]`,
        );
      }
    }
    for (const id of claims) {
      if (!knownClaims.has(id)) throw new Error(`${name}/ answers claim "${id}", which round 1 never asked`);
      const already = covered.get(id);
      if (already) throw new Error(`claim "${id}" is re-run in both ${already}/ and ${name}/`);
      covered.set(id, name);
    }
    reruns.push({ name, claims, round });
  }
  return reruns;
}

/**
 * The halt marker a reviewer writes into `interpretation_notes` when a claim's
 * operationalization in the brief materially changes what the honest answer is
 * (methodology v1.2; `prompts/reviewer.md`).
 */
const FRAMING_HALT_MARKER = 'MATERIAL FRAMING CONCERN';

/**
 * A flagged brief is not a disagreement to be synthesised — it says the question
 * itself is loaded, and computing a canonical finding over it would launder a
 * bad framing into a three-model verdict. So this halts the run rather than
 * degrading it: the brief is revised and round 1 rerun.
 */
function framingConcerns(rounds: LoadedRound[], round: number): string[] {
  const hits: string[] = [];
  for (const { provider, review } of rounds) {
    for (const claim of review.claims) {
      const notes = claim.interpretation_notes;
      // A negated mention ("no MATERIAL FRAMING CONCERN") is a reviewer saying
      // the frame held, not raising one; the reviewer prompt now asks them not
      // to write the string at all in that case, and this guards the seam.
      if (notes && new RegExp(`(?<!\\bno\\s)${FRAMING_HALT_MARKER}`, 'i').test(notes)) {
        hits.push(`round ${round} · ${provider} · claim "${claim.id}": ${notes.replace(/\s+/g, ' ').trim()}`);
      }
    }
  }
  return hits;
}

function claimIds(rounds: LoadedRound[]): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const { review } of rounds) {
    for (const claim of review.claims) {
      if (!seen.has(claim.id)) {
        seen.add(claim.id);
        order.push(claim.id);
      }
    }
  }
  return order;
}

function findClaim(review: Review, id: string): ReviewClaim | undefined {
  return review.claims.find((claim) => claim.id === id);
}

/**
 * One round's positions on one claim.
 *
 * `firstRound` is passed only when reading round 2, so that a reviewer who
 * moved carries `changed_from`/`changed_why`. A reviewer missing from a round
 * is fatal for round 1 (the canonical basis must be complete) and skipped for
 * round 2, where a reviewer may legitimately not restate every claim.
 */
function positionsFor(
  id: string,
  round: LoadedRound[],
  firstRound: LoadedRound[] = [],
  { required = true }: { required?: boolean } = {},
): ReviewerPosition[] {
  const out: ReviewerPosition[] = [];
  for (const { provider, review } of round) {
    const claim = findClaim(review, id);
    if (!claim) {
      if (required) throw new Error(`${provider} has no verdict for claim "${id}"`);
      continue;
    }
    const change = review.round2_notes?.verdict_changes?.find((entry) => entry.claim === id);
    const before = firstRound.find((entry) => entry.provider === provider);
    const previous = before ? findClaim(before.review, id)?.verdict : undefined;
    const movedFrom = change?.from ?? (previous && previous !== claim.verdict ? previous : undefined);
    out.push({
      provider,
      model_self_reported: review.reviewer.model_self_reported,
      verdict: claim.verdict,
      confidence: claim.confidence,
      evidence_basis: claim.evidence_basis,
      ...(movedFrom ? { changed_from: movedFrom as ReviewerVerdict } : {}),
      ...(change?.why ? { changed_why: change.why } : {}),
      ...(claim.interpretation_notes ? { interpretation_notes: claim.interpretation_notes } : {}),
    });
  }
  return out;
}

function disagreementNotes(positions: ReviewerPosition[], id: string): string[] {
  const distinct = new Set(positions.map((position) => position.verdict));
  if (distinct.size === 1) return [];
  const notes = positions.map(
    (position) => `${position.provider}: ${position.verdict} (${position.confidence})`,
  );
  for (const position of positions) {
    if (position.interpretation_notes) {
      notes.push(`${position.provider} interpretation: ${position.interpretation_notes}`);
    }
    if (position.changed_why) {
      notes.push(
        `${position.provider} moved ${position.changed_from} → ${position.verdict}: ${position.changed_why}`,
      );
    }
  }
  return notes.map((note) => note.replace(/\s+/g, ' ').trim()).filter((note) => note !== id);
}

export function synthesizeRun(runDir: string): Synthesis {
  const round1 = loadRound(runDir, 1);
  const round2 = loadRound(runDir, 2);
  const reruns = loadClaimReruns(runDir, round1);

  const concerns = [
    ...framingConcerns(round1, 1),
    ...reruns.flatMap((rerun) => framingConcerns(rerun.round, 1)),
    ...framingConcerns(round2, 2),
  ];
  if (concerns.length > 0) {
    throw new Error(
      `halted: a reviewer flagged ${FRAMING_HALT_MARKER} against the brief for ` +
        `${relative(runDir)}. Revise the brief and rerun round 1; do not synthesise over a ` +
        `framing a reviewer says predetermines the answer.\n  - ${concerns.join('\n  - ')}`,
    );
  }

  if (round1.length === 0) throw new Error(`no round-1 review JSON found under ${relative(runDir)}`);
  if (round1.length !== 3) {
    throw new Error(
      `synthesis needs exactly 3 round-1 reviewers, found ${round1.length} (${round1
        .map((entry) => entry.provider)
        .join(', ')}). A reviewer that failed after retry halts the run before synthesis.`,
    );
  }

  const claims: ClaimSynthesis[] = claimIds(round1).map((id) => {
    // A claim answered by a blind re-run reads its three positions from there
    // and nowhere else. Mixing the superseded round-1 verdict into the multiset
    // would be the quiet correction inside the run that §4 forbids.
    const rerun = reruns.find((entry) => entry.claims.has(id));
    const basisRound = rerun ? rerun.round : round1;
    const reviewers = positionsFor(id, basisRound);
    const result = synthesize(reviewers.map((reviewer) => reviewer.verdict));
    return {
      id,
      finding: result.finding,
      panel_agreement: result.agreement,
      rationale: result.rationale,
      basis: rerun ? rerun.name : 'round1',
      reviewers,
      // Round 2 answered round 1, whatever a later re-run went on to say, so a
      // seat's movement there is still measured against `round1`. Reading it
      // against the re-run would report a change nobody made.
      round2_positions: positionsFor(id, round2, round1, { required: false }),
      disagreement_notes: disagreementNotes(reviewers, id),
    };
  });

  return {
    story: round1[0]!.review.story,
    run: path.basename(runDir),
    methodology_version: currentMethodologyVersion(),
    basis: 'round1',
    claim_reruns: reruns.map((rerun) => rerun.name),
    round2_documented: round2.length > 0,
    generated_at: new Date().toISOString(),
    claims,
  };
}

function main(): void {
  const [target] = process.argv.slice(2);
  if (!target) {
    console.error('usage: tsx scripts/synthesize.ts <reviews/<story>/<date>>');
    process.exit(2);
  }
  const runDir = path.resolve(repoPath(), target);
  const synthesis = synthesizeRun(runDir);
  mkdirSync(runDir, { recursive: true });
  const out = path.join(runDir, 'synthesis.json');
  writeFileSync(out, `${JSON.stringify(synthesis, null, 2)}\n`);
  console.log(
    `wrote ${relative(out)} (basis ${synthesis.basis}` +
      `${synthesis.round2_documented ? ', round 2 documented' : ''}, ` +
      `${synthesis.claims.length} claims)`,
  );
  for (const claim of synthesis.claims) {
    const basis = claim.basis === 'round1' ? '' : ` [${claim.basis}]`;
    console.log(`  ${claim.id}: ${claim.finding} / ${claim.panel_agreement}${basis}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (error) {
    console.error(`synthesize: ${(error as Error).message}`);
    process.exit(1);
  }
}
