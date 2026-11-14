import type { Metadata } from 'next'
import Link from 'next/link'
import { getCorrectionsLog } from '@/lib/corrections'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

export const metadata: Metadata = {
  title: 'Editorial Standards',
  description:
    'Where UnpopularVoice figures come from, how each one is checked against the audited accounts, how we label fact, inference and estimate, and how we correct mistakes.',
  alternates: { canonical: `${SITE_URL}/editorial-standards` },
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <h2 id={`${id}-h`} className="font-serif text-black text-2xl sm:text-3xl font-bold mb-4">
        {title}
      </h2>
      <div className="font-sans text-gray-800 text-[1.0625rem] leading-relaxed space-y-4 max-w-[65ch]">{children}</div>
    </section>
  )
}

export default function EditorialStandardsPage() {
  const corrected = getCorrectionsLog().length

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <div className="bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-16 pb-14">
          <div className="w-10 h-1 bg-brand-red mb-6" />
          <h1 className="font-serif text-white text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Editorial standards
          </h1>
          <p className="font-sans text-white/70 text-lg leading-relaxed max-w-2xl">
            Every figure on this site comes from a company&apos;s audited accounts. This page sets out
            how we get those figures, how we check them, and what we do when we get one wrong.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14 space-y-14">
        <Section id="sources" title="Where the numbers come from">
          <p>
            Indian companies file audited financial statements with the Registrar of Companies every
            year. Those statements, signed off by the company&apos;s auditor, are our primary source.
            Where a piece covers debt, ownership or pay, we also use the company&apos;s annual return
            and its register of charges, which are filed with the same Registrar.
          </p>
          <p>
            We do not use press releases, management commentary, funding announcements or
            projections as a source for figures. When a piece mentions something reported elsewhere,
            it says so and keeps it apart from what the accounts show.
          </p>
        </Section>

        <Section id="checking" title="How figures are checked">
          <p>
            Revenue, profit or loss and net worth for each company are loaded from the
            machine-readable version of its filed accounts into a single database. Each article&apos;s
            headline figures, and every ranking on the{' '}
            <Link href="/profitability-index" className="underline underline-offset-4 hover:text-brand-red">
              Profitability Index
            </Link>{' '}
            and{' '}
            <Link href="/startup-jobs" className="underline underline-offset-4 hover:text-brand-red">
              Startup Jobs Index
            </Link>
            , are written from that database rather than typed by hand. Where we have two independent
            extractions of the same filing, we compare them, and a disagreement is resolved against
            the filing itself.
          </p>
          <p>
            Many companies file two sets of accounts: standalone (the company alone) and consolidated
            (the company with its subsidiaries). The two can tell different stories, so each article
            says which basis it uses, and a company is counted once in any index.
          </p>
        </Section>

        <Section id="labels" title="Fact, inference, estimate">
          <p>
            Many teardowns include a claims table that separates what the accounts state from what we
            read into them. Each claim in it carries one of three labels:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-gray-400">
            <li>
              <strong className="text-black">Fact:</strong> stated in the audited accounts, with the
              line it comes from.
            </li>
            <li>
              <strong className="text-black">Inference:</strong> our reading of what the figures
              imply, with the figures it rests on.
            </li>
            <li>
              <strong className="text-black">Estimate:</strong> a calculation the accounts do not
              state directly, such as months of runway, with its method.
            </li>
          </ul>
          <p>
            How the Reality Check and Employer Check scores are built is set out on the{' '}
            <Link href="/methodology" className="underline underline-offset-4 hover:text-brand-red">
              methodology page
            </Link>
            .
          </p>
        </Section>

        <Section id="corrections" title="Corrections">
          <p>
            When the accounts show we got something wrong, we fix the article and add a dated note at
            its foot saying what was wrong and what the accounts show. If the headline relied on the
            error, the headline changes too. We do not change a published figure silently.
          </p>
          <p>
            Every correction is also listed in one place, on the{' '}
            <Link href="/corrections" className="underline underline-offset-4 hover:text-brand-red">
              corrections page
            </Link>
            {corrected > 0 ? ` (${corrected} so far)` : ''}.
          </p>
        </Section>

        <Section id="independence" title="Independence">
          <p>
            UnpopularVoice is not affiliated with any company it writes about. The analysis is our
            own.
          </p>
        </Section>

        <Section id="report" title="Report an error">
          <p>
            If you think a figure is wrong, tell us which article and which number, and if you can,
            where in the accounts the right figure appears. Message us on{' '}
            <a
              href="https://www.linkedin.com/in/unpopular-voice/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-brand-red"
            >
              LinkedIn
            </a>{' '}
            or{' '}
            <a
              href="https://x.com/UnpopularV83586"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-brand-red"
            >
              X
            </a>
            . We check every report against the filing.
          </p>
        </Section>
      </div>
    </div>
  )
}
