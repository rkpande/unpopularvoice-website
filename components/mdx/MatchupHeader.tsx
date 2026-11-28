import Link from 'next/link'
import type { ArticleMeta, HeroNumber } from '@/lib/articles'

interface MatchupHeaderProps {
  metaA: ArticleMeta | null
  metaB: ArticleMeta | null
  metaC?: ArticleMeta | null
  category?: string
  stats?: [string, string, string, string][]
}

function pickStat(meta: ArticleMeta | null, predicate: (h: HeroNumber) => boolean): HeroNumber | undefined {
  if (!meta?.heroNumbers) return undefined
  return meta.heroNumbers.find(predicate)
}

const isRevenue = (h: HeroNumber) =>
  /revenue|turnover|topline/i.test(h.label) && !/operating|other income/i.test(h.label)
const isProfitOrLoss = (h: HeroNumber) =>
  /\bpat\b|profit|loss/i.test(h.label) && !/cumulative|accumulated|operating cash/i.test(h.label)

const VERDICT_META: Record<string, { label: string; chip: string; stripe: string }> = {
  solid: {
    label: 'Solid',
    chip: 'bg-green-50 text-green-700 border-green-200',
    stripe: 'bg-green-500',
  },
  watch: {
    label: 'Watch',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
    stripe: 'bg-amber-400',
  },
  caution: {
    label: 'Caution',
    chip: 'bg-red-50 text-red-700 border-red-200',
    stripe: 'bg-red-500',
  },
}

const NEUTRAL_META = { label: '-', chip: 'bg-gray-50 text-gray-600 border-gray-200', stripe: 'bg-gray-300' }

function valueTone(value: string): 'good' | 'bad' | 'neutral' {
  if (/^\+/.test(value)) return 'good'
  if (/^[-−]/.test(value)) return 'bad'
  return 'neutral'
}

function valueArrow(value: string): string | null {
  if (/^\+/.test(value)) return '▲'
  if (/^[-−]/.test(value)) return '▼'
  return null
}

const TONE_CLS: Record<'good' | 'bad' | 'neutral', string> = {
  good: 'text-green-700',
  bad: 'text-red-600',
  neutral: 'text-black',
}

const COL_LABELS = ['Company A', 'Company B', 'Company C']

function CompanyColumn({
  meta,
  index,
  total,
  compact,
  override,
}: {
  meta: ArticleMeta | null
  index: number
  total: number
  compact: boolean
  override?: [string, string, string, string]
}) {
  if (!meta) {
    return (
      <div className="p-5">
        <p className="font-sans text-gray-500 text-sm italic">Article not found.</p>
      </div>
    )
  }
  const revenue = override
    ? { label: override[0], value: override[1] }
    : pickStat(meta, isRevenue) || meta.heroNumbers?.[0]
  const profit = override
    ? { label: override[2], value: override[3] }
    : pickStat(meta, isProfitOrLoss) || meta.heroNumbers?.[1]
  const verdict = meta.employerScore?.verdict
  const v = (verdict && VERDICT_META[verdict]) || NEUTRAL_META

  const profitTone = profit ? valueTone(profit.value) : 'neutral'
  const profitArrow = profit ? valueArrow(profit.value) : null

  const isLast = index === total - 1
  const borderClasses = isLast
    ? ''
    : 'border-b sm:border-b-0 sm:border-r border-gray-100'

  const pad = compact ? 'p-5' : 'p-6 sm:p-8'
  const headlineSize = compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
  const numberSize = compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'

  return (
    <div className={`relative ${pad} ${borderClasses}`}>
      <span className={`absolute top-0 left-0 right-0 h-1 ${v.stripe}`} aria-hidden />

      <div className="flex items-center justify-between mb-3">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-500">
          {COL_LABELS[index] ?? `Company ${index + 1}`}
        </p>
        <span className={`inline-flex items-center font-sans text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5 border ${v.chip}`}>
          {v.label}
        </span>
      </div>

      <Link href={`/${meta.slug}`} className="block group">
        <h2 className={`font-serif text-black ${headlineSize} font-bold leading-tight mb-1 group-hover:text-brand-red transition-colors`}>
          {meta.company}
        </h2>
        <p className="font-sans text-gray-500 text-xs mb-5 truncate">{meta.sector}</p>
      </Link>

      <div className="space-y-3">
        {revenue && (
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-gray-500 mb-1">{revenue.label}</p>
            <p className={`font-serif text-black ${numberSize} font-bold leading-none`}>{revenue.value}</p>
          </div>
        )}
        {profit && (
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-gray-500 mb-1">{profit.label}</p>
            <div className="flex items-baseline gap-2">
              {profitArrow && (
                <span className={`text-base leading-none ${profitTone === 'good' ? 'text-green-700' : profitTone === 'bad' ? 'text-red-600' : 'text-gray-500'}`}>
                  {profitArrow}
                </span>
              )}
              <p className={`font-serif ${numberSize} font-bold leading-none ${TONE_CLS[profitTone]}`}>
                {profit.value}
              </p>
            </div>
          </div>
        )}
      </div>

      <Link
        href={`/${meta.slug}`}
        className="inline-flex items-center gap-1 mt-6 font-sans text-brand-red text-xs font-semibold hover:underline"
      >
        Full {meta.company} breakdown <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

export default function MatchupHeader({ metaA, metaB, metaC, category, stats }: MatchupHeaderProps) {
  const metas = [metaA, metaB, ...(metaC ? [metaC] : [])]
  const total = metas.length
  const isThreeWay = total >= 3
  const gridCls = isThreeWay
    ? 'grid grid-cols-1 sm:grid-cols-3'
    : 'grid grid-cols-1 sm:grid-cols-2'
  const matchupLabel = isThreeWay ? 'Three-way audit' : 'Side-by-side audit'

  return (
    <div className="my-8 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm not-prose">
      {category && (
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-gray-500">{category}</p>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-500">{matchupLabel}</p>
        </div>
      )}
      <div className={gridCls}>
        {metas.map((m, i) => (
          <CompanyColumn key={i} meta={m} index={i} total={total} compact={isThreeWay} override={stats?.[i]} />
        ))}
      </div>
    </div>
  )
}
