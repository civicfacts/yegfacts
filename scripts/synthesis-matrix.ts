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
 *    across three distinct verdicts resolves cautiously.
 *
 * ## Why rule 3 leans cautious (methodology v1.3, published rationale)
 *
 * The lean was challenged during the 2026-09-01 methodology panel as a de facto
 * veto: one reviewer saying "Partially supported" pulls two "Supported" votes
 * down. It is kept, deliberately, and the reasoning is published rather than
 * buried here:
 *
 * - Supported means the proposition AS WRITTEN is affirmatively established.
 *   That is a strong statement, and a qualification identified by one reviewer
 *   does not stop existing because the other two did not find it. Publishing
 *   Supported over a live, specific qualification would publish a claim no
 *   reader could check against the panel's own record.
 * - For a fact-checking site the two errors are not symmetric. Overclaiming —
 *   asserting more than the record carries — is the costlier one: it is the
 *   failure that destroys the thing the site exists to be.
 * - The veto concern is answered by disclosure, not by averaging. The vote
 *   composition is ALWAYS displayed: every claim page shows what each of the
 *   three reviewers said, so a reader who thinks the lone qualifier was wrong
 *   can see exactly that and weigh it themselves.
 *
 * The lean is never a downgrade past what the panel said, either: no row
 * resolves below the most cautious verdict actually cast.
 */
import type { CanonicalFinding, PanelAgreement, ReviewerVerdict } from '../src/lib/vocabulary.ts';
import { REVIEWER_VERDICTS } from '../src/lib/vocabulary.ts';

/** How far apart two verdicts sit on the support axis. */
const AXIS: readonly ReviewerVerdict[] = REVIEWER_VERDICTS;

export type MatrixRow = {
  /** The sorted multiset, in axis order. */
  verdicts: readonly [ReviewerVerdict, ReviewerVerdict, ReviewerVerdict];
  finding: CanonicalFinding;
  /**
   * How far apart the panel landed. Since methodology v1.3 this is the
   * canonical second dimension the site publishes beside the finding; the
   * canonical confidence it replaced described nothing the method computed.
   */
  agreement: PanelAgreement;
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
  // --- Unanimous: one distinct verdict; the panel agrees.
  { verdicts: [S, S, S], finding: 'Supported', agreement: 'Unanimous',
    rationale: 'Unanimous.' },
  { verdicts: [P, P, P], finding: 'Partially supported', agreement: 'Unanimous',
    rationale: 'Unanimous.' },
  { verdicts: [N, N, N], finding: 'Not established', agreement: 'Unanimous',
    rationale: 'Unanimous.' },
  { verdicts: [C, C, C], finding: 'Contradicted', agreement: 'Unanimous',
    rationale: 'Unanimous.' },

  // --- 2+1 across adjacent verdicts: resolve to the more cautious of the pair.
  { verdicts: [S, S, P], finding: 'Partially supported', agreement: 'Adjacent',
    rationale: 'Two read the claim as established, one as overreaching; the qualified reading wins.' },
  { verdicts: [S, P, P], finding: 'Partially supported', agreement: 'Adjacent',
    rationale: 'Majority says part of the claim holds.' },
  { verdicts: [P, P, N], finding: 'Partially supported', agreement: 'Adjacent',
    rationale: 'Majority finds something established, but one reviewer found nothing the record supports.' },
  { verdicts: [P, N, N], finding: 'Not established', agreement: 'Adjacent',
    rationale: 'Majority finds the record cannot carry the claim.' },
  { verdicts: [N, N, C], finding: 'Not established', agreement: 'Adjacent',
    rationale: 'Majority found no answer in the record; the stronger counter-finding is not carried alone.' },
  { verdicts: [N, C, C], finding: 'Contradicted', agreement: 'Adjacent',
    rationale: 'Majority found affirmative counter-evidence; one reviewer found the record silent.' },

  // --- 2+1 across NON-adjacent verdicts, no Supported/Contradicted clash:
  //     a cautious lean, because the panel is materially apart.
  { verdicts: [S, S, N], finding: 'Partially supported', agreement: 'Split',
    rationale: 'Two established the claim, one found the record silent; resolved down to the qualified reading.' },
  { verdicts: [S, N, N], finding: 'Not established', agreement: 'Split',
    rationale: 'Majority found the record silent; the lone Supported does not carry it.' },
  { verdicts: [S, P, N], finding: 'Partially supported', agreement: 'Split',
    rationale: 'Three different readings spanning the support axis; the middle reading is the defensible one.' },

  // --- Any panel containing BOTH Supported and Contradicted: Mixed, always.
  { verdicts: [S, S, C], finding: 'Mixed', agreement: 'Split',
    rationale: 'One reviewer found affirmative evidence against what two others established.' },
  { verdicts: [S, P, C], finding: 'Mixed', agreement: 'Split',
    rationale: 'Supported and Contradicted both present; the panel does not agree on what the record shows.' },
  { verdicts: [S, N, C], finding: 'Mixed', agreement: 'Split',
    rationale: 'Supported and Contradicted both present; the panel does not agree on what the record shows.' },
  { verdicts: [S, C, C], finding: 'Mixed', agreement: 'Split',
    rationale: 'Two found affirmative evidence against what one established.' },

  // --- Contradicted against a supportive-but-qualified majority: also materially split.
  { verdicts: [P, P, C], finding: 'Mixed', agreement: 'Split',
    rationale: 'A partial-support majority against affirmative counter-evidence; two verdicts apart.' },
  { verdicts: [P, N, C], finding: 'Mixed', agreement: 'Split',
    rationale: 'Three different readings including affirmative counter-evidence.' },
  { verdicts: [P, C, C], finding: 'Mixed', agreement: 'Split',
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

export type SynthesisResult = {
  finding: CanonicalFinding;
  agreement: PanelAgreement;
  rationale: string;
};

/**
 * The canonical finding and panel agreement for one claim.
 *
 * Takes exactly three verdicts — the matrix is defined for a three-reviewer
 * panel and nothing else, so a run missing a reviewer must halt before
 * synthesis rather than synthesise from two.
 *
 * Reviewer confidences are deliberately NOT an input (methodology v1.3). They
 * are published per reviewer, beside the reviewer that gave them; rolling them
 * into a single canonical number implied a confidence about the claim that the
 * method never computed.
 */
export function synthesize(verdicts: readonly ReviewerVerdict[]): SynthesisResult {
  if (verdicts.length !== 3) {
    throw new Error(`synthesis needs exactly 3 reviewer verdicts, got ${verdicts.length}`);
  }
  const row = BY_KEY.get(multisetKey(verdicts));
  if (!row) throw new Error(`no matrix row for verdicts: ${sortVerdicts(verdicts).join(', ')}`);
  return {
    finding: row.finding,
    agreement: row.agreement,
    rationale: row.rationale,
  };
}

/** Look a row up without supplying confidences; used by docs and tests. */
export function matrixRow(verdicts: readonly ReviewerVerdict[]): MatrixRow | undefined {
  return BY_KEY.get(multisetKey(verdicts));
}
