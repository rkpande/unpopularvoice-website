import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import ComparePanel from '@/components/browse/ComparePanel'

export const metadata: Metadata = {
  title: 'Compare Startup Employers — Employer Check | UnpopularVoice',
  description:
    'Compare two startup offers side by side. Five dimensions from audited MCA filings — growth, stability, profitability, funding dependence, and career upside.',
}

export default function ComparePage() {
  const companies = getAllArticles().filter((a) => a.employerScore)

  return (
    <div className="min-h-[calc(100vh-72px)]">
      {/* Header */}
      <div className="bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-16 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/employer-check" className="font-sans text-white/40 text-xs hover:text-white/70 transition-colors">
              ← Employer Check
            </Link>
          </div>
          <div className="w-10 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Compare two offers.
          </h1>
          <p className="font-sans text-white/50 text-base leading-relaxed max-w-xl">
            Pick two companies. See every dimension side by side, from the same audited filings.
            Share the link — the comparison is saved in the URL.
          </p>
        </div>
      </div>

      {/* Panel */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
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
          Labels are derived from audited MCA filings only. A highlighted label indicates a stronger signal in that dimension compared to the other company — it does not constitute a hiring recommendation.{' '}
          <Link href="/methodology" className="text-brand-red hover:underline">Full methodology →</Link>
        </p>
      </div>
    </div>
  )
}
