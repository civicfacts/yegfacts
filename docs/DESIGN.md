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
6. **Drafting and faithfulness check.** Claude drafts the story and claim files
   from the merged evidence (a fixed, disclosed choice for v1). The other two
   models check the draft against the evidence: every sentence traceable, no
   smuggled claims. All published arithmetic lives in
   `scripts/calcs/<story-slug>.ts`, never done ad hoc in prose.
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
| Claude Fable 5.1 | `claude -p --model claude-fable-5-1 --effort high` |
| GPT-5.6 Sol | `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check` |
| Gemini 3.1 Pro | `agy -p --effort high` |

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

## 7. Launch slate

The site is deployed before it is launched. Launch — meaning promotion — happens
only when all nine stories (fourteen claims) across six topic hubs have
`status: published`, and the verdict spread visibly cuts in multiple political
directions. Stories in `pending-review` never count toward that bar.

Claims are pre-registered here, before any panel runs. Expected findings are
deliberately not recorded in this table or anywhere on the public site: naming a
hypothesis next to a claim prejudges it.

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

Production order is electric buses first, as the end-to-end gate on the whole
workflow, then winter cycling as the gate on comparative evidence and
transferability, then parallel batches. Expected findings are hypotheses; the
panel decides, and whatever it finds is published.

Editorial rule for v1: no named-individual allegations in the launch set.

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
body, metadata, labels and buttons. Interface chrome is square-cornered —
badges, panels, buttons, inputs, tables and rules carry no radius, and the one
exception is 2px on inline code. Two things are circles because the thing
itself is: Stew's avatar wherever it appears, and the verdict dots in the
AI-review matrix. No shadows except the one that lifts a
glossary popover off the text it covers, and no animation beyond
colour transitions on a few controls — the copy button, the outline links. A
finding is a filled badge in its own colour — forest Supported, navy Partially
supported, charcoal Not established, brick Contradicted, gold Mixed — with the
word always printed in full, and a claim list is a run of ledger rows each
carrying a 5px left edge in the same colour, so the verdicts read down one
column. Gold is load-bearing in exactly two places, the ".ca" of the wordmark
on forest and the Mixed badge; it never sets text on a light ground, where it
fails AA. Every page opens with the full-bleed forest masthead, and the home
page extends it with the descriptor, the search field and the helper line.
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
appears it is prominent: 160px on About, 144px on the journal index (96px on a
phone), 112px at the top of a post, 96px beside the support note. It stays a
circle with a hairline rule on the paper ground.
