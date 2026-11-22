import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

// Parses "21 April 2026", "21 April 2026 14:30", "April 2026", or ISO strings
function parseArticleDate(s: string): number {
  if (!s) return 0
  // "DD Month YYYY HH:MM" (with optional seconds)
  const withTime = s.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})\s+(\d{1,2}:\d{2}(?::\d{2})?)$/)
  if (withTime) return new Date(`${withTime[2]} ${withTime[1]}, ${withTime[3]} ${withTime[4]}`).getTime()
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

export { formatDisplayDate } from './date-utils'

export function parseUpdatedAt(s: string): Date {
  const ts = parseArticleDate(s)
  return ts ? new Date(ts) : new Date()
}

// Return the first sentence of a string, capped at maxLen chars.
// Falls back to a hard cut at maxLen if no sentence break is found.
export function firstSentence(text: string, maxLen = 155): string {
  if (!text) return ''
  const trimmed = text.trim()
  // Find sentence end: period, question, or exclamation followed by space or end.
  const m = trimmed.match(/^(.+?[.?!])(?:\s|$)/)
  const candidate = m ? m[1] : trimmed
  if (candidate.length <= maxLen) return candidate
  // Hard truncate at last space before maxLen - 1 for the ellipsis
  const cut = candidate.slice(0, maxLen - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut) + '…'
}

// Best meta description for an article: prefer hand-crafted metaDescription
// if it's already SERP-length, else derive from first sentence of excerpt or tldr[0].
export function bestMetaDescription(article: {
  metaDescription?: string
  excerpt?: string
  tldr?: string[]
}): string {
  const md = article.metaDescription?.trim()
  if (md && md.length >= 90 && md.length <= 165) return md
  // A search snippet needs substance: take whole sentences from the excerpt
  // (then the first summary bullet) until there are about 110 to 160 characters.
  const source = [md && md.length < 90 ? md : '', article.excerpt, ...(article.tldr || [])].filter(Boolean).join(' ')
  return leadSentences(source, 110, 160)
}

export function leadSentences(text: string, min = 110, max = 160): string {
  const sentences = (text || '').trim().split(/(?<=[.?!])\s+/)
  let out = ''
  const seen = new Set<string>()
  for (const raw of sentences) {
    const s = raw.trim()
    if (!s || seen.has(s)) continue
    seen.add(s)
    const next = out ? `${out} ${s}` : s
    if (next.length > max) continue // too long to add whole; a later, shorter sentence may fit
    out = next
    if (out.length >= min) break
  }
  return out || firstSentence(text, max)
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

export interface EmployerScoreData {
  growthMomentum: string
  stability: string
  profitability: string
  fundingDependence: string
  careerUpside: string
  verdict: 'caution' | 'watch' | 'solid'
  notes: string
}

export interface ArticleMeta {
  slug: string
  title: string
  seoTitle?: string
  metaDescription?: string
  author?: string // optional author slug; falls back to primary author
  company: string
  cin?: string
  sector: string
  dataSource: string
  updatedAt: string
  publishedAt?: string // first publication; updatedAt moves with edits, this never does
  corrections?: import('./corrections').Correction[]
  readTime: string
  tldr: string[]
  heroNumbers?: HeroNumber[]
  realityScore: RealityScoreData
  employerScore?: EmployerScoreData
  runwayMonths?: number | null
  employeeCostGrowthPct?: number | null
  financials?: import('./financials').Financials
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
    .sort((a, b) => parseArticleDate(b.publishedAt ?? b.updatedAt) - parseArticleDate(a.publishedAt ?? a.updatedAt))
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
