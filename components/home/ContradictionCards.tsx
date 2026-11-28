import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { getContradictionArticles } from '@/lib/spectrum'

export default function ContradictionCards({ articles }: { articles: ArticleMeta[] }) {
  const picks = getContradictionArticles(articles, 4)
  if (picks.length === 0) return null

  return (
    <section className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">
            Contradictions in the accounts
          </p>
          <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight">
            Two-sentence headlines. The data does the rest.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {picks.map((a, i) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              className={`flex flex-col justify-between rounded-lg p-5 sm:p-6 min-h-[200px] sm:min-h-[260px] transition-all group ${
                i === 0
                  ? 'bg-black text-white hover:bg-brand-red'
                  : 'bg-white text-black hover:border-black border border-gray-200'
              }`}
            >
              <div>
                <p
                  className={`font-sans text-[11px] tracking-[0.25em] uppercase font-semibold mb-4 ${
                    i === 0 ? 'text-white/60' : 'text-gray-500'
                  }`}
                >
                  {a.company}
                </p>
                <p
                  className={`font-serif text-2xl font-bold leading-[1.15] ${
                    i === 0 ? 'group-hover:text-white' : 'group-hover:text-brand-red'
                  } transition-colors`}
                >
                  {a.title}
                </p>
              </div>
              <p
                className={`font-sans text-xs font-semibold mt-6 ${
                  i === 0 ? 'text-white/80' : 'text-brand-red'
                } group-hover:underline`}
              >
                Read the breakdown <span aria-hidden="true">→</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
