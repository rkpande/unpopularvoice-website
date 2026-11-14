interface CenterpieceTableProps {
  rows: [string, string, string][]
  title?: string
}

// A figure like "₹8,809.94 Cr", "-₹111.98 Cr", "48%" or "2.5x" must never
// break across lines; descriptive text in the same slot may wrap.
function isFigure(value: string): boolean {
  return /^[\s(~≈+\-−]*[₹$]?\s?[\d.,]+\s*(%|x|Cr|Lakh|bn|mn)?\.?$/i.test(value.trim()) ||
    /^[\s(~≈+\-−]*₹/.test(value)
}

export default function CenterpieceTable({
  rows,
  title = 'What the numbers actually say',
}: CenterpieceTableProps) {
  return (
    <div className="not-prose my-10">
      {/* Black header bar, owns the space */}
      <div className="bg-black px-5 sm:px-6 py-4 rounded-t-xl flex items-center justify-between gap-4">
        <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/60">
          {title}
        </span>
        <span className="font-sans text-[10px] text-white/50 uppercase tracking-widest whitespace-nowrap">
          {rows.length} metrics
        </span>
      </div>

      <div className="border border-t-0 border-gray-200 rounded-b-xl overflow-hidden">
        {/* Phones: each row is a short stack (label, filed figure, what it means),
            so the interpretation is never clipped off the right edge. */}
        <dl className="sm:hidden divide-y divide-gray-100">
          {rows.map(([metric, reported, meaning], i) => (
            <div key={i} className="px-5 py-4">
              <dt className="font-sans text-[12px] font-semibold text-gray-600 leading-snug">{metric}</dt>
              <dd
                className={`mt-1.5 font-serif text-[1.35rem] font-bold text-black leading-tight ${
                  isFigure(reported) ? 'whitespace-nowrap' : ''
                }`}
              >
                {reported}
              </dd>
              <dd className="mt-2 font-sans text-[13px] font-medium text-gray-800 leading-snug">{meaning}</dd>
            </div>
          ))}
        </dl>

        {/* Tablet and up: the three-column comparison */}
        <table className="hidden sm:table w-full border-collapse">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th scope="col" className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-gray-500 px-4 py-3 w-[28%]">
                Metric
              </th>
              <th scope="col" className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-gray-500 px-4 py-3 w-[26%]">
                Reported
              </th>
              <th scope="col" className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-black px-4 py-3 bg-black/[0.03] border-l-2 border-black/10">
                What it means
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([metric, reported, meaning], i) => (
              <tr
                key={i}
                className={`border-b border-gray-100 last:border-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <th scope="row" className="text-left px-4 py-4 font-sans text-[13px] font-semibold text-gray-600 leading-snug">
                  {metric}
                </th>
                {/* Reported: large bold serif, the "headline number" */}
                <td
                  className={`px-4 py-4 font-serif text-[1.4rem] font-bold text-black leading-tight ${
                    isFigure(reported) ? 'whitespace-nowrap' : ''
                  }`}
                >
                  {reported}
                </td>
                {/* What it means: context for the reported figure, visually distinct column */}
                <td className="px-4 py-4 font-sans text-[13px] font-medium text-gray-800 leading-snug bg-black/[0.02] border-l-2 border-black/10">
                  {meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
