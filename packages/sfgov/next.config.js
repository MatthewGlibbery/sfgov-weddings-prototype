// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  images: {
    domains: [
      'sf.gov',
      'localhost',
      'via.placeholder.com'
    ],
    remotePatterns: [
      {
        hostname: 'sf.gov',
        protocol: 'https'
      },
      {
        hostname: 'localhost',
        port: '8000',
        protocol: 'http'
      },
      {
        hostname: 'via.placeholder.com',
        protocol: 'https'
      }
    ]
  },
  typescript: {
  },
  poweredByHeader: false,
  experimental: {
  },
  transpilePackages: ['../design-system']
}
