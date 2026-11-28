import { getAllArticles } from './articles'
import type { ArticleMeta } from './articles'

// A sector page earns a place in Google's index once it gathers this many
// teardowns. Below that it is a thin list of one or two links: still served and
// linked for readers (noindex, follow), but kept out of the index and sitemap so
// the site is judged on its substantial pages.
export const MIN_INDEXABLE_SECTOR = 3

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

// One name per sector. Articles were labelled over time with different words
// for the same thing ("Direct-to-Consumer" and "D2C"; "Healthcare", "Health
// Tech", "Diagnostics"), which split one sector across several thin pages.
// Merged sectors keep their old URLs as permanent redirects (next.config.mjs,
// SECTOR_REDIRECTS), so no link breaks.
const SECTOR_ALIASES: Record<string, string> = {
  'direct-to-consumer': 'D2C',
  healthcare: 'Healthtech',
  'health tech': 'Healthtech',
  'health & wellness': 'Healthtech',
  diagnostics: 'Healthtech',
  'e-pharmacy': 'Healthtech',
  'b2b commerce': 'B2B',
  'b2b seafood': 'B2B',
  payments: 'Fintech',
  'wealth management': 'Fintech',
}

// The primary segment of an article's sector (before the first "/"), under
// its one canonical name.
export function primarySector(sector: string): string {
  const raw = sector.split('/')[0].trim()
  return SECTOR_ALIASES[raw.toLowerCase()] ?? raw
}

// Enumerate every sector present in the published corpus with article counts.
// Sorted by count desc, then alphabetically.
export function getAllSectors(): SectorInfo[] {
  // Group by slug, not by raw label: "EdTech" and "Edtech" are one sector with
  // one URL. The most common spelling becomes the display label.
  const bySlug = new Map<string, { count: number; labels: Map<string, number> }>()
  for (const a of getAllArticles()) {
    const label = primarySector(a.sector)
    const slug = sectorSlug(label)
    const entry = bySlug.get(slug) || { count: 0, labels: new Map<string, number>() }
    entry.count += 1
    entry.labels.set(label, (entry.labels.get(label) || 0) + 1)
    bySlug.set(slug, entry)
  }
  return Array.from(bySlug.entries())
    .map(([slug, { count, labels }]) => ({
      slug,
      label: Array.from(labels.entries()).sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0]))[0][0],
      count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

export function getSectorBySlug(slug: string): SectorInfo | null {
  const target = slug.toLowerCase()
  return getAllSectors().find((s) => s.slug === target) || null
}

// Articles whose primary sector (after merging aliases) is the given sector.
export function getArticlesBySector(label: string): ArticleMeta[] {
  const target = sectorSlug(primarySector(label))
  return getAllArticles().filter((a) => sectorSlug(primarySector(a.sector)) === target)
}
