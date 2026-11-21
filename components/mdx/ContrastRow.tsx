interface ContrastRowProps {
  aLabel: string
  aLine: string
  bLabel: string
  bLine: string
  punchline?: string
}

// Two statements side by side. Neutral on purpose: red and green describe a
// figure's sign (DESIGN.md, The Sign Rule), never which side of a comparison is
// "good". A short line reads as a serif statement; a long one as body text.
function Line({ text }: { text: string }) {
  const short = text.trim().split(/\s+/).length <= 20
  return short ? (
    <p className="font-serif text-black text-lg sm:text-xl font-bold leading-snug text-pretty">{text}</p>
  ) : (
    <p className="font-sans text-gray-800 text-[15px] leading-relaxed text-pretty">{text}</p>
  )
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          [aLabel, aLine],
          [bLabel, bLine],
        ].map(([label, line]) => (
          <div key={label} className="border-t-2 border-black pt-3">
            <p className="font-sans text-xs font-bold text-gray-600 mb-1.5">{label}</p>
            <Line text={line} />
          </div>
        ))}
      </div>
      {punchline && (
        <p className="font-serif text-black text-xl sm:text-2xl font-bold mt-6 leading-snug text-pretty">
          {punchline}
        </p>
      )}
    </div>
  )
}
