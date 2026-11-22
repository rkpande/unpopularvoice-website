'use client'

import { useId, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

// End-of-article sign-up. Readers mostly arrive from LinkedIn or YouTube, read
// one teardown and leave; this is the one place they can choose to come back.
// Same endpoint as /subscribe. Short on purpose: it repeats on every article.
export default function ArticleSubscribe({ company }: { company: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const id = useId()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('success')
        setMessage('Subscribed. The next teardown will reach your inbox.')
      } else {
        setStatus('error')
        setMessage(data.error || 'That did not go through. Check the address and try again.')
      }
    } catch {
      setStatus('error')
      setMessage('No connection. Check your network and try again.')
    }
  }

  return (
    <section aria-labelledby={`${id}-h`} className="not-prose mt-12 border-t-2 border-black pt-6">
      <h2 id={`${id}-h`} className="font-serif text-black text-xl font-bold leading-snug">
        Get the next teardown by email
      </h2>
      <p className="mt-1.5 font-sans text-sm text-gray-600 leading-relaxed">
        Audited numbers on companies like {company}, read line by line. No spam, unsubscribe any time.
      </p>
      {status === 'success' ? (
        <p role="status" className="mt-4 font-sans text-sm font-semibold text-black">
          {message}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md">
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={status === 'loading'}
            className="flex-1 min-h-[44px] px-3 font-sans text-sm border border-gray-300 rounded-md focus:outline-none focus:border-black disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="min-h-[44px] px-5 rounded-md bg-black text-white font-sans text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-2 font-sans text-xs text-red-600">
          {message}
        </p>
      )}
    </section>
  )
}
