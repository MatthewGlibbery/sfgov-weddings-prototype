import { IContentAPI, PageData, WagtailImageData } from '@/types'

export function getPageURL (page: PageData) {
  if (page?.meta?.html_url) {
    return page.meta.html_url.includes('://')
      ? new URL(page.meta.html_url).pathname
      : page.meta.html_url
  } else {
    return page?.meta?.url_path
  }
}

export async function resolveImage (img: WagtailImageData | number, api: IContentAPI) {
  if (!img) {
    // noop
  } else if (typeof img === 'number') {
    return api.getData<WagtailImageData>(`images/${img}`)
  } else if (img.meta?.download_url) {
    return img
  } else if (img.id && !img.meta?.download_url) {
    return api.getData<WagtailImageData>(`images/${img.id}`)
  }
}

export function resolvePage<T extends PageData = PageData> (idOrObj: number | T, api: IContentAPI) {
  if (typeof idOrObj === 'number') {
    return api.getData<T>(`pages/${idOrObj}/`)
  } else {
    return idOrObj as T
  }
}

export function getImageURL (image: WagtailImageData, baseURL?: string): string | undefined {
  const url = image?.meta?.download_url
  if (url && baseURL) {
    return new URL(url, baseURL).toString()
  }
  return url || undefined
}

type PrimitiveImageProps = {
  src: string | undefined
  alt: string | undefined
  width?: number
  height?: number
}

export function getImageProps (image: WagtailImageData, baseURL?: string): PrimitiveImageProps {
  return {
    src: getImageURL(image, baseURL),
    width: image.width,
    height: image.height,
    alt: image.title
  }
}
