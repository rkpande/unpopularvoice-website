'use client'

import { useEffect, useRef } from 'react'

// A thin line along the top edge of the screen showing how far through the
// article the reader is. Decorative: the contents list is the navigation, so
// this is hidden from assistive tech. Measured against the article column, not
// the whole page, so the footer does not count as unread.
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target || !bar.current) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = target.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const done = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1
      if (bar.current) bar.current.style.transform = `scaleX(${done})`
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
  }, [targetId])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] pointer-events-none" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div ref={bar} className="h-full origin-left bg-[#EB6B6B]" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
