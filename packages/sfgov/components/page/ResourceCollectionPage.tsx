import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import { camelCase } from '@/lib/utils'

import {
  Container,
  DisplayLg,
  Grid,
  IconInfo,
  IconQuestion,
  HeadingXl,
  HeadingXXl,
  HeadingLg,
  PageTitleSection,
  MainContent,
  BodyText
} from '@/design-system'
import type { ResourceCollectionPageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import {
  EmbeddedContentBlock,
  RelatedContentList,
  TitleAndText,
  TableOfContents,
  tocWrapperClasses,
  PageLinksList,
  DataStoryTileList,
  ResourceTileList
} from '../'

import { TileContentSection } from '../TileContentSection'
import { DocumentSectionBlock } from '../DocumentSection'

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
            <When condition={description}>
              <DisplayLg
                as="p"
                className="mb-16"
                data-testid="resource-collection-page-description"
              >
                {description}
              </DisplayLg>
            </When>
            <When condition={!!relatedTopics.length}>
              <PageLinksList
                pageLinks={relatedTopics}
                label={t('Part of: ', { defaultValue: 'Part of: ' })}
              />
            </When>
          </PageTitleSection>
        </div>
        <div className="flex flex-col gap-y-20 md:gap-y-40 lg:gap-y-60">
          <When condition={!!dataDashboard.length}>
            {dataDashboard.map((item) => (
              <EmbeddedContentBlock {...item.value} key={item.id} />
            ))}
          </When>
          <When condition={!!introductoryText.length}>
            {introductoryText.map((item) => (
              <TitleAndText
                {...item.value}
                id={camelCase(item.value.title)}
                key={item.id}
                heading={HeadingXXl}
                as="h2"
              />
            ))}
          </When>
          <When condition={!!body.length}>
            {body.map((item) => {
              switch (item.type) {
                case 'resources':
                  return (
                    <div className="grid gap-y-20">
                      <HeadingXXl as="h2" className="!mb-0" id="resources">
                        {t('Resources')}
                      </HeadingXXl>
                      {item.value.map((resourceSection) => {
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
                    </div>
                  )
                case 'data_stories':
                  return (
                    <div className="grid gap-y-20">
                      <HeadingXXl as="h2" className="!mb-0" id="data">
                        {t('Data')}
                      </HeadingXXl>
                      {item.value.map((dataStorySection) => {
                        const tileList = (
                          <DataStoryTileList
                            links={dataStorySection.value.content}
                          />
                        )
                        return (
                          <TileContentSection
                            key={dataStorySection.id}
                            title={dataStorySection.value.title}
                            tileList={tileList}
                          />
                        )
                      })}
                    </div>
                  )
                case 'documents':
                  return (
                    <div className="grid gap-y-20">
                      <HeadingXXl as="h2" className="!mb-0" id="documents">
                        {t('Documents')}
                      </HeadingXXl>
                      {item.value.map((documentSection) => (
                        <DocumentSectionBlock
                          key={documentSection.id}
                          title={documentSection.value.title}
                          content={documentSection.value.content}
                        />
                      ))}
                    </div>
                  )
                /* istanbul ignore next */
                default: // do nothing
                  return <></>
              }
            })}
          </When>
          <When condition={!!customSection.length}>
            {customSection.map((item) => (
              <TitleAndText
                {...item.value}
                id={camelCase(item.value.title)}
                key={item.id}
                heading={HeadingXl}
                headingClasses="font-body"
              />
            ))}
          </When>
          <When condition={!!agencies.length}>
            {/* Partner Agencies list */}
            <RelatedContentList
              content={agencies}
              title={t('Partner agencies') as string}
            />
          </When>
        </div>
      </Container>
    </PageWrapper>
  )
}
