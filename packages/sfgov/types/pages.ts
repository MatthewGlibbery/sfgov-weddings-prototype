import type { FormSchema } from '@/design-system/formio'
import type {
  BlockType,
  LinkBlockValue,
  ServicesSectionBlock,
  TopicFieldTypes,
  TypeAccordionSectionBlock,
  TypeAgendaItemBlock,
  TypeAlertBlock,
  TypeBodyTextBlock,
  TypeCalloutBlock,
  TypeCallToActionBlock,
  TypeContactFooterBlock,
  TypeContentSectionBlock,
  TypeCostBlock,
  TypeDataStoriesSectionBlock,
  TypeDateTimeBlock,
  TypeDateTimeValues,
  TypeDivisionsSubcommitteeBlock,
  TypeDocumentBlock,
  TypeDownloadableFilesBlock,
  TypeEmailBlock,
  TypeEmbeddedContentBlock,
  TypeImageBlock,
  TypeImageWithTextBlock,
  TypeLocationBlock,
  TypeOnlineEventBlock,
  TypePhoneNumberBlock,
  TypeProfileGroupBlock,
  TypeQuickLinkBlock,
  TypeResourcesSectionBlock,
  TypeServicesSectionBlock,
  TypeSocialMediaBlock,
  TypeSpotlightBlock,
  TypeStepBlock,
  TypeTableBlock,
  TypeTextBlock,
  TypeTileBlockValues,
  TypeTitleAndTextBlock,
  TypeVideoBlock,
  TypeWhatToDoBlock
} from './blocks'
import type { WagtailImageData } from './images'

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
  html_path?: string
  redirect_url?: string
  description?: string
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

export type AlertData = {
  alert_style: 'information' | 'critical'
  alert_text: string
  expiration_date: string
  locale: number
  lang: string
}

export type PrimaryAgencyData = {
  primary_agency: RelatedContentData | null
}

export type RelatedContentTransactionBlock = BlockType<
  'transaction',
  MinimalPageData
>

export type EventPageData = PageData &
  PrimaryAgencyData & {
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

export type StepByStepData = PageData &
  PrimaryAgencyData & {
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

export type TransactionPageData = PageData &
  PrimaryAgencyData & {
    description: string
    cost: TypeCostBlock[]
    things_to_know: TypeTitleAndTextBlock[]
    what_to_do: TypeWhatToDoBlock[]
    special_cases: string
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
  content_fields: TopicFieldTypes[]
  partner_agencies: RelatedContentData[]
}

export type NewsPageData = PageData &
  PrimaryAgencyData & {
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

type TypeQLessQueue = {
  id: number
  location_id: number
  name: string
  state: string
  wait_time: number
}

type TypeInnerQLessData = {
  timestamp: string
  queues: TypeQLessQueue[]
}

export type TypeQLessData = {
  data: TypeInnerQLessData
  status: string
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
  services: ServicesSectionBlock[]
  related_locations: RelatedContentData[]
  at_this_location: RelatedContentData[]
  people: TypeProfileGroupBlock[]
  about_location: string
  partner_agencies: RelatedContentData[]
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
  services_title: string
  services: TypeServicesSectionBlock[]
  spotlight_2: TypeSpotlightBlock[]
  resources_title: string
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
  about_page: RelatedContentData[]
}

export type CampaignPageData = PageData &
  PrimaryAgencyData & {
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
    contact: TypeContactFooterBlock[]
  }

export type MeetingPageData = PageData &
  PrimaryAgencyData & {
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

export type DataStoryPageData = PageData &
  PrimaryAgencyData & {
    description: string
    content: TypeContentSectionBlock[]
    partner_agencies: RelatedContentData[]
  }

export type ReportPageData = PageData &
  PrimaryAgencyData & {
    date: string
    print_version: TypeDocumentBlock | undefined
    spotlight: TypeSpotlightBlock[]
    content: (TypeBodyTextBlock | TypeTableBlock)[]
    partner_agencies: RelatedContentData[]
  }

export type FormPageData = PageData & {
  schema_url: string
  schema?: FormSchema
  confirmation_title: string
  // see: https://github.com/SFDigitalServices/platform/blob/v2025-10-29-135629/sf/models/form.py#L107-L109
  confirmation_body: (
    | TypeCalloutBlock
    | TypeTextBlock
    | BlockType<'button_link', LinkBlockValue>
  )[]
  // see: https://github.com/SFDigitalServices/platform/blob/v2025-10-29-135629/sf/models/form.py#L117-L123
  get_help: (
    | TypeLocationBlock
    | TypePhoneNumberBlock
    | TypeEmailBlock
    | TypeTitleAndTextBlock
  )[]
  partner_agencies: RelatedContentData[]
}

export type ResourceCollectionPageData = PageData &
  PrimaryAgencyData & {
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

type TypeEventPrimaryAgency = {
  title: string
  html_url: string
}

export type TypeEventItem = EventPageData &
  MeetingPageData & {
    date_time: TypeDateTimeBlock[]
    overview: string
    meeting_location?: []
    cancelled?: boolean
    description: string
    location?: []
    start_datetime: string
    end_datetime: string
    primary_agency: TypeEventPrimaryAgency
  }

export type TypeChildAgency = {
  id: number
  title: string | undefined
}

export type TypeEventsListingPageData = {
  agency: string
  child_agencies: TypeChildAgency[]
  total: number
  meeting_archive_date: string
  meeting_archive_url: string
  events: TypeEventItem[]
  baseUrl: string
}

export type TypeInPageFilter = {
  childAgencies?: TypeChildAgency[] | undefined
  month?: number
  year?: number
  startDate?: string | undefined
  endDate?: string | undefined
}

export type TypeActiveFilterButton = {
  label: string | undefined
  ariaLabel: string
  removeHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type TypePageTabData = {
  locale: string | undefined
  filter: string | undefined
  meetingArchiveDate: string
  meetingArchiveURL: string
}
