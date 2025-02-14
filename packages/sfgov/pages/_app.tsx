import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ALL_FONTS } from '@/components/server/GoogleFonts'
import '../../design-system/css/main.css'
import { ErrorBoundary, ErrorFallbackReport } from '@/components'
import { GoogleTagManager } from '@next/third-parties/google'

import nextI18nextConfig from '../next-i18next.config'
import { BlockType, PageData, TypeAgencyPageBlock } from '@/types'
import { ComponentProps, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type PageWithPartnerAgencies = PageData & {
  partner_agencies?: BlockType<'agency', PageData>[]
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const pageData: PageWithPartnerAgencies = pageProps.page
  // env is available here via controller
  // see packages/sfgov/lib/controller.tsx
  const env = pageProps.env || {}
  const gtmProps: ComponentProps<typeof GoogleTagManager> | null =
    env.NEXT_PUBLIC_GTM_CONTAINER_ID &&
    env.NEXT_PUBLIC_GTM_ENV_AUTH &&
    env.NEXT_PUBLIC_GTM_ENV_PREVIEW
      ? {
          gtmId: env.NEXT_PUBLIC_GTM_CONTAINER_ID,
          auth: env.NEXT_PUBLIC_GTM_ENV_AUTH,
          preview: env.NEXT_PUBLIC_GTM_ENV_PREVIEW
        }
      : null
  const pathname = usePathname()

  // have to watch the pathname change here so we know to
  // update the datalayer, otherwise datalayer will be stale
  // when navigating the site using the next/link Links
  useEffect(() => {
    if (window?.dataLayer && pageData) {
      const { type: contentType, locale } = pageData.meta || {}
      const partnerAgencies =
        pageData.partner_agencies?.map((item) => {
          return {
            slug: item.value.meta.slug
          }
        }) || []
      window.dataLayer.push({ contentType, locale, partnerAgencies })
    }
  }, [pathname, pageData])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackReport}>
      {gtmProps ? <GoogleTagManager {...gtmProps} /> : null}
      <Component {...pageProps} />
      <div
        id="keep-me-fonts"
        className={ALL_FONTS.map((font) => font.className).join(' ')}
      />
    </ErrorBoundary>
  )
}

export default appWithTranslation(MyApp, nextI18nextConfig)
