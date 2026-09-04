# YEGFacts.ca — design

This is the canonical public description of how YEGFacts works: what it
publishes, how a verdict is produced, and what CI guarantees about the
repository. It is written so the repo is self-describing — you should be able
to audit a published finding without asking anyone anything.

Status: v1, 2026-08-31; reconciled with methodology v1.3 on 2026-09-01. Changes
to the method itself are recorded in `methodology/changelog.yaml` and rendered
at `/methodology/changes`.

## 1. What this is

YEGFacts.ca is a non-partisan civic evidence platform for Edmonton, Alberta.
It checks claims about Edmonton civic government against public records, data
and research, and publishes findings with full evidence trails.

AI does the research labour. Authority does not come from the models — it comes
from a public, auditable method: a frozen brief, three independent reviewers, a
deterministic merge, a cross-review round, a published synthesis rule, and a
publication gate that checks every cited source against its archived bytes
before anything is published. Since methodology v1.1 that gate is performed by a
dedicated AI audit pair under a standing delegation from the founder, who
remains accountable for everything published and can revert any publication.
The gate reports are committed with the run, so the check is inspectable rather
than asserted.

The full audit trail — content, evidence registry, prompts, scripts, review
artifacts and edit history — is public at
github.com/civicfacts/yegfacts.

The goal for v1 is a civic tool, not a platform: success is Edmontonians citing
it in real arguments and a journalist using it.

Operator disclosure: YEGFacts is run by Ildar Abdulin, with an interests note
on the About page. Contributions through the support page fund research and
operating costs; contributors get no editorial influence, and every verdict
shows its evidence, model reviews and revision history, so published changes are
inspectable in the public git history.

## 2. Content model

```
TOPICS          broad navigational taxonomy (tags with a hub page)
  ↓
STORIES         coherent civic issues; the main public pages
  ↓         ↓
CLAIMS      COMMITMENTS     testable assertions; stated expected outcomes
  ↓         ↓
EVIDENCE        shared source graph
```

**Stories** (`src/content/stories/<slug>.mdx`, served at `/facts/<slug>`) are
one coherent civic issue each: e-bus procurement, infill and zoning, winter
cycling. The story page carries the reading experience — the verdict on every
claim, the one-line summary, composite paraphrases of the forms the claim takes
in public, the TL;DR, what actually happened, the checked claims, related City
commitments, evidence, the AI review, and article history. Section 10 sets out
the order and why it is that order.

A story has no verdict of its own. Verdicts belong to claims. A story may hold
a single claim; the model stays uniform either way.

**Claims** (`src/content/claims/<id>.yaml`) are the atomic unit: one testable
proposition, its finding, its evidence basis, its panel agreement, the evidence
IDs it rests on, key facts each carrying a mandatory source, limitations, unknowns,
missing evidence, and the path of the review run that produced the verdict.
Claims carry `aliases` — the hostile or colloquial phrasings people actually
search — which become short root-level redirects to the claim's anchor.

A published claim may also carry one of two **dispositions** (methodology
v1.19). Neither deletes anything, neither changes a finding, and both keep every
page at its address. `board_withdrawn` (a date and a reason) is a finding that
stands under a question the site decided was not worth asking: the claim keeps
its page, its finding, its evidence and its history, comes off the findings
board, the home page's count, the findings feed and the search index, and
carries a dated note on its own page and on its question's page saying plainly
that nothing was corrected. `context_for` names another claim on the same
question that this one is the established premise of: it comes off the boards
the same way and renders under that claim on the question's page as background
rather than as a headline finding. The two keep two findings, because one
finding over both would state neither and would label everyone quoted under it
with a verdict about the other. A claim may not carry both dispositions;
`scripts/validate.ts` checks that a `context_for` target is a claim on the same
question and that no two claims name each other. `src/lib/content.ts` is the
single gate — `standsAsFinding()` — so a question whose every claim has left the
board contributes no rows to the boards, the counts or the feed.

**Topics** are a controlled vocabulary of six neutral categories:
transportation, housing-development, city-finances, growth-planning,
climate-environment, downtown. The validator rejects anything else. Topic names
are categories, never conclusions; hostile framings live only in aliases. A
claim may narrow its story's topics but never widen them.

**Evidence** (`evidence/registry/YF-EV-NNNN.yaml`) is one file per source:
metadata, publisher, URL, retrieval date, the sha256 of the archived bytes,
what the source can establish, and rights status. References run one way —
claims and commitments list their evidence IDs; the "Used by" list on an
evidence page is generated at build time and never stored, because two stored
lists drift. IDs are allocated by a single serialized script
(`scripts/evidence-ingest.ts`), never concurrently.

Retention and publication are separate decisions. Every load-bearing source has
its exact bytes retained and hashed. Sources with `redistribution: allowed` are
committed under `evidence/files/` and publicly mirrored. Sources whose rights
are `restricted` or `unclear` are retained in a gitignored `evidence/private/`
archive; the public registry entry still carries the hash, the original URL and
any permitted excerpts. Unclear rights fail closed to private. A hash proves
what a missing file was without republishing it.

**Commitments** (`src/content/commitments/<id>.yaml`) are attributed, sourced
City statements of expected outcome: what was promised, when, by whom, the
measurable claim inside it, and when it becomes assessable. Status ladder:
Recorded → Not yet assessable → Assessable → Assessed, where Assessed links to
a real claim that went through the panel. Recording a promise is transcription
and needs no panel run.

**Changelogs.** Per-story changelogs record material changes with typed entries
(published, updated, correction, verdict-change, verified). The methodology
changelog (`methodology/changelog.yaml`) records changes to prompts, merge or
synthesis rules, the verdict vocabulary, validation rules, or panel composition;
each entry bumps a methodology version, and every review run and claim records
the version that produced it. Each entry also carries a reader-facing
`summary`, `highlights` list, and `links` list. The changes page leads with
those fields as a scannable timeline and keeps the complete `note` available
under a disclosure.

## 3. Verdict vocabulary

Two distinct sets, deliberately.

**Reviewer verdicts** — what a model may output:

| Verdict | Meaning |
|---|---|
| Supported | The evidence affirmatively establishes the proposition. |
| Partially supported | A meaningful part is established; the proposition as stated overreaches or needs qualification. |
| Not established | The evidence does not justify the proposition, including "not enough evidence to tell". |
| Contradicted | The evidence affirmatively points against the proposition. |

**Canonical findings** — what synthesis may produce: those four, plus **Mixed**,
which exists only as the materially-split-panel outcome. A reviewer that
outputs "Mixed" is rejected by the schema.

**Panel agreement** — the canonical second dimension, one of Unanimous,
Adjacent or Split. It is computed from the round-1 multiset alone: Unanimous is
one distinct verdict; Adjacent is two distinct verdicts one step apart on the
S–P–N axis (or N–C, which both refuse the claim); Split is everything else.

Agreement measures the panel, not the world. Each value is published with a
fixed gloss saying so — "All three reviewers reached this verdict
independently. Agreement, not a probability of truth."

Until methodology v1.3 this dimension was a canonical **confidence** (High,
Moderate or Low) derived from the reviewers' own confidences. The word
overclaimed: nothing in the method computes a probability that a claim is true,
and readers reasonably took it as one. Confidence survives where it is honest —
per reviewer, beside the reviewer that gave it, inside the AI review.

There are no TRUE/FALSE labels and no numeric scores. Finding, evidence basis
and panel agreement are separate dimensions and all three are shown.

## 4. How a finding is produced

### Stage 0: intake (methodology v1.15)

The unit of intake is a whole source: a post with all of its comments, an
article, a discussion. Not a claim someone picked out of one. Anyone may submit
a source, and every materially factual claim inside it is extracted and
dispositioned. Nothing is selected for interest at any point, by anyone, which
is the property the rest of §4 rests on.

Captures live in `intake/captures/<slug>/`, extraction and merge artifacts in
`reviews/intake/<slug>/`, and the candidate register in `intake/register.yaml`,
published at `/considered`.

1. **Extraction.** Three cheap seats, one per panel vendor, each read the whole
   thread as rendered by `scripts/intake-render-thread.ts`, under
   `prompts/intake-extract.md`, and list every materially factual claim with a
   verbatim quote and the comment index it came from. Seats do no research, do
   not judge truth, and do not choose.
2. **Quote check.** Before the merge sees them, forms are checked against the
   capture: the quote must be one unbroken run of the comment it cites, and the
   index must exist. Failures are discarded and the discards recorded. A wrong
   quote is a false attribution to a real person, which is worse than a missed
   claim.
3. **Merge.** One strong seat (`prompts/intake-merge.md`) folds the three lists
   into propositions and carries every surviving form onto the proposition it
   belongs to.
4. **Coverage check.** `scripts/intake-coverage.ts` exits non-zero unless every
   extractor claim id from every seat is accounted for exactly once: under some
   proposition's `from`, or in `dropped` with one of three permitted reasons
   (not a claim, duplicate quote, not about Edmonton civic government). This is
   the guarantee the arrangement exists to provide.
5. **Triage.** `prompts/intake-triage-batch.md` goes to two readers, both from
   a different vendor than the editor, neither seeing the other. Each rules on
   every proposition in one batch, GO, PARK or NO, with a reason written for a
   reader. They combine so that GO takes both, or one GO and one PARK; NO takes
   both; everything else parks, a GO set against a NO included. Throwing out a
   real claim costs the reader more than holding one too long, which is the
   lean D-0011 takes on verdicts, applied to selection. Only a GO reaches stage
   1 below, and where the readers split the published reason says so.

Three rules hang off this:

- **No invented claims.** A wording the editor or the founder proposed is
  registered with `origin: editor` and held at PARK until a captured form of it
  exists in a real source. Registered wording is not captured wording, and only
  captured wording goes to a panel.
- **Named individuals.** A proposition accusing an identifiable person of
  wrongdoing, dishonesty or an improper motive is extracted like any other, so
  it is counted rather than hidden, and flagged `names_person` at the merge.
  Triage declines it under one standing public reason: checking what one person
  says about another needs a way for that person to answer, and v1 builds none.
  `/considered` keeps the row, its outcome and its reason and prints neither
  the accusation nor the name. The id is neutral too, because a slug is
  published as surely as a paragraph. The wording and the comments go to the
  private board record so the decision stays auditable.
  What an office-holder did in office is not in this class. A motion brought, a
  vote cast, a lane built: council minutes settle those, the site names
  office-holders when it reports them, and those claims are triaged on the
  ordinary tests. Withholding follows a decline, not the presence of a name.
- **Pseudonyms.** Commenters are replaced by a stable "Adjective + Edmonton
  animal + initial" label ("Snowy Hare F.") derived from a hash of the name, so
  a re-export of the same source yields the same labels. Magpie is excluded, it
  being Stew's bird. Public office-holders keep their names. The mapping from
  label to name is held privately and is never committed. Quotes stay verbatim,
  so a person who commented can find their own words on the site.

Run once, on one source. Nothing has yet shown the triage step to be
reproducible on a re-read of the same proposition list; that is open in the
board record.

### The seven stages

Seven stages per story. One run covers all of a story's claims. State lives in
`reviews/<story-slug>/state.yaml` so any session can resume where the last one
stopped.

1. **Framing.** The story's scope and the exact claims inside it. The brief
   OPERATIONALIZES each claim before any model runs: precise definitions (what
   counts as "lost", gross vs net, whose money), the as-of date that closes the
   accounting window, and any calculation the verdict depends on. The brief is
   frozen before round 1, so the framing cannot be adjusted once the findings
   arrive.
2. **Blind research round.** Three models independently receive the identical
   package — brief, `prompts/reviewer.md`, and the required output schema
   `prompts/review-schema.json`. Each runs in a fresh `mktemp -d` working
   directory containing only that package; no repo path is passed, so no
   reviewer can see the others' work, the published content, or the pipeline.
   Web research is allowed and expected. Output is validated against the schema
   with exactly one retry.
3. **Evidence staging, then deterministic merge.** Split in two because network
   work is not deterministic. Staging fetches the cited URLs, hashes them and
   snapshots them; a failed fetch is recorded, not fatal. The merge
   (`scripts/merge.ts`) uses no model and no network: it validates the JSON,
   dedupes sources by normalised URL, and writes `combined-evidence.json` and
   `disagreements.json`. Accepted sources enter the registry through a
   deliberate ingest step; the merge never auto-mutates published content.
4. **Cross-review round.** Each model receives the combined evidence and the
   other two reviewers' findings, with one instruction: do not converge for
   consensus. Find what you missed, find their errors, issue your final
   position. This is an error-documentation round, not a second vote: since
   methodology v1.3 it cannot move a canonical finding. Every final position is
   recorded in `synthesis.json` as `round2_positions` and rendered, so dissent
   and movement stay visible. A material catch here — a fabricated citation,
   wrong evidence — triggers a fresh blind re-run of the affected claim rather
   than a quiet correction inside the same run.
5. **Deterministic synthesis.** A script computes the canonical finding from an
   explicit lookup matrix over the multiset of the three **round-1** reviewer
   verdicts (§5 below). Round 1 is the only round in which the three reviewers
   are independent; in round 2 each has read the other two, so a round-2
   multiset is no longer three independent readings of the record. Model
   identity never affects the result. Adopting the round-1 basis changed no
   published finding: both multisets resolve identically on all six published
   claims.
6. **Drafting, faithfulness check and plain-speech read.** Claude drafts the
   story and claim files from the merged evidence (a fixed, disclosed choice for
   v1). The other two models check the draft against the evidence: every
   sentence traceable, no smuggled claims. All published arithmetic lives in
   `scripts/calcs/<story-slug>.ts`, never done ad hoc in prose.
   Beside that check and in the same shape, a model from a different vendor than
   the one that drafted reads the answers under `prompts/plain-speech-read.md`
   (methodology v1.18): would a person say this out loud, does it make sense to
   somebody who has not seen the question, is every fact carried by the key
   facts, and has anything true been dropped rather than moved down. It must
   account for every substantive clause as kept, moved to the explanation, split
   into another claim, or dropped with a written reason, which is the control
   that stops §12 becoming the rule that deletes true content. The faithfulness
   check asks whether the words are true to the evidence; this one asks whether
   a person would say them. Its report is committed with the run at
   `<run>/plain-speech/<seat>-<n>.md`, every published claim names the file in
   `plain_speech_read`, and `scripts/validate.ts` checks that the file is there,
   so a claim that cannot name its read does not publish.
7. **Publication gate.** A dedicated audit — separate from the models that
   produced the draft — verifies every statement of fact in the final claims
   against the archived bytes of its cited sources, not a sample and not the
   live web, and release-checks the raw review artifacts for personal
   information and anything else unsuitable for public release. Both reports
   are committed with the run under `gate/`. Since methodology v1.1 the gate is
   performed by an AI audit pair under a standing delegation from the founder,
   who remains accountable for everything published and can revert any
   publication; the founder edits the prose and merges. No publish path skips
   the gate. A story may be deployed in `pending-review` status with a visible
   banner before it; `published` requires it.

Pinned reviewer commands (methodology v1.6, 2026-09-01; `scripts/panel/run-reviewer.sh`):

| Panel seat | Command |
|---|---|
| Claude Opus 5 | `claude -p --model opus --effort high` (v1.15; Fable 5.1 before that, pinned in v1.5 and given its effort setting in v1.6). The move is a cost decision, not a judgement about review quality: the founder's Fable allowance on his subscription is nearly exhausted. Runs already published under Fable 5.1 keep the model their manifests record. |
| GPT-5.6 Sol | `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check` |
| Gemini 3.1 Pro | `agy --effort high --sandbox --dangerously-skip-permissions --print-timeout 45m -p` (v1.14; before that without the permissions flag, which made the headless seat return nothing on PDF-heavy briefs) |

Every seat runs at its vendor's `high` reasoning setting — the highest level the
three CLIs share, since `agy` stops there — and the runner records it in
`run.yaml`. Claude and Codex offer settings above `high` (`xhigh`, `max`). They
are not used: in the founder's experience they cost significantly more and run
longer without a matching gain, and no benchmark of that trade-off exists here.

Bit-exact reproduction of a subscription-CLI model is not possible. Each run
therefore writes a `run.yaml` manifest recording the resolved CLI version, model
ID, seat name, reasoning effort, prompt hash, methodology version and timestamps — so the
method is rerunnable and what ran is on the record.

## 5. The synthesis matrix

Three reviewers, four verdicts, so exactly 20 unordered combinations. Every one
is written out in `scripts/synthesis-matrix.ts`; the table is the rule. The
input is the **round-1** multiset. `S` = Supported, `P` = Partially supported,
`N` = Not established, `C` = Contradicted.

| Panel | Canonical finding | Panel agreement |
|---|---|---|
| S S S | Supported | Unanimous |
| P P P | Partially supported | Unanimous |
| N N N | Not established | Unanimous |
| C C C | Contradicted | Unanimous |
| S S P | Partially supported | Adjacent |
| S P P | Partially supported | Adjacent |
| P P N | Partially supported | Adjacent |
| P N N | Not established | Adjacent |
| N N C | Not established | Adjacent |
| N C C | Contradicted | Adjacent |
| S S N | Partially supported | Split |
| S N N | Not established | Split |
| S P N | Partially supported | Split |
| S S C | Mixed | Split |
| S P C | Mixed | Split |
| S N C | Mixed | Split |
| S C C | Mixed | Split |
| P P C | Mixed | Split |
| P N C | Mixed | Split |
| P C C | Mixed | Split |

Three rules produce that table:

1. A unanimous panel returns its verdict.
2. A panel where Supported and Contradicted both appear is Mixed, always. One
   reviewer read the record as establishing the claim and another read it as
   establishing the opposite; that disagreement is displayed, not averaged.
3. Otherwise the panel leans to the more cautious side of its majority.
   Neighbouring verdicts resolve to the weaker of the pair; a panel spread
   across non-adjacent verdicts resolves cautiously; and a partial-support
   majority facing affirmative counter-evidence is Mixed rather than resolved.
   No row ever resolves past the most cautious verdict actually cast.

**Why rule 3 leans cautious** (published rationale, methodology v1.3). Supported
means the proposition as written is affirmatively established, which is a strong
statement. A qualification identified by one reviewer does not stop existing
because two others missed it, and for a fact-checking site overclaiming is the
costlier error — it is the failure that destroys the thing the site exists to
be. The objection that this hands one reviewer a veto is answered by disclosure
rather than by averaging: the vote composition is always displayed, so a reader
who thinks the lone qualifier was wrong can see exactly that and weigh it.

Synthesis is defined for exactly three verdicts. If a reviewer fails to produce
valid output after its retry, the run halts before synthesis rather than
proceeding on two.

## 6. What CI guarantees

Every push and pull request runs `npm run validate`, the exposure audit,
`npm test`, `npx astro check`, the full Astro build, and the duplication
audit. A content error, a type error, a build error and a duplication finding
are all merge blockers. `main` is protected and requires the `check` job to
pass before a merge.

Cloudflare Pages builds every branch. `main` is production, served at
yegfacts.ca; any other branch gets a preview build at
`<branch>.yegfacts.pages.dev`, which carries `noindex` and a preview banner so
it is never mistaken for the published site. The manual `npm run deploy` path
is retired — production now deploys when a PR merges to `main`. Sessions work
one-branch-one-worktree-one-PR.

`scripts/validate.ts` enforces, across the whole repository:

- every `key_fact` has a `source` that resolves to an evidence registry entry;
- every claim's parent story exists AND lists that claim back;
- every referenced evidence and commitment ID exists;
- every topic tag is in the vocabulary, and a claim's topics are a subset of its
  story's;
- every public evidence entry has an archived file whose bytes hash to the
  recorded sha256 — private entries are checked structurally here and by a
  founder-run local script for bytes;
- rights that are not `allowed` cannot be published publicly;
- evidence records store no back-references, because "Used by" is generated;
- all dates are ISO-8601 with `as_of` ≤ `last_verified` < `review_by`;
- a published story carries a `published` changelog entry, at least one claim,
  and its TL;DR;
- `one_line` is at most 30 words and contains no em or en dash, because it has
  to read as one sentence under the title and in every share card;
- committed panel output conforms to `prompts/review-schema.json`, and a
  published claim's review run exists and carries its `run.yaml` manifest.

`npm test` proves the synthesis matrix covers all 20 verdict multisets, that all
64 ordered triples give the identical result as their multiset (so which model
sat in which seat cannot change a finding), that panel agreement is a pure
function of the multiset and no row resolves past the panel's most cautious
verdict, and that a reviewer JSON containing "Mixed" is rejected.

Two spec rules are enforced in CI against the PR diff rather than the working
tree: a change to a claim's finding or panel agreement requires a story
changelog entry, and a change under `prompts/`, `scripts/merge*`, `scripts/synthesize*`
or `methodology/` requires a methodology changelog entry.

## 7. Launch slate (dropped 2026-09-03, D-0027)

The slate is no longer part of the method. The record of it is kept here, table
included, because a pre-registration that vanishes without a trace is worth less
than one that was never made.

What it was. Nine stories, fourteen claims, six topic hubs, written down in this
document before the first panel ran. Promotion of the site was to wait until
every one of them carried `status: published` and the verdict spread visibly cut
in multiple political directions; `pending-review` never counted toward it.
Expected findings were deliberately left out of the table and off the public
site, because naming a hypothesis next to a claim prejudges it.

What it was for. One charge, and one only: that the site tests what suits it. A
set named in advance cannot be trimmed to the results it turns out to produce.

Why it went. Whole-source intake (v1.15, v1.16) meets that charge on every
source instead of once at the outset, and prints the disposition of everything
it declines. And under v1.15 a wording written here is not a captured form, so
no row below could reach a panel until somebody was shown saying it; two of them
are parked on `/considered` for exactly that reason. A bar the method forbids
the site to clear is worse than no bar.

What replaces it as a promotion gate: nothing yet. Timing is an open question in
the board record, not a rule in this document.

| Story | Topics | Pre-registered claims |
|---|---|---|
| Electric buses | transportation, city-finances, climate-environment | Procurement failed as contracted; Edmonton lost $82M; the failure proves e-buses do not work in cold cities |
| Climate targets | climate-environment | The City is on track for its climate targets |
| 15-minute districts | growth-planning | District plans restrict where residents can travel |
| Active transportation investment | transportation, city-finances | Edmonton spends $100M a year on bike lanes; the active-transportation network has reduced congestion |
| Parking reform | housing-development, transportation | Edmonton banned parking / new buildings provide none; removing parking minimums made housing more affordable |
| Winter cycling | transportation | Edmonton is too cold for cycling to work as transportation |
| Infill & zoning | housing-development, growth-planning | 8-plexes can be built on every lot; sewer capacity is not checked before infill approval |
| Vision Zero | transportation | Edmonton is making steady progress toward Vision Zero |
| Downtown | downtown, city-finances | Downtown is dead and nobody goes there any more |

Production order was electric buses first, as the end-to-end gate on the whole
workflow, then winter cycling as the gate on comparative evidence and
transferability, then parallel batches. The stories that ran under that order
before the slate came off keep their pages and their findings; nothing in this
section touches them.

Editorial rule for v1, unaffected by the above: no allegations about named
individuals.

## 8. Stack

Astro, TypeScript (strict), MDX, Tailwind, Pagefind, GitHub Actions, Cloudflare
Pages. Light theme only. No database. Content history is `git log --
src/content/`.

## 9. Deferred

Not in v1, listed so the absence is deliberate rather than an oversight.

Built when the trigger appears: an evidence-request agent and mailbox
automation (until then, emails are sent and recorded by hand); a
privacy/redaction pipeline and real screenshots; R2 storage (trigger: repo size
actually hurts); source-change monitoring and scheduled re-reviews; a
suggestions Worker with Turnstile (trigger: launch traffic — until then, CTAs
are mailto and prefilled GitHub issue links); per-story Satori OG images and
Vega-Lite charts (trigger: a story that needs them); a suggestion voting page
(GitHub issues are the backlog); automated claim clustering; interactive
calculators.

Deliberately v2: an integrity/corruption claim ladder, risk classes,
right-of-reply and referral packages; memberships, Pro tiers or an API beyond
the support page; extracting the engine from the site and splitting the repo; a
second city; a nonprofit spin-out; a newsletter and active social accounts.

## 10. How a story page reads

The visual system is the broadsheet ledger, locked and light-only: paper
#F7F5F0, ink #1C2124, muted #5A6166, hairline rules #CFC9BD, forest #123F35,
navy #123B5D, gold #C3A35E, brick #8A2F22 and charcoal #4A5258. Newsreader
sets the wordmark, headings, questions and slate quotes; Libre Franklin sets
body, metadata, labels and buttons. Badges, tiles, panels, tables and rules are
square-cornered; an interactive control — a filter chip, a button, a field, the
copy button, the Pagefind search UI — carries a 3px radius (`--radius-control`),
and inline code keeps its 2px. Two things are circles because the thing
itself is: Stew's avatar wherever it appears, and the verdict dots in the
AI-review matrix. White panels (`.panel`, `.strip`) and the home page's search
field carry one soft shadow (`--shadow-panel`), the glossary popover keeps its
own, and nothing else on the site has one; the gold rule under the current nav
word is drawn with an inset box-shadow, but it is a rule, not depth. The strip
is boxed by hairlines on all four sides, because with the shadow alone its
outline read fainter than the dividers between its own cells. Motion is 150ms transitions of
colour, background, border, underline colour, underline thickness, opacity
(the nav's 82% to full) and the search glyph's stroke, on links and on the controls that change
on hover (the chips, the buttons, the outline), and nothing else; under
`prefers-reduced-motion` even those are off. A
finding is a filled badge in its own colour — forest Supported, navy Partially
supported, charcoal Not established, brick Contradicted, gold Mixed — with the
word always printed in full, and a claim list is a run of ledger rows each
carrying a 5px left edge in the same colour, so the verdicts read down one
column. Gold is load-bearing in exactly four places: the ".ca" of the wordmark
on forest, the Mixed badge, the 2px bar under the current item in the masthead
nav, and the footer's column labels. All four sit on forest or fill a badge;
gold never sets text on a light ground, where it fails AA. Every page opens with
the full-bleed forest masthead, and the home page extends it with the
descriptor, the search field and the helper line.

The **forest nav** — `.forest-nav`, used by the masthead row and by the footer's
link columns — is set in sentence case, in paper held to 82% opacity, with no
underline. The page a reader is on comes to full opacity and takes the gold bar,
drawn as a rule inside the link's own box so the row is the same height on every
page; the search glyph beside it carries the same bar on /search. Footer links
carry no `aria-current`, so the bar is a masthead mark in practice.

There are **two link treatments, and one rule that picks between them**. A link
inside running text is underlined at rest, in navy, because nothing else in a
paragraph marks it: that is `.link`. A link that is a headline, or a list item's
title, is navy with no underline until it is hovered or focused: that is
`.link-title`, because the size and position of a headline already say it is the
thing to click, and a page of underlined headlines reads as ruled paper. Stew's
brighter blue mirrors both, `.link-stew` and `.link-title-stew`, in the blocks
where he is the one speaking.

The **home page's search field** is set in the display face, and its placeholder
is a question this site has actually checked rather than an example of one. Three
counts read out of the record at build time, questions registered, claims
checked and sources archived, sit beside the deck from `lg` up and under it on
a phone, above the search field.

The **pre-launch notice** is a single gold line with an ink hairline under it,
not a band with a brick edge. The **footer** is a forest block that bookends the
masthead: the same ground, the same container, the compact wordmark and the
site's descriptor sentence at its head on one baseline, then gold column labels
over three `.forest-nav` link lists, then the colophon in paper — who builds the
site, what it is, and the commit this build came from. Nothing muted-grey and no
navy survives on that ground; colophon links are running text, so they are
underlined, in paper.

Hierarchy still comes from type rather than decoration: a section heading is a
heading — on the home page's front page each one sits above a 3px ink rule —
and the 11px uppercase label is reserved for metadata — dates, "Limitations",
the sub-labels inside a claim.

This supersedes the earlier rule that a finding is carried by the word and never
by a badge, and that colour is a whisper (founder decision, 2026-09-01). The
page as built under that rule was judged too bland, and the verdict — the thing
the site exists to publish — did not scan as a column: a reader had to read
every row to find out what had been found. The word is not weakened by the
change; it is still printed in full, never abbreviated to a colour, because
"Not established" says something no tile can.

Order, top to bottom: topics, title, verdict strip, one-line summary, dates,
"Common forms of the claim", TL;DR, what actually happened, claims checked, what
the City promised, Edmonton evidence, comparable cities, what remains unknown,
missing evidence, AI review, article history. It reads as what people say, then
the facts, then the story, then the verdict detail.

The **verdict strip** sits directly under the h1, because the findings are the
product and they used to arrive at section four — two or three screens down on a
phone. One row per claim: the question, linking to the check that produced it,
and the finding word beside it, legible at 390px without expanding anything.

The **one line** is one sentence, 30 words at most, no em or en dash. It is the
first thing under the strip and the description on every share card, and CI
enforces both limits.

**Method vocabulary is glossed on demand, not restated.** Every finding,
panel-agreement value, "evidence basis" and header date is a popover carrying
one or two sentences and a link to the methodology section that sets the word
out in full. Popovers work on touch and by keyboard, which the `title` tooltips
they replaced did not, and they end the per-claim explanation paragraphs that
printed the same fixed sentence three and four times on one page.

**Body subheads feed the outline.** The `###` headings inside a story body enter
"On this page" as children of "What actually happened", so the rail follows the
narrative instead of pointing at one heading over a thousand words.

A visual (chart, pull quote, timeline, table) must carry a number or a quotation
the text already establishes with a source ID. If it does not, cut it. No
photographs, no stock imagery, no decorative charts.

**Stew's identity.** Stew has two blues, both taken from his avatar: dark
#1F385C and brighter #36639A. They are used only where Stew speaks in the first
person, which is the journal index and post pages, the "Who builds it" block on
About, and the signed note on the support page. On the journal the heading and
the rule carry the colour; on About the h2 stays forest and the blue is the "In
Stew's words" label and his name; on support it is the rule above the note and
the signature. A link inside those blocks takes the brighter blue, and it sits
on paper, never on a tint. Body prose links stay navy everywhere, a journal post
included, so the colour marks the voice rather than the page. Stew's avatar is
never smaller than 96px. It is the only picture the site has, so wherever it
appears it is prominent: 160px on About, 144px on the journal index, 112px at
the top of a post, 96px beside the support note. It stays a circle with a
hairline rule on the paper ground. The markup lives in one place,
`src/components/StewAvatar.astro` (the picture, resized at build time so no
page ships the full PNG) and `StewByline.astro` (the picture beside a paragraph
in his voice); pages pass a size and their own rule. The image files are cropped
inside any ring drawn in the artwork, so the page's rule is the only ring;
`brand/stew-avatar.png` keeps the original with its drawn circle.

## 11. How a journal post reads

The journal is Stew writing about the work, not the record of a check. Its
subject is an AI steward trying to build a system that tells the truth, and
what goes wrong on the way. A post is a short narrative with receipts, not a
postmortem. The shape, loosely:

1. **Hook.** The weird or bad thing that actually happened, in one or two
   sentences, before any machinery.
2. **The scene.** Show the artifact: what the rule kept and what it deleted,
   the claim before the check and after. Lists, not description.
3. **How I got there.** Enough of the system to understand the mistake, no
   more.
4. **How I noticed.** What revealed it.
5. **What changed.** The concrete fix.
6. **What I learned.** One broader point, stated once.
7. **Receipts.** The frontmatter `links`, rendered under that heading: story,
   evidence, rule, audit, commit. One or two links may sit inline where the
   thing is first named; the rest go here so the prose flows.

Frontmatter carries a `summary` (the standfirst, forty words at most) and an
optional `why`, one sentence for a reader who does not care about the
pipeline, rendered as "Why this matters" under the summary.

Voice: curious, dry, concise, willing to admit the mistake, mildly suspicious
of elegant rules. A specific character, not project updates. No jokes for
their own sake.

The avatar follows the post type (`src/lib/stew.ts`). Expressions live in
`src/assets/stew/`, one square PNG each, named for the face (oops, pleading,
ashamed, pleased, thoughtful, dejected, sheepish, concerned, worried): a
`mistake` post shows `oops.png`, `method` shows `thoughtful.png`, `building`
shows `pleased.png`; a type without a mapping shows the steward as he appears
on About (`src/assets/stew.png`). On the post the avatar
is the §10 size beside the byline; on the index each entry carries it at 48px
so the expression reads as the post type at a glance. Never artwork. The fact
pages stay institutional; the journal is the one place the character shows.

Length: a post is there to show that mistakes get found and fixed, not to
document them. Under 300 words. The receipts carry the depth.

## 12. Plain speech

The founder, reading the published stories on 2026-09-02: "the language is not
human, nobody speaks the same way that you describe things."

He was right, and the cause was measurable. Five of the six published answers
were exactly thirty words long, against a thirty-word cap. The limit had become
a target: each answer crammed a whole finding set into one breath with colons
and semicolons, because the writer was filling the space rather than answering
the question. The rule meant to keep answers short was producing the densest
prose on the site.

So the cap goes, and what replaces it is stated per field below. Three outside
readers (GPT-5.6 Sol, Gemini 3.1 Pro, Claude Haiku 4.5) worked the same brief
independently; where this section is sharper than what the editor would have
written alone, it is because one of them found something.

### What the writing has to do

1. **Answer first.** The answer arrives in the first clause, before evidence,
   source or qualification.
2. **Say the finding, do not imply it.** A reader must never have to work out
   whether a claim held up. "Edmonton is not on track" states it. "The latest
   inventory sits above its trajectory" makes the reader do the work.
3. **Stand alone.** Somebody arrives from a search result having never seen the
   question. The answer has to make sense to them on its own.
4. **One sentence, one idea.** Three findings is three sentences or three
   claims, never one sentence with semicolons.
5. **Name who did it.** The City decided, Council voted, the contractor
   delivered late. Not "an amendment was carried", not "the price gap is Not
   established".
6. **Words people use.** No method vocabulary in reader-facing text where a
   plain word exists.
7. **Sayable out loud.** If nobody would say it to another person, rewrite it.
8. **Confident where the evidence is, plainly uncertain where it is not.** The
   uncertainty is stated, never smuggled in as hedging.
9. **Do not waste time.** No restating the question, no method explanation
   inside the answer, nothing the reader already knows.
10. **Numbers as people say them.** "About $2 billion", not "$1,946,000
    thousands". The exact figure belongs in the explanation and the record.
11. **No cap that becomes a target.** A limit every instance sits on is
    generating the failure rather than preventing it. If a new limit starts
    collecting instances at its ceiling, it is wrong and it goes.

### The question

The sentence a resident would type into a search box.

- It begins with a question word or an auxiliary: who, what, where, when, why,
  how, is, does, did, can, has.
- It asks one thing. A question that can honestly be answered "yes and no" is
  two questions.
- It can be answered in either direction. "Do the lanes help or hinder
  emergency vehicles" is a question. "Do bike lanes block emergency vehicles"
  is a prompt for the answer we expect.
- No method words: no proposition, materially factual, operationalised, as-of.
- No colon.

### The claim

The assertion as the people making it assert it, in the plainest words that
keep it testable.

- The wording comes from the captured source. It may be made more precise. It
  may never be made weaker, and it may never be made tidier at the cost of what
  its holders meant.
- One assertion. Two joined with "and" are two claims.
- Numbers in the units the speaker used, with the precise form in the record.

### The answer

One sentence, under the claim, and the thing most readers will read.

- **It opens with the plain-speech stance**, not the finding word: Yes. No.
  Partly. Nobody can tell from the record. The finding word is the badge beside
  it and does the method's job; the answer does the human one.
- **No colon, no semicolon, no em dash or en dash.** Hyphens inside ordinary
  compounds are English and stay. What is banned is the punctuation that lets a
  second idea into the sentence. This is the replacement for the word cap, and
  it is the rule doing the real work. Punctuation that lets a second
  idea in is what produced the thirty-word abstracts.
- **One supporting fact at most**, and only if it is the fact that decides the
  answer.
- **Everything else moves down**, into the explanation or into another claim.
  Nothing is deleted. A rule that deletes true content is worse than the prose
  it replaced, which this project learned the hard way when a
  numbers-in-every-bullet rule gutted a story whose key facts were absences in
  a bylaw's text.
- No word limit. If an answer needs twenty-six words to be a sentence a person
  would say, it takes twenty-six.

### The explanation

The article under the question.

- One idea per sentence. If a reader has to go back to parse it, split it.
- Every fact that could change a finding carries its source in the same
  paragraph, linked to the specific document, not to a homepage.
- The site's own reasoning is labelled as the site's. A source's fact, a
  calculation made here, and a conclusion drawn here are three different
  things and must not read as one.
- A qualification sits beside the statement it limits, never later. If a reader
  can meet the unqualified statement first and leave with the wrong
  impression, it is in the wrong place.
- Necessary technical language is defined in ordinary words on first use, then
  used consistently.
- Absence is bounded. Say what was checked, for what place and period, as of
  when. "We did not find it" never becomes "it does not exist".
- Quote only where the exact words matter. Otherwise say it plainly and link.

### What a script checks, and what a reader checks

A script can only see shape, so it checks shape: the answer's punctuation, the
question's opening word and its lack of a colon, the presence of a stance
opener, and a jargon list that warns rather than fails.

Everything else goes to a plain-speech read before publication, by a model from
a different vendor than the one that drafted, in the same shape as the
faithfulness check. It answers three questions. Would a person say this out
loud. Does the answer make sense to someone who has not seen the question. Has
anything true been deleted rather than moved. The last one is the important
one: the reader has to account for every substantive clause in the draft as
kept, moved to the explanation, split into another claim, or dropped with a
written reason.

The read is a stage, not a habit, because a prompt nobody is obliged to run is
documentation. It has a prompt (`prompts/plain-speech-read.md`), a committed
artifact beside the run's faithfulness reports
(`<run>/plain-speech/<seat>-<n>.md`), and a field on every published claim
naming that file (`plain_speech_read`), which the validator checks is really on
disk. §4 stage 6 has the sequence. The vendor rule cannot be enforced by a
schema, so it is written into the prompt in the imperative and both seats are
named in the report header, where a breach is visible to anyone reading it.

The standard was not written and then applied. The site's own editor drafted ten
answers under it first, and the reading seat rewrote nine of them.

No script rewrites prose. A build rule that silently removes a sentence
recreates the failure this section exists because of.

### Stew's note

Stew, the AI steward, writes in the first person in the journal. That works,
and the founder asked whether it belongs on the pages that carry findings too.

It does, in one narrow form, and the restriction is not squeamishness. A
finding is produced by three independent models and a fixed table precisely so
that no single author's judgement decides it. A first-person aside beside the
finding hands a hostile reader the one accusation the whole method exists to
deny: that the answer has an author with a view.

So a finding page may carry a clearly labelled **Stew's note**, placed after the
evidence and the sources, never beside the finding. It covers editorial acts and
nothing else: why this question was checked, what changed on the page, what was
corrected, what surprised the editor about the process. It says in its own words
that it did not decide the finding.

It never says "I think" or "I believe". It never praises, mocks or speculates
about anyone who made a claim. It never introduces evidence or a qualification a
reader needs in order to understand the finding, because anything load-bearing
belongs in the explanation where it can be checked. It never tells a reader what
to conclude.

The avatar follows the same rule. An expression that celebrates or regrets a
finding editorialises it without a word, so the expression reflects the note's
own subject, never the outcome. Pull quotes on a finding page come from the
sources, not from Stew.

The journal remains where the personality lives. A finding page can sound like
a person wrote it without pretending a person decided it.
