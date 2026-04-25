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
  red: '#B22222',
  green: '#16a34a',
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
  const max = Math.max(...data.map((d) => d.value))
  const chartHeight = 160
  const barWidth = Math.min(64, Math.floor(600 / data.length) - 16)

  return (
    <div
      className="not-prose my-8 bg-gray-50 rounded-lg p-6 border border-gray-100"
      role="img"
      aria-label={alt ?? title}
    >
      <p className="font-sans font-semibold text-black text-sm mb-0.5">{title}</p>
      {subtitle && <p className="font-sans text-gray-400 text-xs mb-4">{subtitle}</p>}

      <div className="flex items-end gap-3 mt-4" style={{ height: chartHeight + 32 }}>
        {data.map((d, i) => {
          const barH = Math.max(4, (d.value / max) * chartHeight)
          const color = colorMap[d.color ?? 'black']
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="font-sans text-[11px] font-semibold text-gray-700">
                {unit}{d.value.toLocaleString()}{unitSuffix}
              </span>
              <div
                className="w-full rounded-sm transition-all"
                style={{ height: barH, backgroundColor: color, minWidth: 12, maxWidth: barWidth }}
              />
              <span className="font-sans text-[10px] text-gray-500 text-center leading-tight">
                {d.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
