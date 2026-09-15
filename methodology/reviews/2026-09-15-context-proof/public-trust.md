> Independent advisory memo, September 15, 2026. Model: `claude-opus-5`, high effort. Separate session for this role; no other role memo supplied. The memo below is preserved unchanged. Claims and recommendations are not all adopted: read [DISPOSITIONS.md](DISPOSITIONS.md), including its factual corrections. Original memo SHA-256: `59671b9a35cd50b3a891dc402ff54b48d466ad0a9cfcfc4bfa9c780b8cb8465f`.

Model: claude-opus-5, independent session, role: Public Trust & Governance, 2026-09-15.

## Fit

Right shape, right size. v1.28 refused every seat because nothing emitted the
request; this emits it, checks it against a pinned description, and fails closed
on anything unclassified. Capture at the CLI's own configured gateway answers the
v1.28 question, and the cross-check that main turns must equal the stream's
assistant turns is what stops a bypass reading as a clean run. Its limits are
real and mostly stated: one attempt, one build, one machine, the vendor's side
unobserved.

## Benefits

The resident who distrusts the site gets a claim falsifiable by re-running rather
than by trusting prose. The journalist gets a version, counts and hashes instead
of an adjective. The councillor being fact-checked can ask what the reviewer was
told and get an answer that is not "nothing, we promise". Publishing v1.29 now is
honest because its headline is still "blocked": one seat cannot produce a
finding, and the record says so.

## Risks, in the order a hostile blogger would use them

1. He audits himself. Proxy, checker, pins, archive and the admission decision
are all the founder's, on his laptop, and nobody outside can verify a byte. The
public record is hashes of private files and inspection runs through him.

2. The copy still undersells what leaves the machine. The methodology page says
"two things the request does carry that the package does not". It is at least
six: the environment block also carries platform, shell and OS version, the
metadata carries a device id, an account UUID and a session id, and the working
directory is built from the story slug, run date, round, seat and the operator's
home path. That is the site's documented failure mode in miniature, in the
paragraph claiming to have cured it.

3. The independent reviewer is told who commissioned it. The account email plus a
working directory naming the story and the round lets a model infer whose site
this is. Disclosure does not cure that. It is structural and cheap to remove.

4. Intercepting your vendor to prove you did not cheat. A recording proxy on a
consumer subscription, plus a public document giving the vendor prompt's hash,
length and headings, is a terms and reputation exposure nobody has checked on
the record.

5. The pins rot on the vendor's next release. 2.1.273 already exists. Seat
availability depends on one person re-probing hashes after every upgrade.

Neither in-flight follow-up changes the recommendation. Pinning 2.1.272 while the
path offers 2.1.273 turns an honest fail-closed into a deliberate choice to run a
superseded build, which needs its own public line and a run-record field, or a
reader reads it as neglect. The runner refusing to install an unadmitted review
is not a follow-up: without it admission is advisory and risk 5 ranks higher.

The session-title call raises no independence concern, since the check requires
its body to be the package verbatim and it carries no tools. The duty is only to
say the package reaches the vendor twice per attempt.

## Recommendation

Conditional approval. Conditions: correct the host-context paragraph to an
exhaustive list before merge; ship the runner refusal in the same release; within
one release move the seat to a project role account and name the working
directory by the opaque attempt id, then record the result; record a terms check
for proxying under a subscription before the next capture run; publish no finding
from a single admitted seat.

## What would change my answer

Plain approval if someone else, on their own account and machine, reproduces the
canary and the pass in public, or if a sanitized canary capture is published in
full so a reader can check the five shapes without asking anyone. Reject if the
role account is declined and the email disclosure becomes permanent, or if any
finding ships from one seat.
