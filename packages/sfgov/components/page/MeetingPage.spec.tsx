import { MeetingPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { MeetingPage } from './MeetingPage'

const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()

// @ts-expect-error erg
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}))

describe('MeetingPage', () => {
  const page = MeetingPageFactory.make()

  it('renders a meeting page', () => {
    render(<MeetingPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  it('renders a meeting page without end date/end times', () => {
    const data = {
      ...page,
      date_time: [
        {
          ...page.date_time[0],
          end_date: null,
          end_time: null
        }
      ]
    }
    render(<MeetingPage page={data} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  describe('primary agency', () => {
    it('renders if present', () => {
      render(<MeetingPage page={page} />)
      expect(screen.getByText(page.primary_agency!.title)).toBeInTheDocument()
    })
    it('does not render if empty', () => {
      render(<MeetingPage page={{ ...page, primary_agency: null }} />)
      expect(
        screen.queryByText(page.primary_agency!.title)
      ).not.toBeInTheDocument()
    })
  })
})
