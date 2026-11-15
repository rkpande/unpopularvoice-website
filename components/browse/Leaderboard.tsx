import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

interface LeaderboardEntry {
  article: ArticleMeta
  metric: string // formatted display value
  metricSub?: string // small secondary line (e.g. revenue context)
}

interface LeaderboardProps {
  title: string
  subtitle: string
  entries: LeaderboardEntry[]
  accent: 'green' | 'red' | 'blue' | 'amber'
  rankColor?: string
}

const accentMap: Record<LeaderboardProps['accent'], { bar: string; topRank: string; metric: string; bg: string }> = {
  green: { bar: 'bg-green-500',  topRank: 'text-green-700',  metric: 'text-green-700',  bg: 'bg-green-50' },
  red:   { bar: 'bg-red-500',    topRank: 'text-red-600',    metric: 'text-red-600',    bg: 'bg-red-50' },
  blue:  { bar: 'bg-blue-500',   topRank: 'text-blue-600',   metric: 'text-blue-700',   bg: 'bg-blue-50' },
  amber: { bar: 'bg-amber-500',  topRank: 'text-amber-700',  metric: 'text-amber-700',  bg: 'bg-amber-50' },
}

export default function Leaderboard({ title, subtitle, entries, accent }: LeaderboardProps) {
  const a = accentMap[accent]
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
      <div className={`h-1.5 ${a.bar}`} />
      <div className="p-5 pb-3">
        <h3 className="font-serif text-black text-lg sm:text-xl font-bold leading-tight">{title}</h3>
        <p className="font-sans text-gray-500 text-xs mt-1">{subtitle}</p>
      </div>
      <ol className="px-2 pb-3">
        {entries.length === 0 && (
          <li className="px-3 py-4 text-gray-500 text-xs italic font-sans">No companies meet this criterion yet.</li>
        )}
        {entries.map((e, idx) => {
          const rank = idx + 1
          const isTop = rank === 1
          return (
            <li key={e.article.slug}>
              <Link
                href={`/${e.article.slug}`}
                className="group flex items-center gap-3 px-3 py-3 min-h-[48px] rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <span className={`font-serif font-bold text-2xl tabular-nums w-7 text-right ${isTop ? a.topRank : 'text-gray-500'}`}>
                  {rank}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-sans font-semibold text-black text-sm truncate group-hover:text-brand-red transition-colors">
                    {e.article.company}
                  </span>
                  {e.metricSub && (
                    <span className="block font-sans text-gray-500 text-[11px] truncate">{e.metricSub}</span>
                  )}
                </span>
                <span className={`font-serif font-bold text-base whitespace-nowrap ${a.metric}`}>
                  {e.metric}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
