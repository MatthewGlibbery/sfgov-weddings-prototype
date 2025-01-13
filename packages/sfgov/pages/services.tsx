import { PageWrapper } from '@/components'
import {
  BodyText,
  Container,
  DisplayLg,
  HeadingLg,
  PageTitleSection
} from '@/design-system'
import { requireEnv } from '@/lib/env'
import { withServerSideTranslations } from '@/lib/translations'

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
    const res = await fetch(url.href)
    const topics = await res.json()
    return { props: { topics } }
  }
)

const TopicsPage = (props: TopicPageData) => {
  const { topics } = props
  return (
    <PageWrapper>
      <Container className="grid grid-cols-1 gap-y-60">
        <div>
          <PageTitleSection title="Services" label="">
            <DisplayLg>
              Select a service category to find a specific service or to learn
              more.
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
                <a
                  href={topic.url}
                  className="grid grid-cols-1 gap-y-8 no-underline"
                >
                  <HeadingLg className="font-body text-primary500 !mb-0">
                    {topic.title}
                  </HeadingLg>
                  <BodyText>{topic.description}</BodyText>
                </a>
              </li>
            )
          })}
        </ul>
      </Container>
    </PageWrapper>
  )
}

export default TopicsPage
