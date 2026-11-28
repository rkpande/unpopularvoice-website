import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { formatDisplayDate } from '@/lib/articles'
import { signTone, toneText } from '@/lib/tone'
import SubscribeForm from './SubscribeForm'

// On black, a neutral figure is white; loss and profit keep their sign colours.
function figureClass(value: string, label: string) {
  const tone = signTone(value, label)
  return tone === 'neutral' ? 'text-white' : toneText[tone]
}

export default function FeaturedArticle({ article }: { article: ArticleMeta }) {
  const nums = article.heroNumbers

  return (
    <section className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <p className="section-label mb-8">Featured Deep Dive</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Financial data card */}
          {nums && nums.length > 0 ? (
            <div className="bg-black rounded-xl lg:aspect-[16/10] flex flex-col justify-between gap-6 p-5 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="font-sans text-[11px] font-bold tracking-widest uppercase text-white/80">
                  {article.company} · Forensic Read
                </p>
                <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-brand-red">
                  UnpopularVoice
                </span>
              </div>

              {/* Numbers */}
              <div className="space-y-5">
                {nums.map(({ value, label }, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-4 border-b border-white/20 pb-5 last:border-0 last:pb-0">
                    <span className="font-sans text-xs uppercase tracking-wider text-white/70">
                      {label}
                    </span>
                    <span className={`font-serif text-3xl font-bold leading-none whitespace-nowrap ${figureClass(value, label)}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <p className="font-sans text-[11px] text-white/60 tracking-widest uppercase">
                Source: audited annual accounts
              </p>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg aspect-[16/10] flex items-center justify-center">
              <p className="text-gray-500 font-sans text-sm">[ Financial chart / company visual ]</p>
            </div>
          )}

          {/* Content */}
          <div>
            <p className="font-sans text-gray-500 text-xs mb-3">
              {article.sector.toUpperCase()}&nbsp;&nbsp;·&nbsp;&nbsp;
              {formatDisplayDate(article.updatedAt)}
            </p>

            <Link href={`/${article.slug}`}>
              <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-[1.15] mb-6 hover:text-brand-red transition-colors text-balance">
                {article.title}
              </h2>
            </Link>

            {/* TL;DR */}
            {article.tldr && article.tldr.length > 0 && (
              <div className="bg-red-50 border border-brand-red/20 rounded-lg p-5 mb-6">
                <p className="font-sans font-bold text-brand-red text-xs tracking-widest uppercase mb-3">
                  TL;DR
                </p>
                <ul className="space-y-1.5">
                  {article.tldr.slice(0, 3).map((point, i) => (
                    <li key={i} className="font-sans text-sm text-gray-700 flex gap-2">
                      <span className="text-brand-red mt-0.5">–</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href={`/${article.slug}`}
              className="inline-flex items-center gap-1 min-h-[44px] font-sans font-semibold text-brand-red text-sm hover:underline"
            >
              Read the breakdown <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div>
            <h3 className="font-serif text-black text-2xl font-bold leading-snug">Read the next one first.</h3>
            <p className="mt-1.5 font-sans text-sm text-gray-600 leading-relaxed max-w-md">
              New teardowns arrive by email, one at a time. Nothing else.
            </p>
          </div>
          <SubscribeForm />
        </div>
      </div>
    </section>
  )
}
