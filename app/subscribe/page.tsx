'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white flex items-center">
      <div className="max-w-2xl mx-auto px-8 py-24 text-center">
        <div className="w-12 h-1 bg-brand-red mx-auto mb-10" />

        {status === 'success' ? (
          <>
            <h1 className="font-serif text-black text-5xl font-bold mb-4">You&apos;re in.</h1>
            <p className="font-sans text-gray-500 text-lg">
              First breakdown lands in your inbox soon.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-serif text-black text-5xl font-bold leading-tight mb-4">
              Get full breakdowns.
              <br />
              <span className="text-brand-red">No fluff.</span>
            </h1>
            <p className="font-sans text-gray-500 text-lg mb-10 leading-relaxed">
              Financial teardowns of Indian startups — delivered to your inbox.
              One story. Deep analysis. Every technical term explained.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto shadow-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={status === 'loading'}
                className="flex-1 px-4 py-4 font-sans text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-brand-red disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-brand-red text-white font-sans font-semibold text-sm px-6 py-4 rounded-r-md hover:bg-red-800 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>

            {status === 'error' && (
              <p className="font-sans text-red-600 text-xs mt-3">{errorMsg}</p>
            )}
            {status !== 'error' && (
              <p className="font-sans text-gray-400 text-xs mt-3">No spam. Unsubscribe anytime.</p>
            )}

            <div className="mt-16 grid grid-cols-3 gap-8 text-left border-t border-gray-100 pt-12">
              {[
                { label: 'What you get', body: 'One deep financial teardown per week. Not news — analysis.' },
                { label: "Who it's for", body: 'Job seekers, investors, employers, and anyone who wants to understand startups beyond the headlines.' },
                { label: "What we don't do", body: 'No fundraise announcements. No founder profiles. No PR repackaging.' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-sans font-bold text-black text-sm mb-2">{item.label}</p>
                  <p className="font-sans text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
