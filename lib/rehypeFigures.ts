// Keep a money figure in one piece. On a phone, "-₹1,264.52 Cr" could break
// after the minus sign or before "Cr", leaving a bare "-" at a line end or a
// lone "Cr" on the next line: easy to misread as a positive figure. This
// rehype step wraps each figure in prose in a no-wrap span. Code and existing
// components are left alone.

type Node = { type: string; value?: string; tagName?: string; properties?: Record<string, unknown>; children?: Node[] }

const FIGURE = /[-−+]?\s?(?:₹|Rs\.?\s?)\s?-?[\d,]*\d(?:\.\d+)?(?:\s?(?:Cr|crore|Lakhs?|lakhs?|bn|mn))?/g
const SKIP = new Set(['code', 'pre', 'script', 'style', 'svg'])

function split(text: string): Node[] | null {
  FIGURE.lastIndex = 0
  if (!FIGURE.test(text)) return null
  FIGURE.lastIndex = 0
  const out: Node[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = FIGURE.exec(text)) !== null) {
    const start = m.index
    if (start > last) out.push({ type: 'text', value: text.slice(last, start) })
    out.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['whitespace-nowrap'] },
      children: [{ type: 'text', value: m[0] }],
    })
    last = start + m[0].length
  }
  if (last < text.length) out.push({ type: 'text', value: text.slice(last) })
  return out
}

function walk(node: Node) {
  if (!node.children) return
  if (node.type === 'element' && SKIP.has(node.tagName || '')) return
  const next: Node[] = []
  for (const child of node.children) {
    if (child.type === 'text' && child.value) {
      const parts = split(child.value)
      if (parts) {
        next.push(...parts)
        continue
      }
    }
    // Recurse into HTML elements and into text children of MDX components
    // (component props are attributes, not children, so they are untouched).
    if (child.children) walk(child)
    next.push(child)
  }
  node.children = next
}

export default function rehypeFigures() {
  return (tree: Node) => walk(tree)
}
