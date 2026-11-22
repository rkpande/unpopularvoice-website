import Link from 'next/link'

export default function Footer() {
  return (
 <footer id="site-footer" className="bg-black border-t-[3px] border-brand-red">
 <div className="max-w-7xl mx-auto px-8 py-12">
 <div className="flex flex-col md:flex-row justify-between items-start gap-8">
 <div className="max-w-sm">
 <p className="font-serif font-bold text-white text-xl mb-2">UnpopularVoice</p>
 <p className="text-white/50 text-sm font-sans">Financial intelligence for everyone.</p>
 <div className="flex items-center gap-3 mt-4">
 <a
  href="https://www.linkedin.com/in/unpopular-voice/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="UnpopularVoice on LinkedIn"
  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 active:bg-white/20 transition-colors"
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
 </svg>
 </a>
 <a
  href="https://x.com/UnpopularV83586"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="UnpopularVoice on X"
  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 active:bg-white/20 transition-colors"
 >
 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
 </svg>
 </a>
 <a
  href="https://www.youtube.com/@YourUnpopularVoice"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="UnpopularVoice on YouTube"
  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 active:bg-white/20 transition-colors"
 >
 <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
 </svg>
 </a>
 </div>
 <p className="text-white/60 text-xs font-sans mt-4 leading-relaxed">
  All financial data comes from annual audited filings submitted to India&apos;s Ministry of Corporate Affairs,
  the same documents that go to the Registrar of Companies. These filings contain independently audited
  balance sheets, P&amp;L statements, and cash flow statements. No analyst projections. No press releases. Any estimate is labelled as one.
 </p>
 </div>

 <div className="flex flex-wrap gap-x-6 gap-y-3">
 <Link href="/articles" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  All Articles
 </Link>
 <Link href="/profitability-index" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Profitability Index
 </Link>
 <Link href="/startup-jobs" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Jobs Index
 </Link>
 <Link href="/employer-check" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Employer Check
 </Link>
 <Link href="/methodology" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Methodology
 </Link>
 <Link href="/editorial-standards" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Editorial Standards
 </Link>
 <Link href="/corrections" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Corrections
 </Link>
 <Link href="/subscribe" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Subscribe
 </Link>
 <Link href="/sector/Fintech" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Fintech
 </Link>
 <Link href="/sector/Consumer" className="block py-2 text-white/50 text-sm font-sans hover:text-white/80 transition-colors">
  Consumer
 </Link>
 </div>
 </div>

 <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 items-start md:items-center">
 <p className="text-white/60 text-xs font-sans">unpopularvoice.com</p>
 <div className="flex items-center gap-5 flex-wrap">
 <a
  href="https://www.linkedin.com/in/unpopular-voice/"
  target="_blank"
  rel="noopener noreferrer"
  className="block py-2 text-white/60 text-xs font-sans hover:text-white transition-colors"
 >
  LinkedIn
 </a>
 <a
  href="https://x.com/UnpopularV83586"
  target="_blank"
  rel="noopener noreferrer"
  className="block py-2 text-white/60 text-xs font-sans hover:text-white transition-colors"
 >
  X (Twitter)
 </a>
 <a
  href="https://www.youtube.com/@YourUnpopularVoice"
  target="_blank"
  rel="noopener noreferrer"
  className="block py-2 text-white/60 text-xs font-sans hover:text-white transition-colors"
 >
  YouTube
 </a>
 <a
  href="https://fazier.com/launches/unpopularvoice.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="UnpopularVoice on Fazier"
  className="inline-flex items-center opacity-70 hover:opacity-100 transition-opacity"
 >
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
  src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark"
  width={120}
  height={30}
  alt="Launched on Fazier"
  loading="lazy"
 />
 </a>
 <p className="text-white/60 text-xs font-sans">
  Not affiliated with any startup. Independent analysis only.
 </p>
 </div>
 </div>
 </div>
 </footer>
 )
}
