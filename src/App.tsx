import { useRoi } from './hooks/useRoi'
import { InputCard } from './components/InputCard'
import { ResultsCard } from './components/ResultsCard'
import { ChartCard } from './components/ChartCard'

export function App() {
  const st = useRoi()

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
