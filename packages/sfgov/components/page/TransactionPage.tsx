import {
  Container,
  DisplayLg,
  Grid,
  HeadingLg,
  HeadingXl,
  HeadingXXl,
  IconInfo,
  IconQuestion,
  PageTitleSection
} from '@/design-system'
import { camelCase } from '@/lib/utils'
import type { TransactionPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import {
  Accordion,
  ContactFooter,
  CostBlock,
  RelatedContentList,
  RichText,
  TitleAndText,
  WhatToDo
} from '../'
import { PageWrapper } from './PageWrapper'

export const TransactionPage: ComponentType<{ page: TransactionPageData }> = ({
  page
}) => {
  const {
    title,
    description,
    cost: [cost],
    things_to_know: thingsToKnow,
    what_to_do: whatToDo,
    special_cases: specialCasesHeader,
    supporting_information: supportingInformation,
    custom_section: customSection,
    get_help: getHelp,
    good_for_community: goodForCommunity,
    partner_agencies: agencies,
    related: relatedContentPages
  } = page

  const { t } = useTranslation()

  const TransactionContent = ({ screen = '' }) => (
    <div className="flex flex-col space-y-28 md:space-y-40 lg:space-y-60">
      {whatToDo.length ? (
        <div className="flex flex-col space-y-28 mt-20">
          <HeadingXXl as="h2" id={`whatToDo${screen}`}>
            {t('what-to-do', { defaultValue: 'What to do' })}
          </HeadingXXl>
          {whatToDo.map((what, i) => (
            <WhatToDo block={what} key={i} screen={screen} />
          ))}
        </div>
      ) : null}
      {!!supportingInformation.length || !!customSection.length ? (
        <div className="flex flex-col space-y-28 lg:space-y-40 mt-28">
          <HeadingXXl
            as="h2"
            className="!mb-0"
            id={`supportingInformation${screen}`}
          >
            {t('special-cases-header', {
              defaultValue: '{{ zyx }}',
              zyx: specialCasesHeader || 'Special cases'
            })}
          </HeadingXXl>
          {supportingInformation.length ? (
            <div data-testid="special_cases-section">
              {supportingInformation.map((item, i) => (
                <Accordion
                  key={i}
                  title={item.value.title}
                  data-testid={`special-case-${item.id}`}
                  open={i === 0}
                >
                  <RichText html={item.value.text} />
                </Accordion>
              ))}
            </div>
          ) : null}
          {customSection.map((block, i) => (
            <div key={i} data-testid="custom_section-section">
              <TitleAndText
                {...block.value}
                id={camelCase(block.value.title) + screen}
                heading={HeadingXl}
              />
            </div>
          ))}
        </div>
      ) : null}
      {goodForCommunity.map((block, i) => (
        <div key={i} data-testid="good_for_community-section">
          <TitleAndText
            {...block.value}
            as="h2"
            heading={HeadingXXl}
            id={camelCase(block.value.title) + screen}
          />
        </div>
      ))}
      {relatedContentPages.length ? (
        <RelatedContentList
          content={relatedContentPages}
          title={t('related', { defaultValue: 'Related' }) as string}
          id={`related${screen}`}
        />
      ) : null}
      {agencies.length ? (
        <RelatedContentList
          content={agencies}
          title={
            t('partner-agencies', {
              defaultValue: 'Partner agencies'
            }) as string
          }
          id={`partnerAgencies${screen}`}
        />
      ) : null}
    </div>
  )

  const TransactionFooter = ({ screen = '' }) => (
    <span className="mx-20 md:mx-0">
      {getHelp.length ? (
        <div className="flex flex-col items-start gap-20">
          <HeadingXXl
            as="h2"
            className="flex flex-row gap-8"
            id={`getHelp${screen}`}
          >
            {t('contact-us', {
              defaultValue: 'Contact us'
            })}
          </HeadingXXl>

          <ContactFooter items={getHelp} />
        </div>
      ) : null}
    </span>
  )

  const TransactionDetails = ({ screen = '' }) =>
    cost || thingsToKnow.length ? (
      <div className="flex flex-col gap-y-28 p-28 bg-neutral50 rounded-[8px]">
        <div className="flex gap-x-8">
          <IconInfo aria-hidden="true" width={24} className="md:w-40" />
          <HeadingXXl as="h2" className="!m-0" id={`whatToKnow${screen}`}>
            {t('what-to-know', { defaultValue: 'What to know' })}
          </HeadingXXl>
        </div>
        {cost ? (
          <CostBlock
            {...cost.value}
            variant="transaction"
            id={`costBlock${screen}`}
          />
        ) : null}
        {thingsToKnow.map((thing, i) => (
          <div key={i} data-testid="things_to_know-section">
            <TitleAndText
              {...thing.value}
              id={camelCase(thing.value.title) + screen}
              heading={HeadingLg}
            />
          </div>
        ))}
      </div>
    ) : null

  return (
    <PageWrapper title={title} meta={{ ...page.meta, description }}>
      <Container className="flex flex-col">
        <div className="mb-20 md:mb-40 lg:mb-60 flex flex-col space-y-20">
          <PageTitleSection
            title={title}
            label={t('service', { defaultValue: 'Service' })}
            isHidden={true}
          >
            {description ? (
              <DisplayLg
                as="p"
                className="mb-16"
                data-testid="transaction-page-description"
              >
                {description}
              </DisplayLg>
            ) : null}
          </PageTitleSection>
        </div>
      </Container>
      <div className="md:hidden">
        <TransactionDetails />
      </div>
      <Container>
        <Grid>
          <div className="hidden md:block gap-y-60 col-span-full lg:col-span-7">
            <TransactionDetails />
          </div>
          <div className="col-span-full lg:col-span-7">
            <TransactionContent />
          </div>
        </Grid>
        <div className="lg:mt-60">
          <TransactionFooter />
        </div>
      </Container>
    </PageWrapper>
  )
}
