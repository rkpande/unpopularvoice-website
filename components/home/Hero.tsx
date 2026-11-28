import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { signTone, toneText } from '@/lib/tone'
import SubscribeForm from './SubscribeForm'

interface HeroProps {
  topArticles: ArticleMeta[]
  teardownCount: number
  companyCount: number
}

// On black, a neutral figure is white; loss and profit keep their sign colours
// (globals.css lifts them for dark grounds, DESIGN.md "The Dark Ground Rule").
function figureClass(value: string, label: string) {
  const tone = signTone(value, label)
  return tone === 'neutral' ? 'text-white' : toneText[tone]
}

export default function Hero({ topArticles, teardownCount, companyCount }: HeroProps) {
  const latest = topArticles[0]
  return (
    <section className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <div className="w-12 h-1 bg-brand-red mb-6 sm:mb-8" />
          <h1 className="font-serif text-white text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mb-5 sm:mb-6 text-balance">
            Startup growth, stripped of narratives.
          </h1>
          <p className="font-sans text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            {teardownCount} teardowns of {companyCount} Indian startups, read from their audited accounts. No press releases.
          </p>
          <SubscribeForm ground="black" hint="One teardown at a time. Unsubscribe any time." />
          {latest && (
            <Link
              href={`/${latest.slug}`}
              className="inline-flex items-center gap-1.5 mt-6 min-h-[44px] font-sans text-base font-semibold text-white hover:text-brand-red transition-colors"
            >
              Read the latest: {latest.company} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {topArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {topArticles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="bg-white/5 hover:bg-white/10 transition-colors rounded-b-lg p-4 sm:p-5 border-t-4 border-brand-red flex flex-row sm:flex-col gap-4 sm:gap-3 items-baseline sm:items-stretch"
              >
                <p className="font-sans font-bold text-white/70 text-[11px] uppercase tracking-widest w-20 shrink-0 sm:w-auto">
                  {a.company}
                </p>
                {a.heroNumbers?.[0] && (
                  <div className="flex-1 sm:flex-none">
                    <p className={`font-serif text-2xl font-bold leading-none whitespace-nowrap ${figureClass(a.heroNumbers[0].value, a.heroNumbers[0].label)}`}>
                      {a.heroNumbers[0].value}
                    </p>
                    <p className="font-sans text-white/60 text-[11px] mt-1.5 uppercase tracking-wider leading-snug">
                      {a.heroNumbers[0].label}
                    </p>
                  </div>
                )}
                {a.heroNumbers?.[1] && (
                  <div className="hidden sm:block border-t border-white/10 pt-3">
                    <p className={`font-serif text-lg font-bold leading-none whitespace-nowrap ${figureClass(a.heroNumbers[1].value, a.heroNumbers[1].label)}`}>
                      {a.heroNumbers[1].value}
                    </p>
                    <p className="font-sans text-white/60 text-[11px] mt-1.5 uppercase tracking-wider leading-snug">
                      {a.heroNumbers[1].label}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
