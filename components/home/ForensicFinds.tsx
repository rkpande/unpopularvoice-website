import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { getForensicArticles } from '@/lib/spectrum'

const HOOKS: Record<string, string> = {
  'googlepay-fy2025': 'License fees to Singapore parent grew 13x. Indian PAT halved.',
  'uber-fy2025': 'Rides revenue fell 89%. Rides costs did not.',
  'vedantu-fy2025': 'Reported loss fell 22%. Operating loss widened 25%.',
  'spinny-fy2025': 'The operating company lost ₹673 Cr. The group lost ₹424 Cr.',
  'acko-fy2025': 'The tech company that hides an insurer.',
  'razorpay-fy2025': '₹879 Cr write-down drives the headline loss.',
  'phonepe-fy2025': '₹2,017 Cr ESOP charge separates from operating economics.',
  'brndme-fy2025': 'Mensa is unwinding its roll-up.',
  'captainfresh-fy2025': "P&L inflected. The cash hasn't caught up.",
  'fresh2home-fy2025': "Reported COGS exceeds revenue. The filing doesn't show why.",
  'upgrad-fy2025': 'Cut its loss in half. Revenue grew only 6%.',
}

export default function ForensicFinds({ articles }: { articles: ArticleMeta[] }) {
  const picks = getForensicArticles(articles, 4)
  if (picks.length === 0) return null

  return (
    <section className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">
            Forensic finds
          </p>
          <h2 className="font-serif text-white text-3xl sm:text-4xl font-bold leading-tight">
            What the audit revealed that nobody else covered.
          </h2>
          <p className="font-sans text-white/60 text-sm mt-3 leading-relaxed">
            Transfer pricing, exceptional gains, segment shifts, deferred revenue, goodwill
            impairment, intercompany flows. The mechanics that change the headline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {picks.map((a) => {
            const hook = HOOKS[a.slug] ?? a.excerpt?.split('.').slice(0, 1).join('.') + '.'
            return (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="block bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-red/40 rounded-lg p-5 transition-all group"
              >
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-red mb-3">
                  {a.company}
                </p>
                <p className="font-serif text-white text-lg font-bold leading-snug mb-3 group-hover:text-brand-red transition-colors line-clamp-3">
                  {a.title}
                </p>
                <p className="font-sans text-white/60 text-[12px] leading-relaxed line-clamp-3">
                  {hook}
                </p>
                <p className="font-sans text-brand-red text-[11px] font-semibold mt-4 group-hover:underline">
                  Read the breakdown →
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
