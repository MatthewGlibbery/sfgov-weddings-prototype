import NextImage from 'next/image'
import {
  classed,
  type AnyComponent,
  type ComponentProps
} from '@/design-system'
import type { WagtailImageData } from '@/types'

const ImageBase = classed(NextImage as AnyComponent, 'w-auto h-auto')

export type ImageOwnProps = ComponentProps<typeof ImageBase> & {
  imageRef: WagtailImageData | number
  baseUrl?: string
}

/* istanbul ignore */
export const Image = ({ imageRef, ...rest }: ImageOwnProps) => {
  return (
    <ImageBase
      src={imageRef?.meta?.download_url}
      className="w-full h-auto"
      width={imageRef?.original?.width || 50}
      height={imageRef?.original?.height || 50}
      alt={imageRef?.title}
      {...rest}
    />
  )
}
