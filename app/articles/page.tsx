import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import ArticleGrid from '@/components/browse/ArticleGrid'
import { SPECTRUM, type SpectrumKey, getSpectrum } from '@/lib/spectrum'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

export const metadata: Metadata = {
  title: 'Indian Startup Financials, From Filings, Not PR',
  description: 'Indian startups. Revenue, profit, and debt from audited public filings. What the numbers actually say, not press releases. Zerodha, Razorpay, PhonePe, Porter, Rapido, UltraHuman and more.',
  alternates: {
  canonical: 'https://unpopularvoice.com/articles',
 },
}

const SPECTRUM_ORDER: SpectrumKey[] = ['working', 'scaling', 'progress', 'restructuring', 'broken']

interface PageProps {
  searchParams?: { spectrum?: string; q?: string }
}

export default function ArticlesPage({ searchParams }: PageProps) {
  const all = getAllArticles()
  const spectrumParam = searchParams?.spectrum as SpectrumKey | undefined
  const validSpectrum =
  spectrumParam && SPECTRUM_ORDER.includes(spectrumParam) ? spectrumParam : null
  const qRaw = (searchParams?.q || '').trim().toLowerCase()
  const bySpectrum = validSpectrum
 ? all.filter((a) => getSpectrum(a) === validSpectrum)
 : all
  const articles = qRaw
 ? bySpectrum.filter(
     (a) =>
       a.title.toLowerCase().includes(qRaw) ||
       a.company.toLowerCase().includes(qRaw) ||
       (a.sector || '').toLowerCase().includes(qRaw)
   )
 : bySpectrum
  const activeBucket = validSpectrum ? SPECTRUM[validSpectrum] : null

  const canonical = `${SITE_URL}/articles`
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: canonical },
    ],
  }
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Indian Startup Financials, From Filings, Not PR',
    description: `${all.length} audited financial teardowns of Indian startups.`,
    url: canonical,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/${a.slug}`,
        name: a.title,
      })),
    },
  }

  return (
 <div className="min-h-[calc(100vh-72px)]">
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
 <div className="bg-black border-b border-white/10">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
 <div className="w-12 h-1 bg-brand-red mb-6" />
 <h1 className="font-serif text-white text-5xl font-bold mb-4 leading-tight">
 {activeBucket ? activeBucket.label : 'What the filings say.'}
 </h1>
 <p className="font-sans text-white/50 text-lg max-w-2xl">
 {activeBucket
 ? activeBucket.description
 : `${all.length} Indian startups. Revenue, profit, debt, and cash flow from audited public filings. Not press releases. Not founder interviews. Not analyst estimates.`}
 </p>
 {activeBucket && (
 <p className="font-sans text-white/60 text-sm mt-3">
  Showing {articles.length} of {all.length} articles.{' '}
 <Link href="/articles" className="text-brand-red hover:underline">
  Clear filter
 </Link>
 </p>
 )}
 </div>

 <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-6 -mt-4">
 <div className="flex flex-wrap gap-2">
 <Link
  href="/articles"
  className={`font-sans text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
 !activeBucket
 ? 'bg-white text-black border-white'
 : 'bg-transparent text-white/70 border-white/20 hover:border-white/40 hover:text-white'
 }`}
 >
  All
 </Link>
 {SPECTRUM_ORDER.map((k) => {
  const b = SPECTRUM[k]
  const isActive = activeBucket?.key === k
  return (
 <Link
  key={k}
  href={`/articles?spectrum=${k}`}
  className={`font-sans text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
  isActive
 ? 'bg-white text-black border-white'
 : 'bg-transparent text-white/70 border-white/20 hover:border-white/40 hover:text-white'
 }`}
 >
 {b.shortLabel}
 </Link>
 )
 })}
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 pb-24">
 <ArticleGrid articles={articles} />
 </div>
 </div>
 )
}
