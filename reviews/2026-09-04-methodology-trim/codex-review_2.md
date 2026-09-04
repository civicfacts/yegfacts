# Review context: two cuts on the methodology page, round 2

Repository root: the methodology-trim worktree of civicfacts/yegfacts
(branch `methodology-trim`, cut from `e3c82ac`). Round 1 (REVISE, one
finding: the v1.17 changelog entry linked to the removed
`/methodology#launch-slate` anchor and the changes page rendered it) is
answered in the latest commit, `git log -1`. Do not edit anything, do
not build, do not run git commands that touch the working tree.
`dist/` is built from HEAD.

## What changed since round 1

`methodology/changelog.yaml`, v1.17's `links`: the entry now points at
the slate's surviving record, DESIGN.md §7 on GitHub, with a label that
says so. Editing a past entry's link is a correction of the record, not
a change to the method, which is the changelog header's own exemption;
`npm run validate:diff` passes without a new version.

## Review focus

Is the finding closed: no `launch-slate` anchor referenced anywhere in
`dist/`, and the GitHub anchor resolves to the heading "7. Launch slate
(dropped 2026-09-03, D-0027)" in `docs/DESIGN.md`. Anything new.
Concrete findings with file:line. No praise. End with REVISE or APPROVED.
