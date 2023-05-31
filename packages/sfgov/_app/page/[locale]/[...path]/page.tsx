import { INFO_PAGE_TYPE } from '@/constants'
import { ContentAPI } from '@/lib/api'
import dynamic from 'next/dynamic'
import type { PageComponent } from '@/types'

export type PageParams = {
  locale: string
  page_type: string
  path: string[]
}

type PageComponentProps = {
  params: PageParams
}

const api = new ContentAPI()

const componentsByPageType = new Map([
  [INFO_PAGE_TYPE, dynamic(
    () => import('@/components/page/InformationPage').then(mod => mod.InformationPage)
  )]
])

export default async function Page ({ params }: PageComponentProps) {
  const path = params.path.join('/')
  const { locale } = params
  const page = await api.getPageByPath(path, { locale })
  const pageType = page.meta.type
  const Component = componentsByPageType.get(pageType) as PageComponent
  return <Component page={page} />
}
