import { AgencyPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { AgencyPage } from './AgencyPage'

describe('AgencyPage', () => {
  const page = AgencyPageFactory.make()

  it('renders a full agency page', () => {
    render(<AgencyPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  it('renders an agency page with optional fields blank', () => {
    const pageWithBlanks = AgencyPageFactory.make({
      title: 'blanks',
      description: 'hello',
      alert: [],
      logo: null,
      quicklinks: [],
      meetings: [],
      meeting_archive_date: '',
      meeting_archive_url: '',
      spotlight_1: [],
      spotlight_2: [],
      services: [],
      resources: [],
      about_description: '',
      child_agency_section_title: '',
      part_of: [],
      call_to_action: [],
      social_media: [],
      contact: [],
      public_records: [],
      archive_url: '',
      archive_date: '',
      related_child_agencies: [],
      related_content_topics: [],
      related_content_agencies: [],
      related_events: {},
      related_news: []
    })
    render(<AgencyPage page={pageWithBlanks} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(pageWithBlanks.title)
  })

  it.each([
    {
      type: 'email',
      input: {
        type: 'email',
        value: 'j@fg.com',
        id: '0001'
      },
      expected: 'mailto:j@fg.com'
    },
    {
      type: 'phone',
      input: {
        type: 'phone',
        value: '415-432-6465',
        id: '0002'
      },
      expected: 'tel:415-432-6465'
    }
  ])(
    'renders an agency page with public records link to %type',
    ({ input, expected }) => {
      render(<AgencyPage page={{ ...page, public_records: [input] }} />)

      const link = screen.getByTestId('public-records-link')
      expect(link).toHaveAttribute('href', expected)
    }
  )
})
