import { render, screen } from '@testing-library/react'
import { SiteHeader } from './SiteHeader'
import { useSearchParams } from '@/__mocks__/next/navigation'

describe('SiteHeader', () => {
  const previewText = /You are previewing a draft/

  it('renders <nav> with the language selector', () => {
    render(<SiteHeader />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveTextContent('English')
    expect(nav).toHaveTextContent('Español')
  })

  it('does not render an alert without search params', () => {
    useSearchParams.mockImplementationOnce(() => undefined)
    render(<SiteHeader />)
    expect(screen.queryByText(previewText)).not.toBeInTheDocument()
  })

  it('renders a preview alert when ?preview=true', () => {
    useSearchParams.mockImplementationOnce(
      () => new URLSearchParams('preview=true')
    )
    render(<SiteHeader />)
    expect(useSearchParams).toHaveBeenCalled()
    expect(screen.getByText(previewText)).toBeInTheDocument()
  })
})
