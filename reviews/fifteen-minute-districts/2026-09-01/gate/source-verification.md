# Source verification — fifteen-minute-districts

Gate stage 7, AI-automatable portion. Run date 2026-09-01 (story run `2026-09-01`).

**Method.** Every `key_fact` in
`src/content/claims/districts-travel-restrictions.yaml`, plus the six TL;DR
bullets, the `one_line` and the `short_answer` in
`src/content/stories/fifteen-minute-districts.mdx`, was checked against the
archived bytes of its cited evidence only. No web access was used. Registry
entries under `evidence/registry/YF-EV-*.yaml` gave the `archive.path`; HTML
archives were stripped to text, PDFs were extracted with `pypdf` (`pdftotext`,
`mutool` and `qpdf` are not installed). All five PDFs extracted cleanly — 50,
51, 63, 9 and 183 pages — so nothing here rests on an unreadable archive.

**Integrity check.** All seven archives match the `archive.sha256` recorded in
the registry. The bytes audited are the bytes the registry claims.

| ID | Archive | Pages / size | sha256 |
|---|---|---|---|
| YF-EV-0013 | District Policy office consolidation, April 2026 | 50 pp | match |
| YF-EV-0014 | Charter Bylaw 24000 as adopted | 51 pp | match |
| YF-EV-0015 | Council public hearing minutes, May 28 – June 26 2024 | 63 pp | match |
| YF-EV-0016 | Report UPE01245rev | 9 pp | match |
| YF-EV-0017 | Charter Bylaw 20000, The City Plan | 183 pp | match |
| YF-EV-0018 | About the District Policy and Plans | HTML | match |
| YF-EV-0019 | Canadian Press fact check | HTML | match |

**Grading.** VERIFIED = the archive supports the statement as written.
PARTIAL = the archive supports the substance but at least one asserted detail is
not in *that* archive, or is stated more strongly than the archive allows.
UNSUPPORTED = the archive does not contain it.

**Independent negative-space check.** Because most of this story's weight rests
on what the policy text does *not* say, I ran a full-text term census on both the
consolidation (YF-EV-0013) and the adopted bylaw (YF-EV-0014) rather than taking
the reviewers' word for it. Results, identical in both documents:

| Term | Occurrences | Where |
|---|---|---|
| `restrict` | 2 | the Chapter 1 freedom-of-movement clause; "time-restrictions" in curbside policy 3.3.1.4 |
| `permit` | 7 | all "development permit" / "permitted uses" |
| `monitor` | 0 | — |
| `track` | 0 | — |
| `surveil` | 0 | — |
| `penalt` | 0 | — |
| `prohibit` | 0 | — |
| `boundary` | 0 | — |
| `toll` / `cordon` / `licen` / `enforce` | 0 | — |
| `fee` / `charge` | 1 / 2 | all in section 4.1.3 |

That is a strong, independently reproduced result: in the operative text there is
no vocabulary of movement control at all, and the two `restrict` hits are the two
the story already names. Caveat: this is a text-layer extraction, so anything
rendered only as raster imagery (map graphics) would not be counted. The District
Policy's policies are body text, and the maps live in the individual District
Plans, which are not in this evidence set — see the `short_answer` grade.

---

## Claim: `districts-travel-restrictions`

### KF-1 — cited YF-EV-0014, YF-EV-0013 — **VERIFIED**

> "…Chapter 1 of the District Policy reads: 'The District Policy and the District
> Plans shall not restrict freedom of movement, association and commerce in
> accordance with the Canadian Charter of Rights and Freedoms.' The same chapter
> describes the 15-minute vision as residents having 'more travel options within
> and across Districts.'"

Both archives, Chapter 1, verbatim and identical on the clause. The vision
sentence is on the same page: "This vision is for new and current residents to
have access to more housing, recreation, education and employment opportunities
in all 15 Districts, and to have more travel options within and across
Districts." Both quotations are exact.

### KF-2 — cited YF-EV-0015 — **PARTIAL**

> "That sentence is adopted legislative text, not a reassurance on a webpage:
> Council added it to section 1 by amendment at second reading in June 2024,
> carried 12-0, as recorded in the Council public hearing minutes."

The substance is fully verified and is the strongest fact in the story. Minutes
p.28:

> "Amendment 3: Moved by: A. Paquette Seconded by: A. Sohi That Charter Bylaw
> 24000 - District Policy, Schedule A, section 1, be amended to add the following
> at the end of section 1: The District Policy and the District Plans shall not
> restrict freedom of movement, association, and commerce… Carried (12 to 0)"

Twelve in favour, none opposed, added to section 1, in the minutes. All correct.

**"At second reading" is contradicted by the archives.** The amendment was moved
against the motion to give the bylaw its *first* reading. Minutes p.27 open the
sequence: "Moved by: E. Rutherford … That Charter Bylaw 24000 and Bylaw 24100 be
read a first time. Amendment 1: …" — Amendments 1, 2 and 3 follow, and then p.29:
"That Charter Bylaw 24000, as amended, and Bylaw 24100 be **read a first time** …
Carried (10 to 2)," followed by closure of the hearing and "read a **second
time** … Carried (10 to 2)."

YF-EV-0014, the adopted bylaw itself, settles it independently on its signature
page:

> "READ a first time this 25th day of June, A. D. 2024; READ a second time this
> 25th day of June, A. D. 2024; READ a third time this 2nd day of October, A. D.
> 2024."

So the correct description is: moved as an amendment at first reading, June 25,
2024, carried 12-0; the bylaw then received first and second reading the same
day and third reading on October 2, 2024.

This is the one item in this report that is wrong on the archive rather than
merely thin, and the same error is repeated in the story body ("At second reading
in June 2024, an amendment added to section 1 the sentence"). It does not touch
the finding — the clause is adopted text either way — but a story whose whole
argument is "read the document yourself" should get the procedural record right,
because that is the half a hostile reader will check.

*Fix:* "…Council added it to section 1 by amendment at first reading in June
2024, carried 12-0…" — or simply drop the reading and keep "by amendment in June
2024," which is what the TL;DR and `short_answer` already do correctly.

*Also worth noting:* the minutes render the clause with a serial comma
("movement, association, **and** commerce"); the adopted policy text in
YF-EV-0013 and YF-EV-0014 has no comma. The story quotes the policy text, which
is the right choice.

### KF-3 — cited YF-EV-0016, YF-EV-0013 — **VERIFIED**

> "The adopting council report describes the ask as: 'To adopt the District Policy
> as a statutory plan under the Municipal Government Act, as amended by the City
> of Edmonton Charter 2018 Regulation, to provide guidance for land use, mobility
> and growth management.' Chapter 1 of the policy states that District Plans and
> the District Policy 'will guide rezoning, subdivision and development permit
> decisions.'"

YF-EV-0016 p.1, under "Purpose", verbatim. YF-EV-0013 p.8, Chapter 1, verbatim:
"Where no other statutory plan is in effect, District Plans and the District
Policy will guide rezoning, subdivision and development permit decisions." The
same formulation recurs on p.10. Both quotations are exact.

### KF-4 — cited YF-EV-0013 — **VERIFIED**

> "Section 3.1.1.1 reads: 'Connect major destinations within and between Districts
> through the Active Transportation network,' and section 3.2.1.1 gives the same
> direction for the transit network. Chapter 3 covers active transportation,
> transit, roadways and goods movement, and contains no district-crossing permit,
> no penalty for inter-district travel and no monitoring of individuals."

p.34: "3.1.1.1 Connect major destinations within and between Districts through
the Active Transportation network." p.38: "3.2.1.1 Connect major destinations
within and between Districts through the transit network." Both verbatim.

Chapter 3's structure checks: 3.1 Active Transportation, 3.2 Transit, 3.3
roadways (with goods-movement direction in 3.3.1.1). The negative half is
confirmed by the term census above — Chapter 3 contains no instance of `permit`
outside development permits, and zero instances of `monitor`, `track`, `penalt`
or `boundary` anywhere in the document.

### KF-5 — cited YF-EV-0013 — **VERIFIED**

> "…the strongest text the panel found is section 4.1.3, which contemplates
> 'applying charges and fees for users through available financial mechanisms.'
> Section 4.1.3.1 narrows that direction to identifying 'mechanisms to pay for
> needed infrastructure and public amenities to support population and employment
> growth.'"

p.41, under "4.1.3 Incentives, Pricing and Subsidy Levers", verbatim on both
fragments. The full context supports the reading: "This can include off-setting
the costs of services and amenities for certain user groups or types of
activities, or applying charges and fees for users through available financial
mechanisms. 4.1.3.1 Identify mechanisms to pay for needed infrastructure and
public amenities to support population and employment growth in areas identified
as priorities."

This is the honest steelman the brief asked for, and it is quoted fairly — the
claim gives the reader the strongest sentence against its own conclusion before
explaining why it does not carry the weight. The follow-on ("It points at
financing growth infrastructure; it authorizes no charge, permit or penalty tied
to crossing a district boundary") is confirmed by the section text and by the
zero `boundary` count.

### KF-6 — cited YF-EV-0013 — **VERIFIED**

> "…sections 3.3.1.2 and 3.3.1.4 direct the City to accommodate transportation
> demand through transit and active transportation, minimize roadway expansion,
> and 'use tools such as time-restrictions or parking pricing where appropriate
> to balance the demands on curbside space.'"

p.39, verbatim: "3.3.1.2 Minimize roadway network expansion for vehicles by
accommodating increased transportation demand through Active Transportation and
transit… 3.3.1.4 Treat curbside space as a strategic public asset and use tools
such as time-restrictions or parking pricing where appropriate to balance the
demands on curbside space."

The closing distinction — "That changes where and at what price a car can be
parked, not where a person may go" — is the claim's argument rather than archive
text, but it is a direct and fair reading of the quoted policy, and the story's
limitations already concede the adjacent point ("'No restriction on where
residents may travel' is not the same as 'no effect on drivers'").

### KF-7 — cited YF-EV-0013 — **PARTIAL**

> "Nothing has been added since. The consolidation's own amendment record shows
> every post-adoption amendment through Charter Bylaw 21472 (approved April 27,
> 2026) amends Chapter 2 land-use policies — industrial preservation, urban mix,
> small-scale residential intensity. None touches the Chapter 3 mobility policies,
> and the Chapter 1 freedom-of-movement clause survives unamended in the text in
> force."

The two load-bearing conclusions are verified, and I confirmed them by locating
every `(Amended by Charter Bylaw …)` marker in the document rather than relying
on the front-matter summary. Eleven markers, all on pp. 27–28 (section 2.5
policies) and pp. 44–50 (the Glossary). Chapter 3 (pp. 33–39) carries none.
Chapter 1 carries none, so the freedom-of-movement clause stands unamended in the
text in force. The three amending bylaws and the April 27, 2026 date are exact,
from p.2:

> "Charter Bylaw 21164 Approved June 9, 2025 … Charter Bylaw 21214 Approved June
> 30, 2025 … Charter Bylaw 21472 Approved April 27, 2026"

and their subjects match the fact's three-item list — industrial preservation
(2.5.3.4), small-scale residential intensity (2.5.2.5–2.5.2.7), urban mix
(2.5.2).

**What the fact omits is that all three amendments also revised Glossary
definitions.** The consolidation's own descriptions say so: 21164 "revise the
urban mix, commercial/industrial employment, urban service, TUC and open
space-current glossary definitions"; 21472 "revise the Low Rise, Small Scale and
**Mass Transit Station** glossary definitions." Seven of the eleven amendment
markers are in the Glossary, and the Mass Transit Station entry cross-references
"District Policy: Section 3.2" — the transit chapter. So "every post-adoption
amendment amends Chapter 2 land-use policies" is not accurate as written; the
amendments touched Chapter 2 policies *and* the Glossary.

This does not disturb the conclusion. A glossary definition of "Mass Transit
Station" is not a mobility policy, and no Chapter 3 policy was amended. But the
sentence is a summary of an amendment record, and the record has a category the
summary drops.

*Fix:* "…amends Chapter 2 land-use policies and glossary definitions —
industrial preservation, urban mix, small-scale residential intensity. None
touches the Chapter 3 mobility policies…"

### KF-8 — cited YF-EV-0017 — **VERIFIED**

> "The parent plan the District Policy implements says the same thing about
> driving. Bylaw 20000, The City Plan, describes 15-minute access by walking,
> rolling, biking or transit and adds: 'Although the choice will remain to make
> those trips by auto.'"

Archive p.163, in the section headed "15-minute districts", verbatim:

> "A liveable city is one that allows people to easily complete their daily needs
> within their District and within a 15-minute travel time by walking, rolling,
> biking or transit. Although the choice will remain to make those trips by auto,
> through implementation of The City Plan it will make sense and be more pleasant
> to travel by foot, bike or transit…"

The four modes match word for word, and the auto sentence is quoted in its own
context rather than lifted. Good citation.

*Registry nit:* the archive's own title page reads "Charter Bylaw 20000"; the
claim, the story and the registry entry all say "Bylaw 20000". Cosmetic, but the
document type is a Charter Bylaw and the story is precise about that distinction
elsewhere (it consistently writes "Charter Bylaw 24000").

### KF-9 — cited YF-EV-0016 — **VERIFIED**

> "The council report records 'having 50 per cent of trips made by transit and
> active modes' and 15-minute access to daily needs as the targets, and says
> 'These targets represent a shift in the built form and modes of travel.'"

Archive p.2, verbatim:

> "The two targets associated with this Big City Move are having 50 per cent of
> trips made by transit and active modes, and where Edmontonians can easily access
> their daily needs within a 15-minute walk, roll or transit trip… These targets
> represent a shift in the built form and modes of travel, and will contribute to
> achieving Edmonton's climate goals."

The claim truncates the second quotation before "and will contribute to achieving
Edmonton's climate goals" without changing its sense.

This is the best-handled fact in the set. It concedes the critics' real factual
kernel — the City *does* have a mode-shift target — quotes it precisely, and then
draws the distinction that actually matters ("They are adopted planning targets
that shape investment and development; they impose no trip quota, destination
limit or district-boundary control on any individual"). The negative half is
confirmed by the term census.

### KF-10 — cited YF-EV-0018 — **VERIFIED**

> "The City's own position — distinct from what the text does — is that 'District
> plans aren't about restricting movement, monitoring people or tracking an
> individual's carbon emissions, and nothing will be put in place to do so' and
> that 'People can continue to travel however they choose, to wherever they want
> in the city.' The same page records adoption of the District Policy and 14 of 15
> district plans on October 2, 2024, and the Rabbit Hill District Plan on April 7,
> 2025."

Both quotations verbatim. Adoption: "The District Policy and 14 of the 15 district
plans returned to City Council on October 2, 2024 … where they received final
reading and were adopted." Rabbit Hill: "City Council approved the updated Rabbit
Hill District Plan and related City Plan amendment at City Council Public Hearing
on April 7, 2025." All four elements check.

The framing — "The City's own position — distinct from what the text does" — is
exactly the separation the brief demanded, and the registry entry's `establishes`
field says the same thing. Correctly weighted.

### KF-11 — cited YF-EV-0019 — **VERIFIED**

> "An independent Canadian Press fact check rated the restriction and tracking
> claim False, quoting City planning supervisor Shauna Kuiper that 'District
> planning is not about restricting movement, monitoring people or tracking an
> individual's carbon emissions.' It also found that Alberta's MyAlberta Digital
> ID program, which some posts tied to the districts, does not track movement and
> is unrelated to district planning. Some of the posts it checked used a
> mislabelled map of Canterbury, England as if it were Edmonton."

Archive: "Rating: False". Kuiper quotation verbatim. Digital ID: the Alberta
Technology and Innovation statement quoted in the archive says the program
"doesn't track user's information or movement" and "is not related to the City of
Edmonton's district planning." Canterbury: "some users criticized the 15-minute
concept in Edmonton by using an incorrectly labelled map of the planned districts
in Canterbury, England."

*Small precision point.* The archive describes Kuiper as "a general supervisor in
the City of Edmonton's Planning and Environmental Services Department"; the claim
compresses this to "City planning supervisor". Close enough not to move the grade,
but "a general supervisor in the City's planning department" would be exact.

---

## Story front matter

### `one_line` — **VERIFIED**

> "Edmonton's district plans are land-use documents, and their adopted text says
> in so many words that they 'shall not restrict freedom of movement, association
> and commerce' — a sentence Council put into the bylaw itself by an amendment
> carried 12-0."

The quotation is verbatim, the 12-0 is verbatim in the minutes, and — notably —
this line does **not** repeat KF-2's "second reading" error. "By an amendment" is
correct and sufficient.

One compression worth naming: the sentence lives in Chapter 1 of the District
*Policy*, not inside each of the 15 District Plans. Its own subject is "The
District Policy and the District Plans", so it governs both, and "their adopted
text" is defensible — but a reader who opens an individual District Plan looking
for that sentence will not find it there.

### `short_answer` — **PARTIAL**

Almost everything checks, and the quotations are exact: October 2, 2024 adoption
as a statutory plan under the Municipal Government Act (YF-EV-0016/0018);
"Connect major destinations within and between Districts" (YF-EV-0013 §3.1.1.1);
the freedom-of-movement clause "added by Council amendment and carried 12-0 in
June 2024" — correctly stated without naming a reading; "still there in the April
2026 consolidation" (YF-EV-0013 p.7 with no amendment marker); and the section
4.1.3 financial-tools paragraph.

Two things go beyond the archives.

**1. "Nothing of the kind appears in the district plans reviewed either."** No
District Plan bylaw is in this claim's evidence set. YF-EV-0013 and YF-EV-0014
are the District *Policy*; YF-EV-0015 is minutes, YF-EV-0016 a council report,
YF-EV-0017 the City Plan, YF-EV-0018 a City webpage, YF-EV-0019 a fact check.
Nothing in the registry lets a reader check any of the 15 plans. The story's own
limitations disclose the underlying gap honestly — "The panel read the District
Policy in full but sampled rather than exhaustively read the 15 individual
District Plan bylaws" — and the `short_answer` hedges with "reviewed", which is
the right instinct. But the sentence still asserts a result no archived byte
supports, and the phrase "reviewed" is doing work a reader cannot audit.

**2. "…an actual travel restriction would take separate legal instruments and new
council action."** This is legal analysis, not archive content. It is a sound
reading and the reviewers were unanimous on it, but no archive establishes it,
and it is stated flatly rather than attributed.

Neither is a misstatement of any archive. Both are places where the text carries
more than the evidence file does.

*Fix for (1):* either register one or two of the District Plan bylaws as
evidence, or soften to "…nor in the district plans the panel sampled, and no
reviewer, fact check or hearing speaker has identified such wording in any of
them" — which is what the limitations and unknowns already say and which is
checkable against YF-EV-0015 and YF-EV-0019.

### TL;DR 1 — **VERIFIED**

Charter Bylaw 24000, adopted October 2, 2024, statutory plan guiding rezoning,
subdivision and development permit decisions. YF-EV-0014 (bylaw), YF-EV-0016
(purpose), YF-EV-0013 (Chapter 1), YF-EV-0018 (date). Every element sourced.

### TL;DR 2 — **VERIFIED**

> "Its full text contains no travel permits, no penalties for crossing a district
> boundary and no movement monitoring; the closest thing to a restriction anywhere
> in it is ordinary curbside parking management."

This is a universal negative over a 50-page document, which is exactly the kind of
statement that should not be taken on trust — so I reproduced it independently.
The term census above confirms it in both the consolidation and the adopted
bylaw: zero `monitor`, zero `track`, zero `penalt`, zero `boundary`, and the only
two `restrict` hits are the freedom-of-movement clause and the curbside
"time-restrictions". The bullet is accurate as written.

### TL;DR 3 — **VERIFIED**

> "Council itself added the sentence … by an amendment carried 12-0 and recorded
> in the June 2024 hearing minutes. It survives every amendment through April
> 2026."

12-0 verbatim in the minutes; June 2024 correct (the hearing ran May 28 – June 26,
2024, and the vote is dated by the bylaw's own June 25 readings). This bullet
avoids the "second reading" error in KF-2 — it names no reading at all, which is
the safe and correct formulation. Survival through April 2026 confirmed by the
absence of any amendment marker in Chapter 1.

### TL;DR 4 — **PARTIAL**

> "On the weaker version of the claim … the strongest text in the document
> contemplates user charges and directs the City to identify ways of paying for
> growth infrastructure. Any real travel restriction would need separate
> instruments and new council action."

The first sentence is verified against §4.1.3 / §4.1.3.1 and is a fair
characterization of the strongest available counter-text.

The second sentence is the panel's legal conclusion, not an archive statement.
Nothing in YF-EV-0013–0019 establishes what a travel restriction would legally
require. It is presented as fact in a bullet list of findings, alongside items
that *are* quotations. The claim's own `unknowns` handle this better ("No document
can bind a future council… the reviewers were unanimous that this possibility is
not a mechanism in the current instruments"), and the story body handles it better
still ("What the panel found is that…"). The TL;DR is the one place it is asserted
flatly.

*Fix:* attribute it — "…and the panel found that producing a real travel
restriction would need separate instruments and new council action" — matching the
body's own framing.

### TL;DR 5 — **VERIFIED**

The City Plan auto quotation, verbatim in YF-EV-0017 p.163.

### TL;DR 6 — **VERIFIED**

> "This finding is about the restriction claim only. It says nothing about whether
> district planning is good policy — the panel did not review that."

A scope statement about the review itself, and an accurate one: the brief puts the
merits of district planning explicitly out of scope, and no reviewer output
addresses them. Honestly labelled.

---

## Summary

| # | Item | Cited | Verdict |
|---|------|-------|---------|
| 1 | KF-1 — Chapter 1 freedom-of-movement clause, travel options | 0014/0013 | VERIFIED |
| 2 | KF-2 — added to s.1 by amendment "at second reading", 12-0 | YF-EV-0015 | PARTIAL |
| 3 | KF-3 — statutory plan purpose; guides rezoning decisions | 0016/0013 | VERIFIED |
| 4 | KF-4 — §3.1.1.1 / §3.2.1.1; no permit, penalty or monitoring | YF-EV-0013 | VERIFIED |
| 5 | KF-5 — §4.1.3 / §4.1.3.1 financial levers | YF-EV-0013 | VERIFIED |
| 6 | KF-6 — §3.3.1.2 / §3.3.1.4 curbside management | YF-EV-0013 | VERIFIED |
| 7 | KF-7 — amendment record through CB 21472 | YF-EV-0013 | PARTIAL |
| 8 | KF-8 — City Plan "choice will remain … by auto" | YF-EV-0017 | VERIFIED |
| 9 | KF-9 — 50% transit/active target, "shift in built form" | YF-EV-0016 | VERIFIED |
| 10 | KF-10 — City's stated position; adoption timeline | YF-EV-0018 | VERIFIED |
| 11 | KF-11 — CP fact check False; Kuiper; digital ID; Canterbury | YF-EV-0019 | VERIFIED |
| 12 | Story `one_line` | 0013/0014/0015 | VERIFIED |
| 13 | Story `short_answer` | 0013–0019 | PARTIAL |
| 14 | TL;DR 1 — CB 24000, statutory plan | 0014/0016/0018 | VERIFIED |
| 15 | TL;DR 2 — no permits, penalties or monitoring in full text | YF-EV-0013 | VERIFIED |
| 16 | TL;DR 3 — 12-0 amendment, survives to April 2026 | 0015/0013 | VERIFIED |
| 17 | TL;DR 4 — §4.1.3 steelman + "would need separate instruments" | YF-EV-0013 | PARTIAL |
| 18 | TL;DR 5 — City Plan auto line | YF-EV-0017 | VERIFIED |
| 19 | TL;DR 6 — scope limitation | (self) | VERIFIED |

**Totals: 15 VERIFIED · 4 PARTIAL · 0 UNSUPPORTED.**

### Verdict: **4 issues, one of which is a factual correction.**

The central finding is solid and independently reproduced. Every quotation from
the adopted text is verbatim, the negative claims about the policy's contents hold
up under a full-text term census, and the story's separation of "what the text
does" from "what the City says" is exactly right against the bytes.

One item needs a correction before the founder approves:

- **KF-2's "at second reading."** The archives put the amendment at first reading.
  YF-EV-0015 shows Amendments 1–3 moved against the motion to read the bylaw a
  first time; YF-EV-0014's signature page reads "READ a first time this 25th day
  of June… READ a second time this 25th day of June… READ a third time this 2nd
  day of October." The same error appears in the story body. This is the only
  place in three stories audited today where published text is contradicted rather
  than merely under-sourced, and it sits in a story whose argument is "check the
  document yourself."

Three need a wording or sourcing decision:

- **KF-7** summarizes the amendment record as Chapter 2 only; all three amending
  bylaws also revised Glossary definitions. Conclusion unaffected.
- **`short_answer`'s "the district plans reviewed"** rests on reviewer reading with
  no District Plan bylaw in the evidence set. The limitations already disclose the
  sampling; the `short_answer` should point at it or the plans should be
  registered.
- **TL;DR 4's second sentence** states a legal conclusion as fact. The body and the
  `unknowns` both attribute it properly; the bullet should too.

---

## Appendix — observations outside the graded scope

**1. The story body carries the same "second reading" error.** "At second reading
in June 2024, an amendment added to section 1 the sentence…" Fix both in the same
edit.

**2. Body date on the City Plan checks out.** "The City Plan, Bylaw 20000, adopted
in December 2020" — YF-EV-0017 p.1: "READ a third time this 7th day of December,
A. D. 2020; SIGNED and PASSED this 7th day of December, A. D. 2020."

**3. Body claim about the Canadian Press timing checks out.** "the Canadian Press
had fact-checked it in February 2023" — YF-EV-0019 byline: "Feb 21, 2023."

**4. The consolidation's own status caveat is correctly carried.** YF-EV-0013 p.2:
"This office consolidation is intended for convenience only. In case of
uncertainty, the reader is advised to consult the original Charter Bylaws,
available at the office of the City Clerk." The claim's limitations reproduce this
and note that the decisive clause is independently confirmed in YF-EV-0014 and
YF-EV-0015 — which this audit verified. That is the right handling of a
convenience copy.

**5. `evidence:` list versus what is actually load-bearing.** YF-EV-0014 is cited
only on KF-1, but it is the archive that resolves the reading sequence in KF-2 and
that independently corroborates the Chapter 1 clause. It is doing more work than
its citations show. Worth adding to KF-2's sources when that fact is corrected.

**6. Unregistered but checkable.** The claim's `missing_evidence` asks for "A
documented line-by-line review of all 15 adopted District Plan bylaws." That is
the right ask, and it is the same gap that produced the `short_answer` PARTIAL.
Registering even two or three representative District Plan bylaws would convert a
reviewer assertion into an auditable one.
