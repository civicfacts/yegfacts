> Independent advisory memo, September 9, 2026. Model: `claude-opus-5`, high effort. Separate session for this role; no other role memo supplied. The memo below is preserved unchanged. Claims and recommendations are not all adopted: read [DISPOSITIONS.md](DISPOSITIONS.md), including its factual corrections. Original memo SHA-256: `fed1151e3c2174fd57d999f47273ae0d77a454696e1d177cfe42aaeabfd11141`.

# Product & Audience review: reviewer execution boundary, response retention

Role version 1.0. Date 2026-09-09. Independent session, this role only.

## Fit

Yes, with one carve-out. Nobody arriving from a Facebook argument will
ever ask whether a reviewer seat read injected memory. The value here is
indirect and real anyway: the methodology page claims the seats are
independent, and that claim is the only thing this site sells. Report 3
shipped without the citation footer its own working notes cited, and we
cannot say who dropped it. A reader who finds that before we do has no
reason to trust the next verdict.

So the plumbing belongs, and it stays plumbing. Nothing about isolation,
retention or degraded tooling goes above the one-line answer on a story
page (D-0016 hierarchy), and no verdict gets a caveat badge.

The carve-out is the tradeoff the brief names. Blocking PDF work is not
enforcement of existing independence, it changes what this site can
check. 42 of the 164 evidence registry entries cite a PDF, a quarter of
the evidence base already published, and budget, roads and infrastructure
claims cluster there. Those are the arguments Edmontonians actually have.
D-0025 granted the shell for exactly this failure. A blocked brief also
lands on /considered with a public one-sentence reason (D-0024). Today
those reasons read as editorial judgement. "Our reviewer sandbox could
not open the source PDF" reads as a broken tool, and declines a topic
rather than a claim.

## Benefits

Complete response retention is the strongest item for journalist
utility. Anyone auditing a verdict wants the whole seat answer, not the
schema-extracted subset. Retention is what makes "we can show you" true.

Publishing hashes and sanitized derivatives while holding raw output
privately is the right split. Do not dump raw stdout into the public
repo. Three seats times several attempts per round makes the audit trail
harder to read, and readers see that trail. One line per run in the
existing run record, linked from the story.

## Risks, ranked

1. Publishing rate. Roads and infrastructure are parked, consultation is
   blocked, and fail-closed adds a third stop with nothing on the publish
   side to compensate. A fact-check site with no new verdicts for a month
   is indistinguishable from an abandoned one, and no growth feature
   repairs that. This is the risk worth the review.
2. Disclosure creep. "Document reduced retrieval capability" invites a
   caveat block. One sentence on the methodology page and one line in the
   run manifest is the whole budget.
3. Nothing measures the product cost. Canary and parser tests cover
   correctness. No counter exists for briefs the boundary blocked.

## Recommendation

Conditional approval, conditions in my lane only.

- Track the publish-side cost weekly in the private state file: briefs
  blocked by fail-closed, days since the last published verdict. Two
  consecutive weeks with a blocked brief reopens the isolation design,
  not the slate.
- Reader-facing disclosure lives on the methodology page and in the
  /considered reason field. Never above the answer, never on a badge.
- If tools-only mode blocks PDFs, name the topics that puts out of reach
  in reader words before release. "Reduced retrieval capability" is not a
  sentence a reader can act on.

Disagreement: the brief treats retention as a finished good. Retained
bytes nobody can point at are invisible. The run record should say in one
readable line that complete responses are retained, and give the hash.

Fail-closed when one provider is unavailable is reasonable for a run, not
for the slate. Mark the story blocked with a public reason rather than
quietly seating two vendors. That is a governance conclusion. Whether the
flags to enforce it exist is implementation, not mine to assert.

## Smallest testable version

Retention plus the one-line run-record hash, on a single rerun of one
already published PDF-heavy story. Ship the isolation flags only after
that rerun returns the same verdict.
