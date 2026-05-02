import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
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
    default: 'UnpopularVoice — Indian Startup Financials from MCA Filings',
    template: '%s | UnpopularVoice',
  },
  description:
    'Financial teardowns of Indian startups from MCA filings. Revenue, losses, burn rate, runway — the real numbers. No hype, audited data only.',
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

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UnpopularVoice',
  url: 'https://unpopularvoice.com',
  logo: 'https://unpopularvoice.com/icon',
  sameAs: ['https://twitter.com/unpopularvoice'],
  description: 'Financial teardowns of Indian startups based on actual MCA/RoC filings.',
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'UnpopularVoice',
  url: 'https://unpopularvoice.com',
  publisher: { '@type': 'Organization', name: 'UnpopularVoice' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-white text-black antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GRDDSSV3Y9"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-GRDDSSV3Y9');`}
        </Script>
      </body>
    </html>
  )
}
