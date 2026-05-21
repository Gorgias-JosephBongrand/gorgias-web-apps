import { tokens as t } from '../../tokens'
import { type AiAgentRoiState, AUTO_RATE_TYPICAL_LOW, AUTO_RATE_TYPICAL_HIGH } from '../hooks/useAiAgentRoi'
import { Step, Pills, Slider, Stepper, TICKET_PRESETS, fmt } from '../../components/Primitives'

interface Props { st: AiAgentRoiState }

export function InputCard({ st }: Props) {
  const typicalLowPct  = Math.round(AUTO_RATE_TYPICAL_LOW  * 100)
  const typicalHighPct = Math.round(AUTO_RATE_TYPICAL_HIGH * 100)
  const { tierInfo, billing } = st

  return (
    <div className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <h3 className="h3">Your support profile</h3>
        <span className="muted" style={{ fontSize: 12 }}>All fields are estimates</span>
      </div>

      <Step n="1" label="Monthly ticket volume" valDisplay={`${fmt.num(st.tickets)} / mo`}
        help="Don't know exactly? Pick the closest band — or type a custom number below.">
        <Pills value={st.tickets} onChange={st.setTickets} options={TICKET_PRESETS} />
        <Stepper value={st.tickets} onChange={st.setTickets} step={500} />
      </Step>

      <Step n="2" label="AI automation rate"
        valDisplay={`${Math.round(st.autoRate * 100)}%`}
        help={`Gorgias AI Agent typically resolves ${typicalLowPct}–${typicalHighPct}% of tickets autonomously for ecommerce brands. Only counts when AI closes the ticket without human help.`}>
        <Slider value={st.autoRate} onChange={st.setAutoRate} min={0.05} max={0.70} step={0.05}
          marks={['5%', '20%', '40%', '70%']} />
        <div className="gaai-rate-hint">
          <span className="gaai-rate-dot" />
          <span style={{ fontSize: 11, color: t.ink3 }}>Typical: {typicalLowPct}–{typicalHighPct}%</span>
        </div>
      </Step>

      <Step n="3" label="Agents on your support team" valDisplay={`${st.agents} agents`}>
        <Slider value={st.agents} onChange={st.setAgents} min={1} max={30} step={1}
          marks={['1', '10', '20', '30+']} />
      </Step>

      <Step n="4" label="Average fully-loaded agent cost" valDisplay={`$${fmt.num(st.salary)}/yr`}>
        <Slider value={st.salary} onChange={st.setSalary} min={30000} max={120000} step={2000}
          marks={['$30K', '$60K', '$90K', '$120K']} />
      </Step>

      <Step n="5" label="Avg. handle time per ticket" valDisplay={`${st.handleTime} min`}
        help="Used to calculate agent hours freed. Industry average for ecommerce support is 6–10 minutes.">
        <Slider value={st.handleTime} onChange={st.setHandleTime} min={3} max={30} step={1}
          marks={['3 min', '8 min', '15 min', '30 min']} />
      </Step>

      <Step n="6" label="AI Agent billing cycle"
        valDisplay={billing === 'yearly' ? 'Annual' : 'Monthly'}>
        <div className="roi-billing-toggle">
          {(['monthly', 'yearly'] as const).map(b => (
            <button
              key={b}
              type="button"
              className={`roi-billing-btn${st.billing === b ? ' on' : ''}`}
              onClick={() => st.setBilling(b)}
            >
              {b === 'monthly' ? 'Monthly · $1.00/interaction' : 'Annual · $0.90/interaction'}
            </button>
          ))}
        </div>
        <div className="step-help" style={{ marginTop: 6 }}>
          {billing === 'yearly'
            ? <>Based on your volume ({fmt.num(Math.round(st.ticketsAutoPerMonth))} interactions/mo), you'd need the subscription at <strong>${fmt.num(tierInfo.monthlyRate)}/mo</strong> — covers up to {fmt.num(tierInfo.includedPerMonth)} interactions/mo. Overage: $1.50/interaction.</>
            : <>Monthly contract at <strong>$1.00/interaction</strong> — ${fmt.num(Math.round(tierInfo.monthlyRate))}/mo for your projected volume. No annual commitment required.</>
          }
        </div>
      </Step>
    </div>
  )
}
