/**
 * The one place a panel review JSON is checked against `prompts/review-schema.json`.
 *
 * `scripts/merge.ts`, `scripts/synthesize.ts`, `scripts/validate.ts` and the
 * retry loop in `scripts/panel/run-reviewer.sh` all validate through this, so a
 * reviewer output that any of them accepts is one all of them accept. The
 * schema is the published contract; nothing here re-states its rules.
 */
import Ajv2020, { type ErrorObject, type ValidateFunction } from 'ajv/dist/2020.js';
import { loadYaml, readText, repoPath } from './repo.ts';
import { REVIEWER_VERDICTS, CONFIDENCE_LEVELS } from '../../src/lib/vocabulary.ts';

export const SCHEMA_PATH = repoPath('prompts', 'review-schema.json');

export type ReviewEvidenceItem = {
  finding: string;
  source_title: string;
  source_url: string;
  source_publisher?: string;
  source_date?: string;
  source_type: string;
  establishes: string;
  quote?: string;
  strength?: 'strong' | 'moderate' | 'weak';
};

export type ReviewClaim = {
  id: string;
  proposition_evaluated: string;
  interpretation_notes?: string;
  verdict: (typeof REVIEWER_VERDICTS)[number];
  confidence: (typeof CONFIDENCE_LEVELS)[number];
  evidence_basis: string;
  supporting_evidence: ReviewEvidenceItem[];
  challenging_evidence: ReviewEvidenceItem[];
  comparisons?: unknown[];
  limitations: string[];
  unknowns: string[];
  missing_evidence?: unknown[];
  calculations_needed?: string[];
  what_would_change_my_verdict: string[];
  suggested_one_line: string;
  suggested_short_answer?: string;
  suggested_tldr?: string[];
};

export type Review = {
  reviewer: { provider: 'anthropic' | 'openai' | 'google'; model_self_reported: string };
  story: string;
  round: 1 | 2;
  round2_notes?: {
    evidence_i_missed?: string[];
    errors_in_other_reviews?: string[];
    verdict_changes?: { claim: string; from: string; to: string; why: string }[];
  };
  claims: ReviewClaim[];
};

let compiled: ValidateFunction | undefined;

function validator(): ValidateFunction {
  if (!compiled) {
    const schema = JSON.parse(readText(SCHEMA_PATH)) as object;
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    compiled = ajv.compile(schema);
  }
  return compiled;
}

function describe(error: ErrorObject): string {
  const where = error.instancePath || '(root)';
  const allowed = error.params && 'allowedValues' in error.params
    ? ` (allowed: ${(error.params.allowedValues as unknown[]).join(', ')})`
    : '';
  return `${where} ${error.message ?? 'is invalid'}${allowed}`;
}

export type ReviewValidation =
  | { ok: true; review: Review }
  | { ok: false; errors: string[] };

/** Validate a parsed JSON value as a panel review. */
export function validateReview(value: unknown): ReviewValidation {
  const validate = validator();
  if (validate(value)) return { ok: true, review: value as Review };
  const errors = (validate.errors ?? []).map(describe);
  return { ok: false, errors: errors.length > 0 ? errors : ['did not conform to review-schema.json'] };
}

/** Validate raw JSON text, reporting a parse failure the same way as a schema failure. */
export function validateReviewText(text: string): ReviewValidation {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return { ok: false, errors: [`not valid JSON: ${(error as Error).message}`] };
  }
  return validateReview(parsed);
}

/** Validate a review file on disk. */
export function validateReviewFile(absolute: string): ReviewValidation {
  return validateReviewText(readText(absolute));
}

/** The run manifest a review directory must carry (spec §8). */
export type RunManifest = {
  story: string;
  date: string;
  methodology_version: string;
  runs: {
    provider: string;
    round: number;
    command: string;
    cli_version: string;
    model_id: string;
    prompt_sha256: string;
    methodology_version: string;
    started_at: string;
    finished_at: string;
    attempts: number;
    status: string;
  }[];
};

export function loadRunManifest(absolute: string): RunManifest {
  return loadYaml<RunManifest>(absolute);
}
