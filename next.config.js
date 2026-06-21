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
    ]
  }
}

module.exports = nextConfig
