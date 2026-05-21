import { tokens as t } from './tokens'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap');

  .groi *, .groi *::before, .groi *::after {
    box-sizing: border-box;
    font-family: ${t.font};
  }
  .groi {
    font-family: ${t.font};
    color: ${t.ink};
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* Layout */
  .groi .groi-wrap {
    padding: 0;
  }
  .groi .groi-inner {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .groi .groi-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 16px;
    align-items: start;
  }
  .groi .groi-sticky {
    position: sticky;
    top: 20px;
  }

  /* Card */
  .groi .card {
    background: #fff;
    border: 1px solid ${t.line};
    border-radius: 20px;
  }

  /* Typography */
  .groi .h3 {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.2;
    margin: 0;
  }
  .groi .muted { color: ${t.ink3}; }

  /* Step */
  .groi .roi-step { display: flex; flex-direction: column; gap: 10px; }
  .groi .step-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .groi .step-label {
    font-size: 12px;
    font-weight: 600;
    color: ${t.ink};
    letter-spacing: .02em;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .groi .step-n {
    width: 18px; height: 18px;
    border-radius: 5px;
    background: ${t.bgCoralSoft};
    border: 1px solid ${t.coralSoft};
    color: ${t.coralDeep};
    font-size: 10px; font-weight: 700;
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .groi .step-val {
    font-size: 14px;
    font-weight: 600;
    color: ${t.coralDeep};
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .groi .step-help { font-size: 11.5px; color: ${t.ink3}; line-height: 1.5; }

  /* Pills */
  .groi .roi-pills { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
  .groi .roi-pill {
    padding: 10px 8px;
    border: 1px solid ${t.line};
    background: #fff;
    border-radius: 10px;
    font-family: inherit;
    cursor: pointer;
    text-align: center;
    transition: background .15s, border-color .15s;
  }
  .groi .pill-label { font-size: 12.5px; font-weight: 600; color: ${t.ink}; letter-spacing: -.005em; }
  .groi .pill-sub { font-size: 10.5px; color: ${t.ink3}; margin-top: 2px; }
  .groi .roi-pill:hover { border-color: ${t.ink}; }
  .groi .roi-pill.on { background: ${t.ink}; border-color: ${t.ink}; }
  .groi .roi-pill.on .pill-label { color: #fff; }
  .groi .roi-pill.on .pill-sub { color: rgba(255,255,255,.65); }

  /* Slider */
  .groi .roi-slider {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 6px;
    border-radius: 999px;
    outline: none; cursor: pointer;
    margin: 9px 0;
  }
  .groi .roi-slider:focus-visible { box-shadow: 0 0 0 3px ${t.coralSoft}; }
  .groi .roi-slider::-webkit-slider-runnable-track { height: 6px; border-radius: 999px; background: transparent; }
  .groi .roi-slider::-moz-range-track { height: 6px; border-radius: 999px; background: ${t.line2}; }
  .groi .roi-slider::-moz-range-progress { height: 6px; border-radius: 999px; background: ${t.coral}; }
  .groi .roi-slider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 20px; height: 20px; border-radius: 50%;
    background: #fff; border: 2px solid ${t.coralDeep};
    box-shadow: 0 1px 3px rgba(0,0,0,.18);
    cursor: grab; margin-top: -7px;
  }
  .groi .roi-slider::-webkit-slider-thumb:active { cursor: grabbing; }
  .groi .roi-slider::-moz-range-thumb {
    width: 20px; height: 20px; border-radius: 50%;
    background: #fff; border: 2px solid ${t.coralDeep};
    box-shadow: 0 1px 3px rgba(0,0,0,.18); cursor: grab;
  }
  .groi .roi-marks {
    display: flex; justify-content: space-between;
    font-size: 10px; color: ${t.ink4}; padding: 0 2px;
  }

  /* Stepper */
  .groi .roi-stepper { display: flex; align-items: center; gap: 6px; }
  .groi .roi-stepper button {
    width: 36px; height: 38px;
    border: 1px solid ${t.line}; background: #fff;
    border-radius: 8px; font-size: 16px; cursor: pointer;
    color: ${t.ink}; font-family: inherit;
  }
  .groi .roi-stepper button:hover { background: ${t.bgCoralSoft}; border-color: ${t.coralSoft}; }
  .groi .roi-stepper input {
    flex: 1; height: 38px; padding: 0 10px;
    border: 1px solid ${t.line}; border-radius: 8px;
    font-family: inherit; font-size: 13px; text-align: center;
    background: #fff; font-variant-numeric: tabular-nums; color: ${t.ink};
  }
  .groi .roi-stepper input:focus {
    outline: 2px solid ${t.coralSoft};
    outline-offset: -1px; border-color: ${t.coral};
  }

  /* Result hero */
  .groi .roi-result-hero {
    background: linear-gradient(135deg, ${t.bgCoralSoft} 0%, ${t.coralSoft} 100%);
    border-radius: 14px; padding: 24px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .groi .roi-result-hero .label {
    font-size: 11px; font-weight: 700;
    color: ${t.coralDeep}; letter-spacing: .06em; text-transform: uppercase;
  }
  .groi .roi-result-hero .value {
    font-size: 56px; font-weight: 500;
    letter-spacing: -0.035em; line-height: 1;
    color: ${t.ink}; font-variant-numeric: tabular-nums; margin: 2px 0;
  }
  .groi .roi-result-hero .note { font-size: 13px; color: ${t.ink2}; }

  /* KPIs */
  .groi .roi-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .groi .roi-kpi {
    background: ${t.bgCoral}; border-radius: 12px;
    padding: 14px 16px; border: 1px solid ${t.line2};
  }
  .groi .roi-kpi .v {
    font-size: 24px; font-weight: 500;
    letter-spacing: -0.02em; font-variant-numeric: tabular-nums;
    color: ${t.ink}; line-height: 1.1;
  }
  .groi .roi-kpi .l {
    font-size: 11px; color: ${t.ink3}; margin-top: 4px;
    text-transform: uppercase; letter-spacing: .04em; font-weight: 600;
  }

  /* Chart */
  .groi .roi-legend { display: flex; gap: 20px; font-size: 12px; color: ${t.ink2}; flex-wrap: wrap; }
  .groi .roi-legend .sw {
    display: inline-block; width: 10px; height: 10px;
    border-radius: 3px; margin-right: 6px; vertical-align: middle;
  }

  /* Callout */
  .groi .roi-callout {
    background: ${t.bgCoralSoft}; border: 1px solid ${t.coralSoft};
    border-radius: 12px; padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    font-size: 13px; color: ${t.ink2}; line-height: 1.5;
  }
  .groi .roi-callout-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: ${t.coral}; color: ${t.ink};
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 14px; flex-shrink: 0;
  }
  .groi .roi-callout b { color: ${t.ink}; font-weight: 600; }

  /* Tools sub-grid */
  .groi .tools-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* Billing toggle */
  .groi .roi-billing-toggle { display: flex; gap: 6px; }
  .groi .roi-billing-btn {
    flex: 1; padding: 10px 12px;
    border: 1px solid ${t.line}; background: #fff;
    border-radius: 10px; font-family: inherit;
    font-size: 13px; font-weight: 500; color: ${t.ink2};
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .15s, border-color .15s;
  }
  .groi .roi-billing-btn:hover { border-color: ${t.ink}; color: ${t.ink}; }
  .groi .roi-billing-btn.on { background: ${t.ink}; border-color: ${t.ink}; color: #fff; }
  .groi .billing-badge {
    font-size: 10px; font-weight: 700; letter-spacing: .03em;
    background: ${t.coral}; color: ${t.ink}; border-radius: 5px; padding: 1px 5px;
  }
  .groi .roi-billing-btn.on .billing-badge { background: ${t.coralSoft}; }

  /* Plan line in ResultsCard */
  .groi .roi-plan-line {
    font-size: 11.5px; color: ${t.ink3}; text-align: center;
    padding-top: 6px; border-top: 1px solid ${t.line};
  }
  .groi .roi-plan-line strong { color: ${t.ink2}; }

  /* ── AI Agent specific ────────────────────────────────────────────────── */

  /* Automation rate hint bar */
  .groi .gaai-rate-hint { display: flex; align-items: center; gap: 6px; margin-top: -4px; }
  .groi .gaai-rate-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: ${t.coral}; flex-shrink: 0;
  }

  /* Pricing footnote at bottom of InputCard */
  .groi .gaai-pricing-note {
    background: ${t.bgCoralSoft}; border: 1px solid ${t.coralSoft};
    border-radius: 12px; padding: 12px 14px;
    font-size: 12px; color: ${t.ink2}; line-height: 1.5;
    display: flex; align-items: flex-start; gap: 10px;
  }
  .groi .gaai-ai-badge {
    font-size: 10px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
    background: ${t.ink}; color: #fff;
    border-radius: 5px; padding: 2px 6px; white-space: nowrap; flex-shrink: 0; margin-top: 1px;
  }

  /* KPI sub-label (e.g. "≈ 1.0 FTE", "vs $6.50 human") */
  .groi .gaai-kpi-sub {
    font-size: 10px; color: ${t.coralDeep}; font-weight: 600;
    margin-top: 1px; letter-spacing: .02em;
  }

  /* Per-ticket comparison bars */
  .groi .gaai-per-ticket {
    background: ${t.bgFog}; border-radius: 12px; padding: 16px 18px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .groi .gaai-per-ticket-title {
    font-size: 11px; font-weight: 700; letter-spacing: .04em;
    text-transform: uppercase; color: ${t.ink3};
  }
  .groi .gaai-per-ticket-bars { display: flex; flex-direction: column; gap: 8px; }
  .groi .gaai-ptbar { display: grid; grid-template-columns: 100px 1fr 52px; align-items: center; gap: 10px; }
  .groi .gaai-ptbar-label { font-size: 12px; color: ${t.ink2}; }
  .groi .gaai-ptbar-track {
    height: 10px; background: ${t.line2}; border-radius: 999px; overflow: hidden;
  }
  .groi .gaai-ptbar-fill { height: 100%; border-radius: 999px; transition: width .3s ease; }
  .groi .gaai-ptbar-val { font-size: 13px; font-weight: 600; color: ${t.ink}; text-align: right; font-variant-numeric: tabular-nums; }

  /* Responsive — tablet */
  @media (max-width: 720px) {
    .groi .groi-grid { grid-template-columns: 1fr; }
    .groi .groi-sticky { position: static; }
    .groi .roi-result-hero .value { font-size: 40px; }
    .groi .roi-pills { grid-template-columns: repeat(2, 1fr); }
    .groi .tools-grid { grid-template-columns: 1fr; }
  }

  /* Responsive — mobile */
  @media (max-width: 480px) {
    .groi .card { padding: 20px !important; }
    .groi .card { border-radius: 14px; }
    .groi .h3 { font-size: 18px; }
    .groi .roi-result-hero .value { font-size: 34px; }
    .groi .roi-result-hero { padding: 18px; }
    .groi .roi-kpis { grid-template-columns: 1fr 1fr; gap: 8px; }
    .groi .roi-kpi { padding: 12px 12px; }
    .groi .roi-kpi .v { font-size: 20px; }
    .groi .roi-billing-toggle { flex-direction: column; }
    .groi .roi-billing-btn { font-size: 12px; padding: 9px 10px; }
    .groi .gaai-ptbar { grid-template-columns: 80px 1fr 46px; gap: 8px; }
    .groi .gaai-ptbar-label { font-size: 11px; }
    .groi .gaai-ptbar-val { font-size: 12px; }
    .groi .roi-pills { grid-template-columns: repeat(2, 1fr); gap: 5px; }
    .groi .groi-inner { gap: 12px; }
  }
`

let injected = false

export function injectStyles() {
  if (injected || typeof document === 'undefined') return
  injected = true
  const el = document.createElement('style')
  el.id = 'groi-styles'
  el.textContent = css
  document.head.appendChild(el)
}
