# Design System Audit Report

**CMS Page V2 is the design system's source of truth.** Everything in this Storybook is now organized around that: components CMS Page V2 actually renders live under `Patterns/`, everything else has been archived or removed. This report documents what was found, what changed, and what's still open.

This same report is also viewable inside Storybook at **Foundations → Audit Report**.

---

## Current State (before this audit)

A note on methodology: the initial audit pass used an automated scan to estimate scope (hardcoded color/font-size/etc. counts, unused file counts). Those estimates were **significantly inflated** in several places — re-verifying with direct greps consistently turned up far smaller, more accurate numbers (e.g. 71 hardcoded hex colors, not the original estimate of 289; 18 truly-unused hero-media files, not 27). Every number below is the verified one, not the original estimate.

### Architecture issues found
- **CMS Page V2 was not built from the Patterns library.** 9 of its 11 sections were bespoke inline JSX inside a single 911-line file — not standalone, reusable, or documented as Patterns.
- **No distinction between canonical and legacy components.** Everything sat in one flat `Patterns/` list regardless of whether CMS Page V2 actually used it.
- **Stale sidebar paths.** `TrustedByStickyImage` — a component CMS Page V2 actively renders — was filed under `Pages/T4 Home/PillarPage/...`, a path with no other live meaning.
- **Two parallel token systems.** `hero-media.css` defined its own `--hm-*` color/motion tokens alongside the global `tokens.css`. Investigation found only one real duplicate (`--hm-blue` == `--color-accent`); the rest (amber/teal/sage accents, cinematic motion durations) are legitimate, intentional extensions for that subsystem, not drift.

### Design system inconsistencies found
- **Token drift**: `--color-ink-deepest` (`#111111`) already existed specifically for "near-black media background" use, but `#0c0c0c` — a different, very close value — had independently crept into 4 places (`Nav.css` ×2, the AI Callout and Platforms Scroller patterns) instead.
- **Page-local CSS naming.** Every CMS Page V2 section used a `v2-*` class prefix even though several of those sections are now reusable Patterns — a naming leftover from when the page was a single monolithic file.
- Foundations existed and was reasonably mature **before** this audit (9 stories: Typography, Motion, Colors, Spacing, Breakpoints, Icons, Buttons, Grid, CrosshairHover) — it was incomplete, not broken.

### Token violations found (and closed, scoped to CMS Page V2's live dependency tree)
- No font-weight token scale — **101** literal `font-weight` declarations across the codebase (76× `400`, 18× `700`, 4× `900`, plus a few `500`/`300`).
- No z-index token scale — **45** literal `z-index` declarations (most are legitimate component-local stacking that doesn't need a scale; a handful were genuine cross-component values worth tokenizing).
- No documented shadow or accessibility/contrast story despite `@storybook/addon-a11y` being installed.
- Border-radius scale only had 2 entries (`5px`, `16px`) against real usage spanning `2px`–`999px`.
- **71** hardcoded hex colors outside the token files (of which 11 are the intentional hero-media extensions noted above).

### Duplicate components found (and resolved)

| Duplicate | Resolution |
|---|---|
| 3 independent form-field implementations (`ContactCTA` static-label, `ModalVariants`/`LetsTalkVariants` floating-label) | Consolidated into one `FormField` primitive (`variant="static"\|"floating"`, `tone="light"\|"dark"`) |
| Canonical `FAQ.jsx` pattern vs. CMS V2's inline FAQ reimplementation | Merged via `variant="inline"` + `reveal` props on the one `FAQ.jsx` |
| 4 modal layout explorations, only 1 (`ModalFloating`) ever shipped | Promoted to canonical `ContactModal`; other 3 explorations deleted |
| 3 competing CTA/contact implementations (`ContactCTA` pattern, `LetsTalkVariants` explorations, CMS V2's inline CTA) | CMS V2's version extracted as canonical `LetsTalkCTA`; explorations deleted |
| 27 hero-media exploration variant files, most unused | Verified usage directly — only 18 of 29 were truly dead (zero importers); archived those, kept the 11 still referenced by exploration galleries or `PillarPage v1` |
| Suspected "Card" duplication (`FeatureStack`, `MoreWork`, `WhatWeDo` cards) | **Investigated and rejected** — these are three structurally different things (chrome-less editorial tiles with per-breakpoint cursor choreography vs. a boxed grid card), not a duplicate pattern. Forcing a shared primitive would have been a hollow abstraction. Correctly left unconsolidated. |

### Legacy patterns found (and archived or removed)
- **`PillarPage v1`** — the pre-V2 template system for all 3 pillars (CMS, Digital Products, AI Capabilities), fully bespoke, never componentized. Archived (`Archived/Pages/Pillar Pages (v1)`) rather than deleted, since **it's still the only existing implementation for the Digital Products and AI Capabilities pillars** — no V2 equivalent exists yet for either.
- **9 general-purpose patterns** predating the CMS-V2-as-source-of-truth effort, confirmed to have zero overlap with CMS V2's actual components: `Hero` (generic), `CaseStudy`, `ContactCTA`, `FeatureStack`, `FixedVideo`, `HeroStack`, `MoreWork`, `Stats`, `TestimonialsCarousel`, `WhyTherefore`. Archived to `Archived/Patterns/`.
- **3 design-exploration story sets** (`Case Studies V2 — Flush Tiles`, `Let's Talk Variants`, `Contact Modal Variants`) — working notes from CMS V2's own design process. Deleted outright per direct request (this repo is git-tracked, so the pre-session originals remain recoverable from history if ever needed).

### Accessibility concerns found
- `@storybook/addon-a11y` was installed but **completely unused** — no story exercised it, no contrast guidance existed anywhere.
- Direct contrast computation (WCAG 2.1 relative luminance) found **4 real failures** for normal-size text: `--color-ink-muted` (4.1:1), `--color-ink-subtle` (3.5:1), `--color-accent` used as text (3.0:1), `--color-text-on-dark-faint` (3.6:1). All are below the 4.5:1 AA threshold and must not be used for body copy.
- **Scope limitation**: this audit covered color contrast only. Keyboard navigation, screen-reader behavior, and focus-order were not independently tested — most components use semantic HTML and visible focus states by convention, but that hasn't been verified component-by-component.

---

## Changes Made

- **Tokens added**: `--fw-light/regular/medium/semibold/bold/black` (font-weight scale), `--z-base/dropdown/sticky/overlay/modal/toast` (z-index scale), `--radius-lg` (20px), `--radius-full` (999px).
- **Tokens enforced**: ~100 `font-weight`, ~13 `border-radius`, and ~20 hex-color literals replaced with token references across the live CMS V2 dependency tree — zero visual change except the one deliberate `#0c0c0c` → `--color-ink-deepest` drift fix (imperceptible, ~2% brightness).
- **9 new Pattern components extracted from CMS Page V2**: `PillarHero`, `Opportunity`, `WhatWeDo`, `AICallout`, `CaseStudiesGrid`, `PlatformsScroller`, `LogoWall`, `LetsTalkCTA`, `RelatedContent` — each with its own `.jsx` + `.css` + `.stories.jsx`.
- **2 new shared primitives**: `useReveal` hook (scroll-into-view gate, 6 consumers) and `ScrambleText` component (character-scramble reveal, 2 consumers) — both previously duplicated page-local code.
- **`FormField` primitive** added (`src/components/ui/Form/`), consolidating 3 prior implementations.
- **`ContactModal`** promoted to canonical status from a design exploration.
- **`TrustedByStickyImage`** promoted from a mis-filed page-level file into a proper Pattern.
- **`CMSPillarV2.jsx`**: 911 → 258 lines. **`CMSPillarV2.css`**: 1295 → 9 lines. The page is now a thin composition of Patterns plus its own page-specific content arrays.
- **4 new Foundations stories**: Shadows, Z-Index, Font Weights, Accessibility (the last includes the contrast table above, wired to the a11y addon).
- **`Layout/PageLayout`** rewritten — it previously documented a composition built entirely from now-archived patterns; now documents CMS Page V2's real, current structure.
- **Files archived** (moved, not deleted): `PillarPage v1`, 9 legacy patterns, 18 unused hero-media exploration files.
- **Files deleted**: 3 design-exploration story sets (7 files), by explicit request.

---

## Recommendations

**Future improvements**
- Build CMS-V2-style, fully-Pattern-based versions of the Digital Products and AI Capabilities pillar pages. Once they exist, `PillarPage v1` can be deleted instead of archived.
- Decide whether `LogoCarousel` (used by `HomePage`) and the generic `Hero` (used by the hero-media exploration galleries) should eventually be redesigned to match CMS V2's visual language, or are an intentionally different, older brand moment that's fine to leave alone. This is a design call, not a technical one.
- The z-index sweep tokenized the clear cross-component cases (`Nav.css`); most z-index literals in the codebase are legitimate component-local stacking and don't need a token.

**Missing foundation assets**
- The font-size scale (9 tokens) is sparse relative to how many distinct literal pixel values are used across the codebase. Most of those are legitimate per-section `clamp()` responsive choices, not a real gap — but worth a dedicated look if type-scale drift becomes a visible problem.
- CSS custom properties can't be read inside `@media` query conditions, so breakpoints stay as documented constants (`Foundations/Breakpoints`) rather than literal consumable tokens. This is a CSS language limitation, not something to revisit.

**Missing documentation**
- No `Components/` top-level category exists yet — `Button`, `Eyebrow`, `FormField`, `ScrambleText`, and `useReveal` currently live without a dedicated home distinct from `Patterns/`. Worth splitting out if the team wants a cleaner primitives-vs-patterns distinction.
- `ScrambleText` and `useReveal` have no story of their own (they're small and currently only consumed internally) — a minimal demo would help future contributors discover them before reimplementing.

**Opportunities for further standardization**
- Two different "card" visual languages currently coexist on purpose: `WhatWeDo`'s boxed grid cards vs. the chrome-less editorial tiles in the archived `FeatureStack`/`MoreWork`. Since those are archived, this isn't an active conflict — but if either pattern returns to active use, it's worth a deliberate design decision rather than letting both exist as "the" card style.
- The 3 shadow tokens are real and documented but underused outside `Button`/`HeroStack`. Most dramatic shadows elsewhere in the codebase are one-off, art-directed choices (case-study overlays, nav dropdowns) — if visual consistency in elevation becomes a design goal, that's a design pass, not a token-naming exercise.
