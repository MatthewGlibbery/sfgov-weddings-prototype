import { WagtailImageData } from './images'
import { AgencyData } from './pages'
import { Address } from './snippets'

export type GenericBlock<T extends string = string, V = any> = {
  type: T
  value: V
  id: string
}

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

export type SpotlightBlock = GenericBlock<'spotlight', {
  title: string
  description: string
  image: WagtailImageData
  cta: CallToAction
}>

export type QuickLinkBlock = GenericBlock<'quick_links', {
  title: string
  internal_page?: number
  external_url: string
  description: string
}>

export type ServiceSectionBlock = GenericBlock<'services', {
  title: string
  services: (number | AgencyData)[]
}>

export type AddressBlock = GenericBlock<'address', Address>

export type ContactBlock = AddressBlock | GenericBlock
