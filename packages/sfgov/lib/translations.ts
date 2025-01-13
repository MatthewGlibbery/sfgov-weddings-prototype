import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * This function asynchronously loads server-side translations and implemenents
 * next's `GetServerSideProps` interface. If you don't have a function to get
 * other server side props you can export this in your route as
 * `getServerSideProps`, after which you'll be able to access translations via
 * the `useTranslation()` hook:
 *
 * ```ts
 * import {
 *   getServerSideTranslations,
 *   useTranslation
 * } from '@/lib/translations'
 *
 * export const getServerSideProps = getServerSideTranslations
 *
 * export default function () {
 *   const { t } = useTranslation()
 *   return <div>{t('hello', { defaultText: 'Hello, world!' })}</div>
 * }
 * ```
 *
 * @see withServerSideTranslations if you have custom server-side props to add
 */
export async function getServerSideTranslations(
  context: GetServerSidePropsContext
) {
  return serverSideTranslations(
    context.locale as string,
    ['translation', 'common'],
    nextI18NextConfig,
    nextI18NextConfig.i18n.locales
  )
}

/**
 * This is a decorator for getServerSideProps functions that will add
 * server-side translations after the props fetched by the wrapped function:
 *
 * ```ts
 * import { withServerSideTranslations } from '@/lib/translations'
 * export const getServerSideProps = withServerSideTranslations(
 *   async (context) => {
 *     return { } // your props here
 *   }
 * )
 * ```
 *
 * Note: this function *cannot be used* in client contexts.
 *
 * @see getServerSideTranslations if you need translations but don't have custom
 * props to add
 */
export function withServerSideTranslations<Props extends object = object>(
  getServerSideProps: GetServerSideProps<Props>
): GetServerSideProps {
  return async (context) => {
    const propsResult = await getServerSideProps(context)
    /**
     * We only need to add translations if we're rendering a page with props, so
     * we need to make sure that the props "result" has props; if it doesn't,
     * it's either a redirect or a 404 and we can skip loading translations.
     *
     * This means that the error routes will need to load translations directly!
     */
    if ('props' in propsResult) {
      const { props, ...rest } = propsResult
      const translations = await getServerSideTranslations(context)
      return {
        props: { ...props, ...translations },
        ...rest
      }
    }
    return propsResult
  }
}
