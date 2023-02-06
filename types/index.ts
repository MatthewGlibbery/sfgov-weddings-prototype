import { GetServerSideProps } from 'next'
import { ComponentType } from 'react'
import { PageData } from './pages'

export * from './pages'
export * from './blocks'
export * from './images'

export type QueryParams = {
  locale?: string
  [param: string]: string
}

export interface IContentAPI {
  loadJSON<T = unknown> (path: string, params?: QueryParams, options?: RequestInit): Promise<T>
  getPageByPath<T extends PageData = PageData> (path:string, params?: QueryParams, options?: RequestInit): Promise<T>
}

export type PageProps<P extends PageData = PageData> = {
  page?: P
  path: string
  locale: string
  api?: IContentAPI
}

export type ReferenceLoader<P extends PageData = PageData> = (
  (data: P, api: IContentAPI) => Promise<void> | void
)

/**
 * A PageComponent is a React comoponent type that accepts a props type
 * extending PageProps, and includes references to the content API:
 *
 * ```ts
 * type AgencyProps = PageProps &  {
 *   title: string
 * }
 * const AgencyPage: PageComponent<AgencyProps> = (...)
 * ```
 */
export type PageComponent<P extends PageProps = PageProps> = ComponentType<P> & {
  loadReferences?: ReferenceLoader<P['page']>
}

export type MakeGetServerSidePropsOptions = {
}

export type MakeViewComponentOptions = {
  staticProps?: object
}

export interface IController {
  makeGetServerSideProps<P extends PageData = PageData> (options?: MakeGetServerSidePropsOptions): GetServerSideProps<PageProps<P>>
  makeViewComponent<P extends PageData = PageData> (options?: MakeViewComponentOptions): PageComponent<PageProps<P>>
}

export type FetchImpl = typeof fetch
