import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { signTone, toneText } from '@/lib/tone'

// Markdown tables written in article prose (GFM pipes). They follow the same
// Sign Rule as every other figure on the page, and scroll sideways on a phone
// instead of being clipped at the screen edge.

export function ProseTable({ children }: { children?: ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1" tabIndex={0} role="group" aria-label="Scrollable table">
      <table>{children}</table>
    </div>
  )
}

// A plain-text cell like "-₹2,014 Cr" or "+₹469 Cr" takes its colour from its
// own sign. Cells here carry no row label, so unsigned money stays black.
const FIGURE = /^[\s(~≈+\-−–]*[₹$]?\s?[\d.,]+\s*(%|x|Cr|Lakh|bn|mn)?\.?\)?$|^[\s(~≈+\-−–]*₹/i

export function ProseCell({ children, className, ...rest }: ComponentPropsWithoutRef<'td'>) {
  const text = typeof children === 'string' ? children.trim() : null
  if (!text || !FIGURE.test(text)) return <td {...rest} className={className}>{children}</td>
  const tone = signTone(text)
  return (
    <td {...rest} className={`${className ?? ''} whitespace-nowrap tabular-nums ${tone === 'neutral' ? '' : toneText[tone]}`}>
      {children}
    </td>
  )
}
