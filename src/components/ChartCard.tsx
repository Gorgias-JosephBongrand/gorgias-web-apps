import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label, Customized,
} from 'recharts'
import { tokens as t } from '../tokens'
import { type RoiState } from '../hooks/useRoi'
import { fmt, Callout } from './Primitives'

interface Props { st: RoiState }

const laborFill = '#CBC6C2'
const toolsFill = '#9FA5AE'

export function ChartCard({ st }: Props) {
  const dimAi = !st.aiOn

  const data = [
    { name: 'Today',               labor: st.laborCurrent,      tools: st.toolsCurrent, plan: 0,            ai: 0 },
    { name: 'With Helpdesk',       labor: st.laborWithHelpdesk, tools: 0,               plan: st.planAnnual, ai: 0 },
    { name: 'Helpdesk + AI Agent', labor: st.laborWithAi,       tools: 0,               plan: st.planAnnual, ai: st.aiSpend },
  ].map(d => ({ ...d, total: d.labor + d.tools + d.plan + d.ai }))

  const refY     = st.aiOn ? st.hdAiYearly : st.hdYearly
  const refSaved = st.aiOn ? st.hdAiSaved  : st.hdSaved

  const ChartTotals = (cp: any) => {
    const xMap = cp.xAxisMap, yMap = cp.yAxisMap
    if (!xMap || !yMap) return null
    const xAxis = xMap[Object.keys(xMap)[0]], yAxis = yMap[Object.keys(yMap)[0]]
    if (!xAxis?.scale || !yAxis?.scale) return null
    const xScale = xAxis.scale, yScale = yAxis.scale
    const bw = xScale.bandwidth ? xScale.bandwidth() : 0
    return (
      <g>
        {data.map((d, i) => (
          <text key={i} x={xScale(d.name) + bw / 2} y={yScale(d.total) - 12}
            textAnchor="middle" fill={t.ink} fontSize={13} fontWeight={600} fontFamily={t.font}>
            {fmt.money(d.total)}
          </text>
        ))}
      </g>
    )
  }

  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 className="h3">Annual support cost across scenarios</h3>
        <span className="muted" style={{ fontSize: 13 }}>
          Each bar stacks the line items behind that total.
          {st.revenueActive && ' Shopping Assistant adds revenue on top — shown below, not as a cost.'}
        </span>
      </div>

      <div style={{ width: '100%', height: 380 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 48, right: 24, left: 8, bottom: 8 }} barCategoryGap="24%">
            <CartesianGrid stroke={t.line2} vertical={false} />
            <XAxis dataKey="name" axisLine={{ stroke: t.line }} tickLine={false}
              tick={{ fill: t.ink2, fontSize: 12, fontFamily: t.font, fontWeight: 500 }} tickMargin={10} interval={0} />
            <YAxis hide domain={[0, (max: number) => max * 1.16]} />
            <Tooltip
              cursor={{ fill: t.bgCoralSoft, opacity: 0.6 }}
              contentStyle={{ background: t.ink, color: '#fff', border: 'none', borderRadius: 10, fontSize: 12, padding: '8px 12px', boxShadow: '0 6px 20px rgba(0,0,0,.18)' }}
              labelStyle={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: '#fff', padding: 0 }}
              formatter={(v: number, name: string) => [fmt.money(v), ({ labor: 'Agent labor', tools: 'Tool stack', plan: 'Gorgias plan', ai: 'AI Agent' } as Record<string, string>)[name] ?? name]}
            />
            <Bar dataKey="labor" stackId="a" maxBarSize={96}>
              {data.map((_, i) => <Cell key={i} fill={laborFill} fillOpacity={dimAi && i === 2 ? 0.34 : 1} />)}
            </Bar>
            <Bar dataKey="tools" stackId="a" maxBarSize={96}>
              {data.map((_, i) => <Cell key={i} fill={toolsFill} />)}
            </Bar>
            <Bar dataKey="plan" stackId="a" maxBarSize={96}>
              {data.map((_, i) => <Cell key={i} fill={t.ink} fillOpacity={dimAi && i === 2 ? 0.34 : 1} />)}
            </Bar>
            <Bar dataKey="ai" stackId="a" radius={[8, 8, 0, 0]} maxBarSize={96}>
              {data.map((_, i) => (
                <Cell key={i} fill={t.coral} fillOpacity={dimAi && i === 2 ? 0.3 : 1}
                  stroke={dimAi && i === 2 ? t.coral : 'none'} strokeDasharray={dimAi && i === 2 ? '4 3' : '0'} />
              ))}
            </Bar>
            <Customized component={ChartTotals} />
            {refSaved > 0 && (
              <ReferenceLine y={refY} stroke={t.coralDeep} strokeDasharray="4 3" strokeWidth={1.5} ifOverflow="extendDomain">
                <Label value={`Saved vs today: ${fmt.money(refSaved)}`} position="insideTopLeft" fill={t.coralDeep} fontSize={12} fontWeight={700} offset={8} />
              </ReferenceLine>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="roi-legend">
        <div><span className="sw" style={{ background: laborFill }} />Agent labor</div>
        <div><span className="sw" style={{ background: toolsFill }} />Current tool stack</div>
        <div><span className="sw" style={{ background: t.ink }} />Gorgias plan ({st.plan.name})</div>
        <div><span className="sw" style={{ background: t.coral, opacity: dimAi ? 0.34 : 1 }} />AI Agent{dimAi ? ' (off)' : ''}</div>
        <div><span className="sw" style={{ background: 'transparent', border: `1px dashed ${t.coralDeep}` }} />Savings vs today</div>
      </div>

      <Callout icon={st.revenueActive ? '↑' : st.aiOn ? '⚡' : '↓'}>
        {st.revenueActive ? (
          <span>
            On the <b>{st.plan.name}</b> plan you cut support spend by <b>{fmt.money(st.hdAiSaved)}/yr</b>.
            Shopping Assistant — included in AI Agent at no extra cost — adds{' '}
            <b style={{ color: t.green }}>+{fmt.money(st.saRevenueAnnual)}/yr</b> in revenue
            ({fmt.num(st.saAttributedOrdersMo)} incremental orders/mo at {st.attrib}% attribution),
            for <b style={{ color: t.green }}>{fmt.money(st.totalWithRevenue)}</b> total annual value.
          </span>
        ) : st.aiOn ? (
          <span>
            On the <b>{st.plan.name}</b> plan, you spend <b>{fmt.money(st.gorgiasSpendNow)}/yr</b> with Gorgias
            (plan + AI usage) but cut your total support spend by <b>{fmt.money(st.hdAiSaved)}</b>.
            That's a <b>{st.returnMult}×</b> return on Gorgias spend.
          </span>
        ) : (
          <span>
            On the <b>{st.plan.name}</b> plan ({fmt.money(st.planAnnual)}/yr), Helpdesk alone saves <b>{fmt.money(st.hdSaved)}</b>.
            Add AI Agent and total savings rise to <b>{fmt.money(st.hdAiSaved)}</b>.
          </span>
        )}
      </Callout>
    </div>
  )
}
