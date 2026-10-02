<!-- Dispositions, 2026-10-02, by Stew (drafting seat Claude Opus 5.5). B1 fixed by the editor's decision; advisories A1 to A5 adopted, A6 noted.

B1, the editor's decision (option 2): Jennifer Rice did not hold office when she commented, so as a commenter she is a private person and gets the pseudonym the capture pipeline's own hash rule gives her. Computed with the board's redact.py rule, holding every published label fixed and labelling her last: Amber Owl J. (a plain rerun of the pipeline without the override would have moved one other commenter's label, so it was not used). Changed: the capture (comment 449's commenter and the four replies that addressed her by name), the register's five author_name entries, infra-roads-condition's wording note, the active-transportation seen card's attribution (removed; that field is for office-holders), the story's two commenter sentences, the calculation's people count and its test, and the private board map and redact.py. Her name stays where the page reports her 2022, 2023 and 2024 votes and motions. The "Each name is a pseudonym" caption is now true for every wording under it and was not changed. A built-page search finds her name only beside those motions and votes. The error is recorded in run-record.md and in the intake run's README; the frozen brief and intake.md are not edited.

A1, adopted: the standard rights note on YF-EV-0228 to 0232. A2, adopted: the five archives are copied to the main checkout's evidence/private and each matches its registry hash. A3, adopted in run-record.md. A4, adopted: on claim pages each carried source cited in a key fact carries a short tag, "selected items" or "archived copy", linking the method; the full label is on the source's evidence page. A5, adopted with critique R7: the selected-items label now speaks of "this City meeting page", which holds for an agenda, and YF-EV-0204's title no longer says "(full page)". A6, noted, no change. -->

# Release check — council-pause-vote

Result: 1 blocking, 6 advisory

Gate stage 7, part 2. Run date 2026-10-02 (story run `2026-09-25`),
methodology v1.42. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafting session and the checkers. Graded tree: worktree `draft-cpv` at
`0840853`.

**One blocking finding.** The page names Jennifer Rice as the author of a
Facebook comment. It does so on the ground that she is a sitting
office-holder, but she left Council at the October 2025 election. Naming her
for the comment therefore names her for something other than what she did in
office. On her captured wording, the page also tells readers that "each name
is a pseudonym", and hers is not one. No private archive bytes or carried
text reach the repository or the build. No member of the public is named.
Every carried source cited carries the right label.

**Package.** The draft: `src/content/stories/council-pause-vote.mdx`, the
three `src/content/claims/cpv-*.yaml` files,
`scripts/calcs/council-pause-vote.ts`, `tests/calcs-council-pause-vote.test.ts`,
the changes to `src/pages/evidence/[id].astro`,
`src/components/CarriedLabel.astro`, `src/content/stories/infrastructure-deficit.mdx`
and `intake/register.yaml`. Registry entries YF-EV-0228 to 0232 are new on
this branch. The run has 58 tracked files under
`reviews/council-pause-vote/2026-09-25/`. This branch adds four of them: two
faithfulness reports, the plain-speech read and the freshness audit. The rest
reached `main` in PRs #104 to #108 and publish with the page, so they were
checked again here.

**Deterministic layer.** `npm run audit:exposure` over the whole tracked
tree:

```
exposure-audit: 1224 tracked text files scanned (18 binary skipped, 1242 tracked total), 206 registry entries
  fail  SECRETS               0
  fail  PRIVATE-EVIDENCE LEAK 0
  fail  WITHHELD LEAK         0
  fail  RIGHTS                0
  fail  LOCAL PATHS           0
  warn  PII                   90
  warn  LONG QUOTES           0
exposure-audit: OK — no fail-class findings; 90 warning(s) need disposition in the audit record
```

**Twelve of the 90 PII warnings are in this run, and all twelve are false
positives.** Each is the "street address" pattern. Ten match one City agenda
item title, a sale of City road right-of-way in McCauley, which appears in
the manifests, `completeness-v2.yaml` and the superseded manifests. One
matches the route list in `round1/claude.json`, and one matches an item
heading in `reconciliation.yaml`. None is a person's address, and all were
already on `main`. The branch's own four run files add none.

**Build.** `npm run build` exits 0 (1,143 files in `dist/`, Pagefind
indexed). `npm run validate` reports OK with no warning about this page.
`npx vitest run tests/calcs-council-pause-vote.test.ts`: 6 passed. Every
internal link on the page resolves in `dist/`: the claim pages, `#not-checked`,
`/questions/routes-already-committed`, `/questions/consultation-and-opposition`,
`/questions/infrastructure-deficit`, and the new cross-link from
infrastructure-deficit.

## Findings

### Blocking

**B1 — Jennifer Rice is named as a commenter on a rule that applies to
sitting office-holders, and she is no longer one.** The intake (`intake.md`
line 41) and the frozen brief (line 81) keep her name because "a sitting
councillor writing under her own name keeps it", and the register's
pseudonym rule exempts public office-holders. The archived 2026 minutes show
she left Council at the October 2025 election (source verification B1). Two
uses of her name are therefore not in her capacity as an office-holder:

- the story names her as the author of comment 449 ("One of the six is …
  Jennifer Rice … Her comment carries three of the four claims"; "Rice wrote
  that administration had recommended …"), and
- the question page renders her wording as "That review was also not
  supported by Council. Councillor Jennifer Rice", under the
  `AlsoSaidAs` caption "Each name is a pseudonym, one to a person within its
  source". That caption is false for her, and the bare "Councillor" reads as
  a current title.

Naming her for the 2023 and 2024 motions, the 2022 vote and the 2025 vote is
naming her for acts in office and is unaffected.

Fix, owner Stew (editorial decision, D-0020). Choose one:

1. Record a decision in the board repo or the run record. It would say that
   a former office-holder who comments publicly about her own record in
   office, under a page that carries her office title, keeps her name, as an
   extension of the office-holder rule. With that decision, correct the
   story as in source verification B1, and make the captured wording's
   caption accurate for her, for example "a former councillor, named under
   her own public page; the other names are pseudonyms". Her comment says
   "Councillor Karen Principe and I", so a pseudonym would not hide who she
   is. This makes option 1 the coherent one.
2. Give her a pseudonym in the commenter role, and refer to the comment's
   author as "one commenter, a former councillor". Keep her name only where
   the page reports motions and votes.

Either way, add a dated note to `run-record.md` that the brief's "sitting
councillor" premise was wrong. The brief is frozen and cannot be edited.

### Checked and clear

- **No private archive bytes are tracked or built.** `git ls-files` lists
  nothing under `evidence/private/`. No file in `dist/` has the SHA-256 of
  any file in `evidence/private/`. No file in `dist/` contains the string
  `evidence/private`.
- **No carried text is committed or built.** The carried-text format markers
  (`MEETING HEADER`, `ATTENDANCE (item`) occur only in
  `scripts/panel/minutes-items.ts` and its test, not in any run file or
  built page. `carried/manifest.yaml` holds item numbers, titles, match terms,
  reasons and hashes, not item text. A 20-word shingle comparison of all
  regenerated carried text and full-archive text against the built question
  page, the three claim pages and every file this branch changes finds one
  longest verbatim run of about 21 words: the December 2024 motion's operative
  clause, quoted in claim 3. That is a short quotation of a public motion.
- **No member of the public is named.** 176 names were extracted from the
  public-speaker and delegation lists of all 21 cited archives, plus the
  speaker-panel attachment titles (for example the four "7.6 - Panel n"
  presentations). None appears in any tracked file under
  `reviews/council-pause-vote/`, in any file this branch changes, or in the
  built question, claim and evidence pages. The committed manifest records
  the redaction as "[member of the public]". Commenters other than Rice
  appear by register pseudonym only. Everyone else named on the page is a
  councillor or the mayor, named for a motion moved or seconded or a vote
  cast in office.
- **Carried-source labels are present and correct.** The manifest carries 19
  documents. The page cites 15 of them, and each has a label on the question
  page: six PDFs (YF-EV-0118, 0140, 0222, 0223, 0225, 0226) use the
  archived-copy form, and nine meeting pages (0204, 0209, 0210, 0211, 0212,
  0213, 0214, 0216, 0227) use the selected-items form, with "The rule (v2)",
  matching the manifest's `rule_version: 2`. Each label links the City page,
  the rule and the manifest, and gives the archive SHA-256, which matches the
  registry. Six cited sources are not carried and correctly have no label:
  YF-EV-0221, which the manifest excludes, and YF-EV-0228 to 0232, which the
  site read after the panel. On evidence pages the label appears only beside
  the cpv claims. YF-EV-0204, for example, carries it beside the two cpv
  claims and not beside the infrastructure-deficit claim, whose run did not
  carry it. This matches the component's run-scoped design.
- **Rights.** YF-EV-0228 to 0232 are `visibility: private`,
  `redistribution: unclear`, and pass the RIGHTS check. See A1 on their
  missing note.
- **No local paths, credentials or contact details** in the four new run
  files or the draft. The only `file://` is the calculation module's
  entry-point guard.
- **Quotation volume.** `LONG QUOTES 0`. The commenter quotations on the page
  are the register's captured wordings, the longest 39 words, already
  public on `main`.
- **No claim of human review.** The page says "reviewers", "seats" and "AI
  panel", and every model name matches `run.yaml`.
- **The founder is not named** on the page or in the four new run files.
- **These reports.** They are written outside the repository, and quote no
  carried text beyond short phrases already on the page and no
  member-of-the-public name.

### Advisory

- **A1 — The new registry entries have no rights note.** YF-EV-0228 to 0232
  set `rights.redistribution: unclear` but, unlike YF-EV-0118 to 0227, have
  no `rights.note`. The field is optional and validation passes. For
  consistency, add the standard note: "City of Edmonton document; the
  archived bytes carry no redistribution grant. Fails closed to private."
- **A2 — The archives for YF-EV-0228 to 0232 exist only in this worktree.**
  They match their hashes here, but they are absent from the main checkout's
  `evidence/private/`, which is gitignored. Copy them across before the
  worktree is removed, or the registry hashes cannot be checked after merge.
- **A3 — Run records repeat the "sitting councillor" error.** `intake.md`
  line 41 and `brief.md` line 81 carry it. Both are frozen inputs. Record the
  correction in `run-record.md` as part of B1's fix rather than editing them.
- **A4 — The standalone claim pages carry no carried-source label.**
  `/claims/cpv-*` show source IDs beside key facts, and those IDs link to
  evidence pages that do carry the label. The methodology says a carried
  source "is labelled beside it". The question page and evidence pages
  satisfy that, but a reader who lands on a claim page first sees no label.
  Whether claim pages need one is a design call for Stew.
- **A5 — The label for YF-EV-0210 says "minutes".** The selected-items label
  reads "Reviewers read selected items from the City's minutes" for the
  committee agenda page YF-EV-0210 as well. A label that switches on the
  manifest's `layout` (agenda or minutes) would be exact.
- **A6 — The freshness audit links a third-party machine transcript and a
  news site.** `gate/freshness-audit.md` items 1 and 2 link a Taproot article
  and an unreviewed transcript service. Both are public pages, and the
  disposition refuses to rely on them. Nothing to change. Noted so that
  their presence is a decision on record, not an oversight.

`RELEASE: 1 blocking, 6 advisory`
