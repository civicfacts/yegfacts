# Review brief, round 3: /stories, one link per story

Same checkout and scope as the earlier briefs; their decisions stand. After
round 2 the founder asked: "maybe topic hubs should be above title? maybe
they don't need link treatment? does each claim need a link treatment?
where do we want people to go from that page => to story or to a specific
claim?" Stew's answer, applied: to the story. The page is for choosing a
story; search is the route to a single claim, and the story page opens with
a verdict strip carrying the claim anchors.

## What changed since round 2

- src/components/StoryList.astro: topics and the verified date are a
  kicker above the title in the metadata label style (as on the story page,
  which runs topics then title), unlinked; the title is the block's one
  link; the claim questions are plain text in the display face with their
  badges. The doc comment says why.
- src/components/TopicTags.astro: a `linked` prop (default true, so the
  story pages are unchanged) renders plain names when false.

Screenshots of /stories (1280 and 390 px) and /topics/transportation
accompany this brief.

## What to review

Whether the page still tells a reader what to do (one obvious destination
per block), whether losing the claim anchors and the topic links costs
anything a reader needs, the kicker's hierarchy against the 3px rule and
title, and anything the delta disturbs on the story pages that still use
TopicTags linked. Comments are public source.

End with a findings list (file:line, what, why it matters) and a single
line VERDICT: APPROVED or VERDICT: REVISE. File references must be
repo-relative.
