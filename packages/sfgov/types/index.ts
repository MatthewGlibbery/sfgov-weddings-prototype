import type { AlertData, PageData } from './pages'

export * from './pages'
export * from './blocks'
export * from './images'

export type QueryParams = {
  locale?: string
  translation_of?: number
  preview?: boolean
} & Record<string, string | number | boolean | undefined>

/**
 * The Content API interface implements the bare minimum of methods necessary to
 * get arbitrary JSON data by path. Implementations can decide what to do with
 * the paths, e.g. joining them onto a base URL for fetch or just
 * looking up data in a map.
 */
export interface IContentAPI {
  getData<T = unknown>(
    path: string,
    params?: QueryParams,
    options?: RequestInit
  ): Promise<T>
  getPageByPath<T extends PageData = PageData>(
    path: string,
    params?: QueryParams,
    options?: RequestInit
  ): Promise<T | undefined>
  getAlerts<T = unknown>(
    params?: QueryParams,
    options?: RequestInit
  ): Promise<T>
}

/**
 * PageProps are the common interface for props generated via a Controller's
 * getServerSideProps(). The first generic argument is the expected "page" prop
 * data type, which _should_ extend {@link PageData} and will be assumed
 * unknown if it doesn't.
 */
export type PageProps<T, SpecificData = T extends PageData ? T : unknown> = {
  page: SpecificData
  alerts?: AlertData
  env?: Record<string, string | undefined>
}
