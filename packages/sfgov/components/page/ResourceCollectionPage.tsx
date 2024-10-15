import {
  Container,
  DisplayLg,
  HeadingXl,
  HeadingXXl,
  PageTitleSection
} from '@/design-system'
import { camelCase } from '@/lib/utils'
import type { ResourceCollectionPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import {
  ContentTileList,
  DataStoryTileList,
  EmbeddedContentBlock,
  PageLinksList,
  RelatedContentList,
  TitleAndText
} from '../'
import { DocumentSectionBlock } from '../DocumentSection'
import { TileContentSection } from '../TileContentSection'
import { PageWrapper } from './PageWrapper'

export const ResourceCollectionPage: ComponentType<{
  page: ResourceCollectionPageData
}> = ({ page }) => {
  const {
    title,
    description,
    data_dashboard: dataDashboard,
    introductory_text: introductoryText,
    body,
    custom_section: customSection,
    topics: relatedTopics,
    partner_agencies: agencies
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Container className="flex flex-col gap-y-60">
        <div className="flex flex-col">
          <PageTitleSection title={title} label={t('Resource collection')}>
            {description ? (
              <DisplayLg
                as="p"
                className="mb-16"
                data-testid="page-description"
              >
                {description}
              </DisplayLg>
            ) : null}
            {relatedTopics.length ? (
              <PageLinksList
                data-testid="related-topics-list"
                pageLinks={relatedTopics}
                label={t('Part of: ', { defaultValue: 'Part of: ' })}
              />
            ) : null}
          </PageTitleSection>
        </div>
        <div className="flex flex-col gap-y-20 md:gap-y-40 lg:gap-y-60">
          {dataDashboard.map((item, i) => (
            <EmbeddedContentBlock {...item.value} key={i} />
          ))}
          {introductoryText.map((item, i) => (
            <TitleAndText
              {...item.value}
              id={camelCase(item.value.title)}
              key={i}
              heading={HeadingXXl}
              as="h2"
            />
          ))}
          {body.map((item, i) => {
            switch (item.type) {
              case 'resources':
                return (
                  <div className="grid gap-y-20" key={i}>
                    <HeadingXXl as="h2" className="!mb-0" id="resources">
                      {t('Resources')}
                    </HeadingXXl>
                    {item.value.map((resourceSection, j) => {
                      return (
                        <TileContentSection
                          key={j}
                          title={resourceSection.value.title}
                          tileList={
                            <ContentTileList
                              links={resourceSection.value.resources}
                            />
                          }
                        />
                      )
                    })}
                  </div>
                )
              case 'data_stories':
                return (
                  <div className="grid gap-y-20" key={i}>
                    <HeadingXXl as="h2" className="!mb-0" id="data">
                      {t('Data')}
                    </HeadingXXl>
                    {item.value.map((dataStorySection, j) => {
                      return (
                        <TileContentSection
                          key={j}
                          title={dataStorySection.value.title}
                          tileList={
                            <DataStoryTileList
                              links={dataStorySection.value.content}
                            />
                          }
                        />
                      )
                    })}
                  </div>
                )
              case 'documents':
                return (
                  <div className="grid gap-y-20" key={i}>
                    <HeadingXXl as="h2" className="!mb-0" id="documents">
                      {t('Documents')}
                    </HeadingXXl>
                    {item.value.map((documentSection, j) => (
                      <DocumentSectionBlock
                        key={j}
                        title={documentSection.value.title}
                        content={documentSection.value.content}
                      />
                    ))}
                  </div>
                )
            }
            /* istanbul ignore next */
            return null
          })}
          {customSection.map((item, i) => (
            <TitleAndText
              {...item.value}
              id={camelCase(item.value.title)}
              key={i}
              heading={HeadingXl}
              headingClasses="font-body"
              as="h2"
            />
          ))}
          {agencies.length ? (
            <RelatedContentList
              content={agencies}
              title={t('Partner agencies')}
              data-testid="partner-agencies-list"
            />
          ) : null}
        </div>
      </Container>
    </PageWrapper>
  )
}
