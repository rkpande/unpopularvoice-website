import Link from 'next/link'

const FOOTER_LINKS = ['Fintech', 'SaaS', 'D2C', 'EV', 'Edtech', 'Reality Check Index']

export default function Footer() {
  return (
    <footer className="bg-black border-t-[3px] border-brand-red">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-serif font-bold text-white text-xl mb-2">UnpopularVoice</p>
            <p className="text-white/50 text-sm font-sans">Financial intelligence for everyone.</p>
            <p className="text-white/30 text-xs font-sans mt-2">
              Data sources: MCA filings, audited financials, public disclosures.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2">
          <p className="text-white/30 text-xs font-sans">unpopularvoice.com</p>
          <p className="text-white/30 text-xs font-sans">
            Not affiliated with any startup. Independent analysis only.
          </p>
        </div>
      </div>
    </footer>
  )
}
