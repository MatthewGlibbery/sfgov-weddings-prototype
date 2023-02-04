import { GetServerSidePropsContext } from 'next'
import { Controller, PageComponent } from './controller'
import type { IContentAPI, PageData, QueryParams } from './types'
import type { RequestOptions } from 'node-mocks-http'

class MockAPI implements IContentAPI {
  private pageByPathData: Record<string, PageData>

  constructor (pageByPathData: Record<string, PageData>) {
    this.pageByPathData = pageByPathData
  }

  getPageByPath<T extends PageData = PageData> (path: string, params?: QueryParams, options?: RequestInit): Promise<T> {
    return Promise.resolve(this.pageByPathData[path] as T)
  }
}

describe('Controller', () => {
  const mockPath = 'departments/sf-environment'
  const mockPage = {
    meta: {
      type: 'sfgov.Info'
    }
  }
  const api = new MockAPI({
    [mockPath]: mockPage
  })

  const MockPageTemplate: PageComponent = props => <>{props.page.meta.type}</>

  describe('constructor', () => {
    it('requires a ContentAPI and template map', () => {
      expect(
        // @ts-expect-error
        () => new Controller()
      ).toThrow(/ContentAPI.+required/)
      expect(
        // @ts-expect-error
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
      let controller = new Controller(api, { 'mock.*': MockPageTemplate })
      expect(controller.getTemplateForType('mock.Page')).toBe(MockPageTemplate)
      controller = new Controller(api, { '*.Page': MockPageTemplate })
      expect(controller.getTemplateForType('mock.Page')).toBe(MockPageTemplate)
    })
  })

  describe('getPageProps()', () => {
    it('works', async () => {
      const controller = new Controller(api, {
        'sfgov.Info': MockPageTemplate
      })
      expect(controller.getPageProps('departments/sf-environment'))
        .resolves.toEqual({
          page: mockPage,
          path: mockPath,
          locale: null
        })
      expect(controller.getPageProps('departments/sf-environment', { locale: 'es' }))
        .resolves.toEqual({
          page: mockPage,
          path: mockPath,
          locale: 'es'
        })
    })
  })

  describe('makeGetServerSideProps()', () => {
    type StubContextOptions = Partial<GetServerSidePropsContext> & {
      req?: RequestOptions
    }

    const controller = new Controller(api, {
      'test.Page': MockPageTemplate
    })

    it('returns a function', () => {
      expect(typeof controller.makeGetServerSideProps()).toBe('function')
    })

    it('returns a function that resolves to GetServerSideProps', () => {
      const getServerSideProps = controller.makeGetServerSideProps()
      const context = stubContext({
        resolvedUrl: mockPath
      })
      expect(getServerSideProps(context)).resolves.toMatchObject({
        props: {
          page: mockPage,
          path: mockPath,
          locale: null
        }
      })
    })

    function stubContext (c: StubContextOptions): GetServerSidePropsContext {
      return {
        defaultLocale: 'en',
        query: c.query || {},
        params: {},
        ...c
      } as unknown as GetServerSidePropsContext
    }
  })
})
