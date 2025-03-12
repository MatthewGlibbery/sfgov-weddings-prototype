import type { IContentAPI, PageData, WagtailImageData } from '@/types'
import type { TFunction } from 'i18next'
import type { ComponentType } from 'react'

export function getPageURL(page: PageData) {
  let meta = page?.meta
  if (page?.value?.meta) {
    meta = page.value.meta
  }
  if (page?.meta) {
    meta = page.meta
  }
  if (meta?.html_url) {
    return meta.html_url.includes('://')
      ? new URL(meta.html_url).pathname
      : meta.html_url
  } else {
    return meta?.url_path
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

export function camelCase(str: string | undefined) {
  return str
    ?.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function getHeaderLinks(t: TFunction) {
  return [
    { href: '/services', text: t('services', { defaultValue: 'Services' }) },
    {
      href: '/departments',
      text: t('departments', { defaultValue: 'Departments' })
    },
    {
      href: 'https://careers.sf.gov',
      text: t('jobs', { defaultValue: 'Jobs' })
    }
  ]
}

export function getFooterLinks(t: TFunction) {
  return [
    ...getHeaderLinks(t),
    {
      href: '/contact-sfgov',
      text: t('contact-us', { defaultValue: 'Contact us' })
    }
  ]
}

/**
 * Create a React component that renders the given component with prop defaults.
 * The props type is inferred from the component type:
 *
 * ```ts
 * const Hello = (p: { what: string }) => <div>Hello, {p.what}!</div>
 * const X = withDefaultProps(Y, { what: 'World' })
 * <X /> // renders <div>Hello, world!</div>
 * ```
 */
export function withDefaultProps<P extends object>(
  Component: ComponentType<P>,
  defaults: Partial<P>
) {
  return function WithDefaultProps(props: P) {
    return <Component {...defaults} {...props} />
  }
}

export function isPermitCenter(page: PageData): boolean {
  return (
    page.meta.slug === 'location--san-francisco-permit-center' ||
    (page.meta.html_url !== undefined &&
      page.meta.html_url?.includes('location--san-francisco-permit-center'))
  )
}
