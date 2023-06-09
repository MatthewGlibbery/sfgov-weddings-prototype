import { NextResponse } from 'next/server'
import { i18n } from '@/next-i18next.config'

const { defaultLocale = 'en' } = i18n || {}
const locales = i18n?.locales || [defaultLocale]

type RequestContext = {
  params: {
    locale: string
    path: string[]
  }
}

export async function GET(request: Request, context: RequestContext) {
  const { locale } = context.params
  const path = context.params.path.join('/')
  let redirectUri
  if (locale === defaultLocale) {
    redirectUri = `/page/${path}/`
  } else if (locales.includes(locale)) {
    redirectUri = `/page/${locale}/${path}/`
  }
  if (redirectUri) {
    console.warn('redirecting to', redirectUri)
    return NextResponse.redirect(redirectUri)
  }
  console.warn('no redirect')
}
