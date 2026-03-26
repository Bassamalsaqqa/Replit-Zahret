# AGENTS.md

This file defines working conventions for agents making changes in this repository.

## Project Context

- This is a client website for Zahrat Al-Madain Association.
- The current codebase started as an AI-generated prototype and is being hardened into a deliverable production site.
- Priority is reliability, clean content, trustworthiness, and maintainable frontend code.

## Primary Goals

1. Remove prototype/demo behavior and replace it with production-ready behavior.
2. Preserve and improve bilingual Arabic/English support.
3. Avoid introducing regressions in layout, routing, or content rendering.
4. Keep the site easy for the client team to maintain after delivery.

## Working Rules

- Prefer small, reviewable commits.
- Do not reintroduce Replit-specific code, dependencies, comments, or environment assumptions.
- Treat all success states in forms as real product behavior. Do not show success unless data is actually handled.
- Keep content trustworthy. Avoid placeholder legal, operational, or impact claims in production pages.
- Preserve existing design direction unless the task explicitly asks for redesign.
- Favor simple React patterns over unnecessary abstraction.
- Interactive UI must communicate clearly: clickable elements should present a pointer cursor unless there is a deliberate product reason not to.
- Design for mobile, laptop, and large desktop screens. The site should not feel artificially narrow on 27-inch or 32-inch displays.

## Content Rules

- Arabic text must render correctly and be reviewed carefully after edits.
- English and Arabic content should stay semantically aligned.
- Avoid fake metrics, fake offices, fake compliance details, or fake process claims unless explicitly marked as draft content.

## Technical Rules

- Use `@/` imports for code under `src/`.
- Keep Vite config standard and local-machine friendly.
- Keep build output out of source control.
- Prefer fixing root causes over adding exceptions or one-off workarounds.
- Prefer centralized layout primitives for width and spacing. Wide-screen behavior should be controlled through shared shells and readable inner content widths, not one-off per-page widening.
- Maintain a consistent spacing system across pages. Prefer shared section spacing utilities over ad hoc `py-*` values on each route.
- Use wide outer shells plus narrower inner reading widths so pages feel comfortable on phones and expansive displays at the same time.

## Asset Organization

- Do not rely on hotlinked third-party images for production pages when the asset is part of the delivered site.
- Store site-owned static assets under `public/images/`.
- Organize assets by page or content type, not by vague names.
- Home page assets should live under `public/images/home/`.
- Hero assets should live under `public/images/home/hero/`.
- News assets should live under `public/images/news/<slug>/`.
- Reusable decorative assets can live under `public/images/shared/`.
- Use descriptive file names such as `home-hero.jpg`, `news-cover.jpg`, or `gallery-01.jpg`.
- Keep source images optimized before commit. Avoid oversized originals when a compressed web version is sufficient.
- When adding many editorial assets, group them by route and slug so future content uploads stay predictable.

## Validation Checklist

Before finishing substantive work:

1. Run `npm run build`.
2. Run `npm run typecheck` when TypeScript-related files change.
3. Check impacted routes in the browser when UI or routing changes.
4. Confirm that Arabic/English toggling still works when relevant files are touched.
5. Check large desktop layouts around 1440px, 1920px, and 2560px widths when changing major page structure.
6. Confirm that major hero and section content maintains comfortable edge gutters at both mobile and large desktop widths.

## Near-Term Cleanup Priorities

1. Replace mock submit flows on contact, donation, and involvement pages.
2. Fix Arabic text/content corruption where present.
3. Remove or replace placeholder transparency/legal information.
4. Reduce oversized client bundle through code splitting or dependency trimming.
5. Move externally hosted production visuals into the repository under the asset structure above.
