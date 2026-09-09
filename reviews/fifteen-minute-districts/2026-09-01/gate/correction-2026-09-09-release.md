<!-- Independent correction audit. Anthropic claude-opus-5, high effort, Claude Code 2.1.266; dedicated fresh release-audit session. Reviewed 2e2a3e3 against 02a049f on 2026-09-09. Report below is unedited. -->

# PASS

Release check and reader-facing critique of `2e2a3e3` against `02a049f`.
Worktree `.claude/worktrees/districts-evidence-correction`. Read-only; nothing
was edited, staged or committed. Scope: the three changed files. The PDF itself
is the source auditor's job and I did not re-read it for content.

## What the commit actually does

Three files, 70 insertions, 1 deletion.

- `evidence/registry/YF-EV-0015.yaml:8` — the `establishes` string swaps
  "carried 12-0 at second reading in June 2024" for "moved before first reading
  in June 2024 and carried 12-0". Nothing else in the file moves.
- `reviews/fifteen-minute-districts/2026-09-01/correction-2026-09-09-evidence-registry.md`
  — new, 66 lines, the written record.
- `src/content/stories/fifteen-minute-districts.mdx:30-33` — one `correction`
  changelog entry, inserted at the top, date order preserved.

No blockers. Detail below, then the things worth doing before merge that are
not blockers.

## Privacy and copyright

Clean.

- No machine paths. Grep for `/Users/`, `/private/tmp`, `worktrees` and
  `.claude` across the new file returns nothing.
- No archive bytes. `excerpts:` in `evidence/registry/YF-EV-0015.yaml:17` is
  still `[]`. The correction file carries no base64, no page dumps, no local
  path to the PDF. It identifies the archive by SHA-256 only
  (`correction-2026-09-09-evidence-registry.md:29-30`).
- The private archive stays untracked. `git ls-files evidence/private` is
  empty, `.gitignore:5` holds `evidence/private/`.
- The only quotation from the archive is one motion sentence, "That Charter
  Bylaw 24000 and Bylaw 24100 be read a first time"
  (`correction-2026-09-09-evidence-registry.md:33-34`). That is a formal motion
  from a public council hearing. The three people named, E. Rutherford,
  A. Paquette and A. Sohi, are elected officials named in public minutes doing
  official acts. Not PII, and there is no reason to redact them.
- Rights posture on YF-EV-0015 is `redistribution: unclear`, failing closed to
  private (`evidence/registry/YF-EV-0015.yaml:14-16`). The one quoted sentence
  in a public repo file is well inside what the already-shipped
  `gate/source-verification.md:78-98` quotes from the same archive, which
  includes the full text of Amendment 3. This commit adds no new class of
  exposure. Worth saying out loud so it is a decision rather than an accident.

## No overclaiming

Clean, and unusually good about it.

- `correction-2026-09-09-evidence-registry.md:62-66` states flatly that
  independent verification has not happened, that one implementer did the work,
  and that source and release review are pending. That is the honest posture
  and it is what should be in the tree until this gate and the source audit
  land.
- Nothing in the diff claims a refreshed finding. `as_of`, `last_verified` and
  `review_by` are all untouched, as `correction-2026-09-09-evidence-registry.md:55`
  says. Leaving `last_verified` at 2026-09-01 is the right call: one field of one
  registry entry got re-read, not the story.
- `retrieved_on: 2026-09-01` also stays put, which is correct. Re-reading an
  archived copy is not a new retrieval. The file's "what did not change" list
  does not mention it; that is a completeness gap in the record, not an error in
  the change.

## Old reports and frozen artifacts

Preserved. `git diff --stat 02a049f 2e2a3e3` shows one modification, one
addition and one addition; no file under
`reviews/fifteen-minute-districts/2026-09-01/` is modified. The four frozen
artifacts that still carry "second reading" (`combined-evidence.json`,
`gate/source-verification.md`, `round1/claude.json`, `round2/claude.json`) are
left alone, which is what "the record is annotated, never edited" requires.

The new file lands inside a run directory dated 2026-09-01 while being dated
2026-09-09. Precedent supports this: every other run directory carries an
`errata.md` added the same way, and
`correction-2026-09-09-evidence-registry.md:3-4` opens by saying it amends
nothing from that run. The filename departs from the `errata.md` convention, but
this is a different animal, a post-publication correction to live content rather
than an annotation on a review artifact, so a distinct name reads better than
overloading `errata.md`.

## Claims in the correction file, checked

Everything I could check independently holds.

| Claim | Where | Verdict |
|---|---|---|
| Gate report caught this on publication day, KF-2, PARTIAL | file:12-16 | Confirmed. `gate/source-verification.md:76` is `### KF-2 — cited YF-EV-0015 — **PARTIAL**`, and :92 reads "**\"At second reading\" is contradicted by the archives.**" |
| Story and key fact fixed then, and have said "moved before first reading" since 2026-09-01 | file:53-54 | Confirmed. `git show 890f54f` (pre-gate draft) has "At second reading in" in the story and in the key fact; `git show bdbb62d` (publication) has "moved before first reading" in both. `git log -S` shows the phrase entered at bdbb62d and never changed. |
| Archive hash verified and unchanged | file:31-32 | Confirmed independently. `shasum -a 256` of the private archive returns `8ccfb38c…3f673`, matching `evidence/registry/YF-EV-0015.yaml:12`. The file lives in the main checkout, not this worktree, which is expected since it is gitignored. |
| One field changed, plus a changelog entry | file:45-48 | Confirmed by the diff. |
| Wrong for eight days | file:16-17 | 2026-09-01 to 2026-09-09. Correct. |
| Nothing else in live content still says "second reading" | implied by scope | Confirmed. `grep -rn "second reading" src/ evidence/` returns only the two changelog notes that describe the error, at `fifteen-minute-districts.mdx:33` and `:57`. |

Motion sequence, page numbers, page count and the 11-1 and 12-0 amendment votes
are the source auditor's to confirm. The p.27 to p.29 sequence in the correction
file is consistent with what `gate/source-verification.md:92-98` already
established from the same archive, which is corroboration, not verification.

## Repo checks run

Both pass, on the committed tree:

```
validate: OK — 7 stories, 17 claims, 1 commitments, 8 topics, 162 evidence entries
validate-diff: 3 file(s) changed against 02a049f (02a049f6e).
validate-diff: every change that owes an entry has one.
```

`type: correction` is in `CHANGELOG_TYPES` (`src/lib/vocabulary.ts:69-75`) and
already in use on `electric-buses.mdx:54`. I did not run an Astro build; the
schema check covers the frontmatter and the note contains no characters that
would break the quoted YAML string.

## Reader-facing critique of the changelog note

The note at `src/content/stories/fifteen-minute-districts.mdx:33`:

> Our evidence page for the Council minutes still placed the freedom-of-movement
> amendment at second reading. The minutes show it passed before the
> first-reading vote. The article and its key fact already had the correct
> sequence; the evidence description was missed. We have corrected it. The 12-0
> vote and the finding have not changed.

This is the best-written changelog entry on the story. Five short sentences,
each doing one job: what was wrong, what is true, how far it spread, what was
done, what did not move. Set it against the 2026-09-04 entries two lines below,
which run 90-plus words in a single breath and make the reader hold three
clauses at once. Whoever wrote this one had a reader in mind.

"Our evidence page" is accurate, not a euphemism. `establishes` renders as body
text on the evidence page at `src/pages/evidence/[id].astro:91` and again as the
page description at :71, so a reader who followed the citation genuinely saw the
wrong sentence.

Two small things, neither blocking and neither a style preference:

- "its key fact" is our vocabulary, not the reader's. The site labels that
  section "What it rests on" (`src/pages/claims/[id].astro:110`). A reader who
  goes looking for a thing called a key fact will not find one. The sentence
  still parses, so this is a nit, but "the fact it rests on" would point at
  something the reader can actually see.
- The note admits the miss without softening it, and it sits directly above a
  publication entry at `:57` that says the gate fixed the "second reading"
  problem. A reader who notices the pair sees that the claimed fix was
  incomplete. That is the right thing to publish, and the note's "the evidence
  description was missed" carries it. No change wanted; I am flagging it so
  nobody later reads it as a contradiction and tries to smooth it over.

Scope of the note is correct. It does not claim a re-audit, does not touch the
finding, and does not oversell a one-field edit as a re-verification.

## Before merge, not blockers

1. `correction-2026-09-09-evidence-registry.md:62-66` says source and release
   review are pending. Once this report and the source audit land, that becomes
   false. Update those three lines with the outcome of both reviews, or the
   commit ships a record that misdescribes its own state. This is expected while
   the gate runs; it just needs to close.
2. Optional: add `retrieved_on` to the "what did not change" list at :55. The
   choice to leave it at 2026-09-01 is correct and deliberate, and the record
   would be tighter if it said so.
