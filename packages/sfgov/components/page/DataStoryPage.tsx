import { Container, DisplayLg, Grid, PageTitleSection } from '@/design-system'
import { DataStoryPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import { ComponentType } from 'react'
import {
  ContentSection,
  PageWrapper,
  RelatedContentList,
  TableOfContents,
  tocWrapperClasses
} from '..'

export const DataStoryPage: ComponentType<{ page: DataStoryPageData }> = ({
  page
}) => {
  const { title, description, content, partner_agencies: agencies } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title} meta={{ ...page.meta, description }}>
      <Container className="mb-20 pb-40">
        <Grid>
          <div className="col-span-full">
            <PageTitleSection
              label={t('data-story', { defaultValue: 'Data Story' })}
              title={title}
            >
              {description ? (
                <DisplayLg className="mb-20" as="p">
                  {description}
                </DisplayLg>
              ) : null}
            </PageTitleSection>
          </div>
          <div className={tocWrapperClasses}>
            <TableOfContents />
          </div>
          <div className="col-span-full lg:col-span-7 lg:order-1">
            {content.length ? (
              <div className="mt-28 mb-20 flex flex-col gap-28">
                {content.map((section) => (
                  <ContentSection
                    key={section.id}
                    title={section.value.title}
                    section_content={section.value.section_content}
                    noWrapper={true}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Grid>
        <RelatedContentList
          title={t('partner-agencies', {
            defaultValue: 'Partner agencies'
          })}
          content={agencies}
        />
      </Container>
    </PageWrapper>
  )
}
