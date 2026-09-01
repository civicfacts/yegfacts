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

## Decisions — resolved 2026-09-01 (methodology v1.3)

The founder delegated these; the decision-maker took written second and
third opinions from GPT-5.6 Sol and Gemini 3.1 Pro (advisory briefs and
full responses preserved in the session record). Both advisors converged
on all four.

1. **Repo visibility** — RESOLVED: founder made the repo public on
   2026-09-01. Site wording re-hardened the same day.
2. **Synthesize from round 1** (GPT #4; Claude #5) — ADOPTED. Synthesis
   consumes locked round-1 verdicts; round 2 is retained as an
   error-documentation channel rendered as documented positions; a
   material error caught in round 2 (fabricated citation, wrong
   evidence) triggers a fresh blind re-run of the affected claim.
   Verified before adoption: round-1 and round-2 multisets produce
   identical canonical findings on all six published claims, so no
   published verdict changed.
3. **Rename canonical "confidence"** (GPT #6) — ADOPTED as **Panel
   agreement**: Unanimous / Adjacent / Split, computed from the round-1
   multiset. Per-reviewer confidence stays visible in the AI review.
   Displayed gloss makes explicit that agreement measures the panel, not
   the probability of truth.
4. **Matrix cautious lean** (Gemini #9) — KEPT, rationale now published:
   Supported means the proposition as written is affirmatively
   established; a qualification identified by one reviewer does not
   disappear because two others missed it, and for a fact-checking site
   overclaiming is the costlier error. The vote composition is always
   displayed, which answers the veto concern without publishing a
   stronger claim than every reviewer accepted.
5. **Error ledger** (Claude #3) — ADOPTED as the **panel quality
   record**: adjudicated event records (model, methodology version,
   stage, error class, disposition, denominator) captured from now on
   and seeded retroactively from the four published runs; public
   summary page ships when the pre-registered nine-story launch slate
   completes. Named an error ledger, not "calibration" — error counts
   do not calibrate against known truth.

## Remaining backlog (no decision blocked)

6. **"Audit this claim" page** (GPT #11): one generated page per claim
   linking every stage of the chain with statuses. Strong idea; medium
   build; v1.x.
7. **Real social-post captures** to replace composite paraphrases
   (all three) — requires a human browser session.
8. **Harden `run-reviewer.sh` round-2 package assembly against prompt
   injection from fetched quote text** (advisory from exposure audit).

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
