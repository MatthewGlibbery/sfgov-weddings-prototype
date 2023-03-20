import { Controller } from './controller'
import { FixtureAPI } from './api'
import type { GetServerSidePropsContext } from 'next'
import { PageComponent, PageData, PageProps } from '@/types'
import { render, screen } from '@testing-library/react'
import mockConsole from 'jest-mock-console'

type MockedFunction = ReturnType<typeof jest.fn>

describe('Controller', () => {
  const mockPath = 'departments/sf-environment'
  const mockMetaType = 'sfgov.Info'
  const mockPage = {
    id: 123,
    meta: {
      type: mockMetaType,
      url_path: mockPath
    },
    title: 'Mock page'
  }

  const spanishPage = {
    id: 456,
    meta: {
      type: mockMetaType,
      locale: 'es',
      url_path: mockPath
    },
    title: 'Hola'
  }

  const api = new FixtureAPI({
    pages: [
      mockPage
    ]
  })

  const MockPageTemplate: PageComponent = jest.fn((props: PageProps) => (
    <div>Hello, {props.page.meta.type}!</div>
  ))
  const mockTemplates = {
    [mockMetaType]: MockPageTemplate
  }

  afterEach(() => {
    (MockPageTemplate as MockedFunction).mockClear()
  })

  describe('constructor', () => {
    it('requires a ContentAPI and template map', () => {
      expect(
        // @ts-expect-error testing without any args
        () => new Controller()
      ).toThrow(/ContentAPI.+required/)
      expect(
        // @ts-expect-error testing without a template map
        () => new Controller(api)
      ).toThrow(/template map.+required/)
      expect(
        () => new Controller(api, {})
      ).not.toThrow()
    })
  })

  describe('getTemplateForType()', () => {
    it('finds exact matches', () => {
      const controller = new Controller(api, {
        'mock.Page': MockPageTemplate
      })
      expect(controller.getTemplateForType('mock.Page')).toBe(MockPageTemplate)
    })

    it('matches globs', () => {
      let controller = new Controller(api, {
        'mock.*': MockPageTemplate
      })
      expect(controller.getTemplateForType('mock.Page')).toBe(MockPageTemplate)
      controller = new Controller(api, {
        '*.Page': MockPageTemplate
      })
      expect(controller.getTemplateForType('mock.Page')).toBe(MockPageTemplate)
    })
  })

  describe('getPageProps()', () => {
    it('gets the right page', async () => {
      const controller = new Controller(api, {})
      await expect(controller.getPageProps(mockPath))
        .resolves.toEqual({ page: mockPage })
    })

    it('passes locale to the API', async () => {
      const stubAPI = {
        getPageByPath: jest.fn((path, params) => {
          return params?.locale === 'es'
            ? Promise.resolve(spanishPage)
            : Promise.resolve(mockPage)
        })
      }

      // @ts-expect-error stubAPI doesn't fully implement ContentAPI
      const controller = new Controller(stubAPI, {})
      await expect(controller.getPageProps(mockPath, { locale: 'es' }))
        .resolves.toEqual({ page: spanishPage })
    })

    it('calls Template.loadReferences() if it exists', async () => {
      MockPageTemplate.loadReferences = jest.fn(async (data: PageData) => {
        data.title = 'Hello, world!'
        await new Promise(resolve => setTimeout(resolve, 10))
      })
      const controller = new Controller(api, mockTemplates)
      const props = await controller.getPageProps(mockPath)
      expect(MockPageTemplate.loadReferences).toBeCalledTimes(1)
      expect(props.page.title).toEqual('Hello, world!')
      delete MockPageTemplate.loadReferences
    })
  })

  describe('makeGetServerSideProps()', () => {
    const controller = new Controller(api, {})

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
  })

  describe('makeViewComponent()', () => {
    const controller = new Controller(api, mockTemplates)

    it('returns a function', () => {
      expect(typeof controller.makeViewComponent()).toBe('function')
    })

    it('renders page props', async () => {
      const View = controller.makeViewComponent()
      const props = await controller.getPageProps(mockPath)
      render(<View {...props} />)
      const div = await screen.findByText(/Hello/)
      expect(div).toBeInTheDocument()
      expect(MockPageTemplate).toHaveBeenCalledTimes(1)
    })

    it('throws if page.meta.type is missing in props', () => {
      const View = controller.makeViewComponent()
      const restoreConsole = mockConsole()
      for (const props in [
        {},
        { page: null },
        { page: { meta: null } },
        { page: { meta: { type: null } } }
      ]) {
        // @ts-expect-error not sure what either of these errors is about, tbh
        expect(() => render(<View {...props} />)).toThrow('No page.meta.type found in page props')
      }
      restoreConsole()
    })

    it('throws if it gets a page.meta.type with no matching template', () => {
      const View = controller.makeViewComponent()
      const restoreConsole = mockConsole()
      expect(() => render(<View page={{
        id: 1,
        meta: {
          type: 'wut'
        },
        title: 'Hi'
      }} />)).toThrow('No template found for page.meta.type "wut"')
      restoreConsole()
    })
  })
})

function stubContext (c: Partial<GetServerSidePropsContext>): GetServerSidePropsContext {
  return {
    defaultLocale: 'en',
    query: c.query || {},
    params: {},
    ...c
  } as unknown as GetServerSidePropsContext
}
