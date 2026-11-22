import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const revalidate = 86400

import { getAllComparisons, getComparisonBySlug } from '@/lib/comparisons'
import { formatDisplayDate, parseUpdatedAt, firstSentence } from '@/lib/articles'
import { getPrimaryAuthor, getAuthor } from '@/lib/authors'
import { lastModified, bylineCorrection } from '@/lib/corrections'
import CorrectionsNote from '@/components/CorrectionsNote'

import FinancialTable from '@/components/mdx/FinancialTable'
import InsightBox from '@/components/mdx/InsightBox'
import ChartBlock from '@/components/mdx/ChartBlock'
import KeyMetrics from '@/components/mdx/KeyMetrics'
import CenterpieceTable from '@/components/mdx/CenterpieceTable'
import SignatureLine from '@/components/mdx/SignatureLine'
import PullQuote from '@/components/mdx/PullQuote'
import MatchupHeader from '@/components/mdx/MatchupHeader'
import VersusBlock from '@/components/mdx/VersusBlock'
import JargonKey from '@/components/mdx/JargonKey'
import SplitView from '@/components/mdx/SplitView'
import TakeawayCard from '@/components/mdx/TakeawayCard'
import ContrastRow from '@/components/mdx/ContrastRow'
import TripleView from '@/components/mdx/TripleView'

const mdxComponents = {
  FinancialTable,
  InsightBox,
  ChartBlock,
  KeyMetrics,
  CenterpieceTable,
  SignatureLine,
  PullQuote,
  MatchupHeader,
  VersusBlock,
  JargonKey,
  SplitView,
  TakeawayCard,
  ContrastRow,
  TripleView,
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

function bestCompareDesc(cmp: { metaDescription?: string; excerpt?: string; thesis: string }): string {
  if (cmp.metaDescription && cmp.metaDescription.length <= 165) return cmp.metaDescription
  return firstSentence(cmp.excerpt || cmp.thesis || cmp.metaDescription || '', 155)
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cmp = getComparisonBySlug(params.slug)
  if (!cmp) return {}

  const canonicalUrl = `${SITE_URL}/compare/${cmp.slug}`
  const desc = bestCompareDesc(cmp)

  return {
    title: cmp.title,
    description: desc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: cmp.title,
      description: desc,
      url: canonicalUrl,
      type: 'article',
      publishedTime: parseUpdatedAt(cmp.updatedAt).toISOString(),
      modifiedTime: lastModified(cmp.updatedAt, cmp.corrections).toISOString(),
      authors: [getPrimaryAuthor().name],
      tags: [cmp.category, 'startup comparison', 'Indian startups'],
    },
    twitter: {
      card: 'summary_large_image',
      title: cmp.title,
      description: desc,
    },
  }
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const cmp = getComparisonBySlug(params.slug)
  if (!cmp) notFound()

  const otherComparisons = getAllComparisons().filter((c) => c.slug !== cmp.slug).slice(0, 3)
  const author = (cmp.author && getAuthor(cmp.author)) || getPrimaryAuthor()

  const canonical = `${SITE_URL}/compare/${cmp.slug}`
  const ogImage = `${SITE_URL}/og?title=${encodeURIComponent(cmp.title)}&company=${encodeURIComponent(cmp.category)}&sector=${encodeURIComponent(cmp.category)}`
  const companies = [cmp.metaA, cmp.metaB, cmp.metaC].filter(Boolean) as Array<{ company: string; slug: string }>
  const isoDate = parseUpdatedAt(cmp.updatedAt).toISOString()
  const modifiedIso = lastModified(cmp.updatedAt, cmp.corrections).toISOString()
  const latestCorrection = bylineCorrection(cmp.updatedAt, cmp.corrections)

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${SITE_URL}/compare` },
      { '@type': 'ListItem', position: 3, name: cmp.title, item: canonical },
    ],
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cmp.title,
    description: bestCompareDesc(cmp),
    image: [{ '@type': 'ImageObject', url: ogImage, width: 1200, height: 630 }],
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/author/${author.slug}#person`,
      name: author.name,
      url: `${SITE_URL}/author/${author.slug}`,
      jobTitle: author.role,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    datePublished: isoDate,
    dateModified: modifiedIso,
    url: canonical,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    about: companies.map((c) => ({
      '@type': 'Organization',
      name: c.company,
      url: `${SITE_URL}/${c.slug}`,
    })),
    articleSection: cmp.category,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    keywords: [cmp.category, ...companies.map((c) => c.company), 'Indian startups', 'startup comparison'].join(', '),
  }

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <div className="bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-16 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/compare" className="font-sans text-white/60 text-xs hover:text-white transition-colors">
              <span aria-hidden="true">←</span> All comparisons
            </Link>
          </div>
          <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase mb-4">{cmp.category}</p>
          <div className="w-10 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-3xl sm:text-5xl font-bold leading-[1.05] mb-4">{cmp.title}</h1>
          <p className="font-sans text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">{cmp.thesis}</p>
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            <span className="font-sans text-white/60 text-xs" rel="author">
              By{' '}
              <Link
                href={`/author/${author.slug}`}
                className="font-semibold text-white hover:text-brand-red transition-colors"
              >
                {author.name}
              </Link>
            </span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <p className="font-sans text-white/60 text-xs">
              {latestCorrection ? (
                <a href="#corrections" className="hover:text-white underline-offset-4 hover:underline">
                  Corrected <time dateTime={modifiedIso}>{latestCorrection[0]}</time>
                </a>
              ) : (
                <time dateTime={isoDate}>{formatDisplayDate(cmp.updatedAt)}</time>
              )}
            </p>
            <span aria-hidden="true" className="text-white/30">·</span>
            <p className="font-sans text-white/60 text-xs">{cmp.readTime}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <MatchupHeader metaA={cmp.metaA} metaB={cmp.metaB} metaC={cmp.metaC} category={cmp.category} />

        <div className="prose prose-lg max-w-none font-sans mt-10">
          <MDXRemote
            source={cmp.content}
            components={mdxComponents}
            options={{
              blockJS: false,
              mdxOptions: {
                rehypePlugins: [rehypeSlug],
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
        <CorrectionsNote corrections={cmp.corrections} />
      </article>

      {/* Other comparisons */}
      {otherComparisons.length > 0 && (
        <div className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
            <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-3">More comparisons</p>
            <h2 className="font-serif text-black text-2xl font-bold mb-6">Other matchups in the index</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherComparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-black transition-colors"
                >
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-500 mb-2">{c.category}</p>
                  <p className="font-serif text-black text-lg font-bold leading-snug mb-2 group-hover:text-brand-red transition-colors">{c.title}</p>
                  <p className="font-sans text-gray-500 text-xs leading-relaxed line-clamp-3">{c.thesis}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
        <p className="font-sans text-gray-500 text-xs border-t border-gray-100 pt-6">
          All numbers are from the most recent audited annual financial statements at the legal entity that operates each brand. Where a company operates through both a parent and a subsidiary, the underlying article specifies which entity the numbers cover.{' '}
          <Link href="/methodology" className="text-brand-red underline underline-offset-4 hover:text-black">Full methodology <span aria-hidden="true">→</span></Link>
        </p>
      </div>
    </div>
  )
}
