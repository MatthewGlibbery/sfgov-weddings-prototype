import { NextResponse, NextRequest } from 'next/server'
import mockEnv from 'mocked-env'
import fetchMock from 'jest-fetch-mock'
import { middleware } from './middleware'
import nextConfig from './next.config'

describe('Middleware', () => {
  const MOCK_API_BASE_URL = 'https://api.platform.local'
  let restoreEnv
  const nextSpy = jest.spyOn(NextResponse, 'next')
  const redirectSpy = jest.spyOn(NextResponse, 'redirect')
  const rewriteSpy = jest.spyOn(NextResponse, 'rewrite').mockImplementation(
    (url) =>
      new NextResponse('', {
        headers: {
          'x-rewrite-url': String(url)
        }
      })
  )

  beforeEach(() => {
    restoreEnv = mockEnv({
      API_BASE_URL: MOCK_API_BASE_URL
    })
  })
  afterEach(() => {
    fetchMock.resetMocks()
    nextSpy.mockReset()
    redirectSpy.mockReset()
    rewriteSpy.mockReset()
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
    fetchMock.mockResponseOnce('', {
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
      fetchMock.mockResponseOnce('', {
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
    fetchMock.mockResponseOnce('', {
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
    fetchMock.mockResponseOnce('', {
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
    fetchMock.mockResponseOnce('', {
      status: 301,
      statusText: 'ok',
      headers: { location: absUrl }
    })

    const resp = await middleware(req)

    expect(nextSpy).not.toHaveBeenCalled()
    expect(redirectSpy).toHaveBeenCalled()
    expect(resp.headers.get('location')).toEqual(absUrl)
  })

  describe('Drupal file URLs', () => {
    it.each(['/file/foo', '/sites/default/files/path/to/foo.txt'])(
      'proxies the platform API',
      async (path) => {
        const expectedApiUrl =
          MOCK_API_BASE_URL +
          '/api/drupal/media/find?path=' +
          encodeURIComponent(path)

        const mediaURL = `https://media.local/documents/derp/foo-${randomString()}.txt`
        fetchMock.mockResponseOnce('', {
          status: 302,
          headers: {
            location: mediaURL
          }
        })

        await middleware(new NextRequest('http://test.url' + path))
        expect(fetchMock).toHaveBeenCalledWith(expectedApiUrl, {
          redirect: 'manual'
        })
        expect(rewriteSpy).toHaveBeenCalledWith(mediaURL)
      }
    )

    it('handles relative redirect URIs in the location header', async () => {
      const path = '/file/x'
      const expectedApiUrl =
        MOCK_API_BASE_URL +
        '/api/drupal/media/find?path=' +
        encodeURIComponent(path)
      const mediaURI = `/documents/derp/foo-${randomString()}.txt`

      fetchMock.mockResponseOnce('', {
        status: 302,
        headers: {
          location: mediaURI
        }
      })

      await middleware(new NextRequest('http://test.url' + path))
      expect(fetchMock).toHaveBeenCalledWith(expectedApiUrl, {
        redirect: 'manual'
      })
      expect(rewriteSpy).toHaveBeenCalledWith(MOCK_API_BASE_URL + mediaURI)
    })

    it('proxies non-redirects from the API', async () => {
      fetchMock.mockResponseOnce('Not found', {
        status: 404
      })
      const res = await middleware(
        new NextRequest('http://test.url/file/missing')
      )
      expect(rewriteSpy).not.toHaveBeenCalled()
      expect(res).toBeInstanceOf(NextResponse)
      expect(res.status).toBe(404)
    })
  })
})

function randomString() {
  return Date.now().toString(16)
}
