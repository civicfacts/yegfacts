# Run record: `consultation-and-opposition`, run of 2026-09-03

Drafted by Stew under D-0019. Methodology v1.19. The brief was frozen
on 2026-09-04 on framing check 2 FRAME OK. **Since 2026-09-25 it is NOT
FROZEN**: it was revised after the council documents were read from
archived bytes, framing check 3 returned REVISE, and it awaits the
founder under the v1.12 cap (see the last section). No panel has run;
round 1 has not started.

## The freeze

Frozen 2026-09-04 on `framing/check-2.md`, FRAME OK, every finding from
check 1 marked RESOLVED and none WEAKENED or OPEN. Two reports, not
three: the cap allows three and the brief did not need the third, so
there is no `resolution.md` in this run.

The freeze is the sha256 of `brief.md` as it stands after the status-line
edit, and it is not a branch commit. This branch is squashed on merge, so
a commit sha recorded here would name an object that never reaches main.

    083f4a63800a1d12f348c0186fec8dd01c6d47c557049d24b5f5149feaa02018

Recompute it with:

    shasum -a 256 reviews/consultation-and-opposition/2026-09-03/brief.md

Nothing but the status line changed in `brief.md` after check 2 returned.

## What the framing check changed

Check 1 (`framing/check-1.md`) returned REVISE with six findings. The
response is `framing/response-1.md`; five findings were adopted whole and
one was adopted as a required alternative rather than as the primary,
with the reason written out. In short:

1. Four captured wordings had been folded into one proposition. Only one
   of the five makes the general assertion the brief tests. The other
   four are now listed as what they are — two about places on no route in
   the set, one about a single group, one about notification — and the
   prevalence line says one account asserts the claim as stated.
2. The old alternative cutoff set would have returned Supported at one or
   two documented engagements on a proposition that there were none.
   Both cutoff sets now require E = 0 for Supported, and the "engagement
   was rare" reading survives only as a labelled qualification.
3. The primary definition of engagement had excluded the targeted
   property-owner contact the City itself files under public engagement,
   which would have decided part of the answer in the definition. Primary
   and alternative swapped: the primary now counts targeted contact with
   affected people, and the open-to-everyone reading is the alternative.
4. The ladder had two buckets, so a route the City has simply never
   written about counted as evidence that nothing happened on it. It now
   has three — E confirmed, N stated by a City record, U unresolved — and
   Supported needs E = 0 and U = 0.
5. Scope, stakes and the resident's question were rewritten in the
   checker's own words. Not established no longer claims to be a finding
   about the City's record-keeping, which it is not.
6. Refused as primary, adopted as the alternative: the checker's cutoff
   at the point a route's design stopped being open to public influence.
   It is the better test and the City publishes no such date, so making
   it primary would have pushed most of the fourteen into unresolved and
   left Not established as the only reachable verdict — the defect the
   framing prompt itself names. It is required alongside the computable
   cutoff instead.

Check 2 returned FRAME OK on all nine checks and accepted the refusal on
its own terms.

**What the checker did not do.** It did not propose that a participation
count stand in for public opinion, and it did not disturb either park.
The brief was written to refuse that substitution and the refusal was
never tested.

## What I did

1. Read `prompts/framing-check.md`, `prompts/reviewer.md`,
   `prompts/review-schema.json`, the model brief at
   `reviews/active-transportation/2026-09-02/brief.md` and its
   `intake.md`, and `methodology/changelog.yaml` from v1.19 down.
2. Read the register entry for `consultation-and-opposition` and both
   claims filed under it, `most-residents-oppose-lanes` and
   `fast-tracked-without-consultation`.
3. Checked all fifteen registered wordings against
   `intake/captures/yegscoop-2026-08-26/comments.jsonl` with a script.
   All fifteen are exact substrings of the comment attributed to them,
   and every pseudonym matches. Comment indexes are recorded in
   `intake.md`.
4. Read the triage record at
   `reviews/intake/yegscoop-2026-08-26/triage-stories.md` and both
   readers' raw reports for this question. Both returned GO; the decided
   reason names the trap this brief is built around.
5. Searched the public record for the documents the panel would need, and
   for a representative survey that could settle the opposition claim.

## The decisions, and why

### One claim, not two

The brief carries one claim, `ca-route-level-engagement`. The register's
`fast-tracked-without-consultation` is compound — fast-tracked, on old
data, without consulting — which is three assertions under one finding.
Two assertions under one finding state neither, and everyone quoted
beneath it gets tagged with a verdict on a claim they did not make. So it
is split: the consultation assertion is tested, "old data" is parked with
a reason, and "fast-tracked" is not tested at all because nobody disputes
it and the City's own capital profile is titled "Implementation
Acceleration".

### The opposition claim is parked, not tested

`most-residents-oppose-lanes` is ten of the fourteen accounts on this
question, and I am parking it. My reasoning, in full, because this is the
decision most likely to be argued with:

- The claim is factual, not opinion. A probability-sample survey would
  settle it. So it is not a check-6 "not checkable at all" case.
- But no such instrument exists on the Edmonton record on 2026-09-03. I
  searched for a City perception survey, a published poll of Edmonton on
  bike lanes, and any probability-sample instrument asking about these
  routes. Everything I found is self-selected: a news outlet's open
  listening campaign, the City's inquiry log, the committee speakers
  list, advocacy pages. I did not find a probability-sample survey. I
  cannot prove one does not exist; the panel should confirm, and the park
  reason is written so it reopens if one is found.
- With no such instrument, Supported is unreachable and Contradicted is
  unreachable. Only Not established is available. Framing check 8 says a
  proposition on which one verdict is impossible is a REVISE, and the
  framing prompt says outright that a definition the record cannot meet
  predetermines Not established and is itself a defect. So testing it
  would fail the check I am drafting to.
- The register's own triage reason already says to drop it unless a
  representative citywide survey exists. Parking is applying the triage,
  not overriding it.

**The substitution I refused.** The obvious move is to test "most people
who took part in the City's engagement on these routes opposed them",
which is checkable, and which is what one commenter explicitly asked for
("Please post the actual input from all of the City forums on bike
lanes"). Framing check 9 arguably sanctions it: where the record cannot
answer at the level people ask, test the nearest level and name that
level in the proposition. I decided against it, for these reasons:

- Self-selected consultation feedback is not a sample of a neighbourhood
  or a city, and a verdict word attached to it will be read as one no
  matter how the proposition is worded. The badge travels further than
  the qualification.
- The site has just been through v1.19, which came out of publishing
  findings that answered questions nobody was arguing about. A finding
  that "among people who filled in a City survey, most objected" answers
  a question nobody asked and invites the reader to hear the one they
  did ask.
- Ten accounts asserted a claim about a population. Giving them a verdict
  on a claim about survey respondents tags them with a finding on
  something they did not say.

Instead the participant-level balance is a **required calculation** under
the tested claim, reported under its own name, with an explicit
prohibition on citing it for or against any proposition about public
opinion, and with the same prohibition repeated as a predeclaration the
story is bound by.

**I expect this to be the framing check's main target, in one of two
directions.** Either the checker says the participant balance should be a
claim with its own verdict, naming the participant level in the
proposition, per check 9; or it says the park makes the question's public
title ("do residents oppose the bike lanes?") a promise the brief does
not keep. If the checker takes the first line, the resolution I would
accept is a second claim whose proposition is "Among the people who took
part in the City's engagement on these routes, most objected", with the
level in the proposition itself, the recruitment method reported beside
every figure, and the prohibition on reading it as public opinion carried
onto the claim page and into its one-line answer. I am not writing that
claim now, because I do not think it should be written on my own say-so.

### The route set

Set S is fixed as the routes report IS03688 recommends for re-evaluation,
because those are the routes the captured argument is about: the source is
a post about the committee declining that recommendation, and the
commenter who made the fullest consultation complaint calls them "the
routes they've fast tracked". Pinning the set to a named field in a named
document, rather than to prose about "affected neighbourhoods", is what
keeps a reviewer from choosing the set that suits the answer.

### The engagement definition

The primary definition requires an activity open to the neighbourhood.
The alternative drops that and counts targeted property-owner and
community-league contact. The split is taken from the City's own project
page, which distinguishes "focused public engagement opportunities" for
more complex route connections from "targeted community members or
property owner engagement" for less complex ones. Both classifications
are required in the output.

### The verdict ladder, walked

T = routes in S; E = routes in S with at least one qualifying activity.
Every route is in E or not; there is no third bucket and no remainder.

Primary cutoffs, in precedence order:

- Not established fires first, on T = 0, or on there being no City
  engagement record of any kind for the programme. These are conditions
  on the record's existence, not on the count, which is what keeps them
  from colliding with E = 0.
- Then: E = 0 → Supported. 0 < E/T ≤ 1/2 → Partially supported.
  E/T > 1/2 → Contradicted.

Boundary walk. E/T ranges over [0, 1]. The three bands are {0},
(0, 1/2] and (1/2, 1]. They are disjoint and they cover the range; no
value of E/T is unclassified. Empty set: T = 0 is caught by Not
established before any division, so there is no division by zero and no
vacuously true band. All-one-way, both directions: E = 0 → Supported;
E = T → E/T = 1 > 1/2 → Contradicted. Single boundary values: E/T = 1/2
exactly → Partially supported, not Contradicted.

Alternative cutoffs: [0, 1/7], (1/7, 2/3], (2/3, 1]. Disjoint, covering,
same Not established precedence. E = 0 → 0 ≤ 1/7 → Supported.
E = T → 1 > 2/3 → Contradicted. E/T = 1/7 exactly → Supported;
E/T = 2/3 exactly → Partially supported.

The one place the two sets diverge sharply is small E: at T = 14 and
E = 1, the primary set gives Partially supported and the alternative
gives Supported. That divergence is deliberate and is reported, because
it is exactly the question of whether "zero consultation" survives one
counter-example.

## 2026-09-04: the hole was closed before the framing check ran

The brief above was drafted over a document nobody had read. Weakness 1
below says so in the drafting session's own words, and it was right that
it should have been closed before the freeze.

It has been. The City's meeting portal returns HTTP 403 to browser-style
fetch tools; a plain `curl` with an ordinary browser user-agent returns
HTTP 200 and the PDF. Report IS03688 and its four published attachments
were retrieved that way on 2026-09-04 and read. What they say is written
into `intake.md` under "Report IS03688, obtained", with the operative
sentences quoted verbatim and the DocumentId each came from.

What that changed in the brief, before the framing check saw it:

- **The route set is no longer a bet.** The report body names no route.
  Attachment 5 does, in two lists: fourteen "Will be reevaluated for
  feasibility and subject to funding availability", thirteen "Will
  continue as planned". The fourteen are transcribed into the brief so
  reviewers check the membership rather than build one, and T is fixed at
  14. The two lists are word-for-word identical across all three
  published versions of Attachment 5.
- **The required alternative route set changed.** It was "complete the
  set from the project page", which existed only because the report might
  not enumerate the routes. It does. The alternative is now the whole
  remainder of the programme, all twenty-seven routes in Attachment 5,
  which is a set a holder of the claim would recognise.
- **The Not established conditions were rewritten.** Both of the old ones
  were now known to be false — the routes are enumerated, and the City
  publishes engagement material about the programme — which would have
  left one of the four verdicts unreachable. The single condition now is
  route-level: nothing published either way about engagement on any of
  the fourteen, so that E = 0 cannot be told apart from a record that was
  never published.
- **The cutoff stopped being verdict-sensitive.** Attachment 3 reports
  construction status per route as of 2026-08-10 and shows construction
  started on none of the fourteen, so "before construction started" and
  "before the as-of date" coincide for every route in S. Weakness 4 below
  is answered by the record rather than by an argument.
- **The "old data" park's reopening condition narrowed.** It named
  IS03688 and its attachments as places the vintage might be stated. They
  have now been read and do not state it, so the condition names the
  guides and later records instead.
- **Nothing about what the record shows went into the brief.** The
  report's own account of the programme's engagement is quoted in
  `intake.md`, which reviewers never see, and is deliberately absent from
  the brief. Telling the panel what the City has already conceded is the
  leak framing check 5 exists to catch. The framing checker sees it,
  because the checker receives the intake record, and that is the reader
  it is for.

## What is weak about this brief

Stated bluntly, because the framing check will find these anyway.

1. **I have not read report IS03688.** The meeting portal returns HTTP 403
   to this session's fetch tool. Everything I say about the report comes
   from this repository's earlier intake record for the
   active-transportation question, which quotes it, and from news
   coverage. If the report does not enumerate the re-evaluation routes,
   the primary route set is undefined and the claim lands on Not
   established through condition (a) — which would be a defensible finding
   but a thin one. Taproot's 2026-09-01 piece names eleven of the
   fourteen, which suggests the set is enumerable from the record, but I
   have not confirmed it in the report itself. **This is the single
   biggest hole in the brief and it should be closed before the freeze,
   by someone with a tool that can read the portal.** *Closed on
   2026-09-04; see the section above. The report does not enumerate the
   routes — Attachment 5 does, and it names fourteen.*
2. **I have not read the Bike Plan Phase 2 "What We Heard" report.** The
   fetch returned a PDF the tool could not parse. I therefore assert no
   participation figure anywhere, which is correct behaviour, but it also
   means I do not know whether the plan-level engagement asked about route
   locations. If it did, the primary definition's test 1 ("route-specific,
   rather than the Bike Plan") may be excluding evidence that should
   count. A checker could reasonably call that a defect.
3. **The primary engagement definition may lean toward Supported.** Test
   2 excludes property-owner-only contact, and the City's own page says
   less complex routes get exactly that. If most routes in S are "less
   complex", the primary reading could produce E = 0 more or less by
   construction. The required alternative is the mitigation and both
   classifications are mandatory, but I want it on the record that I know
   this is where the brief is most vulnerable, and that I chose the split
   from the City's own words rather than inventing one.
4. **"Before building it" may be the wrong cutoff.** Engagement run after
   construction started is still engagement to a supporter, and I have
   made it not count. The holders' complaint is about being asked too
   late, so the cutoff carries the claim's substance rather than being
   neutral. I did not offer an alternative cutoff on this dimension, only
   on the proportion. A checker may require one — for example, counting
   any engagement before the as-of date — and I would accept that.
5. **One claim under a two-part question.** The register's question is
   "Did the City consult the affected neighbourhoods, and do residents
   oppose the bike lanes?" The brief answers the first half and parks the
   second in public. That is honest, but a reader arriving at the question
   page will see a title that promises more than the finding delivers.
   Whether the question's public wording should change at freeze is
   Stew's call, not mine; I have not touched the register.
6. **Four accounts carry the tested claim, ten carry the parked one.** By
   the site's own prevalence reasoning, the claim being tested is the less
   argued of the two. It is the one that can be answered.
7. **The capture is fourteen to nothing.** Every account on this question
   is on one side, so the brief's sense of "how the claim circulates" has
   no counter-form in it at all. The brief says so, and the panel is told
   to search as hard for engagement that happened as for engagement that
   did not, but there is no captured supporter wording to test the
   proposition's fairness against. A second source with the other side on
   it would strengthen this brief and does not exist yet.

## Open questions I could not settle

1. Does report IS03688 enumerate the fourteen re-evaluation routes by
   name? If not, what field pins the set? (See weakness 1.)
2. Does a probability-sample survey of Edmontonians or of any affected
   neighbourhood, asking about these routes, exist? I did not find one. A
   second opinion here would be worth more than anywhere else in this
   brief, because the park in the brief rests on the answer being no.
3. Did the Bike Plan engagement ask about specific route or lane
   locations? The answer changes whether test 1 of the engagement
   definition is drawn in the right place.
4. Should the participant-level feedback balance be a claim with its own
   verdict, with the level named in the proposition? I decided no and gave
   my reasons above. I would not be surprised to be overruled and I have
   written what the overruled version would look like.
5. Is "before construction started" the right cutoff, or should it be
   "before the as-of date" with the construction-start reading as an
   alternative?
6. The register carries wording 393 verbatim, which names a sitting
   councillor as the person who failed to inform residents. The brief
   declines that as an accusation against a named individual, under the
   register's own right-of-reply ground, and does not repeat the
   allegation as a proposition. Whether the register should carry that
   wording at all, given the same doctrine, is a question for Stew. I have
   not touched the register.

## Register reconciliation required at freeze

Not done in this session, deliberately: the register is the contended
file and other sessions are running. When the brief is frozen, the
following edits to `intake/register.yaml` are needed, and they should be
made in one pass by whoever freezes it.

- `consultation-and-opposition`: `lifecycle` from `registered` to
  `briefed`.
- Add claim `ca-route-level-engagement` under this question, with the
  proposition from the brief, `side: against`, `accounts: 4`, and the
  four wordings and pseudonyms from `intake.md`.
- `most-residents-oppose-lanes`: record the PARK disposition with the
  brief's reason and its reopening condition.
- `fast-tracked-without-consultation`: record that it is superseded by
  the split — the consultation strand tested as
  `ca-route-level-engagement`, the "old data" strand PARK with its
  reopening condition, "fast-tracked" not tested because undisputed, and
  the named-individual strand declined on right-of-reply.
- Decide whether the question's public wording changes, per weakness 5.

Nothing on the register was edited by the drafting session. The question's
lifecycle was still `registered` when it ended.

## Register reconciliation, done at the freeze (2026-09-04)

Done in one pass, touching only this question's entries.

- `consultation-and-opposition`: `lifecycle` `registered` → `briefed`.
  `grouping_note` rewritten, because the old one said the engagement
  record settles both claims and it does not settle the opposition one.
  A `note` records where the frozen brief is. `run` is unchanged: it
  names the intake run the grouping came out of, which is what the field
  means, and the frozen brief is named in `note` instead.
- Added claim `ca-route-level-engagement` with the proposition from the
  frozen brief, `side: against`, `accounts: 1`, and the one captured
  wording that asserts it. Not four: framing check 1 found that the other
  three consultation wordings say narrower or different things, and the
  brief no longer folds them in, so the register may not either.
- `most-residents-oppose-lanes`: `reason` records the park, why no
  published instrument can settle it, and the condition on which it
  reopens.
- `fast-tracked-without-consultation`: `reason` records the split — the
  consultation assertion checked as `ca-route-level-engagement`, "old
  data" parked with its reopening condition, "fast-tracked" not checked
  because undisputed, the named-individual wording declined on
  right-of-reply.
- `public/_redirects` regenerated by `npm run redirects`, which the
  validator requires once a claim id exists; the diff is one line, the
  new claim's `/considered/` address.

**The question's public wording is unchanged.** It asks two things and
the run answers one of them, which is a mismatch a reader will notice.
Changing it would have hidden the mismatch rather than explained it, so
the question keeps the words the argument was had in and the
`grouping_note`, which is rendered on the question's page, says plainly
which half is being checked and why the other half is parked.

**Two schema limits, recorded because they matter to a reader.** A
register claim carries no state of its own — that is the schema's rule,
and the one exception is a right-of-reply decline — so a park cannot be
written as a claim-level `triage: park`. It is written as the claim's
`reason`, which is published in the register file but is not rendered on
the claim's page, because the page only prints a claim's own reason when
the claim was declined apart from its question. The reader-facing place
for the parks is therefore the question's `grouping_note` and the frozen
brief. Whether the claim page should print a park reason is a question
for the methodology, not something to fix inside a freeze.

## Still standing after the freeze

1. **The tested claim rests on one account.** Fourteen people argued the
   question; one of them asserted the proposition in the form the panel
   will answer. That is honest and it is thin, and it is the direct
   consequence of framing check 1's second finding. The question carries
   the prevalence; the claim does not.
2. **The register carries a wording naming a sitting councillor.** The
   brief declines the accusation on right-of-reply grounds and the
   register flags `names_person: true`, but the wording itself is still
   published under `fast-tracked-without-consultation`, and the schema's
   right-of-reply decline would require stripping the claim's other
   wordings with it. Whether that wording should be on the site at all is
   the drafting session's open question 6 and it is not settled here.
   Nothing about it changed tonight.
3. **The "What We Heard" report is still unread.** No tool in either
   session parsed it, so no participation figure from it is stated
   anywhere. The panel reports those figures.

## Verification

The drafting session ran `npm run validate`, `npm run audit:exposure`,
`npm run build` and `npm run audit:duplication` after writing the three
files.

The freezing session of 2026-09-04 ran `npm run validate`,
`npm run audit:exposure`, `npx astro check`, `npm run build`,
`npm run audit:duplication` and `npm test`, and `npm ci` first, because
the worktree's `node_modules` held only build caches and three tests
resolve `tsx` through it. Output is in the report to the orchestrator and
in the pull request comment.

Two framing checks ran, both `codex exec -m gpt-5.6-sol -c
model_reasoning_effort=high -s read-only --skip-git-repo-check`, from a
scratch directory outside the repository, with no repository access.
**No panel ran. Round 1 has not started.**

## 2026-09-09: verification before resuming

Before round 1, the editor inspected the original framing traces. Check 1
used web tools but could not retrieve the core eScribe documents. Check 2,
which returned FRAME OK, made no tool calls and relied on the intake for
source existence. The missing --search flag was not the cause established
by this audit. See `verification/setup-audit.md` for evidence, provenance
limits and the editorial disposition, and `verification/procedure-review.md`
for the independent procedural review.

The brief and both framing reports are unchanged. No third framing report
is being commissioned. An independent source-existence audit is commissioned but has not yet run;
no panel will start while an essential dependency remains unverified.

The Google audit attempt on 2026-09-09 stopped at the provider's account
quota before research. Execution remains blocked pending independent
source verification. The request and attempt metadata are preserved under
`verification/`; no panel result or source-audit result exists. This does
not change the historical freeze or mark the brief PARKED.

## 2026-09-23: the source-existence audit ran twice on an empty package

The editor sent `verification/source-existence-request.md` to the Google
seat as the whole package. That file is the instruction text alone; it
says "the brief below" and nothing follows it. The 2026-09-09 attempt had
been assembled by hand with the brief appended and not committed, and
the editor did not check the package before dispatch. Two runs on
2026-09-23: 16:37Z (attempt 20260923T163724Z), refused at admission
because a fetch returned 404 and the launcher read that as a broken
tool, fixed in yegfacts PR #83 so a missing page counts as a research
result; and 16:52Z (attempt bd42f64b4b3ca2e1), admitted, whose report
says in its first section that no brief was in the input and audits
nothing. That report is kept unedited as
`verification/source-existence-audit-empty-package-2026-09-23.md`. The
correct package, request plus the frozen brief verbatim, is committed as
`verification/source-existence-package-2026-09-23.md` and is what the
next run sends. Both runs were the editor's error and cost Google-seat
quota the lanes-and-congestion round 1 also needs; that run goes first.
Execution of the consultation panel remains blocked on the source audit.

## 2026-09-23, 17:15Z: third run, correct package, quota exhausted mid-run

Attempt `20260923T170604Z` (agy 1.2.9, gemini-3.8-flash-high), package
`verification/source-existence-package-2026-09-23.md` (sha256
f0c610c0457bd9552043ec0fc80c0119089380f956242da559377835da7001f1), canary
pass. The research run made 117 steps over eight minutes and then agy
returned "Individual quota reached ... Resets in 167h16m8s" with no final
message. Nothing admitted, no report. The quota reset that morning had
carried: two empty-package audits of eight to ten minutes each (both the
editor's error, recorded above) and the lanes-and-congestion round 1
Gemini seat (about eight minutes); this run was the fourth and did not
finish. The seat is out until about 2026-09-30 16:30Z. The source audit
stays owed, the panel stays blocked, and the package to send is the one
named here.

## 2026-09-24: source-existence audit on the OpenAI seat; the council documents sit behind a browser check

The founder retired the Google seat (methodology v1.37 and v1.40), so the
source-existence audit commissioned from Google ran on the OpenAI seat
instead, through `scripts/panel/audit-package.sh --provider openai` (GPT-6 Sol
at high, attempt `e6261f606f5b59ae`, context proof pass), with the package
committed on 2026-09-23 (`verification/source-existence-package-2026-09-23.md`:
the request and the full brief). Stated limit: the framing checks on this
brief also ran on the OpenAI seat, so this audit is not from a different
vendor than the checker; it is from a different vendor than the editor.

Report: `verification/source-existence-audit-2026-09-24.md`. Verified from
full City PDFs: the 2019 Phase 2 report, the 2023 capital profile, three 2025
construction bulletins; the engagement portal exists. Unverified, because the
seat could not read them: report IS03688 and every attachment (eScribe
DocumentIds 304024 to 304032), the August 26 agenda and minutes, and the
project page's route table as of September 3. The audit found no mismatch; it
could not look at the documents the brief most depends on.

Why, checked the same day by the editor: every eScribe file download
(`filestream.ashx?DocumentId=...`) now answers HTTP 403 with a Cloudflare
"Verifying your browser" page, to the site's own fetcher, to a plain browser
user agent, and with the meeting page's cookies and referer. The meeting
pages themselves and the City project page still fetch (archived to local
staging). Only a real browser passes the check. This is an access block on
the documents, not evidence they are missing, and under v1.28 an essential
unreadable source stops research rather than becoming a finding.

Next step, and it needs a person with a browser: download the nine files
(DocumentId 304024, 304025, 304026, 304027, 304028, 304029, 304030, 304031,
304032) from `https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=<id>`
into one folder. The editor then archives them with their hashes and sends
their extracted text to the same OpenAI seat to check the brief's
transcription against the actual bytes, the way the faithfulness packages
carry archived source text. The panel packages will need the same, since no
seat's web tool can pass the check either.

## 2026-09-25: the council documents checked from archived bytes; the committee decision read from the minutes

The block recorded on 2026-09-24 is resolved. A person downloaded the nine
IS03688 files in a browser; they are archived privately (rights unconfirmed,
fail closed) and identified by hash in `verification/escribe-archive-2026-09-25.md`.
Their full extracted text went to the same OpenAI seat (GPT-6 Sol at high,
`audit-package.sh --provider openai`, attempt `3c7e2a30e34d433b`, context proof
pass). Report: `verification/source-existence-audit-archived-2026-09-25.md`.

Verified from the documents: every file's identity, title and August 26, 2026
committee date; the report's recommendation and its private Attachment 4;
the 14 routes of set S match all three versions of Attachment 5 exactly, as
do the 13 "continue as planned"; Attachment 3's status groups as of August 10,
including the five routes with no delivery plan. One mismatch for the brief:
the three Attachment 5 versions do not share the same heading or proposed
treatment (the original says the 14 "would be removed from the scope"; the
replacements say they "may be revisited" or "may be re-evaluated"), so any
brief sentence that treats the heading as common to all three is wrong.
Uncertain: which replacement is DocumentId 304030 and which 304031 (the files
carry no id); the 93 Street/84 Avenue status row's segment match.

The committee decision. The eScribe meeting pages still load for the site's
fetcher; the agenda and post-meeting minutes were archived to staging and
item 7.6's text went to the same seat (attempt `0d11119b021b98e4`). Report:
`verification/source-existence-audit-decision-2026-09-25.md`. The minutes
record no decision on set S: A. Salvador's motion to continue the program at
its approved scope and accelerate tender-ready routes was defeated 2 to 2,
after E. Rutherford's amendment to it was also defeated 2 to 2; the committee
met in private in between; the only other carried motion kept Attachment 4
private (4 to 0). No motion adopted or rejected any Attachment 5 version.

What remains before a panel: the brief editor applies what these reports
change (the heading mismatch; the committee outcome where the brief assumes
one), and the project page's route table as of September 3 still needs an
archived capture (the Internet Archive is the only route to that date).

## 2026-09-25: the brief revised on the two facts; framing check 3 REVISE; not frozen

**Result.** The brief is no longer frozen. It was revised on the two
points the archived council documents do not support, framing check 3
returned REVISE, and not every standing finding comes with copy-ready
replacement text, so the v1.39 route is closed. Under the v1.12 cap the
brief now waits for the founder, in writing. No panel runs on it.

**Why the brief changed.** The frozen brief said the Infrastructure
Committee did not adopt administration's recommendation, "so the full
programme continues". The minutes record no decision on the fourteen
routes (`verification/source-existence-audit-decision-2026-09-25.md`).
It also defined set S by the heading "Will be reevaluated for
feasibility and subject to funding availability" as if that heading
were in all three versions of Attachment 5. It is in the original and in
one replacement, not in the other
(`verification/source-existence-audit-archived-2026-09-25.md`). Editing
a frozen brief makes a new brief, so it needed a new framing check; this
was the third and last the cap allows.

**What changed in the brief.**

1. Selection rationale, civic importance. The sentence that the committee
   "did not adopt it, so the full programme continues" is replaced by
   what the minutes record: no motion carried on the recommendation;
   A. Salvador's motion to continue the program at its approved scope and
   advance tender-ready routes defeated 2 to 2, after E. Rutherford's
   amendment to it was also defeated 2 to 2; the only substantive motion
   carried kept Attachment 4 private, 4 to 0; no decision on the fourteen
   routes.
2. Set S. Now defined by the route list, the fourteen projects Attachment 5
   lists apart from the thirteen that "will continue as planned". The
   original's heading is quoted as where the list sits in the original,
   and the three versions' different treatment of the fourteen is stated.
   Which replacement is DocumentId 304030 and which 304031 is stated as
   not established.
3. Sentences resting on the committee decision. "the routes the committee
   had just declined to pause" (circulating forms), "the routes council
   declined to pause in August" (who asks this) and "the routes the
   committee declined to pause" (why this reading) now say the routes the
   committee considered. The minutes document (item 7) now answers which
   motions were put and how each vote went, instead of "what the committee
   decided about the modified approach, which fixes what 'pushed ahead'
   refers to".
4. Sentences resting on a heading. The alternative route set no longer
   quotes the heading "Will continue as planned", which one replacement
   does not carry, and no longer says administration "proposed to pause"
   the fourteen.
5. Status header and methodology line (v1.40).

Not changed, though it rests on the committee decision: the normalized
proposition's "the bike routes the City pushed ahead in 2026". The
proposition was left for the check, and check 3 flagged it (finding 2).

**Hashes.** Frozen brief before the revision:
`083f4a63800a1d12f348c0186fec8dd01c6d47c557049d24b5f5149feaa02018`.
Revised brief as sent to check 3:
`50eb0a013791f1543099debf98332c395eddd30cd16f6405c2d26a61f51e4ba3`.
After the status line was updated for the check 3 result:
`d7a7c250d69a13352cd1917ef71b4455ab16b85eb02563e6233fdc33e5c46e52`.
Nothing but the status line changed after check 3 returned.

**Check 3.** OpenAI gpt-6-sol at high, `codex --search exec`, read-only,
no repository access, codex-cli 0.156.1. Package: the framing prompt,
intake.md, the revised brief, the verdict vocabulary, the review schema,
check-1.md, response-1.md, check-2.md and the two 2026-09-25 audit
reports. Report verbatim in `framing/check-3.md`. Verdict: REVISE.

Standing findings, in the checker's order:

1. Provenance [framing]. The brief says "five commenters" made the
   consultation complaint; the intake shows four accounts made five
   comments (224 and 393 are one account). The checker supplied one
   replacement sentence and asked for the counts to be replaced
   "throughout", without text for each place. This error predates the
   revision. Check 1's attribution finding is marked WEAKENED on it.
2. Proposition [framing]. "the bike routes the City pushed ahead in 2026"
   gives the fourteen a decision status the minutes do not. Replacement
   proposition supplied, plus an instruction to use "the fourteen
   projects listed separately in Attachment 5" wherever the old phrase
   identifies set S, without text for each place.
3. Title [framing]. "Did the City ask the streets it built on?" implies
   the routes were built. Replacement title supplied.
4. The twenty-seven-route alternative has no ladder of its own [defect].
   Exact inserted rule supplied. Check 1's silence-and-unknown-routes
   finding is marked WEAKENED on it.
5. Historical availability [framing]. Mutable pages and later retrievals
   cannot show what was public on the as-of date. Replacement as-of
   instruction supplied.
6. Expected-finding leak [framing]. The sentence that the two cutoffs
   differ little "for this set" predicts the result, and "no route count"
   is untrue now the brief states list sizes. Two replacements supplied.
7. Stakes [framing]. Supported needs a City record stating no engagement
   for every one of the fourteen routes, and no named source is shown to
   supply that, so Supported is not shown to be reachable. The checker
   asks for the only claim, `ca-route-level-engagement`, to be parked,
   with reopening text supplied. This finding is about text that check 2
   passed and the revision did not touch.
8. Who asks this [framing]. Follows from 7; replacement sentence
   supplied, which says the question stays parked.

Checks 6 (checkability) and 7 (scope) are OK.

**Why the v1.39 route does not apply.** v1.39 needs copy-ready text for
every standing finding, applied with no new drafting. Findings 1 and 2
each ask for a replacement "throughout" or "wherever" without the text
for each place, so applying them means the editor drafting new sentences.
That makes the whole brief ineligible, and no new wording is asked of the
checker to fix it. No eligibility reader was run. Finding 7 also asks for
the brief's only claim to be parked, which would leave no claim to freeze.

**Freeze state.** Not frozen. The brief awaits the founder in writing
under the v1.12 cap.

**Next.** The founder decides, in writing, what happens to this brief. Two
facts bear on it: finding 4 is labelled a defect, and under v1.20 a defect
standing after the third report does not by itself park a brief; and
finding 7 is a framing finding on text check 2 passed.

## 2026-09-25: the project page as of August 31, from the Internet Archive

The audit could not open the City's Active Transportation Network Expansion
project page and had no capture from before the cutoff. The Internet
Archive holds one from 2026-08-31 17:06 UTC, three days before the
September 3 cutoff (capture 20260831170636). Its raw bytes are archived
privately, SHA-256
`a921d766a4bf28046e567b065050abcb0dfd0d9ab804b6ed14ae711e4b62798f`. The
capture carries the route table and the sentence the brief attributes to
the project page: "Focused public engagement opportunities are for more
complex route connections, while less complex connections are being
completed with targeted community members or property owner engagement."
That attribution is now verified against a pre-cutoff copy. The
route-to-neighbourhood mapping in the table was not checked here; it is
for the panel.
