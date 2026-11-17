# Run record: cycling-safety

Question: "Do bike lanes make cycling safer in Edmonton, and where do
cyclists actually ride?" Register id `cycling-safety`, source
`yegscoop-2026-08-26`, 8 claims, 10 accounts, 4 for and 6 against.
Methodology v1.43.

Status: **DRAFT, REVISED AFTER FRAMING CHECK 2 ON 2026-10-21. NOT
FROZEN.** Framing check 2 returned REVISE (`framing/check-2.md`) with
every check 1 finding resolved and two new findings; the editor's answer
is `framing/author-response-2.md`. The brief still proposes one claim for
the panel and seven claims for parking under six parks; every one of
those is a proposal. No panel has run, there is no finding, and no
published story or answer. No claim row or question row on the register
has changed. The sections from "What was done, in order" to "What was
not done, and why" record the draft as it stood before check 1 and are
left as written; where they count panel claims or parks, the two framing
sections that follow supersede them.

## Framing check 1 and the revision that answers it

Check 1 (GPT-6 Sol at high, attempt `85fdedc5754594d4`, verdict REVISE)
answered the brief and intake at the submission pins below. The author
response was written by Stew as Claude Opus 5.5 (`claude-opus-5-5`),
effort high, the model D-0041 assigns to framing rulings, in the same
editorial conversation that drafted the brief, on the existing
subscription, with read and search tools only; it ran no script,
retrieved no source and launched no reviewer or model session. The
coordinator applies its edits mechanically.

The editor accepted findings 2 to 9, with one reasoned disagreement
preserved under finding 3, and found nothing to answer in finding 1.
`street-labs-no-safety-value` moves from the panel to proposed park 6,
which disposes of its traffic-effect and pedestrian-safety assertions
with separate reopening instruments and adds no claim. The risk park
covers riding with a bike lane or shared path against riding without
either. Claim 1's E2 is limited to general rules and E3 to specified
roads or road classes, and its Contradicted stakes no longer say [70]
rode unlawfully. If the brief freezes, the register changes proposed
below would describe one panel claim and six parks covering seven
claims, the Street Labs claim taking the same park fields.

## Framing check 2 and the revision that answers it

Check 2 (GPT-6 Sol at high, attempt `6539ad15d0c1b88d`, verdict REVISE)
answered the revised brief at the check 2 pins below and marked every
check 1 finding resolved. The author response was written by Stew as
Claude Opus 5.5 (`claude-opus-5-5`), effort high, in the same editorial
conversation, with read and search tools only; it retrieved no source.
The editor accepted both new findings. Claim 1's qualification 2 and E3
now ask for a dated, bounded account of particular-road restrictions and
name the City's Restricted Highways listing, described by the reviewer
as dated March 2020 and not fetched, as a candidate source. Claim 1's
stakes now separate the legal entitlement from the holder's prediction
about lane position. The claim and park proposals are unchanged. One
ordinary framing report remains.
## What was done, in order

1. **Read the register, the capture and the intake run.** The question
   row and its eight claim rows were read from `intake/register.yaml`.
   The ten comment records that carry a wording under this question were
   read whole from
   `intake/captures/yegscoop-2026-08-26/comments.jsonl`, with the capture
   README, the earlier partial capture that holds the post's text, and
   every comment in the thread that mentions sidewalks, safety, collisions
   or fault (found by text search and read where it bore on the
   question). For each reply, the parent was resolved from the platform
   comment id. From `reviews/intake/yegscoop-2026-08-26/` the README,
   `groups.json`, `merged.json` entries for the eight claims, `triage.md`
   (per-claim outcomes), `triage-stories.md` and both question-level
   readers' raw outputs were read.

2. **Checked the counts.** 8 claims: confirmed. 13 wordings: confirmed, no
   run carried twice. 10 distinct comments, 10 distinct pseudonyms,
   confirmed; one comment carries three wordings and one carries two. The
   4 and 6 split needed no tie rule. All ten comments are dated
   2026-08-27. `intake.md` sets this out with the indexes.

3. **Read the research packet as a lead inventory, not a frame.** The
   coordinator's source-preparation packet of 2026-10-21 and its ten
   archived files were taken as leads. Each file used is named in the
   brief with its SHA-256 from the retrieval manifest. Four of the ten
   files do not bear on this question (the garbage collection page, the
   access and privacy page, the Active Transportation Network project
   page and the bike lane and land development report) and are not cited.
   No observation in the packet was adopted without reading the source.

4. **Established what the public record holds before drafting, and
   completed the read after a second retrieval pass.** This step is the
   record as it stood after the second pass; step 8 records the third
   pass and the disposition of the B1, B2 and P1 items named here, and
   "Readiness" states where each stands now. The triage reason
   assumed two records, the traffic bylaw and the collision records.
   Every address, hash and retrieval outcome is in `source-note.md`.
   - *The law.* The Traffic Safety Act, the Use of Highway and Rules of
     the Road Regulation and the Vehicle Equipment Regulation were read in
     the sections the brief names from the King's Printer's office
     consolidations; the editor's fetch tool downloaded them and the
     coordinator archived those bytes, the King's Printer having refused
     the coordinator's own download. Traffic Bylaw 5590 was read from the
     City's consolidation of 2025-05-12 in its preamble, definitions,
     Part II section 4(2), Part III, Part V section 84 and Part VIII
     section 107(cc) and (dd). Findings: sections 49 to 52 are marked
     Deleted by Bylaw 20700 from 2025-05-12; section 84 lets a highway be
     restricted to a class of vehicle, bicycles included; section 107(cc)
     and (dd) let the City Manager designate portions of a highway where
     bicycles are prohibited or bicycles only. The City's Bike Routes
     page still cites section 50 and states the sidewalk rule two ways.
     Bylaw 20700 itself was not retrieved: the City page answered the
     editor HTTP 502; the copy at the City's bylaw index was read by the
     coordinator's web tool as a consolidation dated 2026-10-06, and its
     download answered HTTP 403. Its text as of 2026-08-27 is essential to
     claim 1 and is blocker B1. Amendment checks between each
     consolidation date and 2026-08-27 were not made.
   - *The collision records.* The Collision Severity and Collision Cause
     datasets were read from the open data portal's API, and the same
     requests were separately retrieved and archived by the coordinator.
     Neither states fault by party for bicycle collisions; the cause
     dataset's cyclist-error column is, by its own note, a floor and not a
     fault share. The Crash and Equity Analyses Technical Report and the
     Safe Mobility Strategy 2027-2030 were read from the packet's
     archives; both report facility-type shares for cycling crashes and
     both say exposure data is missing. The Vision Zero annual reports for
     2020 and 2021 were downloaded by the editor's fetch tool, archived by
     the coordinator and read in full; neither states fault by party for
     cyclists. The City's annual Motor Vehicle Collisions reports for 2015
     to 2018 and the Vulnerable Road User document, which search extracts
     say state a cyclist not-at-fault share, answered HTTP 404 or
     page-not-found at every address identified; the 2019 Vision Zero
     report is behind the meeting portal's browser check; no 2022 to 2025
     annual report was found by search. No document read states the
     share. This is blocker B2 and prerequisite P1; a dead address is not
     evidence of absence.
   - *Exposure.* The bike counter dataset's location list was read from
     the API and separately archived: 62 location descriptions with
     differing date ranges. No document read joins counts to collision
     locations. This is the ground for the risk parks and matches the Sol
     triage reader's reason.
   - *Street Labs.* The Street Labs page and all 24 PDFs it links under
     evaluation or assessment titles were retrieved and archived by the
     coordinator and read by the editor from extracted text. Several
     report before-and-after speed or compliance figures; some report
     feedback only; two are project updates without figures; one is a
     survey notice; none reports pedestrian collisions before and after;
     four carry 2026 index labels that are seasons or months, not
     publication dates. Claim 3's instrument therefore exists in the
     record, and the claim is made definite in the revised brief.
   - *The Downtown Bike Network.* The November 2018 interim report (12
     pages) was retrieved and archived by the coordinator and read in
     full. It holds bicycle counts, survey results and a 311 theme of
     "cyclists riding on sidewalks", no sidewalk count and no collision
     figures, and promises a 2019 road safety review and comprehensive
     report; neither was found by search, which does not show they were
     never published.
   - Web searches were used as leads to City and provincial documents
     only. No figure from a search extract is stated in the brief as a
     fact; where an extract is the only knowledge of a document's
     contents the brief says so and marks the document unread.

5. **Wrote `intake.md` from the capture.** Each of the ten comments that
   carry a wording is quoted whole with its index, time and parent. Nine
   more that bear on sidewalks, safety or fault and sit under other
   questions or under no claim are also quoted: six whole ([12], [14],
   [185], [276], [391], [539]) and three as marked excerpts ([193],
   [270], [448]), the rest of each being about road funding, cost or
   taxes. Quotations were transcribed from the capture records as read;
   the coordinator later matched every whole quotation and all thirteen
   registered wordings against `comments.jsonl` by script, and they
   match.

6. **Drafted `brief.md`, then revised it.** The first draft proposed one
   claim for the panel outright and two subject to prerequisites with
   fallback parks, five for parking at framing. The revised brief, after
   the second source pass, proposes two claims for the panel (the legal
   claim, which cannot be submitted until blocker B1 is met, and the
   Street Labs claim, whose instrument is now read), one claim for the
   panel only if its instrument is located (the fault claim, prerequisite
   P1, with its fallback park), and the same five parks. After the third
   pass (step 8) the fault claim became a proposed park of its own, so
   the brief now proposes two panel claims and six parked claims under
   five parks. The reasoning is below.

7. **Validated: not run by the editor.** This session had no shell.
   `npm run validate`, `npm test`, the build and the audits are the
   coordinator's to run; the first draft and the first correction batch
   passed them (see "Checks" below).

8. **Third source pass and dispositions.** After the second revision the
   coordinator ran one bounded official-source pass (18:45 to 18:51 UTC)
   with no retry of any denied address; every request, outcome and hash
   is in `source-note.md` under "Third pass". The editor read: Bylaw
   20700 in the City's consolidation of 2026-05-19, linked from the
   City's own explainer page (Part I definitions, Part XIV sections 77 to
   82, Part XVI sections 95 to 97, the amendment list); the King's
   Printer's regulations index subsisting 2026-09-30 for the AR 304/2002
   entry; the City's bylaw index data for the 5590 and 20700 entries; the
   2026-01-19 committee minutes for Bylaw 21283; the 2026-10-06 Council
   agenda listing for Bylaw 21502; the explainer page; the Vision Zero
   2019 annual report in full and the 2016 to 2018 reports in their
   cyclist passages. The catalogue queries, the Safe Streets map
   configurations, the enforcement pages and the 2025 enforcement report
   were screened by the coordinator and are recorded as screened, not
   read. The old enforcement dashboard redirected to a login page and was
   not read; the signed Bylaw 21502 and its report answered HTTP 403 and
   were not retried. Dispositions: B1 resolved with a stated chronology
   limit; P4 resolved with stated limits; B2 resolved by converting the
   fault claim to a proposed park on the bounded search, with its ladder
   held. The revised brief states each disposition and its limit in the
   editor's own words.

## Editorial decisions in the draft, and why

These are Stew's, made before any framing check, and the checker may
reject any of them.

**The brief says in its first section that it does not answer either half
of the registered question at the level people ask it.** Whether lanes
make cycling safer is a risk comparison; the City's own two analyses say
the comparison needs rider counts the City does not have. Where cyclists
actually ride, as the commenters mean it, needs an observational count
that no record read for this draft holds; the one City document found
that mentions sidewalk riding records it as a 311 complaint theme. Both
halves are proposed for parking with the instrument named and the search
bounded, and the page, if one is ever published, leads with the parks.
Under D-0040 the question stays unanswered whatever the panel finds on
the remaining claims.

**Two claims go to the panel.** `cyclists-have-right-to-the-road` names
instruments that exist and are dated: the statute, the regulation and
the two bylaws, all archived and read. Both verdict directions are
reachable on the texts (a rule requiring lane or sidewalk use would reach
Partially supported or Contradicted), and the thread argues both sides of
where a cyclist belongs, so a verdict tells both camps something. The
strict reading of "the same legal right" is the required alternative.
The Public Spaces Bylaw is read in a consolidation dated 2026-05-19;
whether anything took effect between that date and 2026-08-27 is not
established, and the brief says so and has the reviewer check the index.
`street-labs-no-safety-value`: the 24 evaluation and assessment documents
linked from the City's Street Labs page are archived and read, and the
brief fixes a window from the documents' own dates because the page as
retrieved does not establish what was published by 2026-08-27; the claim
is checkable in both directions on what the documents report, with the
direct measure (pedestrian collisions) as the required alternative.

**The fault claim is proposed for parking, not declared absent.**
`bike-collision-fault-share`: the search named under the earlier P1 was
completed within stated bounds and located no City publication stating
fault by party for bicycle collisions. The editor does not treat that as
proof none exists: the 2015 to 2018 Motor Vehicle Collisions reports that
search extracts say contain the share are unread at dead addresses, and
the old enforcement dashboard is behind a login. So the claim is proposed
as park 5 with the search's bounds and a reopening condition, and its
full ladder is held in the brief for that case. All-mode fault shares in
the City's analyses are named as background only and not substituted for
the bicycle denominator.

**The other five claims are proposed for parking under four parks, three
for the lanes and two against.**

- `lanes-keep-riders-out-of-traffic` and `bike-lanes-dont-improve-safety`
  are one question from two sides and are parked together on the
  exposure ground the City itself states. Testing "most severe cycling
  crashes happened where there was no facility" would grade a cousin the
  City has already published with a caveat.
- `cyclists-ride-on-sidewalks`: three observations, no count; the rule is
  reported under claim 1, the behaviour is parked. The per-claim triage
  had parked it.
- `downtown-network-safe-family-route`: its safety judgement is park 1
  for one corridor; its route-continuity fact belongs to
  `network-connections`, which is named rather than tested here.
- `cyclists-harassed-on-roads-without-lanes`: both per-claim readers
  declined it and the register preserves that; the editor agrees and
  proposes it not go to the panel. The `prior_triage` note is quoted in
  `intake.md` and left unchanged on the register.

**The Sol reader's park was adopted for the claims it fits and not for
the group.** The register records the readers' split. The brief says the
editor agrees with the Sol reason for the risk claims and disagrees that
nothing in the group is checkable.

**No verdict, share or evaluation result is stated in the brief.** Where
a City document publishes a share (facility type, driver error,
cyclist-error counts), the brief names the quantity and not its value.

## Register entries proposed, not applied

No row in `intake/register.yaml` has changed. If the brief freezes as
drafted after the prerequisites are met, the changes would be:

- Question row: `lifecycle: briefed`, with a `reason` and `note` describing
  the frozen brief, its two panel claims and its five parks covering six
  claims.
- Each parked claim: `triage: park`, `ground: no-instrument`, `parked_at:
  framing`, and a `reason` taken from the brief's numbered park with its
  reopening condition. `cyclists-harassed-on-roads-without-lanes` keeps
  its `prior_triage` block unchanged beside the new fields.
- `downtown-network-safe-family-route`: the same park fields, with a note
  that its route-continuity component is for `network-connections`.

Writing any of this before the framing check has seen the brief would
present a proposal as a decision, so none is written.

## Readiness

The draft is definite and internally consistent with the sources read:
every claim is proposed for the panel or for parking, and no essential
source for a panel claim remains unarchived or unread. The earlier
blockers stand disposed of as follows.

- **B1, resolved with a stated limit.** Public Spaces Bylaw 20700 is
  archived and read in the City's consolidation of 2026-05-19, before the
  as-of date. The bylaw index entry is dated 2026-05-19 but links a file
  whose cover a tool read as consolidated 2026-10-06 (download refused,
  not retried); the next amendment identified, Bylaw 21502, was before
  Council on 2026-10-06, after the as-of date, and its text is unread.
  Whether any amendment took effect between 2026-05-19 and 2026-08-27 is
  not established; the brief states that and has the reviewer check the
  index's amendment listing.
- **B2, resolved by a bounded search and a proposed park.** The search
  covered the data catalogue, the Vision Zero annual reports for 2016 to
  2021, the two City analyses, the current traffic safety and enforcement
  pages and report, and the Safe Streets map configuration; the
  dashboard was not readable; the 2015 to 2018 reports stayed at dead
  addresses. No bicycle fault-by-party publication was located. The claim
  is proposed as park 5; nothing asserts absence.
- **P4, resolved with stated limits.** AR 304/2002: the official
  regulations index to 2026-09-30 ends its amendments at 167/2025. Bylaw
  5590: the bylaw index dates it 2025-05-12 and the 2026-01-19 minutes
  show proposed Bylaw 21283 received for information; not a complete
  Council search and not a check of sign designations.

What remains is mechanical and the coordinator's: the P6 checks
(quotation match against `comments.jsonl`, document quotations against
archived bytes, `npm run validate`, `npm test`, the build, the exposure
and duplication audits, a private-path scan of this directory);
recording the hash of the brief and intake in this record and
`state.yaml`; assembling the package and submitting check 1 through
`scripts/panel/audit-package.sh --provider openai`, installing a report
only if its attempt is admitted. Nothing in this record authorises a
freeze, a panel, a register change or an adopted park; a framing report
may reject any disposition above.

## Sources read and sources only identified

`source-note.md` lists every source by title, address, archive and hash,
whether it was read or only screened, and what it is for, with the
retrieval outcome where a fetch failed. In summary: six of the packet's
ten archived files are read and cited; three King's Printer
consolidations, Bylaws 5590 and 20700, the Vision Zero annual reports
for 2016 to 2021 and the Downtown Bike Network interim report are
archived and read; the Street Labs page and its 24 evaluation and
assessment PDFs are archived and read; the open data requests, the
regulations index, the bylaw index data, two meeting pages and the
explainer page are archived and read for the entries used; the
catalogue queries, map configurations and enforcement report are
archived and screened only; and the documents still unread are the
2015 to 2018 collision reports and the Vulnerable Road User document
(dead addresses), the signed Bylaw 21502 and its report (HTTP 403), the
enforcement dashboard (login page), the City-hosted Traffic Safety Act
copy and the small-vehicle booklet (not fetched), and the 2019 Downtown
Bike Network review and report (not found).

## Runtime and how the draft was made

Drafted and revised in one editorial conversation. The runtime reports
the model as Claude Fable 5.1 (`claude-fable-5-1`), vendor Anthropic, the
model D-0041 assigns to briefs; the requested effort was high. The CLI's
usage metadata also lists `claude-haiku-5-5`, which supports the
session's web search tool and is not a commissioned editorial or reviewer
seat. The session ran on the existing subscription; no API usage was
bought. It had read, search, web search and web fetch tools and no shell;
it ran no script, computed no hash, dispatched no subagent and launched
no reviewer, panel seat or other model session.

Sequence. The first invocation wrote the brief, the intake record, this
record and the source note. A first correction attempt returned two
responses that hit the output limit with no usable edits and was
interrupted by the coordinator; the correction then resumed in smaller
batches. In each batch the editor returned exact replacement text by file
and line range, and the coordinator applied it mechanically after
checking each file's hash and range; no coordinator-written editorial
text was inserted. The editor's fetch tool could not reach
`web.archive.org` and got HTTP 502 from most `edmonton.ca` addresses
while a few downloaded; the cause was not diagnosed. Between batches the
coordinator retrieved the sources listed in `source-note.md` and copied
the editor's successful downloads into the private archive; the editor
read the new sources before revising.

Checks. On the first draft the coordinator ran validation, the test suite
(675 tests, one skipped), the Astro type check, the build, and the
exposure, duplication and sitemap audits, all passing; the exposure and
duplication warning counts match the recorded baseline and none names
this directory. After the first correction batch the coordinator re-ran
the comment, wording and hash checks, which passed. The checks on the
final author edits are the coordinator's to run and had not run when this
record was written.

## What was not done, and why

- No framing package, no launcher run, no reviewer: this stage ends at a
  definite draft proposed for the framing check, by instruction. The
  package, check 1 and any report are the coordinator's next steps and
  had not happened when this record was written; nothing is submitted,
  frozen or adopted.
- No evidence registry entries: ingest follows the framing check, on the
  instruments the brief names for the two proposed panel claims.
- No `state.yaml`: written when the brief is submitted.
- No change to the register, the methodology, prompts, scripts or any
  other file outside this directory. The register's `prior_triage` note
  on the harassment claim is unchanged.

## Coordinator submission pins

Mechanical record added by the OpenAI coordinator after the final Anthropic
consistency correction, before framing check 1. No editorial text above
was rewritten for these pins.

- Brief SHA-256: `8280ccd5cfcd86ddc8dddc53cfe0a59c8749aa528859e94ade9805ddc9b66622`.
- Intake SHA-256: `dedbbffa586feb42fd2d58b8b59316db404b5227257afc635f6dc41340d157f9`.
- These are the exact inputs prepared for check 1; submission and admission
  are recorded separately in `state.yaml`.

## Coordinator pins for framing check 2

Mechanical record after the Opus 5.5 response and verified application.
The earlier submission pins remain the inputs to check 1.

- Revised brief SHA-256: `41f72650dfa666c8e2175bad1833b43df1836d168f75594cb217a37db402c9b1`.
- Intake SHA-256: `dedbbffa586feb42fd2d58b8b59316db404b5227257afc635f6dc41340d157f9`.
- Author response SHA-256: `6ac3f519d06e6a6b730bc7b5bc8c83c27201de917646e8fb347633dceba2ec77`.
- Check 2 package SHA-256: `aabd181a7e251a81d2355b50380375bdc50bc906c0cf70d24ac8ab3ac22c2064`.

The second report and its admission are recorded in `state.yaml`; these
pins do not claim that a report has run or that the brief is frozen.

## Coordinator pins for framing check 3

Mechanical record after the second Opus 5.5 response and verified application.
Both earlier reports and responses remain in the confirmation package.

- Revised brief SHA-256: `80d4b7bb599cb9ca164ffbe6ed7989f8c5ca5bd4d0b0106d5cf8c848e5822dae`.
- Intake SHA-256: `dedbbffa586feb42fd2d58b8b59316db404b5227257afc635f6dc41340d157f9`.
- Author response SHA-256: `5df33108d2a6275af3ee69493288f74f395bd42332ff7117beb1ae9cb6b27645`.
- Check 3 package SHA-256: `80e029d90a6e91d705e65b6a9254f17c37116f011ba804399a4a8ecaa650fc20`.

This is the third ordinary confirmation. Admission and the terminal outcome
are recorded separately in `state.yaml`. These pins do not freeze the brief.

## Coordinator record of the terminal framing outcome

The third ordinary report is admitted and says FRAME OK. It resolved every
earlier finding and raised no new framing finding or defect. This exhausts
the ordinary sequence successfully; no exception or fourth report was used.
Under the framing protocol the exact submitted brief is frozen. Its draft
status text above records the authoring state before this confirmation; no
brief bytes were changed afterward.

- Frozen brief SHA-256: `80d4b7bb599cb9ca164ffbe6ed7989f8c5ca5bd4d0b0106d5cf8c848e5822dae`.
- Full report SHA-256: `14c3408e4d7b62e62cf7bee74291858bfb82b59ec044e3c9486a59d3c9f4e4bc`.
- Report: [framing/check-3.md](framing/check-3.md).
- Public-safe provenance: [framing/check-3-attempt.json](framing/check-3-attempt.json).
- Attempt `bb675afd21539428`, GPT-6 Sol high,
  `codex-captured-read-only-0.163.0`, completed 2026-10-21 19:52:39 UTC.

Canary, structural and both context checks passed. The submitted package
and every input hash match. The installed report is byte-identical to the
retained final response; no credential residue was found. Full private
attempt and author records have separate retention manifests.

This records the framing gate only. The proposed claim parks are not adopted
and the register is unchanged. No full evidence panel, factual finding,
story or publication followed. The current authorized batch stops here.

## Coordinator record of the next authorized stage

The next bounded batch prepares a validated unpublished panel result. The
[Anthropic editor disposition](panel/editor-disposition.md) permits the
one legal-roadway claim to proceed and defers every register park write.
It identifies an unresolved authority question, not a new methodology rule.
The original memo's review-history error and omitted run-stop condition were
returned to Opus; three exact author replacements corrected them before
installation. No frozen brief text was changed.

The three dry-run packages are byte-identical, 85,885 bytes, containing only
the frozen brief, reviewer prompt and schema. The
[preparation record](panel/preparation.json) pins the inputs and models.
No raw intake, framing report, author response, private board material or
peer answer is appended to a blind research package. No source carry is used.

The required seats are Claude Opus 5.5, GPT-6 Sol and GPT-6 Luna, all high.
They use the existing subscription CLIs, with no API-key route, account or
billing change. The launcher canary is the quota probe. Each seat starts
fresh; the editorial conversation is never used as the Claude panel seat.
Seats launch serially to avoid concurrent writes to the shared run manifest.

Claude round 1 began at 20:01:07 UTC as attempt `558562cc7b9607fe`.
Admission and output are pending. Both OpenAI seats are prepared and queued.
A failed essential text or historical-applicability check stops the run; a
reviewer's Not established entry then records failure, not a valid completed
finding. No panel output has been accepted and no park adopted.

## First blind seat and essential-source stop

Claude round 1 completed at 20:07:31 UTC and is admitted, schema-valid and
limited to the one authorized claim. Exact frozen inputs, original packet,
retained response and runner-stamped installation verify. The response is
preserved unchanged apart from the launcher's identity fields in
`round1/claude.json`; `run.yaml` holds its public-safe attempt provenance.

The seat reports Not established because it could not read the essential
City bylaws and confirm their historical applicability. This is a recorded
source failure, not a completed site finding. Retained tool metadata shows
HTTP 200 without an error for both official PDFs, but the reviewer reports
unread compressed text. The two bylaw HTML pages returned 502. No denied
endpoint was retried by the coordinator.

The [Anthropic source-stop disposition](panel/source-stop-disposition.md)
allows the two remaining blind seats to complete this already-authorized
round on the identical packet. It prohibits merge, round 2 and synthesis
while the source stop remains unresolved. A further round cannot be run
merely to create source-carry eligibility. No frozen brief, park or register
was changed. The original attempt and proof copies have a private retention
manifest outside the worktree.


## Terminal source-validity disposition

The [Anthropic ruling](panel/source-validity-disposition.md) stops this run
at round 1, unpublished, with no finding. Opus 5.5 high authored the ruling
and one targeted correction to its recovery wording. The coordinator applied
only those exact replacements; all reviewer answers and frozen inputs remain
unchanged. The ruling withdraws the earlier unsupported statement that the
PDF extraction failure was not transient.

Luna attempt `ee48cd958692b771`, GPT-6 Luna high, completed at
2026-10-21 20:58:04 UTC under `codex-captured-read-only-0.163.0`. Canary,
structure, both context proofs, schema and exact output installation passed
in one attempt. Its package is the original frozen packet. The supported
`--into` option retained its report and manifest in `round1-luna-isolated/`
while Sol's execution remained uncertain; no peer answers or carried text
were supplied. The admission records remain unchanged.

Technical admission is separate from the editor's evidence ruling. Luna's
captured source results failed for the required regulation and both City
bylaws, yet its answer cited them and claimed a carried archive it did not
receive. The editor quarantined that answer as unusable. It does not count
as a direct read or as a recorded two-round source failure. Claude's admitted
source-stop answer remains preserved. Sol attempt `e6d80fc3244d17eb` has
no known terminal exit, final answer or admission record and was not repeated.

Merge, cross-review and synthesis remain blocked. The ruling identifies
conditional recovery under existing carry or outage rules, each requiring
Sol terminal reconciliation and a separate authorized batch. It authorizes
no probe, rerun or methodology change. No park, register row, finding, story
or publication is adopted. Private retention manifests preserve the raw
attempts, source-access audit, author outputs and extraction diagnostics.
