type InsightType = 'flag' | 'positive' | 'insight' | 'warning'

interface InsightBoxProps {
  type?: InsightType
  number?: string
  label?: string
  title: string
  children: React.ReactNode
}

const typeConfig: Record<InsightType, { border: string; badge: string; badgeText: string; icon: string }> = {
  flag: {
    border: 'border-l-brand-red bg-red-50',
    badge: 'bg-brand-red text-white',
    badgeText: 'Red Flag',
    icon: '⚑',
  },
  warning: {
    border: 'border-l-yellow-500 bg-yellow-50',
    badge: 'bg-yellow-500 text-white',
    badgeText: 'Watch',
    icon: '⚠',
  },
  positive: {
    border: 'border-l-green-600 bg-green-50',
    badge: 'bg-green-600 text-white',
    badgeText: 'Positive',
    icon: '✓',
  },
  insight: {
    border: 'border-l-black bg-gray-50',
    badge: 'bg-black text-white',
    badgeText: 'Insight',
    icon: '→',
  },
}

export default function InsightBox({ type = 'insight', number, label, title, children }: InsightBoxProps) {
  const config = typeConfig[type]
  const displayLabel = label ?? config.badgeText
  return (
    <div className={`not-prose my-6 border-l-4 rounded-r-lg p-6 ${config.border}`}>
      <div className="flex items-start gap-4">
        {number && (
          <span className="font-sans font-bold text-2xl text-gray-300 leading-none mt-0.5 select-none min-w-[2rem]">
            {number}
          </span>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`font-sans text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${config.badge}`}>
              {config.icon} {displayLabel}
            </span>
          </div>
          <p className="font-sans font-semibold text-black text-[15px] mb-2">{title}</p>
          <div className="font-sans text-gray-600 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
