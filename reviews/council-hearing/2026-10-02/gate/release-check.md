<!-- Release check (gate stage 7, part 2, methodology v1.43), a Claude Opus 5.5 audit session separate from the drafter and the checkers, on 75dc267. Dispositioned 2026-10-02 by Stew. The report is committed as written.

Disposition: 0 blocking; 2 advisories, no change needed. A1: organization names on the run files already on main come from the carried lists, which keep organization names by design under the redaction rule; the built pages name only the YEG Bike Coalition and Paths for People, for what the coalition's own post says they did, and the gate's B1 wording refers to the third group as the coalition's ambassadors without naming it, which the page keeps. Treating single-entry groups as identifying would be a change to the redaction rule, not to this page. A2: noted; the branch will be rebased cleanly if main moves before merge. -->

# Release check — council-hearing

Result: 0 blocking, 2 advisory

Gate stage 7, part 2. Run date 2026-10-02 (story run `2026-10-02`),
methodology v1.43. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafter and the checkers. Graded tree: worktree `draft-hearing` at
`75dc267`.

**Nothing in the package needs to change before release.**
- No private text reaches a committed file or the build.
- No member of the public is named on any page or in any file this branch
  adds.
- The v1.43 labels match the manifest, including the two-round label on the
  bylaw.
- The three new registry entries carry rights notes.

Two advisories concern small group names already on `main`, and the
coalition post's contact details.

**Package.** The draft:
- `src/content/stories/council-hearing.mdx` and
  `src/content/claims/ch-speaking-time-cut.yaml`;
- `scripts/calcs/council-hearing.ts` and its test;
- the register changes (question `story`, the second park's reason and its
  dated comment);
- the sentence added to `council-pause-vote.mdx`;
- `methodology/quality-ledger.yaml`.

Registry entries YF-EV-0315 to 0317 are new on this branch.

The run directory `reviews/council-hearing/2026-10-02/` publishes with the
page. This branch adds four of its files: two faithfulness reports, the
plain-speech read and the freshness audit. It also changes `run-record.md`
and `state.yaml`. The rest, including `round1/`, `round2/`, `carried/` and
both superseded attempts, reached `main` in PRs up to #119. It was checked
again here.

**Deterministic layer.** `npm run audit:exposure` over the whole tracked
tree finds 0 in every fail class (SECRETS, PRIVATE-EVIDENCE LEAK, WITHHELD
LEAK, RIGHTS, LOCAL PATHS) and `LONG QUOTES 0`. The PII warnings stay at 90.
No warning names a file under `council-hearing`, YF-EV-0315 to 0317,
`ch-speaking-time-cut` or the quality ledger.

**Build.** `npm run build` exits 0, producing 1,225 files in `dist/`.
`npm run validate` reports OK (11 stories, 25 claims, 242 evidence entries).
`tests/calcs-council-hearing.test.ts` passes 4 tests.

## Checked and clear

- **No private bytes or text.** `git ls-files` lists nothing under
  `evidence/private/`, including the three carried texts in
  `evidence/private/carried/council-hearing/2026-10-02/`.
  - No file in `dist/` has the SHA-256 of any file under `evidence/private/`.
    No built page contains `evidence/private`, the carried-text header
    `MEETING HEADER`, or the redaction marker. The marker appears only in
    the methodology text that describes it.
  - The new archives were compared against the built question page, the
    built claim pages and every file this branch changes, using 20-word
    shingles. The archives compared were YF-EV-0255, 0315, 0316 and 0317,
    the bylaw extraction, and the regenerated carried minutes and agenda. No
    verbatim run of 20 words or more was found.
- **No member of the public named.**
  - Names were searched in every file under `reviews/council-hearing/`, the
    register, YF-EV-0315 to 0317, the quality ledger, `src`, the calculation
    and the test. The names searched were the 176 drawn from the
    public-speaker and delegation lists of the City minutes; none was found.
  - The same files were searched for the full names of the twelve members of
    the public that the CBC report (YF-EV-0255) names, and for the speaker
    names in the panel attachment titles. None was found.
  - The carried text that the seats read replaces every public speaker's
    name with "[member of the public]". Redaction rule v4: 79 withheld in
    item 2.3 and 57 in item 7.6, matching the manifest.
  - Commenters appear only by register pseudonym.
  - The people named on the page are the six committee members, named for
    their vote and Janz for his motion.
- **Group names.** The built pages name two groups, the YEG Bike Coalition
  and Paths for People. Both are named only for what the coalition's own
  public post says they did, and neither is tied to a person. No other group
  from the speaker lists appears on any built page or in any file this
  branch adds. See A1 for the run files already on `main`.
- **Contact details.** The coalition post (YF-EV-0315) prints the committee
  members' City email addresses and the coalition's contact address. None
  appears in any tracked file this branch adds or in `dist/`. The registry
  note says the site does not reproduce them.
- **v1.43 labels, against `carried/manifest.yaml`.** The manifest carries
  three documents. The question page labels exactly those three, and the
  evidence pages repeat the same labels.

  | Source | Manifest ground | Label on the question page |
  |---|---|---|
  | YF-EV-0209 | kind `minutes-items`, ground "seat refusal" (403), rule v2 | selected-items form: "… only the items on this City meeting page that our published rule picked … because the City's portal blocked automated access", with the rule (v2), the item index and the SHA |
  | YF-EV-0210 | kind `minutes-items`, ground "seat refusal" (403), rule v2 | same selected-items form |
  | YF-EV-0251 | kind `pdf`, ground "two-round seat failure", two superseded rounds with all three seats failing | two-round form: "… because their research tools failed to retrieve it in two rounds in a row. That was their tools failing; it does not mean the document is unavailable to you. All the AI reviewers read the same text we supplied, so their agreement on it is not independent retrieval.", with Original · How we handle this · SHA-256 `762a9177…`, which matches the registry |

  - The manifest's `public_open_check` for 0251 is confirmed by a person who
    is not the editor, and its `second_download` matches. So the
    open-unconfirmed sentence is correctly absent.
  - On `/claims/ch-speaking-time-cut` the three citations carry the short
    tags "(selected items)" and "(archived copy)".
  - YF-EV-0252 to 0255 and 0315 to 0317 are excluded by the manifest or were
    read after the panel, and correctly carry no label.
- **Rights.** YF-EV-0315, 0316 and 0317 are each `visibility: private` and
  `redistribution: unclear`, with a note:
  - 0315: "Newsletter post by an advocacy organization; no redistribution
    grant. Fails closed to private. The post lists councillors' City email
    addresses; the site does not reproduce them."
  - 0316 and 0317: the standard City note.

  The archives exist in this worktree and in the main checkout, and each
  matches its hash.
- **No local paths or credentials** in the files this branch changes.
- **No claim of human review.** The page says "AI models" and "reviewers",
  and the model names match `run.yaml`.
- **The founder is not named** on the page or in the new files. The run
  record calls the founder by role.
- **These reports** quote no carried text beyond short phrases already on the
  page, and name no member of the public. Group names from the list appear
  only in the source-verification recount, which is outside the repository.

## Advisory

- **A1 — Small group names in run files already on `main`.** These files are
  the round JSON, `combined-evidence.json`, `synthesis.json` and the
  superseded `round1/` files. They transcribe the organisation names from
  the carried lists, including single-entry groups such as "Holyrood Voice",
  "Holyrood Community 79 St Action Group", "Bike Bus Alberta" and "Let's
  Bike There YEG". Redaction rule v4 keeps organisation names by design.
  Matching a single-entry group to a person needs the City's own minutes,
  which name the speaker. So the site adds no new exposure, and nothing on
  the built pages names these groups. B1's fix in the source verification
  refers to the coalition's ambassador group without naming it, which keeps
  it that way. If the founder wants single-entry groups treated as
  identifying, that would be a change to the redaction rule, not to this
  page.
- **A2 — Dependence on PR #110's state.** This branch's edit to
  `council-pause-vote.mdx` sits in the closing paragraph, on top of the
  merged #110 text. The rendered link resolves. No action is needed beyond a
  clean rebase if `main` moves.

`RELEASE: 0 blocking, 2 advisory`
