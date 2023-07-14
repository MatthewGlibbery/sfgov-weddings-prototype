import NextImage from 'next/image'
import {
  classed,
  type AnyComponent,
  type ComponentProps
} from '@/design-system'
import type { WagtailImageData } from '@/types'

const ImageBase = classed(NextImage as AnyComponent, 'w-auto h-auto')

export type ImageOwnProps = ComponentProps<typeof ImageBase> & {
  imageRef: WagtailImageData
  baseUrl?: string
}

/* istanbul ignore */
export const Image = ({ imageRef, ...rest }: ImageOwnProps) => {
  return (
    <ImageBase
      src={imageRef.meta.download_url}
      layout="responsive"
      width={imageRef.original.width}
      height={imageRef.original.height}
      alt={imageRef.title}
      {...rest}
    />
  )
}
