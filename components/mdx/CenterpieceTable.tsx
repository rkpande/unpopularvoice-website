import { signTone, toneText } from '@/lib/tone'

interface CenterpieceTableProps {
  rows: [string, string, string][]
  title?: string
}

// A figure like "₹8,809.94 Cr", "-₹111.98 Cr", "48%" or "2.5x" must never
// break across lines; descriptive text in the same slot may wrap.
// Cells can arrive as numbers or elements from MDX; only plain strings are tested.
function isFigure(value: unknown): boolean {
  if (typeof value !== 'string') return false
  return /^[\s(~≈+\-−]*[₹$]?\s?[\d.,]+\s*(%|x|Cr|Lakh|bn|mn)?\.?$/i.test(value.trim()) ||
    /^[\s(~≈+\-−]*₹/.test(value)
}

export default function CenterpieceTable({ rows, title }: CenterpieceTableProps) {
  // The black lid appears only when an article names its table. A fixed default
  // title repeated on every page made ~90 articles open with an identical block.
  return (
    <div className="not-prose my-10">
      {title && (
        <div className="bg-black px-5 sm:px-6 py-4 rounded-t-xl">
          <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/60">{title}</span>
        </div>
      )}

      <div className={`border border-gray-200 overflow-hidden ${title ? 'border-t-0 rounded-b-xl' : 'rounded-xl'}`}>
        {/* One table, two layouts: on phones each row restyles into a short stack
            (label, filed figure, what it means) so nothing is clipped; from 640px it
            is the three-column comparison. Single markup, so every figure appears
            once in the page source. */}
        <table className="block sm:table w-full border-collapse">
          <caption className="sr-only">{title ?? 'Key figures from the audited accounts'}</caption>
          <thead className="hidden sm:table-header-group">
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
          <tbody className="block sm:table-row-group divide-y divide-gray-100 sm:divide-y-0">
            {rows.map(([metric, reported, meaning], i) => (
              <tr
                key={i}
                className={`block sm:table-row px-5 py-4 sm:p-0 sm:border-b sm:border-gray-100 sm:last:border-0 ${
                  i % 2 === 0 ? 'sm:bg-white' : 'sm:bg-gray-50/50'
                }`}
              >
                <th
                  scope="row"
                  className="block sm:table-cell text-left sm:px-4 sm:py-4 font-sans text-[12px] sm:text-[13px] font-semibold text-gray-600 leading-snug"
                >
                  {metric}
                </th>
                {/* Reported: large bold serif, the "headline number", coloured by sign (lib/tone.ts) */}
                <td
                  className={`block sm:table-cell mt-1.5 sm:mt-0 sm:px-4 sm:py-4 font-serif text-[1.35rem] sm:text-[1.4rem] font-bold leading-tight ${toneText[signTone(reported, metric)]} ${
                    isFigure(reported) ? 'whitespace-nowrap' : ''
                  }`}
                >
                  {reported}
                </td>
                {/* What it means: context for the reported figure */}
                <td className="block sm:table-cell mt-2 sm:mt-0 sm:px-4 sm:py-4 font-sans text-[13px] font-medium text-gray-800 leading-snug sm:bg-black/[0.02] sm:border-l-2 sm:border-black/10">
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
