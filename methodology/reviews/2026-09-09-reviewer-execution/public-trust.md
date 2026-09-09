> Independent advisory memo, September 9, 2026. Model: `claude-opus-5`, high effort. Separate session for this role; no other role memo supplied. The memo below is preserved unchanged. Claims and recommendations are not all adopted: read [DISPOSITIONS.md](DISPOSITIONS.md), including its factual corrections. Original memo SHA-256: `328b4287791b61093b5821cd73d74dfdd73ab08e244c42812b7ba5b42d5143ed`.

# Public trust and governance review

Proposal: reviewer execution boundary and complete response retention.
Role: Public Trust and Governance, contract v1.0. Independent session,
this role only.

## Fit

Strong fit, and it lands on this project's known failure mode. The
published methodology page tells readers each model "runs in its own
scratch directory with no access to this repository and no sight of the
others". The 2026-09-09 audit found a checker reading private project
notes that were never in the declared package, and citing them. This is
not new policy. It is practice catching up to published copy.

It is also a capability change, and the brief is right to separate the
two. Disabling project memory, connected apps and MCP enforces the
existing claim. A tools-only fallback that cannot open a PDF removes
reach D-0025 granted on purpose. Readers must be told both, separately.

## Benefits, ranked

1. It retires a sentence on the live site that is currently false.
2. Complete-response retention makes "the committed report is what the
   model said" checkable. The omitted citation footer stayed invisible
   precisely because nothing kept the original.
3. Fail-closed on unsupported configuration removes the worst outcome: a
   run that looks like three independent seats and is not.

## Risks, ranked as a hostile blogger would write them

1. "Months of verdicts ran unaudited, and they only looked after they
   were caught." Every published run predates this boundary. Not
   re-running them is defensible. Leaving it unsaid is not.
2. "Their independence was a directory name." That is close to what the
   code comments and the site both claimed. Correction owed, old text
   preserved.
3. "They publish hashes of files nobody can see." Hashes over private
   artifacts prove self-consistency and nothing else. Theatre, unless
   an outsider can trigger inspection.
4. "They quietly weakened the research so the isolation story would
   work." A seat that cannot read a source the brief names is a weaker
   reviewer. Undisclosed, that is the same overclaim inverted.
5. Privacy. Raw stdout can carry personal identities pulled from
   captures, so a permanent store of every model response accumulates
   disclosure risk run by run.

## Recommendation: approve, conditionally

Governance conditions, none of them implementation calls:

1. Ship the correction before or with the fix. Dated changelog entry
   and journal correction, prior text preserved, saying what
   "isolated" did and did not cover and which published runs ran under
   it. The audit's honest phrase, no repository read observed but
   absence not proven, belongs in that public entry.
2. Never describe a seat as isolated again unless a negative test ran in
   that same run and its result sits in that run's manifest. A one-time
   certification does not survive the next CLI update.
3. Disclose reduced retrieval in that same entry, naming the D-0025
   tradeoff instead of restating parity.
4. Publish the retention rule itself: what is kept, for how long, what
   is redacted, who may inspect it and on what trigger.
5. Record CLI exit status in every published manifest. Accepting a
   late-failing run is defensible; hiding that it happened is not.
6. Fail-closed when a provider or configuration cannot be verified.
   Yes, and it is already the three-seat rule. One guard: relaxing the
   boundary to unblock a run is a dated public decision, never an in-run
   judgement. Publish the parked queue so paused does not read as
   abandoned.

## Where I disagree

"Independently verified real filesystem boundary" is not a claim this
project can honestly make about a third party's CLI. Verified should
mean a canary that would have caught this leak ran on that version, in
that run, and found nothing. Publish the canary result, drop the word
certified.

## What would change my answer

Rejection if the correction ships after the code, or if hashes are the
only audit route offered. Unconditional approval if the per-run canary
result and the CLI exit status both reach the public manifest.
