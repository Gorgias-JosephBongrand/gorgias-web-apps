import { tokens as t } from '../tokens'
import { type RoiState } from '../hooks/useRoi'
import { fmt, Kpis } from './Primitives'

interface Props { st: RoiState }

function ScenarioToggle({ st }: Props) {
  const opts = [
    { id: 'helpdesk' as const, label: 'Helpdesk only',       dot: t.ink4,  caption: 'Baseline' },
    { id: 'ai'       as const, label: 'Helpdesk + AI Agent', dot: t.coral, caption: 'Cost + revenue' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: t.ink3, letterSpacing: '.08em', textTransform: 'uppercase' }}>
        Scenario
      </div>
      <div role="tablist" style={{ display: 'flex', flexDirection: 'column', background: '#FBFAF8', border: `1px solid ${t.line}`, borderRadius: 12, padding: 4, gap: 2 }}>
        {opts.map(o => {
          const active = st.scenario === o.id
          return (
            <button key={o.id} type="button" role="tab" aria-selected={active}
              onClick={() => st.setScenario(o.id)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderRadius: 8, background: active ? t.ink : 'transparent', color: active ? '#fff' : t.ink2, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: active ? 500 : 400, cursor: 'pointer', transition: 'background .15s, color .15s', textAlign: 'left' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: o.dot, display: 'inline-block', boxShadow: active ? '0 0 0 2px rgba(255,255,255,.18)' : 'none' }} />
                {o.label}
              </span>
              <span style={{ fontSize: 10.5, fontWeight: 500, color: active ? 'rgba(255,255,255,.55)' : t.ink4, letterSpacing: '.02em', textTransform: 'uppercase' }}>{o.caption}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MissingOut({ st }: Props) {
  if (st.revenueActive) return null
  const Card = ({ accent, eyebrow, eyebrowColor, body, cta, onCta }: { accent: string; eyebrow: string; eyebrowColor: string; body: React.ReactNode; cta: string; onCta: () => void }) => (
    <div style={{ background: '#FBFAF8', border: `1px solid ${t.line}`, borderRadius: 12, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: eyebrowColor, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block' }} />
          {eyebrow}
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: t.ink2 }}>{body}</div>
      </div>
      <button type="button" onClick={onCta} style={{ background: 'transparent', color: t.ink, border: `1px solid ${t.ink}`, padding: '8px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {cta} <span style={{ fontSize: 14 }}>→</span>
      </button>
    </div>
  )
  if (!st.aiOn) {
    return (
      <Card accent={t.coral} eyebrow="What you're missing" eyebrowColor={t.coralDeep}
        body={<span>Adding AI Agent saves another <strong style={{ color: t.ink }}>{fmt.money(st.aiUplift)}/yr</strong>. It automates <strong style={{ color: t.ink }}>{fmt.num(st.autoResolved)} interactions/mo</strong> at your volume.</span>}
        cta="Turn on AI Agent" onCta={() => st.setScenario('ai')} />
    )
  }
  return (
    <Card accent={t.green} eyebrow="Included with AI Agent · Shopping Assistant" eyebrowColor={t.green}
      body={<span>Shopping Assistant is built into AI Agent at no extra cost. On your traffic it projects <strong style={{ color: t.ink }}>+{fmt.money(st.saRevenueAnnual)}/yr</strong> in added revenue.</span>}
      cta="Model the revenue side" onCta={() => st.setRevenue(true)} />
  )
}

export function ResultsCard({ st }: Props) {
  const isRevenue = st.saOn
  const accent = isRevenue ? t.green : t.coralDeep

  const Hero = ({ eyebrow, value, valueNote, secondary }: { eyebrow: string; value: string; valueNote: string; secondary?: React.ReactNode }) => (
    <div style={{ background: '#FBFAF8', border: `1px solid ${t.line}`, borderRadius: 14, padding: '26px 26px 22px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: t.ink3, letterSpacing: '.08em', textTransform: 'uppercase' as const, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
        {eyebrow}
      </div>
      <div style={{ fontSize: 54, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.02, color: t.ink, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>{value}</div>
      <div style={{ fontSize: 13, color: t.ink2, marginTop: 4 }}>{valueNote}</div>
      {secondary && (
        <div style={{ marginTop: 10, paddingTop: 12, borderTop: `1px solid ${t.line2}`, fontSize: 12, color: t.ink3, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {secondary}
        </div>
      )}
    </div>
  )

  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <ScenarioToggle st={st} />

      {st.aiOn && (
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 14px', borderRadius: 10, border: `1px solid ${st.revenueOn ? t.green : t.line}`, background: st.revenueOn ? 'rgba(31,122,94,.05)' : '#FBFAF8', cursor: 'pointer', transition: 'border-color .15s, background .15s' }}>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: 500, color: t.ink }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.green, display: 'inline-block' }} />
              Add Shopping Assistant revenue
            </span>
            <span style={{ fontSize: 11, color: t.ink3, paddingLeft: 16 }}>Included in AI Agent — no extra cost</span>
          </span>
          <span style={{ position: 'relative', width: 34, height: 20, borderRadius: 999, flexShrink: 0, background: st.revenueOn ? t.green : t.line, transition: 'background .15s' }}>
            <span style={{ position: 'absolute', top: 2, left: st.revenueOn ? 16 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
          </span>
          <input type="checkbox" checked={st.revenueOn} onChange={e => st.setRevenue(e.target.checked)}
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
        </label>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <h3 className="h3">{isRevenue ? 'Total annual value' : 'Annual savings'}</h3>
          <span className="muted" style={{ fontSize: 11.5 }}>
            {isRevenue ? 'cost saved + Shopping Assistant revenue' : 'vs current stack'}
          </span>
        </div>

        {isRevenue ? (
          <Hero
            eyebrow="Total annual value"
            value={fmt.money(st.totalWithRevenue)}
            valueNote={`${st.plan.name} plan + AI Agent · Shopping Assistant included`}
            secondary={
              <>
                <span><span style={{ color: t.coralDeep, fontWeight: 600 }}>{fmt.money(st.hdAiSaved)}</span> support cost saved</span>
                <span style={{ color: t.ink4 }}>·</span>
                <span><span style={{ color: t.green, fontWeight: 600 }}>+{fmt.money(st.saRevenueAnnual)}</span> Shopping Assistant revenue</span>
              </>
            }
          />
        ) : (
          <Hero
            eyebrow={st.aiOn ? 'You could save' : 'Helpdesk-only savings'}
            value={fmt.money(st.savedNow)}
            valueNote={st.aiOn ? `per year on the ${st.plan.name} plan + AI Agent` : `per year on the ${st.plan.name} plan`}
          />
        )}

        {isRevenue ? (
          <Kpis items={[
            { value: fmt.money(st.saRevenueMonthly),          label: 'Added revenue / mo' },
            { value: fmt.num(st.saAttributedOrdersMo),         label: 'Incremental orders / mo' },
            { value: fmt.money(st.hdAiSaved),                  label: 'Support cost saved / yr' },
            { value: st.returnMult + '×',                      label: 'Return on Gorgias spend' },
          ]} />
        ) : (
          <Kpis items={[
            { value: fmt.money(st.savedNow / 12),              label: 'Monthly savings' },
            { value: st.aiOn ? fmt.num(st.autoResolved) : fmt.money(st.gorgiasSpendNow), label: st.aiOn ? 'Automated interactions / mo' : 'Gorgias plan / yr' },
            { value: st.pct + '%',                             label: 'Lower than today' },
            { value: st.returnMult + '×',                      label: 'Return on Gorgias spend' },
          ]} />
        )}
      </div>

      <MissingOut st={st} />
    </div>
  )
}
