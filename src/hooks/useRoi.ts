import { useState } from 'react'

// Helpdesk plan pricing — USD-5 price book, verified 2026-01-28
function lookupPlan(ticketsPerMonth: number, billing: Billing) {
  if (billing === 'monthly') {
    if (ticketsPerMonth <= 50)   return { name: 'Starter',    arr: 10   * 12 }
    if (ticketsPerMonth <= 300)  return { name: 'Basic',      arr: 60   * 12 }
    if (ticketsPerMonth <= 2000) return { name: 'Pro',        arr: 360  * 12 }
    if (ticketsPerMonth <= 5000) return { name: 'Advanced',   arr: 900  * 12 }
    return                                { name: 'Enterprise', arr: 1600 * 12 }
  } else {
    if (ticketsPerMonth <= 300)  return { name: 'Basic',      arr: 600   }
    if (ticketsPerMonth <= 2000) return { name: 'Pro',        arr: 3600  }
    if (ticketsPerMonth <= 5000) return { name: 'Advanced',   arr: 9000  }
    return                                { name: 'Enterprise', arr: 16000 }
  }
}

// AI Agent tier pricing — USD-6 price book, verified 2026-01-28
// Annual: $0.90/interaction. Monthly: $1.00/interaction.
const YEARLY_TIERS = [
  { maxPerMonth: 30,   monthlyRate: 27   },
  { maxPerMonth: 40,   monthlyRate: 36   },
  { maxPerMonth: 50,   monthlyRate: 45   },
  { maxPerMonth: 60,   monthlyRate: 54   },
  { maxPerMonth: 80,   monthlyRate: 72   },
  { maxPerMonth: 100,  monthlyRate: 90   },
  { maxPerMonth: 120,  monthlyRate: 108  },
  { maxPerMonth: 150,  monthlyRate: 135  },
  { maxPerMonth: 190,  monthlyRate: 171  },
  { maxPerMonth: 230,  monthlyRate: 207  },
  { maxPerMonth: 270,  monthlyRate: 243  },
  { maxPerMonth: 310,  monthlyRate: 279  },
  { maxPerMonth: 360,  monthlyRate: 324  },
  { maxPerMonth: 410,  monthlyRate: 369  },
  { maxPerMonth: 460,  monthlyRate: 414  },
  { maxPerMonth: 530,  monthlyRate: 477  },
  { maxPerMonth: 600,  monthlyRate: 540  },
  { maxPerMonth: 700,  monthlyRate: 630  },
  { maxPerMonth: 800,  monthlyRate: 720  },
  { maxPerMonth: 900,  monthlyRate: 810  },
  { maxPerMonth: 1000, monthlyRate: 900  },
  { maxPerMonth: 1125, monthlyRate: 1013 },
  { maxPerMonth: 1250, monthlyRate: 1125 },
  { maxPerMonth: 1375, monthlyRate: 1238 },
  { maxPerMonth: 1500, monthlyRate: 1350 },
  { maxPerMonth: 1750, monthlyRate: 1575 },
  { maxPerMonth: 2000, monthlyRate: 1800 },
  { maxPerMonth: 2250, monthlyRate: 2025 },
  { maxPerMonth: 2500, monthlyRate: 2250 },
  { maxPerMonth: 3000, monthlyRate: 2700 },
  { maxPerMonth: 3500, monthlyRate: 3150 },
  { maxPerMonth: 4000, monthlyRate: 3600 },
  { maxPerMonth: 5000, monthlyRate: 4500 },
  { maxPerMonth: 6000, monthlyRate: 5400 },
  { maxPerMonth: 7000, monthlyRate: 6300 },
]

function lookupAiTier(interactionsPerMonth: number, billing: Billing) {
  if (billing === 'monthly') {
    const monthlyRate = Math.ceil(interactionsPerMonth) * 1.00
    return { monthlyRate, arr: monthlyRate * 12, includedPerMonth: Math.ceil(interactionsPerMonth) }
  }
  const tier = YEARLY_TIERS.find(t => t.maxPerMonth >= interactionsPerMonth)
  if (tier) {
    return { monthlyRate: tier.monthlyRate, arr: tier.monthlyRate * 12, includedPerMonth: tier.maxPerMonth }
  }
  const monthlyRate = Math.round(interactionsPerMonth * 0.90)
  return { monthlyRate, arr: monthlyRate * 12, includedPerMonth: Math.round(interactionsPerMonth) }
}

export type Billing = 'monthly' | 'yearly'

export interface RoiState {
  tickets: number
  setTickets: (v: number) => void
  agents: number
  setAgents: (v: number) => void
  salary: number
  setSalary: (v: number) => void
  hdRate: number
  setHdRate: (v: number) => void
  aiRate: number
  setAiRate: (v: number) => void
  handleTime: number
  setHandleTime: (v: number) => void
  tools: number
  setTools: (v: number) => void
  toolcost: number
  setToolcost: (v: number) => void
  billing: Billing
  setBilling: (v: Billing) => void
  // derived
  currentYearly: number
  gorgiasYearly: number
  plan: { name: string; arr: number }
  aiTier: { monthlyRate: number; arr: number; includedPerMonth: number }
  saved: number
  pct: number
  gorgiasCostPerTicket: number
  returnMult: string
  agentHoursFreedYearly: number
  agentFteEquivalent: string
  ticketsAutoPerMonth: number
}

export function useRoi(): RoiState {
  const [tickets,    setTickets]    = useState(4000)
  const [agents,     setAgents]     = useState(6)
  const [salary,     setSalary]     = useState(52000)
  const [hdRate,     setHdRate]     = useState(0.30)
  const [aiRate,     setAiRate]     = useState(0.30)
  const [handleTime, setHandleTime] = useState(8)
  const [tools,      setTools]      = useState(3)
  const [toolcost,   setToolcost]   = useState(200)
  const [billing,    setBilling]    = useState<Billing>('yearly')

  // ── Current stack ─────────────────────────────────────────────────────────
  const currentYearly = agents * salary + tools * toolcost * 12

  // ── With Gorgias ──────────────────────────────────────────────────────────
  const plan = lookupPlan(tickets, billing)
  const ticketsAutoPerMonth = tickets * aiRate
  const aiTier = lookupAiTier(ticketsAutoPerMonth, billing)

  // Helpdesk efficiency reduces time per ticket; AI automation removes aiRate
  // of tickets from the agent queue entirely — both effects compound
  const gorgiasAgentCost = agents * salary * (1 - hdRate) * (1 - aiRate)

  // Tool costs consolidate to zero with Gorgias
  const gorgiasYearly = gorgiasAgentCost + plan.arr + aiTier.arr

  // ── Derived ───────────────────────────────────────────────────────────────
  const saved                = Math.max(0, currentYearly - gorgiasYearly)
  const pct                  = currentYearly > 0 ? Math.round((saved / currentYearly) * 100) : 0
  const gorgiasCostPerTicket = tickets > 0 ? gorgiasYearly / (tickets * 12) : 0
  const gorgiasCost          = plan.arr + aiTier.arr
  const returnMult           = gorgiasCost > 0 ? (saved / gorgiasCost).toFixed(1) : '0'

  const agentHoursFreedYearly = ticketsAutoPerMonth * 12 * (handleTime / 60)
  const agentFteEquivalent    = (agentHoursFreedYearly / 2000).toFixed(1)

  return {
    tickets, setTickets,
    agents, setAgents,
    salary, setSalary,
    hdRate, setHdRate,
    aiRate, setAiRate,
    handleTime, setHandleTime,
    tools, setTools,
    toolcost, setToolcost,
    billing, setBilling,
    currentYearly, gorgiasYearly,
    plan, aiTier,
    saved, pct, gorgiasCostPerTicket,
    returnMult,
    agentHoursFreedYearly, agentFteEquivalent,
    ticketsAutoPerMonth,
  }
}
