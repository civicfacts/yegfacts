# Evidence fetch report (round 2 input)

Round 1 of the rerun on the re-frozen brief cited 18 distinct sources after the merge. Each was fetched by `scripts/evidence-stage.ts` on 2026-09-24 and, where it answered, hashed into `evidence/staging/` (untracked; manifest `evidence/staging/staging-manifest.json`, which also holds earlier runs' entries; only this run's are listed). 13 returned a document; 3 did not, listed here so round 2 sees them.

A source that cannot be archived is one the site cannot verify, which lowers what a finding may rest on; it does not make the finding wrong.

Two of the 18 are queries against the City's bike-route GIS layer that the
merge lists with their parameters in sorted order; they were fetched in the
order the seats cited them and do not match this table's key, so they are
counted in neither list below. Both are counts and groupings over the live
layer, which every published count is recomputed against the snapshot for.

## Not archived

| Source | What happened |
|---|---|
| https://www.cbc.ca/news/canada/edmonton/city-to-spend-big-bucks-to-remove-bike-lanes-on-95th-avenue-1.3142737 | The operation was aborted due to timeout |
| https://www.cbc.ca/news/canada/edmonton/edmonton-bike-lane-project-met-with-provincial-opposition-1.7513587 | The operation was aborted due to timeout |
| https://www.cbc.ca/news/canada/edmonton/here-s-why-edmonton-s-132nd-avenue-renewal-project-is-garnering-attention-1.6990066 | The operation was aborted due to timeout |

## Archived

| Source | Bytes | SHA-256 (first 12) |
|---|---|---|
| https://aaronpaquette.ca/blog/on-hermitage-road-bike-lanes-shared-use-paths-budget-pressures-and-why | 164349 | 33fa6a6cc5bc |
| https://bikeedmonton.ca/news/102-avenue-protected-bike-lane-from-99-st-to-107-st | 100500 | 273115d912d9 |
| https://pathsforpeople.org/2023/08/edmontons-newest-complete-street/ | 61620 | ad6e21e41eaf |
| https://www.edmonton.ca/city_government/urban_planning_and_design/plans-in-effect | 94221 | 1beeeb0b4d71 |
| https://www.edmonton.ca/projects_plans/roads/active-transportation-network-improvements-project | 165823 | 40665f582f6c |
| https://www.edmonton.ca/projects_plans/transit/valley-line-west/final-road-configuration | 50919 | 944688311389 |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic%2F2017_102_ave_bike_route_facts.pdf | 45790 | 8792ca209f34 |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic%2F2017_83_ave_bike_route_display.pdf | 45790 | 57019748d595 |
| https://www.edmonton.ca/sites/default/files/public-files/assets/132Ave_UDA.pdf?cb=1755078855 | 48973616 | 131eb67c7617 |
| https://www.edmonton.ca/sites/default/files/public-files/assets/Neighbourhoods/132Ave_ExploringOptionsandTrade… | 8053166 | 5cf72563aca4 |
| https://www.edmonton.ca/sites/default/files/public-files/assets/WestCentralBikeRoutes.pdf | 2731106 | a8220cd63b6c |
| https://www.edmonton.ca/transportation/WestCentralBikeRoutes.pdf | 2731106 | a8220cd63b6c |
| https://www.pressreader.com/canada/edmonton-journal/20171128/281500751567564 | 10167 | c88cfcc45a1e |
