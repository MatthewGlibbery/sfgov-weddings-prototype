import { render, screen } from '@testing-library/react'
import { EventPageFactory } from '@/lib/factories'
import { EventPage } from './EventPage'

describe('EventPage', () => {
  const fixture = EventPageFactory.make()

  it('renders the page title', () => {
    render(<EventPage page={fixture} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.title)
  })

  describe('description', () => {
    it('renders if present', () => {
      render(<EventPage page={fixture} />)
      const description = screen.getByText(fixture.description, {
        selector: 'p'
      })
      expect(description).toBeInTheDocument()
    })

    it('does not render if empty', async () => {
      render(<EventPage page={{ ...fixture, description: '' }} />)
      expect(screen.queryByTestId('event-page-description')).not.toBeInTheDocument()
    })
  })

  it.each([
    { what: 'cost', input: fixture.cost[0].value.description },
    { what: 'date_time', input: /Sunday, November 19, 2023/ },
    { what: 'body', input: fixture.body },
    { what: 'call_to_action', input: fixture.call_to_action[0].value.title },
    { what: 'location', input: fixture.location[0].value.line1 },
    // @ts-expect-error 'blegh
    { what: 'contact', input: fixture.contact[0].value.owner },
    // @ts-expect-error 'blegh
    { what: 'contact', input: fixture.contact[1].value.title }
  ])('renders the $what section when present', ({ what, input }) => {
    if (what === 'date_time') {
      fixture.date_time = [{
        ...fixture.date_time[0],
        value: {
          start_date: '2023-11-19',
          start_time: '01:23:45',
          end_date: '2023-11-19',
          end_time: '21:02:34',
          is_all_day: false,
          include_end_date_time: 'yes'
        }
      }]
    }
    render(<EventPage page={fixture} />)

    const elements = screen.getAllByText(input, { exact: false })
    expect(elements.length).toBeGreaterThanOrEqual(1)
  })

  it.each([
    { what: 'cost', input: fixture.cost[0].value.cost },
    { what: 'date_time', input: fixture.date_time[0].value.start_time },
    { what: 'body', input: fixture.body },
    { what: 'call_to_action', input: fixture.call_to_action[0].value.title },
    { what: 'location', input: fixture.location[0].value.line1 },
    // @ts-expect-error 'blegh
    { what: 'contact', input: fixture.contact[0].value.owner },
    // @ts-expect-error 'blegh
    { what: 'contact', input: fixture.contact[1].value.title }
  ])('does not render the $what section when not present', ({ what, input }) => {
    const fixtureCopy = fixture
    // @ts-expect-error 'blegh'
    fixtureCopy[what] = []
    render(<EventPage page={fixture} />)

    expect(screen.queryByText(input)).not.toBeInTheDocument()
  })
})
