import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
import { getAllComparisons } from '@/lib/comparisons'
import { onePerCompany } from '@/lib/financials'
import Hero from '@/components/home/Hero'
import StatsTicker from '@/components/home/StatsTicker'
import FeaturedArticle from '@/components/home/FeaturedArticle'
import ContradictionCards from '@/components/home/ContradictionCards'
import SpectrumBand from '@/components/home/SpectrumBand'
import ForensicFinds from '@/components/home/ForensicFinds'
import WordmarkGrid from '@/components/home/WordmarkGrid'
import IndexesPanel from '@/components/home/IndexesPanel'
import NewsletterCTA from '@/components/home/NewsletterCTA'

export const metadata: Metadata = {
  title: 'Indian Startup Revenue & Profit (From Filings, Not PR)',
  description:
 'FY2025 data for Indian startups from audited public filings. Zerodha ₹4,232 Cr profit, plus PhonePe, Razorpay, Porter. Real numbers, not press releases.',
}

export default function HomePage() {
  const all = getAllArticles()
  const featured = getFeaturedArticle()
  const comparisons = getAllComparisons().slice(0, 6)

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
 <Hero topArticles={all.slice(0, 3)} />

 <ContradictionCards articles={all} />

 <SpectrumBand articles={all} />

 {featured && <FeaturedArticle article={featured} />}

 <ForensicFinds articles={all} />

 {comparisons.length > 0 && (
 <section className="bg-gray-50 border-b border-gray-100">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
 <div className="flex items-baseline justify-between flex-wrap gap-3 mb-8">
 <div className="max-w-3xl">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">
  Editorial matchups
 </p>
 <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight">
  Two companies. Same business. Different ending.
 </h2>
 <p className="font-sans text-gray-500 text-sm mt-3 max-w-2xl">
  Two rivals in the same category, compared on their audited filings. Same
  revenue base, different outcomes.
 </p>
 </div>
 <Link
  href="/compare"
  className="font-sans font-semibold text-brand-red text-sm hover:underline hidden sm:block"
 >
  All matchups <span aria-hidden="true">→</span>
 </Link>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {comparisons.map((c) => (
 <Link
  key={c.slug}
  href={`/compare/${c.slug}`}
  className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-black hover:shadow-md transition-all"
 >
 <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-500 mb-3">
 {c.category}
 </p>
 <p className="font-serif text-black text-xl font-bold leading-snug mb-3 group-hover:text-brand-red transition-colors">
 {c.title}
 </p>
 <p className="font-sans text-gray-500 text-sm leading-relaxed line-clamp-3">
 {c.thesis}
 </p>
 <p className="font-sans text-brand-red text-xs font-semibold mt-4 group-hover:underline">
  Read the comparison <span aria-hidden="true">→</span>
 </p>
 </Link>
 ))}
 </div>
 <div className="mt-6 sm:hidden">
 <Link href="/compare" className="font-sans font-semibold text-brand-red text-sm hover:underline">
  All matchups <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>
 </section>
 )}

 <WordmarkGrid articles={all} />

 <IndexesPanel />

 <StatsTicker articles={all} />

 <section className="bg-white border-b border-gray-100">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
 {[
 { value: `${onePerCompany(all).length}`, label: 'Companies analysed' },
 { value: 'FY2025', label: 'Primary dataset' },
 { value: 'Audited', label: 'Audited public source' },
 { value: 'Zero', label: 'Press releases used' },
 ].map(({ value, label }) => (
 <div key={label} className="border-l-2 border-brand-red pl-4">
 <p className="font-serif text-black text-3xl sm:text-4xl font-bold">{value}</p>
 <p className="font-sans text-gray-500 text-xs uppercase tracking-widest mt-1">{label}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <NewsletterCTA />
 </>
 )
}
