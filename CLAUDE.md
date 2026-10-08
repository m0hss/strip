# Strip Hugo Theme

Strip is a Hugo theme for project portfolios, styled as an air-traffic-control **flight progress board**. Each project is a coloured plastic **strip** that sits in a **bay** for its status. Changes of plan stay visible as **amendments**: the old text is struck through and the correction is handwritten beside it in red pen.

## Project status

This repository is the standalone theme, not a site using the theme. The theme is implemented (layouts, partials, styles, scripts, self-hosted fonts and an `exampleSite/` demo) and is being prepared for the official Hugo themes catalogue (see **Hugo themes catalogue** below). Changes refine it against the design below.

### Design source of truth

`Strip Theme.html` at the repository root is the design, exported from the Claude design canvas "Strip Theme". It is a self-unpacking bundle (about 1.6 MB): open it in a browser with JavaScript enabled to see the artboards. Don't hand-edit it. Re-export it from the canvas when the design changes. It is a reference, not theme code: no layout should load or copy its bundler script. Keep it out of the shipped theme's assets.

The export holds four artboards:

| Artboard | Becomes |
| --- | --- |
| Operations Board (desktop, 1440 wide) | the home page / project list |
| Single project | the single project page |
| Component sheet | the tokens, strip states, shortcodes, log page, search and 404 |
| Operations Board (mobile, 390 wide) | the responsive behaviour of the board |

The design governs changes: content model, visual system, microcopy and accessibility. Keep the design unchanged unless asked to revise it. Where Hugo forces a different mechanism than the design shows, say so in a code comment and the README.

## Hugo requirements and local use

Use Hugo **extended 0.146.0 or later** (the new layout system: `layouts/_partials/`, `layouts/_shortcodes/`, `layouts/_markup/`). From a site that imports this theme:

```toml
theme = "strip"
```

Then run:

```bash
hugo server -D
hugo --gc --minify
```

The repository is the Hugo Module `github.com/m0hss/strip`. To work on the theme itself, give `exampleSite/hugo.toml` a local module replacement (`../..`) and run `cd exampleSite && hugo server`, so no themes folder or symlink is needed.

## Content vocabulary

The ATC metaphor is the theme's language. Use these names in templates, front matter, i18n keys and docs:

- **Strip**: one project, shown as a card. Its grid shows the **callsign** (e.g. `API-02`), title, date, type label, summary and status.
- **Bay**: a status column on the board. There are four: `PENDING`, `ACTIVE`, `LANDED`, `DIVERTED`. Status decides the bay; the date only orders strips within a bay. The ACTIVE bay is wider and has an inverted header. An empty bay shows `SECTOR EMPTY`.
- **Type**: sets the strip colour. `software` → `SFTWR` (blue), `design` → `DESGN` (pink), `writing` → `WRITE` (green), anything else → `MISC` (buff, the default).
- **Amendment**: a `<del>` of the old text plus an `<ins>` in the handwriting font, red ink on a buff label, rotated slightly (-1°, 1° or 2°), with a date. The latest amendment appears on the strip; the project page has a full **Amendment log**. Both must be announced as deletion and insertion, not just shown.
- **Logs** (`LOGS` in the nav): short dated notes on a **controller's logpad** (ruled paper, red margin line).
- **Radar sweep**: the search page (`SWEEP` button, green-on-black input).
- **Radar scope**: the round scope under the board that plots the ACTIVE strips as contacts (from the Stitch study). Not the same as the radar sweep.
- **Handover log**: the cream shift handover notepad beside the radar scope (from the Stitch study). It lists the latest logs and amendments, signed by `params.handover.officer`.
- **Squawk codes**: tags (a 4-digit code plus the tag name).
- **NOTAM**: the callout shortcode (hazard-striped edge).
- **RX transcript**: blockquote with a `> RX:` prefix.
- **Teletype**: code blocks (green on near-black, amber keywords).
- **Vector left / Vector right**: previous and next pagination.
- **404**: `SQUAWK 7600` / `RADIO FAILURE / PAGE NOT FOUND` / `RETURN TO BOARD`.

Project pages need front matter for at least `callsign`, `type`, `status`, `date`, `summary` and `amendments` (each with old text, new text and date). Keep new drafts marked `draft: true` unless the user explicitly asks otherwise.

## Visual system

- **Themes**: dark ("Radar room") is the default, light is "Tower in daylight". Both are set by `data-theme` and share one set of CSS custom properties: `--color-bg-bay`, `--color-bg-body`, `--color-strip-{buff,blue,pink,green}`, `--color-ink-primary`, `--color-ink-amendment`, `--color-ink-bay`, `--color-plastic-highlight`, `--color-plastic-shadow`. Take the exact values from the component sheet. Keep colour values in one tokens stylesheet; everything else uses the variables. A theme changes colour only, never a typeface or a size.
- **Type**: IBM Plex Mono for data (callsigns, dates, labels, nav, headings), IBM Plex Sans for body text, and Kalam **only** for amendments. Self-host the fonts in the theme rather than loading Google Fonts.
- **Details**: 3px double rules under headers, a 9px darkened grip on the strip's left edge, plastic shadow plus a top highlight, a strip lift of 2px on hover, and a faint grain overlay on the board. The header has a live UTC `ZULU` clock.
- **Accessibility**: focus-visible outline of 3px with 2px offset, touch targets of at least 44px, screen-reader labels for strip fields (`Type:`, `Status:`, `Date:`, `Amended:`), `aria-current="page"` on the active nav tab, and `prefers-reduced-motion` respected. On phones, bays stack and the strip grid scrolls sideways inside its card.
- **Progressive enhancement**: content never lives in JavaScript. The page must read fully without it; the clock and search are enhancements.
- Every user-visible string lives in `i18n/en.toml`.

## Repository and releases

The only repository is `github.com/m0hss/strip` (also the module path); every GitHub link points there. The theme author is FixByte Studio. Releases are semver tags (`v0.1.0` onwards) on `master`, as Hugo Modules expect. Never delete or move a published tag: the catalogue and every site using the module fetch by tag.

## Hugo themes catalogue

The theme is meant to be listed on themes.gohugo.io, which `gohugoio/hugoThemesSiteBuilder` builds daily (00:00 UTC) from the module path `github.com/m0hss/strip` in its `themes.txt`. The builder fetches the theme as a Go module and reads the files below **from the latest semver tag** (the latest commit only while no tag exists). A change to any of them reaches the catalogue only after a new tag on `master`.

- **`theme.toml`** (TOML only, repository root): `name`, `license`, `licenselink`, `description`, `homepage`, `demosite`, `tags`, `features`, `[author]`. Don't add `min_version`; the supported versions live only in `hugo.toml` under `[module.hugoVersion]` (`extended = true`, `min = "0.146.0"`).
- **`images/screenshot.png`** (1500×1000) and **`images/tn.png`** (900×600): both exactly 3:2, the desktop Operations Board from `exampleSite/` in the default dark theme, with no browser or device frame. Retake both when the board's look changes: build `exampleSite`, then capture the home page with Playwright at a 1500×1000 viewport (device scale 1 for the screenshot, 0.6 for the thumbnail, so both show the same desktop layout) with reduced motion on.
- **`README.md`**: shown on the catalogue page as well as GitHub. Images use absolute `https://raw.githubusercontent.com/m0hss/strip/master/...` URLs, because relative paths break on the catalogue. No marketing for other products.
- **Demo**: the catalogue hosts no demos; it links to `demosite`. The demo is `exampleSite/`, built by Netlify from `netlify.toml` at the repository root (no `base`, so theme changes at the root trigger a build). Keep `HUGO_VERSION` there on a current release, and keep the example site building without warnings on both that version and the `min` version.
- **Works on any site**: catalogue visitors try the theme on their own content. A site with no `projects`, `logs` or search page, no menu and no params must build without errors or warnings, and the theme must work under a sub-path `baseURL` (link to the home page with `site.Home.RelPermalink`, never `"/" | relURL`).
- **Upkeep**: the catalogue drops themes with no update for 18 months.
- **Listing**: a pull request to `gohugoio/hugoThemesSiteBuilder` adds `github.com/m0hss/strip` to `themes.txt` in lexicographic order; its Netlify deploy preview must pass. That pull request is outward-facing: the user opens it, or asks for it explicitly.

Release checklist: `demosite` set → example site builds clean on both Hugo versions → images current → merge to `master` → tag the next semver version on `master` and push the tag.

Pull request descriptions must not include the Claude session link (`https://claude.ai/code/session_...`) or a session ID.

## Safety and accuracy

- Never invent measurements, outcomes or evidence in content. Mark unknowns as TODOs in drafts.
- Do not include secrets, credentials, customer data, private IPs or internal hostnames in public content.
- The projects in the design (`API-02 Core API Rewrite`, `BRD-07 Harbor Brand Refresh` and the rest) are fictional samples. Use them only as clearly marked example content in `exampleSite/`.
- Draft content for review. Do not publish, deploy or post externally unless explicitly asked.
