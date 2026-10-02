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
 *
 * Members of the public are withheld (D-0047 addendum, REDACTION_RULE): in a
 * minutes list introduced by "The following public speaker(s) ..." or "The
 * following member(s) of the delegation ..." (a delegation that is not the
 * City Administration's), each listed person's name becomes "[member of the
 * public]" and any organisation after the name is kept (empty elements between
 * the introduction and its list are skipped); an attachment titled in
 * eScribe's speaker-panel form "<item number> - Panel <n> - <rest>" keeps its
 * title up to the panel number and withholds the rest, and any other title is
 * unchanged (the item number, an optional hyphen, "Panel <n>" in any case and
 * an optional separator are enough: "7.6-Panel 4 <name>.pdf" and "7.6 Panel 3
 * <name>.pdf" are the same form); and in a procedural "Requests to Speak" motion (an item titled
 * "Request(s) to Speak" whose motion reads "That <body> hear from the following
 * ... speaker(s)"), each listed entry is withheld unless it begins with an
 * agenda item number, while the operative words, mover, vote and result stay.
 * No other motion text is touched, nor anyone the page names as an
 * office-holder in its attendance list or roll call (compared without a
 * leading Mayor, Deputy Mayor, Acting Mayor, Councillor, Chair or Vice-Chair,
 * and ignoring case), nor Administration's delegation (City staff in role).
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

/** The published rule for withholding members of the public; the manifest records its version. */
export const REDACTION_RULE = {
  version: 4,
  rule:
    'In a minutes list introduced by "The following public speaker(s)" or "The following member(s) of the delegation" (not Administration\'s delegation), each listed name that is not an office-holder named in the page\'s attendance list or roll call becomes "[member of the public]"; an organisation after the name is kept. An attachment whose title starts with an agenda item number, then optionally a hyphen, then "Panel <n>" (any case), becomes "<item number> - Panel <n> - [member of the public]"; no other title changes. In a Requests to Speak motion ("That ... hear from the following ... speakers"), each listed entry is withheld unless it begins with an agenda item number, and the operative words, mover, vote and result are kept. No other motion text is changed. Office-holders are matched without a leading Mayor, Deputy Mayor, Acting Mayor, Councillor, Chair or Vice-Chair, ignoring case.',
} as const;

export const WITHHELD = '[member of the public]';
const PUBLIC_LIST_INTRO = /^the following (public speakers?|members? of the delegation)\b/i;
const REQUESTS_TO_SPEAK_TITLE = /^requests? to speak\b/i;
const HEAR_FROM_SPEAKERS = /^that .+ hear from the following (?:[a-z]+ )*speakers?\b/i;
const PERSON = /\b(?:[A-Z]\.\s?)+[A-Z][A-Za-z'’-]+(?:[ -][A-Z][A-Za-z'’-]+)?/g;
/** An agenda item number at the start of an entry: "7.6", "5.1.2". */
const ITEM_NUMBER = /^\d+(\.\d+)+\b/;
const PANEL_ATTACHMENT = /^(\d+(?:\.\d+)+)\s*-?\s*panel\s*(\d+)\s*-?\s*(.+)$/i;
const HONORIFIC = /^(?:deputy mayor|acting mayor|mayor|councillors?|vice-chair|chair)\s+/i;

/** A name as compared with the office-holder list: no leading honorific or role, one space, lower case. */
export function comparableName(name: string): string {
  let bare = name.replace(/\s+/g, ' ').trim();
  while (HONORIFIC.test(bare)) bare = bare.replace(HONORIFIC, '');
  return bare.toLowerCase();
}

/** Office-holders a page names in its attendance list and roll call, compared as comparableName. */
function officeHolders(texts: string[]): Set<string> {
  const names = new Set<string>();
  for (const text of texts) for (const match of text.matchAll(PERSON)) names.add(comparableName(match[0]));
  return names;
}

/**
 * Withhold members of the public inside one item's subtree, in place.
 * @returns how many names were replaced.
 */
function withholdPublic(item: Element, holders: Set<string>): number {
  let replaced = 0;
  /** Replace the name at the start of a list entry, keeping any organisation after a comma. */
  const withholdEntry = (li: Element): void => {
    const text = textOf(li).replace(/^-\s*/, '');
    const comma = text.indexOf(',');
    const name = (comma === -1 ? text : text.slice(0, comma)).trim();
    if (!name || name === WITHHELD || holders.has(comparableName(name))) return;
    li.children = [comma === -1 ? WITHHELD : `${WITHHELD}${text.slice(comma)}`];
    replaced += 1;
  };
  // Requests to Speak: the one motion whose listed people are withheld.
  const titleElement = find(item, (e) => has(e, 'AgendaItemTitle'));
  if (titleElement && REQUESTS_TO_SPEAK_TITLE.test(textOf(titleElement))) {
    for (const motion of [...walk(item)]) {
      if (!has(motion, 'MotionText')) continue;
      const first = find(motion, (e) => e.tag === 'p');
      if (!first || !HEAR_FROM_SPEAKERS.test(textOf(first))) continue;
      for (const li of [...walk(motion)]) {
        if (li.tag !== 'li' || find(li, (e) => e.tag === 'li')) continue;
        const text = textOf(li).replace(/^-\s*/, '');
        // An entry that starts with an agenda item number names the item, not a person.
        if (!text || ITEM_NUMBER.test(text)) continue;
        withholdEntry(li);
      }
    }
  }
  for (const element of [...walk(item)]) {
    if (element.tag !== 'p' || !element.parent) continue;
    const intro = textOf(element);
    if (!PUBLIC_LIST_INTRO.test(intro) || /administration/i.test(intro)) continue;
    let inMotion = false;
    for (let up: Element | undefined = element; up; up = up.parent) if (has(up, 'MotionText')) inMotion = true;
    if (inMotion) continue;
    const siblings = element.parent.children;
    // The first following element with any text; empty paragraphs and whitespace in between are skipped.
    const list = siblings
      .slice(siblings.indexOf(element) + 1)
      .find((n): n is Element => typeof n !== 'string' && textOf(n) !== '');
    if (!list || (list.tag !== 'ul' && list.tag !== 'ol')) continue;
    for (const li of list.children) {
      if (typeof li === 'string' || li.tag !== 'li') continue;
      withholdEntry(li);
    }
  }
  for (const attachment of [...walk(item)]) {
    if (!has(attachment, 'AgendaItemAttachment')) continue;
    const link = find(attachment, (e) => e.tag === 'a') ?? attachment;
    const title = textOf(link);
    const panel = PANEL_ATTACHMENT.exec(title);
    if (!panel || panel[3]!.trim() === WITHHELD) continue;
    link.children = [`${panel[1]} - Panel ${panel[2]} - ${WITHHELD}`];
    replaced += 1;
  }
  return replaced;
}

export type MinutesItem = {
  number: string;
  title: string;
  /** Names of members of the public replaced in this item's text. */
  withheld: number;
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
 * @param options.withhold replace members of the public (REDACTION_RULE);
 *   true by default, false to compare two copies of a page as published.
 * @throws when the page has no AgendaHeader or no items, so a changed page
 *   format stops a build instead of producing an empty selection.
 */
export function parseMeetingPage(html: string, options: { withhold?: boolean } = {}): MeetingPage {
  const root = parseHtml(html);
  const header = find(root, (e) => e.tag === 'header' && has(e, 'AgendaHeader')) ?? find(root, (e) => has(e, 'AgendaHeader'));
  if (!header) throw new Error('no AgendaHeader: not an eScribe meeting page, or its format has changed');
  const itemElements = [...walk(root)].filter((e) => has(e, 'AgendaItem') && e.classes.some((c) => /^AgendaItem\d+$/.test(c)));
  const rollCalls = itemElements.filter((e) => {
    const title = find(e, (t) => has(t, 'AgendaItemTitle'));
    return title !== undefined && /^roll call$/i.test(textOf(title));
  });
  const holders = officeHolders([textOf(header), ...rollCalls.map((e) => textOf(e))]);
  const items: MinutesItem[] = [];
  let minutes = false;
  for (const element of itemElements) {
    const withheld = options.withhold === false ? 0 : withholdPublic(element, holders);
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
    items.push({ number, title: titleText, withheld, depth, text: parts.join('\n') });
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
  return matchedTermsIn(item.text, rule);
}

/** The rule's terms `text` contains under SELECTION_MATCH, in the rule's order. */
export function matchedTermsIn(text: string, rule: Pick<SelectionRule, 'terms'>): string[] {
  return rule.terms.filter((term) => termPattern(term).test(text));
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
