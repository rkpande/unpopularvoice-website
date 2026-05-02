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
            Startup growth, <br />stripped of <br />narratives.
          </h1>
          <p className="font-sans text-white/60 text-xl mb-10">
            MCA filings only. Audited numbers. No press releases.
          </p>
          <Link
            href="#browse"
            className="inline-block bg-brand-red text-white font-sans font-semibold text-base px-6 py-3 rounded hover:bg-red-800 transition-colors"
          >
            Read Latest →
          </Link>
        </div>

        {/* Right: financial snapshot cards */}
        {topArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topArticles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-5 border-t-4 border-brand-red group flex flex-col gap-3"
              >
                <p className="font-sans font-bold text-white/50 text-[9px] uppercase tracking-widest">
                  {a.company}
                </p>

                {a.heroNumbers?.[0] ? (
                  <>
                    <div>
                      <p className="font-serif text-white text-2xl font-bold leading-none">
                        {a.heroNumbers[0].value}
                      </p>
                      <p className="font-sans text-white/35 text-[9px] mt-1 uppercase tracking-wider leading-tight">
                        {a.heroNumbers[0].label}
                      </p>
                    </div>
                    {a.heroNumbers[1] && (
                      <div className="border-t border-white/10 pt-3">
                        <p className={`font-serif text-lg font-bold leading-none ${
                          /loss/i.test(a.heroNumbers[1].label) ? 'text-brand-red' : 'text-green-400'
                        }`}>
                          {a.heroNumbers[1].value}
                        </p>
                        <p className="font-sans text-white/35 text-[9px] mt-1 uppercase tracking-wider leading-tight">
                          {a.heroNumbers[1].label}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="font-serif text-white text-4xl font-bold">
                    {Math.round(
                      (a.realityScore.growthQuality +
                        a.realityScore.sustainability +
                        a.realityScore.profitabilityPath) / 3
                    )}
                    <span className="text-white/20 text-xl">/10</span>
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
