# Reader-first methodology changes design

## Goal

Make `/methodology/changes` readable at a glance while keeping the existing
methodology changelog as the single source of truth and retaining its full
audit detail.

## Design

The page remains a reverse-chronological version timeline with the existing
desktop and mobile table of contents. Each version renders a human-readable
label, date, short summary, a list of plain-language highlights, and a small
set of relevant reader-facing links. The existing long `note` remains
available behind a native `Full change note` disclosure.

The YAML changelog becomes the content contract for this presentation:

- `version`, `date`, `scope`, and `note` retain their current meanings.
- `summary` is the short lead shown first for the version.
- `highlights` is an ordered list of the concrete changes, written for a
  reader rather than as file paths.
- `links` is an optional list of `{ label, href }` objects pointing to public
  methodology sections or affected public pages.

Future entries should include all three reader-facing fields. The template
will fall back to the existing note when an older or incomplete entry lacks
them, so the page remains resilient during migration.

## Scope

Modify only the changelog data model, the methodology changelog data, the
changes page, and the public design documentation that defines the format.
Do not alter verdicts, story evidence, review artifacts, or methodology rules.
Do not add dependencies or a new component.

## Layout

1. Keep the page introduction, but tighten it to explain what the page tracks
   and why version history matters.
2. Render each entry as an article inside the ordered version list.
3. Put the version, date, and readable scope label in the entry header.
4. Render the summary as the lead paragraph.
5. Render `highlights` under a `What changed` heading as a normal list.
6. Render `links` under `Read next` as underlined links with accessible focus
   states.
7. Keep `note` in a native disclosure labelled `Full change note`.

## Data flow and fallback

`src/lib/methodology.ts` reads and normalizes the YAML at build time. It will
normalize optional summaries, highlights, and links without changing the
existing sort order. The page will use the structured fields when present and
fall back to `note` for incomplete entries. Link data stays in the changelog,
not in the template, so future entries can add relevant destinations without
editing page logic.

## Verification

- Run `npm run validate && npm test && npm run build`.
- Serve the built site locally and use Playwright to inspect the changes page
  at desktop and mobile widths.
- Verify all version anchors, internal links, the full-note disclosures, and
  the empty-history fallback remain valid.
- Confirm the working tree contains only the scoped changes.
