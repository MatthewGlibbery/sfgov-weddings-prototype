import {
  BlockType,
  CallToActionBlock,
  CostBlock,
  DateTimeBlock,
  EmailBlock,
  ImageBlock,
  LocationBlock,
  PhoneNumberBlockType,
  StepBlock,
  TitleAndTextBlock,
  WhatToDoBlock
} from './blocks'

interface MinimalMeta {
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
}

interface MinimalPageData {
  id: number
  meta: MinimalMeta
  title: string
  // should we add description here?
}

export interface PageMeta<Parent extends MinimalPageData = MinimalPageData> extends MinimalMeta {
  parent?: Parent | undefined
}

export type PageData = MinimalPageData & {
  meta: PageMeta<PageData>
}

export type RelatedContentData = Omit<PageData, 'title'> & {
  page_content: PageData
}

export type RelatedContentTransactionBlock = BlockType<'transaction', MinimalPageData>

export type InfoPageSection = ImageBlock | TitleAndTextBlock

export interface EventPageData extends PageData {
  description: string
  date_time: DateTimeBlock[]
  cost: CostBlock[]
  location: LocationBlock[]
  call_to_action: CallToActionBlock[]
  image: ImageBlock
  body: string
  contact: (EmailBlock | PhoneNumberBlockType)[]
  related_content_agencies: RelatedContentData[]
  related_content_topics: RelatedContentData[]
}

export interface InfoPageData extends PageData {
  description: string
  information_section?: InfoPageSection[]
  related_content_part_of: RelatedContentData[]
  related_content_agencies: RelatedContentData[]
  related_content_topics: RelatedContentData[]
  related_content_pages: RelatedContentData[]
}

export interface StepByStepData extends PageData {
  description: string
  intro: string
  steps?: StepBlock[]
  related_content_agencies: RelatedContentData[]
  related_content_topics: RelatedContentData[]
}

export interface AgencyPage extends PageData {
  description: string
}

export type GetHelpBlockTypes = EmailBlock | PhoneNumberBlockType | LocationBlock | TitleAndTextBlock

export interface TransactionPageData extends PageData {
  description: string
  cost: CostBlock[]
  things_to_know: TitleAndTextBlock[]
  what_to_do: WhatToDoBlock[]
  special_cases: TitleAndTextBlock[]
  custom_section: TitleAndTextBlock[]
  get_help: GetHelpBlockTypes[]
  good_for_community: TitleAndTextBlock[]
  related_content_topics: RelatedContentData[]
  related_content_agencies: RelatedContentData[]
  related_content_pages: RelatedContentData[]
}
