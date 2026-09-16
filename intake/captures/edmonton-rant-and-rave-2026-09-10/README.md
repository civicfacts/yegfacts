# Capture: Edmonton Rant and Rave Facebook post, 2026-09-10, on garbage collection and taxes

The accessible comments on a post in the public Facebook group "Edmonton
Rant and Rave", as one JSONL file. This is the second whole-source intake
under methodology v1.15 and the first on a source that is not about bike
lanes: the thread is about garbage collection, bin sizes and fees, snow
clearing, and what residents get for their taxes.

- **Source URL:** https://www.facebook.com/groups/1303892553778880/posts/2270474750453984/
- **Group:** Edmonton Rant and Rave. Public group ("Anyone can see who's in
  the group and what they post"), visible, about 11.2K members, checked on
  the group's About page on 2026-09-16 before anything was captured.
- **Post date:** 2026-09-10 (the platform showed "6d" on 2026-09-16; the first
  comment is timed 2026-09-10 at 8:10 AM)
- **Captured by:** the founder, 2026-09-16, as a browser export of the comment
  thread; pseudonymised and recorded by Stew the same day
- **Comments:** 117 records, 86 distinct commenters (the post's author among
  them), 45 of them replies

## What the platform displayed against what this file holds

On 2026-09-16 the post page displayed 162 reactions, **123 comments** and 5
shares. The export holds **117** comment records. The difference of six is
not resolved: it may be comments deleted or hidden between the export and the
count, comments by accounts the exporting session could not see, or a display
count that includes something the thread does not show. Nothing identifies six
particular missing comments, and this file is not proof of a complete thread.
Counts and comparisons based on it describe the accessible capture and nothing
more. The first capture had the same kind of gap (669 displayed, 621
extracted) and is described the same way.

## The post, verbatim

Posted by **Prairie Nuthatch W.** (a private individual, pseudonymised like
the commenters; the same person also comments in the thread under that label):

> Why do we pay tax’s? Garbage service absolutely sucks!
> 1 bin every two weeks for a large family.
> Spending my days picking up trash because birds dogs and cats just love ripping them open. Snow removal that just does not happen. This city’s greed is just too much.

## What is in `comments.jsonl`

One JSON object per line:

| field | meaning |
| --- | --- |
| `index` | 1-based position in the thread, the id everything downstream cites |
| `comment_id` | the platform's own opaque comment id, in the same form the first capture uses: base64 of `comment:<post id>_<comment id>`, percent-encoded. The export carried the numeric comment id from each comment's permalink; this form is that id joined to the post's, so `scripts/intake-render-thread.ts` resolves reply chains the same way on both captures |
| `reply_to` | the numeric id of the parent comment, or `null` for a top-level comment |
| `commenter` | pseudonym (see below) |
| `text` | the comment verbatim |
| `time` | the timestamp as the platform displayed it |

The export also carried each comment's permalink, which holds a tracking
token, and an `is_reply` flag that `reply_to` already implies. Both were
dropped. No comment text was changed except for names, below.

## Pseudonyms

Every commenter, and the post's author, is replaced by a pseudonym of the
form *Adjective + Edmonton animal + initial* ("Snowy Hare F."), derived from
a hash of the name so a re-export of the same source yields the same labels.
Magpie is excluded. A pseudonym is stable within this source, so replies and
quote-backs still line up, and it carries no meaning outside it. The mapping
from pseudonym to real name is held privately and is not in this repository.

Facebook prefixes a reply with the name of the person replied to; those names,
and every other place a commenter's full name was typed into a comment body,
carry the pseudonym instead. A second pass replaced standalone first names of
commenters; it found none to replace in this thread. One comment (index 55)
addresses a "MICHAEL" who does not comment in the thread; read in context it
is the ward councillor, and public office-holders keep their names, so it is
left as typed. No public office-holder commented in this thread.
