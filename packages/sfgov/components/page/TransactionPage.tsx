import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import { camelCase } from '@/lib/utils'

import {
  Container,
  DisplayLg,
  Grid,
  IconInfo,
  IconQuestion,
  HeadingXl,
  HeadingXXl,
  HeadingLg,
  PageTitleSection
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
  TableOfContents,
  tocWrapperClasses
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
    supporting_information: supporingInformation,
    custom_section: customSection,
    get_help: getHelp,
    good_for_community: goodForCommunity,
    partner_agencies: agencies,
    related: relatedContentPages
  } = page

  const { t } = useTranslation()

  const TransactionContent = ({ screen = '' }) => (
    <div className="flex flex-col gap-y-60 mx-20 md:mx-0 col-span-full lg:col-span-7">
      <div className="flex flex-col gap-y-28">
        <HeadingXXl as="h2" id={`whatToDo${screen}`}>
          {t('what-to-do', { defaultValue: 'What to do' })}
        </HeadingXXl>
        {whatToDo.map((what) => (
          <WhatToDo key={what.id} {...what} />
        ))}
      </div>
      <When condition={!!supporingInformation.length || !!customSection.length}>
        <HeadingXXl as="h2" id={`supportingInformation${screen}`}>
          {t('supporting-information', {
            defaultValue: 'Supporting information'
          })}
        </HeadingXXl>
        <When condition={!!supporingInformation.length}>
          <div data-testid="special_cases-section">
            <HeadingXl as="h3" id={`specialCases${screen}`} className="mb-20">
              {t('special-cases', { defaultValue: 'Special cases' })}
            </HeadingXl>
            {supporingInformation.map((item, i) => (
              <Accordion
                key={`${item.value.title}${screen}`}
                title={item.value.title}
                data-testid={`special-case-${item.id}`}
                open={i === 0}
                as="h4"
              >
                <RichText html={item.value.text} />
              </Accordion>
            ))}
          </div>
        </When>
        <When condition={!!customSection.length}>
          {customSection.map((block) => (
            <div key={block.id} data-testid="custom_section-section">
              <TitleAndText
                {...block.value}
                id={camelCase(block.value.title) + screen}
                heading={HeadingXl}
              />
            </div>
          ))}
        </When>
      </When>
      {goodForCommunity.map((block) => (
        <div key={block.id} data-testid="good_for_community-section">
          <TitleAndText
            {...block.value}
            as="h2"
            heading={HeadingXXl}
            id={camelCase(block.value.title) + screen}
          />
        </div>
      ))}
      <When condition={!!relatedContentPages.length}>
        <RelatedContentList
          content={relatedContentPages}
          title={t('related', { defaultValue: 'Related' }) as string}
        />
      </When>
    </div>
  )

  const TransactionFooter = ({ screen = '' }) => (
    <span className="mx-20 md:mx-0">
      <When condition={!!getHelp.length}>
        <div className="flex flex-col items-start gap-20">
          <HeadingXXl as="h2" className="flex flex-row gap-8">
            <IconQuestion width={32} />
            {t('get-help', { defaultValue: 'Get help' })}
          </HeadingXXl>
          <ContactFooter items={getHelp} />
        </div>
      </When>
      <When condition={!!agencies.length}>
        {/* Partner Agencies list */}
        <RelatedContentList
          content={agencies}
          title={
            t('partner-agencies', {
              defaultValue: 'Partner agencies'
            }) as string
          }
        />
      </When>
    </span>
  )

  const TransactionDetails = ({ screen = '' }) => (
    <div className="flex flex-col gap-y-28 p-28 bg-neutral50 rounded-[8px]">
      <div className="flex gap-x-8">
        <IconInfo width={40} />
        <HeadingXXl as="h2" id={`whatToKnow${screen}`}>
          {t('what-to-know', { defaultValue: 'What to know' })}
        </HeadingXXl>
      </div>
      <When condition={!!cost?.[0]?.value}>
        {() => (
          <CostBlock
            {...cost[0].value}
            variant="transaction"
            id={`costBlock${screen}`}
          />
        )}
      </When>
      {thingsToKnow.map((thing) => (
        <div key={thing.id} data-testid="things_to_know-section">
          <TitleAndText
            {...thing.value}
            id={camelCase(thing.value.title) + screen}
            heading={HeadingLg}
          />
        </div>
      ))}
    </div>
  )

  return (
    <PageWrapper title={title}>
      <Container className="flex flex-col gap-y-60">
        <div className="flex flex-col">
          <PageTitleSection
            title={title}
            label={t('service', { defaultValue: 'Service' })}
          >
            <When condition={description}>
              <DisplayLg
                as="p"
                className="mb-16"
                data-testid="transaction-page-description"
              >
                {description}
              </DisplayLg>
            </When>
          </PageTitleSection>
        </div>
      </Container>
      <span className="md:hidden">
        <Grid>
          <div className={tocWrapperClasses}>
            <TableOfContents screen="Small" />
          </div>
          <div className="flex flex-col gap-y-60 col-span-full">
            <TransactionDetails screen="Small" />
            <TransactionContent screen="Small" />
            <TransactionFooter />
          </div>
        </Grid>
      </span>
      <span className="hidden md:block">
        <Container className="flex flex-col gap-y-60 lg:mt-60">
          <Grid>
            <div className={tocWrapperClasses}>
              <TableOfContents screen="Large" />
            </div>
            <div className="flex flex-col gap-y-60 col-span-full lg:col-span-7 lg:order-1">
              <TransactionDetails screen="Large" />
              <TransactionContent screen="Large" />
            </div>
          </Grid>
          <TransactionFooter />
        </Container>
      </span>
    </PageWrapper>
  )
}
