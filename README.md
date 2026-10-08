# Strip

A Hugo theme for project portfolios, styled as an air-traffic-control **flight progress board**. Each project is a coloured plastic **strip** in a **bay** for its status. When a plan changes, the old text stays visible, struck through, with the correction handwritten beside it in red pen: an **amendment**.

By FixByte Studio. Repository and Hugo Module: [`github.com/m0hss/strip`](https://github.com/m0hss/strip).

![The Strip operations board: four bays of coloured project strips, a radar scope and a shift handover log](https://raw.githubusercontent.com/m0hss/strip/master/images/screenshot.png)

**Live demo:** [strip-hugo.netlify.app](https://strip-hugo.netlify.app/)

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

Or as a classic theme, from your site's root:

```bash
git submodule add https://github.com/m0hss/strip.git themes/strip
```

```toml
# hugo.toml
theme = "strip"
```

Then:

```bash
hugo server -D
hugo --gc --minify
```

To start from the demo, copy `exampleSite/content/` into your site and the `[params]` and `[[menus.main]]` blocks from `exampleSite/hugo.toml` into yours (leave out its `[module]` block, which only points the demo at this repository). Replace the sample projects with your own.

The board only shows pages from `params.boardSections` (`projects` by default). A site without that section still builds: the bays show `SECTOR EMPTY`, and other sections render as plain lists and pages.

## Try the example site

```bash
cd exampleSite
hugo server
```

`exampleSite/hugo.toml` replaces the module with the repository root (`../..`), so you don't need a `themes` folder or a symlink. Every project and log in the example site is a fictional sample from the design.

The live demo is this example site, built by Netlify from `netlify.toml` at the repository root on every push to `master`.

## Configuration

```toml
[params]
  theme = "dark"                # "dark" (Radar room, default) or "light" (Tower in daylight)
  boardSections = ["projects"]  # sections whose pages become strips on the board
  description = "..."           # meta description fallback
  # kicker = "STRIP PORTFOLIO"  # optional: override the header lines
  # boardTitle = "OPERATIONS BOARD"
  [params.radar]
    enable = true               # radar scope under the board; false hides it
    bays = ["ACTIVE"]           # bays whose strips appear as contacts
  [params.handover]
    enable = true               # shift handover log beside the radar; false hides it
    entries = 3                 # latest logs and amendments listed, newest first
    logSections = ["logs"]      # sections whose pages count as log entries
    officer = "M. Sassi"        # officer line and signature; both left out when unset
  [params.footer]
    credit = true               # the "// BY FIXBYTE" link; false removes it

# Tags only. Hugo builds its default categories taxonomy unless the site
# declares its own, and a theme cannot switch it off.
[taxonomies]
  tag = "tags"

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

Status decides the bay. The date only orders strips within a bay, newest first. A strip with a missing or unknown status is left off every strip list (board, radar scope, handover log, vectors, search, section and tag pages), and the build prints one warning that names the file. The latest amendment appears on the strip; the project page shows the full **Amendment log**. Each amendment needs `old`, `new` and a `date` (`YYYY-MM-DD`); one that lacks any of them is left out, and the build prints a warning that names the file.

### Logs

Short dated notes in `content/logs/`, shown on a controller's logpad (ruled paper with a red margin line).

### Tags (squawk codes)

Each tag gets a stable 4-digit code made from its name (digits 0 to 7, like a real transponder code). Only the `tags` taxonomy gets squawk codes: any other taxonomy a site builds, such as Hugo's default `categories`, is listed under its own name without codes.

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
- **Clock.** Without JavaScript the header shows `--:--:--` in place of the time. The placeholder is plain text; the script replaces it with a `<time datetime>` and ticks just after each whole second, so the clock neither drifts nor skips.
- **Strip links.** Each strip is one link, as in the design. Its accessible name is the callsign and title (`aria-labelledby`); type, status, summary, date and latest amendment are its description (`aria-describedby`). Screen readers' links lists stay short, and the fields are still read after the name.
- **Phone navigation.** The mobile artboard does not show the primary navigation. The theme keeps it as a full-width row under the title and clock, then shows the design's jump-to-bay bar. The bar highlights no bay, because that would need scroll tracking in JavaScript.
- **Footer.** The design artboards have no footer. The site footer (status line plus `© YEAR SITE // BY FIXBYTE`, linking to https://studio.fixbyte.be; `params.footer.credit = false` removes the credit) follows the Stitch home-page study in `stitch_strip_design_generator/`. It is pinned to the bottom of the viewport (`position: sticky`) however tall the board is, and scrolls normally on screens under 500px tall.
- **Radar scope.** The design artboards have no radar scope. The panel copies the Stitch home-page study: it sits in the left third of the row under the bays, a rounded-rectangle screen (Stitch's `rounded-full` is 0.75rem) with three inset rings, crosshairs, a conic sweep at 12 RPM, a tower marker and the `RANGE` / `ELEVATION` readouts (decorative strings in `i18n/en.toml`, like the footer's QNH). Its contacts are the real strips in the ACTIVE bay (`params.radar.bays`), each linking to its project. Stitch places each target by hand; Hugo has no layout engine, so a hash of the callsign sets each contact's position, and the same content draws the same scope on every build. Stitch's per-target flight levels would be invented data, so each label shows the callsign and type label instead (`API-02 / SFTWR`). The sweep, ping and pulse are pure CSS and stop when the visitor prefers reduced motion. The scope repeats the ACTIVE bay, so it is hidden from screen readers (a visually hidden line gives the contact count) and its links are out of the tab order.
- **Shift handover log.** The design artboards have none. The cream notepad beside the radar copies the Stitch study's `WATCH SUPERVISOR // SHIFT HANDOVER LOG`. Stitch's entries are invented, so this one lists real content: the latest logs and strip amendments, newest first (`params.handover.entries`). Hugo content has dates, not times, so entries carry a date where Stitch shows `13:42Z`, and `UTC DATE` is the newest entry's date. The officer line and signature come from `params.handover.officer` and are left out when it is unset. `FREQ: 124.85 MHZ` is a decorative string, like the footer's QNH line. Kalam is kept for amendments, so the signature is set in mono red ink where Stitch hand-writes it.
- **Mobile board key.** As in the mobile artboard, the strip count and type key are hidden on phones.
- **Print.** The design has no print state. Both themes print with the daylight palette, because browsers drop backgrounds and the radar room's pale ink would vanish on white paper. Code blocks print as dark ink. The navigation, clock, jump bar, radar scope, search form and vectors are left out; the footer prints once at the end. Strip colours, amendments, the hazard edge, the ACTIVE bay header and squawk codes keep their colours.
- **Windows High Contrast.** The design has no forced-colours state. With High Contrast on, text and borders take the visitor's system colours, while the strip grips, the type key swatches, the NOTAM hazard edge, the logpad margin line and the radar scope keep their own colours so the strip types still read. The current nav tab and the ACTIVE bay header use the system highlight colour, and the footer gets a double rule in place of its shadow.

## Licence

[MIT](LICENSE), ©2026 [FixByte](https://studio.fixbyte.be).
