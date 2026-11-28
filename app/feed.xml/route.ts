import { getAllArticles, parseUpdatedAt, bestMetaDescription } from '@/lib/articles'
import { getAllComparisons } from '@/lib/comparisons'

const SITE_URL = 'https://unpopularvoice.com'
export const revalidate = 3600

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// RSS 2.0 feed of the newest teardowns and comparisons, newest first. Lets
// search engines, feed readers and aggregators pick up new pieces as soon as
// they are published.
export async function GET() {
  const items = [
    ...getAllArticles().map((a) => ({
      title: a.title,
      url: `${SITE_URL}/${a.slug}`,
      description: bestMetaDescription(a),
      date: parseUpdatedAt(a.publishedAt ?? a.updatedAt),
      category: a.company,
    })),
    ...getAllComparisons().map((c) => ({
      title: c.title,
      url: `${SITE_URL}/compare/${c.slug}`,
      description: (c as { metaDescription?: string; excerpt?: string }).metaDescription || (c as { excerpt?: string }).excerpt || c.title,
      date: parseUpdatedAt(c.updatedAt),
      category: 'Comparison',
    })),
  ]
    .sort((x, y) => y.date.getTime() - x.date.getTime())
    .slice(0, 40)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>UnpopularVoice</title>
<link>${SITE_URL}</link>
<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
<description>Forensic teardowns of Indian startups, read from their audited accounts.</description>
<language>en-in</language>
<lastBuildDate>${(items[0]?.date ?? new Date()).toUTCString()}</lastBuildDate>
${items
  .map(
    (i) => `<item>
<title>${esc(i.title)}</title>
<link>${i.url}</link>
<guid isPermaLink="true">${i.url}</guid>
<pubDate>${i.date.toUTCString()}</pubDate>
<category>${esc(i.category)}</category>
<description>${esc(i.description)}</description>
</item>`,
  )
  .join('\n')}
</channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
