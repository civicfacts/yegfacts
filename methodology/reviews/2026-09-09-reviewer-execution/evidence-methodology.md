> Independent advisory memo, September 9, 2026. Model: `claude-opus-5`, high effort. Separate session for this role; no other role memo supplied. The memo below is preserved unchanged. Claims and recommendations are not all adopted: read [DISPOSITIONS.md](DISPOSITIONS.md), including its factual corrections. Original memo SHA-256: `fa9cd0a8d1429e12f6830d9c8b47bba2d3623c59cc991931b39c267f835291cf`.

# Evidence & methodology — reviewer execution boundary and response retention

Role version 1.0, independent read-only session. Read: the role contract, the
brief, D-0019, D-0020, D-0025, D-0033, D-0034, the reviewer wrapper, the probe
outputs. No repo touched.

## Fit

Two different proposals are bundled here and they need different governance.

**Enforcement.** Retaining every attempt, failing closed on unverified
configuration, and blocking injected private context are already promised by the
published record. Methodology v1.14 says in public that blindness comes from the
scratch directory holding only the package. The roads audit shows that sentence
is false: the working directory never bounded what a CLI loaded from its own
configuration. Fixing that is enforcement, and it is overdue.

**Capability change.** Turning off local shell and file tools by default is not
enforcement. D-0025 granted the Google seat a shell because a seat that cannot
read the documents a brief names is not an independent reviewer of them, and
D-0034 records that seat's tool behaviour as untested. A boundary that blocks
PDF work changes what the panel can research and what a "Not established"
verdict means. That is a methodology change, not an enforcement ticket.

## Benefits

The audit trail finally gets what it claimed. Today raw stdout, stderr,
validation errors and the complete final response live in the scratch directory,
and the exit trap deletes it on success. What survives is a schema extract. The
lost citation footer is the predictable result of that design, not an accident
of hand-copying. The retry also overwrites the same raw file, so attempt one's
text is gone before attempt two is judged. Per-attempt retention is the only way
a later erratum about a seat's words can be checked against those words.

## Risks

1. **Success recorded for a crashed run.** The wrapper tolerates a nonzero exit
   on both attempts, though its own comment claims only attempt one, and the
   manifest records status `ok` with no exit code. If the new layer keeps exit
   status privately while the manifest stays silent, the public record is still
   unfalsifiable. Put the exit status in the manifest.
2. **Comparability.** Runs under a tools-restricted boundary are not the same
   experiment as the published runs. Do not present them as continuous, and do
   not read a thinner finding as movement in the evidence.
3. **Private-only retention.** Withholding raw material is right under the
   exposure rules, but a published hash with no retention term and no named
   party who can be asked to produce the original is decoration.
4. **Flag optimism.** In the probe set, `--ignore-user-config` and
   `--ignore-rules` were rejected outright. Those probes hit a debug subcommand,
   not the pinned exec path, so this is an implementation unknown, not proof
   that isolation is unreachable. It does mean no flag enters a pinned command
   or a methodology version until it is demonstrated on the pinned invocation
   itself.

## Recommendation (committed)

Conditional approval, split in two.

Approve now: per-attempt retention of package, stdout, stderr, complete final
response and exit status outside the public repo; exit status in the manifest;
fail closed on unverified configuration; no injected memory or project context.

Not yet: a tools-only default. It needs its own methodology version, a public
note that the panel may be blocked on PDF-heavy sources, and an explicit
statement of where it leaves D-0025.

Disclose before release: an erratum correcting the v1.14 blindness sentence in
the public changelog, not only a dated journal correction; which published runs
ran under that false claim; and the retention terms for raw material.

Fail-closed on one unavailable provider is right. The synthesis matrix is
defined for three verdicts. Two seats is not a degraded panel, it is a different
method.

## What would change my mind

Flags demonstrated on the pinned invocation, with a canary proving a planted
private fixture is unreachable while a live public fetch still succeeds, plus
evidence that shell access survives behind a real filesystem boundary. Then the
capability question disappears and this is enforcement all the way down.
