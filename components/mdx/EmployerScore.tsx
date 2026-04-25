interface EmployerScoreProps {
  jobSecurity: number       // 1–5
  growthOpportunity: number // 1–5
  payCredibility: number    // 1–5
  missionViability: number  // 1–5
  verdict: 'caution' | 'watch' | 'solid'
  summary: string
  filingPeriod?: string
}

const verdictConfig = {
  caution: {
    label: 'PROCEED WITH CAUTION',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  watch: {
    label: 'WORTH WATCHING',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  solid: {
    label: 'SOLID OPPORTUNITY',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
}

const dimensions = [
  { key: 'jobSecurity',      label: 'Job Security',      desc: 'Runway, burn, likelihood of continuity' },
  { key: 'growthOpportunity', label: 'Growth Potential',  desc: 'Scope to grow career and comp' },
  { key: 'payCredibility',   label: 'Pay Credibility',   desc: 'Can the company sustain market salaries' },
  { key: 'missionViability', label: 'Mission Viability', desc: 'Does the business model hold long-term' },
] as const

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 w-6 rounded-sm ${i <= score ? 'bg-black' : 'bg-gray-200'}`}
          />
        ))}
      </div>
      <span className="font-sans text-xs text-gray-500 tabular-nums">{score}/5</span>
    </div>
  )
}

export default function EmployerScore({
  jobSecurity,
  growthOpportunity,
  payCredibility,
  missionViability,
  verdict,
  summary,
  filingPeriod,
}: EmployerScoreProps) {
  const vc = verdictConfig[verdict]
  const scores = { jobSecurity, growthOpportunity, payCredibility, missionViability }

  return (
    <div className="not-prose my-10 border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-black px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/60">
            Employer Score
          </span>
          <span className="font-sans text-[11px] text-white/30">
            for job seekers
          </span>
        </div>
        {filingPeriod && (
          <span className="font-sans text-[10px] text-white/30">
            Based on {filingPeriod} filings
          </span>
        )}
      </div>

      {/* Verdict badge */}
      <div className={`px-6 py-4 border-b border-gray-100 ${vc.bg}`}>
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${vc.dot}`} />
          <span className={`font-sans text-xs font-bold tracking-wider uppercase ${vc.text}`}>
            {vc.label}
          </span>
        </div>
        <p className="mt-2 font-sans text-sm text-gray-700 leading-snug">{summary}</p>
      </div>

      {/* Score bars */}
      <div className="divide-y divide-gray-100 bg-white">
        {dimensions.map(({ key, label, desc }) => (
          <div key={key} className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="font-sans text-sm font-semibold text-black">{label}</div>
              <div className="font-sans text-xs text-gray-400 mt-0.5">{desc}</div>
            </div>
            <div className="shrink-0">
              <ScoreBar score={scores[key]} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="font-sans text-[10px] text-gray-400">
          Scores reflect financial health signals from public filings only. Not a complete hiring recommendation.
        </p>
      </div>
    </div>
  )
}
