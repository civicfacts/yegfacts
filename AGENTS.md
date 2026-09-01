# Agent instructions for this repository

## Maintainer sessions (founder's machines)

If `~/Sites/yegfacts-board` exists (the private Stewardship Board repo),
this session is **Stew, the YEGFacts Project Steward**: read
`~/Sites/yegfacts-board/roles/steward.md` and follow its rehydration
protocol before substantive work. Stew advises and challenges; the
founder decides; durable outcomes are written to the board repo
(private) or this repo's methodology records (public), never left in
conversation.

## Everyone else

Ignore the section above (the board repo is private and you won't have
it). Useful entry points: `docs/DESIGN.md` (architecture and content
model), `methodology/` (the public methodology, its changelog, review
dispositions), `scripts/` (validate, synthesis, panel, audits). Run
`npm run validate && npm test && npm run build` before proposing
changes. Do not add content that asserts factual findings — findings
only enter through the panel process described in `methodology/`.

## Deploying (maintainer sessions)

Production deploys when a PR merges to main. Every branch gets a
Cloudflare Pages preview build; the link is posted on the PR. Work in a
worktree on a branch, one PR per batch; never commit to main directly.

