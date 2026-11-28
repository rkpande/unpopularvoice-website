'use client'

import { useId, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

// One sign-up form for the homepage, used in the hero (on black), after the
// featured teardown and in the closing band (on paper). Same endpoint and
// messages as the article sign-up, so a reader sees one voice everywhere.
export default function SubscribeForm({
  ground = 'paper',
  label = 'Email address',
  hint,
}: {
  ground?: 'paper' | 'black'
  label?: string
  hint?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const id = useId()
  const dark = ground === 'black'

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

  if (status === 'success') {
    return (
      <p role="status" className={`font-sans text-sm font-semibold ${dark ? 'text-white' : 'text-black'}`}>
        {message}
      </p>
    )
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">
          {label}
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
          className={`flex-1 min-h-[48px] px-4 rounded font-sans text-base focus:outline-none disabled:opacity-60 ${
            dark
              ? 'bg-white/10 text-white placeholder:text-white/60 border border-white/30 focus:border-white'
              : 'bg-white text-black placeholder:text-gray-500 border border-gray-300 focus:border-black'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="min-h-[48px] px-6 rounded bg-brand-red text-white font-sans text-base font-semibold hover:bg-red-800 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing…' : 'Get the next teardown'}
        </button>
      </form>
      {status === 'error' ? (
        <p role="alert" className="mt-2 font-sans text-sm text-red-600">
          {message}
        </p>
      ) : (
        hint && <p className={`mt-2 font-sans text-sm ${dark ? 'text-white/60' : 'text-gray-500'}`}>{hint}</p>
      )}
    </div>
  )
}
