import { render, screen } from '@testing-library/react'
import { PageTitleSection } from './PageTitleSection'

describe('PageTitleSection', () => {
  it('renders a page title section with an <h1> title', () => {
    render(
      <PageTitleSection label="Label" title="Title">
        <h2>subheader</h2>
      </PageTitleSection>
    )
    const h1 = screen.getByRole('heading', {
      level: 1
    })

    expect(h1).toHaveTextContent('Title')
  })

  it('renders a page title section with an <h2> child', () => {
    render(
      <PageTitleSection label="Label" title="Title">
        <h2>subheader</h2>
      </PageTitleSection>
    )
    const h2 = screen.getByRole('heading', {
      level: 2
    })

    expect(h2).toHaveTextContent('subheader')
  })
})
