import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t-[3px] border-brand-red">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-sm">
            <p className="font-serif font-bold text-white text-xl mb-2">UnpopularVoice</p>
            <p className="text-white/50 text-sm font-sans">Financial intelligence for everyone.</p>
            <p className="text-white/30 text-xs font-sans mt-3 leading-relaxed">
              All financial data comes from annual audited filings submitted to India&apos;s Ministry of Corporate Affairs (MCA)
              — the same documents that go to the Registrar of Companies. These filings contain independently audited
              balance sheets, P&amp;L statements, and cash flow statements. We use the structured data filings (XBRL)
              for precise machine-readable numbers, and the attached PDF financial statements for notes and disclosures.
              No estimates. No analyst projections. No press releases.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/articles" className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
              All Articles
            </Link>
            <Link href="/employer-check" className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
              Employer Check
            </Link>
            <Link href="/methodology" className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
              Methodology
            </Link>
            <Link href="/subscribe" className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
              Subscribe
            </Link>
            <Link href="/sector/Fintech" className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
              Fintech
            </Link>
            <Link href="/sector/Edtech" className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
              Edtech
            </Link>
            <Link href="/sector/Consumer" className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
              Consumer
            </Link>
            <Link href="/sector/SaaS" className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
              SaaS
            </Link>
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
