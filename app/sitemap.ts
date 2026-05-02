import { getAllArticles, parseUpdatedAt } from '@/lib/articles'
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

// Most recent article date — used as lastModified for index pages
function mostRecentDate(articles: ReturnType<typeof getAllArticles>): Date {
  return articles.length ? parseUpdatedAt(articles[0].updatedAt) : new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const latest = mostRecentDate(articles)

  return [
    {
      url: SITE_URL,
      lastModified: latest,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: latest,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/reality-check`,
      lastModified: latest,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/subscribe`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/${article.slug}`,
      lastModified: parseUpdatedAt(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
