'use client'

import Head from 'next/head'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  ErrorBoundary,
  ErrorFallbackReport,
  SiteFooter,
  SiteHeader,
  SitewideAlert
} from '@/components'
import { MainContent } from '@/design-system'
import { useRouter } from 'next/router'
import type { AlertData } from '@/types'
import { Feedback } from '../Feedback'

type PageWrapperMetaProps = {
  type?: string
  description?: string
  locale?: string
}

export type PageWrapperProps = {
  title?: string
  meta?: PageWrapperMetaProps
  children?: ReactNode
  className?: string
}

export type TypeAlertData = {
  items?: AlertData[]
}

export const PageWrapper = ({
  children,
  title,
  meta,
  className
}: PageWrapperProps) => {
  const router = useRouter()
  const { locale } = router
  const hasFetched = useRef(false)
  const [alertData, setAlertData] = useState<TypeAlertData | null>(null)
  const [prevLocale, setPrevLocale] = useState(locale)

  const isSearchPage = router.pathname === '/search'
  const metaKeys = ['type', 'locale', 'description'] // the meta things we care about
  const excludePaths = ['/500']

  // istanbul ignore next
  useEffect(() => {
    if (prevLocale !== locale) {
      hasFetched.current = false
      setPrevLocale(locale)
    }
    if (!hasFetched.current) {
      const loadData = async () => {
        const res = await fetch('/api/alerts')
        const data = await res.json().catch(() => ({}))
        const filteredData = {
          ...data,
          items: data?.items?.filter((item: AlertData) => item.lang === locale)
        }
        setAlertData(filteredData)
        hasFetched.current = true
      }

      loadData()
    }
  }, [alertData, locale, prevLocale])

  return (
    <>
      <Head>
        {/* FIXME: page title should live somewhere more obvious */}
        <title>{title ? `${title} | SF.gov` : 'SF.gov'}</title>
        {meta
          ? Object.entries(meta)
              .filter(([key]) => metaKeys.includes(key))
              .map(([key, value]) =>
                value ? (
                  <meta
                    key={key}
                    name={key}
                    content={value}
                    data-testid={`meta-test-${key}`}
                  />
                ) : null
              )
          : null}
        {isSearchPage ? (
          <meta
            name="robots"
            content="noindex, follow"
            data-testid="meta-robots"
          />
        ) : null}
        <meta
          name="google-site-verification"
          content="8etBKQyyqG3GiT-xNuZVwr27VA0zgbwiyVFTLJBv_jE"
          data-testid="meta-google-site-verification"
        />
      </Head>
      {alertData?.items?.length ? (
        <SitewideAlert {...alertData?.items[0]} />
      ) : null}
      <SiteHeader />
      <MainContent className={className || 'mt-20'}>
        <ErrorBoundary FallbackComponent={ErrorFallbackReport}>
          {children}
        </ErrorBoundary>
      </MainContent>
      <SiteFooter />
      {(!excludePaths.includes(router.pathname) && meta?.type) !== 'sf.Form' ? (
        <Feedback />
      ) : null}
    </>
  )
}
