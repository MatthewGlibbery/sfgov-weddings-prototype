import {
  Container,
  DisplayLg,
  HeadingXl,
  PageTitleSection
} from '@/design-system'
import type { TopicPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import { ContentSection } from '../ContentSection'
import { RelatedContentList } from '../RelatedContentList'
import { Spotlight } from '../Spotlight'
import { ContentTileList } from '../Tile'
import { TileContentSection } from '../TileContentSection'
import { ZebraStripedSection } from '../ZebraStripeSection'
import { PageWrapper } from './PageWrapper'

export const TopicPage: ComponentType<{ page: TopicPageData }> = ({ page }) => {
  const { t } = useTranslation()
  const { title, description, fields, partner_agencies: agencies } = page
  return (
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <PageTitleSection label={t('Topic')} title={title}>
          {description ? (
            <DisplayLg
              className="mb-20"
              as="p"
              data-testid="topic-page-description"
            >
              {description}
            </DisplayLg>
          ) : null}
        </PageTitleSection>
      </Container>
      <ZebraStripedSection>
        {fields.map((section) => {
          switch (section.type) {
            case 'child_topics':
              return section.value.page_content.length ? (
                <Container>
                  <TileContentSection
                    title=""
                    tileList={
                      <ContentTileList links={section.value.page_content} />
                    }
                  />
                </Container>
              ) : null
            case 'content_top':
              return section.value.section.length
                ? section.value.section.map((section, i) => (
                    <ContentSection
                      key={i}
                      title={section.value.title}
                      section_content={section.value.section_content}
                    />
                  ))
                : null
            case 'services':
              return section.value.services.length ? (
                <>
                  <Container>
                    <HeadingXl as="h2" className="!mb-28">
                      {t('services', { defaultValue: 'Services' })}
                    </HeadingXl>
                    {section.value.services.map((serviceSection) => {
                      const tileList = (
                        <ContentTileList
                          links={serviceSection.value.services}
                        />
                      )
                      return (
                        <TileContentSection
                          key={serviceSection.id}
                          title={serviceSection.value.title}
                          tileList={tileList}
                        />
                      )
                    })}
                  </Container>
                </>
              ) : null
            case 'spotlight':
              return section.value.spotlight.length ? (
                <Spotlight
                  backgroundColor="white"
                  {...section.value.spotlight[0]}
                />
              ) : null
            case 'resources':
              return section.value.resources.length ? (
                <Container>
                  <HeadingXl as="h2" className="!mb-28">
                    {t('resources', { defaultValue: 'Resources' })}
                  </HeadingXl>
                  {section.value.resources.map((resourceSection) => {
                    const tileList = (
                      <ContentTileList
                        links={resourceSection.value.resources}
                      />
                    )
                    return (
                      <TileContentSection
                        key={resourceSection.id}
                        title={resourceSection.value.title}
                        tileList={tileList}
                      />
                    )
                  })}
                </Container>
              ) : null
            case 'content':
              return section.value.content.length ? (
                <div className="flex flex-col gap-y-40" backgroundColor="white">
                  {section.value.content.map((section) => (
                    <ContentSection
                      key={section.id}
                      title={section.value.title}
                      section_content={section.value.section_content}
                    />
                  ))}
                </div>
              ) : null
          }
        })}

        {agencies?.length ? (
          <Container>
            <RelatedContentList
              title={t('partner-agencies', {
                defaultValue: 'Partner Agencies'
              })}
              content={agencies}
            />
          </Container>
        ) : null}
      </ZebraStripedSection>
    </PageWrapper>
  )
}
