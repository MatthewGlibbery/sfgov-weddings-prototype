import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { SiteHeader } from './SiteHeader'
import { useSearchParams } from '@/__mocks__/next/navigation'

describe('SiteHeader', () => {
  const previewText = /You are previewing a draft/

  it('renders <nav> with the language selector', () => {
    render(<SiteHeader />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveTextContent('English')
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

  it('renders the smaller screen menu when the menu button is clicked', async () => {
    render(<SiteHeader />)
    const details = screen.getAllByRole('group', { name: 'navigation' })[0]
    fireEvent.click(details)
    const menuItem = screen.getAllByTestId('header-nav-Services')[0]

    fireEvent.click(menuItem)
    expect(
      screen.getAllByText('Get married in San Francisco')[0]
    ).toBeInTheDocument()
  })

  it.only('toggles nav menu open and closed', async () => {
    render(<SiteHeader />)

    const summary = screen.getAllByTestId('navigation-title')[0]

    await fireEvent.click(summary)
    expect(
      screen.getAllByText('Get married in San Francisco')[0]
    ).toBeInTheDocument()
  })

  it('toggles language selector open and closed', async () => {
    render(<SiteHeader />)

    const summary = screen.getByTestId('language-menu-title')

    await fireEvent.click(summary)
    await waitFor(() => expect(screen.getAllByRole('list')[0]).toBeVisible())
  })

  it('toggles search menu open', async () => {
    render(<SiteHeader />)

    const summary = screen.getByTestId('search-menu')

    await fireEvent.click(summary)
    await waitFor(() => expect(screen.getAllByRole('textbox')[0]).toBeVisible())
  })

  it('keeps menu open when clicked inside of it', async () => {
    render(<SiteHeader />)

    const summary = screen.getAllByTestId('navigation-title')[0]
    await fireEvent.click(summary)
    const details = screen.getAllByRole('group', { name: 'navigation' })[0]
    await fireEvent.click(details)
  })

  it('closes menu when clicking a link inside of it', async () => {
    render(<SiteHeader />)
    const summary = screen.getAllByTestId('navigation-title')[0]
    await fireEvent.click(summary)
    const details = screen.getAllByRole('group', { name: 'navigation' })[0]
    const link = within(details).getByRole('link')
    await fireEvent.click(link)
    expect(details).not.toHaveAttribute('open')
  })

  it('closes menu when clicked outside of it', async () => {
    render(<SiteHeader />)
    const summary = screen.getAllByTestId('navigation-title')[0]
    const details = screen.getAllByRole('group', { name: 'navigation' })[0]
    await fireEvent.click(summary)
    expect(details).toHaveAttribute('open')
    await fireEvent.click(document.body)
    expect(details).not.toHaveAttribute('open')
  })
})
