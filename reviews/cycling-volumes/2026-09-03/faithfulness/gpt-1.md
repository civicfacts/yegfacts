<!-- Faithfulness check 1 (stage 6, methodology v1.24), GPT seat: OpenAI gpt-5.6-sol via `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, run from the worktree. Drafting seat: Claude Opus 5. Run 2026-09-04 by Stew.

Disposition: all 25 items adopted, three of them in substance rather than as worded. Item 3 was already corrected in dda91b3 before this report landed; the seat read the tree as it stood before that commit.

Items 9, 23 and 25 are right that no archived source in this run documents what restrictions were in force in May 2021, so every sentence asserting them is gone. What stands is the work-at-home counts and the collapse in transit's share, which the census tables do carry.

Item 14 is adopted with two evidence IDs rather than one: the absence of a counter on Whyte Avenue rests on the published counter locations (YF-EV-0145) and on the per-counter service record (YF-EV-0143), and the historic counts (YF-EV-0161) carry only the 82 Avenue manual observations.

Item 24's arithmetic is right and the draft's was wrong. The four top-level categories do sum to 380,315, but the rows the draft listed are the sub-rows of sustainable transportation, and those plus the car row come to 380,320, because census counts are randomly rounded before publication.

Two things the seat could not check. The 42-counter spatial join: the editor reproduced the whole five-test chain from YF-EV-0143, YF-EV-0142, YF-EV-0145 and YF-EV-0162, and it returns exactly what the two executing seats reported. 51 cyclist-naming locations; 42 with a record on 2025-07-01; 21 on-street and 21 off-street with none unclassifiable and a smallest ON ROAD to OFF ROAD gap of 20.8 m; one counter out of service, 106 Street N of Jasper Avenue, last record 2025-07-16; a verdict set of 20 on 13 corridors with none under-reported; July 2025 medians from 46 at 96 Street S of Jasper Ave to 979 at 83 Avenue W of 99 Street; none below 25 and one below 50; and 17 of the 20 carrying January 2025 records. The join is reproducible from the registry's own files, which is what item 5 of the 2026-09-04 resolutions in fetch-report.md set out to make true. And YF-EV-0026, whose archived bytes sit in the main checkout rather than in this worktree, `evidence/private/` being gitignored and therefore per-worktree; those bytes do carry "The City of Edmonton estimates one in four cyclists ride all-year round." verbatim. -->

Model: OpenAI Codex (GPT-5), YEGFacts stage-6 faithfulness-check seat.

1. **IMPRECISE.** `src/content/stories/cycling-volumes.mdx:3`, `"cycling is a small share of how the city moves, about 2 per cent of trips."` YF-EV-0152 supports 1.7 per cent of weekday trips by city residents in autumn 2015, not a current share of all travel. Fix: `"In the 2015 survey, bicycles accounted for 1.7 per cent of weekday trips by Edmonton residents."`

2. **IMPRECISE.** `src/content/stories/cycling-volumes.mdx:9`, `"The only local survey that asks is a self-selected panel from 2014."` YF-EV-0149 establishes that survey, but not that it is the only local survey. Fix: `"The only local survey the panel found as of 2026-09-03 was a self-selected panel from 2014."`

3. **UNSUPPORTED.** `src/content/stories/cycling-volumes.mdx:59`, `"The commenter had not worked it out himself. He was reposting a sentence from a CBC News piece"`. The captured comment matches the earlier sentence archived in YF-EV-0160, but the record does not establish where the commenter obtained it or whether he calculated it independently. Fix: `"The comment repeats a sentence published earlier in a CBC News analysis of the same open data."`

4. **IMPRECISE.** `src/content/stories/cycling-volumes.mdx:120`, `"The City's only published bicycle counts anywhere on 82 Avenue are four manual observations ... For 119 Avenue, 132 Avenue and Hermitage it has published no manual count ever."` YF-EV-0161 covers the City's archived historic-count dataset from 2009-09-16 through 2016-09-28, as retrieved on 2026-09-04. "Ever" omits those bounds. Fix: `"In the City's historic-count dataset, covering 2009 to 2016 and checked on 2026-09-04, 82 Avenue has four observations and 119 Avenue, 132 Avenue and Hermitage have none."`

5. **IMPRECISE.** `src/content/stories/cycling-volumes.mdx:135`, `"It reaches the twenty lanes the City meters"`. The calculation establishes 20 counters located on on-street facilities, not 20 distinct lanes. Several counters share corridors. Fix: `"It reaches the twenty on-street counters in the verdict set."`

6. **OVERCLAIM.** `src/content/stories/cycling-volumes.mdx:137`, `"no representative sample of the network is published anywhere."` The archived counter and route files do not establish a universal absence. Fix: `"The panel found no published representative sample of Edmonton's network in the sources checked as of 2026-09-03."`

7. **IMPRECISE.** `src/content/stories/cycling-volumes.mdx:139`, `"The same twenty counters in January run from single figures to a little over two hundred."` YF-EV-0142 has January data for only 17 of the 20 counters. The two 132 Avenue counters and 103 Street north of 102 Avenue had not begun reporting. Fix: `"The 17 counters with January data run from 6 to 212 bicycles a day."`

8. **UNSUPPORTED.** `src/content/stories/cycling-volumes.mdx:153`, `"Geography moves the answer more than age does"`. YF-EV-0152 establishes the 2015 city and regional shares. The record contains no later comparable city share from which to measure the effect of age. Fix: `"Geography changes the reported 2015 share from 1.7 per cent in the city to 0.8 per cent across the region; the evidence does not show how the share has changed since 2015."`

9. **MISATTRIBUTED.** `src/content/stories/cycling-volumes.mdx:168`, `"It fell under pandemic restrictions."` YF-EV-0155, YF-EV-0157 and YF-EV-0158 carry census counts and universes, but their archived bytes do not establish the restrictions in effect during the reference period. Fix: remove the sentence or cite an archived source that documents the applicable restrictions.

10. **UNSUPPORTED.** `src/content/stories/cycling-volumes.mdx:195`, `"a custom tabulation would very likely settle it."` YF-EV-0151 establishes that the health survey asks about bicycling. YF-EV-0150 expressly establishes nothing about unpublished microdata or custom tabulations, including whether an Edmonton estimate is feasible. Fix: `"A custom tabulation could settle it if the underlying sample supports an Edmonton estimate."`

11. **UNSUPPORTED.** `src/content/stories/cycling-volumes.mdx:202`, `"A survey about bicycles attracts people who own one"`. YF-EV-0149 establishes self-selection and recruitment, but does not report bicycle ownership or demonstrate the direction or size of response bias. Fix: `"Because respondents selected themselves into the survey, the sample cannot estimate the Edmonton population."`

12. **OVERCLAIM.** `src/content/stories/cycling-volumes.mdx:249`, `"Nothing public counts arrivals by bicycle at one event in one hour"`. The brief records that no such source was found; it does not establish a universal absence. Fix: `"The brief found no public count of bicycle arrivals for that event and hour as of 2026-09-03."`

13. **IMPRECISE.** `src/content/claims/cv-lanes-look-empty.yaml:6`, `"on each of Edmonton's 20 metered on-street bike lanes"`. YF-EV-0142 and the membership calculation establish 20 counters, not 20 distinct lanes. Fix: `"at each of 20 counters located on Edmonton on-street bike lanes."`

14. **MISATTRIBUTED.** `src/content/claims/cv-lanes-look-empty.yaml:20`, `"No City counter sits on Whyte Avenue."` The only cited source, YF-EV-0161, contains manual historic counts and does not contain automated-counter locations. Fix: add YF-EV-0145 and write `"No automated counter in the City's archived locations dataset sits on Whyte Avenue."`

15. **IMPRECISE.** `src/content/claims/cv-lanes-look-empty.yaml:28`, `"January 2025 medians in the same 20 lanes run from 6 ... to 212"`. Only 17 counters in the verdict set have January records in YF-EV-0142. Fix: `"Among the 17 verdict-set counters with January 2025 data, medians run from 6 to 212 bicycles a day."`

16. **MISATTRIBUTED.** `src/content/claims/cv-population-rides.yaml:20`, `"The only Edmonton survey that asks residents how often they ride is the City's bike ridership survey"`. YF-EV-0149 establishes that this survey asks the question, but not that no other Edmonton survey does. Fix: `"The only Edmonton survey the panel found as of 2026-09-03 that asks residents how often they ride is the City's 2014 bike-ridership survey."`

17. **MISATTRIBUTED.** `src/content/claims/cv-population-rides.yaml:22`, `"People who ride are likelier to answer a survey about riding"`. YF-EV-0149 establishes self-selection, not this claimed response tendency. Fix: `"Because the panel was self-selected, its responses cannot estimate the population in either direction."`

18. **UNSUPPORTED.** `src/content/claims/cv-population-rides.yaml:34`, `"a custom tabulation for Edmonton would settle it."` YF-EV-0150 and YF-EV-0151 do not establish that the health-survey sample can support an Edmonton tabulation. Fix: `"a custom tabulation could settle it if the survey sample supports an Edmonton estimate."`

19. **UNSUPPORTED.** `src/content/claims/cv-population-rides.yaml:42`, `"Its public engagement work runs largely through the opt-in Insight Community panel."` YF-EV-0149 documents one Insight Community survey, not the composition of the City's public-engagement work generally. Fix: delete this sentence or cite archived evidence that carries the broader statement.

20. **OVERCLAIM.** `src/content/claims/cv-year-round-riders.yaml:16`, `"no such survey exists."` YF-EV-0150 establishes only that no released Statistics Canada table carried the measure by the checked date. It does not prove that no survey exists. Fix: `"the panel found no such survey in the published record it checked as of 2026-09-03."`

21. **IMPRECISE.** `src/content/claims/cv-trips-by-bike.yaml:31`, `"On the regional figure of 0.8 per cent it would be contradicted."` The frozen brief and synthesis say 0.8 per cent is Contradicted under the primary cutoffs but Partially supported under the required alternative cutoffs. Fix: `"On the regional figure of 0.8 per cent it would be Contradicted under the primary cutoffs and Partially supported under the alternative cutoffs."`

22. **UNSUPPORTED.** `src/content/claims/cv-trips-by-bike.yaml:33`, `"Edmonton's bike network has changed substantially since."` None of YF-EV-0152, YF-EV-0153 or YF-EV-0154 measures network change since 2015. Fix: delete this clause or cite archived before-and-after network evidence.

23. **MISATTRIBUTED.** `src/content/claims/cv-commuters-cycle.yaml:24`, `"The 2021 reference week, 2 to 8 May, fell under pandemic restrictions"`. YF-EV-0157 and YF-EV-0158 support the work-at-home counts, but their archived bytes do not support the restriction statement. The same unsupported statement recurs at line 34. Fix: `"Work at home was 102,210 of 483,855 employed Edmontonians in 2021, compared with 23,160 of 490,665 in 2016."`

24. **IMPRECISE.** `src/content/claims/cv-commute-by-car.yaml:22`, `"The categories add to 380,315 exactly."` The separately rounded rows in YF-EV-0155 add to 380,320. The published parent total is 380,315. Fix: `"The published total is 380,315; the separately rounded mode rows sum to 380,320."`

25. **UNSUPPORTED.** `src/content/claims/cv-commute-by-car.yaml:35`, `"The 2021 reference week fell under pandemic restrictions."` None of the claim's archived evidence establishes the restrictions then in effect. Fix: remove that clause or add an archived source documenting them.

**Count: 25 findings.** I recomputed the counter totals, monthly comparisons, winter share, available January and July medians, 2014 survey responses, travel-survey figures, census counts and derived percentages. Apart from items 7, 15 and 24, the recomputed figures matched. I could not independently reproduce the 42-counter spatial join into 21 on-street and 21 off-street counters because the repository retains its inputs but no derived join. I also could not check YF-EV-0026: `evidence/private/YF-EV-0026-cycling-in-a-winter-wonderland` is missing, so the cited "one in four cyclists" statement could not be verified against its authoritative archived bytes.
