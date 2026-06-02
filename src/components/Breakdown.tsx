import { tokens as t } from '../tokens'
import { type RoiState } from '../hooks/useRoi'
import { fmt } from './Primitives'

interface Props { st: RoiState }

function BillingToggle({ st }: Props) {
  const savingsLabel = st.planSavingsVsMonthly > 0 ? `−$${fmt.num(st.planSavingsVsMonthly)}/yr` : 'Save'
  const btn = (val: 'annual' | 'monthly', label: string, sub?: string) => (
    <button type="button" onClick={() => st.setBilling(val)} style={{ flex: 1, padding: '9px 14px', borderRadius: 999, border: 'none', background: st.billing === val ? t.ink : 'transparent', color: st.billing === val ? '#fff' : t.ink3, fontFamily: 'inherit', fontSize: 12.5, fontWeight: st.billing === val ? 500 : 400, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background .15s, color .15s', whiteSpace: 'nowrap' as const }}>
      <span>{label}</span>
      {sub && <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 999, background: st.billing === val ? t.coral : t.bgCoralSoft, color: st.billing === val ? t.ink : t.coralDeep, letterSpacing: '.02em' }}>{sub}</span>}
    </button>
  )
  return (
    <div style={{ display: 'inline-flex', padding: 3, background: '#fff', border: `1px solid ${t.line}`, borderRadius: 999 }}>
      {btn('monthly', 'Monthly')}
      {btn('annual', 'Annual', savingsLabel)}
    </div>
  )
}

export function Breakdown({ st }: Props) {
  const row = (label: React.ReactNode, value: string, opts: { dot?: string; muted?: boolean; accent?: string; big?: boolean; last?: boolean; style?: React.CSSProperties } = {}) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: opts.last ? 'none' : `1px solid ${t.line2}`, ...(opts.style || {}) }}>
      <span style={{ fontSize: 12.5, color: opts.muted ? t.ink3 : t.ink2, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {opts.dot && <span style={{ width: 8, height: 8, borderRadius: 2, background: opts.dot, display: 'inline-block', flexShrink: 0 }} />}
        {label}
      </span>
      <span style={{ fontSize: opts.big ? 16 : 13, fontWeight: opts.big ? 600 : 500, color: opts.accent ?? t.ink, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  )

  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h3 className="h3">Where the money goes</h3>
          <span className="muted" style={{ fontSize: 13 }}>Annual cost stack, line by line, today vs with Gorgias.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: t.ink3, letterSpacing: '.06em', textTransform: 'uppercase' as const, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.coral }} />
            Recommended · {st.plan.name}{st.plan.custom ? ' (custom)' : ''} · ${fmt.num(st.planMonthly)}/mo
          </span>
          <BillingToggle st={st} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div style={{ background: '#FBFAF8', borderRadius: 14, padding: '20px 22px', border: `1px solid ${t.line}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: t.ink3, marginBottom: 10, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.ink4 }} />Today
          </div>
          {row(`Agent labor (${st.agents} × $${fmt.num(st.salary)})`, fmt.money(st.laborCurrent), { dot: '#CBC6C2' })}
          {row(`Tool stack ($${fmt.num(st.toolspend)}/mo)`, fmt.money(st.toolsCurrent), { dot: '#9FA5AE' })}
          {row('Total', fmt.money(st.baseYearly), { big: true, last: true, style: { paddingTop: 12 } })}
          <div style={{ fontSize: 11.5, color: t.ink3, marginTop: 10 }}>
            = <strong style={{ color: t.ink2, fontWeight: 500 }}>{fmt.money2(st.costPerTicketToday)}</strong> per ticket
          </div>
        </div>

        <div style={{ background: '#FBFAF8', borderRadius: 14, padding: '20px 22px', border: `1px solid ${t.line}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: t.ink3, marginBottom: 10, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.aiOn ? t.coral : t.ink4 }} />
            With Gorgias {st.aiOn ? '+ AI Agent' : '(Helpdesk only)'}
          </div>
          {row(
            `Agent labor (${Math.round(st.LABOR_LIFT * 100)}% productivity lift${st.aiOn ? `, ${Math.round((1 - st.humanHandled / st.tickets) * 100)}% deflected` : ''})`,
            fmt.money(st.laborNow), { dot: '#CBC6C2' }
          )}
          {row(
            <span>Gorgias <strong style={{ color: t.ink, fontWeight: 500 }}>{st.plan.name}</strong> plan · {st.billing === 'annual' ? 'billed yearly' : 'billed monthly'}</span>,
            fmt.money(st.planAnnual), { dot: t.ink }
          )}
          {st.aiOn && row(
            `AI Agent (${fmt.num(st.autoResolved)} automated interactions/mo × $${st.airate.toFixed(2)})`,
            fmt.money(st.aiSpend), { dot: t.coral }
          )}
          {row('Tools replaced by Gorgias', 'Removed', { muted: true, accent: t.green })}
          {st.saOn && (
            <div style={{ marginTop: 10, padding: '10px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 12.5, color: t.ink2, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.green }} />
                  Revenue from Shopping Assistant
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: t.green, fontVariantNumeric: 'tabular-nums' }}>
                  +{fmt.money(st.saRevenueAnnual)}
                </span>
              </div>
              <span style={{ fontSize: 11, color: t.ink3 }}>
                {fmt.num(st.saAttributedOrdersMo)} incremental orders/mo × ${st.aov} AOV × 12 · attribution {st.attrib}% · included in AI Agent, no extra cost
              </span>
            </div>
          )}
          {row(
            st.saOn ? 'Net annual value' : 'Total',
            st.saOn ? fmt.money(st.totalWithRevenue) : fmt.money(st.yearlyNow),
            { big: true, last: true, style: { paddingTop: 12 } }
          )}
          <div style={{ fontSize: 11.5, color: t.ink3, marginTop: 10, lineHeight: 1.4 }}>
            {st.saOn
              ? <span><span style={{ color: t.coralDeep, fontWeight: 500 }}>{fmt.money(st.hdAiSaved)}</span> support cost saved <span style={{ color: t.ink4 }}>·</span> <span style={{ color: t.green, fontWeight: 500 }}>+{fmt.money(st.saRevenueAnnual)}</span> Shopping Assistant revenue</span>
              : <span>{fmt.money(st.savedNow)} less than today ({st.pct}% reduction)</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
