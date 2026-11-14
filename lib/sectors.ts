import { getAllArticles } from './articles'
import type { ArticleMeta } from './articles'

export interface SectorInfo {
  slug: string
  label: string
  count: number
}

// Convert a sector label from frontmatter (e.g. "Quick Commerce", "F&B", "E-commerce")
// into a URL-safe slug. Case-insensitive; "&" becomes "and"; anything not [a-z0-9]
// becomes a single hyphen; leading/trailing hyphens stripped.
export function sectorSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// The primary segment of an article's sector (before the first "/").
export function primarySector(sector: string): string {
  return sector.split('/')[0].trim()
}

// Enumerate every sector present in the published corpus with article counts.
// Sorted by count desc, then alphabetically.
export function getAllSectors(): SectorInfo[] {
  const counts = new Map<string, number>()
  for (const a of getAllArticles()) {
    const p = primarySector(a.sector)
    counts.set(p, (counts.get(p) || 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([label, count]) => ({ slug: sectorSlug(label), label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

export function getSectorBySlug(slug: string): SectorInfo | null {
  const target = slug.toLowerCase()
  return getAllSectors().find((s) => s.slug === target) || null
}

// Articles whose primary sector matches the given label (case-insensitive).
export function getArticlesBySector(label: string): ArticleMeta[] {
  const target = label.toLowerCase()
  return getAllArticles().filter((a) => {
    const s = a.sector.toLowerCase()
    return (
      s === target || s.startsWith(target + '/') || s.startsWith(target + ' /')
    )
  })
}
