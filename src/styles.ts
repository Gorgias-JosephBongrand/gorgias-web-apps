import { tokens as t } from './tokens'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap');

  .v2 { font-family: ${t.font}; color: ${t.ink}; font-size: 16px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
  .v2 *, .v2 *::before, .v2 *::after { box-sizing: border-box; font-family: inherit; }

  .v2 .h3 { font-size: 22px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.2; margin: 0; }
  .v2 .muted { color: ${t.ink3}; }
  .v2 .card { background: #fff; border: 1px solid ${t.line}; border-radius: 20px; }

  /* Step */
  .v2 .roi-step { display: flex; flex-direction: column; gap: 10px; }
  .v2 .step-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .v2 .step-label { font-size: 12px; font-weight: 600; color: ${t.ink}; letter-spacing: .02em; display: inline-flex; align-items: center; gap: 8px; }
  .v2 .step-n { width: 18px; height: 18px; border-radius: 5px; background: #fff; border: 1px solid ${t.line}; color: ${t.ink3}; font-size: 10px; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .v2 .step-val { font-size: 14px; font-weight: 500; color: ${t.ink}; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .v2 .step-help { font-size: 11.5px; color: ${t.ink3}; line-height: 1.5; }

  /* Pills */
  .v2 .roi-pills { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
  .v2 .roi-pill { padding: 10px 8px; border: 1px solid ${t.line}; background: #fff; border-radius: 10px; font-family: inherit; cursor: pointer; text-align: center; transition: background .15s, border-color .15s; }
  .v2 .pill-label { font-size: 12.5px; font-weight: 600; color: ${t.ink}; letter-spacing: -.005em; }
  .v2 .pill-sub { font-size: 10.5px; color: ${t.ink3}; margin-top: 2px; }
  .v2 .roi-pill:hover { border-color: ${t.ink}; }
  .v2 .roi-pill.on { background: ${t.ink}; border-color: ${t.ink}; }
  .v2 .roi-pill.on .pill-label { color: #fff; }
  .v2 .roi-pill.on .pill-sub { color: rgba(255,255,255,.65); }

  /* Slider */
  .v2 .roi-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 999px; outline: none; cursor: pointer; margin: 9px 0; }
  .v2 .roi-slider:focus-visible { box-shadow: 0 0 0 3px ${t.coralSoft}; }
  .v2 .roi-slider::-webkit-slider-runnable-track { height: 6px; border-radius: 999px; background: transparent; }
  .v2 .roi-slider::-moz-range-track { height: 6px; border-radius: 999px; background: ${t.line2}; }
  .v2 .roi-slider::-moz-range-progress { height: 6px; border-radius: 999px; background: ${t.coral}; }
  .v2 .roi-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 2px solid ${t.coralDeep}; box-shadow: 0 1px 3px rgba(0,0,0,.18); cursor: grab; margin-top: -7px; }
  .v2 .roi-slider::-webkit-slider-thumb:active { cursor: grabbing; }
  .v2 .roi-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 2px solid ${t.coralDeep}; box-shadow: 0 1px 3px rgba(0,0,0,.18); cursor: grab; }
  .v2 .roi-marks { display: flex; justify-content: space-between; font-size: 10px; color: ${t.ink4}; padding: 0 2px; }

  /* Stepper */
  .v2 .roi-stepper { display: flex; align-items: center; gap: 6px; }
  .v2 .roi-stepper button { width: 36px; height: 38px; border: 1px solid ${t.line}; background: #fff; border-radius: 8px; font-size: 16px; cursor: pointer; color: ${t.ink}; font-family: inherit; }
  .v2 .roi-stepper button:hover { background: ${t.bgCoralSoft}; border-color: ${t.coralSoft}; }
  .v2 .roi-stepper input { flex: 1; height: 38px; padding: 0 10px; border: 1px solid ${t.line}; border-radius: 8px; font-family: inherit; font-size: 13px; text-align: center; background: #fff; font-variant-numeric: tabular-nums; color: ${t.ink}; }
  .v2 .roi-stepper input:focus { outline: 2px solid ${t.coralSoft}; outline-offset: -1px; border-color: ${t.coral}; }

  /* KPIs — premium grid treatment */
  .v2 .roi-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: ${t.line2}; border: 1px solid ${t.line2}; border-radius: 14px; overflow: hidden; }
  .v2 .roi-kpi { background: #fff; border: none; border-radius: 0; padding: 16px 18px; }
  .v2 .roi-kpi .v { font-size: 22px; font-weight: 500; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; color: ${t.ink}; line-height: 1.1; }
  .v2 .roi-kpi .l { font-size: 10px; color: ${t.ink3}; margin-top: 3px; text-transform: uppercase; letter-spacing: .04em; font-weight: 600; }

  /* Chart */
  .v2 .roi-legend { display: flex; gap: 20px; font-size: 12px; color: ${t.ink2}; flex-wrap: wrap; }
  .v2 .roi-legend .sw { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 6px; vertical-align: middle; }

  /* Callout — premium treatment */
  .v2 .roi-callout { background: ${t.bgNeutral}; border: 1px solid ${t.line}; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; font-size: 13px; color: ${t.ink2}; line-height: 1.5; }
  .v2 .roi-callout-icon { width: 30px; height: 30px; border-radius: 8px; background: #fff; color: ${t.coralDeep}; border: 1px solid ${t.line}; display: inline-flex; align-items: center; justify-content: center; font-weight: 500; font-size: 14px; flex-shrink: 0; }
  .v2 .roi-callout b { color: ${t.ink}; font-weight: 600; }

  /* Layout */
  .v2-roi-wrap { width: 100%; display: flex; flex-direction: column; gap: 16px; }
  .v2-roi-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 16px; align-items: start; }
  .v2-roi-sticky { position: sticky; top: 20px; }

  /* Responsive */
  @media (max-width: 840px) {
    .v2-roi-grid { grid-template-columns: 1fr; }
    .v2-roi-sticky { position: static; }
    .v2-roi-wrap { padding: 24px 20px 48px; }
    .v2 .roi-pills { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .v2-roi-wrap { padding: 16px 14px 40px; }
    .v2 .roi-kpi .v { font-size: 18px; }
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
