import { WagtailImageData } from './images'
import { AgencyPage, PageData, RelatedContentTransactionBlock } from './pages'

export interface BlockType<T extends string = string, V = object> {
  type: T
  value: V
  id: string
}

export type PageBlock<
  T extends string = string,
  P extends PageData = PageData
> = BlockType<T, P>

export type StepType = 'number' | 'and' | 'or'

export type CostType = 'free' | 'flat_fee' | 'range' | 'minimum'

interface RangeType {
  minimum: number
  maximum: number
}

export type LinkBlock = {
  text: string
  url: string
}

export type CostValues = {
  cost: CostType
  flat_fee?: number
  range?: RangeType
  description: string
}

export type CostBlock = BlockType<'cost', CostValues>

export type TileBlock<T extends string = string> = BlockType<
  T,
  {
    title: string
    internal_page?: number
    external_url: string
    description: string
    event_type?: string
  }
>

export type NewsTileBlock = TileBlock<'news'>
export type ContentTileBlock = TileBlock<'content'>
export type QuickLinkBlock = TileBlock<'quick_links'>
export type EventTileBlock = TileBlock<'event'>

export type StepBlock = BlockType<
  'step',
  {
    title: string
    step_type: StepType
    optional?: boolean
    cost: CostBlock[]
    time?: string
    step_description?: string
    related_content_transactions?: RelatedContentTransactionBlock[]
  }
>

export type ImageBlock = BlockType<'image', number | WagtailImageData>

type TitleAndTextValues = {
  title: string
  text: string
}

export type TitleAndTextBlock = BlockType<'title_and_text', TitleAndTextValues>

export type EmailValues = {
  title: string
  email: string
}

export type EmailBlock = BlockType<'email', EmailValues>

export type LocationValues = {
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

export type LocationBlock = BlockType<'address', LocationValues>

export type PhoneNumberValues = {
  owner: string
  phone_number: string
  details: string
}

export type PhoneNumberBlockType = BlockType<'phone_number', PhoneNumberValues>

export type DateTimeValues = {
  start_date: string
  start_time: string
  end_date: string
  end_time: string
  is_all_day: boolean
  include_end_date_time: string // TODO: convert to a Boolean later!
}
export type DateTimeBlock = BlockType<string, DateTimeValues>

export type CallToActionValues = {
  title: string
  link: LinkBlock
}

export type CallToActionBlock = BlockType<string, CallToActionValues>

/* Transaction Page */

export type TextBlock = BlockType<'text', string>

export type ButtonLinkBlock = BlockType<'button_link', LinkBlock>

export type WhatToDoType = 'online' | 'in_person' | 'phone' | 'email' | 'mail'

export type CalloutBlock = BlockType<'callout', string>

export type StepSpecificsTypes =
  | LocationBlock
  | CalloutBlock
  | EmailBlock
  | ButtonLinkBlock
  | PhoneNumberBlockType
  | TextBlock // TODO: add document upload type once we handle uploads

export type WhatToDoStepBlock = BlockType<
  'what_to_do_step',
  {
    step_title: string
    step_specifics: StepSpecificsTypes[]
  }
>

export type WhatToDoBlock = BlockType<
  WhatToDoType,
  (CalloutBlock | WhatToDoStepBlock)[]
>
