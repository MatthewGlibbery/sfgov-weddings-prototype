import type { ComponentType } from 'react'
import { useTranslation } from 'next-i18next'

import type { TopicPageData } from '@/types'
import { PageWrapper } from './PageWrapper'
import { Spotlight } from '../Spotlight'
import { ContentSection } from '../ContentSection'
import {
  ResourceSection,
  ServiceSection,
  TileContentSection
} from '../TileContentSection'

import { Container, DisplayLg, PageTitleSection } from '@/design-system'
import { ContentTileList } from '../Tile'
import { ZebraStripedSection } from '../ZebraStripeSection'
import { RelatedContentList } from '../RelatedContentList'

export const TopicPage: ComponentType<{ page: TopicPageData }> = ({ page }) => {
  const { t } = useTranslation()
  const {
    title,
    description,
    content_fields: fields,
    partner_agencies: agencies
  } = page
  return (
    <PageWrapper title={title} meta={{ ...page.meta, description }}>
      <Container className="mb-20">
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
                  <TileContentSection>
                    <ContentTileList links={section.value.page_content} />
                  </TileContentSection>
                </Container>
              ) : null
            case 'content_top':
              return section.value.content?.length
                ? section.value.content.map((section, i) => (
                    <ContentSection
                      key={i}
                      title={section.value.title}
                      section_content={section.value.section_content}
                    />
                  ))
                : null
            case 'services':
              return section.value.services?.length ? (
                <Container>
                  <ServiceSection
                    heading={t('services', { defaultValue: 'Services' })}
                    sections={section.value.services}
                  />
                </Container>
              ) : null
            case 'spotlight':
              return section.value.spotlight?.length ? (
                <div className="mb-20 max-w-xl md:mx-16 lg:mx-auto">
                  <Spotlight
                    backgroundcolor="white"
                    {...section.value.spotlight[0]}
                  />
                </div>
              ) : null
            case 'resources':
              return section.value.resources?.length ? (
                <Container>
                  <ResourceSection
                    heading={t('resources', { defaultValue: 'Resources' })}
                    sections={section.value.resources}
                  />
                </Container>
              ) : null
            case 'content':
              return section.value.content?.length ? (
                <div backgroundcolor="white">
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
                defaultValue: 'Partner agencies'
              })}
              content={agencies}
            />
          </Container>
        ) : null}
      </ZebraStripedSection>
    </PageWrapper>
  )
}
