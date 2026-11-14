import type { Metadata } from 'next'
import Link from 'next/link'
import { getCorrectionsLog, type CorrectionEntry } from '@/lib/corrections'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

export const metadata: Metadata = {
  title: 'Corrections',
  description:
    'Every correction UnpopularVoice has made to a published article: what was wrong, what the audited accounts show, and when it was fixed.',
  alternates: { canonical: `${SITE_URL}/corrections` },
}

export default function CorrectionsPage() {
  const log = getCorrectionsLog()
  const byDate = log.reduce<Record<string, CorrectionEntry[]>>((acc, e) => {
    ;(acc[e.date] ||= []).push(e)
    return acc
  }, {})

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <div className="bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-14">
          <div className="w-10 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-4xl sm:text-5xl font-bold leading-tight mb-5">Corrections</h1>
          <p className="font-sans text-white/70 text-lg leading-relaxed max-w-2xl">
            Every change we have made to a published figure, and why. Each one also appears at the foot
            of the article it corrects.{' '}
            <Link href="/editorial-standards#corrections" className="text-white underline underline-offset-4 hover:text-white/80">
              Our corrections policy
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14">
        {log.length === 0 ? (
          <p className="font-sans text-gray-700">No corrections yet.</p>
        ) : (
          Object.entries(byDate).map(([date, entries]) => (
            <section key={date} aria-labelledby={`d-${date}`} className="mb-14 last:mb-0">
              <h2 id={`d-${date}`} className="font-sans text-sm font-bold text-black border-b-2 border-black pb-2 mb-2">
                <time>{date}</time>
                <span className="font-normal text-gray-600">
                  {' · '}
                  {entries.length} {entries.length === 1 ? 'correction' : 'corrections'}
                </span>
              </h2>
              <ul className="divide-y divide-gray-200">
                {entries.map((e) => (
                  <li key={e.href} className="py-5">
                    <Link
                      href={`${e.href}#corrections`}
                      className="font-serif text-black text-lg font-bold leading-snug hover:text-brand-red transition-colors"
                    >
                      {e.title}
                    </Link>
                    <p className="font-sans text-gray-800 text-[0.9375rem] leading-relaxed mt-2">{e.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
