import { userEvent } from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { EventPageFactory, MeetingPageFactory } from '@/lib/factories'
import fetchMock from 'jest-fetch-mock'
import { useRouter } from 'next/router'
import CityEventsListingPage from './CityEventsListingPage'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// NOTE:
// PageWrapper does its own data fetch for alerts (/api/alerts)
// That fetch interferes with testing CityEventsListingPage in isolation
// Mocking PageWrapper will prevent that additional fetch and keep fetch
// assertions scoped to CityEventsListingPage
jest.mock('@/components', () => {
  const actual = jest.requireActual('@/components')
  return {
    __esModule: true,
    ...actual,
    PageWrapper: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    )
  }
})

const mockUseRouter = useRouter as jest.Mock
describe('CityEventsListingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fetchMock.resetMocks()
  })

  it('renders an upcoming events listing page with events and meetings', () => {
    const eventPage = EventPageFactory.make()
    const meetingPage = MeetingPageFactory.make({ cancelled: true })
    const eventPageNoLocationNoPrimaryAgency = EventPageFactory.make({
      title: 'event no location',
      location: undefined,
      primary_agency: undefined
    })
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: [eventPage, meetingPage, eventPageNoLocationNoPrimaryAgency]
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<CityEventsListingPage {...data} />)
    expect(screen.queryAllByText('Upcoming events').length).toBe(2)
    expect(screen.getByText(eventPage.title)).toBeInTheDocument()
    expect(
      screen.getByText(eventPage.primary_agency!.title)
    ).toBeInTheDocument()
    expect(screen.getByText(meetingPage.title)).toBeInTheDocument()
    expect(
      screen.getByText(eventPage.location[0].value.line1)
    ).toBeInTheDocument()
    expect(screen.getByText(/Online/)).toBeInTheDocument()
    expect(
      screen.getByText(meetingPage.meeting_location[0].value.line1, {
        exact: false
      })
    ).toBeInTheDocument()
  })

  it('renders a past events listing page with events and meetings', () => {
    const eventPage = EventPageFactory.make()
    const meetingPage = MeetingPageFactory.make({ cancelled: true })
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: [eventPage, meetingPage]
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'past' },
      asPath: '/agency-name/events/past',
      locale: 'en'
    })
    render(<CityEventsListingPage {...data} />)
    expect(screen.queryAllByText('Past events').length).toBe(2)
    expect(screen.getByText(eventPage.title)).toBeInTheDocument()
    expect(screen.getByText(meetingPage.title)).toBeInTheDocument()
    expect(
      screen.getByText(eventPage.location[0].value.line1)
    ).toBeInTheDocument()
    expect(screen.getByText(/Online/)).toBeInTheDocument()
    expect(
      screen.getByText(meetingPage.meeting_location[0].value.line1, {
        exact: false
      })
    ).toBeInTheDocument()
  })

  it('renders an events listing page with events and updates with locale change', () => {
    const eventPage = EventPageFactory.make()
    const meetingPage = MeetingPageFactory.make()
    const esEventPage = EventPageFactory.make({
      title: 'Event title in Spanish'
    })
    const esMeetingPage = EventPageFactory.make({
      title: 'Meeting title in Spanish'
    })
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: [eventPage, meetingPage]
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    const { rerender } = render(<CityEventsListingPage {...data} />)
    expect(screen.getByText(eventPage.title)).toBeInTheDocument()
    expect(screen.getByText(meetingPage.title)).toBeInTheDocument()

    const translationData = {
      agency: 'An agency page title',
      total: 2,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: [esEventPage, esMeetingPage]
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'es'
    })
    rerender(<CityEventsListingPage {...translationData} />)
    expect(screen.getByText(esEventPage.title)).toBeInTheDocument()
    expect(screen.getByText(esMeetingPage.title)).toBeInTheDocument()
    expect(screen.queryByText(eventPage.title)).not.toBeInTheDocument()
    expect(screen.queryByText(meetingPage.title)).not.toBeInTheDocument()
  })

  it('renders an events listing page with events aggregated by date', () => {
    const eventPages = EventPageFactory.make(4)
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)
    const nextDate = new Date(date)
    nextDate.setMonth(nextDate.getMonth() + 1)
    eventPages[0].start_datetime = date.toISOString()
    eventPages[0].end_datetime = date.toISOString()
    eventPages[1].start_datetime = date.toISOString()
    eventPages[1].end_datetime = date.toISOString()
    eventPages[2].start_datetime = nextDate.toISOString()
    eventPages[2].end_datetime = nextDate.toISOString()
    eventPages[3].start_datetime = nextDate.toISOString()
    eventPages[3].end_datetime = nextDate.toISOString()

    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [
        {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          events: [eventPages[0], eventPages[1]]
        },
        {
          year: nextDate.getFullYear(),
          month: nextDate.getMonth() + 1,
          day: nextDate.getDate(),
          events: [eventPages[2], eventPages[3]]
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: ['upcoming'] },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<CityEventsListingPage {...data} />)

    expect(
      screen.getByText(
        date.toLocaleDateString('default', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        nextDate.toLocaleDateString('default', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      )
    ).toBeInTheDocument()
  })

  it('renders more events when the show more button is clicked', async () => {
    const data = {
      agency: 'An agency page title',
      total: 12,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: EventPageFactory.make(10)
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    const page2Events = [
      EventPageFactory.make({ title: 'a different event page' }),
      EventPageFactory.make({ title: 'a more different event page' })
    ]
    const data2 = {
      ...data,
      events: [
        {
          year: 2026,
          month: 1,
          day: 3,
          events: page2Events
        }
      ]
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<CityEventsListingPage {...data} />)
    const button = screen.getByRole('button', { name: 'Show more events' })
    expect(button).toBeInTheDocument()
    fetchMock.mockResponseOnce(JSON.stringify(data2))
    await userEvent.click(button)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=2&page_size=10&groupby=date`
    )
    await waitFor(() => {
      page2Events.forEach((eventItem) => {
        expect(
          screen.getByRole('link', { name: eventItem.title })
        ).toBeInTheDocument()
      })
      expect(
        screen.getByRole('link', {
          name: page2Events[0].title
        })
      ).toHaveFocus()
    })
  })

  it('opens filters accordion by default on large screen', () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: EventPageFactory.make(2)
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    render(<CityEventsListingPage {...data} />)
    const filterDetails = screen.getByTestId('filter-details')
    expect(filterDetails).toBeInTheDocument()
    expect(filterDetails).toHaveAttribute('open')
  })

  it('closes filters accordion by default on less than large screen', () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: EventPageFactory.make(2)
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    window.innerWidth = 1023
    render(<CityEventsListingPage {...data} />)
    const filterDetails = screen.getByTestId('filter-details')
    expect(filterDetails).toBeInTheDocument()
    expect(filterDetails).not.toHaveAttribute('open')
  })

  it('filters events by month and year', async () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: EventPageFactory.make(2)
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<CityEventsListingPage {...data} />)

    const monthSelect = screen.getByRole('combobox', { name: 'Month' })
    const yearSelect = screen.getByRole('combobox', { name: 'Year' })
    const applyFilterBtn = screen.getByRole('button', { name: 'Apply filter' })
    fetchMock.mockResponse(JSON.stringify(data))

    // filter month only
    await userEvent.selectOptions(monthSelect, '12')
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10&groupby=date&month=12`
    )

    // filter year only
    await userEvent.selectOptions(monthSelect, '')
    await userEvent.selectOptions(yearSelect, '2025')
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10&groupby=date&year=2025`
    )

    // filter month and year
    await userEvent.selectOptions(monthSelect, '12')
    await userEvent.selectOptions(yearSelect, '2025')
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10&groupby=date` +
        `&start_date=2025-12-01&end_date=2025-12-31`
    )

    // remove month filter
    await userEvent.click(
      screen.getByRole('button', {
        name: `Month: December. To activate press Enter`
      })
    )
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10&groupby=date&year=2025`
    )

    // remove year filter
    await userEvent.click(
      screen.getByRole('button', {
        name: `Year: 2025. To activate press Enter`
      })
    )
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10&groupby=date`
    )

    await userEvent.selectOptions(monthSelect, '12')
    await userEvent.click(applyFilterBtn)

    // reset filter via form reset
    await userEvent.click(screen.getByRole('button', { name: 'Reset filter' }))
    // expect(fetchMock).toHaveBeenLastCalledWith(
    //   `${data.baseUrl}/?page=1&page_size=10&groupby=date`
    // )
  })

  it('loads more events with active filters', async () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: EventPageFactory.make(2)
        }
      ],
      baseUrl: 'http://a-fake-url'
    }

    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<CityEventsListingPage {...data} />)

    const monthSelect = screen.getByRole('combobox', { name: 'Month' })
    const yearSelect = screen.getByRole('combobox', { name: 'Year' })
    const applyFilterBtn = screen.getByRole('button', { name: 'Apply filter' })
    fetchMock.mockResponseOnce(JSON.stringify(data))
    fetchMock.mockResponseOnce(JSON.stringify(data))
    fetchMock.mockResponseOnce(JSON.stringify(data))

    // filter month and year
    await userEvent.selectOptions(monthSelect, '12')
    await userEvent.selectOptions(yearSelect, '2025')
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${data.baseUrl}/?page=1&page_size=10&groupby=date` +
        `&start_date=2025-12-01&end_date=2025-12-31`
    )
    await userEvent.click(
      screen.getByRole('button', { name: 'Show more events' })
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${data.baseUrl}/?page=2&page_size=10&groupby=date` +
        `&start_date=2025-12-01&end_date=2025-12-31`
    )

    // reset filter
    const resetButton = screen.getByRole('button', {
      name: 'Reset active filters'
    })
    await userEvent.click(resetButton)
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      `${data.baseUrl}/?page=1&page_size=10&groupby=date`
    )
  })

  it('logs an error if loading events fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    const data = {
      agency: 'An agency page title',
      total: 3,
      events: [
        {
          year: 2026,
          month: 1,
          day: 2,
          events: EventPageFactory.make(2)
        }
      ],
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<CityEventsListingPage {...data} />)
    const button = screen.getByRole('button', { name: 'Show more events' })
    await userEvent.click(button)
    fetchMock.mockRejectOnce(new Error('error'))
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=2&page_size=10&groupby=date`
    )
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading more events:',
        expect.any(Error)
      )
    })
    consoleErrorSpy.mockRestore()
  })

  it('renders an events listing page with no results', () => {
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [],
      baseUrl: 'http://a-fake-url'
    }
    render(<CityEventsListingPage {...data} />)
    expect(screen.getByText('No events found')).toBeInTheDocument()
  })
})
