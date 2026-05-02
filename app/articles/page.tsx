import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/articles'
import ArticleGrid from '@/components/browse/ArticleGrid'

export const metadata: Metadata = {
  title: 'Indian Startup Financials — From Filings, Not PR',
  description: '32+ Indian startups. Revenue, profit, and debt from audited MCA filings. What the numbers actually say — not press releases. Zerodha, Razorpay, PhonePe, Porter, Rapido, UltraHuman and more.',
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <div className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="w-12 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-5xl font-bold mb-4 leading-tight">
            What the filings say.
          </h1>
          <p className="font-sans text-white/50 text-lg max-w-2xl">
            {articles.length} Indian startups. Revenue, profit, debt, and cash flow from audited MCA filings.
            Not press releases. Not founder interviews. Not analyst estimates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 pb-24">
        <ArticleGrid articles={articles} />
      </div>
    </div>
  )
}
