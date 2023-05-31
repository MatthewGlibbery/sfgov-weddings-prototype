import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'

import {
  BigDesc,
  Box,
  Container,
  DisplayLg,
  Flex,
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
import type {
  GetHelpBlockTypes,
  TransactionPageData
} from '@/types'

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

export const TransactionPage: ComponentType<{ page: TransactionPageData }> = ({ page }) => {
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

  const renderGetHelpSection = (items: GetHelpBlockTypes[]) => {
    return items.map((item: GetHelpBlockTypes, i: number) => {
      const { type, value } = item

      let Component = null
      const computedKey = `${type}-${i}`

      switch (type) {
        case ('address'):
          Component = (
            <StackedItem key={computedKey} icon={IconBuilding} title='Address'>
              <LocationBlock {...value} />
            </StackedItem>
          )
          break
        case ('title_and_text'):
          Component = (
            <StackedItem key={computedKey} icon={IconCheck} title='Additional Info'>
              <TitleAndText block={item} />
            </StackedItem>
          )
          break
        case ('email'):
          Component = (
            <StackedItem key={computedKey} icon={IconMail} title='Email'>
              <EmailBlockLink {...value} />
            </StackedItem>
          )
          break
        case ('phone_number'):
          Component = (
            <StackedItem key={computedKey} icon={IconPhone} title='Phone'>
              <PhoneNumberBlock {...value} />
            </StackedItem>
          )
          break
        /* istanbul ignore next */
        default:
          break
      }

      return Component
    })
  }

  return (
    <PageWrapper title={title}>
      <Container css={{ mb: 20, pb: 40 }}>
        <DisplayLg as='h1' css={{ my: 40 }}>{title}</DisplayLg>
        {/* Related Agencies list */}
        {agencies.map((agency, i) => (
          <span key={agency.page_content.id} data-testid='related_content_agencies-section'>
            {i > 0 && ', '}
            <a href={agency.page_content.meta.html_url}>
              {agency.page_content.title}
            </a>
          </span>
        ))}
        <When condition={description}><BigDesc css={{ mb: 20 }} as='p' data-testid='transaction-page-description'>{description}</BigDesc></When>
        <Flex css={{ flexDirection: 'column', gapY: 28, p: 28, my: 40, bg: '$grey100', br: 8 }}>
          <Flex css={{ mb: 28, gapX: 8 }}>
            <IconInfo width={40} />
            <TitleLg as='h2'>{t('What to Know')}</TitleLg>
          </Flex>
          <When condition={!!cost[0]}>
            <CostBlockDisplay {...cost[0]} />
          </When>
          {thingsToKnow.map(thing => (
            <Box key={thing.id} data-testid='things_to_know-section'>
              <TitleAndText block={thing} />
            </Box>
          ))}
        </Flex>
        <Flex css={{ flexDirection: 'column', my: 40, gapY: 28 }}>
          <TitleLg as='h2'>{t('What to Do')}</TitleLg>
          {whatToDo.map(what => (
            <WhatToDo key={what.id} {...what} />
          ))}
        </Flex>
        {customSection.map(block => (
          <Flex key={block.id} css={{ flexDirection: 'column', mb: 40, gapY: 28 }} data-testid='custom_section-section'>
            <TitleAndText block={block} />
          </Flex>
        ))}
        <When condition={!!specialCases.length}>
          <Box css={{ mb: 40 }} data-testid='special_cases-section'>
            <TitleLg as='h2' css={{ mb: 20 }}>{t('Special cases')}</TitleLg>
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
          </Box>
        </When>
        {goodForCommunity.map(block => (
          <Flex key={block.id} css={{ flexDirection: 'column', mb: 40, gapY: 28 }} data-testid='good_for_community-section'>
            <TitleAndText block={block} />
          </Flex>
        ))}
        <When condition={!!relatedContentPages.length}>
          <RelatedContentList css={{ my: 40 }} content={relatedContentPages} title={t('Related') as string} />
        </When>
        <When condition={!!getHelp.length}>
          <TitleLg as='h2'><IconQuestion width={32} /> {t('Get Help')}</TitleLg>
          <StackedContainer css={{ mt: 28 }}>
            {renderGetHelpSection(getHelp)}
          </StackedContainer>
        </When>
      </Container>
    </PageWrapper>
  )
}
