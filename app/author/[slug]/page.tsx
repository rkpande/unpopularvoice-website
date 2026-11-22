import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAuthor, getAllAuthors, authorJsonLd, PRIMARY_AUTHOR_SLUG } from '@/lib/authors'
import { getAllArticles, leadSentences } from '@/lib/articles'
import { getAllComparisons } from '@/lib/comparisons'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

export async function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const author = getAuthor(params.slug)
  if (!author) return {}
  const canonical = `${SITE_URL}/author/${author.slug}`
  return {
    title: `${author.name}, ${author.role}`,
    description: leadSentences(author.bio, 90, 160),
    alternates: { canonical },
    openGraph: {
      title: `${author.name}, ${author.role}`,
      description: leadSentences(author.bio, 90, 160),
      url: canonical,
      type: 'profile',
    },
  }
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const author = getAuthor(params.slug)
  if (!author) notFound()

  const canonical = `${SITE_URL}/author/${author.slug}`
  // Only pieces this author wrote; an article with no author field is the primary author's.
  const byThisAuthor = (slug?: string) => (slug || PRIMARY_AUTHOR_SLUG) === author.slug
  const articles = getAllArticles().filter((a) => byThisAuthor(a.author))
  const pieces = [
    ...articles.map((a) => ({ href: `/${a.slug}`, kicker: a.company, title: a.title, readTime: a.readTime })),
    ...getAllComparisons()
      .filter((c) => byThisAuthor(c.author))
      .map((c) => ({ href: `/compare/${c.slug}`, kicker: `Comparison · ${c.category}`, title: c.title, readTime: c.readTime })),
  ]

  const personLd = authorJsonLd(author, SITE_URL)
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Authors', item: `${SITE_URL}/articles` },
      { '@type': 'ListItem', position: 3, name: author.name, item: canonical },
    ],
  }
  const profileLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateModified: articles[0]?.updatedAt ? new Date(articles[0].updatedAt).toISOString() : undefined,
    url: canonical,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/author/${author.slug}#person` },
  }

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />

      {/* Header */}
      <div className="bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-16 pb-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-sans text-xs text-white/60">
              <li><Link href="/" className="hover:text-white/80 transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white/80">Authors</li>
            </ol>
          </nav>
          <div className="w-10 h-1 bg-brand-red mb-6" />
          <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-3">
            {author.role}
          </p>
          <h1 className="font-serif text-white text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {author.name}
          </h1>
          <p className="font-sans text-white/70 text-lg leading-relaxed max-w-2xl">{author.bio}</p>
        </div>
      </div>

      {/* Articles by author */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <div>
            <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-1">
              Articles by {author.name.split(' ')[0]}
            </p>
            <h2 className="font-serif text-black text-2xl font-bold">
              {pieces.length} {pieces.length === 1 ? 'audited piece' : 'audited pieces'}
            </h2>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {pieces.map((article) => (
            <div key={article.href} className="py-6 flex items-start justify-between gap-6 group">
              <div className="min-w-0">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-brand-red mb-2">
                  {article.kicker}
                </p>
                <Link href={article.href}>
                  <h3 className="font-serif text-black text-lg font-bold leading-snug group-hover:text-brand-red transition-colors">
                    {article.title}
                  </h3>
                </Link>
              </div>
              <p className="font-sans text-xs text-gray-500 shrink-0">{article.readTime} read</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
