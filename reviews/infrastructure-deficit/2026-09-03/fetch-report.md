# Evidence fetch report (round 2 input)

Round 1 cited 23 distinct sources after the merge. Each was fetched by `scripts/evidence-stage.ts` and, where it answered, hashed into `evidence/staging/` (untracked; the manifest `evidence/staging/staging-manifest.json` also holds earlier runs' entries; only this run's are listed). 15 returned a document; 8 did not.

A source that cannot be archived is one the site cannot verify, which lowers what a finding may rest on; it does not make the finding wrong.

## Not archived

| Source | What happened |
|---|---|
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=184120 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=224915 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=261605 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=261618 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=284322 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=287959 | HTTP 403 |
| https://www.cbc.ca/news/canada/edmonton/city-edmonton-renewal-investment-shortfall-1.7548467 | The operation was aborted due to timeout |
| https://www.cbc.ca/news/canada/edmonton/edmonton-mayor-infrastructure-funding-provincial-budget-9.7106037 | The operation was aborted due to timeout |

## Archived

| Source | Bytes | SHA-256 (first 12) |
|---|---|---|
| https://edmonton.taproot.news/briefs/2023/11/27/edmontons-budget-adjustment-so-far | 51655 | c4c725c071da |
| https://edmonton.taproot.news/news/2022/12/12/budget-deliberations-continue-following-100m-for-edmonton-bike-p… | 49574 | 5456101b66fa |
| https://github.com/PeterFriedrich/edmonton-tax-viz/pull/471 | 310092 | a93f6bae5773 |
| https://github.com/PeterFriedrich/edmonton-tax-viz/pull/473 | 305677 | 2341727ff709 |
| https://github.com/PeterFriedrich/edmonton-tax-viz/pull/548 | 301660 | 5777949e8e2f |
| https://globalnews.ca/news/11234828/edmonton-capital-funding-2025-fiscal-update | 370569 | f4558e763abf |
| https://globalnews.ca/news/9338993/edmonton-city-council-100-million-bike-lanes/ | 332389 | e9bd45debc4f |
| https://pathsforpeople.org/2024/04/well-say-it-again-its-not-because-of-bike-lanes-spring-budget-adjustment-20… | 53859 | 71ce575f8ef7 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=215a3a89-60c7-4eff-8533-cf94079fab… | 1367742 | fc4820b8ef8f |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=8c66c382-bd3c-4c28-bfad-1b5b91142e… | 386001 | a7dd535955d7 |
| https://www.edmonton.ca/city_government/initiatives_innovation/infrastructure-state-and-condition | 46955 | 7d5c61c641a7 |
| https://www.edmonton.ca/sites/default/files/public-files/2023-2026CapitalBudget.pdf | 8060847 | 2f23563ea5ed |
| https://www.edmonton.ca/sites/default/files/public-files/2024FinancialAnnualReport.pdf | 7813729 | 4ad8f289b339 |
| https://www.edmonton.ca/sites/default/files/public-files/assets/APPROVED_Capital_Budget_2019_2022.pdf | 1469643 | 624ae537161e |
| https://www.gov.edmonton.ab.ca/sites/default/files/public-files/2023-2026CapitalBudget.pdf?cb=1750461215 | 8060847 | 2f23563ea5ed |
