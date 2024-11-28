import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ['https://code23-stag-marketplace-public.s3.eu-west-2.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'code23-stag-marketplace-public.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/partydip.test/**',
      },
    ],
  },
}

export default nextConfig
