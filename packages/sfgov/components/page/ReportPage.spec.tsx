import { ReportPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { ReportPage } from './ReportPage'

const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()

// @ts-expect-error erg
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}))

describe('ReportPage', () => {
  const page = ReportPageFactory.make()

  it('renders a report page', () => {
    render(<ReportPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  it('does not render a spotlight if there is no spotlight', () => {
    page.spotlight = []
    render(<ReportPage page={page} />)
    expect(screen.queryByTestId('spotlight')).not.toBeInTheDocument()
  })

  it('does not render a partner agency section if there are no partner agenices', () => {
    page.partner_agencies = []
    render(<ReportPage page={page} />)
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Partner agencies' })
    ).not.toBeInTheDocument()
  })

  it('does not render a print version if there is no print version', () => {
    page.print_version = undefined
    render(<ReportPage page={page} />)
    expect(
      screen.queryByRole('heading', { level: 3, name: 'Print version' })
    ).not.toBeInTheDocument()
  })

  describe('primary agency', () => {
    it('renders if present', () => {
      render(<ReportPage page={page} />)
      expect(screen.getByText(page.primary_agency!.title)).toBeInTheDocument()
    })
    it('does not render if empty', () => {
      render(<ReportPage page={{ ...page, primary_agency: null }} />)
      expect(
        screen.queryByText(page.primary_agency!.title)
      ).not.toBeInTheDocument()
    })
  })
})
