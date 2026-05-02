'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

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
            href="/employer-check"
            className="hidden sm:block font-sans text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            Employer Check
          </Link>
          <Link
            href="/methodology"
            className="hidden sm:block font-sans text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            How we score
          </Link>
          <Link
            href="/subscribe"
            className="bg-brand-red text-white font-sans font-semibold text-xs px-4 py-2 rounded hover:bg-red-800 transition-colors"
          >
            Subscribe
          </Link>
          <button
            className="sm:hidden text-white/70 hover:text-white transition-colors p-1"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="3" x2="19" y2="19" />
                <line x1="19" y1="3" x2="3" y2="19" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden bg-black border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          <Link
            href="/articles"
            className="font-sans text-white/70 text-sm font-medium hover:text-white transition-colors py-2.5 border-b border-white/5"
            onClick={() => setOpen(false)}
          >
            Browse Articles
          </Link>
          <Link
            href="/employer-check"
            className="font-sans text-white/70 text-sm font-medium hover:text-white transition-colors py-2.5 border-b border-white/5"
            onClick={() => setOpen(false)}
          >
            Employer Check
          </Link>
          <Link
            href="/methodology"
            className="font-sans text-white/70 text-sm font-medium hover:text-white transition-colors py-2.5"
            onClick={() => setOpen(false)}
          >
            How we score
          </Link>
        </div>
      )}
    </nav>
  )
}
