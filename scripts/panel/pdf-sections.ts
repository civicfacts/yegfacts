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
 *   - a "Table of Contents" page, and any page continuing it, whose lines end
 *     in a page number (an entry may wrap onto a second line; any other line
 *     stops the build); every entry, top-level or indented, starts a section
 *     at its page, and the pages before the first entry are the front matter;
 *   - inside those parts, service packages: a page that opens with a heading
 *     "Integrated Service Package - <title>" or "Standalone Service Package -
 *     <title>" starts a package; the title runs on until a line that starts
 *     "Lead Branch - ", "Branch - ", "Program - ", "Total" or "Description", a blank
 *     line, or a line laid out in columns. A following page with the same
 *     heading (compared without spaces or case, so a title wrapped at another
 *     word is the same title) continues the package, as does a page with no
 *     heading at all. Headings are looked for anywhere on a page: one that
 *     starts a different package below the top of a page stops the build,
 *     because sections are whole pages. A package is title, branch,
 *     description, priorities, impact, results and its cost tables; it must
 *     have one title, a description, and a last cost table that ends in its
 *     "Total" row, or the build stops.
 * Every page belongs to exactly one section, in order. Contents that cannot be
 * read or are out of order stop the build too: the format has changed or the
 * text is cut.
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
const TOC_CONTINUED = /^\s*Table of Contents\s*\(continued\)\s*$/i;
const TOC_ENTRY = /^\s*(\S(?:.*\S)?)\s{2,}(\d{1,4})\s*$/;
const PACKAGE_HEADING = /^\s*((?:Integrated|Standalone) Service Package)\s+-\s+(.+?)\s*$/;
const TITLE_STOP = /^\s*(?:(?:Lead )?Branch|Program)\s+-\s|^\s*(?:Total|Description)\b/;
const COLUMNS = /\S\s{3,}\S/;
/** A running footer: "<page>  <date> - City Council | <report>". */
const FOOTER = /\|/;
const COST_TABLE_HEADER = /^\s*\(\$000\)/;
const TOTAL_ROW = /^\s*Total\s{2,}\S/;
const TABLE_ROW = /^\s*(?:Annualization|New Budget)\s{2,}\S/;
const DESCRIPTION = /^\s*Description\b/;

type ContentsEntry = { title: string; page: number };

/**
 * Read the lines of one contents page. Each must be an entry ending in a page
 * number, the first half of an entry wrapped onto the next line, the running
 * footer as the page's last line, or blank.
 *
 * @throws on any other line, so an entry the parser cannot read stops the
 *   build instead of merging two parts.
 */
function contentsLines(lines: readonly string[], page: number): ContentsEntry[] {
  const filled = lines.map((line, index) => ({ line, index })).filter(({ line }) => line.trim());
  const last = filled.at(-1);
  const footer = last && FOOTER.test(last.line) ? last.index : -1;
  const entries: ContentsEntry[] = [];
  let wrapped: string | null = null;
  lines.forEach((line, index) => {
    if (!line.trim()) return;
    if (index === footer) {
      if (wrapped !== null) throw new Error(`contents page ${page}: "${wrapped}" is not followed by the rest of its entry`);
      return;
    }
    const entry = FOOTER.test(line) ? null : TOC_ENTRY.exec(line);
    if (entry) {
      entries.push({ title: `${wrapped === null ? '' : `${wrapped} `}${entry[1]!}`.replace(/\s+/g, ' '), page: Number(entry[2]) });
      wrapped = null;
    } else if (wrapped === null && !COLUMNS.test(line.trim()) && !FOOTER.test(line)) {
      wrapped = line.trim();
    } else {
      throw new Error(`contents page ${page}: cannot read the line "${line.trim()}"`);
    }
  });
  if (wrapped !== null) throw new Error(`contents page ${page}: "${wrapped}" is not followed by the rest of its entry`);
  return entries;
}

/** A page's lines without its running header (its first non-empty line). */
function bodyLines(page: string): string[] {
  const lines = page.split('\n');
  const header = lines.findIndex((line) => line.trim());
  return header === -1 ? [] : lines.slice(header + 1);
}

/**
 * Contents entries with their start pages, in order, read from the "Table of
 * Contents" page and every page that continues it: one that opens "Table of
 * Contents (continued)", or one whose every line is a contents entry.
 */
export function tableOfContents(pages: readonly string[]): ContentsEntry[] {
  const at = pages.findIndex((page) => page.split('\n').some((line) => TOC_HEADING.test(line)));
  if (at === -1) throw new Error('no "Table of Contents" page: not a budget attachment, or its format has changed');
  const lines = pages[at]!.split('\n');
  const entries = contentsLines(lines.slice(lines.findIndex((line) => TOC_HEADING.test(line)) + 1), at + 1);
  for (let next = at + 1; next < pages.length; next += 1) {
    const body = bodyLines(pages[next]!);
    const filled = body.filter((line) => line.trim() && !FOOTER.test(line));
    if (filled.length === 0) break;
    if (TOC_CONTINUED.test(filled[0]!)) {
      entries.push(...contentsLines(body.slice(body.findIndex((line) => TOC_CONTINUED.test(line)) + 1), next + 1));
      continue;
    }
    if (!filled.every((line) => TOC_ENTRY.test(line))) break;
    entries.push(...contentsLines(body, next + 1));
  }
  if (entries.length === 0) throw new Error('the contents page lists no entries');
  entries.forEach((entry, index) => {
    if (entry.page < 1 || entry.page > pages.length) throw new Error(`contents entry "${entry.title}" points at page ${entry.page}; the document has ${pages.length}`);
    if (index > 0 && entry.page < entries[index - 1]!.page) throw new Error(`contents entry "${entry.title}" (page ${entry.page}) is out of order`);
  });
  return entries;
}

/** Every service package heading on a page, anywhere on it, with its full title and whether it opens the page. */
export function packageHeadings(page: string): Array<{ title: string; opensPage: boolean }> {
  const lines = page.split('\n');
  const filled = lines.map((line, index) => ({ line, index })).filter(({ line }) => line.trim());
  const found: Array<{ title: string; opensPage: boolean }> = [];
  filled.forEach(({ line, index }, position) => {
    const match = PACKAGE_HEADING.exec(line);
    if (!match) return;
    const parts = [match[2]!];
    for (let next = index + 1; next < lines.length; next += 1) {
      const more = lines[next]!;
      if (!more.trim() || TITLE_STOP.test(more) || COLUMNS.test(more.trim()) || PACKAGE_HEADING.test(more)) break;
      parts.push(more.trim());
    }
    // The running header is the page's first line; a heading right under it opens the page.
    found.push({ title: `${match[1]} - ${parts.join(' ')}`.replace(/\s+/g, ' '), opensPage: position <= 1 });
  });
  return found;
}

/** The full service package title a page opens with, or undefined when it opens with none. */
export function packageHeading(page: string): string | undefined {
  return packageHeadings(page).find((heading) => heading.opensPage)?.title;
}

const sameTitle = (a: string, b: string) => a.replace(/\s+/g, '').toLowerCase() === b.replace(/\s+/g, '').toLowerCase();

/**
 * Why a service package is not whole; empty when it is. It needs a
 * description, and a cost table, the last of which ends in its "Total" row:
 * after the last "($000)" header there is a Total row and no table row after it.
 */
export function packageProblems(section: Pick<DocumentSection, 'pages'>): string[] {
  const lines = section.pages.join('\n').split('\n');
  const problems: string[] = [];
  if (!lines.some((line) => DESCRIPTION.test(line))) problems.push('no description');
  const header = lines.findLastIndex((line) => COST_TABLE_HEADER.test(line));
  if (header === -1) problems.push('no cost table');
  else {
    const after = lines.slice(header + 1);
    const total = after.findLastIndex((line) => TOTAL_ROW.test(line));
    if (total === -1) problems.push('its last cost table has no "Total" row');
    else if (after.slice(total + 1).some((line) => TABLE_ROW.test(line))) problems.push('its last cost table does not end in its "Total" row');
  }
  return problems;
}

/**
 * Split an extracted budget attachment into sections.
 *
 * @throws when the contents cannot be read, a package starts mid-page, or a
 *   package is not whole (packageProblems), so a changed format stops a build
 *   instead of producing a wrong inventory.
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
    const headings = packageHeadings(pageText);
    const continuing = current?.kind === 'service package' ? current.title : undefined;
    // A heading that does not open the page and is not the current package's own title starts a package mid-page.
    const midPage = headings.find((h) => !h.opensPage && !(continuing && sameTitle(continuing, h.title)));
    if (midPage) {
      throw new Error(`page ${page}: service package "${midPage.title}" starts mid-page; sections are whole pages, so this document cannot be split without cutting a page`);
    }
    const heading = headings.find((h) => h.opensPage)?.title;
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
    const problems = section.kind === 'service package' ? packageProblems(section) : [];
    if (problems.length > 0) {
      throw new Error(`service package "${section.title}" (pages ${pageRange(section)}) is not whole: ${problems.join('; ')}. The format has changed or the text is cut`);
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
