import { GetServerSideProps } from 'next'
import { FunctionComponent } from 'react'
import { PageData } from './pages'

export * from './pages'
export * from './blocks'
export * from './images'

export type QueryParams = {
  locale?: string | undefined
  translation_of?: number
} & Record<string, string | number | undefined>

export interface IContentAPI {
  loadJSON<T = unknown> (path: string, params?: QueryParams, options?: RequestInit): Promise<T>
  getPageByPath<T extends PageData = PageData> (path:string, params?: QueryParams, options?: RequestInit): Promise<T>
}

export interface PageProps<SpecificData extends PageData = PageData> {
  page: SpecificData
}

export type ReferenceLoader<SpecificData extends PageData = PageData> = (
  (data: SpecificData, api: IContentAPI) => Promise<void> | void
)

export type PageComponent<SpecificData extends PageData = PageData> = FunctionComponent<PageProps<SpecificData>> & {
  loadReferences?: ReferenceLoader<SpecificData>
}

export interface IController {
  makeGetServerSideProps (): GetServerSideProps<PageProps>
  makeViewComponent (): PageComponent
}

export type FetchImpl = typeof fetch
