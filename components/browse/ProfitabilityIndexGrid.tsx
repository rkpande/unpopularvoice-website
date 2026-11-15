'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { categorizeProfitability, getFinancials, type ProfitCategory } from '@/lib/financials'

const categoryConfig: Record<ProfitCategory, {
  label: string
  short: string
  bg: string
  text: string
  border: string
  ring: string
  accent: string
  description: string
  emoji: string
}> = {
  profitable: {
    label: 'Profitable',
    short: 'Making money',
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'bg-green-500',
    accent: 'bg-green-500',
    description: 'PAT positive in the audited filing',
    emoji: '✓',
  },
  improving: {
    label: 'Loss narrowing',
    short: 'Heading toward profit',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    ring: 'bg-amber-500',
    accent: 'bg-amber-500',
    description: 'Loss after tax narrower than the prior year',
    emoji: '↑',
  },
  worsening: {
    label: 'Loss widening',
    short: 'Moving away from profit',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    ring: 'bg-orange-500',
    accent: 'bg-orange-500',
    description: 'Loss after tax wider than the prior year',
    emoji: '↓',
  },
}

// ── Card numbers: the explicit `financials` block, never parsed prose ─────────

const fmtCr = (cr: number) => {
  const abs = Math.abs(cr)
  return abs >= 1
    ? `₹${abs.toLocaleString('en-IN', { maximumFractionDigits: abs < 100 ? 1 : 0 })} Cr`
    : `₹${(abs * 100).toFixed(0)} Lakh`
}

function cardNumbers(a: ArticleMeta) {
  const f = getFinancials(a)
  if (!f) return {}
  const label = `${f.period} ${f.basis}`
  return {
    primary: f.revenueCr != null ? { value: fmtCr(f.revenueCr), label: `Revenue, ${label}` } : undefined,
    secondary:
      f.patCr != null
        ? { value: `${f.patCr < 0 ? '-' : '+'}${fmtCr(f.patCr)}`, label: f.patCr < 0 ? 'Loss after tax' : 'Profit after tax' }
        : undefined,
  }
}

// ── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({ active, onClick, children, count }: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  count?: number
}) {
  return (
    <button
      onClick={onClick}
      className={`font-sans text-sm sm:text-xs px-4 py-2.5 sm:py-2 min-h-[40px] rounded-full border transition-all whitespace-nowrap ${
        active
          ? 'bg-black text-white border-black'
          : 'text-gray-600 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-700'
      }`}
    >
      {children}
      {typeof count === 'number' && (
        <span className={`ml-1.5 ${active ? 'text-white/60' : 'text-gray-500'}`}>{count}</span>
      )}
    </button>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────

function Card({ article }: { article: ArticleMeta }) {
  const category = categorizeProfitability(article)
  const cfg = categoryConfig[category]
  const { primary, secondary } = cardNumbers(article)
  const sector = article.sector?.split('/')[0]?.trim() || 'Sector'

  return (
    <Link
      href={`/${article.slug}`}
      className={`group block bg-white border ${cfg.border} rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all`}
    >
      {/* Top accent bar */}
      <div className={`h-1 ${cfg.accent}`} />

      {/* Body */}
      <div className="p-5">
        {/* Category pill + sector */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-1.5 ${cfg.bg} ${cfg.text} font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cfg.border}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.ring}`} />
            {cfg.label}
          </div>
          <span className="font-sans text-[10px] text-gray-500 uppercase tracking-widest truncate max-w-[40%] text-right">
            {sector}
          </span>
        </div>

        {/* Company name */}
        <h3 className="font-serif text-black text-xl font-bold leading-tight mb-1 group-hover:text-brand-red transition-colors">
          {article.company}
        </h3>
        <p className="font-sans text-gray-500 text-xs mb-5 leading-snug line-clamp-2">
          {cfg.description}
        </p>

        {/* Two key numbers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {primary && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-serif text-black text-xl font-bold leading-none mb-1">{primary.value}</p>
              <p className="font-sans text-gray-500 text-[10px] uppercase tracking-wider line-clamp-2 leading-tight">{primary.label}</p>
            </div>
          )}
          {secondary && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className={`font-serif text-xl font-bold leading-none mb-1 ${
                /^[-−]/.test(secondary.value) ? 'text-red-600' : /^\+/.test(secondary.value) ? 'text-green-700' : 'text-black'
              }`}>{secondary.value}</p>
              <p className="font-sans text-gray-500 text-[10px] uppercase tracking-wider line-clamp-2 leading-tight">{secondary.label}</p>
            </div>
          )}
        </div>

        {/* Read indicator */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="font-sans text-gray-500 text-xs">{getFinancials(article)?.period ?? 'Latest'} audited</span>
          <span className="font-sans text-brand-red text-xs font-semibold group-hover:underline">Read analysis <span aria-hidden="true">→</span></span>
        </div>
      </div>
    </Link>
  )
}

// ── Main grid ────────────────────────────────────────────────────────────────

export default function ProfitabilityIndexGrid({ companies }: { companies: ArticleMeta[] }) {
  const [filter, setFilter] = useState<'all' | ProfitCategory>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'recent' | 'name'>('recent')

  const counts = useMemo(() => {
    const c: Record<ProfitCategory, number> = { profitable: 0, improving: 0, worsening: 0 }
    for (const co of companies) c[categorizeProfitability(co)] += 1
    return c
  }, [companies])

  const filtered = useMemo(() => {
    let list = companies
    if (filter !== 'all') list = list.filter((c) => categorizeProfitability(c) === filter)
    if (search.trim()) {
      const s = search.trim().toLowerCase()
      list = list.filter(
        (c) =>
          c.company.toLowerCase().includes(s) ||
          c.sector?.toLowerCase().includes(s) ||
          c.title?.toLowerCase().includes(s)
      )
    }
    if (sort === 'name') {
      list = [...list].sort((a, b) => a.company.localeCompare(b.company))
    } else {
      list = [...list].sort((a, b) => {
        const ad = new Date(a.updatedAt).getTime()
        const bd = new Date(b.updatedAt).getTime()
        return bd - ad
      })
    }
    // Re-order: profitable first when "all" is selected
    if (filter === 'all') {
      const order: ProfitCategory[] = ['profitable', 'improving', 'worsening']
      list = [...list].sort(
        (a, b) => order.indexOf(categorizeProfitability(a)) - order.indexOf(categorizeProfitability(b))
      )
    }
    return list
  }, [companies, filter, search, sort])

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-black text-2xl font-bold">The full index</h2>
          <span className="font-sans text-gray-500 text-xs">
            Showing {filtered.length} of {companies.length} companies
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} count={companies.length}>All</FilterChip>
          <FilterChip active={filter === 'profitable'} onClick={() => setFilter('profitable')} count={counts.profitable}>
            ✓ Profitable
          </FilterChip>
          <FilterChip active={filter === 'improving'} onClick={() => setFilter('improving')} count={counts.improving}>
            ↑ Loss narrowing
          </FilterChip>
          <FilterChip active={filter === 'worsening'} onClick={() => setFilter('worsening')} count={counts.worsening}>
            ↓ Loss widening
          </FilterChip>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search company or sector…"
            aria-label="Search company or sector"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 min-h-[44px] font-sans text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
          />
          <select
            aria-label="Sort companies"
            value={sort}
            onChange={(e) => setSort(e.target.value as 'recent' | 'name')}
            className="px-4 py-3 min-h-[44px] font-sans text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red bg-white"
          >
            <option value="recent">Sort: Recently updated</option>
            <option value="name">Sort: Company name (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-gray-100 rounded-xl bg-gray-50">
          <p className="font-sans text-gray-500 text-sm">No companies match this filter.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article) => (
            <Card key={article.slug} article={article} />
          ))}
        </div>
      )}

      {/* Per-category disclaimers */}
      <div className="mt-12 space-y-3">
        <h3 className="font-serif text-black text-lg font-bold">Caveats by category</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-sans font-bold text-green-800 text-xs tracking-widest uppercase mb-2">Profitable: read carefully</p>
            <p className="font-sans text-green-700 text-xs leading-relaxed">
              A positive PAT can be inflated by deferred tax asset (DTA) recognition or one-time gains. Where this happens we
              flag it inside the article. The highest-confidence read is PAT supported by current cash tax paid.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-sans font-bold text-amber-800 text-xs tracking-widest uppercase mb-2">Loss narrowing: distinguish driver</p>
            <p className="font-sans text-amber-700 text-xs leading-relaxed">
              Loss compression from revenue scale (operating leverage) is structurally different from loss compression
              from cost cuts. The article specifies which lever is dominant.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="font-sans font-bold text-orange-800 text-xs tracking-widest uppercase mb-2">Loss deepening: not always alarming</p>
            <p className="font-sans text-orange-700 text-xs leading-relaxed">
              Some loss-deepening companies are deliberately scaling investment ahead of revenue (e.g. an NBFC growing its
              loan book). Look for OCF, borrowings, and credit-cost trajectory in the article.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-sans font-bold text-red-800 text-xs tracking-widest uppercase mb-2">Survival mode: time-bound</p>
            <p className="font-sans text-red-700 text-xs leading-relaxed">
              Runway is calculated at the most recent year-end. A new funding round resets it. A pivot or wind-up can
              change the trajectory in either direction. Treat it as a flag, not a forecast.
            </p>
          </div>
        </div>
      </div>

      {/* Data source notes */}
      <div className="mt-8 bg-gray-50 border border-gray-100 rounded-lg p-5">
        <p className="font-sans font-bold text-black text-sm mb-2">How to read this index</p>
        <ul className="font-sans text-gray-600 text-xs leading-relaxed space-y-1.5 list-disc pl-4">
          <li>All numbers are from the latest available audited annual financial statements at the legal entity that operates the brand.</li>
          <li>Where a brand operates through both a parent and subsidiary, the article specifies which entity the numbers cover.</li>
          <li>FY2025 covers the year ending March 31, 2025. Filings typically arrive 6&ndash;15 months after the year-end.</li>
          <li>Categories reflect the most recent year only. Multi-year trajectory is in each article.</li>
          <li>Subscribe to be alerted when a company moves between categories at the next filing.</li>
        </ul>
      </div>
    </div>
  )
}
