import { parse } from 'yaml';

export interface MethodologyChange {
  version: string;
  date: string;
  scope?: string;
  note: string;
  summary?: string;
  highlights: string[];
  links: MethodologyChangeLink[];
  changes: string[];
}

export interface MethodologyChangeLink {
  label: string;
  href: string;
}

/**
 * `methodology/changelog.yaml` (spec §3), read at build time.
 *
 * The file is owned by the pipeline, not by the site, so it is read as raw text
 * rather than declared as a content collection: it is a top-level list, it may
 * legitimately not exist yet, and its shape should be free to grow without
 * breaking the build. `import.meta.glob` resolves it relative to this source
 * file at build time — unlike `import.meta.url`, which points into the bundle —
 * and yields nothing at all when the file is absent.
 */
const sources = import.meta.glob<string>('../../methodology/changelog.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const text = (value: unknown): string =>
  value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? '').trim();

export function methodologyChanges(): MethodologyChange[] {
  return Object.values(sources)
    .flatMap((raw) => {
      const parsed: unknown = parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    })
    .filter((entry): entry is Record<string, unknown> => typeof entry === 'object' && entry !== null)
    .map((entry) => ({
      version: text(entry.version),
      date: text(entry.date),
      scope: entry.scope === undefined ? undefined : text(entry.scope),
      note: text(entry.note ?? entry.summary),
      summary: entry.summary === undefined ? undefined : text(entry.summary),
      highlights: Array.isArray(entry.highlights) ? entry.highlights.map(text).filter(Boolean) : [],
      links: Array.isArray(entry.links)
        ? entry.links.flatMap((link) => {
            if (typeof link !== 'object' || link === null) return [];
            const label = text(link.label);
            const href = text(link.href);
            return label !== '' && href !== '' ? [{ label, href }] : [];
          })
        : [],
      changes: Array.isArray(entry.changes) ? entry.changes.map(text) : [],
    }))
    .filter((entry) => entry.version !== '')
    .sort((a, b) => b.date.localeCompare(a.date) || b.version.localeCompare(a.version));
}
