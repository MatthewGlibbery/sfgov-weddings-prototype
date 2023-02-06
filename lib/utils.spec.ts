import { IContentAPI } from '@/types'
import { getPageURL, resolvePage, resolveImage } from './utils'

describe('getPageURL()', () => {
  it('returns meta.html_url without the hostname', () => {
    expect(getPageURL({
      // @ts-expect-error
      meta: {
        html_url: 'https://example.com/foo/bar'
      }
    })).toBe('/foo/bar')
    expect(getPageURL({
      // @ts-expect-error
      meta: {
        html_url: '/foo/bar'
      }
    })).toBe('/foo/bar')
    expect(getPageURL({
      // @ts-expect-error
      meta: {
        html_url: '/'
      }
    })).toBe('/')
  })

  it('returns meta.url_path when no html_url is provided', () => {
    expect(getPageURL({
      // @ts-expect-error
      meta: {
        url_path: '/foo/bar'
      }
    })).toBe('/foo/bar')
    expect(getPageURL({
      // @ts-expect-error
      meta: {
        url_path: '/'
      }
    })).toBe('/')
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
      // @ts-expect-error
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
      // @ts-expect-error
      await resolveImage({ id: 1 }, api)
      expect(api.loadJSON).toHaveBeenCalledWith('images/1')
    })

    it('does not attempt to resolve object with meta.download_url', async () => {
      // @ts-expect-error
      await resolveImage({ meta: { download_url: 'foo.jpg' } }, api)
      expect(api.loadJSON).not.toHaveBeenCalled()
    })

    it('does nothing if the value is falsy', async () => {
      const values = await Promise.all([
        resolveImage(null, api),
        resolveImage(0, api)
      ])
      expect(values).toEqual([undefined, undefined])
      expect(api.loadJSON).not.toHaveBeenCalled()
    })
  })
})
