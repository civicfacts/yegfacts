# Pre-launch Banner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Put a permanent pre-launch and methodology-status notice above the masthead on every reader-facing page.

**Architecture:** Add one semantic notice to the shared `Base.astro` layout so every HTML page that uses the site layout inherits it. Use only existing Tailwind tokens and exclude the repeated notice from Pagefind.

**Tech Stack:** Astro 7, Tailwind CSS 4, existing YEGFacts design tokens

---

### Task 1: Add the shared status notice

**Files:**
- Modify: `src/layouts/Base.astro`

**Step 1: Add the notice**

Immediately after the optional branch-preview notice and before `<Header>`, add:

```astro
<aside
  aria-label="Site status"
  class="border-b-[3px] border-brick bg-gold px-5 py-4 text-ink"
  data-pagefind-ignore
>
  <p class="mx-auto max-w-[66rem] text-[0.9375rem] leading-relaxed text-pretty sm:text-base">
    <strong class="font-extrabold">YEGFacts has not launched yet.</strong>{' '}
    This site is still a work in progress. We have not yet found the right methodology.{' '}
    <a href="/methodology" class="font-semibold text-navy underline underline-offset-[0.16em]">
      See the current methodology.
    </a>
  </p>
</aside>
```

**Step 2: Run the repository gates**

Run:

```bash
npm run validate && npm test && npm run check && npm run build
```

Expected: every command exits successfully.

**Step 3: Inspect the built output**

Serve `dist` locally and inspect `/`, `/facts/active-transportation`, and `/methodology` at desktop and phone widths. Confirm the notice appears above the forest masthead, does not remain stuck while scrolling, wraps without overflow, and has a working methodology link.

**Step 4: Check the diff**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors and only the approved layout and plan files are changed.
