import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export interface RealityScoreData {
  growthQuality: number
  sustainability: number
  profitabilityPath: number
}

export interface HeroNumber {
  value: string
  label: string
}

export interface ArticleMeta {
  slug: string
  title: string
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
  excerpt?: string
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
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
}

export function getArticleBySlug(slug: string): Article | null {
  const filepath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, ...data, content } as Article
}

export function getFeaturedArticle(): ArticleMeta | null {
  return getAllArticles().find((a) => a.featured) ?? getAllArticles()[0] ?? null
}
