import {
  Container,
  Grid,
  HeadingLg,
  HeadingMd,
  HeadingXl,
  HeadingXXl,
  IconInfo,
  PageTitleSection
} from '@/design-system'
import type { MeetingPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import { ComponentType } from 'react'
import { Accordion } from '../Accordion'
import { AgendaItemBlock } from '../AgendaItemBlock'
import { Callout } from '../Callout'
import { ComposedDate, ComposedTime } from '../DateTime'
import { DownloadableFilesSection } from '../DownloadableFilesSection'
import { Location } from '../Location'
import { OnlineEventBlock } from '../OnlineEventBlock'
import { PageLinksList } from '../PageLinksList'
import { RelatedContentList } from '../RelatedContentList'
import { RichText } from '../RichText'
import { Video } from '../Video'
import { PageWrapper } from './PageWrapper'

export const MeetingPage: ComponentType<{ page: MeetingPageData }> = ({
  page
}) => {
  const { t } = useTranslation()
  const {
    title,
    primary_agency: primaryAgency,
    primary_agencies: primaryAgencies,
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

  const MeetingContent = ({ screen = '' }) => (
    <span className="flex flex-col gap-16 md:mx-0 lg:mx-0">
      {overview ? (
        <>
          <HeadingXXl
            as="h2"
            className="my-12 md:my-20"
            id={`overview${screen}`}
          >
            {t('overview', { defaultValue: 'Overview' })}
          </HeadingXXl>
          <RichText html={overview} />
        </>
      ) : null}
      {agenda.length ? (
        <>
          <HeadingXXl as="h2" className="my-12 md:my-20" id={`agenda${screen}`}>
            {t('agenda', { defaultValue: 'Agenda' })}
          </HeadingXXl>
          <div className="flex flex-col gap-28">
            {agenda.map((item, i) => (
              <AgendaItemBlock
                key={item.id}
                id={`agenda-${i}${screen}`}
                index={i}
                title_and_text={item.value?.title_and_text}
                documents={item.value?.documents}
              />
            ))}
          </div>
        </>
      ) : null}
      {videos.length || relatedDocuments.length ? (
        <div className="flex flex-col gap-40">
          <HeadingXXl
            as="h2"
            className="my-12 md:mt-60"
            id={`meetingResources${screen}`}
          >
            {t('meeting-resources', { defaultValue: 'Meeting resources' })}
          </HeadingXXl>
          {videos.length ? (
            <div className="space-y-20">
              <HeadingXl
                as="h3"
                romanType="sans"
                id={`videoRecording${screen}`}
              >
                {t('video-recording', { defaultValue: 'Video recording' })}
              </HeadingXl>

              <Video {...videos[0]?.value} showTitle={false} />
            </div>
          ) : null}
          {relatedDocuments.length ? (
            <div className="space-y-20">
              <HeadingXl
                as="h3"
                romanType="sans"
                id={`relatedDocuments${screen}`}
              >
                {t('related-documents', { defaultValue: 'Related documents' })}
              </HeadingXl>
              {relatedDocuments.map((downloadableFiles) => {
                const heading = downloadableFiles?.value?.title ? (
                  <HeadingMd as="p">
                    {downloadableFiles?.value?.title}
                  </HeadingMd>
                ) : null
                return (
                  <DownloadableFilesSection
                    heading={heading}
                    documents={downloadableFiles?.value?.documents}
                    key={downloadableFiles.id}
                  />
                )
              })}
            </div>
          ) : null}
        </div>
      ) : null}
      {notices.length ? (
        <div className="flex flex-col gap-40">
          <HeadingXXl as="h2" className="my-12 md:mt-60">
            {t('notices', { defaultValue: 'Notices' })}
          </HeadingXXl>
          {notices.map((notice) => (
            <Accordion key={notice.id} title={notice.value.title}>
              <RichText html={notice.value.text} />
            </Accordion>
          ))}
        </div>
      ) : null}
      {agencies.length ? (
        <div className="md:mt-60">
          <RelatedContentList
            title={t('partner-agencies', { defaultValue: 'Partner agencies' })}
            content={agencies}
            id={`partnerAgencies${screen}`}
          />
        </div>
      ) : null}
    </span>
  )

  const MeetingDetails = ({ screen = '' }) => (
    <div className="bg-neutral50 flex flex-col space-y-20 p-28 md:rounded-4">
      <div className="flex gap-8 items-center">
        <IconInfo
          aria-hidden="true"
          width={24}
          data-testid="info-icon"
          className="md:w-40"
        />
        <HeadingXXl as="h2" className="!m-0" id={`meetingDetails${screen}`}>
          {t('meeting-details', { defaultValue: 'Meeting details' })}
        </HeadingXXl>
      </div>
      <HeadingLg as="h3" id={`dateTime${screen}`}>
        {t('date-and-time', { defaultValue: 'Date and time' })}
      </HeadingLg>
      {date.length ? (
        <div className="flex flex-col">
          <ComposedDate
            startDateInput={date[0]?.value.start_date}
            endDateInput={/* istanbul ignore */ date[0]?.value.end_date || ''}
            includeEndDateTime={date[0]?.value.include_end_date_time}
          />
          {date[0]?.value.start_time ? (
            <ComposedTime
              startDateTimeInput={`1969-01-01T${date[0]?.value.start_time}`}
              endDateTimeInput={
                /* istanbul ignore next */
                date[0]?.value.end_time
                  ? `1969-01-01T${date[0].value.end_time}`
                  : ''
              }
              includeEndDateTime={date[0]?.value.include_end_date_time}
            />
          ) : null}
        </div>
      ) : null}
      <HeadingLg as="h3" id={`howToParticipate${screen}`}>
        {t('how-to-participate', { defaultValue: 'How to participate' })}
      </HeadingLg>

      {
        // eslint-disable-next-line array-callback-return
        meetingLocation.map((location, i) => {
          if (location.type === 'online') {
            return (
              <div key={i} className="mb-20">
                <HeadingMd as="h4" className="mb-12">
                  {t('online', { defaultValue: 'Online' })}
                </HeadingMd>
                <OnlineEventBlock {...location.value} key={location.id} />
              </div>
            )
          }
          if (location.type === 'address') {
            return (
              <div key={i} className="mb-20">
                <HeadingMd as="h4" className="mb-12">
                  {t('in-person', { defaultValue: 'In-person' })}
                </HeadingMd>
                <Location {...location.value} />
              </div>
            )
          }
        })
      }
    </div>
  )

  return (
    <PageWrapper title={title} meta={page.meta}>
      {cancelled ? (
        <Callout html="This meeting has been cancelled."></Callout>
      ) : null}
      <Container className="flex flex-col gap-y-60">
        <div className="mb-20 pb-40 flex flex-col space-y-40">
          <PageTitleSection
            title={title}
            label={t('meeting', { defaultValue: 'Meeting' })}
          >
            {primaryAgency ? (
              <PageLinksList pageLinks={[primaryAgency]} />
            ) : null}
          </PageTitleSection>
        </div>
      </Container>
      <div className="md:hidden">
        <MeetingDetails />
      </div>
      <Container>
        <Grid>
          <div className="hidden md:block col-span-full lg:col-span-6">
            <MeetingDetails />
          </div>
          <div className="col-span-full lg:col-span-7">
            <MeetingContent />
          </div>
        </Grid>
      </Container>
    </PageWrapper>
  )
}
