import { IContentAPI } from '@/types'
import { ImageFactory } from './factories'
import { getPageURL, resolvePage, resolveImage, getImageURL } from './utils'

describe('getPageURL()', () => {
  it('returns meta.html_url without the hostname', () => {
    expect(getPageURL({
      id: 1,
      meta: {
        type: 'foo',
        html_url: 'https://example.com/foo/bar'
      }
    })).toBe('/foo/bar')
    expect(getPageURL({
      id: 2,
      meta: {
        type: 'bar',
        html_url: '/foo/bar'
      }
    })).toBe('/foo/bar')
    expect(getPageURL({
      id: 3,
      meta: {
        type: 'baz',
        html_url: '/'
      }
    })).toBe('/')
  })

  it('returns meta.url_path when no html_url is provided', () => {
    expect(getPageURL({
      id: 1,
      meta: {
        type: 'foo',
        url_path: '/foo/bar'
      }
    })).toBe('/foo/bar')
    expect(getPageURL({
      id: 2,
      meta: {
        type: 'bar',
        url_path: '/'
      }
    })).toBe('/')
  })
})

describe('getImageURL()', () => {
  it('returns the meta.download_url', () => {
    const url = 'https://example.com/cool.gif'
    const image = ImageFactory.make({
      meta: {
        download_url: url
      }
    })
    expect(getImageURL(image)).toBe(url)
  })

  it('resolves meta.download_url relative to a given base URL', () => {
    const url = '/images/cool.gif'
    const image = ImageFactory.make({
      meta: {
        download_url: url
      }
    })
    expect(getImageURL(image, 'https://example.com')).toBe('https://example.com/images/cool.gif')
  })

  it('returns undefined if there is no meta.download_url', () => {
    const fixtures = [
      { meta: { download_url: '' } },
      { meta: {} },
      {}
    ]
    for (const img of fixtures) {
      // @ts-expect-error img is intentionally malformed
      expect(getImageURL(img)).toBe(undefined)
    }
  })
})

describe('resolvers', () => {
  const mockLoadJSON = jest.fn()
  const api = {
    loadJSON: mockLoadJSON
  } as unknown as IContentAPI

  afterEach(() => {
    mockLoadJSON.mockClear()
  })

  describe('resolvePage()', () => {
    it('resolves an id with api.loadJSON()', async () => {
      await resolvePage(1, api)
      expect(api.loadJSON).toHaveBeenCalledWith('pages/1')
    })

    it('does not attempt to resolve an object', async () => {
      // @ts-expect-error intentionally malformed data
      await resolvePage({ id: 1 }, api)
      expect(api.loadJSON).not.toHaveBeenCalled()
    })
  })

  describe('resolveImage()', () => {
    it('resolves an id with api.loadJSON()', async () => {
      await resolveImage(1, api)
      expect(api.loadJSON).toHaveBeenCalledWith('images/1')
    })

    it('attempts to resolve an object without meta.download_url', async () => {
      // @ts-expect-error intentionally malformed data
      await resolveImage({ id: 1 }, api)
      expect(api.loadJSON).toHaveBeenCalledWith('images/1')
    })

    it('does not attempt to resolve object with meta.download_url', async () => {
      // @ts-expect-error intentionally sparse data
      await resolveImage({ meta: { download_url: 'foo.jpg' } }, api)
      expect(api.loadJSON).not.toHaveBeenCalled()
    })

    it('does nothing if the value is falsy', async () => {
      const values = await Promise.all([
        // @ts-expect-error null is not allowed
        resolveImage(null, api),
        resolveImage(0, api)
      ])
      expect(values).toEqual([undefined, undefined])
      expect(api.loadJSON).not.toHaveBeenCalled()
    })
  })
})
