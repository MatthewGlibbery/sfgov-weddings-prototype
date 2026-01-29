import NextImage from 'next/image'
import {
  classed,
  type AnyComponent,
  type ComponentProps
} from '@/design-system'
import type { WagtailImageData } from '@/types'

const ImageBase = classed(NextImage as AnyComponent, 'w-auto h-auto')

export type ImageOwnProps = ComponentProps<typeof ImageBase> & {
  imageRef?: WagtailImageData
}

/* istanbul ignore */
export const Image = classed(
  // destructure children so they don't get passed
  // to NextImage (<img> is a void element, no children ever)
  ({ imageRef, children, ...rest }: ImageOwnProps) => {
    return imageRef ? (
      <ImageBase
        src={imageRef.meta?.download_url}
        width={imageRef.original?.width || 50}
        height={imageRef.original?.height || 50}
        alt={imageRef.alt_text || ''}
        {...rest}
      />
    ) : (
      <ImageBase {...rest} />
    )
  },
  'w-full'
)
