> Independent advisory memo, September 15, 2026. Model: `claude-opus-5`, high effort. Separate session for this role; no other role memo supplied. The memo below is preserved unchanged. Claims and recommendations are not all adopted: read [DISPOSITIONS.md](DISPOSITIONS.md), including its factual corrections. Original memo SHA-256: `e8cbef9db9123b604500ebb272cf65c2808e041300a3d2de3a22056f58dcf917`.

Model: claude-opus-5, independent session, role: Product & Audience, 2026-09-15.

## Fit

The change sits where my September 9 disposition said it should: execution
detail on the methodology page and in run records, not on a badge and not above
any question's answer. The public queue stays visible. No story page changes, so
the first ten seconds on a finding are untouched. That part is clean.

Against the charter's three depths the new copy is uneven. At ten seconds the
heading, "Reviewer execution: correction and current limit", tells a resident
there is a limit, and the September 15 paragraph opens plainly. At ten minutes
the thing a journalist came for, that the three-model panel still cannot run and
the commissioned Gemini source check is still blocked, is the fourth sentence of
the fourth paragraph, after 230 words about proxies and fingerprints. Move it to
the front. "Fingerprint" for a hash is a good translation; "recording proxy" is
not. At an hour a researcher gets the pins, the hashes and the dispositions
through the changelog, which is enough.

The real depth failure is above that section and predates this branch. The short
version still says, present tense, that three models research every claim blind
and names all three. A ten-second reader is never told that none of this has
happened since September 4. v1.29 sharpens the problem rather than creating it:
a skimmer who reads that the Claude seat may now run will reasonably conclude
reviews have resumed.

## Benefits

For the audience that cares about the pause, this converts "we cannot show what
the reviewer was told" into "here is what it was told, including the operator's
account email". Disclosing the email rather than stripping it is the right call
and is the most credible sentence in the release. It gives a journalist something
concrete to quote, and it dates the record before the seat was admitted rather
than after.

## Risks

v1.29 is the third consecutive methodology release about the checking apparatus,
published on the sixth day of a blocked brief. Each is honest alone. Together
they read, from outside, as a site whose only visible output is documentation of
its own machinery. Publishing still beats silence, so publish, but the cadence
is now the audience risk, not this entry.

The concrete defect is that the consultation question's visible pause reason
becomes false on merge. It reads "no reviewer setup yet meets the execution
requirements", and after v1.29 one does. Nothing in the branch touches the
register, and no page anywhere links to the methodology anchor that explains the
pause, so a reader on the queue hits a dead end and a stale one.

## Recommendation

Conditional approval. Conditions, all copy, none blocking the code:

1. One dated sentence in the short version, at or under step three, saying no
   panel has run since September 4 and linking to the reviewer-execution
   section. Without it the ten-second layer states something untrue.
2. Rewrite the consultation pause reason to something like: paused as of
   September 15, 2026, the independent source check is unfinished and only one
   of the three reviewers can currently run, and a finding needs all three. Link
   the methodology section from it.
3. Lead the September 15 paragraph with what remains blocked.
4. State in the board record that v1.29 does not reset the two-week
   blocked-brief clock. A seat admitted is not a finding published; that trigger
   still falls on September 23.

## Smallest testable version

Ship the code and the changelog entry as written, plus conditions 1 and 2 only,
which are two sentences and one link. Then ask one reader who has not followed
this work to answer one question from the home page inside a minute: can
YEGFacts publish a new finding today? If the answer is wrong, the copy failed
regardless of how exact the proof is.
