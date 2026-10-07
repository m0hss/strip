# Strip

A Hugo theme for project portfolios, styled as an air-traffic-control **flight progress board**. Each project is a coloured plastic **strip** in a **bay** for its status. When a plan changes, the old text stays visible, struck through, with the correction handwritten beside it in red pen: an **amendment**.

By FixByte Studio. Repository and Hugo Module: [`github.com/m0hss/strip`](https://github.com/m0hss/strip).

## Requirements

Hugo **extended 0.146.0 or later**. The theme uses the newer layout system (`layouts/_partials/`, `layouts/_shortcodes/`, `layouts/_markup/`).

## Install

As a Hugo Module (recommended):

```bash
hugo mod init github.com/you/your-site
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/m0hss/strip"
```

Or as a classic theme: clone the repository into `themes/strip` and set `theme = "strip"`.

Then:

```bash
hugo server -D
hugo --gc --minify
```

## Try the example site

```bash
cd exampleSite
hugo server
```

`exampleSite/hugo.toml` replaces the module with the repository root (`../..`), so you don't need a `themes` folder or a symlink. Every project and log in the example site is a fictional sample from the design.

## Configuration

```toml
[params]
  theme = "dark"                # "dark" (Radar room, default) or "light" (Tower in daylight)
  boardSections = ["projects"]  # sections whose pages become strips on the board
  description = "..."           # meta description fallback
  # kicker = STRIP PORTFOLIO"   # optional: override the header lines
  # boardTitle = "OPERATIONS BOARD"
  [params.radar]
    enable = true               # radar scope under the board; false hides it
    bays = ["ACTIVE"]           # bays whose strips appear as contacts
  [params.handover]
    enable = true               # shift handover log beside the radar; false hides it
    entries = 3                 # latest logs and amendments listed, newest first
    logSections = ["logs"]      # sections whose pages count as log entries
    officer = "M. Sassi"        # officer line and signature; both left out when unset

[[menus.main]]
  identifier = "board"   # identifiers board, logs, about, sweep pick up i18n labels
  name = "BOARD"
  pageRef = "/"
  weight = 10
[[menus.main]]
  identifier = "logs"
  name = "LOGS"
  pageRef = "/logs"
  weight = 20
[[menus.main]]
  identifier = "about"
  name = "ABOUT"
  pageRef = "/about"
  weight = 30
[[menus.main]]
  identifier = "sweep"
  name = "RADAR SWEEP"
  pageRef = "/search"
  weight = 40
```

The search page is an ordinary content page with `layout: "search"` (see `exampleSite/content/search.md`).

## Content model

### Projects (strips)

`hugo new projects/api-02-core-api-rewrite.md`

```yaml
---
title: "Core API Rewrite"
callsign: "API-02"
type: "software"     # software → SFTWR (blue), design → DESGN (pink),
                     # writing → WRITE (green), anything else → MISC (buff)
status: "ACTIVE"     # PENDING | ACTIVE | LANDED | DIVERTED
date: 2026-10-01     # shown as OPENED; orders strips within a bay
summary: "Migrating legacy REST endpoints to GraphQL."
opened_note: "Opened. Full REST-to-GraphQL migration planned."  # optional
amendments:
  - old: "Full schema migration for v1."
    new: "Scope reduced to read-only queries for v1."
    date: 2026-10-05
    rotate: -1       # optional: -1, 1 or 2 (degrees)
tags: ["graphql"]
draft: true
---
```

Status decides the bay. The date only orders strips within a bay, newest first. A strip with an unknown status is left off the board, and the build prints a warning. The latest amendment appears on the strip; the project page shows the full **Amendment log**.

### Logs

Short dated notes in `content/logs/`, shown on a controller's logpad (ruled paper with a red margin line).

### Tags (squawk codes)

Each tag gets a stable 4-digit code made from its name (digits 0 to 7, like a real transponder code).

## Writing in Markdown

| Element | How |
| --- | --- |
| RX transcript | Any blockquote: `> Ship reads first.` gets the `> RX:` prefix |
| NOTAM | `{{</* notam */>}}Read-only mode in effect.{{</* /notam */>}}` (optional `title="..."`), or a GitHub-style alert `> [!NOTE]` |
| Amendment in text | `{{</* amend old="Cutover in November." new="Cutover moved to Q1." date="2026-10-05" */>}}` |
| Teletype | Fenced code blocks: green on near-black, keywords amber |
| Figure | Hugo's built-in `{{</* figure */>}}`, with a mono caption |

## Design

`Strip Theme.html` is the design source of truth, exported from the Claude design canvas "Strip Theme". Open it in a browser with JavaScript enabled. It is a reference only: no layout loads it and it is not part of the theme's assets.

- Colour tokens live in `assets/css/tokens.css` and nowhere else. The light and dark values come from the component sheet.
- Fonts are self-hosted from `static/fonts/` (latin subsets, SIL Open Font License 1.1): IBM Plex Mono for data, IBM Plex Sans for body text, and Kalam only for amendments.
- Every user-visible string lives in `i18n/en.toml`.
- The page reads fully without JavaScript. The ZULU clock and the radar sweep filter are enhancements.

### Where Hugo differs from the design

- **Project layout lookup.** Hugo reserves the `type` front matter key for picking layouts, and the content model uses `type` for strip colour. So project pages are rendered by `layouts/page.html`, which switches to the project layout for pages in a `boardSections` section, not by `layouts/projects/page.html`. Avoid a `type` value that matches a layout folder of your own.
- **Search.** A static site has no server search. The search page renders every strip, and `sweep.js` narrows the list in the browser. Without JavaScript the full list stays visible.
- **Clock.** Without JavaScript the header shows `--:--:--` in place of the time.
- **Phone navigation.** The mobile artboard does not show the primary navigation. The theme keeps it as a full-width row under the title and clock, then shows the design's jump-to-bay bar. The bar highlights no bay, because that would need scroll tracking in JavaScript.
- **Footer.** The design artboards have no footer. The site footer (status line plus `© YEAR SITE // BY FIXBYTE`, linking to https://studio.fixbyte.be) follows the Stitch home-page study in `stitch_strip_design_generator/`. It is pinned to the bottom of the viewport (`position: sticky`) however tall the board is, and scrolls normally on screens under 500px tall.
- **Radar scope.** The design artboards have no radar scope. The panel copies the Stitch home-page study: it sits in the left third of the row under the bays, a rounded-rectangle screen (Stitch's `rounded-full` is 0.75rem) with three inset rings, crosshairs, a conic sweep at 12 RPM, a tower marker and the `RANGE` / `ELEVATION` readouts (decorative strings in `i18n/en.toml`, like the footer's QNH). Its contacts are the real strips in the ACTIVE bay (`params.radar.bays`), each linking to its project. Stitch places each target by hand; Hugo has no layout engine, so a hash of the callsign sets each contact's position, and the same content draws the same scope on every build. Stitch's per-target flight levels would be invented data, so each label shows the callsign and type label instead (`API-02 / SFTWR`). The sweep, ping and pulse are pure CSS and stop when the visitor prefers reduced motion. The scope repeats the ACTIVE bay, so it is hidden from screen readers (a visually hidden line gives the contact count) and its links are out of the tab order.
- **Shift handover log.** The design artboards have none. The cream notepad beside the radar copies the Stitch study's `WATCH SUPERVISOR // SHIFT HANDOVER LOG`. Stitch's entries are invented, so this one lists real content: the latest logs and strip amendments, newest first (`params.handover.entries`). Hugo content has dates, not times, so entries carry a date where Stitch shows `13:42Z`, and `UTC DATE` is the newest entry's date. The officer line and signature come from `params.handover.officer` and are left out when it is unset. `FREQ: 124.85 MHZ` is a decorative string, like the footer's QNH line. Kalam is kept for amendments, so the signature is set in mono red ink where Stitch hand-writes it.
- **Mobile board key.** As in the mobile artboard, the strip count and type key are hidden on phones.

## Licence

TODO: choose a licence before the first release. The bundled fonts keep their own SIL Open Font License (`static/fonts/OFL-*.txt`).
