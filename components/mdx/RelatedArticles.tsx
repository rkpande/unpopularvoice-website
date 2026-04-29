import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

interface RelatedArticle {
  title: string
  href: string
  label?: string
}

interface RelatedArticlesProps {
  articles?: RelatedArticle[]
  slugs?: string[]
}

export default function RelatedArticles({ articles, slugs }: RelatedArticlesProps) {
  let resolved: RelatedArticle[] = articles ?? []

  if (slugs && slugs.length > 0) {
    const all = getAllArticles()
    resolved = slugs
      .map((slug) => all.find((a) => a.slug === slug))
      .filter((a): a is NonNullable<typeof a> => a != null)
      .map((a) => ({ title: a.title, href: `/${a.slug}` }))
  }

  if (resolved.length === 0) return null

  return (
    <div className="not-prose my-10 border-t border-gray-100 pt-8">
      <p className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
        Related Articles
      </p>
      <div className="flex flex-col gap-3">
        {resolved.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group flex items-start gap-3 hover:no-underline"
          >
            <span className="font-sans text-brand-red text-sm mt-0.5 select-none">→</span>
            <div>
              {article.label && (
                <span className="font-sans text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-0.5">
                  {article.label}
                </span>
              )}
              <span className="font-serif text-black text-base font-bold leading-snug group-hover:text-brand-red transition-colors">
                {article.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
