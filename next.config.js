/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  async redirects() {
    return [
      { source: '/house-calls', destination: '/intake', permanent: true },
      {
        source: '/blog/forbidden-fat-loss-molecule-retatrutide-triple-agonist',
        destination: '/blog/retatrutide-metabolic-research-deep-dive',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
