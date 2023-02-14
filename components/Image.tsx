import { getImageProps } from '@/lib/utils'
import { WagtailImageData } from '@/types'
import { CSS, styled } from '@sfgov/design-system/dist/react'
import NextImage, { ImageProps } from 'next/image'
import type { ComponentType } from 'react'

type StyledImageProps = Partial<ImageProps> & {
  as?: 'img' | typeof NextImage
  css?: CSS
  baseURL?: string
} & JSX.IntrinsicElements['img']

const StyledImage = styled('img', {
  width: 'auto',
  height: 'auto'
}) as ComponentType<StyledImageProps>

/** istanbul ignore */
export default function Image ({ imageRef, baseURL, ...rest }: StyledImageProps & { imageRef: WagtailImageData }) {
  const props = getImageProps(imageRef, baseURL)
  return <StyledImage {...props} {...rest} />
}
