import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="bg-black sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="font-serif font-bold text-white text-[22px] tracking-tight hover:text-brand-red transition-colors"
        >
          UnpopularVoice
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/articles"
            className="hidden sm:block font-sans text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            Browse Articles
          </Link>
          <Link
            href="/subscribe"
            className="bg-brand-red text-white font-sans font-semibold text-xs px-4 py-2 rounded hover:bg-red-800 transition-colors"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  )
}
