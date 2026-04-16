'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-red-50 border-b border-red-100">
      <div className="max-w-2xl mx-auto px-8 py-20 text-center">
        <h2 className="font-serif text-black text-4xl font-bold mb-3">
          Get filings-based startup breakdowns.
        </h2>
        <p className="font-sans text-gray-500 text-base mb-10">
          One Indian startup. One MCA filing. The story the brand doesn&apos;t tell.
        </p>

        {status === 'success' ? (
          <p className="font-sans font-semibold text-brand-red text-base">You&apos;re in. First breakdown coming soon.</p>
        ) : (
          <>
            <form className="flex gap-0 max-w-md mx-auto shadow-sm" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3.5 font-sans text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-brand-red disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-brand-red text-white font-sans font-semibold text-sm px-6 py-3.5 rounded-r-md hover:bg-red-800 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
            {status === 'error' && (
              <p className="font-sans text-red-600 text-xs mt-3">Something went wrong. Please try again.</p>
            )}
            {status !== 'error' && (
              <p className="font-sans text-gray-400 text-xs mt-3">No spam. Unsubscribe anytime.</p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
