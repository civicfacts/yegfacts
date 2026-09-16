# Whole-source intake: the Edmonton Rant and Rave thread of 2026-09-10

The second capture read end to end under methodology v1.15, and the first on a
source that is not about bike lanes. A post in a public Edmonton Facebook
group complaining about garbage collection, snow clearing and taxes, from which
117 comment records were captured. Nobody chose which claims in the capture to
look at.

**This run is not finished.** The Google extraction seat could not run on
2026-09-16: the `agy` CLI reported its account quota exhausted, resetting in
about a week. Two of three seats have been read and quote-checked. The merge,
the coverage check, the grouping, the triage and the register entries all take
three extractions as input and have not run. `manifest.md` records what ran,
with every command, and what is still to run. This file will be rewritten when
the run completes; until then nothing here is a finding about the source.

## What is here so far

| | |
| --- | ---: |
| Comments read | 117 |
| Distinct commenters | 86 |
| Seats that returned | 2 of 3 |
| Claims raised by those two seats | 95 |
| Forms thrown out by the quote gate | 1 |

The platform displayed 123 comments; the export holds 117. The gap is
unresolved and the capture is not proof of a complete thread; see the
[capture README](../../../intake/captures/edmonton-rant-and-rave-2026-09-10/README.md).

## Who found what

| seat | model | claims | forms | thrown out |
| --- | --- | ---: | ---: | ---: |
| haiku | Claude Haiku 4.5 | 25 | 31 | 0 |
| luna | gpt-5.6-luna (low) | 70 | 84 | 1 |
| flash | Gemini 3.8 Flash (High) | did not run | | |

The one form thrown out stitched two runs of comment 117 into one quote. A
wrong quote is a false attribution to a real person, so it went before the
merge saw it, and its claim with it: no other form carried it.

## What the second source exposed before a seat ran

The committed intake prompts define `side` as a position in "the bike-lane
spending argument". That was the first source's argument, not a property of
intake. Rather than edit the prompts, which are outside this run's footprint,
a one-paragraph source note describing this source's argument was appended to
every assembled prompt; it is in `source-note.md`, verbatim. The prompts need
a source-neutral definition of `side`, supplied per run, and that is a change
to `prompts/intake-*.md` with a methodology entry.

## Files

- `../../../intake/captures/edmonton-rant-and-rave-2026-09-10/` — the
  capture. Commenters and the post's author are pseudonymous.
- `extract-<seat>.json` — each seat's list, after the quote gate. `.raw.txt`
  is what the CLI printed.
- `quote-gate.md` — what was thrown out and why.
- `source-note.md` — the paragraph every seat was given about this source.
- `manifest.md` — every command, model and timing, and the stages still to run.
