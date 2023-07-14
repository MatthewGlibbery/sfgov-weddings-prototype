/* istanbul ignore file */
'use client'

type ImageLoaderProps = {
  src: string
  width?: number
  quality?: number
}

/* TODO: We might want to load/leverage Wagtail renditions, but
 * first we should understand the business case, e.g. when to
 * load a thumbnail rather than the original image
 */
export default function getImageURL({ src }: ImageLoaderProps) {
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_DOMAIN
  return new URL(src, baseURL).toString()
}
