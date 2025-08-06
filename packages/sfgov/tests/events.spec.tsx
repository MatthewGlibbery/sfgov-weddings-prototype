import { userEvent } from '@testing-library/user-event'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  AgencyPageFactory,
  EventPageFactory,
  MeetingPageFactory
} from '@/lib/factories'
import EventPage from '../pages/[path]/events/[filter]'
import fetchMock from 'jest-fetch-mock'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
describe('events', () => {
  it('renders an events listing page with events and updates with locale change', () => {
    const mockUseRouter = useRouter
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
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    const { rerender } = render(<EventPage {...data} />)
    expect(screen.getByText(eventPage.title)).toBeInTheDocument()
    expect(screen.getByText(meetingPage.title)).toBeInTheDocument()

    const translationData = {
      agency: 'An agency page title',
      total: 2,
      events: [esEventPage, esMeetingPage],
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'es'
    })
    rerender(<EventPage {...translationData} />)
    expect(screen.getByText(esEventPage.title)).toBeInTheDocument()
    expect(screen.getByText(esMeetingPage.title)).toBeInTheDocument()
    expect(screen.queryByText(eventPage.title)).not.toBeInTheDocument()
    expect(screen.queryByText(meetingPage.title)).not.toBeInTheDocument()
  })

  it('renders an events listing page with events aggregated by month and year', () => {
    const mockUseRouter = useRouter
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
      baseUrl: 'http://a-fake-url'
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<EventPage {...data} />)
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

  it('renders more events when the show more button is clicked', () => {
    const mockUseRouter = useRouter
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url'
    }
    const data2 = data
    data2.events = [EventPageFactory.make()]
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<EventPage {...data} />)
    const button = screen.getByTestId('load-more-button')
    expect(button).toBeInTheDocument()
    fetchMock.mockResponseOnce(JSON.stringify(data2))
    fireEvent.click(button)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenLastCalledWith(`${data.baseUrl}/?page=2`)
    expect(screen.getByText(data2.events[0].title)).toBeInTheDocument()
  })

  it('default opens on large screen', () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url'
    }
    render(<EventPage {...data} />)
    const filterDetails = screen.getByTestId('filter-details')
    expect(filterDetails).toBeInTheDocument()
    expect(filterDetails).toHaveAttribute('open')
  })

  it('default closes on less than large screen', () => {
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url'
    }
    window.innerWidth = 1023
    render(<EventPage {...data} />)
    const filterDetails = screen.getByTestId('filter-details')
    expect(filterDetails).toBeInTheDocument()
    expect(filterDetails).not.toHaveAttribute('open')
  })

  it('renders child agency filters', () => {
    const mockUseRouter = useRouter
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url',
      child_agencies: AgencyPageFactory.make(3)
    }
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<EventPage {...data} />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
  })

  it('renders events with filters', async () => {
    const mockUseRouter = useRouter
    const childAgencies = AgencyPageFactory.make(3)
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url',
      child_agencies: childAgencies
    }
    const filteredData = data
    filteredData.events = [
      EventPageFactory.make({ title: 'Filtered event page 1' }),
      EventPageFactory.make({ title: 'Filtered event page 2' })
    ]
    mockUseRouter.mockReturnValue({
      query: { path: 'agency-name', filter: 'upcoming' },
      asPath: '/agency-name/events/upcoming',
      locale: 'en'
    })
    render(<EventPage {...data} />)
    const checkboxes = screen.getAllByRole('checkbox')
    const monthSelect = screen.getByRole('combobox', { name: 'Month' })
    const yearSelect = screen.getByRole('combobox', { name: 'Year' })
    const applyFilterBtn = screen.getByRole('button', { name: 'Apply filter' })
    fireEvent.click(checkboxes[0])
    fireEvent.click(checkboxes[1])
    await userEvent.selectOptions(monthSelect, '12')
    await userEvent.selectOptions(yearSelect, '2025')
    fetchMock.mockClear()
    fetchMock.mockResponseOnce(JSON.stringify(filteredData))
    fireEvent.click(applyFilterBtn)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenLastCalledWith(
      `${data.baseUrl}/?page=1` +
        `&child_agencies=${childAgencies[0].id}%2C${childAgencies[1].id}` +
        `&start_date=2025-12-01&end_date=2025-12-31`
    )
    expect(screen.queryAllByTestId('active-filter-item')).toHaveLength(4)
    filteredData.events.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('renders an events listing page with no results', () => {
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [],
      baseUrl: 'http://a-fake-url'
    }
    render(<EventPage {...data} />)
    expect(screen.getByText('No events found')).toBeInTheDocument()
  })
})
