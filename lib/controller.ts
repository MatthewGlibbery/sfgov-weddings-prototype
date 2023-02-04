import { ComponentType } from 'react'
import { isMatch } from 'micromatch'
import type { IContentAPI, PageData, PageProps, QueryParams } from './types'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { i18n } from '../next.config'

const DEFAULT_LOCALE = i18n.defaultLocale

/**
 * A PageComponent is a React comoponent type that accepts
 * a props object extending PageProps:
 *
 * ```ts
 * type AgencyProps = PageProps &  {
 *   title: string
 * }
 * const AgencyPage: PageComponent<AgencyProps> = (...)
 * ```
 */
export type PageComponent<P extends PageProps = PageProps> = ComponentType<P>

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

export class Controller {
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

  makeGetServerSideProps<P extends PageData = PageData> (options?: {
    overridePath?: string
  }): GetServerSideProps<PageProps<P>> {
    return async context => {
      const { locale } = context
      const path = options?.overridePath || this.getContextPath(context)
      if (locale && locale !== DEFAULT_LOCALE) {
        const props = await Promise.any([
          this.getPageProps<P>(path, { locale }),
          this.getPageProps<P>(path)
        ])
        return props
          ? { props }
          : { notFound: true }
      }
      const props = await this.getPageProps<P>(path)
      return props
        ? { props }
        : { notFound: true }
    }
  }

  async getPageProps<P extends PageData = PageData> (path: string, params?: QueryParams, options?: RequestInit): Promise<PageProps<P>> {
    // console.info('getPageProps():', path, params)
    const data = await this.api.getPageByPath<P>(path, params, options)
    return {
      page: data,
      path,
      locale: params?.locale || null
    }
  }

  getContextPath (context: GetServerSidePropsContext) {
    const { resolvedUrl, params } = context
    return Array.isArray(params.path)
      ? params.path.join('/')
      : resolvedUrl
  }

  getTemplateForType<P extends PageProps = PageProps> (type: string) {
    if (this.templateMap.has(type)) {
      return this.templateMap.get(type)
    }
    for (const [pattern, template] of this.templates) {
      if (isMatch(type, pattern)) {
        this.templateMap.set(type, template)
        return template as PageComponent<P>
      }
    }
  }
}
