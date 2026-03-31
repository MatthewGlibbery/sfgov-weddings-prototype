import { ALL_FONTS } from '@/components/server/GoogleFonts'
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import { classed } from '@/design-system'

const StyledBody = classed(
  'body',
  'font-body text-body text-black bg-white m-0 p-0',
  ALL_FONTS.map((font) => font.variable).join(' ')
)

const Document = (props: DocumentProps) => {
  // eslint-disable-next-line no-process-env
  const gitHash = process.env.NEXT_PUBLIC_GIT_HASH || 'unknown'

  return (
    <Html>
      <Head>
        <link rel="icon" href="/icon.ico" />
        <meta name="githash" content={gitHash} />
      </Head>
      <StyledBody>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <Main />
        <NextScript />
      </StyledBody>
    </Html>
  )
}

export default Document
