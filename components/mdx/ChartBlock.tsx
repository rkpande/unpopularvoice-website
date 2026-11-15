interface DataPoint {
  label: string
  value: number
  color?: 'red' | 'green' | 'gray' | 'black'
}

interface ChartBlockProps {
  title: string
  subtitle?: string
  data: DataPoint[]
  unit?: string
  unitSuffix?: string
  type?: 'bar' | 'comparison'
  alt?: string
}

const colorMap: Record<string, string> = {
  red: '#DC2626', // Loss Red (DESIGN.md loss-red); brand red is identity only
  green: '#15803D', // Gain Green
  gray: '#9ca3af',
  black: '#111111',
}

export default function ChartBlock({
  title,
  subtitle,
  data,
  unit = '',
  unitSuffix = '',
  type = 'bar',
  alt,
}: ChartBlockProps) {
  void type
  // Bars scale by magnitude around a zero line: gains rise above it, losses and
  // outflows hang below it, so a -77 Cr outflow is visibly larger than -0.56 Cr.
  const maxPos = Math.max(0, ...data.map((d) => d.value))
  const maxNeg = Math.max(0, ...data.map((d) => -d.value))
  const span = maxPos + maxNeg || 1
  const chartHeight = 160
  const upH = (chartHeight * maxPos) / span
  const downH = (chartHeight * maxNeg) / span
  const barWidth = Math.min(64, Math.floor(600 / Math.max(data.length, 1)) - 16)
  const fmt = (v: number) => `${v < 0 ? '−' : ''}${unit}${Math.abs(v).toLocaleString('en-IN')}${unitSuffix}`

  return (
    <figure className="not-prose my-8 bg-gray-50 rounded-lg p-6 border border-gray-100">
      <figcaption>
        <span className="block font-sans font-semibold text-black text-sm mb-0.5">{title}</span>
        {subtitle && <span className="block font-sans text-gray-500 text-xs mb-4">{subtitle}</span>}
        {alt && <span className="sr-only">{alt}</span>}
      </figcaption>

      {/* Values as a list for screen readers; the bars below are the visual. */}
      <ul className="sr-only">
        {data.map((d, i) => (
          <li key={i}>
            {d.label}: {fmt(d.value)}
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="flex items-stretch gap-3 mt-4">
        {data.map((d, i) => {
          const h = Math.max(3, (Math.abs(d.value) / span) * chartHeight)
          const color = colorMap[d.color ?? 'black']
          const bar = (
            <div className="w-full rounded-sm" style={{ height: h, backgroundColor: color, minWidth: 12, maxWidth: barWidth }} />
          )
          return (
            <div key={i} className="flex flex-col items-center flex-1 min-w-0">
              <span className="font-sans text-xs font-semibold text-gray-700 mb-1 whitespace-nowrap">{fmt(d.value)}</span>
              {maxPos > 0 && (
                <div className="w-full flex flex-col items-center justify-end" style={{ height: upH }}>
                  {d.value >= 0 && bar}
                </div>
              )}
              {maxPos > 0 && maxNeg > 0 && <div className="w-full border-t border-gray-300" />}
              {maxNeg > 0 && (
                <div className="w-full flex flex-col items-center justify-start" style={{ height: downH }}>
                  {d.value < 0 && bar}
                </div>
              )}
              <span className="font-sans text-xs text-gray-500 text-center leading-tight mt-1.5">{d.label}</span>
            </div>
          )
        })}
      </div>
    </figure>
  )
}
