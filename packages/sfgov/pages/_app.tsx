import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ALL_FONTS } from '@/components/server/GoogleFonts'
import '../../design-system/css/main.css'
import { ErrorBoundary, ErrorFallbackReport } from '@/components'
import { GoogleTagManager } from '@next/third-parties/google'

import nextI18nextConfig from '../next-i18next.config'
import { BlockType, PageData } from '@/types'
import { ComponentProps, useEffect, useRef } from 'react'
import { AGENCY_PAGE_TYPE } from '@/constants'
import { useRouter } from 'next/router'

type PageWithPartnerAgencies = PageData & {
  primary_agency?: PageData
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
  const prevPagePath = useRef<string | undefined>(undefined)
  const router = useRouter()
  const isFirstLoad = useRef(true)

  // have to watch the pathname and pageData change here so we know
  // when to update the datalayer, otherwise datalayer will be stale
  // when navigating the site using the next/link Links
  useEffect(() => {
    function getPageDataLayer(pageData: PageWithPartnerAgencies) {
      const base = {
        page_referrer: prevPagePath.current,
        page_location: router.asPath,
        page_title: document.title,
        contentType: null,
        locale: null,
        primaryAgency: null,
        partnerAgencies: null
      }
      if (!pageData) return base
      const { type: contentType, locale } = pageData.meta || {}
      const primaryAgency = pageData.primary_agency
        ? pageData.primary_agency.title
        : undefined
      const partnerAgencies = []
      pageData.partner_agencies
        ?.filter((item) => item.value !== null)
        .forEach((item) => {
          partnerAgencies.push(item.value.title)
        })
      // add agency itself if this is an Agency page
      if (contentType === AGENCY_PAGE_TYPE) {
        partnerAgencies.push(pageData.title)
      }
      return {
        ...base,
        contentType,
        locale,
        primaryAgency,
        // interesting thing here
        // if we just pass the partnerAgencies as an array to gtm
        // the value passed to gtm won't be updated (objects are cached?)
        // but if we serialize to a string, we'll get the updated values
        partnerAgencies: partnerAgencies.join(',')
      }
    }
    const pageDataLayer = getPageDataLayer(pageData)
    if (isFirstLoad.current) {
      window.dataLayer?.push(pageDataLayer)
      isFirstLoad.current = false
    } else {
      window.dataLayer?.push({
        event: 'routeChangePageView',
        ...pageDataLayer
      })
    }
    prevPagePath.current = router.asPath
  }, [pageData, router.asPath])

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
