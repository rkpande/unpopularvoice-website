import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getFeaturedArticle, formatDisplayDate, parseUpdatedAt } from '@/lib/articles'
import { getAllComparisons } from '@/lib/comparisons'
import { onePerCompany } from '@/lib/financials'
import { getContradictionArticles } from '@/lib/spectrum'
import Hero from '@/components/home/Hero'
import FeaturedArticle from '@/components/home/FeaturedArticle'
import ContradictionCards from '@/components/home/ContradictionCards'
import SpectrumBand from '@/components/home/SpectrumBand'
import IndexesPanel from '@/components/home/IndexesPanel'
import TeardownDirectory from '@/components/home/TeardownDirectory'
import WhoReads from '@/components/home/WhoReads'

export const metadata: Metadata = {
  title: 'Indian Startup Revenue & Profit (From Filings, Not PR)',
  description:
 'FY2025 data for Indian startups from audited public filings. Zerodha ₹4,232 Cr profit, plus PhonePe, Razorpay, Porter. Real numbers, not press releases.',
}

export default function HomePage() {
  const all = getAllArticles()
  const featured = getFeaturedArticle()
  const comparisons = getAllComparisons().slice(0, 3)
  const teardownCount = all.length
  const companyCount = onePerCompany(all).length
  const lastUpdated = formatDisplayDate(
    all.reduce((m, a) => (parseUpdatedAt(a.updatedAt) > parseUpdatedAt(m) ? a.updatedAt : m), all[0]?.updatedAt ?? ''),
  )

  // Each company appears once above the directory: the hero's three, then
  // contradictions without them, then the Spectrum without either.
  const heroArticles = all.slice(0, 3)
  const shown = new Set(heroArticles.map((a) => a.company))
  // One article per company (the newest) for the curated rows.
  const newestPerCompany = all.filter((a, i) => all.findIndex((b) => b.company === a.company) === i)
  const contradictionPool = newestPerCompany.filter((a) => !shown.has(a.company))
  getContradictionArticles(contradictionPool, 4).forEach((a) => shown.add(a.company))
  if (featured) shown.add(featured.company)
  const spectrumPool = newestPerCompany.filter((a) => !shown.has(a.company))

  // Navigation ItemList hints Google about the main site sections for potential sitelinks
  const siteNavLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://unpopularvoice.com/#main-nav',
    name: 'UnpopularVoice main navigation',
    itemListElement: [
      { '@type': 'SiteNavigationElement', position: 1, name: 'All Articles', description: 'Audited financial teardowns of Indian startups', url: 'https://unpopularvoice.com/articles' },
      { '@type': 'SiteNavigationElement', position: 2, name: 'Compare', description: 'Side-by-side audit comparisons of category rivals', url: 'https://unpopularvoice.com/compare' },
      { '@type': 'SiteNavigationElement', position: 3, name: 'Reality Check', description: 'Hype vs audit: who is actually profitable', url: 'https://unpopularvoice.com/reality-check' },
      { '@type': 'SiteNavigationElement', position: 4, name: 'Profitability Index', description: 'Ranking of Indian startups by audited profit', url: 'https://unpopularvoice.com/profitability-index' },
      { '@type': 'SiteNavigationElement', position: 5, name: 'Employer Check', description: 'Financial health signal for prospective employees', url: 'https://unpopularvoice.com/employer-check' },
      { '@type': 'SiteNavigationElement', position: 6, name: 'Startup Jobs', description: 'Jobs at audited-financially-healthy Indian startups', url: 'https://unpopularvoice.com/startup-jobs' },
      { '@type': 'SiteNavigationElement', position: 7, name: 'Methodology', description: 'How we read public filings and score companies', url: 'https://unpopularvoice.com/methodology' },
    ],
  }

  return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavLd) }} />
 <Hero topArticles={heroArticles} teardownCount={teardownCount} companyCount={companyCount} />

 <ContradictionCards articles={contradictionPool} />

 {featured && <FeaturedArticle article={featured} />}

 <SpectrumBand articles={spectrumPool} />

 {comparisons.length > 0 && (
 <section className="bg-gray-50 border-b border-gray-100">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
 <div className="flex items-baseline justify-between flex-wrap gap-3 mb-8">
 <div className="max-w-3xl">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">
  Matchups
 </p>
 <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight">
  Two companies. Same business. Different ending.
 </h2>
 </div>
 <Link
  href="/compare"
  className="inline-flex items-center min-h-[44px] font-sans font-semibold text-brand-red text-sm hover:underline"
 >
  All {getAllComparisons().length} matchups <span aria-hidden="true">→</span>
 </Link>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {comparisons.map((c) => (
 <Link
  key={c.slug}
  href={`/compare/${c.slug}`}
  className="group block bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-colors"
 >
 <p className="font-serif text-black text-xl font-bold leading-snug mb-3 group-hover:text-brand-red transition-colors text-balance">
 {c.title}
 </p>
 <p className="font-sans text-gray-600 text-sm leading-relaxed line-clamp-3">
 {c.thesis}
 </p>
 </Link>
 ))}
 </div>
 </div>
 </section>
 )}

 <IndexesPanel />

 <TeardownDirectory articles={all} />

 <WhoReads teardownCount={teardownCount} companyCount={companyCount} lastUpdated={lastUpdated} />
 </>
 )
}
