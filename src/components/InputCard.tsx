import { tokens as t } from '../tokens'
import { type RoiState } from '../hooks/useRoi'
import { Step, Pills, Slider, Stepper, TICKET_PRESETS, fmt } from './Primitives'

interface Props {
  st: RoiState
}

export function InputCard({ st }: Props) {
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

      <Step n="2" label="Agents on your support team" valDisplay={`${st.agents} agents`}>
        <Slider value={st.agents} onChange={st.setAgents} min={1} max={30} step={1}
          marks={['1', '10', '20', '30+']} />
      </Step>

      <Step n="3" label="Average fully-loaded agent cost" valDisplay={`$${fmt.num(st.salary)}/yr`}>
        <Slider value={st.salary} onChange={st.setSalary} min={30000} max={120000} step={2000}
          marks={['$30K', '$60K', '$90K', '$120K']} />
      </Step>

      <Step n="4" label="Helpdesk efficiency gain"
        valDisplay={`${Math.round(st.hdRate * 100)}%`}
        help="Gorgias customers typically save 20–40% of agent time through macros, automation rules, and channel consolidation.">
        <Slider value={st.hdRate} onChange={st.setHdRate} min={0.05} max={0.70} step={0.05}
          marks={['5%', '20%', '40%', '70%']} />
        <div className="gaai-rate-hint">
          <span className="gaai-rate-dot" />
          <span style={{ fontSize: 11, color: t.ink3 }}>Typical range: 20–40%</span>
        </div>
      </Step>

      <Step n="5" label="AI automation rate"
        valDisplay={`${Math.round(st.aiRate * 100)}%`}
        help="Gorgias AI Agent typically resolves 20–40% of tickets autonomously for ecommerce brands. Only counts tickets the AI closes without a human handoff.">
        <Slider value={st.aiRate} onChange={st.setAiRate} min={0.05} max={0.70} step={0.05}
          marks={['5%', '20%', '40%', '70%']} />
        <div className="gaai-rate-hint">
          <span className="gaai-rate-dot" />
          <span style={{ fontSize: 11, color: t.ink3 }}>Typical range: 20–40% for ecommerce</span>
        </div>
      </Step>

      <Step n="6" label="Avg. handle time per ticket" valDisplay={`${st.handleTime} min`}
        help="Used to estimate agent hours freed by AI. Industry average for ecommerce support is 6–10 minutes.">
        <Slider value={st.handleTime} onChange={st.setHandleTime} min={3} max={30} step={1}
          marks={['3 min', '8 min', '15 min', '30 min']} />
      </Step>

      <Step n="7" label="Tools you'd replace with Gorgias"
        valDisplay={`${st.tools} tools · $${fmt.num(st.toolcost)}/mo each`}>
        <div className="tools-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 11, color: t.ink3, fontWeight: 500 }}>Number of tools</span>
            <Slider value={st.tools} onChange={st.setTools} min={0} max={8} step={1}
              marks={['0', '4', '8']} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 11, color: t.ink3, fontWeight: 500 }}>Avg cost / tool / month</span>
            <Slider value={st.toolcost} onChange={st.setToolcost} min={0} max={500} step={25}
              marks={['$0', '$250', '$500']} />
          </div>
        </div>
      </Step>

      <Step n="8" label="Billing cycle"
        valDisplay={st.billing === 'yearly' ? 'Annual' : 'Monthly'}>
        <div className="roi-billing-toggle">
          {(['monthly', 'yearly'] as const).map(b => (
            <button
              key={b}
              type="button"
              className={`roi-billing-btn${st.billing === b ? ' on' : ''}`}
              onClick={() => st.setBilling(b)}
            >
              {b === 'monthly' ? 'Monthly' : 'Annual'}
            </button>
          ))}
        </div>
        <div className="step-help" style={{ marginTop: 6 }}>
          Helpdesk: <strong>{st.plan.name}</strong> plan at ${(st.plan.arr / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo.
          {' '}AI Agent: ${fmt.num(st.aiTier.monthlyRate)}/mo for ~{fmt.num(Math.round(st.ticketsAutoPerMonth))} interactions/mo.
        </div>
      </Step>
    </div>
  )
}
