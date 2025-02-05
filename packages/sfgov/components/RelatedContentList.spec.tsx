import { render, screen } from '@testing-library/react'
import { RelatedContentList } from './RelatedContentList'
import { PageFactory } from '@/lib/factories'

describe('RelatedContentList', () => {
  it('renders a related content link', () => {
    const content = [{ type: 'page', value: PageFactory.make() }]
    render(<RelatedContentList content={content} />)

    const link = screen.getByText(content[0].value.title)
    expect(link).toBeInTheDocument()
  })

  it('does not render a related content link for unpublished pages', () => {
    const content = [
      { type: 'page', value: PageFactory.make() },
      { type: 'page', value: PageFactory.make({ live: false }) }
    ]
    render(<RelatedContentList content={content} />)
    expect(screen.queryByText(content[1].value.title)).not.toBeInTheDocument()
  })

  it('renders nothing with empty/null contents', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    let rendered = render(<RelatedContentList content={[]} />)
    expect(rendered.container).toBeEmptyDOMElement()
    // @ts-expect-error bad data
    rendered = render(<RelatedContentList content={null} />)
    expect(rendered.container).toBeEmptyDOMElement()
  })
})
