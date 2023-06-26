import type { ComponentType } from 'react'
import { When } from 'react-if'
import { useTranslation } from 'next-i18next'

import type { TopicPageData } from '@/types'
import { PageWrapper } from './PageWrapper'
import { Spotlight } from '../Spotlight'
import { ContentSection } from '../ContentSection'
import { ResourcesSection } from '../ResourcesSection'

import { BigDesc, Container, DisplayLg, TitleXl } from '@/design-system'
import { ServicesSection } from '../ServicesSection'

export const TopicPage: ComponentType<{ page: TopicPageData }> = ({ page }) => {
  const { t } = useTranslation()
  const {
    title,
    description,
    related_content_topics: topics, // not displayed
    content_top: contentTop,
    services,
    spotlight,
    content,
    resources,
    related_content_agencies: agencies
  } = page
  return (
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <DisplayLg as="h1" className="my-40">
          {title}
        </DisplayLg>

        <When condition={description}>
          <BigDesc
            className="mb-20"
            as="p"
            data-testid="topic-page-description"
          >
            {description}
          </BigDesc>
        </When>

        <When condition={!!topics}>
          {topics.map((topic, i) => (
            <span
              key={topic.page_content.id}
              data-testid="related_content_topics-section"
            >
              {i > 0 && ', '}
              <a href={topic.page_content.meta.html_url}>
                {topic.page_content.title}
              </a>
            </span>
          ))}
        </When>

        <When condition={!!contentTop.length}>
          {contentTop.map((section) => (
            <ContentSection
              key={section.id}
              title={section.value.title}
              section_content={section.value.section_content}
            />
          ))}
        </When>

        <When condition={!!services.length}>
          <TitleXl as="h2" className="mb-20">
            {t('Services')}
          </TitleXl>
          {services.map((serviceSection) => (
            <ServicesSection
              key={serviceSection.id}
              title={serviceSection.value.title}
              services={serviceSection.value.services}
            />
          ))}
        </When>

        <When condition={!!spotlight.length}>
          <Spotlight {...spotlight[0]} />
        </When>

        <When condition={!!content.length}>
          {content.map((section) => (
            <ContentSection
              key={section.id}
              title={section.value.title}
              section_content={section.value.section_content}
            />
          ))}
        </When>

        <When condition={!!resources.length}>
          <TitleXl as="h2" className="m-0 mb-20">
            {t('Resources')}
          </TitleXl>
          {resources.map((resourceSection) => (
            <ResourcesSection
              key={resourceSection.id}
              title={resourceSection.value.title}
              resources={resourceSection.value.resources}
            />
          ))}
        </When>

        <When condition={!!agencies}>
          {/* Related Agencies list */}
          {agencies.map((agency, i) => (
            <span
              key={agency.page_content.id}
              data-testid="related_content_agencies-section"
            >
              {i > 0 && ', '}
              <a href={agency.page_content.meta.html_url}>
                {agency.page_content.title}
              </a>
            </span>
          ))}
        </When>
      </Container>
    </PageWrapper>
  )
}
