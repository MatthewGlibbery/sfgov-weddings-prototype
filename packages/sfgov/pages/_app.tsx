import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ALL_FONTS } from '@/components/server/GoogleFonts'
import '../../design-system/css/main.css'
import { ErrorBoundary, ErrorFallbackReport } from '@/components'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallbackReport}>
    <Component {...pageProps} />
    <div
      id="keep-me-fonts"
      className={ALL_FONTS.map((font) => font.className).join(' ')}
    />
  </ErrorBoundary>
)

export default appWithTranslation(MyApp)
