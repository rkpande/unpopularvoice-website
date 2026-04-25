import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let email: string

  try {
    const body = await request.json()
    email = body.email?.trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  // If Resend is not configured, log and return success so the UX works
  if (!apiKey || !audienceId) {
    console.warn('[subscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID not set — skipping email capture')
    return NextResponse.json({ ok: true })
  }

  const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[subscribe] Resend error:', res.status, text)
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
