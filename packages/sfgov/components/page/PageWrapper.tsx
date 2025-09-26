'use client'

import Head from 'next/head'
import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  ErrorBoundary,
  ErrorFallbackReport,
  SiteFooter,
  SiteHeader,
  SitewideAlert
} from '@/components'
import { MainContent } from '@/design-system'
import { useRouter } from 'next/router'
import { AlertData } from '@/types'
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
}

export type TypeAlertData = {
  items?: AlertData[]
}

export const PageWrapper = ({ children, title, meta }: PageWrapperProps) => {
  const router = useRouter()
  const hasFetched = useRef(false)
  const [alertData, setAlertData] = useState<TypeAlertData | null>(null)

  const isSearchPage = router.pathname === '/search'
  const metaKeys = ['type', 'locale', 'description'] // the meta things we care about
  const excludePaths = ['/500']

  // istanbul ignore next
  useEffect(() => {
    if (!hasFetched.current) {
      const loadData = async () => {
        const res = await fetch('/api/alerts')
        const data = await res.json().catch(() => ({}))
        setAlertData(data)
        hasFetched.current = true
      }

      loadData()
    }
  }, [alertData])

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
      <MainContent>
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
