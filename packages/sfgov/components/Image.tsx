import NextImage, { ImageProps } from 'next/image'
import { getImageProps } from '@/lib/utils'
import { WagtailImageData } from '@/types'
import { FIXMECSSProps, styled } from '@/design-system'
import type { ComponentType } from 'react'

type StyledImageProps = Partial<ImageProps> & {
  as?: 'img' | typeof NextImage
  baseURL?: string
} & FIXMECSSProps

const StyledImage = styled('img', {
  width: 'auto',
  height: 'auto'
}) as ComponentType<StyledImageProps>

/** istanbul ignore */
export const Image = ({ imageRef, baseURL, ...rest }: StyledImageProps & { imageRef: WagtailImageData }) => {
  const props = getImageProps(imageRef, baseURL)
  return <StyledImage { ...props } {...rest } />
}
