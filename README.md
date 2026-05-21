# Gorgias Website Apps

Self-contained React widgets built as IIFE bundles, embedded into Webflow pages via a single `<script>` tag.

## Calculators

| Calculator | Embed target | Live URL |
|---|---|---|
| Helpdesk ROI | `data-el="helpdesk-roi"` | TBD |
| AI Agent ROI | `data-el="ai-agent-roi"` | TBD |

## How it works

Each calculator mounts into a `<div>` on the host page:

```html
<div data-el="helpdesk-roi"></div>
<script src="https://your-deploy.vercel.app/embed.js" defer></script>
```

`embed.js` is a self-contained IIFE — React, Recharts, and all styles are bundled in. No external dependencies required on the host page.

## Development

```bash
npm install
npm run dev       # dev server at http://localhost:5173
```

Both calculators render on the dev page (`index.html`) for side-by-side review.

## Build

```bash
npm run build     # outputs dist/embed.js
```

`dist/embed.js` is the artifact to deploy. Upload it to Vercel (or any static host) and reference it in Webflow.

## Deploy (Vercel)

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Framework | Other |

## Pricing model

Calculators use verified Gorgias pricing (USD-5 / USD-6 price books, last verified 2026-01-28).

**Helpdesk** — tiered monthly subscription based on ticket volume. Annual billing gives a 16.7% discount (2 months free).

**AI Agent** — subscription tier based on automated interactions/month.
- Annual contract: **$0.90/interaction**
- Monthly contract: **$1.00/interaction**
- Overage (above tier cap): $1.50/interaction
- Only charged when AI closes a ticket autonomously — handovers to agents are free.

## Project structure

```
src/
  embed.ts                  # entry point — mounts both calculators
  App.tsx                   # Helpdesk ROI app
  ai-agent/
    App.tsx                 # AI Agent ROI app
    hooks/useAiAgentRoi.ts
    components/
  components/               # shared primitives (Slider, Pills, Stepper…)
  hooks/useHelpdeskRoi.ts
  styles.ts                 # CSS injected at runtime, scoped to .groi
  tokens.ts                 # Gorgias V2 design tokens
```
