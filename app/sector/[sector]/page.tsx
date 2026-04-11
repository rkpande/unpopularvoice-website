import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

const VALID_SECTORS: Record<string, string> = {
  fintech: 'Fintech',
  saas: 'SaaS',
  d2c: 'D2C',
  ev: 'EV',
  edtech: 'Edtech',
  logistics: 'Logistics',
  'quick-commerce': 'Quick Commerce',
}

export async function generateMetadata({
  params,
}: {
  params: { sector: string }
}): Promise<Metadata> {
  const label = VALID_SECTORS[params.sector.toLowerCase()]
  if (!label) return {}
  return {
    title: `${label} — Financial Teardowns`,
    description: `In-depth financial analysis of ${label} startups. No hype, just numbers.`,
  }
}

export default function SectorPage({ params }: { params: { sector: string } }) {
  const key = params.sector.toLowerCase()
  const label = VALID_SECTORS[key]
  if (!label) notFound()

  const all = getAllArticles()
  const articles = all.filter(
    (a) => a.sector.toLowerCase().replace(/\s+/g, '-') === key ||
           a.sector.toLowerCase() === label.toLowerCase()
  )

  return (
    <div className="min-h-[calc(100vh-72px)]">
      {/* Header */}
      <div className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="w-12 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-5xl font-bold mb-3">{label}</h1>
          <p className="font-sans text-white/50 text-lg">
            Financial teardowns of {label} startups — data first, narratives last.
          </p>
        </div>
      </div>

      {/* Sector filter pills */}
      <div className="border-b border-gray-100 bg-white sticky top-[72px] z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex gap-2 overflow-x-auto">
          {Object.entries(VALID_SECTORS).map(([slug, name]) => (
            <Link
              key={slug}
              href={`/sector/${slug}`}
              className={`font-sans text-xs font-semibold px-4 py-2 rounded whitespace-nowrap transition-colors ${
                slug === key
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-8 py-14">
        {articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-gray-400 text-2xl mb-3">No articles yet.</p>
            <p className="font-sans text-gray-400 text-sm">
              {label} coverage is coming. Subscribe to be notified.
            </p>
            <Link
              href="/subscribe"
              className="inline-block mt-6 bg-brand-red text-white font-sans font-semibold text-sm px-5 py-3 rounded hover:bg-red-800 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {articles.map((article) => (
              <div key={article.slug} className="py-8 flex items-start justify-between gap-8 group">
                <div>
                  <p className="font-sans font-semibold text-brand-red text-[10px] tracking-widest uppercase mb-2">
                    {article.company} · {article.dataSource}
                  </p>
                  <Link href={`/${article.slug}`}>
                    <h2 className="font-serif text-black text-xl font-bold leading-snug group-hover:text-brand-red transition-colors mb-2">
                      {article.title}
                    </h2>
                  </Link>
                  {article.excerpt && (
                    <p className="font-sans text-gray-500 text-sm">{article.excerpt}</p>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="font-sans text-xs text-gray-400 mb-1">{article.readTime} read</p>
                  <Link
                    href={`/${article.slug}`}
                    className="font-sans font-semibold text-brand-red text-sm hover:underline"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
