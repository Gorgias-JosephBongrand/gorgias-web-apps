import { tokens as t } from '../tokens'

export const fmt = {
  money:  (n: number) => '$' + Math.round(n).toLocaleString('en-US'),
  money2: (n: number) => '$' + (Math.round(n * 100) / 100).toFixed(2),
  num:    (n: number) => Math.round(n).toLocaleString('en-US'),
}

export const TICKET_PRESETS = [
  { value: 500,   label: 'Getting started', sub: '~500/mo' },
  { value: 2000,  label: 'Growing',         sub: '~2,000/mo' },
  { value: 4000,  label: 'Scaling',         sub: '~4,000/mo' },
  { value: 10000, label: 'High volume',     sub: '10,000+/mo' },
]

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

interface PillsProps {
  value: number
  onChange: (v: number) => void
  options: { value: number; label: string; sub: string }[]
}

export function Pills({ value, onChange, options }: PillsProps) {
  return (
    <div className="roi-pills">
      {options.map(opt => (
        <button key={opt.value} type="button"
          className={`roi-pill${opt.value === value ? ' on' : ''}`}
          onClick={() => onChange(opt.value)}>
          <div className="pill-label">{opt.label}</div>
          <div className="pill-sub">{opt.sub}</div>
        </button>
      ))}
    </div>
  )
}

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
      <input type="range" className="roi-slider"
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
      <input type="number" value={value} min={min} step={step}
        onChange={e => onChange(Math.max(min, +e.target.value || 0))} />
      <button type="button" onClick={() => onChange(value + step)}>+</button>
    </div>
  )
}

interface KpisProps {
  items: { value: string; label: string }[]
}

export function Kpis({ items }: KpisProps) {
  return (
    <div className="roi-kpis">
      {items.map((k, i) => (
        <div key={i} className="roi-kpi">
          <div className="v">{k.value}</div>
          <div className="l">{k.label}</div>
        </div>
      ))}
    </div>
  )
}

interface CalloutProps {
  icon?: string
  children: React.ReactNode
}

export function Callout({ icon = '↓', children }: CalloutProps) {
  return (
    <div className="roi-callout">
      <div className="roi-callout-icon">{icon}</div>
      <div>{children}</div>
    </div>
  )
}

interface ToggleSwitchProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}

export function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: t.ink2, cursor: 'pointer', position: 'relative' }}>
      <span style={{ position: 'relative', width: 34, height: 20, borderRadius: 999, background: checked ? t.ink : t.line, transition: 'background .15s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 2, left: checked ? 16 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
      </span>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      {label}
    </label>
  )
}
