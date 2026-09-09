# Reviewer execution and complete response retention

Decision date: September 9, 2026. Methodology v1.28.
Editor: Stew, OpenAI GPT-6 Astra. The founder authorized the correction and
runner repair, including proceeding without another approval question.

## Question put to the reviewers

The [roads trace audit](../../../reviews/who-pays-for-roads/2026-09-03/verification/audit-2026-09-09.md)
found host memory outside the declared package; the third framing check read
and cited it. One committed report omitted a provenance footer present in its original
session trace. Separately, inspection of the panel wrapper found that retries
overwrote raw output and successful runs deleted it.

All four advisory roles received the same written proposal in separate Opus 5
high-effort sessions: suppress host customizations, retain complete per-attempt
output outside Git, fail closed if the execution profile cannot be demonstrated,
and keep public-web research. A filesystem boundary was an option for keeping
shell tools, not a requirement to build a container. Reviewers were asked to
separate enforcement from reduced research capability, address the prior shell
grant, and preserve disagreements. These are governance reviews, not independent
research seats or proof that the implementation works. All four used the same
vendor; the synthesis was written by a different vendor.

## Decision

Adopt retention and checked execution together. A scratch working directory
never justified the claim that reviewers could not receive private instructions.
Correct that claim publicly now, preserve the historical record, and stop new
reviewer launches that cannot meet the new checks. No historical run is certified
by this change, and no finding is changed by it.

Use native CLI controls and a public-web-only tool profile. Do not build a
filesystem jail in this batch. Each attempt must have a separate synthetic
canary under the same profile, observed tool/request evidence, and retained
results. That evidence has limits: it is neither a vendor-wide guarantee nor
proof that every possible leak has been ruled out. Unknown versions and missing
proof fail closed. No operator override may silently bypass this rule.

This explicitly narrows the earlier shell-access decision (private D-0025,
publicly reflected in v1.14). A future shell-enabled profile needs its own
recorded demonstration. Web tools may fail on PDFs that shell tools could read;
if a required source is inaccessible, stop. Do not translate that execution
failure into “Not established.” The model pins, three-vendor panel and existing
framing-check caps remain. Roads and infrastructure stay parked. Consultation
still requires its Google source-existence audit; no extra framing check is
created or authorized here.

## Disposition by role

### Evidence and methodology — conditional approval

**Adopted:** distinguish enforcement from capability change; release v1.28;
correct the v1.14 scratch-isolation claim; publish exit status and retention
terms; preserve the three-seat requirement. The tools-only profile is approved
as an explicit capability change, not a claim of research parity. There is no
requirement to preserve shell access at the cost of an unverified boundary.

### Technology and sustainability — conditional approval

**Adopted:** native controls, version checks, refusal on failure, no filesystem
jail. A shared invocation layer is justified because the batch supplies two
callers: panel reviews and prepared-package framing/source audits. Retention and
execution checks ship in one batch so no interim path remains silently unsafe.

**Not adopted:** a convention plus disclosure is not enough to admit a reviewer
under the new contract. The memo's time, storage and cost figures are estimates,
not measured results; no cost claim rests on them. A two-minute canary target is
not a promise about network or model latency.

### Public trust and governance — conditional approval

**Adopted:** ship the correction with the fix; check each attempt, not only a CLI
version once; put proof outcome and exit status in public records; disclose
reduced retrieval; provide an inspection route and retention term. “Certified”
is not the claim. All findings published before v1.28 predate the new check;
that does not establish that each received private context.

**Not adopted:** accepting valid JSON after a nonzero exit. The new wrapper
rejects it. A future exception would need an explicit public decision, not an
in-run judgement.

### Product and audience — conditional approval

**Adopted:** put execution detail on the methodology page and in run records,
not badges or above a question's answer. Keep the public queue visible. Track
blocked briefs and time since the last finding in private state; two consecutive
weeks with an execution-blocked brief triggers a design review, not an automatic
loosening of the rule or a new claim slate.

**Not adopted:** rerunning a published PDF-heavy story until it returns the same
verdict as a release criterion. That spends a new panel without an evidentiary
need, and agreement with an old result is not a test of independence. The memo's
42-of-164 PDF count was not independently verified for this decision; it is not
used to quantify the impact. The narrower claim that PDFs matter to these
questions is sufficient to disclose the risk.

## Corrections to the advisory memos

The Evidence memo attributes the omitted footer to the panel wrapper. That
causal claim is unsupported: the roads checks used ad-hoc commands. The Trust
memo says no original was kept; that is false. Original session traces survived
and enabled the audit. Technology's statement that ad-hoc copying lost the
footer also goes beyond the evidence: who or what removed it is not established.
The wrapper's overwrite/deletion behaviour is a separate verified defect.

The initial Codex probes mentioned in the memos used a diagnostic subcommand.
A later test used the actual pinned exec path. It accepted the ignore flags but
still received host instructions, and disabling the code-mode host prevented the
public fetch. Only that tested profile is rejected by this result; it does not
prove every Codex configuration impossible. Google has no demonstrated profile;
no new source-audit attempt was made through its old command in this batch.

## Implementation discovery: the candidate proof was insufficient

The initial Claude diagnostic assessment treated absence of host text in a debug
log as evidence of absence from the request. Implementation inspection corrected
that: the log contains request identifiers, not request bodies. Startup tool and
customization lists do not expose automatically injected instruction text either.
The candidate therefore lacks the context proof required by this decision.

Stew directed the implementer to fail closed for Claude as well if that proof
cannot be obtained with a narrow native check. The approved fallback is no
admitted research profiles, retained candidate diagnostics and capture plumbing,
not a weaker definition of independence. No new framing, source-audit or panel
research is authorized through the candidate path. The final verification record
states what the released implementation demonstrated.

## Retention and inspection

Retain exact packages, stdout/stderr, complete final responses including trailing
provenance, execution evidence, diagnostics, exit statuses and hashes for every
attempt, before extraction. Store originals privately outside Git worktrees with
owner-only permissions. Retain them while the associated public record exists;
no automatic deletion. Existing successful outputs are immutable to the runner.
Public records contain identifiers, hashes and outcomes, not local archive paths
or raw traces.

Ildar Abdulin is responsible for the archive. Requests to
[research@yegfacts.ca](mailto:research@yegfacts.ca) can seek a hash comparison or
redacted excerpts; privacy and rights review precedes sharing. A hash proves
neither public availability nor that a model's findings are true. This policy
cannot restore artifacts deleted by earlier tooling.

## Execution evidence and release

The implementation plan is [recorded separately](../../../docs/plans/2026-09-09-reviewer-isolation.md).
The checked command, tests and live-canary result belong in
[verification.md](verification.md). Governance approval is not a substitute for
those checks. New panels remain blocked until all three vendor profiles can
perform the required research under the execution contract.
