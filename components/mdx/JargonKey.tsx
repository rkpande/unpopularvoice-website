type Term = [abbr: string, full: string, meaning: string]

interface JargonKeyProps {
  terms?: Term[]
}

const DEFAULT_TERMS: Term[] = [
  ['OCF', 'Operating Cash Flow', 'cash actually generated from running the business in the year (excludes financing and investment movements).'],
  ['PAT', 'Profit After Tax', 'the final reported profit or loss for the year, after all costs and taxes.'],
  ['PBT', 'Profit Before Tax', 'profit for the year before income tax, useful for spotting tax credits or write-backs.'],
  ['CWIP', 'Capital Work-in-Progress', 'assets being built or fitted out at year-end but not yet operational.'],
  ['CAC', 'Customer Acquisition Cost', 'how much the company spends to acquire one new paying customer.'],
]

export default function JargonKey({ terms }: JargonKeyProps) {
  const list = terms && terms.length > 0 ? terms : DEFAULT_TERMS
  return (
    <details className="not-prose group my-8 border border-gray-200 rounded-xl bg-white">
      <summary className="flex items-center justify-between gap-4 min-h-[44px] px-5 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-sans text-sm text-gray-800">
          <span className="font-semibold text-black">Terms used here: </span>
          {list.map(([abbr]) => abbr).join(', ')}
        </span>
        <span aria-hidden="true" className="font-sans text-gray-500 transition-transform group-open:rotate-45">+</span>
      </summary>
      <dl className="space-y-3 px-5 pb-5 pt-1">
        {list.map(([abbr, full, meaning]) => (
          <div key={abbr} className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="font-sans text-black font-bold text-sm shrink-0 sm:w-44 sm:break-words">{abbr}</dt>
            <dd className="font-sans text-gray-800 text-sm leading-relaxed sm:flex-1 sm:min-w-0">
              <span className="font-semibold">{full}</span>, {meaning}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  )
}
