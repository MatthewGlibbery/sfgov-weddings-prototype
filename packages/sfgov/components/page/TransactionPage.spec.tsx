import { TitleAndTextFactory, TransactionPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { TransactionPage } from './TransactionPage'

const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()

// @ts-expect-error erg
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}))

describe('TransactionPage', () => {
  const fixture = TransactionPageFactory.make()

  it('renders the page title', () => {
    render(<TransactionPage page={fixture} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.title)
  })

  describe('description', () => {
    it('renders if present', () => {
      render(<TransactionPage page={fixture} />)
      const description = screen.getByText(fixture.description, {
        selector: 'p'
      })
      expect(description).toBeInTheDocument()
    })

    it('does not render if empty', async () => {
      render(<TransactionPage page={{ ...fixture, description: '' }} />)
      expect(
        screen.queryByTestId('step-by-step-description')
      ).not.toBeInTheDocument()
    })
  })

  it.each([
    {
      what: 'partner_agencies',
      input: fixture.partner_agencies[0].title
    },
    { what: 'things_to_know', input: fixture.things_to_know[0].value.title },
    { what: 'custom_section', input: fixture.custom_section[0].value.title },
    {
      what: 'supporting_information',
      input: fixture.supporting_information[0].value.title
    },
    {
      what: 'good_for_community',
      input: fixture.good_for_community[0].value.title
    },
    // @ts-expect-error this is silly
    { what: 'get_help', input: fixture.get_help[0].value.title },
    // @ts-expect-error this is silly
    { what: 'get_help', input: fixture.get_help[1].value.owner }
  ])('renders the $what section when present', ({ input }) => {
    render(<TransactionPage page={fixture} />)

    const section = screen.getByText(input)

    expect(section).toBeInTheDocument()
  })

  it.each([
    { what: 'partner_agencies' },
    { what: 'things_to_know' },
    { what: 'what_to_do' },
    { what: 'custom_section' },
    { what: 'supporting_information' },
    { what: 'good_for_community' },
    { what: 'get_help' }
  ])('does not render the $what section when not present', ({ what }) => {
    render(<TransactionPage page={{ ...fixture, [what]: [] }} />)

    expect(screen.queryByTestId(`${what}-section`)).not.toBeInTheDocument()
  })

  it('renders when no cost is provided', () => {
    const page = TransactionPageFactory.make({
      cost: []
    })
    render(<TransactionPage page={page} />)
    expect(screen.getByText(page.title)).toBeInTheDocument()
  })

  describe('special cases', () => {
    const case1 = TitleAndTextFactory.make({
      value: {
        text: '<p>Special case one</p>'
      }
    })

    const case2 = TitleAndTextFactory.make({
      value: {
        text: '<p>Special case two</p>'
      }
    })

    const page = TransactionPageFactory.make({
      supporting_information: [case1, case2]
    })

    it('renders HTML as rich text', () => {
      render(<TransactionPage page={page} />)

      const details = screen.getByTestId(`special-case-${case1.id}`)
      expect(details).toBeInTheDocument()
      expect(details).toHaveTextContent(/Special case one/)
      expect(details).not.toHaveTextContent(/<p>/)
    })

    it('renders the first accordion open', () => {
      render(<TransactionPage page={page} />)

      const para = screen.getByText('Special case one')
      expect(para).toBeInTheDocument()
      expect(para).toBeVisible()
    })

    it('renders the second accordion closed', () => {
      render(<TransactionPage page={page} />)

      const para = screen.getByText('Special case two')
      expect(para).toBeInTheDocument()
      expect(para).not.toBeVisible()
    })
  })
})
