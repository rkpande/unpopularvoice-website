interface TripleViewProps {
  eyebrow?: string
  title?: string

  // Card A
  aName: string
  aPrimary?: string
  aSecondary?: string
  aOutside?: string
  aTone?: 'good' | 'bad' | 'neutral'

  // Card B
  bName: string
  bPrimary?: string
  bSecondary?: string
  bOutside?: string
  bTone?: 'good' | 'bad' | 'neutral'

  // Card C
  cName: string
  cPrimary?: string
  cSecondary?: string
  cOutside?: string
  cTone?: 'good' | 'bad' | 'neutral'

  // Optional label for the bottom-section across all cards
  outsideLabel?: string
}

const STRIPE: Record<'good' | 'bad' | 'neutral', string> = {
  good: 'bg-green-600',
  bad: 'bg-red-600',
  neutral: 'bg-gray-300',
}

function Card({
  name,
  primary,
  secondary,
  outside,
  tone = 'neutral',
  outsideLabel,
}: {
  name: string
  primary?: string
  secondary?: string
  outside?: string
  tone?: 'good' | 'bad' | 'neutral'
  outsideLabel: string
}) {
  return (
    <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
      <span className={`absolute top-0 left-0 right-0 h-1 ${STRIPE[tone]}`} aria-hidden />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <p className="font-serif text-black text-xl font-bold leading-tight">{name}</p>
        {primary && (
          <p className="font-sans text-[11px] uppercase tracking-wider text-gray-500 leading-snug">
            {primary}
          </p>
        )}
        {secondary && (
          <p className="font-sans text-gray-700 text-[13px] leading-relaxed">{secondary}</p>
        )}
        {outside && (
          <div className="mt-auto pt-3 border-t border-gray-100">
            <p className="font-sans text-[10px] uppercase tracking-widest text-gray-500 mb-1">
              {outsideLabel}
            </p>
            <p className="font-sans text-gray-600 text-[12px] leading-relaxed">{outside}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TripleView(props: TripleViewProps) {
  const {
    eyebrow,
    title,
    aName, aPrimary, aSecondary, aOutside, aTone,
    bName, bPrimary, bSecondary, bOutside, bTone,
    cName, cPrimary, cSecondary, cOutside, cTone,
    outsideLabel = 'What sits outside',
  } = props

  return (
    <div className="not-prose my-10">
      {(eyebrow || title) && (
        <div className="mb-5">
          {eyebrow && (
            <p className="font-sans text-brand-red text-[11px] tracking-[0.25em] uppercase font-bold mb-2">
              {eyebrow}
            </p>
          )}
          {title && (
            <p className="font-serif text-black text-2xl font-bold leading-snug">{title}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card name={aName} primary={aPrimary} secondary={aSecondary} outside={aOutside} tone={aTone} outsideLabel={outsideLabel} />
        <Card name={bName} primary={bPrimary} secondary={bSecondary} outside={bOutside} tone={bTone} outsideLabel={outsideLabel} />
        <Card name={cName} primary={cPrimary} secondary={cSecondary} outside={cOutside} tone={cTone} outsideLabel={outsideLabel} />
      </div>
    </div>
  )
}
