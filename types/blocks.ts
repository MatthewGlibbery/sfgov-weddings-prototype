import { WagtailImageData } from './images'
import { AgencyData, PageData } from './pages'
import { Address } from './snippets'

export interface BlockType<T extends string = string, V = object> {
  type: T
  value: V
  id: string
}

export type PageBlock<
  T extends string = string,
  P extends PageData = PageData
> = BlockType<T, P>

export type AgencyPageBlock<T extends string = string> = PageBlock<T, AgencyData>

export type StepType = 'number' | 'and' | 'or'

type LinkBlockTarget = 'page' | 'file' | 'custom_url' | 'anchor' | 'email' | 'phone'

export type LinkBlock = {
  title?: string
  link_to: LinkBlockTarget
} & Record<LinkBlockTarget, string | null>

export type CallToAction = {
  button_text: string
  button_page?: number
  button_url?: string
  button_link?: LinkBlock
}

export type SpotlightBlock = BlockType<'spotlight', {
  title: string
  description: string
  image: WagtailImageData
  cta: CallToAction
}>

export type TileBlock<T extends string = string> = BlockType<T, {
  title: string
  internal_page?: number
  external_url: string
  description: string
  event_type?: string
}>

export type NewsTileBlock = TileBlock<'news'>
export type ContentTileBlock = TileBlock<'content'>
export type QuickLinkBlock = TileBlock<'quick_links'>
export type EventTileBlock = TileBlock<'event'>

export type ServiceSectionBlock = BlockType<'services', {
  title: string
  services: (number | AgencyData)[]
}>

export type StepBlock = BlockType<'step', {
  title: string
  step_type: StepType
  optional?: boolean
  cost?: any // TODO: CostBlock
  time?: string
  step_description?: string
  transaction_link?: string
}>

export type EmailBlock = BlockType<'email', {
  title: string
  email: string
}>

export type AddressBlock = BlockType<'address', Address>

export type ContactBlock = AddressBlock | BlockType
