import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getArticleBySlug, parseUpdatedAt, type Article, type ArticleMeta } from './articles'

const COMPARISONS_DIR = path.join(process.cwd(), 'content/comparisons')

export interface ComparisonMeta {
  slug: string                    // e.g. "dhan-vs-zerodha"
  title: string
  seoTitle?: string
  metaDescription?: string
  companyA: string                // article slug
  companyB: string                // article slug
  companyC?: string               // optional third article slug for 3-way comparisons
  category: string                // e.g. "Discount Brokers"
  thesis: string                  // short one-liner used in cards / OG
  updatedAt: string
  readTime: string
  featured?: boolean
  published?: boolean
  excerpt?: string
  author?: string                 // optional author slug override; defaults to primary author
}

export interface Comparison extends ComparisonMeta {
  content: string
}

export interface HydratedComparison extends Comparison {
  articleA: Article | null
  articleB: Article | null
  articleC: Article | null
  metaA: ArticleMeta | null
  metaB: ArticleMeta | null
  metaC: ArticleMeta | null
}

export function getAllComparisons(): ComparisonMeta[] {
  if (!fs.existsSync(COMPARISONS_DIR)) return []

  const files = fs.readdirSync(COMPARISONS_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(COMPARISONS_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return { slug, ...data } as ComparisonMeta
    })
    .filter((c) => c.published !== false)
    .sort((a, b) => parseUpdatedAt(b.updatedAt).getTime() - parseUpdatedAt(a.updatedAt).getTime())
}

export function getComparisonBySlug(slug: string): HydratedComparison | null {
  const filepath = path.join(COMPARISONS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const meta = { slug, ...data, content } as Comparison
  if (meta.published === false) return null

  const articleA = getArticleBySlug(meta.companyA)
  const articleB = getArticleBySlug(meta.companyB)
  const articleC = meta.companyC ? getArticleBySlug(meta.companyC) : null

  return {
    ...meta,
    articleA,
    articleB,
    articleC,
    metaA: articleA,
    metaB: articleB,
    metaC: articleC,
  }
}
