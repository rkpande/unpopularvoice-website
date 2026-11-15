import { signTone, toneText } from '@/lib/tone'

// Kept so existing articles still parse; colour now comes from the value's sign.
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


// The last tile stretches across whatever its row leaves empty, so an odd count
// never ends on a lone tile beside blank cells (2 columns on phones, 3 from md).
function fillLastRow(i: number, n: number): string {
  if (i !== n - 1) return ''
  const mobile = n % 2 === 1 ? 'col-span-2' : ''
  const md = n % 3 === 1 ? 'md:col-span-3' : n % 3 === 2 ? 'md:col-span-2' : 'md:col-span-1'
  return `${mobile} ${md}`.trim()
}

export default function KeyMetrics({ metrics, period, title = 'Key Metrics' }: KeyMetricsProps) {
  return (
    <div className="not-prose my-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-black px-6 py-3 flex items-center justify-between">
        <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/60">
          {title}
        </span>
        {period && (
          <span className="font-sans text-xs text-white/60">{period}</span>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-gray-100">
        {metrics.map((m, i) => (
          <div key={i} className={`p-5 bg-white ${fillLastRow(i, metrics.length)}`}>
            <p className="font-sans text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 leading-none">
              {m.label}
            </p>
            <p className={`font-serif text-[1.6rem] font-bold leading-none ${toneText[signTone(m.value, m.label)]}`}>
              {m.value}
            </p>
            {m.sub && (
              <p className="font-sans text-xs text-gray-500 mt-1.5 leading-snug">{m.sub}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
