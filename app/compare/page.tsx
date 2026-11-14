import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { onePerCompany } from '@/lib/financials'
import { getAllComparisons } from '@/lib/comparisons'
import ComparePanel from '@/components/browse/ComparePanel'

export const metadata: Metadata = {
  title: 'Indian Startup Comparisons: Side by Side from Audited Filings',
  description:
 'Editorial matchups of two Indian startups in the same category, compared on audited public filings. Plus a side-by-side picker for any pair across the index.',
  alternates: {
  canonical: 'https://unpopularvoice.com/compare',
 },
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

export default function ComparePage() {
  const companies = onePerCompany(getAllArticles()).filter((a) => a.employerScore)
  const comparisons = getAllComparisons()

  const canonical = `${SITE_URL}/compare`
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Comparisons', item: canonical },
    ],
  }
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Indian Startup Comparisons: Side by Side from Audited Filings',
    description: `${comparisons.length} editorial matchups of Indian startup rivals, compared on audited financials.`,
    url: canonical,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: comparisons.length,
      itemListElement: comparisons.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/compare/${c.slug}`,
        name: c.title,
      })),
    },
  }

  return (
 <div className="min-h-[calc(100vh-72px)]">
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
 {/* Header */}
 <div className="bg-black">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-16 pb-12">
 <div className="w-10 h-1 bg-brand-red mb-6" />
 <h1 className="font-serif text-white text-4xl sm:text-5xl font-bold leading-tight mb-3">
  Two companies, side by side.
 </h1>
 <p className="font-sans text-white/50 text-base leading-relaxed max-w-2xl">
  Editorial matchups of rivals in the same category, compared on audited filings.
  Or pick any two companies in the index for a side-by-side employer-check view.
 </p>
 </div>
 </div>

 {/* Editorial matchups directory */}
 {comparisons.length > 0 && (
 <div className="bg-gray-50 border-b border-gray-100">
 <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
 <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
 <div>
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">Editorial matchups</p>
 <h2 className="font-serif text-black text-2xl sm:text-3xl font-bold">Rivalries we've taken apart.</h2>
 </div>
 <p className="font-sans text-gray-500 text-sm">{comparisons.length} {comparisons.length === 1 ? 'matchup' : 'matchups'}</p>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {comparisons.map((c) => (
 <Link
  key={c.slug}
  href={`/compare/${c.slug}`}
  className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-black hover:shadow-md transition-all"
 >
 <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-400 mb-3">{c.category}</p>
 <p className="font-serif text-black text-xl font-bold leading-snug mb-3 group-hover:text-brand-red transition-colors">
 {c.title}
 </p>
 <p className="font-sans text-gray-500 text-sm leading-relaxed line-clamp-3">{c.thesis}</p>
 <p className="font-sans text-brand-red text-xs font-semibold mt-4 group-hover:underline">Read the comparison →</p>
 </Link>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* Picker */}
 <div className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
 <div className="mb-8">
 <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">Side-by-side picker</p>
 <h2 className="font-serif text-black text-2xl sm:text-3xl font-bold mb-2">Compare any two companies in the index.</h2>
 <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-2xl">
  Pick two companies. See every employer-check dimension side by side, from the same audited filings.
  Share the link, the comparison is saved in the URL.
 </p>
 </div>
 <Suspense fallback={
 <div className="text-center py-16">
 <p className="font-sans text-gray-400 text-sm">Loading…</p>
 </div>
 }>
 <ComparePanel companies={companies} />
 </Suspense>
 </div>

 {/* Disclaimer */}
 <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-16">
 <p className="font-sans text-gray-400 text-xs border-t border-gray-100 pt-6">
  Labels are derived from audited public filings only. A highlighted label indicates a stronger signal in that dimension compared to the other company. It does not constitute a hiring recommendation.{' '}
 <Link href="/methodology" className="text-brand-red hover:underline">Full methodology →</Link>
 </p>
 </div>
 </div>
 )
}
