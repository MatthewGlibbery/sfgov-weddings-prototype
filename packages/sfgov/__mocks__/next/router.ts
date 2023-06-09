import { NextRouter } from 'next/router'
import { i18n } from '../../next.config'

export type MockedRouter = jest.MockedFunction<() => Partial<NextRouter>>

export const useRouter = jest.fn(
  (overrides: Partial<NextRouter>) =>
    ({
      asPath: '/',
      locale: i18n?.defaultLocale,
      locales: i18n?.locales,
      defaultLocale: i18n?.defaultLocale,
      ...overrides
    } as NextRouter)
)
