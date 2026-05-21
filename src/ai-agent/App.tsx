import { useAiAgentRoi } from './hooks/useAiAgentRoi'
import { InputCard } from './components/InputCard'
import { ResultsCard } from './components/ResultsCard'
import { ChartCard } from './components/ChartCard'

export function AiAgentApp() {
  const st = useAiAgentRoi()

  return (
    <div className="groi">
      <div className="groi-wrap">
        <div className="groi-inner">
          <div className="groi-grid">
            <InputCard st={st} />
            <div className="groi-sticky">
              <ResultsCard st={st} />
            </div>
          </div>
          <ChartCard st={st} />
        </div>
      </div>
    </div>
  )
}
