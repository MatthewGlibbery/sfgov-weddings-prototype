import i18next from 'i18next'
import type { TFunction, UseTranslation } from 'next-i18next'

/**
 * Export a mock of the t() function so that we can override the implementation
 * in tests without having to mock useTranslation()'s return value. The default
 * implementation returns either the defaultValue option or the key as a
 * fallback.
 */
export const mockT = jest.fn(((key: string, options) => {
  // https://www.i18next.com/translation-function/essentials#passing-a-default-value
  if (typeof options === 'string') {
    return options || key
  } else if (options && typeof options === 'object') {
    return options.defaultValue || key
  }
  return key
}) as TFunction)

export const mockI18n = jest.mocked(i18next)

/**
 * Mock useTranslation() so that we can assert that it's been called and, if
 * need be, mock the implementation of other methods on a case-by-case basis
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useTranslation = jest.fn(((ns, options) => {
  return {
    t: mockT as unknown as TFunction,
    i18n: mockI18n as typeof i18next,
    ready: true
  }
}) as UseTranslation)
