import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { getAllComparisons } from '@/lib/comparisons'
import { getAllAuthors } from '@/lib/authors'
import { getCorrectionsLog } from '@/lib/corrections'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

export const metadata: Metadata = {
  title: 'About UnpopularVoice',
  description:
    'UnpopularVoice reads the audited accounts of Indian startups and explains what the numbers show: who writes it, how every figure is checked, and how to reach us.',
  alternates: { canonical: `${SITE_URL}/about` },
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <h2 id={`${id}-h`} className="font-serif text-black text-2xl sm:text-3xl font-bold mb-4">
        {title}
      </h2>
      <div className="font-sans text-gray-800 text-[1.0625rem] leading-relaxed space-y-4 max-w-[65ch]">{children}</div>
    </section>
  )
}

const link = 'underline underline-offset-4 hover:text-brand-red'

export default function AboutPage() {
  const articles = getAllArticles()
  const companies = new Set(articles.map((a) => a.company)).size
  const comparisons = getAllComparisons().length
  const corrections = getCorrectionsLog().length
  const authors = getAllAuthors()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}/about`,
    name: 'About UnpopularVoice',
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  }

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-14">
          <div aria-hidden="true" className="w-10 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-4xl sm:text-5xl font-bold leading-tight mb-5">About UnpopularVoice</h1>
          <p className="font-sans text-white/70 text-lg leading-relaxed max-w-2xl">
            We read the audited accounts of Indian startups and explain what the numbers show, line by line. Not
            the press release, not the funding announcement: the statements the company&apos;s auditor signed.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14 space-y-14">
        <Section id="what" title="What we publish">
          <p>
            Forensic teardowns of individual companies, and comparisons that set companies in the same category side
            by side. Each piece starts from the accounts: revenue, profit or loss, cash from operations, debt and cost
            structure, then asks why the numbers look the way they do.
          </p>
          <p>
            So far that is {articles.length} teardowns covering {companies} companies, and {comparisons} comparisons.
            Browse them on the <Link href="/articles" className={link}>articles page</Link>, or see how they rank on
            the <Link href="/profitability-index" className={link}>Profitability Index</Link>.
          </p>
        </Section>

        <Section id="who-reads" title="Who it is for">
          <p>
            People deciding whether to join a startup, investors and analysts who want audited numbers rather than
            headlines, founders benchmarking their peers, and anyone who saw a startup in the news and wondered what its
            accounts actually say.
          </p>
        </Section>

        <Section id="method" title="How every figure is checked">
          <p>
            Headline figures are loaded from the audited statements into a database and exported into each article,
            so the indexes and the articles read the same numbers. Every other figure in a piece is checked against the
            statements before it is published.
          </p>
          <p>
            We separate what the accounts show from our reading of it, and we label estimates and inferences as such.
            The full method is on the <Link href="/methodology" className={link}>methodology</Link> and{' '}
            <Link href="/editorial-standards" className={link}>editorial standards</Link> pages.
          </p>
        </Section>

        <Section id="corrections" title="When we get something wrong">
          <p>
            We correct it in the open. Every correction carries a dated note on the article, and all of them are
            listed on the <Link href="/corrections" className={link}>corrections page</Link>
            {corrections > 0 ? ` (${corrections} so far)` : ''}.
          </p>
        </Section>

        <Section id="independence" title="Independence">
          <p>
            UnpopularVoice is not affiliated with any company it writes about. Nothing here is investment advice or a
            recommendation to buy or sell any security.
          </p>
        </Section>

        <Section id="who" title="Who writes it">
          <ul className="space-y-5 list-none p-0">
            {authors.map((a) => (
              <li key={a.slug}>
                <p className="font-semibold text-black">
                  <Link href={`/author/${a.slug}`} className={link}>
                    {a.name}
                  </Link>
                  <span className="font-normal text-gray-600">, {a.role}</span>
                </p>
                <p className="mt-1">{a.bio}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="follow" title="Follow and get in touch">
          <p>
            New teardowns go out by email: <Link href="/subscribe" className={link}>subscribe here</Link>. We also post
            on{' '}
            <a href="https://www.linkedin.com/in/unpopular-voice/" target="_blank" rel="noopener noreferrer" className={link}>
              LinkedIn
            </a>
            ,{' '}
            <a href="https://x.com/UnpopularV83586" target="_blank" rel="noopener noreferrer" className={link}>
              X
            </a>{' '}
            and{' '}
            <a href="https://www.youtube.com/@YourUnpopularVoice" target="_blank" rel="noopener noreferrer" className={link}>
              YouTube
            </a>
            . To report an error, message us on LinkedIn or X with the article and the figure; we check every report
            against the accounts.
          </p>
        </Section>
      </div>
    </div>
  )
}
