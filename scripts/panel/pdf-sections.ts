/**
 * Long documents carried by section (methodology v1.43, D-0048 rules 3 and 4).
 *
 * A document whose extracted text would not fit a seat's package is carried as
 * whole sections, chosen by a published, versioned keyword rule
 * (scripts/panel/section-selection-rules.yaml). This module splits the
 * extracted text of a City operating budget attachment into sections at its
 * own boundaries, applies the rule, and writes the carried text. It never adds,
 * drops or shortens a section by judgement.
 *
 * The structure it reads, from `pdftotext -layout` output (pages separated by
 * form feeds, printed page numbers equal to PDF page numbers):
 *   - a "Table of Contents" page whose lines end in a page number; every entry,
 *     top-level or indented, starts a section at its page, and the pages before
 *     the first entry are the front matter;
 *   - inside those parts, service packages: a page whose heading reads
 *     "Integrated Service Package - <title>" or "Standalone Service Package -
 *     <title>" starts a package; the title runs on until a line that starts
 *     "Lead Branch - ", "Branch - ", "Program - ", "Total" or "Description", a blank
 *     line, or a line laid out in columns. A following page with the same
 *     heading (compared without spaces or case, so a title wrapped at another
 *     word is the same title) continues the package, as does a page with no
 *     heading at all. A package is title, branch, description, priorities,
 *     impact, results and its cost tables, each of which has a "Total" row.
 * Every page belongs to exactly one section, in order. A package without a
 * "Total" row, a contents page that cannot be read, or contents entries out of
 * order stop the build: the format has changed or the text is cut.
 */
import { fileURLToPath } from 'node:url';
import { SELECTION_MATCH, matchedTermsIn, selectionRules, type SelectionRule } from './minutes-items.ts';

export type SectionKind = 'front matter' | 'part' | 'service package';

export type DocumentSection = {
  number: number;
  title: string;
  kind: SectionKind;
  first_page: number;
  last_page: number;
  /** The section's pages, whole, as extracted. */
  pages: string[];
};

/** One section in the manifest's public inventory (D-0048 rule 4): never its text. */
export type SectionIndexEntry = {
  number: number;
  title: string;
  kind: SectionKind;
  pages: string;
  text_bytes: number;
  matched_terms: string[];
  matched: boolean;
  carried: boolean;
  /** The completeness checker's reason for carrying or not carrying it. Human-filled. */
  checker_reason: string | null;
};

const SECTION_RULES_FILE = fileURLToPath(new URL('./section-selection-rules.yaml', import.meta.url));

/** Every published version of the section rule, oldest first. */
export function sectionRules(file = SECTION_RULES_FILE): SelectionRule[] {
  return selectionRules(file);
}

export const SECTION_MATCH = `${SELECTION_MATCH.replace('item number, title and whole text', 'section title and whole text')}`;

/** The pages of an extracted text: split at form feeds, without the empty tail after the last one. */
export function documentPages(text: string): string[] {
  const pages = text.split('\f');
  if (pages.length > 1 && pages.at(-1)!.trim() === '') pages.pop();
  return pages;
}

const TOC_HEADING = /^\s*Table of Contents\s*$/i;
const TOC_ENTRY = /^\s*(\S(?:.*\S)?)\s{2,}(\d{1,4})\s*$/;
const PACKAGE_HEADING = /^\s*((?:Integrated|Standalone) Service Package)\s+-\s+(.+?)\s*$/;
const TITLE_STOP = /^\s*(?:(?:Lead )?Branch|Program)\s+-\s|^\s*(?:Total|Description)\b/;
const COLUMNS = /\S\s{3,}\S/;
/** A package heading sits within this many non-empty lines of the top of its page (after the running header). */
const HEADING_WINDOW = 3;

/** Contents entries with their start pages, in order. */
export function tableOfContents(pages: readonly string[]): Array<{ title: string; page: number }> {
  const at = pages.findIndex((page) => page.split('\n').some((line) => TOC_HEADING.test(line)));
  if (at === -1) throw new Error('no "Table of Contents" page: not a budget attachment, or its format has changed');
  const lines = pages[at]!.split('\n');
  const start = lines.findIndex((line) => TOC_HEADING.test(line));
  const entries = lines
    .slice(start + 1)
    .map((line) => TOC_ENTRY.exec(line))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => ({ title: match[1]!.replace(/\s+/g, ' '), page: Number(match[2]) }))
    // A running footer ("<page>  <date> - City Council | <report>") is not an entry.
    .filter((entry) => !/\|/.test(entry.title));
  if (entries.length === 0) throw new Error('the contents page lists no entries');
  entries.forEach((entry, index) => {
    if (entry.page < 1 || entry.page > pages.length) throw new Error(`contents entry "${entry.title}" points at page ${entry.page}; the document has ${pages.length}`);
    if (index > 0 && entry.page < entries[index - 1]!.page) throw new Error(`contents entry "${entry.title}" (page ${entry.page}) is out of order`);
  });
  return entries;
}

/** The full service package title a page opens with, or undefined when it opens with none. */
export function packageHeading(page: string): string | undefined {
  const lines = page.split('\n');
  let seen = 0;
  for (let index = 0; index < lines.length && seen <= HEADING_WINDOW; index += 1) {
    if (!lines[index]!.trim()) continue;
    seen += 1;
    const match = PACKAGE_HEADING.exec(lines[index]!);
    if (!match) continue;
    const parts = [match[2]!];
    for (let next = index + 1; next < lines.length; next += 1) {
      const line = lines[next]!;
      if (!line.trim() || TITLE_STOP.test(line) || COLUMNS.test(line.trim())) break;
      parts.push(line.trim());
    }
    return `${match[1]} - ${parts.join(' ')}`.replace(/\s+/g, ' ');
  }
  return undefined;
}

const sameTitle = (a: string, b: string) => a.replace(/\s+/g, '').toLowerCase() === b.replace(/\s+/g, '').toLowerCase();

/**
 * Split an extracted budget attachment into sections.
 *
 * @throws when the contents page cannot be read, or a service package has no
 *   "Total" row, so a changed format stops a build instead of producing a
 *   wrong inventory.
 */
export function parseSections(text: string): DocumentSection[] {
  const pages = documentPages(text);
  const contents = tableOfContents(pages);
  const starts = new Map<number, string>();
  for (const entry of contents) starts.set(entry.page, starts.has(entry.page) ? `${starts.get(entry.page)} / ${entry.title}` : entry.title);
  const sections: DocumentSection[] = [];
  const open = (title: string, kind: SectionKind, page: number) =>
    sections.push({ number: sections.length + 1, title, kind, first_page: page, last_page: page, pages: [] });
  pages.forEach((pageText, index) => {
    const page = index + 1;
    const current = sections.at(-1);
    const heading = packageHeading(pageText);
    if (heading) {
      if (!(current?.kind === 'service package' && sameTitle(current.title, heading) && !starts.has(page))) open(heading, 'service package', page);
    } else if (starts.has(page)) {
      open(starts.get(page)!, 'part', page);
    } else if (!current) {
      open('Front matter', 'front matter', page);
    }
    const section = sections.at(-1)!;
    section.pages.push(pageText);
    section.last_page = page;
  });
  for (const section of sections) {
    if (section.kind === 'service package' && !section.pages.some((page) => /^\s*Total\b/m.test(page))) {
      throw new Error(`service package "${section.title}" (pages ${pageRange(section)}) has no "Total" row: the format has changed or the text is cut`);
    }
  }
  return sections;
}

export const pageRange = (section: Pick<DocumentSection, 'first_page' | 'last_page'>) =>
  section.first_page === section.last_page ? `${section.first_page}` : `${section.first_page}-${section.last_page}`;

/** A section's text as carried: its title line, then each page whole, marked with its page number. */
export function sectionText(section: DocumentSection): string {
  const body = section.pages.map((page, i) => `[page ${section.first_page + i}]\n${page}`).join('\n');
  return `SECTION ${section.number} (pages ${pageRange(section)}): ${section.title}\n${body}`;
}

/**
 * The rule applied to every section of an extracted document: the public
 * inventory, and the carried text, which is every matched section whole, in
 * document order. Build and package time both use this, so the package can
 * regenerate what the build wrote and compare.
 */
export function carrySections(text: string, rule: SelectionRule): { sections: Omit<SectionIndexEntry, 'checker_reason'>[]; text: string; pages: number } {
  const parsed = parseSections(text);
  const entries = parsed.map((section) => {
    const terms = matchedTermsIn(`${section.title}\n${section.pages.join('\n')}`, rule);
    return {
      number: section.number,
      title: section.title,
      kind: section.kind,
      pages: pageRange(section),
      text_bytes: Buffer.byteLength(section.pages.join('\f')),
      matched_terms: terms,
      matched: terms.length > 0,
      carried: terms.length > 0,
    };
  });
  const carried = parsed.filter((_, index) => entries[index]!.carried).map(sectionText);
  return { sections: entries, text: carried.length > 0 ? `${carried.join('\n\n')}\n` : '', pages: documentPages(text).length };
}

/**
 * Why an inventory is not a whole, ordered tiling of a document's pages; empty
 * when it is. A gap, an overlap or a section out of order means a section was
 * split, cut or edited by hand.
 */
export function tilingProblems(sections: ReadonlyArray<Pick<SectionIndexEntry, 'number' | 'pages'>>, pageCount: number): string[] {
  const problems: string[] = [];
  let expected = 1;
  sections.forEach((section, index) => {
    const match = /^(\d+)(?:-(\d+))?$/.exec(section.pages);
    if (!match) {
      problems.push(`section ${section.number} has no page range`);
      return;
    }
    const first = Number(match[1]);
    const last = Number(match[2] ?? match[1]);
    if (section.number !== index + 1) problems.push(`section ${section.number} is listed in position ${index + 1}`);
    if (first !== expected || last < first) problems.push(`section ${section.number} covers pages ${section.pages}, expected to start at page ${expected}`);
    expected = last + 1;
  });
  if (expected !== pageCount + 1) problems.push(`the sections cover pages 1-${expected - 1}; the document has ${pageCount}`);
  return problems;
}

/** The published rule file, for links and messages. */
export const SECTION_RULES_PATH = 'scripts/panel/section-selection-rules.yaml';
