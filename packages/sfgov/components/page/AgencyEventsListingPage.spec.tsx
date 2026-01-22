import { userEvent } from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import {
  AgencyPageFactory,
  EventPageFactory,
  MeetingPageFactory
} from '@/lib/factories'
import fetchMock from 'jest-fetch-mock'
import { useRouter } from 'next/router'
import AgencyEventsListingPage from './AgencyEventsListingPage'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// NOTE:
// PageWrapper does its own data fetch for alerts (/api/alerts)
// That fetch interferes with testing AgencyEventsListingPage in isolation
// Mocking PageWrapper will prevent that additional fetch and keep fetch
// assertions scoped to AgencyEventsListingPage
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
describe('AgencyEventsListingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fetchMock.resetMocks()
  })

  it('renders an upcoming events listing page with events and meetings', () => {
    const eventPage = EventPageFactory.make()
    const meetingPage = MeetingPageFactory.make({ cancelled: true })
    const eventPageNoLocation = EventPageFactory.make({
      title: 'event no location',
      location: undefined
    })
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [eventPage, meetingPage, eventPageNoLocation],
      baseUrl: 'http://a-fake-url',
      child_agencies: [],
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)
    expect(screen.queryAllByText('Upcoming events').length).toBe(2)
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

  it('renders a past events listing page with events and meetings', () => {
    const eventPage = EventPageFactory.make()
    const meetingPage = MeetingPageFactory.make({ cancelled: true })
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [eventPage, meetingPage],
      baseUrl: 'http://a-fake-url',
      child_agencies: [],
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'past' },
      asPath: '/agency-name/events/past',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)
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
      events: [eventPage, meetingPage],
      baseUrl: 'http://a-fake-url',
      child_agencies: [],
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    const { rerender } = render(<AgencyEventsListingPage {...data} />)
    expect(screen.getByText(eventPage.title)).toBeInTheDocument()
    expect(screen.getByText(meetingPage.title)).toBeInTheDocument()

    const translationData = {
      agency: 'An agency page title',
      total: 2,
      events: [esEventPage, esMeetingPage],
      baseUrl: 'http://a-fake-url',
      child_agencies: [],
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'es'
    })
    rerender(<AgencyEventsListingPage {...translationData} />)
    expect(screen.getByText(esEventPage.title)).toBeInTheDocument()
    expect(screen.getByText(esMeetingPage.title)).toBeInTheDocument()
    expect(screen.queryByText(eventPage.title)).not.toBeInTheDocument()
    expect(screen.queryByText(meetingPage.title)).not.toBeInTheDocument()
  })

  it('renders an events listing page with events aggregated by month and year', () => {
    const eventPages = EventPageFactory.make(2)
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)
    const nextDate = new Date(date)
    nextDate.setMonth(nextDate.getMonth() + 1)
    eventPages[0].start_datetime = date.toISOString()
    eventPages[0].end_datetime = date.toISOString()
    eventPages[1].start_datetime = nextDate.toISOString()
    eventPages[1].end_datetime = nextDate.toISOString()
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: eventPages,
      baseUrl: 'http://a-fake-url',
      child_agencies: [],
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: ['upcoming'] },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)
    expect(
      screen.getByText(
        date.toLocaleString('default', { month: 'long', year: 'numeric' })
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        nextDate.toLocaleString('default', { month: 'long', year: 'numeric' })
      )
    ).toBeInTheDocument()
  })

  it('renders more events when the show more button is clicked', async () => {
    const data = {
      agency: 'An agency page title',
      total: 12,
      events: EventPageFactory.make(10),
      baseUrl: 'http://a-fake-url',
      child_agencies: [],
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    const data2 = {
      ...data,
      events: [
        EventPageFactory.make({ title: 'a different event page' }),
        EventPageFactory.make({ title: 'a more different event page' })
      ]
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)
    const button = screen.getByRole('button', { name: 'Show more events' })
    expect(button).toBeInTheDocument()
    fetchMock.mockResponseOnce(JSON.stringify(data2))
    await userEvent.click(button)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=2&page_size=10`
    )
    await waitFor(() => {
      expect(
        screen.getByRole('link', {
          name: data2.events[0].title
        })
      ).toHaveFocus()
    })
    await userEvent.click(button)
  })

  it('opens filters accordion by default on large screen', () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url',
      child_agencies: [],
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    render(<AgencyEventsListingPage {...data} />)
    const filterDetails = screen.getByTestId('filter-details')
    expect(filterDetails).toBeInTheDocument()
    expect(filterDetails).toHaveAttribute('open')
  })

  it('closes filters accordion by default on less than large screen', () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url',
      child_agencies: [],
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    window.innerWidth = 1023
    render(<AgencyEventsListingPage {...data} />)
    const filterDetails = screen.getByTestId('filter-details')
    expect(filterDetails).toBeInTheDocument()
    expect(filterDetails).not.toHaveAttribute('open')
  })

  it('renders child agency filters', () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url',
      child_agencies: AgencyPageFactory.make(3),
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
  })

  it('filters events by month and year', async () => {
    const events = EventPageFactory.make(2)
    const data = {
      agency: 'An agency page title',
      total: 10,
      events,
      baseUrl: 'http://a-fake-url',
      child_agencies: AgencyPageFactory.make(3),
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)

    const monthSelect = screen.getByRole('combobox', { name: 'Month' })
    const yearSelect = screen.getByRole('combobox', { name: 'Year' })
    const applyFilterBtn = screen.getByRole('button', { name: 'Apply filter' })
    fetchMock.mockResponse(JSON.stringify(data))

    // filter month only
    await userEvent.selectOptions(monthSelect, '12')
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10&month=12`
    )

    // filter year only
    await userEvent.selectOptions(monthSelect, '')
    await userEvent.selectOptions(yearSelect, '2025')
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10&year=2025`
    )

    // filter month and year
    await userEvent.selectOptions(monthSelect, '12')
    await userEvent.selectOptions(yearSelect, '2025')
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10` +
        `&start_date=2025-12-01&end_date=2025-12-31`
    )

    // remove month filter
    await userEvent.click(
      screen.getByRole('button', {
        name: `Month: December. To activate press Enter`
      })
    )
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10&year=2025`
    )

    // remove year filter
    await userEvent.click(
      screen.getByRole('button', {
        name: `Year: 2025. To activate press Enter`
      })
    )
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10`
    )
  })

  it('filters events by child agencies', async () => {
    const childAgencies = AgencyPageFactory.make(3)
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url',
      child_agencies: childAgencies,
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }

    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)

    const checkboxes = screen.getAllByRole('checkbox')
    const applyFilterBtn = screen.getByRole('button', { name: 'Apply filter' })
    await userEvent.click(checkboxes[0])
    await userEvent.click(checkboxes[1])
    fetchMock.mockResponse(JSON.stringify(data))
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10` +
        `&child_agencies=${childAgencies[0].id}%2C${childAgencies[1].id}`
    )
    const childAgencyFilterRemoveBtn1 = screen.getByRole('button', {
      name: `Remove filter ${childAgencies[0].title}. To activate press Enter`
    })
    const childAgencyFilterRemoveBtn2 = screen.getByRole('button', {
      name: `Remove filter ${childAgencies[1].title}. To activate press Enter`
    })
    expect(childAgencyFilterRemoveBtn1).toBeInTheDocument()
    expect(childAgencyFilterRemoveBtn2).toBeInTheDocument()

    // remove filter
    await userEvent.click(childAgencyFilterRemoveBtn1)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10` +
        `&child_agencies=${childAgencies[1].id}`
    )
    expect(childAgencyFilterRemoveBtn1).not.toBeInTheDocument()

    // reset filter
    const resetButton = screen.getByRole('button', {
      name: 'Reset active filters'
    })
    await userEvent.click(resetButton)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1&page_size=10`
    )
    expect(childAgencyFilterRemoveBtn2).not.toBeInTheDocument()
  })

  it('loads more events with active filters', async () => {
    const childAgencies = AgencyPageFactory.make(3)
    const events = EventPageFactory.make(2)
    const data = {
      agency: 'An agency page title',
      total: 10,
      events,
      baseUrl: 'http://a-fake-url',
      child_agencies: childAgencies,
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }

    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)

    const checkboxes = screen.getAllByRole('checkbox')
    const applyFilterBtn = screen.getByRole('button', { name: 'Apply filter' })
    await userEvent.click(checkboxes[0])
    await userEvent.click(checkboxes[1])
    fetchMock.mockResponseOnce(JSON.stringify(data))
    fetchMock.mockResponseOnce(JSON.stringify(data))
    await userEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${data.baseUrl}/?page=1&page_size=10` +
        `&child_agencies=${childAgencies[0].id}%2C${childAgencies[1].id}`
    )
    await userEvent.click(
      screen.getByRole('button', { name: 'Show more events' })
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${data.baseUrl}/?page=2&page_size=10` +
        `&child_agencies=${childAgencies[0].id}%2C${childAgencies[1].id}`
    )
  })

  it('logs an error if loading events fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [EventPageFactory.make()],
      baseUrl: 'http://a-fake-url',
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<AgencyEventsListingPage {...data} />)
    const button = screen.getByRole('button', { name: 'Show more events' })
    await userEvent.click(button)
    fetchMock.mockRejectOnce(new Error('error'))
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=2&page_size=10`
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
      baseUrl: 'http://a-fake-url',
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    render(<AgencyEventsListingPage {...data} />)
    expect(screen.getByText('No events found')).toBeInTheDocument()
  })

  it('strips html from meeting overviews', () => {
    const meetingPage = MeetingPageFactory.make({
      overview: '<p>a paragraph tag <strong>with bold text</strong></p>'
    })
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [meetingPage],
      baseUrl: 'http://a-fake-url',
      meeting_archive_date: new Date().toISOString().slice(0, 10),
      meeting_archive_url: 'https://archive.url'
    }
    render(<AgencyEventsListingPage {...data} />)
    expect(
      screen.getByText('a paragraph tag with bold text')
    ).toBeInTheDocument()
  })
})
