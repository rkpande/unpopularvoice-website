import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

function ArticleThumb({ article }: { article: ArticleMeta }) {
  const nums = article.heroNumbers?.slice(0, 2)

  if (!nums || nums.length === 0) {
    return (
      <div className="w-40 h-24 rounded-lg bg-gray-200 flex-shrink-0" />
    )
  }

  return (
    <Link href={`/${article.slug}`} className="flex-shrink-0 w-40 h-24 rounded-lg bg-black flex flex-col justify-between p-3 select-none hover:opacity-90 transition-opacity">
      <span className="font-sans text-[8px] font-bold tracking-widest uppercase text-brand-red">
        UnpopularVoice
      </span>
      <div className="space-y-1.5">
        {nums.map(({ value, label }, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-serif text-white text-sm font-bold leading-none">{value}</span>
            <span className="font-sans text-white/40 text-[8px] uppercase tracking-wider leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </Link>
  )
}

export default function LatestArticles({ articles }: { articles: ArticleMeta[] }) {
  return (
    <section id="latest" className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <p className="section-label mb-4">Latest Articles</p>
        <h2 className="font-serif text-black text-3xl font-bold mb-10">Latest Articles</h2>

        <div className="divide-y divide-gray-200">
          {articles.map((article) => (
            <div key={article.slug} className="py-6 flex items-center gap-6 group">
              <ArticleThumb article={article} />
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-brand-red text-[10px] tracking-widest uppercase mb-1.5">
                  {article.sector}
                </p>
                <Link href={`/${article.slug}`}>
                  <h3 className="font-serif text-black text-lg font-bold leading-snug group-hover:text-brand-red transition-colors mb-1.5">
                    {article.title}
                  </h3>
                </Link>
                {article.excerpt && (
                  <p className="font-sans text-gray-500 text-sm">{article.excerpt}</p>
                )}
              </div>
              <Link
                href={`/${article.slug}`}
                className="flex-shrink-0 font-sans font-semibold text-brand-red text-sm hover:underline"
              >
                Read →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
