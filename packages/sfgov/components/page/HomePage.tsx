import { ComponentType, Container, DisplayXXXl } from '@/design-system'
import { HomePageData } from '@/types'
import { useTranslation } from 'next-i18next'
import {
  ContentTileList,
  FeaturedTopicTileList,
  PageWrapper,
  ProfileGroup,
  Spotlight,
  ZebraStripedSection
} from '..'

export const HomePage: ComponentType<{ page: HomePageData }> = ({ page }) => {
  const {
    spotlight,
    top_services: services,
    featured_topics: topics,
    sf_government: sfGovernment
  } = page
  const { t } = useTranslation()
  return (
    <PageWrapper>
      <h1 className="sr-only">
        {t('welcome to sf.gov', { defaultValue: 'Welcome to SF.gov' })}
      </h1>
      {spotlight ? (
        <div className="mb-20 max-w-xl md:mx-16 lg:mx-auto">
          <Spotlight {...spotlight[0]} />
        </div>
      ) : null}
      <ZebraStripedSection>
        <Container className="py-8 mb-20">
          {services.length || topics.length ? (
            <div className="mb-28 space-y-12">
              <DisplayXXXl as="h2">
                {t('services', { defaultValue: 'Services' })}
              </DisplayXXXl>
              <div className="lg:hidden">
                <ContentTileList full={true} links={services} />
              </div>
              <div className="lg:hidden">
                <FeaturedTopicTileList full={true} links={topics} />
              </div>
              <div className="hidden lg:flex gap-x-96">
                <ContentTileList full={true} links={services} />
                <FeaturedTopicTileList links={topics} />
              </div>
            </div>
          ) : null}
          {sfGovernment.length ? (
            <DisplayXXXl as="h2">
              {t('sf-elected-officials', {
                defaultValue: 'San Francisco elected officials'
              })}
            </DisplayXXXl>
          ) : null}
        </Container>
        {sfGovernment.length ? (
          <Container backgroundColor="primary">
            {sfGovernment.map((profileGroup) => (
              <ProfileGroup
                key={profileGroup.id}
                title={profileGroup.value.title}
                description={profileGroup.value.description}
                profiles={profileGroup.value.profiles}
                isHomePage={true}
                backgroundColor="primary"
              />
            ))}
          </Container>
        ) : null}
      </ZebraStripedSection>
    </PageWrapper>
  )
}
