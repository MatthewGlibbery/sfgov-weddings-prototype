import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import { camelCase } from 'lodash-es'

import {
  Container,
  DisplayLg,
  Grid,
  IconInfo,
  IconQuestion,
  HeadingXl,
  DisplayXXXl,
  HeadingXXl
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
  WhatToDo,
  PageLabel,
  TableOfContents
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
    partner_agencies: agencies,
    related_pages: relatedContentPages
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Grid>
        <Container className="mb-20 pb-40 col-span-8">
          <PageLabel label={t('Service')} />
          <DisplayXXXl as="h1" className="my-12 md:my-20 xl:mr-28">
            {title}
          </DisplayXXXl>
          <When condition={description}>
            <DisplayLg
              as="p"
              className="mb-16"
              data-testid="transaction-page-description"
            >
              {description}
            </DisplayLg>
          </When>
          {/* Related Agencies list */}
          {agencies.map((agency, i) => (
            <span
              key={agency.id}
              data-testid="related_content_agencies-section"
            >
              {i > 0 && ', '}
              <a className="text-grey500" href={agency.meta.html_url}>
                {agency.title}
              </a>
            </span>
          ))}

          <When condition={!!cost.length || !!thingsToKnow.length}>
            <div className="flex flex-col gap-y-28 p-28 my-60 bg-grey100 rounded-[8px]">
              <div className="flex mb-28 gap-x-8">
                <IconInfo width={40} />
                <HeadingXXl as="h2" id="whatToKnow">
                  {t('What to Know')}
                </HeadingXXl>
              </div>
              <When condition={!!cost?.[0]?.value}>
                {() => <CostBlock {...cost[0].value} />}
              </When>
              {thingsToKnow.map((thing) => (
                <div key={thing.id} data-testid="things_to_know-section">
                  <TitleAndText
                    {...thing.value}
                    id={camelCase(thing.value.title)}
                  />
                </div>
              ))}
            </div>
          </When>
          <div className="flex flex-col my-40 gap-y-28">
            <HeadingXXl as="h2" id="whatToDo">
              {t('What to Do')}
            </HeadingXXl>
            {whatToDo.map((what) => (
              <WhatToDo key={what.id} {...what} />
            ))}
          </div>
          {customSection.map((block) => (
            <div
              key={block.id}
              className="mb-40"
              data-testid="custom_section-section"
            >
              <TitleAndText
                {...block.value}
                id={camelCase(block.value.title)}
              />
            </div>
          ))}
          <When condition={!!specialCases.length}>
            <div className="mb-40" data-testid="special_cases-section">
              <HeadingXl as="h2" className="mb-20" id="specialCases">
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
            <div key={block.id} data-testid="good_for_community-section">
              <TitleAndText {...block.value} h2={true} id={block.id} />
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
            <div className="flex items-center gap-8">
              <IconQuestion width={32} />
              <HeadingXl as="h2">{t('Get Help')}</HeadingXl>
            </div>
            <ContactFooter items={getHelp} />
          </When>
        </Container>
        <div className="mt-40 mr-28 mb-20 pb-40 col-span-4 h-fit sticky top-40">
          <TableOfContents />
        </div>
      </Grid>
    </PageWrapper>
  )
}
