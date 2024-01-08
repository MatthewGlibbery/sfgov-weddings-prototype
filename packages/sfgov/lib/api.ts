import { join } from 'path'
import type {
  PageData,
  QueryParams,
  IContentAPI,
  WagtailImageData
} from '../types'
import { i18n } from '../next.config'

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
    const baseURL =
      options?.baseURL || process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL
    const previewURL =
      options?.previewURL || process.env.NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL
    if (!previewURL) {
      throw new Error(
        `The previewURL argument is required; got ${JSON.stringify(previewURL)}`
      )
    }
    if (!baseURL) {
      throw new Error(
        `The baseURL argument is required; got ${JSON.stringify(baseURL)}`
      )
    }
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
    if (params?.preview) {
      const english = await this.getPreviewData<T>(
        'pages/by-url/preview',
        {
          path,
          locale: params?.locale,
          preview: true
        },
        options
      )

      return english
    }

    const english = await this.getData<T>(
      'pages/find/',
      {
        html_path: path
      },
      options
    )
    if (params?.locale && params.locale !== DEFAULT_LOCALE) {
      let translation: PageData
      try {
        const list = await this.getData<ListData<T>>(
          'pages/',
          {
            translation_of: english.id,
            locale: params.locale
          },
          options
        )
        if (list?.items?.length) {
          translation = await this.getData<T>(`pages/${list.items[0].id}/`)
        }
      } catch (error) {
        // TODO: log errors
      }
      // @ts-expect-error uh no
      if (translation) {
        return translation as T
      }
    }
    return english
  }

  async getPreviewData<T = unknown>(
    path: string, // cms api path
    params?: QueryParams, // contains path of page to request
    options?: RequestInit
  ) {
    const res = await this.loadPreview(path, params, options)
    const previewData = await res.json().catch(() => {
      return {}
    })

    if (res.status === 404) {
      throw new Error(previewData?.message || 'not found')
    } else if (!res.ok) {
      let error = `${res.status} ${res.statusText}`
      if (previewData?.message) {
        error = `${error}: ${previewData.message}`
      }
      throw new Error(error)
    }

    previewData.data.meta = previewData.meta
    previewData.data = await this.getRelatedData(path, previewData.data)
    return previewData.data as T
  }

  async getRelatedData<T = unknown>(path: string, data: object) {
    const relatedData = {
      part_of: [],
      topics: [],
      partner_agencies: [],
      related_pages: []
    }
    for (const key of Object.keys(relatedData)) {
      if (data[key]) {
        for (const url of data[key]) {
          try {
            const res = await this.fetch(url)
            const data = await res.json()

            relatedData[key].push({
              title: data.title,
              meta: { html_url: data.html_path }
            })
          } catch (error) {
            // log error
          }
        }
        data[key] = relatedData[key]
      }
    }

    return data
  }

  async getData<T = unknown>(
    path: string,
    params?: QueryParams,
    options?: RequestInit
  ) {
    const res = await this.load(path, params, options)
    // eslint-disable-next-line n/handle-callback-err
    const data = await res.json().catch(() => {
      return {}
    })
    if (res.status === 404) {
      throw new Error(data?.message || 'not found')
    } else if (!res.ok) {
      let error = `${res.status} ${res.statusText}`
      if (data?.message) {
        error = `${error}: ${data.message}`
      }
      throw new Error(error)
    }
    return data as T
  }

  load(path: string, params?: QueryParams, options?: RequestInit) {
    const url = this.getURL(path, params).toString()
    return this.fetch(url, options)
  }

  loadPreview(path: string, params?: QueryParams, options?: RequestInit) {
    const url = new URL(this.previewURL)
    let pagePath = String(params?.path)
    url.pathname = join(url.pathname, path)
    if (pagePath) {
      pagePath = pagePath.substring(0, pagePath.indexOf('?'))
      url.searchParams.set('path', pagePath)
    }
    return this.fetch(url.toString(), options)
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getData<T = unknown>(
    path: string,
    params?: QueryParams,
    options?: RequestInit
  ): Promise<T> {
    const page = (this.dataByApiPath[path] ||
      this.dataByApiPath[`/${path}`]) as T
    return page
      ? Promise.resolve(page)
      : Promise.reject(new Error(`not found: ${path}`))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPageByPath<T extends PageData = PageData>(
    path: string,
    params?: QueryParams,
    options?: RequestInit
  ): Promise<T> {
    const page = this.pagesByUrlPath[path] as T
    return page
      ? Promise.resolve(page)
      : Promise.reject(new Error(`not found: ${path}`))
  }
}
