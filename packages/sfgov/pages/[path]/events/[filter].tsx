import { PageWrapper, ComposedDate } from '@/components'
import {
  BodyText,
  Button,
  Container,
  HeadingLgListItem,
  HeadingXl,
  HeadingXXl,
  IconCalendar,
  IconChevronDown,
  IconClock,
  IconLocation,
  LabelSm,
  Link,
  PageTitleSection
} from '@/design-system'
import { getenv, getPublicEnv } from '@/lib/env'
import { withServerSideTranslations } from '@/lib/translations'
import { getPageURL } from '@/lib/utils'
import { PageData } from '@/types'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Event = PageData & {
  date_time: []
  overview: string
  meeting_location?: []
  cancelled?: boolean
  description: string
  location?: []
  start_datetime: string
  end_datetime: string
}

type EventPageData = {
  agency: string
  total: number
  meeting_archive_date: string
  meeting_archive_url: string
  events: Event[]
  baseUrl: string
}

function formatDateTimeRange(
  start: string,
  end: string,
  includeEndDateTime: boolean
) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit'
  }
  const startDateTime = new Date(start)
  const endDateTime = new Date(end)
  const startDateStr = startDateTime.toLocaleString('default', dateOptions)
  const startTimeStr = startDateTime.toLocaleString('default', timeOptions)

  const dateRange =
    startDateTime.toDateString() === endDateTime.toDateString()
      ? startDateStr
      : `${startDateStr} to ${endDateTime.toLocaleString(
          'default',
          dateOptions
        )}`
  let timeRange = `${startTimeStr} to ${endDateTime.toLocaleString(
    'default',
    timeOptions
  )}`
  if (
    startDateTime.toTimeString() === endDateTime.toTimeString() ||
    includeEndDateTime
  ) {
    timeRange = startTimeStr
  }

  return { dateRange, timeRange }
}

function getLocation(location) {
  return location
    .map((item) => {
      if (item.type === 'address') return item?.value?.line1
      else if (item.type === 'online') return 'Online'
      else return ''
    })
    .join(', ')
}

const EventInfo = ({
  Icon,
  content
}: {
  Icon: React.ElementType
  content: React.ReactNode
}) => (
  <div className="flex flex-row gap-x-4 items-center">
    <Icon className="w-20 h-20 text-neutral400" />
    <BodyText className="font-bold">{content}</BodyText>
  </div>
)

const EventItem = (item: Event) => {
  const { t } = useTranslation()
  const descMax = 600
  const eventLocation = item.location || item.meeting_location || ''
  let eventDescription = item.description || item.overview || ''
  if (eventDescription.length > descMax) {
    const truncated = eventDescription.substring(0, descMax)
    eventDescription =
      truncated.substring(0, truncated.lastIndexOf(' ') || descMax) + ' ...'
  }

  const dateTimeRange = formatDateTimeRange(
    item.start_datetime,
    item.end_datetime,
    !!item.date_time?.length &&
      item.date_time?.[0]?.value?.include_end_date_time === 'no'
  )
  return (
    <div className="flex flex-col gap-y-8">
      <HeadingLgListItem className="!mb-0 text-primary500 flex items-start flex-col gap-y-8 md:flex-row md:gap-x-8 md:items-center">
        <a href={getPageURL(item)} className="no-underline">
          {item.title}
        </a>
        {item.cancelled ? (
          <LabelSm className="!mb-0 text-accent600 bg-accent100 rounded-[40px] px-12 py-4">
            {t('cancelled', { defaultValue: 'Cancelled' })}
          </LabelSm>
        ) : null}
      </HeadingLgListItem>
      <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-20">
        <EventInfo Icon={IconCalendar} content={dateTimeRange.dateRange} />
        {!item?.date_time?.[0]?.value?.is_all_day ? (
          <EventInfo Icon={IconClock} content={dateTimeRange.timeRange} />
        ) : null}
        <EventInfo Icon={IconLocation} content={getLocation(eventLocation)} />
      </div>
      {eventDescription ? <p>{eventDescription}</p> : null}
    </div>
  )
}

const EventsPage = (props: EventPageData) => {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    agency,
    events: pageEvents,
    meeting_archive_date: meetingArchiveDate,
    meeting_archive_url: meetingArchiveURL,
    total,
    baseUrl
  } = props
  const { locale, query } = router
  const { path, filter } = query
  const [events, setEvents] = useState(pageEvents)
  const [currentPage, setCurrentPage] = useState(1)
  const aggregated: { [key: string]: Event[] } = {}

  // TODO: consider abstracting fetch duties to a new ContentAPI method
  // to avoid making pagination requests from client side
  const loadEvents = async () => {
    if (events.length >= total) return
    try {
      const url = new URL(baseUrl)
      url.searchParams.set('page', `${currentPage + 1}`)
      const response = await fetch(url.href)
      const data = await response.json()

      setEvents((prevEvents) => [...prevEvents, ...data.events])
      setCurrentPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error('Error loading more events:', error)
    }
  }

  // aggregate the events into month-year groups.
  // these events should already be sorted by the appropriate
  // date - upcoming (asc), past (desc) from the backend.
  // iterate and drop it into the appropriate grouping
  events?.forEach((item) => {
    const date = new Date(item.start_datetime)
    const monthYear = date.toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    })
    if (!aggregated[monthYear]) {
      aggregated[monthYear] = []
    }
    aggregated[monthYear].push(item)
  })

  const archiveDate = ComposedDate({
    startDateInput: meetingArchiveDate,
    dateStyle: { month: 'short', year: 'numeric' },
    asString: true
  })

  const pillCls = 'no-underline px-16 py-[15px]'
  const activePillCls = 'bg-primary500 text-white'
  const inactivePillCls = 'bg-primary100 text-primary700'

  // locale change
  useEffect(() => {
    setEvents(pageEvents)
    setCurrentPage(1)
  }, [pageEvents, locale])

  return (
    <PageWrapper>
      <Container className="grid grid-cols-1 gap-y-60 pb-60 mb-60 border-b-1 border-neutral200">
        <div className="flex flex-col gap-y-28">
          <PageTitleSection
            title={agency}
            label={t('calendar', { defaultValue: 'Calendar' })}
          ></PageTitleSection>
          <div className="my-[15px]">
            <a
              href={`/${path}/events/upcoming`}
              className={`rounded-tl-4 rounded-bl-4 ${pillCls}
              ${filter === 'upcoming' ? activePillCls : inactivePillCls}`}
            >
              {t('upcoming-events', { defaultValue: 'Upcoming events' })}
            </a>
            <a
              className={`rounded-tr-4 rounded-br-4 no-underline px-16 py-[15px]
              ${filter === 'past' ? activePillCls : inactivePillCls}`}
              href={`/${path}/events/past`}
            >
              {t('past-events', { defaultValue: 'Past events' })}
            </a>
          </div>
          {filter === 'past' && meetingArchiveDate && meetingArchiveURL ? (
            <div className="flex gap-8 text-primary500">
              <IconCalendar width={20} />
              <Link href={meetingArchiveURL}>
                {t('archived-meetings-link', {
                  skipInterpolation: true,
                  defaultValue: 'See archived meetings before {{zyx}}',
                  zyx: archiveDate
                })}
              </Link>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-y-40">
          <HeadingXXl className="!mb-0">
            {filter === 'upcoming'
              ? t('upcoming-events', { defaultValue: 'Upcoming events' })
              : t('past-events', { defaultValue: 'Past events' })}
          </HeadingXXl>
          {events?.length ? (
            <div className="flex flex-col gap-y-60">
              <div className="flex flex-col gap-y-40">
                {Object.entries(aggregated).map(([monthYear, monthEvents]) => {
                  const monthYearKey = monthYear.replace(/\s/g, '-')
                  return (
                    <div key={monthYearKey} className="flex flex-col gap-y-20">
                      <HeadingXl className="!mb-0">{monthYear}</HeadingXl>
                      <div className="flex flex-col gap-y-[32px]">
                        {monthEvents.map((event: Event, i) => {
                          return (
                            <EventItem
                              key={`${monthYearKey}-${i}`}
                              {...event}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
              {events.length < total ? (
                <div className="flex justify-center">
                  <Button
                    className="flex flex-row gap-x-8 px-80 !justify-self-center"
                    onClick={loadEvents}
                    data-testid="load-more-button"
                  >
                    <span>
                      {t('show-more-events', {
                        defaultValue: 'Show more events'
                      })}
                    </span>
                    <IconChevronDown className="w-20 h-20" />
                  </Button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              {t('no-events-found', { defaultValue: 'No events found' })}
            </div>
          )}
        </div>
      </Container>
    </PageWrapper>
  )
}

export const getServerSideProps = withServerSideTranslations(
  async ({ params, locale, query }: GetServerSidePropsContext) => {
    const { path, filter } = params!
    const url = new URL(getenv('API_BASE_URL'))
    url.pathname += 'api/related-events/'
    url.searchParams.set('list', filter)
    url.searchParams.set('locale', locale)
    url.searchParams.set('path', path)
    url.searchParams.set('page', query?.page || 1)
    try {
      const res = await fetch(url.href)
      const data = await res.json()

      // append the "base" api url for this list
      // so the client side can make requests for more pages
      return { props: { ...data, baseUrl: url.href, env: getPublicEnv() } }
    } catch (error) {
      return { notFound: true } // 404
    }
  }
)

export default EventsPage
