import Head from 'next/head'
import SiteFooter from '../organism/SiteFooter'
import SiteHeader from '../organism/SiteHeader'

export type PageWrapperProps = {
  title?: string
  children?: JSX.Element | JSX.Element[]
}

export default function PageWrapper ({ children, title }: PageWrapperProps) {
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
