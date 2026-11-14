'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ArticleMeta } from '@/lib/articles'
import { formatDisplayDate } from '@/lib/date-utils'

const labelStyle: Record<string, string> = {
  'Strong':          'bg-green-100 text-green-700 border-green-200',
  'Achieved':        'bg-green-100 text-green-700 border-green-200',
  'Low':             'bg-green-100 text-green-700 border-green-200',
  'High':            'bg-green-100 text-green-700 border-green-200',
  'Moderate':        'bg-amber-50 text-amber-700 border-amber-200',
  'Improving':       'bg-amber-50 text-amber-700 border-amber-200',
  'Near Break-even': 'bg-amber-50 text-amber-700 border-amber-200',
  'High Variance':   'bg-amber-50 text-amber-700 border-amber-200',
  'Stretched':       'bg-orange-50 text-orange-700 border-orange-200',
  'Weak':            'bg-orange-50 text-orange-700 border-orange-200',
  'Limited':         'bg-orange-50 text-orange-700 border-orange-200',
  'Critical':        'bg-red-50 text-red-700 border-red-200',
  'Loss-Deepening':  'bg-red-50 text-red-700 border-red-200',
  'Declining':       'bg-red-50 text-red-700 border-red-200',
  'Uncertain':       'bg-gray-100 text-gray-500 border-gray-200',
}

const verdictConfig = {
  solid:   { label: 'Solid',   bar: 'bg-green-500',  badge: 'bg-green-50 border-green-200 text-green-700'  },
  watch:   { label: 'Watch',   bar: 'bg-amber-400',  badge: 'bg-amber-50 border-amber-200 text-amber-700'  },
  caution: { label: 'Caution', bar: 'bg-red-500',    badge: 'bg-red-50 border-red-200 text-red-700'        },
}

const dimensions: { key: keyof NonNullable<ArticleMeta['employerScore']>; label: string }[] = [
  { key: 'growthMomentum',    label: 'Growth Momentum'    },
  { key: 'stability',         label: 'Stability'          },
  { key: 'profitability',     label: 'Profitability'      },
  { key: 'fundingDependence', label: 'Funding Dependence' },
  { key: 'careerUpside',      label: 'Career Upside'      },
]

function LabelChip({ value }: { value: string }) {
  const cls = labelStyle[value] ?? 'bg-gray-100 text-gray-500 border-gray-200'
  return (
    <span className={`border rounded-full px-2 py-0.5 font-sans text-[10px] font-bold tracking-wide uppercase ${cls}`}>
      {value}
    </span>
  )
}

function ShareIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  )
}

function CompanyCard({
  article,
  selected,
  onToggleSelect,
  copied,
  onShare,
}: {
  article: ArticleMeta
  selected: boolean
  onToggleSelect: () => void
  copied: boolean
  onShare: () => void
}) {
  const es = article.employerScore!
  const vc = verdictConfig[es.verdict]

  return (
    <div className={`border rounded-xl overflow-hidden bg-white hover:shadow-md transition-all ${
      selected ? 'border-black ring-2 ring-black ring-offset-1' : 'border-gray-100 hover:border-gray-200'
    }`}>
      <div className={`h-1 ${vc.bar}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-1">
          <p className="font-serif text-black text-lg font-bold leading-snug">{article.company}</p>
          <span className={`flex-shrink-0 border rounded-full px-2.5 py-0.5 font-sans text-[10px] font-bold tracking-wider uppercase ${vc.badge}`}>
            {vc.label}
          </span>
        </div>
        <p className="font-sans text-[11px] text-gray-400 mb-4">
          Based on {article.dataSource} · Updated {formatDisplayDate(article.updatedAt)}
        </p>

        <div className="space-y-2 mb-4">
          {dimensions.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between gap-2">
              <span className="font-sans text-xs text-gray-500 flex-shrink-0 w-32">{label}</span>
              <LabelChip value={es[key] as string} />
            </div>
          ))}
        </div>

        <p className="font-sans text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 mb-4">
          {es.notes}
        </p>

        <div className="flex items-center justify-between gap-2">
          <Link href={`/${article.slug}#employer`} className="font-sans text-brand-red text-xs font-semibold hover:underline">
            Full filing →
          </Link>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onShare}
              title="Copy summary card"
              className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copied
                ? <span className="font-sans text-green-700 font-semibold text-[11px]">Copied!</span>
                : <ShareIcon />
              }
            </button>
            <button
              onClick={onToggleSelect}
              className={`font-sans text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                selected
                  ? 'bg-black text-white border-black'
                  : 'text-gray-400 border-gray-200 hover:border-gray-500 hover:text-gray-700'
              }`}
            >
              {selected ? '✓ vs' : '+ vs'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`font-sans text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
        active
          ? 'bg-black text-white border-black'
          : 'text-gray-500 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  )
}

interface Props {
  companies: ArticleMeta[]
}

export default function EmployerSearchGrid({ companies }: Props) {
  const router = useRouter()
  const [query, setQuery]             = useState('')
  const [verdictFilter, setVerdict]   = useState<'all' | 'solid' | 'watch' | 'caution'>('all')
  const [quickFilter, setQuick]       = useState<'all' | 'safest' | 'highest-upside'>('all')
  const [sectorFilter, setSector]     = useState<string>('all')
  const [compareList, setCompareList] = useState<string[]>([])
  const [copiedSlug, setCopiedSlug]   = useState<string | null>(null)

  const sectors = useMemo(() => {
    const seen: Record<string, true> = {}
    companies.forEach((a) => { seen[a.sector.split('/')[0].trim()] = true })
    return Object.keys(seen).sort()
  }, [companies])

  const filtered = useMemo(() => {
    let r = companies
    const q = query.trim().toLowerCase()
    if (q) r = r.filter((a) =>
      a.company.toLowerCase().includes(q) || a.sector.toLowerCase().includes(q)
    )
    if (verdictFilter !== 'all') r = r.filter((a) => a.employerScore!.verdict === verdictFilter)
    if (quickFilter === 'safest')         r = r.filter((a) => a.employerScore!.stability === 'Strong')
    if (quickFilter === 'highest-upside') r = r.filter((a) => a.employerScore!.careerUpside === 'High')
    if (sectorFilter !== 'all') r = r.filter((a) => a.sector.split('/')[0].trim() === sectorFilter)
    return r
  }, [companies, query, verdictFilter, quickFilter, sectorFilter])

  const isFiltering = query.trim().length > 0
    || verdictFilter !== 'all'
    || quickFilter !== 'all'
    || sectorFilter !== 'all'

  const solid   = filtered.filter((a) => a.employerScore!.verdict === 'solid')
  const watch   = filtered.filter((a) => a.employerScore!.verdict === 'watch')
  const caution = filtered.filter((a) => a.employerScore!.verdict === 'caution')

  function toggleCompare(slug: string) {
    setCompareList((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev.slice(-1), slug]
    )
  }

  function handleShare(article: ArticleMeta) {
    const es = article.employerScore!
    const verdict = verdictConfig[es.verdict].label.toUpperCase()
    const text = [
      `${article.company} Employer Check: ${verdict}`,
      ``,
      `Growth Momentum:    ${es.growthMomentum}`,
      `Stability:          ${es.stability}`,
      `Profitability:      ${es.profitability}`,
      `Funding Dependence: ${es.fundingDependence}`,
      `Career Upside:      ${es.careerUpside}`,
      ``,
      `Based on ${article.dataSource}`,
      `https://unpopularvoice.com/${article.slug}#employer`,
    ].join('\n')

    const url = `https://unpopularvoice.com/${article.slug}#employer`
    if (typeof navigator.share !== 'undefined') {
      navigator.share({ title: `${article.company} Employer Check`, text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).catch(() => {})
    }
    setCopiedSlug(article.slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  function clearFilters() {
    setQuery('')
    setVerdict('all')
    setQuick('all')
    setSector('all')
  }

  function renderGrid(items: ArticleMeta[]) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((a) => (
          <CompanyCard
            key={a.slug}
            article={a}
            selected={compareList.includes(a.slug)}
            onToggleSelect={() => toggleCompare(a.slug)}
            copied={copiedSlug === a.slug}
            onShare={() => handleShare(a)}
          />
        ))}
      </div>
    )
  }

  const compareCompanies = compareList
    .map((s) => companies.find((c) => c.slug === s))
    .filter(Boolean) as ArticleMeta[]

  return (
    <div>
      {/* Search */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a company before joining..."
          className="w-full pl-11 pr-4 py-4 font-sans text-base text-black placeholder-gray-400 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors bg-white"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
          >✕</button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <FilterChip active={verdictFilter === 'all' && quickFilter === 'all' && sectorFilter === 'all'} onClick={clearFilters}>
          All
        </FilterChip>

        <div className="w-px h-4 bg-gray-200 mx-0.5" />

        <FilterChip active={verdictFilter === 'solid'} onClick={() => setVerdict(verdictFilter === 'solid' ? 'all' : 'solid')}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 align-middle" />Solid
        </FilterChip>
        <FilterChip active={verdictFilter === 'watch'} onClick={() => setVerdict(verdictFilter === 'watch' ? 'all' : 'watch')}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 align-middle" />Watch
        </FilterChip>
        <FilterChip active={verdictFilter === 'caution'} onClick={() => setVerdict(verdictFilter === 'caution' ? 'all' : 'caution')}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 align-middle" />Caution
        </FilterChip>

        <div className="w-px h-4 bg-gray-200 mx-0.5" />

        <FilterChip active={quickFilter === 'safest'} onClick={() => setQuick(quickFilter === 'safest' ? 'all' : 'safest')}>
          Safest
        </FilterChip>
        <FilterChip active={quickFilter === 'highest-upside'} onClick={() => setQuick(quickFilter === 'highest-upside' ? 'all' : 'highest-upside')}>
          Highest Upside
        </FilterChip>

        {sectors.length > 1 && (
          <>
            <div className="w-px h-4 bg-gray-200 mx-0.5" />
            {sectors.map((sec) => (
              <FilterChip key={sec} active={sectorFilter === sec} onClick={() => setSector(sectorFilter === sec ? 'all' : sec)}>
                {sec}
              </FilterChip>
            ))}
          </>
        )}
      </div>

      {/* No results */}
      {isFiltering && filtered.length === 0 && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="font-serif text-black text-2xl font-bold mb-2">No companies match.</p>
          <p className="font-sans text-gray-500 text-sm mb-6">
            Try adjusting the filters or{' '}
            <button onClick={clearFilters} className="text-brand-red font-semibold hover:underline">
              clear all
            </button>.
          </p>
          {query.trim() && (
            <>
              <p className="font-sans text-gray-400 text-xs mb-4">
                We haven&apos;t analysed &ldquo;{query}&rdquo; yet.
              </p>
              <Link
                href="/subscribe"
                className="inline-block bg-brand-red text-white font-sans font-semibold text-sm px-5 py-2.5 rounded hover:bg-red-800 transition-colors"
              >
                Get notified →
              </Link>
            </>
          )}
        </div>
      )}

      {/* Filtered: flat results */}
      {isFiltering && filtered.length > 0 && (
        <div>
          <p className="font-sans text-gray-400 text-sm mb-5">
            {filtered.length} {filtered.length === 1 ? 'company' : 'companies'}
            {verdictFilter !== 'all' && ` · ${verdictConfig[verdictFilter].label}`}
            {quickFilter === 'safest' && ' · Safest'}
            {quickFilter === 'highest-upside' && ' · Highest Upside'}
            {sectorFilter !== 'all' && ` · ${sectorFilter}`}
            {query.trim() && ` matching "${query}"`}
          </p>
          {renderGrid(filtered)}
        </div>
      )}

      {/* Default: grouped by verdict */}
      {!isFiltering && (
        <div className="space-y-14">
          {solid.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                <h2 className="font-serif text-black text-2xl font-bold">Solid Financial Footing</h2>
                <span className="font-sans text-gray-400 text-sm hidden sm:block">, strong signals from the filing</span>
              </div>
              {renderGrid(solid)}
            </div>
          )}
          {watch.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0" />
                <h2 className="font-serif text-black text-2xl font-bold">Worth Watching</h2>
                <span className="font-sans text-gray-400 text-sm hidden sm:block">, mixed signals; read the notes carefully</span>
              </div>
              {renderGrid(watch)}
            </div>
          )}
          {caution.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
                <h2 className="font-serif text-black text-2xl font-bold">Proceed with Caution</h2>
                <span className="font-sans text-gray-400 text-sm hidden sm:block">, financial risk flags in the filing</span>
              </div>
              {renderGrid(caution)}
            </div>
          )}
        </div>
      )}

      {/* Floating compare bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black text-white pl-5 pr-4 py-3 rounded-2xl shadow-2xl border border-white/10">
          <div className="flex items-center gap-1.5 font-sans text-sm">
            {compareCompanies.map((c, i) => (
              <span key={c.slug} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/30 font-normal mx-1">vs</span>}
                <span className="font-semibold">{c.company}</span>
              </span>
            ))}
            {compareList.length === 1 && (
              <span className="text-white/40 ml-2">+ pick one more</span>
            )}
          </div>
          {compareList.length === 2 && (
            <button
              onClick={() => router.push(`/compare?a=${compareList[0]}&b=${compareList[1]}`)}
              className="bg-brand-red text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full hover:bg-red-700 transition-colors"
            >
              Compare →
            </button>
          )}
          <button
            onClick={() => setCompareList([])}
            className="text-white/35 hover:text-white/70 font-sans text-sm leading-none ml-1"
          >✕</button>
        </div>
      )}
    </div>
  )
}
