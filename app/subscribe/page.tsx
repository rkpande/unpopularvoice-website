'use client'

import type { Metadata } from 'next'
import { useState } from 'react'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white flex items-center">
      <div className="max-w-2xl mx-auto px-8 py-24 text-center">
        <div className="w-12 h-1 bg-brand-red mx-auto mb-10" />

        {submitted ? (
          <>
            <h1 className="font-serif text-black text-5xl font-bold mb-4">You&apos;re in.</h1>
            <p className="font-sans text-gray-500 text-lg">
              First breakdown lands in your inbox next week.
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
                className="flex-1 px-4 py-4 font-sans text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-brand-red"
              />
              <button
                type="submit"
                className="bg-brand-red text-white font-sans font-semibold text-sm px-6 py-4 rounded-r-md hover:bg-red-800 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="font-sans text-gray-400 text-xs mt-3">No spam. Unsubscribe anytime.</p>

            <div className="mt-16 grid grid-cols-3 gap-8 text-left border-t border-gray-100 pt-12">
              {[
                { label: 'What you get', body: 'One deep financial teardown per week. Not news — analysis.' },
                { label: 'Who it\'s for', body: 'Job seekers, investors, employers, and anyone who wants to understand startups beyond the headlines.' },
                { label: 'What we don\'t do', body: 'No fundraise announcements. No founder profiles. No PR repackaging.' },
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
