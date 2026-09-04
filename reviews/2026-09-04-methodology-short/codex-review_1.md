# Review context: the methodology page's short version, round 1

Repository root: the methodology-short worktree of civicfacts/yegfacts
(branch `methodology-short`, cut from `34d4bd7`). The change is the last two
commits (`git log -2`: the copy, then a component extraction that renders
identical HTML); `git diff 34d4bd7 HEAD` is the whole of it.
Do not edit anything.

## Why this change exists

A UX researcher, the first human reader of the site who is not the
founder, opened /methodology and could not read it. Roughly 4,000 words,
opening with a 90-word paragraph of process vocabulary, no short layer.
The site's charter promises a ten-second answer, a ten-minute audit and
an hour to rerun the method. The methodology page had only the hour.

## What changed

Two files: `src/pages/methodology/index.astro` and the new
`src/components/NumberedSteps.astro`, which the page's three numbered lists
now render through.

1. A new first section `#short`, "The short version": five steps a
   stranger can read in one screen, three things the site will not do,
   one paragraph pointing at the repository and the rest of the page.
2. `#vocabulary` moves up to second place, with a plainer intro and
   close.
3. The full method follows, in its old order, with long sentences split
   and asides cut. Three stages were also stale against `docs/DESIGN.md`
   §4 and are brought current: stage 4 gains the v1.22 re-run shape,
   stage 5 gains v1.24 parking, stage 6 gains the v1.18 plain-speech
   read (and is renamed to say so).
4. The "On this page" outline reflects the new order. Every old anchor
   id survives.

## Files to review

- src/pages/methodology/index.astro (the change)
- docs/DESIGN.md §4 and §12 (the standard the page describes, and the
  plain-speech rule; both unchanged)
- src/lib/glossary.ts, src/pages/index.astro (link into the page's
  anchors; unchanged)

Screenshots attached: the first screen at 1280 and at 390, then the full
page at both widths.

## Constraints that must hold

- No fact about the method changed. Every rewritten sentence says what
  its predecessor said, or what DESIGN.md §4 says where the page was
  stale. Diff the old and new `intake` and `stages` bodies one by one.
- Nothing in `#short` claims more than the full method below delivers.
  Read each of the five steps against the seven stages and DESIGN.md §4
  and name any overclaim.
- The anchors `intake`, `pseudonyms`, `stages`, `vocabulary`,
  `synthesis`, `questions`, `limits`, `panel-quality`, `launch-slate`
  exist in the built page (`dist/methodology/index.html`).
- No em or en dash in any new or rewritten string.
- No horizontal scroll at 390px.
- The file's comments describe the code truthfully after the reorder.
- `scripts/`, `methodology/`, `prompts/`, `src/lib/glossary.ts` are
  unchanged.

## Review focus, in this order

1. Read `#short` as a stranger arriving from a Facebook argument who has
   never seen the site. Can they say, after one screen, how a finding is
   made and who answers for it? Where do they stall? Quote the sentence.
2. Meaning drift in the rewritten full-method strings, with the old and
   new text quoted side by side for each finding.
3. Overclaims in `#short` against the method as documented.
4. Outline, anchors, semantics, 390px.

Concrete findings with file:line. No praise. End with REVISE or
APPROVED.
