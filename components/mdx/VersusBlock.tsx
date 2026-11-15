type Tone = 'good' | 'bad' | 'neutral'
type Direction = 'up' | 'down' | 'flat'

interface VersusBlockProps {
  metric: string
  aLabel: string
  aValue: string
  aSub?: string
  aDirection?: Direction
  aTone?: Tone
  bLabel: string
  bValue: string
  bSub?: string
  bDirection?: Direction
  bTone?: Tone
  gap?: string
}

const TONE_CLS: Record<Tone, string> = {
  good: 'text-green-700',
  bad: 'text-red-600',
  neutral: 'text-black',
}

const DIRECTION_GLYPH: Record<Direction, string> = {
  up: '▲',
  down: '▼',
  flat: '-',
}

const DIRECTION_TONE_CLS: Record<Tone, string> = {
  good: 'text-green-700',
  bad: 'text-red-600',
  neutral: 'text-gray-500',
}

function Pane({
  position,
  label,
  value,
  sub,
  direction,
  tone,
}: {
  position: 'left' | 'right'
  label: string
  value: string
  sub?: string
  direction?: Direction
  tone?: Tone
}) {
  const t: Tone = tone ?? 'neutral'
  return (
    <div
      className={`p-5 sm:p-6 ${position === 'left' ? 'border-b sm:border-b-0 sm:border-r border-gray-200 bg-gray-50/40' : 'bg-white'}`}
    >
      <p className="font-sans text-[10px] tracking-[0.18em] uppercase font-semibold text-gray-500 mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        {direction && (
          <span className={`text-base ${DIRECTION_TONE_CLS[t]} leading-none`}>
            {DIRECTION_GLYPH[direction]}
          </span>
        )}
        <p className={`font-serif text-2xl sm:text-3xl font-bold leading-none ${TONE_CLS[t]}`}>
          {value}
        </p>
      </div>
      {sub && (
        <p className="font-sans text-gray-500 text-xs mt-2 leading-snug">{sub}</p>
      )}
    </div>
  )
}

export default function VersusBlock(props: VersusBlockProps) {
  return (
    <div className="my-6 not-prose">
      <p className="font-sans text-[11px] tracking-[0.22em] uppercase font-bold text-gray-700 mb-2">
        {props.metric}
      </p>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Pane
            position="left"
            label={props.aLabel}
            value={props.aValue}
            sub={props.aSub}
            direction={props.aDirection}
            tone={props.aTone}
          />
          <Pane
            position="right"
            label={props.bLabel}
            value={props.bValue}
            sub={props.bSub}
            direction={props.bDirection}
            tone={props.bTone}
          />
        </div>
        {props.gap && (
          <div className="border-t border-gray-100 bg-gray-50 px-5 sm:px-6 py-3">
            <p className="font-sans text-gray-700 text-sm leading-relaxed">
              <span className="font-semibold text-gray-900">The gap: </span>
              {props.gap}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
