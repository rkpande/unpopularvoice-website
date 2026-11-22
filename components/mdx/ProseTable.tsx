import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react'
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

// Cell text, looking through the no-wrap span lib/rehypeFigures.ts puts round
// figures. Returns null when the cell holds anything richer than text.
function plainText(node: ReactNode): string | null {
  let out = ''
  let ok = true
  Children.forEach(node, (c) => {
    if (typeof c === 'string' || typeof c === 'number') out += String(c)
    else if (isValidElement<{ children?: ReactNode }>(c) && c.type === 'span') {
      const inner = plainText(c.props.children)
      if (inner === null) ok = false
      else out += inner
    } else if (c !== null && c !== undefined && c !== false) ok = false
  })
  return ok && out.trim() ? out.trim() : null
}

export function ProseCell({ children, className, ...rest }: ComponentPropsWithoutRef<'td'>) {
  const text = plainText(children)
  if (!text || !FIGURE.test(text)) return <td {...rest} className={className}>{children}</td>
  const tone = signTone(text)
  return (
    <td {...rest} className={`${className ?? ''} whitespace-nowrap tabular-nums ${tone === 'neutral' ? '' : toneText[tone]}`}>
      {children}
    </td>
  )
}
