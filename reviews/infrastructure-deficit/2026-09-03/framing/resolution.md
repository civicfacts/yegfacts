# Editor's resolution after framing check 2 (Stew, 2026-09-03)

Under the cap (methodology v1.12, carried into v1.19), after the second
report the editor resolves in writing every finding still OPEN or
WEAKENED, the brief is revised once more, and the third report is a
confirmation. Check 2 (framing/check-2.md) resolved twenty-one findings
from check 1, left one WEAKENED and one OPEN, and raised five new ones.
All seven are resolved here. Six are adopted. One is refused on the
published record, and the refusal is shown rather than asserted.

## Standing from check 1

### Check 3, WEAKENED — the title promises an outcome the brief does not test

Adopted. The first revision took the trend word and drainage out of the
title but replaced them with "have fixed them", which promises that
spending the money on roads would have repaired them. Nothing in the brief
tests that. Claim 2 tests whether the funding could have gone to renewal;
Claim 3 tests how big the sum is beside the shortfall; the unit-cost
figure is conditional and carries no verdict. The check is right, and it
is right for the second time about the same sentence, which is my error
rather than its persistence.

The title is now the check's own three-part structure, in the site's
words:

> Are Edmonton's roads in poor shape, could the $100 million for bike
> lanes have gone to road renewal, and how large was it beside what the
> City says it is short of?

Each clause is one claim, in the order the claims run. Nothing in it
promises an outcome. I have used "what the City says it is short of"
rather than naming the City's published heading for the gap, because the
panel establishes that heading and the title should not presume it.

### Check 7, OPEN — drainage financing is a proposition nobody made

Adopted, and my earlier refusal was wrong. I resisted deleting the
drainage calculation on the ground that a reader arriving from a thread
where drainage sits beside roads would otherwise assume the two budgets
are one. The check's answer is that calling a thing context does not cure
a scope expansion, and re-reading my own defence against the revised
brief, the defence had already lost its footing: it rested on drainage
being in the question's title, and the first revision took it out. With
the title fixed, the calculation was asking three reviewers to research
utility ownership, rate regulation and the legal mechanism for moving
money between budgets, for a question no captured wording asks, and the
scope section was already forbidding the story from saying anything about
it. The calculation was doing work the prohibition had already done.

So: source 9 is deleted, required calculation 6 is deleted, and the
calculations are renumbered.

B6 is kept, and reduced to what the check asked the scope section to
retain. It no longer commissions any research. It now says only that
drainage is not assumed to be in the City's budget, is not tested, is in
no renewal set in this brief, and that neither the reviewers nor the story
may say or imply that bike-lane money could or could not have gone to
drainage. Keeping that as a basis rule rather than a scope line is
deliberate: a rule in the basis section binds every claim and cannot be
relaxed once figures are in view, which is a stronger guarantee than the
same sentence in Scope, and it costs the panel nothing because it asks for
nothing. The scope line stays as well.

## New in check 2

### Check 2, new — Claim 2 was a compound proposition with one half unclassified

Adopted, verbatim. The proposition carried two factual components — that
half the money was eligible for renewal, and that the City was reporting
an unmet renewal requirement at the time — and the ladder classified only
the first. A reviewer could have returned Supported on the funding half
with the second half unestablished, and one verdict would have stood for
both. The proposition is now the check's:

> At least half of the $100 million council approved for CM-20-0330 came
> from funding sources that permitted road or alley renewal instead.

The renewal gap lives in Claim 3 and in required calculation 4, where it
is established rather than assumed.

### Check 5, new — Claim 2 told reviewers a component was already established

Adopted. The sentence saying the unmet requirement "is reported as fact;
it is established in required calculation 4" told reviewers where to land
on something they are supposed to establish. It is gone with the
qualification that carried it, and required calculation 4 already asks the
panel to determine whether the City publishes the pair at all and to
report the nearest thing it does publish, unclassified, if it does not.

### Check 8, new — Claim 2's Contradicted stakes overstated ineligibility

Adopted. "It was money that existed for this purpose or for nothing" does
not follow from a source being barred from road and alley renewal; such a
source may well permit other capital work. The Contradicted entry now says
what the ladder establishes — that none of the programme's identified
funding could have gone to road or alley renewal — and adds in terms that
neither the verdict nor the story may say the money existed for bike lanes
or for nothing.

### Check 9, new — the condition inventory predates the claims

Adopted in substance; the proposition itself is left in plain words, and
that difference is argued rather than slipped through.

The finding is right and it is one neither the drafter nor check 1 caught:
the latest published condition rating describes the network as of a date
well before the claims were made in August 2026, and the brief said
nothing about it. It now says a great deal. The Dates section requires two
dates for the rating, never one — when it was published and what date its
data describes — and requires the reviewer to say so if the report does
not state the second. "Who asks this" now names this as the second thing
the record cannot do, alongside the per-street limitation, in the check's
own words. Claim 1 has a new paragraph fixing the date the verdict is
computed on, requiring the story to carry that date wherever it carries
the verdict, and forbidding either from asserting the roads were in that
condition in August 2026. The qualification reporting the D-and-F share
now requires both dates. The not-tested list and the scope section both
name the condition of the network at any later date.

What I have not done is rewrite the proposition as "In Edmonton's latest
published condition inventory, based on data as of December 31, 2024, the
City's Roads asset class was in poor condition under the brief's
predeclared thresholds." That is the record's vintage and the record's
vocabulary put into the sentence a reader is asked to judge, and check 9
of the framing prompt is the check that forbids exactly that: a
proposition stated in the units the record happens to publish, when nobody
would ask it in those units, fails even if everything else passes. Nobody
asks whether an asset class was in poor condition in an inventory. The
brief's own B7 settles where the difference goes — into the claim's
section, not into the proposition — and it is now there at four separate
points, each of them binding on the story as well as on the panel. If the
check holds this open on report 3, it parks on a disagreement about where
a caveat lives rather than about whether it is stated.

### Check 4, new — the open-data assets: refused, on the record

Not adopted. The check found that `dtuf-twc2` "is empty, private or
deleted" and that `4s3w-mdwf` "exposes no dataset content", and asked that
the brief stop relying on them and stop requiring reviewers to report
their fields.

I tested this before adopting it, as every correction to this brief has
been tested. Both assets resolve publicly on the freeze date. The dataset
returns HTTP 200 from the anonymous API under the name the brief gives it,
"Neighbourhood and Alley Renewal", and carries 137 rows. Its fields are
neighbourhood, type, construction year start, construction year end and
geometry. The map is not a separate empty asset: it is a view derived from
that dataset, which is why its own landing page shows no independent
content. The check appears to have read a visualization endpoint rather
than the asset.

The finding is therefore wrong on its facts, and adopting it would put a
false statement about the City's open data into a brief that is about to
be frozen. But the concern underneath it is sound, and the fields are the
reason: not one of them is a condition grade. That is precisely why alleys
get no verdict in this brief, and having the panel list those fields on
the record is how the site proves the point rather than asserting it. So
source 3 keeps the field-reporting requirement and gains three things: a
note that both assets resolved publicly on 2026-09-03; the check's own
instruction to search the current catalogue and the condition-report
materials for any other alley condition measure and name any usable source
found; and a rule that a reviewer whose tooling cannot reach an asset says
so in `limitations` and reports what it could reach, rather than treating
an access failure as evidence that the City publishes nothing. That last
rule is drawn directly from what happened here.

## What report 3 is being asked to confirm

Six adoptions, one refusal shown against the published record, and one
adoption where the caveat is placed in the claim's section rather than in
the proposition, for a reason the framing prompt's own check 9 supplies.
Nothing in the basis section has been loosened at any point across the
three drafts. B2 was tightened once, B3 twice, B4 once, and B6 reduced to
a pure prohibition.
