import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Label, Cell,
} from 'recharts'
import { tokens as t } from '../../tokens'
import { type AiAgentRoiState } from '../hooks/useAiAgentRoi'
import { fmt } from '../../components/Primitives'

interface Props { st: AiAgentRoiState }

const GREY = '#CBC6C2'

// Custom tooltip
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff', border: `1px solid ${t.line}`, borderRadius: 10,
      padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,.08)',
    }}>
      <div style={{ fontWeight: 600, color: t.ink, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: t.ink2, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.fill, display: 'inline-block' }} />
          {p.name}: <strong style={{ color: t.ink }}>{fmt.money(p.value)}</strong>
        </div>
      ))}
    </div>
  )
}

export function ChartCard({ st }: Props) {
  const humanCostPerTicket = st.agentCostPerTicket
  const aiCostPerTicket    = st.costPerInteraction

  // Annual total comparison
  const annualData = [
    { name: 'Without AI Agent', cost: st.humanCostForAutoYearly },
    { name: 'With AI Agent',    cost: st.aiFeesYearly },
  ]

  return (
    <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h3 className="h3">Cost to handle AI-automatable tickets</h3>
        <p className="muted" style={{ fontSize: 13, margin: '4px 0 0' }}>
          {fmt.num(Math.round(st.ticketsAutoYearly))} tickets/yr resolved autonomously
        </p>
      </div>

      {/* Annual cost comparison */}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={annualData} margin={{ top: 16, right: 24, bottom: 4, left: 8 }}
          barCategoryGap="45%">
          <CartesianGrid vertical={false} stroke={t.line} strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: t.ink3 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}K`}
            tick={{ fontSize: 11, fill: t.ink4 }} axisLine={false} tickLine={false} width={44} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
          <ReferenceLine y={st.aiFeesYearly} stroke={t.coral} strokeDasharray="4 3" strokeWidth={1.5}>
            <Label value={`AI fees: ${fmt.money(st.aiFeesYearly)}`}
              position="right" fontSize={11} fill={t.coralDeep} offset={8} />
          </ReferenceLine>
          <Bar dataKey="cost" name="Annual cost" radius={[6, 6, 0, 0]} maxBarSize={90}>
            {annualData.map((_, i) => (
              <Cell key={i} fill={i === 0 ? GREY : t.coral} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Per-ticket cost comparison */}
      <div className="gaai-per-ticket">
        <div className="gaai-per-ticket-title">Cost per ticket — human vs AI</div>
        <div className="gaai-per-ticket-bars">
          <div className="gaai-ptbar">
            <div className="gaai-ptbar-label">Human agent</div>
            <div className="gaai-ptbar-track">
              <div className="gaai-ptbar-fill" style={{ width: '100%', background: GREY }} />
            </div>
            <div className="gaai-ptbar-val">{fmt.money2(humanCostPerTicket)}</div>
          </div>
          <div className="gaai-ptbar">
            <div className="gaai-ptbar-label">AI Agent</div>
            <div className="gaai-ptbar-track">
              <div className="gaai-ptbar-fill" style={{
                width: humanCostPerTicket > 0
                  ? `${Math.max(4, (aiCostPerTicket / humanCostPerTicket) * 100)}%`
                  : '4%',
                background: t.coral,
              }} />
            </div>
            <div className="gaai-ptbar-val" style={{ color: t.coralDeep }}>$0.90</div>
          </div>
        </div>
      </div>

      {/* Callout */}
      <div className="roi-callout">
        <span className="roi-callout-icon">↓</span>
        <span>
          AI Agent handles <strong>{fmt.num(Math.round(st.ticketsAutoPerMonth))} tickets/mo</strong> at{' '}
          <strong>${st.costPerInteraction.toFixed(2)} each</strong>, saving {fmt.money(st.netSavings)}/yr compared to agent handling —
          that's <strong>{st.roiMult}× return</strong> on every dollar spent on AI.
        </span>
      </div>
    </div>
  )
}
