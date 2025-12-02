import type { ComponentType } from '@/design-system'
import { Container, DisplayXXXl, HeadingXXl } from '@/design-system'
import type { HomePageData } from '@/types'
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
    <PageWrapper meta={page.meta} className="mt-0">
      <h1 className="sr-only">
        {t('welcome-to-sf-gov', { defaultValue: 'Welcome to SF.gov' })}
      </h1>
      {spotlight ? (
        <div className="mb-20 max-w-xl lg:mx-96 xl:mx-auto">
          <Spotlight {...spotlight[0]} />
        </div>
      ) : null}
      <ZebraStripedSection>
        <Container>
          {services?.length || topics?.length ? (
            <div className="mb-28 space-y-12">
              <DisplayXXXl as="h2" className="lg:hidden">
                {t('services', { defaultValue: 'Services' })}
              </DisplayXXXl>
              <HeadingXXl as="h2" className="hidden lg:block !mb-20">
                {t('services', { defaultValue: 'Services' })}
              </HeadingXXl>
              <div className="lg:hidden">
                <ContentTileList
                  isHomePage={true}
                  links={services}
                  noDescription={true}
                />
              </div>
              <div className="lg:hidden">
                <FeaturedTopicTileList isHomePage={true} links={topics} />
              </div>
              <div className="hidden lg:flex gap-x-96">
                <div className="basis-[36%]">
                  <ContentTileList
                    isHomePage={true}
                    links={services}
                    noDescription={true}
                  />
                </div>
                <div className="basis-[53%]">
                  <FeaturedTopicTileList isHomePage={true} links={topics} />
                </div>
              </div>
            </div>
          ) : null}
        </Container>
        {sfGovernment?.length ? (
          <Container className="flex flex-col gap-60" backgroundcolor="neutral">
            <DisplayXXXl as="h2">
              {t('sf-elected-officials', {
                defaultValue: 'San Francisco elected officials'
              })}
            </DisplayXXXl>
            {sfGovernment.map((profileGroup) => (
              <ProfileGroup
                key={profileGroup.id}
                title={profileGroup.value.title}
                description={profileGroup.value.description}
                profiles={profileGroup.value.profiles}
              />
            ))}
          </Container>
        ) : null}
      </ZebraStripedSection>
    </PageWrapper>
  )
}
