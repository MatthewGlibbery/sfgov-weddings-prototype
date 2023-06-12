import { getImageProps } from '@/lib/utils'
import {
  classed,
  type AnyComponent,
  type ComponentProps
} from '@/design-system'
import type { WagtailImageData } from '@/types'

const ImageBase = classed('img' as AnyComponent, 'w-auto h-auto')

export type ImageOwnProps = ComponentProps<typeof ImageBase> & {
  imageRef: WagtailImageData
  baseUrl?: string
}

/* istanbul ignore */
export const Image = ({ imageRef, baseUrl, ...rest }: ImageOwnProps) => {
  const props = getImageProps(imageRef, baseUrl)
  return <ImageBase {...props} {...rest} />
}
