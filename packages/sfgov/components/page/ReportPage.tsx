import type { ComponentType } from 'react'
import { useTranslation } from 'next-i18next'

import type { ReportPageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import { Container, Grid, HeadingXl, PageTitleSection } from '@/design-system'
import { RichText } from '../RichText'
import { TableOfContents, tocWrapperClasses } from '../TableOfContents'
import { ComposedDate } from '../DateTime'
import { Spotlight } from '../Spotlight'
import { RelatedContentList } from '../RelatedContentList'
import { DocumentLink } from '../DocumentLink'

export const ReportPage: ComponentType<{ page: ReportPageData }> = ({
  page
}) => {
  const { t } = useTranslation()
  const {
    title,
    date,
    print_version: printVersion,
    spotlight,
    content,
    partner_agencies: agencies
  } = page

  return (
    <PageWrapper title={title}>
      <Container className="flex flex-col gap-y-60">
        <PageTitleSection label={t('Report')} title={title}>
          <ComposedDate startDateInput={date} />
          {spotlight.length ? (
            <div className="md:mx-16 mb-80">
              <Spotlight {...spotlight[0]} />
            </div>
          ) : null}
        </PageTitleSection>
        <Grid>
          <div className={tocWrapperClasses}>
            <TableOfContents />
          </div>
          {content?.map((contentSection) => {
            switch (contentSection.type) {
              case 'body':
                return (
                  <div className="flex flex-col gap-y-60 col-span-full lg:col-span-7 lg:order-1">
                    <RichText html={contentSection.value} />
                    {printVersion ? (
                      <>
                        <HeadingXl as="h3" className="mb-20">
                          {t('Print version')}
                        </HeadingXl>
                        <DocumentLink document={printVersion} />
                      </>
                    ) : null}
                  </div>
                )
              /* istanbul ignore next */
              default:
                return <></>
            }
          })}
        </Grid>
        {agencies.length ? (
          <div className="md:mt-60">
            <RelatedContentList
              title={t('Partner agencies')}
              content={agencies}
            />
          </div>
        ) : null}
      </Container>
    </PageWrapper>
  )
}
