import type { ComponentType } from 'react'
import { When } from 'react-if'
import { useTranslation } from 'next-i18next'

import type { MeetingPageData } from '@/types'

import { TitleAndText } from '../TitleAndText'
import { PageWrapper } from './PageWrapper'
import {
  BodyText,
  Container,
  DisplayXXXl,
  HeadingMd,
  HeadingXl,
  HeadingXXl,
  IconInfo
} from '@/design-system'
import { RelatedAgenciesList } from '../RelatedAgenciesList'
import { Callout } from '../Callout'
import { DateTimeBlock } from '../DateTime'
import { LocationBlock } from '../Location'
import { OnlineEventBlock } from '../OnlineEventBlock'
import { Accordion } from '../Accordion'
import { RichText } from '../RichText'
import { Video } from '../Video'
import { AgendaItemBlock } from '../AgendaItemBlock'

export const MeetingPage: ComponentType<{ page: MeetingPageData }> = ({
  page
}) => {
  const { t } = useTranslation()
  const {
    title,
    related_content_agencies: agencies,
    cancelled,
    date,
    meeting_location: meetingLocation,
    overview,
    agenda,
    videos,
    notices,
    meeting_documents: meetingDocuments
  } = page

  return (
    <PageWrapper title={title}>
      <When condition={!!cancelled}>
        <Callout html="This meeting has been cancelled. <a href='#'>See upcoming meetings for Visual Arts Committee (Arts Commission).</a>"></Callout>
      </When>
      <Container className="mb-20 pb-40">
        <DisplayXXXl as="h1" className="my-12 md:my-20">
          {title}
        </DisplayXXXl>
        <DateTimeBlock {...date[0]?.value} />
        <RelatedAgenciesList agencies={agencies} />
      </Container>
      <Container className="p-28 bg-blue200">
        <HeadingXXl as="h2" className="my-12 md:my-20">
          <IconInfo
            aria-hidden="true"
            width={16}
            data-testid="info-icon"
            className="inline"
          />
          {t('Meeting details')}
        </HeadingXXl>
        <HeadingXl as="h3" className="mb-12">
          {t('Date and time')}
        </HeadingXl>
        <HeadingXl as="h3" className="mb-20">
          {t('How to participate')}
        </HeadingXl>

        {meetingLocation.map((location) => {
          let block = <></>
          if (location.type === 'online') {
            block = (
              <div key={location.id} className="mb-20">
                <HeadingMd as="h4" className="mb-12">
                  {t('Online')}
                </HeadingMd>
                <OnlineEventBlock {...location.value} key={location.id} />
              </div>
            )
          }
          if (location.type === 'address') {
            block = (
              <div className="mb-20">
                <HeadingMd as="h4" className="mb-12">
                  {t('In-person')}
                </HeadingMd>
                <LocationBlock {...location.value} key={location.id} />
              </div>
            )
          }
          return block
        })}
      </Container>
      <When condition={!!overview}>
        <Container className="my-40 space-y-20">
          <HeadingXXl as="h2" className="my-12 md:my-20">
            {t('Overview')}
          </HeadingXXl>
          <BodyText>{overview}</BodyText>
        </Container>
      </When>
      <When condition={!!agenda.length}>
        <Container className="my-40 space-y-20">
          <HeadingXXl as="h2" className="my-12 md:my-20">
            {t('Agenda')}
          </HeadingXXl>
          {agenda.map((item, i) => {
            return (
              <AgendaItemBlock
                key={item.id}
                index={i}
                title_and_text={item.value?.title_and_text}
                documents={item.value?.documents}
              />
            )
          })}
        </Container>
      </When>
      <When condition={!!videos.length || !!meetingDocuments.length}>
        <Container className="my-40 space-y-20">
          <HeadingXXl as="h2" className="my-12 md:my-20">
            {t('Meeting resources')}
          </HeadingXXl>
          <When condition={!!videos.length}>
            <Video {...videos[0]?.value} />
          </When>
          <When condition={!!meetingDocuments.length}>
            <HeadingXl as="h3">{t('Related documents')}</HeadingXl>
            <p>Document placholder</p>
          </When>
        </Container>
      </When>
      <When condition={!!notices.length}>
        <Container className="my-40 space-y-20">
          <HeadingXXl as="h2" className="my-12 md:my-20">
            {t('Notices')}
          </HeadingXXl>
          {notices.map((notice) => (
            <Accordion key={notice.id} title={notice.value.title}>
              <RichText html={notice.value.text} />
            </Accordion>
          ))}
        </Container>
      </When>
    </PageWrapper>
  )
}
