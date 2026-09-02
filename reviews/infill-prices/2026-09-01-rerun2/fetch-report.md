## Evidence fetch report (round 2 input)

All 32 cited URLs returned HTTP 200 and were hashed and staged; no fetch
failed. Four of them returned something other than the cited document under
that 200, so the archived bytes cannot verify what they were cited for. Treat
findings resting solely on them as unverified; re-verify or replace:

- https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=Edmonton&DGUIDlist=2021A00054811061&GENDERlist=1%2C2%2C3&STATISTIClist=1%2C4&HEADERlist=0 — 200, body is "File not found | Fichier non trouvé" (4,099 bytes)
- https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021A00054811061%2C2021S0503835&GENDERlist=1%2C2%2C3&HEADERlist=0&Lang=E&STATISTIClist=1%2C4&SearchText=edmonton — 200, same "File not found" body; the same bytes as the URL above
- https://dev.socrata.com/foundry/data.edmonton.ca/24uj-dj8v — 200, body is the Socrata Developer Portal shell (33,899 bytes): an empty `<h1 id="title">`, no mention of the dataset id, the field documentation rendered client-side
- https://dev.socrata.com/foundry/data.edmonton.ca/qi6a-xuwt — 200, byte-identical to the URL above, so the archived bytes cannot distinguish the two datasets

The Census Profile is again the declared primary income input for the
affordability claim (`ip-infill-affordable`), cited as strong supporting
evidence by two seats, and the same two URLs are again dead. Its content could
not be verified from the archived bytes, so it was not ingested into the
registry. The Socrata foundry pages were cited as strong challenging evidence
on the field definitions behind `ip-teardown-price-gap`; the field
documentation is not in the archived bytes, so they were not ingested either.

The remaining 28 URLs staged as their real documents. Two pairs among them are
the same document fetched twice: the 2024 Monitoring Market Housing
Affordability report with and without a `?cb=` cache-buster (identical bytes,
already YF-EV-0049), and StatCan table 11-10-0222-01 with and without
`request_locale=en` (the payload is the same table; the bytes differ only in
the locale parameter carried in the page's own links).
