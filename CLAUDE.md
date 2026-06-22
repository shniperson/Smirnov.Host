# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio/CV website for Evgeny Smirnov (Product/UX Designer). Static single-page HTML site served via MAMP on macOS. No build system, no package manager — edit files and refresh the browser.

**Local URL:** `http://localhost:8888/smirnov.host/` (default MAMP port)

## Running locally

MAMP must be running with the htdocs root pointing to `/Applications/MAMP/htdocs`. No build step required — open the browser after saving changes.

To start MAMP from the command line:
```bash
open -a MAMP
```

## File structure

| File/Folder | Purpose |
|---|---|
| `index.html` | Entire page — all sections in one file |
| `css/smirnov.css` | All custom styles |
| `js/smirnov.js` | All custom JS: menu, modals, sliders, scroll animations |
| `css/`, `js/` | Vendor libraries (do not edit) |
| `fonts/` | Self-hosted Font Awesome |
| `img/` | Images, videos (.mp4), SVGs, PDF resumes |

## Architecture

The page is a vertical scroll narrative with distinct fullscreen sections, each with a background overlay transition managed by ScrollMagic.

**Sections (by `id`):** `home-screen` → `quote` → `recent` → `qurator` → `mimp-store` → `tetrika` → `cmw-app` → `vesna` → `about` → `sport` → `traveling` → `hobby` → `parachute` → `material` → `love` → footer.

**Overlay system:** Each section boundary has a pair of `#overlay-*` divs. ScrollMagic tweens their `opacity` via GSAP as the user scrolls, creating smooth fade transitions between sections. Every new section needs both an "fade in" and "fade out" overlay scene in `js/smirnov.js`.

**Project modals:** Each portfolio project has a `#modalXxx` div and a corresponding `#openModalXxx` trigger. The modal open/close pattern in `smirnov.js` is: add `.open-modal` to the modal + `.body-hidden` to body. To add a new project modal, follow the existing pattern for `modalQurator`.

**Scroll-triggered text animations:** The `#quote` section words appear one-by-one using `.quote-span-N` classes toggled by ScrollMagic scenes. Each span gets an `active` class at a specific scroll offset.

## Libraries (vendor, do not modify)

- **jQuery 3.6.0** — DOM/events
- **ScrollMagic + GSAP** — scroll-triggered animations and tweens
- **jQuery Fancybox** — image gallery lightbox (`#material` section)
- **Chief Slider** — carousel (`.slider` elements)
- **Font Awesome 5** — icons (self-hosted in `fonts/`)
