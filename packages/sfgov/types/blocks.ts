import type { WagtailImageData } from './images'
import type {
  AgencyPage,
  MinimalMeta,
  MinimalPageData,
  PageData,
  ProfilePageData,
  RelatedContentData,
  RelatedContentTransactionBlock
} from './pages'

export interface BlockType<T extends string = string, V = object> {
  type: T
  value: V
  id: string
}

export type TypeStepVariant = 'number' | 'and' | 'or'

export type TypeCostVariant = 'free' | 'flat_fee' | 'range' | 'minimum'

interface RangeType {
  minimum: number
  maximum: number
}

// cms.blocks.composite.Link
export type LinkBlockValue =
  | {
      // if link_to === 'url' it will have a url, but no page
      link_to: 'url'
      link_text: string
      url: string
    }
  | {
      // if link_to === 'page' it will have page, but no url
      link_to: 'page'
      link_text: string
      page: MinimalPageData
    }

export type TypeCostBlockValues = {
  cost: TypeCostVariant
  flat_fee?: number
  range?: RangeType
  description: string
}

export type TypeCostBlock = BlockType<'cost', TypeCostBlockValues>

export type TypeStepBlock = BlockType<
  'step',
  {
    title: string
    step_type: TypeStepVariant
    optional?: boolean
    cost: TypeCostBlock[]
    time?: string
    step_description?: string
    related_content_transactions?: RelatedContentTransactionBlock[]
  }
>

export type TypeImageBlock = BlockType<'image', WagtailImageData>

export type TypeTitleAndTextValues = {
  title?: string
  text: string
}

export type TypeTitleAndTextBlock = BlockType<
  'title_and_text',
  TypeTitleAndTextValues
>

export type TypeEmailValues = {
  title: string
  email: string
}

export type TypeEmailBlock = BlockType<'email', TypeEmailValues>

export type TypeBreakHoursBlock = BlockType<
  'break',
  {
    break_from: string
    break_to: string
  }
>

export type TypeHoursDetailsValues = {
  open: string
  closed: string
  break_hours: TypeBreakHoursBlock[]
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type TypeHoursValues = {
  days: string
  all?: TypeHoursDetailsValues
} & Partial<Record<DayOfWeek, TypeHoursDetailsValues>>

export type LocationData = {
  address_title: string
  agency?: AgencyPage
  organization?: string
  addressee?: string
  location_name?: string
  location_notes?: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  hours: TypeHoursValues
  variant?: string
}

export type TypeLocationBlock = BlockType<'address', LocationData>

export type PhoneNumberData = {
  owner: string
  phone_number: string
  details: string
}

export type TypePhoneNumberBlock = BlockType<'phone_number', PhoneNumberData>

export type TypeDateTimeValues = {
  start_date: string
  start_time: string | null
  end_date: string | null
  end_time: string | null
  is_all_day: boolean
  include_end_date_time: 'yes' | 'no'
}

export type TypeDateTimeBlock = BlockType<string, TypeDateTimeValues>

export type TypeTileBlockValues = MinimalPageData & {
  title: string
  description: string
  url: string
  link_to: string
  event_type?: string
  meta?: MinimalMeta
  date?: string
  date_time?: TypeDateTimeBlock[]
  cancelled?: boolean
  publishedDate?: TypeDateTimeBlock
  news_type?: string
}

export type TypeTileBlock<T extends string = string> = BlockType<
  T,
  TypeTileBlockValues
>

export type TypeNewsTileBlock = TypeTileBlock<'news'>

export type TypeContentTileBlock = TypeTileBlock<
  'content' | 'page' | 'external_link' | 'services' | 'topics'
>

export type TypeQuickLinkBlock = TypeTileBlock<'quick_links'>

export type TypeEventTileBlock = TypeTileBlock<'event'>

// cms.blocks.composite.ButtonLink
export type ButtonLinkBlockValue = {
  button: LinkBlockValue
  screenreader_label?: string
}

export type TypeCallToActionValues = {
  title: string
  description: string
  button_link: ButtonLinkBlockValue
}

export type TypeDocumentBlockValues = {
  id: number
  title: string
  file: string
  description?: string
  published_date?: string
  publishedDate?: string
  url?: string
  collection?: number
}

export type TypeDocumentBlock = BlockType<'document', TypeDocumentBlockValues>

export type TypeDocumentsBlock = BlockType<'documents', TypeDocumentBlock[]>

export type TypeCallToActionBlock = BlockType<string, TypeCallToActionValues>

/* Transaction Page */

export type TypeTextBlock = BlockType<'text', string>

export type TypeButtonLinkBlock = BlockType<'button_link', ButtonLinkBlockValue>

export type TypeCalloutBlock = BlockType<'callout', string>

export type TypeStepSpecificsBlock =
  | TypeLocationBlock
  | TypeCalloutBlock
  | TypeEmailBlock
  | TypeButtonLinkBlock
  | TypePhoneNumberBlock
  | TypeTextBlock
  | TypeDocumentBlock

export type TypeWhatToDoStepBlock = BlockType<
  'what_to_do_step',
  {
    section_title: string
    section_specifics: TypeStepSpecificsBlock[]
  }
>

export type TypeWhatToDoBlock = TypeCalloutBlock | TypeWhatToDoStepBlock

export type TypeResourcesSectionValues = {
  title: string
  resources: TypeContentTileBlock[]
}

/**
 * NOTE: this type is too broad (TypeContentTileBlock includes a ton of block
 * types that aren't used in service sections). If a streamfield contains a
 * composite.ServiceSection(), you should type it with
 * {@link ServicesSectionBlock}.
 */
export type TypeServicesSectionValues = {
  title: string
  services: TypeContentTileBlock[]
}

export type TypeDataStorySectionValues = {
  data_stories: TypeContentTileBlock[]
  title: string
}

export type TypeSocialMediaBlockValues = BlockType<
  'facebook' | 'twitter' | 'instagram',
  string
>

export type TypeSocialMediaBlock = BlockType<
  'social_media',
  { social_media: TypeSocialMediaBlockValues[] }
>

export type TypeContactFooterBlockValues = {
  address: TypeLocationBlock[]
  phone: TypePhoneNumberBlock[]
  email: TypeEmailBlock[]
  social_media_other: TypeSocialMediaBlock[]
  title_and_text?: TypeTitleAndTextBlock[]
}

export type TypeContactFooterBlock = BlockType<
  'contact',
  TypeContactFooterBlockValues
>

export type TypeSpotlightBlockValues = {
  title: string
  description: string
  image: WagtailImageData
  image_alignment: string
  image_position: string
  button_link: TypeButtonLinkBlock[]
}

export type TypeSpotlightBlock = BlockType<
  'spotlight',
  TypeSpotlightBlockValues
>

export type TypeTimelineBlockValues = {
  title: string
  timeline_items: BlockType<'item', TypeTitleAndTextValues>[]
  button_link: ButtonLinkBlockValue
}

export type TypeResourcesSectionBlock = BlockType<
  'resources',
  TypeResourcesSectionValues
>

export type TypeServicesSectionBlock = BlockType<
  'services',
  TypeServicesSectionValues
>

export type TypeDataStoriesSectionBlock = BlockType<
  'data_story_section',
  TypeDataStorySectionValues
>

export type TypeTimelineBlock = BlockType<'timeline', TypeTimelineBlockValues>

export type TypeAlertBlockValues = {
  description: string
  expiration_date?: string
  variant?: string
}

export type TypeAlertBlock = BlockType<'alert', TypeAlertBlockValues>

export type TypeImageWithTextBlockValues = {
  image: WagtailImageData
  title: string
  description: string
}

export type TypeImageWithTextBlock = BlockType<
  'image_with_text',
  TypeImageWithTextBlockValues
>

export type TypeAccordionItemBlockValues = {
  title: string
  body: (TypeTextBlock | TypeLocationBlock | TypePhoneNumberBlock)[]
}

export type TypeAccordionItemBlock = BlockType<
  'accordion_item',
  TypeAccordionItemBlockValues
>

export type TypeAccordionSectionBlockValues = {
  title: string
  accordion_sidebar: string
  accordion_items: TypeAccordionItemBlock[]
}

export type TypeAccordionSectionBlock = BlockType<
  'accordion_section',
  TypeAccordionSectionBlockValues
>

export type TypeOnlineEventBlockValues = {
  description: string
  link: LinkBlockValue
  phone: TypePhoneNumberBlock[]
}

export type TypeOnlineEventBlock = BlockType<
  'online',
  TypeOnlineEventBlockValues
>

export type TypeAgendaItemBlockValues = {
  id: string
  index: number
  title_and_text: TypeTitleAndTextValues
  documents: TypeDocumentBlock[]
}

export type TypeAgendaItemBlock = BlockType<
  'agenda_item',
  TypeAgendaItemBlockValues
>

export type TypeVideoEmbedValues = {
  embed_url: string
  video_transcript: string
}

export type TypeVideoBlockValues = {
  title: string
  description: string
  video_type: (TypeVideoEmbedValues | LinkBlockValue)[]
  showTitle?: boolean
}

export type TypeVideoBlock = BlockType<'video', TypeVideoBlockValues>

export type TypeDownloadableFilesBlockValues = {
  title?: string
  documents: TypeDocumentBlock[]
}

export type TypeDownloadableFilesBlock = BlockType<
  'downloadable_files',
  TypeDownloadableFilesBlockValues
>

export type TypeEmbeddedContentBlockValues = {
  desktop_embed_url: string
  mobile_embed_url: string
  aspect_ratios: {
    desktop: { width: string; height: string }
    mobile: { width: string; height: string }
  }
  alt_text: string
  source_data: string
  data_notes: string
}

export type TypeEmbeddedContentBlock = BlockType<
  'powerbi_embed',
  TypeEmbeddedContentBlockValues
>

export type ContentSectionTypes =
  | TypeButtonLinkBlock
  | TypeCalloutBlock
  | TypeDocumentBlock
  | TypeEmbeddedContentBlock
  | TypeImageBlock
  | TypePhoneNumberBlock
  | TypeResourcesSectionBlock
  | TypeSpotlightBlock
  | TypeTimelineBlock
  | TypeTextBlock

export type TypeContentSectionBlockValues = {
  title: string
  section_content: ContentSectionTypes[]
}

export type TypeContentSectionBlock = BlockType<
  'section',
  TypeContentSectionBlockValues
>

export type TypeDocumentSectionBlockValues = {
  title: string
  content: Array<TypeDocumentBlock | TypeDocumentsBlock | TypeTextBlock>
}

export type TypeDocumentSectionBlock = BlockType<
  'document_section',
  TypeDocumentSectionBlockValues
>

type TypeChildTopicsBlockValues = {
  page_content: RelatedContentData[]
}

type TypeContentTopBlockValues = {
  section: TypeContentSectionBlock[]
}

type TypeTopicServicesBlockValues = {
  services: TypeServicesSectionBlock[]
}

type TypeTopicSpotlightBlockValues = {
  spotlight: TypeSpotlightBlock[]
}

type TypeTopicResourcesBlockValues = {
  resources: TypeResourcesSectionBlock[]
}

type TypeTopicContentBlockValues = {
  content: BlockType<'content', TypeContentSectionBlockValues>[]
}

export type TopicFieldTypes =
  | BlockType<'child_topics', TypeChildTopicsBlockValues>
  | BlockType<'content_top', TypeContentTopBlockValues>
  | BlockType<'services', TypeTopicServicesBlockValues>
  | BlockType<'spotlight', TypeTopicSpotlightBlockValues>
  | BlockType<'resources', TypeTopicResourcesBlockValues>
  | BlockType<'content', TypeTopicContentBlockValues>

export type TypeProfilePageBlock = BlockType<
  'profile_page',
  {
    profile_page: ProfilePageData | null
    role: string
  }
>

export type TypeProfileGroupBlock = BlockType<
  'profile_group',
  {
    title: string
    description: string
    profiles: TypeProfilePageBlock[]
  }
>

export type TypeAgencyPageBlock = BlockType<
  'agency',
  { page: PageData; show_meetings_parent: boolean }
>

export type TypeDivisionsSubcommitteeBlock = BlockType<
  'agency_section',
  {
    agency_section_title: string
    agencies: TypeAgencyPageBlock[]
  }
>

export type TypeBodyTextBlock = BlockType<'body', string>

type TypeColumnCellValues = {
  type: string
  heading: string
}

type TypeRowCellValues = {
  values: string[]
}

export type TypeTableValues = {
  columns: TypeColumnCellValues[]
  rows: TypeRowCellValues[]
  caption: string
}

export type TypeTableBlockValues = {
  table_header_options?: 'row' | 'column' | 'both' | 'neither'
  description: string
  table: TypeTableValues
}

export type TypeTableBlock = BlockType<'table', TypeTableBlockValues>

// https://github.com/SFDigitalServices/platform/blob/b544c96e6588c0361c8e4080224d69ddf5ff14cf/cms/blocks/primitive.py#L96
export type ResourceBlockValue = {
  title: string
  url: string
  description?: string
}

export type ServiceBlock =
  // NOTE: page blocks can be null if they were imported with empty values,
  // but they can't be saved without fixing the validation error.
  | BlockType<'page', PageData | null>
  | BlockType<'external_link', ResourceBlockValue>

/**
 * A block containing a "section" of services with a heading.
 */
export type ServicesSectionBlock = BlockType<
  'services',
  // https://github.com/SFDigitalServices/platform/blob/b544c96e6588c0361c8e4080224d69ddf5ff14cf/cms/blocks/composite.py#L407
  {
    title: string
    services: ServiceBlock[]
  }
>

/**
 * Fillout Form
 */

export type TypeFormIntroValues = {
  body: string
  required_information?: string
  time_to_complete: string
}

export type TypeFormConfirmationValues = {
  body: string
  next_steps?: string
}

export type TypeFormIntroBlock = BlockType<'form_intro', TypeFormIntroValues>

export type TypeFormConfirmationBlock = BlockType<
  'form_confirmation',
  TypeFormConfirmationValues
>
