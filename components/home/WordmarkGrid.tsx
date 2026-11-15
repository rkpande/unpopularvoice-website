import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

const RECOGNISABLE_SLUGS = [
  'zerodha-fy2025',
  'razorpay-fy2025',
  'phonepe-fy2025',
  'googlepay-fy2025',
  'porter-fy2025',
  'rapido-fy2025',
  'uber-fy2025',
  'oyo-fy2025',
  'myntra-fy2025',
  'boat-fy2025',
  'cred-fy2024',
  'unacademy-fy2025',
  'spinny-fy2025',
  'bookmyshow-fy2025',
  'zepto-fy2024',
  'inframarket-fy2025',
]

export default function WordmarkGrid({ articles }: { articles: ArticleMeta[] }) {
  const bySlug = new Map(articles.map((a) => [a.slug, a] as const))
  const picks = RECOGNISABLE_SLUGS.map((s) => bySlug.get(s)).filter(
    (a): a is ArticleMeta => Boolean(a),
  )
  if (picks.length === 0) return null

  return (
    <section className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">
            Companies you know
          </p>
          <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight">
            The audit reads of the names you recognise.
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {picks.map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              className="group flex flex-col items-center justify-center text-center bg-white border border-gray-200 hover:border-black rounded-lg px-3 py-5 min-h-[96px] transition-all"
            >
              <p className="font-serif text-black text-[15px] sm:text-base font-bold leading-tight group-hover:text-brand-red transition-colors">
                {a.company}
              </p>
              <p className="font-sans text-gray-500 text-[10px] tracking-widest uppercase mt-2">
                {(() => {
                  const fyMatch = a.slug.match(/fy(\d{4})/i)
                  return fyMatch ? `FY${fyMatch[1].slice(-2)}` : 'FY25'
                })()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
