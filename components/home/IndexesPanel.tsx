import Link from 'next/link'

interface IndexCard {
  href: string
  question: string
  product: string
  description: string
  cta: string
}

const CARDS: IndexCard[] = [
  {
    href: '/profitability-index',
    question: "Who's actually making money?",
    product: 'Profitability Index',
    description:
      'Every covered startup ranked by audited profit, cash from operations and margin. The list updates with every new teardown.',
    cta: 'See the rankings',
  },
  {
    href: '/startup-jobs',
    question: 'Where is it safe to work?',
    product: 'Jobs Index',
    description:
      'Employer signals from the audited accounts: cash, runway, cash from operations, staff-cost growth. Not gossip, not surveys.',
    cta: 'Browse the index',
  },
  {
    href: '/employer-check',
    question: 'Is the salary safe?',
    product: 'Employer Check',
    description:
      'Look up any covered startup and get its financial floor in 30 seconds. Audited accounts only.',
    cta: 'Run a check',
  },
]

export default function IndexesPanel() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-brand-red text-xs tracking-[0.25em] uppercase font-bold mb-2">
            Indexes
          </p>
          <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight">
            Three lenses. Same audited data.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block bg-white border border-gray-200 hover:border-black rounded-xl p-6 transition-all group"
            >
              <p className="font-serif text-2xl text-black font-bold leading-snug mb-2 group-hover:text-brand-red transition-colors">
                {c.question}
              </p>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase font-semibold text-gray-500 mb-4">
                {c.product}
              </p>
              <p className="font-sans text-gray-600 text-[14px] leading-relaxed">
                {c.description}
              </p>
              <p className="font-sans text-brand-red text-[12px] font-semibold mt-5 group-hover:underline">
                {c.cta} <span aria-hidden="true">→</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
