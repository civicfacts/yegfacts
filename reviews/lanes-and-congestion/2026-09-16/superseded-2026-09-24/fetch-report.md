# Evidence fetch report (round 2 input)

Round 1 of the restarted run cited 16 distinct sources after the merge. Each was fetched by `scripts/evidence-stage.ts` on 2026-09-24 and, where it answered, hashed into `evidence/staging/` (untracked; manifest `evidence/staging/staging-manifest.json`). 15 returned a document; 1 did not, listed here so round 2 sees them.

A source that cannot be archived is one the site cannot verify, which lowers what a finding may rest on; it does not make the finding wrong.

## Not archived

| Source | What happened |
|---|---|
| https://www.cbc.ca/news/canada/edmonton/here-s-why-edmonton-s-132nd-avenue-renewal-project-is-garnering-attention-1.6990066 | The operation was aborted due to timeout |

## Archived

| Source | Bytes | SHA-256 (first 12) |
|---|---|---|
| https://aaronpaquette.ca/blog/on-hermitage-road-bike-lanes-shared-use-paths-budget-pressures-and-why | 164349 | 33fa6a6cc5bc |
| https://bikeedmonton.ca/news/102-avenue-protected-bike-lane-from-99-st-to-107-st | 100500 | 615a0036af09 |
| https://edmonton.taproot.news/news/2026/09/01/bike-routes-cancelled-or-put-off-despite-council-direction | 55895 | 044893aef930 |
| https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236 | 8716 | 5cb2cca64057 |
| https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236/query?where=1%3D1&retur… | 14 | b60758c4a705 |
| https://globalnews.ca/news/3534322/edmonton-downtown-bike-network/ | 335183 | f64351d87e5f |
| https://pathsforpeople.org/2023/08/edmontons-newest-complete-street/ | 61620 | e2f135cb7b45 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=fd2f249c-4d39-4fbf-86ca-8209589f45… | 529294 | e297ea369541 |
| https://www.edmonton.ca/projects_plans/roads/active-transportation-network-improvements-project | 165827 | 82e873e5984c |
| https://www.edmonton.ca/projects_plans/transit/valley-line-west/final-road-configuration | 50919 | d18817f07d71 |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic/BikeFactSheet_DT_APR2015.pdf | 45790 | 83556ad1f564 |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic%2F2017_102_ave_bike_route_facts.pdf | 45790 | 1d6a86b7f0d2 |
| https://www.edmonton.ca/sites/default/files/public-files/132-Avenue-Collector-Renewal-FAQs.pdf?cb=1743727725 | 165891 | 231ddf00ef09 |
| https://www.edmonton.ca/sites/default/files/public-files/assets/WestCentralBikeRoutes.pdf | 2731106 | a8220cd63b6c |
| https://www.edmonton.ca/transportation/on_your_streets/132-avenue-renewal | 101402 | e057e1c8d9f8 |
