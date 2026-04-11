import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

export default function FeaturedArticle({ article }: { article: ArticleMeta }) {
  return (
    <section className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <p className="section-label mb-8">Featured Deep Dive</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Placeholder image */}
          <div className="bg-gray-100 rounded-lg aspect-[16/10] flex items-center justify-center">
            <p className="text-gray-400 font-sans text-sm">[ Financial chart / company visual ]</p>
          </div>

          {/* Content */}
          <div>
            <p className="font-sans text-gray-400 text-xs mb-3">
              {article.sector.toUpperCase()}&nbsp;&nbsp;·&nbsp;&nbsp;
              {article.dataSource}&nbsp;&nbsp;·&nbsp;&nbsp;
              {article.updatedAt}
            </p>

            <Link href={`/${article.slug}`}>
              <h2 className="font-serif text-black text-4xl font-bold leading-[1.15] mb-6 hover:text-brand-red transition-colors">
                {article.title}
              </h2>
            </Link>

            {/* TL;DR */}
            <div className="bg-red-50 border border-brand-red/20 rounded-lg p-5 mb-6">
              <p className="font-sans font-bold text-brand-red text-xs tracking-widest uppercase mb-3">
                TL;DR
              </p>
              <ul className="space-y-1.5">
                {article.tldr.slice(0, 3).map((point, i) => (
                  <li key={i} className="font-sans text-[13px] text-gray-700 flex gap-2">
                    <span className="text-brand-red mt-0.5">–</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/${article.slug}`}
              className="font-sans font-semibold text-brand-red text-sm hover:underline"
            >
              Read Full Breakdown →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
