import { isMatch } from 'micromatch'
import type { IContentAPI, IController, PageComponent, PageProps, QueryParams } from '../types'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ErrorBoundary, ErrorFallbackReport } from '@/components'

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
  makeGetServerSideProps (): GetServerSideProps<PageProps> {
    return async context => {
      const path = this.getContextPath(context)
      try {
        const props = await this.getPageProps(path, {
          locale: context.locale
        })
        return { props }
      } catch (error) {
        // TODO: log errors
        return { notFound: true }
      }
    }
  }

  makeViewComponent (): PageComponent {
    const getTemplate = (type: string) => this.getTemplateForType(type)
    return function ControllerView (props) {
      if (!props.page?.meta?.type) {
        throw new Error('No page.meta.type found in page props')
      }
      const { type } = props.page.meta
      const Template = getTemplate(type)
      if (!Template) {
        throw new Error(`No template found for page.meta.type "${type}"`)
      }
      return (
        <ErrorBoundary FallbackComponent={ErrorFallbackReport}>
          <Template {...props} />
        </ErrorBoundary>
      )
    }
  }

  async getPageProps (path: string, params?: QueryParams, options?: RequestInit): Promise<PageProps> {
    const data = await this.api.getPageByPath(path, params, options)
    const Template = data?.meta?.type
      ? this.getTemplateForType(data.meta.type)
      : undefined
    if (Template?.loadReferences) {
      // FIXME: we might want to try/catch this
      await Template.loadReferences(data, this.api)
    }
    return { page: data }
  }

  getContextPath (context: GetServerSidePropsContext) {
    return context.resolvedUrl
  }

  getTemplateForType (type: string): PageComponent | undefined {
    if (this.templateMap.has(type)) {
      return this.templateMap.get(type)
    }
    for (const [pattern, template] of this.templates) {
      if (isMatch(type, pattern)) {
        this.templateMap.set(type, template)
        return template
      }
    }
  }
}
