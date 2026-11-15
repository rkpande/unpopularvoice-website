type AssumptionStatus = 'fact' | 'inference' | 'estimate'

interface AssumptionItem {
  claim: string
  status: AssumptionStatus
  basis: string
}

interface AssumptionsProps {
  items: AssumptionItem[]
}

const statusConfig: Record<AssumptionStatus, { label: string; bg: string }> = {
  fact:      { label: 'Filed Fact',  bg: 'bg-black text-white' },
  inference: { label: 'Inference',   bg: 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-300' },
  estimate:  { label: 'Estimate',    bg: 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-300' },
}

export default function Assumptions({ items }: AssumptionsProps) {
  return (
    <div className="not-prose my-10">
      <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3">
        Transparency Layer, What We Know vs. What We Infer
      </p>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-gray-500 px-4 py-3 w-[45%]">
                Claim in Article
              </th>
              <th className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-gray-500 px-4 py-3 w-[15%]">
                Type
              </th>
              <th className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-gray-500 px-4 py-3">
                Basis
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              const cfg = statusConfig[item.status]
              return (
                <tr
                  key={i}
                  className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                >
                  <td className="px-4 py-3 font-sans text-[13px] text-gray-800 leading-snug">
                    {item.claim}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-sans text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase whitespace-nowrap ${cfg.bg}`}>
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-sans text-[12px] text-gray-500 leading-snug">
                    {item.basis}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
