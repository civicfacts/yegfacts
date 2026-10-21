# Run record: cycling-safety

Question: "Do bike lanes make cycling safer in Edmonton, and where do
cyclists actually ride?" Register id `cycling-safety`, source
`yegscoop-2026-08-26`, 8 claims, 10 accounts, 4 for and 6 against.
Methodology v1.43.

Status: **DRAFT, REVISED 2026-10-21. NOT READY FOR THE FRAMING CHECK.**
The brief, the intake record and a source note exist in this directory
and were corrected once after a second source pass the same day. No
framing package has been assembled, no framing report exists, the brief
is not frozen, no panel has run, there is no finding, and no published
story or answer. No claim row or question row on the register has
changed. The brief proposes two claims for the panel (one of them blocked
on an essential text), one claim for the panel only if its instrument is
located, and five claims for parking at framing; every one of those is a
proposal. What must happen before the draft can be submitted is under
"Readiness".

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
   completed the read after a second retrieval pass.** The triage reason
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
   P1, with its fallback park), and the same five parks. The reasoning is
   below.

7. **Validated: not run.** This session had no shell. `npm run validate`,
   `npm test`, the build and the audits were not run by the editor and are
   the coordinator's to run on these files. The files add no registry
   entry, no register change and no site content, so the expected effect
   on validation is none; that expectation is not a result.

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

**One claim goes to the panel once its last essential text is read.**
`cyclists-have-right-to-the-road` names instruments that exist and are
dated: the statute, the regulation and the two bylaws. Both verdict
directions are reachable on the texts (a rule requiring lane or sidewalk
use would reach Partially supported or Contradicted), and the thread
argues both sides of where a cyclist belongs, so a verdict tells both
camps something. The strict reading of "the same legal right" is the
required alternative. The one source-existence problem, the deleted bylaw
sections and their unread replacement, Bylaw 20700 as in force on
2026-08-27, is stated in the brief as an essential source and is blocker
B1; the claim is proposed but not submittable until B1 is met.

**One claim goes to the panel on an instrument now read.**
`street-labs-no-safety-value`: the 24 evaluation and assessment documents
linked from the City's Street Labs page are archived and read, and the
brief fixes a window from the documents' own dates because the page as
retrieved does not establish what was published by 2026-08-27. The claim
is checkable in both directions on what the documents report, with the
direct measure (pedestrian collisions) as the required alternative.

**One claim goes to the panel only if its instrument is located.**
`bike-collision-fault-share`: no document read states fault by party for
bicycle collisions, and every address found for the reports that search
extracts say did is dead or blocked. The brief carries a full ladder for
the case where a publication is located and a fallback park for the case
where the search named under P1 is completed and finds none. That
judgement is deliberately not made yet: a 404 is not a search.

**Five claims are proposed for parking, three for the lanes and two
against.**

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
  the frozen brief, its one to three panel claims and its parks.
- Each parked claim: `triage: park`, `ground: no-instrument`, `parked_at:
  framing`, and a `reason` taken from the brief's numbered park with its
  reopening condition. `cyclists-harassed-on-roads-without-lanes` keeps
  its `prior_triage` block unchanged beside the new fields.
- `downtown-network-safe-family-route`: the same park fields, with a note
  that its route-continuity component is for `network-connections`.

Writing any of this before the framing check has seen the brief would
present a proposal as a decision, so none is written.

## Readiness: what must happen before this draft can be submitted

The draft is internally consistent with the sources read and is not
ready for the admitted framing checker. Two blockers, two checks and the
closing step:

- **B1, Public Spaces Bylaw 20700 as in force on 2026-08-27.** Essential
  to claim 1. The only copy identified is a 43-page consolidation dated
  2026-10-06 at the City's bylaw index, which answered HTTP 403 to
  download and was not retried. Needed: a copy of the bylaw whose text
  can be fixed as of 2026-08-27 (the consolidation in force on that date,
  or the 2026-10-06 consolidation together with the dates of the amending
  bylaws so the as-of text can be derived), archived with its hash and
  read. The ordinary route for a file a fetcher cannot retrieve is a
  person's browser download, as the carried-document rules already use
  for council files; no route that bypasses a refusal is to be used. The
  editor then records every provision on riding a bicycle, e-bike or
  e-scooter on a sidewalk, pathway, bike lane or roadway, restates claim
  1's element E2 if the bylaw holds a lane-use or path-use rule, and
  otherwise leaves E2 as written.
- **B2, the fault-share instrument (prerequisite P1).** Needed: a bounded
  search, recorded here, of (a) the City's current publications pages and
  open data catalogue for any annual collision or Vision Zero report from
  2015 to 2025 under a current address, (b) the 2019 Vision Zero annual
  report on the meeting portal (DocumentId 73451) by the ordinary route
  for portal files, and (c) the Safe Streets map and the automated
  enforcement dashboard the Vision Zero reports name, for any statement
  of fault by party for bicycle collisions and the years it covers. Any
  publication found is archived and read. The editor then decides claim 2
  one way, panel on the ladder or the fallback park with the search's
  bounds stated, and rewrites the claim's section without conditional
  language.
- **P4, amendment checks.** For AR 304/2002 Division 4 and Bylaw 5590,
  check the King's Printer's amendment record and the City's bylaw index
  for any amendment or consolidation between each consolidation date and
  2026-08-27, and record what was found. Unresolved in this draft.
- **P6, mechanical checks after the final author edit.** Quotation match
  against `comments.jsonl`; document quotations against the archived
  bytes; `npm run validate`, `npm test`, the build and the exposure and
  duplication audits; a scan for private paths, credentials or board
  material in this directory.
- **P7, a definite brief.** After B1, B2 and P4 the editor rewrites the
  status block and claim 2's section so that every claim is either sent
  to the panel or parked, records the hash of the submitted brief and
  intake here and in `state.yaml`, and the coordinator assembles the
  package and submits check 1 through
  `scripts/panel/audit-package.sh --provider openai`. A report is
  installed only if its attempt is admitted. Nothing in this record
  authorises a freeze, a panel or a register change.

Resolved by the second source pass and no longer prerequisites: the
Street Lab evaluations (24 documents read), the Downtown Bike Network
interim report (read), and the archiving of the three King's Printer
texts, Bylaw 5590 and the two Vision Zero reports.

## Sources read and sources only identified

`source-note.md` lists every source by title, address, archive and hash,
whether it was read, and what it is for, with the retrieval outcome where
a fetch failed. In summary: six of the packet's ten archived files are
read and cited; three King's Printer consolidations, Bylaw 5590, the two
Vision Zero annual reports and the Downtown Bike Network interim report
are archived and read; the Street Labs page and its 24 evaluation and
assessment PDFs are archived and read; four open data requests are
archived and read; and the documents still unread are Bylaw 20700, the
2015 to 2018 collision reports and the Vulnerable Road User document
(dead addresses), the 2019 Vision Zero report (portal browser check), the
City-hosted Traffic Safety Act copy and the small-vehicle booklet (not
fetched), and the 2019 Downtown Bike Network review and report (not
found).

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
  verified draft with named blockers, by instruction.
- No evidence registry entries: ingest follows B1 and B2, when the
  instruments are settled.
- No `state.yaml`: written when the brief is submitted.
- No change to the register, the methodology, prompts, scripts or any
  other file outside this directory. The register's `prior_triage` note
  on the harassment claim is unchanged.
