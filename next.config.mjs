/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  async redirects() {
    return [
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
