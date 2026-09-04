# Note for the register: one claim dropped at the brief

Question: `cycling-volumes`. Recorded 2026-09-03 by Stew.

## What happened

`intake/register.yaml` lists nine claims under `cycling-volumes`. Eight
went into the frozen brief in this directory. One did not.

- **Claim:** `heritage-days-bike-arrivals`
- **Registered proposition:** "More than five people rode bikes to
  Heritage Days within an hour of opening on the Saturday."
- **Captured wording:** "Looks like more than 5 rode to Heritage Days
  (this was within an hour of opening on the Saturday)."
- **Outcome:** dropped at the brief. It is not sent to the panel and it
  will carry no finding.
- **Reason, for publication:** No public record counts bicycle arrivals
  at one event within one hour of its opening, so no evidence could
  establish or refute it in either direction. It is also a rhetorical
  rebuttal rather than a proposition: the comment answers the thread's
  opening line, "All 5 people who ride bikes showed up?", and its work is
  to deny that joke rather than to assert a countable fact anyone is
  arguing about.
- **What would reopen it:** a published count of arrivals by mode at an
  Edmonton event, covering the day and hour named.

## Why this is a note and not an edit

Under the register's current model a claim carries no state of its own,
with one exception, an accusation declined for right of reply. There is
no field for a claim dropped at the brief, and inventing one in a
hand-edit would put the register out of step with
`scripts/intake-register.ts`, which generates it, and with
`scripts/validate.ts`, which checks it.

So this note is the record for now. Making the drop visible on
`/considered` needs a small change to the register model and its
validator, which belongs in its own change with its own methodology
entry, not smuggled into a brief. Until then, the reason above stands
here, committed beside the brief that made the decision, and the story
for this question will state that one captured claim was dropped and why.

## What the change should look like when it is made

A claim gains an optional `dropped` block, carrying `at: brief`, the
reason in one public sentence, and the run directory that decided it.
`/considered` prints it under the question, in the same shape as a
declined question's reason. The register's header comment gains it as a
second exception to "a claim carries no state of its own".
