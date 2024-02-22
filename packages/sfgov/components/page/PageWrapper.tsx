import Head from 'next/head'
import type { ReactNode } from 'react'
import {
  ErrorBoundary,
  ErrorFallbackReport,
  SiteFooter,
  SiteHeader
} from '@/components'

export type PageWrapperProps = {
  title?: string
  children?: ReactNode
}

export const PageWrapper = ({ children, title }: PageWrapperProps) => {
  return (
    <>
      <Head>
        {/* FIXME: page title should live somewhere more obvious */}
        <title>{title ? `${title} | SF.gov` : 'SF.gov'}</title>
      </Head>
      <SiteHeader />
      <ErrorBoundary FallbackComponent={ErrorFallbackReport}>
        {children}
      </ErrorBoundary>
      <SiteFooter />
    </>
  )
}
