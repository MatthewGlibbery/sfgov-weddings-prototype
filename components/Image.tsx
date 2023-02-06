import { ContentAPI } from '@/lib/api'
import { WagtailImageData } from '@/types'
import { CSS, styled } from '@sfgov/design-system/dist/react'
import NextImage from 'next/image'
import type { ComponentProps, ComponentType } from 'react'

// FIXME: derp
const api = new ContentAPI()

type StyledImageProps = Partial<ComponentProps<typeof NextImage>> & {
  css?: CSS
}

const StyledImage = styled(NextImage, {
  width: 'auto',
  height: 'auto'
}) as ComponentType<StyledImageProps>

export default function Image ({ imageRef: image, ...rest }: StyledImageProps & { imageRef: WagtailImageData }) {
  if (!image?.meta?.download_url) {
    return null
  }
  // FIXME: image should have a src property!
  const url = new URL(image.meta.download_url, api.options.apiBaseURL)
  return <StyledImage
    src={url.toString()}
    alt={image.title}
    width={image.width}
    height={image.height}
    {...rest}
  />
}
