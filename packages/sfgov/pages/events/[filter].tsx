import { getenv, getPublicEnv } from '@/lib/env'
import { withServerSideTranslations } from '@/lib/translations'
import type { GetServerSidePropsContext } from 'next'
import CityEventsListingPage from '@/components/page/CityEventsListingPage'

export const getServerSideProps = withServerSideTranslations(
  async ({ params, locale, query }: GetServerSidePropsContext) => {
    const { path, filter } = params!
    const url = new URL(String(getenv('API_BASE_URL')))
    url.pathname += 'api/related-events/'
    url.searchParams.set('list', String(filter))
    url.searchParams.set('locale', String(locale))
    url.searchParams.set('page', String(query?.page || 1))
    url.searchParams.set('groupby', 'date')
    try {
      const res = await fetch(url.href)
      const data = await res.json()

      // append the "base" api url for this list
      // so the client side can make requests for more pages
      return {
        props: {
          ...data,
          baseUrl: url.href,
          env: getPublicEnv()
        }
      }
    } catch (error) {
      return { notFound: true } // 404
    }
  }
)

export default CityEventsListingPage
