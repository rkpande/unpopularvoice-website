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
    border: 'border-red-200 bg-red-50',
    badge: 'bg-red-600 text-white',
    badgeText: 'Red Flag',
    icon: '⚑',
  },
  warning: {
    border: 'border-amber-200 bg-amber-50',
    badge: 'bg-amber-700 text-white',
    badgeText: 'Watch',
    icon: '⚠',
  },
  positive: {
    border: 'border-green-200 bg-green-50',
    badge: 'bg-green-700 text-white',
    badgeText: 'Positive',
    icon: '✓',
  },
  insight: {
    border: 'border-gray-200 bg-gray-50',
    badge: 'bg-black text-white',
    badgeText: 'Insight',
    icon: '→',
  },
}

export default function InsightBox({ type = 'insight', number, label, title, children }: InsightBoxProps) {
  const config = typeConfig[type]
  const displayLabel = label ?? config.badgeText
  return (
    <div className={`not-prose my-6 border rounded-lg p-6 ${config.border}`}>
      <div className="flex items-start gap-4">
        {number && (
          <span className="font-sans font-bold text-2xl text-gray-500 leading-none mt-0.5 select-none min-w-[2rem]">
            {number}
          </span>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`font-sans text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${config.badge}`}>
              <span aria-hidden="true">{config.icon}</span> {displayLabel}
            </span>
          </div>
          <p className="font-sans font-semibold text-black text-[15px] mb-2">{title}</p>
          <div className="font-sans text-gray-600 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
