---
name: UnpopularVoice
description: Financial teardowns of Indian startups, set like a broadsheet exposé.
colors:
  auditors-red: "#B22222"
  auditors-red-deep: "#991B1B"
  masthead-black: "#000000"
  ink-panel: "#0D0D0D"
  newsprint-white: "#FFFFFF"
  warm-cream: "#FAF6EF"
  panel-gray: "#F9FAFB"
  hairline: "#F3F4F6"
  rule-gray: "#E5E7EB"
  muted-ink: "#9CA3AF"
  caption-ink: "#6B7280"
  body-ink: "#374151"
  gain-green: "#15803D"
  loss-red: "#DC2626"
  verdict-solid-bg: "#F0FDF4"
  verdict-solid-border: "#BBF7D0"
  verdict-watch-bg: "#FFFBEB"
  verdict-watch-border: "#FDE68A"
  verdict-watch-text: "#B45309"
  verdict-caution-bg: "#FEF2F2"
  verdict-caution-border: "#FECACA"
  verdict-caution-text: "#B91C1C"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1.08
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.1
  pullout:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
  figure:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  ui:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.25em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-article: "24px"
  gutter-desktop: "32px"
  card-pad: "20px"
  panel-pad: "40px"
  article-measure: "760px"
  page-max: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.auditors-red}"
    textColor: "{colors.newsprint-white}"
    typography: "{typography.ui}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.auditors-red-deep}"
  button-secondary:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.caption-ink}"
    rounded: "{rounded.sm}"
    padding: "10px 24px"
  chip-filter:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.caption-ink}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-filter-active:
    backgroundColor: "{colors.masthead-black}"
    textColor: "{colors.newsprint-white}"
  chip-verdict-solid:
    backgroundColor: "{colors.verdict-solid-bg}"
    textColor: "{colors.gain-green}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-verdict-watch:
    backgroundColor: "{colors.verdict-watch-bg}"
    textColor: "{colors.verdict-watch-text}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-verdict-caution:
    backgroundColor: "{colors.verdict-caution-bg}"
    textColor: "{colors.verdict-caution-text}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  card-article:
    backgroundColor: "{colors.newsprint-white}"
    rounded: "{rounded.md}"
    padding: "{spacing.card-pad}"
  panel-dark:
    backgroundColor: "{colors.masthead-black}"
    textColor: "{colors.newsprint-white}"
    rounded: "{rounded.xl}"
    padding: "{spacing.panel-pad}"
  panel-cream:
    backgroundColor: "{colors.warm-cream}"
    textColor: "{colors.masthead-black}"
    rounded: "{rounded.lg}"
    padding: "32px"
  input-email:
    backgroundColor: "{colors.newsprint-white}"
    textColor: "{colors.masthead-black}"
    typography: "{typography.ui}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
  nav-bar:
    backgroundColor: "{colors.masthead-black}"
    textColor: "{colors.newsprint-white}"
    height: "72px"
---

# Design System: UnpopularVoice

## Overview

**Creative North Star: "The Broadsheet Exposé"**

UnpopularVoice is set like the front page of a serious newspaper running an investigation. A black masthead, heavy serif headlines, white newsprint, and one red rule that says "this is the story." The numbers are the headlines: revenue and losses are set in the same display serif as the titles, large and black, so a reader can screenshot a figure and it still reads as reporting, not marketing.

Density is editorial, not dashboard. Article pages hold a single 760px reading column with generous vertical spacing; index pages open into a 1280px grid of quiet white cards. Drama comes from contrast (pure black panels interrupting white pages) rather than from color, gradients, or imagery. There is no photography in the system and no illustration; the figures and the type carry the page.

Red is the masthead ink. It marks the brand, the call to subscribe, and the eyebrow of a section. It never marks a loss. Losses and gains have their own semantic reds and greens, kept deliberately distinct from the brand.

**Key Characteristics:**
- Serif display (Playfair Display) for headlines and every headline figure; sans (Inter) for prose, UI, and labels.
- Black, white, and Auditor's Red as the identity; greys for structure; green and red only for data.
- Short red accent bar (48px by 4px) as the recurring masthead mark above headlines and dark panels.
- Black pull-out panels for the one line meant to be screenshotted.
- Tiny uppercase tracked labels as the eyebrow vocabulary.
- Flat surfaces; hairline borders do the structural work.

## Colors

Monochrome newsprint with one masthead red, plus a strictly separated data palette.

### Primary
- **Auditor's Red** (`auditors-red`): the brand ink. The 48px accent bar above headlines, section eyebrows, the subscribe button, link hover, text selection, the footer's top rule, and the stripe on dark panels. Deepens to **Auditor's Red Deep** (`auditors-red-deep`) on button hover.

### Neutral
- **Masthead Black** (`masthead-black`): the nav, footer, hero, and every dark panel (TakeawayCard, SignatureLine, EmployerScore header). Also headline text on white.
- **Ink Panel** (`ink-panel`): a near-black used sparingly for nested surfaces on black.
- **Newsprint White** (`newsprint-white`): the page and card ground.
- **Warm Cream** (`warm-cream`): the light TakeawayCard ground; the only warm neutral in the system. Defined in `tailwind.config.ts` as `cream`.
- **Panel Gray** (`panel-gray`): breadcrumb bar, notes rows, the left pane of a VersusBlock, the "key points" band.
- **Hairline** (`hairline`) and **Rule Gray** (`rule-gray`): card borders, dividers, table rules. Hairline inside cards, Rule Gray around containers.
- **Muted Ink** (`muted-ink`): metadata, figure labels, dates. **Caption Ink** (`caption-ink`): secondary UI text and inactive chips. **Body Ink** (`body-ink`): article prose.

### Data semantics
- **Gain Green** (`gain-green`): positive values, upward arrows, the Solid verdict.
- **Loss Red** (`loss-red`): negative values and downward arrows. Visibly brighter than Auditor's Red so the two never read as the same signal.
- **Verdict triplets** (background / border / text): Solid uses green, Watch uses amber, Caution uses red. Label chips in EmployerScore add an orange step (Stretched / Weak / Limited) between amber and red. Solid stripes and progress bars use the 500-weight of each hue.

### Named Rules
**The Masthead Ink Rule.** Auditor's Red is identity, never data. A loss figure in Auditor's Red is a bug; it must be Loss Red.

**The Two Reds Rule.** Brand red (#B22222, darker, brick) and loss red (#DC2626, brighter) must never sit adjacent as if interchangeable. If a reader could confuse "brand accent" with "this number is bad," change one of them.

**The Sign Rule.** Red and green describe a number, never a judgement about it. Red: a negative figure, or an unsigned rupee figure whose label's subject is a loss, deficit, burn or outflow. Green: an explicitly "+" figure, or an unsigned rupee figure whose label's subject is a profit. Everything else is black: revenue, costs, cash, borrowings, valuations, ratios, and sentences in table cells. A cost is not a loss; a narrowing loss is still red; a transition ("−₹44 → −₹20 Cr") takes the colour of where it ends. Components derive this in `lib/tone.ts` (KeyMetrics, ChartBlock, FinancialTable, VersusBlock, hero figures); articles never choose red or green, and losses are entered as negative numbers in chart data. Direction arrows stay neutral. Ratings and categories (EmployerScore chips, RealityScore, InsightBox types, timeline events) keep their own palettes because they are not numbers.

**The Contrast Floor Rule.** Every piece of text clears 4.5:1 (3:1 for 24px+ bold) on its actual ground; axe runs across every sitemap URL before a deploy. On paper, the lightest text is gray-500 (#6B7280); gray-300/400 are for rules and borders only. On black, the faintest text is white at 60%, except pure separators ("·"), which carry `aria-hidden` and may stay at 30%. On a tinted surface (red-50 band, score-tinted cards), secondary text takes the foreground at 60% (`text-black/60`) or the surface's own deep hue, never gray-500. Amber, yellow and orange text use their -700 shades.

**The Dark Ground Rule.** Auditor's Red, Loss Red and Profit Green are tuned for paper and fall under 4.5:1 on black. `app/globals.css` lifts them automatically inside any `.bg-black` / `.bg-gray-900` ground: brand red to #EB6B6B, loss red to #F87171, profit green to #4ADE80 (all at least 4.9:1 on #000 to #1D2432), and returns them to paper values inside a light panel or pale chip nested in that ground. Write the normal classes (`text-brand-red`, `text-red-600`, `text-green-700`); never hand-pick a dark variant per component.

**The Monochrome Ground Rule.** Pages are black and white first. Color appears as a mark (bar, eyebrow, chip, value), never as a large tinted surface, with two exceptions: the pale newsletter band and the cream takeaway panel.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** Inter (with system-ui, sans-serif)

**Character:** A high-contrast transitional serif with newspaper gravity, paired with a neutral grotesk that stays out of the way. The serif speaks; the sans explains.

### Hierarchy
- **Display** (700, 4.5rem / 3.75rem below xl, 1.08): the homepage hero only.
- **Headline** (700, 3rem, 1.1): article titles.
- **Pullout** (700, 2.25rem on desktop, 1.5rem on mobile, 1.1): TakeawayCard and SignatureLine statements, the screenshot lines.
- **Figure** (700, 1.75 to 2rem, line-height 1): hero numbers on articles and the leading figure on cards. Always serif, always black unless it carries a gain/loss tone.
- **Title** (700, 1.5rem, 1.2): section headings inside cards and related-articles blocks; prose h2/h3 inherit Playfair through the typography plugin.
- **Body** (400, 1.0625rem, 1.75): article prose in Body Ink, held to a 760px measure.
- **UI** (500 to 600, 0.875rem): nav items, buttons, inputs, share links.
- **Label** (700, 0.625rem, tracking 0.25em, uppercase): eyebrows, figure captions, metadata. Card captions drop to 9px with 0.1em tracking.

### Named Rules
**The Figures Are Headlines Rule.** Any number the article is about is set in the display serif at Figure size or larger. Numbers in Inter are supporting data only.

**The Whisper Label Rule.** Eyebrows and captions are tiny, uppercase, widely tracked, and grey or red. They never compete with the serif above or below them.

## Layout

Two containers. Reading surfaces use a single centered column (`article-measure`, 760px) with 24px side padding. Index, home, and browse surfaces use the page container (`page-max`, 1280px) with 16px gutters on mobile and 32px from `sm` up.

Index grids step 1 / 2 / 3 columns at `sm` and `lg` with 16px gaps. The homepage hero splits into two columns at `lg` with a 64px gap. Article hero numbers sit in a 2-column grid on mobile and one row on desktop, separated by vertical hairlines.

Vertical rhythm is generous: 56 to 80px between major sections, 40px margins around MDX block components (TakeawayCard, EmployerScore), 56px around SignatureLine. The nav is a 72px sticky black bar.

**The Single Column Rule.** Article bodies never go multi-column. Comparison components (VersusBlock, SplitView) may split into two panes inside the column, and collapse to stacked panes below `sm`.

## Elevation & Depth

Flat by default. Structure comes from hairline borders and from the black/white inversion, not from shadows. Shadows are reserved and small.

### Shadow Vocabulary
- **Resting card** (`shadow-sm`, `0 1px 2px rgba(0,0,0,0.05)`): EmployerScore container and the newsletter form, to lift a self-contained instrument off the page.
- **Hover lift** (`shadow-md`): a few browse cards on hover only.
- **Menu** (`shadow-2xl` plus a 1px black/10 ring): the nav dropdown, the one floating layer.

### Named Rules
**The Inversion Over Shadow Rule.** To make something stand out, turn it black. Don't raise it.

## Shapes

Gently rounded and rectilinear. Buttons and inputs use a tight 4px radius; cards use 8px; MDX instrument panels (EmployerScore, comparison blocks) 12px; the large dark pull-out panel 16px. Chips, verdict badges, and footer social buttons are full pills.

The light TakeawayCard is the one asymmetric shape: square on the left with a 6px Auditor's Red border, rounded on the right. The 48px by 4px red bar is the recurring geometric mark; a 3px red rule tops the footer.

## Components

### Buttons
Restrained and solid.
- **Shape:** gently squared (4px).
- **Primary:** Auditor's Red with white semibold Inter, 12px by 24px (40px min height in the nav). Hover deepens to Auditor's Red Deep with a color transition only.
- **Secondary:** white with a Rule Gray border and Caption Ink text; border darkens to grey-400 on hover. Used for "load more" style actions.
- **Text link:** Auditor's Red semibold with an arrow ("Read →"), underline on hover.

### Chips
- **Filter chips:** pill, white with Rule Gray border and Caption Ink text; the active chip inverts to black with white text.
- **Verdict chips:** pill with a 6px colored dot and an uppercase 10px label, using the verdict triplet for its state.
- **Label chips** (EmployerScore dimensions): pill, colored by what the label means for that dimension (green / amber / orange / red), never by the word alone: "High" is green for Career Upside but orange for Funding Dependence. One source: `lib/employerTone.ts`, shared by the article scorecard, Employer Check and Compare.

### Cards / Containers
- **Article card:** white, 8px radius, Hairline border that darkens on hover, 20px padding. Order: red company eyebrow, grey date, then a serif figure pair split by a vertical hairline (second figure toned gain/loss), serif title that turns red on hover, and a red "Read →" footer.
- **Dark hero card:** white at 5% on black, top border 4px Auditor's Red, brightening to 10% on hover.

### Inputs / Fields
- **Email input:** white, 1px grey-300 border, 4px radius on the outer edge only, joined flush to the primary button to form one control.
- **Focus:** border shifts to Auditor's Red; no glow.
- **Error:** a single line of Loss Red text below the control.

### Navigation
Black 72px sticky bar. Serif "UnpopularVoice" wordmark left, turns red on hover. Grouped items in 14px Inter at white/70, white on hover or open. Dropdowns are white panels (8px radius, menu shadow) whose items carry a semibold label and an 11px grey hint. The Subscribe button always shows. On mobile a hamburger opens a black sheet with uppercase grey group labels and 44px rows.

### TakeawayCard (signature)
The one line the section exists to prove. **Dark** variant: black, 16px radius, red bar top-left, red tracked eyebrow, white serif Pullout, white/70 body. **Light** variant: warm cream with the 6px red left border.

### SignatureLine (signature)
The article's screenshot line. Centered black panel (12px radius, 56px vertical padding), a 32px red bar, a "The core insight" label in white/40, and the line in white serif Pullout.

### VersusBlock (signature)
Evidence, side by side. Two panes inside a bordered 12px container: tinted left pane, white right pane, each with a tracked label, a direction glyph (▲ ▼ or a hyphen placeholder), and a serif value toned gain, loss, or neutral black.

### EmployerScore (signature)
A scorecard instrument. Black header with red eyebrow, serif company name, and a verdict pill; white rows of dimension and label chip; a grey notes band; two columns of signals (green ✓) and risks (red marks); a pale yellow disclaimer footer. Carries `id="employer-signal"`; the article byline links to it.

### InsightBox, KeyMetrics, ChartBlock
- **InsightBox:** a tinted panel with a 1px border in the same hue and a typed badge (Red Flag, Watch, Positive, Insight). The badge names the type; no side stripe.
- **KeyMetrics:** 2 columns on phones, 3 from md. The last tile stretches across whatever its row leaves empty, so odd counts never end on a lone tile.
- **ChartBlock:** bars scale by magnitude around a zero line (gains above, losses and outflows below). Values are exposed to screen readers as a list inside a `figure`.
- **Small text:** sentence text never goes below 12px (`text-xs`); 9-10px is for uppercase labels only.

## Do's and Don'ts

### Do:
- **Do** put the 48px by 4px Auditor's Red bar above every page-level headline and at the top-left of dark panels.
- **Do** set every headline figure in Playfair Display at Figure size or larger, with Gain Green or Loss Red only when the value carries a direction.
- **Do** use Masthead Black panels for the single line the reader should remember, at most one or two per article.
- **Do** keep article prose at 1.0625rem / 1.75 in Body Ink within the 760px column.
- **Do** use tiny uppercase tracked labels (10px, 0.25em) for eyebrows and captions.
- **Do** use the verdict triplets exactly (green / amber / red background, border, text) for Solid / Watch / Caution.

### Don't:
- **Don't** use Auditor's Red (#B22222) for a negative number; negatives are Loss Red (#DC2626).
- **Don't** use em dashes anywhere in UI copy, labels, or placeholders; use a comma, or a hyphen for empty-value placeholders.
- **Don't** add gradients, photography, illustration, or large tinted surfaces; contrast does the work.
- **Don't** lift elements with heavy shadows; invert them to black instead.
- **Don't** set article bodies in more than one column.
- **Don't** introduce a second accent hue for identity; Auditor's Red is the only brand color.
