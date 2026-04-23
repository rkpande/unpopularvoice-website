export interface Prediction {
  text: string
  probability: 'high' | 'medium' | 'low'
  status: 'validated' | 'pending' | 'incorrect'
  outcome?: string   // What actually happened (for validated/incorrect)
  category?: 'fundraise' | 'cost' | 'growth' | 'pivot' | 'other'
}

interface PredictionsProps {
  predictions: Prediction[]
  asOf?: string   // e.g. "based on FY2025 filings"
}

const probabilityConfig = {
  high:   { label: 'HIGH',   bg: 'bg-gray-900',  text: 'text-white' },
  medium: { label: 'MEDIUM', bg: 'bg-gray-200',  text: 'text-gray-700' },
  low:    { label: 'LOW',    bg: 'bg-gray-100',  text: 'text-gray-500' },
}

const statusConfig = {
  validated: {
    icon: '✓',
    label: 'Validated',
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-600',
    textColor: 'text-green-700',
  },
  pending: {
    icon: '⏳',
    label: 'Pending',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    textColor: 'text-amber-700',
  },
  incorrect: {
    icon: '✗',
    label: 'Incorrect',
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-500',
    textColor: 'text-red-700',
  },
}

const categoryLabel: Record<string, string> = {
  fundraise: 'Fundraise',
  cost:      'Cost',
  growth:    'Growth',
  pivot:     'Pivot',
  other:     '',
}

export default function Predictions({ predictions, asOf }: PredictionsProps) {
  const validated = predictions.filter((p) => p.status === 'validated').length

  return (
    <div className="not-prose my-10 border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-black px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/60">
            Predictions
          </span>
          <span className="font-sans text-[11px] text-white/30">
            {asOf ?? 'derived from filing analysis'}
          </span>
        </div>
        {validated > 0 && (
          <span className="font-sans text-[10px] text-green-400">
            {validated}/{predictions.length} validated
          </span>
        )}
      </div>

      {/* Prediction rows */}
      <div className="divide-y divide-gray-100 bg-white">
        {predictions.map((p, i) => {
          const prob = probabilityConfig[p.probability]
          const stat = statusConfig[p.status]
          return (
            <div key={i} className="px-6 py-4">
              <div className="flex items-start gap-3">
                {/* Probability pill */}
                <span
                  className={`shrink-0 mt-0.5 font-sans text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full ${prob.bg} ${prob.text}`}
                >
                  {prob.label}
                </span>

                <div className="flex-1 min-w-0">
                  {/* Category tag — own line above text */}
                  {p.category && p.category !== 'other' && (
                    <div className="font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
                      {categoryLabel[p.category]}
                    </div>
                  )}

                  {/* Prediction text */}
                  <p className="font-sans text-sm text-gray-800 leading-snug">
                    {p.text}
                  </p>

                  {/* Status + outcome */}
                  <div className={`mt-2 inline-flex items-start gap-1.5 px-3 py-1.5 rounded-lg border ${stat.bg} ${stat.border}`}>
                    <span className={`text-xs ${stat.iconColor} shrink-0 mt-px`}>{stat.icon}</span>
                    <div>
                      <span className={`font-sans text-[10px] font-bold uppercase tracking-wide ${stat.textColor}`}>
                        {stat.label}
                      </span>
                      {p.outcome && (
                        <span className={`font-sans text-xs ${stat.textColor} ml-1.5`}>
                          — {p.outcome}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="font-sans text-[10px] text-gray-400">
          Predictions are editorial assessments based on public filings. Validated outcomes are based on publicly available information after the filing date.
        </p>
      </div>
    </div>
  )
}
