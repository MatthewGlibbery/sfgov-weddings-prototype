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
import { ResourceTileList, ServiceTileList } from '../Tile'

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
        {fields.map((section) => {
          switch (section.type) {
            case 'child_topics':
              return (
                <When condition={!!section.value.page_content.length}>
                  {section.value.page_content.map((topic, i) => (
                    <span
                      key={topic?.value?.id}
                      data-testid="related_content_topics-section"
                    >
                      {i > 0 && ', '}
                      <a href={topic?.value?.meta.html_url}>
                        {topic?.value?.title}
                      </a>
                    </span>
                  ))}
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
                  <HeadingXl as="h2" className="mb-20">
                    {t('services', { defaultValue: 'Services' })}
                  </HeadingXl>
                  {section.value.services.map((serviceSection) => {
                    const serviceTileList = (
                      <ServiceTileList links={serviceSection.value.services} />
                    )
                    return (
                      <TileContentSection
                        key={serviceSection.id}
                        title={serviceSection.value.title}
                        tileList={serviceTileList}
                      />
                    )
                  })}
                </When>
              )
            case 'spotlight':
              return (
                <When condition={!!section.value.spotlight.length}>
                  <Spotlight {...section.value.spotlight[0]} />
                </When>
              )
            case 'resources':
              return (
                <When condition={!!section.value.resources.length}>
                  <HeadingXl as="h2" className="m-0 mb-20">
                    {t('resources', { defaultValue: 'Resources' })}
                  </HeadingXl>
                  {section.value.resources.map((resourceSection) => {
                    const resourceTileList = (
                      <ResourceTileList
                        links={resourceSection.value.resources}
                      />
                    )
                    return (
                      <TileContentSection
                        key={resourceSection.id}
                        title={resourceSection.value.title}
                        tileList={resourceTileList}
                      />
                    )
                  })}
                </When>
              )
            case 'content':
              return (
                <When condition={!!section.value.content.length}>
                  {section.value.content.map((section) => (
                    <ContentSection
                      key={section.id}
                      title={section.value.title}
                      section_content={section.value.section_content}
                    />
                  ))}
                </When>
              )
            /* istanbul ignore next */
            default:
              return <></>
          }
        })}

        <When condition={!!agencies}>
          {/* Related Agencies list */}
          <PageLinksList pageLinks={agencies} />
        </When>
      </Container>
    </PageWrapper>
  )
}
