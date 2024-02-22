import type { ComponentType } from 'react'
import { When } from 'react-if'
import { useTranslation } from 'next-i18next'

import type { MeetingPageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import {
  Container,
  DisplayXXXl,
  Grid,
  HeadingLg,
  HeadingMd,
  HeadingXl,
  HeadingXXl,
  IconDownload,
  IconInfo,
  Link
} from '@/design-system'
import { Callout } from '../Callout'
import { ComposedDate, ComposedTime } from '../DateTime'
import { Location } from '../Location'
import { OnlineEventBlock } from '../OnlineEventBlock'
import { Accordion } from '../Accordion'
import { RichText } from '../RichText'
import { Video } from '../Video'
import { AgendaItemBlock } from '../AgendaItemBlock'
import { PageLabel } from '../PageLabel'
import { RelatedContentList } from '../RelatedContentList'
import { RelatedAgenciesList } from '../RelatedAgenciesList'
import { TableOfContents } from '../TableOfContents'

export const MeetingPage: ComponentType<{ page: MeetingPageData }> = ({
  page
}) => {
  const { t } = useTranslation()
  const {
    title,
    primary_agency: primaryAgency,
    partner_agencies: agencies,
    cancelled,
    date_time: date,
    meeting_location: meetingLocation,
    overview,
    agenda,
    videos,
    notices,
    related_documents: relatedDocuments
  } = page

  const MeetingDetails = () => (
    <div className="bg-neutral50 flex flex-col space-y-20 p-28 md:rounded-4">
      <HeadingXXl as="h2" className="flex gap-4" id="meetingDetails">
        <IconInfo
          aria-hidden="true"
          width={24}
          data-testid="info-icon"
          className="inline md:w-40"
        />
        {t('Meeting details')}
      </HeadingXXl>
      <HeadingLg as="h3" id="dateTime">
        {t('Date and time')}
      </HeadingLg>
      <div className="flex flex-col">
        <ComposedDate
          startDateInput={date[0].value.start_date}
          /* istanbul ignore next */
          endDateInput={date[0].value.end_date || ''}
        />
        <When condition={date[0].value.start_time}>
          <ComposedTime
            startDateTimeInput={`1969-01-01T${date[0].value.start_time}`}
            endDateTimeInput={
              /* istanbul ignore next */
              date[0].value.end_time
                ? `1969-01-01T${date[0].value.end_time}`
                : ''
            }
          />
        </When>
      </div>
      <HeadingLg as="h3" id="howToParticipate">
        {t('How to participate')}
      </HeadingLg>

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
            <div key={location.id} className="mb-20">
              <HeadingMd as="h4" className="mb-12">
                {t('In-person')}
              </HeadingMd>
              <Location {...location.value} />
            </div>
          )
        }
        return block
      })}
    </div>
  )

  return (
    <PageWrapper title={title}>
      <When condition={!!cancelled}>
        <Callout html="This meeting has been cancelled."></Callout>
      </When>
      <Container className="mb-20 pb-40 flex flex-col space-y-40">
        <PageLabel label={t('Meeting')} />
        <DisplayXXXl as="h1" className="my-12 md:my-20">
          {title}
        </DisplayXXXl>
        <RelatedAgenciesList agencies={[primaryAgency]} />
      </Container>
      <Grid>
        <div className="col-span-8 space-y-40">
          <Container className="hidden md:block">
            <MeetingDetails />
          </Container>
          <span className="md:hidden">
            <MeetingDetails />
          </span>
          <Container className="flex flex-col gap-16">
            <When condition={!!overview}>
              <HeadingXXl as="h2" className="my-12 md:my-20" id="overview">
                {t('Overview')}
              </HeadingXXl>
              <RichText html={overview} />
            </When>
            <When condition={!!agenda.length}>
              <HeadingXXl as="h2" className="my-12 md:my-20" id="agenda">
                {t('Agenda')}
              </HeadingXXl>
              <div className="flex flex-col gap-28">
                {agenda.map((item, i) => (
                  <AgendaItemBlock
                    key={item.id}
                    index={i}
                    title_and_text={item.value?.title_and_text}
                    documents={item.value?.documents}
                  />
                ))}
              </div>
            </When>
            <When condition={!!videos.length || !!relatedDocuments.length}>
              <div className="flex flex-col gap-40">
                <HeadingXXl
                  as="h2"
                  className="my-12 md:mt-60"
                  id="meetingResources"
                >
                  {t('Meeting resources')}
                </HeadingXXl>
                <When condition={!!videos.length}>
                  <div className="space-y-20">
                    <HeadingXl as="h2" romanType="sans" id="meetingResources">
                      {t('Video recording')}
                    </HeadingXl>

                    <Video {...videos[0]?.value} showTitle={false} />
                  </div>
                </When>
                <When condition={!!relatedDocuments.length}>
                  <div className="space-y-20">
                    <HeadingXl as="h2" romanType="sans" id="relatedDocuments">
                      {t('Related documents')}
                    </HeadingXl>
                    {relatedDocuments.map((document) => (
                      <Link href="#" className="flex gap-4" key={document.id}>
                        <IconDownload width={20} />
                        document placeholder
                      </Link>
                    ))}
                  </div>
                </When>
              </div>
            </When>
            <When condition={!!notices.length}>
              <div className="flex flex-col gap-40">
                <HeadingXXl as="h2" className="my-12 md:mt-60">
                  {t('Notices')}
                </HeadingXXl>
                {notices.map((notice) => (
                  <Accordion key={notice.id} title={notice.value.title}>
                    <RichText html={notice.value.text} />
                  </Accordion>
                ))}
              </div>
            </When>
            <When condition={!!agencies.length}>
              <div className="md:mt-60">
                <RelatedContentList
                  title={t('Partner agencies')}
                  content={agencies}
                />
              </div>
            </When>
          </Container>
        </div>
        <div className="mr-28 mb-20 pb-40 col-span-4 h-fit sticky top-40">
          <TableOfContents />
        </div>
      </Grid>
    </PageWrapper>
  )
}
