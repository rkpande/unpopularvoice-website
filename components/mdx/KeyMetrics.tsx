type MetricType = 'neutral' | 'negative' | 'positive' | 'warning'

interface Metric {
  label: string
  value: string
  sub?: string
  type?: MetricType
}

interface KeyMetricsProps {
  metrics: Metric[]
  period?: string
  title?: string
}

const typeColor: Record<MetricType, string> = {
  neutral:  'text-black',
  negative: 'text-brand-red',
  positive: 'text-green-600',
  warning:  'text-yellow-600',
}

export default function KeyMetrics({ metrics, period, title = 'Key Metrics' }: KeyMetricsProps) {
  return (
    <div className="not-prose my-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-black px-6 py-3 flex items-center justify-between">
        <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/60">
          {title}
        </span>
        {period && (
          <span className="font-sans text-[11px] text-white/40">{period}</span>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-gray-100">
        {metrics.map((m, i) => (
          <div key={i} className="p-5 bg-white">
            <p className="font-sans text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 leading-none">
              {m.label}
            </p>
            <p className={`font-serif text-[1.6rem] font-bold leading-none ${typeColor[m.type ?? 'neutral']}`}>
              {m.value}
            </p>
            {m.sub && (
              <p className="font-sans text-[11px] text-gray-400 mt-1.5 leading-snug">{m.sub}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
