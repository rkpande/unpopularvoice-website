interface SignatureLineProps {
  text: string
}

export default function SignatureLine({ text }: SignatureLineProps) {
  return (
    <div className="not-prose my-14 bg-black rounded-xl px-10 py-14 text-center">
      <div className="w-8 h-[3px] bg-brand-red mx-auto mb-8" />
      <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-white/40 mb-7">
        The core insight
      </p>
      <p className="font-serif text-3xl md:text-[2.25rem] font-bold text-white leading-snug max-w-2xl mx-auto">
        {text}
      </p>
    </div>
  )
}
