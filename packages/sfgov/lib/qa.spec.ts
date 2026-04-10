import { ABOUT_PAGE_TYPE, LOCATION_PAGE_TYPE } from '@/constants'
import mockedEnv, { type RestoreFn } from 'mocked-env'
import { ContentAPI } from './api'
import { isQA, qaOnly, getPages } from './qa'

let restoreEnv: RestoreFn | null
afterEach(() => {
  restoreEnv?.()
  restoreEnv = null
})

describe('isQA()', () => {
  it.each([
    { NODE_ENV: 'development', returns: true },
    { NODE_ENV: 'production', host: 'www-develop.dev.sf.gov', returns: true },
    { NODE_ENV: 'production', host: 'www.sf.gov', returns: false }
  ])(
    'returns $returns if NODE_ENV=$NODE_ENV and host=$host',
    ({ NODE_ENV, host, returns }) => {
      restoreEnv = mockedEnv({ NODE_ENV })
      expect(isQA(host)).toEqual(returns)
    }
  )
})

describe('qaOnly()', () => {
  const handler = jest.fn().mockResolvedValue({
    props: {
      cool: true
    }
  })

  it('calls the getServerSideProps function if isQA() returns true', async () => {
    restoreEnv = mockedEnv({ NODE_ENV: 'development' })
    const result = await qaOnly(handler)({
      // @ts-expect-error incomplete
      req: {
        headers: {
          host: 'localhost:3000'
        }
      }
    })
    expect(result).toEqual({ props: { cool: true } })
  })

  it('returns a 404 if isQA() returns false', async () => {
    restoreEnv = mockedEnv({ NODE_ENV: 'production' })
    const result = await qaOnly(handler)({
      // @ts-expect-error incomplete
      req: {
        headers: {
          host: 'www.sf.gov'
        }
      }
    })
    expect(result).toEqual({ notFound: true })
  })
})

describe('getPages()', () => {
  let load: jest.SpyInstance
  beforeEach(() => {
    load = jest.spyOn(ContentAPI.prototype, 'load')
    restoreEnv = mockedEnv({
      NEXT_PUBLIC_CONTENT_API_BASE_URL: 'https://fake-api.sf.gov'
    })
  })
  afterEach(() => {
    load?.mockRestore()
  })

  it('calls ContentAPI.load() once for a single page', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        meta: {
          total_count: 1
        },
        items: [{ cool: true }]
      })
    )
    const pages = await getPages<{ cool: boolean }>(LOCATION_PAGE_TYPE, [
      'foo',
      'bar'
    ])
    expect(load).toHaveBeenLastCalledWith('pages', {
      type: 'sf.locationpage',
      fields: 'foo,bar',
      locale: 'en',
      limit: 50,
      offset: 0
    })
    expect(pages).toHaveLength(1)
    expect(pages[0]).toEqual({ cool: true })
  })

  it('paginates calls to ContentAPI.load()', async () => {
    const pages: Array<{ index: number }> = []
    for (let i = 1; i < 120; i++) {
      pages.push({ index: i })
    }
    fetchMock.mockResponses(
      JSON.stringify({
        meta: {
          total_count: pages.length
        },
        items: pages.slice(0, 50)
      }),
      JSON.stringify({
        meta: {
          total_count: pages.length
        },
        items: pages.slice(50, 100)
      }),
      JSON.stringify({
        meta: {
          total_count: pages.length
        },
        items: pages.slice(100)
      })
    )
    const result = await getPages<{ cool: boolean }>(ABOUT_PAGE_TYPE, ['index'])
    const expectedParams = {
      type: 'sf.about',
      fields: 'index',
      locale: 'en',
      limit: 50
    }
    expect(load).toHaveBeenNthCalledWith(1, 'pages', {
      ...expectedParams,
      offset: 0
    })
    expect(load).toHaveBeenNthCalledWith(2, 'pages', {
      ...expectedParams,
      offset: 50
    })
    expect(load).toHaveBeenNthCalledWith(3, 'pages', {
      ...expectedParams,
      offset: 100
    })
    expect(result).toEqual(pages)
  })

  it('breaks when it encounters an empty response', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        error: 'wtf'
      })
    )
    const pages = await getPages<{ cool: boolean }>('sf.Foo', ['bar'])
    expect(load).toHaveBeenLastCalledWith('pages', {
      type: 'sf.foo',
      fields: 'bar',
      locale: 'en',
      limit: 50,
      offset: 0
    })
    expect(pages).toEqual([])
  })
})
