# Gorgias Website Apps

Self-contained React widget built as an IIFE bundle, embedded into Webflow pages via a single `<script>` tag.

## ROI Calculator

Mounts the consolidated Gorgias ROI calculator (Helpdesk + AI Agent + Shopping Assistant revenue) into any page that includes the embed target div.

```html
<div data-el="helpdesk-roi"></div>
<script src="https://gorgias-web-apps.vercel.app/embed.js" defer></script>
```

`embed.js` is self-contained — React, Recharts, and all styles are bundled in. No external dependencies required on the host page.

## Development

```bash
npm install
npm run dev       # dev server at http://localhost:5173
```

## Build

```bash
npm run build     # outputs dist/embed.js
```

## Deploy (Vercel)

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Framework | Other |

Merging to `main` triggers a Vercel deploy automatically.

## Pricing model

Verified Gorgias pricing (USD-5 / USD-6 price books, last verified 2026-01-28).

**Helpdesk** — tiered monthly subscription based on ticket volume. Annual billing: ~17% off monthly rate.

**AI Agent** — subscription tier based on automated interactions/month.
- Annual: **$0.90/interaction** (Pro/Basic) · **$0.85** (Advanced) · **$0.75** (Enterprise)
- Monthly: **$1.00/interaction**
- Only charged when AI closes a ticket autonomously.

**Shopping Assistant** — included in AI Agent at no extra cost. Revenue modeled via uplift on pre-sales chat sessions.

## Project structure

```
src/
  embed.ts                   # entry point — mounts to data-el="helpdesk-roi"
  App.tsx                    # CombinedRoiFocusedPage layout
  hooks/useRoi.ts            # useCombinedRoi — all state + math
  components/
    InputCard.tsx            # inputs (tickets, agents, AI Agent, Shopping Assistant)
    ResultsCard.tsx          # scenario toggle + hero value + KPIs
    Breakdown.tsx            # "Where the money goes" cost stack
    ChartCard.tsx            # 3-scenario stacked bar chart
    Methodology.tsx          # collapsible methodology & sources
    Primitives.tsx           # Step, Pills, Slider, Stepper, Kpis, Callout
  styles.ts                  # CSS injected at runtime, scoped to .v2
  tokens.ts                  # Gorgias design tokens

views/
  v2-roi-focused.html        # standalone preview (same design, CDN React)
```
