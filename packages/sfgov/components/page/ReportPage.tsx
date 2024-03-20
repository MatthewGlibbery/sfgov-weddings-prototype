import type { ComponentType } from 'react'
import { When } from 'react-if'
import { useTranslation } from 'next-i18next'

import type { ReportPageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import {
  Container,
  Grid,
  HeadingXl,
  IconDocument,
  Link,
  PageTitleSection
} from '@/design-system'
import { RichText } from '../RichText'
import { TableOfContents, tocWrapperClasses } from '../TableOfContents'
import { ComposedDate } from '../DateTime'
import { Spotlight } from '../Spotlight'
import { RelatedContentList } from '../RelatedContentList'

export const ReportPage: ComponentType<{ page: ReportPageData }> = ({
  page
}) => {
  const { t } = useTranslation()
  const {
    title,
    date,
    print_version: printVersion,
    spotlight,
    body,
    partner_agencies: agencies
  } = page

  return (
    <PageWrapper title={title}>
      <Container className="flex flex-col gap-y-60">
        <PageTitleSection label={t('Report')} title={title}>
          <ComposedDate startDateInput={date} />
          <When condition={!!spotlight.length}>
            <div className="md:mx-16 mb-80">
              <Spotlight {...spotlight[0]} />
            </div>
          </When>
        </PageTitleSection>
        <Grid>
          <div className={tocWrapperClasses}>
            <TableOfContents />
          </div>
          <div className="flex flex-col gap-y-60 col-span-full lg:col-span-7 lg:order-1">
            <RichText html={body} />
            <When
              condition={printVersion !== undefined && printVersion !== null}
            >
              <HeadingXl as="h3" className="mb-20">
                {t('Print version')}
              </HeadingXl>
              <Link
                href={printVersion.meta.download_url}
                className="flex gap-4"
                key={printVersion.id}
              >
                <IconDocument width={20} />
                {printVersion.title}
              </Link>
            </When>
          </div>
        </Grid>
        <When condition={!!agencies.length}>
          <div className="md:mt-60">
            <RelatedContentList
              title={t('Partner agencies')}
              content={agencies}
            />
          </div>
        </When>
      </Container>
    </PageWrapper>
  )
}
