import { NextResponse } from 'next/server'

type RequestContext = {
  params: {
    path: string[]
  }
}

export async function GET(request: Request, context: RequestContext) {
  const path = context.params.path.join('/')
  const locale = 'en'
  console.warn('derp')
  return NextResponse.rewrite(`/page/${locale}/${path}/`)
}
