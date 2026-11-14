// One reading of EmployerScore labels for every surface (article scorecard,
// Employer Check, Compare). Colour and ranking come from what a label MEANS for
// its dimension, not from the word alone: "High" is good for Career Upside but
// a risk for Funding Dependence.

export type Tone = 'good' | 'watch' | 'concern' | 'bad' | 'unknown'
export type EmployerDimension =
  | 'growthMomentum'
  | 'stability'
  | 'profitability'
  | 'fundingDependence'
  | 'careerUpside'

export const toneClass: Record<Tone, string> = {
  good: 'bg-green-50 text-green-700 border-green-200',
  watch: 'bg-amber-50 text-amber-800 border-amber-200',
  concern: 'bg-orange-50 text-orange-800 border-orange-200',
  bad: 'bg-red-50 text-red-700 border-red-200',
  unknown: 'bg-gray-100 text-gray-700 border-gray-200',
}

/** Higher is better; used to pick the stronger side in comparisons. */
export const toneRank: Record<Tone, number> = { good: 4, watch: 3, unknown: 3, concern: 2, bad: 1 }

export function toneFor(dimension: EmployerDimension, value: string | undefined | null): Tone {
  const v = (value || '').toLowerCase()
  if (!v || v.includes('uncertain')) return 'unknown'

  if (dimension === 'fundingDependence') {
    // Reliance on outside capital: low is good, high is a risk.
    if (/\blow\b/.test(v)) return 'good'
    if (/moderate|medium/.test(v)) return 'watch'
    if (/very high|critical/.test(v)) return 'bad'
    if (/high/.test(v)) return 'concern'
    return 'unknown'
  }

  if (dimension === 'profitability') {
    if (/achieved|profitable/.test(v)) return 'good'
    if (/deepening/.test(v)) return 'bad'
    if (/narrowing|improving|near|marginal|thin/.test(v)) return 'watch'
    if (/loss|weak/.test(v)) return 'concern'
    return 'unknown'
  }

  // Growth momentum, stability and career upside: higher is better.
  if (/critical|caution|declining|contracting/.test(v)) return 'bad'
  if (/weak|stretched|limited|slowing|\blow\b/.test(v)) return 'concern'
  if (/moderate|medium|steady|watch|modest|mixed|flat|slow|variance|improving/.test(v)) return 'watch'
  if (/strong|high|growing/.test(v)) return 'good'
  return 'unknown'
}
