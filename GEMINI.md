# João Carlos Pereira - Personal Website

This repository contains the source code for the personal portfolio and professional resume website of João Carlos Pereira, a Senior Programmer with expertise in ERP systems (Delphi) and Artificial Intelligence.

## Project Overview

- **Type:** Static Website (GitHub Pages)
- **Main Technologies:** 
  - HTML5 & CSS3
  - JavaScript (Vanilla)
  - [Bootstrap 5.2.3](https://getbootstrap.com/)
  - [Google Fonts](https://fonts.google.com/) (Plus Jakarta Sans)
  - [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Architecture:** Simple static structure with centralized styling and logic.

## Project Structure

- `index.html`: Main landing page with "About Me" section.
- `resume.html`: Professional career and experience.
- `projects.html`: Education and formations.
- `miriam-ai.html`: Details about the Miriam AI project.
- `contact.html`: Contact information and social links.
- `diversao.html`: Interactive or fun elements (e.g., Pacman-related).
- `css/`:
  - `styles.css`: Primary theme styling (Bootstrap-based).
  - `responsive-fixes.css`: Custom mobile responsiveness adjustments.
  - `bitnami.css`: Standalone auxiliary stylesheet.
- `js/`:
  - `scripts.js`: Main application logic, featuring a complex Pacman-themed canvas background.
  - `pacman-bg.js`: Specific logic for the background animation.
  - `arcade.js`: Logic for interactive components.
- `assets/` & `img/`: Repository for images, icons, and profile photos.

## Building and Running

Since this is a static project, no build step is required.

- **Local Development:** 
  - Open `index.html` directly in any modern browser.
  - Alternatively, use a simple HTTP server: `python -m http.server 8000`.
- **Testing:** Manually verify layout and interactivity across different viewport sizes.

## Development Conventions

- **Indentation:** 2-space indentation for all HTML, CSS, and JS files.
- **Styling:** 
  - Use semantic HTML tags.
  - CSS classes should be lowercase and hyphenated (e.g., `.project-card`).
  - Prefer updating `css/styles.css` for general styles; use `responsive-fixes.css` only for specific layout corrections.
- **JavaScript:** Keep logic modular within `js/` and avoid inline event handlers in HTML.
- **Commits:** Use concise, imperative summaries (e.g., `Update website: improve mobile responsiveness`).

## Key Features

- **Pacman Tech Theme:** A dynamic, interactive canvas background that responds to reduced-motion settings and window resizing, blending classic gaming aesthetics with programming symbols.
- **Miriam AI:** Integration of an external AI assistant hosted at `https://joaocarlos.servehttp.com/`. The page includes a custom JavaScript-driven fallback mechanism that displays a "sleeping" animation if the service is unavailable.
