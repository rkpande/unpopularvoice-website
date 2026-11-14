// Corrections are recorded in each article's frontmatter as
//   corrections:
//     - ["14 November 2026", "What was wrong, and what the accounts show."]
// They render at the foot of the article, move its dateModified to the latest
// correction, and are collected on /corrections.

import { getAllArticles, parseUpdatedAt } from './articles'
import { getAllComparisons } from './comparisons'

export type Correction = [date: string, note: string]

export function sortedCorrections(corrections?: Correction[]): Correction[] {
  return [...(corrections || [])].sort(
    (a, b) => parseUpdatedAt(b[0]).getTime() - parseUpdatedAt(a[0]).getTime(),
  )
}

/** The later of the editorial update and the most recent correction. */
export function lastModified(updatedAt: string, corrections?: Correction[]): Date {
  const updated = parseUpdatedAt(updatedAt)
  const latest = sortedCorrections(corrections)[0]
  if (!latest) return updated
  const corrected = parseUpdatedAt(latest[0])
  return corrected > updated ? corrected : updated
}

export interface CorrectionEntry {
  date: string
  note: string
  title: string
  href: string
}

export function getCorrectionsLog(): CorrectionEntry[] {
  const entries: CorrectionEntry[] = []
  for (const a of getAllArticles()) {
    for (const [date, note] of a.corrections || []) {
      entries.push({ date, note, title: a.title, href: `/${a.slug}` })
    }
  }
  for (const c of getAllComparisons()) {
    for (const [date, note] of c.corrections || []) {
      entries.push({ date, note, title: c.title, href: `/compare/${c.slug}` })
    }
  }
  return entries.sort(
    (x, y) =>
      parseUpdatedAt(y.date).getTime() - parseUpdatedAt(x.date).getTime() ||
      x.title.localeCompare(y.title),
  )
}
