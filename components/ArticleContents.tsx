import type { TocItem } from '@/lib/toc'

// "In this teardown": the article's sections as a collapsed list under the
// byline, for screens without the desktop sidebar (below 1280px). Rendered on
// the server, so it works without JavaScript and its links are crawlable.
export default function ArticleContents({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null
  return (
    <details className="xl:hidden group border-t border-gray-100 py-1 mb-2">
      <summary className="flex items-center justify-between gap-4 min-h-[44px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-sans text-sm font-semibold text-black">In this teardown</span>
        <span className="font-sans text-sm text-gray-500 tabular-nums">
          {items.length} sections
          <span aria-hidden="true" className="inline-block ml-2 transition-transform group-open:rotate-45">+</span>
        </span>
      </summary>
      <nav aria-label="In this teardown">
        <ol className="pb-3 space-y-0.5">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex gap-3 min-h-[40px] items-baseline py-2 font-sans text-[15px] leading-snug text-gray-800 hover:text-black"
              >
                <span className="text-gray-500 tabular-nums w-5 shrink-0 text-right">{i + 1}</span>
                <span className="underline-offset-4 hover:underline">{item.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  )
}
