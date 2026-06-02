import { useState } from 'react'
import { tokens as t } from '../tokens'
import { type RoiState } from '../hooks/useRoi'

interface Props { st: RoiState }

const SOURCES = [
  { label: 'Fully-loaded agent cost', figure: '$30K–$120K/yr range · $52K default', source: 'U.S. Bureau of Labor Statistics, Customer Service Representatives (43-4051), median wages + ~30% benefits load', note: 'Adjustable per user input. Default reflects North-American ecommerce support roles.' },
  { label: 'Helpdesk productivity lift', figure: '25% labor capacity reclaimed', source: 'Gorgias internal benchmark. Ticket-handle-time delta measured across 2,000+ Shopify brands (12-month cohort)', note: 'Time savings from unified inbox + macros + integrations. Modeled as labor cost × 0.75.' },
  { label: 'Automation rate', figure: '30–60% typical range · 45% default', source: 'Gorgias AI Agent deployment data, median across active customers (2025)', note: 'Brand averages range from 15% (custom-heavy categories) to 70% (high-volume DTC). Adjust the slider.' },
  { label: 'Price per automated interaction', figure: '$0.75–$0.90 per automated interaction', source: 'Gorgias 2026 list price, tier-based volume discount', note: 'Basic/Pro $0.90 · Advanced $0.85 · Enterprise $0.75. Set automatically by your recommended plan tier.' },
  { label: 'Gorgias plan prices', figure: '$50–$1,500/mo · ticket-volume-based', source: 'gorgias.com/pricing (list price, 2026)', note: 'Annual billing applies a discount vs monthly. Enterprise is illustrative; actual quote depends on volume and features.' },
  { label: 'Shopping Assistant CVR uplift', figure: '82% avg · 89% median (Beauty)', source: 'Gorgias internal ROI Estimator benchmark, Oct 2025 cut across Shopping Assistant-enabled merchants', note: 'Cohort comparison of SA-engaged vs non-engaged sessions. Verticals vary.' },
  { label: 'Shopping Assistant availability', figure: 'Included in AI Agent (USD-6) · no separate cost', source: 'Gorgias AI Agent USD-6 packaging — the Shopping Assistant skill is enabled by default on AI Agent', note: 'Shopping Assistant conversations are billed as ordinary AI Agent interactions; there is no separate line item.' },
  { label: 'GMV-influenced attribution window', figure: '3 days post-conversation', source: 'Gorgias attribution model (2025-08-11 update)', note: 'The "Attribution confidence" slider further discounts this to model truly incremental orders.' },
]

export function Methodology({ st: _ }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: open ? 18 : 0 }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', color: t.ink }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h3 className="h3">Methodology &amp; sources</h3>
          <span className="muted" style={{ fontSize: 13 }}>Every assumption, every formula. Auditable.</span>
        </div>
        <span style={{ width: 32, height: 32, borderRadius: 999, border: `1px solid ${t.line}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: t.ink2, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <>
          <div style={{ background: '#FAFAFA', borderRadius: 14, padding: '18px 22px', border: `1px solid ${t.line2}`, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace', fontSize: 12.5, color: t.ink2, lineHeight: 1.6 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: t.ink3, letterSpacing: '.08em', textTransform: 'uppercase' as const, fontFamily: t.font, marginBottom: 4 }}>Cost-side formulas</div>
            <div><span style={{ color: t.ink3 }}>current_stack    =</span> agents × salary + tooling_spend × 12</div>
            <div><span style={{ color: t.ink3 }}>with_helpdesk    =</span> agents × salary × <strong style={{ color: t.coralDeep }}>0.75</strong> + plan_annual</div>
            <div><span style={{ color: t.ink3 }}>auto_resolved    =</span> tickets × ai_rate%</div>
            <div><span style={{ color: t.ink3 }}>with_helpdesk_ai =</span> agents × salary × 0.75 × human_share + plan_annual + auto_resolved × ai_$/interaction × 12</div>
            <div style={{ paddingTop: 4 }}><span style={{ color: t.ink3 }}>cost_savings     =</span> current_stack − chosen_scenario</div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: t.green, letterSpacing: '.08em', textTransform: 'uppercase' as const, fontFamily: t.font, marginTop: 12, marginBottom: 4 }}>Revenue-side formulas (Shopping Assistant — included in AI Agent)</div>
            <div><span style={{ color: t.ink3 }}>sa_conversations =</span> traffic × presales% × chat_contact%</div>
            <div><span style={{ color: t.ink3 }}>incremental_orders=</span> sa_conversations × baseline_cvr% × uplift% × attribution%</div>
            <div><span style={{ color: t.ink3 }}>total_value      =</span> cost_savings + sa_revenue</div>
          </div>

          <div style={{ background: '#FBFAF8', border: `1px solid ${t.line}`, borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, fontSize: 12, color: t.ink2, lineHeight: 1.55 }}>
            <div style={{ fontSize: 14, lineHeight: 1, color: '#E0A93B', fontWeight: 700, flexShrink: 0 }}>!</div>
            <div>
              <strong style={{ color: t.ink, fontWeight: 600 }}>Shopping Assistant uplift benchmarks are directional, not yet causally proven.</strong>
              {' '}The 45–82% lift figures come from cohort comparisons and have not been validated by a randomized holdout. Use 40% (Conservative) for CFO-grade modeling.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: t.ink3, letterSpacing: '.08em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Sources</div>
            {SOURCES.map((src, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, padding: '12px 0', borderBottom: i < SOURCES.length - 1 ? `1px solid ${t.line2}` : 'none', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: t.ink }}>{src.label}</span>
                  <span style={{ fontSize: 11.5, color: t.coralDeep, fontWeight: 500 }}>{src.figure}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 12, color: t.ink2, lineHeight: 1.5 }}>{src.source}</span>
                  <span style={{ fontSize: 11.5, color: t.ink3, lineHeight: 1.5 }}>{src.note}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
