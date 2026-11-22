import type { Metadata } from 'next'
import Link from 'next/link'
import { unsubscribeContact, validUnsubscribe } from '@/lib/email'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Unsubscribe', robots: { index: false, follow: false } }

// One-click unsubscribe from the welcome email (teardown emails use Resend's
// own per-recipient link). The link carries an HMAC of the address.
export default async function UnsubscribePage({ searchParams }: { searchParams: { e?: string; t?: string } }) {
  const email = (searchParams.e || '').trim().toLowerCase()
  const valid = Boolean(email) && validUnsubscribe(email, searchParams.t || '')
  let done = false
  if (valid) {
    const r = await unsubscribeContact(email)
    done = r.ok
    if (!r.ok) console.error('[unsubscribe] Resend error:', r.status, JSON.stringify(r.data))
  }
  const [title, body] = !valid
    ? ['This link is not valid', 'The unsubscribe link may be incomplete. Use the link exactly as it appears in the email.']
    : done
      ? ['You are unsubscribed', 'You will not get further teardown emails. You can subscribe again any time.']
      : ['Something went wrong', 'We could not update your subscription just now. Please open the link again in a few minutes.']
  return (
    <div className="bg-white">
      <div className="max-w-xl mx-auto px-6 sm:px-8 py-24">
        <div aria-hidden="true" className="w-10 h-1 bg-brand-red mb-8" />
        <h1 className="font-serif text-black text-4xl font-bold leading-tight mb-4">{title}</h1>
        <p className="font-sans text-gray-700 text-base leading-relaxed mb-8">{body}</p>
        <Link href="/articles" className="font-sans text-sm font-semibold text-black underline underline-offset-4">
          Browse the teardowns
        </Link>
      </div>
    </div>
  )
}
