import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

interface HeroProps {
  topArticles: ArticleMeta[]
}

export default function Hero({ topArticles }: HeroProps) {
  return (
    <section className="bg-black">
      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: headline */}
        <div>
          <div className="w-12 h-1 bg-brand-red mb-8" />
          <h1 className="font-serif text-white text-6xl xl:text-7xl font-bold leading-[1.08] mb-8">
            Startup growth,<br />stripped of<br />narratives.
          </h1>
          <p className="font-sans text-white/60 text-xl mb-10">
            We analyze what the numbers actually say.
          </p>
          <Link
            href="#latest"
            className="inline-block bg-brand-red text-white font-sans font-semibold text-base px-6 py-3 rounded hover:bg-red-800 transition-colors"
          >
            Read Latest →
          </Link>
        </div>

        {/* Right: Reality Check mini-cards */}
        {topArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topArticles.slice(0, 3).map((a) => {
              const avg = Math.round(
                (a.realityScore.growthQuality +
                  a.realityScore.sustainability +
                  a.realityScore.profitabilityPath) / 3
              )
              const scoreColor =
                avg >= 7 ? 'text-green-400' : avg >= 5 ? 'text-yellow-400' : 'text-brand-red'
              return (
                <Link
                  key={a.slug}
                  href={`/${a.slug}`}
                  className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-5 border-t-4 border-brand-red group"
                >
                  <p className="font-sans font-semibold text-white text-sm mb-2 group-hover:text-white/90">
                    {a.company}
                  </p>
                  <p className={`font-serif text-4xl font-bold ${scoreColor}`}>
                    {avg}
                    <span className="text-white/20 text-xl">/10</span>
                  </p>
                  <p className="font-sans text-white/40 text-[10px] mt-2 uppercase tracking-wider">
                    Reality Check
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
