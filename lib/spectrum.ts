import type { ArticleMeta } from './articles'

export type SpectrumKey = 'working' | 'scaling' | 'progress' | 'restructuring' | 'broken'

export interface SpectrumBucket {
  key: SpectrumKey
  label: string
  shortLabel: string
  description: string
  glyph: string
  borderClass: string
  badgeClass: string
}

export const SPECTRUM: Record<SpectrumKey, SpectrumBucket> = {
  working: {
    key: 'working',
    label: 'Working models',
    shortLabel: 'Working',
    description: 'Profitable, self-funding, audited operating cash flow positive.',
    glyph: '●',
    borderClass: 'border-green-700',
    badgeClass: 'bg-green-50 text-green-700 border-green-700',
  },
  scaling: {
    key: 'scaling',
    label: 'Scaling models',
    shortLabel: 'Scaling',
    description: 'Profitable but deploying capital, debt, or accepting margin compression for growth.',
    glyph: '◐',
    borderClass: 'border-yellow-600',
    badgeClass: 'bg-yellow-50 text-yellow-700 border-yellow-600',
  },
  progress: {
    key: 'progress',
    label: 'In-progress',
    shortLabel: 'Progress',
    description: 'Loss narrowing, unit economics improving, near-breakeven trajectory.',
    glyph: '◑',
    borderClass: 'border-sky-700',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-700',
  },
  restructuring: {
    key: 'restructuring',
    label: 'Restructuring',
    shortLabel: 'Restructuring',
    description: 'Profitable-but-shrinking, or loss-narrowing with revenue contracting. Cost discipline over growth.',
    glyph: '◒',
    borderClass: 'border-zinc-700',
    badgeClass: 'bg-zinc-100 text-zinc-700 border-zinc-700',
  },
  broken: {
    key: 'broken',
    label: 'Broken / early',
    shortLabel: 'Broken',
    description: 'Loss deepening, structural gross-margin issues, or persistent capital-vs-revenue gap.',
    glyph: '○',
    borderClass: 'border-red-600',
    badgeClass: 'bg-red-50 text-red-600 border-red-600',
  },
}

const RESTRUCTURING_TITLE_PATTERNS = [
  /\bsmaller\b/i,
  /\bunwinding\b/i,
  /\brevenue (fell|didn'?t|didn'?t grow|wasn'?t)/i,
  /\bdidn'?t grow\b/i,
  /\bnot in any press release\b/i,
  /\bcame from cuts\b/i,
  /\bopposite trajectory\b/i,
]

function normalizeProfitability(p?: string): string {
  return (p ?? '').toLowerCase()
}

export function getSpectrum(article: ArticleMeta): SpectrumKey {
  const title = article.title ?? ''
  const verdict = article.employerScore?.verdict
  const prof = normalizeProfitability(article.employerScore?.profitability)

  // Restructuring is a title-pattern signal first (revenue contraction is the marker).
  if (RESTRUCTURING_TITLE_PATTERNS.some((re) => re.test(title))) {
    return 'restructuring'
  }

  // Working: explicitly profitable + clean verdict.
  if (/achieved|profitable/.test(prof) && verdict === 'solid') {
    return 'working'
  }

  // Scaling: profitable but with concerns or capital deployment.
  if (/achieved|profitable/.test(prof)) {
    return 'scaling'
  }

  // Progress: loss narrowing / improving / near-breakeven / thin.
  if (/narrowing|improving|near|breakeven|thin/.test(prof)) {
    return 'progress'
  }

  // Broken: deepening, weak, persistent loss.
  if (verdict === 'caution' || /deepening|weak/.test(prof)) {
    return 'broken'
  }

  // Fallback by realityScore average.
  const r = article.realityScore
  if (r) {
    const avg = (r.growthQuality + r.sustainability + r.profitabilityPath) / 3
    if (avg >= 7) return 'working'
    if (avg >= 5) return 'progress'
  }

  return 'broken'
}

export function bucketArticles(articles: ArticleMeta[]): Record<SpectrumKey, ArticleMeta[]> {
  const out: Record<SpectrumKey, ArticleMeta[]> = {
    working: [],
    scaling: [],
    progress: [],
    restructuring: [],
    broken: [],
  }
  for (const a of articles) {
    out[getSpectrum(a)].push(a)
  }
  return out
}

const FORENSIC_KEYWORDS = [
  'transfer pric',
  'license fee',
  'license fees',
  'exceptional',
  'goodwill',
  'impairment',
  'esop',
  'share-based',
  'share based',
  'consolidat',
  'segment',
  'standalone',
  'subsidiary',
  'deferred',
  'contingent',
  'related part',
  'cost-plus',
  'cost plus',
  'reclassif',
  'principal versus agent',
  'recharge',
  'intercompany',
  'rolling up',
  'roll-up',
  'amalgamation',
  'restated',
  'retrospective',
]

const FORENSIC_PRIORITY_SLUGS = [
  'googlepay-fy2025',
  'uber-fy2025',
  'vedantu-fy2025',
  'spinny-fy2025',
  'acko-fy2025',
  'razorpay-fy2025',
  'phonepe-fy2025',
  'brndme-fy2025',
  'captainfresh-fy2025',
  'fresh2home-fy2025',
  'upgrad-fy2025',
]

export function getForensicArticles(articles: ArticleMeta[], limit = 4): ArticleMeta[] {
  // Priority slugs first (curated list of known forensic anchors), in their order.
  const bySlug = new Map(articles.map((a) => [a.slug, a] as const))
  const priority = FORENSIC_PRIORITY_SLUGS.map((s) => bySlug.get(s)).filter(
    (a): a is ArticleMeta => Boolean(a),
  )

  if (priority.length >= limit) return priority.slice(0, limit)

  // Fill from rule-based detection across other articles.
  const used = new Set(priority.map((a) => a.slug))
  const matches = articles.filter((a) => {
    if (used.has(a.slug)) return false
    const haystack = [a.title, a.excerpt, ...(a.tldr ?? [])].join(' ').toLowerCase()
    return FORENSIC_KEYWORDS.some((k) => haystack.includes(k))
  })
  return [...priority, ...matches].slice(0, limit)
}

const CONTRADICTION_TITLE_PATTERNS = [
  /\.\s+[A-Z][^.]+\.$/, // multiple sentences in title
  /\bbut\b/i,
  /\bdidn'?t\b/i,
  /\bspent .* to earn\b/i,
  /\bspends .* to earn\b/i,
  /\bborrowed\b/i,
  /\blost .*\bgenerated\b/i,
  /\bmade .*\btook\b/i,
]

export function getContradictionArticles(articles: ArticleMeta[], limit = 4): ArticleMeta[] {
  const featured = articles.find((a) => a.featured)
  const seen = new Set<string>()
  const out: ArticleMeta[] = []

  for (const a of articles) {
    if (out.length >= limit) break
    if (a === featured) continue
    if (seen.has(a.slug)) continue
    const title = a.title ?? ''
    if (CONTRADICTION_TITLE_PATTERNS.some((re) => re.test(title))) {
      out.push(a)
      seen.add(a.slug)
    }
  }
  return out
}
