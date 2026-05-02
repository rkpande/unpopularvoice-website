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
          <span key={i} className="inline-flex items-baseline gap-2 px-5 py-2.5 flex-shrink-0">
            <span className="font-sans text-[10px] font-bold text-brand-red uppercase tracking-widest">
              {item.company}
            </span>
            <span className="font-serif text-white text-sm font-bold">
              {item.value}
            </span>
            <span className="font-sans text-white/40 text-[9px] uppercase tracking-wider">
              {item.label}
            </span>
            <span className="text-brand-red/60 mx-2 text-[10px]">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
