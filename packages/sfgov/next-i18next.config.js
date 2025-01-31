/* eslint-disable no-process-env */
// allows for loading stuff from the server
// https://github.com/i18next/i18next-http-backend
const HttpBackend = require('i18next-http-backend/cjs')
// allows us to handle multiple locales from 1 payload
// https://github.com/i18next/i18next-multiload-backend-adapter
const MultiloadBackendAdapter = require('i18next-multiload-backend-adapter/cjs')

/**
 * NB: we can't "require" the env var here because:
 * - We need to be able to build the site without env vars
 * - In tests, next/jest requires its config (which requires this file)
 *   before jest.setup.js runs, preventing us from mocking `process.env`
 */
const baseURL = process.env.NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL
if (!baseURL) {
  console.error('Missing $NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL; no translations will be loaded')
}

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  debug: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'zh-hant', 'fil', 'vi-vn'],
  },
  ns: 'common',
  lowerCaseLng: true,
  backend: baseURL ? {
    backend: HttpBackend,
    backendOption: {
      loadPath: `${baseURL}/cms.InlineDisplayText`,
      parse: wrapTryCatch(parseInlineDisplayText, 'parseInlineDisplayText() threw:')
    }
  } : undefined,
  // Can use chained backends + caching later if we want
  use: [MultiloadBackendAdapter],
  partialBundledLanguages: true
}

/**
 * @see
 * https://github.com/i18next/i18next-http-backend/blob/647da65b80c816ca73c26c5bc6d1f60431ffc6c5/lib/index.js#L98
 * @param {string} data The HttpBackend passes us the raw string, not a parsed
 * JSON response
 * @param {string[]} languages The list of languages, as specified in
 * i18n.locales above
 * @param {string[]} namespaces The list of namespaces that are being loaded.
 * This _should_ be one or more of the values in the config's ns option.
 */
function parseInlineDisplayText(data, languages, namespaces) {
  /**
   * @type {Array<{
   *  slug: string
   *  text: string
   *  locale: number
   *  lang?: string
   * }>}
   */
  const strings = JSON.parse(data)

  console.log(
    'parse InlineDisplayText for %d strings; languages: %s, namespaces: %s',
    strings.length,
    JSON.stringify(languages),
    JSON.stringify(namespaces)
  )

  const ns = namespaces[0]
  // FIXME: get language codes from the API rather than mapping these
  const localesMap = {
    1: 'en',
    2: 'es',
    3: 'zh-hant',
    4: 'fil',
    5: 'vi-vn'
  }

  /** @type {import('i18next').Resource} */
  const resources = {}
  for (const lang of languages) {
    resources[lang] = { [ns]: {} }
  }

  for (const string of strings) {
    const lang = string.lang || localesMap[string.locale]
    if (lang in resources) {
      resources[lang][ns][string.slug] = string.text
    } else {
      console.warn('Unexpected lang: %s for string:', lang, string)
    }
  }

  return resources
}

/**
 * Wrap the function in a try/catch that logs the error to the console before
 * re-throwing.
 * @param {(...) => any} fn
 * @param {string} message
 */
function wrapTryCatch(fn, message) {
  return (...args) => {
    try {
      return fn(...args)
    } catch (error) {
      console.error(message, error)
      throw error
    }
  }
}