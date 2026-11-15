import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { onePerCompany } from '@/lib/financials'
import EmployerSearchGrid from '@/components/browse/EmployerSearchGrid'

export const metadata: Metadata = {
  title: 'Startup Employer Health Check, Before You Join',
  description:
 'Read the public filing before signing the offer. Growth momentum, stability, profitability, funding dependence, career upside, scored from audited data only.',
  alternates: {
  canonical: 'https://unpopularvoice.com/employer-check',
 },
}

export default function EmployerCheckPage() {
  const all = getAllArticles()
  const companies = onePerCompany(all).filter((a) => a.employerScore)

  return (
 <div className="min-h-[calc(100vh-72px)]">

 {/* Hero */}
 <div className="bg-black">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 pb-16">
 <div className="w-12 h-1 bg-brand-red mb-8" />
 <h1 className="font-serif text-white text-5xl sm:text-6xl font-bold leading-[1.08] mb-6">
  Before you sign<br className="hidden sm:block" /> the offer letter.
 </h1>
 <p className="font-sans text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
  Startups tell one story on their careers page. Their public filing tells another.
  We read the filing, so you know what you&apos;re actually joining.
 </p>
 <div className="flex flex-wrap gap-8 border-t border-white/10 pt-8">
 {[
 { n: String(companies.length), label: 'Companies scored' },
 { n: '5', label: 'Dimensions assessed' },
 { n: '0', label: 'Glassdoor reviews used' },
 { n: '100%', label: 'From audited public filings' },
 ].map(({ n, label }) => (
 <div key={label}>
 <p className="font-serif text-brand-red text-3xl font-bold">{n}</p>
 <p className="font-sans text-white/60 text-xs uppercase tracking-widest mt-1">{label}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* What each dimension means */}
 <div className="bg-gray-50 border-b border-gray-100">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
 <div className="flex flex-wrap items-baseline gap-3 mb-6">
 <h2 className="font-serif text-black text-2xl font-bold">How we assess each company</h2>
 <Link href="/methodology" className="font-sans text-brand-red text-sm hover:underline">
  Full methodology <span aria-hidden="true">→</span>
 </Link>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
 {[
 { label: 'Growth Momentum', what: 'YoY revenue growth, operating vs non-recurring, cost trajectory' },
 { label: 'Stability', what: 'Cash vs burn, debt structure, operating cash flow' },
 { label: 'Profitability', what: 'PAT direction, cost-to-income ratio, operating leverage' },
 { label: 'Funding Dependence', what: 'How much of operations is funded by equity vs revenue' },
 { label: 'Career Upside', what: 'Revenue growth + payroll signals + ESOP structure' },
 ].map(({ label, what }) => (
 <div key={label} className="bg-white rounded-lg border border-gray-100 p-4">
 <p className="font-sans font-bold text-black text-xs mb-1.5">{label}</p>
 <p className="font-sans text-gray-500 text-xs leading-relaxed">{what}</p>
 </div>
 ))}
 </div>
 <p className="font-sans text-gray-500 text-xs mt-4">
  Labels: <span className="text-green-700 font-semibold">Strong / Achieved / Low / High</span> · <span className="text-amber-700 font-semibold">Moderate / Improving / High Variance</span> · <span className="text-orange-700 font-semibold">Stretched / Weak / Limited</span> · <span className="text-red-600 font-semibold">Critical / Loss-Deepening / Uncertain</span>
 </p>
 </div>
 </div>

 {/* Search + Company cards */}
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-14">
 <EmployerSearchGrid companies={companies} />
 </div>

 {/* Disclaimer */}
 <div className="bg-yellow-50 border-t border-yellow-100">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
 <p className="font-sans font-bold text-yellow-800 text-xs tracking-widest uppercase mb-4">Important disclaimer</p>
 <div className="grid md:grid-cols-3 gap-6 mb-6">
 {[
 {
  title: 'What this page is',
  body: 'A financial health signal from publicly filed, audited public filings. Every data point is from a filing. Nothing is from press releases, management commentary, Glassdoor, or LinkedIn.',
 },
 {
  title: 'What this page is not',
  body: 'A complete hiring recommendation. Financial health does not measure culture, management quality, team dynamics, career growth environment, work-life balance, or any other employment experience factor.',
 },
 {
  title: 'How to use it',
  body: 'A strong signal means the financial floor is solid from filing data. A caution flag means financial risk is present. Use this alongside your own conversations, reference checks, and judgment, not instead of them.',
 },
 ].map(({ title, body }) => (
 <div key={title}>
 <p className="font-sans font-bold text-yellow-800 text-sm mb-1.5">{title}</p>
 <p className="font-sans text-yellow-700 text-sm leading-relaxed">{body}</p>
 </div>
 ))}
 </div>
 <p className="font-sans text-yellow-700 text-xs border-t border-yellow-200 pt-4">
  Scores are based on the most recent available audited filing. Filings are typically 6–18 months behind real time, a company&apos;s financial position may have changed materially since the filing date.
  UnpopularVoice is not affiliated with any company on this page and has no commercial relationship with any of them.{' '}
 <Link href="/methodology" className="underline hover:text-yellow-800">Full scoring methodology <span aria-hidden="true">→</span></Link>
 </p>
 </div>
 </div>

 {/* CTA */}
 <div className="bg-black">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
 <div>
 <p className="font-serif text-white text-xl font-bold mb-1">New companies added as filings arrive</p>
 <p className="font-sans text-white/50 text-sm">public filings are published year-round. We read them and update scores.</p>
 </div>
 <Link href="/subscribe" className="flex-shrink-0 bg-brand-red text-white font-sans font-semibold text-sm px-6 py-3 rounded hover:bg-red-800 transition-colors">
  Get notified <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>

 </div>
 )
}
