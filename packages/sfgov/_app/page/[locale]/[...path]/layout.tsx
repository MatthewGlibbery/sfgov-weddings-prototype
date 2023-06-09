import { PageWrapper } from '@/components'
import { ContentAPI } from '@/lib/api'
import type { AppRouterPageProps } from '@/types'
import type { PageParams } from './page'

const api = new ContentAPI()

export default async function PageLayout({
  params,
  children
}: AppRouterPageProps<PageParams>) {
  const path = params.path.join('/')
  const locale = params.locale
  const page = await api.getPageByPath(path, { locale })
  return <PageWrapper title={page.title}>{children}</PageWrapper>
}
