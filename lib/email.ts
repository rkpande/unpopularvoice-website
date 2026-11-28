// Email through Resend: sign-up contacts, the welcome email, and one email to
// the list per new teardown. Server-only (reads RESEND_API_KEY).
import { createHmac, timingSafeEqual } from 'crypto'

const API = 'https://api.resend.com'
// Stored settings can carry a stray newline (the audience id did, which made every
// broadcast fail with a 500 while contact sign-ups still worked). Always trim.
const KEY = () => (process.env.RESEND_API_KEY || '').trim()
const AUDIENCE = () => (process.env.RESEND_AUDIENCE_ID || '').trim()
export const SITE_URL = 'https://unpopularvoice.com'
export const FROM = 'UnpopularVoice <editor@unpopularvoice.com>'

export function emailConfigured(): boolean {
  return Boolean(KEY() && AUDIENCE())
}

async function resend(path: string, init: { method?: string; body?: unknown } = {}) {
  const res = await fetch(`${API}${path}`, {
    method: init.method ?? 'GET',
    headers: { Authorization: `Bearer ${KEY()}`, 'Content-Type': 'application/json' },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  })
  const text = await res.text()
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }
  return { ok: res.ok, status: res.status, data }
}

// ---------- contacts ----------

export async function addContact(email: string) {
  return resend(`/audiences/${AUDIENCE()}/contacts`, {
    method: 'POST',
    body: { email, unsubscribed: false },
  })
}

export async function unsubscribeContact(email: string) {
  return resend(`/audiences/${AUDIENCE()}/contacts/${encodeURIComponent(email)}`, {
    method: 'PATCH',
    body: { unsubscribed: true },
  })
}

// Unsubscribe links in the welcome email carry an HMAC of the address, so a
// link only unsubscribes the person it was sent to.
function unsubscribeToken(email: string): string {
  return createHmac('sha256', `${KEY()}:unsubscribe`).update(email).digest('hex').slice(0, 32)
}
export function unsubscribeUrl(email: string): string {
  return `${SITE_URL}/unsubscribe?e=${encodeURIComponent(email)}&t=${unsubscribeToken(email)}`
}
export function validUnsubscribe(email: string, token: string): boolean {
  const want = Buffer.from(unsubscribeToken(email))
  const got = Buffer.from(String(token))
  return want.length === got.length && timingSafeEqual(want, got)
}

// ---------- templates ----------

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function layout(inner: string, unsubscribeHref: string): string {
  return `<!doctype html><html><body style="margin:0;background:#ffffff;">
<div style="max-width:560px;margin:0 auto;padding:32px 20px;font-family:Georgia,'Times New Roman',serif;color:#111111;">
<div style="width:40px;height:4px;background:#CC2E2E;margin-bottom:20px;"></div>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#555555;margin:0 0 18px;">UnpopularVoice</p>
${inner}
<hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0 16px;">
<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#666666;margin:0;">
Forensic reads of Indian startups from their audited accounts. Not investment advice.<br>
<a href="${unsubscribeHref}" style="color:#666666;">Unsubscribe</a>
</p></div></body></html>`
}

export function welcomeEmail(email: string) {
  const unsub = unsubscribeUrl(email)
  const subject = 'You are subscribed to UnpopularVoice'
  const html = layout(
    `<h1 style="font-size:26px;line-height:1.25;margin:0 0 14px;">You're in.</h1>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;margin:0 0 14px;">
Each time we publish a new teardown, you'll get one email: the company, what its audited accounts actually show, and a link to the full read.</p>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;margin:0 0 22px;">
While you wait, start with any of the 100+ teardowns already on the site.</p>
<p style="margin:0;"><a href="${SITE_URL}/articles" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;padding:12px 20px;border-radius:6px;">Browse the teardowns</a></p>`,
    unsub,
  )
  const text = `You're in.

Each time we publish a new teardown, you'll get one email: the company, what its audited accounts actually show, and a link to the full read.

Browse the teardowns: ${SITE_URL}/articles

Unsubscribe: ${unsub}`
  return { subject, html, text }
}

export function teardownEmail(a: { slug: string; title: string; company: string; tldr: string[]; path: string }) {
  const url = `${SITE_URL}${a.path}?utm_source=newsletter&utm_medium=email&utm_campaign=${encodeURIComponent(a.slug)}`
  // Resend substitutes this with each recipient's own unsubscribe link in broadcasts.
  const unsub = '{{{RESEND_UNSUBSCRIBE_URL}}}'
  const bullets = a.tldr
    .map((t) => `<li style="margin:0 0 10px;">${esc(t)}</li>`)
    .join('')
  const html = layout(
    `<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase;color:#CC2E2E;margin:0 0 8px;">New teardown: ${esc(a.company)}</p>
<h1 style="font-size:26px;line-height:1.25;margin:0 0 18px;">${esc(a.title)}</h1>
<ul style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;padding-left:20px;margin:0 0 24px;">${bullets}</ul>
<p style="margin:0;"><a href="${url}" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;padding:12px 20px;border-radius:6px;">Read the full teardown</a></p>`,
    unsub,
  )
  const text = `New teardown: ${a.company}

${a.title}

${a.tldr.map((t) => `- ${t}`).join('\n')}

Read the full teardown: ${url}

Unsubscribe: ${unsub}`
  return { subject: a.title, html, text }
}

// ---------- sending ----------

export async function sendEmail(to: string, msg: { subject: string; html: string; text: string }) {
  return resend('/emails', { method: 'POST', body: { from: FROM, to: [to], subject: msg.subject, html: msg.html, text: msg.text } })
}

// Broadcast names double as the sent-log: one broadcast per teardown, named
// "teardown:<slug>". Checking the names first makes the daily job idempotent.
export async function broadcastNames(): Promise<Set<string>> {
  const r = await resend('/broadcasts')
  if (!r.ok) throw new Error(`Resend broadcasts list failed: ${r.status}`)
  return new Set(((r.data?.data as any[]) || []).map((b) => String(b.name || '')))
}

export async function sendBroadcast(name: string, msg: { subject: string; html: string; text: string }) {
  const created = await resend('/broadcasts', {
    method: 'POST',
    body: { audience_id: AUDIENCE(), from: FROM, name, subject: msg.subject, html: msg.html, text: msg.text },
  })
  if (!created.ok) throw new Error(`Resend broadcast create failed: ${created.status} ${JSON.stringify(created.data)}`)
  const id = created.data?.id
  const sent = await resend(`/broadcasts/${id}/send`, { method: 'POST', body: {} })
  if (!sent.ok) throw new Error(`Resend broadcast send failed: ${sent.status} ${JSON.stringify(sent.data)}`)
  return id as string
}
