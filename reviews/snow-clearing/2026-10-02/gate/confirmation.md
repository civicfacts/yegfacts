<!-- Gate confirmation (stage 7), the same separate Claude Opus 5.5 audit session, on 3c0bacb. Dispositions by Stew, 2026-10-02.

Disposition: the five earlier advisories confirmed resolved; 1 new blocking (N1) and 1 new advisory (A1), both adopted in the auditor's wording. No finding changed.

- N1, adopted exactly: the standfirst is "Main bike lanes and some main roads have 24-hour targets, residential streets 10 days once plowing starts, but we found no record of which crews clear first." (157 characters), bounded to our search as the body and the parked line are. No test pinned the old wording. No further pass of the gate was run on this correction.
- A1, adopted: YF-EV-0296's establishes now says the page "reports figures from it", since the page quotes nothing from it. -->

# Gate confirmation — snow-clearing

Result: 5 of 5 advisories resolved; 1 new blocking, 1 advisory

Gate stage 7, confirmation. Worktree `draft-snow` at `3c0bacb`, against the
gate reports of `91a4e44`. Auditor: the same Claude (Opus 5.5) audit session,
separate from the drafter. Read-only; the worktree is clean.

**Checks run.**

| Check | Result |
|---|---|
| `npm run build` | exits 0 |
| `npm run validate` | OK. Its only note on this page is that the one_line is 26 words |
| `tests/calcs-snow-clearing.test.ts` and `tests/carried-v143.test.ts` | 53 passed |

## 1. Advisories

| Advisory | Status | New text |
|---|---|---|
| Source A1, the five people | RESOLVED | "Three said the City plows its bike lanes, one of them that it does so before the streets. Another said Whyte Avenue … and that the plows windrow the snow … And a fifth, answering …" This matches the register: Frosty Raven J., Silver Raven G. and Snowy Heron C. on the plowing claim, with only Frosty saying "before"; Sunny Bluejay W. on Whyte and the windrows; Windy Heron J. on the two proposals and calcium chloride. 3 + 1 + 1 = 5 |
| Source A2, "In the report's words" | RESOLVED | "The report says "no additional budget is required" to approve the policy, and that administration will bring the package to Council "for consideration during the 2027-2030 Budget Deliberations"." Both quotations are exact (YF-EV-0294, Budget/Financial Implications) |
| Source A3, the August 22 date | RESOLVED | Story: "It is dated August 22 by the timestamp in the archive's address for it, which our fetch report records. The page itself carries no date." The YF-EV-0288 `archive.note` says the same and matches `fetch-report.md` (`web/20260822162600/`) |
| Source A4, the active-transportation pointer | RESOLVED | "Whether administration has since put proposals for more snow money on council's published agendas, and what council did with them, is on its own page." This names the placement rule |
| Release A1, the 42-word quotation | RESOLVED | The story now paraphrases. Claim key fact 1 quotes 16 words, "an annual ongoing operating increase of $1.60 million to prioritize SNIC efforts in socially vulnerable areas", verbatim from YF-EV-0304 section 20, and paraphrases the rest |

## 2. Statements changed since 91a4e44

| Statement | Grade | Basis |
|---|---|---|
| Standfirst: "Main bike lanes and some main roads have 24-hour targets, residential streets 10 days once plowing starts, but no record shows which crews actually clear first." | **BLOCKING** (last clause only) | Finding N1. The targets are verified: YF-EV-0281 §1.1.1 gives Priority 1 "Select freeways, arterial roadways, business districts" bare pavement within 24 hours. §1.2.1 gives the Winter Priority Bike Network the same 24 hours. §1.1.4 gives residential roads "5 cm snowpack … within 240 hours (10 days) once a residential blading cycle is initiated". Naming both 24-hour classes keeps it from answering the parked claim by implication |
| TL;DR 1: "By August 27, 2026, City administration had put at least three proposals for more snow-clearing money on council and committee agendas." | VERIFIED | The placement rule is named in the same sentence ("put … on … agendas"). Three were identified and the total could be higher. The calculation's `primary` count is 3 |
| TL;DR 2: two were unfunded fall 2025 packages, and none of the budget amendments council voted on in December named either | VERIFIED | YF-EV-0303 lists both under "Unfunded"; YF-EV-0302 items 5.2.1 and 5.2.2 |
| TL;DR 3: the third, a larger package that also covers street sweeping and other work, which administration says it will bring to council in the 2027 to 2030 budget | VERIFIED | YF-EV-0295 ("Summer Sweep Flushers", graffiti, turf, inspections); YF-EV-0294 "will bring forward … for consideration during the 2027-2030 Budget Deliberations" |
| TL;DR 4: whether that matches depends on how you count, and the page shows each reading | VERIFIED | "When the answer changes" |
| Answer: placement rule first; at least two, three found; none states the snow budget, so none would count on that reading; precisely two is partly right | VERIFIED / CALC | The rule is named in the first sentence. The two rung-changing alternatives (`strictCost` 0, Contradicted; `exactlyTwo` Partially supported) sit beside the verdict |
| Key fact 1, rewritten with the 16-word quotation | VERIFIED | YF-EV-0304 section 20. The $1.64M and $4.59M are ongoing per the section 9 summary, "$7.83 million annual ongoing operating costs" |
| Story, active-pathway amounts restated: $2.11M one-time; ongoing $1.60M, $1.64M and $4.59M | VERIFIED | As above |
| Story: "under other readings we set the reviewers to test before the research"; limitation: "meetings named before the research" | VERIFIED | The brief was frozen before the rounds |
| New changelog note | VERIFIED | Gate counts as reported. Critique: "3 required … 5 suggested" (`critique-1.md`). "No finding changed" |
| Registry YF-EV-0294 to 0309: "the founder" replaced by "a person" in the rights notes | VERIFIED | The provenance is unchanged apart from the wording. No other change to the notes |
| Registry establishes, YF-EV-0294, 0295, 0296, 0303, 0308: "The review panel read its text, and the snow-clearing question page quotes and reports figures from it" in place of "the site has not read its contents" | VERIFIED, see A1 | True for 0294, 0295, 0303 and 0308, each quoted on the page or claim. For 0296 the page reports figures but quotes nothing |
| Registry YF-EV-0304: "The review panel read the 4 of its 36 sections a published rule selected …" | VERIFIED | Manifest and regeneration: sections 9, 13, 20 and 21 of 36 |
| Label: "The AI reviewers saw only 4 of this document's 36 sections, picked by our published rule, from our archived copy, …" | VERIFIED | It renders on `/questions/snow-clearing` and `/evidence/YF-EV-0304`. The counts come from the manifest's `sections` inventory: 4 carried, 36 total. The other sources' labels are unchanged |

## Findings

### Blocking

**N1 — The new standfirst drops the bound, and the page says the record
that could answer it is unread.**

> "… but no record shows which crews actually clear first."

The earlier standfirst said "from the City records we found". The body says
"we identified no published record of that", and that the City's annual
snow report "is the first place to look, and we have not read it". The
parked line says "we found no record of that order".

"No record shows" asserts more than the search supports, and the page
itself names a record it has not read. This is the same defect fixed on
council-hearing (N1).

Exact fix. The new standfirst is 157 characters, within the share limit:

> "Main bike lanes and some main roads have 24-hour targets, residential
> streets 10 days once plowing starts, but we found no record of which
> crews clear first."

### Advisory

- **A1** — YF-EV-0296's new `establishes` says the page "quotes and reports
  figures from it". The page reports its figures (24 extras; calcium
  chloride at $2.5M and $4.4M) but does not quote it. "reports figures from
  it" would be exact.

GATE: FAIL

- N1: set `one_line` in `src/content/stories/snow-clearing.mdx` to "Main
  bike lanes and some main roads have 24-hour targets, residential streets
  10 days once plowing starts, but we found no record of which crews clear
  first."
