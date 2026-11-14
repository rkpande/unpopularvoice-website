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
    <aside className="not-prose my-8 bg-amber-50 border border-amber-200 rounded-xl p-5 sm:p-6">
      <p className="font-sans text-[10px] tracking-[0.22em] uppercase font-bold text-amber-900 mb-3">
        Quick glossary
      </p>
      <dl className="space-y-3">
        {list.map(([abbr, full, meaning]) => (
          <div key={abbr} className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="font-sans text-amber-900 font-bold text-sm shrink-0 sm:w-44 sm:break-words">
              {abbr}
            </dt>
            <dd className="font-sans text-amber-950/90 text-sm leading-relaxed sm:flex-1 sm:min-w-0">
              <span className="font-semibold">{full}</span>, {meaning}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
