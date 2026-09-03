/**
 * A captured comment thread, rendered as the flat list an extractor reads.
 *
 * The capture is JSONL keyed by platform comment ids; an extractor needs to
 * follow a reply chain by eye, so `reply_to` is resolved from the opaque
 * platform id to the `index` an extractor can cite. That is the whole job:
 * "that never happened" in comment 4 is only a claim about anything if the
 * reader can see it answers comment 2.
 *
 *   npx tsx scripts/intake-render-thread.ts intake/captures/<slug>/comments.jsonl
 *
 * Writes to stdout. Nothing is summarised, reordered or dropped.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from './lib/repo.ts';

type Comment = {
  index: number;
  comment_id: string;
  reply_to: string | null;
  commenter: string;
  text: string;
  time: string;
};

const arg = process.argv[2];
if (!arg) {
  console.error('usage: tsx scripts/intake-render-thread.ts <capture.jsonl>');
  process.exit(1);
}

const file = path.isAbsolute(arg) ? arg : path.join(REPO_ROOT, arg);
const comments = readFileSync(file, 'utf8')
  .split('\n')
  .filter((line) => line.trim())
  .map((line) => JSON.parse(line) as Comment);

/**
 * `reply_to` holds the numeric suffix of the parent's `comment_id`, which is
 * itself base64 of "comment:<post>_<comment>" and percent-encoded. Decoding is
 * not worth it: a suffix match against the decoded tail of every id is exact
 * enough, and a parent outside the capture simply resolves to nothing.
 */
const bySuffix = new Map<string, number>();
for (const comment of comments) {
  const decoded = Buffer.from(decodeURIComponent(comment.comment_id), 'base64').toString('utf8');
  const suffix = decoded.split('_').pop();
  if (suffix) bySuffix.set(suffix, comment.index);
}

const lines: string[] = [];
let unresolved = 0;
for (const comment of comments) {
  const parent = comment.reply_to ? bySuffix.get(comment.reply_to) : undefined;
  if (comment.reply_to && parent === undefined) unresolved += 1;
  const head =
    parent === undefined
      ? `[${comment.index}] ${comment.commenter}:`
      : `[${comment.index}] ${comment.commenter} (reply to ${parent}):`;
  lines.push(head);
  lines.push(comment.text.replace(/\r/g, '').trim());
  lines.push('');
}

process.stdout.write(lines.join('\n'));
console.error(
  `intake-render-thread: ${comments.length} comments, ${unresolved} with a parent outside the capture`,
);
