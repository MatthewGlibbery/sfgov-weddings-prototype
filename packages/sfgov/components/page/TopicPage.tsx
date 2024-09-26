import type { ComponentType } from 'react'
import { When } from 'react-if'
import { useTranslation } from 'next-i18next'

import type { TopicPageData } from '@/types'
import { PageWrapper } from './PageWrapper'
import { Spotlight } from '../Spotlight'
import { ContentSection } from '../ContentSection'
import { TileContentSection } from '../TileContentSection'

import {
  Container,
  DisplayLg,
  HeadingXl,
  PageTitleSection
} from '@/design-system'
import { PageLinksList } from '../PageLinksList'
import { ContentTileList } from '../Tile'
import { ZebraStripedSection } from '../ZebraStripeSection'
import { RelatedContentList } from '../RelatedContentList'

export const TopicPage: ComponentType<{ page: TopicPageData }> = ({ page }) => {
  const { t } = useTranslation()
  const { title, description, fields, partner_agencies: agencies } = page
  return (
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <PageTitleSection label={t('Topic')} title={title}>
          <When condition={description}>
            <DisplayLg
              className="mb-20"
              as="p"
              data-testid="topic-page-description"
            >
              {description}
            </DisplayLg>
          </When>
        </PageTitleSection>
      </Container>
      <ZebraStripedSection>
        {fields.map((section) => {
          switch (section.type) {
            case 'child_topics':
              return (
                <When condition={!!section.value.page_content.length}>
                  <Container>
                    <TileContentSection
                      title=""
                      tileList={
                        <ContentTileList links={section.value.page_content} />
                      }
                    />
                  </Container>
                </When>
              )
            case 'content_top':
              return (
                <When condition={!!section.value.section.length}>
                  {section.value.section.map((section) => (
                    <ContentSection
                      key={section.id}
                      title={section.value.title}
                      section_content={section.value.section_content}
                    />
                  ))}
                </When>
              )
            case 'services':
              return (
                <When condition={!!section.value.services.length}>
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
                </When>
              )
            case 'spotlight':
              return (
                <When condition={!!section.value.spotlight.length}>
                  <Spotlight
                    backgroundColor="white"
                    {...section.value.spotlight[0]}
                  />
                </When>
              )
            case 'resources':
              return (
                <When condition={!!section.value.resources.length}>
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
                </When>
              )
            case 'content':
              return (
                <When condition={!!section.value.content.length}>
                  <div
                    className="flex flex-col gap-y-40"
                    backgroundColor="white"
                  >
                    {section.value.content.map((section) => (
                      <ContentSection
                        key={section.id}
                        title={section.value.title}
                        section_content={section.value.section_content}
                      />
                    ))}
                  </div>
                </When>
              )
            /* istanbul ignore next */
            default:
              return <></>
          }
        })}

        <When condition={!!agencies}>
          <Container>
            <RelatedContentList
              title={t('partner-agencies', {
                defaultValue: 'Partner Agencies'
              })}
              content={agencies}
            />
          </Container>
        </When>
      </ZebraStripedSection>
    </PageWrapper>
  )
}
