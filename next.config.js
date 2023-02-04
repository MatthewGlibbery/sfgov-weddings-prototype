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
    domains: ['localhost'],
    remotePatterns: [
      {
        hostname: 'localhost',
        port: '8000',
        protocol: 'http'
      }
    ]
  },
  poweredByHeader: false,
  experimental: {
  }
}
