# Review context

Repository root: /Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers
(a git worktree on branch model-tiers; compare against origin/main, commit
f360010; the change under review is commit 0054a9e, PR #78).

## Changed files (the whole diff is in these six)

- docs/DESIGN.md
- methodology/changelog.yaml
- scripts/panel/run-reviewer.sh
- scripts/panel/invoke-reviewer.sh
- tests/invoke-reviewer.test.ts
- tests/three-seats.test.ts

Use `git diff origin/main -- <file>` for each; the working tree is clean, so
`git diff` and `git diff --cached` alone show nothing.

## What the change is for

Methodology v1.34. Two panel seats move to models released 2026-09-22: the
Claude seat from claude-opus-5 to claude-opus-5-5, the OpenAI seat from
gpt-5.6-sol to gpt-6-sol, both at the pinned effort `high`. A fourth,
uncounted "shadow" seat on gpt-6-luna may run the same frozen package but
must never be merged or synthesised: scripts/merge.ts reads every JSON file
in a round directory, so the shadow seat is only allowed with `--into
<dirname>` (its own directory and manifest) and only in round 1.

## Constraints

- No published finding changes; runs already published keep their manifests.
- The changelog entry must not claim a quality comparison between models;
  the moves are cost decisions and say so.
- Effort stays pinned at `high` (methodology v1.6). Opus 5.5 defaults to
  medium, so the pin must be explicit.
- Three-vendor panel requirement unchanged; the shadow seat is not a panel
  seat.

## Review focus

1. scripts/panel/run-reviewer.sh: the new `luna|shadow` alias and the guard
   that refuses it without `--into` or in round 2. Is the guard placed after
   INTO is parsed, and can it be bypassed? Can SLOT `gpt-luna` collide with
   the counted `gpt` slot or with round 2's other-seat scan?
2. scripts/panel/invoke-reviewer.sh: PINNED_MODELS for openai is now
   `gpt-6-sol,gpt-6-luna`. Does the comma-list match at the pin check still
   work, and does any other code assume a single pinned model?
3. methodology/changelog.yaml (v1.34 entry) and docs/DESIGN.md section 4
   (seat table and shadow-seat paragraph): read as a sceptical outsider. Flag
   any sentence that claims a quality comparison, anything inconsistent with
   the scripts, and any factual claim the diff does not support.

Do not edit files. Report required fixes separately from suggestions, each
with file and line.
