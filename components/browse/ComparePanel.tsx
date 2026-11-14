'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

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

const labelTier: Record<string, number> = {
  'Strong': 5, 'Achieved': 5, 'Low': 5, 'High': 5,
  'Moderate': 4, 'Improving': 4, 'Near Break-even': 4,
  'High Variance': 3, 'Uncertain': 3,
  'Stretched': 2, 'Weak': 2, 'Limited': 2,
  'Critical': 1, 'Loss-Deepening': 1, 'Declining': 1,
}

const verdictConfig = {
  solid:   { label: 'Solid',   bar: 'bg-green-500',  badge: 'bg-green-50 border-green-200 text-green-700'  },
  watch:   { label: 'Watch',   bar: 'bg-amber-400',  badge: 'bg-amber-50 border-amber-200 text-amber-700'  },
  caution: { label: 'Caution', bar: 'bg-red-500',    badge: 'bg-red-50 border-red-200 text-red-700'        },
}

const dimensions: { key: keyof NonNullable<ArticleMeta['employerScore']>; label: string; sub: string }[] = [
  { key: 'growthMomentum',    label: 'Growth Momentum',    sub: 'Revenue growth, operating quality' },
  { key: 'stability',         label: 'Stability',          sub: 'Cash, burn rate, debt structure'   },
  { key: 'profitability',     label: 'Profitability',      sub: 'PAT direction, margin trend'       },
  { key: 'fundingDependence', label: 'Funding Dependence', sub: 'Equity vs revenue-funded ops'      },
  { key: 'careerUpside',      label: 'Career Upside',      sub: 'Growth + payroll + ESOP signals'   },
]

function LabelChip({ value, highlight }: { value: string; highlight?: 'better' | 'worse' | 'equal' }) {
  const cls = labelStyle[value] ?? 'bg-gray-100 text-gray-500 border-gray-200'
  return (
    <span className={`border rounded-full px-2.5 py-0.5 font-sans text-[11px] font-bold tracking-wide uppercase ${cls} ${
      highlight === 'better' ? 'ring-2 ring-offset-1 ring-black/20' : ''
    }`}>
      {value}
    </span>
  )
}

function CompanyPicker({
  companies,
  selected,
  other,
  onChange,
  label,
}: {
  companies: ArticleMeta[]
  selected: string
  other: string
  onChange: (slug: string) => void
  label: string
}) {
  return (
    <div>
      <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">{label}</p>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full font-sans text-sm text-black border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors bg-white appearance-none cursor-pointer"
      >
        <option value="">Select a company…</option>
        {companies.map((c) => (
          <option key={c.slug} value={c.slug} disabled={c.slug === other}>
            {c.company} ({verdictConfig[c.employerScore!.verdict].label})
          </option>
        ))}
      </select>
    </div>
  )
}

interface Props {
  companies: ArticleMeta[]
}

export default function ComparePanel({ companies }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [slugA, setSlugA] = useState(searchParams.get('a') ?? '')
  const [slugB, setSlugB] = useState(searchParams.get('b') ?? '')
  const [copied, setCopied] = useState(false)

  const companyA = companies.find((c) => c.slug === slugA)
  const companyB = companies.find((c) => c.slug === slugB)

  useEffect(() => {
    const params = new URLSearchParams()
    if (slugA) params.set('a', slugA)
    if (slugB) params.set('b', slugB)
    const qs = params.toString()
    router.replace(qs ? `/compare?${qs}` : '/compare', { scroll: false })
  }, [slugA, slugB, router])

  function swap() {
    setSlugA(slugB)
    setSlugB(slugA)
  }

  function shareUrl() {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }

  function handleShare() {
    const url = shareUrl()
    if (typeof navigator.share !== 'undefined') {
      navigator.share({ title: `${companyA?.company} vs ${companyB?.company}, Employer Check`, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const bothSelected = !!companyA && !!companyB

  return (
    <div>
      {/* Pickers */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6 items-end">
        <CompanyPicker
          companies={companies}
          selected={slugA}
          other={slugB}
          onChange={setSlugA}
          label="Company A"
        />
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <CompanyPicker
              companies={companies}
              selected={slugB}
              other={slugA}
              onChange={setSlugB}
              label="Company B"
            />
          </div>
          <button
            onClick={swap}
            disabled={!slugA && !slugB}
            title="Swap companies"
            className="mb-px flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-200 rounded-xl text-gray-400 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 transition-all"
          >
            ⇄
          </button>
        </div>
      </div>

      {/* Prompt if nothing selected */}
      {!slugA && !slugB && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="font-serif text-black text-xl font-bold mb-2">Pick two companies to compare</p>
          <p className="font-sans text-gray-400 text-sm">
            Or{' '}
            <Link href="/employer-check" className="text-brand-red font-semibold hover:underline">
              browse all companies →
            </Link>
          </p>
        </div>
      )}

      {/* Partial selection */}
      {(slugA || slugB) && !bothSelected && (
        <div className="text-center py-10 border border-dashed border-gray-200 rounded-xl">
          <p className="font-sans text-gray-400 text-sm">Now pick a second company to see the comparison.</p>
        </div>
      )}

      {/* Full comparison */}
      {bothSelected && (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-black">
            <div className="px-5 py-4 border-r border-white/10">
              <p className="font-sans text-white/40 text-[10px] uppercase tracking-widest mb-1">Company A</p>
              <p className="font-serif text-white text-lg font-bold leading-snug">{companyA.company}</p>
              <p className="font-sans text-white/30 text-[10px] mt-1">{companyA.dataSource}</p>
            </div>
            <div className="px-5 py-4 flex items-center justify-center">
              <span className="font-sans text-white/20 text-3xl font-light">vs</span>
            </div>
            <div className="px-5 py-4 border-l border-white/10 text-right">
              <p className="font-sans text-white/40 text-[10px] uppercase tracking-widest mb-1">Company B</p>
              <p className="font-serif text-white text-lg font-bold leading-snug">{companyB.company}</p>
              <p className="font-sans text-white/30 text-[10px] mt-1">{companyB.dataSource}</p>
            </div>
          </div>

          {/* Verdict row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-gray-100 bg-gray-50">
            <div className="px-5 py-3 flex items-center">
              <span className={`border rounded-full px-3 py-1 font-sans text-[10px] font-bold tracking-wider uppercase ${verdictConfig[companyA.employerScore!.verdict].badge}`}>
                {verdictConfig[companyA.employerScore!.verdict].label}
              </span>
            </div>
            <div className="px-5 py-3 flex items-center justify-center">
              <span className="font-sans text-gray-400 text-[10px] uppercase tracking-widest">Overall</span>
            </div>
            <div className="px-5 py-3 flex items-center justify-end">
              <span className={`border rounded-full px-3 py-1 font-sans text-[10px] font-bold tracking-wider uppercase ${verdictConfig[companyB.employerScore!.verdict].badge}`}>
                {verdictConfig[companyB.employerScore!.verdict].label}
              </span>
            </div>
          </div>

          {/* Dimension rows */}
          {dimensions.map(({ key, label, sub }) => {
            const vA = companyA.employerScore![key] as string
            const vB = companyB.employerScore![key] as string
            const tA = labelTier[vA] ?? 3
            const tB = labelTier[vB] ?? 3
            const highlightA = tA > tB ? 'better' : tA < tB ? 'worse' : 'equal'
            const highlightB = tB > tA ? 'better' : tB < tA ? 'worse' : 'equal'

            return (
              <div
                key={key}
                className="grid grid-cols-[1fr_1fr_1fr] border-b border-gray-100 last:border-0 divide-x divide-gray-100"
              >
                <div className="px-5 py-3.5 flex items-center">
                  <LabelChip value={vA} highlight={highlightA} />
                </div>
                <div className="px-4 py-3.5 flex flex-col items-center justify-center text-center">
                  <p className="font-sans text-xs font-semibold text-black">{label}</p>
                  <p className="font-sans text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
                <div className="px-5 py-3.5 flex items-center justify-end">
                  <LabelChip value={vB} highlight={highlightB} />
                </div>
              </div>
            )
          })}

          {/* Notes row */}
          <div className="grid grid-cols-2 divide-x divide-gray-100 bg-gray-50 border-t border-gray-200">
            <div className="px-5 py-4">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Notes</p>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">{companyA.employerScore!.notes}</p>
            </div>
            <div className="px-5 py-4">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Notes</p>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">{companyB.employerScore!.notes}</p>
            </div>
          </div>

          {/* Action row */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3.5 border-t border-gray-100 bg-white gap-4">
            <Link
              href={`/${companyA.slug}#employer`}
              className="font-sans text-brand-red text-xs font-semibold hover:underline"
            >
              {companyA.company} full filing →
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 font-sans text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              {copied ? (
                <span className="text-green-700 font-semibold">Copied link!</span>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share comparison
                </>
              )}
            </button>
            <Link
              href={`/${companyB.slug}#employer`}
              className="font-sans text-brand-red text-xs font-semibold hover:underline text-right"
            >
              {companyB.company} full filing →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
