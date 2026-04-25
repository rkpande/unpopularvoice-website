import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

// Parses "21 April 2026", "April 2026", "17 April 2026", or ISO strings
function parseArticleDate(s: string): number {
  if (!s) return 0
  // "DD Month YYYY"
  const full = s.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/)
  if (full) return new Date(`${full[2]} ${full[1]}, ${full[3]}`).getTime()
  // "Month YYYY"
  const monthYear = s.match(/^(\w+)\s+(\d{4})$/)
  if (monthYear) return new Date(`${monthYear[1]} 1, ${monthYear[2]}`).getTime()
  // ISO or anything else
  const d = new Date(s)
  return isNaN(d.getTime()) ? 0 : d.getTime()
}

export interface RealityScoreData {
  growthQuality: number
  sustainability: number
  profitabilityPath: number
}

export interface HeroNumber {
  value: string
  label: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface ArticleMeta {
  slug: string
  title: string
  seoTitle?: string
  company: string
  cin?: string
  sector: string
  dataSource: string
  updatedAt: string
  readTime: string
  tldr: string[]
  heroNumbers?: HeroNumber[]
  realityScore: RealityScoreData
  featured?: boolean
  published?: boolean
  excerpt?: string
  faqItems?: FaqItem[]
}

export interface Article extends ArticleMeta {
  content: string
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return { slug, ...data } as ArticleMeta
    })
    .filter((a) => a.published !== false)
    .sort((a, b) => parseArticleDate(b.updatedAt) - parseArticleDate(a.updatedAt))
}

export function getArticleBySlug(slug: string): Article | null {
  const filepath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const article = { slug, ...data, content } as Article
  if (article.published === false) return null
  return article
}

export function getFeaturedArticle(): ArticleMeta | null {
  return getAllArticles().find((a) => a.featured) ?? getAllArticles()[0] ?? null
}
