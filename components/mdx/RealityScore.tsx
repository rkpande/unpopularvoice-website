interface ScoreDimension {
  label: string
  score: number
  summary: string
}

interface RealityScoreProps {
  company: string
  period: string
  dimensions: ScoreDimension[]
  verdict: string
}

function scoreColor(score: number): string {
  if (score >= 7) return 'text-green-600'
  if (score >= 5) return 'text-yellow-600'
  return 'text-brand-red'
}

function scoreBorder(score: number): string {
  if (score >= 7) return 'border-t-green-600'
  if (score >= 5) return 'border-t-yellow-500'
  return 'border-t-brand-red'
}

export default function RealityScore({ company, period, dimensions, verdict }: RealityScoreProps) {
  return (
    <div className="not-prose my-10 bg-black rounded-xl overflow-hidden border-t-4 border-brand-red">
      <div className="px-8 pt-8 pb-4">
        <p className="text-brand-red font-sans font-bold text-xs tracking-widest uppercase mb-1">
          Reality Check Score
        </p>
        <h3 className="font-serif text-white text-2xl font-bold">
          {company} &mdash; {period}
        </h3>
        <p className="text-white/40 font-sans text-sm mt-1">
          Three dimensions. Independent analysis. No affiliation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 mx-8 mb-6 rounded-lg overflow-hidden">
        {dimensions.map((dim) => (
          <div key={dim.label} className={`bg-[#0d0d0d] p-6 border-t-4 ${scoreBorder(dim.score)}`}>
            <p className="text-white/50 font-sans text-[10px] tracking-widest uppercase mb-1">
              {dim.label}
            </p>
            <p className={`font-serif text-5xl font-bold ${scoreColor(dim.score)}`}>
              {dim.score}
              <span className="text-white/20 text-2xl">/10</span>
            </p>
            <p className="text-white/50 font-sans text-xs mt-3 leading-relaxed">{dim.summary}</p>
          </div>
        ))}
      </div>

      <div className="px-8 pb-8">
        <p className="text-white/60 font-sans text-sm border-t border-white/10 pt-4 leading-relaxed">
          <span className="text-white font-semibold">Verdict: </span>
          {verdict}
        </p>
      </div>
    </div>
  )
}
