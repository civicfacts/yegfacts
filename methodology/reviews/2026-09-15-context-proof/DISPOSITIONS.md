# Context proof by request capture, and admission of the Claude seat

Decision date: September 15, 2026. Methodology v1.29.
Editor: Stew, Anthropic Claude Fable 5.1. Authority: D-0036 (September 9)
named this demonstration as the next technical work and the founder's
standing direction on that batch was to proceed without asking again.

## Question put to the reviewers

v1.28 refused every reviewer seat because nothing emitted the outgoing
request, so nothing could show what context a reviewer received. The
proposal: run the Claude CLI, for one subprocess only, through a loopback
recording proxy at the CLI's own documented gateway setting; retain every
request and response; check every captured request against a pinned
description of a clean run under one CLI version; admit the seat for research
only when that check passes on a synthetic canary and on the research run.
Codex and Google stay blocked. All four advisory roles received the same
brief in separate Opus 5 sessions and read the branch. They were asked
whether a gateway capture is sufficient context proof and what its limits
are; whether to disclose or refuse on the account email and working directory
the vendor's reminder blocks carry; whether the session-title side request
matters; whether publishing v1.29 with two seats still blocked is honest; and
what the public record must and must not contain. These are governance
reviews, not research seats. All four used the same vendor; the editor is a
different model from the same vendor. The synthesis is the editor's.

## Decision

Adopt, with the conditions below folded into the same release. The capture
is the first artifact that answers the v1.28 question rather than talking
around it, and it fails closed on anything it does not recognise in the
request body: the system blocks, the tool definitions, the model, the
reasoning effort, the messages, the top-level keys and the keys inside the
request metadata are each checked against the pinned list, so a field nobody
described is a failure. The HTTP headers are recorded and not compared. Its
limits
are stated as limits: one attempt, one build, the client edge only, nothing
on the vendor's side observed. Admission is narrower than the check, and the
panel runner refuses to install anything not admitted.

The account email and working directory stay in the request and are
recorded as disclosed host context. The proxy never rewrites a request, and
stripping them would destroy the artifact offered as proof. What changes is
the working directory: research and canary runs now start in a fresh
directory named only by the opaque attempt id, so the path the reviewer sees
no longer names the project, the story, the round, the seat or the operator's
home directory.

The pinned CLI build is copied out of the installer's auto-pruned versions
directory into the private archive, its SHA-256 is pinned beside the prompt
and tool hashes, and the launcher runs that copy. A newer CLI on the machine
does not change what runs; a new version needs a fresh capture and a new pin
row. A missing pinned build refuses with its own message.

One seat admitted is not a panel. No finding, framing report or source audit
is published from a single seat. The three-seat requirement, the model and
effort pins and the framing-check caps do not change. The two-week
blocked-brief clock from D-0036 is not reset by this release.

## Disposition by role

### Evidence and methodology: conditional approval

**Adopted:** the checker now scans tool-result content, not only text
blocks, for reminder markup, and the public claim about later turns is
narrowed to what the checker establishes. The vendor-side limit (account
linkage by device id, account id and billing header; nothing on the vendor's
side is observed) is stated beside the machine-side one. The methodology page
says the package reaches the vendor twice per attempt. Attempts run from a
neutrally named working directory.

**Not adopted:** nothing. The reviewer's "what would change my mind" is
recorded: a request path that bypasses the configured gateway would make the
capture incomplete rather than limited, and any wording that calls this
isolation is a reject.

### Public trust and governance: conditional approval

**Adopted:** the host-context paragraph becomes an exhaustive list: platform,
shell and OS version in the environment block; device id, account id and
session id in request metadata; the working directory. The runner refusal
ships in this release. The working directory is renamed to the attempt id.
The run record carries both the version that ran and the version the machine
offered, and the copy says the pinned build is a choice.

**Referred to the founder, not adopted here:** a separate project role
account for the seat, which costs a second subscription; and a terms check
for routing a subscription CLI through a recording proxy. The base-URL
setting is the vendor's documented way to route the CLI through a gateway,
the proxy changes nothing in transit, and the vendor prompt is pinned by hash
and not published. Those facts are recorded; they are not a legal reading,
and the founder decides whether one is needed before the next capture run.
The headings of the vendor prompt, which the plan document listed, are
removed from that document.

**Corrections:** the memo's "at least six" count of disclosed items is right
against the September 15 paragraph as first drafted; that paragraph is now
exhaustive. No finding ships from one seat; that was already the rule.

### Technology and sustainability: conditional approval

**Adopted:** copy the pinned build out of the auto-pruned directory and pin
its hash; a distinct refusal for a missing pinned build; the verification
record does not quote the disclosed blocks verbatim; refusal wording on the
research path does not imply the package was never sent.

**Not adopted now:** splitting the gate so that the vendor prompt hash becomes
a dated observation rather than a condition. A prompt that starts carrying
memory paths would pass a structure-only gate, and that is the leak this
check exists for. A repin script is recorded as the next piece of work on
this path; until it exists, each CLI upgrade costs a manual probe.

**Corrections:** the memo could not confirm the suite green in its checkout
because that checkout had no installed dependencies; the editor reproduced
441 passing tests and one opt-in skip on the final branch head. The memo's hours
and dollar figures are estimates, not measurements.

### Product and audience: conditional approval

**Adopted:** a dated sentence in the short version saying no panel has run
since September 4, linking to the reviewer-execution section; the
consultation question's visible pause reason is rewritten, since "no reviewer
setup yet meets the execution requirements" becomes false on merge, and it
links to that section; the September 15 paragraph leads with what remains
blocked; the two-week clock is recorded as not reset. "Recording proxy" is
replaced with plain words on the methodology page.

**Not adopted:** the one-reader test is a good idea and is recorded for the
next human read, not made a release condition.

## Corrections to the advisory memos

The Evidence memo says the scan for added instruction text reads a field a
tool result does not have. That was true of the reviewed commit and is fixed
in this release. The Technology memo says the installer keeps about five
builds; that is an observation of this machine on this date, not a documented
retention rule, and it is why the build is copied rather than trusted to
stay. No memo claims a historical run is certified; none is.

## Execution evidence and release

The live demonstration, its hashes and the release checks are in
[verification.md](verification.md). Two of its four attempts were refused
by the check itself: the first because the pins had been derived from probes
on a different model, the third because the check had over-pinned the search
helper and miscounted a turn split by a rate-limit event. Both refusals were
defects in the description, not leaks in the run, and both are corrected in
this release. The fourth attempt passed and was admitted. The implementation plan is
[recorded separately](../../../docs/plans/2026-09-15-context-proof.md).
Governance approval is not a substitute for those checks.
