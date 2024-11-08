import { NextResponse, NextRequest } from 'next/server'

import { middleware } from './middleware'
import nextConfig from './next.config'

describe('Middleware', () => {
  const nextSpy = jest.spyOn(NextResponse, 'next')
  const redirectSpy = jest.spyOn(NextResponse, 'redirect')

  afterEach(() => {
    nextSpy.mockReset()
    redirectSpy.mockReset()
  })

  it('should not perform a redirect for internal next resources', async () => {
    const req = new NextRequest(
      'http://test.url/_next/static/media/83d7d13e2307bc53-s.p.woff2'
    )
    await middleware(req)

    expect(nextSpy).toHaveBeenCalledTimes(1)
    expect(redirectSpy).not.toHaveBeenCalled()
  })

  it.each([200, 404, 500])(
    'should not redirect on status code %i',
    async (code) => {
      const req = new NextRequest('http://test.url/not-a-redirected-source')
      fetchMock.mockResponse('Error, do not pass go', {
        status: code,
        statusText: 'ok'
      })

      await middleware(req)

      expect(nextSpy).toHaveBeenCalledTimes(1)
      expect(redirectSpy).not.toHaveBeenCalled()
    }
  )

  it('should handle an empty Location response', async () => {
    const req = new NextRequest('http://test.url/redirect-no-location')
    fetchMock.mockResponse('', {
      status: 301,
      statusText: 'ok'
    })

    await middleware(req)

    expect(nextSpy).toHaveBeenCalledTimes(1)
    expect(redirectSpy).not.toHaveBeenCalled()
  })

  it('should short circuit looping redirects for the same resource', async () => {
    const req = new NextRequest('http://test.url/loopy-redirect')
    fetchMock.mockResponse('', {
      status: 301,
      statusText: 'ok',
      headers: { location: '/loopy-redirect/' }
    })

    await middleware(req)

    expect(nextSpy).toHaveBeenCalledTimes(1)
    expect(redirectSpy).not.toHaveBeenCalled()
  })

  it.each([
    [301, 308],
    [302, 307],
    [307, 307],
    [308, 308]
  ])(
    'should return a redirect response on a %i with an appropriate response code',
    async (code, expectedCode) => {
      const req = new NextRequest('http://test.url/redirect-me')
      fetchMock.mockResponse('', {
        counter: 1,
        status: code,
        statusText: 'ok',
        headers: { location: '/to-the-new-place/' }
      })

      const resp = await middleware(req)

      expect(nextSpy).not.toHaveBeenCalled()
      expect(redirectSpy).toHaveBeenCalled()
      expect(resp.status).toEqual(expectedCode)
      expect(resp.headers.get('location')).toEqual(
        'http://test.url/to-the-new-place/'
      )
    }
  )

  it('should preserve the locale on redirect', async () => {
    const req = new NextRequest('http://test.url/es/redirect-me', {
      nextConfig
    })
    fetchMock.mockResponse('', {
      counter: 1,
      status: 301,
      statusText: 'ok',
      headers: { location: '/to-the-new-place/' }
    })

    const resp = await middleware(req)

    expect(nextSpy).not.toHaveBeenCalled()
    expect(redirectSpy).toHaveBeenCalled()
    expect(resp.headers.get('location')).toEqual(
      'http://test.url/es/to-the-new-place/'
    )
  })

  it('should remove/exclude en locale on redirect', async () => {
    const req = new NextRequest('http://test.url/en/redirect-me', {
      nextConfig
    })
    fetchMock.mockResponse('', {
      counter: 1,
      status: 301,
      statusText: 'ok',
      headers: { location: '/to-the-new-place/' }
    })

    const resp = await middleware(req)

    expect(nextSpy).not.toHaveBeenCalled()
    expect(redirectSpy).toHaveBeenCalled()
    expect(resp.headers.get('location')).toEqual(
      'http://test.url/to-the-new-place/'
    )
  })

  it('redirects with absolute URLs appropriately', async () => {
    const req = new NextRequest('http://test.url/redirect-me')
    const absUrl = 'https://www.thisisatest.com/with/path'
    fetchMock.mockResponse('', {
      counter: 1,
      status: 301,
      statusText: 'ok',
      headers: { location: absUrl }
    })

    const resp = await middleware(req)

    expect(nextSpy).not.toHaveBeenCalled()
    expect(redirectSpy).toHaveBeenCalled()
    expect(resp.headers.get('location')).toEqual(absUrl)
  })
})
