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

type MinimalMeta = {
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

type MinimalPageData = {
  id: number
  meta: MinimalMeta
  title: string
  // should we add description here?
}

export type PageMeta<Parent extends MinimalPageData = MinimalPageData> = MinimalMeta & {
  parent?: Parent | undefined
}

export type PageData = object & MinimalPageData & {
  meta: PageMeta<PageData>
}

export type RelatedContentData = Omit<PageData, 'title'> & {
  page_content: PageData
}

export type RelatedContentTransactionBlock = BlockType<'transaction', MinimalPageData>

export type EventPageData = PageData & {
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

export type InfoPageSection = ImageBlock | TitleAndTextBlock

export type InfoPageData = PageData & {
  description: string
  information_section?: InfoPageSection[]
  related_content_part_of: RelatedContentData[]
  related_content_agencies: RelatedContentData[]
  related_content_topics: RelatedContentData[]
  related_content_pages: RelatedContentData[]
}

export type StepByStepData = PageData & {
  description: string
  intro: string
  steps?: StepBlock[]
  related_content_agencies: RelatedContentData[]
  related_content_topics: RelatedContentData[]
}

export type AgencyPage = PageData & {
  description: string
}

export type GetHelpBlockTypes = EmailBlock | PhoneNumberBlockType | LocationBlock | TitleAndTextBlock

export type TransactionPageData = PageData & {
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
