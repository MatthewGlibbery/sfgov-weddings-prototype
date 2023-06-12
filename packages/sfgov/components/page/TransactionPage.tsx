import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { ComponentProps, ComponentType } from 'react'

import {
  BigDesc,
  Container,
  DisplayLg,
  IconMail,
  IconInfo,
  IconPhone,
  IconQuestion,
  StackedContainer,
  StackedItem,
  TitleLg,
  IconBuilding,
  IconCheck
} from '@/design-system'
import type { GetHelpBlockTypes, TransactionPageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import {
  Accordion,
  CostBlockDisplay,
  EmailBlockLink,
  PhoneNumberBlock,
  RelatedContentList,
  RichText,
  TitleAndText,
  WhatToDo
} from '../'
import { LocationBlock } from '../Location'

export const TransactionPage: ComponentType<{ page: TransactionPageData }> = ({
  page
}) => {
  const {
    title,
    description,
    cost,
    things_to_know: thingsToKnow,
    what_to_do: whatToDo,
    special_cases: specialCases,
    custom_section: customSection,
    get_help: getHelp,
    good_for_community: goodForCommunity,
    related_content_agencies: agencies,
    related_content_pages: relatedContentPages
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <DisplayLg as="h1" className="my-40">
          {title}
        </DisplayLg>
        {/* Related Agencies list */}
        {agencies.map((agency, i) => (
          <span
            key={agency.page_content.id}
            data-testid="related_content_agencies-section"
          >
            {i > 0 && ', '}
            <a href={agency.page_content.meta.html_url}>
              {agency.page_content.title}
            </a>
          </span>
        ))}
        <When condition={description}>
          <BigDesc
            as="p"
            className="mb-20"
            data-testid="transaction-page-description"
          >
            {description}
          </BigDesc>
        </When>
        <div
          className={`
          flex flex-col gap-y-28
          p-28 my-4 bg-grey100 rounded-[8px]
        `}
        >
          <div className="flex mb-28 gap-x-8">
            <IconInfo width={40} />
            <TitleLg as="h2">{t('What to Know')}</TitleLg>
          </div>
          <When condition={!!cost[0]}>
            <CostBlockDisplay {...cost[0]} />
          </When>
          {thingsToKnow.map((thing) => (
            <div key={thing.id} data-testid="things_to_know-section">
              <TitleAndText block={thing} />
            </div>
          ))}
        </div>
        <div className="flex flex-col my-40 gap-y-28">
          <TitleLg as="h2">{t('What to Do')}</TitleLg>
          {whatToDo.map((what) => (
            <WhatToDo key={what.id} {...what} />
          ))}
        </div>
        {customSection.map((block) => (
          <div
            key={block.id}
            className="flex flex-col mb-40 gap-y-28"
            data-testid="custom_section-section"
          >
            <TitleAndText block={block} />
          </div>
        ))}
        <When condition={!!specialCases.length}>
          <div className="mb-40" data-testid="special_cases-section">
            <TitleLg as="h2" className="mb-20">
              {t('Special cases')}
            </TitleLg>
            {specialCases.map((item, i) => (
              <Accordion
                key={item.value.title}
                title={item.value.title}
                data-testid={`special-case-${item.id}`}
                open={i === 0}
              >
                <RichText html={item.value.text} />
              </Accordion>
            ))}
          </div>
        </When>
        {goodForCommunity.map((block) => (
          <div
            key={block.id}
            className="flex flex-col mb-40 gap-y-28"
            data-testid="good_for_community-section"
          >
            <TitleAndText block={block} />
          </div>
        ))}
        <When condition={!!relatedContentPages.length}>
          <RelatedContentList
            className="my-40"
            content={relatedContentPages}
            title={t('Related') as string}
          />
        </When>
        <When condition={!!getHelp.length}>
          <TitleLg as="h2">
            <IconQuestion width={32} /> {t('Get Help')}
          </TitleLg>
          <StackedContainer className="mt-28">
            {getHelp.map((item: GetHelpBlockTypes, i: number) => (
              <GetHelpItem item={item} key={`${item.type}-${i}`} />
            ))}
          </StackedContainer>
        </When>
      </Container>
    </PageWrapper>
  )
}

type GetHelpItemProps = ComponentProps<typeof StackedItem> & {
  item: GetHelpBlockTypes
}

const GetHelpItem = ({ item, ...rest }: GetHelpItemProps) => {
  const { type, value } = item
  switch (type) {
    case 'address':
      return (
        <StackedItem icon={IconBuilding} title="Address" {...rest}>
          <LocationBlock {...value} />
        </StackedItem>
      )
    case 'title_and_text':
      return (
        <StackedItem icon={IconCheck} title="Additional Info" {...rest}>
          <TitleAndText block={item} />
        </StackedItem>
      )
    case 'email':
      return (
        <StackedItem icon={IconMail} title="Email" {...rest}>
          <EmailBlockLink {...value} />
        </StackedItem>
      )
    case 'phone_number':
      return (
        <StackedItem icon={IconPhone} title="Phone" {...rest}>
          <PhoneNumberBlock {...value} />
        </StackedItem>
      )
    /* istanbul ignore next */
    default:
      return null
  }
}
