import { Container, HeadingXl, PageTitleSection } from '@/design-system'
import type { ReportPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import { ComposedDate } from '../DateTime'
import { DocumentLink } from '../DocumentLink'
import { RelatedContentList } from '../RelatedContentList'
import { RichText } from '../RichText'
import { Spotlight } from '../Spotlight'
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
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <PageTitleSection label={t('report', { defaultValue: 'Report' })} title={title}>
          <ComposedDate startDateInput={date} />
        </PageTitleSection>
      </Container>
      {spotlight ? (
        <div className="mb-20 max-w-xl lg:mx-auto">
          <Spotlight {...spotlight} />
        </div>
      ) : null}
      <Container className="space-y-40">
        {content?.map((contentSection) => {
          switch (contentSection.type) {
            case 'body':
              return (
                <div className="flex flex-col gap-y-28">
                  <RichText html={contentSection.value} />
                </div>
              )
            /* istanbul ignore next */
            default:
              return <></>
          }
        })}
        {printVersion ? (
          <div>
            <HeadingXl as="h3" className="mb-20">
            {t('print-version', { defaultValue: 'Print version' })}
            </HeadingXl>
            <DocumentLink document={printVersion} />
          </div>
        ) : null}
        {agencies.length ? (
          <div className="md:mt-60">
            <RelatedContentList
              title={t('partner-agencies', { defaultValue: 'Partner agencies' })}
              content={agencies}
            />
          </div>
        ) : null}
      </Container>
    </PageWrapper>
  )
}
