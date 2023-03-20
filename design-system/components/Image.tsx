import NextImage, { ImageProps } from 'next/image'
import { getImageProps } from '@/lib/utils'
import { WagtailImageData } from '@/types'
import { styled } from '../stitches.config'
import { ComponentType } from 'react'
import { FIXMECSSProps } from '../types'

type StyledImageProps = Partial<ImageProps> & {
  as?: 'img' | typeof NextImage
  baseURL?: string
} & FIXMECSSProps

const StyledImage = styled('img', {
  width: 'auto',
  height: 'auto'
}) as ComponentType<StyledImageProps>

/** istanbul ignore */
export function Image ({ imageRef, baseURL, ...rest }: StyledImageProps & { imageRef: WagtailImageData }) {
  const props = getImageProps(imageRef, baseURL)
  return <StyledImage {...props} {...rest} />
}
