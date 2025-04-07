'use client'

import Head from 'next/head'
import { ReactNode } from 'react'
import {
  ErrorBoundary,
  ErrorFallbackReport,
  SiteFooter,
  SiteHeader
} from '@/components'
import { MainContent } from '@/design-system'

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

export const PageWrapper = ({ children, title, meta }: PageWrapperProps) => {
  const metaKeys = ['type', 'locale', 'description'] // the meta things we care about
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
      </Head>
      <SiteHeader />
      <MainContent>
        <ErrorBoundary FallbackComponent={ErrorFallbackReport}>
          {children}
        </ErrorBoundary>
      </MainContent>
      <SiteFooter />
    </>
  )
}
