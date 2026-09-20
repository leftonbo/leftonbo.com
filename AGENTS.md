# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite, React, and strict TypeScript portfolio site. Application routing and presentation helpers live in `src/app/`; route-level views are in `src/pages/`, reusable UI in `src/components/`, and shared utilities in `src/utils/`. Treat `src/content/` as the canonical source for public profile and work data; generated pages and machine-readable outputs must continue to derive from it. Global CSS is split across `src/styles/`, while static images, icons, the web manifest, and license files belong in `public/`. `scripts/prerender.mjs` turns the client and SSR builds into deployable static output under `dist/`.

Tests are colocated with implementation files and use the `*.test.ts` or `*.test.tsx` suffix. Shared test setup is in `src/test/setup.ts`.

## Agent Workflow

- Use `rg --files` and `rg` for filenames, non-code files, and text whose symbol is unknown.
- Use `apply_patch` for small, localized file edits that are not symbol-level refactors.
- Before renaming or deleting a symbol, inspect its references and update all affected callers.
- Use non-interactive commands for automated verification. Default to `npm run test:run`; use `npm run test` or `npm run dev` only when an ongoing process is explicitly needed.
- During iteration, run focused tests with `npm run test:run -- <test-file>`. Run `npm run check` once before handoff for code, configuration, or build changes.
- For page, component, styling, or interaction changes, verify the affected routes in a real browser. Use Playwright for navigation, responsive checks, and screenshots; store artifacts under `output/playwright/`.
- Run `npm ci` only when dependencies are unavailable or a lockfile change requires a clean installation.

## Build, Test, and Development Commands

- `npm ci`: install the exact dependency versions recorded in `package-lock.json`.
- `npm run dev`: start the Vite development server with hot reload.
- `npm run test`: run Vitest in watch mode.
- `npm run test:run`: run Vitest without watch mode.
- `npm run format`: format supported project files with Prettier.
- `npm run format:check`: verify that supported project files are formatted.
- `npm run lint`: run ESLint, failing on any warning.
- `npm run build`: type-check, build client and SSR bundles, then prerender static routes.
- `npm run preview`: serve the production build locally.
- `npm run check`: run the full lint, test, and production-build quality gate before submitting.

## Language

Write user-facing responses, commit messages, pull request descriptions, review comments, documentation, and explanatory code comments in Japanese. Keep code identifiers in English and preserve the language of existing UI copy. Agent-related files, such as AGENTS.md and SKILL.md, may be written in English for agent optimization.

## Coding Style & Naming Conventions

Use two-space indentation, single quotes, and no semicolons, matching the existing TypeScript. Prefer small functional React components, strict types, and accessible native HTML. Name components and pages in PascalCase (`WorkDetailPage.tsx`), functions and variables in camelCase, and tests after their subject (`routes.test.ts`). Keep Bootstrap theme settings in `src/styles/bootstrap.scss` and site-specific design tokens in `src/styles/tokens.css`; avoid scattering replacement constants through component CSS. ESLint enforces TypeScript, React Hooks, refresh, and JSX accessibility rules.

Add Japanese JSDoc only to exported APIs whose purpose, invariants, side effects, or constraints are not clear from their types and names. Do not add comments that merely restate the implementation.

## Bootstrap Usage

Use Bootstrap as the site's styling foundation, including base styles, layout utilities, Navbar, Button, Card, and Badge. Prefer React Bootstrap components over independently styled equivalents. Configure shared appearance through Bootstrap Sass variables in `src/styles/bootstrap.scss` and component CSS variables before adding custom declarations. Preserve the site's existing visual identity; using Bootstrap does not require adopting its default palette or changing the page composition.

Keep site-specific CSS for decoration, layout, and interaction details that Bootstrap does not cover or that are needed to preserve the design. Remove declarations duplicated by Bootstrap instead of layering another independent implementation over it. Capture and compare affected routes at representative viewport widths when changing shared styles.

Use React state for interactive behavior; do not load Bootstrap's DOM-manipulating JavaScript. Import React Bootstrap components by name from `react-bootstrap` so the current Node ESM prerender pipeline can resolve them. Preserve HTML semantics, keyboard behavior, and visible focus, including link semantics for navigation styled as a Button. Verify both the production prerender build and affected routes in a real browser.

## Testing Guidelines

Write behavior-focused Vitest tests with Testing Library in the configured `jsdom` environment. Cover routing, machine-readable output, and accessibility regressions when affected. No numeric coverage threshold is configured; add targeted tests for every changed behavior.

## Commit Message Guidelines

Use Gitmoji style for commit messages. Keep commits focused and avoid mixing content, styling, and infrastructure changes.
