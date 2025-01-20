import { HomePage } from '@/components'
import { ContentAPI } from '@/lib/api'
import { withServerSideTranslations } from '@/lib/translations'
import type { GetServerSideProps } from 'next'

export const config = {
  runtime: 'nodejs'
}

export const getServerSideProps: GetServerSideProps =
  withServerSideTranslations(async ({ locale }) => {
    const api = new ContentAPI()
    const data = await api
      .getPageByPath('home-page', {
        locale
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
  })

const Home = HomePage

export default Home
