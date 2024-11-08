import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip any internal routing next does
  if (request.nextUrl.pathname.includes('_next')) {
    return NextResponse.next()
  }

  const reqUrl = request.nextUrl
  const resp = await fetch(
    new URL(reqUrl.pathname, process.env.API_BASE_URL).href,
    {
      redirect: 'manual'
    }
  )

  // Not a redirect, continue on
  if (![301, 302, 307, 308].includes(resp.status)) {
    return NextResponse.next()
  }

  const rawRedirLoc = resp.headers.get('location')
  // Narrowing for TS, blast you red squigglies
  if (!rawRedirLoc) {
    return NextResponse.next()
  }

  // The platform has other logic to do redirects. In the event that the
  // requested resource is redirected to the same path, then short circuit it
  // and continue to render as normal.
  const redirLoc = new URL(rawRedirLoc, `${reqUrl.protocol}//${reqUrl.host}`)
  if (
    redirLoc.pathname.replace(/\//g, '') === reqUrl.pathname.replace(/\//g, '')
  ) {
    return NextResponse.next()
  }

  // Consolidate redirect codes to using the new fangled ones
  let redirCode = 308
  if (resp.status === 302 || resp.status === 307) {
    redirCode = 307
  }

  // Redirects are lossy and don't preserve the locale, so we add it back in
  redirLoc.pathname = `${
    reqUrl.locale && reqUrl.locale !== 'en' ? `/${reqUrl.locale}` : ''
  }${redirLoc.pathname}`

  return NextResponse.redirect(redirLoc, redirCode)
}
