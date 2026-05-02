import type { Metadata } from 'next'
import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
import Hero from '@/components/home/Hero'
import StatsTicker from '@/components/home/StatsTicker'
import FeaturedArticle from '@/components/home/FeaturedArticle'
import ArticleGrid from '@/components/browse/ArticleGrid'
import NewsletterCTA from '@/components/home/NewsletterCTA'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Indian Startup FY2025 Revenue, PAT and MCA Filing Data | UnpopularVoice',
  description: 'FY2025 revenue, PAT, debt and cash flow for Indian startups from MCA filings. Zerodha ₹4,232 Cr profit, Razorpay, PhonePe, Porter, Rapido, OYO, Zepto. Audited numbers only.',
}

export default function HomePage() {
  const all = getAllArticles()
  const featured = getFeaturedArticle()

  return (
    <>
      <Hero topArticles={all.slice(0, 3)} />
      <StatsTicker articles={all} />

      {featured && <FeaturedArticle article={featured} />}

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: `${all.length}`, label: 'Startups covered' },
              { value: 'FY2025', label: 'Primary dataset' },
              { value: 'MCA filings', label: 'Source' },
              { value: 'Zero', label: 'Press releases used' },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-brand-red pl-4">
                <p className="font-serif text-black text-3xl sm:text-4xl font-bold">{value}</p>
                <p className="font-sans text-gray-400 text-xs uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="browse" className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-black text-3xl font-bold">Indian Startup Financials</h2>
              <p className="font-sans text-gray-400 text-sm mt-1">
                {all.length} companies — revenue, profit, and debt from audited annual filings
              </p>
            </div>
            <Link
              href="/articles"
              className="font-sans font-semibold text-brand-red text-sm hover:underline hidden sm:block"
            >
              View full index →
            </Link>
          </div>
          <ArticleGrid articles={all} pageSize={9} />
        </div>
      </section>

      <NewsletterCTA />
    </>
  )
}
