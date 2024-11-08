import { join } from 'path'
import type {
  PageData,
  QueryParams,
  IContentAPI,
  WagtailImageData
} from '../types'
import { getenv } from './env'
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
    // FIXME: replace getenv() with requireEnv()
    const baseURL =
      options?.baseURL || getenv('NEXT_PUBLIC_CONTENT_API_BASE_URL')!
    // FIXME: replace getenv() with requireEnv()
    const previewURL =
      options?.previewURL || getenv('NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL')!
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
      const page = await this.getPreviewData<T>(
        path,
        {
          locale: params?.locale,
          preview: true
        },
        options
      )

      return page
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
    path: string, // page path
    params?: QueryParams,
    options?: RequestInit
  ) {
    const url = new URL(this.previewURL)
    url.pathname += '/pages/by-url/preview'
    url.searchParams.set('path', path)
    url.searchParams.set('locale', params?.locale || 'en')

    const res = await this.fetch(url.href, options)
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
    await this.getPreviewRelatedData(path, previewData.data)
    await this.massageData(previewData.data)
    return previewData.data as T
  }

  async massageData(obj: any) {
    if (!obj || typeof obj !== 'object' || !Object.keys(obj).length) return

    for (const key of Object.keys(obj)) {
      let fetchUrl = null
      const value = obj[key]

      if (typeof value === 'number') {
        // we've encountered a numerical value for a key
        // inspect the key
        let fetchEndpoint = null
        if (key.includes('page')) {
          fetchEndpoint = 'pages'
        } else if (key.includes('image')) {
          fetchEndpoint = 'images'
        } else if (key.includes('document')) {
          fetchEndpoint = 'documents'
        }

        if (fetchEndpoint) {
          fetchUrl = `${this.baseURL}/${fetchEndpoint}/${value}`
        }
      } else if (
        typeof value === 'string' &&
        value.includes('/api/cms') &&
        key !== 'detail_url'
      ) {
        fetchUrl = value
      }

      if (key === 'type' && value === 'address') {
        fetchUrl = `${this.previewURL}/cms.Address/${obj.value}`
      }

      if (fetchUrl) {
        try {
          const res = await this.fetch(fetchUrl)
          const data = await res.json().catch(() => {
            return value
          })
          if (key === 'type' && value === 'address') {
            obj.value = data
          } else {
            obj[key] = data
          }
        } catch (error) {
          console.error(
            `Could not fetch data at ${fetchUrl} for key: ${key} with value ${value}. ${error}`
          )
          throw error
        }
      }

      await this.massageData(value)
    }
    return obj
  }

  async getPreviewRelatedData<T = unknown>(path: string, data: object) {
    // the current cms api responds with detail urls for related data
    // so we have to make an additional fetch to retrieve the related object's
    // fully serialized details.  the related object can be another page,
    // an image, a document, or anything, really
    const getRelatedData = async (url: string) => {
      let data = null
      try {
        const res = await this.fetch(url)
        data = await res.json()
      } catch (error) {
        return null
      }
      return url.match(/\/images\//) // the related data is an image
        ? data
        : {
            title: data.title,
            meta: { html_url: data.html_path }
          }
    }

    const relatedData = {
      part_of: [],
      topics: [],
      partner_agencies: [],
      related_child_agencies: [],
      related_pages: [],
      primary_agency: {},
      logo: null,
      background_header_image: null,
      image: null,
      main_image: null
    }

    for (const key of Object.keys(relatedData)) {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          // not everything is a straight url
          // some things (like page chooser streamfields) are an object
          // and the related data is in `value` as a numerical id
          for (const item of data[key]) {
            let url = item
            if (item.value) {
              url = `${this.previewURL}/pages/${item.value}`
            }
            relatedData[key].push(await getRelatedData(url))
          }
        } else {
          relatedData[key] = await getRelatedData(data[key])
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
