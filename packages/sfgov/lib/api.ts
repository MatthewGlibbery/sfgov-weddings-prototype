import { join } from 'path'
import { i18n } from '../next.config'
import type {
  IContentAPI,
  PageData,
  QueryParams,
  WagtailImageData
} from '../types'
import { getenv } from './env'

// @ts-expect-error no, it's really not null/undefined
const DEFAULT_LOCALE = i18n.defaultLocale

export type ContentAPIOptions = {
  fetch?: typeof fetch
  baseURL?: string | null
  previewURL?: string | null
  apiHeaders?: Record<string, string>
}

type ListData<T> = {
  items: T[]
  meta: {
    total_count: number
  }
}

export class ContentAPI implements IContentAPI {
  baseURL: string
  previewURL: string
  options: ContentAPIOptions

  constructor(options?: ContentAPIOptions) {
    // TODO: baseURL will probably be replaced by
    // NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL at some point
    // FIXME: replace getenv() with requireEnv()
    const baseURL =
      options?.baseURL || getenv('NEXT_PUBLIC_CONTENT_API_BASE_URL')!
    // FIXME: replace getenv() with requireEnv()
    const previewURL =
      options?.previewURL || getenv('NEXT_PUBLIC_CONTENT_API_BASE_URL')!
    this.baseURL = baseURL
    this.previewURL = previewURL
    this.options = options || {}
  }

  get fetch() {
    return this.options.fetch || global.fetch
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPageByPath<T extends PageData = PageData>(
    path: string,
    params?: QueryParams,
    options?: RequestInit
  ) {
    path = path.split('?')[0]
    if (params?.preview) {
      return this.getPreviewData<T>(
        path,
        {
          locale: params?.locale,
          preview: true
        },
        options
      )
    }

    const english = await this.getData<T>(
      'pages/find/',
      {
        html_path: path
      },
      options
    ).catch(undefinedIfNotFound)

    if (english && params?.locale && params.locale !== DEFAULT_LOCALE) {
      const pages = await this.getData<ListData<T>>(
        'pages/',
        {
          translation_of: english.id,
          locale: params.locale
        },
        options
      ).catch((error: Error) => {
        console.error(
          'ContentAPI.getPageByPath(%s, %s) list failed: %s',
          JSON.stringify(path),
          JSON.stringify(params),
          error.message
        )
        // TODO: re-throw the error?
        return undefined
      })

      // TODO: throw an error if there are no items?
      return pages?.items.length
        ? this.getData<T>(`pages/${pages.items[0].id}/`)
        : english
    }
    return english
  }

  async getPreviewData<T = unknown>(
    path: string, // page path
    params?: QueryParams,
    options?: RequestInit
  ) {
    const url = new URL(this.previewURL)
    url.pathname += '/pages/preview'
    url.searchParams.set('path', path)
    url.searchParams.set('locale', params?.locale || 'en')

    const res = await this.fetch(url.href, options)
    if (!res.ok) {
      throw await RequestError.fromResponse(res)
    }
    return res.json().catch(
      // istanbul ignore next
      () => ({})
    ) as Promise<T>
  }

  async getAlerts<T = unknown>(params?: QueryParams, options?: RequestInit) {
    // TODO: translations
    const res = await this.load('/alerts')
    if (!res.ok) {
      throw await RequestError.fromResponse(res)
    }
    return res.json().catch(
      // istanbul ignore next
      () => ({})
    ) as Promise<T>
  }

  async getData<T = unknown>(
    path: string,
    params?: QueryParams,
    options?: RequestInit
  ) {
    const res = await this.load(path, params, options)
    if (!res.ok) {
      throw await RequestError.fromResponse(res)
    }
    return res.json() as Promise<T>
  }

  load(path: string, params?: QueryParams, options?: RequestInit) {
    const url = this.getURL(path, params).href
    return this.fetch(url, options)
  }

  getURL(path?: string, params?: QueryParams): URL {
    const url = new URL(this.baseURL)
    if (path) {
      url.pathname = join(url.pathname, path)
    }
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        if (val) {
          url.searchParams.set(key, String(val))
        }
      }
    }
    return url
  }
}

export class FixtureAPI implements IContentAPI {
  pages: PageData[]
  images: WagtailImageData[]
  dataByApiPath: Record<string, PageData>
  pagesByUrlPath: Record<string, PageData>

  constructor({
    pages,
    images
  }: {
    pages: PageData[]
    images?: WagtailImageData[]
  }) {
    this.pages = pages
    this.images = images || []
    this.dataByApiPath = Object.fromEntries([
      ...this.pages.map((page) => [`page/${page.id}`, page]),
      ...this.images.map((image) => [`images/${image.id}`, image])
    ])
    this.pagesByUrlPath = Object.fromEntries(
      this.pages.map((page) => [page.meta.url_path, page])
    )
  }

  getData<T = unknown>(path: string): Promise<T> {
    const page = (this.dataByApiPath[path] ||
      this.dataByApiPath[`/${path}`]) as T
    return page
      ? Promise.resolve(page)
      : Promise.reject(
          new RequestError(
            new Response('', {
              status: 404,
              statusText: 'Not Found'
            })
          )
        )
  }

  getPageByPath<T extends PageData = PageData>(
    path: string
  ): Promise<T | undefined> {
    const page = this.pagesByUrlPath[path]
    return Promise.resolve((page as T) || undefined)
  }

  // istanbul ignore next
  getAlerts<T = unknown>(): Promise<T> {
    return Promise.resolve({} as T)
  }
}

export class RequestError extends Error {
  response: Response
  constructor(response: Response, message?: string) {
    super(
      `${response.status} ${response.statusText}${
        message ? `: ${message}` : ''
      }`
    )
    this.response = response
  }

  /**
   * Attempt to extract the message from a JSON response and include it in the
   * error message. This function is async because Response.json() is, so you
   * need to await it before throwing:
   *
   * ```ts
   * throw await RequestError.fromResponse(res)
   * ```
   */
  static async fromResponse(response: Response) {
    const data = (await response.json().catch(() => undefined)) as
      | { message?: string }
      | undefined
    return new RequestError(response, data?.message as string)
  }
}

/**
 * This is a Promise.catch() callback that returns undefined if the thrown error
 * is a RequestError with a 404 response status. Otherwise it throws the error.
 */
function undefinedIfNotFound(error: Error) {
  if (error instanceof RequestError && error.response.status === 404) {
    return undefined
  } else {
    throw error
  }
}
