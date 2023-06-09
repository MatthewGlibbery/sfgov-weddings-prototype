import clsx from 'clsx'
import NextImage, { type ImageProps } from 'next/image'
import { getImageProps } from '@/lib/utils'
import type { WagtailImageData } from '@/types'

type StyledImageProps = Partial<ImageProps> & {
  as?: 'img' | typeof NextImage
  baseURL?: string
}

const StyledImage = ({
  as: Component = 'img',
  className,
  ...rest
}: StyledImageProps) => (
  // @ts-expect-error derp derp
  <Component className={clsx('w-auto h-auto', className)} {...rest} />
)

export type ImageOwnProps = StyledImageProps & { imageRef: WagtailImageData }

/** istanbul ignore */
export const Image = ({ imageRef, baseURL, ...rest }: ImageOwnProps) => {
  const props = getImageProps(imageRef, baseURL)
  return <StyledImage {...props} {...rest} />
}
