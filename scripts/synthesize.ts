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
 * Round 2 is the panel's final word, so it is used when present. A run whose
 * round-2 files are missing falls back to round 1 and is marked
 * `round1-only`, because a finding synthesised before cross-review is a weaker
 * artifact and must not be silently indistinguishable from one that went the
 * full distance.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { listFiles, relative, repoPath, currentMethodologyVersion } from './lib/repo.ts';
import { validateReviewFile, type Review, type ReviewClaim } from './lib/review-schema.ts';
import { synthesize, type Agreement } from './synthesis-matrix.ts';
import type { CanonicalFinding, Confidence, ReviewerVerdict } from '../src/lib/vocabulary.ts';

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
  confidence: Confidence;
  agreement: Agreement;
  rationale: string;
  reviewers: ReviewerPosition[];
  disagreement_notes: string[];
};

type Synthesis = {
  story: string;
  run: string;
  methodology_version: string;
  /** `round2` when the full cross-review ran; `round1-only` when it did not. */
  basis: 'round2' | 'round1-only';
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

function positionsFor(
  id: string,
  finalRound: LoadedRound[],
  firstRound: LoadedRound[],
): ReviewerPosition[] {
  return finalRound.map(({ provider, review }) => {
    const claim = findClaim(review, id);
    if (!claim) throw new Error(`${provider} has no verdict for claim "${id}"`);
    const change = review.round2_notes?.verdict_changes?.find((entry) => entry.claim === id);
    const before = firstRound.find((entry) => entry.provider === provider);
    const previous = before ? findClaim(before.review, id)?.verdict : undefined;
    const movedFrom = change?.from ?? (previous && previous !== claim.verdict ? previous : undefined);
    return {
      provider,
      model_self_reported: review.reviewer.model_self_reported,
      verdict: claim.verdict,
      confidence: claim.confidence,
      evidence_basis: claim.evidence_basis,
      ...(movedFrom ? { changed_from: movedFrom as ReviewerVerdict } : {}),
      ...(change?.why ? { changed_why: change.why } : {}),
      ...(claim.interpretation_notes ? { interpretation_notes: claim.interpretation_notes } : {}),
    };
  });
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
  const final = round2.length > 0 ? round2 : round1;
  const basis: Synthesis['basis'] = round2.length > 0 ? 'round2' : 'round1-only';

  if (final.length === 0) throw new Error(`no review JSON found under ${relative(runDir)}`);
  if (final.length !== 3) {
    throw new Error(
      `synthesis needs exactly 3 reviewers, found ${final.length} (${final
        .map((entry) => entry.provider)
        .join(', ')}). A reviewer that failed after retry halts the run before synthesis.`,
    );
  }

  const claims: ClaimSynthesis[] = claimIds(final).map((id) => {
    const reviewers = positionsFor(id, final, round1);
    const result = synthesize(
      reviewers.map((reviewer) => reviewer.verdict),
      reviewers.map((reviewer) => reviewer.confidence),
    );
    return {
      id,
      finding: result.finding,
      confidence: result.confidence,
      agreement: result.agreement,
      rationale: result.rationale,
      reviewers,
      disagreement_notes: disagreementNotes(reviewers, id),
    };
  });

  return {
    story: final[0]!.review.story,
    run: path.basename(runDir),
    methodology_version: currentMethodologyVersion(),
    basis,
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
  console.log(`wrote ${relative(out)} (${synthesis.basis}, ${synthesis.claims.length} claims)`);
  for (const claim of synthesis.claims) {
    console.log(`  ${claim.id}: ${claim.finding} / ${claim.confidence} (${claim.agreement})`);
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
