## Evidence fetch report (round 2 input)

All 32 cited URLs returned HTTP 200 and were hashed and staged. Two of them
returned an error page under that 200, so the archived bytes are NOT the cited
document. Treat findings resting solely on them as unverified; re-verify or
replace:

- https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&GENDERlist=1&STATISTIClist=1&DGUIDlist=2021A00054811061&HEADERlist=0&SearchText=Edmonton — 200, body is "File not found | Fichier non trouvé" (4,099 bytes)
- https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021A00054811061&Lang=E — 200, same "File not found" body; the same bytes as the URL above
- https://www.edmonton.ca/city_government/documents/PDF/Copy_of_Attachment_4_-_CR_5636_-_Market_Housing_and_Affordability_Study.pdf — 200, body is the City's "Page Not Found" HTML, not the PDF

The Census Profile is the declared primary income input for the affordability
claim (`ip-infill-affordable`), cited as strong supporting evidence by two
seats. Its content could not be verified from the archived bytes, so it was not
ingested into the registry.

The remaining 29 URLs staged as their real documents.
