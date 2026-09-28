/**
 * eScribe meeting pages as items (methodology v1.42, D-0047).
 *
 * The City publishes each meeting's agenda and post-meeting minutes as one
 * Meeting.aspx HTML page. This module reads an archived copy of such a page
 * into its header and its agenda items, and applies the published selection
 * rule to the items. It never adds or drops an item by judgement: the rule
 * decides, and a rule revision is the only way the selection changes.
 *
 * The page structure it reads, from the archived pages the site holds
 * (YF-EV-0209 to YF-EV-0221): a `header.AgendaHeader` with the meeting title,
 * number, date, time, location and, on minutes, `AgendaHeaderAttendance`; then
 * `div.AgendaItems`, where each item is a `div.AgendaItem.AgendaItemN` holding
 * an `AgendaItemCounter` (the number), an `AgendaItemTitle`, an optional
 * attachment list and `AgendaItemContentRow` blocks. On minutes those blocks
 * hold `AgendaItemMinutes` text and `AgendaItemMotions` (mover, seconder,
 * motion text, the vote table and the result); on an agenda they hold
 * `AgendaItemDescription`. Sub-items sit in a sibling container, not inside
 * their parent item, so each item's text is its own.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

type Element = { tag: string; classes: string[]; children: Node[]; parent?: Element };
type Node = Element | string;

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const SKIP = new Set(['script', 'style', 'noscript', 'template', 'head', 'svg']);
const BLOCK = new Set([
  'address', 'article', 'aside', 'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table',
  'tbody', 'thead', 'tfoot', 'tr', 'ul', 'caption',
]);

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', eacute: 'é' };

/** HTML character references to text; unknown named references are left as written. */
export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, ref: string) => {
    if (ref[0] === '#') {
      const code = ref[1]?.toLowerCase() === 'x' ? parseInt(ref.slice(2), 16) : parseInt(ref.slice(1), 10);
      return Number.isFinite(code) && code > 0 ? String.fromCodePoint(code === 160 ? 32 : code) : whole;
    }
    return ENTITIES[ref.toLowerCase()] ?? whole;
  });
}

/**
 * A forgiving tree builder: enough for the City's generated markup, which
 * closes its elements. An end tag with no open match is ignored; an end tag
 * closes every element opened inside the one it matches.
 */
export function parseHtml(html: string): Element {
  const root: Element = { tag: '#root', classes: [], children: [] };
  let current = root;
  const token = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!doctype[^>]*>|<(script|style|noscript|template)\b[^>]*>[\s\S]*?<\/\1\s*>|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|[^<]+|</g;
  for (const match of html.matchAll(token)) {
    const [whole, , endTag, startTag, attributes, selfClosing] = match;
    if (endTag) {
      const tag = endTag.toLowerCase();
      let open: Element | undefined = current;
      while (open && open.tag !== tag) open = open.parent;
      if (open?.parent) current = open.parent;
    } else if (startTag) {
      const tag = startTag.toLowerCase();
      const cls = /\bclass\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attributes ?? '');
      const element: Element = {
        tag,
        classes: (cls?.[1] ?? cls?.[2] ?? cls?.[3] ?? '').split(/\s+/).filter(Boolean),
        children: [],
        parent: current,
      };
      current.children.push(element);
      if (!VOID.has(tag) && !selfClosing) current = element;
    } else if (!whole.startsWith('<')) {
      current.children.push(decodeEntities(whole));
    }
  }
  return root;
}

function* walk(node: Element): Generator<Element> {
  for (const child of node.children) {
    if (typeof child === 'string') continue;
    yield child;
    yield* walk(child);
  }
}

const has = (element: Element, cls: string) => element.classes.includes(cls);
const find = (node: Element, predicate: (e: Element) => boolean) => {
  for (const element of walk(node)) if (predicate(element)) return element;
  return undefined;
};

/** Visible text of a subtree: blocks on their own lines, list items marked, table cells joined. */
export function textOf(node: Node): string {
  const out: string[] = [];
  const render = (n: Node): void => {
    if (typeof n === 'string') {
      out.push(n.replace(/\s+/g, ' '));
      return;
    }
    if (SKIP.has(n.tag) || has(n, 'sr-only') || has(n, 'AgendaHeaderLogo')) return;
    if (n.tag === 'br') {
      out.push('\n');
      return;
    }
    if (n.tag === 'td' || n.tag === 'th') {
      out.push(' | ');
    }
    const block = BLOCK.has(n.tag);
    if (block) out.push('\n');
    if (n.tag === 'li') out.push('- ');
    for (const child of n.children) render(child);
    if (has(n, 'Label')) out.push(' ');
    if (block) out.push('\n');
  };
  render(node);
  const lines = out
    .join('')
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').replace(/^(\s*\|\s*)+/, '').replace(/(\s*\|\s*)+$/, '').trim())
    .filter((line) => line !== '');
  // A list item whose content starts with a block renders its marker alone.
  const merged: string[] = [];
  for (const line of lines) {
    if (merged.at(-1) === '-' && line !== '-') merged[merged.length - 1] = `- ${line}`;
    else merged.push(line);
  }
  return merged.filter((line) => line !== '-').join('\n');
}

export type MinutesItem = {
  number: string;
  title: string;
  /** Nesting depth: 1 for a top-level item such as "7.", 2 for "7.6". */
  depth: number;
  /** The item whole: number and title, attachment list, minutes or description, every motion and vote. */
  text: string;
};

export type MeetingPage = {
  layout: 'minutes' | 'agenda';
  /** Meeting title, number, date, time, location and the attendance list where the page has one. */
  header: string;
  items: MinutesItem[];
};

/**
 * Read an archived Meeting.aspx page into its header and items.
 *
 * @throws when the page has no AgendaHeader or no items, so a changed page
 *   format stops a build instead of producing an empty selection.
 */
export function parseMeetingPage(html: string): MeetingPage {
  const root = parseHtml(html);
  const header = find(root, (e) => e.tag === 'header' && has(e, 'AgendaHeader')) ?? find(root, (e) => has(e, 'AgendaHeader'));
  if (!header) throw new Error('no AgendaHeader: not an eScribe meeting page, or its format has changed');
  const items: MinutesItem[] = [];
  let minutes = false;
  for (const element of walk(root)) {
    if (!has(element, 'AgendaItem') || !element.classes.some((c) => /^AgendaItem\d+$/.test(c))) continue;
    const counter = find(element, (e) => has(e, 'AgendaItemCounter'));
    const title = find(element, (e) => has(e, 'AgendaItemTitle'));
    let depth = 0;
    for (let up = element.parent; up; up = up.parent) if (has(up, 'AgendaItemContainer')) depth += 1;
    const number = counter ? textOf(counter) : '';
    const titleText = title ? textOf(title) : '';
    const parts = [`${number} ${titleText}`.trim()];
    const attachments = find(element, (e) => has(e, 'AgendaItemAttachmentsList'));
    if (attachments) {
      const list = textOf(attachments);
      if (list) parts.push(`Attachments:\n${list}`);
    }
    for (const row of walk(element)) {
      if (!has(row, 'AgendaItemContentRow')) continue;
      if (find(row, (e) => has(e, 'AgendaItemMinutes') || has(e, 'AgendaItemMotions'))) minutes = true;
      const text = textOf(row);
      if (text) parts.push(text);
    }
    items.push({ number, title: titleText, depth, text: parts.join('\n') });
  }
  if (items.length === 0) throw new Error('no agenda items found: the page format has changed');
  const attendance = find(header, (e) => has(e, 'AgendaHeaderAttendance'));
  return { layout: minutes || attendance ? 'minutes' : 'agenda', header: textOf(header), items };
}

export type SelectionRule = {
  version: number;
  terms: string[];
  /** Why this version exists: the first list, or the missed item that forced a revision. */
  reason: string;
};

const RULES_FILE = fileURLToPath(new URL('./minutes-selection-rules.yaml', import.meta.url));

/** Every published version of the selection rule, oldest first. */
export function selectionRules(file = RULES_FILE): SelectionRule[] {
  const rules = (YAML.parse(readFileSync(file, 'utf8')) as { versions: SelectionRule[] }).versions;
  rules.forEach((rule, index) => {
    if (rule.version !== index + 1 || !Array.isArray(rule.terms) || rule.terms.length === 0 || !rule.reason) {
      throw new Error(`${path.basename(file)}: version ${index + 1} is malformed`);
    }
  });
  return rules;
}

export const SELECTION_MATCH =
  'case-insensitive, on the item number, title and whole text; a term made only of digits must not touch another digit';

function termPattern(term: string): RegExp {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return /^\d+$/.test(term) ? new RegExp(`(?<!\\d)${escaped}(?!\\d)`) : new RegExp(escaped, 'i');
}

/** The rule's terms an item matches, in the rule's order; empty when it matches none. */
export function matchedTerms(item: MinutesItem, rule: SelectionRule): string[] {
  return rule.terms.filter((term) => termPattern(term).test(item.text));
}

/**
 * The carried text for a page: its header, then every item the rule
 * matches, whole, in page order. A "Roll Call" item is part of the header,
 * because eScribe minutes record absences there and D-0047 carries attendance
 * with every page.
 */
export function carriedPageText(page: MeetingPage, rule: SelectionRule): string {
  const rollCall = page.items.filter((item) => /^roll call$/i.test(item.title));
  const parts = [`MEETING HEADER\n${page.header}`, ...rollCall.map((item) => `ATTENDANCE (item ${item.number})\n${item.text}`)];
  for (const item of page.items) {
    if (matchedTerms(item, rule).length > 0) parts.push(`ITEM ${item.number}\n${item.text}`);
  }
  return `${parts.join('\n\n')}\n`;
}
