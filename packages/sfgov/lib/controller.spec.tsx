import { Controller, WagtailPageTemplate } from './controller'
import { FixtureAPI, RequestError } from './api'
import { render } from '@testing-library/react'
import mockConsole from 'jest-mock-console'
import type { GetServerSidePropsContext } from 'next'
import type { IContentAPI, PageData } from '@/types'
import type { ComponentProps, ComponentType } from 'react'
import mockedEnv from 'mocked-env'

type MockedFunction = ReturnType<typeof jest.fn>

let restoreConsole: ReturnType<typeof mockConsole>
let restoreEnv: ReturnType<typeof mockedEnv> | undefined

beforeAll(() => {
  restoreConsole = mockConsole()
})

afterAll(() => {
  restoreConsole()
})

afterEach(() => {
  restoreEnv?.()
  restoreEnv = undefined
})

describe('Controller', () => {
  const mockPath = 'departments/sf-environment'
  const mockMetaType = 'sfgov.Info'
  const mockPage = {
    id: 123,
    meta: {
      type: mockMetaType,
      url_path: mockPath
    },
    title: 'Mock page',
    html_path: '/test'
  }

  const fixtureAPI = new FixtureAPI({
    pages: [mockPage]
  })

  const MockPageComponent: ComponentType<{ page: PageData }> = jest.fn(
    (props) => <div>Hello, {props.page.meta.type}!</div>
  )
  const MockPageTemplate = new WagtailPageTemplate(
    MockPageComponent,
    mockMetaType
  )
  const mockTemplates = [MockPageTemplate]

  afterEach(() => {
    ;(MockPageComponent as MockedFunction).mockClear()
  })

  describe('constructor', () => {
    it('requires a ContentAPI and template map', () => {
      expect(
        // @ts-expect-error testing without any args
        () => new Controller()
      ).toThrow(/ContentAPI.+required/)
      expect(
        // @ts-expect-error testing without a template map
        () => new Controller(fixtureAPI)
      ).toThrow(/templates.+required/)
      expect(() => new Controller(fixtureAPI, [])).not.toThrow()
    })
  })

  describe('getTemplateForType()', () => {
    it('finds exact matches', () => {
      const controller = new Controller(fixtureAPI, mockTemplates)
      expect(
        controller.getViewComponent({
          page: mockPage
        })
      ).toBe(MockPageComponent)
    })
  })

  describe('makeGetServerSideProps()', () => {
    const controller = new Controller(fixtureAPI, [])

    it('returns a function', () => {
      expect(typeof controller.makeGetServerSideProps()).toBe('function')
    })

    it('returns a function that resolves to GetServerSideProps', async () => {
      const getServerSideProps = controller.makeGetServerSideProps()
      const context = stubContext({
        resolvedUrl: mockPath
      })
      await expect(getServerSideProps(context)).resolves.toMatchObject({
        props: {
          page: mockPage
        }
      })
    })

    it('passes the context locale to the api', async () => {
      const getServerSideProps = controller.makeGetServerSideProps()
      const context = stubContext({
        resolvedUrl: mockPath,
        locale: 'es'
      })
      await expect(getServerSideProps(context)).resolves.toMatchObject({
        props: {
          page: mockPage
        }
      })
    })

    it('sets env to public env vars', async () => {
      restoreEnv = mockedEnv({ NEXT_PUBLIC_FOO: 'bar' })
      const getServerSideProps = controller.makeGetServerSideProps()
      const context = stubContext({
        resolvedUrl: mockPath,
        locale: 'es'
      })
      await expect(getServerSideProps(context)).resolves.toMatchObject({
        props: {
          page: mockPage,
          env: {
            NEXT_PUBLIC_FOO: 'bar'
          }
        }
      })
    })

    it('catches 404s', async () => {
      const api = stubAPI({
        getPageByPath: jest.fn(() => undefined)
      })

      const controller = new Controller(api, [])
      const getServerSideProps = controller.makeGetServerSideProps()
      const context = stubContext({
        resolvedUrl: mockPath
      })
      await expect(getServerSideProps(context)).resolves.toEqual({
        notFound: true
      })
    })

    it('does not catch other errors', async () => {
      const api = stubAPI({
        getPageByPath: jest.fn(() => {
          throw new RequestError(
            new Response('', {
              status: 500,
              statusText: 'Server Error'
            })
          )
        })
      })

      const controller = new Controller(api as unknown as IContentAPI, [])
      const getServerSideProps = controller.makeGetServerSideProps()
      const context = stubContext({
        resolvedUrl: mockPath
      })
      await expect(getServerSideProps(context)).rejects.toThrow(
        /500 Server Error/
      )
    })

    it('redirects when the data calls for it', async () => {
      const api = stubAPI({
        getPageByPath: jest.fn(() =>
          Promise.resolve({
            ...mockPage,
            redirect_url: 'http://www.sf.gov'
          })
        )
      })

      const controller = new Controller(api, [])
      const getServerSideProps = controller.makeGetServerSideProps()
      const context = stubContext({
        resolvedUrl: mockPath,
        locale: 'es'
      })
      await expect(getServerSideProps(context)).resolves.toMatchObject({
        redirect: {
          destination: 'http://www.sf.gov',
          permanent: false
        }
      })
    })

    test.each(['redirect_url', 'agency_redirect'])(
      'does not redirect for page previews even if a page level redirect is present: %s',
      async (propName) => {
        const api = stubAPI({
          getPageByPath: jest.fn(() =>
            Promise.resolve({
              ...mockPage,
              [propName]: 'http://www.sf.gov'
            })
          )
        })

        const controller = new Controller(api, [])
        const getServerSideProps = controller.makeGetServerSideProps()
        const context = stubContext({
          resolvedUrl: mockPath,
          query: {
            preview: 'true'
          }
        })
        await expect(getServerSideProps(context)).resolves.toMatchObject({
          props: {
            page: mockPage
          }
        })
      }
    )
  })

  describe('makeViewComponent()', () => {
    const controller = new Controller(fixtureAPI, mockTemplates)

    it('returns a function', () => {
      expect(typeof controller.makeViewComponent()).toBe('function')
    })

    it.each([
      {},
      { page: null },
      { page: { meta: null } },
      { page: { meta: { type: null } } }
    ])('throws if page.meta.type is missing in props', (props) => {
      const View = controller.makeViewComponent()
      expect(() =>
        render(<View {...(props as unknown as ComponentProps<typeof View>)} />)
      ).toThrow(/No template found for page:/)
    })

    it('throws if it gets a page.meta.type with no matching template', () => {
      const View = controller.makeViewComponent()
      expect(() =>
        render(
          <View
            page={{
              id: 1,
              meta: {
                type: 'wut'
              },
              title: 'Hi',
              html_path: '/test'
            }}
          />
        )
      ).toThrow(/No template found for page/)
    })
  })
})

/**
 * Create a stub GetServerSidePropsContext for passing to getServerSideProps().
 * Any property of the context can be overridden.
 */
function stubContext(
  c: Partial<GetServerSidePropsContext>
): GetServerSidePropsContext {
  return {
    defaultLocale: 'en',
    query: c.query || {},
    params: {},
    req: {
      headers: {}
    },
    ...c
  } as unknown as GetServerSidePropsContext
}

/**
 * Create a stub IContentAPI for passing Controller instances. Usually you'll
 * want to override methods with a jest mock function:
 *
 * ```ts
 * const api = stubAPI({
 *   getPageByPath: jest.fn(() => pageFixture)
 * })
 * const controller = new Controller(api, [])
 * ```
 */
function stubAPI(methods: object): IContentAPI {
  return {
    getData<T = unknown>() {
      return Promise.resolve({} as T)
    },
    getPageByPath() {
      return Promise.resolve(undefined)
    },
    ...methods
  }
}
