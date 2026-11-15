import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { SPECTRUM, type SpectrumKey, bucketArticles } from '@/lib/spectrum'

const ORDER: SpectrumKey[] = ['working', 'scaling', 'progress', 'restructuring', 'broken']

export default function SpectrumBand({ articles }: { articles: ArticleMeta[] }) {
  const buckets = bucketArticles(articles)

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">
            The Spectrum
          </p>
          <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight">
            Every company falls somewhere.
          </h2>
          <p className="font-sans text-gray-500 text-sm mt-3 leading-relaxed">
            Working models, scaling models, in-progress, restructuring, broken. The audited
            filings sort companies into one of five categories. Pick a column to see who fits.
          </p>
          <p className="font-sans text-gray-500 text-xs mt-3 sm:hidden">
            Swipe to see all five <span aria-hidden="true">→</span>
          </p>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none -mx-4 sm:mx-0 px-4 sm:px-0 pb-3 sm:pb-0">
          {ORDER.map((key) => {
            const bucket = SPECTRUM[key]
            const items = buckets[key].slice(0, 4)
            return (
              <div
                key={key}
                className={`flex-shrink-0 w-[82%] sm:w-auto snap-start bg-white border-t-4 ${bucket.borderClass} border-x border-b border-gray-200 rounded-b-lg flex flex-col`}
              >
                <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-500 mb-1">
                    {bucket.shortLabel}
                  </p>
                  <p className="font-serif text-black text-lg font-bold leading-snug">
                    {bucket.label}
                  </p>
                  <p className="font-sans text-gray-500 text-[12px] leading-relaxed mt-2">
                    {bucket.description}
                  </p>
                </div>
                <ul className="px-4 py-3 space-y-2 flex-1">
                  {items.length === 0 ? (
                    <li className="font-sans text-[12px] text-gray-500 italic">
                      No articles yet.
                    </li>
                  ) : (
                    items.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/${a.slug}`}
                          className="block group"
                        >
                          <p className="font-sans text-[10px] tracking-widest uppercase text-gray-500 mb-0.5">
                            {a.company}
                          </p>
                          <p className="font-serif text-black text-[15px] font-bold leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                            {a.title}
                          </p>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
                <div className="px-4 py-3 border-t border-gray-100">
                  <Link
                    href={`/articles?spectrum=${bucket.key}`}
                    className="font-sans text-brand-red text-[12px] font-semibold hover:underline"
                  >
                    All {bucket.shortLabel.toLowerCase()} <span aria-hidden="true">→</span>
                  </Link>
                  <span className="font-sans text-gray-500 text-xs ml-2">
                    {buckets[key].length} total
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
