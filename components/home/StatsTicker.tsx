import type { ArticleMeta } from '@/lib/articles'

export default function StatsTicker({ articles }: { articles: ArticleMeta[] }) {
  const items = articles
    .filter(a => a.heroNumbers?.[0])
    .map(a => ({
      company: a.company,
      value: a.heroNumbers![0].value,
      label: a.heroNumbers![0].label,
    }))

  const doubled = [...items, ...items]

  return (
    <div className="bg-black border-t border-white/10 overflow-hidden select-none">
      <div
        className="flex whitespace-nowrap animate-ticker"
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-baseline gap-3 px-8 py-4 flex-shrink-0">
            <span className="font-sans text-[12px] font-bold text-brand-red uppercase tracking-widest">
              {item.company}
            </span>
            <span className="font-serif text-white text-lg font-bold">
              {item.value}
            </span>
            <span className="font-sans text-white/75 text-[11px] uppercase tracking-wider">
              {item.label}
            </span>
            <span aria-hidden="true" className="text-white/30 mx-3 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
