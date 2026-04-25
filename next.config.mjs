/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  async redirects() {
    return [
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
    ]
  },
}

export default nextConfig
