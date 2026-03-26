# Zahrat Al-Madain Website

Marketing website for Zahrat Al-Madain Association, built with React, TypeScript, Vite, Tailwind CSS, Radix UI, and Wouter.

## Status

The project has been detached from its original prototype/export setup and now runs as a standard local Vite application.

Current priorities:

- replace mock form submissions with real handling
- clean up Arabic content and encoding issues
- tighten transparency and trust-related content
- improve bundle size and page performance

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Radix UI
- Wouter
- Framer Motion

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run a TypeScript check:

```bash
npm run typecheck
```

Default local URL:

```text
http://localhost:5173/
```

## Project Structure

```text
src/
  components/    Shared layout and UI components
  contexts/      App-wide context providers
  data/          Static content and article data
  hooks/         Reusable hooks
  lib/           Small utilities
  pages/         Route-level pages
public/          Static assets
```

## Notes

- Routing is client-side via Wouter.
- The site supports Arabic and English with RTL/LTR switching.
- Several current forms are still front-end only and should not be treated as production-ready lead capture.

## Repository

GitHub:

```text
https://github.com/Bassamalsaqqa/Replit-Zahret
```
