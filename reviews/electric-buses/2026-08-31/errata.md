# Errata — known errors preserved in this run's raw artifacts

The raw review files are committed unaltered as part of the audit trail.
Errors found in them later are corrected HERE, not by editing the record.

1. `round1/gemini.json` cites
   `https://www.cbc.ca/news/canada/edmonton/edmonton-proterra-electric-buses-lawsuit-1.7100000`
   as a CBC article about the Proterra lawsuit. The URL resolves to an
   unrelated CBC story. The citation was identified as fabricated at
   evidence staging (see `evidence/staging/staging-manifest.json`, status
   `content-mismatch`), was excluded from the evidence registry, and no
   published statement rests on it.
