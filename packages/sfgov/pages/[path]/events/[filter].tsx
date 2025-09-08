import { PageWrapper, ComposedDate, Accordion } from '@/components'
import {
  BodyText,
  Button,
  Container,
  HeadingLgListItem,
  HeadingXl,
  HeadingXXl,
  IconCalendar,
  IconCheckmark,
  IconChevronDown,
  IconClock,
  IconFilter,
  IconLocation,
  IconX,
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
import { forwardRef, useEffect, useRef, useState } from 'react'
import { breakpoints } from '@/design-system/theme/breakpoints'

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
  child_agencies: []
  total: number
  meeting_archive_date: string
  meeting_archive_url: string
  events: Event[]
  baseUrl: string
}

type ChildAgencyFilter = {
  id: number
  title: string
}

type InPageFilter = {
  childAgencies?: ChildAgencyFilter[] | undefined
  month?: number
  year?: number
  startDate?: string | undefined
  endDate?: string | undefined
}

type TypeActiveFilterButton = {
  label: string
  ariaLabel: string
  removeHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type TypePageTabData = {
  locale: string | undefined
  filter: string
  meetingArchiveDate: string
  meetingArchiveURL: string
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

const EventItem = forwardRef(function EventItem(item: Event, ref: any) {
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
        <a href={getPageURL(item)} className="no-underline" ref={ref}>
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
})

const ActiveFilterButton = (props: TypeActiveFilterButton) => {
  const { label, ariaLabel, removeHandler } = props
  return (
    <button
      aria-label={ariaLabel}
      className="p-12 border-1 border-solid border-primary600 rounded-[8px] bg-neutral100 flex items-center gap-x-8 focus:outline outline-[3px] outline-offset-4 outline-primary500 text-left"
      onClick={removeHandler}
    >
      <div>{label}</div>
      <IconX className="h-12 w-12 stroke-primary600 stroke-2" />
    </button>
  )
}

const PageTabs = (props: TypePageTabData) => {
  const { t } = useTranslation()
  const router = useRouter()
  const asPath = router.asPath
  const { locale, filter, meetingArchiveDate, meetingArchiveURL } = props
  const archiveDate = ComposedDate({
    startDateInput: meetingArchiveDate,
    dateStyle: { month: 'short', year: 'numeric' },
    asString: true
  })
  const pillCls = 'no-underline px-16 py-[15px]'
  const activePillCls = 'bg-primary500 text-white'
  const inactivePillCls = 'bg-primary100 text-primary700'
  const eventsPath = asPath.substring(0, asPath.lastIndexOf('/'))
  const localePath = locale !== 'en' ? `/${locale}` : ''
  const upcomingEventsUrl = `${localePath}${eventsPath}/upcoming`
  const pastEventsUrl = `${localePath}${eventsPath}/past`
  return (
    <>
      <div className="my-[15px]">
        <a
          href={upcomingEventsUrl}
          className={`rounded-tl-4 rounded-bl-4 ${pillCls}
              ${filter === 'upcoming' ? activePillCls : inactivePillCls}`}
        >
          {t('upcoming-events', { defaultValue: 'Upcoming events' })}
        </a>
        <a
          className={`rounded-tr-4 rounded-br-4 no-underline px-16 py-[15px]
              ${filter === 'past' ? activePillCls : inactivePillCls}`}
          href={pastEventsUrl}
        >
          {t('past-events', { defaultValue: 'Past events' })}
        </a>
      </div>
      {filter === 'past' && meetingArchiveDate && meetingArchiveURL ? (
        <div className="flex gap-8 text-primary500">
          <IconCalendar width={20} />
          <Link href={meetingArchiveURL}>
            {t('archived-meetings-link', {
              defaultValue: 'See archived meetings before {{zyx}}',
              zyx: archiveDate
            })}
          </Link>
        </div>
      ) : null}
    </>
  )
}

const ITEMS_PER_PAGE = 10 // the number of items per "page"

const EventsPage = (props: EventPageData) => {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    agency,
    child_agencies: childAgencies,
    events: pageEvents,
    meeting_archive_date: meetingArchiveDate,
    meeting_archive_url: meetingArchiveURL,
    baseUrl
  } = props
  const { locale, query } = router
  const rawFilter = query.filter
  const filter = Array.isArray(rawFilter) ? rawFilter[0] : rawFilter || ''
  const [events, setEvents] = useState(pageEvents)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(props.total)
  const [inPageFilters, setInPageFilters] = useState<InPageFilter>({})
  const [focusIndex, setFocusIndex] = useState(null)
  const filtersRef = useRef<HTMLDetailsElement | null>(null)
  const focusRef = useRef<HTMLAnchorElement | null>(null)
  const lastWindowWidthRef = useRef(0)
  const lg = parseInt(breakpoints.lg, 10)
  let eventsCount = -1

  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ]

  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear; i >= 2019; i--) {
    years.push(i)
  }

  const aggregated: { [key: string]: Event[] } = {}

  // TODO: consider abstracting fetch duties to a new ContentAPI method
  // to avoid making pagination requests from client side
  const loadEvents = async (
    page: number = currentPage + 1,
    filters: InPageFilter = inPageFilters
  ) => {
    setFocusIndex(currentPage * ITEMS_PER_PAGE)
    if (events.length >= total && page !== 1) return
    try {
      const url = new URL(baseUrl)
      url.searchParams.set('page', page.toString())
      url.searchParams.set('page_size', ITEMS_PER_PAGE)
      if (filters.childAgencies?.length) {
        url.searchParams.set(
          'child_agencies',
          filters.childAgencies.map((item) => item.id).join(',')
        )
      }
      if (filters.startDate && filters.endDate) {
        url.searchParams.set('start_date', filters.startDate)
        url.searchParams.set('end_date', filters.endDate)
      } else if (filters.month && !isNaN(filters.month)) {
        url.searchParams.set('month', filters.month.toString())
      } else if (filters.year && !isNaN(filters.year)) {
        url.searchParams.set('year', filters.year.toString())
      }
      const response = await fetch(url.href)
      const data = await response.json()

      setEvents((prevEvents) =>
        page === 1 ? data.events : [...prevEvents, ...data.events]
      )
      setTotal(data.total)
      setCurrentPage(page)
      toggleFiltersContainer(null, true)
    } catch (error) {
      console.error('Error loading more events:', error)
    }
  }

  const applyFilters = (form: HTMLFormElement) => {
    const formData = new FormData(form)
    const checkedBoxes = form.querySelectorAll(
      'input[name="child-agency"]:checked'
    ) as NodeListOf<HTMLInputElement>
    const childAgencies = Array.from(checkedBoxes).map(
      (checkedBox: HTMLInputElement) => ({
        id: parseInt(checkedBox.value, 10),
        title: checkedBox.dataset.title
      })
    )
    const month = parseInt(formData.get('filter-month') as string, 10)
    const year = parseInt(formData.get('filter-year') as string, 10)
    let startDate: string | undefined
    let endDate: string | undefined

    if (!isNaN(month) && !isNaN(year)) {
      const start = new Date(year, month - 1, 1)
      const end = new Date(year, month, 0) // last day of previous month
      startDate = start.toISOString().split('T')[0]
      endDate = end.toISOString().split('T')[0]
    }

    const filters: InPageFilter = {
      childAgencies,
      startDate,
      endDate,
      month,
      year
    }

    // Store filters for reuse
    setInPageFilters(filters)
    loadEvents(1, filters) // Reset pagination
  }

  const handleRemoveFilter = async (
    filterKey: keyof InPageFilter,
    filterValue?: string
  ) => {
    const newFilters = { ...inPageFilters }
    if (filterKey === 'childAgencies' && filterValue) {
      newFilters.childAgencies =
        inPageFilters?.childAgencies?.filter(
          (agency) => agency.id !== parseInt(filterValue, 10)
        ) || []
      // uncheck html input
      const checkbox = document.querySelector(
        `input[value="${filterValue}"]`
      ) as HTMLInputElement
      if (checkbox) checkbox.checked = false
    } else {
      newFilters[filterKey] = undefined
      if (filterKey === 'month' || filterKey === 'year') {
        const select = document.querySelector(
          `select[name="filter-${filterKey}"]`
        ) as HTMLSelectElement
        if (select) select.value = ''

        newFilters.startDate = undefined
        newFilters.endDate = undefined
      }
    }
    setInPageFilters(newFilters)
    loadEvents(1, newFilters)
  }

  const handleFilterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    applyFilters(e.currentTarget)
  }

  const handleFilterReset = async (form: HTMLFormElement) => {
    setInPageFilters({})
    loadEvents(1, {})
    form.reset()
  }

  // design requirement:
  // - collapse the filters on any screen size less than large screens
  // (as defined in packages/design-system/theme/breakpoints.js)
  // - collapse the filter explicitly if justCloseIt = true (after form submit)
  // also used as a callback for window resize, hence the first event argument
  const toggleFiltersContainer = (
    event: UIEvent | null = null,
    justCloseIt = false
  ) => {
    const filtersDetails = filtersRef.current
    const currentWindowWidth = window.innerWidth
    const lastWindowWidth = lastWindowWidthRef.current
    lastWindowWidthRef.current = currentWindowWidth
    // on some mobile browsers, window height will change
    // to maximize screen real estate when scrolling, which
    // triggers a resize and hides the filters if we don't
    // explicitly ignore height changes
    if (
      !justCloseIt &&
      lastWindowWidth &&
      lastWindowWidth === currentWindowWidth
    )
      return
    if (filtersDetails) {
      // use the breakpoint defined in design system
      if (currentWindowWidth >= lg) {
        filtersDetails.setAttribute('open', '')
      } else {
        filtersDetails.removeAttribute('open')
      }
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

  const monthLabel =
    inPageFilters.month && `Month: ${months[inPageFilters.month - 1].label}`
  const yearLabel = inPageFilters.year && `Year: ${inPageFilters.year}`

  // locale change
  useEffect(() => {
    setEvents(pageEvents)
    setCurrentPage(1)
  }, [pageEvents, locale])

  // design requirement:
  // - filters open by default on large screen
  // - filters closed by default on small screen
  useEffect(() => {
    if (typeof window === 'undefined') return
    toggleFiltersContainer()
    window.addEventListener('resize', toggleFiltersContainer)
    return () => window.removeEventListener('resize', toggleFiltersContainer)
  })

  // set keyboard focus on loading additional pages
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [events])

  return (
    <PageWrapper>
      <Container className="grid grid-cols-1 gap-y-40 lg:gap-y-60 pb-60 mb-60 border-b-1 border-neutral200">
        <div className="flex flex-col gap-y-28">
          <PageTitleSection
            title={agency}
            label={t('calendar', { defaultValue: 'Calendar' })}
          />
          <PageTabs
            locale={locale}
            filter={filter}
            meetingArchiveDate={meetingArchiveDate}
            meetingArchiveURL={meetingArchiveURL}
          />
        </div>
        <div className="grid gap-y-20 lg:grid-cols-12 lg:gap-x-40">
          {/* filter container */}
          <details
            data-testid="filter-details"
            ref={filtersRef}
            className="group/filters col-span-12 order-1 lg:order-2 lg:col-span-4 gap-y-20"
          >
            <summary className="lg:hidden mb-20 list-none [&::-webkit-details-marker]:hidden px-16 py-[15px] border-1 border-solid border-primary600 rounded-4 inline-flex gap-x-8 items-center">
              <IconFilter className="w-20 h-20 text-primary600" />
              <span className="group-open/filters:block hidden text-primary600">
                {t('hide-filter', { defaultValue: 'Hide filter' })}
              </span>
              <span className="group-open/filters:hidden block text-primary600">
                {t('show-filter', { defaultValue: 'Show filter' })}
              </span>
            </summary>
            <form
              className="flex flex-col gap-y-20"
              onSubmit={handleFilterSubmit}
              onReset={(e) => {
                handleFilterReset(e.currentTarget)
              }}
              id="filter-form"
            >
              <h2 className="text-heading-xl">
                {t('filter', {
                  defaultValue: 'Filter'
                })}
              </h2>
              <div className="grid grid-col gap-y-8">
                {childAgencies?.length ? (
                  <Accordion
                    title={t('divisions-and-subcommittees', {
                      defaultValue: 'Divisions and subcommittees'
                    })}
                    filter={true}
                    open
                  >
                    <ul className="list-none p-0 m-0 max-h-[200px] overflow-x-hidden overflow-y-scroll flex flex-col">
                      {childAgencies.map(
                        (childAgency: ChildAgencyFilter, i) => {
                          return (
                            <li key={i}>
                              <label className="flex items-center gap-x-8">
                                <div className="relative flex items-center p-8">
                                  <input
                                    type="checkbox"
                                    value={childAgency.id}
                                    name="child-agency"
                                    data-title={childAgency.title}
                                    className="peer appearance-none shrink-0 rounded-4 border-1 border-black w-40 h-40 checked:bg-primary600 focus:outline outline-[3px] outline-offset-4 outline-primary500"
                                  />
                                  <IconCheckmark className="hidden peer-checked:block pointer-events-none shrink-0 absolute left-16 top-16 h-[24px] w-[24px] text-white" />
                                </div>
                                <div>{childAgency.title}</div>
                              </label>
                            </li>
                          )
                        }
                      )}
                    </ul>
                  </Accordion>
                ) : null}
                <Accordion
                  title={t('date', { defaultValue: 'Date' })}
                  filter={true}
                  open
                >
                  <div className="flex flex-col gap-y-20">
                    <div className="flex flex-col gap-y-12">
                      <label className="flex flex-col gap-y-12">
                        <div>{t('month', { defaultValue: 'Month' })}</div>
                        <div className="flex flex-row items-center w-full relative">
                          <select
                            name="filter-month"
                            className="appearance-none p-16 rounded-4 bg-white border-1 border-solid border-black w-full focus:outline outline-[3px] outline-offset-4 outline-primary500"
                          >
                            <option value="">
                              {t('all-months', {
                                defaultValue: 'All months'
                              })}
                            </option>
                            {months.map((month) => (
                              <option
                                key={`month-${month.label}`}
                                value={month.value}
                              >
                                {month.label}
                              </option>
                            ))}
                          </select>
                          <IconChevronDown className="absolute w-20 h-20 right-16 pointer-events-none" />
                        </div>
                      </label>
                      <label className="flex flex-col gap-y-12">
                        <div>{t('year', { defaultValue: 'Year' })}</div>
                        <div className="flex flex-row items-center w-full relative">
                          <select
                            name="filter-year"
                            className="appearance-none p-16 rounded-4 bg-white border-1 border-black w-full focus:outline outline-[3px] outline-offset-4 outline-primary500"
                          >
                            <option value="">
                              {t('all-years', {
                                defaultValue: 'All years'
                              })}
                            </option>
                            {years.map((year) => (
                              <option key={`year-${year}`} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <IconChevronDown className="absolute w-20 h-20 right-16 pointer-events-none" />
                        </div>
                      </label>
                    </div>
                  </div>
                </Accordion>
              </div>
              <div className="flex flex-row gap-x-12">
                <Button
                  aria-label={t('apply-filter', {
                    defaultValue: 'Apply filter'
                  })}
                  className="px-16 py-[15px] h-40 ring-0 focus:outline outline-[3px] outline-offset-4 outline-primary500"
                >
                  {t('apply', {
                    defaultValue: 'Apply'
                  })}
                </Button>
                <Button
                  aria-label={t('reset-filter', {
                    defaultValue: 'Reset filter'
                  })}
                  className="px-16 py-[15px] h-40 ring-0 focus:outline outline-[3px] outline-offset-4 outline-primary500"
                  variant="secondary"
                  type="reset"
                >
                  {t('reset', {
                    defaultValue: 'Reset'
                  })}
                </Button>
              </div>
            </form>
          </details>
          {/* event list container */}
          <div className="col-span-12 order-2 lg:order-1 lg:col-span-8 flex flex-col gap-y-40">
            <HeadingXXl className="!mb-0">
              {filter === 'upcoming'
                ? t('upcoming-events', { defaultValue: 'Upcoming events' })
                : t('past-events', { defaultValue: 'Past events' })}
            </HeadingXXl>
            {inPageFilters?.childAgencies?.length ||
            inPageFilters?.month ||
            inPageFilters?.year ? (
              <div className="flex items-center gap-x-12">
                <ul className="p-0 m-0 list-none flex items-center gap-12 flex-wrap">
                  <li>{t('searching', { defaultValue: 'Searching' })}</li>
                  {inPageFilters?.childAgencies?.map((item) => {
                    const title = item.title
                    return (
                      <li key={item.id} data-testid="active-filter-item">
                        <ActiveFilterButton
                          label={title}
                          ariaLabel={`Remove filter ${title}.  To activate press Enter`}
                          removeHandler={() =>
                            handleRemoveFilter('childAgencies', item.id)
                          }
                        />
                      </li>
                    )
                  })}
                  {inPageFilters.month ? (
                    <li data-testid="active-filter-item">
                      <ActiveFilterButton
                        label={monthLabel}
                        ariaLabel={`${monthLabel}.  To activate press Enter`}
                        removeHandler={() => handleRemoveFilter('month')}
                      />
                    </li>
                  ) : null}
                  {inPageFilters.year ? (
                    <li data-testid="active-filter-item">
                      <ActiveFilterButton
                        label={yearLabel}
                        ariaLabel={`${yearLabel}.  To activate press Enter`}
                        removeHandler={() => handleRemoveFilter('year')}
                      />
                    </li>
                  ) : null}
                  <li>
                    <button
                      aria-label={t('reset-filter', {
                        defaultValue: 'Reset filter'
                      })}
                      className="underline text-primary600 focus:outline outline-[3px] outline-offset-4 outline-primary500"
                      onClick={() => {
                        handleFilterReset(
                          document.getElementById(
                            'filter-form'
                          ) as HTMLFormElement
                        )
                      }}
                    >
                      {t('reset', { defaultValue: 'Reset' })}
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
            {events?.length ? (
              <div className="flex flex-col gap-y-60">
                <div className="flex flex-col gap-y-40">
                  {Object.entries(aggregated).map(
                    ([monthYear, monthEvents]) => {
                      const monthYearKey = monthYear.replace(/\s/g, '-')
                      return (
                        <div
                          key={monthYearKey}
                          className="flex flex-col gap-y-20"
                        >
                          <HeadingXl className="!mb-0">{monthYear}</HeadingXl>
                          <div className="flex flex-col gap-y-[32px]">
                            {monthEvents.map((event: Event, i) => {
                              eventsCount++
                              return (
                                <EventItem
                                  key={`${monthYearKey}-${i}`}
                                  ref={
                                    eventsCount === focusIndex ? focusRef : null
                                  }
                                  {...event}
                                />
                              )
                            })}
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
                {events.length < total ? (
                  <div className="flex justify-center">
                    <Button
                      className="flex flex-row gap-x-8 px-80 !justify-self-center"
                      onClick={() => {
                        loadEvents(currentPage + 1)
                      }}
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
      return {
        props: {
          ...data,
          baseUrl: url.href,
          env: getPublicEnv()
        }
      }
    } catch (error) {
      return { notFound: true } // 404
    }
  }
)

export default EventsPage
