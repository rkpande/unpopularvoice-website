interface SignatureLineProps {
  text: string
}

export default function SignatureLine({ text }: SignatureLineProps) {
  return (
    <div className="not-prose my-14 bg-black rounded-xl px-6 py-12 sm:px-10 sm:py-14 text-center">
      <div aria-hidden="true" className="w-8 h-[3px] bg-brand-red mx-auto mb-8" />
      <p className="font-serif text-[1.65rem] sm:text-3xl md:text-[2.25rem] font-bold text-white leading-snug max-w-2xl mx-auto text-balance">
        {text}
      </p>
    </div>
  )
}
