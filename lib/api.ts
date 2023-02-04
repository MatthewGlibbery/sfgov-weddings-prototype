import { join } from 'path'
import type { FetchImpl, PageData, QueryParams, IContentAPI } from './types'

export type ContentAPIOptions = {
  fetch?: FetchImpl
  apiBaseURL: string
  apiBasePath: string
  apiHeaders?: Record<string, string>
}

export class ContentAPI implements IContentAPI {
  options: ContentAPIOptions

  constructor (options?: Partial<ContentAPIOptions>) {
    this.options = {
      apiBaseURL: process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL,
      apiBasePath: process.env.NEXT_PUBLIC_CONTENT_API_BASE_PATH,
      ...options
    }
    // console.info('ContentAPI:', this.options)
    if (!this.options.apiBaseURL) {
      throw new Error(`The apiBaseURL option is required; got ${JSON.stringify(this.options)}`)
    }
  }

  get fetch () {
    return this.options.fetch || global.fetch
  }

  async getPageByPath<T extends PageData = PageData> (path:string, params?: QueryParams, options?: RequestInit) {
    return this.loadJSON<T>('pages/find', {
      html_path: path,
      ...params
    })
  }

  async loadJSON<T = unknown> (path: string, params?: QueryParams, options?: RequestInit) {
    const res = await this.load(path, params, options)
    const data = await res.json()
    return data as T
  }

  load (path: string, params?: QueryParams, options?: RequestInit) {
    const url = this.getURL(path, params).toString()
    // console.info('[load]', url)
    return this.fetch(url, options)
  }

  getURL (path?: string, params?: QueryParams): URL {
    const { apiBaseURL, apiBasePath } = this.options
    const url = new URL(apiBasePath || '', apiBaseURL)
    if (path) {
      url.pathname = join(url.pathname, path)
    }
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        url.searchParams.set(key, val)
      }
    }
    return url
  }
}
