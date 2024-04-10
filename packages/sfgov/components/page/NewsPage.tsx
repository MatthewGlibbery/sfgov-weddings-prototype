import {
  Container,
  HeadingMd,
  HeadingXl,
  IconCloseQuote,
  IconOpenQuote,
  PageTitleSection
} from '@/design-system'
import { NewsPageData } from '@/types'
import { ComponentType, ReactNode } from 'react'
import { When } from 'react-if'
import { ComposedDate, Image, PageWrapper, PageLinksList, RichText } from '..'

type PullQuoteProps = {
  children: ReactNode
}

const PullQuote = ({ children }: PullQuoteProps) => (
  <div className="inline-flex self-center mb-20 lg:mb-0 lg:w-1/2">
    <IconOpenQuote
      className="text-grey400 shrink-0 relative bottom-4"
      width={16}
      height={15}
    />
    <HeadingXl as="p" className="text-grey700">
      <span>{children}</span>
      <IconCloseQuote
        className="text-grey400 inline relative top-8"
        width={16}
        height={15}
      />
    </HeadingXl>
  </div>
)

export const NewsPage: ComponentType<{ page: NewsPageData }> = ({ page }) => {
  const {
    headline,
    date,
    image,
    abstract,
    body,
    news_type: type,
    partner_agencies: agencies
  } = page

  return (
    <PageWrapper title={headline}>
      <Container className="mb-20 pb-40">
        <PageTitleSection label={type} title={headline}>
          <PageLinksList pageLinks={agencies} />
        </PageTitleSection>
        <div className="flex flex-col space-y-40 mt-40">
          <HeadingXl as="p" className="text-grey600">
            {abstract}
          </HeadingXl>
          <When condition={!!image}>
            <Image imageRef={image} alt={`Photo related to ${abstract}`} />
          </When>
          <div>
            <HeadingMd as="p" className="mb-12 lg:mb-16">
              <ComposedDate startDateInput={date} />
            </HeadingMd>
            <div className="flex flex-col space-y-12 lg:w-[90%]">
              <RichText
                html={body}
                // @ts-expect-error erg
                components={{ blockquote: PullQuote }}
                isNews
              />
            </div>
          </div>
        </div>
      </Container>
    </PageWrapper>
  )
}
