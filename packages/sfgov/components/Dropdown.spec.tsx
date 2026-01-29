import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Dropdown } from './Dropdown'
import { HeadingMd } from '@/design-system'

describe('Dropdown', () => {
  it('renders a dropdown with freeform content', async () => {
    render(
      <Dropdown title="Open me">
        <div>
          <HeadingMd>Here is inner content</HeadingMd>
          <p>More content</p>
        </div>
      </Dropdown>
    )

    const details = screen.getByRole('group', { name: 'Open me' })
    fireEvent.click(details)

    expect(await screen.findByText('Here is inner content')).toBeInTheDocument()
  })

  it('closes a dropdown when the escape button is pressed', async () => {
    render(
      <Dropdown title="Open me">
        <div>
          <HeadingMd>Here is inner content</HeadingMd>
          <p>More content</p>
        </div>
      </Dropdown>
    )

    const details = screen.getByRole('group', { name: 'Open me' })
    const summary = screen.getByLabelText('Show Open me menu')
    fireEvent.click(summary)
    expect(details).toHaveAttribute('open')
    await waitFor(() => {
      expect(summary).toHaveAttribute('aria-label', 'Hide Open me menu')
    })

    fireEvent.keyDown(details, { key: 'Escape' })
    expect(details).not.toHaveAttribute('open')

    fireEvent(details, new Event('toggle', { bubbles: true }))
  })

  it('does not render a dropdown with no children', async () => {
    render(<Dropdown title="Open me" />)

    expect(
      screen.queryByRole('group', { name: 'Open me' })
    ).not.toBeInTheDocument()
  })
})
