import { signTone, toneFill } from '@/lib/tone'

// A bridge (waterfall) from one figure to another, step by step: revenue down
// through each cost line to profit, or a loss across to cash. Horizontal so it
// reads on a phone. Colour follows the Sign Rule (DESIGN.md): a step that adds
// is green, one that subtracts is red; totals take their own sign.
//
// MDX usage (flat tuple arrays only):
// <BridgeChart
//   title="From ₹4,056 Cr of revenue to ₹1,824 Cr of profit"
//   unit="₹ Cr"
//   steps={[["Revenue", "4,056", "total"], ["Employee costs", "-890"], ["Profit before tax", "2,415", "total"]]}
//   source="Billionbrains Garage Ventures, consolidated accounts, FY2026"
// />

type Step = [label: string, value: string, kind?: string]

const num = (v: string) => Number(String(v).replace(/[^0-9.\-−]/g, '').replace('−', '-')) || 0

export default function BridgeChart({
  title,
  steps,
  unit = '₹ Cr',
  source,
}: {
  title: string
  steps: Step[]
  unit?: string
  source?: string
}) {
  // Each bar runs from a start to an end on one shared scale.
  let running = 0
  const rows = steps.map(([label, value, kind]) => {
    const shown = String(value).trim().replace(/^\+/, '')
    const v = num(value)
    const total = kind === 'total'
    const start = total ? 0 : running
    const end = total ? v : running + v
    running = end
    return { label, v, total, start, end, shown }
  })
  const lo = Math.min(0, ...rows.flatMap((r) => [r.start, r.end]))
  const hi = Math.max(0, ...rows.flatMap((r) => [r.start, r.end]))
  const span = hi - lo || 1
  const pct = (x: number) => ((x - lo) / span) * 100
  const zero = pct(0)

  return (
    <figure className="not-prose my-10">
      <figcaption className="font-serif text-black text-lg sm:text-xl font-bold leading-snug mb-1 text-balance">{title}</figcaption>
      <p className="font-sans text-xs text-gray-500 mb-4">{unit}</p>

      {/* The data as a table for screen readers; the bars below are its picture. */}
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{`${!r.total && r.v > 0 ? '+' : ''}${r.shown} ${unit}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div aria-hidden="true" className="space-y-1.5">
        {rows.map((r) => {
          const left = Math.min(pct(r.start), pct(r.end))
          const width = Math.max(Math.abs(pct(r.end) - pct(r.start)), 0.6)
          // Totals: the Sign Rule with the row label (a positive 'profit' is green,
          // revenue stays black). Steps: adds are green, subtractions red.
          const tone = r.total ? signTone(r.v, r.label) : r.v < 0 ? 'loss' : 'gain'
          return (
            <div key={r.label} className="grid grid-cols-[minmax(0,42%)_1fr] sm:grid-cols-[minmax(0,34%)_1fr] items-center gap-3">
              <div className={`font-sans text-[13px] leading-tight ${r.total ? 'font-bold text-black' : 'text-gray-700'}`}>{r.label}</div>
              <div className="relative h-7">
                <div className="absolute inset-y-0 w-px bg-gray-300" style={{ left: `${zero}%` }} />
                <div
                  className="absolute top-1 bottom-1 rounded-[2px]"
                  style={{ left: `${left}%`, width: `${width}%`, background: toneFill[tone], opacity: r.total ? 1 : 0.85 }}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 font-sans text-[12px] font-semibold tabular-nums whitespace-nowrap text-black"
                  style={
                    left + width > 62
                      ? { right: `${100 - left + 1}%` }
                      : { left: `${left + width + 1}%` }
                  }
                >
                  {`${!r.total && r.v > 0 ? '+' : ''}${r.shown}`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      {source && <p className="mt-3 font-sans text-xs text-gray-500">{source}</p>}
    </figure>
  )
}
