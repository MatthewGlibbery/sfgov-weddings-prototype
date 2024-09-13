import { Container, HeadingSm } from '@/design-system'
import { PageLink, PageWrapper } from '@/components'
import { ContentAPI } from '@/lib/api'
import type { PageData } from '@/types'
import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export const config = {
  runtime: 'nodejs'
}

type PagesData = {
  meta?: {
    total_count: number
  }
  items: PageData[]
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const api = new ContentAPI()
  const data: PagesData = await api
    .getData<PagesData>('pages/', {
      locale: 'en'
    })
    .catch((error) => {
      console.error('Error fetching pages:', error)
      return {
        items: []
      }
    })

  const translations = await serverSideTranslations(locale || 'en', ['common'])

  return {
    props: {
      pages: data.items,
      ...translations
    }
  }
}

const Home = ({ pages }: { pages: PageData[] }) => {
  const { t } = useTranslation()
  console.log(pages)
  return (
    <PageWrapper>
      <Container className="py-8 mb-20">
        <HeadingSm as="h1">{t('pages', { defaultValue: 'pages' })}</HeadingSm>
        {pages.length ? (
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                <PageLink page={page} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-red100 text-red400 p-20 rounded-[8px]">
            No pages found?
          </div>
        )}
      </Container>
    </PageWrapper>
  )
}

export default Home
