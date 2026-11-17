# Source-stop disposition, round 1: cycling-safety, run 2026-10-21

Signed: Stew, editor (D-0020), as Claude Opus 5.5 (`claude-opus-5-5`) at high. Written from the frozen claim 1 essential-text rule, `round1/claude.json` (attempt `558562cc7b9607fe`), `panel/editor-disposition.md`, D-0046, D-0047 and D-0048, and methodology v1.41 to v1.43. No other seat's answer exists or was read.

## What happened

The Claude seat returned Not established and invoked the frozen run-stop. Its stated cause is that Traffic Bylaw 5590 and Public Spaces Bylaw 20700 could not be read as in force on 2026-08-27. Its legal reading is labelled indicative, not a verdict. A single seat's answer is not this site's finding, and this one is not.

The retained attempt metadata separates two kinds of failure:

- **HTTP 200, text not extracted.** `C5590.pdf` and `C20700.pdf?cb=1779154039` both answered HTTP 200 with `is_error` false. The tool got the bytes and could not extract them. That is a reading failure by the tool, not a refusal by the publisher.
- **Server errors.** The Public Spaces Bylaw page and the bylaw index answered HTTP 502. The eScribe copy answered 403 and is not retried or bypassed.

## Remaining blind seats: complete the same round

The GPT-6 Sol and GPT-6 Luna seats complete round 1 on the same frozen packet, unchanged. The council-hearing run (2026-10-02) applied the same kind of stop after a round on all three seats. A round is one answer per seat, and every recovery route below counts whole committed rounds. Completing an authorized round already under way is not running a new round to create eligibility. If a seat reads either bylaw directly, it says "read directly from" and the address.

## Cross-review and synthesis: prohibited

Merge, round 2 and synthesis do not run while any seat reports an essential source unread. The frozen rule says the run stops, and no finding is synthesized from an essential-source failure.

## Recovery under the existing rules

- **v1.41 carry: not available.** The site's fetcher was not refused at either PDF address.
- **v1.42 seat-refusal ground: not met.** It counts only a status or error type the tool itself emits, from a fresh probe of no more than six hours. HTTP 200 with no error is not a refusal, and the reviewer's word "unreadable" does not count. No fresh `seat-probes.yaml` exists.
- **v1.43 two-round ground: unmet.** It needs every seat to record a failure tied to the same document in two consecutive committed rounds of this run, read mechanically from their answers. Prose counts here. There are not yet two such rounds, and a direct read by any seat ends the ground for that document. No round may be run to make a document qualify.
- **v1.43 non-portal carry, if the ground is ever met.** It needs a site fresh download matching the archived bytes, and a browser check by someone who is not the editor within 72 hours of launch. It needs a committed carry manifest, an independent read of the extraction, and a package within the site's package-size limit. None exists yet. Carrying the PDFs alone would not cover the Bylaw 20700 amendment-index check, which is a separate document.

## Decisions after round 1 completes

1. **Every seat fails the bylaws.** Round 1 stays stopped and committed. A second round 1 is allowed only on a reason that stands without eligibility, as in the council-hearing outage ruling. The HTML 502s may be such a reason if, immediately before launch, the pinned seats' probes and the site's fetcher show the edmonton.ca HTML reachable. The PDF extraction failure is not transient, and on its own it is not a reason to rerun. Without such a reason, the run stays stopped.
2. **Some seat reads the bylaws directly.** The two-round ground ends for that document. The Claude seat's stop still stands as written. Whether the frozen per-reviewer run-stop is satisfied when another seat read the text is a method question I do not settle here. Until it is decided, the run stays stopped.

Nothing here adopts a park, changes the brief, rules or register, or publishes anything.
