/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      'es',
      'zh',
      'fil'
    ]
  },
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
