import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getAllSectors,
  getSectorBySlug,
  getArticlesBySector,
} from '@/lib/sectors'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

// Pre-render every sector present in the corpus so Google crawls them all
export async function generateStaticParams() {
  return getAllSectors().map((s) => ({ sector: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { sector: string }
}): Promise<Metadata> {
  const sector = getSectorBySlug(params.sector)
  if (!sector) return {}
  const canonical = `${SITE_URL}/sector/${sector.slug}`
  const desc = `${sector.count} audited financial teardowns of ${sector.label} startups. Revenue, losses, cash flow, debt. From public filings only.`
  return {
    title: `${sector.label} startups: audited financials`,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: `${sector.label} startups: audited financials`,
      description: desc,
      url: canonical,
      type: 'website',
    },
  }
}

export default function SectorPage({ params }: { params: { sector: string } }) {
  const sector = getSectorBySlug(params.sector)
  if (!sector) notFound()

  const articles = getArticlesBySector(sector.label)
  const allSectors = getAllSectors()
  const canonical = `${SITE_URL}/sector/${sector.slug}`

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Sectors', item: `${SITE_URL}/articles` },
      { '@type': 'ListItem', position: 3, name: sector.label, item: canonical },
    ],
  }

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${sector.label} startups: audited financials`,
    description: `${sector.count} audited financial teardowns of ${sector.label} startups.`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      {/* Header */}
      <div className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="w-12 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-5xl font-bold mb-3">{sector.label}</h1>
          <p className="font-sans text-white/50 text-lg">
            {sector.count} audited teardown{sector.count === 1 ? '' : 's'}. Data first, narratives last.
          </p>
        </div>
      </div>

      {/* Sector filter pills, dynamic from the corpus */}
      <div className="border-b border-gray-100 bg-white sticky top-[72px] z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex gap-2 overflow-x-auto">
          {allSectors.map((s) => (
            <Link
              key={s.slug}
              href={`/sector/${s.slug}`}
              className={`font-sans text-xs font-semibold px-4 py-2 rounded whitespace-nowrap transition-colors ${
                s.slug === sector.slug
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s.label} <span className="opacity-60">({s.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="divide-y divide-gray-100">
          {articles.map((article) => (
            <div key={article.slug} className="py-8 flex items-start justify-between gap-8 group">
              <div>
                <p className="font-sans font-semibold text-brand-red text-[10px] tracking-widest uppercase mb-2">
                  {article.company}
                </p>
                <Link href={`/${article.slug}`}>
                  <h2 className="font-serif text-black text-xl font-bold leading-snug group-hover:text-brand-red transition-colors mb-2">
                    {article.title}
                  </h2>
                </Link>
                {article.excerpt && (
                  <p className="font-sans text-gray-500 text-sm">{article.excerpt}</p>
                )}
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="font-sans text-xs text-gray-400 mb-1">{article.readTime} read</p>
                <Link
                  href={`/${article.slug}`}
                  className="font-sans font-semibold text-brand-red text-sm hover:underline"
                >
                  Read →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

