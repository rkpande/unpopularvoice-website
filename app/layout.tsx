import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://unpopularvoice.com'

export const metadata: Metadata = {
  title: {
    default: 'UnpopularVoice — Startup growth, stripped of narratives.',
    template: '%s | UnpopularVoice',
  },
  description:
    'Financial teardowns of Indian startups. We read the actual RoC filings so you don\'t have to.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: 'UnpopularVoice',
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    images: [
      {
        url: '/og?title=Financial+teardowns+of+Indian+startups.',
        width: 1200,
        height: 630,
        alt: 'UnpopularVoice',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@unpopularvoice',
    creator: '@unpopularvoice',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-white text-black antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
