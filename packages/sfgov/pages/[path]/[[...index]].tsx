import { DEFAULT_PAGE_TEMPLATES } from '@/constants/templates'
import { ContentAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../../next-i18next.config.js'

const controller = new Controller(new ContentAPI(), DEFAULT_PAGE_TEMPLATES)

export const getServerSideProps = controller.makeGetServerSideProps(
  async (props, { locale }) => {
    const translations = await serverSideTranslations(
      locale!,
      ['translation', 'common'],
      nextI18NextConfig,
      ['en', 'es', 'zh-hant', 'fil']
    )
    return { ...props, ...translations }
  }
)

export default controller.makeViewComponent()
