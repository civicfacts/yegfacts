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
};

export function loadMethodologyChangelog(): MethodologyEntry[] {
  const entries = loadYaml<MethodologyEntry[]>(repoPath('methodology', 'changelog.yaml'));
  if (!Array.isArray(entries)) throw new Error('methodology/changelog.yaml must be a YAML array');
  return entries;
}

export function currentMethodologyVersion(): string {
  const entries = loadMethodologyChangelog();
  const last = entries.at(-1);
  if (!last?.version) throw new Error('methodology/changelog.yaml has no entries');
  return String(last.version);
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
