import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Fintech', href: '/sector/fintech' },
  { label: 'SaaS', href: '/sector/saas' },
  { label: 'D2C', href: '/sector/d2c' },
  { label: 'Reality Check', href: '/reality-check' },
]

export default function Nav() {
  return (
    <nav className="bg-black sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="font-serif font-bold text-white text-[22px] tracking-tight hover:text-brand-red transition-colors"
        >
          UnpopularVoice
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/subscribe"
          className="bg-brand-red text-white font-sans font-semibold text-xs px-4 py-2 rounded hover:bg-red-800 transition-colors"
        >
          Subscribe
        </Link>
      </div>
    </nav>
  )
}
