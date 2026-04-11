import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Reality Check Index',
  description:
    'All startup scores in one place. Growth quality, sustainability, profitability path — rated independently.',
}

function scoreColor(score: number) {
  if (score >= 7) return 'text-green-600'
  if (score >= 5) return 'text-yellow-600'
  return 'text-brand-red'
}

function scoreBg(score: number) {
  if (score >= 7) return 'bg-green-50 border-green-200'
  if (score >= 5) return 'bg-yellow-50 border-yellow-200'
  return 'bg-red-50 border-red-200'
}

export default function RealityCheckPage() {
  const articles = getAllArticles()

  const sorted = [...articles].sort((a, b) => {
    const avgA =
      (a.realityScore.growthQuality + a.realityScore.sustainability + a.realityScore.profitabilityPath) / 3
    const avgB =
      (b.realityScore.growthQuality + b.realityScore.sustainability + b.realityScore.profitabilityPath) / 3
    return avgB - avgA
  })

  return (
    <div className="min-h-[calc(100vh-72px)]">
      {/* Header */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="w-12 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-5xl font-bold mb-3">Reality Check Index</h1>
          <p className="font-sans text-white/50 text-lg max-w-xl">
            Every company we&apos;ve analyzed, scored across three dimensions. No affiliations.
            No sponsored content. Just the numbers.
          </p>
        </div>
      </div>

      {/* Scoring legend */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-wrap gap-6">
          <p className="font-sans text-xs text-gray-500 font-semibold uppercase tracking-wide self-center">
            Score key:
          </p>
          {[
            { range: '8–10', label: 'Strong', color: 'text-green-600' },
            { range: '5–7', label: 'Watch', color: 'text-yellow-600' },
            { range: '1–4', label: 'Concern', color: 'text-brand-red' },
          ].map((item) => (
            <div key={item.range} className="flex items-center gap-2">
              <span className={`font-sans font-bold text-sm ${item.color}`}>{item.range}</span>
              <span className="font-sans text-gray-400 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scores table */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {sorted.length === 0 ? (
          <p className="font-sans text-gray-400 text-center py-24 text-lg">No articles published yet.</p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full font-sans text-sm">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="px-6 py-4 text-left font-semibold text-xs tracking-wide">Company</th>
                    <th className="px-6 py-4 text-left font-semibold text-xs tracking-wide">Sector</th>
                    <th className="px-6 py-4 text-center font-semibold text-xs tracking-wide">Growth Quality</th>
                    <th className="px-6 py-4 text-center font-semibold text-xs tracking-wide">Sustainability</th>
                    <th className="px-6 py-4 text-center font-semibold text-xs tracking-wide">Profit Path</th>
                    <th className="px-6 py-4 text-center font-semibold text-xs tracking-wide">Updated</th>
                    <th className="px-6 py-4 text-right font-semibold text-xs tracking-wide" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sorted.map((a, i) => (
                    <tr key={a.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4">
                        <Link href={`/${a.slug}`} className="font-semibold text-black hover:text-brand-red transition-colors">
                          {a.company}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{a.sector}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-bold text-base ${scoreColor(a.realityScore.growthQuality)}`}>
                          {a.realityScore.growthQuality}/10
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-bold text-base ${scoreColor(a.realityScore.sustainability)}`}>
                          {a.realityScore.sustainability}/10
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-bold text-base ${scoreColor(a.realityScore.profitabilityPath)}`}>
                          {a.realityScore.profitabilityPath}/10
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400 text-xs">{a.updatedAt}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/${a.slug}`} className="font-semibold text-brand-red text-xs hover:underline">
                          Full report →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {sorted.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${a.slug}`}
                  className={`block rounded-lg border p-5 ${scoreBg(a.realityScore.growthQuality)}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-sans font-bold text-black">{a.company}</p>
                      <p className="font-sans text-gray-400 text-xs">{a.sector}</p>
                    </div>
                    <span className="font-sans font-semibold text-brand-red text-xs">Full report →</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Growth', score: a.realityScore.growthQuality },
                      { label: 'Sustain', score: a.realityScore.sustainability },
                      { label: 'Profit', score: a.realityScore.profitabilityPath },
                    ].map((d) => (
                      <div key={d.label}>
                        <p className="font-sans text-[9px] text-gray-400 uppercase tracking-wide">{d.label}</p>
                        <p className={`font-sans font-bold text-lg ${scoreColor(d.score)}`}>{d.score}/10</p>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
