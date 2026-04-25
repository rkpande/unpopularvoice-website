'use client'

import { useEffect, useRef, useState } from 'react'

interface TocItem {
  id: string
  text: string
}

// Headings to exclude from the TOC
const EXCLUDE = new Set(['Share This', 'A Note on This Data', 'Frequently Asked Questions'])

export default function ArticleTOC() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Build TOC from h2 headings in the article
    const headings = Array.from(document.querySelectorAll('article h2'))
      .filter((el) => !EXCLUDE.has(el.textContent?.trim() ?? ''))
      .map((el) => ({
        id: el.id,
        text: el.textContent?.trim() ?? '',
      }))
      .filter((item) => item.id)

    setItems(headings)

    // Show TOC after first scroll
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })

    // IntersectionObserver to highlight active section
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observerRef.current?.disconnect()
    }
  }, [])

  if (items.length < 3) return null

  return (
    <nav
      aria-label="Table of contents"
      className={`
        hidden xl:block
        fixed top-1/2 -translate-y-1/2 right-6 2xl:right-12
        w-48 z-40
        transition-opacity duration-300
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <p className="font-sans text-[9px] font-bold tracking-widest uppercase text-gray-300 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`
                block font-sans text-[11px] leading-snug py-1 pl-3 border-l-2 transition-all duration-150
                ${activeId === item.id
                  ? 'border-red-700 text-gray-900 font-semibold'
                  : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-400'
                }
              `}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
