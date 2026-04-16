import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'

// Render article pages on demand — avoids SSG prerender issues with complex MDX expressions
export const dynamic = 'force-dynamic'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
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

  return {
    title: article.title,
    description: article.excerpt || article.tldr[0],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.title,
      description: article.excerpt || article.tldr[0],
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.updatedAt,
      authors: ['UnpopularVoice Editorial'],
      tags: [article.sector, article.company, 'Indian startups', 'financial analysis'],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.tldr[0],
      images: [ogImageUrl],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.tldr[0],
    author: { '@type': 'Organization', name: 'UnpopularVoice', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'UnpopularVoice',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon` },
    },
    dateModified: article.updatedAt,
    url: `${SITE_URL}/${article.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${article.slug}` },
    about: { '@type': 'Organization', name: article.company },
    keywords: [article.sector, article.company, 'Indian startups', 'financial analysis', 'RoC filings'].join(', '),
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Metadata strip */}
      <div className="bg-gray-50 border-b border-gray-200 border-l-4 border-l-brand-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs text-gray-400">
          <span className="font-bold text-brand-red uppercase tracking-wide shrink-0">{article.company}</span>
          <span>/</span>
          <span className="truncate max-w-[180px] sm:max-w-none">{article.sector.toUpperCase()}</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">Source: {article.dataSource}</span>
          <span className="ml-auto shrink-0">Updated: {article.updatedAt}</span>
        </div>
      </div>

      {/* Headline block — fused with hero numbers into one unit */}
      <div className="article-col pt-14 pb-0">
        <div className="w-12 h-1 bg-brand-red mb-8" />
        <h1 className="font-serif text-black text-5xl font-bold leading-[1.1] mb-8">
          {article.title}
        </h1>

        {/* Hero numbers — part of the headline, not a separate section */}
        {article.heroNumbers && article.heroNumbers.length > 0 && (
          <div className="grid grid-cols-3 gap-0 border-t border-gray-100 pt-7 pb-8 mb-0">
            {article.heroNumbers.map(({ value, label }, i) => (
              <div key={i} className={`${i < article.heroNumbers!.length - 1 ? 'border-r border-gray-100' : ''} pr-8 ${i > 0 ? 'pl-8' : ''}`}>
                <div className="font-serif text-[2rem] font-bold text-black leading-none mb-2">
                  {value}
                </div>
                <div className="font-sans text-xs text-gray-400 uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4 pb-0">
          <span className="font-sans font-semibold text-black text-sm">
            UnpopularVoice Editorial
          </span>
          <span className="font-sans text-gray-400 text-sm">
            {article.readTime} read &nbsp;·&nbsp; Financial deep dive
          </span>
        </div>
      </div>

      {/* MDX content — CenterpieceTable black header continues right off the author bar */}
      <div className="article-col pb-16 pt-0">
        <div className="prose prose-lg max-w-none font-sans">
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{ blockJS: false }}
          />
        </div>
      </div>

      {/* Key Takeaways — interpretation layer, after full article */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="article-col py-10">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-black px-6 py-3 flex items-center gap-3">
              <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/60">
                Key Takeaways
              </span>
              <span className="font-sans text-[11px] text-white/30">
                {article.tldr.length} points
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {article.tldr.map((point, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4 bg-white">
                  <span className="font-serif text-brand-red font-bold text-lg leading-none mt-0.5 shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-sans text-sm text-gray-700 leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
