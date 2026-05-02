'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { formatDisplayDate } from '@/lib/date-utils'

function topSector(sector: string) {
  return sector.split('/')[0].trim()
}

interface Props {
  articles: ArticleMeta[]
  pageSize?: number
}

export default function ArticleGrid({ articles, pageSize }: Props) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [expanded, setExpanded] = useState(!pageSize)

  const sectors = useMemo(() => {
    const seen = new Set<string>()
    articles.forEach(a => seen.add(topSector(a.sector)))
    return ['All', ...Array.from(seen).sort()]
  }, [articles])

  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? articles
        : articles.filter(a => topSector(a.sector) === activeFilter),
    [articles, activeFilter]
  )

  const visible = expanded || !pageSize ? filtered : filtered.slice(0, pageSize)
  const hiddenCount = filtered.length - (pageSize ?? filtered.length)

  return (
    <div>
      {/* Sector filter chips */}
      {sectors.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {sectors.map(s => (
            <button
              key={s}
              onClick={() => {
                setActiveFilter(s)
                setExpanded(!pageSize)
              }}
              className={`font-sans text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                activeFilter === s
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map(article => (
          <Link
            key={article.slug}
            href={`/${article.slug}`}
            className="group flex flex-col border border-gray-100 rounded-lg p-5 hover:border-gray-300 bg-white transition-colors"
          >
            {/* Sector + date */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] font-semibold text-brand-red uppercase tracking-widest">
                {topSector(article.sector)}
              </span>
              <span className="font-sans text-gray-300 text-[10px]">
                {formatDisplayDate(article.updatedAt)}
              </span>
            </div>

            {/* Company name */}
            <p className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              {article.company}
            </p>

            {/* Hero numbers — the financial data upfront */}
            {article.heroNumbers?.[0] ? (
              <div className="flex gap-5 mb-4 pb-4 border-b border-gray-50">
                <div className="min-w-0">
                  <p className="font-serif text-black text-2xl font-bold leading-none">
                    {article.heroNumbers[0].value}
                  </p>
                  <p className="font-sans text-gray-400 text-[9px] mt-1 uppercase tracking-wider leading-tight">
                    {article.heroNumbers[0].label}
                  </p>
                </div>
                {article.heroNumbers[1] && (
                  <div className="min-w-0 border-l border-gray-100 pl-5">
                    <p className={`font-serif text-lg font-bold leading-none ${
                      /loss/i.test(article.heroNumbers[1].label) ? 'text-brand-red' : 'text-green-600'
                    }`}>
                      {article.heroNumbers[1].value}
                    </p>
                    <p className="font-sans text-gray-400 text-[9px] mt-1 uppercase tracking-wider leading-tight">
                      {article.heroNumbers[1].label}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-4 pb-4 border-b border-gray-50" />
            )}

            {/* Title — the contradiction/hook */}
            <h3 className="font-serif text-black text-sm font-bold leading-snug group-hover:text-brand-red transition-colors flex-1">
              {article.title}
            </h3>

            {/* Read link */}
            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className="font-sans text-gray-300 text-[9px] uppercase tracking-wider">
                From audited MCA filing
              </span>
              <span className="font-sans text-brand-red text-xs font-semibold">Read →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Show more */}
      {!expanded && hiddenCount > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setExpanded(true)}
            className="font-sans font-semibold text-sm text-gray-600 border border-gray-200 px-6 py-2.5 rounded hover:border-gray-400 transition-colors"
          >
            Show {hiddenCount} more
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="font-sans text-gray-400 text-sm py-12 text-center">
          No articles in this sector yet.
        </p>
      )}
    </div>
  )
}
