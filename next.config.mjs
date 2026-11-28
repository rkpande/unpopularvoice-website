/** @type {import('next').NextConfig} */
// Sector pages merged into one name (lib/sectors.ts, SECTOR_ALIASES).
const SECTOR_REDIRECTS = [
  ['direct-to-consumer', 'd2c'],
  ['healthcare', 'healthtech'],
  ['health-tech', 'healthtech'],
  ['health-and-wellness', 'healthtech'],
  ['diagnostics', 'healthtech'],
  ['e-pharmacy', 'healthtech'],
  ['b2b-commerce', 'b2b'],
  ['b2b-seafood', 'b2b'],
  ['payments', 'fintech'],
  ['wealth-management', 'fintech'],
]

const nextConfig = {
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  async redirects() {
    return [
      ...SECTOR_REDIRECTS.map(([from, to]) => ({
        source: `/sector/${from}`,
        destination: `/sector/${to}`,
        permanent: true,
      })),
      // www → apex (covers both http://www and https://www)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.unpopularvoice.com' }],
        destination: 'https://unpopularvoice.com/:path*',
        permanent: true,
      },
      // Old legal-entity slug → brand slug (permanent)
      {
        source: '/stable-alpha-technologies-private-limited-fy2025',
        destination: '/stable-money-fy2025',
        permanent: true,
      },
      // Renamed slugs (year-anchored → event-anchored)
      {
        source: '/goodglamm-fy2023',
        destination: '/goodglamm-cirp',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
