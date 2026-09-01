/**
 * The published synthesis matrix (spec §5, stage 5).
 *
 * Three reviewers each return one of four verdicts, so there are exactly 20
 * unordered combinations. Every one of them is written out below with the
 * canonical finding it produces. Nothing is computed from a heuristic: the
 * table IS the rule, so a reader can audit the whole of YEGFacts' synthesis by
 * reading twenty lines, and `tests/synthesis-matrix.test.ts` fails if a row
 * ever goes missing.
 *
 * Model identity never enters. The lookup key is the sorted multiset, which is
 * what makes permutation invariance a property of the design rather than a
 * behaviour to remember.
 *
 * ## The axis
 *
 * The four reviewer verdicts sit on one axis of decreasing support:
 *
 *     Supported → Partially supported → Not established → Contradicted
 *
 * Neighbours on that axis are compatible readings of the same evidence;
 * verdicts two or more apart are not. "Not established" means the record
 * cannot answer the question, "Contradicted" means the record affirmatively
 * answers it the other way — different statements, but both refuse the claim,
 * so they are treated as adjacent.
 *
 * ## The three rules the rows encode
 *
 * 1. Unanimous → that verdict, at the most cautious of the three confidences.
 * 2. A panel where Supported and Contradicted BOTH appear is materially split:
 *    one reviewer read the record as establishing the claim and another read it
 *    as establishing the opposite. That is Mixed, always, and the disagreement
 *    is displayed rather than averaged away.
 * 3. Otherwise the panel leans to the more cautious side of its majority. A
 *    2+1 split resolves toward the weaker verdict of the pair; a panel spread
 *    across three distinct verdicts resolves cautiously at Low confidence.
 */
import type { CanonicalFinding, Confidence, ReviewerVerdict } from '../src/lib/vocabulary.ts';
import { REVIEWER_VERDICTS } from '../src/lib/vocabulary.ts';

/** How far apart two verdicts sit on the support axis. */
const AXIS: readonly ReviewerVerdict[] = REVIEWER_VERDICTS;

export type Agreement = 'unanimous' | 'adjacent' | 'split';

export type MatrixRow = {
  /** The sorted multiset, in axis order. */
  verdicts: readonly [ReviewerVerdict, ReviewerVerdict, ReviewerVerdict];
  finding: CanonicalFinding;
  /**
   * The canonical confidence, or `'min'` for the unanimous rows where it is the
   * most cautious of the three reviewers' own confidences (spec §5.5).
   */
  confidence: Confidence | 'min';
  agreement: Agreement;
  /** Why this row resolves the way it does; rendered on the public methodology page. */
  rationale: string;
};

const S = 'Supported' as const;
const P = 'Partially supported' as const;
const N = 'Not established' as const;
const C = 'Contradicted' as const;

/**
 * All 20 multisets. Ordered by the axis (S < P < N < C) so the table reads as a
 * sweep from "everyone said yes" to "everyone said no".
 */
export const SYNTHESIS_MATRIX: readonly MatrixRow[] = [
  // --- Unanimous: the panel agrees, confidence is the most cautious of the three.
  { verdicts: [S, S, S], finding: 'Supported', confidence: 'min', agreement: 'unanimous',
    rationale: 'Unanimous.' },
  { verdicts: [P, P, P], finding: 'Partially supported', confidence: 'min', agreement: 'unanimous',
    rationale: 'Unanimous.' },
  { verdicts: [N, N, N], finding: 'Not established', confidence: 'min', agreement: 'unanimous',
    rationale: 'Unanimous.' },
  { verdicts: [C, C, C], finding: 'Contradicted', confidence: 'min', agreement: 'unanimous',
    rationale: 'Unanimous.' },

  // --- 2+1 across adjacent verdicts: resolve to the more cautious of the pair.
  { verdicts: [S, S, P], finding: 'Partially supported', confidence: 'Moderate', agreement: 'adjacent',
    rationale: 'Two read the claim as established, one as overreaching; the qualified reading wins.' },
  { verdicts: [S, P, P], finding: 'Partially supported', confidence: 'Moderate', agreement: 'adjacent',
    rationale: 'Majority says part of the claim holds.' },
  { verdicts: [P, P, N], finding: 'Partially supported', confidence: 'Low', agreement: 'adjacent',
    rationale: 'Majority finds something established, but one reviewer found nothing the record supports.' },
  { verdicts: [P, N, N], finding: 'Not established', confidence: 'Moderate', agreement: 'adjacent',
    rationale: 'Majority finds the record cannot carry the claim.' },
  { verdicts: [N, N, C], finding: 'Not established', confidence: 'Moderate', agreement: 'adjacent',
    rationale: 'Majority found no answer in the record; the stronger counter-finding is not carried alone.' },
  { verdicts: [N, C, C], finding: 'Contradicted', confidence: 'Low', agreement: 'adjacent',
    rationale: 'Majority found affirmative counter-evidence; one reviewer found the record silent.' },

  // --- 2+1 across NON-adjacent verdicts, no Supported/Contradicted clash:
  //     a cautious lean, at Low confidence, because the panel is materially apart.
  { verdicts: [S, S, N], finding: 'Partially supported', confidence: 'Low', agreement: 'split',
    rationale: 'Two established the claim, one found the record silent; resolved down to the qualified reading.' },
  { verdicts: [S, N, N], finding: 'Not established', confidence: 'Low', agreement: 'split',
    rationale: 'Majority found the record silent; the lone Supported does not carry it.' },
  { verdicts: [S, P, N], finding: 'Partially supported', confidence: 'Low', agreement: 'split',
    rationale: 'Three different readings spanning the support axis; the middle reading is the defensible one.' },

  // --- Any panel containing BOTH Supported and Contradicted: Mixed, always.
  { verdicts: [S, S, C], finding: 'Mixed', confidence: 'Low', agreement: 'split',
    rationale: 'One reviewer found affirmative evidence against what two others established.' },
  { verdicts: [S, P, C], finding: 'Mixed', confidence: 'Low', agreement: 'split',
    rationale: 'Supported and Contradicted both present; the panel does not agree on what the record shows.' },
  { verdicts: [S, N, C], finding: 'Mixed', confidence: 'Low', agreement: 'split',
    rationale: 'Supported and Contradicted both present; the panel does not agree on what the record shows.' },
  { verdicts: [S, C, C], finding: 'Mixed', confidence: 'Low', agreement: 'split',
    rationale: 'Two found affirmative evidence against what one established.' },

  // --- Contradicted against a supportive-but-qualified majority: also materially split.
  { verdicts: [P, P, C], finding: 'Mixed', confidence: 'Low', agreement: 'split',
    rationale: 'A partial-support majority against affirmative counter-evidence; two verdicts apart.' },
  { verdicts: [P, N, C], finding: 'Mixed', confidence: 'Low', agreement: 'split',
    rationale: 'Three different readings including affirmative counter-evidence.' },
  { verdicts: [P, C, C], finding: 'Mixed', confidence: 'Low', agreement: 'split',
    rationale: 'A counter-evidence majority against a partial-support reading; two verdicts apart.' },
];

/** Sort a triple into axis order, which is the matrix's lookup key. */
export function sortVerdicts(
  verdicts: readonly ReviewerVerdict[],
): readonly ReviewerVerdict[] {
  return [...verdicts].sort((a, b) => AXIS.indexOf(a) - AXIS.indexOf(b));
}

export function multisetKey(verdicts: readonly ReviewerVerdict[]): string {
  return sortVerdicts(verdicts).join('|');
}

const BY_KEY = new Map(SYNTHESIS_MATRIX.map((row) => [multisetKey(row.verdicts), row]));

/** Every multiset of three reviewer verdicts — the set the matrix must cover. */
export function allMultisets(): ReviewerVerdict[][] {
  const out: ReviewerVerdict[][] = [];
  for (let a = 0; a < AXIS.length; a += 1) {
    for (let b = a; b < AXIS.length; b += 1) {
      for (let c = b; c < AXIS.length; c += 1) {
        out.push([AXIS[a]!, AXIS[b]!, AXIS[c]!]);
      }
    }
  }
  return out;
}

/** Every ordered triple — the domain the permutation-invariance test sweeps. */
export function allOrderedTriples(): ReviewerVerdict[][] {
  const out: ReviewerVerdict[][] = [];
  for (const a of AXIS) for (const b of AXIS) for (const c of AXIS) out.push([a, b, c]);
  return out;
}

const CONFIDENCE_RANK: Record<Confidence, number> = { High: 3, Moderate: 2, Low: 1 };

/** The most cautious of the reviewers' confidences (spec §5.5). */
export function minConfidence(confidences: readonly Confidence[]): Confidence {
  return confidences.reduce((lowest, next) =>
    CONFIDENCE_RANK[next] < CONFIDENCE_RANK[lowest] ? next : lowest,
  );
}

export type SynthesisResult = {
  finding: CanonicalFinding;
  confidence: Confidence;
  agreement: Agreement;
  rationale: string;
};

/**
 * The canonical finding and confidence for one claim.
 *
 * Takes exactly three (verdict, confidence) pairs — the matrix is defined for a
 * three-reviewer panel and nothing else, so a run missing a reviewer must halt
 * before synthesis rather than synthesise from two.
 */
export function synthesize(
  verdicts: readonly ReviewerVerdict[],
  confidences: readonly Confidence[],
): SynthesisResult {
  if (verdicts.length !== 3) {
    throw new Error(`synthesis needs exactly 3 reviewer verdicts, got ${verdicts.length}`);
  }
  if (confidences.length !== 3) {
    throw new Error(`synthesis needs exactly 3 reviewer confidences, got ${confidences.length}`);
  }
  const row = BY_KEY.get(multisetKey(verdicts));
  if (!row) throw new Error(`no matrix row for verdicts: ${sortVerdicts(verdicts).join(', ')}`);
  return {
    finding: row.finding,
    confidence: row.confidence === 'min' ? minConfidence(confidences) : row.confidence,
    agreement: row.agreement,
    rationale: row.rationale,
  };
}

/** Look a row up without supplying confidences; used by docs and tests. */
export function matrixRow(verdicts: readonly ReviewerVerdict[]): MatrixRow | undefined {
  return BY_KEY.get(multisetKey(verdicts));
}
