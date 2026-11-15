import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import ProfitabilityIndexGrid from '@/components/browse/ProfitabilityIndexGrid'
import Leaderboard from '@/components/browse/Leaderboard'
import {
  categorizeProfitability,
  getFinancials,
  netMarginPct,
  turnedProfitable,
  bufferMonths,
  indexSummary,
} from '@/lib/financials'
import type { ArticleMeta } from '@/lib/articles'

export function generateMetadata(): Metadata {
  const { lossPct } = indexSummary(getAllArticles())
  const headline = `${lossPct}% of Indian Startups in Our Index Are Still Losing Money`
  return {
    title: `${headline} | Profitability Index`,
    description:
      'Indian startups ranked on audited profit after tax: most profit, biggest losses, highest margin, largest revenue. One company, one filing, one number.',
    alternates: {
      canonical: 'https://unpopularvoice.com/profitability-index',
    },
    openGraph: {
      title: headline,
      description: 'Most aren\'t profitable. Here are the ones that are, ranked on audited PAT.',
      type: 'website',
      url: 'https://unpopularvoice.com/profitability-index',
    },
  }
}

// Format helpers
const fmtCr = (cr: number) => {
  const abs = Math.abs(cr)
  if (abs >= 1) return `₹${abs.toLocaleString('en-IN', { maximumFractionDigits: 0 })} Cr`
  return `₹${(abs * 100).toFixed(0)} Lakh`
}
const fmtCrSigned = (cr: number) => (cr >= 0 ? `+${fmtCr(cr)}` : `-${fmtCr(cr)}`)
const fmtPct = (p: number) => `${p > 0 ? '+' : ''}${p.toFixed(1)}%`

export default function ProfitabilityIndexPage() {
  const all = getAllArticles()
  const { companies, counts, profitablePct, lossPct, thinBuffer } = indexSummary(all)

  // Build leaderboards from the explicit `financials` block only
  type Pair = { article: ArticleMeta; rev: number | null; pat: number | null; margin: number | null }
  const enriched: Pair[] = companies.map((a) => {
    const f = getFinancials(a)
    return { article: a, rev: f?.revenueCr ?? null, pat: f?.patCr ?? null, margin: netMarginPct(a) }
  })

  const topProfit = enriched
    .filter((p) => p.pat !== null && p.pat > 0)
    .sort((a, b) => (b.pat as number) - (a.pat as number))
    .slice(0, 10)

  const topRevenue = enriched
    .filter((p) => p.rev !== null && p.rev > 0)
    .sort((a, b) => (b.rev as number) - (a.rev as number))
    .slice(0, 10)

  const topMargin = enriched
    .filter((p) => p.margin !== null && p.margin > 0 && (p.rev ?? 0) >= 50)
    .sort((a, b) => (b.margin as number) - (a.margin as number))
    .slice(0, 10)

  const biggestLosses = enriched
    .filter((p) => p.pat !== null && p.pat < 0)
    .sort((a, b) => (a.pat as number) - (b.pat as number))
    .slice(0, 10)

  // Most Inefficient: loss as a % of revenue, only loss-makers with revenue
  const mostInefficient = enriched
    .filter((p) => p.pat !== null && p.pat < 0 && p.rev !== null && p.rev > 10)
    .map((p) => ({ ...p, lossRatio: -(p.pat as number) / (p.rev as number) * 100 }))
    .sort((a, b) => b.lossRatio - a.lossRatio)
    .slice(0, 10)

  // Movement: prior-year loss, latest-year profit (from the filing, not the prose)
  const turnedProfit = companies.filter(turnedProfitable).slice(0, 6)

  // Sector breakdown for the takeaway box
  const sectorBuckets: Record<string, { total: number; profitable: number }> = {}
  for (const c of companies) {
    const sec = (c.sector || 'Unknown').split('/')[0].trim() || 'Unknown'
    if (!sectorBuckets[sec]) sectorBuckets[sec] = { total: 0, profitable: 0 }
    sectorBuckets[sec].total += 1
    if (categorizeProfitability(c) === 'profitable') sectorBuckets[sec].profitable += 1
  }
  const sectorEntries = Object.entries(sectorBuckets)
    .filter(([, v]) => v.total >= 3) // need minimum sample
    .sort((a, b) => (b[1].profitable / b[1].total) - (a[1].profitable / a[1].total))

  const winningSector = sectorEntries[0]
  const laggingSector = sectorEntries[sectorEntries.length - 1]

  return (
 <div className="min-h-[calc(100vh-72px)]">

 {/* ── HERO: aggressive hook ──────────────────────────── */}
 <div className="bg-white border-b border-gray-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-8 items-center">
 <div className="lg:col-span-6">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase mb-4">FY2025 audited reality</p>
 <h1 className="font-serif text-black text-4xl sm:text-5xl lg:text-7xl font-bold leading-[0.95] mb-6">
 {lossPct}% of the startups we cover are still losing money.
 </h1>
 <p className="font-sans text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
  Ranked on audited profit after tax from each company&apos;s latest filing, not press releases. One company, one filing, one number.
 </p>
 <Link href="#leaderboards" className="inline-flex items-center gap-2 bg-black text-white font-sans font-semibold text-sm px-5 py-3 min-h-[44px] rounded-full hover:bg-gray-800 active:bg-gray-700 transition-colors">
  Jump to leaderboards
 <span aria-hidden>→</span>
 </Link>
 </div>
 <div className="lg:col-span-6 lg:border-l lg:border-gray-200 lg:pl-12">
 <p className="font-sans text-gray-500 text-xs tracking-[0.25em] uppercase mb-4">The breakdown</p>
 <div className="grid grid-cols-3 gap-3 mb-6">
 <BigStat n={counts.profitable} label="Profitable" tone="green" />
 <BigStat n={counts.improving} label="Loss narrowing" tone="amber" />
 <BigStat n={counts.worsening} label="Loss widening" tone="orange" />
 </div>
 <p className="font-sans text-gray-500 text-xs leading-relaxed">
  Of <strong className="text-black">{companies.length}</strong> companies in this index, <strong className="text-black">{counts.profitable}</strong> reported a profit after tax on their latest audited filing. Narrowing and widening compare the loss with the prior year.
 </p>
 </div>
 </div>
 </div>

 {/* ── TAKEAWAYS BAR: 3 quick conclusions ────────────── */}
 <div className="bg-gray-900">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
 <div className="grid sm:grid-cols-3 gap-4">
 <Takeaway
  eyebrow="Sector winner"
  headline={winningSector ? `${winningSector[0]} leads profitability` : ','}
  body={
  winningSector
 ? `${winningSector[1].profitable} of ${winningSector[1].total} companies in this sector are profitable, the highest hit-rate in the index.`
 : 'Not enough data.'
 }
  accent="text-green-400"
 />
 <Takeaway
  eyebrow="Sector laggard"
  headline={laggingSector ? `${laggingSector[0]} drags the most` : ','}
  body={
  laggingSector
 ? `Only ${laggingSector[1].profitable} of ${laggingSector[1].total} are profitable. The rest are still in capital-deployment mode.`
 : 'Not enough data.'
 }
  accent="text-orange-400"
 />
 <Takeaway
  eyebrow="The pattern"
  headline="Capital is funding the gap"
  body={`${lossPct}% of the index reported a loss after tax. Equity raised, borrowings, or parent support fund that gap; each article shows which.`}
  accent="text-brand-red"
 />
 </div>
 </div>
 </div>

 {/* ── PULL QUOTE ────────────────────────────────────────── */}
 <div className="bg-black">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 lg:py-20 text-center">
 <p className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl leading-[1.3] font-medium max-w-3xl mx-auto">
  {profitablePct}% of the startups in this index reported a profit on their latest audited filing. The other {lossPct}% are funded by capital, not yet by operations.
 </p>
 <p className="font-sans text-white/60 text-xs uppercase tracking-[0.25em] mt-8">
  Source: latest available audited annual financial statements
 </p>
 </div>
 </div>

 {/* ── THIN BALANCE-SHEET BUFFER ─────────────────── */}
 {thinBuffer.length > 0 && (
 <div className="bg-red-50 border-y border-red-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
 <div className="flex items-start gap-4 mb-6">
 <span className="flex-shrink-0 inline-block w-1.5 h-12 bg-red-600 rounded-full" aria-hidden />
 <div>
 <p className="font-sans text-red-700 text-xs tracking-[0.25em] uppercase font-bold mb-2">Thin balance-sheet buffer</p>
 <h2 className="font-serif text-red-900 text-3xl sm:text-4xl font-bold leading-tight">
 {thinBuffer.length} {thinBuffer.length === 1 ? 'company whose' : 'companies whose'} net worth covers less than a year of losses
 </h2>
 <p className="font-sans text-red-800/80 text-sm mt-2 max-w-2xl">
  Closing net worth divided by the latest annual loss. It is a ratio from the filing, not a forecast: funding raised after
  year-end, parent support, or a narrower loss all change it. Each article explains which applies.
 </p>
 </div>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {thinBuffer.map((a) => (
 <Link
  key={a.slug}
  href={`/${a.slug}`}
  className="group block bg-white border border-red-200 rounded-xl p-4 hover:border-red-400 hover:shadow-md transition-all"
 >
 <div className="flex items-center justify-between mb-2">
 <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
  Net worth / annual loss
 </span>
 <span className="font-serif font-bold text-red-700 text-lg">{bufferMonths(a)}mo</span>
 </div>
 <p className="font-serif font-bold text-black text-base group-hover:text-brand-red transition-colors">{a.company}</p>
 <p className="font-sans text-gray-500 text-xs truncate mt-0.5">{a.sector?.split('/')[0]?.trim()} · {getFinancials(a)?.period} {getFinancials(a)?.basis}</p>
 </Link>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* ── MOVEMENT BAND: turned-profit ────────────────── */}
 {turnedProfit.length > 0 && (
 <div className="bg-green-50 border-b border-green-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
 <div className="flex items-start gap-4 mb-6">
 <span className="flex-shrink-0 inline-block w-1.5 h-12 bg-green-600 rounded-full" aria-hidden />
 <div>
 <p className="font-sans text-green-700 text-xs tracking-[0.25em] uppercase font-bold mb-2">Recent movement</p>
 <h2 className="font-serif text-green-900 text-3xl sm:text-4xl font-bold leading-tight">
  Companies that crossed loss → profit
 </h2>
 <p className="font-sans text-green-800 text-sm mt-2 max-w-2xl">
  A loss after tax in the prior year, a profit after tax in the latest audited filing.
 </p>
 </div>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {turnedProfit.map((a) => (
 <Link
  key={a.slug}
  href={`/${a.slug}`}
  className="group block bg-white border border-green-200 rounded-xl p-4 hover:border-green-400 hover:shadow-md transition-all"
 >
 <div className="flex items-center justify-between mb-2">
 <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
  Loss → Profit
 </span>
 </div>
 <p className="font-serif font-bold text-black text-base group-hover:text-brand-red transition-colors">{a.company}</p>
 <p className="font-sans text-gray-500 text-xs truncate mt-0.5">{a.sector?.split('/')[0]?.trim()}</p>
 </Link>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* ── THE LEADERBOARDS ─────────────────────── */}
 <div id="leaderboards" className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 scroll-mt-20">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
 <div className="mb-10 text-center">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase mb-3">The leaderboards</p>
 <h2 className="font-serif text-black text-3xl sm:text-5xl font-bold leading-tight max-w-3xl mx-auto">
  Ranked by what the audit actually says.
 </h2>
 <p className="font-sans text-gray-500 text-sm mt-4 max-w-xl mx-auto">
  Five leaderboards, one source: latest available audited annual filings of each entity that operates the brand.
 </p>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-5">
 <Leaderboard
  title="Most Profit"
  subtitle="Top 10 by absolute PAT (₹ Cr)"
  accent="green"
  entries={topProfit.map((p) => ({
  article: p.article,
  metric: fmtCrSigned(p.pat as number),
  metricSub: p.rev !== null ? `Revenue ${fmtCr(p.rev)}` : undefined,
 }))}
 />
 <Leaderboard
  title="Highest Net Margin"
  subtitle="Top 10 by PAT/Revenue (₹50 Cr+ revenue)"
  accent="blue"
  entries={topMargin.map((p) => ({
  article: p.article,
  metric: fmtPct(p.margin as number),
  metricSub: p.rev !== null ? `Revenue ${fmtCr(p.rev)}` : undefined,
 }))}
 />
 <Leaderboard
  title="Largest Revenue"
  subtitle="Top 10 by topline (₹ Cr)"
  accent="amber"
  entries={topRevenue.map((p) => ({
  article: p.article,
  metric: fmtCr(p.rev as number),
  metricSub: p.pat !== null ? (p.pat >= 0 ? `Profit ${fmtCrSigned(p.pat)}` : `Loss ${fmtCrSigned(p.pat)}`) : undefined,
 }))}
 />
 </div>
 <div className="grid sm:grid-cols-2 gap-5">
 <Leaderboard
  title="Biggest Losses"
  subtitle="Top 10 by absolute net loss (₹ Cr)"
  accent="red"
  entries={biggestLosses.map((p) => ({
  article: p.article,
  metric: fmtCrSigned(p.pat as number),
  metricSub: p.rev !== null ? `Revenue ${fmtCr(p.rev)}` : undefined,
 }))}
 />
 <Leaderboard
  title="Most Inefficient"
  subtitle="Top 10 by loss as % of revenue (₹10 Cr+ revenue)"
  accent="red"
  entries={mostInefficient.map((p) => ({
  article: p.article,
  metric: `-${p.lossRatio.toFixed(0)}%`,
  metricSub: p.rev !== null && p.pat !== null
 ? `Loss ${fmtCrSigned(p.pat)} on ${fmtCr(p.rev)}`
 : undefined,
 }))}
 />
 </div>
 <p className="font-sans text-gray-500 text-xs text-center mt-8 max-w-2xl mx-auto leading-relaxed">
  Each company is counted once, from its primary teardown: revenue from operations and profit after tax for the period and basis
  (consolidated or standalone) that article leads with. Where a brand operates through several entities, the article specifies which one each number covers.
 </p>
 </div>
 </div>

 {/* ── WHY PROFITABILITY MATTERS ────────────────────── */}
 <div className="bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid lg:grid-cols-2 gap-12 items-start">
 <div>
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase mb-4">Why this matters</p>
 <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight mb-6">
  Funding rounds compound losses. Profitability compounds value.
 </h2>
 <div className="font-sans text-gray-600 text-sm leading-relaxed space-y-4">
 <p>
  Most Indian startup news is about funding rounds. The number that matters for the business is whether the
  company makes money on its core operations.
 </p>
 <p>
  Press releases use defined-by-the-author terms like <em>contribution margin positive</em>,
 <em> adjusted EBITDA breakeven</em>, or <em>profitable on a unit basis</em>. Audited PAT is a single,
  standardised, regulator-filed number. We use the second.
 </p>
 <p className="text-black font-semibold">
  Profitable Indian startups are rare. The ones that are profitable are compounding meaningfully.
  The ones that aren&apos;t are running on capital, not operations.
 </p>
 </div>
 </div>

 <div>
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase mb-4">How to use this index</p>
 <ul className="space-y-3 font-sans text-gray-700 text-sm leading-relaxed">
 <li className="flex gap-3">
 <span className="font-serif text-brand-red text-xl font-bold leading-none">1.</span>
 <span><strong className="text-black">Check the category</strong> a company falls in. Then read the article for the why.</span>
 </li>
 <li className="flex gap-3">
 <span className="font-serif text-brand-red text-xl font-bold leading-none">2.</span>
 <span><strong className="text-black">Read the leaderboard rank</strong> in context. #1 in revenue is not #1 in profit. High margin on small revenue is different from low margin on large revenue.</span>
 </li>
 <li className="flex gap-3">
 <span className="font-serif text-brand-red text-xl font-bold leading-none">3.</span>
 <span><strong className="text-black">Open the article</strong> for cost structure, OCF, and balance sheet. Profitability is the headline; the article explains how it got there.</span>
 </li>
 <li className="flex gap-3">
 <span className="font-serif text-brand-red text-xl font-bold leading-none">4.</span>
 <span><strong className="text-black">Subscribe</strong> to be notified when a company moves between categories at the next audited filing.</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 {/* ── THE FULL INDEX ─────────────────────────────────────────── */}
 <div id="index" className="bg-gray-50 border-y border-gray-100 scroll-mt-20">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
 <div className="mb-8">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase mb-3">The full index</p>
 <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight max-w-3xl">
  Every company we&apos;ve analysed, with category and article.
 </h2>
 </div>
 <ProfitabilityIndexGrid companies={companies} />
 </div>
 </div>

 {/* ── DEEP CAVEATS ────────────────────────────────────────────── */}
 <div className="bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
 <div className="grid lg:grid-cols-3 gap-8">
 <div className="lg:col-span-1">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase mb-4">Read carefully</p>
 <h2 className="font-serif text-black text-3xl font-bold leading-tight mb-4">
  What &ldquo;profitable&rdquo; really means in a filing
 </h2>
 <p className="font-sans text-gray-600 text-sm leading-relaxed">
  A positive PAT is not always operating profit. The audit can show a profit driven by deferred tax credits,
  one-time gains, or accounting choices. The article on each company specifies which.
 </p>
 </div>
 <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
 <CaveatCard title="DTA-driven PAT" color="bg-yellow-50 border-yellow-200 text-yellow-800" body="Some companies report a positive PAT because they recognised a deferred tax asset (DTA), a non-cash credit that reduces tax expense. Operating PBT may still be a loss. We flag these inside the article." />
 <CaveatCard title="Standalone vs consolidated" color="bg-blue-50 border-blue-200 text-blue-800" body="A company can be profitable at the holding-company level (standalone) but loss-making at the group level (consolidated), or vice-versa. The category here reflects the entity-level view; the article shows both." />
 <CaveatCard title="Loss deepening is not always bad" color="bg-orange-50 border-orange-200 text-orange-800" body="A growing NBFC's loan book mechanically produces deeper losses (and negative operating cash flow) while staying healthy. Look at borrowings, OCF, and credit cost trajectory in the article." />
 <CaveatCard title="The buffer ratio is time-bound" color="bg-red-50 border-red-200 text-red-800" body="Net worth divided by annual loss, measured at the most recent year-end. Funding raised after year-end, parent support, or a narrower loss changes it. Negative net worth is excluded: in subsidiaries it often reflects intercompany funding, not distress." />
 </div>
 </div>
 </div>
 </div>

 {/* ── CROSS-LINKS ───────────────────────── */}
 <div className="bg-black">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
 <p className="font-sans text-white/60 text-xs tracking-[0.25em] uppercase mb-6">Other ways to slice the data</p>
 <div className="grid sm:grid-cols-3 gap-4">
 <CrossLink href="/startup-jobs" title="Startup Jobs Index" body="Runway, payroll trends, employment stability before you join." />
 <CrossLink href="/employer-check" title="Employer Check" body="Five-dimension employer rating across Indian startups." />
 <CrossLink href="/reality-check" title="Reality Check" body="Growth quality, sustainability, and profitability path scores." />
 </div>
 </div>
 </div>

 {/* ── DISCLAIMER ────────────────────────────────────────────── */}
 <div className="bg-yellow-50 border-y border-yellow-100">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
 <p className="font-sans font-bold text-yellow-800 text-xs tracking-widest uppercase mb-3">Disclaimer</p>
 <p className="font-sans text-yellow-700 text-sm leading-relaxed max-w-3xl">
  All rankings and classifications are based on the most recent available audited statements, typically 6&ndash;18 months behind real time.
  A new funding round, a turnaround quarter, or a regulatory change is not reflected here until the next filing arrives.
  Numbers are the revenue from operations and profit after tax recorded for each company&apos;s primary teardown, on the basis that
  article leads with. Audited numbers describe a specific legal entity, not a brand; where a brand operates through several
  entities, the article specifies which one the numbers cover. The article is the authoritative source.
 </p>
 </div>
 </div>

 {/* ── CTA ──────────────────────────────────────────────────── */}
 <div className="bg-brand-red">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
 <div>
 <p className="font-serif text-white text-2xl font-bold mb-1">New filings reorder the leaderboard every quarter.</p>
 <p className="font-sans text-white/80 text-sm">Get notified when a company moves up, down, or out of a category.</p>
 </div>
 <Link href="/subscribe" className="flex-shrink-0 bg-white text-brand-red font-sans font-bold text-sm px-6 py-3 rounded hover:bg-yellow-50 transition-colors">
  Subscribe <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>

 </div>
 )
}

// ── Sub-components ───────────────────────────────────────────────────

const toneMap = {
  green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
} as const

function BigStat({ n, label, tone, alert }: { n: number; label: string; tone: keyof typeof toneMap; alert?: boolean }) {
  const t = toneMap[tone]
  return (
 <div className={`relative ${t.bg} border ${t.border} rounded-xl p-4`}>
 {alert && n > 0 && (
 <span className="absolute top-2.5 right-2.5 inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden />
 )}
 <p className={`font-serif text-3xl font-bold leading-none ${t.text}`}>{n}</p>
 <p className={`font-sans text-[11px] uppercase tracking-widest mt-1 ${t.text}/80`}>{label}</p>
 </div>
 )
}

function Takeaway({ eyebrow, headline, body, accent }: { eyebrow: string; headline: string; body: string; accent: string }) {
  return (
 <div className="border border-white/10 rounded-xl p-5 bg-white/5">
 <p className={`font-sans text-[10px] uppercase tracking-[0.25em] font-bold ${accent} mb-2`}>{eyebrow}</p>
 <p className="font-serif text-white text-lg sm:text-xl font-bold leading-snug mb-2">{headline}</p>
 <p className="font-sans text-white/60 text-xs leading-relaxed">{body}</p>
 </div>
 )
}

function CaveatCard({ title, color, body }: { title: string; color: string; body: string }) {
  return (
 <div className={`border rounded-xl p-5 ${color}`}>
 <p className="font-sans font-bold text-xs tracking-widest uppercase mb-2">{title}</p>
 <p className="font-sans text-sm leading-relaxed">{body}</p>
 </div>
 )
}

function CrossLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
 <Link href={href} className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
 <p className="font-serif text-white text-lg font-bold mb-1 group-hover:text-brand-red transition-colors">{title}</p>
 <p className="font-sans text-white/50 text-xs leading-relaxed">{body}</p>
 </Link>
 )
}
