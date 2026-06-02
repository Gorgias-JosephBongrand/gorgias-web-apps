import { useRoi } from './hooks/useRoi'
import { InputCard } from './components/InputCard'
import { ResultsCard } from './components/ResultsCard'
import { Breakdown } from './components/Breakdown'
import { ChartCard } from './components/ChartCard'
import { Methodology } from './components/Methodology'

export function App() {
  const st = useRoi()

  return (
    <div className="v2" style={{ background: '#FBFAF8' }}>
      <div className="v2-roi-wrap">
        <div className="v2-roi-grid">
          <InputCard st={st} />
          <div className="v2-roi-sticky">
            <ResultsCard st={st} />
          </div>
        </div>
        <Breakdown st={st} />
        <ChartCard st={st} />
        <Methodology st={st} />
      </div>
    </div>
  )
}
