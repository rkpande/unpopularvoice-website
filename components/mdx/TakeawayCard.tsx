interface TakeawayCardProps {
  eyebrow?: string
  headline: string
  body?: string
  variant?: 'dark' | 'light'
}

export default function TakeawayCard({
  eyebrow = 'Takeaway',
  headline,
  body,
  variant = 'dark',
}: TakeawayCardProps) {
  if (variant === 'light') {
    return (
      <aside className="not-prose my-10 bg-cream border-l-[6px] border-brand-red p-6 sm:p-8 rounded-r-xl">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-brand-red mb-3">
          {eyebrow}
        </p>
        <p className="font-serif text-black text-2xl sm:text-3xl font-bold leading-[1.15] mb-3">
          {headline}
        </p>
        {body && (
          <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
            {body}
          </p>
        )}
      </aside>
    )
  }
  return (
    <aside className="not-prose my-10 bg-black p-7 sm:p-10 rounded-2xl relative overflow-hidden">
      <span className="absolute top-0 left-0 w-12 h-1 bg-brand-red" aria-hidden />
      <p className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-brand-red mb-4">
        {eyebrow}
      </p>
      <p className="font-serif text-white text-2xl sm:text-4xl font-bold leading-[1.1] mb-4">
        {headline}
      </p>
      {body && (
        <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl">
          {body}
        </p>
      )}
    </aside>
  )
}
