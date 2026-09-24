# Evidence fetch report (round 2 input)

Round 1 on the second re-freeze cited 21 distinct sources after the merge. Each was fetched by `scripts/evidence-stage.ts` and, where it answered, hashed into `evidence/staging/` (untracked; the manifest `evidence/staging/staging-manifest.json` also holds earlier runs' entries; only this run's are listed). 19 returned a document; 2 did not.

A source that cannot be archived is one the site cannot verify, which lowers what a finding may rest on; it does not make the finding wrong.

## Not archived

| Source | What happened |
|---|---|
| https://www.cbc.ca/news/canada/edmonton/city-to-spend-big-bucks-to-remove-bike-lanes-on-95th-avenue-1.3142737 | The operation was aborted due to timeout |
| https://www.edmonton.ca/sites/default/files/public-files/Garneau_Flipbook__FinalDesign.pdf?cb=1651286488 | HTTP 404 |

## Archived

| Source | Bytes | SHA-256 (first 12) |
|---|---|---|
| https://edmonton.taproot.news/briefs/2025/05/23/debate-grows-as-edmonton-plans-23-km-of-new-bike-lanes-for-202… | 51539 | d6ea71013e5a |
| https://edmonton.taproot.news/news/2026/09/01/bike-routes-cancelled-or-put-off-despite-council-direction | 55895 | 82d0a167b2be |
| https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236 | 8716 | 12986235e265 |
| https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236?f=json | 6001 | 1544b8d8a8b1 |
| https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236/query?where=STREET_NAME… | 33559 | e38bbcfe9f54 |
| https://globalnews.ca/news/11957045/50-street-bike-lanes-edmonton/ | 332913 | 3311ee9b3901 |
| https://strathconacommunity.ca/parking-change-bike-lane/ | 171908 | 228b4c1617f6 |
| https://www.edmonton.ca/city_government/urban_planning_and_design/plans-in-effect | 94221 | acc48008f8c6 |
| https://www.edmonton.ca/projects_plans/roads/active-transportation-network-improvements-project | 165825 | c48537d92654 |
| https://www.edmonton.ca/projects_plans/transit/valley-line-west/final-road-configuration | 50919 | ed45d00976e8 |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic/BikeFactSheet_83ave_APR2015.pdf | 45790 | 0dd67966463f |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic/BikeFactSheet_DT_APR2015.pdf | 45790 | c93fca4da18f |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic%2F2017_102_ave_bike_route_facts.pdf | 45790 | 5eb21c4ae116 |
| https://www.edmonton.ca/sites/default/files/public-files/132AVE_DraftDesigns_WWH_Report.pdf | 1085153 | cd3333f6e0ab |
| https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/WWH-132AvenueRenewal-June2021.pdf | 1271274 | 70273ea97fe2 |
| https://www.edmonton.ca/sites/default/files/public-files/assets/WestCentralBikeRoutes.pdf | 2731106 | a8220cd63b6c |
| https://www.pressreader.com/canada/edmonton-journal/20171128/281500751567564 | 10167 | c88cfcc45a1e |
| https://www.theglobeandmail.com/real-estate/calgary-and-edmonton/article-edmontons-roadway-renewal-program-loo… | 604458 | 0913ae3feecc |
| https://yegbike.info/bike-blog/how-have-edmontons-bike-lanes-changed-over-time | 137244 | 25ab5952293d |
