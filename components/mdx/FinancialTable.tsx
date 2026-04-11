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
  negative: 'text-brand-red font-semibold',
  neutral: 'text-gray-700',
  bold: 'text-black font-semibold',
}

export default function FinancialTable({ headers, rows, caption }: FinancialTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-gray-100 shadow-sm not-prose">
      <table className="w-full text-sm font-sans">
        <thead>
          <tr className="bg-black text-white">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`px-5 py-3 text-left font-semibold text-xs tracking-wide ${
                  i === 0 ? 'min-w-[200px]' : 'min-w-[100px]'
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, ci) => {
                const { value, style } = cellStyle(cell)
                return (
                  <td
                    key={ci}
                    className={`px-5 py-3 ${ci === 0 ? 'font-medium text-black' : styleMap[style]}`}
                  >
                    {value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <p className="px-5 py-2 text-xs text-gray-400 bg-gray-50 border-t border-gray-100 font-sans">
          {caption}
        </p>
      )}
    </div>
  )
}
