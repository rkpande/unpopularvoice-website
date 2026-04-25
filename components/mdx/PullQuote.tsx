interface PullQuoteProps {
  quote: string
  attribution?: string
}

export default function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote className="not-prose my-10 border-l-4 border-brand-red pl-6 py-1">
      <p className="font-serif text-black text-2xl sm:text-3xl font-bold italic leading-snug">
        &ldquo;{quote}&rdquo;
      </p>
      {attribution && (
        <cite className="block mt-3 font-sans text-xs text-gray-400 uppercase tracking-widest not-italic">
          {attribution}
        </cite>
      )}
    </blockquote>
  )
}
