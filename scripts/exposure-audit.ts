/**
 * Public-exposure audit (methodology/exposure-audit.md).
 *
 * The repo is public. Everything tracked in git is published, whether or not
 * it is linked from the site. This script is the deterministic half of the
 * recurring audit: it scans the *tracked* tree — `git ls-files`, so untracked
 * scratch files and gitignored archives are out of scope by construction — and
 * reports what it finds by class.
 *
 *   npm run audit:exposure            # fail classes block, warns are printed
 *   npm run audit:exposure -- --strict  # warns block too
 *
 * Fail classes are mechanical: a match is a defect, so they gate CI. Warn
 * classes need a human or AI judgement (a councillor's name in a `publisher`
 * field is fine; a resident's home address is not), so they are surfaced for
 * disposition in the dated audit record, never auto-blocked.
 *
 * Self-exclusion: the pattern-matching classes skip this file, because it
 * necessarily contains the very patterns it hunts for. The structural classes
 * (private evidence, rights) still cover it like any other tracked path.
 */
import { execFileSync } from 'node:child_process';
import { lstatSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT, repoPath, listFiles, loadYaml } from './lib/repo.ts';

// ---------------------------------------------------------------------------
// Classes
// ---------------------------------------------------------------------------

type Severity = 'fail' | 'warn';

type ClassName =
  | 'SECRETS'
  | 'PRIVATE-EVIDENCE LEAK'
  | 'RIGHTS'
  | 'LOCAL PATHS'
  | 'PII'
  | 'LONG QUOTES';

const SEVERITY: Record<ClassName, Severity> = {
  SECRETS: 'fail',
  'PRIVATE-EVIDENCE LEAK': 'fail',
  RIGHTS: 'fail',
  'LOCAL PATHS': 'fail',
  PII: 'warn',
  'LONG QUOTES': 'warn',
};

type Finding = {
  class: ClassName;
  file: string;
  line: number;
  detail: string;
  excerpt: string;
};

const findings: Finding[] = [];

function report(cls: ClassName, file: string, line: number, detail: string, excerpt: string) {
  findings.push({ class: cls, file, line, detail, excerpt: squeeze(excerpt) });
}

/** One line, trimmed, capped — enough to locate the match, never the payload. */
function squeeze(text: string, limit = 120): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > limit ? `${flat.slice(0, limit)}…` : flat;
}

// ---------------------------------------------------------------------------
// Line patterns
//
// Precision over recall for the fail classes: a false positive here blocks
// every push, so each pattern is anchored to a real credential format rather
// than to entropy. Recall is the AI review pass's job, not this script's.
// ---------------------------------------------------------------------------

/** `ignore` discards a shape-correct match that is known not to be a leak. */
type LinePattern = { cls: ClassName; detail: string; re: RegExp; ignore?: (hit: string) => boolean };

const LINE_PATTERNS: LinePattern[] = [
  {
    cls: 'SECRETS',
    detail: 'private key block',
    re: /-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----/,
  },
  { cls: 'SECRETS', detail: 'OpenAI-style API key', re: /\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}/ },
  {
    cls: 'SECRETS',
    detail: 'GitHub token',
    re: /\b(?:ghp|gho|ghu|ghs|ghr|github_pat)_[A-Za-z0-9_]{20,}/,
  },
  { cls: 'SECRETS', detail: 'AWS access key id', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { cls: 'SECRETS', detail: 'Google API key', re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { cls: 'SECRETS', detail: 'Slack token', re: /\bxox[abprs]-[A-Za-z0-9-]{10,}/ },
  {
    cls: 'SECRETS',
    detail: 'bearer token',
    re: /\b[Aa]uthorization["'\s:]*[Bb]earer\s+[A-Za-z0-9._~+/-]{20,}|\b[Bb]earer\s+[A-Za-z0-9._~+/-]{30,}={0,2}/,
  },
  {
    cls: 'SECRETS',
    detail: 'credential assignment with a literal value',
    // A literal on the right-hand side only. Env lookups, template
    // interpolations, placeholders and empty strings are how secrets are
    // *supposed* to appear in a public repo, so they are not matches.
    re: /\b(?:password|passwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret)["']?\s*[:=]\s*["'][^"'\s]{8,}["']/i,
    ignore: (hit) => PLACEHOLDER_VALUE.test(hit),
  },
  {
    cls: 'LOCAL PATHS',
    detail: 'absolute local home path',
    re: /\/(?:Users|home)\/[A-Za-z0-9._-]+/,
  },
  {
    cls: 'PII',
    detail: 'email address',
    re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
    ignore: (hit) => hit.toLowerCase().endsWith(SITE_EMAIL_DOMAIN),
  },
  {
    cls: 'PII',
    detail: 'phone number',
    re: /\(\d{3}\)\s?\d{3}[-.\s]\d{4}\b|\b\d{3}[-.]\d{3}[-.]\d{4}\b/,
  },
  {
    cls: 'PII',
    detail: 'Canadian postal code',
    // Restricted to the letters Canada Post actually issues (no D, F, I, O, Q,
    // U anywhere; no W or Z leading) and refused after a `#`, which is what
    // separates a postal code from a six-digit hex colour like #E8E9E6.
    re: /(?<![#0-9A-Za-z])[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ -]?\d[ABCEGHJKLMNPRSTVWXYZ]\d(?![0-9A-Za-z])/,
  },
  {
    cls: 'PII',
    detail: 'street address',
    // Two shapes: Edmonton's numbered grid with a house number
    // ("10250 101 Street"), and a named street with a house number
    // ("204 Jasper Avenue"). A bare "102 Avenue" is a street *name* and
    // appears constantly in civic sources, so it is deliberately not matched.
    re: /\b\d{3,5}\s*-?\s*\d{2,3}\s+(?:Street|St|Avenue|Ave)\b|\b\d{1,5}\s+[A-Z][a-z]+\s+(?:Street|Avenue|Road|Drive|Boulevard|Lane|Crescent|Close|Way|Trail)\b/,
  },
];

/** Placeholders that satisfy the credential-assignment shape but hold nothing. */
const PLACEHOLDER_VALUE =
  /(?:process\.env|import\.meta\.env|\$\{|\$\(|<[^>]*>|xxx+|\*\*\*|changeme|redacted|placeholder|example|your[_-]?|secrets\.)/i;

const SITE_EMAIL_DOMAIN = '@yegfacts.ca';

const SELF = 'scripts/exposure-audit.ts';

// ---------------------------------------------------------------------------
// Tracked tree
// ---------------------------------------------------------------------------

function trackedFiles(): string[] {
  const out = execFileSync('git', ['ls-files', '-z'], { cwd: REPO_ROOT, encoding: 'utf8' });
  return out.split('\0').filter(Boolean).sort();
}

/** Null byte in the first 8 KiB — the same heuristic git itself uses. */
function isBinary(buffer: Buffer): boolean {
  return buffer.subarray(0, 8192).includes(0);
}

// ---------------------------------------------------------------------------
// Scans
// ---------------------------------------------------------------------------

function scanLines(relPath: string, text: string) {
  if (relPath === SELF) return;
  for (const [index, line] of text.split('\n').entries()) {
    for (const pattern of LINE_PATTERNS) {
      const match = pattern.re.exec(line);
      if (!match || pattern.ignore?.(match[0])) continue;
      report(pattern.cls, relPath, index + 1, pattern.detail, line);
    }
  }
}

type RegistryEntry = {
  id?: string;
  archive?: { visibility?: string; path?: string };
  rights?: { redistribution?: string };
};

function loadRegistry(): { file: string; entry: RegistryEntry }[] {
  return listFiles(repoPath('evidence', 'registry'), ['.yaml']).map((file) => ({
    file: path.relative(REPO_ROOT, file),
    entry: loadYaml<RegistryEntry>(file),
  }));
}

/**
 * Private-holding archives are gitignored, not merely absent. Both halves are
 * checked: a tracked path under a private directory, and a registry entry that
 * declares `visibility: private` while its bytes sit in the index anyway.
 */
function scanPrivateEvidence(tracked: Set<string>, registry: { file: string; entry: RegistryEntry }[]) {
  for (const relPath of tracked) {
    if (relPath.startsWith('evidence/private/') || relPath.startsWith('evidence/staging/')) {
      report('PRIVATE-EVIDENCE LEAK', relPath, 1, 'tracked file under a private evidence directory', relPath);
    }
  }
  for (const { file, entry } of registry) {
    const archive = entry.archive;
    if (archive?.visibility !== 'private') continue;
    if (archive.path && tracked.has(archive.path)) {
      report(
        'PRIVATE-EVIDENCE LEAK',
        file,
        1,
        `${entry.id ?? 'entry'} is visibility: private but its archive is tracked`,
        archive.path,
      );
    }
  }
}

/**
 * Every byte published under evidence/files/ must trace to a registry entry
 * that says redistributing it is allowed. An archive with no entry is the
 * dangerous case: nothing in the repo asserts a right to republish it.
 */
function scanRights(tracked: Set<string>, registry: { file: string; entry: RegistryEntry }[]) {
  const byPath = new Map(
    registry.filter(({ entry }) => entry.archive?.path).map(({ entry }) => [entry.archive!.path!, entry]),
  );
  for (const relPath of tracked) {
    if (!relPath.startsWith('evidence/files/')) continue;
    if (path.basename(relPath) === '.gitkeep') continue;
    const entry = byPath.get(relPath);
    if (!entry) {
      report('RIGHTS', relPath, 1, 'published archive has no registry entry', relPath);
      continue;
    }
    const redistribution = entry.rights?.redistribution;
    if (redistribution !== 'allowed') {
      report(
        'RIGHTS',
        relPath,
        1,
        `${entry.id ?? 'entry'} has rights.redistribution: ${redistribution ?? '(missing)'}`,
        relPath,
      );
    }
  }
}

const QUOTE_WORD_LIMIT = 75;
const QUOTE_FIELD = /"quote"\s*:\s*("(?:[^"\\]|\\.)*")/;

/**
 * Reviewer artifacts quote sources verbatim. Short attributed quotation is fair
 * dealing; a long one is republication. JSON strings never contain a literal
 * newline, so a per-line match gives an exact location.
 */
function scanLongQuotes(relPath: string, text: string) {
  if (!relPath.startsWith('reviews/') || !relPath.endsWith('.json')) return;
  for (const [index, line] of text.split('\n').entries()) {
    const match = QUOTE_FIELD.exec(line);
    if (!match) continue;
    let quote: string;
    try {
      quote = JSON.parse(match[1]!) as string;
    } catch {
      continue;
    }
    const words = quote.trim().split(/\s+/).filter(Boolean).length;
    if (words > QUOTE_WORD_LIMIT) {
      report('LONG QUOTES', relPath, index + 1, `${words} words (limit ${QUOTE_WORD_LIMIT})`, quote);
    }
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const strict = process.argv.includes('--strict');
const tracked = trackedFiles();
const trackedSet = new Set(tracked);
const registry = loadRegistry();

let scanned = 0;
let skippedBinary = 0;

for (const relPath of tracked) {
  const absolute = path.join(REPO_ROOT, relPath);
  // `git ls-files` also lists symlinks and submodule gitlinks. Neither has
  // bytes worth scanning here, and reading one as a file throws, so both are
  // filtered by lstat rather than followed.
  const stat = lstatSync(absolute, { throwIfNoEntry: false });
  if (!stat?.isFile()) continue;
  const buffer = readFileSync(absolute);
  if (isBinary(buffer)) {
    skippedBinary += 1;
    continue;
  }
  scanned += 1;
  const text = buffer.toString('utf8');
  scanLines(relPath, text);
  scanLongQuotes(relPath, text);
}

scanPrivateEvidence(trackedSet, registry);
scanRights(trackedSet, registry);

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

const CLASSES = Object.keys(SEVERITY) as ClassName[];

for (const cls of CLASSES) {
  const hits = findings.filter((finding) => finding.class === cls);
  if (hits.length === 0) continue;
  console.log(`\n${cls} (${SEVERITY[cls]}) — ${hits.length}`);
  for (const hit of hits) {
    console.log(`  ${hit.file}:${hit.line}  ${hit.detail}`);
    console.log(`    ${hit.excerpt}`);
  }
}

const failCount = findings.filter((finding) => SEVERITY[finding.class] === 'fail').length;
const warnCount = findings.length - failCount;

console.log(
  `\nexposure-audit: ${scanned} tracked text files scanned ` +
    `(${skippedBinary} binary skipped, ${tracked.length} tracked total), ` +
    `${registry.length} registry entries`,
);
for (const cls of CLASSES) {
  const count = findings.filter((finding) => finding.class === cls).length;
  console.log(`  ${SEVERITY[cls] === 'fail' ? 'fail' : 'warn'}  ${cls.padEnd(21)} ${count}`);
}

if (failCount > 0) {
  console.error(`\nexposure-audit: ${failCount} finding(s) in fail classes`);
  process.exit(1);
}
if (strict && warnCount > 0) {
  console.error(`\nexposure-audit: --strict — ${warnCount} warning(s) need disposition`);
  process.exit(1);
}
console.log(
  warnCount > 0
    ? `\nexposure-audit: OK — no fail-class findings; ${warnCount} warning(s) need disposition in the audit record`
    : '\nexposure-audit: OK — clean',
);
