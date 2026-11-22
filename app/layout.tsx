import type { Metadata, Viewport } from 'next'
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
  default: 'UnpopularVoice: Indian Startup Financials from Public Filings',
  template: '%s | UnpopularVoice',
 },
  description:
 'Financial teardowns of Indian startups from public filings. Revenue, losses, burn rate, runway, the real numbers. No hype, audited data only.',
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
  site: '@UnpopularV83586',
  creator: '@UnpopularV83586',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://unpopularvoice.com/#organization',
  name: 'UnpopularVoice',
  url: 'https://unpopularvoice.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://unpopularvoice.com/icon',
    width: 512,
    height: 512,
  },
  sameAs: ['https://x.com/UnpopularV83586', 'https://www.linkedin.com/in/unpopular-voice/', 'https://www.youtube.com/@YourUnpopularVoice'],
  description: 'Financial teardowns of Indian startups based on actual public financial filings.',
  foundingDate: '2026',
  publishingPrinciples: 'https://unpopularvoice.com/editorial-standards',
  correctionsPolicy: 'https://unpopularvoice.com/editorial-standards#corrections',
  areaServed: 'IN',
  knowsLanguage: 'en',
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://unpopularvoice.com/#website',
  name: 'UnpopularVoice',
  url: 'https://unpopularvoice.com',
  description: 'Financial teardowns of Indian startups based on actual public financial filings.',
  inLanguage: 'en-IN',
  publisher: { '@id': 'https://unpopularvoice.com/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://unpopularvoice.com/articles?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
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
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-black focus:text-white focus:px-4 focus:py-3 focus:rounded-md font-sans text-sm font-semibold">
          Skip to content
        </a>
 <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
 />
 <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
 />
 <Nav />
 <main id="main" tabIndex={-1} className="focus:outline-none">{children}</main>
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
