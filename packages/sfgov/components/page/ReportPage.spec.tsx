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
})
