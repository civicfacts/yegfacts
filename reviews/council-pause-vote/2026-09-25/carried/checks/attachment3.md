# Attachment 3 to IS03688: extraction PASS, personal information CLEAR (both versions)

Both carried versions of Attachment 3, "Locations and Status Updates", are extracted completely. Every page, heading, table row, route list and footnote is in the text, and a fresh extraction is byte-identical to the carried file. Neither version contains personal information about a private individual.

I checked this on 2026-09-28 as an independent session, not the editor, working read-only on worktree cpv-rerun at commit c7073a3.

| Registry id | Version | DocumentId | Pages | Extraction | Personal information |
|---|---|---|---|---|---|
| YF-EV-0225 | Original | 304029 | 3 | PASS | CLEAR |
| YF-EV-0226 | Replacement | 304028 | 3 | PASS | CLEAR |

## How I checked

- **Fresh extraction.** `pdftotext -layout -enc UTF-8` run again on each archived PDF produced output byte-identical to the carried text file (`cmp` reported no difference).
- **Hashes.** The archive and text hashes match the manifest:

  | | Archive SHA-256 | Text SHA-256 |
  |---|---|---|
  | YF-EV-0225 | `022129877854062ecd0b681c01c0b7bff1240fd387f9d30799862c829d15bfa4` | `210ba9e57884af265982e0e75e3e0cc606a3840bf41d17222677326fe48c1974` |
  | YF-EV-0226 | `6ee56557e3b04b245a188d40a9c43c41bae0a0aeb9047d2f6bb54c7a182d0b17` | `5b47a31344ac1fe0cc637ee125ad49046ba1a0591679a22789bfa3799275af84` |

- **Visual comparison.** I rendered all six pages with `pdftoppm` at 110 dpi and compared each image with the text line by line.
- **Text in images.** `pdfimages -list` shows only two tiny decorative bars per page (576×9 and 600×20 pixels), the header and footer rules. No text sits in images.

## (A) Extraction: what the text contains

Both versions contain everything the rendered pages show:

- **Page 1.** The "Locations & Status Updates" heading, the status date of August 10, 2026, the "2026" heading and the table's introductory sentence.
- **Status table, first eight rows** (2026, page 1), each with its status:
  - 50 Street: tender awarded, limits adjusted, construction anticipated to start in 2026 (footnote 1).
  - 84 Avenue: tender awarded, construction has not yet started (footnote 2).
  - 92A Avenue/86 Street/alley: tender awarded, construction has not yet started (footnote 2).
  - 93 Street/84 Avenue: tender awarded, construction has not yet started (footnote 2).
  - 100 Street: construction planned for Fall 2026.
  - 110 Avenue/90 Street and 112 Avenue: construction underway.
  - 111 Avenue: construction underway.
  - 114 Avenue: construction underway.
- **Status table, last five rows** (page 2), all "Construction underway":
  - 163 Street, 87 Avenue to 95 Avenue;
  - 163 Street, Stony Plain Road to 107 Avenue;
  - 167 Street/169 Street;
  - Kingsway;
  - Victoria Park Road.
- **Six routes "no longer viable" for 2026** (page 2): 64 Street; 79 Street; 85 Street; 88 Avenue/93 Street/87 Avenue; 89 Street; and 93 Avenue/82 Street/94 Avenue with 75 Street.
- **Page 3.** Two routes under "2027" (107 Avenue with footnote 3, 127 Avenue with footnote 4) and five route entries under "Other": 50 Street (101 Avenue to 109A Avenue), 95 Avenue, 101 Avenue, 106 Avenue, and the Grovenor entry of three streets.
- **Footnotes.** Footnote 1 quotes the July 7, 2026 Council motion in full; footnotes 2, 3 and 4 are complete. Each page footer reads "Page N of 3 | August 26, 2026 - Infrastructure Committee | IS03688".

The only differences between the two versions, both confirmed on the rendered pages:

- The page header reads "REPLACEMENT Attachment 3" on the replacement and "Attachment 3" on the original.
- The introduction to "Other" differs. The original reads: "After Administration evaluates changes in municipal bike lane authority and subject to available funding following the completion of other scheduled routes, these routes may be revisited using alternate design approaches under the current Program or other future initiatives." The replacement shortens it to: "These routes may be revisited using alternate design approaches or other future initiatives."

  This difference bears on claim 2: route status, and whether the "Other" routes are held pending a condition.

### Formatting lost (no content missing)

- Superscript footnote markers become plain digits at the end of a word, for example "start in 2026.1", "not yet started.2", "163 Street)3" and "102A Street)4". A reader could take "2026.1" as a number. Each marker still sits next to its matching footnote.
- The italics of the quoted Council motion in footnote 1 are lost, although its indentation survives.
- The table grid is rendered as spaced columns. Every row stays aligned with its status, and multi-line cells wrap onto a second line in the correct column.
- Bullets extract as "●" followed by a zero-width space. This is harmless.

## (B) Personal information: CLEAR (both versions)

- Neither text names any person.
- Neither contains an email address, phone number or postal address.
- The only locations are street and route names, which are public infrastructure.
- The only individual action mentioned is the Council motion, which is attributed to City Council and names no one.
