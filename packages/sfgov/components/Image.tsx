import NextImage from 'next/image'
import {
  classed,
  type AnyComponent,
  type ComponentProps
} from '@/design-system'
import type { WagtailImageData } from '@/types'
import { useState, useEffect } from 'react'

const ImageBase = classed(NextImage as AnyComponent, 'w-auto h-auto')

export type ImageOwnProps = ComponentProps<typeof ImageBase> & {
  imageRef: WagtailImageData | number
  baseUrl?: string
}

/* istanbul ignore */
export const Image = ({ imageRef, ...rest }: ImageOwnProps) => {
  const [imageData, setImageData] = useState(false)
  useEffect(() => {
    async function getImageData() {
      if (!imageRef.meta) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL}/images/${imageRef}`
        )
        const data = await res.json()
        setImageData(data)
      }
    }
    getImageData()
  }, [imageRef])

  if (imageData) imageRef = imageData

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
