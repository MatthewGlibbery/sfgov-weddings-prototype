import { IContentAPI } from '@/types'
import { PageFactory } from './factories'
import { getPageURL, resolvePage, resolveImage } from './utils'

describe('getPageURL()', () => {
  it('returns meta.html_url without the hostname', () => {
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            html_url: 'https://example.com/foo/bar'
          }
        })
      )
    ).toBe('/foo/bar')
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            html_url: '/foo/bar'
          }
        })
      )
    ).toBe('/foo/bar')
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            html_url: '/'
          }
        })
      )
    ).toBe('/')
  })

  it('returns meta.url_path when no html_url is provided', () => {
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            url_path: '/foo/bar',
            html_url: undefined
          }
        })
      )
    ).toBe('/foo/bar')
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            url_path: '/',
            html_url: undefined
          }
        })
      )
    ).toBe('/')
  })
})

describe('resolvers', () => {
  const mockLoadJSON = jest.fn()
  const api = {
    getData: mockLoadJSON
  } as unknown as IContentAPI

  afterEach(() => {
    mockLoadJSON.mockClear()
  })

  describe('resolvePage()', () => {
    it('resolves an id with api.getData()', async () => {
      await resolvePage(1, api)
      expect(api.getData).toHaveBeenCalledWith('pages/1/')
    })

    it('does not attempt to resolve an object', async () => {
      // @ts-expect-error intentionally malformed data
      await resolvePage({ id: 1 }, api)
      expect(api.getData).not.toHaveBeenCalled()
    })
  })

  describe('resolveImage()', () => {
    it('resolves an id with api.getData()', async () => {
      await resolveImage(1, api)
      expect(api.getData).toHaveBeenCalledWith('images/1')
    })

    it('attempts to resolve an object without meta.download_url', async () => {
      // @ts-expect-error intentionally malformed data
      await resolveImage({ id: 1 }, api)
      expect(api.getData).toHaveBeenCalledWith('images/1')
    })

    it('does not attempt to resolve object with meta.download_url', async () => {
      // @ts-expect-error intentionally sparse data
      await resolveImage({ meta: { download_url: 'foo.jpg' } }, api)
      expect(api.getData).not.toHaveBeenCalled()
    })

    it('does nothing if the value is falsy', async () => {
      const values = await Promise.all([
        // @ts-expect-error null is not allowed
        resolveImage(null, api),
        resolveImage(0, api)
      ])
      expect(values).toEqual([undefined, undefined])
      expect(api.getData).not.toHaveBeenCalled()
    })
  })
})
