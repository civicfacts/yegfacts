# Evidence fetch report (round 2 input)

Round 1 cited 27 distinct sources after the merge collapsed the three
seats' citations by normalised URL. Every one was fetched by
`scripts/evidence-stage.ts` on 2026-09-23 and, where it answered, hashed into
`evidence/staging/` (untracked; the manifest is
`evidence/staging/staging-manifest.json`). 21 returned a document. 6
did not, and they are listed here so round 2 sees them rather than defending a
finding on bytes nobody holds.

Nothing here is a verdict on a claim. A source that cannot be archived is a
source the site cannot verify, which lowers what a finding may rest on; it does
not make the finding wrong.

## Not archived

| Source | What happened | Cited by |
|---|---|---|
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Id=1c062828-9844-4cb6-a6ae-9543be282f6e | HTTP 500 after 2 attempt(s) | see combined-evidence.json |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Id=d6ba19d3-61b6-455b-80df-90924976cda1 | HTTP 500 after 2 attempt(s) | see combined-evidence.json |
| https://www.cbc.ca/news/canada/edmonton/city-to-spend-big-bucks-to-remove-bike-lanes-on-95th-avenue-1.3142737 | The operation was aborted due to timeout after 2 attempt(s) | see combined-evidence.json |
| https://www.cbc.ca/news/canada/edmonton/here-s-why-edmonton-s-132nd-avenue-renewal-project-is-garnering-attention-1.6990066 | The operation was aborted due to timeout after 2 attempt(s) | see combined-evidence.json |
| https://www.edmonton.ca/city_government/bylaws/district-plans | HTTP 404 after 2 attempt(s) | see combined-evidence.json |
| https://www.edmonton.ca/transportation/cycling_walking/downtown-bike-network | HTTP 404 after 2 attempt(s) | see combined-evidence.json |

The two City meeting pages answered HTTP 500 to the fetcher; the eScribe
server often refuses non-browser clients, and the same documents may be
reachable as `filestream.ashx` attachments, one of which (DocumentId 203496,
3.1 MB) did archive. The two CBC pages hit the whole-request deadline. The two
edmonton.ca pages returned 404 at the fetch: the district-plans and
downtown-bike-network addresses the seats cited no longer resolve, which round
2 should treat as a source that moved or was withdrawn, not as absent evidence.

## Archived

| Source | Bytes | SHA-256 (first 12) | Type |
|---|---|---|---|
| https://aaronpaquette.ca/blog/on-hermitage-road-bike-lanes-shared-use-paths-budget-pressures-and-why | 201971 | 2f3656434f60 | text/html |
| https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236 | 8716 | e8faa7c66f6c | text/html |
| https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236/query?where=1%3D1&retur… | 14 | b60758c4a705 | application/json |
| https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236/query?where=classificat… | 15889 | ae1af187e07e | application/json |
| https://globalnews.ca/news/11473866/valley-line-lrt-downtown-edmonton-bike-lane/ | 328085 | d7d6c69e1eef | text/html |
| https://globalnews.ca/news/12035727/edmonton-proposes-changes-bike-routes-community-pushback-provincial-legisl… | 340252 | 42044ec44a58 | text/html |
| https://globalnews.ca/news/4353288/edmonton-76-avenue-bike-lanes | 324536 | e0f7e7f823d9 | text/html |
| https://pathsforpeople.org/2023/08/edmontons-newest-complete-street/ | 61620 | 88f75c93ccef | text/html |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=203496 | 3133213 | 950e393507cb | application/pdf |
| https://www.edmonton.ca/132Avenue | 101588 | 3bf905e48609 | text/html |
| https://www.edmonton.ca/projects_plans/roads/active-transportation-network-improvements-project | 165937 | b99bf04b98bc | text/html |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic/2017_102_ave_bike_route_facts.pdf | 45902 | b3d3f4d6836a | text/html |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic/BikeFactSheet_83ave_APR2015.pdf | 45902 | e843b82a4af5 | text/html |
| https://www.edmonton.ca/public-files/assets/document?path=RoadsTraffic/BikeFactSheet_DT_APR2015.pdf | 45902 | 356e1e1d2695 | text/html |
| https://www.edmonton.ca/sites/default/files/public-files/132AveRenewal-Phase5-FAQ.pdf?cb=1710274575 | 412719 | a81d079a757f | application/pdf |
| https://www.edmonton.ca/sites/default/files/public-files/Active-Transportation-Network-100Street-76Avenue-83Av… | 66695 | 6823fa85f4d7 | application/pdf |
| https://www.edmonton.ca/sites/default/files/public-files/assets/132Ave_UDA.pdf | 48973616 | 131eb67c7617 | application/pdf |
| https://www.edmonton.ca/sites/default/files/public-files/assets/Bylaws/Traffic_Listing_Restricted_Highways.pdf… | 1601194 | 021bfc04da06 | application/pdf |
| https://www.edmonton.ca/transportation/on_your_streets/132-avenue-renewal | 101514 | 0261b5bce67c | text/html |
| https://www.pressreader.com/canada/edmonton-journal/20171128/281500751567564 | 10167 | f17ed0a384ba | text/html |
| https://yegbike.info/bike-blog/100m-project-updates-july-2025 | 141037 | 05fd909c41f2 | text/html |
