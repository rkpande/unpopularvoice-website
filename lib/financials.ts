import type { ArticleMeta } from './articles'

// ── The single source of truth for index pages ──────────────────────────────
//
// Index pages (Profitability Index, Jobs Index, Employer Check counts, home
// stats) read ONLY the `financials` frontmatter block. They never parse hero
// numbers or prose. An article without `financials` is not counted.
//
// One article per company carries `financials` (the primary teardown).
// Follow-up pieces (debt registers, group maps, founder comp) leave it out,
// so a company is counted exactly once. `scripts/check-financials.mjs`
// enforces that at build time.

export interface Financials {
  period: string // "FY2025"
  basis: 'consolidated' | 'standalone'
  revenueCr: number | null // revenue from operations, ₹ Cr
  patCr: number | null // profit after tax, ₹ Cr, negative = loss
  prevPatCr?: number | null // same basis, prior fiscal year
  netWorthCr?: number | null // closing equity attributable to owners, same basis
  entityCin?: string // legal entity the figures belong to
  source?: string // database source of the row (XBRL_XML, FILESURE, ...)
}

export type ProfitCategory = 'profitable' | 'improving' | 'worsening'

export function getFinancials(a: ArticleMeta): Financials | null {
  const f = a.financials
  if (!f || typeof f !== 'object') return null
  return f
}

/**
 * One article per company, for any page that lists or counts companies.
 * The primary teardown (the one carrying `financials`) wins; otherwise the
 * most recently updated article. Input order is preserved for the winners.
 */
export function onePerCompany(all: ArticleMeta[]): ArticleMeta[] {
  const best = new Map<string, ArticleMeta>()
  for (const a of all) {
    const key = (a.company || a.slug).trim().toLowerCase()
    const current = best.get(key)
    if (!current || (!getFinancials(current) && getFinancials(a))) best.set(key, a)
  }
  const winners = new Set(best.values())
  return all.filter((a) => winners.has(a))
}

/** Companies counted by the index pages: exactly one article per company. */
export function getIndexedCompanies(all: ArticleMeta[]): ArticleMeta[] {
  return all.filter((a) => getFinancials(a)?.patCr != null)
}

/** The one definition of "profitable" used everywhere: audited PAT above zero. */
export function isProfitable(a: ArticleMeta): boolean {
  const pat = getFinancials(a)?.patCr
  return pat != null && pat > 0
}

export function categorizeProfitability(a: ArticleMeta): ProfitCategory {
  const f = getFinancials(a)
  const pat = f?.patCr
  if (pat != null && pat > 0) return 'profitable'

  // Loss-making: compare with the prior year when the filing gives it.
  const prev = f?.prevPatCr
  if (pat != null && prev != null) {
    if (prev >= 0) return 'worsening' // swung from profit (or breakeven) to loss
    return Math.abs(pat) <= Math.abs(prev) ? 'improving' : 'worsening'
  }

  // Fall back to the article's own EmployerScore label.
  const p = (a.employerScore?.profitability || '').toLowerCase()
  if (p.includes('deepening') || p.includes('weak')) return 'worsening'
  return 'improving'
}

/** Swung from a loss in the prior year to a profit in the latest year. */
export function turnedProfitable(a: ArticleMeta): boolean {
  const f = getFinancials(a)
  return f?.patCr != null && f.patCr > 0 && f.prevPatCr != null && f.prevPatCr < 0
}

/**
 * Balance-sheet buffer: closing net worth divided by the latest annual loss,
 * in months. A ratio from the filing, not a forecast of when cash runs out.
 * Null when the company is profitable, when net worth is not stated, or when
 * net worth is negative (often an intercompany-funding structure, not distress;
 * the article explains which).
 */
export function bufferMonths(a: ArticleMeta): number | null {
  const f = getFinancials(a)
  if (!f || f.patCr == null || f.patCr >= 0) return null
  if (f.netWorthCr == null || f.netWorthCr <= 0) return null
  return Math.round((f.netWorthCr / Math.abs(f.patCr)) * 12)
}

export const THIN_BUFFER_MONTHS = 12

export function hasThinBuffer(a: ArticleMeta): boolean {
  const m = bufferMonths(a)
  return m != null && m < THIN_BUFFER_MONTHS
}

export function netMarginPct(a: ArticleMeta): number | null {
  const f = getFinancials(a)
  if (!f || f.patCr == null || !f.revenueCr) return null
  return (f.patCr / f.revenueCr) * 100
}

/** Snapshot counts shared by every page that quotes them, so they never disagree. */
export function indexSummary(all: ArticleMeta[]) {
  const companies = getIndexedCompanies(all)
  const counts: Record<ProfitCategory, number> = { profitable: 0, improving: 0, worsening: 0 }
  for (const c of companies) counts[categorizeProfitability(c)] += 1
  const total = companies.length
  const profitablePct = total ? Math.round((counts.profitable / total) * 100) : 0
  return {
    companies,
    total,
    counts,
    profitablePct,
    lossPct: total ? 100 - profitablePct : 0,
    thinBuffer: companies.filter(hasThinBuffer).sort((a, b) => (bufferMonths(a) ?? 0) - (bufferMonths(b) ?? 0)),
  }
}
