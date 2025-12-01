import {
  Container,
  HeadingMd,
  HeadingXl,
  IconCloseQuote,
  IconOpenQuote,
  PageTitleSection
} from '@/design-system'
import type { NewsPageData } from '@/types'
import type { ComponentType, ReactNode } from 'react'
import { useTranslation } from 'next-i18next'

import {
  ComposedDate,
  Image,
  PageLink,
  PageWrapper,
  RelatedContentList,
  RichText
} from '..'

export const NewsPage: ComponentType<{ page: NewsPageData }> = ({ page }) => {
  const {
    title,
    date,
    image,
    abstract,
    body,
    primary_agency: primaryAgency,
    news_type: type,
    partner_agencies: agencies
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title} meta={{ ...page.meta, description: abstract }}>
      <Container className="mb-20 pb-40">
        <PageTitleSection label={type} title={title}>
          {primaryAgency ? <PageLink page={primaryAgency} /> : null}
          <HeadingXl as="p" className="text-grey600 my-20 md:my-40 lg:my-60">
            {abstract}
          </HeadingXl>
        </PageTitleSection>
        <div className="flex flex-col space-y-40 mt-40">
          {image ? <Image imageRef={image} /> : null}
          <div>
            <HeadingMd as="p" className="mb-12 lg:mb-16 text-accent500">
              <ComposedDate startDateInput={date} dateStyle="long" />
            </HeadingMd>
            <div>
              <RichText
                html={body}
                // @ts-expect-error erg
                components={{ blockquote: PullQuote }}
                isNews
              />
            </div>
          </div>
          {agencies.length ? (
            <div className="md:mt-60">
              <RelatedContentList
                title={t('partner-agencies', {
                  defaultValue: 'Partner agencies'
                })}
                content={agencies}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </PageWrapper>
  )
}

type PullQuoteProps = {
  children: ReactNode
}

const PullQuote = ({ children }: PullQuoteProps) => (
  <div className="inline-flex relative self-center mb-28 md:m-28 md:mr-0 md:w-1/2 float-right">
    <IconOpenQuote
      className="text-secondary300 shrink-0 relative bottom-4 mr-8"
      width={32}
      height={28}
    />
    <HeadingXl as="p" className="text-secondary500 mr-28">
      <span>{children}</span>
    </HeadingXl>
    <IconCloseQuote
      className="text-secondary300 absolute right-0 bottom-0"
      width={32}
      height={28}
    />
  </div>
)
