import { ContentAPI, FixtureAPI } from './api'
import mockEnv from 'mocked-env'
import fetchMock from 'jest-fetch-mock'

describe('ContentAPI', () => {
  const example = new ContentAPI({
    apiBaseURL: 'https://api.example.com',
    apiBasePath: '/api/v3'
  })

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('constructor', () => {
    it('throws if apiBaseURL is falsy', () => {
      expect(
        () => new ContentAPI({ apiBaseURL: '' })
      ).toThrow(/apiBaseURL.+required/)
    })

    it('allows apiBasePath to be empty', () => {
      expect(
        () => new ContentAPI({
          apiBaseURL: 'http://localhost',
          apiBasePath: ''
        })
      ).not.toThrow()
    })
  })

  describe('getPageByPath()', () => {
    it('fetches the expected URL', async () => {
      const data = {
        meta: {
          type: 'foo.Bar'
        }
      }
      fetchMock.mockResponseOnce(JSON.stringify(data))
      const res = await example.getPageByPath('foo')
      expect(res).toEqual(data)
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenLastCalledWith(
        'https://api.example.com/api/v3/pages/find?html_path=foo',
        undefined
      )
    })
  })

  describe('load()', () => {
    it('uses the global fetch implementation by default', async () => {
      fetchMock.mockResponseOnce('derp')
      const api = example
      const res = await api.load('test')
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(res.text()).resolves.toEqual('derp')
    })

    it('respects the provided fetch implementation', async () => {
      const mock = jest.fn()
      const api = new ContentAPI({ ...example.options, fetch: mock })
      await api.load('foo')
      expect(mock).toHaveBeenCalledTimes(1)
    })
  })

  describe('loadJSON()', () => {
    it('fetches JSON', async () => {
      const data = {
        foo: 'bar'
      }
      fetchMock.mockResponseOnce(JSON.stringify(data))
      const res = await example.loadJSON<typeof data>('foo')
      expect(res).toEqual(data)
    })

    it('rejects on 4xx statuses', async () => {
      fetchMock.mockResponseOnce(req => Promise.resolve({
        body: JSON.stringify({
          message: 'not found'
        }),
        init: {
          status: 404
        }
      }))
      await expect(example.loadJSON('derp')).rejects.toThrow('not found')
    })

    it('rejects on 4xx statuses with "bad response" if no message is provided', async () => {
      fetchMock.mockResponseOnce(req => Promise.resolve({
        body: JSON.stringify({}),
        init: {
          status: 404
        }
      }))
      await expect(example.loadJSON('derp')).rejects.toThrow('bad response')
    })
  })

  describe('getURL()', () => {
    it('respects the provided options', () => {
      const api = example
      expect(api.getURL()).toStringifyTo('https://api.example.com/api/v3')
      expect(api.getURL('')).toStringifyTo('https://api.example.com/api/v3')
      expect(api.getURL('foo')).toStringifyTo('https://api.example.com/api/v3/foo')
    })

    it('defaults to $NEXT_PUBLIC_CONTENT_API_BASE_URL and $NEXT_PUBLIC_CONTENT_API_BASE_PATH', () => {
      const resetEnv = mockEnv({
        NEXT_PUBLIC_CONTENT_API_BASE_URL: 'https://content.sf.gov',
        NEXT_PUBLIC_CONTENT_API_BASE_PATH: '/api'
      })
      const api = new ContentAPI()
      expect(api.getURL()).toStringifyTo('https://content.sf.gov/api')
      expect(api.getURL('')).toStringifyTo('https://content.sf.gov/api')
      expect(api.getURL('derp')).toStringifyTo('https://content.sf.gov/api/derp')
      resetEnv()
    })

    it('adds query string params', () => {
      const api = example
      expect(api.getURL('wut', { foo: 'bar', baz: 'qux' })).toStringifyTo(
        'https://api.example.com/api/v3/wut?foo=bar&baz=qux'
      )
    })

    it('ignores apiBasePath if empty', () => {
      const api = new ContentAPI({
        apiBaseURL: 'http://localhost:8000',
        apiBasePath: ''
      })
      expect(api.getURL('foo')).toStringifyTo('http://localhost:8000/foo')
    })
  })
})

describe('FixtureAPI', () => {
  describe('constructor', () => {
    it('throws on invalid arguments', () => {
      // @ts-expect-error
      expect(() => new FixtureAPI()).toThrow()
      // @ts-expect-error
      expect(() => new FixtureAPI({ pages: { wut: null } })).toThrow()
      expect(() => new FixtureAPI({ pages: [null] })).toThrow()
      expect(() => new FixtureAPI({ pages: [], images: [null] })).toThrow()
    })

    it('does not throw on valid arguments', () => {
      expect(() => new FixtureAPI({ pages: [], images: [] })).not.toThrow()
    })
  })

  describe('getPageByPath()', () => {
    const page = {
      id: 10,
      meta: {
        type: 'huh.Wut',
        url_path: 'wut'
      }
    }
    const api = new FixtureAPI({
      pages: [
        page
      ]
    })

    it('loads the right page from the expected path', () => {
      expect(api.getPageByPath('wut')).resolves.toEqual(page)
    })

    it('rejects on missing pages', () => {
      expect(api.getPageByPath('nope')).rejects.toThrow(/not found/)
    })
  })

  describe('loadJSON()', () => {
    const page = {
      id: 99,
      meta: {
        type: 'huh.Wut',
        url_path: 'wut'
      }
    }
    const api = new FixtureAPI({
      pages: [
        page
      ]
    })

    it('resolves to page at the expected "api/{id}" path', () => {
      expect(api.loadJSON('page/99')).resolves.toEqual(page)
    })

    it('rejects on missing pages', () => {
      expect(api.loadJSON('page/100')).rejects.toThrow(/not found/)
    })
  })
})
