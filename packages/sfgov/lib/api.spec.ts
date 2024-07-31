import { ContentAPI, FixtureAPI } from './api'
import mockEnv from 'mocked-env'
import fetchMock from 'jest-fetch-mock'

describe('ContentAPI', () => {
  const example = new ContentAPI({
    baseURL: 'https://api.example.com/api/v3',
    previewURL: 'https://api.example.com/api/cms'
  })

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('constructor', () => {
    mockEnv({
      NEXT_PUBLIC_CONTENT_API_BASE_URL: undefined,
      NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL: undefined
    })

    it('throws if baseURL is falsy', () => {
      expect(
        () =>
          new ContentAPI({
            baseURL: '',
            previewURL: 'http://localhost/api/cms'
          })
      ).toThrow(/baseURL.+required/)
    })

    it('throws if previewURL is falsy', () => {
      expect(
        () =>
          new ContentAPI({
            baseURL: 'http://localhost',
            previewURL: ''
          })
      ).toThrow(/previewURL.+required/)
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

    it('gets preview data if preview is in params', async () => {
      const data = {
        meta: {
          type: 'foo.Bar'
        },
        data: { title: 'some page' }
      }
      const expectedData = {
        meta: {
          type: 'foo.Bar'
        },
        title: 'some page'
      }
      fetchMock.mockResponseOnce(JSON.stringify(data))
      const res = await example.getPageByPath('foo?preview=true', {
        preview: true
      })
      expect(res).toEqual(expectedData)
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenLastCalledWith(
        'https://api.example.com/api/cms/pages/by-url/preview?path=foo',
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

  describe('loadPreview()', () => {
    it('uses the global fetch implementation by default', async () => {
      fetchMock.mockResponseOnce('derp')
      const api = example
      const res = await api.loadPreview('test')
      expect(fetchMock).toHaveBeenCalledTimes(1)
      await expect(res.text()).resolves.toEqual('derp')
    })
    it('respects the provided fetch implementation', async () => {
      const mock = jest.fn()
      const api = new ContentAPI({ ...example.options, fetch: mock })
      await api.loadPreview('foo')
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
      fetchMock.mockResponseOnce(() =>
        Promise.resolve({
          body: JSON.stringify({
            message: 'not found'
          }),
          init: {
            status: 404
          }
        })
      )
      await expect(example.getData('derp')).rejects.toThrow('not found')
    })

    it('rejects on 4xx statuses with "not found" if no message is provided', async () => {
      fetchMock.mockResponseOnce(() =>
        Promise.resolve({
          body: JSON.stringify({}),
          init: {
            status: 404
          }
        })
      )
      await expect(example.getData('derp')).rejects.toThrow('not found')
    })

    it('rejects on other non-200 statuses', async () => {
      const statuses = {
        400: 'Bad request',
        401: 'Unauthorized',
        403: 'Forbidden',
        500: 'Server error'
      }
      for (const [status, statusText] of Object.entries(statuses)) {
        fetchMock.mockResponseOnce(() =>
          Promise.resolve({
            body: '',
            init: {
              status: Number(status),
              statusText
            }
          })
        )
        await expect(example.getData('derp')).rejects.toThrow(
          `${status} ${statusText}`
        )
      }
    })

    it('includes the JSON data "message" in the error', async () => {
      const message = 'invalid query parameter: derp'
      fetchMock.mockResponseOnce(() =>
        Promise.resolve({
          body: JSON.stringify({ message }),
          init: {
            status: 400,
            statusText: 'Bad Request'
          }
        })
      )
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
        data: { title: 'some page' }
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
      fetchMock.mockResponseOnce(() =>
        Promise.resolve({
          body: JSON.stringify({
            message: 'not found'
          }),
          init: {
            status: 404
          }
        })
      )
      await expect(example.getPreviewData('derp')).rejects.toThrow('not found')
    })

    it('rejects on 4xx statuses with "not found" if no message is provided', async () => {
      fetchMock.mockResponseOnce(() =>
        Promise.resolve({
          body: JSON.stringify({}),
          init: {
            status: 404
          }
        })
      )
      await expect(example.getPreviewData('derp')).rejects.toThrow('not found')
    })

    it('rejects on other non-200 statuses', async () => {
      const statuses = {
        400: 'Bad request',
        401: 'Unauthorized',
        403: 'Forbidden',
        500: 'Server error'
      }
      for (const [status, statusText] of Object.entries(statuses)) {
        fetchMock.mockResponseOnce(() =>
          Promise.resolve({
            body: '',
            init: {
              status: Number(status),
              statusText
            }
          })
        )
        await expect(example.getPreviewData('derp')).rejects.toThrow(
          `${status} ${statusText}`
        )
      }
    })

    it('includes the JSON data "message" in the error', async () => {
      const message = 'invalid query parameter: derp'
      fetchMock.mockResponseOnce(() =>
        Promise.resolve({
          body: JSON.stringify({ message }),
          init: {
            status: 400,
            statusText: 'Bad Request'
          }
        })
      )
      await expect(example.getPreviewData('derp')).rejects.toThrow(
        `400 Bad Request: ${message}`
      )
    })
  })

  describe('getPreviewRelatedData()', () => {
    it('fetches data', async () => {
      const data = {
        meta: {
          type: 'foo.Bar'
        },
        part_of: ['https://part.of.url']
      }
      const partOfData = {
        meta: {
          type: 'foo.Bar'
        },
        title: 'some related page',
        html_path: 'http://some.page/path'
      }
      const expectedData = {
        meta: { type: 'foo.Bar' },
        part_of: [
          {
            title: 'some related page',
            meta: { html_url: 'http://some.page/path' }
          }
        ]
      }
      fetchMock.mockResponseOnce(JSON.stringify(partOfData))
      const res = await example.getPreviewRelatedData('foo', data)
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenLastCalledWith('https://part.of.url')
      expect(res).toEqual(expectedData)
    })

    it('fetches related image data', async () => {
      const data = {
        meta: {
          type: 'foo.Bar'
        },
        logo: 'https://some/images/detail.path'
      }
      const imageData = {
        id: 4456,
        meta: {
          download_url: '/media/original_images/download_2_FPWtavT.jpeg',
          type: 'cms.BaseImage'
        },
        title: 'asdf'
      }
      const expectedData = {
        meta: { type: 'foo.Bar' },
        logo: imageData
      }
      fetchMock.mockResponseOnce(JSON.stringify(imageData))
      const res = await example.getPreviewRelatedData('foo', data)
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenLastCalledWith(
        'https://some/images/detail.path'
      )
      expect(res).toEqual(expectedData)
    })

    it('deals with non-Array related data', async () => {
      const data = {
        meta: {
          type: 'foo.Bar'
        },
        primary_agency: 'https://part.of.url'
      }
      const primaryAgencyData = {
        meta: {
          type: 'foo.Bar'
        },
        title: 'some related page',
        html_path: 'http://some.page/path'
      }
      const expectedData = {
        meta: { type: 'foo.Bar' },
        primary_agency: {
          title: 'some related page',
          meta: { html_url: 'http://some.page/path' }
        }
      }
      fetchMock.mockResponseOnce(JSON.stringify(primaryAgencyData))
      const res = await example.getPreviewRelatedData('foo', data)
      expect(res).toEqual(expectedData)
    })

    it('returns null on fetch error', async () => {
      const data = {
        meta: {
          type: 'foo.Bar'
        },
        primary_agency: 'not a url'
      }
      const expectedData = {
        meta: { type: 'foo.Bar' },
        primary_agency: null
      }
      fetchMock.mockResponseOnce(() => {
        throw new Error('wrong!')
      })
      const res = await example.getPreviewRelatedData('foo', data)
      expect(res).toEqual(expectedData)
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
    const page = {
      id: 10,
      meta: {
        type: 'huh.Wut',
        url_path: 'wut'
      },
      title: 'Yo'
    }
    const api = new FixtureAPI({
      pages: [page]
    })

    it('loads the right page from the expected path', async () => {
      await expect(api.getPageByPath('wut')).resolves.toEqual(page)
    })

    it('rejects on missing pages', async () => {
      await expect(api.getPageByPath('nope')).rejects.toThrow(/not found/)
    })
  })

  describe('getData()', () => {
    const page = {
      id: 99,
      meta: {
        type: 'huh.Wut',
        url_path: 'wut'
      },
      title: 'Hi'
    }
    const api = new FixtureAPI({
      pages: [page]
    })

    it('resolves to page at the expected "api/{id}" path', async () => {
      await expect(api.getData('page/99')).resolves.toEqual(page)
    })

    it('rejects on missing pages', async () => {
      await expect(api.getData('page/100')).rejects.toThrow(/not found/)
    })
  })
})
