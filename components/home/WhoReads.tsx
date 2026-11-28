import Link from 'next/link'
import { getAllAuthors } from '@/lib/authors'
import SubscribeForm from './SubscribeForm'

// The closing band: who reads the accounts, how, and where mistakes are
// recorded, then the sign-up. Every count is computed from the published
// articles; nothing here is claimed that the site cannot show.
export default function WhoReads({
  teardownCount,
  companyCount,
  lastUpdated,
}: {
  teardownCount: number
  companyCount: number
  lastUpdated: string
}) {
  const authors = getAllAuthors()
  const links: [string, string][] = [
    ['/methodology', 'How we read the accounts'],
    ['/editorial-standards', 'Editorial standards'],
    ['/corrections', 'Corrections'],
    ['/about', 'About UnpopularVoice'],
  ]
  return (
    <section className="bg-white border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight text-balance">
            Who reads the accounts
          </h2>
          <p className="mt-4 font-sans text-gray-700 text-base leading-relaxed max-w-xl">
            Every figure on this site comes from a company&apos;s audited annual accounts, checked line by line
            against the source before it is published. Where a reading is inference rather than fact, the article
            says so. When we get something wrong, the correction is dated and listed publicly.
          </p>
          <ul className="mt-6 space-y-3">
            {authors.map((a) => (
              <li key={a.slug}>
                <Link href={`/author/${a.slug}`} className="group inline-flex flex-col min-h-[44px] justify-center">
                  <span className="font-serif text-black text-lg font-bold group-hover:text-brand-red transition-colors">
                    {a.name}
                  </span>
                  <span className="font-sans text-gray-500 text-sm">{a.role}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-sm text-gray-500">
            {teardownCount} teardowns · {companyCount} companies · updated {lastUpdated}
          </p>
          <nav aria-label="Standards" className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            {links.map(([href, text]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center min-h-[44px] font-sans text-sm font-semibold text-black underline underline-offset-4 decoration-gray-300 hover:decoration-brand-red hover:text-brand-red"
              >
                {text}
              </Link>
            ))}
          </nav>
        </div>

        <div className="lg:border-l lg:border-gray-200 lg:pl-16">
          <h2 className="font-serif text-black text-3xl sm:text-4xl font-bold leading-tight text-balance">
            Get the next teardown by email.
          </h2>
          <p className="mt-4 mb-6 font-sans text-gray-700 text-base leading-relaxed max-w-md">
            One Indian startup, read from its audited accounts: what the numbers say, and what they do not.
          </p>
          <SubscribeForm hint="No spam. Unsubscribe any time." />
        </div>
      </div>
    </section>
  )
}
