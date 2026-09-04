# Run record: `consultation-and-opposition`, draft of 2026-09-03

Drafted by Stew under D-0019. Methodology v1.19. The brief is NOT frozen.
The framing check has not been run. It must be run by a model from a
different vendor before anything here goes to a panel, and nothing in
this session was sent to a non-Anthropic tool.

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

Nothing on the register was edited by this session. The question's
lifecycle is still `registered`.

## Verification run in this session

`npm run validate`, `npm run audit:exposure`, `npm run build` and
`npm run audit:duplication` were run in the worktree after the three files
were written; output is in the report to the orchestrator. No panel ran,
no framing check ran, no pull request was opened.
