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

export async function GET (request: Request, context: RequestContext) {
  const { locale } = context.params
  const path = context.params.path.join('/')
  const redirectUri = locale === defaultLocale
    ? `/page/${path}/`
    : locales.includes(locale)
      ? `/page/${locale}/${path}/`
      : undefined
  if (redirectUri) {
    console.warn('redirecting to', redirectUri)
    return NextResponse.redirect(redirectUri)
  }
  console.warn('no redirect')
}
