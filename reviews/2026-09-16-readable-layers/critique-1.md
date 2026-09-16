<!-- Independent critique of the rendered preview pages after the readable-layers rewrite and the plain-speech read. Critic: a fresh Claude Opus 5 session, read-only, given the preview URL, docs/DESIGN.md section 12 and docs/readable-layers-2026-09-16.md, and told not to soften. Editor: Stew (Claude Fable 5.1). The editor's disposition sits under each finding. -->

# Critique of the rendered pages, 2026-09-16

Preview confirmed current: `/questions/climate-targets` TL;DR bullet 1 begins "Edmonton City Council promised". All seven pages read from the live preview HTML.

## Cross-page structural problem, worst first

The reader's first ten seconds is not the standfirst. It is: title, a restated question, the claim list (question + verdict word + gloss + a full answer sentence per claim), *then* the standfirst, *then* a ~130-word provenance paragraph ("Verdicts by a three-model AI panel… as of… last verified… next review by… methodology v1.14"), *then* the TL;DR. On three single-claim pages the reader gets two near-identical answers back to back. DESIGN.md §12 explicitly allows "Where a question has one claim, the claim's answer can serve as the standfirst" — these pages print both.

**Editor: adopted in part; the rest goes to the founder.** The duplicate on single-claim pages is fixed in this batch: those three stories no longer carry a `one_line`, the claim's answer is the standfirst, and the template no longer prints a lede a story does not have. The order of the page (claim strip, standfirst, provenance line, TL;DR) is D-0020, founder's call 1 of 2026-09-01, and this critique is the first evidence that the strip plus the provenance line push the ten-second layer below the fold on a seven-claim page. That is recorded on the board as an open question with this report as its evidence, and not changed here.

## winter-cycling

Standfirst: "No. Cold makes people cycle less, but people in Oulu, Finland still make one trip in ten by bike in winter." Good sentence. But directly above it sits "No. People in the Oulu region of northern Finland make about one trip in ten by bicycle in winter, so Edmonton's cold weather alone cannot make cycling unworkable." Same fact, twice, ten words apart. TL;DR: no contradiction, all five bullets carried in the explanation (13.6% Montréal, 4.1% Minneapolis, Saguenay 4.35% all present). But the Oulu figure — the standfirst's whole case — appears in no bullet, and the TL;DR has its own Copy button, so the copied version loses the evidence. Explanation opens "Every Edmonton bike-lane debate reaches the same objection, and it is not an unreasonable one to raise: nobody bikes at -30, so why build for it here?" No cliff.

**Editor: adopted.** The standfirst is dropped; the claim's answer stands alone. The Copy control on every TL;DR now copies the standfirst with the bullets, which is the right fix for the Oulu figure and for the $82 million below: the bullets are written to add to the standfirst, not to repeat it, and the copy should carry both.

## climate-targets

Standfirst: "No. Edmonton is not on track, and the City's own count puts 2024 emissions about 3 million tonnes over its plan." Ahead of it: an "Off the findings board" notice, the question three times, and a duplicate answer ("No. The City says Edmonton is not on track…"). TL;DR is honest and fully carried. Explanation first sentence: "Edmonton City Council declared a climate emergency on August 27, 2019." No cliff. Rendering: the `What actually happened` heading is immediately followed by another heading with no text between — same on electric-buses.

**Editor: adopted.** Standfirst dropped. A one-sentence opening now sits before the first subheading on this page and on electric-buses. The "Off the findings board" notice and the question repeated are the template's, pre-date this batch, and go to the board with the structural point above.

## cycling-volumes

Standfirst: "The bike lanes Edmonton counts are not empty, but cycling is still only about 2 per cent of trips in the city." It arrives after **seven** claim rows. Nobody reaches it in ten seconds. Drift: bullets 1 and 2 say "riders" ("about 50 riders a day", "about 75 riders a day") where the page's own explanation insists "Counters record trips past a sensor, not individual people" and bullet 3 correctly says "bike passes". The page's central distinction is broken inside its own TL;DR. Figures otherwise check (71/79 on 132 Ave). Explanation opens "In a capture of 621 comment records from a Facebook post about council's bike-lane decision, twenty-five people argued about how much this city rides." — "capture of 621 comment records" is method jargon in the first eight words; the rest of the paragraph is the best writing on the site.

**Editor: adopted.** "Riders" was wrong and is now "bike passes" in both bullets; the critic is right that the page's own distinction was broken at the top. The opening now reads "Under one Facebook post about council's bike-lane decision, in the 621 comments this site captured", which keeps the 2026-09-09 correction's precision (621 is the number captured, not the size of the thread) in words a person would say. The seven rows before the standfirst are the structural point, referred to the founder.

## electric-buses

Standfirst: "Edmonton's electric buses fell well short of the contract, and the $82 million is a court claim, not money the City has lost." The $82 million never appears in the TL;DR. This page exists to correct "$82 million lost", and the copyable layer drops the correction. Explanation opens "Edmonton made its battery-electric bet in the late 2010s." Fine. Figures check.

**Editor: adopted at the root.** The Copy control now carries the standfirst with the bullets (see winter-cycling). The bullets themselves stay as they are: a bullet repeating the standfirst is what the duplication audit exists to catch.

## fifteen-minute-districts

Standfirst: "No. Edmonton's district plans guide what gets built where, and Council added a line saying they cannot restrict where people go." Duplicated again by the claim answer above it. The TL;DR dropped the City Plan's "Although the choice will remain to make those trips by auto" — the one line that answers the actual worry — and replaced it with bullet 1, "Edmonton's District Policy guides rezoning and building-permit decisions," which is procedure, not reassurance. Explanation opens "Edmontonians are asking reasonable questions about district planning," then says "reasonably" again in the next sentence. Throat-clearing.

**Editor: adopted.** Standfirst dropped. Bullet 1 is now the City Plan's own line, quoted, and the procedural bullet is gone; what the District Policy is remains in the explanation. The opening lost its first sentence and the second "reasonably".

## active-transportation

Standfirst: "Edmonton's $100 million for bike lanes is spread over four years, and roads got many times more in the same budget." Bullet 3 says "roughly nineteen times"; bullet 4 says "$1.8 billion is 18 times $100 million". Two multiples, adjacent, unreconciled. Worse, bullet 4 says the 180 claim "is off by ten" — that is wrong English for a factor-of-ten error and the explanation never says it ("$1.8 billion is eighteen times $100 million, not 180"). Explanation opens with a clean two-sided sentence about the campaign and the councillor.

**Editor: adopted.** "Off by ten" is now "ten times too big", and the bullet says the 18 rests on the councillor's own $1.8 billion, which is why it differs from the nineteen counted up from the City's budget lines in bullet 3. Both multiples are true of their own base and the bullet now says which base.

## infill-prices

Standfirst: "Nobody can tell. No one has followed a torn-down Edmonton house through to the price of what replaced it." Best standfirst of the seven. But bullet 1 states the unproven claim flat ("People say the new housing costs about three times as much…") and bullet 4 gives "about one and a half to four times the old house's value" — a range drawn from one seat's eight-lot feasibility probe that the page elsewhere says is "cases and not a distribution". Bullet 2 says the difference "cannot be calculated"; bullet 4 hands the reader a number to repeat. That is the clearest internal contradiction in the seven TL;DRs.

**Editor: adopted for bullet 4, not for bullet 1.** The eight-lot range leaves the TL;DR; the critic is right that a bullet saying the number cannot be calculated cannot sit beside one handing the reader a number, and the range stays in the explanation with what it can and cannot say. Bullet 4 is now the page's real point: the permits and the rolls that could answer it exist, and nobody has joined them. Bullet 1 stays: it says "People say", which is the claim under test in plain words, and a reader who does not know what people say cannot follow why the page exists.

## Three fixes, ranked

1. winter-cycling, climate-targets, fifteen-minute-districts: delete the per-claim answer above the standfirst on single-claim pages — e.g. drop "No. People in the Oulu region of northern Finland make about one trip in ten by bicycle in winter, so Edmonton's cold weather alone cannot make cycling unworkable."
2. infill-prices bullet 4: cut "The few Edmonton examples available range from about one and a half to four times the old house's value" — it contradicts bullet 2 and outruns the explanation.
3. active-transportation bullet 4: replace "is off by ten" with "is ten times too big".

**Editor:** 1 done the other way round (the standfirst goes, the claim's answer stays, because the answer is the reviewed sentence bound to the claim and named in its plain-speech read). 2 and 3 done.

## Verdict

No. The sentences of a ten-second layer now exist and are mostly good, but on every page they sit under a claim list, a duplicate answer and a provenance block, so a resident still has to read a report to reach them.

**Editor:** The duplicate answer is gone from this batch. The claim list and the provenance block before the TL;DR are the page order the founder set on 2026-09-01 (D-0020), and this verdict is the case for revisiting it, filed on the board as an open question with this report attached. The founder decides.
