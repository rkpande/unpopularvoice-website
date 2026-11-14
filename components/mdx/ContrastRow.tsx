interface ContrastRowProps {
  aLabel: string
  aLine: string
  bLabel: string
  bLine: string
  punchline?: string
}

export default function ContrastRow({
  aLabel,
  aLine,
  bLabel,
  bLine,
  punchline,
}: ContrastRowProps) {
  return (
    <div className="not-prose my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white border-l-4 border-green-500 pl-5 py-3">
          <p className="font-sans text-[10px] tracking-[0.22em] uppercase font-bold text-green-700 mb-1">
            {aLabel}
          </p>
          <p className="font-serif text-black text-lg sm:text-xl font-bold leading-snug">
            {aLine}
          </p>
        </div>
        <div className="bg-white border-l-4 border-red-500 pl-5 py-3">
          <p className="font-sans text-[10px] tracking-[0.22em] uppercase font-bold text-red-600 mb-1">
            {bLabel}
          </p>
          <p className="font-serif text-black text-lg sm:text-xl font-bold leading-snug">
            {bLine}
          </p>
        </div>
      </div>
      {punchline && (
        <p className="font-serif text-black text-xl sm:text-2xl font-bold mt-6 leading-snug">
          {punchline}
        </p>
      )}
    </div>
  )
}
