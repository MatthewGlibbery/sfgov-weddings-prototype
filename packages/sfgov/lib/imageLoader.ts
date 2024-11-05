/* istanbul ignore file */
'use client'
import type { ImageLoaderProps } from 'next/image'
import { coalesce, getenv } from './env'

/**
 * This file isn't imported directly; it's referenced in our next config's
 * `images.loaderFile` option and imported by next/image. The default export
 * needs to implement the API:
 *
 * (props: ImageLoaderProps) => string
 *
 * @see https://nextjs.org/docs/app/api-reference/components/image#loaderfile
 *
 * We can do lots of different things here, for example:
 *
 * - CloudFront image optimization
 *   https://nextjs.org/docs/app/api-reference/next-config-js/images#aws-cloudfront
 *
 * - Wagtail renditions
 *   https://docs.wagtail.org/en/latest/advanced_topics/images/renditions.html
 */

export default function getImageURL({ src }: ImageLoaderProps) {
  let baseURL = getenv('NEXT_PUBLIC_IMAGE_DOMAIN')

  if (src.includes('static')) {
    baseURL = ''
  }

  // if the value is just a domain, add the protocol prefix
  if (baseURL && !new URL(baseURL).host) {
    baseURL = `https://${baseURL}`
  }
  return baseURL ? new URL(src, baseURL).href : src
}
