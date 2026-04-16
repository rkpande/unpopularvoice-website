interface TimelineEvent {
  year: string
  label: string
  detail?: string
  type?: 'neutral' | 'negative' | 'positive' | 'pivot'
}

interface ArticleTimelineProps {
  title?: string
  events: TimelineEvent[]
}

const dotColor: Record<string, string> = {
  neutral: 'bg-gray-400',
  negative: 'bg-brand-red',
  positive: 'bg-green-600',
  pivot: 'bg-black',
}

const yearColor: Record<string, string> = {
  neutral: 'text-gray-500',
  negative: 'text-brand-red',
  positive: 'text-green-600',
  pivot: 'text-black',
}

export default function ArticleTimeline({ title, events }: ArticleTimelineProps) {
  return (
    <div className="not-prose my-8 bg-gray-50 rounded-lg p-6 border border-gray-100">
      {title && (
        <p className="font-sans font-semibold text-black text-sm mb-5">{title}</p>
      )}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-gray-200" />

        <div className="space-y-5">
          {events.map((ev, i) => {
            const type = ev.type ?? 'neutral'
            return (
              <div key={i} className="flex items-start gap-4">
                {/* Year */}
                <span className={`font-sans font-bold text-xs w-10 text-right shrink-0 pt-0.5 ${yearColor[type]}`}>
                  {ev.year}
                </span>
                {/* Dot */}
                <div className={`relative z-10 mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${dotColor[type]}`} />
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-black text-sm leading-snug">{ev.label}</p>
                  {ev.detail && (
                    <p className="font-sans text-gray-500 text-xs mt-0.5 leading-snug">{ev.detail}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
