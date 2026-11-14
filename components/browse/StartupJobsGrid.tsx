'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { formatDisplayDate } from '@/lib/date-utils'
import { isProfitable, bufferMonths, THIN_BUFFER_MONTHS } from '@/lib/financials'

// ── Balance-sheet buffer ────────────────────────────────────────────────────
// Net worth divided by the latest annual loss, from the `financials` block.
// A ratio from the filing, not a forecast.

type Buffer = {
  text: string; sub: string; color: string; profitable: boolean; thin: boolean; months: number | null; known: boolean
}

function bufferLabel(article: ArticleMeta): Buffer {
  if (isProfitable(article))
    return { text: 'Profitable', sub: 'profit after tax', color: 'text-green-700', profitable: true, thin: false, months: null, known: true }
  const months = bufferMonths(article)
  if (months === null)
    return { text: 'Not stated', sub: 'see the article', color: 'text-gray-500', profitable: false, thin: false, months: null, known: false }
  if (months >= 120)
    return { text: '10+ years', sub: 'net worth / annual loss', color: 'text-green-700', profitable: false, thin: false, months, known: true }
  if (months >= 36)
    return { text: `${months}mo`, sub: 'net worth / annual loss', color: 'text-green-700', profitable: false, thin: false, months, known: true }
  if (months >= 18)
    return { text: `${months}mo`, sub: 'net worth / annual loss', color: 'text-amber-600', profitable: false, thin: false, months, known: true }
  if (months >= THIN_BUFFER_MONTHS)
    return { text: `${months}mo`, sub: 'net worth / annual loss', color: 'text-orange-600', profitable: false, thin: false, months, known: true }
  return { text: `${months}mo`, sub: 'thin buffer, read the filing', color: 'text-red-600', profitable: false, thin: true, months, known: true }
}

/** Sort key: profitable first, then by buffer, unknown last. */
function bufferSortValue(a: ArticleMeta): number {
  if (isProfitable(a)) return 100000
  return bufferMonths(a) ?? -1
}

// ── Profitability trajectory ─────────────────────────────────────────────────

function profitabilityTrend(profitability: string | undefined): { text: string; color: string } | null {
  if (!profitability) return null
  const p = profitability.toLowerCase()
  if (p.includes('achieved') || p.includes('profitable') || p.includes('thin'))
    return { text: 'Profitable', color: 'text-green-700' }
  if (p.includes('narrowing') || p.includes('improving') || p.includes('near'))
    return { text: 'Improving', color: 'text-amber-600' }
  if (p.includes('deepening') || p.includes('weak'))
    return { text: 'Worsening', color: 'text-red-600' }
  return { text: 'Stable', color: 'text-gray-500' }
}

// ── Employee cost growth ─────────────────────────────────────────────────────

function empGrowthLabel(pct: number | null | undefined): { text: string; color: string } {
  if (pct === null || pct === undefined) return { text: 'N/A', color: 'text-gray-400' }
  const sign = pct >= 0 ? '+' : ''
  const color = pct >= 20 ? 'text-green-700' : pct >= 0 ? 'text-amber-600' : 'text-red-600'
  return { text: `${sign}${pct.toFixed(1)}%`, color }
}

// ── Career upside sub-text ───────────────────────────────────────────────────

const careerUpsideSub: Record<string, string> = {
  'High':          'growth + survivability align',
  'Moderate':      'growth visible, trade-offs present',
  'Limited':       'risk outweighs reward',
  'High Variance': 'high ceiling, uncertain floor',
}

// ── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode
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
    </button>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────

function JobsCard({ article }: { article: ArticleMeta }) {
  const es      = article.employerScore
  const runway  = bufferLabel(article)
  const trend   = profitabilityTrend(es?.profitability)
  const growth  = empGrowthLabel(article.employeeCostGrowthPct)
  const upside  = es?.careerUpside
  const upsideSub = upside ? (careerUpsideSub[upside] ?? '') : ''

  return (
    <div className={`border rounded-xl overflow-hidden bg-white hover:shadow-md transition-all ${
      runway.thin ? 'border-red-200 hover:border-red-300' : 'border-gray-100 hover:border-gray-200'
    }`}>
      {/* risk banner */}
      {runway.thin && (
        <div className="bg-red-600 px-4 py-1.5 flex items-center gap-2">
          <span className="text-white font-sans text-[11px] font-bold tracking-wide uppercase">
            Thin buffer, net worth covers {runway.months}mo of losses
          </span>
        </div>
      )}
      {!runway.thin && <div className={`h-1 ${runway.profitable ? 'bg-green-500' : !runway.known ? 'bg-gray-200' : (runway.months ?? 0) >= 36 ? 'bg-green-500' : 'bg-amber-400'}`} />}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <p className="font-serif text-black text-lg font-bold leading-snug">{article.company}</p>
          {es && (
            <span className={`flex-shrink-0 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5 border ${
              runway.thin
                ? 'bg-red-50 border-red-200 text-red-700'
                : runway.profitable
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}>
              {runway.profitable ? 'Profitable' : es.verdict === 'solid' ? 'Solid' : es.verdict === 'watch' ? 'Watch' : 'Caution'}
            </span>
          )}
        </div>
        <p className="font-sans text-[11px] text-gray-400 mb-4">
          {article.sector} · {formatDisplayDate(article.updatedAt)}
        </p>

        {/* Three metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="font-sans text-[9px] text-gray-400 uppercase tracking-widest mb-1">Buffer</p>
            <p className={`font-serif text-base font-bold leading-tight ${runway.color}`}>{runway.text}</p>
            <p className="font-sans text-[9px] text-gray-400 mt-0.5 leading-tight">{runway.sub}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="font-sans text-[9px] text-gray-400 uppercase tracking-widest mb-1">Profitability</p>
            <p className={`font-serif text-base font-bold leading-tight ${trend?.color ?? 'text-gray-400'}`}>
              {trend?.text ?? 'N/A'}
            </p>
            <p className="font-sans text-[9px] text-gray-400 mt-0.5 leading-tight">trajectory</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="font-sans text-[9px] text-gray-400 uppercase tracking-widest mb-1">Payroll</p>
            <p className={`font-serif text-base font-bold leading-tight ${growth.color}`}>{growth.text}</p>
            <p className="font-sans text-[9px] text-gray-400 mt-0.5 leading-tight">cost YoY</p>
          </div>
        </div>

        {/* Career upside */}
        {upside && (
          <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3 mb-3">
            <span className="font-sans text-xs text-gray-400">Career upside</span>
            <div className="text-right">
              <span className="font-sans text-xs font-semibold text-gray-700">{upside}</span>
              {upsideSub && <p className="font-sans text-[10px] text-gray-400">{upsideSub}</p>}
            </div>
          </div>
        )}

        <Link
          href={`/${article.slug}#employer`}
          className="block w-full text-center font-sans text-brand-red text-xs font-semibold hover:underline border-t border-gray-100 pt-3"
        >
          Full filing + employer breakdown →
        </Link>
      </div>
    </div>
  )
}

// ── Main grid ─────────────────────────────────────────────────────────────────

type SortKey = 'runway-desc' | 'runway-asc' | 'growth-desc' | 'recent'

interface Props { companies: ArticleMeta[] }

export default function StartupJobsGrid({ companies }: Props) {
  const [query,        setQuery]   = useState('')
  const [sectorFilter, setSector]  = useState<string>('all')
  const [sortKey,      setSortKey] = useState<SortKey>('recent')

  const sectors = useMemo(() => {
    const seen: Record<string, true> = {}
    companies.forEach((a) => { seen[a.sector.split('/')[0].trim()] = true })
    return Object.keys(seen).sort()
  }, [companies])

  const filtered = useMemo(() => {
    let r = companies
    const q = query.trim().toLowerCase()
    if (q) r = r.filter((a) => a.company.toLowerCase().includes(q) || a.sector.toLowerCase().includes(q))
    if (sectorFilter !== 'all') r = r.filter((a) => a.sector.split('/')[0].trim() === sectorFilter)

    return [...r].sort((a, b) => {
      if (sortKey === 'runway-desc') return bufferSortValue(b) - bufferSortValue(a)
      if (sortKey === 'runway-asc')  return bufferSortValue(a) - bufferSortValue(b)
      if (sortKey === 'growth-desc') return (b.employeeCostGrowthPct ?? -999) - (a.employeeCostGrowthPct ?? -999)
      return 0
    })
  }, [companies, query, sectorFilter, sortKey])

  // Group into risk tiers
  const safe     = filtered.filter((a) => isProfitable(a) || (bufferMonths(a) ?? 0) >= 36)
  const moderate = filtered.filter((a) => !isProfitable(a) && (bufferMonths(a) === null || ((bufferMonths(a) as number) >= THIN_BUFFER_MONTHS && (bufferMonths(a) as number) < 36)))
  const highRisk = filtered.filter((a) => !isProfitable(a) && bufferMonths(a) !== null && (bufferMonths(a) as number) < THIN_BUFFER_MONTHS)

  const isFiltering = query.trim().length > 0 || sectorFilter !== 'all'

  function renderGrid(items: ArticleMeta[]) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((a) => <JobsCard key={a.slug} article={a} />)}
      </div>
    )
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Check your offer before accepting it. Search a company..."
          className="w-full pl-11 pr-4 py-4 font-sans text-base text-black placeholder-gray-400 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors bg-white"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600">✕</button>
        )}
      </div>

      {/* Filters + Sort */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <FilterChip active={sectorFilter === 'all'} onClick={() => setSector('all')}>All sectors</FilterChip>
        {sectors.map((sec) => (
          <FilterChip key={sec} active={sectorFilter === sec} onClick={() => setSector(sectorFilter === sec ? 'all' : sec)}>
            {sec}
          </FilterChip>
        ))}
        <div className="w-px h-4 bg-gray-200 mx-0.5" />
        <span className="font-sans text-xs text-gray-400">Sort:</span>
        {([
          ['recent',      'Recent'],
          ['runway-desc', 'Safest first'],
          ['runway-asc',  'Riskiest first'],
          ['growth-desc', 'Highest payroll growth'],
        ] as [SortKey, string][]).map(([key, label]) => (
          <FilterChip key={key} active={sortKey === key} onClick={() => setSortKey(key)}>{label}</FilterChip>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="font-serif text-black text-2xl font-bold mb-2">No companies match.</p>
          <button onClick={() => { setQuery(''); setSector('all') }} className="font-sans text-brand-red text-sm font-semibold hover:underline">
            Clear filters
          </button>
        </div>
      )}

      {/* Grouped sections */}
      {filtered.length > 0 && (
        <div className="space-y-14">
          {highRisk.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-600 flex-shrink-0" />
                <h2 className="font-serif text-black text-2xl font-bold">Thin Buffer</h2>
                <span className="font-sans text-gray-400 text-sm hidden sm:block">net worth covers under 12 months of the latest loss</span>
              </div>
              <p className="font-sans text-xs text-red-600 mb-5 ml-6">
                A ratio at the last year-end, not a forecast. Ask about funding raised since, and read the article for parent support.
              </p>
              {renderGrid(highRisk)}
            </div>
          )}
          {moderate.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0" />
                <h2 className="font-serif text-black text-2xl font-bold">Loss-Making, Buffer in Place</h2>
                <span className="font-sans text-gray-400 text-sm hidden sm:block">net worth covers 12 to 36 months of losses, or the ratio is not stated</span>
              </div>
              <p className="font-sans text-xs text-amber-600 mb-5 ml-6">
                Still reporting a loss after tax. Reaching profit or raising capital decides the next few years.
              </p>
              {renderGrid(moderate)}
            </div>
          )}
          {safe.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                <h2 className="font-serif text-black text-2xl font-bold">Profitable or Well Buffered</h2>
                <span className="font-sans text-gray-400 text-sm hidden sm:block">profit after tax, or net worth covering 3+ years of losses</span>
              </div>
              <p className="font-sans text-xs text-green-700 mb-5 ml-6">
                The latest audited filing shows no near-term balance-sheet constraint.
              </p>
              {renderGrid(safe)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
