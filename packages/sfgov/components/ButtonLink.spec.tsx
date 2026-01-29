import { render, screen } from '@testing-library/react'
import { ButtonLinkFactory } from '@/lib/factories'
import { ButtonLink } from './ButtonLink'

describe('ButtonLink', () => {
  it('renders an icon only ButtonLink component', () => {
    const fixture = ButtonLinkFactory.make()
    render(<ButtonLink link={fixture.value} iconOnly />)

    const buttonLink = screen.getByRole('link', {
      name: fixture.value.screenreader_label
    })
    expect(buttonLink).toBeInTheDocument()
  })

  it('renders the ButtonLink component', () => {
    const fixture = ButtonLinkFactory.make()
    render(<ButtonLink link={fixture.value} />)

    const buttonLink = screen.getByRole('link', {
      name: fixture.value.screenreader_label
    })
    expect(buttonLink).toBeInTheDocument()
  })

  it('uses the link text as the aria label if screenreader label does not exist', () => {
    const fixture = ButtonLinkFactory.make({
      value: { screenreader_label: '' }
    })
    render(<ButtonLink link={fixture.value} />)
    const buttonLink = screen.getByRole('link', {
      name: fixture.value.button.link_text
    })
    expect(buttonLink).toBeInTheDocument()
  })
})
