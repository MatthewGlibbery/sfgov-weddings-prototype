import { PageWrapper } from '@/components'
import {
  BodyText,
  Container,
  DisplayLg,
  HeadingLg,
  PageTitleSection
} from '@/design-system'
import { getPublicEnv, requireEnv } from '@/lib/env'
import { withServerSideTranslations } from '@/lib/translations'
import { useTranslation } from 'next-i18next'

type Topic = {
  title: string
  description: string
  url: string
  translation_key: string
}

type TopicPageData = {
  topics: Topic[]
}

export const getServerSideProps = withServerSideTranslations(
  async ({ locale }) => {
    const url = new URL(
      requireEnv('NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL') + '/sf.Topic'
    )
    url.searchParams.set('top_level_topic', 'true')
    url.searchParams.set('locale__language_code', locale as string)
    url.searchParams.set('live', 'true')
    const res = await fetch(url.href)
    const topics = await res.json()
    return { props: { topics, env: getPublicEnv() } }
  }
)

const TopicsPage = (props: TopicPageData) => {
  const { t } = useTranslation()
  const { topics } = props
  return (
    <PageWrapper title={t('services', { defaultValue: 'Services' })}>
      <Container className="grid grid-cols-1 gap-y-60">
        <div>
          <PageTitleSection
            title={t('services', { defaultValue: 'Services' })}
            label=""
          >
            <DisplayLg>
              {t('services-list-desc', {
                defaultValue:
                  'Select a service category to find a specific service or to learn more.'
              })}
            </DisplayLg>
          </PageTitleSection>
        </div>
        <ul className="list-none m-0 p-0 grid grid-cols-1 gap-y-28 mb-60">
          {topics.map((topic) => {
            return (
              <li
                key={topic.translation_key}
                className="grid grid-cols-1 gap-y-8"
              >
                <HeadingLg className="font-body text-primary500 !mb-0">
                  <a
                    href={topic.url}
                    className="grid grid-cols-1 gap-y-8 no-underline"
                  >
                    {topic.title}
                  </a>
                </HeadingLg>
                <BodyText>{topic.description}</BodyText>
              </li>
            )
          })}
        </ul>
      </Container>
    </PageWrapper>
  )
}

export default TopicsPage
