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

const mdxComponents = { FinancialTable, RealityScore, InsightBox, ChartBlock }

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.tldr[0],
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  return (
    <article>
      {/* Metadata strip */}
      <div className="bg-gray-50 border-b border-gray-200 border-l-4 border-l-brand-red">
        <div className="max-w-7xl mx-auto px-8 h-14 flex items-center gap-2 font-sans text-xs text-gray-400">
          <span className="font-bold text-brand-red uppercase tracking-wide">{article.company}</span>
          <span>/</span>
          <span>{article.sector.toUpperCase()}</span>
          <span>/</span>
          <span>Source: {article.dataSource}</span>
          <span className="ml-auto">Updated: {article.updatedAt}</span>
        </div>
      </div>

      {/* Headline block */}
      <div className="border-b border-gray-100">
        <div className="article-col py-14">
          <div className="w-12 h-1 bg-brand-red mb-8" />
          <h1 className="font-serif text-black text-5xl font-bold leading-[1.1] mb-6">
            {article.title}
          </h1>
          <p className="font-sans text-gray-400 italic text-xl leading-relaxed mb-8">
            A financial teardown of {article.company}&apos;s numbers: what the press coverage says,
            and what the filings actually reveal.
          </p>
          <div className="flex items-center justify-between border-t border-gray-100 pt-5">
            <span className="font-sans font-semibold text-black text-sm">
              UnpopularVoice Editorial
            </span>
            <span className="font-sans text-gray-400 text-sm">
              {article.readTime} read &nbsp;·&nbsp; Financial deep dive
            </span>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="article-col py-10">
        <div className="border-2 border-brand-red/30 bg-red-50 rounded-lg p-6">
          <p className="font-sans font-bold text-brand-red text-xs tracking-widest uppercase mb-4">
            TL;DR — Key Insights
          </p>
          <div className="w-full h-px bg-red-200 mb-4" />
          <ul className="space-y-2.5">
            {article.tldr.map((point, i) => (
              <li key={i} className="flex gap-3 font-sans text-sm text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0 mt-2" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MDX content */}
      <div className="article-col pb-16">
        <div className="prose prose-lg max-w-none font-sans">
          <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{ blockJS: false }}
            />
        </div>
      </div>
    </article>
  )
}
