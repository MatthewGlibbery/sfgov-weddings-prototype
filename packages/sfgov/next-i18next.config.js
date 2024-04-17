/** @type {import('next').NextConfig} */

// This one allows for loading stuff from the server
// https://github.com/i18next/i18next-http-backend
const HttpBackend = require('i18next-http-backend/cjs')
// This allows us to handle multiple locales from 1 payload
// https://github.com/i18next/i18next-multiload-backend-adapter
const MultiloadBackendAdapter = require('i18next-multiload-backend-adapter/cjs')

module.exports = {
  debug: true,
  serializeConfig: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'zh', 'fil']
  },
  backend: {
    backend: HttpBackend,
    backendOption: {
      loadPath: process.env.TRANSLATIONS_STATIC_STRINGS_URL,
      parse: (data) => {
        // Note 1:
        // Somewhat fraught with peril as this could potentially get out of sync
        // with the translations server. We can ask for this from the server
        // but that requires making this parse async (or better yet, making the
        // i18n load locales dynamically and using the languages var passed to
        // this function) but it requires a further unwinding of values being
        // setup and referenced through out the code.
        // TODO: Make localesMap dynamic and pull from server
        // Note 2:
        // "zh" for Chinese is okay here, but if we use dynamic locales from the
        // server, we use zh-hant as the code.. so we'll need to reconcile that
        // as this code base uses "zh" and relies on that.
        const localesMap = {
          1: 'en',
          2: 'es',
          3: 'zh',
          4: 'fil'
        }
        const translationStrings = {}

        Object.values(localesMap).forEach((i) => {
          translationStrings[i] = { common: {} }
        })

        JSON.parse(data).forEach((i) => {
          const loc = localesMap[i.locale.split('/').pop()]
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
