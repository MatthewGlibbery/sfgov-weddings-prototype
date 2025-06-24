import { Container, Grid, HeadingXl, PageTitleSection } from '@/design-system'
import type { ReportPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import { ComposedDate } from '../DateTime'
import { DocumentLink } from '../DocumentLink'
import { RelatedContentList } from '../RelatedContentList'
import { RichText } from '../RichText'
import { Spotlight } from '../Spotlight'
import { Table } from '../Table'
import { TableOfContents, tocWrapperClasses } from '../TableOfContents'
import { PageWrapper } from './PageWrapper'

export const ReportPage: ComponentType<{ page: ReportPageData }> = ({
  page
}) => {
  const { t } = useTranslation()
  const {
    title,
    date,
    print_version: printVersion,
    spotlight: [spotlight],
    content,
    partner_agencies: agencies
  } = page

  return (
    <PageWrapper title={title} meta={page.meta}>
      <Container className="mb-20 pb-40">
        <PageTitleSection
          label={t('report', { defaultValue: 'Report' })}
          title={title}
          isHidden={true}
        >
          <ComposedDate startDateInput={date} />
        </PageTitleSection>
      </Container>
      {spotlight ? (
        <div className="mb-20 lg:mb-60 max-w-xl lg:mx-auto">
          <Spotlight {...spotlight} />
        </div>
      ) : null}
      <Container className="mb-60">
        <Grid>
          <div className="col-span-full">
            <TableOfContents />
          </div>
          <div className="col-span-full lg:col-start-1 lg:col-end-8 space-y-40 lg:space-y-60">
            {content?.map((contentSection, i) => {
              switch (contentSection.type) {
                case 'body':
                  return (
                    <div
                      className="flex flex-col gap-y-28"
                      key={`content-section-${i}`}
                    >
                      <RichText html={contentSection.value} />
                    </div>
                  )
                case 'table':
                  return <Table {...contentSection.value} />
                /* istanbul ignore next */
                default:
                  return <></>
              }
            })}
            {printVersion ? (
              <div>
                <HeadingXl as="h3" className="mb-20" id="printVersion">
                  {t('print-version', { defaultValue: 'Print version' })}
                </HeadingXl>
                <DocumentLink document={printVersion} />
              </div>
            ) : null}
          </div>
        </Grid>
        {agencies.length ? (
          <div className="mt-40 lg:mt-60">
            <RelatedContentList
              title={t('partner-agencies', {
                defaultValue: 'Partner agencies'
              })}
              content={agencies}
            />
          </div>
        ) : null}
      </Container>
    </PageWrapper>
  )
}
