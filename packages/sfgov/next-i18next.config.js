/* eslint-disable no-process-env */
// allows for loading stuff from the server
// https://github.com/i18next/i18next-http-backend
const HttpBackend = require('i18next-http-backend/cjs')
// allows us to handle multiple locales from 1 payload
// https://github.com/i18next/i18next-multiload-backend-adapter
const MultiloadBackendAdapter = require('i18next-multiload-backend-adapter/cjs')

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  debug: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'zh-hant', 'fil']
  },
  lowerCaseLng: true,
  backend: {
    backend: HttpBackend,
    backendOption: {
      /**
       * NB: we can't "require" the env var here because:
       * - We need to be able to build the site without env vars
       * - In tests, next/jest requires its config (which requires this file)
       *   before jest.setup.js runs, preventing us from mocking `process.env`
       */
      loadPath: `${process.env.NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL}/cms.InlineDisplayText`,
    
      parse: function parse(data) { 
        // Note 1:
        // Somewhat fraught with peril as this could potentially get out of sync
        // with the translations server. We can ask for this from the server
        // but that requires making this parse async (or better yet, making the
        // i18n load locales dynamically and using the languages var passed to
        // this function) but it requires a further unwinding of values being
        // setup and referenced through out the code.
        // TODO: Make localesMap dynamic and pull from server
        const localesMap = {
          1: 'en',
          2: 'es',
          3: 'zh-hant',
          4: 'fil'
        }
        const translationStrings = {}

        Object.values(localesMap).forEach((i) => {
          translationStrings[i] = { common: {} }
        })

        JSON.parse(data).forEach((i) => {
          const loc = localesMap[i.locale]
          translationStrings[loc].common[i.slug] = i.text
        })

        return translationStrings
      }
    }
  },
  // Can use chained backends + caching later if we want
  use: [MultiloadBackendAdapter],
  partialBundledLanguages: true
}
