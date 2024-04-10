import { ALL_FONTS } from '@/components/server/GoogleFonts'
import { PropsDebug } from '@/components/server/PropsDebug'
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import { classed } from '@/design-system'
import packages from '../package.json'
import Script from 'next/script'

const { dependencies } = packages

const StyledBody = classed(
  'body',
  'font-body text-body text-black bg-white m-0 p-0',
  ALL_FONTS.map((font) => font.variable).join(' ')
)

const Document = (props: DocumentProps) => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <Script
          src={`https://unpkg.com/formiojs@${dependencies.formiojs}/dist/formio.full.min.js`}
          strategy="beforeInteractive"
        />
        <Script
          src={`https://unpkg.com/formio-sfds@${dependencies['formio-sfds']}/dist/formio-sfds.standalone.js`}
          strategy="beforeInteractive"
        />
      </Head>
      <StyledBody>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <Main />
        <NextScript />
        {props.isDevelopment ? (
          <PropsDebug data={props.__NEXT_DATA__?.props?.pageProps} />
        ) : null}
      </StyledBody>
    </Html>
  )
}

export default Document
