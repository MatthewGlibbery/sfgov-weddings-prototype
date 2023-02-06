import { WAGTAIL_IMAGE_TYPE } from '@/lib/constants'
import { PageData } from './pages'

export type WagtailImageData = PageData<{
  type: typeof WAGTAIL_IMAGE_TYPE
  download_url: string
}> & {
  title: string
  width: number
  height: number
}
