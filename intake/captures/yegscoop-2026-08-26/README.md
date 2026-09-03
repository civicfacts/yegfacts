# Capture: Yegscoop Facebook thread, 2026-08-26 committee decision

The full comment thread on the Yegscoop post about council's bike-lane
decision, as one JSONL file. This is the input to the whole-source intake
pilot: the unit of intake is the source, not a claim an editor picked out
of it.

- **Source URL:** https://www.facebook.com/yegscoop/posts/pfbid02aKkokbtnxq3dsDhfWgbGsEamfiNRUncwnff4ES8N11qVZBg5W4aDxZaPF3frYymVl
- **Post date:** 2026-08-26 (the Infrastructure Committee decision the post reports)
- **Captured by:** the founder, 2026-09-02
- **Comments:** 621

## What is in `comments.jsonl`

One JSON object per line:

| field | meaning |
| --- | --- |
| `index` | 1-based position in the thread, the id everything downstream cites |
| `comment_id` | the platform's own opaque comment id |
| `reply_to` | the numeric suffix of the parent comment's `comment_id`, or `null` for a top-level comment |
| `commenter` | pseudonym (see below) |
| `text` | the comment verbatim |
| `time` | the timestamp as the platform displayed it |

## Pseudonyms

Every commenter is replaced by a pseudonym of the form *Adjective +
Edmonton animal + initial* ("Snowy Hare F."). A pseudonym is stable within
this source, so replies and quote-backs still line up, and it carries no
meaning outside it. The mapping from pseudonym to real name is held
privately and is not in this repository. Pseudonyms also replace names
where a commenter typed one into the body of a comment.

## What is not here

The post text itself is not in this file. It is quoted verbatim in the
earlier partial capture, `intake/captures/2026-09-02-yegscoop-bike-lanes.md`,
which also holds the seven claims an editor registered by hand from this
same thread on 2026-09-02 — the comparison the pilot is run against.
