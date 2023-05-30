import { BodyText } from '@/design-system'
import { ServerStylesheet } from '@/components'
import { PropsDebug } from '@/components/server/PropsDebug'
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

const Document = (props: DocumentProps) => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <ServerStylesheet />
      </Head>
      <BodyText as='body' css={{ color: '$slateL4', m: 0 }}>
        <Main />
        <NextScript />
        {props.isDevelopment
          ? <PropsDebug data={props.__NEXT_DATA__?.props?.pageProps} />
          : null}
      </BodyText>
    </Html>
  )
}

export default Document
