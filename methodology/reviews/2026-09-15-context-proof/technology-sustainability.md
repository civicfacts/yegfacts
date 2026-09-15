> Independent advisory memo, September 15, 2026. Model: `claude-opus-5`, high effort. Separate session for this role; no other role memo supplied. The memo below is preserved unchanged. Claims and recommendations are not all adopted: read [DISPOSITIONS.md](DISPOSITIONS.md), including its factual corrections. Original memo SHA-256: `239b550808e3ed641aeff4a4473699a404f2562d52ed36b1a907db7d48e34d31`.

Model: claude-opus-5, independent session, role: Technology & Sustainability, 2026-09-15.

## Fit

This fits the stack and my preference for files over services: one
dependency-free Node script, one checker, launcher changes, no container, and
no global config or credential change. The proxy starts and stops inside the
attempt. That is a script and a convention, not standing infrastructure, with
one exception: the pin table is standing state and the only part with a shelf
life.

## Benefits

The captured bytes are the durable, vendor-neutral asset: they stay evidence
even if every pin rots, and the same proxy works for any CLI honouring a
base-URL setting, so optionality on the other two seats is preserved. Marginal
cost per attempt is close to nothing: no API spend, milliseconds of proxy
time, some disk, and the canary launch predates this batch. The public
manifest row carries hashes, counts, upstream and outcome only; the resolved
executable path is excluded by name and no archive path or disclosed block
goes public. The split is respected in code.

## Risks

Version rot is the serious one. This machine keeps about five builds: 2.1.269
through 2.1.273 are present, while 2.1.266 and 2.1.267, named in the plan as
no longer installed, are gone. At five releases a week a pinned build survives
about a week before the updater prunes it, so running it from the installer's
own per-version directory buys days, not a month. What breaks when nobody
touches this for a month: the launcher refuses, the right failure, and the
panel stays dark until someone runs fresh probes and re-derives eight pins by
hand. There is no repin tool, and the second hand repin under deadline is
where someone loosens a check.

The gate also mixes properties that rot with properties that do not. The
structural facts (no system block but the vendor's, exactly two tools, four
reminder blocks, the package byte for byte, no reminder text after the first
message) carry nearly all the anti-contamination value and survive version
bumps. The vendor prompt hash and the three side-request hashes rot on the
vendor's schedule. The cheapest version preserving optionality is to gate on
the structural facts and record the prompt hashes as dated observations,
published when one changes, so repinning becomes appending a hash.

Smaller: the session-title request sends the package before the main turn, so
a research run that later fails its proof has already sent it. Disclosed, but
no refusal wording should imply otherwise. The hand-written verification
record must not quote the disclosed block verbatim, since the working
directory is an absolute path naming the operator's account. I could not
confirm the suite green here: thirteen failures are missing-tsx errors from a
checkout without installed dependencies, and every proof test passed.

## Recommendation

Conditional approval. Conditions: copy the pinned build out of the auto-pruned
versions directory and record its hash, so admission does not expire on the
updater's schedule; before the next version bump, ship a repin script or split
the gate as above; and make a missing pinned build refuse with its own
message, distinct from an unprobed version.

Both follow-ups are right. Running the pinned binary directly is necessary,
not optional, and does not by itself fix rot; refusing to install an
unadmitted review closes a gap I would otherwise have named. Publishing v1.29
with one seat is honest, because the entry says plainly that the panel cannot
run. Measured evidence that the installer retains a pinned version
indefinitely would drop the first condition.

## Cost estimate

Sunk this batch: roughly six to ten founder-hours. Per attempt: no dollars,
subscription CLIs only, plus tens of megabytes of archive. Recurring: one to
three hours per accepted CLI upgrade by hand, twenty to thirty minutes with a
repin script or the split gate. The conditions above: two to four hours. These
are estimates, not measurements, and no claim should rest on them.
