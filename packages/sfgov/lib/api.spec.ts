import type { MinimalPageData } from '@/types'
import fetchMock from 'jest-fetch-mock'
import mockConsole from 'jest-mock-console'
import mockEnv from 'mocked-env'
import { ContentAPI, FixtureAPI, RequestError } from './api'

let restoreConsole: ReturnType<typeof mockConsole>
beforeAll(() => {
  restoreConsole = mockConsole()
})

afterAll(() => {
  restoreConsole()
})

describe('ContentAPI', () => {
  const example = new ContentAPI({
    baseURL: 'https://api.example.com/api/v3',
    previewURL: 'https://api.example.com/api/v2'
  })

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('constructor', () => {
    let restoreEnv: ReturnType<typeof mockEnv>
    beforeEach(() => {
      restoreEnv = mockEnv({
        NEXT_PUBLIC_CONTENT_API_BASE_URL: undefined,
        NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL: undefined,
        NEXT_PUBLIC_QLESS_API_URL: undefined
      })
    })

    afterEach(() => restoreEnv())

    it.skip('throws if baseURL is falsy', () => {
      expect(
        () =>
          new ContentAPI({
            baseURL: '',
            previewURL: 'http://localhost/api/cms'
          })
      ).toThrow(/Required env var .* is not set/)
    })

    it.skip('throws if previewURL is falsy', () => {
      expect(
        () =>
          new ContentAPI({
            baseURL: 'http://localhost',
            previewURL: ''
          })
      ).toThrow(/Required env var .* is not set/)
    })

    it('allows baseURL path to be empty', () => {
      expect(
        () =>
          new ContentAPI({
            baseURL: 'http://localhost',
            previewURL: 'http://localhost'
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
        'https://api.example.com/api/v3/pages/find/?html_path=foo',
        undefined
      )
    })

    it('falls back to the English page if no translation is found', async () => {
      const english = {
        id: 1,
        meta: { type: 'foo.Bar' },
        title: 'English'
      }
      fetchMock
        .once(JSON.stringify(english))
        .once(JSON.stringify({ items: [] }))
      const res = await example.getPageByPath('foo', { locale: 'es' })
      expect(res).toEqual(english)
      expect(fetchMock).toHaveBeenCalledTimes(2)
      expect(fetchMock).toHaveBeenNthCalledWith(
        1,
        'https://api.example.com/api/v3/pages/find/?html_path=foo',
        undefined
      )
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        'https://api.example.com/api/v3/pages/?translation_of=1&locale=es',
        undefined
      )
    })

    it('falls back to the English page if the translation list fails', async () => {
      const english = {
        id: 1,
        meta: { type: 'foo.Bar' },
        title: 'English'
      }
      fetchMock
        .once(JSON.stringify(english))
        .once(JSON.stringify({ message: 'oops' }), {
          status: 500
        })
      const res = await example.getPageByPath('foo', { locale: 'es' })
      expect(res).toEqual(english)
      expect(fetchMock).toHaveBeenCalledTimes(2)
      expect(fetchMock).toHaveBeenNthCalledWith(
        1,
        'https://api.example.com/api/v3/pages/find/?html_path=foo',
        undefined
      )
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        'https://api.example.com/api/v3/pages/?translation_of=1&locale=es',
        undefined
      )
    })

    it('finds translations with translation_of={english.id}', async () => {
      const english = {
        id: 1,
        meta: { type: 'foo.Bar' },
        title: 'English'
      }
      const spanish = {
        id: 2,
        meta: { type: 'foo.Bar' },
        title: 'Spanish'
      }
      fetchMock
        .once(JSON.stringify(english))
        .once(JSON.stringify({ items: [spanish] }))
        .once(JSON.stringify(spanish))
      const res = await example.getPageByPath('foo', { locale: 'es' })
      expect(fetchMock).toHaveBeenCalledTimes(3)
      expect(fetchMock).toHaveBeenNthCalledWith(
        1,
        'https://api.example.com/api/v3/pages/find/?html_path=foo',
        undefined
      )
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        'https://api.example.com/api/v3/pages/?translation_of=1&locale=es',
        undefined
      )
      expect(fetchMock).toHaveBeenNthCalledWith(
        3,
        'https://api.example.com/api/v3/pages/2/',
        undefined
      )
      expect(res).toEqual(spanish)
    })

    it.each([
      { path: 'foo', query: '?path=foo&locale=en' },
      { path: 'foo', locale: 'es', query: '?path=foo&locale=es' },
      { path: 'foo?preview=true', query: '?path=foo&locale=en' }
    ])(
      'gets preview data for "%s" if preview is in params',
      async ({ path, locale, query }) => {
        fetchMock.mockResponseOnce(
          JSON.stringify({
            meta: {
              type: 'foo.Bar'
            },
            title: 'some page'
          })
        )
        const res = await example.getPageByPath(path, {
          preview: true,
          locale
        })
        expect(res).toEqual({
          meta: {
            type: 'foo.Bar'
          },
          title: 'some page'
        })
        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenLastCalledWith(
          `https://api.example.com/api/v2/pages/preview${query}`,
          undefined
        )
      }
    )

    it('returns undefined if the English page 404s', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          message: 'not found'
        }),
        {
          status: 404,
          statusText: 'Not Found'
        }
      )
      const res = await example.getPageByPath('foo')
      expect(res).toEqual(undefined)
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenLastCalledWith(
        'https://api.example.com/api/v3/pages/find/?html_path=foo',
        undefined
      )
    })

    it('throws if the English page 500s', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          message: 'oops'
        }),
        {
          status: 500,
          statusText: 'Server Error'
        }
      )
      expect(example.getPageByPath('foo')).rejects.toThrow(/500 Server Error/)
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenLastCalledWith(
        'https://api.example.com/api/v3/pages/find/?html_path=foo',
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
      await expect(res.text()).resolves.toEqual('derp')
    })

    it('respects the provided fetch implementation', async () => {
      const mock = jest.fn()
      const api = new ContentAPI({ ...example.options, fetch: mock })
      await api.load('foo')
      expect(mock).toHaveBeenCalledTimes(1)
    })
  })

  describe('getData()', () => {
    it('fetches JSON', async () => {
      const data = {
        foo: 'bar'
      }
      fetchMock.mockResponseOnce(JSON.stringify(data))
      const res = await example.getData<typeof data>('foo')
      expect(res).toEqual(data)
    })

    it('rejects on 4xx statuses', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          message: 'not found'
        }),
        {
          status: 404
        }
      )
      await expect(example.getData('derp')).rejects.toThrow(
        /404 Not Found: not found/
      )
    })

    it('rejects on 4xx statuses with "not found" if no message is provided', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), {
        status: 404
      })
      await expect(example.getData('derp')).rejects.toThrow(/404 Not Found/)
    })

    it.each([
      [400, 'Bad Request'],
      [401, 'Unauthorized'],
      [403, 'Forbidden'],
      [500, 'Server Error']
    ])('rejects on %s %s', async (status, statusText) => {
      fetchMock.mockResponseOnce('', {
        status,
        statusText
      })
      await expect(example.getData('derp')).rejects.toThrow(
        `${status} ${statusText}`
      )
    })

    it('includes the JSON data "message" in the error', async () => {
      const message = 'invalid query parameter: derp'
      fetchMock.mockResponseOnce(JSON.stringify({ message }), {
        status: 400,
        statusText: 'Bad Request'
      })
      await expect(example.getData('derp')).rejects.toThrow(
        `400 Bad Request: ${message}`
      )
    })
  })

  describe('getPreviewData()', () => {
    it('fetches json', async () => {
      const data = {
        meta: {
          type: 'foo.Bar'
        },
        title: 'some page'
      }
      const expectedData = {
        meta: {
          type: 'foo.Bar'
        },
        title: 'some page'
      }
      fetchMock.mockResponseOnce(JSON.stringify(data))
      const res = await example.getPreviewData<typeof data>('foo')
      expect(res).toEqual(expectedData)
    })

    it('rejects on 4xx statuses', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          message: 'not found'
        }),
        {
          status: 404
        }
      )
      await expect(example.getPreviewData('derp')).rejects.toThrow(
        /404 Not Found/
      )
    })

    it('rejects on 4xx statuses with "not found" if no message is provided', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 })
      await expect(example.getPreviewData('derp')).rejects.toThrow(
        /404 Not Found/
      )
    })

    it.each([
      [400, 'Bad request'],
      [401, 'Unauthorized'],
      [403, 'Forbidden'],
      [500, 'Server error']
    ])('rejects on other %d %s', async (status, statusText) => {
      fetchMock.mockResponseOnce('', {
        status: Number(status),
        statusText
      })
      await expect(example.getPreviewData('derp')).rejects.toThrow(
        `${status} ${statusText}`
      )
    })

    it('includes the JSON data "message" in the error', async () => {
      const message = 'invalid query parameter: derp'
      fetchMock.mockResponseOnce(JSON.stringify({ message }), {
        status: 400,
        statusText: 'Bad Request'
      })
      await expect(example.getPreviewData('derp')).rejects.toThrow(
        `400 Bad Request: ${message}`
      )
    })
  })

  describe('getURL()', () => {
    it('respects the provided options', () => {
      const api = example
      expect(api.getURL()).toStringifyTo('https://api.example.com/api/v3')
      expect(api.getURL('')).toStringifyTo('https://api.example.com/api/v3')
      expect(api.getURL('foo')).toStringifyTo(
        'https://api.example.com/api/v3/foo'
      )
    })

    it('defaults to $NEXT_PUBLIC_CONTENT_API_BASE_URL and $NEXT_PUBLIC_CONTENT_API_BASE_PATH', () => {
      mockEnv({
        NEXT_PUBLIC_CONTENT_API_BASE_URL: 'https://content.sf.gov/api',
        NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL: 'http://content.sf.gov/api/cms'
      })
      const api = new ContentAPI()
      expect(api.getURL()).toStringifyTo('https://content.sf.gov/api')
      expect(api.getURL('')).toStringifyTo('https://content.sf.gov/api')
      expect(api.getURL('derp')).toStringifyTo(
        'https://content.sf.gov/api/derp'
      )
    })

    it('adds query string params', () => {
      const api = example
      expect(api.getURL('wut', { foo: 'bar', baz: 'qux' })).toStringifyTo(
        'https://api.example.com/api/v3/wut?foo=bar&baz=qux'
      )
    })

    it('ignores apiBasePath if empty', () => {
      const api = new ContentAPI({
        baseURL: 'http://localhost:8000',
        previewURL: 'https://localhost:8000'
      })
      expect(api.getURL('foo')).toStringifyTo('http://localhost:8000/foo')
    })
  })

  describe('getQLessData()', () => {
    it('resolves to page at the expected "api/{id}" path', async () => {
      const data = {
        status: 'success',
        data: {
          timestamp: '2025-03-06T20:17:37.892Z',
          queues: [
            {
              id: 2566,
              name: 'Permit Center Help Desk',
              state: 'ACTIVE',
              wait_time: 5,
              location_id: 188
            }
          ]
        }
      }
      fetchMock.mockResponseOnce(JSON.stringify(data))
      const api = example
      const res = await api.getQLessData()
      expect(res.status).toEqual('success')
    })
  })
})

describe('FixtureAPI', () => {
  describe('constructor', () => {
    it('throws on invalid arguments', () => {
      // @ts-expect-error bad constructor
      expect(() => new FixtureAPI()).toThrow()
      // @ts-expect-error bad constructor
      expect(() => new FixtureAPI({ pages: { wut: null } })).toThrow()
      // @ts-expect-error bad constructor
      expect(() => new FixtureAPI({ pages: [null] })).toThrow()
      // @ts-expect-error bad constructor
      expect(() => new FixtureAPI({ pages: [], images: [null] })).toThrow()
    })

    it('does not throw on valid arguments', () => {
      expect(() => new FixtureAPI({ pages: [], images: [] })).not.toThrow()
    })
  })

  describe('getPageByPath()', () => {
    const page: MinimalPageData = {
      id: 10,
      meta: {
        type: 'huh.Wut',
        url_path: 'wut'
      },
      title: 'Yo',
      html_path: '/test'
    }
    const api = new FixtureAPI({
      pages: [page]
    })

    it('loads the right page from the expected path', async () => {
      await expect(api.getPageByPath('wut')).resolves.toEqual(page)
    })

    it('rejects on missing pages', async () => {
      await expect(api.getPageByPath('nope')).resolves.toEqual(undefined)
    })
  })

  describe('getData()', () => {
    const page: MinimalPageData = {
      id: 99,
      meta: {
        type: 'huh.Wut',
        url_path: 'wut'
      },
      title: 'Hi',
      html_path: '/test'
    }
    const api = new FixtureAPI({
      pages: [page]
    })

    it('resolves to page at the expected "api/{id}" path', async () => {
      await expect(api.getData('page/99')).resolves.toEqual(page)
    })

    it('rejects on missing pages', async () => {
      await expect(api.getData('page/100')).rejects.toThrow(/404 Not Found/)
    })
  })
})

describe('RequestError', () => {
  it('defaults the message to "{status} {statusText}"', () => {
    const error = new RequestError(
      new Response('', {
        status: 404,
        statusText: 'Not Found'
      })
    )
    expect(error.message).toBe('404 Not Found')
  })

  it('adds the message suffix if provided', () => {
    const error = new RequestError(
      new Response('', {
        status: 404,
        statusText: 'Not Found'
      }),
      'oops'
    )
    expect(error.message).toBe('404 Not Found: oops')
  })

  describe('RequestError.fromResponse()', () => {
    it('gets the message from a JSON response', async () => {
      const response = new Response('', {
        status: 403,
        statusText: 'Unauthorized'
      })
      jest.spyOn(response, 'json').mockImplementation(() =>
        Promise.resolve({
          message: 'not allowed'
        })
      )
      const error = await RequestError.fromResponse(response)
      expect(error.message).toBe('403 Unauthorized: not allowed')
    })
  })
})
