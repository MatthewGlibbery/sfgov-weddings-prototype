import { isMatch } from 'micromatch'
import type { IContentAPI, IController, MakeGetServerSidePropsOptions, MakeViewComponentOptions, PageComponent, PageData, PageProps, QueryParams } from '../types'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { i18n } from '../next.config'
import { renderWithErrorBoundary } from '@/components'

const DEFAULT_LOCALE = i18n?.defaultLocale

/**
 * The map of content types to template components is expressed
 * as an object literal where the keys are glob patterns and the
 * values are PageComponent functions:
 *
 * ```js
 * {
 *   'sfgov.Info': InfoPage
 * }
 * ```
 */
export type ContentTypeTemplateMap = Record<string, PageComponent>

// the internal representation is the Object.entries() transformation
type ContentTypeTemplateMapEntries = [
  string | string[],
  PageComponent
][]

export class Controller implements IController {
  api: IContentAPI
  templates: ContentTypeTemplateMapEntries
  templateMap: Map<string, PageComponent>

  constructor (api: IContentAPI, templates: ContentTypeTemplateMap) {
    if (!api) {
      throw new Error('A ContentAPI instance is required')
    } else if (!templates) {
      throw new Error('A content type template map is required')
    }
    this.api = api
    this.templates = Object.entries(templates)
    this.templateMap = new Map<string, PageComponent>()
  }

  /**
   * Create a getServerSideProps() function from this controller.
   * This is usually used in Next.js page routes:
   *
   * ```ts
   * export const getServerSideProps = controller.makeGetServerSideProps()
   * ```
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  makeGetServerSideProps<P extends PageData = PageData> (options?: MakeGetServerSidePropsOptions): GetServerSideProps<PageProps<P>> {
    return async context => {
      const path = this.getContextPath(context)
      const props = await this.getPageProps<P>(path)
      return props?.page
        ? { props }
        : { notFound: true }
    }
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  makeViewComponent<P extends PageData = PageData> (options?: MakeViewComponentOptions): PageComponent<PageProps<P>> {
    const controller = this
    const { api } = this
    return function ControllerView (props) {
      if (!props.page?.meta?.type) {
        throw new Error('No page.meta.type found in page props')
      }
      const { type } = props.page.meta
      const Template = controller.getTemplateForType<PageProps<P>>(type)
      if (!Template) {
        throw new Error(`No template found for page.meta.type "${type}"`)
      }
      return renderWithErrorBoundary(Template, { ...props, api })
    }
  }

  async getPageProps<P extends PageData = PageData> (path: string, params?: QueryParams, options?: RequestInit): Promise<PageProps<P>> {
    const locale = params?.locale
    let data: P
    if (locale && locale !== DEFAULT_LOCALE) {
      try {
        data = await this.api.getPageByPath<P>(path, params, options)
      } catch (error) {
        params = { ...params }
        delete params.locale
        data = await this.api.getPageByPath<P>(path, params, options)
      }
    } else {
      data = await this.api.getPageByPath<P>(path, params, options)
    }
    const Template = data?.meta?.type
      ? this.getTemplateForType<PageProps<P>>(data.meta.type)
      : undefined
    if (Template?.loadReferences) {
      // FIXME: we might want to try/catch this
      await Template.loadReferences(data, this.api)
    }
    return {
      page: data,
      path,
      locale: params?.locale || null
    }
  }

  getContextPath (context: GetServerSidePropsContext) {
    return context.resolvedUrl
  }

  getTemplateForType<P extends PageProps = PageProps> (type: string): PageComponent<P> | undefined {
    if (this.templateMap.has(type)) {
      return this.templateMap.get(type) as PageComponent<P>
    }
    for (const [pattern, template] of this.templates) {
      if (isMatch(type, pattern)) {
        this.templateMap.set(type, template)
        return template as PageComponent<P>
      }
    }
  }
}
