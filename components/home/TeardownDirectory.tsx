import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { getAllSectors, primarySector, sectorSlug } from '@/lib/sectors'

// Every published teardown, grouped by sector, linked from the homepage.
// The homepage is the page search engines visit most; this gives them (and
// readers) a direct path to every article and every sector page. Groups are
// collapsed so the section stays short on phones; links inside <details> are
// still in the HTML and still followed.
export default function TeardownDirectory({ articles }: { articles: ArticleMeta[] }) {
  const sectors = getAllSectors()
  const bySector = new Map<string, ArticleMeta[]>()
  for (const a of articles) {
    const slug = sectorSlug(primarySector(a.sector))
    bySector.set(slug, [...(bySector.get(slug) ?? []), a])
  }

  return (
    <section aria-labelledby="directory-heading" className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-8">
          <h2 id="directory-heading" className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight">
            Every teardown, by sector
          </h2>
          <Link href="/articles" className="font-sans text-sm font-semibold text-black underline underline-offset-4 decoration-gray-300 hover:decoration-black">
            All {articles.length} teardowns
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 items-start">
          {sectors.map((s) => {
            const list = (bySector.get(s.slug) ?? []).slice().sort((a, b) => a.company.localeCompare(b.company))
            if (list.length === 0) return null
            return (
              <details key={s.slug} className="group border-t border-gray-200 py-3">
                <summary className="flex items-baseline justify-between gap-4 cursor-pointer list-none min-h-[44px] items-center [&::-webkit-details-marker]:hidden">
                  <span className="font-sans text-[15px] font-semibold text-black">{s.label}</span>
                  <span className="font-sans text-sm text-gray-500 tabular-nums">
                    {list.length}
                    <span aria-hidden="true" className="inline-block ml-2 transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <ul className="mt-1 mb-2 space-y-2">
                  {list.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/${a.slug}`} className="group/link block">
                        <span className="font-sans text-sm font-semibold text-black group-hover/link:text-brand-red">{a.company}</span>
                        <span className="block font-sans text-sm text-gray-600 leading-snug">{a.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/sector/${s.slug}`} className="inline-block font-sans text-sm text-black underline underline-offset-4 decoration-gray-300 hover:decoration-black mb-1">
                  {s.label} sector page
                </Link>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
