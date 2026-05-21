import { useState } from 'react'

// AI Agent USD-6 price book, verified 2026-01-28.
// Priced as a subscription tier based on interactions/month.
// Effective cost per interaction (included in tier):
//   Monthly contract:  $1.00/interaction
//   Annual contract:   $0.90/interaction  (10% discount)
// Overage (above tier cap): $1.50/interaction on both billing cycles.
// Only charged when AI closes the ticket autonomously — handovers are free.

export type AiBilling = 'monthly' | 'yearly'

export const COST_PER_INTERACTION: Record<AiBilling, number> = {
  monthly: 1.00,
  yearly:  0.90,
}

// Typical range Gorgias promises: 20–40% for ecommerce (from sales call data)
export const AUTO_RATE_TYPICAL_LOW  = 0.20
export const AUTO_RATE_TYPICAL_HIGH = 0.40

// Tier lookup — annual yearly-invoice pricing (USD-6).
// Returns the lowest tier that covers the monthly interaction volume.
// Each tier is effectively $0.90/interaction on annual.
const YEARLY_TIERS: Array<{ maxPerMonth: number; monthlyRate: number }> = [
  { maxPerMonth: 30,   monthlyRate: 27    },
  { maxPerMonth: 40,   monthlyRate: 36    },
  { maxPerMonth: 50,   monthlyRate: 45    },
  { maxPerMonth: 60,   monthlyRate: 54    },
  { maxPerMonth: 80,   monthlyRate: 72    },
  { maxPerMonth: 100,  monthlyRate: 90    },
  { maxPerMonth: 120,  monthlyRate: 108   },
  { maxPerMonth: 150,  monthlyRate: 135   },
  { maxPerMonth: 190,  monthlyRate: 171   },
  { maxPerMonth: 230,  monthlyRate: 207   },
  { maxPerMonth: 270,  monthlyRate: 243   },
  { maxPerMonth: 310,  monthlyRate: 279   },
  { maxPerMonth: 360,  monthlyRate: 324   },
  { maxPerMonth: 410,  monthlyRate: 369   },
  { maxPerMonth: 460,  monthlyRate: 414   },
  { maxPerMonth: 530,  monthlyRate: 477   },
  { maxPerMonth: 600,  monthlyRate: 540   },
  { maxPerMonth: 700,  monthlyRate: 630   },
  { maxPerMonth: 800,  monthlyRate: 720   },
  { maxPerMonth: 900,  monthlyRate: 810   },
  { maxPerMonth: 1000, monthlyRate: 900   },
  { maxPerMonth: 1125, monthlyRate: 1013  },
  { maxPerMonth: 1250, monthlyRate: 1125  },
  { maxPerMonth: 1375, monthlyRate: 1238  },
  { maxPerMonth: 1500, monthlyRate: 1350  },
  { maxPerMonth: 1750, monthlyRate: 1575  },
  { maxPerMonth: 2000, monthlyRate: 1800  },
  { maxPerMonth: 2250, monthlyRate: 2025  },
  { maxPerMonth: 2500, monthlyRate: 2250  },
  { maxPerMonth: 3000, monthlyRate: 2700  },
  { maxPerMonth: 3500, monthlyRate: 3150  },
  { maxPerMonth: 4000, monthlyRate: 3600  },
  { maxPerMonth: 5000, monthlyRate: 4500  },
  { maxPerMonth: 6000, monthlyRate: 5400  },
  { maxPerMonth: 7000, monthlyRate: 6300  },
]

interface TierInfo { tierNum: number; monthlyRate: number; arr: number; includedPerMonth: number }

export function lookupAiTier(interactionsPerMonth: number, billing: AiBilling): TierInfo {
  if (billing === 'monthly') {
    // Monthly: $1.00/interaction, no tiered subscription — pay what you use
    const monthlyRate = Math.ceil(interactionsPerMonth) * 1.00
    return { tierNum: 0, monthlyRate, arr: monthlyRate * 12, includedPerMonth: Math.ceil(interactionsPerMonth) }
  }
  // Annual: find the lowest tier that covers the volume
  const tier = YEARLY_TIERS.find(t => t.maxPerMonth >= interactionsPerMonth)
  if (tier) {
    const idx = YEARLY_TIERS.indexOf(tier)
    return { tierNum: idx + 1, monthlyRate: tier.monthlyRate, arr: tier.monthlyRate * 12, includedPerMonth: tier.maxPerMonth }
  }
  // Beyond tier 35 (7,000/mo) — extrapolate at $0.90/interaction
  const monthlyRate = Math.round(interactionsPerMonth * 0.90)
  return { tierNum: 36, monthlyRate, arr: monthlyRate * 12, includedPerMonth: Math.round(interactionsPerMonth) }
}

export interface AiAgentRoiState {
  tickets: number
  setTickets: (v: number) => void
  autoRate: number
  setAutoRate: (v: number) => void
  agents: number
  setAgents: (v: number) => void
  salary: number
  setSalary: (v: number) => void
  handleTime: number
  setHandleTime: (v: number) => void
  billing: AiBilling
  setBilling: (v: AiBilling) => void

  // derived
  ticketsAutoPerMonth: number
  ticketsAutoYearly: number
  agentCostPerTicket: number
  humanCostForAutoYearly: number
  aiFeesYearly: number
  netSavings: number
  roiMult: string
  agentHoursFreedYearly: number
  agentFteEquivalent: string
  pctCostReduction: number
  costPerInteraction: number
  tierInfo: TierInfo
}

export function useAiAgentRoi(): AiAgentRoiState {
  const [tickets,    setTickets]    = useState(4000)
  const [autoRate,   setAutoRate]   = useState(0.30)
  const [agents,     setAgents]     = useState(6)
  const [salary,     setSalary]     = useState(52000)
  const [handleTime, setHandleTime] = useState(8)
  const [billing,    setBilling]    = useState<AiBilling>('yearly')

  // ── Volumes ───────────────────────────────────────────────────────────────
  const ticketsAutoPerMonth = tickets * autoRate
  const ticketsAutoYearly   = ticketsAutoPerMonth * 12

  // ── Human cost baseline ───────────────────────────────────────────────────
  const totalTicketsYearly     = tickets * 12
  const agentCostPerTicket     = totalTicketsYearly > 0 ? (agents * salary) / totalTicketsYearly : 0
  const humanCostForAutoYearly = ticketsAutoYearly * agentCostPerTicket

  // ── AI Agent cost — subscription tier based ───────────────────────────────
  const tierInfo         = lookupAiTier(ticketsAutoPerMonth, billing)
  const aiFeesYearly     = tierInfo.arr
  const cpi              = COST_PER_INTERACTION[billing]

  // ── Savings ───────────────────────────────────────────────────────────────
  const netSavings       = Math.max(0, humanCostForAutoYearly - aiFeesYearly)
  const roiMult          = aiFeesYearly > 0 ? (netSavings / aiFeesYearly).toFixed(1) : '0'
  const pctCostReduction = humanCostForAutoYearly > 0
    ? Math.round((netSavings / humanCostForAutoYearly) * 100) : 0

  // ── Agent capacity ────────────────────────────────────────────────────────
  const agentHoursFreedYearly = ticketsAutoYearly * (handleTime / 60)
  const agentFteEquivalent    = (agentHoursFreedYearly / 2000).toFixed(1)

  return {
    tickets, setTickets,
    autoRate, setAutoRate,
    agents, setAgents,
    salary, setSalary,
    handleTime, setHandleTime,
    billing, setBilling,
    ticketsAutoPerMonth, ticketsAutoYearly,
    agentCostPerTicket, humanCostForAutoYearly,
    aiFeesYearly, netSavings, roiMult,
    agentHoursFreedYearly, agentFteEquivalent, pctCostReduction,
    costPerInteraction: cpi,
    tierInfo,
  }
}
