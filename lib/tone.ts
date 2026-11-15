// Colour by sign. On this site red and green describe a number, never a
// judgement about it (DESIGN.md, "The Sign Rule"):
//   loss    red    a negative figure, or an unsigned rupee figure whose label
//                  says it is a loss, deficit, burn or outflow
//   gain    green  an explicitly signed "+" figure, or an unsigned rupee
//                  figure whose label says it is a profit
//   neutral black  everything else: revenue, costs, cash, borrowings,
//                  valuations, ratios. A cost is not a loss.
// Components derive tone here; articles never pick a colour by hand.

export type SignTone = 'loss' | 'gain' | 'neutral'

const LOSS_WORDS = /\b(loss|losses|deficit|burn|outflow|write-?down)\b/i
const PROFIT_WORDS = /\b(profit|pat|gain)\b/i
const MONEY = /₹|\bRs\.?\b|\bCr\b|\bLakh\b|\$/i

export function signTone(value: string | number | null | undefined, label = ''): SignTone {
  if (value === null || value === undefined) return 'neutral'
  // A label's subject decides, not its aside: "Founder pay (36% of the loss)"
  // is about pay, not the loss.
  const subject = label.replace(/\([^)]*\)/g, ' ')
  if (typeof value === 'number') {
    if (value < 0) return 'loss'
    if (value > 0 && PROFIT_WORDS.test(subject) && !LOSS_WORDS.test(subject)) return 'gain'
    return 'neutral'
  }
  let v = String(value).trim().replace(/^[~≈]\s*/, '')
  if (!v) return 'neutral'
  // A transition ("-₹44 → -₹20 Cr") is coloured by where it ends.
  if (/→|->/.test(v)) v = v.split(/→|->/).pop()!.trim()
  // Only figures take colour; a sentence in a table cell stays neutral even if
  // it mentions a loss ("Peak revenue. Highest loss.").
  if (!/^\(?\s*[-−–+]?\s*(₹|Rs\.?\s?|\$)?\s*[-−–]?\s*\d/.test(v)) return 'neutral'
  if (/^[^1-9]*$/.test(v.replace(/(₹|Rs\.?|Cr|Lakh)/g, ''))) return 'neutral' // ₹0, 0.00: nothing to colour
  // A short trailing word can say what the figure is: "+₹58 Cr more loss" is a loss.
  const words = v.replace(/\b(Cr|Lakh|Rs|bn|mn|crore|lakh)\b/gi, '').replace(/[^A-Za-z]+/g, ' ').trim()
  if (words && LOSS_WORDS.test(words) && words.split(' ').length <= 3) return 'loss'
  // Explicit sign: minus, en dash or hyphen used as minus, or (accounting) brackets.
  if (/^\(?\s*[-−–]\s*(₹|Rs\.?\s?|\$)?\s*\d/.test(v) || /^(₹|Rs\.?\s?|\$)\s*[-−–]\s*\d/.test(v)) return 'loss'
  if (/^\(\s*(₹|Rs\.?\s?)?\s*[\d.,]+\s*(Cr|Lakh)?\s*\)$/.test(v)) return 'loss'
  if (/^\+/.test(v)) return 'gain'
  // Unsigned money: let the label say what it is. Percentages and ratios never
  // take tone from a label ("loss ratio 21.9%" is not itself a loss).
  if (!MONEY.test(v) || /%|x\b|×/i.test(v)) return 'neutral'
  // A value carrying its own words ("Advertising cut ₹107 Cr") is not the
  // label's figure, so it does not borrow the label's meaning.
  if (words) return 'neutral'
  if (LOSS_WORDS.test(subject)) return 'loss'
  if (PROFIT_WORDS.test(subject)) return 'gain'
  return 'neutral'
}

export const toneText: Record<SignTone, string> = {
  loss: 'text-red-600',
  gain: 'text-green-700',
  neutral: 'text-black',
}

export const toneFill: Record<SignTone, string> = {
  loss: '#DC2626', // Loss Red
  gain: '#15803D', // Gain Green
  neutral: '#111111',
}
