// import NextImage from 'next/image'
import { BigDesc, BodyText, Box, Container, DisplayLg, Flex, styled, TitleLg, TitleXs } from '@/design-system'
import type { EmailBlock, EventPageData, PhoneNumberBlockType } from '@/types'
import { RelatedContentList } from '../RelatedContentList'
// import { Image } from '../Image'
import {
  PageWrapper,
  CostBlockDisplay,
  DateTimeBlock,
  LocationBlock,
  CallToAction,
  PhoneNumberBlock,
  EmailBlockLink
} from '../'
import { When } from 'react-if'
import type { ComponentType } from 'react'

export const EventPage: ComponentType<{ page: EventPageData }> = ({ page }) => {
  const {
    title,
    description,
    date_time: dateTime,
    cost,
    location,
    call_to_action: callToAction,
    // image,
    body,
    contact,
    related_content_agencies: agencies,
    related_content_topics: topics
  } = page

  const InfoWrapper = styled('div', {
    flexBasis: '33%'
  })

  const SidebarItemWrapper = styled(Flex, {
    flexDirection: 'column',
    bg: '$grey100',
    p: 40,
    mb: 20,
    gapY: 20,
    br: 8
  })

  const phoneNumbers: PhoneNumberBlockType[] = []
  const emails: EmailBlock[] = []
  contact.forEach((item) => item.type === 'email' ? emails.push(item) : phoneNumbers.push(item))

  return (
    <PageWrapper title={title}>
      <Container css={{ mb: 20, borderBottom: 'solid $grey200 1px', pb: 40 }}>
        <DisplayLg as='h1' css={{ my: 40 }}>{title}</DisplayLg>
        <When condition={description}>
          <BigDesc css={{ mb: 20 }} as='p' data-testid='event-page-description'>{description}</BigDesc>
        </When>
        <Flex css={{ justifyContent: 'space-evenly', gapX: 20 }}>
          <When condition={!!cost?.[0]?.value}>
            <InfoWrapper>
              <CostBlockDisplay {...cost[0]} />
            </InfoWrapper>
          </When>
          {/* TODO: Date Time looks to be required in Drupal. If so, remove conditional below after Wagtail is updated */}
          <When condition={!!dateTime?.[0]?.value}>
            <InfoWrapper>
              <DateTimeBlock {...dateTime[0]?.value} />
            </InfoWrapper>
          </When>
          <When condition={!!location?.[0]?.value?.agency?.title}>
            <InfoWrapper>
              <TitleXs css={{ mb: 20 }}>Location</TitleXs>
              <BodyText>{location[0]?.value?.agency?.title}</BodyText>
            </InfoWrapper>
          </When>
        </Flex>
      </Container>
      <Container>
        <Flex css={{ gapX: 20 }}>
          <Box>
            {/* <When condition={!!image}><Image as={NextImage} alt='' imageRef={image} width={20} height={20} /></When> */}
            <When condition={body}><div>{body}</div></When>
          </Box>
          <Box>
            <When condition={!!callToAction?.[0]?.value}>
              <SidebarItemWrapper>
                <CallToAction {...callToAction[0]?.value} />
              </SidebarItemWrapper>
            </When>
            <When condition={!!location?.[0]?.value}>
              <SidebarItemWrapper>
                <LocationBlock {...location[0]?.value} />
              </SidebarItemWrapper>
            </When>
            <When condition={!!phoneNumbers.length || !!emails.length}>
              <SidebarItemWrapper>
                <TitleLg>Contact</TitleLg>
                <When condition={!!phoneNumbers.length}>
                  <TitleXs>Phone</TitleXs>
                  {phoneNumbers.map(({ id, value }) =>
                    <PhoneNumberBlock key={id} {...value} />
                  )}
                </When>
                <When condition={!!emails.length}>
                <TitleXs>Email</TitleXs>
                  {emails.map((email) => (
                    <span key={email.id}>
                      <BodyText>{email.value.title}</BodyText>
                      <EmailBlockLink key={email.id} {...email.value} />
                    </span>
                  ))}
                </When>
              </SidebarItemWrapper>
            </When>
          </Box>
        </Flex>
      </Container>
      <RelatedContentList
        id='divisions'
        title='Departments' /* FIXME: translate */
        content={agencies} />
      <RelatedContentList
        id='topics'
        title='Topics' /* FIXME: translate */
        content={topics} />
    </PageWrapper>
  )
}
