import Head from 'next/head'
import type { ReactNode } from 'react'
import { SiteFooter } from '../SiteFooter'
import { SiteHeader } from '../SiteHeader'

export type PageWrapperProps = {
  title?: string
  children?: ReactNode
}

export function PageWrapper ({ children, title }: PageWrapperProps) {
  return (
    <>
      <Head>
        {/* FIXME: page title should live somewhere more obvious */}
        <title>{title ? `${title} | SF.gov` : 'SF.gov'}</title>
      </Head>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
