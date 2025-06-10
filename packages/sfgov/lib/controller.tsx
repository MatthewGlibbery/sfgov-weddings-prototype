import { ErrorBoundary, ErrorFallbackReport } from '@/components'
import type { IContentAPI, PageData, PageProps } from '@/types'
import type { GetServerSideProps } from 'next'
import type { ComponentType } from 'react'
import safeJsonStringify from 'safe-json-stringify'
import { getPublicEnv } from './env'

// "unknown" page props literally have { page: unknown }
type UnknownPageProps = PageProps<unknown>

// And "known" page props have a "page" prop that explicitly extends PageData
type KnownPageProps = PageProps<PageData>

/**
 * A page component is just a React component that takes a "page" prop of a
 * known type. The Controller implementation distinguishes "unknown" page props
 * from "known" page props, which are assumed to have a "page" prop whose type
 * extends {@link PageData}.
 *
 * NB: This type will _not_ work as expected in page component declarations
 * (that's why it's not exported). You should use
 * `ComponentType<{ page: SpecificPageData }>` or
 * `ComponentType<PageProps<SpecificPageData>>` instead.
 */
type PageComponent<T extends PageData = PageData> = Omit<
  ComponentType<PageProps<T>>,
  'propTypes'
>

/**
 * IPageTemplate is the interface that page template objects (or classes) need
 * to implement in order for the {@link Controller} class to use them. The
 * interface is generic so that TypeScript can infer both the component props
 * and canRender() type predicate.
 */
export interface IPageTemplate<SpecificPageData extends PageData = PageData> {
  canRender(data: unknown): data is SpecificPageData
  component: PageComponent<SpecificPageData>
}

/**
 * The WagtailPageTemplate is a page template class that implements
 * {@link IPageTemplate} using components whose "page" prop is narrowly typed to
 * extend {@link PageData}. The generic types are inferred from the first
 * constructor argument so that you don't have to provide them, and TypeScript
 * will complain if the component doesn't accept a "page" prop that extends
 * PageData:
 *
 * ```ts
 * new WagtailPageTemplate((props: { page: string }) => null, 'whatever')
 * ```
 */
export class WagtailPageTemplate<
  PageComponentType extends PageComponent,
  SpecificPageData extends PageData = PageComponentType extends PageComponent<
    infer T extends PageData
  >
    ? T
    : never
> implements IPageTemplate<SpecificPageData>
{
  metaType: string
  component: PageComponent<SpecificPageData>

  constructor(component: PageComponentType, metaType: string) {
    this.component = component as PageComponent<SpecificPageData>
    this.metaType = metaType
  }

  canRender(data: unknown): data is SpecificPageData {
    return (data as PageData)?.meta?.type === this.metaType
  }
}

export class Controller {
  api: IContentAPI
  templates: IPageTemplate[]

  constructor(api: IContentAPI, templates: IPageTemplate[]) {
    if (!api) {
      throw new Error('A ContentAPI is required')
    } else if (!Array.isArray(templates)) {
      throw new Error('An array of templates is required')
    }
    this.api = api
    this.templates = templates
  }

  makeGetServerSideProps<
    Page extends PageData,
    Props extends PageProps<Page> = PageProps<Page>
  >(): GetServerSideProps<Props> {
    return async (context) => {
      const { resolvedUrl, locale, query, req } = context
      const path = resolvedUrl.split('?')[0]
      const page = await this.api.getPageByPath<Page>(
        path,
        {
          locale,
          preview: query.preview === 'true'
        },
        {
          headers: {
            cookie: req.headers.cookie as string
          }
        }
      )
      if (!page) {
        return { notFound: true }
      }

      // redirect based off field in the model
      // @ts-expect-error page may be AgencyPageData
      const redirect = page.redirect_url || page.agency_redirect
      if (redirect && query.preview !== 'true') {
        return {
          redirect: {
            destination: redirect,
            permanent: false
          }
        }
      }
      const props = {
        page,
        env: getPublicEnv()
      } as Props

      return {
        props
      }
    }
  }

  getViewComponent(props: UnknownPageProps): ComponentType<KnownPageProps> {
    const { page } = props
    if (page) {
      for (const template of this.templates) {
        if (template.canRender(page)) {
          return template.component as ComponentType<KnownPageProps>
        }
      }
    }
    throw new Error(
      `No template found for page: ${
        typeof props.page === 'object'
          ? safeJsonStringify(props.page as object)
          : 'null'
      }`
    )
  }

  makeViewComponent(): ComponentType<KnownPageProps> {
    const getViewComponent = this.getViewComponent.bind(this)
    return function ControllerView(props) {
      const Component = getViewComponent(props)
      return (
        <ErrorBoundary FallbackComponent={ErrorFallbackReport}>
          <Component {...props} />
        </ErrorBoundary>
      )
    }
  }
}
