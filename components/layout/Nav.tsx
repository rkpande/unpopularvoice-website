'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface NavLeaf {
  label: string
  href: string
  hint?: string
}

interface NavGroup {
  label: string
  href?: string
  items: NavLeaf[]
}

const GROUPS: NavGroup[] = [
  {
    label: 'Articles',
    href: '/articles',
    items: [
      { label: 'All articles', href: '/articles', hint: 'Full index of audit reads' },
      { label: 'Working models', href: '/articles?spectrum=working', hint: 'Profitable, self-funding' },
      { label: 'Scaling models', href: '/articles?spectrum=scaling', hint: 'Profitable, deploying capital' },
      { label: 'In-progress', href: '/articles?spectrum=progress', hint: 'Loss narrowing, near-breakeven' },
      { label: 'Restructuring', href: '/articles?spectrum=restructuring', hint: 'Smaller, cleaner' },
      { label: 'Broken / early', href: '/articles?spectrum=broken', hint: 'Loss deepening, structural gaps' },
    ],
  },
  {
    label: 'Compare',
    href: '/compare',
    items: [
      { label: 'All matchups', href: '/compare', hint: 'Two companies, side by side' },
    ],
  },
  {
    label: 'Indexes',
    items: [
      { label: 'Profitability Index', href: '/profitability-index', hint: "Who's actually making money?" },
      { label: 'Jobs Index', href: '/startup-jobs', hint: 'Where is it safe to work?' },
      { label: 'Employer Check', href: '/employer-check', hint: 'Is the salary safe?' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'About UnpopularVoice', href: '/about', hint: 'Who reads the accounts' },
      { label: 'Methodology', href: '/methodology', hint: 'How we read the accounts' },
      { label: 'Reality Check', href: '/reality-check', hint: 'Hype against the audit' },
    ],
  },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  function show(label: string) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setActive(label)
  }

  function scheduleHide() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActive(null), 120)
  }

  return (
    <nav className="bg-black sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] font-serif font-bold text-white text-[22px] tracking-tight hover:text-brand-red transition-colors"
        >
          UnpopularVoice
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden sm:flex items-center">
            {GROUPS.map((group) => {
              const isOpen = active === group.label
              const Trigger: any = group.href ? Link : 'button'
              return (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => show(group.label)}
                  onMouseLeave={scheduleHide}
                  onFocus={() => show(group.label)}
                  onBlur={scheduleHide}
                >
                  <Trigger
                    {...(group.href ? { href: group.href } : { type: 'button' })}
                    className={`inline-flex items-center gap-1 font-sans text-sm font-medium px-3 py-2 rounded transition-colors ${
                      isOpen ? 'text-white bg-white/5' : 'text-white/70 hover:text-white'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    {group.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Trigger>
                  {isOpen && (
                    <div
                      className="absolute right-0 top-full mt-1 min-w-[280px] bg-white text-black rounded-lg shadow-2xl ring-1 ring-black/10 overflow-hidden"
                      onMouseEnter={() => show(group.label)}
                      onMouseLeave={scheduleHide}
                    >
                      <ul className="py-2">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block px-4 py-2.5 hover:bg-gray-50 group/item"
                              onClick={() => setActive(null)}
                            >
                              <p className="font-sans text-sm font-semibold text-black group-hover/item:text-brand-red transition-colors">
                                {item.label}
                              </p>
                              {item.hint && (
                                <p className="font-sans text-xs text-gray-500 mt-0.5">
                                  {item.hint}
                                </p>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <Link
            href="/subscribe"
            className="inline-flex items-center bg-brand-red text-white font-sans font-semibold text-xs px-4 py-2.5 min-h-[44px] rounded hover:bg-red-800 transition-colors ml-1"
          >
            Subscribe
          </Link>

          <button
            className="sm:hidden inline-flex items-center justify-center text-white/70 hover:text-white transition-colors w-11 h-11 -mr-1.5"
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
        <div className="sm:hidden bg-black border-t border-white/10 px-4 py-3">
          {GROUPS.map((group) => (
            <div key={group.label} className="mb-3">
              <p className="font-sans text-white/60 text-[10px] tracking-[0.25em] uppercase font-semibold py-2">
                {group.label}
              </p>
              <ul className="border-t border-white/5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block font-sans text-white/80 text-sm font-medium hover:text-white transition-colors py-3 min-h-[44px] border-b border-white/5"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}
