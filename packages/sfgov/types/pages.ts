import {
  BlockType,
  TypeCallToActionBlock,
  TypeCostBlock,
  TypeDateTimeBlock,
  TypeEmailBlock,
  TypeImageBlock,
  TypeLocationBlock,
  TypePhoneNumberBlock,
  TypeStepBlock,
  TypeTitleAndTextBlock,
  TypeWhatToDoBlock,
  TypeQuickLinkBlock,
  TypeSocialMediaBlock,
  TypeContentSectionBlock,
  TypeServicesSectionBlock,
  TypeSpotlightBlock,
  TypeResourcesSectionBlock
} from './blocks'
import { WagtailImageData } from './images'

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

export type MinimalPageData = {
  id: number
  meta: MinimalMeta
  title: string
  // should we add description here?
}

export type PageMeta<Parent extends MinimalPageData = MinimalPageData> =
  MinimalMeta & {
    parent?: Parent | undefined
  }

export type PageData = object &
  MinimalPageData & {
    meta: PageMeta<PageData>
  }

export type RelatedContentData = Omit<PageData, 'title'> & {
  page_content: PageData
}

export type RelatedContentTransactionBlock = BlockType<
  'transaction',
  MinimalPageData
>

export type EventPageData = PageData & {
  description: string
  date_time: TypeDateTimeBlock[]
  cost: TypeCostBlock[]
  location: TypeLocationBlock[]
  call_to_action: TypeCallToActionBlock[]
  image: TypeImageBlock
  body: string
  contact: (TypeEmailBlock | TypePhoneNumberBlock)[]
  related_content_agencies: RelatedContentData[]
  related_content_topics: RelatedContentData[]
}

export type InfoPageSection = TypeImageBlock | TypeTitleAndTextBlock

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
  steps?: TypeStepBlock[]
  related_content_agencies: RelatedContentData[]
  related_content_topics: RelatedContentData[]
}

export type AgencyPage = PageData & {
  description: string
}

export type GetHelpBlockTypes =
  | TypeEmailBlock
  | TypePhoneNumberBlock
  | TypeLocationBlock
  | TypeTitleAndTextBlock

export type TransactionPageData = PageData & {
  description: string
  cost: TypeCostBlock[]
  things_to_know: TypeTitleAndTextBlock[]
  what_to_do: TypeWhatToDoBlock[]
  special_cases: TypeTitleAndTextBlock[]
  custom_section: TypeTitleAndTextBlock[]
  get_help: GetHelpBlockTypes[]
  good_for_community: TypeTitleAndTextBlock[]
  related_content_topics: RelatedContentData[]
  related_content_agencies: RelatedContentData[]
  related_content_pages: RelatedContentData[]
}

export type ProfilePageData = PageData & {
  first_name: string
  last_name: string
  pronouns: string
  profile_type: string
  primary_job_title: string
  primary_job_title_line_2: string
  related_content_agencies: RelatedContentData[]
  show_contact: boolean
  image: WagtailImageData
  biography: string
  email: string
  phone: BlockType<'phone', string>[]
  social_media: TypeSocialMediaBlock[]
  contact_address: TypeLocationBlock[]
  contact: (TypeEmailBlock | TypePhoneNumberBlock)[]
  spotlight: TypeSpotlightBlock[]
  quick_links: TypeQuickLinkBlock[]
}

export type ContactFooterBlockTypes =
  | TypeEmailBlock
  | TypePhoneNumberBlock
  | TypeLocationBlock
  | TypeTitleAndTextBlock

export type TopicPageData = PageData & {
  description: string
  related_content_topics: RelatedContentData[]
  content_top: TypeContentSectionBlock[]
  services: TypeServicesSectionBlock[]
  spotlight: TypeSpotlightBlock[]
  content: TypeContentSectionBlock[]
  resources: TypeResourcesSectionBlock[]
  related_content_agencies: RelatedContentData[]
}
