import {
  BlockType,
  TypeBodyTextBlock,
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
  TypeResourcesSectionBlock,
  TypeAlertBlock,
  TypeImageWithTextBlock,
  TypeAccordionSectionBlock,
  TypeOnlineEventBlock,
  TypeAgendaItemBlock,
  TypeVideoBlock,
  TypeDownloadableFilesBlock,
  ConfirmationBodyBlock,
  TypeEmbeddedContentBlock,
  TypeDataStoriesSectionBlock,
  TypeCalloutBlock,
  TypeContactFooterBlock,
  TopicFieldTypes,
  TypeProfileGroupBlock,
  TypeContactFooterBlockValues,
  TypeDivisionsSubcommitteeBlock,
  TypeDateTimeValues,
  TypeDocumentBlock,
  TypeTileBlockValues
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
  page_content?: MinimalPageData
  title: string
  image?: WagtailImageData
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

export type RelatedContentData = MinimalPageData

export type PrimaryAgencyData = {
  primary_agency: RelatedContentData
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
  image: WagtailImageData
  body: string
  contact: TypeContactFooterBlock[]
  partner_agencies: RelatedContentData[]
  topics: RelatedContentData[]
}

export type InfoPageSection =
  | TypeImageBlock
  | TypeTitleAndTextBlock
  | TypeCalloutBlock

export type InfoPageData = PageData &
  PrimaryAgencyData & {
    description: string
    information_section?: InfoPageSection[]
    part_of: RelatedContentData[]
    partner_agencies: RelatedContentData[]
    topics: RelatedContentData[]
    related: RelatedContentData[]
  }

export type StepByStepData = PageData & {
  description: string
  intro: string
  steps?: TypeStepBlock[]
  partner_agencies: RelatedContentData[]
  topics: RelatedContentData[]
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
  supporting_information: TypeTitleAndTextBlock[]
  custom_section: TypeTitleAndTextBlock[]
  get_help: GetHelpBlockTypes[]
  good_for_community: TypeTitleAndTextBlock[]
  topics: RelatedContentData[]
  partner_agencies: RelatedContentData[]
  related: RelatedContentData[]
}

export type ProfilePageData = PageData &
  PrimaryAgencyData & {
    title: string
    pronouns: string
    profile_type: string
    primary_job_title: string
    primary_job_title_line_2: string
    partner_agencies: RelatedContentData[]
    image: WagtailImageData
    biography: string
    email: string
    phone: BlockType<'phone', string>[]
    social_media: TypeSocialMediaBlock[]
    contact: TypeContactFooterBlock[]
    spotlight: TypeSpotlightBlock[]
    quick_links: TypeQuickLinkBlock[]
    additional_roles: []
  }

export type TopicPageData = PageData & {
  description: string
  top_level_topic: boolean
  fields: TopicFieldTypes[]
  partner_agencies: RelatedContentData[]
}

export type NewsPageData = PageData & {
  headline: string
  date: string
  image: WagtailImageData
  abstract: string
  body: string
  news_type: string
  partner_agencies: RelatedContentData[]
}

export type AboutPageData = PageData &
  PrimaryAgencyData & {
    about_info: TypeTitleAndTextBlock[]
    resources: (TypeDownloadableFilesBlock | TypeResourcesSectionBlock)[]
  }

export type LocationPageData = PageData & {
  location_name: string
  description: string
  alert: TypeAlertBlock[]
  location_address: TypeLocationBlock[]
  contact: TypeContactFooterBlock[]
  image: WagtailImageData
  body: string
  intro: string
  accordions: TypeTitleAndTextBlock[]
  parking: TypeTitleAndTextBlock[]
  accessibility: TypeTitleAndTextBlock[]
  public_transportation: TypeTitleAndTextBlock[]
  services: TypeServicesSectionBlock[]
  related_locations: RelatedContentData[]
  at_this_location: RelatedContentData[]
  people: TypeProfileGroupBlock[]
  about_location: string
}

type TypeAgencyEvents = {
  upcoming?: (RelatedContentData & TypeDateTimeValues)[]
  past?: (RelatedContentData & TypeDateTimeValues)[]
}

type TypeAgencyNews = {
  id: number
  news_type: string
  title: string
  date: string
}

export type AgencyPageData = PageData & {
  description: string
  logo?: WagtailImageData
  main_image?: WagtailImageData
  alert: TypeAlertBlock[]
  spotlight_1: TypeSpotlightBlock[]
  quicklinks: TypeQuickLinkBlock[]
  meeting_information: (TypeLocationBlock | TypeTitleAndTextBlock)[]
  meeting_archive_date: string
  meeting_archive_url: string
  services: TypeServicesSectionBlock[]
  spotlight_2: TypeSpotlightBlock[]
  resources: TypeResourcesSectionBlock[]
  about_description: string
  events: TypeAgencyEvents
  news: TypeAgencyNews[]
  child_agency_section_title: string
  part_of: RelatedContentData[]
  related_child_agencies: RelatedContentData[]
  partner_agencies: RelatedContentData[]
  call_to_action: TypeCallToActionBlock[]
  divisions_subcommittees: TypeDivisionsSubcommitteeBlock[]
  people: TypeProfileGroupBlock[]
  social_media: TypeSocialMediaBlock[]
  contact: TypeContactFooterBlock[]
  public_records: (
    | BlockType<'link', string>
    | BlockType<'email', string>
    | BlockType<'phone', string>
  )[]
  archive_url: string
  archive_date: string
  agency_redirect: string
  related_topics: RelatedContentData[]
  related_news: RelatedContentData[]
}

export type CampaignPageData = PageData & {
  logo: WagtailImageData
  background_header_image: WagtailImageData
  theme: 'blue' | 'black' | 'green' | 'orange' | ''
  spotlight_1: TypeSpotlightBlock[]
  facts_title: string
  fact_items: (BlockType<'image', WagtailImageData> | TypeTitleAndTextBlock)[]
  additional_content: (
    | TypeImageWithTextBlock
    | TypeResourcesSectionBlock
    | TypeAccordionSectionBlock
  )[]
  spotlight_2: TypeSpotlightBlock[]
  about_campaign: string
  partner_agencies: RelatedContentData[]
  related_links: RelatedContentData[]
}

export type MeetingPageData = PageData & {
  primary_agencies: RelatedContentData[]
  partner_agencies: RelatedContentData[]
  cancelled: boolean
  date_time: TypeDateTimeBlock[]
  meeting_location: (TypeLocationBlock | TypeOnlineEventBlock)[]
  overview: string
  agenda: TypeAgendaItemBlock[]
  videos: TypeVideoBlock[]
  notices: TypeTitleAndTextBlock[]
  related_documents: TypeDownloadableFilesBlock[]
}

export type DataStoryPageData = PageData & {
  description: string
  content: TypeContentSectionBlock[]
  partner_agencies: RelatedContentData[]
}

export type ReportPageData = PageData & {
  date: string
  print_version: TypeDocumentBlock | undefined
  spotlight: TypeSpotlightBlock[]
  content: TypeBodyTextBlock[]
  partner_agencies: RelatedContentData[]
}

export type FormPageData = PageData & {
  schema_url: string
  confirmation_title: string
  confirmation_body: ConfirmationBodyBlock[]
  get_help: (
    | TypeLocationBlock
    | TypeEmailBlock
    | TypePhoneNumberBlock
    | TypeTitleAndTextBlock
  )[]
  partner_agencies: RelatedContentData[]
}

export type ResourceCollectionPageData = PageData & {
  description: string
  data_dashboard: TypeEmbeddedContentBlock[]
  introductory_text: TypeTitleAndTextBlock[]
  body: Array<
    | BlockType<'documents', TypeDocumentBlock[]>
    | BlockType<'data_stories', TypeDataStoriesSectionBlock[]>
    | BlockType<'resources', TypeResourcesSectionBlock[]>
  >
  custom_section: TypeTitleAndTextBlock[]
  topics: RelatedContentData[]
  partner_agencies: RelatedContentData[]
}

export type HomePageData = PageData & {
  spotlight: TypeSpotlightBlock[]
  top_services: BlockType<'services', TypeTileBlockValues>[]
  featured_topics: BlockType<'topics', TypeTileBlockValues>[]
  sf_government: TypeProfileGroupBlock[]
}
