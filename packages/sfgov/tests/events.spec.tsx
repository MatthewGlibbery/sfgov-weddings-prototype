import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { EventPageFactory, MeetingPageFactory } from '@/lib/factories'
import EventPage from '../pages/[path]/events/[filter]'
import fetchMock from 'jest-fetch-mock'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { path: 'agency-name', filter: 'upcoming' }
  })
}))
describe('events', () => {
  it('renders an events listing page with events', () => {
    const eventPage = EventPageFactory.make()
    const meetingPage = MeetingPageFactory.make()
    const data = {
      agency: 'An agency page title',
      total: 2,
      events: [eventPage, meetingPage],
      baseUrl: 'http://a-fake-url'
    }
    render(<EventPage {...data} />)
    expect(screen.getByText(eventPage.title)).toBeInTheDocument()
    expect(screen.getByText(meetingPage.title)).toBeInTheDocument()
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
      baseUrl: 'http://a-fake-url'
    }
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
    const data = {
      agency: 'An agency page title',
      total: 10,
      events: EventPageFactory.make(2),
      baseUrl: 'http://a-fake-url'
    }
    const data2 = data
    data2.events = [EventPageFactory.make()]

    render(<EventPage {...data} />)
    const button = screen.getByTestId('load-more-button')
    expect(button).toBeInTheDocument()
    fetchMock.mockResponseOnce(JSON.stringify(data2))
    fireEvent.click(button)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenLastCalledWith(`${data.baseUrl}/?page=2`)
    expect(screen.getByText(data2.events[0].title)).toBeInTheDocument()
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
