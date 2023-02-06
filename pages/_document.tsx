import { Box, Container, Monospace, TitleSm } from '@sfgov/design-system/dist/react'
import { BodyText } from '@sfgov/design-system/react'
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import ServerStylesheet from '@/components/ServerStylesheet'

export default function Document (props: DocumentProps) {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <ServerStylesheet />
      </Head>
      <BodyText as='body' css={{
        color: '$slateL4',
        m: 0
      }}>
        <Main />
        <NextScript />
        {props.isDevelopment ? <PagePropsDebug {...props} /> : null}
      </BodyText>
    </Html>
  )
}

function PagePropsDebug (props: DocumentProps) {
  const id = 'props-debug'
  const pageProps = props.__NEXT_DATA__?.props?.pageProps
  return pageProps && ((
    <Box css={{ color: '$white', bg: '$greyDark', py: 40 }} id={id}>
      <Container css={{ overflowX: 'auto' }}>
        <details open>
          <TitleSm as='summary' css={{ mb: 20 }}>Page props</TitleSm>
          <Monospace as='pre'>
            {JSON.stringify(pageProps, null, 2)}
          </Monospace>
        </details>
      </Container>
    </Box>
  ) || null)
}
