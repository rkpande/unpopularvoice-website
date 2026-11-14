type Tone = 'good' | 'bad' | 'neutral'

interface SplitViewProps {
  eyebrow?: string
  aLabel: string
  aHeadline: string
  aBody: string
  aTone?: Tone
  bLabel: string
  bHeadline: string
  bBody: string
  bTone?: Tone
  conclusion?: string
}

const STRIPE_CLS: Record<Tone, string> = {
  good: 'bg-green-500',
  bad: 'bg-red-500',
  neutral: 'bg-gray-300',
}

const LABEL_CLS: Record<Tone, string> = {
  good: 'text-green-700',
  bad: 'text-red-600',
  neutral: 'text-gray-600',
}

function Side({
  position,
  label,
  headline,
  body,
  tone,
}: {
  position: 'left' | 'right'
  label: string
  headline: string
  body: string
  tone: Tone
}) {
  return (
    <div
      className={`relative p-5 sm:p-7 ${position === 'left' ? 'border-b sm:border-b-0 sm:border-r border-gray-200 bg-gray-50/40' : 'bg-white'}`}
    >
      <span className={`absolute top-0 left-0 right-0 h-1 ${STRIPE_CLS[tone]}`} aria-hidden />
      <p className={`font-sans text-[10px] tracking-[0.22em] uppercase font-bold mb-2 ${LABEL_CLS[tone]}`}>
        {label}
      </p>
      <h4 className="font-serif text-black text-xl sm:text-2xl font-bold leading-tight mb-3">
        {headline}
      </h4>
      <p className="font-sans text-gray-700 text-sm sm:text-[15px] leading-relaxed">
        {body}
      </p>
    </div>
  )
}

export default function SplitView({
  eyebrow,
  aLabel,
  aHeadline,
  aBody,
  aTone = 'neutral',
  bLabel,
  bHeadline,
  bBody,
  bTone = 'neutral',
  conclusion,
}: SplitViewProps) {
  return (
    <div className="my-8 not-prose">
      {eyebrow && (
        <p className="font-sans text-[11px] tracking-[0.22em] uppercase font-bold text-gray-700 mb-2">
          {eyebrow}
        </p>
      )}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Side position="left" label={aLabel} headline={aHeadline} body={aBody} tone={aTone} />
          <Side position="right" label={bLabel} headline={bHeadline} body={bBody} tone={bTone} />
        </div>
        {conclusion && (
          <div className="border-t border-gray-100 bg-gray-50 px-5 sm:px-7 py-4">
            <p className="font-sans text-gray-800 text-sm sm:text-[15px] leading-relaxed">
              <span className="font-bold text-black">→ </span>
              {conclusion}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
