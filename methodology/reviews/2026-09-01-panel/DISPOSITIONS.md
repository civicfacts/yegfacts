# Methodology panel review — dispositions

Three models (Claude Fable 5, GPT-5.6 Sol, Gemini 3.1 Pro) independently
reviewed YEGFacts' methodology, trustability, and presentation on
2026-09-01, with four published stories as material. Raw reports sit
beside this file. This document records what was done with every finding.

## Fixed immediately (methodology v1.2 + site changes, same day)

- **Site copy contradicted methodology v1.1** (all three, CRITICAL).
  DESIGN.md and the support page still described the v1.0 per-source
  human gate. Reconciled everywhere; /methodology now states plainly that
  all four published stories passed the AI-audit gate.
- **"Claims we're seeing" mimicked real platforms** (all three).
  Platform chrome removed; neutral cards; "Paraphrase — not a real post"
  baked into each card; the self-contradictory "original posts remain
  public" line removed.
- **Combined-evidence artifacts carried unflagged unverifiable citations
  and null ids** (all three). Items now carry explicit fetch status and
  registry id; validator enforces presence.
- **Models attested their own identity** (all three). Panel identity now
  renders from the run manifest; self-reports retained only as an
  internal consistency check.
- **Known-false statements sat unmarked in the audit trail** (Claude,
  GPT, Gemini). errata.md files now sit beside the raw artifacts (e-bus:
  one fabricated citation; winter-cycling: two false accusations by one
  reviewer against another, plus one dropped unsupported figure), linked
  from story pages.
- **The frozen brief was the least-examined step** (Claude, GPT, Gemini).
  Briefs now linked from every story's AI-review section; the reviewer
  prompt now instructs reviewers to flag material framing problems, and a
  material framing flag halts synthesis.
- **Verdict system illegible** (Claude). One-line glosses added under
  every finding ("Not established = the public record can't back this up
  — not the same as proven false.").
- **Gate reports invisible to readers** (Gemini). Gate audit reports now
  linked from each story's AI-review section.
- **Mobile table hid the verdict column** (Gemini). Stacked mobile layout.
- **Methodology version invisible per story** (Gemini). Now shown.
- **Repo overstated as tamper evidence** (GPT). Deployed commit SHA in
  the footer; "override would be visible" softened to "inspectable in the
  public history."
- **Slate pre-commitment invisible** (Claude, GPT). Homepage now says the
  four live stories are the first of a pre-committed nine-story slate;
  the remaining five are listed on /methodology (claims only, no expected
  verdicts in public copy).
- **Private evidence dead-ends the audit** (Claude, Gemini). Evidence
  pages now render permitted excerpts and a verify-independently path.

## Founder decisions required (not changed tonight)

1. **Repo is private** (Claude, CRITICAL — the single biggest gap).
   Flipping visibility is the founder's action:
   `gh repo edit civicfacts/yegfacts --visibility public`.
2. **Synthesize from round 1 instead of round 2** (GPT #4; Claude #5).
   The panel argues round 2 destroys independence via anchoring, so the
   deterministic matrix combines dependent judgments. A real methodology
   redesign (v1.3 candidate): synthesis on locked round-1 verdicts,
   cross-review demoted to error-documentation that can trigger a fresh
   blind run. Would warrant re-running published stories.
3. **Rename canonical "confidence" to "panel agreement"** (GPT #6).
   Public-vocabulary change; touches every page and the matrix. Panel is
   right that the current label measures panel shape, not truth.
4. **Matrix suppresses affirmative findings** (Gemini #9): {S,S,P}
   resolving to Partially supported gives the most hedged model a veto.
   Counter-consideration: the cautious lean is deliberate. Founder call.
5. **Calibration ledger** (Claude #3): publish per-model error tallies
   from round-2 catches and gate rejections, so "unanimous" can be
   weighed against a track record. Needs a few more stories of data;
   worth building at ~10 stories.
6. **"Audit this claim" page** (GPT #11): one generated page per claim
   linking every stage of the chain with statuses. Strong idea; medium
   build; v1.x.
7. **Real social-post captures** to replace composite paraphrases
   (all three) — requires a human browser session.

## Rejected / clarified

- **"Result balancing compromises claim selection"** (GPT #3): the slate
  WAS pre-registered before any panel ran (design doc, Aug 31), selected
  for topic coverage and claim prevalence; expected findings were
  production-planning hypotheses, not selection criteria. Fix applied is
  disclosure (slate now public), not re-selection.
- **"Hard-fail the run on any unfetchable URL"** (Gemini #3): rejected
  as stated — bot-blocked (403) legitimate sources would kill runs.
  Adopted instead: mandatory flagging plus the existing gate rule that no
  published statement may rest on an unverified source.
