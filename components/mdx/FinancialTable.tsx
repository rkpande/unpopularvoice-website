import type React from 'react'

type CellStyle = 'positive' | 'negative' | 'neutral' | 'bold'

interface FinancialTableProps {
  headers: string[]
  rows: (string | [string, CellStyle])[][]
  caption?: string
}

function cellStyle(cell: string | [string, CellStyle]): { value: string; style: CellStyle } {
  if (Array.isArray(cell)) return { value: cell[0], style: cell[1] }
  return { value: cell, style: 'neutral' }
}

const styleMap: Record<CellStyle, string> = {
  positive: 'text-green-700 font-semibold',
  negative: 'text-red-600 font-semibold',
  neutral: 'text-gray-700',
  bold: 'text-black font-semibold',
}

// Figures never break mid-number ("₹52.58 Cr" stays on one line).
function isFigure(value: string): boolean {
  return /^[\s(~≈+\-−]*[₹$]?\s?[\d.,]+\s*(%|x|Cr|Lakh|bn|mn)?\.?$/i.test(value.trim()) ||
    /^[\s(~≈+\-−]*₹/.test(value)
}

// Scroll-aware edge shadows: they appear only while the table actually
// overflows (and only on the side with more to see), so tables that fit show nothing.
const scrollShadows: React.CSSProperties = {
  backgroundImage: [
    'linear-gradient(to right, #fff 30%, rgba(255,255,255,0))',
    'linear-gradient(to left, #fff 30%, rgba(255,255,255,0))',
    'radial-gradient(farthest-side at 0 50%, rgba(0,0,0,0.14), rgba(0,0,0,0))',
    'radial-gradient(farthest-side at 100% 50%, rgba(0,0,0,0.14), rgba(0,0,0,0))',
  ].join(','),
  backgroundPosition: 'left center, right center, left center, right center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '40px 100%, 40px 100%, 14px 100%, 14px 100%',
  backgroundAttachment: 'local, local, scroll, scroll',
}

export default function FinancialTable({ headers, rows, caption }: FinancialTableProps) {
  return (
    <div className="my-8 rounded-lg border border-gray-100 shadow-sm not-prose overflow-hidden">
      <div className="overflow-x-auto" style={scrollShadows}>
        <table className="w-full text-sm font-sans">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-black text-white">
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-4 sm:px-5 py-3 text-left font-semibold text-xs tracking-wide ${
                    i === 0
                      ? 'sticky left-0 z-10 bg-black min-w-[6.5rem] sm:min-w-[200px]'
                      : 'whitespace-nowrap sm:min-w-[100px]'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              // Rows stay transparent on phones so the scroll shadows show through.
              <tr key={ri} className={ri % 2 === 0 ? 'sm:bg-white' : 'sm:bg-gray-50'}>
                {row.map((cell, ci) => {
                  const { value, style } = cellStyle(cell)
                  return ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="sticky left-0 z-10 bg-white sm:bg-inherit text-left px-4 sm:px-5 py-3 font-medium text-black"
                    >
                      {value}
                    </th>
                  ) : (
                    <td
                      key={ci}
                      className={`px-4 sm:px-5 py-3 ${styleMap[style]} ${isFigure(value) ? 'whitespace-nowrap' : ''}`}
                    >
                      {value}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="px-5 py-2 text-xs text-gray-500 bg-gray-50 border-t border-gray-100 font-sans" aria-hidden="true">
          {caption}
        </p>
      )}
    </div>
  )
}
