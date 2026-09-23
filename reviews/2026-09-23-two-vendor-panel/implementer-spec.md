# Task: the site says what the panel now is (methodology v1.37)

Repository: the git worktree you are running in (branch two-vendor-panel). Read
`methodology/changelog.yaml` entries v1.37 and v1.38 and `docs/DESIGN.md`
section 4 first; they are the rule, already written and committed. Do not edit
either file, or anything under `scripts/panel/`, `prompts/`, `methodology/`,
`reviews/`, `intake/`.

## Outcome

Every place the site describes the current panel says three model seats from
two vendors, and every published finding shows the panel that actually produced
it. Historical findings keep the label of the method that produced them.

## The adopted wording (use it, do not paraphrase the substance)

Current panel: "Three AI model seats from two vendors: one Anthropic model and
two OpenAI models. The two OpenAI seats are not independent of each other, so
three agreeing verdicts are not three independent confirmations." Panel
agreement (Unanimous, Adjacent, Split) describes seats, not vendors. Triage:
"two OpenAI readers from one vendor".

Historical (runs frozen before 2026-09-23): "three AI models from three
vendors (Claude, GPT, Gemini)" stays wherever it describes a specific past run.

## Requirements

1. Per-finding panel label. A claim file names its run in `review_run`
   (e.g. `reviews/cycling-volumes/2026-09-03`). That run's `run.yaml` lists
   `runs[]` with `provider`, `seat`, `model_id`, `round`. At build time, derive
   for each claim the round-1 seats (provider and seat name) and the vendor
   count. Show it where the finding's provenance line is: in
   `src/components/ClaimFinding.astro` (line ~100, "Verdict by a three-model AI
   panel") and `src/pages/questions/[id].astro` (line ~339, "Verdicts by a
   three-model AI panel"). The label reads, for three vendors: "three-model AI
   panel (Claude, GPT, Gemini)"; for two vendors: "three-seat AI panel, two
   vendors (Claude; GPT × 2)". Keep the Gloss component and make its glossary
   definition (`src/lib/glossary.ts`, key `three-model AI panel`, and add a
   sibling key for the two-vendor panel) carry the adopted wording. A claim
   whose run.yaml cannot be read falls back to the historical label and the
   build prints one warning naming the claim.
2. Methodology page (`src/pages/methodology/index.astro`): about fourteen
   sentences say three models, three companies, three seats or three
   reviewers. Rewrite each that describes the CURRENT method to the adopted
   wording and add the one-vendor triage label where triage is described.
   Leave sentences that describe a specific past run or the matrix ("Three
   reviewers, four words, twenty possible panels" stays true: three seats).
   The status paragraph near line 48 ("As of September 16, 2026 all three
   seats can run again...") gets a dated successor line: as of September 23,
   2026 the Google seat is retired and the panel is three seats from two
   vendors; link the v1.37 changelog entry the way neighbouring copy links
   entries. The page's `description` (line ~201) must carry "three AI model
   seats from two vendors".
3. Other pages: `src/pages/about.astro` (lines 38, 75), `src/pages/support.astro`
   (lines 85, 144: "Two AI subscriptions ... three-model research panel"),
   `src/pages/sources/[id].astro` (line 74: three models read the source; this
   describes past intakes, so make it "the extraction seats" without a count),
   `src/components/AiReview.astro` (line 103), `README.md` (lines 9, 13, 22,
   71). Same rule: current method gets the adopted wording; a described past
   run keeps its label.
4. Share text: `ClaimFinding.astro` line ~89 builds share text with the panel
   agreement word; do not add the vendor count there, but make sure no share
   or meta text says "three independent".
5. `scripts/panel/preflight.sh`: new, small. Prints, for each active seat
   (claude, codex), the CLI version and whether the CLI reports a login
   (`claude auth status` if it exists in this build, else the presence of the
   Keychain-backed login is reported as "not checkable here"; `codex login
   status`). No model call, no network beyond what those commands do. Exit
   non-zero if either CLI is missing or reports no login. Comment header says
   what it checks and what it cannot. Ten to forty lines. A test is not
   required for this script.

## Verification

- `npm run validate`, `npm run check` (astro check) and `npm run build` pass.
- `npm test` passes; add or adjust tests only where an existing test asserts
  the old wording.
- `grep -rn "three independent" src README.md` returns nothing that describes
  the current method.
- Report every sentence you changed as old → new, file and line, and every
  sentence you deliberately left because it describes a past run.

## Constraints

Plain sentences, sentence-case headings, no em dashes, no "not just X but Y".
Do not touch files outside the list above. Commit nothing; leave the working
tree for review.
