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
  async headers() {
    /**
     * Set headers on responses, filtered by path and/or header and query string
     * @see https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
     */
    // this pattern matches any path
    const ANY_PATH = '/:path*'
    const CACHE_CONTROL = 'cache-control'
    // by default, cache responses for 10 min
    const TTL_DEFAULT = 60 * 10
    // allow the stale cached page to be served for two weeks (while
    // revalidating or if error)
    const STALE_TTL = 60 * 60 * 24 * 14
    return [
      {
        source: ANY_PATH,
        headers: [
          {
            key: CACHE_CONTROL,
            value: [
              'public',
              // the number of seconds after which a fresh response will be
              // marked as stale; see:
              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control#max-age
              `max-age=${TTL_DEFAULT}`,
              // the number of seconds for which to serve a stale response while
              // the fresh response is being fetched; see:
              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control#stale-while-revalidate
              `stale-while-revalidate=${STALE_TTL}`,
              // if the origin returns an error response, serve the stale
              // response for this number of seconds; see:
              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control#stale-if-error
              `stale-if-error=${STALE_TTL}`
            ].join(', ')
          }
        ]
      },
      // don't cache previews
      {
        source: ANY_PATH,
        has: [
          {
            type: 'query',
            key: 'preview',
            value: 'true'
          }
        ],
        headers: [
          {
            key: CACHE_CONTROL,
            value: 'no-store, must-revalidate'
          }
        ]
      }
    ]
  },
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