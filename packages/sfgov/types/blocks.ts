import { WagtailImageData } from './images'
import {
  AgencyPage,
  MinimalPageData,
  PageData,
  RelatedContentTransactionBlock
} from './pages'

export interface BlockType<T extends string = string, V = object> {
  type: T
  value: V
  id: string
}

export type TypePageBlock<
  T extends string = string,
  P extends PageData = PageData
> = BlockType<T, P>

export type TypeStepVariant = 'number' | 'and' | 'or'

export type TypeCostVariant = 'free' | 'flat_fee' | 'range' | 'minimum'

interface RangeType {
  minimum: number
  maximum: number
}

export type TypeLinkValues = {
  link_to: string
  link_text: string
  url: string
  page?: MinimalPageData
}

export type TypeCostBlockValues = {
  cost: TypeCostVariant
  flat_fee?: number
  range?: RangeType
  description: string
}

export type TypeCostBlock = BlockType<'cost', TypeCostBlockValues>

export type TypeTileBlockValues = MinimalPageData & {
  title: string
  description: string
  url: string
  link_to: string
  event_type?: string
}

export type TypeTileBlock<T extends string = string> = BlockType<
  T,
  TypeTileBlockValues
>

export type TypeNewsTileBlock = TypeTileBlock<'news'>
export type TypeContentTileBlock = TypeTileBlock<
  'content' | 'page' | 'external_link'
>
export type TypeQuickLinkBlock = TypeTileBlock<'quick_links'>
export type TypeEventTileBlock = TypeTileBlock<'event'>

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
  title: string
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

export type TypeLocationValues = {
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
}

export type TypeLocationBlock = BlockType<'address', TypeLocationValues>

export type TypePhoneNumberValues = {
  owner: string
  phone_number: string
  details: string
}

export type TypePhoneNumberBlock = BlockType<
  'phone_number',
  TypePhoneNumberValues
>

export type TypeDateTimeValues = {
  start_date: string
  start_time: string
  end_date: string
  end_time: string
  is_all_day: boolean
  include_end_date_time: string // TODO: convert to a Boolean later!
}
export type TypeDateTimeBlock = BlockType<string, TypeDateTimeValues>

export type TypeCallToActionValues = {
  title: string
  link: TypeLinkValues
}

export type TypeCallToActionBlock = BlockType<string, TypeCallToActionValues>

/* Transaction Page */

export type TypeTextBlock = BlockType<'text', string>

export type TypeButtonLinkBlock = BlockType<'button_link', TypeLinkValues>

export type TypeWhatToDoVariant =
  | 'online'
  | 'in_person'
  | 'phone'
  | 'email'
  | 'mail'

export type TypeCalloutBlock = BlockType<'callout', string>

export type TypeStepSpecificsVariant =
  | TypeLocationBlock
  | TypeCalloutBlock
  | TypeEmailBlock
  | TypeButtonLinkBlock
  | TypePhoneNumberBlock
  | TypeTextBlock // TODO: add document upload type once we handle uploads

export type TypeWhatToDoStepBlock = BlockType<
  'what_to_do_step',
  {
    step_title: string
    step_specifics: TypeStepSpecificsVariant[]
  }
>

export type TypeWhatToDoBlock = BlockType<
  TypeWhatToDoVariant,
  (TypeCalloutBlock | TypeWhatToDoStepBlock)[]
>

export type TypeResourcesSectionValues = {
  resources: TypeContentTileBlock[]
  title: string
}

export type TypeServicesSectionValues = {
  services: TypeContentTileBlock[]
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

export type TypeSpotlightBlockValues = {
  title: string
  description: string
  image: WagtailImageData
  full_size_banner: boolean
  button: TypeLinkValues
}

export type TypeSpotlightBlock = BlockType<
  'spotlight',
  TypeSpotlightBlockValues
>

export type TypeTimelineBlockValues = {
  title: string
  timeline_items: TypeTitleAndTextValues[]
}

export type TypeResourcesSectionBlock = BlockType<
  'resources',
  TypeResourcesSectionValues
>

export type TypeServicesSectionBlock = BlockType<
  'services',
  TypeServicesSectionValues
>

export type TypeTimelineBlock = BlockType<'timeline', TypeTimelineBlockValues>

export type ContentSectionTypes =
  | TypeButtonLinkBlock
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

export type TypeAlertBlockValues = {
  description: string
  expiration_date: string
}

export type TypeAlertBlock = BlockType<'alert', TypeAlertBlockValues>

export type TypeOnlineEventBlockValues = {
  description: string
  link: TypeLinkValues
  phone: TypePhoneNumberBlock[]
}

export type TypeOnlineEventBlock = BlockType<
  'online',
  TypeOnlineEventBlockValues
>

export type TypeAgendaItemBlockValues = {
  index: number
  title_and_text: TypeTitleAndTextValues
  documents: [] // TODO: expand this when documents are fully serialized
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
  video_type: (TypeVideoEmbedValues | TypeLinkValues)[]
}

export type TypeVideoBlock = BlockType<'video', TypeVideoBlockValues>

export type TypeDownloadableFilesBlockValues = {
  title: string
  // TODO: add documents
}

export type TypeDownloadableFilesBlock = BlockType<
  'downloadable_files',
  TypeDownloadableFilesBlockValues
>
