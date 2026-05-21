import { useState } from 'react'

export type Billing = 'monthly' | 'yearly'

interface PlanInfo { name: string; arr: number }

// Public-facing Helpdesk plans only; picks the lowest plan that covers the volume.
// Pricing verified 2026-01-28 (USD-5 price book).
function lookupPlan(ticketsPerMonth: number, billing: Billing): PlanInfo {
  if (billing === 'monthly') {
    if (ticketsPerMonth <= 50)   return { name: 'Starter',    arr: 10   * 12 }
    if (ticketsPerMonth <= 300)  return { name: 'Basic',      arr: 60   * 12 }
    if (ticketsPerMonth <= 2000) return { name: 'Pro',        arr: 360  * 12 }
    if (ticketsPerMonth <= 5000) return { name: 'Advanced',   arr: 900  * 12 }
    return                                { name: 'Enterprise', arr: 1600 * 12 }
  } else {
    // Starter not available on yearly; floor to Basic
    if (ticketsPerMonth <= 300)  return { name: 'Basic',      arr: 600   }
    if (ticketsPerMonth <= 2000) return { name: 'Pro',        arr: 3600  }
    if (ticketsPerMonth <= 5000) return { name: 'Advanced',   arr: 9000  }
    return                                { name: 'Enterprise', arr: 16000 }
  }
}

export interface HelpdeskRoiState {
  tickets: number
  setTickets: (v: number) => void
  agents: number
  setAgents: (v: number) => void
  salary: number
  setSalary: (v: number) => void
  autoRate: number          // fraction 0–1: agent efficiency gain from Gorgias Helpdesk
  setAutoRate: (v: number) => void
  tools: number
  setTools: (v: number) => void
  toolcost: number
  setToolcost: (v: number) => void
  billing: Billing
  setBilling: (v: Billing) => void
  // derived
  planName: string
  planArr: number
  currentYearly: number
  gorgiasYearly: number
  gorgiasCostPerTicket: number
  saved: number
  pct: number
  returnMult: string
}

export function useHelpdeskRoi(): HelpdeskRoiState {
  const [tickets,  setTickets]  = useState(4000)
  const [agents,   setAgents]   = useState(6)
  const [salary,   setSalary]   = useState(52000)
  const [autoRate, setAutoRate] = useState(0.30)
  const [tools,    setTools]    = useState(3)
  const [toolcost, setToolcost] = useState(200)
  const [billing,  setBilling]  = useState<Billing>('yearly')

  // ── Current stack ────────────────────────────────────────────────────────
  const currentYearly = agents * salary + tools * toolcost * 12

  // ── With Gorgias Helpdesk ─────────────────────────────────────────────────
  const { name: planName, arr: planArr } = lookupPlan(tickets, billing)
  const gorgiasAgentCostYearly = agents * salary * (1 - autoRate)
  // Tool costs drop to zero — Gorgias consolidates the replaced tools
  const gorgiasYearly = gorgiasAgentCostYearly + planArr

  // ── Derived ───────────────────────────────────────────────────────────────
  const saved               = Math.max(0, currentYearly - gorgiasYearly)
  const pct                 = currentYearly > 0 ? Math.round((saved / currentYearly) * 100) : 0
  const gorgiasCostPerTicket = tickets > 0 ? gorgiasYearly / (tickets * 12) : 0
  // How many times does the plan pay for itself
  const returnMult = planArr > 0 ? (saved / planArr).toFixed(1) : '0'

  return {
    tickets, setTickets,
    agents, setAgents,
    salary, setSalary,
    autoRate, setAutoRate,
    tools, setTools,
    toolcost, setToolcost,
    billing, setBilling,
    planName, planArr,
    currentYearly, gorgiasYearly, gorgiasCostPerTicket, saved, pct, returnMult,
  }
}
