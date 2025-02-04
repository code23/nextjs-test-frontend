/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        protocol: 'https',
        hostname: 'code23-stag-marketplace-public.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/partydip.markko.me/**',
      },
      {
        protocol: 'https',
        hostname: 'code23-stag-marketplace-public.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/designsnitch.markko.me/**',
      },
    ],
  },
}

module.exports = nextConfig