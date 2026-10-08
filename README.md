# Strip

A Hugo theme for project portfolios, styled as an air-traffic-control **flight progress board**. Each project is a coloured plastic **strip** in a **bay** for its status. When a plan changes, the old text stays visible, struck through, with the correction handwritten beside it in red pen: an **amendment**.


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

## Licence

[MIT](LICENSE), ©2026 [FixByte](https://studio.fixbyte.be).
