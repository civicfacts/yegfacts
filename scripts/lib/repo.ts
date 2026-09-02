/**
 * Filesystem access shared by the pipeline scripts.
 *
 * The site reads content through Astro's content layer; these scripts cannot
 * (`astro:content` only exists inside a build), so they read the same files
 * directly. Everything here is deliberately dumb: locate files, parse them,
 * hash them. Rules live in the scripts that call it.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { servedPath } from '../../src/lib/site.ts';

/** Repo root, resolved from this file's location rather than `process.cwd()`. */
export const REPO_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));

export function repoPath(...segments: string[]): string {
  return path.join(REPO_ROOT, ...segments);
}

/** A path relative to the repo root, for error messages that stay stable. */
export function relative(absolute: string): string {
  return path.relative(REPO_ROOT, absolute) || '.';
}

export function readText(absolute: string): string {
  return readFileSync(absolute, 'utf8');
}

export function sha256File(absolute: string): string {
  return createHash('sha256').update(readFileSync(absolute)).digest('hex');
}

export function sha256(data: string | Uint8Array): string {
  return createHash('sha256').update(data).digest('hex');
}

/** Files directly inside `dir` matching one of `extensions`, sorted, or [] if absent. */
export function listFiles(dir: string, extensions: string[]): string[] {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];
  return readdirSync(dir)
    .filter((name) => extensions.includes(path.extname(name)))
    .sort()
    .map((name) => path.join(dir, name));
}

export function listDirectories(dir: string): string[] {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name))
    .sort();
}

/**
 * Every page the build wrote under `dist/`, sorted. Pagefind's bundle is
 * skipped: it is generated, and its fragments are copies of page text by design.
 */
export function builtPages(dist: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dist, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === 'pagefind') continue;
      out.push(...builtPages(path.join(dist, entry.name)));
    } else if (entry.name.endsWith('.html')) {
      out.push(path.join(dist, entry.name));
    }
  }
  return out.sort();
}

/**
 * The URL a built file is served at, by the same rule the pages use for their
 * canonical (`servedPath`): `dist/facts/electric-buses.html` →
 * `/facts/electric-buses`, `dist/index.html` → `/`. The build writes one file
 * per route (`build.format: 'file'`), but the `/index.html` case is kept
 * because that is still how the home page lands.
 */
export function builtPageUrl(dist: string, file: string): string {
  const relative = `/${path.relative(dist, file).split(path.sep).join('/')}`;
  return servedPath(relative);
}

export type Loaded<T> = { file: string; data: T };

export function loadYaml<T = unknown>(absolute: string): T {
  return YAML.parse(readText(absolute)) as T;
}

/**
 * Split `---` YAML frontmatter off an MDX file.
 *
 * Astro's own parser is not reachable from here, and the repo's frontmatter is
 * a plain YAML block delimited by `---` on its own line, so a split is exact.
 * Throws when the block is missing, which is itself a validation failure.
 */
export function loadFrontmatter<T = unknown>(absolute: string): { data: T; body: string } {
  const text = readText(absolute).replace(/^﻿/, '');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!match) throw new Error('missing `---` YAML frontmatter block');
  return { data: YAML.parse(match[1]!) as T, body: match[2] ?? '' };
}

/** The highest-numbered methodology version in `methodology/changelog.yaml`. */
export type MethodologyEntry = {
  version: string;
  date: string;
  scope?: string;
  note?: string;
  summary?: string;
  highlights?: string[];
  links?: Array<{ label?: string; href?: string }>;
};

export function loadMethodologyChangelog(): MethodologyEntry[] {
  const entries = loadYaml<MethodologyEntry[]>(repoPath('methodology', 'changelog.yaml'));
  if (!Array.isArray(entries)) throw new Error('methodology/changelog.yaml must be a YAML array');
  return entries;
}

/** Highest version in the changelog, whatever order the file is written in. */
export function highestMethodologyVersion(entries: MethodologyEntry[]): string {
  const versions = entries
    .map((entry) => String(entry.version ?? ''))
    .filter(Boolean)
    .map((version) => {
      const [major = 0, minor = 0] = version.split('.').map(Number);
      return { version, major, minor };
    });
  if (versions.length === 0) throw new Error('methodology/changelog.yaml has no entries');
  return versions.reduce((highest, candidate) =>
    (candidate.major - highest.major || candidate.minor - highest.minor) > 0 ? candidate : highest,
  ).version;
}

export function currentMethodologyVersion(): string {
  return highestMethodologyVersion(loadMethodologyChangelog());
}

export function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/**
 * YAML turns a bare `2026-08-31` into a Date. Content is authored both ways, so
 * dates are normalised to the string form before any comparison.
 */
export function asDateString(value: unknown): unknown {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}
