# Repository Guidelines

## Project Structure & Module Organization

This repository is a static personal website. Top-level HTML files are the main pages: `index.html`, `projects.html`, `resume.html`, `contact.html`, and `miriam-ai.html`. Shared styling lives in `css/styles.css`, with `responsive-fixes.css` used for cross-page mobile adjustments and `bitnami.css` as a small standalone stylesheet. Shared JavaScript lives in `js/scripts.js`. Images and icons are split between `assets/` for core site assets such as `profile.png` and `img/` for page content images.

There is no generated build output or application framework in this repo. Keep changes close to the relevant HTML, CSS, or JavaScript file.

## Build, Test, and Development Commands

- `start index.html` opens the homepage in the default Windows browser for a quick local check.
- `python -m http.server 8000` serves the site at `http://localhost:8000` when browser behavior depends on HTTP paths.
- `git status --short` checks which files were changed before committing.

No package manager scripts are currently defined. Do not add build dependencies unless the change requires them.

## Coding Style & Naming Conventions

Use two-space indentation for HTML, CSS, and JavaScript to match the existing style. Keep semantic HTML structure clear, with reusable sections and descriptive class names. CSS class names should remain lowercase and hyphenated, for example `.contact-section` or `.project-card`. Prefer editing shared styles in `css/styles.css`; use `responsive-fixes.css` only for layout or viewport-specific fixes that affect existing pages.

For JavaScript, keep behavior in `js/scripts.js`, use clear function names, and avoid inline event handlers in HTML when practical.

## Testing Guidelines

There is no automated test suite. Validate changes manually in a browser. Check the affected pages on desktop and mobile widths, confirm navigation links work, and inspect the console for JavaScript errors. For visual changes, verify that images load from `assets/` or `img/` and that text does not overlap at narrow widths.

## Commit & Pull Request Guidelines

Recent commits use concise, imperative summaries such as `Update website: improve mobile responsiveness with CSS fixes for all pages` and `Add social sharing metadata across site`. Follow that pattern: start with an action verb and describe the user-facing change.

Pull requests should include a short summary, affected pages, testing performed, and screenshots for visible UI changes. Link related issues when applicable.

## Agent-Specific Instructions

Preserve the static-site structure and avoid broad rewrites. Do not introduce frameworks, bundlers, or formatting-only churn without a clear project need.
