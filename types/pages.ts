import { SpotlightBlock, QuickLinkBlock, BlockType, ServiceSectionBlock, ContactBlock } from './blocks'
import { WagtailImageData } from './images'

export type PageMeta = {
  type: string
  locale?: string
  url_path?: string
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

export type PageData<M extends PageMeta = PageMeta> = {
  id?: number
  meta: M
  title?: string
}

export type ParentMeta<P extends PageData = PageData> = {
  id: number
  title?: string
  meta: P['meta']
}

export type AgencyData = PageData<PageMeta & {
  parent?: ParentMeta
}> & {
  title: string
  logo?: WagtailImageData
  description: string
  spotlight1?: SpotlightBlock[]
  quick_links?: QuickLinkBlock[]
  service_section?: ServiceSectionBlock[],
  spotlight2?: SpotlightBlock[],
  contact?: ContactBlock[]
}

export type AgencyParent = AgencyData['meta']['parent']

export type ImageBlock = BlockType<'image', number | WagtailImageData>

export type TitleAndTextBlock = BlockType<'title_and_text', {
  title: string
  text: string
}>

export type RelatedContentData = PageData<PageMeta> & {
  page_content: PageData
}

export type InfoPageData = PageData<PageMeta> & {
  title: string
  description: string
  information_section?: (ImageBlock | TitleAndTextBlock)[]
  related_content_part_of?: RelatedContentData[]
  related_content_agencies?: RelatedContentData[]
  related_content_topics?: RelatedContentData[]
  related_content_page?: RelatedContentData[]

}
