import type { QueryParams } from '@/types'
import type { GetServerSideProps } from 'next'
import { ContentAPI } from './api'
import { getenv } from './env'

export function isQA(host?: string): boolean {
  return (
    getenv('NODE_ENV') !== 'production' ||
    !!host?.split(':')[0].endsWith('.dev.sf.gov')
  )
}

export function qaOnly<Props extends object>(
  handler: GetServerSideProps<Props>
): GetServerSideProps<Props> {
  return async (context) => {
    if (isQA(context.req.headers.host)) {
      return handler(context)
    }
    return {
      notFound: true
    }
  }
}

export async function getPages<T extends object>(
  pageType: string,
  fields: string[]
) {
  const api = new ContentAPI()
  const perPage = 50
  const params: QueryParams = {
    type: pageType.toLowerCase(),
    fields: fields.join(','),
    locale: 'en',
    limit: perPage
  }

  async function nextPage() {
    const res = await api.load('pages', {
      ...params,
      offset: pages.length
    })
    return (await res.json()) as {
      meta: {
        total_count: number
      }
      items: T[]
    }
  }
  const pages: T[] = []
  while (true) {
    const page = await nextPage()
    if (!page.items?.length) break
    pages.push(...page.items)
    if (pages.length >= page.meta.total_count) {
      break
    }
  }
  return pages
}
