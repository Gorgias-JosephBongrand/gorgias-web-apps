import { type HelpdeskRoiState } from '../hooks/useHelpdeskRoi'
import { fmt } from './Primitives'

interface Props {
  st: HelpdeskRoiState
}

export function ResultsCard({ st }: Props) {
  const kpis = [
    { value: fmt.money(st.saved / 12),          label: 'Monthly savings' },
    { value: fmt.money2(st.gorgiasCostPerTicket), label: 'Cost per ticket' },
    { value: `${st.pct}%`,                        label: 'Lower than today' },
    { value: `${st.returnMult}×`,                 label: 'Return on plan cost' },
  ]

  return (
    <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <h3 className="h3">Annual savings</h3>
        <span className="muted" style={{ fontSize: 12 }}>vs current stack</span>
      </div>

      <div className="roi-result-hero">
        <div className="label">You could save</div>
        <div className="value">{fmt.money(st.saved)}</div>
        <div className="note">per year on support operations</div>
      </div>

      <div className="roi-kpis">
        {kpis.map((k, i) => (
          <div key={i} className="roi-kpi">
            <div className="v">{k.value}</div>
            <div className="l">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="roi-plan-line">
        Gorgias <strong>{st.planName}</strong> · {fmt.money(st.planArr / 12)}/mo
        {st.billing === 'yearly' ? ' billed annually' : ' billed monthly'}
      </div>
    </div>
  )
}
