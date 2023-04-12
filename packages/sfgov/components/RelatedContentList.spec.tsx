import { render, screen } from '@testing-library/react'
import { RelatedContentList } from './RelatedContentList'

describe('RelatedContentList', () => {
  const content = [
    {
      id: 1,
      meta: {
        type: 'sfgov_base.RelatedContentTopic'
      },
      page_content: {
        id: 2,
        meta: {
          type: 'wagtailcore.Page',
          detail_url: 'http://localhost:8000/api/v2/pages/2/',
          html_url: 'http://localhost/',
          slug: 'home',
          seo_title: '',
          search_description: ''
        },
        title: 'Hello there'
      }
    }
  ]

  it('renders a related content link', async () => {
    render(<RelatedContentList content={content} />)

    const link = await screen.findByText('Hello there')
    expect(link).toBeInTheDocument()
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
