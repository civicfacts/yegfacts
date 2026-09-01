# Source verification — winter-cycling

Gate stage 7, AI-automatable portion. Run date 2026-09-01 (story run `2026-09-01`).

**Method.** Every `key_fact` in `src/content/claims/wc-too-cold.yaml`, plus the
six TL;DR bullets, the `one_line` and the `short_answer` in
`src/content/stories/winter-cycling.mdx`, was checked against the archived bytes
of its cited evidence only. No web access was used. Registry entries under
`evidence/registry/YF-EV-*.yaml` gave the `archive.path`; HTML archives were
stripped to text, PDFs were extracted with `pypdf` (`pdftotext`, `mutool` and
`qpdf` are not installed). All four PDFs extracted cleanly — 36, 18, 14 and, for
the Census table, a legible column layout — so nothing here rests on an
unreadable archive. The Finnish-language archive (YF-EV-0023) was read in the
original.

**Integrity check.** All eight archives match the `archive.sha256` recorded in
the registry. The bytes audited are the bytes the registry claims.

| ID | Archive | Pages / size | sha256 |
|---|---|---|---|
| YF-EV-0023 | City of Oulu, 2021 travel survey results (Finnish) | HTML | match |
| YF-EV-0025 | City of Oulu, Cycling | HTML | match |
| YF-EV-0026 | City of Edmonton, Cycling in a winter wonderland | HTML | match |
| YF-EV-0027 | City of Edmonton, Winter Bike Riding | HTML | match |
| YF-EV-0028 | Calgary Centre City Cycle Track Pilot final report | 36 pp | match |
| YF-EV-0029 | U.S. Census Bureau ACS-25 | 18 pp | match |
| YF-EV-0030 | Active Travel Studies, winter cycling in Québec | HTML | match |
| YF-EV-0031 | Kajosaari et al., Journal of Transport & Health | 14 pp | match |

**Grading.** VERIFIED = the archive supports the statement as written.
PARTIAL = the archive supports the substance but at least one asserted detail is
not in *that* archive, or is stated more strongly than the archive allows.
UNSUPPORTED = the archive does not contain it.

This story is the hardest of the three to audit, because it runs four
incompatible denominators side by side and leans on a single decisive comparator.
The good news first: **every number in the published text is correct against the
bytes.** All four denominators are labelled wherever they appear, and the
limitations already say the figures "are not aggregated and cannot be ranked
against each other," which is the honest handling. The two substantive findings
below are about *attribution* and about how hard one statistical result is being
pushed — not about arithmetic.

---

## Claim: `wc-too-cold`

### KF-1 — cited YF-EV-0023 — **PARTIAL**

> "Oulu's 2021 regional travel survey measured 18% of all trips in the Oulu region
> made by bicycle, and found that even in winter residents cycled on average one
> trip in ten. More than 2,500 regional residents answered, and the survey found
> the region's cycling share the highest in Finland."

Every figure is verified in the Finnish original:

> "Lähes joka viides matka (18 %) pyöräiltiin." — *Almost every fifth trip (18%)
> was cycled.*
>
> "Oulun seudulla pyöräily on ympärivuotista ja talvellakin seudun asukkaat
> pyöräilivät keskimäärin joka kymmenennen matkan." — *In the Oulu region cycling
> is year-round and even in winter the region's residents cycled on average every
> tenth trip.*
>
> "Pyöräliikenteen osuus tehdyistä matkoista on Oulun seudulla selvästi Suomen
> suurin." — *The share of cycling in trips made is clearly the largest in Finland
> in the Oulu region.*
>
> "Oulun seudulla tutkimukseen vastasi yli 2 500 asukasta." — *In the Oulu region
> more than 2,500 residents responded to the survey.*

18%, one trip in ten, >2,500, highest in Finland. All four check.

**The survey is misattributed.** It is not "Oulu's" survey. The archive is
explicit: "Valtakunnallinen henkilöliikennetutkimus on vuodesta 1974 alkaen noin
kuuden vuoden välein toteutettu tutkimus… Tutkimustiedon keräämisestä vastaa
Traficom. Oulun seutu on osallistunut tutkimukseen vuosina 1996 ja 2021
lisäotoksella." — *The national travel survey has been conducted roughly every
six years since 1974… Traficom is responsible for collecting the survey data. The
Oulu region participated in 1996 and 2021 with an additional sample.*

So this is Finland's **national** travel survey (Henkilöliikennetutkimus 2021),
run by Traficom, in which the Oulu region bought an oversample; the archive is the
City of Oulu publishing its own region's results. The registry entry gets this
exactly right — "What the 2021 Finnish national travel survey measured for the
Oulu region" — and the published claim does not.

This matters more than a naming quibble. The single most load-bearing number in
the story is the winter one-in-ten, and "Oulu's own survey" reads as a city
measuring itself, where "the national survey's Oulu oversample" reads as an
independent instrument applied consistently across Finnish regions. The second
framing is both accurate and *stronger* for the story's purpose — the same
instrument produced 7–12% cycling shares in other Finnish regions, which is
exactly the comparability the claim wants.

The same misattribution repeats in TL;DR 1, the `short_answer` and the story body.

*Fix:* "Finland's 2021 national travel survey measured 18% of all trips in the
Oulu region made by bicycle…" — one word changed, four places.

*Second, smaller point.* The claim's conclusion calls one-in-ten "a double-digit
winter share." Ten per cent is double-digit by exactly one digit, and the archive
says "on average every tenth trip" rather than giving a percentage. The phrase is
defensible but it is the most rhetorically loaded reading of the number available.
"A winter share of roughly one trip in ten" carries the same argument without
leaning on the boundary.

### KF-2 — cited YF-EV-0025 — **VERIFIED**

> "Oulu reports its result alongside 930 km of cycle lanes and 165 km of 'Super'
> class lanes in the Oulu and Kempele regions that the city says are kept in great
> condition 24 hours a day. That is the network and maintenance policy Oulu
> states, not an audited service level."

Archive, verbatim: "930 km of cycle lanes" and "The cycle lanes that are
maintained according to class Super are kept in great condition for 24 hours every
day. 165 km of cycle lanes located in the regions of Oulu and Kempele are included
in class Super."

The qualifier is doing real work and is correct: the page is Oulu describing its
own maintenance classes, not a compliance report. The fact says so in its own
second sentence. This is the right way to cite a city's self-description.

### KF-3 — cited YF-EV-0026 — **VERIFIED**

> "Edmonton's own counters are not empty in winter: the City reports more than
> 90,000 bike trips counted in December 2023, an increase of 143 per cent over the
> previous December, and estimates one in four Edmonton cyclists ride year-round.
> These are trips counted at instrumented locations, not unique riders or a share
> of all trips, and the City publishes no counter-coverage note with the
> increase."

Archive, verbatim: "The City of Edmonton estimates one in four cyclists ride
all-year round. More than 90,000 bike trips were counted in December
2023—an increase of 143 per cent over the previous December."

The three caveats are all correct against the bytes. I read the archive in full to
check the last one specifically: there is no note anywhere on the page about how
many counters were operating in either December, nor about routes opened between
them. The claim's refusal to treat the 143 per cent as a clean growth rate is
warranted by the archive's silence, not merely cautious.

### KF-4 — cited YF-EV-0027 — **VERIFIED**

> "…Priority 1 active pathways cleared in 24 hours, Priority 2 in 3 days, Priority
> 3 in 14 days, and a connected Winter Priority Loop at Priority 1. The City frames
> the clearing as best efforts…"

Archive, verbatim: "The City will make its best efforts to plow and remove snow in
bike lanes after the end of a snowfall. Each active pathway in Edmonton is
assigned a priority level; 1, 2 or 3: Priority 1 is cleared in 24 hours Priority 2
is cleared in 3 days Priority 3 is cleared in 14 days" and "Priority 1 active
pathways create a connected loop that is cleared within 24 hours for winter
travel."

"Measured from the end of a snowfall" is a light inference from "after the end of
a snowfall," and a sound one. The "no compliance audit was found by any reviewer"
clause is a statement about the review, honestly framed as such.

### KF-5 — cited YF-EV-0028 — **VERIFIED**

> "Calgary … counted on average four times as many daily winter bicycle trips on
> its centre-city cycle-track corridors comparing January 2015, before the tracks,
> with January 2016, after them, and over 160,000 bicycle trips on the pilot
> network between November 2015 and the end of March 2016."

Archive p.21, verbatim on both:

> "On average, there are four times as many daily winter bicycle trips than before
> the cycle track was installed when comparing January 2015 (before the cycle) and
> January 2016 (after the cycle)."
>
> "Over 160,000 bicycle trips occurred between November 2015 and the end of March
> 2016."

"On average" is preserved, both January dates are named, and the corridor
restriction is stated in the claim's own closing sentence ("The comparison is
corridor-specific, not citywide"). The "protected tracks" description used in the
TL;DR is supported by p.5: "The pilot project created a 6.5 km network of
protected bike lanes."

"Edmonton's nearest large winter-city peer" is editorial framing rather than an
archive statement; the claim's `comparisons` entry says the same thing and adds
the Chinook caveat, so the reader is not left with an unqualified equivalence.

### KF-6 — cited YF-EV-0029 — **VERIFIED**

> "On one common journey-to-work denominator, the U.S. Census Bureau recorded a
> 4.1% bicycle commute share in cold-winter Minneapolis for 2008–2012, against
> 0.4% in Houston, 0.7% in Phoenix, 0.2% in San Antonio and 0.1% in Dallas."

Minneapolis is stated twice in the report's own prose — p.5: "4.1 percent of
workers in the city of Minneapolis commuted by bicycle"; p.6: "increasing from 1.9
percent in 2000 to 4.1 percent in 2008–2012."

The four comparator cities come from Table 1 (p.8), whose column layout I aligned
and then checked against two independent anchors in the report's prose — Portland
at 6.1% and Minneapolis at 4.1%, both of which land in the correct row positions.
With the alignment confirmed, the ACS 2008–2012 bicycled column reads: Houston
0.4, Phoenix 0.7, San Antonio 0.2, Dallas 0.1. All four match.

The denominator caveat in the claim's own second sentence — "annual commuting, not
winter trips, and the table does not say what caused the gap" — is exactly right,
and the report itself makes the same point about the difference between city and
metro geographies.

### KF-7 — cited YF-EV-0030 — **VERIFIED**

> "Winter genuinely thins cycling out in Canada. A peer-reviewed Québec study
> reports winter cyclist retention of 13.6% in Montréal for the 2020–2021 season,
> and 9.09% in Sherbrooke, 6.96% in Gatineau and 4.35% in Saguenay — the share of
> cyclists who keep riding, not a share of all trips."

Archive, verbatim: "In Montréal (Québec, Canada), the higher retention rate for
cyclists in winter since 2012 was 13.6% for the 2020–2021 season (Poirier and
Thériault, 2021)… Retention rates were 9.09%, 6.96%, and 4.35% in Sherbrooke
(semi-urban), Gatineau (semi-urban), and Saguenay (rural), respectively (Vélo
Québec, 2021)."

The verb choice is what earns this a VERIFIED rather than a PARTIAL. These figures
are not the paper's own measurements — they appear in its literature review,
attributed to Poirier and Thériault (2021) and Vélo Québec (2021). The claim says
the study "**reports**" them, which is accurate, and the registry entry says the
same ("Winter cyclist retention rates the paper reports for Québec, citing Québec
sources"). Someone was careful here.

Two details a reader should hold. The archive describes 13.6% as "the **higher**
retention rate … since 2012" — that is, Montréal's best season since 2012, not a
typical year. And the `comparisons` entry describes these as "Cold Canadian cities
with **measured** winter cyclist retention", which shades slightly toward implying
the paper measured them; the key_fact's "reports" is the better formulation and
should be used in both places.

### KF-8 — cited YF-EV-0031 — **PARTIAL**

> "In a longitudinal study of 384 adults in the Helsinki metropolitan area,
> residential density and travel-related urban form predicted who kept cycling
> through winter, while the length of the cycling network and the winter
> maintenance of cycleways did not contribute significantly once those were
> accounted for."

The negative half is verbatim and exact. Archive p.10:

> "environmental variables measuring the length of the pedestrian and cycling
> network and the winter maintenance of cycleways did not contribute significantly
> to the model after accounting for residential density and travel-related urban
> form and were therefore excluded from the final structural equation model"

The sample is right: "resulting in the final sample of 384 respondents", Helsinki
Metropolitan Area, baseline survey plus March 2019 follow-up — a genuine
longitudinal design.

**The positive half overstates the result for urban form.** In the archive's own
results (§4.2.3, p.9), the two variables are not on equal footing:

- **Residential density** — "Residential density within a 500-m buffer was
  positively associated with a change in the weekly minutes of cycling for
  transport (β = 0.087, **p < .05**)." Significant. The claim is right about this.
- **Travel-related urban form** — "residential location in the intensive public
  transport zone shared a **weak negative** association with a change in the
  weekly minutes of cycling for transport (β = −0.019, **p < .10**)." Not
  significant at the conventional threshold, and the discussion says so plainly:
  "the associations between cycling and walking for transport and the
  travel-related urban zone of the residential location **approached** statistical
  significance (p < .10)."

So one predictor was significant and the other approached significance — and the
one that approached it pointed the *other* way (people in the intensive transit
zone were more likely to *reduce* winter cycling). Saying both "predicted who kept
cycling" flattens that.

There is a second, smaller stretch. The study's outcome variable is the change in
**weekly minutes of cycling for transport**, not whether a person kept cycling at
all. The archive's own Table 5 reports participation falling from 59.9% in summer
to 19.1% in winter, but that is a descriptive statistic, not the modelled outcome.
"Predicted who kept cycling through winter" is a readable gloss, but it is a
different quantity from the one the model estimated.

This matters because the Helsinki finding is the story's most interesting move —
it is the paragraph that makes the piece credible to a sceptic by cutting against
the story's own side. Overstating it is the one place where the story would be
more persuasive if it were more precise.

*Fix:* "…residential density predicted who kept riding — and travel-related urban
form approached significance — while the length of the cycling network and the
winter maintenance of cycleways did not contribute significantly once those were
accounted for."

The same wording appears in the Helsinki `comparisons` entry, in the second
`limitations` bullet and in the story body; all four should move together.

---

## Story front matter

### `one_line` — **VERIFIED**

> "Winter measurably thins cycling out everywhere it has been counted — but a
> subarctic Finnish region still made one winter trip in ten by bicycle, and
> Edmonton's own counters logged more than 90,000 trips in a single December, so
> cold alone does not decide whether cycling works. What Edmonton itself would
> reach is a separate question: no reviewer found a winter mode-share measurement
> for it."

The structure is unusually honest for a one-liner: it concedes the claim's true
half first, then contradicts the false half, then names what the evidence cannot
do. All three legs check.

Leg 1 — "thins cycling out everywhere it has been counted" — is a universal, but
it is scoped to the record and the record supports it four ways: Oulu 18% annual →
one in ten winter (YF-EV-0023); Québec retention 4.35–13.6% (YF-EV-0030); Helsinki
participation 59.9% → 19.1% (YF-EV-0031); Calgary's own monthly chart showing the
seasonal trough (YF-EV-0028). Leg 2 and the December figure are verified above.

One unsourced word: **"subarctic."** No archive in this set describes Oulu's
climate at all — not its latitude, snowfall, snow-cover days or temperature
minima. The story is unusually candid about this gap elsewhere ("no source
supplied a standardized comparison of Edmonton and Oulu on snowfall, snow-cover
days, freeze-thaw events or days below -30°C", and the same point appears in
`unknowns` and `missing_evidence`), so the reader is warned. Treated as general
geography rather than a sourced finding, it stands — but it is the adjective the
whole comparator rests on, and it currently has no archive behind it.

### `short_answer` — **PARTIAL**

Every figure checks: Oulu 18% and one in ten (YF-EV-0023); 930 km maintained
year-round (YF-EV-0025, "Oulu's cycle lane network is kept in a usable condition
throughout the year"); Calgary four times (YF-EV-0028); 90,000 December trips
(YF-EV-0026); Minneapolis against the four warm cities (YF-EV-0029); Montréal
13.6% with the three smaller Québec cities lower still — 9.09%, 6.96% and 4.35%
are all below 13.6% (YF-EV-0030).

It carries the same misattribution as KF-1: "**Oulu's** 2021 regional travel
survey." Same one-word fix.

Two things done well and worth recording. The closing pair — "Cold makes winter
cycling smaller and harder. Nothing in the record shows it makes it unworkable" —
is precisely the proposition the brief operationalized, neither more nor less. And
"so mild winters plainly do not produce cycling by themselves" is a claim about
the *warm* cities, which is what the Census table can actually support; it does
not smuggle in a claim about what cold cities can reach.

### TL;DR 1 — **PARTIAL**

> "Oulu's 2021 regional travel survey measured one trip in ten made by bicycle in
> winter in the Oulu region, and 18% of all trips over the year — direct
> counter-evidence to climate being an absolute barrier."

Both figures verified; both denominators stated; the winter and annual numbers are
kept distinct, which is the failure mode this bullet most easily could have hit
and did not. Same attribution issue as KF-1.

### TL;DR 2 — **VERIFIED**

> "Edmonton already has measured winter riding: the City reports more than 90,000
> bike trips counted in December 2023, up 143 per cent on the previous December,
> and estimates one in four Edmonton cyclists ride year-round."

Verbatim on both figures, and "the City reports" / "estimates" keep the
attribution where it belongs. Note that this bullet does *not* repeat the
counter-coverage caveat that KF-3 carries — acceptable in a TL;DR, and the body
restores it ("the City publishes no note on how many counters were running in each
of those Decembers").

### TL;DR 3 — **VERIFIED**

The Census figures with the denominator named ("on one common commute
denominator") and the period stated (2008–2012). All five numbers verified against
Table 1.

### TL;DR 4 — **VERIFIED**

Calgary four times, January 2015 vs January 2016, "before and after protected
tracks." All verified in YF-EV-0028, including "protected."

### TL;DR 5 — **VERIFIED**

> "The claim gets one thing right: winter shrinks cycling everywhere it has been
> measured. A Québec study reports Montréal retaining 13.6% of its cyclists
> through winter, and 4.35% in Saguenay."

"Reports" again, correctly. Leading with the concession is the right editorial
call and it is supported.

### TL;DR 6 — **VERIFIED**

> "The open question is Edmonton's own winter share of trips. No reviewer found a
> survey that measures it, and feasibility elsewhere is not a forecast for here."

A statement about the review and about inference limits. Honestly labelled, and it
matches the `unknowns` list, which names Edmonton's bicycle share of all trips as
"the single most important missing number, flagged by all three reviewers."

---

## Summary

| # | Item | Cited | Verdict |
|---|------|-------|---------|
| 1 | KF-1 — Oulu 18% / one in ten / >2,500 / highest in Finland | YF-EV-0023 | PARTIAL |
| 2 | KF-2 — 930 km, 165 km Super, 24-hour standard | YF-EV-0025 | VERIFIED |
| 3 | KF-3 — 90,000 December trips, +143%, one in four | YF-EV-0026 | VERIFIED |
| 4 | KF-4 — Priority 1/2/3 targets, Winter Priority Loop | YF-EV-0027 | VERIFIED |
| 5 | KF-5 — Calgary 4×, 160,000 trips Nov 2015–Mar 2016 | YF-EV-0028 | VERIFIED |
| 6 | KF-6 — Minneapolis 4.1% vs Houston/Phoenix/San Antonio/Dallas | YF-EV-0029 | VERIFIED |
| 7 | KF-7 — Québec retention 13.6 / 9.09 / 6.96 / 4.35% | YF-EV-0030 | VERIFIED |
| 8 | KF-8 — Helsinki: density + urban form vs network + maintenance | YF-EV-0031 | PARTIAL |
| 9 | Story `one_line` | 0023/0026/0030/0031 | VERIFIED |
| 10 | Story `short_answer` | 0023/0025/0026/0028/0029/0030 | PARTIAL |
| 11 | TL;DR 1 — Oulu winter and annual shares | YF-EV-0023 | PARTIAL |
| 12 | TL;DR 2 — Edmonton counters | YF-EV-0026 | VERIFIED |
| 13 | TL;DR 3 — U.S. commute shares | YF-EV-0029 | VERIFIED |
| 14 | TL;DR 4 — Calgary before/after protected tracks | YF-EV-0028 | VERIFIED |
| 15 | TL;DR 5 — Québec retention concession | YF-EV-0030 | VERIFIED |
| 16 | TL;DR 6 — Edmonton's own share unknown | (self) | VERIFIED |

**Totals: 12 VERIFIED · 4 PARTIAL · 0 UNSUPPORTED.**

### Verdict: **2 distinct issues (appearing in 4 graded items).**

No number in the published text is wrong. Every denominator is labelled at every
appearance, every date and unit checks, and the story's central discipline —
separating "can cycling work in a climate like this" from "how much cycling does
Edmonton get" — holds all the way through, including in the one_line and the
closing paragraph. The two findings are both about how claims are attributed, and
both are cheap to fix:

- **The Oulu survey is misattributed** (KF-1, TL;DR 1, `short_answer`, and the
  story body). It is Finland's national travel survey run by Traficom, in which
  the Oulu region bought an oversample — not "Oulu's" own survey. The registry
  already has this right. The correct description is also the more persuasive one,
  because the same instrument produced comparable figures for other Finnish
  regions.

- **The Helsinki result is pushed past what the paper found** (KF-8, and the same
  wording in `comparisons`, `limitations` and the body). Residential density was
  significant at p < .05; travel-related urban form only *approached* significance
  at p < .10, and its one estimated coefficient pointed the other way. The paper's
  own discussion uses the word "approached." Since this paragraph exists precisely
  to show the story arguing against its own side, precision costs it nothing.

Neither requires re-reporting, and neither disturbs the `Contradicted` finding —
which rests on the winter one-in-ten figure, and that figure is verbatim in the
archive.

---

## Appendix — observations outside the graded scope

**1. The same archive supplies context that would strengthen the "Oulu is close to
unique" limitation.** YF-EV-0023 reports that in other Finnish regions the bicycle
share of trips was 7–12% ("Muilla seuduilla osuus oli 7–12 %"), and that the Oulu
region's sustainable-mode share (41%) was "samalla tasolla" — at the same level —
as the Tampere, Turku, Jyväskylä and Joensuu regions, with Helsinki higher. That
is measured, on the same instrument, and it says something the story does not: the
gap between Oulu and other Finnish regions is real but not enormous on the annual
figure. It cuts slightly against "Oulu is close to unique" as an annual matter
while leaving the *winter* claim (the one that carries the story) untouched, since
no winter breakdown is given for the other regions.

**2. Two other measured Oulu figures are available and unused.** The same archive
gives an average cycling trip length of about 3.5 km in 2021 and 2.5 trips per
person per day. The story's own `unknowns` asks for "trip-distance distributions"
in an Edmonton–Oulu comparison; half of that pair is already in the archive.

**3. Body claims not in the graded scope, all of which check out.** "more than 160
km of shared pathways and unpaved trails throughout Edmonton's river valley" and
the Winter Priority Loop's "three bridges, river valley trails and a staircase" are
verbatim in YF-EV-0026 and YF-EV-0027 respectively.

**4. Two claims in the review record did *not* reach publication, correctly.** The
run artifacts carry a "43% increase in October–March rider traffic 2022–2024"
figure — sourced in `combined-evidence.json` as "a councillor's summary of City of
Edmonton eco-counter data" — and a "protected lanes are cleared to bare pavement
within a day" statement that the Gemini seat flagged in round 2 as an
intention-versus-outcome error. Neither appears in the story or the claim, and
neither has a registry entry. The drafting stage filtered both out. Worth
recording as evidence the pipeline is working, and see the release check for the
fact that they still ship inside the run record.

**5. Registry metadata is in better shape than the e-bus set.** No date or title
drift found between any of the eight entries and their archived bytes. YF-EV-0023's
`published_on: 2023-02-09` matches the page's own "09.02.2023"; YF-EV-0031's
`published_on: 2022-12-01` matches "Journal of Transport & Health 27 (2022)". The
two `visibility: public` entries (YF-EV-0029 U.S. federal work, YF-EV-0030 CC BY)
have correct rights reasoning, and YF-EV-0031's note about conflicting CC BY /
repository terms failing closed to private is the right call.
