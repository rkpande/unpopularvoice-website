import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

function ArticleThumb({ article }: { article: ArticleMeta }) {
  const top = article.heroNumbers?.[0]

  if (!top) {
    return (
      <div className="flex-shrink-0 w-48 h-28 rounded-lg bg-gray-200" />
    )
  }

  return (
    <Link
      href={`/${article.slug}`}
      className="flex-shrink-0 w-48 h-28 rounded-lg bg-black flex flex-col justify-between p-4 select-none hover:opacity-90 transition-opacity"
    >
      <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-brand-red">
        UnpopularVoice
      </span>
      <div>
        <p className="font-serif text-white text-2xl font-bold leading-none mb-1">
          {top.value}
        </p>
        <p className="font-sans text-white/50 text-xs uppercase tracking-wide leading-tight">
          {top.label}
        </p>
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
