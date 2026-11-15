import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import ArticleTOC from '@/components/mdx/ArticleTOC'

// ISR: generate on first request, cache for 24h, avoids SSG build-time MDX issues while still serving from CDN
export const revalidate = 86400
import { getAllArticles, getArticleBySlug, formatDisplayDate, parseUpdatedAt, bestMetaDescription } from '@/lib/articles'
import { sectorSlug, primarySector, getArticlesBySector } from '@/lib/sectors'
import { getAuthor, getPrimaryAuthor } from '@/lib/authors'
import { lastModified, sortedCorrections } from '@/lib/corrections'
import CorrectionsNote from '@/components/CorrectionsNote'
import Link from 'next/link'
import FinancialTable from '@/components/mdx/FinancialTable'
import RealityScore from '@/components/mdx/RealityScore'
import InsightBox from '@/components/mdx/InsightBox'
import ChartBlock from '@/components/mdx/ChartBlock'
import KeyMetrics from '@/components/mdx/KeyMetrics'
import Assumptions from '@/components/mdx/Assumptions'
import CenterpieceTable from '@/components/mdx/CenterpieceTable'
import SignatureLine from '@/components/mdx/SignatureLine'
import ArticleImage from '@/components/mdx/ArticleImage'
import ArticleTimeline from '@/components/mdx/ArticleTimeline'
import PullQuote from '@/components/mdx/PullQuote'
import RelatedArticles from '@/components/mdx/RelatedArticles'
import EmployerScore from '@/components/mdx/EmployerScore'
import Predictions from '@/components/mdx/Predictions'
import TakeawayCard from '@/components/mdx/TakeawayCard'
import ContrastRow from '@/components/mdx/ContrastRow'
import VersusBlock from '@/components/mdx/VersusBlock'
import SplitView from '@/components/mdx/SplitView'
import JargonKey from '@/components/mdx/JargonKey'

const mdxComponents = {
  FinancialTable,
  RealityScore,
  InsightBox,
  ChartBlock,
  KeyMetrics,
  Assumptions,
  CenterpieceTable,
  SignatureLine,
  ArticleImage,
  ArticleTimeline,
  PullQuote,
  RelatedArticles,
  EmployerScore,
  Predictions,
  TakeawayCard,
  ContrastRow,
  VersusBlock,
  SplitView,
  JargonKey,
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}

  const ogImageUrl = `${SITE_URL}/og?title=${encodeURIComponent(article.title)}&company=${encodeURIComponent(article.company)}&sector=${encodeURIComponent(article.sector)}`
  const canonicalUrl = `${SITE_URL}/${article.slug}`
  const desc = bestMetaDescription(article)

  return {
    title: article.title,
    description: desc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.title,
      description: desc,
      url: canonicalUrl,
      type: 'article',
      publishedTime: parseUpdatedAt(article.updatedAt).toISOString(),
      modifiedTime: lastModified(article.updatedAt, article.corrections).toISOString(),
      authors: [((article.author && getAuthor(article.author)) || getPrimaryAuthor()).name],
      tags: [article.sector, article.company, 'Indian startups', 'financial analysis'],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: desc,
      images: [ogImageUrl],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: primarySector(article.sector), item: `${SITE_URL}/sector/${sectorSlug(primarySector(article.sector))}` },
      { '@type': 'ListItem', position: 3, name: article.company, item: `${SITE_URL}/${article.slug}` },
    ],
  }

  const canonical = `${SITE_URL}/${article.slug}`
  const ogImage = `${SITE_URL}/og?title=${encodeURIComponent(article.title)}&company=${encodeURIComponent(article.company)}&sector=${encodeURIComponent(article.sector)}`
  const sectorName = primarySector(article.sector)
  const isoDate = parseUpdatedAt(article.updatedAt).toISOString()
  const modifiedIso = lastModified(article.updatedAt, article.corrections).toISOString()
  const latestCorrection = sortedCorrections(article.corrections)[0]

  // Auto-generated "More from this sector" — 4 most-recent articles in same sector, excluding this one
  const relatedArticles = getArticlesBySector(sectorName)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4)

  const author = (article.author && getAuthor(article.author)) || getPrimaryAuthor()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: bestMetaDescription(article),
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
    about: { '@type': 'Organization', name: article.company },
    articleSection: sectorName,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    keywords: [article.sector, article.company, 'Indian startups', 'financial analysis', 'audited financials'].join(', '),
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {article.faqItems && article.faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: article.faqItems.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      )}
      {/* Visible breadcrumb — mirrors BreadcrumbList JSON-LD for Google rich-result compliance */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200 border-l-4 border-l-brand-red">
        <ol className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs text-gray-500">
          <li>
            <a href="/" className="hover:text-black transition-colors">Home</a>
          </li>
          <li aria-hidden="true"><span>/</span></li>
          <li>
            <a
              href={`/sector/${sectorSlug(sectorName)}`}
              className="hover:text-black transition-colors uppercase tracking-wide"
            >
              {sectorName}
            </a>
          </li>
          <li aria-hidden="true"><span>/</span></li>
          <li className="font-bold text-brand-red uppercase tracking-wide">{article.company}</li>
          <li className="hidden sm:inline" aria-hidden="true"><span>/</span></li>
          <li className="hidden sm:inline">Source: {article.dataSource}</li>
          <li className="ml-auto shrink-0">
            {latestCorrection ? (
              <a href="#corrections" className="hover:text-black underline-offset-4 hover:underline">
                Corrected: <time dateTime={modifiedIso}>{latestCorrection[0]}</time>
              </a>
            ) : (
              <>Updated: <time dateTime={isoDate}>{formatDisplayDate(article.updatedAt)}</time></>
            )}
          </li>
        </ol>
      </nav>

      {/* Headline block, fused with hero numbers into one unit */}
      <div className="article-col pt-14 pb-0">
        <div className="w-12 h-1 bg-brand-red mb-8" />
        <h1 className="font-serif text-black text-[2.5rem] sm:text-5xl font-bold leading-[1.1] mb-8">
          {article.title}
        </h1>

        {/* Hero numbers, part of the headline, not a separate section */}
        {article.heroNumbers && article.heroNumbers.length > 0 && (
          <div
            className="grid grid-cols-2 md:grid-cols-[var(--hero-cols)] gap-x-6 gap-y-6 border-t border-gray-100 pt-7 pb-8 mb-0"
            style={{ ['--hero-cols' as string]: `repeat(${article.heroNumbers.length}, minmax(0, 1fr))` }}
          >
            {article.heroNumbers.map(({ value, label }, i) => (
              <div
                key={i}
                className={`${i < article.heroNumbers!.length - 1 ? 'md:border-r md:border-gray-100 md:pr-6' : ''} ${
                  i === 0 && article.heroNumbers!.length % 2 === 1 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="font-serif text-[1.75rem] md:text-[2rem] font-bold text-black leading-none mb-2 break-words">
                  {value}
                </div>
                <div className="font-sans text-xs text-gray-500 uppercase tracking-wider leading-snug">
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}

        {article.tldr && article.tldr.length > 0 && (
          <ul className="border-t border-gray-100 pt-6 pb-7 space-y-3 list-disc pl-5 marker:text-gray-500 font-sans text-[1.0625rem] leading-relaxed text-gray-800">
            {article.tldr.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4 pb-6">
          <span className="font-sans text-sm text-gray-600" rel="author">
            By{' '}
            <Link
              href={`/author/${author.slug}`}
              className="font-semibold text-black hover:text-brand-red transition-colors"
            >
              {author.name}
            </Link>
          </span>
          <span className="font-sans text-gray-500 text-sm whitespace-nowrap">{article.readTime} read</span>
        </div>

      </div>

      {/* Sticky TOC, floats on right, desktop only */}
      <ArticleTOC />

      {/* MDX content, CenterpieceTable black header continues right off the author bar */}
      <div className="article-col pb-16 pt-0">
        <div className="prose prose-lg max-w-none font-sans">
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        </div>
        <CorrectionsNote corrections={article.corrections} />
        <div className="not-prose flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 mt-12 border-t border-gray-200">
          <span className="font-sans text-sm font-semibold text-black">Share this teardown</span>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}/${article.slug}`)}&text=${encodeURIComponent(article.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] font-sans text-sm font-semibold text-gray-600 underline-offset-4 hover:text-black hover:underline transition-colors"
          >
            X / Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/${article.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] font-sans text-sm font-semibold text-gray-600 underline-offset-4 hover:text-black hover:underline transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} ${SITE_URL}/${article.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] font-sans text-sm font-semibold text-gray-600 underline-offset-4 hover:text-black hover:underline transition-colors"
          >
            WhatsApp
          </a>
        </div>

      </div>

      {/* About the author, E-E-A-T signal + secondary internal link to author page */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10">
          <p className="font-sans text-brand-red text-[10px] tracking-[0.25em] uppercase font-bold mb-3">
            About the author
          </p>
          <p className="font-serif text-black text-xl font-bold mb-1">
            <Link href={`/author/${author.slug}`} className="hover:text-brand-red transition-colors">
              {author.name}
            </Link>
          </p>
          <p className="font-sans text-gray-500 text-xs mb-3">{author.role}</p>
          <p className="font-sans text-gray-700 text-sm leading-relaxed">{author.bio}</p>
        </div>
      </div>

      {/* Auto-related articles — same sector, drives internal linking + gives Google topic-cluster signals */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
              <div>
                <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-1">
                  More from {sectorName}
                </p>
                <h2 className="font-serif text-black text-2xl font-bold">Other audited teardowns in the same sector</h2>
              </div>
              <Link
                href={`/sector/${sectorSlug(sectorName)}`}
                className="font-sans text-sm font-semibold text-brand-red hover:underline shrink-0"
              >
                All {sectorName} articles <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="group block border border-gray-200 rounded-lg p-5 hover:border-black transition-colors"
                >
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-brand-red mb-2">
                    {rel.company}
                  </p>
                  <p className="font-serif text-black text-base font-bold leading-snug mb-2 group-hover:text-brand-red transition-colors line-clamp-3">
                    {rel.title}
                  </p>
                  <p className="font-sans text-xs text-gray-500">{rel.readTime} read</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
