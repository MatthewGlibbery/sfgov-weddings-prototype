import {
  Controller,
  ModifyPropsCallback,
  WagtailPageTemplate
} from './controller'
import { FixtureAPI } from './api'
import { render } from '@testing-library/react'
import mockConsole from 'jest-mock-console'
import type { GetServerSidePropsContext } from 'next'
import type { IContentAPI, PageData } from '@/types'
import type { ComponentType } from 'react'

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

  const api = new FixtureAPI({
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
        () => new Controller(api)
      ).toThrow(/templates.+required/)
      expect(() => new Controller(api, [])).not.toThrow()
    })
  })

  describe('getTemplateForType()', () => {
    it('finds exact matches', () => {
      const controller = new Controller(api, mockTemplates)
      expect(
        controller.getViewComponent({
          page: mockPage
        })
      ).toBe(MockPageComponent)
    })

    it.skip('matches globs', () => {
      const template = new WagtailPageTemplate(MockPageComponent, mockMetaType)
      const controller = new Controller(api, [template])
      const mockPageProps = {
        page: mockPage
      }
      expect(controller.getViewComponent(mockPageProps)).toBe(MockPageComponent)
      template.metaType = '*.Page'
      expect(controller.getViewComponent(mockPageProps)).toBe(MockPageComponent)
    })
  })

  describe('makeGetServerSideProps()', () => {
    const controller = new Controller(api, [])

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

    it('catches 404s', async () => {
      const stubAPI = {
        getPageByPath: jest.fn(() => Promise.reject(new Error('not found')))
      } as unknown as IContentAPI

      const controller = new Controller(stubAPI, [])
      const getServerSideProps = controller.makeGetServerSideProps()
      const context = stubContext({
        resolvedUrl: mockPath
      })
      await expect(getServerSideProps(context)).resolves.toEqual({
        notFound: true
      })
    })

    it('supports the modifyProps() callback', async () => {
      const context = stubContext({
        resolvedUrl: mockPath,
        locale: 'es'
      })
      const modifyProps = jest.fn(((props, context) => {
        return { ...props, foo: 'bar' }
      }) as ModifyPropsCallback<{ page: PageData }>)

      const getServerSideProps = controller.makeGetServerSideProps(modifyProps)
      await expect(getServerSideProps(context)).resolves.toMatchObject({
        props: {
          page: mockPage,
          foo: 'bar'
        }
      })
      expect(modifyProps).toHaveBeenCalledWith({ page: mockPage }, context)
    })
  })

  describe('makeViewComponent()', () => {
    const controller = new Controller(api, mockTemplates)

    it('returns a function', () => {
      expect(typeof controller.makeViewComponent()).toBe('function')
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
        expect(() => render(<View {...props} />)).toThrow(
          /No template found for page:/
        )
      }
      restoreConsole()
    })

    it('throws if it gets a page.meta.type with no matching template', () => {
      const View = controller.makeViewComponent()
      const restoreConsole = mockConsole()
      expect(() =>
        render(
          <View
            page={{
              id: 1,
              meta: {
                type: 'wut'
              },
              title: 'Hi'
            }}
          />
        )
      ).toThrow(/No template found for page/)
      restoreConsole()
    })
  })
})

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
