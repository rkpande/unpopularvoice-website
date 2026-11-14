import Link from 'next/link'
import { sortedCorrections, type Correction } from '@/lib/corrections'

// Dated corrections at the foot of a piece. Plain and factual, in the register
// of a newspaper's correction line: what was wrong, what the accounts show.
export default function CorrectionsNote({ corrections }: { corrections?: Correction[] }) {
  const items = sortedCorrections(corrections)
  if (items.length === 0) return null

  return (
    <section id="corrections" aria-labelledby="corrections-heading" className="not-prose mt-12 border-t-2 border-black pt-5 scroll-mt-24">
      <h2 id="corrections-heading" className="font-serif text-black text-xl font-bold mb-4">
        {items.length === 1 ? 'Correction' : 'Corrections'}
      </h2>
      <ul className="space-y-4">
        {items.map(([date, note], i) => (
          <li key={i} className="font-sans text-[0.9375rem] leading-relaxed text-gray-800">
            <time className="block font-semibold text-black text-sm mb-1">{date}</time>
            {note}
          </li>
        ))}
      </ul>
      <p className="font-sans text-sm text-gray-600 mt-5">
        <Link href="/editorial-standards#corrections" className="underline underline-offset-4 hover:text-black">
          How we handle corrections
        </Link>
        {' · '}
        <Link href="/corrections" className="underline underline-offset-4 hover:text-black">
          All corrections
        </Link>
      </p>
    </section>
  )
}
