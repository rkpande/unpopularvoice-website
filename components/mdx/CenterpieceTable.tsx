interface CenterpieceTableProps {
  rows: [string, string, string][]
  title?: string
}

export default function CenterpieceTable({
  rows,
  title = 'What the numbers actually say',
}: CenterpieceTableProps) {
  return (
    <div className="not-prose my-10">
      {/* Black header bar — owns the space */}
      <div className="bg-black px-6 py-4 rounded-t-xl flex items-center justify-between">
        <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/50">
          {title}
        </span>
        <span className="font-sans text-[10px] text-white/25 uppercase tracking-widest">
          {rows.length} metrics
        </span>
      </div>

      <div className="border border-t-0 border-gray-200 rounded-b-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[480px]">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400 px-4 py-3 w-[28%]">
                Metric
              </th>
              <th className="text-left px-4 py-3 w-[26%]">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Reported
                </span>
                <span className="font-sans text-[9px] text-gray-300 ml-1 normal-case tracking-normal">
                  (Narrative)
                </span>
              </th>
              <th className="text-left px-4 py-3 bg-black/[0.03] border-l-2 border-black/10">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-black">
                  Economic Reality
                </span>
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
                <td className="px-4 py-4 font-sans text-[12px] sm:text-[13px] font-semibold text-gray-500 leading-snug">
                  {metric}
                </td>
                {/* Reported: large bold serif — the "headline number" */}
                <td className="px-4 py-4 font-serif text-[1.2rem] sm:text-[1.4rem] font-bold text-black leading-none">
                  {reported}
                </td>
                {/* Economic Reality: the answer — visually distinct column */}
                <td className="px-4 py-4 font-sans text-[12px] sm:text-[13px] font-medium text-gray-800 leading-snug bg-black/[0.02] border-l-2 border-black/10">
                  {meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
