import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Every financial teardown we have published. Data-first. No narratives.',
}

function scoreColor(score: number) {
  if (score >= 7) return 'text-green-600'
  if (score >= 5) return 'text-yellow-600'
  return 'text-brand-red'
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <div className="min-h-[calc(100vh-72px)]">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-8 py-16">
          <div className="w-12 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-black text-5xl font-bold mb-3">All Articles</h1>
          <p className="font-sans text-gray-400 text-lg">
            {articles.length} {articles.length === 1 ? 'teardown' : 'teardowns'} published.
            Data first. No narratives.
          </p>
        </div>
      </div>

      {/* Article list */}
      <div className="max-w-3xl mx-auto px-8 py-4 pb-20">
        {articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-gray-300 text-3xl mb-4">Nothing yet.</p>
            <p className="font-sans text-gray-400 text-sm">First teardown is coming soon.</p>
            <Link
              href="/subscribe"
              className="inline-block mt-6 bg-brand-red text-white font-sans font-semibold text-sm px-5 py-3 rounded hover:bg-red-800 transition-colors"
            >
              Get notified →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {articles.map((article) => {
              const { growthQuality, sustainability, profitabilityPath } = article.realityScore
              const avg = Math.round((growthQuality + sustainability + profitabilityPath) / 3)
              return (
                <Link
                  key={article.slug}
                  href={`/${article.slug}`}
                  className="group flex items-start justify-between gap-8 py-8 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-sans font-semibold text-brand-red text-[10px] tracking-widest uppercase">
                        {article.sector}
                      </span>
                      <span className="text-gray-200">·</span>
                      <span className="font-sans text-gray-400 text-xs">{article.company}</span>
                    </div>
                    <h2 className="font-serif text-black text-xl font-bold leading-snug group-hover:text-brand-red transition-colors mb-2">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="font-sans text-gray-500 text-sm leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                    <p className="font-sans text-gray-300 text-xs mt-2">
                      {article.readTime} read &nbsp;·&nbsp; {article.updatedAt}
                    </p>
                  </div>

                  {/* Reality Check mini-score */}
                  <div className="flex-shrink-0 text-right pt-1">
                    <p className="font-sans text-[9px] text-gray-400 uppercase tracking-wider mb-1">
                      Reality Check
                    </p>
                    <p className={`font-serif font-bold text-2xl ${scoreColor(avg)}`}>
                      {avg}
                      <span className="text-gray-300 text-sm">/10</span>
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
