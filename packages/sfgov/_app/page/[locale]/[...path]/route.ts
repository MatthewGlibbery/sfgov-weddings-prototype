import { ContentAPI } from '@/lib/api'
import { NextResponse } from 'next/server'
import type { PageData } from '@/types'

type RequestContext = {
  params: {
    locale: string
    path: string[]
  }
}

const api = new ContentAPI()

export async function GET (request: Request, context: RequestContext) {
  const { locale: possiblePageId, path } = context.params
  if (path.length === 0 && isNumeric(possiblePageId)) {
    const page = await api.loadJSON<PageData>(`page/${possiblePageId}/`)
    const { locale } = page.meta
    return locale === 'en'
      ? NextResponse.redirect(`/${page.meta.html_url}`)
      : NextResponse.redirect(`/${locale}/${page.meta.html_url}`)
  }
}

function isNumeric (value: string): boolean {
  return !isNaN(parseInt(value))
}
