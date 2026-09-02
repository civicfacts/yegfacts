/**
 * Pull the review JSON out of one reviewer's raw stdout and validate it.
 *
 *   npx tsx scripts/panel/extract-review.ts <raw-stdout-file> <output.json>
 *
 * Reviewers are told to return ONLY JSON, and they mostly do — but a CLI can
 * prepend a banner, wrap the answer in a ``` fence, or add a closing sentence,
 * and none of those are reasons to burn a research run. So the extraction is
 * forgiving about packaging and completely unforgiving about content: whatever
 * comes out is validated against `prompts/review-schema.json` through the same
 * code path `merge.ts` and `validate.ts` use.
 *
 * Exit 0 writes the pretty-printed JSON to the output path. Exit 1 prints the
 * validation errors on stdout, which `run-reviewer.sh` feeds back into its one
 * retry.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { validateReviewText } from '../lib/review-schema.ts';

/**
 * Every plausible JSON object in `text`, longest-outermost first.
 *
 * Walks the string tracking brace depth while ignoring braces inside string
 * literals, so a `{` in a quoted source title does not derail the scan.
 */
export function jsonCandidates(text: string): string[] {
  const candidates: string[] = [];
  for (let start = 0; start < text.length; start += 1) {
    if (text[start] !== '{') continue;
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let index = start; index < text.length; index += 1) {
      const char = text[index]!;
      if (escaped) {
        escaped = false;
        continue;
      }
      if (inString) {
        if (char === '\\') escaped = true;
        else if (char === '"') inString = false;
        continue;
      }
      if (char === '"') inString = true;
      else if (char === '{') depth += 1;
      else if (char === '}') {
        depth -= 1;
        if (depth === 0) {
          candidates.push(text.slice(start, index + 1));
          break;
        }
      }
    }
  }
  return candidates.sort((a, b) => b.length - a.length);
}

/**
 * A reviewer that echoes the schema's own `$schema` line at the root of its
 * answer (the Gemini seat did, methodology v1.14) is packaging, not content:
 * the key says nothing about the review and the schema forbids unknown keys.
 * It is removed before validation; every other key is left for the validator
 * to judge.
 */
function dropSchemaKey(candidate: string): string {
  try {
    const parsed = JSON.parse(candidate) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && '$schema' in parsed) {
      const { $schema: _ignored, ...rest } = parsed as Record<string, unknown>;
      return JSON.stringify(rest);
    }
  } catch {
    // not JSON: the validator reports that itself
  }
  return candidate;
}

/** Strip fences and preamble, returning the first candidate that validates. */
export function extractReview(raw: string): { ok: true; json: unknown } | { ok: false; errors: string[] } {
  const unfenced = raw.replace(/```[a-zA-Z]*\r?\n/g, '').replace(/```/g, '');
  let bestErrors: string[] | undefined;
  // Candidates arrive longest-first, so the first one that is well-formed JSON
  // is the outermost object — the reviewer's actual answer, and the only one
  // whose schema errors are worth showing it on retry. Errors from a nested
  // fragment would just say "must have required property 'reviewer'".
  for (const candidate of [unfenced.trim(), ...jsonCandidates(unfenced)]) {
    const result = validateReviewText(dropSchemaKey(candidate));
    if (result.ok) return { ok: true, json: result.review };
    if (bestErrors === undefined && !result.errors[0]?.startsWith('not valid JSON')) {
      bestErrors = result.errors;
    }
  }
  return { ok: false, errors: bestErrors ?? ['no JSON object found in the reviewer output'] };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [rawFile, outFile] = process.argv.slice(2);
  if (!rawFile || !outFile) {
    console.error('usage: tsx scripts/panel/extract-review.ts <raw-stdout-file> <output.json>');
    process.exit(2);
  }
  const result = extractReview(readFileSync(rawFile, 'utf8'));
  if (!result.ok) {
    for (const error of result.errors) console.log(`- ${error}`);
    process.exit(1);
  }
  writeFileSync(outFile, `${JSON.stringify(result.json, null, 2)}\n`);
}
