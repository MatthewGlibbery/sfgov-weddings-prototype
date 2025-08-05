import { AgencyPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { AgencyPage } from './AgencyPage'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('AgencyPage', () => {
  const page = AgencyPageFactory.make()
  const mockUseRouter = useRouter
  mockUseRouter.mockReturnValue({
    query: { path: 'agency-name' }
  })

  it('renders a full agency page', () => {
    render(<AgencyPage page={page} />)

    const title = screen.getAllByRole('heading', {
      level: 1
    })[0]
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

    const title = screen.getAllByRole('heading', {
      level: 1
    })[0]
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

  it('properly links an english full calendar button if there are related events', () => {
    const mockUseRouter = useRouter
    mockUseRouter.mockReturnValue({
      asPath: '/agency-name',
      locale: 'en'
    })
    const page = AgencyPageFactory.make()
    render(<AgencyPage page={page} />)
    const fullCalendarButtonLink = screen.getByRole('link', {
      name: 'Full calendar'
    })
    expect(fullCalendarButtonLink).toBeInTheDocument()
    expect(fullCalendarButtonLink.getAttribute('href')).toBe(
      '/agency-name/events/upcoming'
    )
  })

  it('properly links a non-english full calendar button if there are related events', () => {
    const mockUseRouter = useRouter
    mockUseRouter.mockReturnValue({
      asPath: '/agency-name',
      locale: 'es'
    })
    const page = AgencyPageFactory.make()
    render(<AgencyPage page={page} />)
    const fullCalendarButtonLink = screen.getByRole('link', {
      name: 'Full calendar'
    })
    expect(fullCalendarButtonLink).toBeInTheDocument()
    expect(fullCalendarButtonLink.getAttribute('href')).toBe(
      '/es/agency-name/events/upcoming'
    )
  })
})
