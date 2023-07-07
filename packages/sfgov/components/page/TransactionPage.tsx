import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'

import {
  BigDesc,
  Container,
  DisplayLg,
  IconInfo,
  IconQuestion,
  HeadingXl
} from '@/design-system'
import type { TransactionPageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import {
  Accordion,
  CostBlock,
  ContactFooter,
  RelatedContentList,
  RichText,
  TitleAndText,
  WhatToDo
} from '../'

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
            <HeadingXl as="h2">{t('What to Know')}</HeadingXl>
          </div>
          <When condition={!!cost?.[0]?.value}>
            {() => <CostBlock {...cost[0].value} />}
          </When>
          {thingsToKnow.map((thing) => (
            <div key={thing.id} data-testid="things_to_know-section">
              <TitleAndText {...thing.value} />
            </div>
          ))}
        </div>
        <div className="flex flex-col my-40 gap-y-28">
          <HeadingXl as="h2">{t('What to Do')}</HeadingXl>
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
            <TitleAndText {...block.value} />
          </div>
        ))}
        <When condition={!!specialCases.length}>
          <div className="mb-40" data-testid="special_cases-section">
            <HeadingXl as="h2" className="mb-20">
              {t('Special cases')}
            </HeadingXl>
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
            <TitleAndText {...block.value} />
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
          <HeadingXl as="h2">
            <IconQuestion width={32} /> {t('Get Help')}
          </HeadingXl>
          <ContactFooter items={getHelp} />
        </When>
      </Container>
    </PageWrapper>
  )
}
