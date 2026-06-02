import { useState } from 'react'

const PLAN_OPTIONS = [
  { id: 'basic',      name: 'Basic',      upTo: 300,      monthlyAnnual: 50,   monthlyMonthly: 60,   airate: 0.90, custom: false },
  { id: 'pro',        name: 'Pro',        upTo: 2000,     monthlyAnnual: 300,  monthlyMonthly: 360,  airate: 0.90, custom: false },
  { id: 'advanced',   name: 'Advanced',   upTo: 5000,     monthlyAnnual: 750,  monthlyMonthly: 900,  airate: 0.85, custom: false },
  { id: 'enterprise', name: 'Enterprise', upTo: Infinity, monthlyAnnual: 1500, monthlyMonthly: 1800, airate: 0.75, custom: true  },
]

function recommendPlan(tickets: number) {
  return PLAN_OPTIONS.find(p => tickets <= p.upTo) ?? PLAN_OPTIONS[PLAN_OPTIONS.length - 1]
}

const LABOR_LIFT = 0.25

export type RoiState = ReturnType<typeof useRoi>

export function useRoi() {
  const [scenario,   setScenario]   = useState<'helpdesk' | 'ai'>('ai')
  const [revenueOn,  setRevenueOn]  = useState(true)
  const [billing,    setBilling]    = useState<'annual' | 'monthly'>('annual')
  const [tickets,    setTickets]    = useState(2000)
  const [agents,     setAgents]     = useState(6)
  const [salary,     setSalary]     = useState(52000)
  const [toolspend,  setToolspend]  = useState(600)
  const [rate,       setRate]       = useState(45)
  const [traffic,    setTraffic]    = useState(100000)
  const [presales,   setPresales]   = useState(20)
  const [chatRate,   setChatRate]   = useState(1.5)
  const [baseCR,     setBaseCR]     = useState(2.5)
  const [aov,        setAov]        = useState(90)
  const [saUplift,   setSaUplift]   = useState(82)
  const [attrib,     setAttrib]     = useState(70)

  const aiOn = scenario === 'ai'
  const revenueActive = aiOn && revenueOn
  const saOn = revenueActive
  const setAiOn = (v: boolean) => setScenario(v ? 'ai' : 'helpdesk')
  const setRevenue = (v: boolean) => { setRevenueOn(v); if (v) setScenario('ai') }

  const laborCurrent   = agents * salary
  const toolsCurrent   = toolspend * 12
  const baseYearly     = laborCurrent + toolsCurrent
  const ticketsYr      = tickets * 12
  const costPerTicketToday = ticketsYr > 0 ? baseYearly / ticketsYr : 0

  const plan               = recommendPlan(tickets)
  const planMonthly        = billing === 'annual' ? plan.monthlyAnnual : plan.monthlyMonthly
  const planAnnual         = planMonthly * 12
  const planSavingsVsMonthly = (plan.monthlyMonthly - plan.monthlyAnnual) * 12
  const airate             = plan.airate

  const laborWithHelpdesk = laborCurrent * (1 - LABOR_LIFT)
  const hdYearly          = laborWithHelpdesk + planAnnual
  const hdSaved           = Math.max(0, baseYearly - hdYearly)

  const autoResolved  = tickets * (rate / 100)
  const humanHandled  = tickets - autoResolved
  const humanFraction = tickets > 0 ? humanHandled / tickets : 0
  const laborWithAi   = laborWithHelpdesk * humanFraction
  const aiSpend       = autoResolved * airate * 12
  const hdAiYearly    = laborWithAi + planAnnual + aiSpend
  const hdAiSaved     = Math.max(0, baseYearly - hdAiYearly)
  const aiUplift      = Math.max(0, hdYearly - hdAiYearly)

  const saConversationsPerMo    = traffic * (presales / 100) * (chatRate / 100)
  const saBaselineOrdersMo      = saConversationsPerMo * (baseCR / 100)
  const saIncrementalOrdersMo   = saBaselineOrdersMo * (saUplift / 100)
  const saAttributedOrdersMo    = saIncrementalOrdersMo * (attrib / 100)
  const saRevenueAnnual         = saAttributedOrdersMo * aov * 12
  const saRevenueMonthly        = saRevenueAnnual / 12
  const totalWithRevenue        = hdAiSaved + saRevenueAnnual

  const savedNow       = saOn ? totalWithRevenue : aiOn ? hdAiSaved : hdSaved
  const yearlyNow      = aiOn ? hdAiYearly : hdYearly
  const pct            = baseYearly > 0 ? Math.round((Math.max(0, aiOn ? hdAiSaved : hdSaved) / baseYearly) * 100) : 0
  const gorgiasSpendNow = aiOn ? (planAnnual + aiSpend) : planAnnual
  const returnMult     = gorgiasSpendNow > 0 ? ((saOn ? totalWithRevenue : savedNow) / gorgiasSpendNow).toFixed(1) : '0'
  const laborNow       = aiOn ? laborWithAi : laborWithHelpdesk

  return {
    scenario, setScenario, aiOn, setAiOn, saOn, revenueOn, revenueActive, setRevenue,
    billing, setBilling,
    tickets, setTickets, agents, setAgents, salary, setSalary,
    toolspend, setToolspend, rate, setRate, airate,
    traffic, setTraffic, presales, setPresales, chatRate, setChatRate,
    baseCR, setBaseCR, aov, setAov, saUplift, setSaUplift, attrib, setAttrib,
    plan, planAnnual, planMonthly, planSavingsVsMonthly,
    baseYearly, laborCurrent, toolsCurrent, costPerTicketToday,
    hdYearly, hdSaved, laborWithHelpdesk,
    autoResolved, humanHandled, aiSpend, laborWithAi,
    hdAiYearly, hdAiSaved, aiUplift,
    saConversationsPerMo, saBaselineOrdersMo, saIncrementalOrdersMo,
    saAttributedOrdersMo, saRevenueAnnual, saRevenueMonthly, totalWithRevenue,
    savedNow, yearlyNow, pct, returnMult, gorgiasSpendNow, laborNow,
    LABOR_LIFT,
  }
}
