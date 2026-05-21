import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label,
} from 'recharts'
import { tokens as t } from '../tokens'
import { type HelpdeskRoiState } from '../hooks/useHelpdeskRoi'
import { fmt } from './Primitives'

interface Props {
  st: HelpdeskRoiState
}

export function ChartCard({ st }: Props) {
  const data = [
    { name: 'Current stack', value: st.currentYearly },
    { name: 'With Gorgias',  value: st.gorgiasYearly },
  ]
  const saved   = Math.max(0, st.currentYearly - st.gorgiasYearly)
  const tickFmt = (v: number) => `$${Math.round(v / 1000)}K`

  return (
    <div className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <h3 className="h3" style={{ fontSize: 20 }}>Annual support cost — current stack vs Gorgias</h3>
        <span className="muted" style={{ fontSize: 13 }}>Projected over 12 months</span>
      </div>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 36, right: 28, left: 4, bottom: 8 }} barCategoryGap="32%">
            <CartesianGrid stroke={t.line2} vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: t.line }}
              tickLine={false}
              tick={{ fill: t.ink2, fontSize: 12, fontFamily: t.font, fontWeight: 500 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: t.ink4, fontSize: 10, fontFamily: t.font }}
              tickFormatter={tickFmt}
              width={56}
            />
            <Tooltip
              cursor={{ fill: t.bgCoralSoft, opacity: 0.6 }}
              contentStyle={{
                background: t.ink, color: '#fff', border: 'none',
                borderRadius: 10, fontSize: 12, padding: '8px 12px',
                boxShadow: '0 6px 20px rgba(0,0,0,.18)',
              }}
              labelStyle={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: '#fff', padding: 0 }}
              formatter={(v: number) => [fmt.money(v), 'Annual cost']}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={140}>
              <Cell fill="#CBC6C2" />
              <Cell fill={t.coral} />
            </Bar>
            {saved > 0 && (
              <ReferenceLine
                y={st.gorgiasYearly}
                stroke={t.coralDeep}
                strokeDasharray="4 3"
                strokeWidth={1.5}
                ifOverflow="extendDomain"
              >
                <Label
                  value={`Saved: ${fmt.money(saved)}`}
                  position="insideTopRight"
                  fill={t.coralDeep}
                  fontSize={12}
                  fontWeight={700}
                  offset={8}
                />
              </ReferenceLine>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="roi-legend">
        <div><span className="sw" style={{ background: t.ink, opacity: 0.18 }} />Current stack (agents + tools)</div>
        <div><span className="sw" style={{ background: t.coral }} />With Gorgias Helpdesk</div>
      </div>

      <div className="roi-callout">
        <div className="roi-callout-icon">↓</div>
        <div>
          With Gorgias Helpdesk, you save <b>{fmt.money(st.saved)}</b> annually —
          that's <b>{st.pct}%</b> less than your current support ops cost.
        </div>
      </div>
    </div>
  )
}
