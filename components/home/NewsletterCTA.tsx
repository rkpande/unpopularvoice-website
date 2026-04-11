'use client'

export default function NewsletterCTA() {
  return (
    <section className="bg-red-50 border-b border-red-100">
      <div className="max-w-2xl mx-auto px-8 py-20 text-center">
        <h2 className="font-serif text-black text-4xl font-bold mb-3">
          Get full breakdowns. No fluff.
        </h2>
        <p className="font-sans text-gray-500 text-base mb-10">
          Financial teardowns delivered to your inbox. One story. Deep analysis. Plain language.
        </p>

        <form className="flex gap-0 max-w-md mx-auto shadow-sm" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3.5 font-sans text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-brand-red"
          />
          <button
            type="submit"
            className="bg-brand-red text-white font-sans font-semibold text-sm px-6 py-3.5 rounded-r-md hover:bg-red-800 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p className="font-sans text-gray-400 text-xs mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
