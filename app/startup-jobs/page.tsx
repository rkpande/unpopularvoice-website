import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import StartupJobsGrid from '@/components/browse/StartupJobsGrid'
import { indexSummary, bufferMonths, isProfitable } from '@/lib/financials'

export const metadata: Metadata = {
  title: 'Check Your Offer Before Accepting It | Startup Jobs Index',
  description:
 'Most startups don\'t show you this before you join. Profitability, balance-sheet buffer, payroll trends, and stability for Indian startups, from audited public filings.',
  alternates: {
  canonical: 'https://unpopularvoice.com/startup-jobs',
 },
}

export default function StartupJobsPage() {
  const { companies, counts, lossPct, thinBuffer } = indexSummary(getAllArticles())
  const lossMaking = companies.length - counts.profitable
  const wellBuffered = companies.filter((a) => !isProfitable(a) && (bufferMonths(a) ?? 0) >= 36)

  // Thin-buffer companies, sorted by buffer ascending
  const highRisk = thinBuffer

  return (
 <div className="min-h-[calc(100vh-72px)]">

 {/* Hero, sharper hook */}
 <div className="bg-black">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 pb-16">
 <div className="w-12 h-1 bg-brand-red mb-8" />
 <h1 className="font-serif text-white text-5xl sm:text-6xl font-bold leading-[1.05] mb-6">
  Most startups don&apos;t show you this<br className="hidden sm:block" /> before you join.
 </h1>
 <p className="font-sans text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl mb-8">
  Your offer letter won&apos;t tell you this. The audited filing will. Profit, balance-sheet buffer, payroll trends, stability,
  for {companies.length} Indian startups, from audited public financial statements.
 </p>
 <div className="flex flex-wrap gap-3 mb-10">
 <Link href="#high-risk" className="bg-brand-red text-white font-sans font-semibold text-sm px-5 py-3 rounded-full hover:bg-red-800 transition-colors">
  See thin-buffer startups
 </Link>
 <Link href="#index" className="bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-sm px-5 py-3 rounded-full border border-white/10 transition-colors">
  Check a specific company
 </Link>
 </div>
 <div className="flex flex-wrap gap-8 border-t border-white/10 pt-8">
 {[
 { n: String(companies.length), label: 'Startups indexed' },
 { n: String(counts.profitable), label: 'Profitable' },
 { n: String(wellBuffered.length), label: 'Loss-making, 3+ yr buffer' },
 { n: String(thinBuffer.length), label: 'Buffer under 12 months' },
 ].map(({ n, label }) => (
 <div key={label}>
 <p className="font-serif text-brand-red text-3xl font-bold">{n}</p>
 <p className="font-sans text-white/60 text-xs uppercase tracking-widest mt-1">{label}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Instant takeaway band */}
 <div className="bg-gray-900 border-y border-white/5">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
 <p className="font-sans text-white/60 text-xs uppercase tracking-[0.25em] mb-4 text-center">The headline takeaways</p>
 <div className="grid sm:grid-cols-3 gap-4">
 <Takeaway
  big={`${lossPct}%`}
  label="Loss-making"
  body={`Of ${companies.length} startups in this index, ${lossMaking} reported a loss after tax on their latest audited filing.`}
  accent="text-orange-400"
 />
 <Takeaway
  big={String(counts.profitable)}
  label="Profitable"
  body={`Reported a profit after tax. Profit is not the same as cash; the article shows operating cash flow alongside.`}
  accent="text-green-400"
 />
 <Takeaway
  big={String(thinBuffer.length)}
  label="Buffer under 12 months"
  body={`Net worth covers less than a year of the latest loss. A ratio at year-end, not a forecast: funding raised since changes it.`}
  accent="text-red-400"
 />
 </div>
 </div>
 </div>

 {/* HIGH-RISK BAND, surfaced upfront */}
 {highRisk.length > 0 && (
 <div id="high-risk" className="bg-red-50 border-b border-red-200 scroll-mt-20">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
 <div className="flex items-start gap-4 mb-6">
 <span className="flex-shrink-0 inline-block w-1.5 h-12 bg-red-600 rounded-full" aria-hidden />
 <div>
 <p className="font-sans text-red-700 text-xs tracking-[0.25em] uppercase font-bold mb-2">Thin balance-sheet buffer</p>
 <h2 className="font-serif text-red-900 text-3xl sm:text-4xl font-bold leading-tight">
 {highRisk.length} {highRisk.length === 1 ? 'company whose' : 'companies whose'} net worth covers less than a year of losses
 </h2>
 <p className="font-sans text-red-800/80 text-sm mt-2 max-w-2xl">
  Closing net worth divided by the latest annual loss. A ratio from the filing, not a forecast: funding raised after year-end,
  parent support, or a narrower loss all change it. Worth asking about before you sign an offer.
 </p>
 </div>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {highRisk.map((a) => (
 <Link
  key={a.slug}
  href={`/${a.slug}#employer`}
  className="group block bg-white border border-red-200 rounded-xl p-4 hover:border-red-400 hover:shadow-md transition-all"
 >
 <div className="flex items-center justify-between mb-2">
 <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
  Net worth / annual loss
 </span>
 <span className="font-serif font-bold text-red-700 text-lg">{bufferMonths(a)}mo</span>
 </div>
 <p className="font-serif font-bold text-black text-base group-hover:text-brand-red transition-colors">{a.company}</p>
 <p className="font-sans text-gray-500 text-xs truncate mt-0.5">{a.sector?.split('/')[0]?.trim()}</p>
 </Link>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* What we measure, now with Career Upside logic */}
 <div className="bg-gray-50 border-b border-gray-100">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
 <div className="flex flex-wrap items-baseline gap-3 mb-6">
 <h2 className="font-serif text-black text-2xl font-bold">Four numbers that matter most when joining a startup</h2>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
 <ExplainerCard
  title="Buffer (months)"
  body="Closing net worth divided by the latest annual loss after tax. A balance-sheet ratio, not a cash forecast. Shown only for loss-making companies with positive net worth."
  tiers={[
 { color: 'text-green-700', text: '3+ years: comfortable' },
 { color: 'text-amber-700', text: '12–36 months: monitor' },
 { color: 'text-red-600', text: 'Under 12 months: high risk' },
 ]}
 />
 <ExplainerCard
  title="Profitability trajectory"
  body="Is the company moving toward or away from profit? Derived from loss ratio trend across two years of audited filings."
  tiers={[
 { color: 'text-green-700', text: 'Profitable: already there' },
 { color: 'text-amber-700', text: 'Improving: losses narrowing' },
 { color: 'text-red-600', text: 'Worsening: losses deepening' },
 ]}
 />
 <ExplainerCard
  title="Payroll growth (YoY %)"
  body="Year-on-year change in employee benefit expenses. Rising = hiring or pay increases. Falling = headcount cuts or pay freezes."
  tiers={[
 { color: 'text-green-700', text: '+20%+: active hiring' },
 { color: 'text-amber-700', text: '0–20%: stable' },
 { color: 'text-red-600', text: 'Negative: contracting' },
 ]}
 />
 <ExplainerCard
  title="Career upside"
  body="A composite read of growth + finances + ESOP potential. High = you have meaningful financial upside if it works. Limited = upside doesn't outweigh the risk."
  tiers={[
 { color: 'text-green-700', text: 'High: growth + stable financials + ESOP potential' },
 { color: 'text-amber-700', text: 'Moderate: growth visible, trade-offs present' },
 { color: 'text-red-600', text: 'Limited: weak growth + weak financials' },
 ]}
 />
 </div>
 <p className="font-sans text-gray-500 text-xs">
  The buffer is a ratio, not a countdown. Funding raised after year-end resets it, and parent support or a narrower loss changes it.
  Use it as a signal, not a deadline.{' '}
 <Link href="/employer-check" className="text-brand-red underline underline-offset-4 hover:text-black">
  Full employer check <span aria-hidden="true">→</span>
 </Link>
 </p>
 </div>
 </div>

 {/* Search + Grid */}
 <div id="index" className="max-w-7xl mx-auto px-4 sm:px-8 py-14 scroll-mt-20">
 <StartupJobsGrid companies={companies} />
 </div>

 {/* Compare similar, active CTA */}
 <div className="bg-gray-50 border-y border-gray-100">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 grid sm:grid-cols-2 gap-4">
 <Link href="/compare" className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-black transition-colors">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">Compare two offers</p>
 <p className="font-serif text-black text-2xl font-bold leading-tight mb-2 group-hover:text-brand-red transition-colors">
  Side-by-side: which startup is the safer bet?
 </p>
 <p className="font-sans text-gray-500 text-sm">
  Compare profitability, buffer, payroll growth, and stability across two startups in one view. Useful when you have multiple offers.
 </p>
 </Link>
 <Link href="/profitability-index" className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-black transition-colors">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">Profitability Index</p>
 <p className="font-serif text-black text-2xl font-bold leading-tight mb-2 group-hover:text-brand-red transition-colors">
  Top 10 ranked: most profit, biggest losses, highest margin.
 </p>
 <p className="font-sans text-gray-500 text-sm">
  Five leaderboards across {companies.length} startups, ranked by what the audit actually says. Profitable, deepening, survival.
 </p>
 </Link>
 </div>
 </div>

 {/* Cross-link to employer check */}
 <div className="bg-white border-y border-gray-100">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
 <div>
 <p className="font-serif text-black text-xl font-bold mb-1">Want the full employer picture?</p>
 <p className="font-sans text-gray-500 text-sm">
  Growth momentum, stability, funding dependence, career upside, five dimensions, each scored from the filing.
 </p>
 </div>
 <Link href="/employer-check" className="flex-shrink-0 bg-black text-white font-sans font-semibold text-sm px-6 py-3 rounded hover:bg-gray-800 transition-colors">
  Employer Check <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>

 {/* Disclaimer */}
 <div className="bg-yellow-50 border-y border-yellow-100">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
 <p className="font-sans font-bold text-yellow-800 text-xs tracking-widest uppercase mb-3">Important disclaimer</p>
 <p className="font-sans text-yellow-700 text-sm leading-relaxed max-w-3xl">
  The buffer is calculated from the most recent available audited filing, typically 6 to 18 months behind real time.
  A company&apos;s financial position may have changed materially. A new funding round, a product pivot, or a headcount
  change are not visible here until the next filing is submitted. Use this as one input, alongside your own due diligence,
  not as the final word.
 </p>
 </div>
 </div>

 {/* CTA */}
 <div className="bg-black">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
 <div>
 <p className="font-serif text-white text-xl font-bold mb-1">New filings reclassify the index every quarter</p>
 <p className="font-sans text-white/50 text-sm">We read every filing so you know what the numbers say before you sign.</p>
 </div>
 <Link href="/subscribe" className="flex-shrink-0 bg-brand-red text-white font-sans font-semibold text-sm px-6 py-3 rounded hover:bg-red-800 transition-colors">
  Get notified <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>

 </div>
 )
}

// ── Sub-components ─────────────────────────────

function Takeaway({ big, label, body, accent }: { big: string; label: string; body: string; accent: string }) {
  return (
 <div className="border border-white/10 rounded-xl p-5 bg-white/5">
 <p className={`font-serif text-3xl sm:text-4xl font-bold leading-none mb-1 ${accent}`}>{big}</p>
 <p className="font-sans text-white/70 text-xs uppercase tracking-[0.25em] font-bold mb-3">{label}</p>
 <p className="font-sans text-white/60 text-xs leading-relaxed">{body}</p>
 </div>
 )
}

function ExplainerCard({ title, body, tiers }: { title: string; body: string; tiers: { color: string; text: string }[] }) {
  return (
 <div className="bg-white rounded-lg border border-gray-100 p-5">
 <p className="font-sans font-bold text-black text-sm mb-2">{title}</p>
 <p className="font-sans text-gray-500 text-sm leading-relaxed mb-3">{body}</p>
 <div className="space-y-1 text-xs font-sans">
 {tiers.map((t) => (
 <p key={t.text} className={`font-semibold ${t.color}`}>{t.text}</p>
 ))}
 </div>
 </div>
 )
}
