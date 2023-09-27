import {
  BlockType,
  TypeCallToActionBlock,
  TypeCostBlock,
  TypeContentTileBlock,
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
  TypeResourcesSectionBlock,
  TypeAlertBlock,
  TypeImageWithTextBlock,
  TypeAccordionSectionBlock,
  TypeOnlineEventBlock,
  TypeAgendaItemBlock,
  TypeVideoBlock,
  TypeDownloadableFilesBlock
} from './blocks'
import { WagtailImageData } from './images'

export type MinimalMeta = {
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

export type NewsPageData = PageData & {
  headline: string
  date: string
  image: WagtailImageData
  abstract: string
  body: string
  news_type: string
  related_content_agencies: RelatedContentData[]
}

export type AboutPageData = PageData & {
  description: string
  agency: PageData
  about_info: TypeTitleAndTextBlock[]
  resources: TypeResourcesSectionBlock[]
}

export type LocationPageData = PageData & {
  location_name: string
  description: string
  alert: TypeAlertBlock[]
  location_address: TypeLocationBlock[]
  contact: (TypeEmailBlock | TypePhoneNumberBlock)[]
  image: WagtailImageData
  body: string
  intro: string
  accordions: TypeTitleAndTextBlock[]
  parking: TypeTitleAndTextBlock[]
  accessibility: TypeTitleAndTextBlock[]
  public_transportation: TypeTitleAndTextBlock[]
  services: TypeServicesSectionBlock[]
  related_content_part_of: RelatedContentData[]
  related_content_pages: RelatedContentData[]
  related_content_agencies: RelatedContentData[]
  about_location: string
}

type TypeEventsAndMeetingsByDate = {
  upcoming?: RelatedContentData[]
  past?: RelatedContentData[]
}

export type AgencyPageData = PageData & {
  description: string
  logo?: WagtailImageData
  main_image?: WagtailImageData
  alert: TypeAlertBlock[]
  spotlight_primary: TypeSpotlightBlock[]
  quicklinks: TypeQuickLinkBlock[]
  meetings: (TypeLocationBlock | TypeTitleAndTextBlock)[]
  meeting_archive_date: string
  meeting_archive_url: string
  services: TypeServicesSectionBlock[]
  spotlight_secondary: TypeSpotlightBlock[]
  resources: TypeResourcesSectionBlock[]
  about_description: string
  child_agency_section_title: string
  part_of: RelatedContentData[]
  related_child_agencies: RelatedContentData[]
  related_content_agencies: RelatedContentData[]
  call_to_action: TypeCallToActionBlock[]
  social_media: TypeSocialMediaBlock[]
  contact: (TypeLocationBlock | TypeEmailBlock | TypePhoneNumberBlock)[]
  public_records: (
    | BlockType<'link', string>
    | BlockType<'email', string>
    | BlockType<'phone', string>
  )[]
  archive_url: string
  archive_date: string
  agency_redirect: string
  related_content_topics: RelatedContentData[]
  related_events: TypeEventsAndMeetingsByDate
  related_news: RelatedContentData[]
}

export type CampaignPageData = PageData & {
  logo: WagtailImageData
  theme: string
  header_spotlight: TypeSpotlightBlock[]
  facts_title: string
  fact_items: (BlockType<'image', WagtailImageData> | TypeTitleAndTextBlock)[]
  additional_content: (
    | TypeImageWithTextBlock
    | TypeResourcesSectionBlock
    | TypeAccordionSectionBlock
  )[]
  spotlight: TypeSpotlightBlock[]
  about_campaign: string
  related_content_agencies: RelatedContentData[]
  related_links: TypeContentTileBlock[]
}

export type MeetingPageData = PageData & {
  related_content_agencies: RelatedContentData[]
  cancelled: boolean
  date_time: TypeDateTimeBlock[]
  meeting_location: (TypeLocationBlock | TypeOnlineEventBlock)[]
  overview: string
  agenda: TypeAgendaItemBlock[]
  videos: TypeVideoBlock[]
  notices: TypeTitleAndTextBlock[]
  meeting_documents: TypeDownloadableFilesBlock[]
}
