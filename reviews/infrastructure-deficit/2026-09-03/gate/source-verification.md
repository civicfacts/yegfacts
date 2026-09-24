<!-- Dispositions, 2026-09-24, by Stew (drafting seat Claude Opus 5.5).

All nine blocking corrections adopted as the gate words them: the three roads sentences in the story now read "On that date paved roads were 12.5 per cent poor or very poor. Curbs, which the City files under Roads, were 7.0 per cent. Unpaved roads had no rating at all."; the fourth reads "At 11.2 per cent at the end of 2024, the roads landed just above the tenth."; infra-roads-condition key facts 2, 3 and 6 and limitation 6 carry December 31, 2024 or the end of 2024 in the past tense as written in corrections 3 to 6; the active-transportation link text is now the page's title, "Is Edmonton letting roads go while funding bike lanes?".

Both date fixes adopted: "at the end of 2024" added to the Claude Opus 5.5 and GPT-6 Luna first key findings on infra-roads-condition.

All non-blocking items adopted: R24, the alley program now "to renew alleys rated very poor"; M23 and KF-7, the transfer is dated "Spring 2025" from the archived bytes ("In its Spring 2025 budget adjustment"); L-4, "This site has not archived the June 2023 record."; Claude key finding 2, "A news report of a 2023 council debate said"; Claude's round-2 change now "rested on City documents, the profile sheet and minutes the other reviewers cited and a capital update it found itself, not on their verdicts"; the calcs comments now give the funding table on p. 542 with the sheet starting on p. 540, and Table 6 on p. 50 with its gap sentence on p. 49; the p. 539 reference in both faithfulness disposition headers (the editor's text, not the seats') now reads p. 540.

The board_withdrawn advisory is adopted without moving the withdrawal date: both reasons now say the site "checked as its own question on 2026-09-24", so the later event carries its own date and date: "2026-09-03" stays the date of the withdrawal it records.

The note that YF-EV-0114 and YF-EV-0129 to YF-EV-0131 are archived only in the main checkout is expected, since evidence/private/ is gitignored per worktree; no action. -->

# Source verification — infrastructure-deficit

Gate stage 7, part 1. Run date 2026-09-24 (story run `2026-09-03`),
methodology v1.39. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafting session and from both faithfulness seats.

**Verdict: GATE FAIL.** Nine statements need correcting before publication.
Eight are about the roads. They give a figure from the City's ratings of
December 31, 2024 in the present tense, or with no date, so they read as the
roads' condition now. The ninth is on the published active-transportation
page. Its link text names alleys and drainage as part of a question the new
page "now checked", but the page gives alleys no finding and does not check
drainage. Every figure is right. All three findings reproduce from the
archived bytes and from `scripts/calcs/infrastructure-deficit.ts`. None of the
nine corrections changes a finding.

**Scope.** Every statement of fact in:

- `src/content/stories/infrastructure-deficit.mdx`: the `one_line`, all five
  TL;DR bullets, the changelog note, and the 73 body sentences that carry a
  number, a date, a name, a quotation, or an assertion about what a document
  or a seat says. Connective and interpretive sentences that assert nothing
  about the record are not counted.
- The three claim records `infra-roads-condition`,
  `infra-bike-money-renewal-eligible` and
  `infra-hundred-million-vs-shortfall`: the `answer`, every `key_fact`,
  `limitation`, `unknown` and `missing_evidence` line, and every
  `review.reviewers` entry (verdict and confidence, each `key_finding`, each
  `changed_between_rounds`).
- The sentences this branch changes on published pages: the closing pointer
  and the new changelog note in `src/content/stories/active-transportation.mdx`,
  and the rewritten `board_withdrawn.reason` sentence on `at-100m-vs-roads`
  and `at-100m-vs-snow`.

The graded state is the tree at commit `c1c9174`, after the faithfulness
checks, the freshness audit and the plain-speech read were applied.

**Method.** Each statement was graded against the archived bytes of the
evidence it cites. Where a statement describes what a seat said, it was graded
against the round files. Where it describes the brief's rules, it was graded
against `brief.md`, and where it describes the capture, against `intake.md`.
No web access was used. PDFs were extracted with `pdftotext -layout` and
located by page (form feed). The eSCRIBE minutes pages were stripped of markup
with a short Python script before search. `evidence/private/` is gitignored
and so belongs to one worktree. YF-EV-0200 to YF-EV-0208 are in this
worktree. YF-EV-0114 and YF-EV-0129 to YF-EV-0131 are not, and were read from
the main checkout's `evidence/private/`.

Two rules were applied beyond the grade definitions, because the task sets
them:

- **The inventory date.** Every roads statement must carry the inventory date,
  December 31, 2024. A roads statement in the present tense about condition
  is graded PARTIAL and blocking. The source carries the figure as of that
  date, and the sentence asserts it as current, which changes its meaning.
- **The vendor split.** Every statement on `infra-bike-money-renewal-eligible`
  about what a seat could open, rested on, said or changed was graded against
  `round1/*.json` and `round2/*.json`.

**Integrity check.** All 13 archives match the `archive.sha256` in their
registry entry. The command checks the worktree first and then the main
checkout:

```
python3 -c "
import hashlib,os,pathlib,re
for i in ['0114','0129','0130','0131']+[f'{n:04d}' for n in range(200,209)]:
    reg=pathlib.Path(f'evidence/registry/YF-EV-{i}.yaml').read_text()
    sha=re.search(r'sha256:\s*(\S+)',reg).group(1)
    rel=re.search(r'path:\s*(\S+)',reg).group(1)
    for base in ('.', os.path.expanduser('~/Sites/yegfacts')):
        f=pathlib.Path(base)/rel
        if f.exists():
            h=hashlib.sha256(f.read_bytes()).hexdigest()
            print(f'YF-EV-{i}', 'MATCH' if h==sha else 'MISMATCH'); break
    else: print(f'YF-EV-{i}','MISSING')"
```

| ID | Archive | Form | Where read | sha256 |
|---|---|---|---|---|
| YF-EV-0114 | Adopted 2023-2026 Capital Budget | PDF, 695 pp | main checkout | match |
| YF-EV-0129 | Capital Financial Update to Dec 31, 2025, Attachment 2 | PDF | main checkout | match |
| YF-EV-0130 | Spring 2025 SCBA detailed adjustments | PDF, 8 pp | main checkout | match |
| YF-EV-0131 | Dec 2022 budget minutes, item page | HTML | main checkout | match |
| YF-EV-0200 | 2025 Infrastructure State and Condition Report | PDF, 39 pp | worktree | match |
| YF-EV-0201 | 2024 Financial Annual Report | PDF | worktree | match |
| YF-EV-0202 | Approved 2019-2022 Capital Budget | PDF | worktree | match |
| YF-EV-0203 | Dec 2, 2024 budget minutes | HTML | worktree | match |
| YF-EV-0204 | Dec 2022 budget minutes, full page | HTML | worktree | match |
| YF-EV-0205 | Infrastructure Committee minutes, Feb 23, 2026 | HTML | worktree | match |
| YF-EV-0206 | Executive Committee minutes, Jan 21, 2026 | HTML | worktree | match |
| YF-EV-0207 | Council minutes, Apr 17, 2023 | HTML | worktree | match |
| YF-EV-0208 | 2025 Financial Annual Report | PDF | worktree | match |

None is a soft-404. YF-EV-0200 has text on 38 of 39 pages. The cover page
has none, so the absence searches below cover every page of report text.

---

## The recomputations

`npx tsx scripts/calcs/infrastructure-deficit.ts` was run, and each source
cell it transcribes was read against the archive it names.

| Result | Output | Source cells checked |
|---|---|---|
| Roads class D and F share, rebuilt from its three nested rows | 11.2 | YF-EV-0200 p. 37: Paved Roads $8,204,164,788 at 12.5, Unpaved $182,805,696 at none rated, Curbs $2,097,342,722 at 7.0. The three add to $10,484,313,206 exactly. |
| Band, primary and alternative | Partially supported, both | brief.md lines 373 to 391 |
| Margin over the 10 per cent line | 1.2 points | |
| Share with not-rated left out | 11.4 | 11.2 / 98.3 |
| Replacement value | $10.5 billion | |
| Roads Service Assets band | Partially supported | YF-EV-0200 p. 21: $15,697,712,522, 11.6 per cent D and F |
| CM-20-0330 approved total | 100 | YF-EV-0114 p. 542: 5,950 / 26,750 / 33,650 / 33,650, one source row, Tax-Supported Debt |
| E / X / U | 100 / 0 / 0 | |
| Eligibility band, both cutoffs | Supported | the finding is Partially supported by the synthesis rule, not by this band |
| Band if unread (E 0, U 100) | Not established | the Anthropic seat's blind-round position |
| Current approved | 99.57 | YF-EV-0129: "99,570 … Tax-Supported Debt - 99,570" |
| Adopted gap | 1,629.911 | YF-EV-0114 p. 50 Table 6: 3,575,584 less 1,945,673 |
| $100M over $1.52B | 6.6 per cent (0.0658) | YF-EV-0201 p. 53 |
| $100M over the adopted gap | 6.1 per cent (0.0614) | |
| Multiples | 15.2 and 16.3 | "about a fifteenth" |
| Finding changes at | at most $400M, or above $2,000M | |
| RIMS funded | 54.4 per cent | Table 6 prints 54.4% |
| Ten-year gap share | 2.1 per cent | $4.8 billion, YF-EV-0201 p. 53 |
| Share of adopted capital budget | 1.39 per cent | YF-EV-0114 p. 55, Table 7: 7,192,540 |
| Share of funded renewal | 4.56 per cent | Table 5: 2,194,927 |

`npx vitest run tests/calcs-infrastructure-deficit.test.ts`: 10 passed. Every
figure in the story and the claims equals this output or a source cell.

Three comments in the calcs module give the wrong page. The CM-20-0330
funding table is on p. 542, not 541. Table 6 is on p. 50, not 49 (its gap
sentence is on p. 49). The faithfulness disposition in
`faithfulness/gpt-1.md` places the profile sheet on p. 539, not 540. None of
these reaches the page. They are advisory.

---

## Story — `infrastructure-deficit.mdx`

### Front matter (7)

| Statement | Grade | Basis |
|---|---|---|
| one_line: rated part of its roads poor at the end of 2024; the $100M small beside the renewal shortfall | VERIFIED | YF-EV-0200 p. 2 "data collected as of December 31, 2024", p. 37 Roads 11.2%; calc ratio 6.6% |
| tldr 1: about a ninth, by replacement cost, poor or very poor at the end of 2024 | VERIFIED | p. 37; 11.2% is 1/8.9 |
| tldr 2: ratings older than the argument, cannot show August 2026 | VERIFIED | p. 2 date; capture 2026-08-26 (intake.md) |
| tldr 3: council approved $100M in borrowing, repaid through taxes | VERIFIED | YF-EV-0114 p. 542; p. 31 "debt servicing impact to the operating budget (estimated to be a 4.52 per cent tax increase)" |
| tldr 4: about a fifteenth of the renewal shortfall | CALC | 15.2 |
| tldr 5: does not check drainage or what council should have done | VERIFIED | the body's own scope; register question wording |
| changelog 2026-09-24 | VERIFIED | synthesis.json: three findings, the money claim Split |

### Opening (2)

| Statement | Grade | Basis |
|---|---|---|
| A Facebook post about a City committee's bike-lane decision in late August 2026 | VERIFIED | intake.md: "one Facebook thread on the 2026-08-26 Infrastructure Committee decision" |
| The argument, paraphrased: roads a mess, alleys need attention, huge deficit and still $100M | VERIFIED | intake.md comments 348, 352, 125 |

### What the City's ratings say about the roads (25)

| # | Statement | Grade | Basis |
|---|---|---|---|
| R1 | Grades A very good to F very poor | VERIFIED | YF-EV-0200 p. 4 "A standardized five-point rating system on a scale of A to F (very good to very poor)" |
| R2 | Latest ratings in the 2025 report, data up to December 31, 2024 | VERIFIED | p. 2 "The data used in this report is from data collected as of December 31, 2024"; freshness audit found nothing newer |
| R3 | Roads class about $10.5 billion to replace, on that date | VERIFIED | p. 37 "$10,484,313,206" |
| R4 | 11.2 poor or very poor, 70.8 good or very good, 16.2 fair, 1.7 not rated | VERIFIED | p. 37 row "Roads … 70.8% 16.2% 11.2% 1.7%" |
| R5 | City weights by replacement value | VERIFIED | p. 4 "Replacement value is used as the weighted average for the portfolio's other attributes" |
| R6 | No share by length | VERIFIED | p. 37 prints condition shares by value only; quantities are in mixed units ("Varies") |
| R7 | The class holds more than driving surfaces | VERIFIED | p. 37 nested Curbs row |
| R8 | "Paved roads are 12.5 per cent poor or very poor." | **PARTIAL, blocking** | p. 37 carries 12.5% as of December 31, 2024. Present tense, no date. |
| R9 | "Curbs, which the City files under Roads, are 7.0 per cent." | **PARTIAL, blocking** | same |
| R10 | "Unpaved roads have no rating at all." | **PARTIAL, blocking** | p. 37 "100.0%" not rated on that date. Present tense, no date. |
| R11 | Paved roads alone give the same result | CALC | roadsBand(12.5) |
| R12 | The finding is Partially supported | CALC | roadsBand(11.2), both cutoffs |
| R13 | A real part rated poor at the end of 2024 | VERIFIED | dated |
| R14 | Brief's lines a quarter and a tenth, fixed in advance, from no published standard | VERIFIED | brief.md 373-377, 394 |
| R15 | "At 11.2 per cent the roads land just above the tenth." | **PARTIAL, blocking** | CALC margin 1.2. Present tense about the roads, no date. |
| R16 | Appendix prints the previous report's figure; Roads 11.4 | VERIFIED | p. 37 "2023 Report … 11.4%" |
| R17 | Report says its method changed | VERIFIED | p. 2 "the methodology of this report is different from previous years" |
| R18 | Earlier comparison has no separate curbs row | VERIFIED | p. 37, Curbs 2023 columns "-" |
| R19 | 2019-2022 budget: Council aimed to keep under a tenth of arterials poor | VERIFIED | YF-EV-0202 p. 35 "Council's overall target (fewer than 10 per cent of the arterial roads in D or F condition)" |
| R20 | Covers main roads only; nobody on the panel showed it still applies | VERIFIED | same; round2/claude.json "I have not shown it is in force" |
| R21 | The word alley does not appear in the 2025 report | VERIFIED | case-insensitive search of all 38 text pages. The only matches are "Valley" (pp. 3, 14, 38). |
| R22 | Nothing found gives a current citywide alley rating | VERIFIED | all three round-2 files |
| R23 | 2019-2022 budget: two-thirds of 1,180 km of alleys in poor condition | VERIFIED | YF-EV-0202 p. 34 "There are 1,180 kilometers of alleys … two-thirds of them are in poor condition" |
| R24 | "it set up a program to clear alleys rated very poor" | PARTIAL | p. 4 "Introduced in 2017, the Alley Renewal Strategy will accelerate the elimination of alleys rated to be in very poor condition." "Clear" can read as snow clearing on a page that mentions snow. Suggested: "to renew alleys rated very poor". Not blocking. |
| R25 | The estimate carries no grades or date of assessment | VERIFIED | p. 34 passage gives "poor condition" only |

### Where the $100 million came from, and how the panel split (28)

| # | Statement | Grade | Basis |
|---|---|---|---|
| M1 | CM-20-0330, Active Transportation Implementation Acceleration, in the 2023-2026 Capital Budget | VERIFIED | YF-EV-0114 p. 540 |
| M2 | Pays for planning, design, building the bike network, wayfinding and bike parking | VERIFIED | p. 540 profile description |
| M3 | One funding source for the whole $100M, tax-supported debt | VERIFIED | p. 542 "Approved Funding Sources / Tax-Supported Debt … 100,000", one row |
| M4 | Borrowing whose servicing falls on the operating budget and so on taxes | VERIFIED | p. 31 |
| M5 | December 2022 minutes: approved 9 to 4 "with funding coming from Tax-Supported Debt" | VERIFIED | YF-EV-0204 (and YF-EV-0131): the restated Amendment 7, "Carried (9 to 4)" |
| M6 | The profile lists no grant | VERIFIED | p. 542 |
| M7 | No reviewer found a rule tying the borrowing to bike lanes at approval | VERIFIED | round1/gpt.json, round2/claude.json, round2/gpt-luna.json on Bylaw 20394 |
| M8 | Brief treats general capital money as available unless restricted | VERIFIED | brief.md 448-452 |
| M9 | The panel split along vendor lines | VERIFIED | round1 verdicts: Claude Not established; Sol and Luna Supported |
| M10 | What divided them was what they could open | VERIFIED | round1/claude.json limitations 1-2 against round1/gpt*.json supporting_evidence |
| M11 | Claude Opus 5.5 got no text from the budget file; the portal turned it away | VERIFIED | round1/claude.json: "its text could not be extracted"; "returned HTTP 403 for every document" |
| M12 | All it had were news and advocacy pieces saying tax-supported debt | VERIFIED | Taproot (media) and Paths for People (advocacy); Global News named no source |
| M13 | The brief bars news from supplying a deciding figure | VERIFIED | brief.md 280 |
| M14 | Treated all $100M as undetermined, returned Not established | VERIFIED | "U = $100.0M, E = 0, X = 0" |
| M15 | Wrote that confirmation would almost certainly make it yes | VERIFIED | suggested_short_answer: "if that is confirmed the answer is almost certainly yes" |
| M16 | GPT-6 Sol and GPT-6 Luna had the profile sheet and minutes and returned Supported | VERIFIED | both cite the profile and the minutes |
| M17 | One vendor, not a majority; the fixed rule gives Partially supported | VERIFIED | synthesis.json rationale |
| M18 | The site's archived copies match the OpenAI seats' account | VERIFIED | reproduced here: p. 542 and YF-EV-0204 |
| M19 | The Anthropic seat's second answer found another City record and moved to supported; round 2 cannot change a finding | VERIFIED | round2/claude.json verdict_changes and supporting_evidence ("Tax-Supported Debt - 100,000") |
| M20 | Profile classes the program as growth; includes funding to supplement renewal | VERIFIED | p. 540 "GROWTH 100", "The profile includes funding to supplement renewal projects where alignment exists." |
| M21 | December 2022: four amendments proposing other amounts withdrawn before $100M carried | VERIFIED | YF-EV-0204 amendments 7.1, 7.3, 7.4, 7.5, each "Withdrawn". Two of the four named the Approach 1 profile CM-20-0310, and a fifth (7.2), proposing the same $100M, was also withdrawn. "Four proposing other amounts" is exact. |
| M22 | December 2024 motion to cut $33.65M from each of 2025 and 2026 lost 4 to 7 | VERIFIED | YF-EV-0203 "Defeated (4 to 7)" |
| M23 | In June 2025 council shifted $430,000 to a Dunluce neighbourhood and alley renewal profile, leaving $99.57M | PARTIAL | YF-EV-0130 carries the $430,000 from CM-20-0330 to "25-25-9506 Dunluce Neighbourhood and Alley Renewal" under "Spring 2025 SCBA". The bytes do not print "June". The month is from the registry's `published_on` (2025-06-10). Not blocking. |
| M24 | $99.57M still reported at the end of 2025 | VERIFIED | YF-EV-0129 "99,570 … 39,984 … 99,570" |
| M25 | None of the three found money moved into bike lanes from renewal | VERIFIED | all six round files |
| M26 | April 2023, Bylaw 20394, 8 to 4, authorizing the City to finance the project | VERIFIED | YF-EV-0207, third reading "Carried (8 to 4)" |
| M27 | Two reviewers read it as tying the debt; only council could move it after | VERIFIED | round1/gpt.json interpretation_notes; round2/claude.json |
| M28 | The bylaw's own text could not be archived | VERIFIED | registry YF-EV-0207 and the freshness disposition: attachment refused, HTTP 403 |

### The money beside the shortfall (14)

| # | Statement | Grade | Basis |
|---|---|---|---|
| S1 | The City publishes its own figure | VERIFIED | |
| S2 | At adoption: "renewal funding gap of $1.63 billion for 2023-2026" | VERIFIED | YF-EV-0114 p. 49, verbatim |
| S3 | Funded 54.4 per cent of ideal renewal | VERIFIED | p. 50 Table 6 |
| S4 | 2024 annual report: approximately $1.52 billion for the same four years | VERIFIED | YF-EV-0201 p. 53 "the renewal investment shortfall in 2023-2026 is approximately $1.52 billion" |
| S5 | Renewal means existing things; the shortfall covers the whole program | VERIFIED | YF-EV-0201 p. 53 definition; no asset-class split |
| S6 | 6.6 per cent, about a fifteenth | CALC | |
| S7 | 6.1 per cent of the adopted figure | CALC | |
| S8 | Each sets an approval beside unfunded renewal over the same four years | VERIFIED | both 2023-2026 |
| S9 | The brief's lines, a quarter and a twentieth | VERIFIED | brief.md 580-605 |
| S10 | Partially supported | CALC | |
| S11 | Only at most $400M, or above $2B, would change it | CALC | |
| S12 | 1.39 per cent of the adopted capital budget | CALC | |
| S13 | About 31 per cent at adoption, 35.4 later | VERIFIED | YF-EV-0114 p. 49 "approximately 31 per cent"; YF-EV-0201 p. 53 "35.4 per cent" |
| S14 | 2025 annual report: approximately $2.7B for 2027 to 2030 | VERIFIED | YF-EV-0208 p. 53 |

### What this page does not answer (4)

| Statement | Grade | Basis |
|---|---|---|
| Drainage is in the question's wording and not checked | VERIFIED | register question `infrastructure-deficit` |
| Snow clearing is a separate question; grass cutting not checked | VERIFIED | register `snow-clearing` |
| Three claims (rec centre, streetlights, drainage damage) not put to the panel | VERIFIED | intake.md claims 3 to 5; brief has three claims |
| Two earlier comparisons are on a separate page, off the board | VERIFIED | `at-100m-vs-roads`, `at-100m-vs-snow` `board_withdrawn` |

---

## Claim — `infra-roads-condition` (35)

| Statement | Grade | Basis |
|---|---|---|
| answer: about a ninth, poor or very poor at the end of 2024, by replacement cost | VERIFIED | dated |
| KF-1: latest report by 2026-09-03; data as of December 31, 2024 | VERIFIED | p. 2 |
| KF-2: "… By that value, 70.8 per cent **is** rated good …, 11.2 per cent poor or very poor … and 1.7 per cent not rated." | **PARTIAL, blocking** | p. 37 figures correct; no date, present tense |
| KF-3: "The City's Roads class **holds** … unpaved roads, none of which **are** rated; and curbs, 7.0 per cent …" | **PARTIAL, blocking** | p. 37 figures correct and the weighted check reproduces; no date, present tense |
| KF-4: the grade definitions for D and F | VERIFIED | p. 5, verbatim in substance |
| KF-5: the 2023 report's Roads row 11.4, no curbs row; methodology differs | VERIFIED | p. 37, p. 2. Advisory: the 11.4 is undated too (the 2023 report's own inventory date). It is not a claim about current condition. |
| KF-6: "Roads Service Assets, at $15,697,712,522, with 11.6 per cent poor or very poor. That grouping **lands** …" | **PARTIAL, blocking** | p. 21 figures correct; no date |
| KF-7: Infrastructure Committee 2026-02-23, Administration presented; deleted from the Executive Committee agenda 2026-01-21 | VERIFIED | YF-EV-0205 item 7.2 "made a presentation"; YF-EV-0206 "Deletions: … 7.3 2025 Infrastructure State and Condition" |
| KF-8: 1,180 km, two-thirds poor; Alley Renewal Strategy 2017 | VERIFIED | YF-EV-0202 pp. 4, 34 |
| KF-9: arterial target under 10 per cent D or F | VERIFIED | p. 35 |
| L-1: describes December 31, 2024; cannot say August 2026 | VERIFIED | |
| L-2: citywide figure | VERIFIED | |
| L-3: lines fixed in advance; alternatives 20 and 7.5 give the same; figure 1.2 above | VERIFIED | brief.md; calc |
| L-4: share by value; no share by length | VERIFIED | p. 37 |
| L-5: grades in bands; without not-rated, 11.4 | CALC | |
| L-6: "Paved roads on their own, at 12.5 per cent, **sit** in the same band." | **PARTIAL, blocking** | p. 37; no date, present tense |
| L-7: two dates given; the minutes settle it; archived copy is the website's | VERIFIED | round1 Sol 2026-02-23, Luna 2026-01-21; YF-EV-0205/0206; registry URL edmonton.ca |
| L-8: no current target for the whole class | VERIFIED | round files |
| L-9: no current alley distribution; old estimate | VERIFIED | |
| Unknowns (2) | VERIFIED | |
| Missing evidence (2) | VERIFIED | |
| Claude: Partially supported, Low | VERIFIED | round1/claude.json |
| Claude KF: 11.2, partial under both, paved 12.5, curbs 7 | VERIFIED | round1 interpretation_notes. Must fix under the date rule: add "at the end of 2024". |
| Claude KF: could not open the report; third-party transcription; said so | VERIFIED | |
| Claude changed: confidence to Moderate; dropped the post-cutoff transcriptions | VERIFIED | round2/claude.json limitation 2 |
| Sol: Partially supported, High | VERIFIED | |
| Sol KF: Appendix B 11.2, data as of December 31, 2024 | VERIFIED | |
| Sol KF: older arterial target cannot classify the class | VERIFIED | round2/gpt.json limitation 4 |
| Sol changed: no change | VERIFIED | |
| Luna: Partially supported, Moderate | VERIFIED | |
| Luna KF: used the class total, 11.2 | VERIFIED | Must fix under the date rule: add "at the end of 2024". |
| Luna KF: no share by length | VERIFIED | round2/gpt-luna.json limitation 3 |
| Luna changed: confidence to High | VERIFIED | |

## Claim — `infra-bike-money-renewal-eligible` (33)

| Statement | Grade | Basis |
|---|---|---|
| answer: all $100M borrowing repaid through taxes; the OpenAI reviewers found it could have gone to renewal; the Anthropic reviewer could not check | VERIFIED | p. 542, p. 31; round1 files |
| KF-1: one source, TSD, 5,950 / 26,750 / 33,650 / 33,650, 100,000 | VERIFIED | YF-EV-0114 p. 542 |
| KF-2: $1.3B new TSD, about $99.7M a year, a 4.52 per cent tax increase | VERIFIED | p. 31 |
| KF-3: minutes quote; 9 to 4 | VERIFIED | YF-EV-0131, YF-EV-0204 |
| KF-4: 100 per cent growth; "includes funding to supplement renewal projects where alignment exists" | VERIFIED | p. 540 |
| KF-5: four amendments withdrawn, each naming TSD | VERIFIED | YF-EV-0204; see M21 |
| KF-6: December 2024 motion defeated 4 to 7, described as TSD | VERIFIED | YF-EV-0203 "with funding from tax-supported debt" |
| KF-7: June 2025, $430,000 to Dunluce, $99,570,000; end-2025 report same; the only change the reviewers found | PARTIAL | amounts VERIFIED (YF-EV-0130, YF-EV-0129); "only change found" VERIFIED (round2/claude.json: "The only adjustment found that changed the approved amount"); "June" from the registry, not the bytes. Not blocking. |
| KF-8: April 17, 2023, third reading 8 to 4, Bylaw 20394 | VERIFIED | YF-EV-0207 |
| L-1: split by vendor; one reading from that vendor; the rule's result | VERIFIED | round1; synthesis |
| L-2: what each seat could open; the brief's rule; the seat's own likely-yes and its warning about "publish too little" | VERIFIED | round1/claude.json: limitations 1-2, suggested_short_answer, and "The story must not use the Stakes line 'Edmonton does not publish enough' … That would convert an access failure into a claim about the record." |
| L-3: both OpenAI seats read the profile and minutes; no grant; the site's own check after the panel | VERIFIED | round1/gpt*.json; this audit |
| L-4: the cross-review record listing "Tax-Supported Debt - 100,000"; moved to supported; round 2 cannot move a finding; "The June 2023 record could not be archived for this page." | PARTIAL | Everything up to the last sentence is VERIFIED (round2/claude.json). No artifact records an attempt to archive DocumentId=196163: fetch-report.md covers round 1 only, and no registry entry or disposition names it. Suggested: "This site has not archived the June 2023 record." Not blocking. |
| L-5: about source, not counterfactual; no transfer into the program found | VERIFIED | round files |
| L-6: Bylaw 20394 April 2023; two reviewers' reading; text not archived; after the December 2022 approval | VERIFIED | YF-EV-0207; round1/gpt.json; round2/claude.json |
| L-7: servicing falls on the operating budget; not a restriction | VERIFIED | p. 31 |
| L-8: $99.57M above both lines; end-2025 amount; no later update checked | CALC | with YF-EV-0129 |
| Unknowns (2) | VERIFIED | |
| Missing evidence (1) | VERIFIED | |
| Claude: Not established, Low | VERIFIED | round1/claude.json |
| Claude KF: could not read the profile or minutes; every dollar undetermined | VERIFIED | |
| Claude KF: "News reports of a 2023 council debate said the program was financed with tax-supported debt" | PARTIAL | One news report covers the 2023 debate (Taproot, 2023-11-27). The other lead is an advocacy post from 2024. Suggested: "A news report of a 2023 council debate said …". Not blocking. |
| Claude KF: no restricted grant | VERIFIED | |
| Claude changed: moved to Supported "and said the change rested on that City record, not on the other reviewers' verdicts" | PARTIAL | round2/claude.json verdict_changes: "The change is based on new City documents, not on the other two reviewers' verdicts". It names the profile sheet and minutes "cited by gpt and gpt-luna" as well as the June 2023 update it found. The singular "that City record" overstates how much rested on its own find. Suggested: "said the change rested on City documents, the profile sheet and minutes the other reviewers cited and a capital update it found itself, not on their verdicts." Not blocking. |
| Sol: Supported, High | VERIFIED | |
| Sol KF: profile and minutes, TSD only | VERIFIED | round1/gpt.json |
| Sol KF: later bylaw limits use after approval, does not show council could not have chosen renewal | VERIFIED | round1/gpt.json challenging_evidence |
| Sol changed: no change | VERIFIED | round2 Supported, High |
| Luna: Supported, Moderate | VERIFIED | round1/gpt-luna.json |
| Luna KF: entire $100M as TSD, eligible under the rule | VERIFIED | |
| Luna KF: where the money came from, not whether council would redirect it | VERIFIED | |
| Luna changed: Supported, High | VERIFIED | round2/gpt-luna.json |

The vendor-split account holds against the round files. Every statement of
what a seat could open, rested on, said or changed is in them. The three
PARTIALs above are wording, not substance.

## Claim — `infra-hundred-million-vs-shortfall` (29)

| Statement | Grade | Basis |
|---|---|---|
| answer: about a fifteenth, 2023 to 2026 | CALC | |
| KF-1: 2024 report ~$1.52B; 6.6 per cent | VERIFIED | YF-EV-0201 p. 53; calc |
| KF-2: $3,575,584K ideal, $1,945,673K funded, 54.4; "renewal funding gap of $1.63 billion for 2023-2026"; 6.1 | VERIFIED | YF-EV-0114 pp. 49-50 |
| KF-3: renewal definition; whole program | VERIFIED | YF-EV-0201 p. 53 "restore it to an efficient operational condition and extend its service life"; YF-EV-0114 p. 43 |
| KF-4: about 31 per cent; later 35.4 | VERIFIED | YF-EV-0114 p. 49; YF-EV-0201 p. 53 |
| KF-5: 1.39 per cent of $7,192.5M; 4.56 per cent of $2,194.9M | CALC | Tables 5 and 7 |
| L-1: lines in advance; no City benchmark; alternatives 15 and 3 | VERIFIED | brief.md; round files |
| L-2: changes only at $400M or $2B | CALC | |
| L-3: approximate; most recent; no ideal or funded amounts behind it; no asset-class split | VERIFIED | p. 53. The ten-year ideal and forecast there are for 2023-2032, not behind the four-year figure. |
| L-4: approval against unfunded renewal; neither is spending | VERIFIED | |
| L-5: no roads-and-alleys shortfall found | VERIFIED | round files |
| L-6: $4.8B over 2023-2032, June 2022; 2.1 per cent | VERIFIED | YF-EV-0201 p. 53; calc |
| L-7: 2025 report: $2.7B 2027-2030; $10.0B 2027-2036; no new 2023-2026 figure | VERIFIED | YF-EV-0208 p. 53; no "renewal investment shortfall" for 2023-2026 anywhere in its text |
| L-8: no reviewer found a cost per kilometre | VERIFIED | round files. The freshness seat's 2011 figure could not be archived, and the sentence is bounded to reviewers. |
| L-9: size says nothing about movability | VERIFIED | |
| Unknowns (2), missing evidence (1) | VERIFIED | |
| Claude: Partially supported, Moderate; KF $1.5-1.6B, 6-7 per cent; KF $400M to $2B; changed: withdrew $1.61B for $1.52B | VERIFIED | round1 and round2/claude.json |
| Sol: Partially supported, High; KF 6.58; KF 6.13; no change | VERIFIED | |
| Luna: Partially supported, High; KF $1.63B, 6.13; changed to Moderate, noted $1.52B | VERIFIED | round2/gpt-luna.json |

## Published pages this branch edits (4)

| Statement | Grade | Basis |
|---|---|---|
| `active-transportation.mdx` pointer: "that is a separate question, now checked on its own page with its findings awaiting review: *Is Edmonton letting roads, alleys and drainage go while it funds bike lanes?*" | **PARTIAL, blocking** | The page is at `pending-review` with three findings, so "checked … awaiting review" is true. The link text is the register's wording. The page it links to is titled "Is Edmonton letting roads go while funding bike lanes?", gives alleys no finding, and says it does not check drainage. A reader of the pointer is told that alleys and drainage were checked. |
| `active-transportation.mdx` changelog 2026-09-24 | VERIFIED | matches the diff. "No finding, figure, hedge or source changed" holds. |
| `at-100m-vs-roads` `board_withdrawn.reason`, new sentence | VERIFIED | the new page exists and checks the roads question without settling this comparison |
| `at-100m-vs-snow` `board_withdrawn.reason`, new sentence | VERIFIED | same |

Advisory: both `board_withdrawn` blocks keep `date: "2026-09-03"` while the
reason now reports a check made on 2026-09-24 ("has since checked"). The
changelog dates the edit, so this is not wrong, but a reader of the notice
alone meets a later event under an earlier date.

---

## Counts

| | story | roads | money | shortfall | edited pages | Total |
|---|---|---|---|---|---|---|
| Statements checked | 80 | 35 | 33 | 29 | 4 | **181** |
| VERIFIED | 66 | 30 | 28 | 26 | 3 | **153** |
| CALC | 8 | 1 | 1 | 3 | 0 | **13** |
| PARTIAL | 6 | 4 | 4 | 0 | 1 | **15** |
| of which blocking | 4 | 4 | 0 | 0 | 1 | **9** |
| NOT FOUND | 0 | 0 | 0 | 0 | 0 | **0** |
| No cited source | 0 | 0 | 0 | 0 | 0 | **0** |

## Blocking findings and the corrections the sources support

Eight fail the inventory-date rule, where the source carries the figure as of
December 31, 2024 and the sentence says it now. One overstates scope on a
published page.

1. **Story, roads section:** "Paved roads are 12.5 per cent poor or very poor.
   Curbs, which the City files under Roads, are 7.0 per cent. Unpaved roads
   have no rating at all." (three statements)
   **Correct to:** "On that date paved roads were 12.5 per cent poor or very
   poor. Curbs, which the City files under Roads, were 7.0 per cent. Unpaved
   roads had no rating at all." (YF-EV-0200 p. 37)
2. **Story, roads section:** "At 11.2 per cent the roads land just above the
   tenth."
   **Correct to:** "At 11.2 per cent at the end of 2024, the roads landed just
   above the tenth."
3. **`infra-roads-condition` KF-2:** "Appendix B of the report puts the City's
   Roads class at a replacement value of $10,484,313,206. By that value, 70.8
   per cent is rated good …"
   **Correct to:** "Appendix B of the report puts the City's Roads class at a
   replacement value of $10,484,313,206 on December 31, 2024. By that value,
   70.8 per cent was rated good (A or B), 16.2 per cent fair (C), 11.2 per cent
   poor or very poor (D or F) and 1.7 per cent not rated."
4. **`infra-roads-condition` KF-3:** "The City's Roads class holds three things:
   paved roads, 12.5 per cent poor or very poor; unpaved roads, none of which
   are rated; and curbs, 7.0 per cent poor or very poor. …"
   **Correct to:** "On December 31, 2024, the City's Roads class held three
   things: paved roads, 12.5 per cent poor or very poor; unpaved roads, none of
   which were rated; and curbs, 7.0 per cent poor or very poor. …" (the rest
   unchanged)
5. **`infra-roads-condition` KF-6:** "The report's service view groups a wider
   set, Roads Service Assets, at $15,697,712,522, with 11.6 per cent poor or
   very poor. That grouping lands in the same band as the Roads class."
   **Correct to:** "The report's service view groups a wider set, Roads Service
   Assets, at $15,697,712,522, with 11.6 per cent poor or very poor on
   December 31, 2024. That grouping landed in the same band as the Roads
   class." (YF-EV-0200 p. 21)
6. **`infra-roads-condition` L-6:** "Paved roads on their own, at 12.5 per cent,
   sit in the same band."
   **Correct to:** "Paved roads on their own, at 12.5 per cent at the end of
   2024, sat in the same band."
7. **`active-transportation.mdx` closing pointer:** the link text "Is Edmonton
   letting roads, alleys and drainage go while it funds bike lanes?" after "now
   checked on its own page".
   **Correct to:** link text "Is Edmonton letting roads go while funding bike
   lanes?", the linked page's title. Or keep the register wording and say
   "now checked in part on its own page". The page gives alleys no finding and
   does not check drainage.

## Must fix under the date rule, not blocking

These are past tense and attributed to a seat, so they do not read as
current condition. They still lack the date the task requires on every roads
statement:

- `infra-roads-condition`, Claude Opus 5.5 key finding 1: add "at the end of
  2024" after "Found 11.2 per cent of the Roads class in D or F".
- `infra-roads-condition`, GPT-6 Luna key finding 1: add "at the end of 2024"
  after "at 11.2 per cent poor or very poor".

## Not blocking

- R24 (story): "to clear alleys rated very poor" should read "to renew" or
  "to eliminate", the source's word.
- M23 and KF-7: "June 2025" rests on the registry date, not the archived
  bytes, which say "Spring 2025". It is correct per the registry and can
  stand.
- `infra-bike-money-renewal-eligible` L-4: "could not be archived" has no
  record behind it. "This site has not archived the June 2023 record" is true.
- `infra-bike-money-renewal-eligible`, Claude key finding 2: "News reports" →
  "A news report".
- `infra-bike-money-renewal-eligible`, Claude `changed_between_rounds`: name
  all the documents the change rested on (wording above).
- Page references in the calcs module comments and in the faithfulness
  disposition, as listed under the recomputations.

A second pass need only re-read the nine blocking statements, the two
seat-attributed date fixes, and any of the five non-blocking items the editor
takes.
