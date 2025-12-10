import type { ReportPageData } from '@/types'
import type { ComponentType } from 'react'
import {
  classed,
  Container,
  DisplayLg,
  Grid,
  HeadingMd,
  HeadingXl,
  PageTitleSection
} from '@/design-system'
import { useTranslation } from 'next-i18next'

import {
  ComposedDate,
  RICH_TEXT_DEFAULT_COMPONENTS,
  DocumentLink,
  PageLink,
  PageWrapper,
  RelatedContentList,
  RichText,
  Spotlight,
  Table,
  TableOfContents,
  Image,
  getTocId
} from '..'
import type { HTMLComponentMap } from '../wagtail'

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

  const richTextComponents: HTMLComponentMap = {
    h2: ({
      'data-block-key': blockKey,
      ...rest
    }: JSX.IntrinsicElements['h2'] & { 'data-block-key'?: string }) => (
      <HeadingXl
        as="h2"
        id={getTocId(blockKey)}
        {...rest}
        className="mt-40 mb-20"
      />
    ),
    h3: ({
      'data-block-key': blockKey,
      ...rest
    }: JSX.IntrinsicElements['h3'] & { 'data-block-key'?: string }) => (
      <HeadingMd
        as="h3"
        id={getTocId(blockKey)}
        {...rest}
        className="mt-40 mb-20"
      />
    ),
    p: classed('p', 'mb-20 min-h-20'),
    ul: classed('ul', 'pb-20'),
    ol: classed('ol', 'pb-20'),
    li: classed('li', 'mb-12'),
    hr: (props) => (
      <div
        className="border-dotted border-b-2 w-full border-neutral200 my-28 md:my-40 lg:my-60"
        {...props}
      />
    ),
    img: (props) => {
      const {
        class: _,
        ...rest
      }: JSX.IntrinsicElements['img'] & { class?: string } = props
      return <Image {...rest} className="mb-20" />
    }
  }

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
                        components={richTextComponents}
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
