import { IContentAPI, PageData, WagtailImageData } from '@/types'

export function getPageURL(page: PageData) {
  if (page?.meta?.html_url) {
    return page.meta.html_url.includes('://')
      ? new URL(page.meta.html_url).pathname
      : page.meta.html_url
  } else {
    return page?.meta?.url_path
  }
}

export async function resolveImage(
  img: WagtailImageData | number,
  api: IContentAPI
) {
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

export function resolvePage<T extends PageData = PageData>(
  idOrObj: number | T,
  api: IContentAPI
) {
  if (typeof idOrObj === 'number') {
    return api.getData<T>(`pages/${idOrObj}/`)
  } else {
    return idOrObj as T
  }
}

export function camelCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}
