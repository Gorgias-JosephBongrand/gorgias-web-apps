import { tokens as t } from '../tokens'

// ─── Formatters ────────────────────────────────────────────────────────────

export const fmt = {
  money:  (n: number) => '$' + Math.round(n).toLocaleString('en-US'),
  money2: (n: number) => '$' + (Math.round(n * 100) / 100).toFixed(2),
  num:    (n: number) => Math.round(n).toLocaleString('en-US'),
}

// ─── Ticket presets ─────────────────────────────────────────────────────────

export const TICKET_PRESETS = [
  { value: 500,   label: 'Small',       sub: '~500/mo' },
  { value: 2000,  label: 'Growing',     sub: '~2,000/mo' },
  { value: 4000,  label: 'Scaling',     sub: '~4,000/mo' },
  { value: 10000, label: 'High volume', sub: '10,000+/mo' },
]

// ─── Step wrapper ───────────────────────────────────────────────────────────

interface StepProps {
  n: string | number
  label: string
  valDisplay?: string
  help?: string
  children: React.ReactNode
}

export function Step({ n, label, valDisplay, help, children }: StepProps) {
  return (
    <div className="roi-step">
      <div className="step-head">
        <span className="step-label">
          <span className="step-n">{n}</span>{label}
        </span>
        {valDisplay && <span className="step-val">{valDisplay}</span>}
      </div>
      {children}
      {help && <div className="step-help">{help}</div>}
    </div>
  )
}

// ─── Pills ──────────────────────────────────────────────────────────────────

interface PillsProps {
  value: number
  onChange: (v: number) => void
  options: typeof TICKET_PRESETS
}

export function Pills({ value, onChange, options }: PillsProps) {
  return (
    <div className="roi-pills">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`roi-pill${opt.value === value ? ' on' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          <div className="pill-label">{opt.label}</div>
          <div className="pill-sub">{opt.sub}</div>
        </button>
      ))}
    </div>
  )
}

// ─── Slider ─────────────────────────────────────────────────────────────────

interface SliderProps {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  marks?: string[]
}

export function Slider({ value, onChange, min, max, step, marks }: SliderProps) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
  const bg = `linear-gradient(to right, ${t.coral} 0%, ${t.coral} ${pct}%, ${t.line2} ${pct}%, ${t.line2} 100%)`
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <input
        type="range"
        className="roi-slider"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        style={{ background: bg }}
      />
      {marks && (
        <div className="roi-marks">
          {marks.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      )}
    </div>
  )
}

// ─── Stepper ─────────────────────────────────────────────────────────────────

interface StepperProps {
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
}

export function Stepper({ value, onChange, step = 1, min = 0 }: StepperProps) {
  return (
    <div className="roi-stepper">
      <button type="button" onClick={() => onChange(Math.max(min, value - step))}>−</button>
      <input
        type="number" value={value} min={min} step={step}
        onChange={e => onChange(Math.max(min, +e.target.value || 0))}
      />
      <button type="button" onClick={() => onChange(value + step)}>+</button>
    </div>
  )
}
