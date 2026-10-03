<!-- Release check (gate stage 7, part 2), a separate Claude Opus 5.5 audit session, on 91a4e44. Dispositions by Stew, 2026-10-02.

Disposition: 0 blocking, 1 advisory, adopted.

- A1, adopted: the 42-word quotation of FCS03158 Attachment 2 is cut in both places. Claim key fact 1 now quotes only "an annual ongoing operating increase of $1.60 million to prioritize SNIC efforts in socially vulnerable areas" (16 words) and states the other amounts in its own words; the story gives the amounts in its own words with no quotation. -->

# Release check — snow-clearing

Result: 0 blocking, 1 advisory

Gate stage 7, part 2. Run date 2026-10-02 (story run `2026-10-02`),
methodology v1.43. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafter and the checkers. Graded tree: worktree `draft-snow` at `91a4e44`.

**Nothing in the package needs to change before release.**
- No private text reaches the build or the files this branch adds. The
  faithfulness reports quote at most about 20 consecutive words of a
  source.
- No member of the public is named.
- The v1.43 labels match the manifest: documents, selected items, and the
  sections label for 0304.
- Every cited registry entry carries a rights note.

The one advisory concerns a 42-word quotation of the City's budget text.

**Package.** The branch adds and changes these files:
- `src/content/stories/snow-clearing.mdx` and
  `src/content/claims/sc-two-costed-snow-proposals.yaml`;
- `scripts/calcs/snow-clearing.ts` and its test;
- the `snow-clearing` question note and story link in the register;
- one sentence each in `winter-cycling.mdx` and `active-transportation.mdx`;
- in the run directory, `faithfulness/gpt-1.md`, `faithfulness/gpt-luna-1.md`,
  `gate/freshness-audit.md` and `plain-speech/gpt-1.md`, with changes to
  `run-record.md` and `state.yaml`.

The rest of `reviews/snow-clearing/2026-10-02/` reached `main` in #124 and
earlier, and publishes with the page. That covers the brief, round files,
carried manifest and checks, and superseded attempts. It was checked again
here. No registry entry is new on this branch.

**Deterministic layer.** `npm run audit:exposure` over the whole tracked
tree:

```
  fail  SECRETS               0
  fail  PRIVATE-EVIDENCE LEAK 0
  fail  WITHHELD LEAK         0
  fail  RIGHTS                0
  fail  LOCAL PATHS           0
  warn  PII                   91
  warn  LONG QUOTES           0
```

One PII warning is in this run: a "phone number" in
`carried/checks/checks.yaml` line 47. That is the checker's note quoting the
Office of the City Clerk's published line. It is an office number, already
on `main`, and a false positive for personal information.

**Build.** `npm run build` exits 0. `npm run validate` reports OK (12
stories, 26 claims, 269 evidence entries). Its only warning near this page is
on the active-transportation one_line length, which predates this branch.
`tests/calcs-snow-clearing.test.ts` passes 7 tests.

## Checked and clear

- **No private bytes or text.**
  - `git ls-files` lists nothing under `evidence/private/`, including the 22
    carried texts. No file in `dist/` has the SHA-256 of any private
    archive.
  - No built page contains the carried-text markers (`MEETING HEADER`,
    `SECTION n (pages …)`). One methodology audit page mentions
    `evidence/private` in prose.
  - The built question page, claim page and every branch-changed file were
    compared with all 22 carried texts and the procedure extraction, using
    12-word shingles. The longest verbatim runs are about 20 words in each
    faithfulness report, quoting the procedure's §1.1.4 and §2.1.4. The
    other is about 42 words in the page and claim (A1).
- **No member of the public named.**
  - 47 names were extracted from the public-speaker and delegation lists of
    the cited meeting archives (0287 to 0302), with office-holders and City
    staff removed.
  - None appears in any tracked file under `reviews/snow-clearing/`, in any
    branch-changed file, or in any built page.
  - The carried texts withhold the names under redaction rule v4.
  - Commenters appear only by register pseudonym.
  - The people the page names are councillors and the mayor, named for
    motions and votes.
- **v1.43 labels, against `carried/manifest.yaml`.** The page cites 15
  carried sources, and each has the right label on the question page. Three
  cited sources are excluded or not carried, and correctly have no label:
  YF-EV-0241, 0281 and 0288.

  | Sources | Manifest | Label |
  |---|---|---|
  | YF-EV-0294, 0295, 0296, 0303, 0308 | `pdf`, ground "fetcher challenge" | document form, "… read our archived copy because the City's portal blocked automated access", with the SHA. Each SHA matches its registry entry |
  | YF-EV-0287, 0289, 0290, 0291, 0293, 0298, 0299, 0300, 0302 | `minutes-items`, ground "seat refusal", rule v6 | items form, with "The rule (v6)" (9 occurrences) |
  | YF-EV-0304 | `pdf-sections`, rule v2, 4 of 36 sections | sections form: "… saw only the sections of this document that our published rule picked … The rest of the document was not given to them. All the AI reviewers read the same text we supplied, so their agreement on it is not independent retrieval. We have found no permission to republish our copy, so check the sections against the full document", with "The rule (v2)", the section inventory and SHA `ee05ce02…`, which matches the registry |

- **Rights.** Every cited registry entry is `visibility: private`, with
  `redistribution: unclear` and a rights `note`. The archives exist in this
  worktree and in the main checkout, and each matches its hash.
- **No local paths, credentials or contact details** in the files this
  branch changes.
- **No claim of human review.** The page says "AI models" and "reviewers",
  and the model names match `run.yaml`.
- **The founder is not named** on the page or in the new files.
- **These reports** quote no carried text beyond short phrases already on
  the page, and name no member of the public.

## Advisory

- **A1 — A 42-word quotation of the City's budget attachment.** It sits in
  claim key fact 1 and in the story's active-pathway paragraph. The words
  are "This service package involves a $2.11 million one-time capital
  investment … for proactive Sidewalk Maintenance repairs". YF-EV-0304's
  rights are `unclear`. It is a short quotation from a public City budget
  document, used for review, and `LONG QUOTES` does not flag it. If the
  site's standard is lower than that audit's threshold, the story could
  paraphrase it, since the claim already quotes it.

`RELEASE: 0 blocking, 1 advisory`
