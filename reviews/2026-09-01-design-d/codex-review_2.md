# Review context: design D (broadsheet ledger), round 2

Same worktree and file list as round 1 (see codex-review_1.md), plus these
files touched by the round-1 fixes: src/components/StoryList.astro,
src/pages/facts/[slug].astro, src/pages/methodology/index.astro,
src/pages/evidence/index.astro, src/pages/about.astro, src/pages/404.astro,
src/pages/support.astro, src/components/AiReview.astro,
src/components/charts/BarChart.astro. Diff base is still ae94fd0; the fix
commit is 13812ce.

## What changed since round 1

1. Contrast: every `text-gold` on a light ground is gone (changes.astro
   scope label to muted; "Pending review", "Main claim" and the methodology
   stage numeral to forest). The only gold text left is ".ca" on forest.
2. Landmark and skip link: the masthead is a `<header>` again. Base.astro's
   skip link targets `#masthead` (a `tabindex="-1"` wrapper around the slot
   content) when the page fills the masthead slot, else `#main`.
3. Newsreader 800 is loaded.
4. Base element styles (`h1,h2,h3,.section-heading` font-family, body,
   :root, ::selection, :focus-visible) moved into `@layer base` so utilities
   like `font-sans` win; `.link`, `.prose`, `.masthead a` stay unlayered on
   purpose.
5. One link style: StoryList, methodology/changes, evidence index, story
   page, and every ad-hoc `text-navy underline` normalised to `.link`.
6. DESIGN.md §10 and the global.css header narrowed to what the code does
   (2px radius on inline code only, colour transitions only, the 3px rule is
   the home page's section heads).
