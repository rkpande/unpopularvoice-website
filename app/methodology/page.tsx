import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How We Score, Reality Check & Employer Check Methodology',
  description:
 'How UnpopularVoice scores startups. Reality Check scores and Employer Health Signals, all from audited public filings, no management commentary.',
  alternates: {
  canonical: 'https://unpopularvoice.com/methodology',
 },
}

function ScaleRow({ range, label, description }: { range: string; label: string; description: string }) {
  const color =
  range.startsWith('9') || range.startsWith('8')
 ? 'text-green-700'
 : range.startsWith('7') || range.startsWith('6') || range.startsWith('5')
 ? 'text-yellow-700'
 : 'text-brand-red'

  return (
 <div className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
 <span className={`font-serif font-bold text-xl w-12 flex-shrink-0 ${color}`}>{range}</span>
 <div>
 <p className="font-sans font-semibold text-black text-sm">{label}</p>
 <p className="font-sans text-gray-500 text-sm mt-0.5">{description}</p>
 </div>
 </div>
 )
}

function DimensionCard({
  number,
  name,
  definition,
  factors,
  scale,
}: {
  number: string
  name: string
  definition: string
  factors: string[]
  scale: { range: string; label: string; description: string }[]
}) {
  return (
 <div className="border border-gray-100 rounded-xl overflow-hidden">
 <div className="bg-black px-8 py-6">
 <p className="font-sans text-brand-red text-xs font-bold tracking-widest uppercase mb-1">
  Dimension {number}
 </p>
 <h3 className="font-serif text-white text-2xl font-bold">{name}</h3>
 <p className="font-sans text-white/60 text-sm mt-2 leading-relaxed">{definition}</p>
 </div>
 <div className="px-8 py-6 grid md:grid-cols-2 gap-8">
 <div>
 <p className="font-sans font-bold text-black text-xs tracking-widest uppercase mb-3">
  What raises or lowers this score
 </p>
 <ul className="space-y-2">
 {factors.map((f, i) => (
 <li key={i} className="font-sans text-gray-600 text-sm flex gap-2">
 <span className="text-brand-red mt-0.5 flex-shrink-0">–</span>
 {f}
 </li>
 ))}
 </ul>
 </div>
 <div>
 <p className="font-sans font-bold text-black text-xs tracking-widest uppercase mb-3">
  Score anchors
 </p>
 <div>
 {scale.map((s) => (
 <ScaleRow key={s.range} {...s} />
 ))}
 </div>
 </div>
 </div>
 </div>
 )
}

export default function MethodologyPage() {
  return (
 <div className="min-h-[calc(100vh-72px)]">
 {/* Header */}
 <div className="bg-black">
 <div className="max-w-4xl mx-auto px-4 sm:px-8 py-20">
 <div className="w-12 h-1 bg-brand-red mb-8" />
 <h1 className="font-serif text-white text-5xl sm:text-6xl font-bold leading-tight mb-6">
  How we score
 </h1>
 <p className="font-sans text-white/60 text-xl leading-relaxed max-w-2xl">
  Every Reality Check score is derived from a single source: the company&apos;s most recent
  audited filing with the Ministry of Corporate Affairs. No press releases. No
  management commentary. No projections.
 </p>
 </div>
 </div>

 <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-20">

 {/* The three dimensions overview */}
 <section>
 <h2 className="font-serif text-black text-3xl font-bold mb-4">Three dimensions</h2>
 <p className="font-sans text-gray-600 text-base leading-relaxed mb-8 max-w-2xl">
  Each company gets three independent scores, each on a 1–10 scale. The average of the
  three appears on the homepage card. The breakdown is always visible in the full article.
 </p>
 <div className="grid sm:grid-cols-3 gap-4">
 {[
 { n: '01', name: 'Growth Quality', sub: 'Is the revenue growth real and operating in nature?' },
 { n: '02', name: 'Sustainability', sub: 'Can the business sustain itself without emergency capital?' },
 { n: '03', name: 'Profitability Path', sub: 'Is there a filing-evidenced trajectory to profit?' },
 ].map(({ n, name, sub }) => (
 <div key={n} className="border-t-4 border-brand-red bg-gray-50 rounded-b-lg p-5">
 <p className="font-sans text-brand-red text-xs font-bold tracking-widest uppercase mb-2">{n}</p>
 <p className="font-serif text-black text-lg font-bold mb-1">{name}</p>
 <p className="font-sans text-gray-500 text-sm">{sub}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Dimension 1 */}
 <section>
 <DimensionCard
  number="01"
  name="Growth Quality"
  definition="Measures whether revenue growth is real, recurring, and driven by the operating business, not by one-time asset sales, accounting reclassifications, or intra-group transactions."
  factors={[
 'Revenue growth rate year-on-year from the audited P&L',
 'Proportion of revenue from continuing vs discontinued operations',
 'Contribution of non-recurring items (asset disposal gains, one-time settlements)',
 'Whether the growth driver is visible in the notes (by product, segment, or geography)',
 'Unit economics trend: revenue growing faster or slower than variable costs',
 ]}
  scale={[
 { range: '9–10', label: 'Exceptional', description: 'Strong growth (30%+), entirely from continuing operations, improving unit economics' },
 { range: '7–8', label: 'Good', description: 'Solid growth (15–30%), predominantly operating, minor non-recurring contribution' },
 { range: '5–6', label: 'Moderate', description: 'Growth present (5–15%) or good headline growth with meaningful non-recurring component' },
 { range: '3–4', label: 'Weak', description: 'Low growth (0–5%) or growth heavily reliant on one-time items' },
 { range: '1–2', label: 'Poor', description: 'Revenue decline, or growth that is entirely non-recurring' },
 ]}
 />
 </section>

 {/* Dimension 2 */}
 <section>
 <DimensionCard
  number="02"
  name="Sustainability"
  definition="Measures whether the business can sustain its current operations financially, factoring in burn rate, cash position, debt structure, and operating leverage. A company can score well here without being profitable if its runway is long and leverage is manageable."
  factors={[
 'Operating cash flow (positive or negative, improving or worsening)',
 'Cash and liquid investments relative to monthly burn',
 'Debt-to-equity ratio and whether leverage is rising faster than assets',
 'Trend in cost-to-income ratio over the last two years',
 'Non-cash charges (ESOP, depreciation) that inflate accounting losses but not cash burn',
 ]}
  scale={[
 { range: '9–10', label: 'Very strong', description: 'Profitable or near-profitable, positive operating cash flow, leverage manageable' },
 { range: '7–8', label: 'Healthy', description: 'Burn declining, operating leverage improving, 18+ months runway visible' },
 { range: '5–6', label: 'Stable', description: 'Moderate burn within industry norms, 12–18 months runway, or profitable with structural risks' },
 { range: '3–4', label: 'Stretched', description: 'High burn relative to revenue, elevated leverage, limited runway' },
 { range: '1–2', label: 'Critical', description: 'Severe cash burn, unsustainable capital structure, or less than 6 months runway visible' },
 ]}
 />
 </section>

 {/* Dimension 3 */}
 <section>
 <DimensionCard
  number="03"
  name="Profitability Path"
  definition="Measures whether there is a credible, filing-evidenced trajectory toward profitability. This is the most forward-looking of the three dimensions, but it is still anchored to what the filing shows, not what the founder says."
  factors={[
 'Current PAT (positive, near-zero, or deeply negative)',
 'Direction of the cost-to-income ratio over two or more years',
 'Gross margin or contribution margin and its trend',
 'Whether operating leverage is visible (costs growing slower than revenue)',
 'Presence of large structural costs (FLDG provisions, deferred charges) that obscure underlying economics',
 ]}
  scale={[
 { range: '9–10', label: 'Demonstrated', description: 'Profitable at PAT level with improving margins' },
 { range: '7–8', label: 'Visible', description: 'Near break-even, contribution margin positive, operating leverage evident' },
 { range: '5–6', label: 'Emerging', description: 'Improving metrics but path is 2–4 years out or requires significant scale' },
 { range: '3–4', label: 'Unclear', description: 'Costs growing faster than revenue, or margin trend flat to negative' },
 { range: '1–2', label: 'Not visible', description: 'Losses deepening relative to revenue, no operating leverage from filing data' },
 ]}
 />
 </section>

 {/* Worked example */}
 <section>
 <h2 className="font-serif text-black text-3xl font-bold mb-2">Worked example</h2>
 <p className="font-sans text-gray-500 text-base mb-8">
  How the three scores are derived for one company, step by step.
 </p>

 <div className="bg-black rounded-xl overflow-hidden">
 <div className="px-8 pt-8 pb-4 border-b border-white/10">
 <div className="flex items-start justify-between">
 <div>
 <p className="font-sans text-brand-red text-xs font-bold tracking-widest uppercase mb-1">Worked Example</p>
 <h3 className="font-serif text-white text-2xl font-bold">Jar (Changejar Technologies), FY2025</h3>
 <p className="font-sans text-white/60 text-sm mt-1">Source: Audited annual filings</p>
 </div>
 <Link
  href="/jar-fy2025"
  className="font-sans text-brand-red text-xs font-semibold hover:underline flex-shrink-0 mt-1"
 >
  Full article <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>

 <div className="grid md:grid-cols-3 gap-px bg-white/10">
 {[
 {
  dim: 'Growth Quality',
  score: 8,
  color: 'text-green-700',
  points: [
 'Revenue grew 4.9× YoY (₹38.36 Cr → ₹188.78 Cr)',
 'No discontinued operations, no asset disposal gains',
 'Growth driven by core platform revenue, costs grew only 31%',
 'Cost-to-income ratio fell from 3.46× to 0.92×',
 'Score capped at 8: absolute scale still small, single FY of strong growth',
 ],
 },
 {
  dim: 'Sustainability',
  score: 6,
  color: 'text-yellow-400',
  points: [
 'First-ever PAT profit: ₹13.17 Cr',
 'Operating costs well within revenue for the first time',
 'No debt disclosed; equity-funded to date',
 'Score held at 6: one year of profitability, cumulative losses of ₹286 Cr still on the balance sheet',
 'Sustainability of the revenue mix cannot be verified from filing data alone',
 ],
 },
 {
  dim: 'Profitability Path',
  score: 7,
  color: 'text-green-700',
  points: [
 'PAT positive in FY2025: path is no longer theoretical',
 'Three consecutive years of cost-to-income improvement: 9.37× → 3.46× → 0.92×',
 'Operating leverage demonstrated, not assumed',
 'Score held at 7: one data point of profitability; margin thin; scale needed to confirm',
 ],
 },
 ].map(({ dim, score, color, points }) => (
 <div key={dim} className="bg-[#0d0d0d] p-6">
 <p className="font-sans text-white/60 text-[10px] uppercase tracking-widest mb-1">{dim}</p>
 <p className={`font-serif font-bold text-5xl mb-4 ${color}`}>
 {score}<span className="text-white/60 text-2xl">/10</span>
 </p>
 <ul className="space-y-2">
 {points.map((p, i) => (
 <li key={i} className="font-sans text-white/50 text-xs flex gap-2">
 <span className="text-brand-red flex-shrink-0 mt-0.5">–</span>
 {p}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Employer Health Signal ── */}
 <section className="border-t border-gray-100 pt-12">
 <div className="mb-8">
 <p className="font-sans text-brand-red text-xs font-bold tracking-widest uppercase mb-2">Employer Health Signal</p>
 <h2 className="font-serif text-black text-3xl font-bold mb-3">How the Employer Check works</h2>
 <p className="font-sans text-gray-600 text-base leading-relaxed max-w-2xl">
  The Employer Health Signal assesses five dimensions of a company&apos;s financial health
  from the perspective of a prospective employee. Every label is derived from the audited public filing,
  not from Glassdoor, LinkedIn, or management commentary.
 </p>
 </div>

 {/* Five dimensions */}
 <div className="space-y-6 mb-12">

 {/* Dimension table */}
 <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Employer Check dimensions">
 <table className="w-full text-sm border-collapse">
 <thead>
 <tr className="bg-black text-white">
 <th className="font-sans text-left px-5 py-3 text-xs font-bold tracking-widest uppercase rounded-tl-lg">Dimension</th>
 <th className="font-sans text-left px-5 py-3 text-xs font-bold tracking-widest uppercase">Filing inputs used</th>
 <th className="font-sans text-left px-5 py-3 text-xs font-bold tracking-widest uppercase rounded-tr-lg">What moves the label</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {[
 {
  dim: 'Growth Momentum',
  inputs: 'YoY revenue from P&L, operating vs non-recurring breakdown, cost trajectory',
  what: 'Strong: 30%+ operating revenue growth, costs growing slower. Moderate: 10–30% or meaningful non-recurring component. Weak/Critical: <5% or revenue declining.',
 },
 {
  dim: 'Stability',
  inputs: 'Cash + liquid investments, operating cash flow, monthly burn rate, debt schedule',
  what: 'Strong: 18+ months runway, positive OCF. Moderate: 12–18 months, OCF near-zero. Stretched: <12 months. Critical: <6 months or OCF worsening sharply.',
 },
 {
  dim: 'Profitability',
  inputs: 'PAT, gross/contribution margin trend, cost-to-income ratio across 2+ years',
  what: 'Achieved: PAT positive with improving margins. Near Break-even: within 10% of breakeven. Loss-Deepening: losses widening relative to revenue.',
 },
 {
  dim: 'Funding Dependence',
  inputs: 'Equity raise history, cash from financing vs operating activities, cumulative losses vs equity raised',
  what: 'Low: operating revenue covers >80% of costs. High: >50% of operations funded by equity. Critical: company cannot operate without imminent raise.',
 },
 {
  dim: 'Career Upside',
  inputs: 'Revenue growth (YoY) + payroll expense trend + ESOP disclosures + sector growth',
  what: 'High: fast revenue growth + payroll rising + ESOP in place. Moderate: growth present, ESOP limited. Limited: flat revenue + no payroll signal.',
 },
 ].map(({ dim, inputs, what }, i) => (
 <tr key={dim} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
 <td className="px-5 py-4 font-sans font-semibold text-black text-sm align-top">{dim}</td>
 <td className="px-5 py-4 font-sans text-gray-500 text-xs leading-relaxed align-top">{inputs}</td>
 <td className="px-5 py-4 font-sans text-gray-600 text-xs leading-relaxed align-top">{what}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 {/* Career Upside formula callout */}
 <div className="border border-gray-200 rounded-xl overflow-hidden">
 <div className="bg-black px-6 py-4">
 <p className="font-sans text-brand-red text-[10px] font-bold tracking-widest uppercase mb-0.5">Career Upside, detailed formula</p>
 <p className="font-serif text-white text-xl font-bold">Four inputs, all from the filing</p>
 </div>
 <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
 {[
 {
  n: '1',
  label: 'Revenue growth (YoY)',
  detail: 'From the audited P&L. Operating revenue only, one-time items excluded. Proxy for how fast the company is growing and whether it can sustain compensation increases.',
 },
 {
  n: '2',
  label: 'Payroll / employee cost trend',
  detail: 'From the notes to accounts (employee benefit expenses). A rising payroll trend signals the company is hiring and rewarding staff. A flat or declining trend post-downturn is a flag.',
 },
 {
  n: '3',
  label: 'ESOP structure & disclosures',
  detail: 'ESOP expense from P&L notes and any ESOP pool disclosures. We check whether ESOP is dilutive or symbolic, and whether vesting schedules are disclosed.',
 },
 {
  n: '4',
  label: 'Sector / market tailwinds',
  detail: 'A qualitative factor. Fintech, EV, SaaS, consumer, sectors with structural tailwinds allow more confidence in the upside label than contracting sectors.',
 },
 ].map(({ n, label, detail }) => (
 <div key={n} className="px-6 py-5">
 <div className="flex items-center gap-2 mb-2">
 <span className="w-5 h-5 rounded-full bg-black text-white font-sans text-[10px] font-bold flex items-center justify-center flex-shrink-0">{n}</span>
 <p className="font-sans font-semibold text-black text-sm">{label}</p>
 </div>
 <p className="font-sans text-gray-500 text-xs leading-relaxed">{detail}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Label legend */}
 <div className="bg-gray-50 rounded-xl p-6">
 <p className="font-sans font-bold text-black text-xs tracking-widest uppercase mb-4">Label reference, what each label means</p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
 {[
 { label: 'Strong / Achieved / Low / High', color: 'bg-green-100 text-green-700 border-green-200', meaning: 'Positive signal from filing data. Above-average financial health for this dimension.' },
 { label: 'Moderate / Improving / Near Break-even / High Variance', color: 'bg-amber-50 text-amber-700 border-amber-200', meaning: 'Mixed or neutral signal. One direction is clear but the other has uncertainty.' },
 { label: 'Stretched / Weak / Limited', color: 'bg-orange-50 text-orange-700 border-orange-200', meaning: 'Negative signal. Financial risk is present in this dimension from the filing.' },
 { label: 'Critical / Loss-Deepening / Declining / Uncertain', color: 'bg-red-50 text-red-700 border-red-200', meaning: 'Significant financial risk flag. Requires careful evaluation before joining.' },
 ].map(({ label, color, meaning }) => (
 <div key={label} className="bg-white rounded-lg border border-gray-100 p-4">
 <span className={`inline-block border rounded-full px-2 py-0.5 font-sans text-[10px] font-bold tracking-wide uppercase mb-2 ${color}`}>
 {label.split(' / ')[0]}
 </span>
 <p className="font-sans text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-1.5">{label}</p>
 <p className="font-sans text-xs text-gray-500 leading-relaxed">{meaning}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Verdict mapping */}
 <div className="grid sm:grid-cols-3 gap-4">
 {[
 {
  verdict: 'Solid',
  color: 'border-green-200 bg-green-50',
  text: 'text-green-700',
  bar: 'bg-green-500',
  desc: 'The majority of dimensions show positive labels. The financial floor is strong from the filing. Does not guarantee culture, growth, or job security, but the company is not in financial distress.',
 },
 {
  verdict: 'Watch',
  color: 'border-amber-200 bg-amber-50',
  text: 'text-amber-700',
  bar: 'bg-amber-400',
  desc: 'Mixed signals across dimensions. Some positives are present but at least one significant risk flag exists. Read the notes section carefully before deciding.',
 },
 {
  verdict: 'Caution',
  color: 'border-red-200 bg-red-50',
  text: 'text-red-700',
  bar: 'bg-red-500',
  desc: 'Multiple risk flags from the filing. Financial distress signals are present. This does not mean the company will fail, but the employment risk is elevated.',
 },
 ].map(({ verdict, color, text, bar, desc }) => (
 <div key={verdict} className={`border rounded-xl overflow-hidden ${color}`}>
 <div className={`h-1 ${bar}`} />
 <div className="p-5">
 <p className={`font-sans text-xs font-bold tracking-widest uppercase mb-2 ${text}`}>{verdict}</p>
 <p className="font-sans text-xs text-gray-600 leading-relaxed">{desc}</p>
 </div>
 </div>
 ))}
 </div>

 </div>
 </section>

 {/* What the score doesn't measure */}
 <section>
 <h2 className="font-serif text-black text-3xl font-bold mb-4">What the score does not measure</h2>
 <p className="font-sans text-gray-600 text-base leading-relaxed mb-6 max-w-2xl">
  The Reality Check score is deliberately limited to what an audited annual filing can tell you.
  That makes it verifiable. It also means these things are outside its scope:
 </p>
 <div className="grid sm:grid-cols-2 gap-3">
 {[
 ['Team quality', 'Founder track record, team depth, and execution capability are not in the filing.'],
 ['Market size', 'Whether the addressable market is large or growing is not scored.'],
 ['Competitive position', 'How the company compares to rivals is not assessed.'],
 ['Future fundraising', 'Whether the company will raise its next round is not predicted.'],
 ['Product quality', 'User experience, product-market fit, and NPS are not in any filing.'],
 ['Regulatory risk', 'Sector-level regulatory changes that could affect the business model are not scored.'],
 ].map(([title, desc]) => (
 <div key={title} className="bg-gray-50 rounded-lg p-5">
 <p className="font-sans font-semibold text-black text-sm mb-1">{title}</p>
 <p className="font-sans text-gray-500 text-sm">{desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Data sources */}
 <section className="border-t border-gray-100 pt-12">
 <h2 className="font-serif text-black text-3xl font-bold mb-4">Data sources</h2>
 <div className="space-y-4 max-w-2xl">
 {[
 ['Audited public financial statements', 'The primary source for all financial data. Audited consolidated and standalone financials filed by the company with the Registrar of Companies.'],
 ['AOC-1 subsidiary annexures', 'Used to verify subsidiary performance and group structure disclosures.'],
 ['public corporate records', 'Used to confirm CIN, incorporation date, registered office, and filing status.'],
 ['No management commentary', 'Earnings calls, interviews, blog posts, and press releases are not used as data sources. If a number cannot be sourced to the filing, it does not appear in the article.'],
 ].map(([source, desc]) => (
 <div key={source} className="flex gap-4">
 <div className="w-1 flex-shrink-0 bg-brand-red rounded mt-1" />
 <div>
 <p className="font-sans font-semibold text-black text-sm">{source}</p>
 <p className="font-sans text-gray-500 text-sm mt-0.5">{desc}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* CTA */}
 <section className="bg-black rounded-xl px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
 <div>
 <p className="font-serif text-white text-xl font-bold mb-1">See the scores in context</p>
 <p className="font-sans text-white/50 text-sm">Every article shows the scoring rationale alongside the raw filing data.</p>
 </div>
 <Link
  href="/articles"
  className="flex-shrink-0 bg-brand-red text-white font-sans font-semibold text-sm px-6 py-3 rounded hover:bg-red-800 transition-colors"
 >
  Browse all teardowns <span aria-hidden="true">→</span>
 </Link>
 </section>

 </div>
 </div>
 )
}
