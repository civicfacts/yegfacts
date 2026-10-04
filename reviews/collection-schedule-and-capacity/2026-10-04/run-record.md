# Run record: collection-schedule-and-capacity

Question: "Are Edmonton's garbage, green-bin and recycling collection
schedules adequate for households?" Register id
`collection-schedule-and-capacity`, source
`edmonton-rant-and-rave-2026-09-10`, 11 claims, 17 accounts, 7 for and 10
against. Methodology v1.43.

Status: **PARKED AT THE FRAMING CAP, 2026-10-04; brief not frozen.**
Three admitted framing reports, all REVISE; there is no fourth. Under
the ordinary three-report limit (methodology v1.12) the brief is parked
and reopens only on new intake evidence. Check 3's three corrections to
proposed reopening conditions are conceded and unapplied. An independent
reader found them eligible for the v1.39 wording confirmation; the
editor declined that optional route because it would freeze the brief
only and would not authorize adopting the seven proposed claim parks or
publishing a page with no finding. No claim park is adopted, the four
schedule claims remain context without a verdict, no panel ran, there
is no finding and no published story or answer, and household adequacy is
unanswered. The outcome is under "Final outcome: the brief is parked at
the cap"; earlier sections are the dated history.

## What was done, in order

1. **Read the register, the capture and the intake run.** The question
   row and its 11 claim rows were read from `intake/register.yaml`. All
   117 comment records in
   `intake/captures/edmonton-rant-and-rave-2026-09-10/comments.jsonl` were
   read, with the capture README and the post. For each of the 19 comments
   that carry a wording under this question, the reply parent was resolved
   from the platform comment id. The intake run's README, source note,
   manifest, quote-gate report, fold note, `merged.json`, `groups.json`
   and both triage readers' raw outputs were read from
   `reviews/intake/edmonton-rant-and-rave-2026-09-10/`.

2. **Checked the counts.** 11 claims: confirmed. 17 accounts: confirmed,
   17 distinct pseudonyms. The figure of 28 is the number of captured
   wordings carried on the 11 claims, and it counts overlap: three quoted
   runs are carried word for word on two claims each, so there are 25
   distinct runs, and they come from 19 distinct comment records. The
   post is not a comment record and is carried on no claim. `intake.md`
   sets this out with the indexes.

3. **Wrote `intake.md` from the capture, not from memory.** Each of the 19
   comments, and nine more that bear on adequacy and sit under other
   questions or under no claim, is quoted whole. The quotations were
   inserted by a script that reads `comments.jsonl`, and a second pass
   confirmed that each of those 28 quoted comments (19 and 9) matches its
   capture record exactly. Three things in the intake run that a framing checker
   should know are recorded there: the extractors read comments only and
   had the source note's description of the post, not its words; the
   against side's "not enough" assertion has no proposition of its own
   under this question and is spread across three claims; and the 7 and
   10 split counts one person on the against side who argues for the
   service throughout the thread.

4. **Established what the public record holds before drafting.** The
   triage reason assumed three records: collection calendars, program
   history, and waste audits that "show how full carts get".
   - The schedule exists as published. The City's Curbside Collection
     page states the frequency of each stream. The Internet Archive's
     captures of it on 2026-06-18 and 2026-09-19 are byte-identical,
     which shows the page said the same on those two dates and nothing
     about the days between them. (The first draft of this record said
     the identity "fixes the page across the comment dates". That was an
     overclaim, corrected before any framing check; see "Pre-framing
     correction" below.) The Waste Services Bylaw
     20363 (consolidated 2026-03-17) was read for its sections 17 to 21
     and its rate schedule; it states no frequency and gives the City
     Manager the power to set one. The second triage reader's reason said
     the bylaw sets out the frequencies. It does not.
   - The history exists. The Archive holds the City's Garbage Collection
     FAQ as of 2020-12-31, the Garbage Collection page from 2018 to 2021,
     and the Edmonton Cart Rollout page from 2019 to 2022. City
     Operations report CO00921, Edmonton Cart Rollout Update (Utility
     Committee, 2022-02-04), was read in full from the Archive's capture;
     the live portal file answers scripts with a browser check (HTTP 403).
   - The audits do not exist as the triage reason described them. The
     City's waste characterization studies, as the Waste Reduction
     Roadmap '30 and the 2026 rate filing describe them, examine what
     collected waste is made of. The 2026 rate filing was searched for
     set-out, audit, survey, capacity and cart-size terms and its tables
     of customers by cart size and of performance measures were read. It
     holds cart counts by size, waste per capita and a diversion rate, a
     budget line for a characterization study, and one sentence about a
     relaunched public perception survey with no results. Nothing read
     measures how full a cart is, the volume set out against cart
     capacity, or how many homes have more garbage than the cart holds.
   - The open data catalogue was searched for waste, garbage, cart and
     311 datasets. It holds a Cart Counts dataset (carts in service by
     neighbourhood and size), a 311 requests dataset, and Insight
     Community survey datasets on yard waste and communal collection from
     2022. None is a cart-fullness or set-out measure.
   - The current Excess Waste Program, Cart Repair and Exchange, Food
     Scraps, Waste Utility Rates, Extended Producer Responsibility and
     Future of Waste pages were read.
   - Web searches were used as leads to City documents only. A search
     summary that quoted set-out percentages for green carts could not be
     traced to an Edmonton document and appears to come from another
     city's report; nothing in the brief rests on it.

5. **Staged and ingested the sources the brief relies on.** Each was
   fetched with `scripts/evidence-stage.ts --url` and ingested with
   `scripts/evidence-ingest.ts`, rights unclear, so all are private
   archives. Ids were allocated serially from the registry as it stood
   (highest id YF-EV-0331 in the worktree and on `origin/main`, checked
   immediately before ingest). Archive captures were fetched through the
   Archive's raw-content (`id_`) endpoint so the bytes are the City's and
   not the Archive's wrapper. Each archived file's SHA-256 was recomputed
   after ingest and matches its registry entry.

   | ID | Source | Used for |
   |---|---|---|
   | YF-EV-0332 | Curbside Collection page, live 2026-10-04 | both claims, present schedule |
   | YF-EV-0333 | Excess Waste Program page, 2026-10-04 | background to the proposed parks |
   | YF-EV-0334 | Cart Repair and Exchange page (cart sizes), 2026-10-04 | background to the proposed parks |
   | YF-EV-0335 | Extended Producer Responsibility page, 2026-10-04 | claim 2 qualification 5 |
   | YF-EV-0336 | Waste Services 2026 Utility Rate Filing | what the City measures; cart counts by size |
   | YF-EV-0337 | Curbside Collection page, Archive capture 2026-09-19 (same bytes as the 2026-06-18 capture) | both claims: a later restatement, and the second bracketing capture under the dating rule (first draft: "the as-of source") |
   | YF-EV-0338 | Waste Services Bylaw 20363, consolidated 2026-03-17 | claim 1 qualification 2 |
   | YF-EV-0339 | Garbage Collection FAQ, Archive capture 2020-12-31 | claim 1, the earlier schedule |
   | YF-EV-0340 | Edmonton Cart Rollout page, Archive capture 2021-07-26 | claim 1 qualifications; claim 2 |
   | YF-EV-0341 | Report CO00921, Edmonton Cart Rollout Update, Archive capture | claim 1 qualifications; what was and was not monitored |
   | YF-EV-0342 | Waste Reduction Roadmap '30 | what the characterization studies measure |

   Six of the eleven ingest commands failed on the first pass because the
   shell passed `--published-on` and its value as one argument; the
   script printed its usage and wrote nothing. They were rerun with the
   argument passed correctly. That is why ids 0332 to 0336 are the
   sources without a publication date and 0337 to 0342 the ones with. One
   registry description (YF-EV-0337) was corrected by hand after ingest:
   it first said the capture date fell inside the thread's comment dates,
   and it falls three days after the last captured comment. It was
   corrected a second time in the pre-framing correction below, because
   it also said the two identical captures showed the page unchanged
   between them.

6. **Drafted `brief.md`.** Two claims to the panel, two carried without a
   verdict, seven proposed for parking. The reasoning is below.

7. **Validated.** `npm run validate` passed with the eleven new registry
   entries (output: `validate: OK — 12 stories, 26 claims, 1 commitments,
   8 topics, 280 evidence entries`; the warnings it prints are about
   other questions and predate this run). Every quoted commenter wording
   in `brief.md` and `intake.md` was checked by script against the
   capture; the only quotations not found there are the register's
   propositions, the triage reasons and the editor's own labels.

## Editorial decisions in the draft, and why

These are Stew's, made before any framing check, and the checker may
reject any of them.

**The brief says in its first section that it does not answer the
registered question.** The question is whether the schedule is adequate.
No record identified measures whether a cart holds a household's garbage.
A brief that tested the schedule and let the verdict stand in for
adequacy would answer a measurable cousin. So the schedule and history
claims go forward, named as that, and the page leads with what could not
be answered.

**Two claims go to the panel.**

- `collection-frequency-change`. A sequence stated as fact by two
  people, with City documents of both dates to read it from. Primary
  scope curbside homes, because the holders describe the service at a
  house; all homes as the required alternative. "Then raised taxes" is
  left to `taxes-and-collection-cut`.
- `green-bin-frequency`. Three people state it with no season, and one
  builds a winter proposal on it. The primary reading is the schedule
  across the year, the alternative the as-of date alone. This is the
  choice most likely to be contested: a holder writing in September can
  say "I meant now". The draft gives the reason and requires both
  readings to be reported.

**Two claims carry no verdict and are not parked.**
`black-bin-frequency` and `recycling-frequency` are stated by both sides
of the thread and disputed by nobody. A verdict on either fails check 8
of the framing prompt on its face: Supported would tell no one anything.
The frequencies still reach the reader as sourced facts, the first as an
element of claim 1 and the second as a qualification of claim 2. The
precedent is the consultation and roads briefs, which carried undisputed
claims with no verdict.

**Seven claims are proposed for parking, on both sides.** Four against
the service, three for it.

- `biweekly-bin-adequacy` and, with it, the unregistered "not enough"
  assertion: the thread's actual dispute. Each wording is a household's
  report of its own cart. The general claim needs cart fullness by
  household size. The City's suitability statements are its own
  description of its design and were not used as a test.
- `between-collection-dump-runs`: one household's trips; the registered
  cause is one no drop-off count could attribute.
- `summer-garbage-condition`: with the degree removed it is a truism;
  with the degree kept it has no measure. The remedy is a proposal.
- `diaper-waste-volume`: the same shape. A figure built from diapers per
  day would be the brief's own invention.
- `green-bin-utilization`: the one park where a computation was
  available and declined. Tonnes of food scraps and customer counts give
  an average weight per home per week. The claim is about how much of the
  cart is filled; weight says nothing about that without a density, and
  an average says nothing about carts not set out. The checker may see it
  differently.
- `past-weekly-bag-volume`: the "no limit" premise is reported under
  claim 1; the amount and the renovators have no record.
- `blue-bag-capacity-offset`: one household; its general form is the
  `household-waste-diversion` question.

**The triage reason's promise of audits was not taken as proof.** The
register's public reason says waste audits "show how full carts get". The
editor did not find that they do and did not find the study reports
themselves. The parks name them as the first place to look.

## What was not read, and one access block

- **Report CR_7173**, Single Unit Waste Set-out Business Case (2019), and
  the Council and Utility Committee records that dealt with it. Not found
  in a retrievable form. It bears on who decided the schedule change and
  may hold demonstration-phase data on cart use. The brief states nothing
  about its contents.
- **The waste characterization study reports** (2022-23, and 2025-26 in
  progress), **the public perception survey** the 2026 rate filing
  mentions, and **the resident research** report CO00921 planned for
  spring 2022. None found. Each is named in the brief as a place that
  could reopen a park.
- **The Office of the City Auditor's Waste Services Audit** of February
  2018 (CR_5555). Not sought beyond its mention in the Waste Strategy.
- **Attachments 1 and 3 to CO00921.** Not located; Attachment 2 (yard
  waste) is in the Archive and was skimmed.
- **Alberta Health Services publications** on household garbage storage.
  Not searched; the brief says so.
- **The meeting portal's file server** answered the site's fetcher with a
  browser check (HTTP 403) for DocumentIds 126828 and 126830. Both were
  read from Internet Archive captures instead. A query to the portal's
  calendar for the meeting id of the Utility Committee meeting of
  2022-02-04 was refused by a command guard on the editor's machine and
  was not retried; the report is identified by its own header (item 6.1,
  Utility Committee, 2022-02-04, CO00921) and its DocumentId.
- **The 25-year Waste Strategy** was searched for frequency terms and
  read in the passages they led to, not end to end.

## Register entries proposed, not applied

No claim row in `intake/register.yaml` has changed. Writing a park onto
the public register before the independent framing check has seen it
would present a proposal as a decision. The question row changed once, at
the execution block (see below). If the brief freezes as drafted, the
remaining changes are:

- Question row: a `reason` and `note` that describe the frozen brief in
  place of the paused review.
- Each of the seven parked claims: `triage: park`, `ground:
  no-instrument`, `parked_at: framing`, and a `reason` taken from the
  brief's numbered park for that claim, with its reopening condition.
- `black-bin-frequency` and `recycling-frequency`: no state, as claims
  carry none by default.

## Pre-framing correction, 2026-10-04

A correction the editor made to the draft before any framing check read
it. It is not a framing report, not a response to one, and not one of
the three reports the cap allows. The orchestrator identified the
overclaim; the correction below is the editor's.

**Hashes.**

| File | First draft (SHA-256) | Corrected draft (SHA-256) |
|---|---|---|
| `brief.md` | `886ffb2bfcb2d981aaf644d9980a389c93111058bf2bc66a0a9d2f41cccd91ae` | `3a8883d1e76804d06da6cd8c6d233c45a23a38e1ea2747acfa9076bbbbaff6ba` |
| `intake.md` | `73d82ab53e09eee2f6b7af5eb1677cc9be09e07a2c204f68ca13a45d9f345b2c` | `079d41bed1f7a7fc6bb308c70ff06adb7f81eaa50df778f73560e8d5b024efc5` |

The first-draft files, the session's raw stream and its final report are
retained privately by the orchestrator under
`evidence/private/editorial-waste-2026-10-04/brief-attempt-1/` and were
not changed. The archived bytes of YF-EV-0337 were not changed (SHA-256
`50c0aa3db2a25fd0c4809d191c22d9c7f3c255bfdb4b2ec6eb4eb7103d6e40f5`,
rechecked after the correction).

**What was wrong.** The first draft said that because the Internet
Archive's captures of the Curbside Collection page on 2026-06-18 and
2026-09-19 are byte-identical, the page "did not change between a date
before the post and a date after the last comment", and made that page
"the controlling source for the schedule in force on the as-of date". It
said the same in this record ("fixes the page across the comment dates")
and in the YF-EV-0337 registry entry ("stood unchanged from before the
post to after the thread's last captured comment"). Two identical
captures show the page said the same thing on two dates. They say
nothing about the 93 days that separate them, and the editor examined no capture
in that gap. The 2026-09-19 capture also postdates every comment under
this question (2026-09-10 to 2026-09-13) and the thread's capture
(2026-09-16). The first draft also let the live page alone satisfy each
claim's essential-source rule, which would have let a page fetched on
2026-10-04 stand for the schedule on 2026-09-10.

**What changed in `brief.md`.**

1. "What is measured", the published schedule: the identity sentence is
   replaced. It now says no City schedule dated on or near 2026-09-10 has
   been identified; that the two captures are dated observations 84 days
   before and 9 days after; that their identity does not show the page
   unchanged between them; that the 2026-06-18 capture is the latest
   identified statement before the as-of date and the 2026-09-19 capture
   and the live page are later restatements; and that the WasteWise
   calendar viewed later counts only for dates it shows in a period that
   includes 2026-09-10.
2. "Dates fixed in this brief": a new dating rule. The schedule on
   2026-09-10 is read first from a dated contemporaneous City schedule,
   then from a City retrospective account, and only if neither is found
   from the two bracketing captures, with the inference named, the gap
   searched and the limitation carried beside the verdict. Later
   restatements never establish the as-of schedule alone. The reason
   for admitting the bracketing captures is stated, and a strict dating
   rule (bracketing captures alone leave the element undetermined, so
   the rung is Not established) is a required alternative for both
   claims. "Previously" gets the same treatment: a capture is evidence of
   its own date, and the date of the change comes from a City record
   that states it.
3. Claim 1 and claim 2, "The instrument": rewritten to the dating rule.
   The essential-source rule now requires a record of kind 1 or 2 or both
   bracketing captures, and says the live page and the 2026-09-19 capture
   alone are not enough.
4. Claim 1 E2 and claim 2 G1 and G2: each is established under the dating
   rule, and the reviewer names the kind of record it rests on. The Not
   established rung of each ladder now reads "cannot be established under
   the dating rule".
5. Each claim's required alternatives: the strict dating rule added.
6. "Stakes": the Not established sentence of each claim and the
   definition-sensitivity paragraph name the dating rule and the strict
   alternative.
7. "Documents the panel must read", item 1: rewritten to the dating rule,
   naming both captures' raw addresses and which is the pre-as-of
   statement and which the later restatement.
8. "Reviewer instructions of special note": the instruction "Read the
   page as it stood" is replaced by "Date the schedule; do not assume
   it", which forbids describing identical captures as showing the page
   unchanged between them.
9. Topics: the register keeps none. The brief proposes
   `climate-environment` for a published page, because that topic's own
   description names Edmonton's "waste and water systems" and no waste
   topic exists; it records that the choice does not widen the factual
   scope or answer adequacy, and that the register row would change only
   if a page is published.
10. The status block says the draft was corrected before any framing
    check.

Not changed: the as-of date (2026-09-10), the evidence cut-off
(2026-10-04), both propositions, the curbside primary scope, the
seasonal reading of claim 2 and its as-of-date alternative, the two
claims carried without a verdict, and the seven proposed parks. The
editor reconsidered each for a dependence on the dating claim and found
none: the parks rest on the absence of a capacity measure, and the two
undisputed frequencies are reported from the same dated records as the
claims. No new source was sought.

**What changed in `intake.md`.** One locator. Under
`biweekly-bin-adequacy`, comment [7]'s registered run was described as
"the first two sentences". It is the second and third: the first
sentence asks "How large of a family are we talking?". The captured text
is unchanged.

**What changed in `evidence/registry/YF-EV-0337.yaml`.** The
`establishes` text now says the capture is a later restatement, not a
record of the page on 2026-09-10; gives its distance from the last
comment under this question (six days), the thread's last comment and
the thread's capture (three days); and says the identity of the two
captures shows the same text on two dates and nothing about the days
between. The earlier correction recorded in step 5 above stands. No
other field changed.

**Checks run after the correction.**

- `npm run validate`: `validate: OK — 12 stories, 26 claims, 1
  commitments, 8 topics, 280 evidence entries`; its warnings concern
  other questions.
- Every quotation in `brief.md` and `intake.md` was matched against the
  capture by script; the only quotations not found there are register
  propositions, triage reasons, the topic description and the editor's
  section labels.
- All 28 registered wordings under this question were found in
  `intake.md` and in the capture after normalizing whitespace, line
  breaks and apostrophes.
- The SHA-256 of `evidence/private/YF-EV-0337-curbside-cart-collection`
  still matches its registry entry.

**Runtime.** The correction was made in the same conversation as the
first draft, continued. The runtime reports the model for this part as
Claude Opus 5.5 (`claude-opus-5-5`), vendor Anthropic; the first draft
was written under Claude Fable 5.1 (`claude-fable-5-1`). The requested
effort was high; the session cannot observe its effort setting and does
not assert it. The request named the `implementer` agent; this session
has no tool for dispatching an agent, so the correction was made
directly by the editorial session and no subagent was used.

## Framing check: execution blocked

**Inputs, fixed at the checkpoint.** Commit
`bf8d58c884c32fde205650c495aae028d8cd4a54`, based on main at `5a1bec3`,
holds this directory's corrected draft and the eleven registry entries
YF-EV-0332 to YF-EV-0342. `brief.md` SHA-256
`3a8883d1e76804d06da6cd8c6d233c45a23a38e1ea2747acfa9076bbbbaff6ba`;
`intake.md` SHA-256
`079d41bed1f7a7fc6bb308c70ff06adb7f81eaa50df778f73560e8d5b024efc5`; both
unchanged since. The orchestrating session assembled the framing package
from them with `prompts/framing-check.md`, the verdict vocabulary and
`prompts/review-schema.json`. The package is retained privately at
`evidence/private/editorial-waste-2026-10-04/framing-packages/check-1/package.txt`,
SHA-256 `20d7209534f358233173ac822fde422a84d6c0489a6ae5aa7b5b05b3a91b7014`.
No copy of the brief is kept under `framing/`, as in earlier runs; the
checkpoint commit and the hashes identify the exact inputs.

**What ran.** Every launch used the unchanged launcher, OpenAI seat
`gpt-6-sol` at high, profile `codex-captured-read-only-0.160.0`, Codex CLI
0.160.0, and the package above. No setting, config, login or gate changed
between them. The three research launches were
`scripts/panel/audit-package.sh --provider openai`. The diagnostic was
one call to `scripts/panel/invoke-reviewer.sh --purpose diagnostic`, which
by design runs only the canary, never sends the package and cannot admit
research; its only change was the calling process (a Claude Code shell
instead of the earlier caller). Times are UTC on 2026-10-04.

| Attempt id | Kind | Label | Started | Finished | Result |
|---|---|---|---|---|---|
| `6a62c3ab1d23fcb0` | research launch | waste-collection-framing-check-1 | 15:26:36 | 15:26:55 | failed at canary |
| `c188bd5a6cf72050` | research launch, unchanged retry | waste-collection-framing-check-1-retry-transport | 15:29:51 | 15:30:11 | failed at canary |
| `0df02ab5f6c6bbe0` | research launch, unchanged retry after diagnosis | waste-collection-framing-check-1-retry-after-diagnosis | 15:45:36 | 15:45:55 | failed at canary |
| `06772015a3df5a6e` | diagnostic, caller changed | waste-collection-caller-claude-bash | 15:49:12 | 15:49:38 | failed at canary |

All four metadata files say: `status: failed`, `admitted_for_research:
false`, `canary_context_proof: fail`, `canary_request_count: 0`,
`canary_package_seen: 0`, and the reason "the canary invocation exited 1;
its output is retained and the package was never sent". Each canary's
captured-request folder holds only the upstream address. The CLI's own
output in each says "failed to refresh available models: Connection
failed: error sending request", then WebSocket reconnects, a fallback to
HTTPS, more reconnects and "workspace routing discovery failed". No
`framing/check-1.md` was written. None of the four is a framing report,
because the checker never received the brief, so the v1.12 cap of three
reports is untouched.

**The register row.** Only this question's row changed: `lifecycle:
briefed` (a complete draft exists), `triage: go` and `publication:
unpublished` unchanged, a `reason` that says the review is paused, a
rewritten `grouping_note`, an `intake` pointer to this directory's
`intake.md` beside the original `run`, and a `note`. The triage reason
it replaces read: "The City's collection calendars and program history
show how often each stream is picked up and whether garbage went from
weekly to every two weeks, and its waste audits show how full carts get;
one household's dump runs and one family's diaper volume can't be
checked and will be dropped." The audit clause was unsupported: the City
describes those audits as measuring what collected waste is made of. The
old grouping note named waste audits on the same assumption. Counts,
topics and all eleven claim rows are unchanged.

**The diagnosis, and its limits.** Between the second and third launches
a bounded technical review (Claude Opus 5.5, Claude Code 2.1.289, about
six minutes, read-only apart from scratch files outside the repository)
read the attempt records. Its conclusion is retained at
`evidence/private/editorial-waste-2026-10-04/transport-diagnosis-conclusion-1/final-message.txt`,
with working files in `transport-diagnosis-1/`. What the capture directly
shows: the launcher's local recording proxy captured zero completed
requests in every attempt, and no vendor or account response was
captured or observed. It does not show what happened to the connection
before a request would have completed. The
review found one difference from the last passing launch, the calling
process, and proposed testing it. The diagnostic launch in the table
changed only that and failed the same way. So changing the caller alone
did not restore the canary. That does not show the caller is irrelevant,
and it does not establish an environment, login, certificate or network
cause. The cause is unresolved. The raw output of the diagnostic launch
is retained at
`evidence/private/editorial-waste-2026-10-04/caller-claude-bash-diagnostic-1/`.
The launcher keeps each attempt's full record in its private archive
outside the repository, by attempt id.

**How to resume.**

1. Restoring a passing canary is a separate tooling task, outside this
   editorial run. Nothing in this run changes the launcher.
2. Then run `scripts/panel/audit-package.sh --provider openai` unchanged,
   on the package with SHA-256 `20d72095…7014`, built from checkpoint
   `bf8d58c` with the brief and intake hashes above.
3. Install the response as `framing/check-1.md` only if the attempt's
   metadata says `admitted_for_research: true`. A launch that is not
   admitted produces no report and does not count.
4. If the brief or intake is substantively redrafted first, assemble a new
   package, record its hash here and in `state.yaml`, and treat this
   package as superseded. The next admitted report is still check 1.
5. The full three-report allowance and the v1.35 and v1.39 confirmation
   routes apply as for any brief.

**Checks.** Reported by the coordinator for the checkpoint commit, not run
by the editor: `npm run validate` (12 stories, 26 claims, 280 evidence
entries); `npm test` (41 files, 672 passed, 1 skipped); `astro check` (0
errors, 0 warnings, one existing unused-props hint); build (671 pages);
exposure audit (0 fail-class findings, 91 PII warnings, 0 long quotes, the
same as main at `5a1bec3`); duplication audit (0 fail-class findings, 72
cross-page warnings); sitemap audit (581 URLs for 581 indexable pages).
Run by the editor for the closeout: none. The coordinator runs the final
checks on these edits.

## Framing resumed: tooling recovery, check 1 and revision 2

**Tooling recovery (not an editorial step).** A separate tooling task,
outside this run, later worked on the canary failures recorded above and
merged PR #128 (main `226ba75`, "Use named-curve certificates for
reviewer TLS"). As reported by that task, it reproduced a canary failure
when the system LibreSSL build generated the launcher's local
certificate with its default explicit EC parameters, and named-curve
parameter encoding fixed that reproduction. The certificates used by the
four failed attempts above were deleted by the launcher and not
retained, so their actual encoding is not known. The reproduction
supports, and does not prove, that the same cause produced every one of
those failures, and it does not settle whether the calling process ever
mattered. The coordinator then ran one diagnostic launch from the
integrated launcher under the default PATH, `1479755d6e39dde6`; it
passed the canary structural and context checks with 22 captured
requests. A diagnostic sends no research package and admits nothing. No
login, global configuration, model pin, admission control or public
methodology rule changed. The earlier diagnosis above, which left the
cause unresolved, stands as the dated record of what was known then.
(This paragraph was first written after check 1 with the cause stated
as established; it was corrected after check 2.)

**Framing check 1.** Run by the coordinator with
`scripts/panel/audit-package.sh --provider openai`, unchanged, on the
original package (SHA-256
`20d7209534f358233173ac822fde422a84d6c0489a6ae5aa7b5b05b3a91b7014`),
built from checkpoint `bf8d58c` with the brief and intake hashes recorded
above.

| Attempt id | Seat | Profile, CLI | Started (UTC) | Finished (UTC) | Result |
|---|---|---|---|---|---|
| `8c19408f878dcbd4` | GPT-6 Sol (`gpt-6-sol`), high | `codex-captured-read-only-0.160.0`, Codex CLI 0.160.0 | 2026-10-04 18:53:58 | 2026-10-04 19:03:04 | admitted; REVISE |

The attempt metadata says `status: ok`, `admitted_for_research: true`,
canary, structure and context proof all `pass`, 22 canary requests and
44 research requests, against the production upstream. The coordinator
verified the CLI binary's SHA-256 and that the installed
`framing/check-1.md` (SHA-256
`3e755c494ec6f0db708fa1a911af034aa3d3646647e0c48eb73d5a76702b8bba`)
matches the attempt's retained final message byte for byte. A private
copy of the metadata is in
`evidence/private/editorial-waste-resume-2026-10-04/framing-check-1/`;
the launcher keeps the full attempt record outside the repository by
attempt id. This is the first framing report. Two remain.

**What the report found.** REVISE, with framing findings on provenance,
the proposition against the post, the green-bin reading, source
adequacy, checkability, scope, stakes and who asks this, and one defect
finding on the claim 2 ladder. The central findings: the two schedule
claims sent to the panel are premises both sides share, so their stakes
fail; the green-bin primary reading was stronger than the commenters'
words; and the capacity parks could not claim no instrument while the
City's business case CR_7173, which the check located at a City address,
was unread.

**Source work done for the report.** Bounded to what the report
required.

- The City address for CR_7173 the check named, and the address of its
  business case, both redirected to the City's not-found page on
  2026-10-04 (HTTP 200 to `https://www.edmonton.ca/page-not-found`).
  Two other City paths returned 404, and the old `gov.edmonton.ab.ca`
  host did not connect. The Internet Archive's index lists both files:
  the report from 2020-04-12, every capture in the part of the index
  read sharing one digest; the business case from 2020-04-12 to
  2021-03-05 with one digest, and one further capture on 2021-06-24 with
  a different digest. A later query to the index, made while writing
  this record, got an error page and was not repeated.
- Fetched through the archive's raw-content endpoint, staged with
  `scripts/evidence-stage.ts --url` and ingested with
  `scripts/evidence-ingest.ts`, rights unclear, so private. Each file's
  SHA-1, base32-encoded, equals the archive's recorded digest. Ids were
  allocated after checking that the highest id was YF-EV-0342 in the
  worktree and on `origin/main`.

  | ID | Source | SHA-256 |
  |---|---|---|
  | YF-EV-0343 | Report CR_7173, Single Unit Waste Set-out Business Case (Utility Committee, 2019-08-29), 9 pages, capture `20201010081445` | `18db813eec2801fc92fd02ceed546790f9f37b14b234565686ab9f4816ec8686` |
  | YF-EV-0344 | Its Attachment 1, the business case, 86 pages, capture `20200412014834` | `f5d4bf4d0213ad260f1f3283c341b7228c20b1d1fff8b723521d85c6990e27da` |

- The 2021-06-24 capture of the business case (SHA-256
  `140d7f29a132de30fca82c12d2870cc26dedb0cf230c396dd475258876f97d35`,
  1,048,576 bytes as downloaded) is a truncated file that the PDF reader
  cannot open. It was not used and not ingested. This record and the
  YF-EV-0344 entry first gave its size as 1,002,493 bytes; that number
  came from the archive index's length field and was mistaken for the
  downloaded byte count. Corrected after check 2 (see below); the
  rejection is unchanged.
- Read in full: the report's nine pages, including the two figures on
  pages 3 and 8, and the business case's body (pages 6 to 48), with the
  appendices searched for any per-household, capacity, bag-count,
  odour or survey data and Appendices C and I and the garbage scoring
  appendix read. Measured from the bytes: the report's page 8 chart,
  "Black Cart Size Satisfaction - Post Delivery", from canvassing in the
  demonstration neighbourhoods up to July 18 (2019), gives four answer
  categories separately for 120 L neighbourhoods (1,664 responses) and
  240 L neighbourhoods (1,740 responses), with no household-size
  breakdown and no sampling description. The business case reports
  pre-cart engagement shares on cart size from residents who had not
  used carts, states that the 2019 service set no limit on black bags
  and that the garbage status quo was weekly black-bag collection, gives
  its reasons for the new frequencies, and lists post-rollout
  indicators. Neither document measures garbage against cart capacity,
  bags set out per home, odour, diapers, self-haul or green-cart fill.
  The run record states the structure of the page 8 chart and not its
  shares: a share is a fact a page would publish only after the gate.
- The corrected paths the check gave: the strategy address serves the
  same bytes as the copy cited before (SHA-256 `2579865d…7a97`); the
  resident guide address serves the Fifth Edition, August 2024 (SHA-256
  `87816f9d846034edcc98ef7702ff8c4eebade38a6e6b2a3289528cdbf34f0adb`),
  while the address cited before serves an October 2026 edition. Neither
  was ingested; neither is a verdict instrument.
- Not located in this pass, and named in the brief as reopening leads:
  the demonstration analysis the business case promised, the canvass
  data behind page 8, the spring 2022 resident research, and the public
  perception survey results.

**Editorial changes (revision 2).** Every finding is answered in
`framing/author-response-1.md` (SHA-256
`ef490c060215871f0812a4cd9a71eb99c396669bd74cdb0f6224d1339cec48c0`). In
short:

- No claim is proposed for the panel. `collection-frequency-change` and
  `green-bin-frequency` join `black-bin-frequency` and
  `recycling-frequency` as dated, sourced context without a verdict,
  because no consequence of either verdict matters to a holder or an
  opponent in this thread. The green-bin context is stated for September
  2026 with the full-year schedule beside it.
- The seven parks stand, each now recording what CR_7173 and its
  business case hold for it. Park 1 explains why the 2019 cart-size
  measures cannot test the 2026 claims at the level asserted. Park 6's
  "no limit" premise moves to context.
- The checker's replacement texts are applied for findings 1, 2, 6, 7, 8
  and 9, with the small departures the response lists. The claim 2
  ladder defect is moot because no ladder remains; the checker's ladder
  is kept in the response for use if a later report sends a full-year
  claim to the panel.
- Recurring-frequency definitions, the condo scope sentence, the bylaw's
  service definitions and corrected paths are added. The claim ladders,
  calculations, panel document list and reviewer instructions are
  removed.
- `intake.md` is unchanged. No claim row on the register changed. The
  question row's reason and note now describe framing in progress.

**Hashes.**

| File | Read by check 1 (commit `bf8d58c`) | Revision 2 |
|---|---|---|
| `brief.md` | `3a8883d1e76804d06da6cd8c6d233c45a23a38e1ea2747acfa9076bbbbaff6ba` | `d19da2954187b7026187e4f8985d6c39606e2ba103c66dc63a3541c0d7b26285` |
| `intake.md` | `079d41bed1f7a7fc6bb308c70ff06adb7f81eaa50df778f73560e8d5b024efc5` | unchanged |

**Next.** The coordinator assembles a new package from revision 2, the
intake, check 1 and this response, records its hash, and submits it as
check 2 through the same admitted launcher. A report is installed only
if its attempt is admitted. The brief freezes only on an admitted FRAME
OK, or later through a confirmation route the existing rules allow. No
panel runs before then, and none is proposed.

**Checks run by the editor for this revision.** `npm run validate`;
SHA-256 of the two new archives against their registry entries and of
the eleven earlier archives (unchanged); every captured quotation in
the brief matched against the capture; every document quotation matched
against the source bytes. Results are in the final report of this step.

## Framing check 2 and revision 3

**Framing check 2.** Run by the coordinator with
`scripts/panel/audit-package.sh --provider openai`, unchanged, on a
package assembled from revision 2 (SHA-256
`d19da2954187b7026187e4f8985d6c39606e2ba103c66dc63a3541c0d7b26285`), the
unchanged intake, check 1 and the first author response. Package
SHA-256 `cd54f0978d42ae9d7858fdcd883817836bdd9968beb3810fb2012eb5de25e612`.

| Attempt id | Seat | Profile, CLI | Started (UTC) | Finished (UTC) | Result |
|---|---|---|---|---|---|
| `b94030bef7b11e32` | GPT-6 Sol (`gpt-6-sol`), high | `codex-captured-read-only-0.160.0`, Codex CLI 0.160.0 | 2026-10-04 19:21:17 | 2026-10-04 19:31:44 | admitted; REVISE |

The attempt metadata says `status: ok`, `admitted_for_research: true`,
canary, structure and context proof all `pass`, 22 canary requests and
62 research requests, the package seen in 32 of them, against the
production upstream. The coordinator verified that the installed
`framing/check-2.md` (SHA-256
`d4222de0b01eed99340844f5ea8e373fe42188f0079e5b2ef9797a933bb4ebcd`)
matches the attempt's retained final message byte for byte. A private
copy of the metadata is in
`evidence/private/editorial-waste-resume-2026-10-04/framing-check-2/`.
This is the second framing report. One remains, and under the cap it is
a confirmation.

**What the report found.** All nine check 1 findings RESOLVED. OK on
provenance, proposition, strongest reading, leak, checkability, stakes
and who asks this. Three framing findings under check 4: the schedule
source section skipped two dated City records that fit the dating
rule's first rung; park 5 overstated what cart-tip records can show;
park 2's reopening records could not show the stated cause. One framing
finding under check 7: park 1's reopening rule could leave out the
post's condo household. No defect findings.

**Source work done for the report.** Bounded to the three records the
check named. Each was fetched from the City's own address on
2026-10-04, staged with `scripts/evidence-stage.ts --url` and ingested
with `scripts/evidence-ingest.ts`, rights unclear, so private. Ids were
allocated after checking the highest id: YF-EV-0344 in this worktree
(uncommitted) and YF-EV-0342 on `origin/main`. Each archive's SHA-256
was recomputed after ingest and matches its entry.

| ID | Source | SHA-256 |
|---|---|---|
| YF-EV-0345 | 2023-2026 Proposed Waste Services Utility Budget and Plans (November 2022), 18 pages | `70745ea480c36791f0a51189f4827e8e76e5d456e1d5897608b9cd99fca0b770` |
| YF-EV-0346 | Development Standards for Residential Waste Collection, revision 1.0, 2026-03-02, 68 pages | `8f4ff7177ce35dc847ccb26ff324f24c9a00fa527bba4316704e5091c3ac7729` |
| YF-EV-0347 | Office of the City Auditor, Waste Collections Audit, report dated August 15, 2024, 28 pages | `0787c5eaa0fb2a85ea98d6545355b609b2aee4662bced7eac134b1ba00b91f3b` |

What the bytes show, by structure: the Budget and Plans, a proposed
budget whose cover is dated November 2022, describes in retrospect the
2021 change to cart collection and lists the service standards set as
part of that program, giving the green cart's frequency by named months;
it does not show that the budget was adopted or that the standards were
in operation in 2026;
the Development Standards gives curbside frequencies per dwelling, the
green cart's by season, and for communal homes a weekly garbage volume
allocated per dwelling with collection frequency set per property; the
audit describes the radio-tag tip record and the three collector
buttons, finds the noncollection data incomplete and inaccurate with no
assurance process, and finds an overflowing cart coded inconsistently.
None measures household garbage against cart capacity, a validated
set-out rate, or why anyone self-hauls. Checking for a later change in
the green-cart months, within records already held: none states one;
the WasteWise calendar was not consulted. The extracted texts and the
downloaded files are retained in
`evidence/private/editorial-waste-resume-2026-10-04/source-inspection-after-check-2/`
with a hash manifest (six files, 28,942,921 bytes).

**Editorial changes (revision 3).** Every standing finding is resolved
in writing in `framing/author-response-2.md` (SHA-256 as first written
`e578c1f696f2b93b52bdf5f204d57dfa2625adae40419b90ce540805f17ba192`;
later hashes are in the corrections below): all
four accepted, none disputed. In short:

- The March 2026 Development Standards is named as the first-rung dated
  record, and the November 2022 budget as a 2022 report of the 2021
  standards; the captures are bracketing evidence only. (As first
  written, revision 3 named both as first-rung records; see
  "Pre-submission correction" below.)
- Parks 1, 2 and 5 carry the checker's replacement reopening texts word
  for word. Park 1 also records why the communal allocation and the
  audit's overflow coding are not measures; the cart-tip lead is removed
  from its list.
- The closing section no longer says a FRAME OK adopts the parks. It
  separates accepted framing, the park proposals and the existing-rule
  authority, and says that if no rule gives an empty brief an authorized
  disposition, the outcome is a recorded process block with nothing
  adopted. This follows an independent read of the rules retained
  privately. The v1.24 citation for the parks is removed.
- `intake.md` is unchanged. No claim row changed. The question row's
  reason, grouping note and note changed (below).

**Corrections made alongside revision 3, without changing any earlier
package or report.**

1. *Register grouping note.* It said every claim concerns "the same
   curbside service", which the brief no longer assumes: the post
   author's condo service class is not known. It now says the claims
   concern collection frequency and whether the assigned garbage
   container holds a household's garbage, at curbside or communal homes.
2. *Tooling recovery.* The paragraph under "Framing resumed" stated the
   certificate cause as established. It now says the later task
   reproduced a failure with LibreSSL's default explicit EC parameters
   and that named-curve encoding fixed that reproduction; the failed
   attempts' certificates were not retained, so their encoding is not
   known.
3. *Rejected 2021 capture.* This record and the YF-EV-0344 entry gave the
   truncated 2021 business-case capture as 1,002,493 bytes. The retained
   download is 1,048,576 bytes (SHA-256 `140d7f29…7d35`, verified again).
   The smaller number was the archive index's length field, mistaken for
   the downloaded byte count. The rejection stands.

**Hashes.**

| File | Read by check 1 | Read by check 2 | Revision 3, as first written |
|---|---|---|---|
| `brief.md` | `3a8883d1…f6ba` | `d19da295…6285` | `be178e3674aa1a81243f7f49adc5e3807c10fc6f9d7893d17ddee90f9a722ee1` |
| `intake.md` | `079d41be…efc5` | unchanged | unchanged |

**Next.** The coordinator assembles a package from revision 3, the
intake, both reports and both responses, records its hash, and submits it
as check 3 through the same admitted launcher. A report is installed only
if its attempt is admitted. Check 3 is the confirmation under the cap.
What follows from its answer is governed by the existing rules as the
brief's closing section describes; nothing is decided here in advance.

**Checks run by the editor for this revision.** `npm run validate` as a
standalone command with its exit status; SHA-256 of all sixteen
archives (YF-EV-0332 to 0347) against their entries; captured quotations
in the brief matched against the capture; quotations from the three new
records matched against their extracted text. Results are in the final
report of this step.

**Pre-submission correction, 2026-10-04.** After revision 3 was written,
and before any package for check 3 was assembled, the coordinator and
root read the three new source files and found three precision errors.
The editor read the same bytes and corrected them. This is not a framing
report, not a response to one, and not a further revision under the
cap; no scope, claim, park or reopening condition changed.

1. *What the November 2022 budget is evidence of.* Revision 3 said the
   2023-2026 Waste Services Utility Budget and Plans "shows the standard
   as set then" and treated it, with the Development Standards, as
   first-rung authority for the 2026 schedule. Its service paragraph
   reports, in retrospect, the standards set as part of the 2021
   program, inside a document titled as a proposed budget. Neither its
   2023-2026 plan period nor the file shows that the budget was adopted
   or that the standards were in operation in 2026. The brief, the
   second author response and YF-EV-0345 now say that it is a 2022
   report of the 2021 standards; the March 2026 Development Standards,
   revision 1.0 dated 2026-03-02, is the first-rung record as the latest
   dated City description of the service before the as-of date; and no
   record identified states a period expressly including 2026-09-10.
   The response records this as a departure from the checker's
   replacement text, which had called the budget's stated period
   inclusive of 2026-09-10.
2. *YF-EV-0345's date.* The entry gave `published_on: 2022-11-10`, which
   is the PDF's creation date. The cover shows only November 2022, the
   file's modification date is 2022-12-16, and no publication date was
   observed. The field is removed and the entry states those dates.
3. *YF-EV-0347's date and number.* The entry gave `published_on:
   2024-08-23`, which is the PDF's modification date. The cover prints
   "AUGUST 15, 2024", which matches the creation date. The field now
   holds 2024-08-15, the printed report date, and the entry distinguishes
   it from the modification date. The title called it "report 23515";
   that number appears only in the file name, so the title and the run
   record no longer use it as a report number.

| File | Revision 3 as first written | After this correction |
|---|---|---|
| `brief.md` | `be178e3674aa1a81243f7f49adc5e3807c10fc6f9d7893d17ddee90f9a722ee1` | `5e0e107da2ecec4b147ae398b5f74089edc38f21f9585a1785c163c4445632ea` (`state.yaml` `draft_before_count_fix_sha256`) |
| `framing/author-response-2.md` | `e578c1f696f2b93b52bdf5f204d57dfa2625adae40419b90ce540805f17ba192` | `eb20e68cb72b3986335cd41358dba380b0f7a97402c283a4e1e6268bbc37f26b`, the version check 3 read |
| `intake.md` | `079d41bed1f7a7fc6bb308c70ff06adb7f81eaa50df778f73560e8d5b024efc5` | unchanged |

The source PDFs are unchanged and their hashes still match their
entries. The check 1 and check 2 packages, reports and the first author
response are untouched.

**Second pre-submission correction, 2026-10-04: a count.** Root noticed
that the brief's status block, and the status at the head of this record,
said check 2 "raised three new framing findings". Check 2 raised four:
three under check 4 and one under check 7, as the second author response
already says and resolves. Both sentences now give four, split three and
one. The report itself is unchanged; only the description of it was
wrong. Nothing else changed. The brief moved from `5e0e107d…32ea` to
`cb5dddb1d4fe72522ccd7b5e4d383ca498e9d1cd5b4182ba07fe570c123d5b20`;
`framing/author-response-2.md` stays at `eb20e68c…f26b`, and `intake.md`
at `079d41be…efc5`. Made in the same editorial session
(`f423dbd0-d769-499d-9008-7d4587f0dc2f`), runtime Claude Opus 5.5
(`claude-opus-5-5`).

## Framing check 3 and the cap

**Framing check 3.** Run by the coordinator with
`scripts/panel/audit-package.sh --provider openai`, unchanged, on a
package assembled from revision 3 as corrected before submission (brief
SHA-256
`cb5dddb1d4fe72522ccd7b5e4d383ca498e9d1cd5b4182ba07fe570c123d5b20`),
the unchanged intake, both earlier reports and both earlier responses.
Package SHA-256
`a88ef4eecc8f2ed9e07b20c7cfbb655bc939bdd86992d3febc606ffba14748c5`.

| Attempt id | Seat | Profile, CLI | Started (UTC) | Finished (UTC) | Result |
|---|---|---|---|---|---|
| `7ac843d9c3e3d0f5` | GPT-6 Sol (`gpt-6-sol`), high | `codex-captured-read-only-0.160.0`, Codex CLI 0.160.0 | 2026-10-04 19:52:59 | 2026-10-04 20:02:09 | admitted; REVISE |

The attempt metadata says `status: ok`, `admitted_for_research: true`,
canary, structure and context proof all `pass`, 20 canary requests and
54 research requests, the package seen in 27 of them, against the
production upstream. The installed `framing/check-3.md` has SHA-256
`6562c43e361956d1eea5a34a16d380d0aef91acb86997eb51fef36dda307a341`. A
private copy of the metadata is in
`evidence/private/editorial-waste-resume-2026-10-04/framing-check-3/`.

**What the report found.** All nine check 1 findings and all four check
2 findings RESOLVED. OK on checks 1, 2, 3, 5, 6, 8 and 9. Three new
framing findings, each with copy-ready replacement text: park 4's
reopening condition let a broad age-category share or a City guideline
reopen the diaper overflow claim; park 6's let either half of the
combined twenty-bag-and-renovators claim reopen it; and park 7's
required a later source for a general sorting claim already captured
at [110], which belongs to `household-waste-diversion`. No defect
finding.

**The editor's response.** `framing/author-response-3.md` (SHA-256
`2a2df5a02f6222aa9baaae1a26abb0b1f04d3a65ff3e4dffd674cf9ed8f35c2e`)
concedes all three findings, quotes the checker's replacement texts
exactly and preserves them, and applies none. It records the scope
finding and the existing destination: `household-waste-diversion`
already holds [110]'s sorting wording under `majority-recyclable-waste`.
No claim or wording was moved.

**Where the run stood when check 3 came back (historical; superseded by "Final outcome" below).** Three admitted framing reports, all REVISE.
The cap is reached and there is no fourth report. The brief is
unfrozen and unchanged since check 3 read it. Under the ordinary rule
(methodology v1.12) a third REVISE parks the brief, and it reopens only
on new intake evidence. That is the current procedural stop. Two
things are separate from it and neither has happened:

- *An exceptional route.* The existing rules have narrow routes after a
  third REVISE, each with its own conditions; the one for applying a
  checker's wording requires, first, an eligibility report by a reader
  who is not the editor, committed beside the brief. No such report
  exists. Whether any route applies is for root to decide, and nothing
  here assumes it will be taken or confirmed.
- *Adopting the seven parks.* No park is adopted and none carries park
  fields on the register. A park of the brief under the cap would be a
  park of the brief only, not adoption of the seven no-instrument claim
  parks it proposes.

No panel has run, there is no finding and no published story or answer, and the
household adequacy question is unanswered.

**The register row, at that point (historical).** Only this question's `reason` and `note` changed,
to state the stop. `triage` stays `go` and `lifecycle` stays `briefed`
for now, because which outcome follows the cap, the ordinary park of
the brief or an admitted exception, has not been determined; no new
state value was introduced. If the ordinary park stands, the question
row would record a park of the brief at the framing cap, with its
reason and the reopening boundary of new intake evidence, and still no
claim-level park. Counts, topics, the grouping note and all eleven
claim rows are unchanged.

**Hashes.**

| File | SHA-256 |
|---|---|
| `brief.md` (unchanged since check 3 read it) | `cb5dddb1d4fe72522ccd7b5e4d383ca498e9d1cd5b4182ba07fe570c123d5b20` |
| `intake.md` (unchanged) | `079d41bed1f7a7fc6bb308c70ff06adb7f81eaa50df778f73560e8d5b024efc5` |
| `framing/check-3.md` | `6562c43e361956d1eea5a34a16d380d0aef91acb86997eb51fef36dda307a341` |
| `framing/author-response-3.md` | `2a2df5a02f6222aa9baaae1a26abb0b1f04d3a65ff3e4dffd674cf9ed8f35c2e` |

**Checks run by the editor for this step.** Standalone `npm run
validate` with its exit status; SHA-256 of the brief, intake, all three
reports, the earlier responses, the three packages and all sixteen
archives; the checker's replacement texts and the brief's replaced
sentences matched exactly in the response. Results are in the final
report of this step.

## Closeout corrections after check 3, 2026-10-04

(Written before the eligibility read and the route choice; item 3's
wording about an unassessed route is historical. See "Final outcome".)

Root's independent read-only simplify report on the run (retained
privately in
`evidence/private/editorial-waste-resume-2026-10-04/independent-simplify-1/`)
listed four required corrections. It is not a framing report. The
brief that check 3 read (`cb5dddb1…5b20`) and `framing/author-response-3.md`
(`2a2df5a0…5c2e`) are not changed by any of them; the check 1 to 3
reports and packages and the first author response are untouched.

1. *A wrong pointer in the second author response.* It said "The
   WasteWise calendar was not consulted; that bound is in the brief."
   The brief does not say so; this record does, under "Framing check 2
   and revision 3". The sentence now points to the run record and says
   what the earlier version said. Nothing else in the response changed.
   The version check 3 read, SHA-256
   `eb20e68cb72b3986335cd41358dba380b0f7a97402c283a4e1e6268bbc37f26b`,
   is preserved unchanged inside the check 3 package and as
   `evidence/private/editorial-waste-resume-2026-10-04/framing-packages/check-3/author-response-2-as-submitted.md`.
   The current file is SHA-256
   `053a973018df6a8415673cc98f729c119abce6215c546364702702d7a968aac0`.
   The brief's dating text is not changed.
2. *A stale hash pointer.* The table in "Pre-submission correction" gave
   the brief's post-correction hash as "recorded in `state.yaml` as
   `draft_sha256`", a field that now holds the hash after the later count
   fix. The cell now gives the actual hash,
   `5e0e107da2ecec4b147ae398b5f74089edc38f21f9585a1785c163c4445632ea`
   (`draft_before_count_fix_sha256`), and the response 2 cell gives
   `eb20e68c…f26b`. The first-written revision 3 hashes, `be178e36…2ee1`
   and `e578c1f6…a192`, are now labelled as first written where they
   appear.
3. *The public register reason.* It described the seven proposed parks
   only as claims about whether a container holds a household's
   garbage, to be set aside "until a City record measures that". The
   proposals also cover the dump runs, summer odour, diapers, twenty
   bags, green-cart fill and one household's blue-bag report, and their
   reopening conditions include surveys and non-City records. The
   reason now lists all seven, says "a published or independently
   checkable record", says none has been set aside, and separates the
   ordinary park of the brief from a narrower route that an independent
   reader has not yet assessed. Counts, topics, `triage: go`,
   `lifecycle: briefed`, the grouping note and all eleven claim rows are
   unchanged; no park fields were added.
4. *The dates of the 2019 cart-size canvass.* The simplify report could
   not confirm the brief's wording that the canvass covered "the first
   three months of carts" (park 1) and was taken "in summer 2019". The
   coordinator and root read the unchanged archived files and retained
   renderings of the pages in
   `evidence/private/editorial-waste-resume-2026-10-04/survey-date-verification/`;
   the editor read the same pages from the archived PDFs, whose hashes
   are unchanged (YF-EV-0343 `18db813e…8686`, YF-EV-0344 `f5d4bf4d…e27da`).
   What they say:
   - YF-EV-0344, the business case, printed page 25: the 8,000
     demonstration homes "received the automated collection since
     mid-April 2019".
   - YF-EV-0344, printed page 46, section 11.3: the demonstration
     "started in April 2019 and will run through April 2020".
   - YF-EV-0343, the report, page 8: the two charts are headed "Black
     Cart Size Satisfaction - Post Delivery", each "Up to July 18th",
     with sample sizes 1,664 and 1,740. The chart gives no year and no
     start date; the year comes from the report's date, 2019-08-29.

   **Disposition.** "The first three months of carts" is supported only
   as an inference about the service period, from mid-April 2019 to the
   charts' July 18 cut-off, about three months. It is not a stated
   fieldwork period: the report does not say when canvassing began or
   when each response was taken. "In summer 2019" is supported only as
   shorthand for the July 18 reporting end point; responses could
   include spring. The submitted brief is not changed. Whether those two
   phrases may stand in any brief that is later frozen is root's
   readiness decision, not the editor's here. This is a note on a
   source's limits. It is not new intake, a new framing finding or a
   change to any park.

## Final outcome: the brief is parked at the cap

**The eligibility read.** After check 3, root commissioned the reader the
v1.39 route requires. Its report is `framing/wording-eligibility-3.md`
(SHA-256
`47a77d9c18a33f93699a7c6d03f2e2b494c68604f49848e764cc1f7530824322`): a
fresh read-only session, `e11fbd64-f8ff-4e7b-9239-0aec80d36162`, not the
editor, runtime `claude-opus-5-5`, Claude Code 2.1.289, high effort
requested. It read check 3 (`6562c43e…a341`), the brief as submitted
(`cb5dddb1…5b20`, which it confirmed is byte-identical to the brief in
the check 3 package `a88ef4ee…48c5`), and the finding-to-edit table in
`framing/author-response-3.md` (`2a2df5a0…5c2e`). It found all three
standing findings **ELIGIBLE**: findings 1 and 2 under criterion 4,
finding 3 under criterion 7, each a one-sentence swap whose replacement
in the table is byte-identical to the report's and needs no new
quotation, calculation, source, lookup or drafting. It adopted nothing
and froze nothing. Root also read the reader's separate assessment of
authority: a v1.39 CONFIRMED would freeze the brief only and would not
authorize adopting the seven no-instrument claim parks or a page with no
finding, and the v1.35 park confirmation is not available because check
3's standing findings do not say the record cannot answer a claim.

*How the public file was installed.* The public installed file
`framing/wording-eligibility-3.md` (SHA-256 `47a77d9c…4322`) is the
coordinator's formatted installation of the reader's report, not the
text the reader returned verbatim. The coordinator added an opening
summary and section headings, moving the reader's closing "Result" line
into that summary; relabelled the reader's "check 4" and "check 7" as
"criterion 4" and "criterion 7", meaning the framing-check criteria rather than additional framing
reports; reworded the note on the inputs'
commit state; and replaced the reader's sentence "No session ID is
recorded." with dispatch provenance taken from the retained CLI
initialization. The verdicts, the criteria they rest on and the limits
are unchanged. The text the reader returned has SHA-256
`f0d5229c26e8c05974389602209a36bde3c4fd6948e0bb793e84e75eea5c4510`; it
is retained privately with the coordinator's installation note and the
reader's separate authority review in
`evidence/private/editorial-waste-resume-2026-10-04/independent-wording-eligibility-3/`,
and root read that provenance independently. This concerns the
eligibility read only. The three framing reports, `framing/check-1.md`
to `check-3.md`, are installed verbatim.

**The choice.** The v1.39 wording confirmation was available, and the
three corrections were eligible for it. The editor declined it. A
confirmation would have frozen a brief that sends no claim to the panel
and adopts nothing; it would not have given authority to set aside the
seven claims or to publish a page with no finding, so it would have
produced a frozen brief with no authorized next step. The ordinary rule
covers this case directly: a third REVISE parks the brief (methodology
v1.12). Root decided this outcome for the batch. It is a choice between
two legitimate routes, made because of what each could authorize, and
it is not a finding that the wording route was closed.

**What is parked, and what is not.**

- The brief is parked at the framing cap, not frozen. It reopens only on
  new intake evidence, not on another revision of the same brief. There
  is no fourth report and no reset.
- The three replacement texts check 3 supplied are conceded and kept,
  exactly as supplied, in `framing/author-response-3.md`. They were not
  applied and no wording confirmation ran. The table is unchanged.
- No claim park is adopted. The seven proposed no-instrument parks remain
  proposals, and none of the eleven claim rows carries park fields. The
  four schedule claims remain context without a verdict. The general
  sorting claim stays where check 3 placed it, with
  `household-waste-diversion`; nothing was moved in this run.
- No panel ran. There is no synthesized finding, no published story or
  answer and nothing promoted. Whether one garbage cart every two weeks is
  enough for a household, and the consequences claimed for it, remain
  unanswered.

**The brief file.** Only its status block changed, to state this outcome.
Everything from "## The question" to the end of the file is
byte-for-byte the brief check 3 read; the editor compared it against the
retained copy at
`evidence/private/editorial-waste-resume-2026-10-04/framing-packages/check-3/brief-as-submitted.md`
(SHA-256 `cb5dddb1…5b20`). That body includes the 2019 canvass wording
("the first three months of carts", "in summer 2019"), which stays as
submitted and unfrozen; as recorded under "Closeout corrections after
check 3", the sources support it only as a mid-April to July 18 service
period, not as stated fieldwork dates.

**Records that stay as written.** The source-precision corrections before
check 3, the source-limit note on the canvass dates, and the record of
the four failed launches before framing all stand. The later tooling
task reproduced a TLS failure and fixed that reproduction; the failed
attempts' own certificates were not retained, so their encoding is not
known.

**The register row.** This question only: `triage: park`, `lifecycle:
briefed`, `publication: unpublished`. The public reason leads with the
park at the cap, says the editor agrees with check 3's three corrections
and did not take the wording route and why, says nothing was adopted and
there is no finding, names what stays unanswered, and says it reopens
only on new intake evidence. The note carries the rule and route detail.
Accounts, topics, the grouping note, the intake pointer and all eleven
claim rows with their 28 wordings are unchanged.

**Hashes.**

| File | SHA-256 |
|---|---|
| `brief.md`, final park status before the page-copy correction below | `94ad00ad630a0e7363104ddea0aef1b268f6a182255271a6cda197efb72c04cd` |
| `brief.md`, as submitted to check 3 | `cb5dddb1d4fe72522ccd7b5e4d383ca498e9d1cd5b4182ba07fe570c123d5b20` |
| body from "## The question" to end, both files | `a0107d17855a1a9710e4e65b0d0d92f52e79ffec107fbcc92939a8ece19c43a4` |
| `framing/wording-eligibility-3.md` | `47a77d9c18a33f93699a7c6d03f2e2b494c68604f49848e764cc1f7530824322` |
| `framing/author-response-3.md` (unchanged) | `2a2df5a02f6222aa9baaae1a26abb0b1f04d3a65ff3e4dffd674cf9ed8f35c2e` |
| `framing/check-3.md` | `6562c43e361956d1eea5a34a16d380d0aef91acb86997eb51fef36dda307a341` |
| check 3 package | `a88ef4eecc8f2ed9e07b20c7cfbb655bc939bdd86992d3febc606ffba14748c5` |
| `intake.md`, as submitted as the framing input (original) | `079d41bed1f7a7fc6bb308c70ff06adb7f81eaa50df778f73560e8d5b024efc5` |

**Closeout copy note.** The public register reason written with the
final outcome was corrected the same day, without changing the outcome.
It had said the park came "with no research run"; source inspection and
three admitted framing checks did run, so it now says no research panel
ran. It had listed the twenty-bag claim among consequences of the
current schedule; that claim is about the past (unlimited curbside
garbage before carts, with renovators among those setting out about
twenty bags a week), so it is now listed separately. "Set-aside claims"
became "claims proposed for setting aside", since none is adopted. "A
shorter route" became a plain description of the optional wording
confirmation: available, found eligible, and not used because it would
only have fixed the brief's wording. The brief, `state.yaml`, all
reports, responses, packages and the eligibility read are unchanged.

A second copy correction followed the final independent simplify read.
The public register reason's list of what stays unanswered left out the
seventh proposed claim; it now ends with one household's report that it
relies on weekly blue-bag pickup and never runs out of room in its bins
(intake [45]), which is that household's experience and not a general
finding. Its description of the optional confirmation now says
"covering exactly those wording changes" rather than "would have applied"
them, since the editor would have made the edits before that check, and
"would only have frozen the brief" rather than "fixed the brief's
wording". The eligibility paragraph above now says that the public
eligibility file is the coordinator's formatted installation of the
reader's text. An earlier status-copy correction had changed the brief's
current hash to `47e09167…4037`; its body is still byte-for-byte the
sealed submitted version (`a0107d17…43a4`), and `state.yaml` holds the
current hash. The hash tables in earlier sections are historical and are
left as written.

A third copy correction followed a critique of the rendered question
page in the PR preview. The intake record shown there still said
"Status: **DRAFT.** No framing check has read this record" and ended
with a question that "is a GO with no brief", both true only before
framing. The intake now opens with a short paragraph marking it as a
historical intake snapshot written on 2026-10-04, before any framing
check, and saying the current status is shown above on the question
page and in `state.yaml` and this record. The status line is labelled
"Status when this snapshot was written:" with its original sentences
kept word for word, and the heading "Selection" became "Selection before
framing" with its text unchanged. No quotation, count, provenance or
other intake text changed. The intake submitted as the framing input,
which all three framing packages contain, is SHA-256 `079d41be…efc5` and
is preserved at
`evidence/private/editorial-waste-resume-2026-10-04/framing-packages/check-3/intake-as-submitted.md`;
the published file is SHA-256 `aa649265…c72d`. `state.yaml` records both.
The final outcome's hash table labels the `079d41be…` row as the
submitted framing input. This does not reopen framing or change the
park.

## Who wrote this

The intake record, the brief and this record were first written by Stew
in one Claude Code session whose runtime identifies its model as Claude
Fable 5.1 (`claude-fable-5-1`), vendor Anthropic. The pre-framing
correction above was made in the same conversation, continued under
Claude Opus 5.5 (`claude-opus-5-5`), vendor Anthropic. The requested reasoning
effort was high; the session cannot observe its own effort setting and
does not assert it. The session was started by an orchestrating session
that describes itself as an OpenAI model. The orchestrator wrote no part
of the brief, the intake record or the editorial decisions above, and it
retains this session's transcript. No reviewer seat, framing checker or
subagent was used in either part of this stage.

The execution-block entries (the status above, "Framing check: execution
blocked", the register row and `state.yaml`) were written later on
2026-10-04 in the same conversation, requested as the `implementer` agent
on `claude-opus-5-5` at high. The runtime reports Claude Opus 5.5
(`claude-opus-5-5`); the agent and the effort setting are not observable
from inside the session, and the coordinator verifies them. An earlier
closeout session was paused by the coordinator after about eight seconds,
before it edited anything. These entries record process only. The
editor launched no reviewer, canary or diagnostic and sought no source
for them.

The response to framing check 1, revision 2 of the brief, the source
work for it, the status at the head of this record, the section
"Framing resumed" and the register row change were written later on
2026-10-04, resuming the same editorial session
(`f423dbd0-d769-499d-9008-7d4587f0dc2f`) in a new worktree, requested as
the `implementer` agent on `claude-opus-5-5` at high. The runtime reports
Claude Opus 5.5 (`claude-opus-5-5`), vendor Anthropic; the agent and
effort setting are not observable from inside the session and the
coordinator verifies them. The editorial decisions are the editor's. The
coordinator, an OpenAI model, ran the launcher and installed the report
and wrote none of the response or the revision. No reviewer, panel or
subagent was used by the editor in this step.

The response to framing check 2, the written resolution, revision 3 of
the brief, the source work for it, the corrections above, the status at
the head of this record and the register row change were written later
on 2026-10-04 in the same editorial session
(`f423dbd0-d769-499d-9008-7d4587f0dc2f`), requested as the `implementer`
agent on `claude-opus-5-5` at high. The runtime reports Claude Opus 5.5
(`claude-opus-5-5`), vendor Anthropic; agent and effort are verified by
the coordinator. The coordinator ran the launcher and installed the
report and wrote none of the response, the resolution or the revision.
No reviewer, panel or subagent was used by the editor in this step.

The pre-submission correction above, to the brief, the second author
response, YF-EV-0345, YF-EV-0347 and this record, was made later on
2026-10-04 in the same editorial session
(`f423dbd0-d769-499d-9008-7d4587f0dc2f`); the runtime reports Claude Opus
5.5 (`claude-opus-5-5`), vendor Anthropic. No source was searched for,
and no reviewer, panel or subagent was used.

The response to framing check 3, the section "Framing check 3 and the
cap", the status at the head of this record, `state.yaml` and the
register row's reason and note were written later on 2026-10-04 in the
same editorial session (`f423dbd0-d769-499d-9008-7d4587f0dc2f`); the
runtime reports Claude Opus 5.5 (`claude-opus-5-5`), vendor Anthropic.
The brief was not edited. No source was searched for, no eligibility
report was written, and no reviewer, panel or subagent was used.

The closeout corrections after check 3, to the second author response,
this record, `state.yaml` and the register row's reason, were made later on
2026-10-04 in the same editorial session
(`f423dbd0-d769-499d-9008-7d4587f0dc2f`); the runtime reports Claude Opus
5.5 (`claude-opus-5-5`), vendor Anthropic. The brief and the third author
response were not edited. No source was searched for, and no reviewer,
panel, eligibility report or subagent was used.

The final outcome, the brief's new status block, this record's status and
"Final outcome" section, the historical labels, `state.yaml` and the
register row were written later on 2026-10-04 in the same editorial
session (`f423dbd0-d769-499d-9008-7d4587f0dc2f`); the runtime reports
Claude Opus 5.5 (`claude-opus-5-5`), vendor Anthropic. The route choice
was decided by root for this batch and is recorded here by the editor.
The brief body, the three reports, the three responses and the
eligibility report were not edited. No source was searched for, and no
reviewer, panel, confirmation or subagent was used.
