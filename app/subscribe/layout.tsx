import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subscribe',
  description:
    'Get notified when new audited Indian-startup analysis goes live. Email-only, no paywall.',
  alternates: {
    canonical: 'https://unpopularvoice.com/subscribe',
  },
}

export default function SubscribeLayout({ children }: { children: React.ReactNode }) {
  return children
}
