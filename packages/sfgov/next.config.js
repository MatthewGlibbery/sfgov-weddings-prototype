const { i18n } = require('./next-i18next.config')

/** @typedef {import('next/dist/lib/load-custom-routes').Redirect} Redirect */
/** @typedef {import('next/dist/lib/load-custom-routes').Rewrite} Rewrite */

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  images: {
    domains: ['sf.gov', 'localhost', 'via.placeholder.com'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
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
    ignoreBuildErrors: true
  },
  poweredByHeader: false,
  experimental: {},
  transpilePackages: [
    '../design-system',
    '../../node_modules/lodash/index.js'
  ],
  // redirects cause the browser URL to change
  redirects: async () => [
    ...storybookRedirects()
  ],
}

/**
 * These redirects allow storybook to be served at /storybook when its build is
 * output to public/storybook.
 * @returns {Redirect[]}
 */
function storybookRedirects() {
  return [
    {
      source: '/storybook',
      destination: '/storybook/index.html',
      permanent: true
    },
    {
      source: '/iframe.html',
      destination: '/storybook/iframe.html',
      permanent: true
    }
  ]
}