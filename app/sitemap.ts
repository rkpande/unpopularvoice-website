import { getAllArticles, parseUpdatedAt } from '@/lib/articles'
import { getAllComparisons } from '@/lib/comparisons'
import { getAllSectors, MIN_INDEXABLE_SECTOR } from '@/lib/sectors'
import { getAllAuthors } from '@/lib/authors'
import { lastModified } from '@/lib/corrections'
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

function mostRecentDate(articles: ReturnType<typeof getAllArticles>): Date {
  return articles.length ? parseUpdatedAt(articles[0].updatedAt) : new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const comparisons = getAllComparisons()
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
      url: `${SITE_URL}/compare`,
      lastModified: latest,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/employer-check`,
      lastModified: latest,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/startup-jobs`,
      lastModified: latest,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/reality-check`,
      lastModified: latest,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified: latest,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2026-11-22'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/editorial-standards`,
      lastModified: new Date('2026-11-14'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/corrections`,
      lastModified: latest,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/subscribe`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/${article.slug}`,
      lastModified: lastModified(article.updatedAt, article.corrections),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...comparisons.map((cmp) => ({
      url: `${SITE_URL}/compare/${cmp.slug}`,
      lastModified: lastModified(cmp.updatedAt, cmp.corrections),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...getAllSectors()
      .filter((sector) => sector.count >= MIN_INDEXABLE_SECTOR)
      .map((sector) => ({
      url: `${SITE_URL}/sector/${sector.slug}`,
      lastModified: latest,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...getAllAuthors().map((a) => ({
      url: `${SITE_URL}/author/${a.slug}`,
      lastModified: latest,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
