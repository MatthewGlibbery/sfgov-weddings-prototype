import clsx from 'clsx'
import { SansFont, ALL_FONTS } from '@/components/server/GoogleFonts'
import { PropsDebug } from '@/components/server/PropsDebug'
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

const Document = (props: DocumentProps) => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={clsx(
        'font-body text-body text-black m-0',
        ALL_FONTS.map(font => font.variable)
      )}>
        <Main />
        <NextScript />
        {props.isDevelopment
          ? (
          <PropsDebug data={props.__NEXT_DATA__?.props?.pageProps} />
            )
          : null}
      </body>
    </Html>
  )
}

export default Document
