import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Loader } from 'astro/loaders';
import { candidateRegister, reportsFor } from './intake';

/**
 * The intake records and triage reports behind `/considered/<id>`.
 *
 * They are Markdown files that live where the intake process put them —
 * `intake/candidates/<id>/` for a new candidate, a review run's directory for
 * one that came out of a re-brief — so no single `glob()` base covers them and
 * the register is the only thing that knows which files matter. This loader
 * therefore reads `intake/register.yaml` and loads exactly the paths it names,
 * which also means a report nobody references never becomes a page.
 *
 * Entry ids are the repo-relative paths themselves, so a page can look a report
 * up with the string the register already holds.
 */

/** Metadata a report carries, parsed out of its leading HTML comment. */
export interface CandidateReport {
  /** Repo-relative path, the same string the register uses. */
  path: string;
  /** The model that read the claim, when the report records one. */
  reader?: string;
  /** The date the run was made, when the report records one. */
  run?: string;
}

/**
 * The reports open with an HTML comment holding run metadata — which prompt,
 * which reader, which date. It is provenance rather than prose, so it comes off
 * the body and goes back on the page inside the notice that says whose reading
 * the report is.
 */
const LEADING_COMMENT = /^\s*<!--([\s\S]*?)-->/;

/** The document's own `# title`, dropped: the page heading already says it. */
const LEADING_H1 = /^\s*#\s+.*(?:\r?\n|$)/;

const FENCE = /^\s*(?:```|~~~)/;

/**
 * Headings pushed down one level, so a report's `##` sits under the page's own
 * `##` section heading instead of beside it. Fenced blocks are left alone: a
 * `#` at the start of a line inside one is a comment, not a heading.
 */
function demoteHeadings(markdown: string): string {
  let fenced = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (FENCE.test(line)) fenced = !fenced;
      if (fenced) return line;
      return line.replace(/^(#{1,5}) /, '$1# ');
    })
    .join('\n');
}

/**
 * A triage report ends on its own working: which searches were run and which
 * sources were opened. That is provenance a reader can audit, not the reading
 * itself, and at full length it buries the verdict line under it. The report is
 * published as written, so the paragraphs are kept verbatim and folded into a
 * disclosure where they stand, rather than trimmed or moved.
 */
const PROVENANCE_BLOCK = /^\*\*(?:Searches|Sources)\b/;

/**
 * Markup borrowed from the AI review's disclosures, so the two behave alike.
 *
 * The body is a `<section>` rather than a `<div>` on purpose. The page wraps
 * the whole report in `<div data-record>`, and the duplication audit reads that
 * exclusion up to the first `</div>` — a `<div>` in here would close it early
 * and put half the report back into the comparison.
 */
const DISCLOSURE_OPEN =
  '<details class="border border-rule px-3.5 py-2.5">' +
  '<summary class="flex cursor-pointer list-none items-baseline justify-between gap-3 text-sm text-muted">' +
  '<span>Searches and sources</span><span class="disclosure-state shrink-0 text-xs"></span>' +
  '</summary>' +
  '<section class="prose mt-2.5 border-t border-rule pt-2.5">';

const DISCLOSURE_CLOSE = '</section></details>';

type RenderMarkdown = Parameters<Loader['load']>[0]['renderMarkdown'];

/**
 * The report as HTML, with its searches-and-sources paragraphs behind a native
 * disclosure. Each run of Markdown is rendered on its own so the paragraphs
 * keep their place in the document rather than being re-ordered around it.
 */
async function renderReport(
  markdown: string,
  render: RenderMarkdown,
  fileURL: URL,
): Promise<string> {
  const blocks = markdown.split(/\n{2,}/);
  const first = blocks.findIndex((block) => PROVENANCE_BLOCK.test(block.trimStart()));
  if (first === -1) return (await render(markdown, { fileURL })).html;

  let last = first;
  while (last + 1 < blocks.length && PROVENANCE_BLOCK.test(blocks[last + 1]!.trimStart())) last += 1;

  const part = async (from: number, to: number) =>
    to > from ? (await render(blocks.slice(from, to).join('\n\n'), { fileURL })).html : '';

  const [before, middle, after] = await Promise.all([
    part(0, first),
    part(first, last + 1),
    part(last + 1, blocks.length),
  ]);

  return [before, DISCLOSURE_OPEN, middle, DISCLOSURE_CLOSE, after].join('\n');
}

/** `Reader: … Run 2026-09-02 by Stew.` — the two halves worth showing. */
function metadata(comment: string): Pick<CandidateReport, 'reader' | 'run'> {
  const flat = comment.replace(/\s+/g, ' ').trim();
  return {
    reader: /Reader:\s*(.+?)\.\s+Run\b/.exec(flat)?.[1]?.trim(),
    run: /\bRun (\d{4}-\d{2}-\d{2})\b/.exec(flat)?.[1],
  };
}

/** Every distinct report path the register names, in the order it names them. */
function reportPaths(): string[] {
  return [
    ...new Set(candidateRegister().flatMap((candidate) => reportsFor(candidate).map((r) => r.path))),
  ];
}

export function candidateReportsLoader(): Loader {
  return {
    name: 'candidate-reports',
    load: async ({ store, config, logger, parseData, generateDigest, renderMarkdown }) => {
      store.clear();

      await Promise.all(
        reportPaths().map(async (path) => {
          const fileURL = new URL(path, config.root);
          const file = fileURLToPath(fileURL);
          if (!existsSync(file)) {
            // `npm run validate` is where a missing path is a hard failure; the
            // build's job is to leave the section out rather than to die.
            logger.warn(`report "${path}" does not exist — skipped`);
            return;
          }

          const raw = readFileSync(file, 'utf8');
          const comment = LEADING_COMMENT.exec(raw);
          const body = demoteHeadings(
            raw.slice(comment?.[0].length ?? 0).replace(LEADING_H1, '').trim(),
          );

          store.set({
            id: path,
            filePath: path,
            digest: generateDigest(raw),
            data: await parseData({
              id: path,
              data: { path, ...metadata(comment?.[1] ?? '') },
            }),
            rendered: { html: await renderReport(body, renderMarkdown, fileURL) },
          });
        }),
      );
    },
  };
}
