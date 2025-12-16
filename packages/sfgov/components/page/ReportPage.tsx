import type { ReportPageData } from '@/types'
import type { ComponentType } from 'react'
import {
  Container,
  DisplayLg,
  Grid,
  HeadingXl,
  PageTitleSection
} from '@/design-system'
import { useTranslation } from 'next-i18next'

import {
  ComposedDate,
  DocumentLink,
  ITERATIVE_RICH_TEXT_COMPONENTS,
  PageLink,
  PageWrapper,
  RelatedContentList,
  RichText,
  Spotlight,
  Table,
  TableOfContents
} from '..'

export const ReportPage: ComponentType<{ page: ReportPageData }> = ({
  page
}) => {
  const { t } = useTranslation()
  const {
    content,
    date,
    partner_agencies: agencies,
    primary_agency: primaryAgency,
    print_version: printVersion,
    spotlight: [spotlight],
    title
  } = page

  return (
    <PageWrapper title={title} meta={page.meta}>
      <Container className="mb-20 pb-40">
        <PageTitleSection
          label={t('report', { defaultValue: 'Report' })}
          title={title}
          isHidden={true}
        >
          <DisplayLg as="p" className="mb-16 text-neutral700">
            <ComposedDate startDateInput={date} />
          </DisplayLg>
          {primaryAgency ? <PageLink page={primaryAgency} /> : null}
        </PageTitleSection>
      </Container>
      {spotlight ? (
        <div className="mb-20 lg:mb-60 max-w-xl lg:mx-auto">
          <Spotlight {...spotlight} />
        </div>
      ) : null}
      <Container className="mb-60">
        <Grid>
          <div className="col-span-full lg:col-start-1 lg:col-end-8">
            <TableOfContents />
          </div>
          <div className="col-span-full lg:col-start-1 lg:col-end-8 space-y-40 lg:space-y-60">
            {content?.map((contentSection, i) => {
              switch (contentSection.type) {
                case 'body':
                  return (
                    <div key={`content-section-${i}`}>
                      <RichText
                        html={contentSection.value}
                        components={ITERATIVE_RICH_TEXT_COMPONENTS}
                      />
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
