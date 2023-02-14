import QuickLink from './QuickLink'
import { render, screen } from '@testing-library/react'
import { QuickLinkFactory } from '@/lib/factories'

describe('<QuickLink>', () => {
  const fixture = QuickLinkFactory.make()
  it('renders a link', async () => {
    render(<QuickLink link={fixture} />)
    const link = await screen.findByRole('link')
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe(fixture.value.external_url)
    expect(link).toHaveTextContent(fixture.value.title)
    expect(link).toHaveTextContent(fixture.value.description)
  })
})
