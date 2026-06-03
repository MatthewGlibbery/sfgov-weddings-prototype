import Head from 'next/head'
import type { ReactNode } from 'react'
import { MainContent } from '@/design-system'
import { SiteFooter, SiteHeader } from '@/components'
import { DebugPanel } from './DebugPanel'

export type PrototypeLayoutProps = {
  title?: string
  children?: ReactNode
}

/**
 * Lightweight page shell for the wedding-booking prototype. Wraps content in
 * the standard SF.gov header / main / footer without any of the CMS plumbing
 * that PageWrapper performs (no alerts fetch, no feedback widget, etc.).
 */
export function PrototypeLayout({
  title = 'Book a City Hall wedding',
  children
}: PrototypeLayoutProps) {
  return (
    <>
      <Head>
        <title>{`${title} | SF.gov`}</title>
      </Head>
      <SiteHeader />
      <MainContent>{children}</MainContent>
      <SiteFooter />
      <DebugPanel />
    </>
  )
}
