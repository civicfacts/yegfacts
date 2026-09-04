# Source verification — cycling-volumes

Gate stage 7, part 1. Run date 2026-09-04 (story run `2026-09-03`),
methodology v1.24. Auditor: a Claude (Opus) audit session, separate from the
drafting session and from both faithfulness seats.

**Scope.** Every statement of fact in the seven claim records —
`cv-counter-total-2026`, `cv-lanes-look-empty`, `cv-population-rides`,
`cv-year-round-riders`, `cv-trips-by-bike`, `cv-commuters-cycle`,
`cv-commute-by-car` — meaning the `answer`, every `key_fact`, every
`limitation`, `unknown` and `missing_evidence` line, and every
`review.reviewers` entry (verdict and confidence, each `key_finding`, each
`changed_between_rounds`). In `src/content/stories/cycling-volumes.mdx`, the
`one_line`, all five TL;DR bullets, the 2026-09-04 changelog note, and 85 of
the body's 120 sentences: every one carrying a number, a date, a name, a
quotation, or an assertion about what a document or a seat says. The other 35
are connective or interpretive and assert nothing about the record. Nothing
in scope was skipped.

The graded state is the tree at commit `663a813`, after both faithfulness
checks were applied.

**Method.** Statements were checked against the archived bytes of the cited
evidence only, or against the run's own artifacts where a statement is about
what a seat said. No web access was used. `evidence/private/` is gitignored
and therefore per-worktree: YF-EV-0141 to YF-EV-0162 are in this worktree and
were read there; YF-EV-0026 is not, and was read from the main checkout at
`~/Sites/yegfacts/evidence/private/YF-EV-0026-cycling-in-a-winter-wonderland`.
That is the one file the two faithfulness seats could not open, and it does
carry the sentence the claim attributes to it.

The three census tables are CSVs inside zip archives, two of them large
(98100479.csv is 759 MB uncompressed, 98100467.csv is 2.0 GB), and were
streamed with `unzip -p … | grep` rather than extracted. The travel survey is
a 55-page PDF, extracted with `pypdf` and whitespace-normalised one line per
page before any phrase search. The open-data archives are JSON or Socrata
page HTML and were parsed with `python3 -c` scripts; where the figure is a
median or a sum, the script is named below.

**Integrity check.** All 23 archives held for this story match the
`archive.sha256` in their registry entry — 22 in this worktree and YF-EV-0026
in the main checkout. Command:

```
python3 -c "
import hashlib,pathlib,re
for i in ['0026']+[f'{n:04d}' for n in range(141,163)]:
    reg=pathlib.Path(f'evidence/registry/YF-EV-{i}.yaml').read_text()
    sha=re.search(r'sha256:\s*(\S+)',reg).group(1)
    rel=re.search(r'path:\s*(\S+)',reg).group(1)
    for base in ('.','/Users/iabdulin/Sites/yegfacts'):
        f=pathlib.Path(base)/rel
        if f.exists():
            h=hashlib.sha256(f.read_bytes()).hexdigest()
            print(f'YF-EV-{i}', 'MATCH' if h==sha else 'MISMATCH', base); break
    else: print(f'YF-EV-{i}','MISSING')"
```

| ID | Archive | Form | sha256 |
|---|---|---|---|
| YF-EV-0026 | Cycling in a winter wonderland | HTML (main checkout) | match |
| YF-EV-0141 | tq23-qn4m, monthly network totals | JSON, 98 rows | match |
| YF-EV-0142 | tq23-qn4m, daily counts by counter, 2025 | JSON, 16,982 rows | match |
| YF-EV-0143 | tq23-qn4m, first and last record per counter | JSON, 62 rows | match |
| YF-EV-0144 | tq23-qn4m dataset page | HTML | match |
| YF-EV-0145 | py7x-4d39 counter locations | JSON, 59 rows | match |
| YF-EV-0146 | vd4b-a4iv dataset page | HTML | match |
| YF-EV-0147 | e8q6-8tts dataset page | HTML | match |
| YF-EV-0148 | Socrata developer portal, tq23-qn4m | HTML | match |
| YF-EV-0149 | nhbh-yj57, 2014 bike ridership survey | HTML | match |
| YF-EV-0150 | StatCan getAllCubesListLite | JSON, 8,269 rows | match |
| YF-EV-0151 | CCHS questionnaire | HTML | match |
| YF-EV-0152 | 2015 HTS Summary Report | 55 pp PDF | match |
| YF-EV-0153 | Navigating Tomorrow page | HTML | match |
| YF-EV-0154 | StatCan Daily, table 2 | HTML | match |
| YF-EV-0155 | Table 98-10-0479-01 | CSV in zip | match |
| YF-EV-0156 | Table 98-10-0480-01 | CSV in zip | match |
| YF-EV-0157 | Table 98-10-0467-01 | CSV in zip | match |
| YF-EV-0158 | 2016 Census Profile, Edmonton city | JSON | match |
| YF-EV-0159 | 24yu-behb, 2012 municipal census | HTML | match |
| YF-EV-0160 | CBC via Yahoo News | HTML | match |
| YF-EV-0161 | e8q6-8tts, 1,296 historic counts | JSON | match |
| YF-EV-0162 | vd4b-a4iv, 10,417 route segments | JSON | match |

No cited archive is a soft-404. Two carry less than their citation implies and
both are already described that way in the record: YF-EV-0148 is a Socrata
developer-portal page whose archived bytes are the portal's own chrome and
scripts and carry no dataset timestamp, which is what
`cv-counter-total-2026`'s first limitation says; and YF-EV-0147 is a Socrata
single-page-app shell whose dataset description survives inside the embedded
JSON, where the City's warning is readable in full.

---

## The recomputations

This run has a specific reason to be careful about them. The counter
dataset's first archive turned out to be Socrata's first thousand rows,
ending in 2024, and the drafter re-staged aggregates so that every published
figure reproduces. So the figures were rebuilt from the re-staged files
rather than read off them.

### The 1,291,714 total — reproduces

Command, from the worktree:

```
python3 -c "
import json,pathlib
m=json.loads(pathlib.Path('evidence/private/YF-EV-0141-tq23-qn4m.json').read_text())
by={r['month'][:7]: int(float(r['bicycle_count'])) for r in m}
print(sum(v for k,v in by.items() if k[:4]=='2026' and int(k[5:7])<=7))"
```

`1291714`. The seven rows it adds are 2026-01 45,386; 2026-02 47,289; 2026-03
77,585; 2026-04 115,435; 2026-05 340,064; 2026-06 282,395; 2026-07 383,560.
The archive runs 2018-08 to 2026-09 in 98 monthly rows, so the window is
inside it and not at its edge, and August 2026 (388,792) and September 2026
(33,775) are both present, which is what the claim's fourth key fact says.

The same script gives 1,611,749 for January to July 2025, 1,547,532 for the
same window in 2024, 2,856,631 for calendar 2025, 436,863 for July 2025, and
139,245 for December, January and February 2025 — 4.8744 per cent of the
calendar year, printed as 4.87. The shortfall against 1.3 million is 0.637
per cent, printed as 0.6; the fall from the 2025 window is 19.86 per cent,
printed as "about a fifth". Every one matches.

Note on the archive's own shape: `bicycle_count` is a string, and Socrata
returns some months as `"381501.0"` and others as `"381501"`. The values are
integral in every row.

### Three of the twenty July medians — reproduce

The whole verdict set was rebuilt rather than three of it, because the set is
what the finding quantifies over. Command:

```
python3 -c "
import json,pathlib,statistics
from collections import defaultdict
d=json.loads(pathlib.Path('evidence/private/YF-EV-0142-tq23-qn4m.json').read_text())
jul=defaultdict(list)
for r in d:
    if r['day'][:7]=='2025-07':
        jul[r['counter_location_description']].append(int(float(r['bicycle_count'])))
for n in ('96 Street S of Jasper Ave','119 Ave E 91 Street evo','83 Avenue W of 99 Street'):
    print(n, len(jul[n]), statistics.median(jul[n]))"
```

- `96 Street S of Jasper Ave` — 31 days, median **46**. The lowest in the set,
  and the one counter below the alternative cutoff of 50.
- `119 Ave E 91 Street evo` — 31 days, median **152**. The corridor a resident
  named ("We have had one for the last year on 119 ave and no one uses it").
- `83 Avenue W of 99 Street` — 31 days, median **979**. The highest in the set.

The two on 132 Avenue give 71 and 79, also on 31 days each, which is the
other named corridor. All twenty reproduce; the full table is in
`scripts/calcs/cycling-volumes.ts`.

### The five membership tests — reproduce end to end

From YF-EV-0143 (service dates), YF-EV-0142 (daily counts), YF-EV-0145
(coordinates) and YF-EV-0162 (route geometry), with the point-to-segment
distance computed on an equirectangular projection at 53.54°N:

| Test | Returns |
|---|---|
| 1, cyclist-naming counters | **51** distinct `counter_location_description` values of 61, 10 pedestrian-only |
| 2, in service on 2025-07-01 | **42**; 9 removed |
| 3, on-street / off-street | **21** ON ROAD, **21** OFF ROAD, **0** unclassifiable; closest call 20.7 m at High Level Bridge East; none borderline under 10 m |
| 4, out of service | **1**, 106 Street N of Jasper Avenue, last record 2025-07-16T23:45 |
| 5, at least 20 of 31 July days | **0** under-reported; every counter in the set published all 31 |

Verdict set **20**, on **13** corridors, medians **46** to **979**, none below
25, one below 50, **17** with January 2025 records running **6** to **212**.

One trap in test 1 worth recording, because it is how a rebuild goes wrong.
`119 Ave E 91 Street evo` appears twice in YF-EV-0143 under two
`counter_configuration` values, "Cyclist and e-Scooter" running 2023-09-20 to
2026-09-02 and "Cyclist Only" running only through January 2024. Keying the
universe by description instead of grouping by it drops the live row, and the
chain then returns 41 in service, 20 on-street, a verdict set of 19 and no
counter on 119 Avenue at all. Grouping is what the brief's wording requires —
"every distinct `counter_location_description`" — and it is what returns the
published numbers.

### The census cells — reproduce

`unzip -p evidence/private/YF-EV-0155-98100479-eng.zip 98100479.csv | grep -a
'^2021,Edmonton,2021A00054811061,Total - Time leaving for work,Total -
Commuting duration,'` returns the 21 mode rows. Total 380,315; car, truck or
van 323,705 (85.115 per cent, printed 85.11); bicycle 3,355 (0.8822 per cent,
printed 0.88); driver 298,320 (78.44); passenger 25,380. The four top-level
rows — car 323,705, sustainable transportation 47,640, motorcycle 335, other
8,635 — sum to 380,315 exactly. The rows the page lists, which are the
sub-rows of sustainable transportation plus the car row, sum to 380,320, five
over, which is what the claim says and why.

The same grep on YF-EV-0156 for `Edmonton (CMA) 835` gives 537,645 and
469,900 (87.398 per cent, printed 87.40) and bicycle 3,905 (0.7263, printed
0.73). YF-EV-0157 gives Edmonton's place-of-work universe: 483,855 total,
102,210 worked at home (21.124 per cent), 1,335 outside Canada, 73,790 no
fixed workplace, 306,525 usual place of work — and 73,790 + 306,525 = 380,315,
which is the commuting universe. Car over the wider denominator is 66.90 per
cent, bicycle 0.6934.

YF-EV-0158 gives 2016: commuting total 466,230, car driver 342,145 plus
passenger 25,080 = 367,225 (78.765 per cent), transit 67,990 (14.58), bicycle
5,575 (1.1958, printed 1.20), employed 490,665 with 23,160 at home (4.72).
Transit 14.58 to 8.11 is "roughly halved"; car 78.76 to 85.11 is "more than
six points".

### The rest

- **YF-EV-0161**, historic counts: 1,296 records, 2009-09-16 to 2016-09-28.
  Four records whose `location_description` begins "82 Avenue": east of 104
  Street on 2016-09-27 (187) and 2016-09-28 (150), west of 104 Street on the
  same two days (175 and 141), each a 24-hour count. No record anywhere in
  the file matches 119 Avenue, 132 Avenue, Hermitage or Whyte.
- **YF-EV-0145**: no counter location contains "82" or "Whyte".
- **YF-EV-0147**: the City's warning is in the dataset description, verbatim —
  "These Bike Counts are historic counts at various locations and should in
  now way be related to the Bike Counts (Eco-Counter) dataset". The same
  block gives "Period of Coverage: Sep 2009 - Sep 2016" and "Automated or
  Manual: Manual".
- **YF-EV-0144**: "Bike and Pedestrian Counts (Eco Counter)", column "Total
  Cyclist Count", and "this data is raw data, coming straight from the
  monitoring equipment. It has not undergone the rigour of a Quality Control
  and/or Quality Assurance process."
- **YF-EV-0160**: both CBC sentences verbatim, and `datePublished`
  2026-08-07.
- **YF-EV-0149**: 1,029 invitations, 646 panel completions, 170 anonymous,
  816 respondents. Spring/summer/fall bands 327 / 131 / 113 / 103 / 81 / 61
  and winter bands 715 / 43 / 23 / 14 / 13 / 8, each summing to 816. So 489
  rode at some frequency (59.9 per cent, "three in five"), 101 in winter (one
  in eight), 21 on the strict winter reading, and 715 never ride in winter
  (87.6 per cent, "nearly nine in ten").
- **YF-EV-0152**: "Between September 14, 2015 and December 11, 2015,
  approximately 21,000 households … for a 24 hour weekday period",
  approximately 15,300 in the City and 5,700 in the Region; Table 3-2 gives
  bicycle 54,800 of 3,139,100 City trips and 10,600 of 1,331,800 Region trips;
  the text gives "Mode share in 2015 was 1.7% in the City and 0.8% in the
  Region"; Table 3-5 prints bicycle as 2% at whole-percentage rounding; the
  cover reads April 2018.
- **YF-EV-0150**: 8,269 released tables. Twelve titles match a
  cycling-shaped pattern and nine of those are "cycle" in the survey-cycle or
  trend-cycle sense; the three genuinely about bicycles are 13100072,
  13100216 and 13100262, all of them about helmet use. No table title names
  Edmonton.
- **YF-EV-0151**: CCHS question UPE_Q05, "In the past 12 months, have you
  participated in any of these activities? 1: Bicycling".
- **YF-EV-0159**: column sums over the 375 neighbourhood rows — driver
  289,748, passenger 14,821, transit 52,812, walk 13,493, bicycle 2,568,
  other 7,198 — total 380,640 and a bicycle share of 0.6747 per cent.
- **YF-EV-0162**: 10,417 segments, `type` taking exactly two values (ON ROAD
  3,160, OFF ROAD 7,257), 9,845 of them built.
- **YF-EV-0026**, from the main checkout: "The City of Edmonton estimates one
  in four cyclists ride all-year round." verbatim.

---

## Counts, pass 1

| | counter | lanes | population | year-round | trips | commuters | car | story | Total |
|---|---|---|---|---|---|---|---|---|---|
| Statements checked | 33 | 36 | 33 | 31 | 32 | 32 | 31 | 92 | **320** |
| VERIFIED | 33 | 33 | 32 | 31 | 31 | 29 | 28 | 88 | **305** |
| IMPRECISE | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 2 | **3** |
| UNSUPPORTED | 0 | 2 | 1 | 0 | 1 | 3 | 3 | 2 | **12** |
| SKIPPED | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |

The fifteen are four defects, plus one required disclosure that was not made
and one methodology artifact that does not exist.

### Defect 1 — a reference week no archived source carries (8 statements)

`cv-commuters-cycle` KF-5 said "The 2021 reference week was 2 to 8 May".
Neither cited archive carries it. Table 98-10-0479-01's metadata has no
reference-week note and the string "May" appears in it only as the
Newfoundland settlement Point May; the same is true of 98-10-0467-01. The
dates are in `brief.md` line 857, and the brief is not evidence — the
2026-09-02 gate on the $100 million story named that exact failure mode and
this is another instance of it. The same wording had spread to two
limitations on that claim, two on `cv-commute-by-car`, one unknown, and two
sentences of the story.

What the archives do carry is the 2021 census, the counts, and the
work-at-home comparison that makes the point the sentence was making. Every
one of the eight now says that instead. (YF-EV-0154 would carry "May 2021",
being a Daily table sourced to "Census of Population (3901) for May 2021",
but it is not cited on either census claim and adding it to carry a date the
sentence does not need is the wrong repair.)

The one place "reference week" stays is GPT-5.6 Sol's key finding on
`cv-commuters-cycle`, because the seat's own round-1 limitation reads "The
reference week was 2021-05-02 through 2021-05-08 during pandemic
conditions." Reporting what a seat said, under its name, is faithful.

### Defect 2 — a launch month the survey page does not give (2 statements)

`cv-trips-by-bike` KF-5 and `cv-population-rides` KF-6 both said Navigating
Tomorrow "launched in September 2025". YF-EV-0153 contains exactly one "2025"
— "The 2025 travel survey" — and no launch date at all. The same key fact
named "Strathcona County, the Government of Alberta and regional partners",
where the page names "the City of Edmonton, Alberta Transportation and
Economic Corridors (ATEC) and Edmonton Metropolitan Region partners" and
lists eleven municipalities of which Strathcona County is one. Both are now
what the page says. The story's own sentence, "the replacement survey
launched in 2025", was already right and is unchanged.

### Defect 3 — three counters described as not yet recording (3 statements)

`cv-lanes-look-empty` KF-7 said of the three counters with no January 2025
median that "The other three had not started recording that month". Two of
them, on 132 Avenue, have no record before 2025-06-16. The third, 103 Street
north of 102 Avenue, has been recording since 2018-08-01 and has 232 days of
2025 running from 2025-05-02 to 2025-12-19: it had started, and published
nothing that January. The claim's own fourth limitation said so in the next
breath, which is how a record contradicts itself in two places.

That limitation had its own error. It counted three counters with partial
2025 records where there are four: `119 Ave E 91 Street evo` has 265 of
2025's 365 days, with 21 days in January and then nothing until May. That
matters beyond bookkeeping, because the January median of 6 that the claim
and the story both print as the bottom of the winter range is a median over
those 21 days. Both now say so.

### Defect 4 — an unsourced fact about a dataset, and a TL;DR that overstates

`cv-lanes-look-empty`'s third missing-evidence line asserted that "The City's
published weekday volumes dataset stops at 2022". No archived source in this
run holds that dataset, no round file states the year, and the line is the
only place it appears. It now says what is true: one reviewer reported
figures from the City's traffic volumes dataset and no archived source here
carries them.

The story's first TL;DR bullet said the July medians run from 46 to 979 "and
none is near the level the brief set for almost none". The lowest is 46
against a bar of 25, which is under twice it, and against the alternative bar
of 50 that same counter falls below — which the body says two paragraphs
later. "None is below" is the true sentence and the one the finding rests on.

### The disclosure that was not made — Hermitage

Not a false statement; an omission the brief requires. The brief's "named
corridors" paragraph says: "A named corridor whose only counter is off-street
under test 3 is reported as such too, with the counter's figures given and
the reason it is outside the verdict set stated." Residents named four
corridors. Three are reported. Hermitage was reported only as absent from the
2009-2016 historic dataset, which is true and leaves a reader to conclude the
corridor is unmeasured.

It is not. `Hermitage North` is 0.8 m from an OFF ROAD segment classified
Shared Pathway and 174.2 m from the nearest ON ROAD segment, so test 3 put it
out; its July 2025 median is 148 bicycles a day on 31 days. `Hermitage South`
is configured "Pedestrian" and never entered the universe at test 1. Both
other seats had this in round 2 and it did not reach the page. A key fact and
a story sentence now carry it.

### The artifact that did not exist — `scripts/calcs/cycling-volumes.ts`

`docs/DESIGN.md` §4 stage 6: "All published arithmetic lives in
`scripts/calcs/<story-slug>.ts`, never done ad hoc in prose." This story
publishes more arithmetic than any other on the site — a seven-month sum,
twenty medians, a five-test membership chain, nine census shares, two survey
distributions — and had no module. The 2026-09-02 gate on the $100 million
story recorded the same shape of gap from the other side: the faithfulness
seat could not rebuild the 42-counter join because "the repository retains
its inputs but no derived join".

The module now exists, with `tests/calcs-cycling-volumes.test.ts` asserting
that each derivation still comes out at the number the claim record prints.
It is a transcription plus arithmetic and reads nothing at run time, because
the archived bytes are gitignored: it is the repository's copy of what this
audit read.

## Verdict, pass 1

**GATE FAIL.**

Twelve unsupported statements, and the largest group of them is a date that
entered from the brief rather than from any archive and then propagated
through eight sentences on two claims and the story. That is the defect this
gate exists to catch, and it is the second run in a row to produce an
instance of it, which is worth naming rather than filing: **a figure or a
date that appears only in the brief has not been sourced, and the brief's
framing sections are not evidence.**

Nothing in the fifteen touches a finding. Every verdict-bearing figure
reproduces from the archived bytes — the seven-month total to the unit, all
twenty July medians, the whole membership chain including the 42-counter
spatial join that no seat could rebuild, every census cell and every share
derived from one. The two claims most at risk of being read wrong, the split
on the counter total and the parked eighth claim, are reported exactly as
`errata.md` items 4 and 7 require: no finding is claimed for the parked
claim in any form, and the split is given as a coverage disagreement rather
than an arithmetic one.

A second pass need only re-read the fifteen statements, the new Hermitage key
fact and story sentence, and the new calcs module.

---

## Pass 2, 2026-09-04

Scope: the fifteen non-VERIFIED statements in the wording now in the tree,
the key fact and story sentence added for Hermitage, and every figure in
`scripts/calcs/cycling-volumes.ts` against the archived bytes it names.

Each of the fifteen was re-read against the same archives. All fifteen now
state what those archives carry:

- The eight reference-week statements name the 2021 census and no week.
- The two Navigating Tomorrow statements say "the 2025 travel survey" and
  name the partners the page names.
- KF-7 now says the two 132 Avenue counters "have no record of any kind
  before 2025-06-16" — which is what YF-EV-0143 establishes, where "had not
  been installed" would have been an inference about a device from a gap in
  its records — and that 103 Street north of 102 Avenue "published nothing
  before May". Limitation 4 counts four counters and names the 119 Avenue
  January as 21 days.
- Both places that print the 6-a-day January median now say it rests on 21 of
  January's 31 days.
- The missing-evidence line no longer asserts a year for a dataset nothing
  archived here holds.
- The TL;DR says "none is below".

The Hermitage additions verify: 148 is the July 2025 median over 31 days from
YF-EV-0142; the shared-path classification is the nearest built OFF ROAD
segment from YF-EV-0162 at 0.8 m against 174.2 m for the nearest ON ROAD; and
`Hermitage South`'s "Pedestrian" configuration is in YF-EV-0143.

The calcs module was checked cell by cell against the archives and its
derivations against the claim records. `npx vitest run
tests/calcs-cycling-volumes.test.ts` — 17 passed.

One repair had to be made twice. Rewriting both census claims off the
reference week left the same eleven words — "the 2021 census did not catch an
ordinary time for commuting" — in a key fact on one claim and a limitation on
the other, and both render on the same page, so `npm run audit:duplication`
failed IN-PAGE. The limitation now reads "Commuting in 2021 was not what it
usually is", which is the same statement over the same evidence in different
words. The audit passes.

### Counts, pass 2

The lanes claim gained a key fact and the story a sentence, so both totals
rise by one.

| | counter | lanes | population | year-round | trips | commuters | car | story | Total |
|---|---|---|---|---|---|---|---|---|---|
| Statements checked | 33 | 37 | 33 | 31 | 32 | 32 | 31 | 93 | **322** |
| VERIFIED | 33 | 37 | 33 | 31 | 32 | 32 | 31 | 93 | **322** |
| IMPRECISE | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| UNSUPPORTED | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| SKIPPED | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |

Registry entries read against their bytes: 23 of 23 hash clean.
`npm run validate` passes: 7 stories, 17 claims, 1 commitment, 8 topics, 162
evidence entries.

### Verdict, pass 2

**GATE PASS on source verification.**

Zero unsupported, down from twelve, and the repairs move toward the archive
in every case rather than around it: a date that existed only in the brief is
gone from eight sentences, a launch month that existed nowhere is gone from
two, a counter that had been recording since 2018 is no longer described as
not yet started, and the corridor that was reported as unmeasured is reported
with the counter that measures it and the reason it sits outside the set. The
arithmetic the page turns on was reproducible before this audit and is now
reproducible from inside the repository.
