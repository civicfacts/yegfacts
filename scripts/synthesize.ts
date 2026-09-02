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
 * it triggers a fresh blind re-run of the affected claim.
 *
 * Adopting this changed no published finding. Verified on all six published
 * claims before the switch: the round-1 and round-2 multisets resolve to the
 * same canonical finding on every one.
 *
 * A run halts here, nonzero and unsynthesised, when any reviewer flagged
 * `MATERIAL FRAMING CONCERN` against the brief (methodology v1.2). See
 * `framingConcerns` below.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
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
  /** The canonical basis: the three locked round-1 positions. */
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
  /** Always `round1` since methodology v1.3; kept explicit in the artifact. */
  basis: 'round1';
  /** Whether a cross-review round ran and is reflected in `round2_positions`. */
  round2_documented: boolean;
  generated_at: string;
  claims: ClaimSynthesis[];
};

type LoadedRound = { provider: string; review: Review };

function loadRound(runDir: string, round: 1 | 2): LoadedRound[] {
  const dir = path.join(runDir, `round${round}`);
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

  const concerns = [...framingConcerns(round1, 1), ...framingConcerns(round2, 2)];
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
    const reviewers = positionsFor(id, round1);
    const result = synthesize(reviewers.map((reviewer) => reviewer.verdict));
    return {
      id,
      finding: result.finding,
      panel_agreement: result.agreement,
      rationale: result.rationale,
      reviewers,
      round2_positions: positionsFor(id, round2, round1, { required: false }),
      disagreement_notes: disagreementNotes(reviewers, id),
    };
  });

  return {
    story: round1[0]!.review.story,
    run: path.basename(runDir),
    methodology_version: currentMethodologyVersion(),
    basis: 'round1',
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
    console.log(`  ${claim.id}: ${claim.finding} / ${claim.panel_agreement}`);
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
