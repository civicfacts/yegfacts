# Run record: collection-schedule-and-capacity

Question: "Are Edmonton's garbage, green-bin and recycling collection
schedules adequate for households?" Register id
`collection-schedule-and-capacity`, source
`edmonton-rant-and-rave-2026-09-10`, 11 claims, 17 accounts, 7 for and 10
against. Methodology v1.43.

Status: **EXECUTION BLOCKED BEFORE FRAMING, 2026-10-04; resumable.** The
intake record and the draft brief are complete and committed at checkpoint
`bf8d58c884c32fde205650c495aae028d8cd4a54`. The brief is not frozen. Every
launch of the framing checker failed before the package was sent, so no
checker or panel has read the brief, there is no finding, and none of the
seven proposed parks is adopted. This is a failure to run the check, not
an editorial rejection or a park. Whether the schedule is adequate for
households is unanswered. Attempts and resume steps are under "Framing
check: execution blocked" below.

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
`bf8d58c884c32fde205650c495aae028d8cd4a54`, based on main at `5a1bec3`
and not yet merged, holds
this directory's corrected draft and the eleven registry entries
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
