import type { GetServerSideProps } from 'next'

import { DEFAULT_PAGE_TEMPLATES } from '@/constants/templates'
import { ContentAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../../next-i18next.config.js'

const controller = new Controller(new ContentAPI(), DEFAULT_PAGE_TEMPLATES)

// Straight up copied out the `makeGetServerSideProps` and the modified it cuz
// NextJS needs to have the serverside run code in a "page", otherwise it'll
// attempt to run the code that's not browser-safe, in the browser. This is
// a problem cuz the `serverSideTranslations` has Node-safe only code.
// TODO: make this cleaner later.
export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
  locale,
  query,
  req
}) => {
  const { cookie } = req.headers
  const options = {
    headers: {
      Cookie: cookie
    }
  }

  try {
    const page = await new ContentAPI().getPageByPath(
      resolvedUrl,
      {
        locale,
        preview: query.preview === 'true'
      },
      options
    )
    return {
      props: {
        page,
        // This is the line that must be in the page
        ...(await serverSideTranslations(
          locale,
          ['common'],
          nextI18NextConfig,
          ['en', 'es', 'zh', 'fil']
        ))
      }
    }
  } catch (error) {
    console.error(
      'No page found for path: "%s", locale: "%s"',
      resolvedUrl,
      locale
    )
  }
  return {
    notFound: true
  }
}

export default controller.makeViewComponent()
