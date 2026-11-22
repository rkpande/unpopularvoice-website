'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { TocItem } from '@/lib/toc'

// Below 1280px there is no sidebar contents list, and the "In this teardown"
// list sits at the top. Once the reader is inside the article body this small
// button reopens the section list from anywhere; it hides again at the end of
// the article. The list highlights the section in view.
export default function ArticleContentsButton({ items, targetId }: { items: TocItem[]; targetId: string }) {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const id = useId()
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const body = document.getElementById(targetId)
    if (!body) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = body.getBoundingClientRect()
      setVisible(r.top < -200 && r.bottom > window.innerHeight * 0.6)
      let current: string | null = null
      for (const it of items) {
        const h = document.getElementById(it.id)
        if (h && h.getBoundingClientRect().top < 120) current = it.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items, targetId])

  useEffect(() => {
    if (!open) return
    panel.current?.querySelector<HTMLAnchorElement>('a[aria-current="true"], a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!panel.current?.contains(e.target as Node) && !button.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  if (items.length < 3) return null
  const shown = visible || open

  return (
    <div
      className={`xl:hidden fixed right-4 z-50 transition-opacity duration-200 ${shown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
      aria-hidden={!shown}
    >
      {open && (
        <div
          ref={panel}
          id={`${id}-panel`}
          className="absolute bottom-14 right-0 w-[min(20rem,calc(100vw-32px))] max-h-[60vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          <nav aria-label="Sections in this teardown">
            <p className="px-4 pt-3 pb-1 font-sans text-xs font-semibold text-gray-500">In this teardown</p>
            <ol className="pb-2">
              {items.map((it, i) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === it.id ? 'true' : undefined}
                    className={`flex gap-3 px-4 py-2.5 min-h-[44px] items-baseline font-sans text-[15px] leading-snug hover:bg-gray-50 ${
                      active === it.id ? 'text-black font-semibold' : 'text-gray-800'
                    }`}
                  >
                    <span className="w-5 shrink-0 text-right tabular-nums text-gray-500">{i + 1}</span>
                    <span>{it.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}
      <button
        ref={button}
        type="button"
        tabIndex={shown ? 0 : -1}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex items-center gap-2 min-h-[44px] rounded-full bg-black px-4 font-sans text-sm font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
        {open ? 'Close' : 'Contents'}
      </button>
    </div>
  )
}
