import GithubSlugger from 'github-slugger'

export interface TocItem {
  id: string
  text: string
}

// Sections that are reference material, not part of the argument.
const EXCLUDE = new Set(['Share This', 'A Note on This Data', 'Frequently Asked Questions'])

// Plain text of a markdown heading, as rehype-slug sees it after rendering.
function headingText(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__|\*|_)(.+?)\1/g, '$2')
    .replace(/<[^>]+>/g, '')
    .trim()
}

/**
 * The article's own section list, built on the server from its markdown.
 * Ids are generated exactly as rehype-slug generates them: one slugger over
 * every heading in document order, so repeated headings get the same -1, -2
 * suffixes the rendered page uses. Code fences are skipped.
 */
export function getArticleToc(content: string): TocItem[] {
  const slugger = new GithubSlugger()
  const items: TocItem[] = []
  let inFence = false
  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/)
    if (!m) continue
    const text = headingText(m[2])
    const id = slugger.slug(text)
    if (m[1].length === 2 && !EXCLUDE.has(text)) items.push({ id, text })
  }
  return items
}
