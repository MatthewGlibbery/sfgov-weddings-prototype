import { withDefaultProps } from '@/lib/utils'
import { createInstance } from 'i18next'
import type { TFunction, UseTranslation } from 'next-i18next'
import * as nextI18next from 'next-i18next'
import { createContext } from 'react'

export const i18n = createInstance({
  lng: 'en',
  initImmediate: true
})

i18n.init()

// export a mock that allows us to hook into t() calls, change their return
// value, and assert that they're called with the expected values
export const t = jest.fn(i18n.getFixedT('en'))

// Mock useTranslation() so that we can override t() with our mock
export const useTranslation = jest.fn((() => {
  return {
    t: t as unknown as TFunction,
    i18n,
    ready: true
  }
}) as UseTranslation)

// overriding the context export here provides our "fixed" i18next instance to
// all of next-i18next's components and higher-order components
export const I18nContext = createContext(i18n)

export const Trans = withDefaultProps(nextI18next.Trans, {
  i18n
})

export const Translation = withDefaultProps(nextI18next.Translation, {
  i18n
})

export { withTranslation, appWithTranslation } from 'next-i18next'
