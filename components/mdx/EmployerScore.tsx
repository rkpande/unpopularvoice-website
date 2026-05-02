import Link from 'next/link'

interface EmployerScoreProps {
  company: string
  filingPeriod: string
  growthMomentum: string
  stability: string
  profitability: string
  fundingDependence: string
  careerUpside: string
  verdict: 'caution' | 'watch' | 'solid'
  notes: string
  signals: string[]
  risks: string[]
}

const verdictConfig = {
  caution: { label: 'Proceed with caution', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
  watch:   { label: 'Worth watching',        bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
  solid:   { label: 'Solid financial footing', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-500' },
}

// Map label text → Tailwind classes. All classes must be in full form (no dynamic concat).
const labelStyle: Record<string, string> = {
  // Green
  'Strong':          'bg-green-100 text-green-700 border-green-200',
  'Achieved':        'bg-green-100 text-green-700 border-green-200',
  'Low':             'bg-green-100 text-green-700 border-green-200',
  'High':            'bg-green-100 text-green-700 border-green-200',
  // Amber
  'Moderate':        'bg-amber-50 text-amber-700 border-amber-200',
  'Improving':       'bg-amber-50 text-amber-700 border-amber-200',
  'Near Break-even': 'bg-amber-50 text-amber-700 border-amber-200',
  'High Variance':   'bg-amber-50 text-amber-700 border-amber-200',
  // Orange
  'Stretched':       'bg-orange-50 text-orange-700 border-orange-200',
  'Weak':            'bg-orange-50 text-orange-700 border-orange-200',
  'Limited':         'bg-orange-50 text-orange-700 border-orange-200',
  // Red
  'Critical':        'bg-red-50 text-red-700 border-red-200',
  'Loss-Deepening':  'bg-red-50 text-red-700 border-red-200',
  'Declining':       'bg-red-50 text-red-700 border-red-200',
  // Gray
  'Uncertain':       'bg-gray-100 text-gray-600 border-gray-200',
}

function LabelChip({ value }: { value: string }) {
  const cls = labelStyle[value] ?? 'bg-gray-100 text-gray-600 border-gray-200'
  return (
    <span className={`inline-block border rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold ${cls}`}>
      {value}
    </span>
  )
}

const dimensions = [
  { key: 'growthMomentum' as const,   label: 'Growth Momentum',     what: 'YoY revenue growth rate, whether growth is from continuing operations, cost trajectory' },
  { key: 'stability' as const,        label: 'Stability',           what: 'Cash + liquid assets vs burn, debt structure, operating cash flow' },
  { key: 'profitability' as const,    label: 'Profitability',       what: 'PAT direction, cost-to-income ratio trend, operating leverage signals' },
  { key: 'fundingDependence' as const,label: 'Funding Dependence',  what: 'How much of operations is funded by equity raises vs revenue' },
  { key: 'careerUpside' as const,     label: 'Career Upside',       what: 'Revenue growth + payroll signals + ESOP structure + company stage' },
]

export default function EmployerScore({
  company, filingPeriod,
  growthMomentum, stability, profitability, fundingDependence, careerUpside,
  verdict, notes, signals, risks,
}: EmployerScoreProps) {
  const vc = verdictConfig[verdict]
  const values = { growthMomentum, stability, profitability, fundingDependence, careerUpside }

  return (
    <div className="not-prose my-10 border border-gray-200 rounded-xl overflow-hidden shadow-sm">

      {/* Header */}
      <div className="bg-black px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-sans text-brand-red text-[10px] font-bold tracking-widest uppercase mb-1">
              Employer Health Signal
            </p>
            <p className="font-serif text-white text-lg font-bold leading-snug">{company}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5">
                <span className="font-sans text-white/80 text-[10px] font-semibold tracking-wide">
                  Filing: {filingPeriod}
                </span>
              </span>
              <span className="font-sans text-white/35 text-[10px]">MCA audited data</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${vc.bg} ${vc.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${vc.dot}`} />
            <span className={`font-sans text-[10px] font-bold tracking-wider uppercase ${vc.text}`}>
              {vc.label}
            </span>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="bg-white divide-y divide-gray-100">
        {dimensions.map(({ key, label, what }) => (
          <div key={key} className="px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-sans text-sm font-semibold text-black">{label}</p>
              <p className="font-sans text-xs text-gray-400 mt-0.5 leading-snug">{what}</p>
            </div>
            <div className="flex-shrink-0">
              <LabelChip value={values[key]} />
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Notes</p>
        <p className="font-sans text-sm text-gray-700 leading-relaxed">{notes}</p>
      </div>

      {/* Filing signals + risks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-t border-gray-100">
        <div className="px-6 py-4 bg-white">
          <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2.5">
            What the filing confirms
          </p>
          <ul className="space-y-1.5">
            {signals.map((s, i) => (
              <li key={i} className="flex gap-2 font-sans text-xs text-gray-600">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>{s}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-4 bg-white">
          <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2.5">
            Risk flags from filing
          </p>
          <ul className="space-y-1.5">
            {risks.map((r, i) => (
              <li key={i} className="flex gap-2 font-sans text-xs text-gray-600">
                <span className="text-brand-red font-bold flex-shrink-0">–</span>{r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-3.5 bg-yellow-50 border-t border-yellow-100">
        <p className="font-sans text-[11px] text-yellow-800 leading-relaxed">
          <span className="font-bold">Disclaimer: </span>
          This signal is derived from audited financial filings only. It does not assess culture, management quality, career growth environment, team dynamics, or working conditions.
          A strong signal means the financial floor is solid. A weak signal means financial risk is present. Neither replaces your own due diligence.{' '}
          <Link href="/methodology" className="underline hover:text-yellow-900">Scoring methodology →</Link>
        </p>
      </div>

    </div>
  )
}
