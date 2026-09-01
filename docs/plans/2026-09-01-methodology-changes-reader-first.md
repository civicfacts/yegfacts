# Reader-first methodology changes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn `/methodology/changes` into a scannable reader-first timeline while keeping the full methodology notes and future entries in one structured changelog source.

**Architecture:** Extend the build-time changelog normalizer with optional reader-facing fields, then render those fields in the existing Astro page. Migrate the five current entries to summaries, highlights, and public links; keep each original note in a native disclosure. Document and validate the entry contract so future work follows the same format.

**Tech Stack:** Astro 7, TypeScript, YAML, Tailwind CSS utilities, Vitest repository checks, Playwright CLI for browser smoke testing.

---

### Task 1: Extend the changelog data contract

**Files:**
- Modify: `src/lib/methodology.ts`
- Modify: `scripts/lib/repo.ts`
- Modify: `scripts/validate.ts:201-220`

**Step 1: Add normalized reader-facing fields**

Extend the `MethodologyChange` type with optional `summary`, `highlights`, and
`links` data. Define a small link type with `label` and `href`. Normalize
missing arrays to empty arrays and trim text exactly as the existing fields do.

Extend the repository-side `MethodologyEntry` type with the same fields so the
validator can inspect them.

**Step 2: Enforce the future-entry contract**

Update `checkMethodologyChangelog()` so every methodology version requires a
non-empty `summary`, a non-empty `highlights` array, and links with non-empty
labels and hrefs. Keep the existing version, date, and note checks. Reject
malformed link objects instead of allowing a broken reader-facing page.

**Step 3: Run the validator before migrating data**

Run: `npm run validate`

Expected: FAIL because the five existing entries do not yet have the new
reader-facing fields. This confirms the validator is checking the new rule.

---

### Task 2: Add reader-facing metadata to the current changelog

**Files:**
- Modify: `methodology/changelog.yaml`
- Modify: `docs/DESIGN.md` in the changelog section

**Step 1: Add summaries and highlights**

For versions 1.4 through 1.0, add a concise summary and two to four bullets
that restate only the changes already present in each `note`. Keep the original
`note` text unchanged as the complete record.

**Step 2: Add relevant public links**

Add one or two links per version to existing public methodology sections or
public story pages. Use internal routes for reader context, including:

- `/methodology#stages`
- `/methodology#vocabulary`
- `/methodology#synthesis`
- `/methodology#panel-quality`
- `/facts/electric-buses`

Do not link readers to private review artifacts or add new factual claims.

**Step 3: Document the ongoing format**

Update the `docs/DESIGN.md` changelog paragraph to state that every entry has
`version`, `date`, `scope`, `summary`, `highlights`, `links`, and `note`, and
that the public page leads with the reader-facing fields while retaining the
full note.

**Step 4: Run the validator**

Run: `npm run validate`

Expected: PASS.

---

### Task 3: Render the reader-first timeline

**Files:**
- Modify: `src/pages/methodology/changes.astro`

**Step 1: Add small display helpers**

Keep the existing version anchor helper and add a scope-label formatter that
turns hyphenated scope values into readable sentence-style labels. Preserve
the current reverse date/version sort from `methodologyChanges()`.

**Step 2: Replace paragraph-first entries**

Keep the ordered list and table-of-contents anchors. For each version, render:

1. version, date, and readable scope label;
2. the short `summary` lead;
3. a `What changed` heading and normal unordered list from `highlights`;
4. a `Read next` list of links from `links`;
5. a native `details` disclosure labelled `Full change note` containing the
   original `note`.

If a field is absent, retain the design fallback: render the existing note and
omit empty highlight/link sections. The migrated entries should use all fields.

**Step 3: Keep the visual system restrained**

Use existing typography, rule, link, and spacing utilities. Do not add cards,
shadows, JavaScript, or dependencies. Ensure focus states remain visible and
links have descriptive labels.

**Step 4: Build the page**

Run: `npm run build`

Expected: PASS and `dist/methodology/changes/index.html` contains all five
versions, list items, links, and closed full-note disclosures.

---

### Task 4: Run repository checks and browser QA

**Files:**
- No additional source files.

**Step 1: Run the required repository checks**

Run: `npm run validate && npm test && npm run build`

Expected: all commands PASS.

**Step 2: Serve the built site**

Run: `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist`

**Step 3: Inspect with Playwright**

Open `http://127.0.0.1:4173/methodology/changes/` with the Playwright CLI.
Check a desktop viewport and a mobile viewport. Confirm:

- the page reads as summary → highlights → links → optional full note;
- the mobile `On this page` disclosure still jumps to each version;
- links resolve to existing pages and methodology anchors;
- full notes are closed by default and expand without layout breakage;
- no horizontal overflow or clipped text appears at mobile width.

Save any screenshots under `output/playwright/` only if they are useful for
review.

**Step 4: Confirm scope**

Run: `git status --short` and `git diff --check`.

Expected: only the changelog data/model/page/documentation changes plus the
already committed design and implementation-plan records are present.
