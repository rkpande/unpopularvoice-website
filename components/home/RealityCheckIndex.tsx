import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

function scoreColor(score: number) {
  if (score >= 7) return 'text-green-400'
  if (score >= 5) return 'text-yellow-400'
  return 'text-brand-red'
}

function scoreBorder(score: number) {
  if (score >= 7) return 'border-t-green-500'
  if (score >= 5) return 'border-t-yellow-500'
  return 'border-t-brand-red'
}

export default function RealityCheckIndex({ articles }: { articles: ArticleMeta[] }) {
  return (
    <section className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <p className="section-label mb-4">Reality Check Index</p>
        <h2 className="font-serif text-white text-3xl font-bold mb-2">Reality Check Index</h2>
        <p className="font-sans text-white/50 text-base mb-10">
          Our signature score. Three dimensions. No spin.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {articles.map((a) => {
            const { growthQuality, sustainability, profitabilityPath } = a.realityScore
            return (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className={`bg-[#0d0d0d] rounded-lg p-5 border-t-4 ${scoreBorder(growthQuality)} hover:bg-white/5 transition-colors`}
              >
                <p className="font-sans font-semibold text-white text-sm mb-3">{a.company}</p>

                <div className="space-y-2">
                  <div>
                    <p className="text-white/30 font-sans text-[9px] uppercase tracking-wider">Growth</p>
                    <p className={`font-sans font-bold text-base ${scoreColor(growthQuality)}`}>
                      {growthQuality}/10
                    </p>
                  </div>
                  <div>
                    <p className="text-white/30 font-sans text-[9px] uppercase tracking-wider">Sustain</p>
                    <p className={`font-sans font-bold text-base ${scoreColor(sustainability)}`}>
                      {sustainability}/10
                    </p>
                  </div>
                  <div>
                    <p className="text-white/30 font-sans text-[9px] uppercase tracking-wider">Profit Path</p>
                    <p className={`font-sans font-bold text-base ${scoreColor(profitabilityPath)}`}>
                      {profitabilityPath}/10
                    </p>
                  </div>
                </div>

                <p className="text-white/20 font-sans text-[10px] mt-3">Full report →</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
