import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

// @ts-expect-error wtf
export default appWithTranslation(MyApp)
