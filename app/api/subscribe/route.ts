import { NextRequest, NextResponse } from 'next/server'
import { addContact, emailConfigured, sendEmail, welcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  let email: string

  try {
    const body = await request.json()
    email = body.email?.trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That does not look like an email address.' }, { status: 400 })
  }

  // Never report success for an address we did not keep.
  if (!emailConfigured()) {
    console.error('[subscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID not set')
    return NextResponse.json({ error: 'Sign-up is unavailable right now. Please try again later.' }, { status: 503 })
  }

  const added = await addContact(email)
  if (!added.ok) {
    console.error('[subscribe] Resend contact error:', added.status, JSON.stringify(added.data))
    return NextResponse.json({ error: 'Sign-up did not go through. Please try again.' }, { status: 502 })
  }

  // The welcome email is a courtesy: if it fails, the sign-up still stands.
  const sent = await sendEmail(email, welcomeEmail(email))
  if (!sent.ok) console.error('[subscribe] welcome email failed:', sent.status, JSON.stringify(sent.data))

  return NextResponse.json({ ok: true })
}
