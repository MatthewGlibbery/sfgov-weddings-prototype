import { NextRequest, NextResponse } from 'next/server'

/**
 * Paths in this list will serve rewrites (proxy) to the API server.
 */
const API_REWRITE_PATHS = ['/sitemap.xml']

export async function middleware(request: NextRequest) {
  const { API_BASE_URL } = process.env
  const reqUrl = request.nextUrl
  const path = reqUrl.pathname

  // Skip any internal routing next does
  if (path.startsWith('/_next/')) {
    return NextResponse.next()
  } else if (path.startsWith('/weddings')) {
    // Self-contained prototype — bypass CMS redirect lookup.
    return NextResponse.next()
  } else if (API_REWRITE_PATHS.includes(path)) {
    return NextResponse.rewrite(new URL(path, API_BASE_URL).href)
  }

  // Skip lookup if the page is a preview
  if (reqUrl.searchParams.get('preview')) {
    return NextResponse.next()
  }

  const resp = await fetch(new URL(path, API_BASE_URL).href, {
    redirect: 'manual'
  })

  // Not a redirect, continue on
  if (!isRedirectStatus(resp.status)) {
    if (isFilePath(path)) {
      return fileRewrite(path)
    }

    return NextResponse.next()
  }

  // The platform has other logic to do redirects, which appends a slash in
  // certain situations. See django.middleware.common.CommonMiddleware,
  // APPEND_SLASH for more infomation.
  //
  // In the event that the requested resource is redirected to the same path
  // due to the enabled  middleware, then short circuit it and process for file
  // path or continue as normal.
  const rawRedirLoc = resp.headers.get('location')
  // Narrowing for TS, blast you red squigglies
  if (!rawRedirLoc) {
    return NextResponse.next()
  }

  if (rawRedirLoc === `${path}/`) {
    if (isFilePath(path)) {
      return fileRewrite(path)
    }

    return NextResponse.next()
  }

  // Consolidate redirect codes to using the new fangled ones
  let redirCode = 308
  if (resp.status === 302 || resp.status === 307) {
    redirCode = 307
  }
  const redirLoc = new URL(rawRedirLoc, `${reqUrl.protocol}//${reqUrl.host}`)

  // Redirects are lossy and don't preserve the locale, so we add it back in
  redirLoc.pathname = `${
    reqUrl.locale && reqUrl.locale !== 'en' ? `/${reqUrl.locale}` : ''
  }${redirLoc.pathname}`

  if (reqUrl.search) {
    redirLoc.search = reqUrl.search
  }

  return NextResponse.redirect(redirLoc, redirCode)
}

const FILE_PATH_PATTERNS = [
  '/sites/default/files/',
  '/file/',
  '/media/',
  '/image/'
]

function isFilePath(path: string): boolean {
  return FILE_PATH_PATTERNS.some((pattern) => path.startsWith(pattern))
}

async function fileRewrite(path: string) {
  const { API_BASE_URL } = process.env
  const apiUrl = new URL('/api/drupal/media/find', API_BASE_URL)
  apiUrl.searchParams.set('path', path)

  const find = await fetch(apiUrl.href, { redirect: 'manual' })

  console.log('find file: got %d status from %s', find.status, apiUrl.href)
  if (isRedirectStatus(find.status)) {
    // if we get a redirect, stream the URL indicated by the location header
    let mediaUrl = find.headers.get('location')!
    if (!mediaUrl.includes('://')) {
      mediaUrl = new URL(mediaUrl, API_BASE_URL).href
    }
    console.log('find file: streaming media URL: %s', mediaUrl)
    return NextResponse.rewrite(mediaUrl)
  } else {
    // otherwise, just pass on the response from the API (404, 500, etc.) so
    // it's easier to tell what happened
    console.warn('find file: got non-redirect status %s', find.status)
    return new NextResponse(find.body, {
      status: find.status,
      headers: find.headers
    })
  }
}

function isRedirectStatus(status: number) {
  return [301, 302, 307, 308].includes(status)
}
