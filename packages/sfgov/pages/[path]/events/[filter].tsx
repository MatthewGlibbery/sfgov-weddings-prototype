import type { GetServerSidePropsContext } from 'next'
import { getenv, getPublicEnv } from '@/lib/env'
import { withServerSideTranslations } from '@/lib/translations'
import AgencyEventsListingPage from '@/components/page/AgencyEventsListingPage'

export const getServerSideProps = withServerSideTranslations(
  async ({ params, locale, query }: GetServerSidePropsContext) => {
    const { path, filter } = params!
    const url = new URL(String(getenv('API_BASE_URL')))
    url.pathname += 'api/related-events/'
    url.searchParams.set('list', String(filter))
    url.searchParams.set('locale', String(locale))
    url.searchParams.set('path', String(path))
    url.searchParams.set('page', String(query?.page || 1))
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

export default AgencyEventsListingPage
