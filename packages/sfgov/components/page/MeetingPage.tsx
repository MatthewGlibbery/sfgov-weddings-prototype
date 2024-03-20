import { ComponentType, useEffect, useState } from 'react'
import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

import type { MeetingPageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import {
  Container,
  Grid,
  HeadingLg,
  HeadingMd,
  HeadingXl,
  HeadingXXl,
  IconDownload,
  IconInfo,
  Link,
  MainContent,
  PageTitleSection
} from '@/design-system'
import { Callout } from '../Callout'
import { ComposedDate, ComposedTime } from '../DateTime'
import { Location } from '../Location'
import { OnlineEventBlock } from '../OnlineEventBlock'
import { Accordion } from '../Accordion'
import { RichText } from '../RichText'
import { Video } from '../Video'
import { AgendaItemBlock } from '../AgendaItemBlock'
import { RelatedContentList } from '../RelatedContentList'
import { RelatedAgenciesList } from '../RelatedAgenciesList'
import { TableOfContents, tocWrapperClasses } from '../TableOfContents'

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

  const MeetingContent = ({ screen = '' }) => (
    <span className="flex flex-col gap-16 mx-20 md:mx-28 lg:mx-0">
      <When condition={!!overview}>
        <HeadingXXl as="h2" className="my-12 md:my-20" id={`overview${screen}`}>
          {t('Overview')}
        </HeadingXXl>
        <RichText html={overview} />
      </When>
      <When condition={!!agenda.length}>
        <HeadingXXl as="h2" className="my-12 md:my-20" id={`agenda${screen}`}>
          {t('Agenda')}
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
      </When>
      <When condition={!!videos.length || !!relatedDocuments.length}>
        <div className="flex flex-col gap-40">
          <HeadingXXl
            as="h2"
            className="my-12 md:mt-60"
            id={`meetingResources${screen}`}
          >
            {t('Meeting resources')}
          </HeadingXXl>
          <When condition={!!videos.length}>
            <div className="space-y-20">
              <HeadingXl
                as="h3"
                romanType="sans"
                id={`videoRecording${screen}`}
              >
                {t('Video recording')}
              </HeadingXl>

              <Video {...videos[0]?.value} showTitle={false} />
            </div>
          </When>
          <When condition={!!relatedDocuments.length}>
            <div className="space-y-20">
              <HeadingXl
                as="h3"
                romanType="sans"
                id={`relatedDocuments${screen}`}
              >
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
    </span>
  )

  const MeetingDetails = ({ screen = '' }) => (
    <div className="bg-neutral50 flex flex-col space-y-20 p-28 md:rounded-4">
      <HeadingXXl as="h2" className="flex gap-4" id={`meetingDetails${screen}`}>
        <IconInfo
          aria-hidden="true"
          width={24}
          data-testid="info-icon"
          className="inline md:w-40"
        />
        {t('Meeting details')}
      </HeadingXXl>
      <HeadingLg as="h3" id={`dateTime${screen}`}>
        {t('Date and time')}
      </HeadingLg>
      <div className="flex flex-col">
        <ComposedDate
          startDateInput={date[0].value.start_date}
          endDateInput={/* istanbul ignore */ date[0].value.end_date || ''}
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
      <HeadingLg as="h3" id={`howToParticipate${screen}`}>
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

  const fullConfig = resolveConfig(tailwindConfig)
  const [isSm, setIsSm] = useState(true)

  useEffect(() => {
    // istanbul ignore next
    const handleResize = () => {
      // @ts-expect-error erg
      if (window.innerWidth < parseInt(fullConfig.theme?.screens?.md, 10)) {
        setIsSm(true)
      } else {
        setIsSm(false)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize, false)
    }
    // @ts-expect-error erg
  }, [fullConfig.theme?.screens?.md])

  return (
    <PageWrapper title={title}>
      <When condition={!!cancelled}>
        <Callout html="This meeting has been cancelled."></Callout>
      </When>
      <Container className="flex flex-col gap-y-60">
        <div className="mb-20 pb-40 flex flex-col space-y-40">
          <PageTitleSection title={title} label={t('Meeting')}>
            <RelatedAgenciesList agencies={[primaryAgency]} />
          </PageTitleSection>
        </div>
      </Container>
      <MainContent
        className="md:hidden"
        id={/* istanbul ignore */ isSm ? 'main-content' : 'hidden'}
      >
        <Grid>
          <div className={tocWrapperClasses}>
            <TableOfContents />
          </div>
          <div className="flex flex-col gap-y-60 col-span-full">
            <MeetingDetails />
            <MeetingContent />
          </div>
        </Grid>
      </MainContent>
      <MainContent
        className="hidden md:block"
        id={/* istanbul ignore */ isSm ? 'hidden' : 'main-content'}
      >
        <Container>
          <Grid>
            <div className={tocWrapperClasses}>
              <TableOfContents screen="Large" />
            </div>
            <div className="flex flex-col gap-y-60 col-span-full lg:col-span-7 lg:order-1">
              <MeetingDetails screen="Large" />
              <MeetingContent screen="Large" />
            </div>
          </Grid>
        </Container>
      </MainContent>
    </PageWrapper>
  )
}
