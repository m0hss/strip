---
name: Tactile ATC Strip Portfolio
colors:
  surface: '#111417'
  surface-dim: '#111417'
  surface-bright: '#37393d'
  surface-container-lowest: '#0b0f11'
  surface-container-low: '#191c1f'
  surface-container: '#1d2023'
  surface-container-high: '#272a2d'
  surface-container-highest: '#323538'
  on-surface: '#e1e2e6'
  on-surface-variant: '#c3c7ce'
  inverse-surface: '#e1e2e6'
  inverse-on-surface: '#2e3134'
  outline: '#8d9198'
  outline-variant: '#43474d'
  surface-tint: '#acc9ec'
  primary: '#b6d4f7'
  on-primary: '#13324e'
  primary-container: '#9bb8da'
  on-primary-container: '#2c4966'
  inverse-primary: '#44617f'
  secondary: '#d0c6a8'
  on-secondary: '#36301b'
  secondary-container: '#4f4932'
  on-secondary-container: '#c1b89b'
  tertiary: '#b9dba8'
  on-tertiary: '#1c3713'
  tertiary-container: '#9ebf8e'
  on-tertiary-container: '#324e27'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d0e4ff'
  primary-fixed-dim: '#acc9ec'
  on-primary-fixed: '#001d34'
  on-primary-fixed-variant: '#2c4966'
  secondary-fixed: '#ece2c3'
  secondary-fixed-dim: '#d0c6a8'
  on-secondary-fixed: '#201b08'
  on-secondary-fixed-variant: '#4d4730'
  tertiary-fixed: '#caecb8'
  tertiary-fixed-dim: '#afd09e'
  on-tertiary-fixed: '#072102'
  on-tertiary-fixed-variant: '#324e27'
  background: '#111417'
  on-background: '#e1e2e6'
  surface-variant: '#323538'
  bg-bay: '#2B2F33'
  bg-body: '#1E2124'
  strip-buff: '#E3D9BA'
  strip-blue: '#9BB8DA'
  strip-pink: '#D9A9B5'
  strip-green: '#AACB99'
  ink-primary: '#1A1A1A'
  ink-secondary: '#404040'
  ink-amendment: '#A93226'
  ink-bay: '#F9FAFB'
  light-bg-bay: '#E5E7EB'
  light-bg-body: '#F3F4F6'
  light-strip-buff: '#F1E7C6'
  light-strip-blue: '#A9C6E8'
  light-strip-pink: '#E8B6C2'
  light-strip-green: '#B9D9A8'
  light-ink-primary: '#333333'
  light-ink-secondary: '#555555'
  light-ink-amendment: '#C0392B'
  light-ink-bay: '#111827'
  plastic-highlight: rgba(255, 255, 255, 0.2)
  plastic-shadow: rgba(0, 0, 0, 0.5)
typography:
  display:
    fontFamily: IBM Plex Sans
    fontSize: 3.05rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 2.44rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 1.95rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 1.95rem
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: IBM Plex Sans
    fontSize: 1.56rem
    fontWeight: '600'
    lineHeight: '1.25'
  title-md:
    fontFamily: IBM Plex Sans
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 0.9rem
    fontWeight: '400'
    lineHeight: '1.5'
  data-mono:
    fontFamily: IBM Plex Mono
    fontSize: 0.9rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.02em
  label-mono:
    fontFamily: IBM Plex Mono
    fontSize: 0.8rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  code-mono:
    fontFamily: IBM Plex Mono
    fontSize: 0.85rem
    fontWeight: '400'
    lineHeight: '1.4'
  amendment-hand:
    fontFamily: Kalam
    fontSize: 0.95rem
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system models an operational air-traffic-control flight progress board, reimagined as a high-density, tactile portfolio interface. Projects are treated not as finished, static monuments, but as active flight strips slotted into physical bay tracks across distinct operational states: Pending, Active, Landed, and Diverted.

The target audience encompasses technical hiring managers, engineering leaders, and systems designers who respect clarity, operational discipline, and authentic craftsmanship. The visual posture blends utilitarian minimalism, brutalist tabular data structures, and subtle tactile materiality. The interface rejects generic tech landing page gradients and equal-weight masonry grids in favor of purposeful utility: rigid compartments, high data density, tabular tracking, and organic ink amendments documenting continuous evolution.

## Colors

The primary mode is dark ("Radar Room"), where deep charcoal surfaces (`#1E2124` body, `#2B2F33` bay racks) provide a quiet, low-glare backdrop against which pastel tactile strips stand out in high contrast. An alternate light mode ("Tower in Daylight") provides an inverted, high-ambient environment.

Regardless of the canvas theme mode, individual flight strips always represent physical paper/plastic objects with light, desaturated paper fills. Therefore, the inks applied to the strips remain consistently dark to preserve high legibility (minimum 5.5:1 to 13:1 WCAG contrast ratios). 

Functional strip category hues include:
- **Buff (`#E3D9BA` / `#F1E7C6`):** General, unclassified, and operational operations.
- **Software Blue (`#9BB8DA` / `#A9C6E8`):** Systems engineering, architecture, and code.
- **Design Pink (`#D9A9B5` / `#E8B6C2`):** Interface work, ergonomics, and visual artifacts.
- **Writing Green (`#AACB99` / `#B9D9A8`):** Research documents, essays, and specifications.

Amendments and course corrections utilize an urgent pen red (`#A93226` in dark mode, `#C0392B` in light mode) reserved strictly for modifications, strikethroughs, and critical alerts.

## Typography

The typographic hierarchy enforces a division between machine-reported operational state, editorial documentation, and human intervention:

1. **System & Prose (`IBM Plex Sans`):** Standard, highly legible sans-serif for project titles, long-form project summaries, and documentation bodies. Keeps structural hierarchy objective and rational.
2. **Telemetry & Identity (`IBM Plex Mono`):** Fixed-pitch figures enforce clean column alignments across strips, callsign codes, UTC timestamps, squawk references, and bay status counters.
3. **Operational Amendments (`Kalam`):** Human handwriting font utilized only for notes, tactical overrides, and `<ins>` tags. It is rendered with slight rotation (-1deg to 2deg) and strikethroughs to capture handwritten controller pen marks.

## Layout & Spacing

The layout is built upon a rigid 4px spatial baseline unit with strict operational bays:

- **Desktop (1280px+):** 12-column layout divided into 4 parallel bay columns (Pending, Active, Landed, Diverted) spanning 3 columns each with a 24px gutter. Bay headers stick to the top of the viewport during vertical operations.
- **Tablet (768px - 1279px):** 2-column stacked bay grid (6 columns per bay, 16px gutter).
- **Mobile (<768px):** Single vertical stream with a sticky status tab selector mimicking a rotatable carousel of strip bays.
- **Long-form Measure:** Text content containers enforce a maximum line length of `65ch` to preserve effortless scanning.
- **Strip Layout Preservation:** Internal compartments inside a flight strip never collapse vertically or wrap unexpectedly; narrow viewports permit localized horizontal scrolling within the strip envelope to guarantee data grid integrity.

## Elevation & Depth

Visual depth mirrors physical plastic strip holders seated within grooved metal bay channels:

- **Bay Channels (Recessed):** Ground level `#2B2F33` framed with a 1px solid border (`#1A1A1A`) and a subtle inner shadow (`inset 0 2px 4px rgba(0,0,0,0.4)`) to establish a physical slot.
- **Flight Strips (Layer 1):** Floating tactile cards elevated with a combination of a light rim edge and a base drop shadow: `0 2px 4px var(--plastic-shadow), inset 0 1px 0 var(--plastic-highlight)`.
- **Active / Dragged / Hovered Strip (Layer 2):** Subtle upward translation (`transform: translateY(-2px)`), paired with an expanded shadow `0 6px 12px rgba(0, 0, 0, 0.45), inset 0 1px 0 var(--plastic-highlight)` and crisp high-contrast focus outlines.
- **Materiality Overlay:** An ultra-lightweight SVG grain noise layer applied at 5% opacity across the canvas, grounding digital panels into tactile physical instruments.

## Shapes

The interface embraces a utilitarian, industrial aesthetic with near-zero radii:

- **Corner Radii:** Outer strip sleeves use `roundedness: 1` (4px / `--radius-md`), creating compact beveled plastic corners. Internal strip data cells use razor-sharp rectangular borders (0px to 2px inner).
- **Internal Cell Dividers:** 1px solid ink borders dividing callsign, type, status, and summary cells.
- **Badges and Bay Headers:** Chamfered or 2px micro-rounded edges, avoiding pill or circle geometries that break the industrial instrument metaphor.

## Components

### Flight Progress Strip
The hero artifact. A dense multi-cell grid partitioned with 1px solid ink borders:
- **Top Row:** Callsign (`label-mono`, uppercase, bold), Title (`headline-sm`, sans-serif), Date/Timestamp (`label-mono`).
- **Bottom Row:** Operational Type label (`label-mono`), Executive Summary (`body-sm`), Current Status (`label-mono`, uppercase).
- **Coloring:** Background mapped strictly to project domain (Buff, Blue, Pink, Green) with high-contrast dark ink.
- **Interactions:** Subtle vertical lift on hover. Focus visible generates a 3px solid ink ring with 2px offset.

### Bay Holders
Vertical slot containers representing operational states. 
- Styled with dark bay background (`#2B2F33`) and 1px crisp separation lines.
- Sticky bay headers display category name and dynamic item count: `ACTIVE (03)`.
- Empty state renders a muted, centered label: `SECTOR EMPTY`.

### Amendment Markups
Used inline within project writeups or on strips to show project evolution:
- Previous decisions wrapped in semantic `<del>` with strikethrough.
- New entries wrapped in `<ins class="amendment">` rendered in handwritten red ink (`#A93226`), displayed with random or staggered `-1deg` to `2deg` rotation.

### Radar Terminal Site Header
- Positioned globally at the top of the viewport.
- Houses the operational portfolio title, active bay status indicators, and a live-ticking UTC Zulu clock (`HH:MM:SS ZULU`) in monospace font.

### Buttons & Terminal Tabs
- Monospaced, high-contrast rectangular blocks.
- Active states feature inverted fills (e.g., light text on dark background inverting to white ink on solid accent).

### NOTAM Callout Blocks
- Notice to Airmen (NOTAM) system warnings and highlights.
- Styled with alternating hazard diagonal hatch marks along the 4px left border and monospaced prefix tags.

### Controller's Logpad (Writing List)
- For long-form editorial essays, replacing the strip with a simulated notepad: pale paper background, faint horizontal ruled lines, and crisp mechanical typography.