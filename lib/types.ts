
export type PageMeta = {
  type: string
  locale?: string
  detail_url?: string
  html_url?: string
  slug?: string
  show_in_menus?: boolean
  seo_title?: string
  search_description?: string
  first_published_at?: string
  alias_of?: object
  parent?: object
}

export type PageData<M extends object = {}> = {
  id?: number
  meta: PageMeta & M
}

export type PageProps<P extends PageData = PageData> = {
  page?: P
  path: string
  locale: string
}

export type QueryParams = {
  locale?: string
  [param: string]: string
}

export interface IContentAPI {
  getPageByPath<T extends PageData = PageData> (path:string, params?: QueryParams, options?: RequestInit): Promise<T>
}

export type FetchImpl = typeof fetch

export type WagtailImage = PageData<{
  download_url: string
}> & {
  title: string
}

export type GenericBlock<T extends string = string, V = any> = {
  type: T
  value: V
  id: string
}

export type CallToAction = {
  button_text: string
  button_page?: number
  button_url?: string
}

export type SpotlightBlock = GenericBlock<'spotlight', {
  title: string
  description: string
  image: number
  cta: CallToAction
}>

export type QuickLinkBlock = GenericBlock<'quick_links', {
  title: string
  internal_page?: number
  external_url: string
  description: string
}>
