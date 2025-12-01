import type { WAGTAIL_IMAGE_TYPE } from '@/constants'
import type { PageData } from './pages'

export type WagtailImageRenditionData = {
  url: string
  full_url: string
  width: number
  height: number
  alt: string
}

export interface WagtailImageData extends PageData {
  meta: {
    type: typeof WAGTAIL_IMAGE_TYPE
    download_url: string
  }
  title: string
  alt_text: string
  width: number
  height: number
  original: WagtailImageRenditionData
  large?: WagtailImageRenditionData
  thumbnail?: WagtailImageRenditionData
  news_card?: WagtailImageRenditionData
}
