import { tokens as t } from '../tokens'
import { type RoiState } from '../hooks/useRoi'
import { Step, Pills, Slider, Stepper, TICKET_PRESETS, fmt, ToggleSwitch } from './Primitives'

interface Props { st: RoiState }

export function InputCard({ st }: Props) {
  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <h3 className="h3">Your support profile</h3>
        <span className="muted" style={{ fontSize: 12 }}>All fields are estimates</span>
      </div>

      <Step n="1" label="Monthly ticket volume" valDisplay={`${fmt.num(st.tickets)} / mo`}
        help="Sets your recommended Gorgias plan. Pick the closest band, or type a custom number below.">
        <Pills value={st.tickets} onChange={st.setTickets} options={TICKET_PRESETS} />
        <Stepper value={st.tickets} onChange={st.setTickets} step={500} />
      </Step>

      <Step n="2" label="Agents on your support team" valDisplay={`${st.agents} agents`}
        help="Drives labor cost in the breakdown below.">
        <Slider value={st.agents} onChange={st.setAgents} min={1} max={30} step={1}
          marks={['1', '10', '20', '30+']} />
      </Step>

      <Step n="3" label="Fully-loaded cost per agent" valDisplay={`$${fmt.num(st.salary)}/yr`}
        help="Salary + benefits + overhead. Industry avg: $52K for an ecommerce support agent.">
        <Slider value={st.salary} onChange={st.setSalary} min={30000} max={120000} step={2000}
          marks={['$30K', '$60K', '$90K', '$120K']} />
      </Step>

      <Step n="4" label="Current tooling spend" valDisplay={`$${fmt.num(st.toolspend)}/mo`}
        help="Total monthly spend on tools you'd replace with Gorgias: Zendesk, separate chat apps, macros tools, etc.">
        <Slider value={st.toolspend} onChange={st.setToolspend} min={0} max={4000} step={50}
          marks={['$0', '$1K', '$2K', '$4K+']} />
      </Step>

      {/* AI Agent */}
      <div style={{ padding: '24px 22px 22px', margin: '4px -6px 0', borderRadius: 14, background: t.bgNeutral, border: `1px solid ${t.line}`, display: 'flex', flexDirection: 'column', gap: 22, opacity: st.aiOn ? 1 : 0.55, transition: 'opacity .2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.coral, display: 'inline-block' }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: t.ink3 }}>AI Agent settings</span>
            </div>
            <span style={{ fontSize: 12, color: t.ink3 }}>Cost-side automation · automates support interactions</span>
          </div>
          <ToggleSwitch checked={st.aiOn} onChange={st.setAiOn} label={st.aiOn ? 'Included' : 'Not included'} />
        </div>

        <Step n="5" label="Automation rate" valDisplay={`${st.rate}%`}
          help="% of support interactions AI Agent fully automates. Most customers land between 30–60%.">
          <Slider value={st.rate} onChange={st.setRate} min={10} max={80} step={5}
            marks={['10%', 'Avg 30%', 'Top 60%+', '80%']} />
        </Step>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, fontSize: 12, color: t.ink3 }}>
          <span>Price per automated interaction</span>
          <span style={{ color: t.ink2, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
            ${st.airate.toFixed(2)} · set by your {st.plan.name} tier
          </span>
        </div>
      </div>

      {/* Shopping Assistant */}
      <div style={{ padding: '24px 22px 22px', margin: '4px -6px 0', borderRadius: 14, background: t.bgNeutral, border: `1px solid ${t.line}`, display: 'flex', flexDirection: 'column', gap: 22, opacity: st.saOn ? 1 : 0.5, transition: 'opacity .2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.green, display: 'inline-block' }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: t.ink3 }}>Shopping Assistant · storefront inputs</span>
            </div>
            <span style={{ fontSize: 12, color: t.ink3 }}>Revenue side · included with AI Agent, no extra cost</span>
          </div>
          <ToggleSwitch checked={st.saOn} onChange={st.setRevenue} label={st.saOn ? 'Modeling' : 'Off'} />
        </div>

        {!st.saOn && (
          <div style={{ fontSize: 12, color: t.ink3, lineHeight: 1.5 }}>
            Shopping Assistant is built into AI Agent — switching this on enables AI Agent (if it isn't already) and reveals the storefront inputs.
          </div>
        )}

        {st.saOn && (
          <>
            <Step n="6" label="Monthly site traffic" valDisplay={`${fmt.num(st.traffic)} visits / mo`}>
              <Slider value={st.traffic} onChange={st.setTraffic} min={10000} max={2000000} step={10000}
                marks={['10K', '500K', '1M', '2M+']} />
              <Stepper value={st.traffic} onChange={st.setTraffic} step={10000} />
            </Step>

            <Step n="7" label="Pre-sales inquiry rate" valDisplay={`${st.presales}% of visitors`}
              help="Share of visitors who have a question Shopping Assistant could answer (sizing, fit, comparison, inventory).">
              <Slider value={st.presales} onChange={st.setPresales} min={5} max={40} step={1}
                marks={['5%', '20%', '40%']} />
            </Step>

            <Step n="8" label="Chat contact rate" valDisplay={`${st.chatRate}% of pre-sales visitors engage`}
              help="Of those with a pre-sales question, what % actually open chat. Industry: 0.5–5%.">
              <Slider value={st.chatRate} onChange={st.setChatRate} min={0.5} max={5} step={0.1}
                marks={['0.5%', '1.5%', '3%', '5%']} />
            </Step>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Step n="9" label="Baseline conversion rate" valDisplay={`${st.baseCR.toFixed(1)}%`}
                help="Store-wide CVR without Shopping Assistant. Most ecommerce: 1.5–4%.">
                <Slider value={st.baseCR} onChange={st.setBaseCR} min={1} max={8} step={0.1}
                  marks={['1%', '4%', '8%']} />
              </Step>
              <Step n="10" label="Average order value" valDisplay={`$${fmt.num(st.aov)}`}>
                <Slider value={st.aov} onChange={st.setAov} min={30} max={500} step={5}
                  marks={['$30', '$200', '$500']} />
              </Step>
            </div>

            <Step n="11" label="Shopping Assistant CVR uplift" valDisplay={`+${st.saUplift}% CVR when it participates`}
              help="Lift in CVR for sessions where Shopping Assistant participates vs the store baseline. Internal avg: 82%.">
              <Slider value={st.saUplift} onChange={st.setSaUplift} min={20} max={200} step={1}
                marks={['20%', 'Avg 82%', '120%', '200%']} />
            </Step>

            <Step n="12" label="Attribution confidence" valDisplay={`${st.attrib}% of lift counted as incremental`}
              help="GMV-influenced is not the same as incremental. 70% is a defensible default. Use 40% for CFO-grade modeling.">
              <Pills value={st.attrib} onChange={st.setAttrib} options={[
                { value: 40,  label: 'Conservative', sub: '40%' },
                { value: 70,  label: 'Default',      sub: '70%' },
                { value: 100, label: 'Aggressive',   sub: '100%' },
              ]} />
            </Step>
          </>
        )}
      </div>
    </div>
  )
}
