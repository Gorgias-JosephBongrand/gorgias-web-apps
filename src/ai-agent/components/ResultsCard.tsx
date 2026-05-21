import { type AiAgentRoiState } from '../hooks/useAiAgentRoi'
import { fmt } from '../../components/Primitives'

interface Props { st: AiAgentRoiState }

export function ResultsCard({ st }: Props) {
  const kpis = [
    {
      value: fmt.num(Math.round(st.ticketsAutoPerMonth)),
      label: 'Tickets auto-resolved / mo',
    },
    {
      value: fmt.num(Math.round(st.agentHoursFreedYearly)) + ' hrs',
      label: `Agent hours freed / yr`,
      sub: `≈ ${st.agentFteEquivalent} FTE`,
    },
    {
      value: `${st.roiMult}×`,
      label: 'Return on AI spend',
    },
    {
      value: `$${st.costPerInteraction.toFixed(2)}`,
      label: 'Cost per AI interaction',
      sub: `vs $${fmt.money2(st.agentCostPerTicket)} human`,
    },
  ]

  return (
    <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <h3 className="h3">Annual savings</h3>
        <span className="muted" style={{ fontSize: 12 }}>vs agents handling alone</span>
      </div>

      <div className="roi-result-hero">
        <div className="label">Net saving with AI Agent</div>
        <div className="value">{fmt.money(st.netSavings)}</div>
        <div className="note">per year — after AI interaction fees</div>
      </div>

      <div className="roi-kpis">
        {kpis.map((k, i) => (
          <div key={i} className="roi-kpi">
            <div className="v">{k.value}</div>
            {k.sub && <div className="gaai-kpi-sub">{k.sub}</div>}
            <div className="l">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="roi-plan-line">
        AI Agent fees: <strong>{fmt.money(st.aiFeesYearly)}/yr</strong>
        {' '}· {fmt.money(st.humanCostForAutoYearly)}/yr without AI
        {' '}· saves <strong>{st.pctCostReduction}%</strong>
      </div>
    </div>
  )
}
