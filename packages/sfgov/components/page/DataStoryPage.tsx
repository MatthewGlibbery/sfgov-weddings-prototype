import type { DataStoryPageData } from '@/types'
import type { ComponentType } from 'react'
import { Container, DisplayLg, Grid, PageTitleSection } from '@/design-system'
import { useTranslation } from 'next-i18next'

import {
  ContentSection,
  PageWrapper,
  RelatedContentList,
  TableOfContents,
  PageLink
} from '..'

export const DataStoryPage: ComponentType<{ page: DataStoryPageData }> = ({
  page
}) => {
  const {
    content,
    description,
    partner_agencies: agencies,
    primary_agency: primaryAgency,
    title
  } = page

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
              {primaryAgency ? <PageLink page={primaryAgency} /> : null}
            </PageTitleSection>
          </div>
          <div className="col-span-full lg:col-start-1 lg:col-end-8">
            <TableOfContents />
          </div>
          <div className="col-span-full lg:col-start-1 lg:col-end-8">
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
