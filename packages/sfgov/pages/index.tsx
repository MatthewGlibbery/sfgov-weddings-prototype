import { Container, HeadingSm } from '@/design-system'
import { HomePage, PageLink, PageWrapper } from '@/components'
import { ContentAPI } from '@/lib/api'
import type { PageData } from '@/types'
import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export const config = {
  runtime: 'nodejs'
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const api = new ContentAPI()
  const data = await api
    .getPageByPath('home-page', {
      locale: 'en'
    })
    .catch((error) => {
      console.error('Error fetching homepage:', error)
      return {
        page: {}
      }
    })

  return {
    props: {
      page: data
    }
  }
}

const Home = HomePage

export default Home
