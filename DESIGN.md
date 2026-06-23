---
name: True Size
description: NBA Draft Combine physical profile explorer — actual height is just the start.
colors:
  primary: "#2563eb"
  neutral-bg: "#fafafa"
  neutral-surface: "#ffffff"
  neutral-raised: "#f9fafb"
  neutral-inactive-control: "#f3f4f6"
  neutral-divider: "#e5e7eb"
  neutral-row-divider: "#f3f4f6"
  neutral-muted: "#9ca3af"
  neutral-secondary: "#6b7280"
  neutral-inactive: "#4b5563"
  neutral-ink: "#111827"
  semantic-positive: "#16a34a"
  semantic-negative: "#ef4444"
  pos-pg: "#3b82f6"
  pos-sg: "#22c55e"
  pos-sf: "#f59e0b"
  pos-pf: "#f43f5e"
  pos-c: "#8b5cf6"
typography:
  title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.4
  headline:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
components:
  toggle-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
  toggle-inactive:
    backgroundColor: "{colors.neutral-inactive-control}"
    textColor: "{colors.neutral-inactive}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
  toggle-inactive-hover:
    backgroundColor: "{colors.neutral-divider}"
    textColor: "{colors.neutral-inactive}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: True Size

## 1. Overview

**Creative North Star: "The Combine Floor"**

The combine floor is a room of pure measurement. No performance, no narrative — just bodies in space and numbers that tell the truth. True Size's design system carries that same discipline into every screen: dense but legible, exact without being cold, functional without being bare.

Everything the interface shows is load-bearing. The gray hierarchy exists to let numbers register at a glance. The single blue accent marks exactly one thing — the metric this tool was built around. Components don't animate to show off; state changes are immediate and legible. The tool should disappear into the task of understanding a prospect's physical profile.

This system explicitly rejects the aesthetic of its category's worst reflexes: the red-and-black energy of ESPN, the navy-and-bar-chart of enterprise SaaS dashboards, the gamified badge-and-leaderboard rhythm of fantasy apps. Those surfaces shout to be noticed. This one assumes the user already knows what they're looking for.

**Key Characteristics:**
- Restrained single-accent palette — blue-600 used only as a functional indicator, never decoration
- Fixed rem typography scale — product UI consistency, no fluid headings
- Dense information layout — tabular data at full width, compact row height, no padding theater
- Flat surfaces with structural borders — depth through tonal layers, not shadows
- Semantic color reserved for data signals — green/red for quartile thresholds only

## 2. Colors: The Measurement Palette

A near-monochromatic neutral ramp anchored by one functional accent. Every tonal step exists to separate layers of information, not to express brand energy.

### Primary
- **Combine Blue** (`#2563eb`): The functional indicator. Used exclusively for active filter state, True Size metric values in the table and tooltip, and the row hover tint (blue-50 at 40% opacity). Its rarity is the point — when blue appears, it marks something the user came here to find.

### Neutral
- **Near-White Canvas** (`#fafafa`): Body background. Provides subtle separation from pure white surfaces.
- **Panel Surface** (`#ffffff`): Cards, header, controls bar, table body, chart container. The primary resting surface.
- **Lifted Tint** (`#f9fafb`): Table header background and app wrapper. One tonal step above the surface — just enough to ground sticky headers.
- **Inactive Control** (`#f3f4f6`): Inactive toggle button background. Also CartesianGrid stroke.
- **Structural Border** (`#e5e7eb`): All surface borders — cards, header, controls bar, table container, chart container, and axis lines. Single border value across the entire system.
- **Row Divider** (`#f3f4f6`): Table row separation. Lighter than Structural Border; internal to a surface, not between surfaces.
- **Muted Label** (`#9ca3af`): Card labels, footnotes, axis ticks, rank and year columns. The quietest readable text.
- **Secondary Text** (`#6b7280`): Chart axis labels, tooltip position label, contextual secondary content.
- **Inactive Text** (`#4b5563`): Inactive toggle button text.
- **Combine Black** (`#111827`): Primary text — player names, card values, active sort headers, tooltip player name.

### Tertiary
- **Wingspan Positive** (`#16a34a`): Above 75th-percentile wingspan gap or vs. actual values. Signals an outlier advantage.
- **Wingspan Negative** (`#ef4444`): Below 25th-percentile. Signals a disadvantage relative to peers.

### Position Spectrum
Five fixed colors for scatter plot dots only. Never used outside the chart.
- PG `#3b82f6` · SG `#22c55e` · SF `#f59e0b` · PF `#f43f5e` · C `#8b5cf6`

**The One Accent Rule.** Blue-600 is the only true accent. It appears on ≤15% of any given screen. A second accent color is prohibited — it would split the visual priority system that makes True Size values instantly identifiable.

**The Semantic Firewall Rule.** Green (`#16a34a`) and red (`#ef4444`) appear only as quartile signal colors on wingspan gap and vs. actual columns. Never applied to UI state, decorative highlights, or success/error messaging. Their meaning is reserved for what the numbers say.

## 3. Typography

**Body/UI Font:** system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

No custom typeface. The system font stack is the correct choice for a dense data product — native rendering quality, zero load cost, and no personality competing with the numbers.

**Character:** Calibrated and direct. Weight and size do all the hierarchy work. The type system serves the data; it never performs.

### Hierarchy
- **Title** (600, 18px / 1.4): App name in the header. One instance per page. Not a repeatable section pattern.
- **Headline** (600, 24px / 1.2): Card metric values. Large number display. `font-variant-numeric: tabular-nums` always applied.
- **Body** (400–500, 14px / 1.5): Table cells, tooltip content, general text. Default reading size.
- **Label** (500, 12px / uppercase / 0.05em tracking): Card category labels, section headings (Position, Draft Class), table column headers. Always uppercase and tracked. Never applied to body copy.
- **Micro** (400, 12px): Footnotes, axis ticks, rank and year columns. Never bold at this size.

**The Tabular Invariant Rule.** Every number displayed in a data context — table cells, card values, tooltip measurements — uses `font-variant-numeric: tabular-nums`. No exceptions. Columns that don't align are broken.

**The Label Ceiling Rule.** Uppercase tracking is reserved for short categorical labels (≤4 words). Never applied to sentences, player names, or any prose copy.

## 4. Elevation

This system is flat by default. Surfaces are separated by tonal layers and structural borders, not by shadow. The shadow vocabulary is minimal and purposeful.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Cards and chart containers at rest. Barely visible — its job is to detach the surface from the background, not to announce depth.
- **Floating** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): Tooltip only. The sole element that floats above the page plane.

**The Flat Plane Rule.** Borders and tonal steps handle structural separation. Shadow appears on two surfaces only: cards at rest (resting) and the data tooltip (floating). Adding shadow to anything else means the structure is wrong — fix the layout instead.

## 5. Components

**Design intention:** dense but legible. Every component is optimized for quick scanning. They should feel like they belong in the same room as a well-designed stats sheet, not a marketing page.

### Filter Toggles
- **Shape:** Gently rounded (4px). Not pill-shaped — these are controls, not tags.
- **Inactive:** Background `#f3f4f6`, text `#4b5563`, hover background `#e5e7eb`. Low visual weight.
- **Active:** Background `#2563eb`, text `#ffffff`. Single accent — unambiguous selection state.
- **Transition:** `transition-colors` only, 150ms. No scale, no shadow, no transform. Immediate.
- **Group layout:** Flexbox row for positions (5 items); 9-column grid for years aligned to combine seasons.

### Cards (Summary Metrics)
- **Shape:** Gently curved (8px radius).
- **Background:** Panel Surface (`#ffffff`) on Near-White Canvas (`#fafafa`).
- **Border:** Structural Border (`#e5e7eb`), 1px solid. Shadow: resting only (`shadow-sm`).
- **Internal layout:** Label (uppercase, 12px, muted `#9ca3af`) stacked above Value (24px, semibold, ink `#111827`). No icon, no decoration.
- **Value weight:** `font-semibold tabular-nums`. The metric is the card — it should be visually dominant.

### Data Table
- **Container:** `rounded-lg border border-gray-200 bg-white overflow-auto`. Scrollable without breaking layout.
- **Header:** Sticky, background `#f9fafb`, uppercase tracked labels at 12px. Sort indicators: `↑ ↓ ↕`. Active sort column shifts text to `#111827`.
- **Rows:** 1px `border-b #f3f4f6` between rows. Hover: blue-50 at 40% opacity, `transition-colors`. The only place the accent enters as a tint.
- **Cell padding:** `12px / 8px` (px-3 py-2). Tight enough for density, open enough for scanning.
- **Numeric columns:** `tabular-nums`, right-aligned. Muted (`#9ca3af`) for measurement context; accented (`#2563eb`, `font-semibold`) for True Size; semantic (`#16a34a` / `#ef4444`) for quartile signal columns.
- **Name column:** Left-aligned, `font-medium #111827`. The only left-aligned column.

### Scatter Plot
- **Container:** Same card treatment — `rounded-lg border #e5e7eb bg-white`.
- **Grid:** `#f3f4f6` stroke, `strokeDasharray="3 3"`. Barely-there lines that orient without competing.
- **Dots:** 7px radius, 80% opacity, 0.5px white stroke. Position-coded. White stroke separates overlapping dots.
- **Reference line:** Dashed `#d1d5db` diagonal ("plays as listed"). Italic label at 10px. Background context, not a callout.
- **Axes:** 11px muted ticks (`#9ca3af`), 11px gray axis labels (`#6b7280`). Axis lines in Structural Border color.

### Data Tooltip
- **Shape:** `rounded-lg` (8px), `border #e5e7eb`, `bg-white`, floating shadow.
- **Structure:** Player name (14px, semibold) / position label (12px, muted) / measurement rows (12px) / True Size row separated by a hairline and accented in `#2563eb`.
- **Layout:** Label left, value right, `gap-6`, `tabular-nums` on all values. The tooltip is a miniature version of the table — same vocabulary, smaller scale.

### Position Badge
- Inline identifier in the Pos column. Defined in `src/components/ui/badge.tsx`. Color-coded by position using the Position Spectrum colors.

## 6. Do's and Don'ts

### Do:
- **Do** use `#2563eb` as the sole accent — active toggles, True Size values, and row hover tint only.
- **Do** apply `tabular-nums` to every numeric value in a data context, without exception.
- **Do** use uppercase tracked labels (`text-xs font-medium uppercase tracking-wide`) for categorical labels of ≤4 words. Nothing longer.
- **Do** use `#e5e7eb` as the single structural border token across the entire surface. Don't introduce a second border color.
- **Do** keep elevation flat — resting shadow on cards, floating shadow on the tooltip, nothing else.
- **Do** use `#16a34a` and `#ef4444` strictly for quartile signal columns. Their meaning is reserved for what the data says.
- **Do** right-align all numeric columns. Left-align player names only.
- **Do** keep transitions to `transition-colors` at 150ms on interactive elements. State changes should feel immediate, not choreographed.

### Don't:
- **Don't** introduce a second accent color. The One Accent Rule is what makes True Size values visually unambiguous at a glance.
- **Don't** use green or red for UI state, decorative highlights, success/error messages, or any non-data context. The Semantic Firewall Rule is absolute.
- **Don't** import a display or custom typeface for UI labels, buttons, or table headers. The system font stack is the correct choice for this surface.
- **Don't** add shadows beyond the resting card shadow and the floating tooltip shadow. Borders and tonal layering handle all other separation.
- **Don't** apply uppercase tracking to body copy, player names, or text longer than 4 words.
- **Don't** use `border-left` greater than 1px as a colored accent stripe on cards, list items, or callouts.
- **Don't** use gradient text (`background-clip: text` with a gradient). Ever.
- **Don't** introduce glassmorphism, hero-metric templates (big stat + gradient accent), or identical card grids.
- **Don't** build toward ESPN — loud colors, score-ticker energy, red-and-black aggression. This tool is for fans who read.
- **Don't** gamify. No badges, no leaderboards, no achievement states. The data is the reward.
