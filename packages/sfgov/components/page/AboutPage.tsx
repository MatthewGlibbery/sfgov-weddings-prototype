import type { ComponentType } from 'react'
import { When } from 'react-if'
import { useTranslation } from 'next-i18next'

import type { AboutPageData } from '@/types'

import { RelatedContentList } from '../RelatedContentList'
import { ServicesAndResourcesSection } from '../ServicesAndResourcesSection'
import { TitleAndText } from '../TitleAndText'
import { PageWrapper } from './PageWrapper'
import { BigDesc, Container, DisplayLg, HeadingXl } from '@/design-system'

export const AboutPage: ComponentType<{ page: AboutPageData }> = ({ page }) => {
  const { t } = useTranslation()
  const {
    title,
    description,
    about_agency: agency,
    about_info: aboutInfo,
    resources
  } = page
  const partOf = [agency]

  return (
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <RelatedContentList
          title={t('part-of', { defaultValue: 'Part of' })}
          content={partOf}
        />
        <DisplayLg as="h1" className="my-40">
          {t('about-us', { defaultValue: 'About Us' })}
        </DisplayLg>
        <When condition={description}>
          <BigDesc
            className="mb-20"
            as="p"
            data-testid="about-page-description"
          >
            {description}
          </BigDesc>
        </When>
        <When condition={!!aboutInfo.length}>
          {aboutInfo.map((item) => (
            <TitleAndText key={item.id} {...item.value} />
          ))}
        </When>
        <When condition={!!resources.length}>
          <HeadingXl as="h2" className="m-0 mb-20">
            {t('resources', { defaultValue: 'Resources' })}
          </HeadingXl>
          {resources.map((resourceSection) => (
            <ServicesAndResourcesSection
              key={resourceSection.id}
              title={resourceSection.value.title}
              tiles={resourceSection.value.resources}
            />
          ))}
        </When>
      </Container>
    </PageWrapper>
  )
}
