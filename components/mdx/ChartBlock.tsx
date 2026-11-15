import { signTone, toneFill } from '@/lib/tone'

interface DataPoint {
  label: string
  value: number
  // Emphasis only: 'gray' de-emphasises a comparison bar. Red and green are
  // never chosen here; they follow the value's sign (lib/tone.ts).
  color?: 'red' | 'green' | 'gray' | 'black' | 'orange'
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

function barFill(d: DataPoint): string {
  const tone = signTone(d.value, d.label)
  if (tone !== 'neutral') return toneFill[tone]
  return d.color === 'gray' ? '#9ca3af' : toneFill.neutral
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
          const color = barFill(d)
          const bar = (
            <div className="w-full rounded-sm" style={{ height: h, backgroundColor: color, minWidth: 12, maxWidth: barWidth }} />
          )
          return (
            <div key={i} className="flex flex-col items-center flex-1 min-w-0">
              <span className="font-sans text-xs font-semibold text-gray-700 mb-1 text-center leading-tight max-w-full">
                {/* The signed figure never splits; a line may break only before the unit. */}
                <span className="whitespace-nowrap">{`${d.value < 0 ? '−' : ''}${unit}${Math.abs(d.value).toLocaleString('en-IN')}`}</span>
                {unitSuffix && <> <span className="whitespace-nowrap">{unitSuffix.trim()}</span></>}
              </span>
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
